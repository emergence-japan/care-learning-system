# Implementation Plan: プロジェクトの基盤構築と認証・ダッシュボードの基本実装

## Phase 1: 環境構築と基盤整備 [checkpoint: e9e460e]
- [x] Task: Next.js プロジェクトの初期化と構成 (f0e189a)
    - [ ] npx create-next-app によるプロジェクト作成
    - [ ] Tailwind CSS, Shadcn/ui の初期設定
- [x] Task: データベーススキーマの定義 (Prisma) (829cfad)
    - [ ] User, Course, Enrollment モデルの作成
    - [ ] 初期データの流し込み (Seed)
- [x] Task: Conductor - User Manual Verification 'Phase 1: 環境構築と基盤整備' (Protocol in workflow.md) (e9e460e)

## Phase 2: 認証機能の実装 [checkpoint: d84280d]
- [x] Task: ログイン画面の構築 (UIのみ) (5ac15ca)
    - [ ] デザインガイドラインに基づいたモバイルフレンドリーな入力画面
- [x] Task: 認証ロジックの実装 (Auth.js) (6c459e3)
    - [ ] ログイン・ログアウト機能の作成
- [x] Task: Conductor - User Manual Verification 'Phase 2: 認証機能の実装' (Protocol in workflow.md) (d84280d)

## Phase 3: スタッフ用ダッシュボード
- [~] Task: ダッシュボード画面の実装
    - [ ] 研修一覧表示（カード形式、大きなボタン）
    - [ ] ステータス（未受講・完了）の視覚的表示
- [ ] Task: Conductor - User Manual Verification 'Phase 3: スタッフ用ダッシュボード' (Protocol in workflow.md)
