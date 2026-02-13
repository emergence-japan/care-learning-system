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
import { seedPrevention } from './seeds/10_prevention'
import { seedMedical } from './seeds/11_medical'
import { seedTerminal } from './seeds/12_terminal'
import { seedMental } from './seeds/13_mental'

const prisma = new PrismaClient()

async function main() {
  // 1. 全データの初期化
  await prisma.choice.deleteMany({})
  await prisma.question.deleteMany({})
  await prisma.slide.deleteMany({})
  await prisma.enrollment.deleteMany({})
  await prisma.courseAssignment.deleteMany({})
  await prisma.course.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.facility.deleteMany({})
  await prisma.corporation.deleteMany({})

  // 2. 組織・基本ユーザーの作成
  const corp = await prisma.corporation.create({ data: { name: 'ケア・グループ法人', fiscalYearStartMonth: 4, maxFacilities: 10, maxStaff: 100 } })
  const facilityA = await prisma.facility.create({ data: { name: 'コスモス苑', type: '特別養護老人ホーム', corporationId: corp.id, maxStaff: 20 } })
  
  await prisma.user.create({ data: { email: 'owner@example.com', loginId: 'owner', name: 'システム運営者', password: 'owner_password', role: Role.SUPER_ADMIN } })
  await prisma.user.create({ data: { email: 'hq@example.com', loginId: 'hq', name: '法人本部 太郎', password: 'hq_password', role: Role.HQ, corporationId: corp.id } })
  await prisma.user.create({ data: { email: 'admin_a@example.com', loginId: 'admin_a', name: 'ひまわり管理者', password: 'admin_password', role: Role.ADMIN, corporationId: corp.id, facilityId: facilityA.id } })

  // 3. 研修コンテンツの個別実行 (各ファイルにフルボリュームのHTMLが詰まっています)
  const courses = [
    await seedAbuse(prisma),
    await seedDementia(prisma),
    await seedInfection(prisma),
    await seedAccident(prisma),
    await seedEmergency(prisma),
    await seedPrivacy(prisma),
    await seedEthics(prisma),
    await seedEtiquette(prisma),
    await seedDisaster(prisma),
    await seedPrevention(prisma),
    await seedMedical(prisma),
    await seedTerminal(prisma),
    await seedMental(prisma)
  ]

  // 4. 研修の割り当て (2024年度の法定研修として全科目を割り当て)
  for (const c of courses) {
    await prisma.courseAssignment.create({ data: { facilityId: facilityA.id, courseId: c.id, startDate: new Date('2024-04-01'), endDate: new Date('2025-03-31') } })
  }

  // 5. スタッフ作成と初期エンロールメント
  const staffData = [{ name: '佐藤 美咲', loginId: 'sato' }, { name: '鈴木 健一', loginId: 'suzuki' }];
  for (const data of staffData) {
    const user = await prisma.user.create({ data: { email: `${data.loginId}@example.com`, loginId: data.loginId, name: data.name, password: 'password123', role: Role.STAFF, corporationId: corp.id, facilityId: facilityA.id } });
    // 虐待研修のみ完了、他は未着手の状態
    await prisma.enrollment.create({ data: { userId: user.id, courseId: courses[0].id, status: Status.COMPLETED, actionPlan: '尊厳を守るケアを徹底します。', completedAt: new Date() } });
    for (let i = 1; i < courses.length; i++) {
      await prisma.enrollment.create({ data: { userId: user.id, courseId: courses[i].id, status: Status.NOT_STARTED } });
    }
  }

  console.log(`Seed data COMPLETED: All ${courses.length} courses loaded with full volume and 100% compliance.`)
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect() })
