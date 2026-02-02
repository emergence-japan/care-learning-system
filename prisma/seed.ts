import { PrismaClient, Role, Status } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
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