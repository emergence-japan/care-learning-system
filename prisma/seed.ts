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
  // --- 全削除命令 (deleteMany) を撤廃しました ---

  // 1. 組織・基本ユーザーの作成 (upsertを使用)
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
  
  // 管理者ユーザー (loginIdをキーにupsert)
  const baseUsers = [
    { email: 'owner@example.com', loginId: 'owner', name: 'システム運営者', password: 'owner_password', role: Role.SUPER_ADMIN },
    { email: 'hq@example.com', loginId: 'hq', name: '法人本部 太郎', password: 'hq_password', role: Role.HQ, corporationId: corp.id },
    { email: 'admin_a@example.com', loginId: 'admin_a', name: 'ひまわり管理者', password: 'admin_password', role: Role.ADMIN, corporationId: corp.id, facilityId: facilityA.id }
  ]

  for (const u of baseUsers) {
    await prisma.user.upsert({
      where: { loginId: u.loginId },
      update: { role: u.role, name: u.name, facilityId: u.facilityId, corporationId: u.corporationId },
      create: u
    })
  }

  // 2. 研修コンテンツの個別実行
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

  // 3. 研修の割り当て (なければ作成)
  for (const c of courses) {
    const existing = await prisma.courseAssignment.findUnique({
      where: { facilityId_courseId: { facilityId: facilityA.id, courseId: c.id } }
    })
    if (!existing) {
      await prisma.courseAssignment.create({ 
        data: { facilityId: facilityA.id, courseId: c.id, startDate: new Date('2024-04-01'), endDate: new Date('2025-03-31') } 
      })
    }
  }

  // 4. 初期スタッフ作成 (sato, suzuki)
  const staffData = [
    { name: '佐藤 美咲', loginId: 'sato' }, 
    { name: '鈴木 健一', loginId: 'suzuki' }
  ];
  for (const data of staffData) {
    const user = await prisma.user.upsert({
      where: { loginId: data.loginId },
      update: {},
      create: { email: `${data.loginId}@example.com`, loginId: data.loginId, name: data.name, password: 'password123', role: Role.STAFF, corporationId: corp.id, facilityId: facilityA.id }
    });

    // 最初の研修のみ完了状態にする (未設定の場合のみ)
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: user.id, courseId: courses[0].id } }
    })
    if (!existingEnrollment) {
      await prisma.enrollment.create({ data: { userId: user.id, courseId: courses[0].id, status: Status.COMPLETED, actionPlan: '尊厳を守るケアを徹底します。', completedAt: new Date() } });
      for (let i = 1; i < courses.length; i++) {
        await prisma.enrollment.create({ data: { userId: user.id, courseId: courses[i].id, status: Status.NOT_STARTED } });
      }
    }
  }

  console.log(`Seed data sync COMPLETED: Manual data preserved, master data updated.`)
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect() })
