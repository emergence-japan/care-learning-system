# 研修スライド最終品質チェック・マスター化計画 (2026/02/21)

全15科目の研修コンテンツを、厚労省要件および「01_abuse.ts」基準の高品質デザイン・学習設計に統一し、PC画面でのスクロールレス化を完遂する。

## フェーズ 1: マスターフォーマットのDNA分析と基準策定 [DONE]
「最高傑作」である 01_abuse.ts の構造を詳細に分解し、チェックリスト化する。

- [x] Task: master_analysis.md の作成（デザイン・ID要素の抽出） [00356ff]
- [x] Task: master_checklist.md の作成（自動テスト/目視用） [00356ff]
- [x] Task: 検証用テストスクリプトの作成 (src/test/master-standardization.test.ts) [00356ff]

## フェーズ 2: 全15科目の順次検証と「マスター化」修正（セクションA） [DONE]
主要な法定研修科目を1つずつ目視確認し、マスターの構造に適合させるフェーズ。

- [x] Task: 01_abuse.ts（高齢者虐待防止）の最終確認（基準としての確定） [00356ff]
- [x] Task: 02_dementia.ts（認知症ケア）のマスター準拠修正 [189efa4]
- [x] Task: 03_infection.ts（感染症対策）のマスター準拠修正 [9369419]
- [x] Task: 04_accident.ts（事故発生防止）のマスター準拠修正 [aeee100]
- [x] Task: 05_emergency.ts（緊急時対応）のマスター準拠修正 [6cc0bd4]
- [x] Task: 10_prevention.ts（身体拘束廃止）のマスター準拠修正 [7372ee0]
- [x] Task: 14_prevention.ts（介護予防）のマスター準拠修正 [f781ac6]

## フェーズ 3: 全15科目の順次検証と「マスター化」修正（セクションB） [DONE]
残りの科目を同様の手順で、デザインとIDの両面からアップグレードするフェーズ。

- [x] Task: 06_privacy.ts（個人情報保護）のマスター準拠修正 [86583ce]
- [x] Task: 07_ethics.ts（倫理・法令遵守）のマスター準拠修正 [7372ee0]
- [x] Task: 08_etiquette.ts（接遇・マナー）のマスター準拠修正 [7372ee0]
- [x] Task: 09_disaster.ts（災害対策・BCP）のマスター準拠修正 [7372ee0]
- [x] Task: 11_medical.ts（医療的ケア）のマスター準拠修正 [6ea7acb]
- [x] Task: 12_terminal.ts（看取りケア）のマスター準拠修正 [a6e8d0c]
- [x] Task: 13_mental.ts（精神的ケア）のマスター準拠修正 [7372ee0]
- [x] Task: 15_harassment.ts（ハラスメント対策）のマスター準拠修正 [7372ee0]

## フェーズ 4: 最終品質保証とDB統合 [IN PROGRESS]
全科目がマスター基準を満たしていることを最終確認し、本番用シードとして統合する。

- [x] Task: 全科目一括テスト実行 (Standardization Test) [7372ee0]
- [x] Task: 全科目一括シード実行 (Full Seed) [7372ee0]
- [ ] Task: スライドプレイヤーでの全科目最終目視（スクロール有無）
- [ ] Task: 完了報告
