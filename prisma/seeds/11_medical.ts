import { PrismaClient } from '@prisma/client'

export async function seedMedical(prisma: PrismaClient) {
  const slug = 'medical'
  const courseData = {
    slug,
    title: '医療的ケア研修（2024年度）',
    description: '〜命を繋ぐ観察眼と異常の早期発見〜',
    introduction: `<div class="text-center px-4"><h2 class="text-xl lg:text-2xl font-black">利用者の「静かな変化」を見逃さない</h2><p class="text-sm font-bold mt-4">バイタルに現れない小さなサインが救命の鍵です。</p></div>`,
    learningObjectives: `<div class="grid gap-3 px-4"><div class="p-4 bg-white border-2 rounded-2xl"><h4>1. バイタルの正確な測定</h4><p class="text-xs">正常値と異常の境界線を習得する。</p></div><div class="p-4 bg-white border-2 rounded-2xl"><h4>2. 医療的ケアの法的遵守</h4><p class="text-xs">吸引・経管栄養の正しい手順を学ぶ。</p></div></div>`,
    badgeLabel: '医療連携',
    badgeIcon: 'Activity',
  }

  const slidesData = [
    { title: "医療的ケア研修", order: 0, content: `<div class="text-center space-y-6"><h2>医療的ケア研修</h2><p>2024年度版</p><p>ケア・ラーニング・システム</p></div>` },
    { title: "救命の連鎖：介護職の役割", order: 1, content: `<div class="px-4"><h4>あなたが救命の第一走者です</h4><p class="text-sm">医療職へ繋ぐための「観察」が最も重要です。</p></div>` },
    { title: "バイタルサイン1：体温", order: 2, content: `<div class="px-4"><h4>高齢者の「低体温」に注意</h4><p class="text-sm">35度台は免疫低下や重症化のサインです。</p></div>` },
    { title: "バイタルサイン2：血圧", order: 3, content: `<div class="px-4"><h4>変動の理由を考える</h4><p class="text-sm">入浴後や食後の急降下は転倒リスクです。</p></div>` },
    { title: "バイタルサイン3：脈拍・呼吸", order: 4, content: `<div class="px-4"><h4>「いつもと違う」リズム</h4><p class="text-sm">不整脈や浅い呼吸は急変の前兆です。</p></div>` },
    { title: "ジャパン・コーマ・スケール", order: 5, content: `<div class="px-4"><h4>意識レベルの簡易判断</h4><p class="text-sm">呼びかけへの反応を3段階で評価します。</p></div>` },
    { title: "喀痰吸引の実践手順", order: 6, content: `<div class="px-4"><h4>15秒以内の原則</h4><p class="text-sm">低酸素を防ぐため、迅速かつ丁寧に行います。</p></div>` },
    { title: "経管栄養の安全管理", order: 7, content: `<div class="px-4"><h4>注入前の「確認」が命</h4><p class="text-sm">指示通りの内容、温度、体位を確認します。</p></div>` },
    { title: "誤嚥・逆流を防ぐ体位", order: 8, content: `<div class="px-4"><h4>30度〜60度の挙上</h4><p class="text-sm">注入後も一定時間の座位を保持します。</p></div>` },
    { title: "脱水症の初期サイン", order: 9, content: `<div class="px-4"><h4>皮膚と口腔の乾燥</h4><p class="text-sm">脇の下が乾いていたら脱水の疑いです。</p></div>` },
    { title: "むくみ（浮腫）の観察", order: 10, content: `<div class="px-4"><h4>心機能・腎機能の鏡</h4><p class="text-sm">靴下の跡が消えない時は報告しましょう。</p></div>` },
    { title: "排泄物の異常発見", order: 11, content: `<div class="px-4"><h4>色と形の変化</h4><p class="text-sm">血尿、黒色便、白っぽい便は緊急信号です。</p></div>` },
    { title: "高齢者の感染症と熱", order: 12, content: `<div class="px-4"><h4>熱が出ない肺炎</h4><p class="text-sm">活気がない、食欲がない「だけ」でも注意。</p></div>` },
    { title: "点滴・カテーテルの管理", order: 13, content: `<div class="px-4"><h4>屈曲と漏れのチェック</h4><p class="text-sm">針刺し事故や自己抜去を未然に防ぎます。</p></div>` },
    { title: "インスリン・血糖管理", order: 14, content: `<div class="px-4"><h4>低血糖の恐怖</h4><p class="text-sm">冷や汗、震えがあれば即座に糖分補給へ。</p></div>` },
    { title: "ストーマ（人工肛門）ケア", order: 15, content: `<div class="px-4"><h4>皮膚の清浄と観察</h4><p class="text-sm">周囲の赤みやただれを早期に発見します。</p></div>` },
    { title: "口腔ケアと全身疾患", order: 16, content: `<div class="px-4"><h4>誤嚥性肺炎の最大防御</h4><p class="text-sm">口腔内の細菌を減らすことが命を救います。</p></div>` },
    { title: "報告の技術：SBAR", order: 17, content: `<div class="px-4"><h4>状況・背景・評価・提案</h4><p class="text-sm">医療職が判断しやすい順序で伝えます。</p></div>` },
    { title: "経過記録の客観性", order: 18, content: `<div class="px-4"><h4>数値と事実を記す</h4><p class="text-sm">「辛そう」ではなく「呼吸数◯回」と記載。</p></div>` },
    { title: "多職種連携の要", order: 19, content: `<div class="px-4"><h4>看護師との信頼関係</h4><p class="text-sm">日常の「些細な気づき」を共有しましょう。</p></div>` },
    { title: "急変時の救急セット", order: 20, content: `<div class="px-4"><h4>受診バッグの準備</h4><p class="text-sm">保険証、お薬手帳、記録をまとめます。</p></div>` },
    { title: "事例：バイタルは正常でも", order: 21, content: `<div class="px-4"><h4>「何かが変」を信じる</h4><p class="text-sm">直感を医療職へ伝え、精査を仰ぎます。</p></div>` },
    { title: "事例：吸引中の異変", order: 22, content: `<div class="px-4"><h4>即座に中止し報告</h4><p class="text-sm">チアノーゼや不整脈があれば救命優先です。</p></div>` },
    { title: "満足感：あなたの眼が命を守る", order: 23, content: `<div class="px-4"><h4>プロとしての誇り</h4><p class="text-sm">あなたの観察が、一人の明日を繋ぎます。</p></div>` },
    { title: "まとめとテスト案内", order: 24, content: `<div class="text-center"><h4>講義セッション終了</h4><p>理解度テスト（10問）へ進みましょう。</p></div>` }
  ]

  const questionsData = [
    { text: '高齢者のバイタルサインにおいて、重症化のサインとされる体温はどれか？', explanation: '35度台の低体温は、感染症の重症化や免疫力の著しい低下を示す危険なサインです。', order: 1, choices: { create: [{ text: '35度台（低体温）', isCorrect: true }, { text: '36.5度', isCorrect: false }, { text: '37.0度', isCorrect: false }] } },
    { text: '喀痰吸引を行う際、1回の吸引時間の限度として適切なものはどれか？', explanation: '低酸素状態を防ぐため、1回の吸引は15秒以内で行うのが原則です。', order: 2, choices: { create: [{ text: '15秒以内', isCorrect: true }, { text: '1分以内', isCorrect: false }, { text: '出なくなるまで', isCorrect: false }] } },
    { text: '経管栄養の注入を行う際、誤嚥や逆流を防ぐための適切な体位はどれか？', explanation: '上半身を30度〜60度程度起こした状態（ファウラー位）で注入します。', order: 3, choices: { create: [{ text: '上半身を30〜60度挙上する', isCorrect: true }, { text: '完全に仰向けにする', isCorrect: false }, { text: 'うつ伏せにする', isCorrect: false }] } },
    { text: '高齢者の脱水のサインとして、最も気づきやすい身体的変化はどれか？', explanation: '脇の下の乾燥や、口腔内の粘膜の乾きは脱水の重要なサインです。', order: 4, choices: { create: [{ text: '脇の下の乾燥', isCorrect: true }, { text: '顔のむくみ', isCorrect: false }, { text: '多汗', isCorrect: false }] } },
    { text: '医療職へ状況を報告する際に用いられる、情報の標準的な伝達手法（SBAR）の意味は？', explanation: 'Situation（状況）、Background（背景）、Assessment（評価）、Recommendation（提案）の頭文字です。', order: 5, choices: { create: [{ text: '状況・背景・評価・提案', isCorrect: true }, { text: '氏名・年齢・性別・住所', isCorrect: false }, { text: '食事・排泄・睡眠・入浴', isCorrect: false }] } },
    { text: 'インスリン投与中の利用者が、冷や汗や手の震えを訴えた場合に疑うべき状態は？', explanation: '低血糖の典型的な初期症状であり、放置すると意識障害を招く恐れがあります。', order: 6, choices: { create: [{ text: '低血糖', isCorrect: true }, { text: '高血圧', isCorrect: false }, { text: '脱水症', isCorrect: false }] } },
    { text: 'ジャパン・コーマ・スケール（JCS）において、「呼びかけで目を覚ます」状態は何桁か？', explanation: 'JCSの2桁（10、20、30）は、刺激（呼びかけや痛み）で目を覚ます状態を指します。', order: 7, choices: { create: [{ text: '2桁（10〜30）', isCorrect: true }, { text: '1桁（1〜3）', isCorrect: false }, { text: '3桁（100〜300）', isCorrect: false }] } },
    { text: '介護職が経過記録を書く際、最も重要とされる姿勢はどれか？', explanation: '「辛そう」などの主観を避け、数値や具体的な動作などの客観的事実を記すことが重要です。', order: 8, choices: { create: [{ text: '客観的事実を正確に記す', isCorrect: true }, { text: '自分の感想を中心に書く', isCorrect: false }, { text: 'きれいな文章で書く', isCorrect: false }] } },
    { text: '口腔ケアが全身疾患の予防に繋がる最大の理由は何か？', explanation: '口腔内の細菌を減らすことで、誤嚥性肺炎の発生リスクを大幅に下げることができます。', order: 9, choices: { create: [{ text: '誤嚥性肺炎を防ぐため', isCorrect: true }, { text: '虫歯を治すため', isCorrect: false }, { text: '味覚を鋭くするため', isCorrect: false }] } },
    { text: '利用者の浮腫（むくみ）を発見した際、観察すべきポイントとして正しいものは？', explanation: '靴下の跡が消えない、指で押して戻らないなどの強さを確認し、医療職へ伝えます。', order: 10, choices: { create: [{ text: '指で押して跡が戻るかどうか', isCorrect: true }, { text: '皮膚の色が明るいかどうか', isCorrect: false }, { text: '筋肉がついているかどうか', isCorrect: false }] } }
  ]

  let course = await prisma.course.findUnique({ where: { slug } })

  if (course) {
    await prisma.choice.deleteMany({ where: { question: { courseId: course.id } } })
    await prisma.question.deleteMany({ where: { courseId: course.id } })
    await prisma.slide.deleteMany({ where: { courseId: course.id } })
    
    course = await prisma.course.update({
      where: { id: course.id },
      data: {
        ...courseData,
        slides: { create: slidesData },
        questions: { create: questionsData }
      }
    })
  } else {
    course = await prisma.course.create({
      data: {
        ...courseData,
        slides: { create: slidesData },
        questions: { create: questionsData }
      }
    })
  }

  return course
}
