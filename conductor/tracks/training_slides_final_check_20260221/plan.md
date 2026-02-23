# 実装計画: 研修スライドの最終確認 (training_slides_final_check)

## フェーズ 1: マスターフォーマットのDNA分析と基準策定 [checkpoint: f6bb6ad]
「01_abuse.ts」の成功要因を言語化し、横展開のための武器にするフェーズ。

- [x] Task: 01_abuse.ts のHTML構造・ID要素の完全分析 [4303c59]
    - [x] 各コンポーネント（導入、目標、重要事項、ケーススタディ等）のHTMLテンプレート化
    - [x] ARCS/ガニェの適用ポイントの明文化
- [x] Task: 検証用マスターチェックリストの更新 [d4c33b5]
    - [x] ID（フック、事例、整合性）とデザイン（HTML構造、レスポンシブ）の2軸で作成
- [x] Task: 14_prevention.ts の「介護予防」への差し替え（マスター準拠） [f781ac6]
    - [x] マスターのHTML構造をベースに、介護予防のテキストを流し込み、事例とテストを構築
- [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md) [checkpoint: f6bb6ad]

## フェーズ 2: 全15科目の順次検証と「マスター化」修正（セクションA）
主要な法定研修科目を1つずつ目視確認し、マスターの構造に適合させるフェーズ。

- [~] Task: 01_abuse.ts（高齢者虐待防止）の最終確認（基準としての確定）
- [ ] Task: 02_dementia.ts（認知症ケア）のマスター準拠修正
- [ ] Task: 03_infection.ts（感染症対策）のマスター準拠修正
- [ ] Task: 04_accident.ts（事故発生防止）のマスター準拠修正
- [ ] Task: 05_emergency.ts（緊急時対応）のマスター準拠修正
- [ ] Task: 10_prevention.ts（身体拘束廃止）のマスター準拠修正
- [ ] Task: 14_prevention.ts（介護予防）のマスター準拠修正
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## フェーズ 3: 全15科目の順次検証と「マスター化」修正（セクションB）
残りの科目を同様の手順で、デザインとIDの両面からアップグレードするフェーズ。

- [ ] Task: 06_privacy.ts（個人情報保護）のマスター準拠修正
- [ ] Task: 07_ethics.ts（倫理・法令遵守）のマスター準拠修正
- [ ] Task: 08_etiquette.ts（接遇・マナー）のマスター準拠修正
- [ ] Task: 09_disaster.ts（災害対策・BCP）のマスター準拠修正
- [ ] Task: 11_medical.ts（医療的ケア）のマスター準拠修正
- [ ] Task: 12_terminal.ts（看取りケア）のマスター準拠修正
- [ ] Task: 13_mental.ts（精神的ケア）のマスター準拠修正
- [ ] Task: 15_harassment.ts（ハラスメント対策）のマスター準拠修正
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## フェーズ 4: 最終品質保証とDB統合
すべての修正がDBに反映され、プロフェッショナルな一貫性が保たれているかを確認する。

- [ ] Task: 全科目のDBシード再実行と整合性確認
- [ ] Task: PC/スマホ実機での全スライド・全テストの最終巡回
- [ ] Task: 「IDに基づいたLMS」としての品質宣言（最終チェック）
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
