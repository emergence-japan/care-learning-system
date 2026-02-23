import { PrismaClient } from '@prisma/client'

export async function seedMental(prisma: PrismaClient) {
  const slug = 'mental'
  const courseData = {
    slug,
    title: '精神的ケアに関する研修（2024年度）',
    description: '〜利用者と自分の心を守る、感情のプロフェッショナルへ〜',
    introduction: `
        <div class="flex flex-col items-center justify-center text-center space-y-2 pt-2 px-4 text-balance">
          <div class="flex items-center gap-4">
            <span class="h-px w-8 lg:w-12 bg-indigo-700 rounded-full"></span>
            <p class="text-indigo-800 font-black tracking-widest text-lg lg:text-xl uppercase">精神的ケア研修</p>
            <span class="h-px w-8 lg:w-12 bg-indigo-700 rounded-full"></span>
          </div>
          <h2 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight">一生懸命なあなたほど、<br/>自分の「心の悲鳴」を無視していませんか？</h2>
          <div class="max-w-2xl space-y-2 text-slate-800 text-sm lg:text-base leading-relaxed font-bold px-4 text-center">
            <p>介護は心を削る「感情労働」です。あなたの心のコップが溢れそうなとき、良いケアは生まれません。</p>
            <div class="p-3 lg:p-4 bg-indigo-50 rounded-[1.5rem] lg:rounded-[2rem] border-2 border-indigo-200 shadow-inner relative overflow-hidden text-[10px] lg:text-xs text-left">
              <div class="absolute top-0 right-0 w-16 h-16 lg:w-20 lg:h-20 bg-indigo-100/50 rounded-bl-full"></div>
              <p class="relative z-10 italic text-indigo-900 font-black text-xs lg:text-sm leading-relaxed">精神的ケアとは、相手を変えることではなく、ありのままの感情を認め、安心の居場所を共に作ること。そして、自分自身をケアする「技術」を学ぶことです。</p>
            </div>
            <p class="text-[10px] lg:text-sm text-slate-900 font-black text-center mt-2">この研修は、利用者とあなたの心を「人格の尊重」で繋ぐためのものです。</p>
          </div>
        </div>
      `,
    learningObjectives: `
        <div class="flex flex-col items-center justify-center text-center space-y-3 pt-2 px-4 w-full text-balance">
          <div class="bg-indigo-700 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-1 shadow-lg shadow-indigo-200">Learning Objectives</div>
          <div class="grid grid-cols-1 gap-2 w-full max-w-2xl">
            <div class="group p-3 lg:p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-indigo-400 transition-all duration-500 text-center lg:text-left">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-indigo-200">1</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-base font-black text-slate-900">感情を「肯定」する技術</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-tight">バリデーション療法の基礎を習得し、利用者の不安を安心に変える関わりを学ぶ。</p>
              </div>
            </div>
            <div class="group p-3 lg:p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-indigo-400 transition-all duration-500 text-center lg:text-left">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-indigo-200">2</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-base font-black text-slate-900">人格尊重と個別ケアの実践</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-tight">2024年度改正に基づき、一律の管理を排した「その人らしさ」を支える視点を養う。</p>
              </div>
            </div>
            <div class="group p-3 lg:p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-indigo-400 transition-all duration-500 text-center lg:text-left">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-indigo-200">3</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-base font-black text-slate-900">感情労働のセルフケア</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-tight">自身のストレスサインに気づき、チームでの支え合いを通じて心の健康を維持する。</p>
              </div>
            </div>
          </div>
        </div>
      `,
    videoUrl: null,
    badgeLabel: '精神ケア',
    badgeIcon: 'Sparkles',
  }

  const slidesData = [
    { title: "精神的ケアに関する研修", order: 0, content: `<div class="flex flex-col items-center justify-center text-center space-y-4 w-full h-full text-balance"><div class="relative w-full max-w-4xl px-4"><div class="absolute inset-0 bg-indigo-400 blur-3xl opacity-20 scale-150 animate-pulse text-center"></div><div class="relative bg-transparent lg:bg-white p-0 lg:p-12 rounded-none lg:rounded-[3.5rem] shadow-none lg:shadow-2xl border-none lg:border lg:border-slate-200 w-full mx-auto text-center"><div class="bg-indigo-700 text-white px-4 lg:px-6 py-1 lg:py-1.5 rounded-full text-[8px] lg:text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-6 lg:mb-8 shadow-sm">法定研修 2024</div><h2 class="text-3xl lg:text-5xl font-black text-slate-900 leading-tight mb-4 text-center">精神的ケア・人格の尊重</h2><p class="text-indigo-700 text-sm lg:text-2xl font-black mt-2 whitespace-nowrap text-center">〜心を通わせ、自分も大切にする〜</p></div></div><div class="flex items-center justify-center gap-4 text-slate-500 font-black text-[8px] lg:text-[10px] tracking-widest pt-4 text-center w-full"><span class="h-px w-6 lg:w-8 bg-slate-300"></span>CARE LEARNING SYSTEM<span class="h-px w-6 lg:w-8 bg-slate-300"></span></div></div>` },
    { title: "人格の尊重：2024年度の最重要指針", order: 1, content: `<div class="space-y-4 lg:space-y-6 text-center px-4 h-full flex flex-col justify-center text-balance text-center"><div class="inline-flex items-center gap-3 px-4 py-1.5 bg-indigo-100 text-indigo-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-indigo-200 mb-2 uppercase tracking-widest mx-auto text-center">基本理念</div><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight px-4 text-center w-full">「個人」として向き合う</h4><div class="p-0 lg:p-8 bg-transparent lg:bg-indigo-50 border-none lg:border-2 lg:border-indigo-100 shadow-none lg:shadow-xl rounded-none lg:rounded-[3rem] text-center lg:text-left text-sm lg:text-lg font-bold text-indigo-800 space-y-4 max-w-4xl mx-auto px-4 text-center"><p class="font-black text-center">利用者は「管理の対象」ではありません。豊かな人生を歩んできた一人の先輩です。本人の意向、嗜好、生活歴を重視し、一律の管理を排したケアが法的に義務付けられました。</p></div></div>` },
    { title: "魔法の技法：バリデーション", order: 2, content: `<div class="space-y-4 lg:space-y-6 text-center px-4 h-full flex flex-col justify-center text-balance"><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight mb-2 px-4 text-center w-full text-balance">感情を「肯定（Validate）」する</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl mx-auto w-full"><div class="p-6 lg:p-8 bg-white border-2 border-slate-200 rounded-[2rem] lg:rounded-[2.5rem] shadow-xl flex flex-col items-center gap-2 lg:gap-4"><p class="font-black text-lg lg:text-xl text-indigo-800 text-center">評価・否定しない</p><p class="text-xs lg:text-sm font-bold text-slate-700 leading-relaxed text-center">正しいか間違いかではなく、「その時どう感じたか」を聴き、ありのままを受け入れます。</p></div><div class="p-6 lg:p-8 bg-white border-2 border-slate-200 rounded-[2rem] lg:rounded-[2.5rem] shadow-xl flex flex-col items-center gap-2 lg:gap-4"><p class="font-black text-lg lg:text-xl text-indigo-800 text-center">感情の共鳴</p><p class="text-xs lg:text-sm font-bold text-slate-700 leading-relaxed text-center">相手の言葉を繰り返し、感情を表す言葉を添えることで、「わかってもらえた」安心感を作ります。</p></div></div></div>` },
    { title: "バリデーション：4つの関わり", order: 3, content: `<div class="space-y-6 lg:space-y-8 text-center h-full flex flex-col justify-center px-4 text-balance text-center"><div class="inline-flex items-center gap-3 px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-indigo-200 mb-2 shadow-sm mx-auto uppercase tracking-widest text-center"><span class="w-2 h-2 bg-indigo-700 rounded-full animate-ping"></span>METHOD</div><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight text-center w-full">心を開くステップ</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 max-w-4xl mx-auto w-full px-4 text-center"><div class="p-4 lg:p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl lg:rounded-3xl text-center font-black text-sm lg:text-base text-slate-900 shadow-sm">1. 収集（相手をよく見る）</div><div class="p-4 lg:p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl lg:rounded-3xl text-center font-black text-sm lg:text-base text-slate-900 shadow-sm">2. 傾聴（言葉の裏を聴く）</div><div class="p-4 lg:p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl lg:rounded-3xl text-center font-black text-sm lg:text-base text-slate-900 shadow-sm">3. 共感（感情を映し出す）</div><div class="p-4 lg:p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl lg:rounded-3xl text-center font-black text-sm lg:text-base text-slate-900 shadow-sm">4. 受容（存在を肯定する）</div></div></div>` },
    { title: "ユマニチュード：絆を結ぶ技術", order: 4, content: `<div class="flex flex-col items-center text-center space-y-4 lg:space-y-6 px-4 h-full justify-center text-balance text-center text-center"><div class="p-4 lg:p-6 bg-white rounded-[2rem] lg:rounded-[3.5rem] w-full max-w-2xl shadow-xl border-2 border-slate-200 shrink-0 text-center"><h4 class="text-xl lg:text-2xl font-black mb-2 text-slate-900 text-center">人間らしさを伝える</h4></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-3 font-black text-[10px] lg:text-sm w-full max-w-5xl"><div class="p-3 bg-indigo-50 border-2 border-indigo-200 rounded-2xl text-left"><p class="text-indigo-900 mb-1">見る（Regard）</p><p class="text-slate-600">正面から、同じ高さで、長く見つめる。</p></div><div class="p-3 bg-indigo-50 border-2 border-indigo-200 rounded-2xl text-left"><p class="text-indigo-900 mb-1">話す（Parole）</p><p class="text-slate-600">穏やかな声で、実況中継するように話す。</p></div><div class="p-3 bg-indigo-50 border-2 border-indigo-200 rounded-2xl text-left"><p class="text-indigo-900 mb-1">触れる（Toucher）</p><p class="text-slate-600">広い面積で、優しくゆっくりと触れる。</p></div></div></div>` },
    { title: "介護は「感情労働」である", order: 5, content: `<div class="flex flex-col justify-center h-full space-y-6 lg:space-y-8 px-4 lg:px-12 text-left text-balance text-center"><div class="space-y-4"><h4 class="text-2xl lg:text-4xl font-black text-indigo-900 flex items-center gap-4 lg:gap-6 justify-center"><span class="w-2 h-8 lg:w-3 lg:h-12 bg-indigo-700 rounded-full"></span>心の管理という仕事</h4></div><ul class="space-y-4 lg:space-y-6 text-lg lg:text-3xl font-black text-slate-800 pl-0 leading-tight text-center"><li>・自分の感情を抑え、相手に合わせる</li><li>・精神的なエネルギー消費が激しい</li><li>・セルフケアは「サボり」ではなく「義務」</li></ul><p class="text-rose-700 font-black text-sm lg:text-xl mt-4 text-center w-full">心のコップを溢れさせないために</p></div>` },
    { title: "ストレスサインに気づく", order: 6, content: `<div class="flex flex-col justify-center h-full space-y-6 lg:space-y-8 px-4 lg:px-12 text-left text-balance text-center"><div class="space-y-4"><h4 class="text-2xl lg:text-4xl font-black text-indigo-900 flex items-center gap-4 lg:gap-6 justify-center"><span class="w-2 h-8 lg:w-3 lg:h-12 bg-indigo-700 rounded-full"></span>自分への観察眼</h4></div><ul class="space-y-4 lg:space-y-6 text-lg lg:text-3xl font-black text-slate-800 pl-0 leading-tight text-center"><li>・利用者へのイライラが止まらない</li><li>・仕事の後、極度に疲れ果てる</li><li>・眠れない、食欲が極端に変わる</li></ul></div>` },
    { title: "チームでの支え合い：デブリーフィング", order: 7, content: `<div class="flex flex-col justify-center h-full space-y-6 lg:space-y-8 px-4 lg:px-12 text-left text-balance text-center"><div class="space-y-4"><h4 class="text-2xl lg:text-4xl font-black text-indigo-900 flex items-center gap-4 lg:gap-6 justify-center"><span class="w-2 h-8 lg:w-3 lg:h-12 bg-indigo-700 rounded-full"></span>感情を「出す」場所</h4></div><ul class="space-y-4 lg:space-y-6 text-lg lg:text-3xl font-black text-slate-800 pl-0 leading-tight text-center"><li>・看取りや事故の後に気持ちを共有する</li><li>・「辛かったね」と互いを労う</li><li>・一人で抱え込まず、チームで消化する</li></ul></div>` },
    { title: "セルフケアの具体策", order: 8, content: `<div class="flex flex-col items-center text-center space-y-4 lg:space-y-6 px-4 h-full justify-center text-balance text-center"><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight text-center w-full">オンとオフの境界線</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-3 font-black text-sm lg:text-base w-full max-w-4xl text-center"><div class="flex flex-col gap-3"><span class="px-6 py-2.5 bg-indigo-50 border-2 border-indigo-200 rounded-2xl text-indigo-900 shadow-sm text-center">物理的なリセット（手洗い・着替え）</span><span class="px-6 py-2.5 bg-indigo-50 border-2 border-indigo-200 rounded-2xl text-indigo-900 shadow-sm text-center text-balance">マインドフルネス（今に集中する）</span></div><div class="flex flex-col gap-3"><span class="px-6 py-2.5 bg-indigo-50 border-2 border-indigo-200 rounded-2xl text-indigo-900 shadow-sm text-center">睡眠と栄養の確保</span><span class="px-6 py-2.5 bg-indigo-50 border-2 border-indigo-200 rounded-2xl text-indigo-900 shadow-sm text-center text-balance">趣味や「仕事以外の自分」を大切に</span></div></div></div>` },
    { title: "認知症の心理的背景", order: 9, content: `<div class="flex flex-col justify-center h-full space-y-6 lg:space-y-8 px-4 lg:px-12 text-left text-balance text-center"><h4 class="text-xl lg:text-2xl font-black text-indigo-900 text-center w-full">なぜ「問題行動」が起きるのか</h4><ul class="space-y-4 lg:space-y-6 text-sm lg:text-xl font-black text-slate-800 pl-0 leading-tight text-center w-full"><li>・世界の意味がわからなくなる恐怖</li><li>・思いを伝えられないもどかしさ</li><li>・自尊心が傷つけられる痛み</li></ul><p class="text-blue-700 font-black text-center w-full mt-4 text-sm lg:text-lg">行動は「困っている」というメッセージです</p></div>` },
    { title: "満足感：心が通い合う瞬間", order: 10, content: `<div class="space-y-6 lg:space-y-8 text-center flex flex-col items-center justify-center h-full px-4 w-full text-balance text-center text-balance"><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight px-4 text-center w-full">ケアの真髄</h4><div class="p-8 lg:p-10 bg-white border-[4px] lg:border-[6px] border-indigo-600 rounded-[2rem] lg:rounded-[3rem] shadow-2xl max-w-3xl mx-auto w-full text-center"><p class="text-xl lg:text-2xl font-black text-indigo-900 leading-relaxed italic text-balance text-center text-center">精神的ケアは、<br/>相手の孤独を終わらせることです。<br/>あなたの共感こそが、最高の治療薬になります。</p></div><p class="font-black text-sm lg:text-lg text-slate-800 mt-2 text-center w-full px-4 text-center">その喜びを、共に分かち合いましょう。</p></div>` },
    { title: "1. 事例：帰宅願望への関わり", order: 11, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-4 lg:space-y-6 px-4 w-full text-balance text-center"><div class="inline-flex items-center gap-3 px-4 py-1.5 bg-indigo-50 text-indigo-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-indigo-200 mb-2 mx-auto text-center">事例 1</div><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight px-4 text-center w-full">場面：夕方の訴え</h4><div class="p-6 lg:p-8 bg-white border-2 border-slate-100 rounded-[2rem] lg:rounded-[3rem] shadow-xl max-w-4xl text-left space-y-4 w-full text-center"><p class="text-sm lg:text-lg font-bold text-slate-800 leading-relaxed text-balance px-4 text-center text-center">「家に帰らなきゃ、子供たちが待っているの」と、F様が玄関へ向かおうとします。実際にはお子様は成人されています。あなたはどう答えますか？</p><div class="h-px bg-slate-100"></div><p class="text-xs lg:text-base font-black text-indigo-700 italic text-center px-4 text-balance text-center w-full">「嘘」をつくのではなく、その時の「感情」にどう触れますか？</p></div></div>` },
    { title: "2. 事例：ケアを拒否する方へ", order: 12, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-4 lg:space-y-6 px-4 w-full text-balance text-center"><div class="inline-flex items-center gap-3 px-4 py-1.5 bg-indigo-50 text-indigo-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-indigo-200 mb-2 mx-auto text-center">事例 2</div><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight px-4 text-center w-full text-balance text-center">場面：入浴の強い拒否</h4><div class="p-6 lg:p-8 bg-white border-2 border-slate-100 rounded-[2rem] lg:rounded-[3rem] shadow-xl max-w-4xl text-left space-y-4 w-full text-center"><p class="text-sm lg:text-lg font-bold text-slate-800 leading-relaxed text-balance px-4 text-center text-balance text-center">「あんたなんかに触られたくない！あっちへ行け！」と、G様が怒鳴られました。あなたはショックを受けました。その後、どう行動しますか？</p><div class="h-px bg-slate-100"></div><p class="text-xs lg:text-base font-black text-indigo-700 italic text-center px-4 text-balance text-center w-full">G様の「怒り」の裏にあるものは？<br class="lg:hidden" />あなたの「傷ついた心」はどうケアしますか？</p></div></div>` },
    { title: "解決：共感と自己防衛のバランス", order: 13, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-4 lg:space-y-6 px-4 w-full text-balance text-center text-center"><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight px-4 text-center w-full text-center">プロとしての回答</h4><div class="p-6 lg:p-10 bg-indigo-50 border-2 border-indigo-100 rounded-[2.5rem] lg:rounded-[4rem] shadow-inner text-left max-w-4xl space-y-4 mx-auto text-center"><p class="text-base lg:text-lg font-black text-indigo-900 text-center w-full text-balance">精神的ケアの具体策</p><div class="grid grid-cols-1 gap-3 text-sm lg:text-base font-bold text-slate-800 text-center"><div class="flex items-center gap-3 lg:gap-4 bg-white p-3 rounded-xl lg:rounded-2xl border border-indigo-100 shadow-sm text-center justify-center lg:justify-start text-center text-center"><span class="w-6 h-6 lg:w-8 lg:h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] lg:text-sm shrink-0 text-center">1</span>「子供たちを思う優しいお母さんなんですね」と感情を受容</div><div class="flex items-center gap-3 lg:gap-4 bg-white p-3 rounded-xl lg:rounded-2xl border border-indigo-100 shadow-sm text-center justify-center lg:justify-start text-center text-center"><span class="w-6 h-6 lg:w-8 lg:h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] lg:text-sm shrink-0 text-center">2</span>拒否されたら一度離れる。時間を置き、別の人から声をかける</div><div class="flex items-center gap-3 lg:gap-4 bg-white p-3 rounded-xl lg:rounded-2xl border border-indigo-100 shadow-sm text-center justify-center lg:justify-start text-center text-center"><span class="w-6 h-6 lg:w-8 lg:h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] lg:text-sm shrink-0 text-center">3</span>「私が悪いわけではない」と自分に言い聞かせ、同僚に話す</div></div></div></div>` },
    { title: "まとめ：今日から変えられる「心」", order: 14, content: `<div class="flex flex-col items-center text-center space-y-6 lg:space-y-10 w-full h-full justify-center text-slate-900 px-4 text-center text-balance"><div class="w-24 h-24 lg:w-28 h-28 bg-indigo-700 rounded-[2.5rem] lg:rounded-[3rem] flex items-center justify-center shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-500 mx-auto text-center"><svg class="w-12 h-12 lg:w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div><h3 class="text-2xl lg:text-4xl font-black leading-tight text-center w-full text-balance">あなたの心が穏やかであれば、<br/>それは最高のケアになります。</h3><div class="pt-8 lg:pt-10 border-t-2 border-slate-200 w-full max-w-md text-center mx-auto"><p class="text-slate-500 font-black text-[8px] lg:text-[10px] uppercase tracking-[0.5em]">End of Session</p></div></div>` },
    { title: "理解度テストのご案内", order: 15, content: `
        <div class="flex flex-col items-center text-center space-y-4 lg:space-y-6 w-full h-full justify-center px-4 text-center text-balance">
          <div class="bg-emerald-600 text-white px-6 py-1.5 rounded-full text-[8px] lg:text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-4 lg:mb-2 shadow-lg px-4 text-center">修了</div>
          <h2 class="text-2xl lg:text-4xl font-black text-slate-900 leading-tight mb-2 text-center w-full text-balance">講義セッション終了</h2>
          <p class="text-emerald-800 text-base lg:text-xl font-black leading-relaxed text-center w-full text-balance px-4">大変お疲れ様でした。<br/>最後に理解度テスト（全10問）を行います。</p>
          <div class="p-4 lg:p-6 bg-indigo-50 rounded-2xl lg:rounded-3xl border-2 border-indigo-100 max-w-lg mx-auto mt-6">
            <p class="text-indigo-900 font-black text-sm lg:text-lg flex items-center justify-center gap-3 text-center">
              <span class="w-2 h-2 bg-indigo-700 rounded-full"></span>    
              全問正解を目指しましょう！
              <span class="w-2 h-2 bg-indigo-700 rounded-full"></span>    
            </p>
          </div>
        </div>
      ` }
  ]

  const questionsData = [
    { text: '利用者の感情に焦点を当て、事実の正誤を問わずに受容し共感するコミュニケーション技法を何というか？', explanation: 'バリデーション（Validation）と呼ばれ、認知症の方の自尊心の回復や不安の軽減に非常に有効な手法です。', order: 1, choices: { create: [{ text: 'バリデーション', isCorrect: true }, { text: 'オリエンテーション', isCorrect: false }, { text: 'コーチング', isCorrect: false }] } },
    { text: '2024年度の法改正で強化された、一律の管理を排し、本人の意向や嗜好を尊重する義務を何というか？', explanation: '「人格の尊重」が全てのケアの基盤として義務化されました。', order: 2, choices: { create: [{ text: '人格の尊重', isCorrect: true }, { text: '効率的な管理', isCorrect: false }, { text: '安全の強制', isCorrect: false }] } },
    { text: '自分自身の感情を管理・抑制しながら働くことで、精神的な負担が生じる労働形態を何というか？', explanation: '「感情労働（Emotional Labor）」と呼ばれます。介護職はこの負担が大きいため、適切なケアが必要です。', order: 3, choices: { create: [{ text: '感情労働', isCorrect: true }, { text: '肉体労働のみ', isCorrect: false }, { text: '単純労働', isCorrect: false }] } },
    { text: 'スタッフの燃え尽き（バーンアウト）を防ぐため、困難な事例の後にチームで感情を共有し合うことを何というか？', explanation: '「デブリーフィング（振り返り）」と呼ばれます。感情を表出することで、精神的な健康を保ちます。', order: 4, choices: { create: [{ text: 'デブリーフィング', isCorrect: true }, { text: 'OJT（職場内訓練）', isCorrect: false }, { text: 'ケーススタディのみ', isCorrect: false }] } },
    { text: 'ユマニチュードの4つの柱に含まれないものはどれか？', explanation: '「見る」「話す」「触れる」「立つ」が4つの柱です。「叱る」は含まれません。', order: 5, choices: { create: [{ text: '叱る', isCorrect: true }, { text: '見る', isCorrect: false }, { text: '触れる', isCorrect: false }, { text: '話す', isCorrect: false }] } },
    { text: '帰宅願望がある利用者に対し、正論で「夜だから帰れません」と説得することへの評価として正しいものは？', explanation: '正論は相手の不安を煽るだけで、解決に繋がりません。まずは「帰りたくなった理由（感情）」を受容します。', order: 6, choices: { create: [{ text: '不安を強めるため不適切である', isCorrect: true }, { text: '事実を伝えるのがプロの誠実さである', isCorrect: false }, { text: '繰り返し説明すれば納得してもらえる', isCorrect: false }] } },
    { text: '「マインドフルネス」などを用いて、自分自身のストレスを軽減する行為を何というか？', explanation: '「セルフケア」と呼ばれます。介護職が長く働き続けるための必須スキルです。', order: 7, choices: { create: [{ text: 'セルフケア', isCorrect: true }, { text: '自己犠牲', isCorrect: false }, { text: 'サービス残業', isCorrect: false }] } },
    { text: '利用者から強い言葉で拒絶された際、介護職が持つべき心構えとして適切なものは？', explanation: '「自分が悪い」と責めず、その方の「病気や不安」がそうさせていると考え、一歩引いて状況を整理します。', order: 8, choices: { create: [{ text: '個人への攻撃ではなく、不安の現れだと考える', isCorrect: true }, { text: 'プロ失格だと自分を責める', isCorrect: false }, { text: '二度とその利用者のケアに入らない', isCorrect: false }] } },
    { text: 'デブリーフィングの場で、最も大切にすべき態度はどれか？', explanation: '他者の感情を否定したり批判したりせず、まずは「共感的に聴く」ことが支え合いの基本です。', order: 9, choices: { create: [{ text: '互いの感情を批判せず、受容する', isCorrect: true }, { text: 'ミスの犯人探しをする', isCorrect: false }, { text: '論理的な解決策だけを話し合う', isCorrect: false }] } },
    { text: '認知症の方とのコミュニケーションで、「正面から見つめる」ことの効果はどれか？', explanation: '視覚的な情報を一致させ、「あなたを大切に思っています」というメッセージを脳に直接届けます。', order: 10, choices: { create: [{ text: '「あなたを認識している」という安心感を与える', isCorrect: true }, { text: '威圧感を与えて制止させる', isCorrect: false }, { text: '監視していることを伝える', isCorrect: false }] } }
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
