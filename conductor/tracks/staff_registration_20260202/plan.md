# Implementation Plan: 施設長によるスタッフ登録機能の実装

## Phase 1: 登録ロジックとフォームの構築
- [ ] Task: スタッフ登録用の Server Actions 実装
    - [ ] `registerStaff` アクションの作成（User作成 + Enrollment一括作成）
    - [ ] メールアドレス重複チェック等のバリデーション
- [ ] Task: 登録用ダイアログ/フォームの作成
    - [ ] Shadcn/ui の Dialog コンポーネント等を使用した入力画面
- [ ] Task: Conductor - User Manual Verification 'Phase 1: 登録ロジックとフォームの構築'

## Phase 2: 統合と最終確認
- [ ] Task: 管理者ダッシュボードへの統合
    - [ ] 「スタッフを追加する」ボタンの設置と連携
- [ ] Task: ログイン動作の確認
    - [ ] 実際に作成したスタッフアカウントでのログイン・受講確認
- [ ] Task: Conductor - User Manual Verification 'Phase 2: 統合と最終確認'
