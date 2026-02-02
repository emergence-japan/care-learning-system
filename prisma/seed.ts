import { PrismaClient, Role, Status } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.choice.deleteMany({})
  await prisma.question.deleteMany({})
  await prisma.enrollment.deleteMany({})
  await prisma.course.deleteMany({})
  await prisma.user.deleteMany({})

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: '管理者 太郎',
      password: 'admin_password',
      role: Role.ADMIN,
    },
  })

  const staff = await prisma.user.upsert({
    where: { email: 'staff@example.com' },
    update: {},
    create: {
      email: 'staff@example.com',
      name: '介護 華子',
      password: 'staff_password',
      role: Role.STAFF,
    },
  })

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

  await prisma.enrollment.create({
    data: {
      userId: staff.id,
      courseId: course1.id,
      status: Status.NOT_STARTED,
    },
  })

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })