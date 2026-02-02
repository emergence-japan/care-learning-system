# Implementation Plan: プロジェクトの基盤構築と認証・ダッシュボードの基本実装

## Phase 1: 環境構築と基盤整備
- [ ] Task: Next.js プロジェクトの初期化と構成
    - [ ] npx create-next-app によるプロジェクト作成
    - [ ] Tailwind CSS, Shadcn/ui の初期設定
- [ ] Task: データベーススキーマの定義 (Prisma)
    - [ ] User, Course, Enrollment モデルの作成
    - [ ] 初期データの流し込み (Seed)
- [ ] Task: Conductor - User Manual Verification 'Phase 1: 環境構築と基盤整備' (Protocol in workflow.md)

## Phase 2: 認証機能の実装
- [ ] Task: ログイン画面の構築 (UIのみ)
    - [ ] デザインガイドラインに基づいたモバイルフレンドリーな入力画面
- [ ] Task: 認証ロジックの実装 (Auth.js)
    - [ ] ログイン・ログアウト機能の作成
- [ ] Task: Conductor - User Manual Verification 'Phase 2: 認証機能の実装' (Protocol in workflow.md)

## Phase 3: スタッフ用ダッシュボード
- [ ] Task: ダッシュボード画面の実装
    - [ ] 研修一覧表示（カード形式、大きなボタン）
    - [ ] ステータス（未受講・完了）の視覚的表示
- [ ] Task: Conductor - User Manual Verification 'Phase 3: スタッフ用ダッシュボード' (Protocol in workflow.md)
