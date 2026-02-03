import { PrismaClient } from '@prisma/client'

async function debug() {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: "postgresql://postgres.wrecxwrgqmvnafjcxpbf:hamada0812TO0923@aws-1-ap-northeast-1.pooler.supabase.co:6543/postgres?pgbouncer=true"
      }
    }
  })

  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        password: true,
        role: true
      }
    })
    console.log('--- Current Users in Supabase ---')
    console.log(JSON.stringify(users, null, 2))
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debug()
