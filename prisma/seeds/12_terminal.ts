import { PrismaClient } from '@prisma/client'

export async function seedTerminal(prisma: PrismaClient) {
  const slug = 'terminal'
  const courseData = {
    slug,
    title: '看取り・ターミナルケア研修（2024年度）',
    description: '〜尊厳ある人生の最終段階を支えるために〜',
    introduction: `<div class="text-center px-4"><h2 class="text-xl lg:text-2xl font-black">「最期まで自分らしく」を支える</h2><p class="text-sm font-bold mt-4">死を待つ時間ではなく、今を生きる時間を支えるケアを学びます。</p></div>`,
    learningObjectives: `<div class="grid gap-3 px-4"><div class="p-4 bg-white border-2 rounded-2xl"><h4>1. 人生の最終段階の理解</h4><p class="text-xs">身体的・精神的変化とアセスメントを習得する。</p></div><div class="p-4 bg-white border-2 rounded-2xl"><h4>2. 意思決定支援の実践</h4><p class="text-xs">ACP（人生会議）の重要性を理解する。</p></div></div>`,
    badgeLabel: '看取り',
    badgeIcon: 'Heart',
  }

  const slidesData = [
    { title: "看取り・ターミナルケア研修", order: 0, content: `<div class="text-center space-y-6"><h2>看取り研修</h2><p>2024年度版</p><p>ケア・ラーニング・システム</p></div>` },
    { title: "はじめに：看取りとは何か？", order: 1, content: `<div class="px-4"><h4>「今を生きる」を支える</h4><p class="text-sm">最期までその人らしい尊厳を保てるよう寄り添うのが介護の役割です。</p></div>` },
    { title: "2024年度 厚労省ガイドラインの要旨", order: 2, content: `<div class="px-4"><h4>本人の意思を最優先に</h4><p class="text-sm">意思決定ができなくなる前に、ACP（人生会議）を重ねることが求められます。</p></div>` },
    { title: "看取りの3原則", order: 3, content: `<div class="px-4"><h4>尊厳・共感・連携</h4><p class="text-sm">苦痛を除き、孤独にさせず、多職種で支え抜きます。</p></div>` },
    { title: "ACP（人生会議）の重要性", order: 4, content: `<div class="px-4"><h4>繰り返される話し合い</h4><p class="text-sm">価値観は変わるもの。本人の「今」の思いを大切にします。</p></div>` },
    { title: "ターミナル期の身体的変化", order: 5, content: `<div class="px-4"><h4>自然な経過を理解する</h4><p class="text-sm">食事量の低下、睡眠時間の増大。これらは生命の自然な終わりへの準備です。</p></div>` },
    { title: "身体的苦痛の緩和1：疼痛管理", order: 6, content: `<div class="px-4"><h4>痛みを我慢させない</h4><p class="text-sm">医療職と連携し、表情や動作から痛みをアセスメントします。</p></div>` },
    { title: "身体的苦痛の緩和2：呼吸・口渇", order: 7, content: `<div class="px-4"><h4>不快感を取り除く</h4><p class="text-sm">加湿や口腔ケア、楽な体位の工夫で苦しさを和らげます。</p></div>` },
    { title: "精神的苦痛へのケア", order: 8, content: `<div class="px-4"><h4>孤独と不安への寄り添い</h4><p class="text-sm">「そばにいる」こと。手を握る、声をかける。その存在が癒やしになります。</p></div>` },
    { title: "スピリチュアルな痛み", order: 9, content: `<div class="px-4"><h4>人生の意味を肯定する</h4><p class="text-sm">過去の思い出を聴き、その方の人生の価値を共に認めます。</p></div>` },
    { title: "死が近づいた時のサイン", order: 10, content: `<div class="px-4"><h4>臨終の前兆を知る</h4><p class="text-sm">呼吸のリズムの変化、手足の冷え、意識の低下を冷静に見守ります。</p></div>` },
    { title: "ご家族への支援1：心の準備", order: 11, content: `<div class="px-4"><h4>「看取って良かった」のために</h4><p class="text-sm">経過を丁寧に伝え、最期の瞬間に立ち会えるようサポートします。</p></div>` },
    { title: "ご家族への支援2：グリーフケア", order: 12, content: `<div class="px-4"><h4>悲しみに伴走する</h4><p class="text-sm">死別後の喪失感に寄り添い、これまでの介護を肯定する言葉をかけます。</p></div>` },
    { title: "多職種連携：看取りのチーム", order: 13, content: `<div class="px-4"><h4>医師・看護師・介護職の和</h4><p class="text-sm">24時間体制での情報共有と、ケアの方針一致が不可欠です。</p></div>` },
    { title: "死後の処置（エンゼルケア）", order: 14, content: `<div class="px-4"><h4>最期のおめかし</h4><p class="text-sm">その人らしい装いを整え、ご家族と共に感謝を込めて行います。</p></div>` },
    { title: "緊急時対応と看取りの方針", order: 15, content: `<div class="px-4"><h4>DNAR（延命拒否）の確認</h4><p class="text-sm">急変時に慌てないよう、搬送するかしないかの意思を共有します。</p></div>` },
    { title: "食事と水分の考え方", order: 16, content: `<div class="px-4"><h4>「無理強い」しない優しさ</h4><p class="text-sm">飲めない・食べられないことは、身体が楽になろうとする機能です。</p></div>` },
    { title: "口腔ケアの継続的意義", order: 17, content: `<div class="px-4"><h4>最期まで口をきれいに</h4><p class="text-sm">感染症予防だけでなく、口の渇きによる苦痛を最小限にします。</p></div>` },
    { title: "介護職自身の心のセルフケア", order: 18, content: `<div class="px-4"><h4>燃え尽きを防ぐ</h4><p class="text-sm">一人の死を全員で共有し、感情を吐き出せる環境を作ります。</p></div>` },
    { title: "宗教・文化への配慮", order: 19, content: `<div class="px-4"><h4>多様な死生観を尊重する</h4><p class="text-sm">本人の信条に基づいた環境や儀式を可能な限り尊重します。</p></div>` },
    { title: "アロマ・音楽療法の活用", order: 20, content: `<div class="px-4"><h4>五感に訴える安らぎ</h4><p class="text-sm">好きな音楽や香りで、リラックスできる空間を演出します。</p></div>` },
    { title: "事例1：意思が揺れるご家族への対応", order: 21, content: `<div class="px-4"><h4>揺れを受け止める</h4><p class="text-sm">迷うのは愛情の証。正解を急かさず、常に傾聴します。</p></div>` },
    { title: "事例2：夜間の静かな旅立ち", order: 22, content: `<div class="px-4"><h4>一人にさせない体制</h4><p class="text-sm">巡回の強化と、速やかな医師・家族への連絡手順を確認。</p></div>` },
    { title: "満足感：尊厳あるフィナーレ", order: 23, content: `<div class="px-4"><h4>プロとしての誇り</h4><p class="text-sm">「ここで最期を迎えられて良かった」と言われるケアを。</p></div>` },
    { title: "まとめとテスト案内", order: 24, content: `<div class="text-center"><h4>講義セッション終了</h4><p>理解度テスト（10問）へ進みましょう。</p></div>` }
  ]

  const questionsData = [
    { text: '本人が望む医療やケアについて、前もって話し合い共有するプロセスを何というか？', explanation: 'ACP（アドバンス・ケア・プランニング）と呼ばれ、日本語では「人生会議」と愛称されています。', order: 1, choices: { create: [{ text: 'ACP（人生会議）', isCorrect: true }, { text: 'BCP（業務継続計画）', isCorrect: false }, { text: 'SBAR（状況報告）', isCorrect: false }] } },
    { text: '看取り期において、食欲や水分摂取量が低下することへの見解として適切なものは？', explanation: '身体が自然に終わりへ向かう準備であり、無理な摂取は逆に苦痛（むくみ、喘鳴等）を招くことがあります。', order: 2, choices: { create: [{ text: '身体の自然な準備であり、無理強いしない', isCorrect: true }, { text: '無理にでも食べさせないと衰弱する', isCorrect: false }, { text: '点滴で無理やり水分を補給すべきである', isCorrect: false }] } },
    { text: 'ターミナル期における身体的苦痛（痛み）への対応として、介護職がすべきことは？', explanation: '表情や動作から痛みをアセスメントし、速やかに医療職へ報告して緩和を図ることが重要です。', order: 3, choices: { create: [{ text: '医療職と連携し、痛みの緩和を最優先する', isCorrect: true }, { text: '「年齢のせいだから」と様子を見る', isCorrect: false }, { text: '本人が訴えるまで放置する', isCorrect: false }] } },
    { text: '死が近づいた際に見られる、不規則で顎を動かして呼吸する状態を何というか？', explanation: '「下顎呼吸（かがくこきゅう）」と呼ばれ、臨終が近い重要なサインの一つです。', order: 4, choices: { create: [{ text: '下顎呼吸', isCorrect: true }, { text: '深呼吸', isCorrect: false }, { text: '腹式呼吸', isCorrect: false }] } },
    { text: 'ご家族が死別の悲しみを乗り越えられるよう支援することを何というか？', explanation: '「グリーフケア（悲嘆のケア）」と呼ばれ、看取り後も続く大切な支援の一部です。', order: 5, choices: { create: [{ text: 'グリーフケア', isCorrect: true }, { text: 'スキンケア', isCorrect: false }, { text: 'フットケア', isCorrect: false }] } },
    { text: '延命治療を行わない（蘇生措置を拒否する）という事前の意思表示を何というか？', explanation: 'DNAR（Do Not Attempt Resuscitation）と呼ばれ、事前にチームで共有しておく必要があります。', order: 6, choices: { create: [{ text: 'DNAR', isCorrect: true }, { text: 'AED', isCorrect: false }, { text: 'CPR', isCorrect: false }] } },
    { text: '死後の処置（エンゼルケア）の目的として、最も適切なものはどれか？', explanation: '本人の尊厳を守るとともに、ご家族が死を受け入れる心の準備を支える大切な儀式です。', order: 7, choices: { create: [{ text: '本人の尊厳保持と家族の心の準備を支える', isCorrect: true }, { text: '単なる遺体の清掃作業である', isCorrect: false }, { text: '法的な義務を果たすためだけに行う', isCorrect: false }] } },
    { text: 'ターミナル期の口腔ケアについて、適切な考え方はどれか？', explanation: '感染予防だけでなく、口の中の渇き（口渇感）による不快感を和らげるために重要です。', order: 8, choices: { create: [{ text: '口渇感を和らげるために継続する', isCorrect: true }, { text: 'もう食べないので必要ない', isCorrect: false }, { text: '危ないので一切行ってはいけない', isCorrect: false }] } },
    { text: '利用者が亡くなった後の、介護職員自身のメンタルケアについて正しいものは？', explanation: '看取りは職員にも大きな心理的影響を与えるため、チームで感情を共有し支え合うことが必要です。', order: 9, choices: { create: [{ text: 'チームで感情を共有し、支え合うべきである', isCorrect: true }, { text: 'プロなら悲しんではいけない', isCorrect: false }, { text: 'すぐに忘れて次の仕事に集中すべきである', isCorrect: false }] } },
    { text: '看取り介護において、介護職が果たすべき最も重要な「非言語」的ケアはどれか？', explanation: '言葉がなくても、そばにいて手を握る、温かい眼差しを向けることが、最大の安心感を与えます。', order: 10, choices: { create: [{ text: 'そばに寄り添い、手を握るなどの安心感', isCorrect: true }, { text: 'テキパキと事務的に作業を終わらせること', isCorrect: false }, { text: '離れた場所で見守り続けること', isCorrect: false }] } }
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
