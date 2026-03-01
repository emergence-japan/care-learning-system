import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('--- Checking User: taro ---')
  const user = await prisma.user.findUnique({
    where: { loginId: 'taro' },
    include: { 
      facility: {
        include: { corporation: true }
      }
    }
  })
  
  if (!user) {
    console.log('User "taro" not found in DB.')
    return
  }

  console.log(`User: ${user.name}`)
  console.log(`- Role: ${user.role}`)
  console.log(`- facilityId: ${user.facilityId}`)
  console.log(`- Facility Name: ${user.facility?.name || 'NULL'}`)
  console.log(`- Corporation Name: ${user.facility?.corporation?.name || 'NULL'}`)
  console.log(`- Fiscal Year Start: ${user.facility?.corporation?.fiscalYearStartMonth}`)

  if (user.facilityId) {
    const assignments = await prisma.courseAssignment.findMany({
      where: { facilityId: user.facilityId }
    })
    console.log(`- Assignments Count: ${assignments.length}`)
  }
}

main().catch(console.error).finally(() => prisma.$disconnect())
