This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## データベース運用ルール

このプロジェクトでは、データの整合性を保ち、消失を防ぐために以下のルールを徹底しています。

1. **Supabaseの一元管理**
   - データベースは常に Supabase (PostgreSQL) を使用します。ローカルの SQLite (`dev.db`) は使用せず、誤って作成された場合は削除してください。
   - 接続先は `.env` の `DATABASE_URL` で管理します。

2. **コンテンツの「正」は seed ファイル**
   - 研修スライド、クイズ等のマスターデータは、`prisma/seeds/*.ts` ファイルが「正（Source of Truth）」です。
   - **重要**: ブラウザやDBツールで内容を直接変更せず、必ず対応する `.ts` ファイルを修正し、以下のコマンドで反映させてください。
     ```bash
     npx prisma db seed
     ```
   - これにより、Gitで変更履歴が管理され、DBがリセットされても100%復旧可能です。

3. **反映フロー**
   - 修正: `prisma/seeds/xx_content.ts` を編集
   - 反映: `npx prisma db seed` を実行
   - 確認: ブラウザをリロード

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
