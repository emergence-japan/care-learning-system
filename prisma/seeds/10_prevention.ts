import { PrismaClient } from '@prisma/client'

export async function seedPrevention(prisma: PrismaClient) {
  return await prisma.course.create({
    data: {
      title: '介護予防および要介護進行予防に関する研修',
      description: '2024年改正の自立支援・重度化防止要件に対応。フレイル予防から具体的な生活リハビリ技術までを網羅した決定版。',
      introduction: `
        <div class="space-y-8">
          <div class="flex items-center gap-4">
            <span class="h-1 w-12 bg-emerald-600 rounded-full"></span>
            <p class="text-emerald-600 font-black tracking-widest text-sm uppercase">Independence Support Hook</p>
          </div>
          <h2 class="text-4xl font-black text-slate-900 leading-tight">あなたの「親切」が、<br/>力を奪っていませんか？</h2>
          <div class="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
            <p>何でも手伝ってあげることが「良い介護」だと思っていませんか？先回りした介助は、利用者が本来持っている「生きる力」を少しずつ削り取ってしまいます。</p>
            <div class="p-8 bg-emerald-50/50 rounded-[2rem] border border-emerald-100 shadow-inner relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-emerald-100/30 rounded-bl-full"></div>
              <p class="relative z-10 font-medium italic">2024年度の法改正では「自立支援・重度化防止」がさらに重視されています。私たちの役割は、利用者が「自分の人生の主役」であり続けるための黒子になることです。</p>
            </div>
            <p>この研修では、廃用症候群を防ぎ、尊厳ある自立を支えるための「引き算の介護」を学びます。</p>
          </div>
        </div>
      `,
      learningObjectives: `
        <div class="grid grid-cols-1 gap-6">
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-emerald-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">1</div>
            <div><h4 class="text-xl font-black text-slate-900 mb-2">フレイルと重度化防止の理解</h4><p class="text-slate-500 leading-relaxed font-medium">身体・口腔・栄養の三位一体となった予防の重要性を理解し、ADL維持等加算等の公的要件に基づいたケアを実践できる。</p></div>
          </div>
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-emerald-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">2</div>
            <div><h4 class="text-xl font-black text-slate-900 mb-2">生活リハビリの実践技術</h4><p class="text-slate-500 leading-relaxed font-medium">日常生活動作（ADL）そのものをリハビリと捉え、利用者の意欲を引き出す「待ちの姿勢」と環境設定を習得する。</p></div>
          </div>
        </div>
      `,
      slides: {
        create: [
          { title: '介護予防：自立を支える黒子の技術', order: 0, content: `<div class="flex flex-col items-center justify-center min-h-[300px] text-center space-y-12"><div class="relative"><div class="absolute inset-0 bg-emerald-400 blur-3xl opacity-20 scale-150 animate-pulse"></div><div class="relative bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 max-w-sm"><div class="bg-emerald-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-6">Prevention Science</div><h2 class="text-3xl font-black text-slate-900 leading-tight mb-4">介護予防・重度化防止<br/>〜自立を支える黒子の技術〜</h2></div></div><div class="flex items-center gap-4 text-slate-400 font-black text-[10px] tracking-widest"><span class="h-px w-8 bg-slate-200"></span>CARE LEARNING SYSTEM<span class="h-px w-8 bg-slate-200"></span></div></div>` },
          { title: '恐怖の「フレイル・サイクル」', order: 1, content: `<div class="space-y-8"><div class="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black ring-1 ring-emerald-100"><span class="w-2 h-2 bg-emerald-600 rounded-full animate-ping"></span>FRAILTY CYCLE</div><h4 class="text-2xl font-black text-slate-900 leading-tight">衰えは「連鎖」します。<br/><span class="text-emerald-600 decoration-4 underline underline-offset-8">どこで食い止めるか</span>が勝負です</h4><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="p-6 bg-white border-2 border-slate-50 rounded-[2rem] shadow-sm"><p class="text-sm font-black text-slate-900 mb-2">負の連鎖</p><p class="text-[11px] text-slate-500 font-medium">動かない → お腹が空かない → 筋肉が減る（サルコペニア） → さらに動けなくなる。</p></div><div class="p-6 bg-white border-2 border-slate-50 rounded-[2rem] shadow-sm"><p class="text-sm font-black text-slate-900 mb-2">社会的孤立</p><p class="text-[11px] text-slate-500 font-medium">他者との交流が減ることで意欲が低下し、身体的衰えを加速させます。</p></div></div></div>` },
          { title: '2024年度改定の要：口腔と栄養', order: 2, content: `<div class="space-y-8"><div class="flex flex-col items-center text-center"><div class="bg-slate-100 px-4 py-1 rounded-full text-[10px] font-black text-slate-500 tracking-widest uppercase mb-4">Core Integration</div><h4 class="text-xl font-black text-slate-900 leading-relaxed">「食べる力」が「歩く力」を作る</h4></div><div class="relative grid grid-cols-2 gap-px bg-slate-200 p-px rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl"><div class="p-6 bg-white text-center space-y-3"><div class="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-black mx-auto">A</div><p class="text-xs font-black text-slate-900">口腔管理</p><p class="text-[9px] text-slate-400 leading-tight">「オーラルフレイル」の予防。噛む・飲み込む力を維持する</p></div><div class="p-6 bg-white text-center space-y-3"><div class="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-black mx-auto">B</div><p class="text-xs font-black text-slate-900">栄養管理</p><p class="text-[9px] text-slate-400 leading-tight">低栄養の防止。筋肉の元となるタンパク質の適切な摂取</p></div></div></div>` },
          { title: '過剰介護という名の「廃用症候群」', order: 3, content: `<div class="space-y-8"><div class="p-8 bg-blue-50 rounded-[2.5rem] border-2 border-blue-100 border-dashed relative text-center"><div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">Over-Care Risk</div><h4 class="text-2xl font-black text-blue-900 mb-4">「親切心」がリハビリを妨げる</h4><p class="text-[11px] text-blue-800 italic font-medium">スタッフが何でもやってしまうことで、利用者が持っている機能（残存能力）が急速に失われます。</p></div><div class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl"><p class="text-sm font-black text-slate-900 mb-6">今日から変える介助視点</p><div class="grid grid-cols-2 gap-4"><div class="p-4 bg-slate-50 rounded-2xl"><p class="text-[10px] font-black text-slate-900">× 100%全介助</p><p class="text-[9px] text-slate-500">時間がかかるからといって、すべてスタッフがやる</p></div><div class="p-4 bg-slate-50 rounded-2xl"><p class="text-[10px] font-black text-slate-900">○ 1%の自立支援</p><p class="text-[9px] text-slate-500">「最後の一口だけ自分で」「立ち上がる時だけ支える」</p></div></div></div></div>` },
          { title: '科学的介護（LIFE）への対応', order: 4, content: `<div class="space-y-6"><div class="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"><h4 class="text-xs font-black tracking-[0.3em] uppercase opacity-50 mb-6">Evidence Based Care</h4><p class="text-lg font-bold mb-6">経験に頼らず「データ」で自立を支える</p><div class="space-y-4 text-sm text-slate-300"><div class="flex items-center gap-4"><span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-black text-xs">01</span><p>ADL利得の評価：食事・入浴等の変化を数値化し加算へ繋げる</p></div><div class="flex items-center gap-4"><span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-black text-xs">02</span><p>LIFEへのフィードバック：改善策をチームで科学的に分析する</p></div></div></div></div>` },
          { title: '意欲を引き出す「動機付け」の技術', order: 5, content: `<div class="space-y-8"><div class="p-10 bg-emerald-50 rounded-[3rem] border border-emerald-100 flex flex-col items-center text-center space-y-6"><div class="w-20 h-20 bg-white rounded-[2rem] shadow-xl flex items-center justify-center font-black text-2xl text-emerald-600">Goal</div><h4 class="text-2xl font-black text-emerald-900">「訓練」ではなく「楽しみ」を</h4><p class="text-slate-600 font-medium leading-relaxed">「歩く練習をしましょう」ではなく「またお孫さんと散歩に行きませんか？」という、本人の『やりたいこと』にフォーカスした声かけが、脳と体を動かします。</p></div></div>` },
          { title: 'シミュレーション：待ちの姿勢', order: 6, content: `<div class="space-y-6"><div class="p-8 bg-orange-50 border-2 border-orange-100 rounded-[2.5rem] text-center"><p class="text-orange-900 text-lg font-black leading-relaxed">利用者が自分で靴を履こうとしていますが、5分以上かかっています。次はレクリエーションの時間です。どうしますか？</p></div><div class="grid grid-cols-1 gap-4"><div class="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center gap-4 opacity-60"><span class="w-10 h-10 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center font-black">×</span><p class="text-xs font-bold italic">「遅れますよ！」と言って、無理やり履かせて移動させる</p></div><div class="p-6 bg-white border border-emerald-100 rounded-2xl shadow-xl ring-2 ring-emerald-50 flex items-center gap-4"><span class="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-black shadow-lg">○</span><p class="text-xs font-black text-slate-900 font-bold">見守りを継続し、「ゆっくりで大丈夫ですよ。履けたら教えてくださいね」と自立を促す。レクの参加時間は本人の達成感を優先して調整する。</p></div></div></div>` },
          { title: 'まとめ：尊厳ある「自立」のために', order: 7, content: `<div class="flex flex-col items-center justify-center min-h-[450px] text-center space-y-10"><div class="w-24 h-24 bg-emerald-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-emerald-200 rotate-3"><svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg></div><h3 class="text-3xl font-black text-slate-900 leading-tight">介護予防とは、利用者の<br/>「自由」を守る活動です。</h3><p class="text-slate-500 font-medium text-lg max-w-sm mx-auto leading-relaxed">私たちは利用者の「足」になるのではなく、自ら歩み出そうとする「心」を支えるパートナーでありましょう。</p><div class="pt-10 border-t border-slate-100 w-full"><p class="text-slate-400 font-black text-xs uppercase tracking-[0.3em]">End of Session</p></div></div>` }
        ]
      },
      questions: {
        create: [
          { text: '活動量の低下により低栄養や筋力低下が連鎖する現象を何というか。', explanation: 'フレイル・サイクルと呼ばれます。早期に発見し、この連鎖を断ち切ることが重度化防止の鍵です。', order: 1, choices: { create: [{ text: 'フレイル・サイクル', isCorrect: true }, { text: 'パレート・サイクル', isCorrect: false }, { text: 'ワーク・ライフ・サイクル', isCorrect: false }] } },
          { text: 'スタッフが何でも手伝ってしまう「過剰介護」によって利用者の機能が低下することを何というか。', explanation: '廃用症候群（生活不活発病）と呼ばれます。親切心による過剰な手助けが、実は自立を妨げていることがあります。', order: 2, choices: { create: [{ text: '廃用症候群', isCorrect: true }, { text: '過活動症候群', isCorrect: false }, { text: '成長痛', isCorrect: false }] } },
          { text: '2024年度の介護報酬改定において、重度化防止のためにリハビリと一体的に推進すべき要素はどれか。', explanation: '口腔管理と栄養管理を、リハビリテーションや機能訓練と一体的に進めることが強く求められています。', order: 3, choices: { create: [{ text: '口腔管理と栄養管理', isCorrect: true }, { text: '居室の清掃と洗濯', isCorrect: false }, { text: 'レクリエーションの回数', isCorrect: false }] } },
          { text: '科学的介護情報システム（LIFE）において、ADL（日常生活動作）の改善を評価し加算に繋げる指標を何というか。', explanation: 'ADL利得（バーセルインデックス等の数値の変化）と呼ばれます。根拠に基づくケアの重要な指標です。', order: 4, choices: { create: [{ text: 'ADL利得', isCorrect: true }, { text: 'LIFEポイント', isCorrect: false }, { text: 'ケア・スコア', isCorrect: false }] } },
          { text: '利用者のリハビリ意欲を引き出す「動機付け」として、最も適切な声かけはどれか。', explanation: '本人の「やりたいこと（生きがいや目標）」に焦点を当てた共感的な声かけが、自発的な動きを引き出します。', order: 5, choices: { create: [{ text: '「またお孫さんと散歩に行けるようになりましょう」', isCorrect: true }, { text: '「決まりですから訓練室へ行ってください」', isCorrect: false }, { text: '「スタッフが困るので自分でやってください」', isCorrect: false }] } }
        ]
      }
    }
  })
}
