# Implementation Plan: ログインID制への移行とパスワード管理機能

## Phase 1: データベースと認証基盤の修正 [checkpoint: e5bdba3]
ログインの識別子をメールアドレスから独自IDに切り替えます。

- [x] Task: Prismaスキーマの更新 [e5bdba3]
    - [x] `User` モデルに `loginId` (String, @unique) を追加
    - [x] `email` フィールドを任意 (String?) に変更
- [x] Task: データベースマイグレーションの実行 [db-push-reset]
- [x] Task: 認証ロジック (`src/auth.ts`) の更新 [e5bdba3]
    - [x] 認証識別子を `email` から `loginId` に変更
- [x] Task: Conductor - User Manual Verification 'Phase 1: データベースと認証基盤の修正' (Protocol in workflow.md)

## Phase 2: 管理者向け操作とUIの実装 [checkpoint: 52391da]
管理者がスタッフのIDとパスワードを管理できる機能を実装します。

- [x] Task: スタッフ登録機能の更新 [52391da]
    - [x] `registerStaff` アクションを `loginId` 対応に修正
    - [x] `RegisterStaffForm` の入力項目を `email` から `loginId` に変更
- [x] Task: パスワード上書きアクションの実装 [52391da]
    - [x] 管理者がスタッフのパスワードを強制変更できる `resetStaffPassword` アクションを作成
- [x] Task: 施設管理者ダッシュボードの更新 [52391da]
    - [x] スタッフ一覧に `loginId` を表示
    - [x] パスワード再設定用ダイアログとボタンの追加
- [x] Task: Conductor - User Manual Verification 'Phase 2: 管理者向け操作とUIの実装' (Protocol in workflow.md)

## Phase 3: ログイン画面と既存データのクリーンアップ [checkpoint: 7d939e8]
全ユーザーが新しいID制で利用できるように整えます。

- [x] Task: ログイン画面の更新 [7d939e8]
    - [x] `LoginPage` のラベルと入力を `loginId` に変更
- [x] Task: 各ダッシュボード・コンポーネントの表記修正 [7d939e8]
    - [x] 「メールアドレス」と表示されている箇所を「ログインID」に統一
- [x] Task: 動作確認用テストの作成と実施（TDD） [pass]
- [x] Task: Conductor - User Manual Verification 'Phase 3: ログイン画面と既存データのクリーンアップ' (Protocol in workflow.md)
