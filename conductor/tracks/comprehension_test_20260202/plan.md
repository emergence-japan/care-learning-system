# Implementation Plan: 理解度確認テスト機能の実装

## Phase 1: データモデルと基本UI
- [~] Task: Prisma スキーマへの Question/Choice モデル追加
    - [ ] `schema.prisma` の更新とマイグレーション
    - [ ] シードデータへのテスト設問追加
- [ ] Task: テスト回答画面のUI構築
    - [ ] 設問と選択肢の表示コンポーネント
- [ ] Task: Conductor - User Manual Verification 'Phase 1: データモデルと基本UI'

## Phase 2: 採点ロジックとステータス連携
- [ ] Task: テスト採点用の Server Actions 実装
    - [ ] 回答の検証とスコア算出
- [ ] Task: 合格時の受講ステータス更新処理
    - [ ] テスト合格後に `Enrollment` を `COMPLETED` に更新
- [ ] Task: 合否フィードバック画面の作成
    - [ ] 正解・不正解に応じた励ましメッセージの表示
- [ ] Task: Conductor - User Manual Verification 'Phase 2: 採点ロジックとステータス連携'
