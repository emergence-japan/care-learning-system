import { PrismaClient, Role, Status } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.choice.deleteMany({})
  await prisma.question.deleteMany({})
  await prisma.enrollment.deleteMany({})
  await prisma.course.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.facility.deleteMany({})
  await prisma.corporation.deleteMany({})

  // 法人の作成
  const corp = await prisma.corporation.create({
    data: { name: 'ケア・グループ法人' }
  })

  // システム管理者（SUPER_ADMIN）
  await prisma.user.create({
    data: {
      email: 'owner@example.com',
      name: 'システム運営者',
      password: 'owner_password',
      role: Role.SUPER_ADMIN,
    },
  })

  // 本部ユーザー
  await prisma.user.create({
    data: {
      email: 'hq@example.com',
      name: '法人本部 太郎',
      password: 'hq_password',
      role: Role.HQ,
      corporationId: corp.id,
    },
  })

  // 施設の作成（法人に紐付け）
  const facilityA = await prisma.facility.create({
    data: { name: 'ひまわりの里', corporationId: corp.id }
  })

  const facilityB = await prisma.facility.create({
    data: { name: 'さくら苑', corporationId: corp.id }
  })

  // 施設Aのユーザー
  const adminA = await prisma.user.create({
    data: {
      email: 'admin_a@example.com',
      name: 'ひまわり管理者',
      password: 'admin_password',
      role: Role.ADMIN,
      facilityId: facilityA.id,
      corporationId: corp.id,
    },
  })

  const staffA = await prisma.user.create({
    data: {
      email: 'staff_a@example.com',
      name: 'ひまわりスタッフ',
      password: 'staff_password',
      role: Role.STAFF,
      facilityId: facilityA.id,
      corporationId: corp.id,
    },
  })

  // 施設Bのユーザー
  const adminB = await prisma.user.create({
    data: {
      email: 'admin_b@example.com',
      name: 'さくら管理者',
      password: 'admin_password',
      role: Role.ADMIN,
      facilityId: facilityB.id,
      corporationId: corp.id,
    },
  })

  const staffB = await prisma.user.create({
    data: {
      email: 'staff_b@example.com',
      name: 'さくらスタッフ',
      password: 'staff_password',
      role: Role.STAFF,
      facilityId: facilityB.id,
      corporationId: corp.id,
    },
  })

  // 研修の作成
  const course1 = await prisma.course.create({
    data: {
      title: '虐待防止研修（令和6年度）',
      description: '高齢者虐待防止の基本と対応について学習します。',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      questions: {
        create: [
          {
            text: '高齢者虐待の5つの種類のなかで、最も件数が多いものはどれですか？',
            order: 1,
            choices: {
              create: [
                { text: '身体的虐待', isCorrect: true },
                { text: '心理的虐待', isCorrect: false },
                { text: '介護等放棄（ネグレクト）', isCorrect: false },
                { text: '経済的虐待', isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  })

  const course2 = await prisma.course.create({
    data: {
      title: '感染症対策研修',
      description: '標準的な予防策と感染経路別対策を学びます。',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
  })

  // 受講実績の作成
  await prisma.enrollment.createMany({
    data: [
      { userId: staffA.id, courseId: course1.id, status: Status.COMPLETED, completedAt: new Date() },
      { userId: staffA.id, courseId: course2.id, status: Status.NOT_STARTED },
      { userId: staffB.id, courseId: course1.id, status: Status.NOT_STARTED },
      { userId: staffB.id, courseId: course2.id, status: Status.NOT_STARTED },
    ]
  })

  console.log('Seed data updated with Corporation and HQ user')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })