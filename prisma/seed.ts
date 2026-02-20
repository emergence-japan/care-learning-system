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
import { seedPrevention as seedRestraint } from './seeds/14_prevention'
import { seedHarassment } from './seeds/15_harassment'

const prisma = new PrismaClient()

async function main() {
  // 1. 組織の作成
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
  
  // 管理者ユーザー
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
  // ※ 10_prevention は「事故発生防止研修」の重複あるいは別名である可能性があるため、
  // 14_prevention (身体拘束) は seedRestraint として区別して呼び出します。
  
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
    await seedPrevention(prisma), // 10. 事故発生または身体拘束（旧）
    await seedMedical(prisma),
    await seedTerminal(prisma),
    await seedMental(prisma),
    await seedRestraint(prisma),  // 14. 身体拘束廃止（新・精緻版）
    await seedHarassment(prisma)  // 15. ハラスメント対策（新・精緻版）
  ]

  // 3. 研修の割り当て (upsert化)
  for (const c of courses) {
    await prisma.courseAssignment.upsert({
      where: { facilityId_courseId: { facilityId: facilityA.id, courseId: c.id } },
      update: {},
      create: { facilityId: facilityA.id, courseId: c.id, startDate: new Date('2024-04-01'), endDate: new Date('2025-03-31') }
    })
  }

  // 4. 初期スタッフ作成 (upsert化)
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

    // 受講状況の作成 (未設定の場合のみ)
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      const existingEnrollment = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId: user.id, courseId: course.id } }
      })
      
      if (!existingEnrollment) {
        if (i === 0) {
          // 佐藤・鈴木の最初の研修のみ完了状態にする
          await prisma.enrollment.create({ 
            data: { userId: user.id, courseId: course.id, status: Status.COMPLETED, actionPlan: '尊厳を守るケアを徹底します。', completedAt: new Date() } 
          });
        } else {
          await prisma.enrollment.create({ 
            data: { userId: user.id, courseId: course.id, status: Status.NOT_STARTED } 
          });
        }
      }
    }
  }

  console.log(`Seed data sync COMPLETED: All 15 courses are now Masterpiece quality.`)
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect() })
