import { readFileSync } from 'node:fs'

const seedPath = process.argv[2]
const scriptPath = process.argv[3]

const src = readFileSync(seedPath, 'utf8')
const re = /title:\s*"((?:[^"\\]|\\.)*)",\s*order:\s*(\d+)/g
let m
const rows = []
while ((m = re.exec(src)) !== null) {
  rows.push({ order: Number(m[2]), title: m[1] })
}
rows.sort((a, b) => a.order - b.order)

console.log(`=== seed スライド全 ${rows.length} 枚 ===`)
for (const r of rows) console.log(String(r.order).padStart(2, ' ') + ': ' + r.title)

if (scriptPath) {
  const s = JSON.parse(readFileSync(scriptPath, 'utf8'))
  console.log(`\n=== 台本 全 ${s.scenes.length} シーン ===`)
  s.scenes.forEach((sc, i) =>
    console.log(String(i + 1).padStart(2, ' ') + ` [${sc.layout}] ${sc.label} (${sc.narration.length}文)`)
  )
}
