import { PrismaClient, Role, Status } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.choice.deleteMany({})
  await prisma.question.deleteMany({})
  await prisma.enrollment.deleteMany({})
  await prisma.course.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.facility.deleteMany({})

  // 施設の作成
  const facilityA = await prisma.facility.create({
    data: { name: 'ひまわりの里' }
  })

  const facilityB = await prisma.facility.create({
    data: { name: 'さくら苑' }
  })

  // 施設Aのユーザー
  const adminA = await prisma.user.create({
    data: {
      email: 'admin_a@example.com',
      name: 'ひまわり管理者',
      password: 'admin_password',
      role: Role.ADMIN,
      facilityId: facilityA.id,
    },
  })

  const staffA = await prisma.user.create({
    data: {
      email: 'staff_a@example.com',
      name: 'ひまわりスタッフ',
      password: 'staff_password',
      role: Role.STAFF,
      facilityId: facilityA.id,
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
    },
  })

  const staffB = await prisma.user.create({
    data: {
      email: 'staff_b@example.com',
      name: 'さくらスタッフ',
      password: 'staff_password',
      role: Role.STAFF,
      facilityId: facilityB.id,
    },
  })

  // 共通の研修
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
          {
            text: '身体拘束が例外的に認められる「3つの要件」に含まれないものはどれですか？',
            order: 2,
            choices: {
              create: [
                { text: '切迫性', isCorrect: false },
                { text: '非代替性', isCorrect: false },
                { text: '一時性', isCorrect: false },
                { text: '利便性', isCorrect: true },
              ],
            },
          },
        ],
      },
    },
  })

  // 受講実績の作成
  await prisma.enrollment.createMany({
    data: [
      { userId: staffA.id, courseId: course1.id, status: Status.NOT_STARTED },
      { userId: staffB.id, courseId: course1.id, status: Status.COMPLETED, completedAt: new Date() },
    ]
  })

  console.log('Seed data created successfully with multiple facilities')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
