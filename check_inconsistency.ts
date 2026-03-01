import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('--- User Info ---')
  const user = await prisma.user.findUnique({
    where: { loginId: 'wakaeda' },
    include: { facility: true, corporation: true }
  })
  
  if (!user) {
    console.log('User wakaeda not found.')
  } else {
    console.log(`User: ${user.name} (ID: ${user.id})`)
    console.log(`- loginId: ${user.loginId}`)
    console.log(`- facilityId: ${user.facilityId} (${user.facility?.name})`)
    console.log(`- corporationId: ${user.corporationId} (${user.corporation?.name})`)
  }

  console.log('\n--- Facility Info (Matching "コスモス") ---')
  const facility = await prisma.facility.findFirst({
    where: { name: { contains: 'コスモス' } },
    include: { corporation: true }
  })
  
  if (!facility) {
    console.log('Facility matching "コスモス" not found.')
  } else {
    console.log(`Facility: ${facility.name} (ID: ${facility.id})`)
    console.log(`- corporationId: ${facility.corporationId} (${facility.corporation?.name})`)
  }

  console.log('\n--- Corporation Info (Matching "テスト") ---')
  const corp = await prisma.corporation.findFirst({
    where: { name: { contains: 'テスト' } },
    include: { facilities: true }
  })
  
  if (!corp) {
    console.log('Corporation matching "テスト" not found.')
  } else {
    console.log(`Corporation: ${corp.name} (ID: ${corp.id})`)
    console.log(`- Registered Facilities Count: ${corp.facilities.length}`)
    corp.facilities.forEach(f => {
      console.log(`  - Facility: ${f.name} (ID: ${f.id})`)
    })
  }

  console.log('\n--- All Corporations ---')
  const allCorps = await prisma.corporation.findMany({ include: { facilities: true } })
  allCorps.forEach(c => {
    console.log(`Corp: ${c.name} (ID: ${c.id}) - Facilities: ${c.facilities.length}`)
  })
}

main().catch(console.error).finally(() => prisma.$disconnect())
