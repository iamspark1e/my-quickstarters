const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Some async code of init database...
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})