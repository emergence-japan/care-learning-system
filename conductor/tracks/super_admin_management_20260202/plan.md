# Implementation Plan: システム管理者（SUPER ADMIN）機能の実装

## Phase 1: 基盤整備とコンテンツ管理 [checkpoint: 97a08ad]
- [x] Task: ロール `SUPER_ADMIN` の追加と権限設定 (5f43781)
    - [ ] `schema.prisma` の更新（Role に SUPER_ADMIN 追加）
    - [ ] セッション連携と `/super-admin` へとリダイレクト実装
- [x] Task: 研修コース管理画面の作成 (97a08ad)
    - [ ] コース一覧・新規登録・編集フォームの実装
    - [ ] クイズ設問の管理UIの実装
- [x] Task: Conductor - User Manual Verification 'Phase 1: 基盤整備とコンテンツ管理' (97a08ad)

## Phase 2: 組織管理機能
- [~] Task: 法人・施設管理画面の作成
    - [ ] 法人の登録・編集機能
    - [ ] 施設の登録・編集機能（法人選択を含む）
- [ ] Task: 初期管理者アカウント発行機能
    - [ ] 法人本部・施設管理者のアカウント作成フォーム
- [ ] Task: Conductor - User Manual Verification 'Phase 2: 組織管理機能'

## Phase 3: 全体統計と仕上げ
- [ ] Task: システム全体ダッシュボードの構築
    - [ ] 全組織を横断した統計情報の表示
- [ ] Task: デザインの統一とモバイル対応確認
- [ ] Task: Conductor - User Manual Verification 'Phase 3: 全体統計と仕上げ'
