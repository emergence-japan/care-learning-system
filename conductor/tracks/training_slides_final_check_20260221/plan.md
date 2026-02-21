# 実装計画: 研修スライドの最終確認 (training_slides_final_check)

## フェーズ 1: ID要件（マスターフォーマット）の定義と共通基準の策定
確認の指針となる「合格基準」を明文化し、全科目で統一された品質を保証するフェーズ。

- [ ] Task: ID要件定義書の作成（マスターフォーマットの明文化）
    - [ ] 高齢者虐待防止研修（01_abuse.ts）をベースに、デザイン、枚数、構成の基準をドキュメント化
- [ ] Task: 検証用チェックリストの作成
    - [ ] 厚労省要件、ID準拠、テスト品質、レイアウトの各項目を網羅したリストの準備
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## フェーズ 2: 全13科目の順次検証と修正（セクションA: 権利擁護・安全管理系）
主要な法定研修科目を1つずつ目視確認し、ソースコード（シードファイル）を直接修正するフェーズ。

- [ ] Task: 01_abuse.ts（高齢者虐待防止）の最終確認と修正
- [ ] Task: 02_dementia.ts（認知症ケア）の最終確認と修正
- [ ] Task: 03_infection.ts（感染症対策）の最終確認と修正
- [ ] Task: 04_accident.ts（事故発生防止）の最終確認と修正
- [ ] Task: 05_emergency.ts（緊急時対応）の最終確認と修正
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## フェーズ 3: 全13科目の順次検証と修正（セクションB: 倫理・プライバシー・運営管理系）
残りの科目を同様の手順で検証・修正するフェーズ。

- [ ] Task: 06_privacy.ts（個人情報保護）の最終確認と修正
- [ ] Task: 07_ethics.ts（倫理・法令遵守）の最終確認と修正
- [ ] Task: 08_etiquette.ts（接遇・マナー）の最終確認と修正
- [ ] Task: 09_disaster.ts（災害対策・BCP）の最終確認と修正
- [ ] Task: 10_prevention.ts（身体拘束廃止）の最終確認と修正
- [ ] Task: 11_medical.ts（医療的ケア）の最終確認と修正
- [ ] Task: 12_terminal.ts（看取りケア）の最終確認と修正
- [ ] Task: 13_mental.ts（メンタルヘルス）の最終確認と修正
- [ ] Task: 15_harassment.ts（ハラスメント対策）の最終確認と修正
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## フェーズ 4: 最終的な表示確認と品質保証
すべての修正がDBに反映され、実機（PC/スマホ）で正しく表示されることを確認するフェーズ。

- [ ] Task: 全科目のDBシード再実行と整合性確認
- [ ] Task: モバイル実機環境でのランダムサンプリング表示確認
- [ ] Task: 最終的な誤字脱字、リンク切れ、テスト動作の総点検
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
