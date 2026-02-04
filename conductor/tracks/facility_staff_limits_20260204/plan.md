# Implementation Plan: 施設ごとのスタッフ数制限機能

## Phase 1: データベーススキーマの更新 [checkpoint: 913b947]
施設（Facility）モデルに定員フィールドを追加し、データを移行します。

- [x] Task: Prismaスキーマの更新 [f0a9487]
    - [x] `Facility` モデルに `maxStaff` (Int) を追加（デフォルト値: 20名）
- [x] Task: データベースマイグレーションの実行 [db-push]
- [x] Task: Conductor - User Manual Verification 'Phase 1: データベーススキーマの更新' (Protocol in workflow.md)

## Phase 2: システム管理者（SUPER_ADMIN）向け施設管理機能の更新 [checkpoint: 59c151f]
各施設の定員を設定・管理できるようにします。

- [x] Task: 施設登録・編集フォームの更新 [59c151f]
    - [x] `src/app/super-admin/organizations/page.tsx` の施設登録フォームに `maxStaff` 項目を追加
- [x] Task: 施設編集アクションの実装 [59c151f]
    - [x] 施設の定員を後から変更できるアクションの作成
- [x] Task: 法人・施設一覧画面（OrganizationClient）の表示更新 [59c151f]
    - [x] 施設ごとの「利用数 / 定員」を表示するように修正
- [x] Task: Conductor - User Manual Verification 'Phase 2: システム管理者向け施設管理機能の更新' (Protocol in workflow.md)

## Phase 3: 施設管理者（ADMIN）向け表示と登録制限の修正
法人全体の制限から「施設ごとの定員」による制限にロジックを切り替えます。

- [~] Task: 施設管理者ダッシュボードの更新
    - [ ] `src/app/admin/page.tsx` で取得する上限値を「法人の最大数」から「施設の最大数」に変更
    - [ ] 利用状況表示カードのラベルとロジックの修正
- [ ] Task: サーバーサイドバリデーションの更新
    - [ ] `registerStaff` アクション内の制限チェックを、施設の `maxStaff` を参照するように修正
- [ ] Task: 動作確認用テストの作成と実施（TDD）
- [ ] Task: Conductor - User Manual Verification 'Phase 3: 施設管理者向け表示と登録制限の修正' (Protocol in workflow.md)
