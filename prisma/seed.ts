import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { seedAbuse } from './seeds/01_abuse'
import { seedDementia } from './seeds/02_dementia'
import { seedInfection } from './seeds/03_infection'
import { seedAccident } from './seeds/04_accident'
import { seedEmergency } from './seeds/05_emergency'
import { seedPrivacy } from './seeds/06_privacy'
import { seedEthics } from './seeds/07_ethics'
import { seedEtiquette } from './seeds/08_etiquette'
import { seedDisaster } from './seeds/09_disaster'
import { seedRestraint } from './seeds/10_prevention'
import { seedMedical } from './seeds/11_medical'
import { seedTerminal } from './seeds/12_terminal'
import { seedMental } from './seeds/13_mental'
import { seedPrevention } from './seeds/14_prevention'
import { seedHarassment } from './seeds/15_harassment'

const prisma = new PrismaClient()

async function main() {
  const args = process.argv
  const fileArg = args.find(arg => arg.includes('--file='))
  const targetFile = fileArg ? fileArg.split('=')[1] : null

  console.log(targetFile ? `Targeting specific course: ${targetFile}` : 'Running system content sync...')

  // 1. 初期スーパー管理者の作成 (システムログインに必須)
  const initialPassword = process.env.SUPER_ADMIN_INITIAL_PASSWORD
  if (!initialPassword) {
    throw new Error(
      'SUPER_ADMIN_INITIAL_PASSWORD が .env に設定されていません。' +
      'セットアップ手順を確認してください。'
    )
  }
  await prisma.user.upsert({
    where: { loginId: 'owner' },
    update: {},
    create: {
      loginId: 'owner',
      name: 'システム運営者',
      password: await bcrypt.hash(initialPassword, 12),
      role: Role.SUPER_ADMIN,
    }
  })
  console.log('Super Admin created. Login ID: owner')

  // 2. 研修コンテンツの同期 (マスターデータ)
  const allSeedFunctions = [
    { key: 'abuse', fn: seedAbuse },
    { key: 'dementia', fn: seedDementia },
    { key: 'infection', fn: seedInfection },
    { key: 'accident', fn: seedAccident },
    { key: 'emergency', fn: seedEmergency },
    { key: 'privacy', fn: seedPrivacy },
    { key: 'ethics', fn: seedEthics },
    { key: 'etiquette', fn: seedEtiquette },
    { key: 'disaster', fn: seedDisaster },
    { key: 'restraint', fn: seedRestraint },
    { key: 'medical', fn: seedMedical },
    { key: 'terminal', fn: seedTerminal },
    { key: 'mental', fn: seedMental },
    { key: 'prevention', fn: seedPrevention },
    { key: 'harassment', fn: seedHarassment },
  ]

  const targetedSeeds = targetFile 
    ? allSeedFunctions.filter(s => s.key === targetFile)
    : allSeedFunctions

  if (targetFile && targetedSeeds.length === 0) {
    console.error(`Error: Course '${targetFile}' not found in seed list.`)
    process.exit(1)
  }

  for (const seed of targetedSeeds) {
    console.log(`Syncing content: ${seed.key}...`)
    await seed.fn(prisma)
  }

  console.log(`Content synchronization COMPLETED successfully.`)
  console.log(`Initial Super Admin 'owner' is ready.`)
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect() })
