# Implementation Plan: 法人管理と法人本部ダッシュボードの実装

## Phase 1: 組織階層の再構築 [checkpoint: 7727bd6]
- [x] Task: Corporation モデルの追加と関連付け (1405bc2)
    - [ ] `schema.prisma` の更新（Corporation モデル、Role に HQ 追加）
    - [ ] Facility および User と Corporation の紐付け（User に corporationId 追加）
    - [ ] マイグレーションの実行
- [x] Task: シードデータの再整備 (1405bc2)
    - [ ] 法人 -> 複数施設 -> 管理者・スタッフ という階層構造のデータ作成
- [x] Task: Conductor - User Manual Verification 'Phase 1: 組織階層の再構築' (7727bd6)

## Phase 2: 法人本部ダッシュボード
- [~] Task: 法人本部用ページ `/hq` の作成
    - [ ] `src/app/hq/page.tsx` の実装
    - [ ] 法人内の施設別進捗一覧（カードリスト）の表示
- [ ] Task: 本部から各施設へのドリルダウン機能
    - [ ] 施設を選択して詳細を表示する機能
- [ ] Task: ロール別の初期遷移先（リダイレクト）調整
    - [ ] HQ ロールはログイン後に `/hq` へ自動遷移
- [ ] Task: Conductor - User Manual Verification 'Phase 2: 法人本部ダッシュボード'
