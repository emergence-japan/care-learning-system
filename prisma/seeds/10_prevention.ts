import { PrismaClient } from '@prisma/client'

export async function seedPrevention(prisma: PrismaClient) {
  const slug = 'prevention'
  const courseData = {
    slug,
    title: '介護予防・要介護進行予防に関する研修',
    description: '2024年改正の自立支援・重度化防止要件に対応。フレイル予防から生活リハビリ技術までを網羅。',
    introduction: `
        <div class="space-y-8">
          <div class="flex items-center gap-4">
            <span class="h-1 w-12 bg-emerald-600 rounded-full"></span>
            <p class="text-emerald-600 font-black tracking-widest text-sm uppercase">Independence Support Hook</p>
          </div>
          <h2 class="text-4xl font-black text-slate-900 leading-tight">あなたの「親切」が、<br/>力を奪っていませんか？</h2>
          <div class="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
            <p>何でも手伝ってあげることが「良い介護」だと思っていませんか？<br/>先回りした介助は、利用者が本来持っている「生きる力」を<br/>少しずつ削り取ってしまいます。</p>
            <div class="p-8 bg-emerald-50/50 rounded-[2rem] border border-emerald-100 shadow-inner relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-emerald-100/30 rounded-bl-full"></div>
              <p class="relative z-10 font-medium italic">2024年度の法改正では「自立支援・重度化防止」がさらに重視されています。<br/>私たちの役割は、利用者が「自分の人生の主役」であり続けるための<br/>黒子になることです。</p>
            </div>
            <p>この研修では、廃用症候群を防ぎ、尊厳ある自立を支えるための<br/>「引き算の介護」を学びます。</p>
          </div>
        </div>
      `,
    learningObjectives: `
        <div class="grid grid-cols-1 gap-6 max-w-3xl mx-auto text-left">
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-emerald-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">1</div>
            <div>
              <h4 class="text-xl font-black text-slate-900 mb-2">フレイルと重度化防止の理解</h4>
              <p class="text-slate-500 leading-relaxed font-medium">身体・口腔・栄養の一体となった予防の重要性を理解し、<br/>ADL維持等加算等の公的要件に基づいたケアを実践できる。</p>
            </div>
          </div>
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-emerald-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">2</div>
            <div>
              <h4 class="text-xl font-black text-slate-900 mb-2">生活リハビリの実践技術</h4>
              <p class="text-slate-500 leading-relaxed font-medium">日常生活動作そのものをリハビリと捉え、<br/>利用者の意欲を引き出す「待ちの姿勢」を習得する。</p>
            </div>
          </div>
        </div>
      `,
    badgeLabel: '介護予防',
    badgeIcon: 'Trophy',
  }

  const slidesData = [
    { 
      title: '介護予防および要介護進行予防に関する研修', 
      order: 0, 
      content: `
        <div class="flex flex-col items-center text-center space-y-10">
          <div class="relative">
            <div class="absolute inset-0 bg-emerald-400 blur-3xl opacity-20 scale-150 animate-pulse"></div>
            <div class="relative bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 max-w-lg mx-auto">
              <div class="bg-emerald-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-8">Prevention Science</div>
              <h2 class="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                介護予防・重度化防止<br/>
                <span class="text-emerald-600 text-3xl">〜自立を支える黒子の技術〜</span>
              </h2>
            </div>
          </div>
          <div class="flex items-center justify-center gap-4 text-slate-400 font-black text-[10px] tracking-widest">
            <span class="h-px w-8 bg-slate-200"></span>
            CARE LEARNING SYSTEM
            <span class="h-px w-8 bg-slate-200"></span>
          </div>
        </div>
      ` 
    },
    { 
      title: '恐怖の「フレイル・サイクル」', 
      order: 1, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <div class="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black ring-1 ring-emerald-100">
            <span class="w-2 h-2 bg-emerald-600 rounded-full animate-ping"></span>
            FRAILTY CYCLE
          </div>
          <h4 class="text-3xl font-black text-slate-900 leading-tight">
            衰えは「連鎖」します。<br/>
            <span class="text-emerald-600 decoration-4 underline underline-offset-8">どこで食い止めるか</span>が勝負です
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl mx-auto pt-4">
            <div class="p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-sm hover:border-emerald-100 transition-colors">
              <p class="text-lg font-black text-slate-900 mb-3 text-center">負の連鎖</p>
              <p class="text-sm text-slate-500 font-bold leading-relaxed text-left">
                動かない → お腹が空かない → <br/>
                筋肉が減る（サルコペニア） → <br/>
                さらに動けなくなる。
              </p>
            </div>
            <div class="p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-sm hover:border-emerald-100 transition-colors">
              <p class="text-lg font-black text-slate-900 mb-3 text-center">社会的孤立</p>
              <p class="text-sm text-slate-500 font-bold leading-relaxed text-left">
                他者との交流が減ることで<br/>
                生活の意欲が低下し、<br/>
                身体的衰えを加速させます。
              </p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '2024年度改定の要：口腔と栄養', 
      order: 2, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <div class="flex flex-col items-center">
            <div class="bg-slate-100 px-6 py-1.5 rounded-full text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase mb-6">Core Integration</div>
            <h4 class="text-3xl font-black text-slate-900 leading-relaxed">
              「食べる力」が「歩く力」を作る
            </h4>
          </div>
          <div class="relative grid grid-cols-2 gap-px bg-slate-200 p-px rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl max-w-3xl mx-auto">
            <div class="p-10 bg-white space-y-4 text-center">
              <div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-black mx-auto text-xl shadow-sm">1</div>
              <p class="text-lg font-black text-slate-900">口腔管理</p>
              <p class="text-sm text-slate-400 leading-relaxed font-bold">
                「オーラルフレイル」の予防。<br/>
                噛む・飲み込む力を維持する
              </p>
            </div>
            <div class="p-10 bg-white space-y-4 text-center">
              <div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-black mx-auto text-xl shadow-sm">2</div>
              <p class="text-lg font-black text-slate-900">栄養管理</p>
              <p class="text-sm text-slate-400 leading-relaxed font-bold">
                低栄養の防止。<br/>
                筋肉の元となるタンパク質を摂取
              </p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '過剰介護という名の「廃用症候群」', 
      order: 3, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <div class="p-10 bg-blue-50 rounded-[3rem] border-2 border-blue-100 border-dashed relative shadow-inner max-w-3xl mx-auto">
            <div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-10 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase shadow-xl">Over-Care Risk</div>
            <h4 class="text-3xl font-black text-blue-900 mb-6">「親切心」がリハビリを妨げる</h4>
            <p class="text-lg text-blue-800 italic font-bold">
              スタッフが何でもやってしまうことで、<br/>
              利用者の持っている機能が急速に失われます。
            </p>
          </div>
          <div class="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl max-w-3xl mx-auto">
            <p class="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <span class="w-2 h-8 bg-blue-600 rounded-full"></span>今日から変える介助視点
            </p>
            <div class="grid grid-cols-2 gap-6">
              <div class="p-6 bg-slate-50 rounded-3xl">
                <p class="text-lg font-black text-slate-900 mb-2">× 100%全介助</p>
                <p class="text-sm text-slate-500 font-bold">効率を優先して、<br/>すべてスタッフがやる</p>
              </div>
              <div class="p-6 bg-slate-50 rounded-3xl ring-2 ring-blue-100">
                <p class="text-lg font-black text-blue-600 mb-2">○ 1%の自立支援</p>
                <p class="text-sm text-slate-500 font-bold">「最後の一口だけ自分で」<br/>「立ち上がる時だけ支える」</p>
              </div>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '意欲を引き出す「動機付け」の技術', 
      order: 4, 
      content: `
        <div class="p-12 bg-emerald-50 rounded-[3.5rem] border border-emerald-100 flex flex-col items-center text-center space-y-10 shadow-inner max-w-2xl mx-auto">
          <div class="w-24 h-24 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center font-black text-4xl text-emerald-600 shadow-emerald-100">Goal</div>
          <h4 class="text-3xl font-black text-emerald-900">「訓練」ではなく「楽しみ」を</h4>
          <p class="text-xl text-slate-600 font-bold leading-relaxed">
            「歩く練習をしましょう」ではなく、<br/>
            <span class="text-emerald-600 italic">「またお孫さんと散歩に行きませんか？」</span><br/>
            という、本人の「やりたいこと」にフォーカスした<br/>
            声かけが、脳と体を動かします。
          </p>
        </div>
      ` 
    },
    { 
      title: 'シミュレーション：待ちの姿勢', 
      order: 5, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center max-w-2xl mx-auto">
          <div class="p-10 bg-orange-50 border-2 border-orange-100 rounded-[3rem] shadow-sm">
            <p class="text-orange-900 text-2xl font-black leading-relaxed">
              利用者が自分で靴を履こうとしていますが、<br/>
              5分以上かかっています。どうしますか？
            </p>
          </div>
          <div class="grid grid-cols-1 gap-6 w-full">
            <div class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-center gap-8 opacity-60">
              <span class="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0">×</span>
              <p class="text-lg font-bold italic text-left">「遅れますよ！」と言って、<br/>無理やり履かせて移動させる</p>
            </div>
            <div class="p-8 bg-white border border-emerald-100 rounded-3xl shadow-2xl ring-2 ring-emerald-50 flex items-center gap-8">
              <span class="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shrink-0">○</span>
              <p class="text-lg font-black text-slate-900 leading-relaxed text-left">見守りを継続し、自立を促す。<br/>達成感を優先して時間を調整する。</p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: 'まとめ：尊厳ある「自立」のために', 
      order: 6, 
      content: `
        <div class="flex flex-col items-center text-center space-y-12">
          <div class="w-28 h-28 bg-emerald-600 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-emerald-200 rotate-3">
            <svg class="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 class="text-4xl font-black text-slate-900 leading-tight">
            介護予防とは、利用者の<br/>
            「自由」を守る活動です。
          </h3>
          <p class="text-slate-500 font-bold text-xl max-w-sm mx-auto leading-relaxed">
            私たちは利用者の「足」ではなく、<br/>
            自ら歩み出そうとする「心」を支える<br/>
            パートナーでありましょう。
          </p>
          <div class="pt-12 border-t border-slate-100 w-full max-w-xs mx-auto text-center">
            <p class="text-slate-400 font-black text-[10px] uppercase tracking-[0.5em]">End of Session</p>
          </div>
        </div>
      ` 
    }
  ]

  const questionsData = [
    { text: '活動量の低下により低栄養や筋力低下が連鎖する現象を何というか。', explanation: 'フレイル・サイクルと呼ばれます。早期に発見し、この連鎖を断ち切ることが重度化防止の鍵です。', order: 1, choices: { create: [{ text: 'フレイル・サイクル', isCorrect: true }, { text: 'パレート・サイクル', isCorrect: false }, { text: 'ワーク・ライフ・サイクル', isCorrect: false }] } },
    { text: 'スタッフが何でも手伝ってしまう「過剰介護」によって利用者の機能が低下することを何というか。', explanation: '廃用症候群（生活不活発病）と呼ばれます。親切心による過剰な手助けが、実は自立を妨げていることがあります。', order: 2, choices: { create: [{ text: '廃用症候群', isCorrect: true }, { text: '過活動症候群', isCorrect: false }, { text: '成長痛', isCorrect: false }] } },
    { text: '2024年度の介護報酬改定において、重度化防止のためにリハビリと一体的に推進すべき要素はどれか。', explanation: '口腔管理と栄養管理を、リハビリテーションや機能訓練と一体的に進めることが強く求められています。', order: 3, choices: { create: [{ text: '口腔管理と栄養管理', isCorrect: true }, { text: '居室の清掃と洗濯', isCorrect: false }, { text: 'レクリエーションの回数', isCorrect: false }] } },
    { text: '科学的介護情報システム（LIFE）において、ADL（日常生活動作）の改善を評価し加算に繋げる指標を何というか。', explanation: 'ADL利得（バーセルインデックス等の数値の変化）と呼ばれます。根拠に基づくケアの重要な指標です。', order: 4, choices: { create: [{ text: 'ADL利得', isCorrect: true }, { text: 'LIFEポイント', isCorrect: false }, { text: 'ケア・スコア', isCorrect: false }] } },
    { text: '利用者のリハビリ意欲を引き出す「動機付け」として、最も適切な声かけはどれか。', explanation: '本人の「やりたいこと（生きがいや目標）」に焦点を当てた共感的な声かけが、自発的な動きを引き出します。', order: 5, choices: { create: [{ text: '「またお孫さんと散歩に行けるようになりましょう」', isCorrect: true }, { text: '「決まりですから訓練室へ行ってください」', isCorrect: false }, { text: '「スタッフが困るので自分でやってください」', isCorrect: false }] } }
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
