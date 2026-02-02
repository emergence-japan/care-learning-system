# 技術スタック (Tech Stack)

## フロントエンド / フレームワーク
- **Next.js (App Router):** 高速なレンダリングとモダンなWeb開発体験を提供。
- **TypeScript:** 型安全性を確保し、保守性の高いコードを実現。
- **Tailwind CSS:** 柔軟で高速なスタイリング。
- **Shadcn/ui:** 高品質でアクセシブルなUIコンポーネント。
- **Lucide React:** シンプルで一貫性のあるアイコンセット。

## バックエンド / データベース
- **Next.js Server Actions:** APIレイヤーを簡素化し、フロントエンドとシームレスに連携。
- **Prisma (ORM):** TypeScriptと親和性の高いデータベース操作。
- **SQLite / PostgreSQL:** 開発初期は SQLite を使用し、本番環境では PostgreSQL への移行を想定（Supabase 等）。

## 認証・セキュリティ
- **NextAuth.js (Auth.js):** 簡単かつ柔軟なユーザー認証（施設ごとのログイン管理等に対応可能）。

## ホスティング・インフラ
- **Vercel:** Next.jsに最適化されたデプロイ・ホスティング環境。
