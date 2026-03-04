/**
 * 既存の平文パスワードをbcryptハッシュに一括変換するスクリプト
 * 実行: npx ts-node prisma/migrate-passwords.ts
 * ※ 本番実行前にDBバックアップを取ること
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany({
    select: { id: true, loginId: true, password: true }
  })

  console.log(`対象ユーザー数: ${users.length}`)

  let updated = 0
  let skipped = 0

  for (const user of users) {
    // bcryptハッシュは "$2b$" または "$2a$" で始まる
    const isAlreadyHashed = user.password.startsWith('$2b$') || user.password.startsWith('$2a$')

    if (isAlreadyHashed) {
      skipped++
      continue
    }

    const hashed = await bcrypt.hash(user.password, 12)
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed }
    })

    console.log(`  ✓ ${user.loginId}`)
    updated++
  }

  console.log(`\n完了: ${updated}件を更新, ${skipped}件はスキップ（既にハッシュ済み）`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
