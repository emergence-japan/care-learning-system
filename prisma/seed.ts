import { PrismaClient, Role, Status } from '@prisma/client'
import { seedAbuse } from './seeds/01_abuse'
import { seedDementia } from './seeds/02_dementia'
import { seedInfection } from './seeds/03_infection'
import { seedAccident } from './seeds/04_accident'
import { seedEmergency } from './seeds/05_emergency'
import { seedPrivacy } from './seeds/06_privacy'
import { seedEthics } from './seeds/07_ethics'
import { seedEtiquette } from './seeds/08_etiquette'
import { seedDisaster } from './seeds/09_disaster'
import { seedPrevention as seedRestraint } from './seeds/10_prevention'
import { seedMedical } from './seeds/11_medical'
import { seedTerminal } from './seeds/12_terminal'
import { seedMental } from './seeds/13_mental'
import { seedPrevention } from './seeds/14_prevention'
import { seedHarassment } from './seeds/15_harassment'

const prisma = new PrismaClient()

async function main() {
  // 0. 引数の解析
  const args = process.argv
  const fileArg = args.find(arg => arg.includes('--file='))
  const targetFile = fileArg ? fileArg.split('=')[1] : null

  console.log(targetFile ? `Targeting specific course: ${targetFile}` : 'Running full seed...')

  // 1. 基盤データの作成 (常に実行)
  const corp = await prisma.corporation.upsert({
    where: { name: 'ケア・グループ法人' },
    update: {},
    create: { name: 'ケア・グループ法人', fiscalYearStartMonth: 4, maxFacilities: 10, maxStaff: 100 }
  })

  const facilityA = await prisma.facility.upsert({
    where: { name: 'コスモス苑' },
    update: { corporationId: corp.id },
    create: { name: 'コスモス苑', type: '特別養護老人ホーム', corporationId: corp.id, maxStaff: 20 }
  })
  
  const baseUsers = [
    { loginId: 'owner', name: 'システム運営者', password: 'owner_password', role: Role.SUPER_ADMIN },
    { loginId: 'hq', name: '法人本部 太郎', password: 'hq_password', role: Role.HQ, corporationId: corp.id },
    { loginId: 'admin_a', name: 'ひまわり管理者', password: 'admin_password', role: Role.ADMIN, corporationId: corp.id, facilityId: facilityA.id }
  ]

  for (const u of baseUsers) {
    await prisma.user.upsert({
      where: { loginId: u.loginId },
      update: { role: u.role, name: u.name, facilityId: u.facilityId, corporationId: u.corporationId },
      create: u
    })
  }

  // 2. 研修コンテンツの同期
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

  const courses = []
  for (const seed of targetedSeeds) {
    console.log(`Seeding: ${seed.key}...`)
    courses.push(await seed.fn(prisma))
  }

  // 3. 研修の割り当て (更新された分のみ、または全て)
  for (const c of courses) {
    await prisma.courseAssignment.upsert({
      where: { facilityId_courseId: { facilityId: facilityA.id, courseId: c.id } },
      update: {},
      create: { facilityId: facilityA.id, courseId: c.id, startDate: new Date('2024-04-01'), endDate: new Date('2025-03-31') }
    })
  }

  // 4. 初期スタッフ作成 & 受講状況の同期 (一括実行時のみ、または新規作成されたコースのみ)
  const staffData = [
    { name: '佐藤 美咲', loginId: 'sato' }, 
    { name: '鈴木 健一', loginId: 'suzuki' }
  ];
  
  for (const data of staffData) {
    const user = await prisma.user.upsert({
      where: { loginId: data.loginId },
      update: { name: data.name },
      create: { loginId: data.loginId, name: data.name, password: 'password123', role: Role.STAFF, corporationId: corp.id, facilityId: facilityA.id }
    });

    for (const course of courses) {
      const existingEnrollment = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId: user.id, courseId: course.id } }
      })
      
      if (!existingEnrollment) {
        // デフォルトの未着手状態を作成
        await prisma.enrollment.create({ 
          data: { userId: user.id, courseId: course.id, status: Status.NOT_STARTED } 
        });
      }
    }
  }

  console.log(`Seed process COMPLETED successfully.`)
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect() })
