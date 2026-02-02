# Implementation Plan: 理解度確認テスト機能の実装

## Phase 1: データモデルと基本UI [checkpoint: 59a3dfc]
- [x] Task: Prisma スキーマへの Question/Choice モデル追加 (14d8048)
    - [ ] `schema.prisma` の更新とマイグレーション
    - [ ] シードデータへのテスト設問追加
- [x] Task: テスト回答画面のUI構築 (14d8048)
    - [ ] 設問と選択肢の表示コンポーネント
- [x] Task: Conductor - User Manual Verification 'Phase 1: データモデルと基本UI' (59a3dfc)

## Phase 2: 採点ロジックとステータス連携 [checkpoint: b9aeb54]
- [x] Task: テスト採点用の Server Actions 実装 (2134a1d)
    - [ ] 回答の検証とスコア算出
- [x] Task: 合格時の受講ステータス更新処理 (2134a1d)
    - [ ] テスト合格後に `Enrollment` を `COMPLETED` に更新
- [x] Task: 合否フィードバック画面の作成 (2134a1d)
    - [ ] 正解・不正解に応じた励ましメッセージの表示
- [x] Task: Conductor - User Manual Verification 'Phase 2: 採点ロジックとステータス連携' (b9aeb54)
