import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const course = await prisma.course.findUnique({
    where: { slug: 'abuse' },
    include: {
      _count: {
        select: { questions: true }
      },
      questions: {
        select: { text: true, order: true }
      }
    }
  })

  if (!course) {
    console.log('Course "abuse" not found.')
    return
  }

  console.log(`Course: ${course.title}`)
  console.log(`Total Questions: ${course._count.questions}`)
  course.questions.forEach((q, i) => {
    console.log(`${q.order}: ${q.text}`)
  })
}

main().catch(console.error).finally(() => prisma.$disconnect())
