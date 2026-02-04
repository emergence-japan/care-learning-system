# Implementation Plan: 組織・ユーザー数の制限機能

## Phase 1: データベーススキーマの拡張 [checkpoint: 6d0cebf]
法人モデルに制限値を持たせるためのスキーマ変更と移行を行います。

- [x] Task: Prismaスキーマの更新 [688c098]
    - [x] `Corporation` モデルに `maxFacilities` (Int) と `maxStaff` (Int) を追加
    - [x] 既存データへのデフォルト値（例: 施設10, スタッフ100）を設定
- [x] Task: データベースマイグレーションの実行 [db-push]
- [x] Task: Conductor - User Manual Verification 'Phase 1: データベーススキーマの拡張' (Protocol in workflow.md)

## Phase 2: システム管理者（SUPER_ADMIN）向け管理機能の更新 [checkpoint: 61928a7]
制限値を設定・確認するためのUIとロジックを実装します。

- [x] Task: 法人作成・編集フォームの更新 [43e5f91, 6c66318]
    - [x] `maxFacilities`, `maxStaff` の入力項目を追加
    - [x] バリデーションの追加（正の整数のみ）
- [x] Task: 法人一覧画面の更新 [6c66318]
    - [x] 現在の利用数（施設数・合計スタッフ数）の取得ロジック実装
    - [x] 利用率（％）の表示と超過アラート（赤字表示など）の実装
- [x] Task: 動作確認用テストの作成と実施（TDD） [61928a7]
- [x] Task: Conductor - User Manual Verification 'Phase 2: システム管理者向け管理機能の更新' (Protocol in workflow.md)

## Phase 3: 法人本部・施設管理者向け表示とUI制限の実装 [checkpoint: 456155a]
上限を意識させる表示と、ボタンの制御を行います。

- [x] Task: 利用状況表示コンポーネント（Progress Card）の作成 [456155a]
- [x] Task: 各ダッシュボード（HQ/ADMIN）へのコンポーネント配置 [456155a]
- [x] Task: 登録ボタン（施設追加・スタッフ追加）の非活性化ロジック実装 [456155a]
    - [x] 現在数 >= 上限数 の場合に `disabled` に設定
- [x] Task: Conductor - User Manual Verification 'Phase 3: 法人本部・施設管理者向け表示とUI制限の実装' (Protocol in workflow.md)

## Phase 4: サーバーサイドバリデーションの強化 [checkpoint: 773bc01]
UIの制限を回避した不正なリクエストをバックエンドで遮断します。

- [x] Task: Server Actions の更新 [773bc01]
    - [x] `createFacility`, `registerStaff` 実行時に現在の数と上限を比較するチェック処理を追加
- [x] Task: エラーハンドリングとユーザー通知の実装 [773bc01]
- [x] Task: ユニットテストによる制限ロジックの検証（TDD） [773bc01]
- [x] Task: Conductor - User Manual Verification 'Phase 4: サーバーサイドバリデーションの強化' (Protocol in workflow.md)
