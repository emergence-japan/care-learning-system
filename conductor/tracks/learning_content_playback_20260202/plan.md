# Implementation Plan: 研修詳細画面と動画視聴機能の実装

## Phase 1: 研修詳細画面の基盤
- [~] Task: 研修詳細ページの動的ルーティング実装
    - [ ] `src/app/courses/[id]/page.tsx` の作成
    - [ ] ダッシュボードからの遷移リンク設定
- [ ] Task: 動画プレイヤーコンポーネントの構築
    - [ ] YouTube埋め込み等の基本プレイヤー実装
- [ ] Task: Conductor - User Manual Verification 'Phase 1: 研修詳細画面の基盤'

## Phase 2: 受講ステータス管理
- [ ] Task: 受講開始・完了の Server Actions 実装
    - [ ] ステータスを `IN_PROGRESS` や `COMPLETED` に更新するロジック
- [ ] Task: 完了ボタンのUIと連携
    - [ ] 視聴後の完了報告機能
- [ ] Task: Conductor - User Manual Verification 'Phase 2: 受講ステータス管理'
