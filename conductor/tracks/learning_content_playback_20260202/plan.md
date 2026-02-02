# Implementation Plan: 研修詳細画面と動画視聴機能の実装

## Phase 1: 研修詳細画面の基盤 [checkpoint: ac57b67]
- [x] Task: 研修詳細ページの動的ルーティング実装 (565fa92)
    - [ ] `src/app/courses/[id]/page.tsx` の作成
    - [ ] ダッシュボードからの遷移リンク設定
- [x] Task: 動画プレイヤーコンポーネントの構築 (ee257ad)
    - [ ] YouTube埋め込み等の基本プレイヤー実装
- [x] Task: Conductor - User Manual Verification 'Phase 1: 研修詳細画面の基盤' (ac57b67)

## Phase 2: 受講ステータス管理
- [x] Task: 受講開始・完了の Server Actions 実装 (854a037)
    - [ ] ステータスを `IN_PROGRESS` や `COMPLETED` に更新するロジック
- [x] Task: 完了ボタンのUIと連携 (854a037)
    - [ ] 視聴後の完了報告機能
- [ ] Task: Conductor - User Manual Verification 'Phase 2: 受講ステータス管理'
