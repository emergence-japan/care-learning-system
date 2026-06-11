// Generate narration WAVs for a course script via the VOICEVOX engine HTTP API.
// Usage: node scripts/generate-audio.mjs [courseId]   (default: abuse)
// Requires a running VOICEVOX engine (default: http://127.0.0.1:50021)

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const ENGINE = process.env.VOICEVOX_URL ?? 'http://127.0.0.1:50021'
const courseId = process.argv[2] ?? 'abuse'

function parseWavDurationSec(buf) {
  // RIFF header is 12 bytes, then chunks of [id(4), size(4 LE), data]
  if (buf.length < 44 || buf.toString('ascii', 0, 4) !== 'RIFF') {
    throw new Error('Not a RIFF/WAV file')
  }
  let offset = 12
  let byteRate = null
  let dataSize = null
  while (offset + 8 <= buf.length) {
    const id = buf.toString('ascii', offset, offset + 4)
    const size = buf.readUInt32LE(offset + 4)
    if (id === 'fmt ') {
      byteRate = buf.readUInt32LE(offset + 8 + 8)
    } else if (id === 'data') {
      dataSize = size
    }
    offset += 8 + size + (size % 2)
  }
  if (!byteRate || dataSize === null) throw new Error('Missing fmt/data chunk')
  return dataSize / byteRate
}

async function synthesize(text, speaker) {
  const queryRes = await fetch(
    `${ENGINE}/audio_query?speaker=${speaker}&text=${encodeURIComponent(text)}`,
    { method: 'POST' }
  )
  if (!queryRes.ok) throw new Error(`audio_query failed (${queryRes.status}): ${text}`)
  const query = await queryRes.json()
  query.speedScale = 1.0
  query.prePhonemeLength = 0.1
  query.postPhonemeLength = 0.1

  const synthRes = await fetch(`${ENGINE}/synthesis?speaker=${speaker}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  })
  if (!synthRes.ok) throw new Error(`synthesis failed (${synthRes.status}): ${text}`)
  return Buffer.from(await synthRes.arrayBuffer())
}

async function main() {
  // Verify engine availability first
  try {
    const v = await fetch(`${ENGINE}/version`)
    console.log(`VOICEVOX engine: ${await v.text()}`)
  } catch {
    console.error(`ERROR: VOICEVOX engine is not reachable at ${ENGINE}`)
    console.error('Start the engine first (VOICEVOX app or vv-engine/run.exe).')
    process.exit(1)
  }

  const scriptPath = path.join(ROOT, 'src', 'courses', courseId, 'script.json')
  const script = JSON.parse(await readFile(scriptPath, 'utf-8'))
  const outDir = path.join(ROOT, 'public', 'audio', courseId)
  await mkdir(outDir, { recursive: true })

  const manifest = {}
  let total = 0
  for (const scene of script.scenes) {
    const durations = []
    for (let i = 0; i < scene.narration.length; i++) {
      const text = scene.narration[i]
      const wav = await synthesize(text, script.speaker)
      const file = path.join(outDir, `${scene.id}-${i}.wav`)
      await writeFile(file, wav)
      const dur = parseWavDurationSec(wav)
      durations.push(dur)
      total += dur
      console.log(`  ${scene.id}-${i}.wav  ${dur.toFixed(2)}s  ${text.slice(0, 28)}...`)
    }
    manifest[scene.id] = durations
  }

  await writeFile(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2))
  console.log(`\nDone. ${Object.keys(manifest).length} scenes, total speech ${total.toFixed(1)}s`)
  console.log(`Manifest: ${path.join(outDir, 'manifest.json')}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
