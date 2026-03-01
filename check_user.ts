import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: '若枝' } },
        { name: { contains: 'Wakae' } },
        { loginId: { contains: 'wakae' } }
      ]
    },
    include: {
      facility: true
    }
  })

  if (users.length === 0) {
    console.log('No user found with name "若枝" or "Wakae".')
  } else {
    users.forEach(u => {
      console.log(`User: ${u.name} (LoginID: ${u.loginId}), Facility: ${u.facility?.name || 'No Facility'}`)
    })
  }
}

main().catch(console.error).finally(() => prisma.$disconnect())
