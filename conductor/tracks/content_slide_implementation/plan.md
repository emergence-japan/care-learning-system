# Implementation Plan: Slide-based Learning Content

## Phase 1: Data Model Update
- [ ] `prisma/schema.prisma` に `Slide` モデルを追加。
- [ ] マイグレーションの実行。
- [ ] `seed.ts` の更新（サンプルスライドデータの追加）。

## Phase 2: UI Component Development
- [ ] `SlidePlayer` コンポーネントの作成。
- [ ] スライド切り替えロジックの実装。
- [ ] 補助動画表示（ダイアログ/トグル）の実装。

## Phase 3: Page Integration
- [ ] `src/app/courses/[id]/page.tsx` をスライドプレイヤーを使用するように刷新。
- [ ] 進捗状況（Enrollment Status）との連携。

## Phase 4: Content Completion
- [ ] 『高齢者虐待防止研修』の具体的なスライド内容と設問を流し込む。
- [ ] 動作確認とUIの微調整。
