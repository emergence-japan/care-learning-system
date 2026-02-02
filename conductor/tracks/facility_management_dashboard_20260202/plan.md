# Implementation Plan: 施設管理と管理者ダッシュボードの実装

## Phase 1: データベース拡張とマルチテナント化 [checkpoint: 21ea395]
- [x] Task: Facility モデルの追加と User モデルとの紐付け (75796bf)
    - [ ] `schema.prisma` の更新（Facility モデル作成、User に facilityId 追加）
    - [ ] マイグレーションの実行
- [x] Task: シードデータの多層化 (75796bf)
    - [ ] 複数の施設と、それぞれの施設に属する管理者・スタッフのデータ作成
- [x] Task: Conductor - User Manual Verification 'Phase 1: データベース拡張とマルチテナント化' (21ea395)

## Phase 2: 管理者ダッシュボードの構築
- [~] Task: 管理者用ページ `/admin` の作成
    - [ ] `src/app/admin/page.tsx` の実装
    - [ ] ログイン後のロールに基づいたリダイレクト処理
- [ ] Task: 所属スタッフの受講状況一覧表示
    - [ ] スタッフ名、研修タイトル、ステータスを並べたテーブル表示
- [ ] Task: 進捗率（パーセンテージ）の算出と表示
    - [ ] 施設全体の「完了数 / 全割り当て数」の集計
- [ ] Task: Conductor - User Manual Verification 'Phase 2: 管理者ダッシュボードの構築'
