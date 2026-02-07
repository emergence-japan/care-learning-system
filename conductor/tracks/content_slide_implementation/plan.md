# Implementation Plan: Slide-based Learning Content & Annual Training Plan

## Phase 1: Data Model Update
- [x] `prisma/schema.prisma` に `Slide` モデルを追加。
- [x] `CourseAssignment` モデルの追加（施設ごとの期間管理用）。
- [x] `Corporation` モデルに `fiscalYearStartMonth` を追加。
- [x] マイグレーションの実行。
- [x] `seed.ts` の更新（高齢者虐待防止研修のサンプルデータ、および13件の準備中研修の追加）。

## Phase 2: UI Component Development
- [x] `SlidePlayer` コンポーネントの作成。
- [x] `TrainingTimeline` コンポーネントの作成（年度開始月の変更機能付き）。
- [x] `CourseAssignmentDialog` コンポーネントの作成（既存研修の割当機能）。
- [ ] スライド切り替えロジックの微調整。

## Phase 3: Page Integration
- [x] `src/app/admin/page.tsx` の刷新（タイムラインと割当UIの統合）。
- [x] `src/app/page.tsx` の刷新（期限と残り日数表示の追加）。
- [ ] `src/app/courses/[id]/page.tsx` をスライドプレイヤーを使用するように刷新。

## Phase 4: Content Completion
- [x] 13科目の「準備中」研修の箱を作成。
- [ ] 各研修（認知症、接遇、倫理など）の具体的なスライド内容と設問を流し込む。
- [ ] 動作確認とUIの微調整。
