import { PrismaClient } from '@prisma/client'

export async function seedPrevention(prisma: PrismaClient) {
  const slug = 'prevention'
  const courseData = {
    slug,
    title: '介護予防・自立支援研修（2024年度）',
    description: '〜自分らしく生きる力を支えるために〜',
    introduction: `
        <div class="flex flex-col items-center justify-center text-center space-y-3 pt-4 px-4">
          <div class="flex items-center gap-4">
            <span class="h-px w-8 lg:w-12 bg-emerald-700 rounded-full"></span>
            <p class="text-emerald-800 font-black tracking-widest text-lg lg:text-2xl uppercase">介護予防・自立支援研修</p>
            <span class="h-px w-8 lg:w-12 bg-emerald-700 rounded-full"></span>
          </div>
          <h2 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight">「お世話」が利用者の<br/>力を奪っていませんか？</h2>
          <div class="max-w-2xl space-y-2 text-slate-800 text-sm lg:text-base leading-relaxed font-bold">
            <p>良かれと思って先回りして手助けすることが、<br class="lg:hidden" />実は利用者の「できること」を<br class="lg:hidden" />減らしてしまっているかもしれません。</p>
            <div class="p-4 lg:p-5 bg-emerald-50 rounded-[1.5rem] lg:rounded-[2rem] border-2 border-emerald-200 shadow-inner relative overflow-hidden text-[10px] lg:text-xs text-left">
              <div class="absolute top-0 right-0 w-16 h-16 lg:w-24 lg:h-24 bg-emerald-100/50 rounded-bl-full"></div>
              <p class="relative z-10 italic text-emerald-900 font-black text-xs lg:text-sm">介護予防の本質は、単に機能を維持することではなく、その人が「その人らしく」輝き続けるための意欲を支えることにあります。</p>
            </div>
            <p class="text-[10px] lg:text-sm text-slate-900 font-black">プロとして、利用者の「持てる力」を最大限に引き出す視点を身につけましょう。</p>
          </div>
        </div>
      `,
    learningObjectives: `
        <div class="flex flex-col items-center justify-center text-center space-y-4 pt-4 px-4 w-full">
          <div class="bg-emerald-700 text-white px-6 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-2 shadow-lg shadow-emerald-200">Learning Objectives</div>
          <div class="grid grid-cols-1 gap-3 w-full max-w-2xl">
            <div class="group p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-emerald-400 transition-all duration-500">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-emerald-200">1</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-lg font-black text-slate-900">自立支援の考え方を正しく理解する</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-relaxed">ICF（国際生活機能分類）に基づき、利用者の強みに着目できる。 </p>
              </div>
            </div>
            <div class="group p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-emerald-400 transition-all duration-500">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-emerald-200">2</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-lg font-black text-slate-900">リハ・口腔・栄養の一体化を知る</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-relaxed">2024年度改正の核となる、多職種連携による重度化防止策を学ぶ。</p>
              </div>
            </div>
            <div class="group p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-emerald-400 transition-all duration-500">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-emerald-200">3</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-lg font-black text-slate-900">現場で自立支援を実践できる</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-relaxed">「できないこと」ではなく「できること」を増やす関わりを提案できる。</p>
              </div>
            </div>
          </div>
        </div>
      `,
    badgeLabel: '介護予防',
    badgeIcon: 'Zap',
  }

  const slidesData = [
    { title: "介護予防・自立支援研修", order: 0, content: `<div class="flex flex-col items-center justify-center text-center space-y-6 w-full h-full"><div class="relative w-full max-w-4xl px-4"><div class="absolute inset-0 bg-emerald-400 blur-3xl opacity-20 scale-150 animate-pulse"></div><div class="relative bg-transparent lg:bg-white p-0 lg:p-16 rounded-none lg:rounded-[3.5rem] shadow-none lg:shadow-2xl border-none lg:border lg:border-slate-200 w-full mx-auto"><div class="bg-emerald-700 text-white px-4 lg:px-6 py-1 lg:py-1.5 rounded-full text-[8px] lg:text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-6 lg:mb-8 shadow-sm">Legal Training 2024</div><h2 class="text-3xl lg:text-6xl font-black text-slate-900 leading-tight mb-4 text-balance">介護予防・自立支援</h2><p class="text-emerald-700 text-sm lg:text-3xl font-black mt-2 whitespace-nowrap">〜自分らしく生きる力を引き出す〜</p></div></div><div class="flex items-center justify-center gap-4 text-slate-500 font-black text-[8px] lg:text-[10px] tracking-widest pt-4"><span class="h-px w-6 lg:w-8 bg-slate-300"></span>CARE LEARNING SYSTEM<span class="h-px w-6 lg:w-8 bg-slate-300"></span></div></div>` },
    { title: "はじめに：『自立』の本当の意味", order: 1, content: `<div class="space-y-6 lg:space-y-8 text-center px-4 h-full flex flex-col justify-center"><div class="inline-flex items-center gap-3 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-emerald-200 mb-2 uppercase tracking-widest mx-auto">Introduction</div><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-tight">「なんでもしてあげる」は<br/>本当に親切でしょうか？</h4><div class="p-0 lg:p-10 bg-transparent lg:bg-slate-50 border-none lg:border-2 lg:border-emerald-100 shadow-none lg:shadow-xl rounded-none lg:rounded-[3rem] text-center lg:text-left text-sm lg:text-xl font-bold text-emerald-800 space-y-4 lg:space-y-6 leading-relaxed max-w-4xl mx-auto"><p class="font-black">自立とは、一人で全てをこなすことではありません。「自分で決め、自分らしく生きる」ことです。介護予防は、その決定権を利用者に返し続けるプロセスです。</p><p class="font-black">この研修では、利用者の可能性を信じ、共に歩むための視点を学びます。</p></div></div>` },
    { title: "2024年度 改正の全体像", order: 2, content: `<div class="space-y-6 lg:space-y-8 text-center px-4 h-full flex flex-col justify-center"><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-tight mb-2">制度が求める「重度化防止」</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto w-full"><div class="p-6 lg:p-8 bg-white border-2 border-slate-200 rounded-[2rem] lg:rounded-[2.5rem] shadow-xl flex flex-col items-center gap-2 lg:gap-4"><p class="font-black text-lg lg:text-xl text-emerald-800">科学的介護（LIFE）</p><p class="text-xs lg:text-sm font-bold text-slate-700 leading-relaxed text-balance">データに基づき、効果が証明されたケアを実践することが標準となります。</p></div><div class="p-6 lg:p-8 bg-white border-2 border-slate-200 rounded-[2rem] lg:rounded-[2.5rem] shadow-xl flex flex-col items-center gap-2 lg:gap-4"><p class="font-black text-lg lg:text-xl text-emerald-800">三位一体の連携</p><p class="text-xs lg:text-sm font-bold text-slate-700 leading-relaxed text-balance">リハ・口腔・栄養をバラバラではなく、一体的に提供することが義務化へ。</p></div></div></div>` },
    { title: "自立支援の4つの柱", order: 3, content: `<div class="space-y-6 lg:space-y-8 text-center h-full flex flex-col justify-center px-4"><div class="inline-flex items-center gap-3 px-4 py-2 bg-red-100 text-red-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-red-200 mb-2 shadow-sm mx-auto"><span class="w-2 h-2 bg-red-700 rounded-full animate-ping"></span>MUST CHECK</div><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-tight">私たちが取り組むべき<br/>4つの重点領域</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 max-w-4xl mx-auto w-full"><div class="p-4 lg:p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl lg:rounded-3xl text-center font-black text-sm lg:text-base text-slate-900 shadow-sm hover:border-emerald-400 transition-all">1. 運動機能の維持・向上</div><div class="p-4 lg:p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl lg:rounded-3xl text-center font-black text-sm lg:text-base text-slate-900 shadow-sm hover:border-emerald-400 transition-all">2. 栄養状態の改善</div><div class="p-4 lg:p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl lg:rounded-3xl text-center font-black text-sm lg:text-base text-slate-900 shadow-sm hover:border-emerald-400 transition-all">3. 口腔機能の維持・向上</div><div class="p-4 lg:p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl lg:rounded-3xl text-center font-black text-sm lg:text-base text-slate-900 shadow-sm hover:border-emerald-400 transition-all">4. 社会参加の促進</div></div><p class="text-emerald-700 font-black text-[10px] lg:text-base mt-4 underline underline-offset-4 decoration-2 text-balance">※これらが相互に影響し合い、自立を支えます。</p></div>` },
    { title: "1. 運動機能：生活リハの視点", order: 4, content: `<div class="flex flex-col justify-center h-full space-y-8 lg:space-y-12 px-4 lg:px-12 text-left"><div class="space-y-4 lg:space-y-6"><h4 class="text-2xl lg:text-5xl font-black text-emerald-900 flex items-center gap-4 lg:gap-6"><span class="w-2 h-10 lg:w-3 lg:h-16 bg-emerald-700 rounded-full"></span>生活そのものがリハビリ</h4></div><ul class="space-y-4 lg:space-y-8 text-lg lg:text-4xl font-black text-slate-800 pl-0 leading-tight"><li class="whitespace-nowrap">・訓練室だけでなく、24時間の生活を見る</li><li class="whitespace-nowrap">・「座る」「立つ」「歩く」を生活に組み込む</li><li class="whitespace-nowrap">・廃用症候群（動かないことによる衰え）を防ぐ</li></ul></div>` },
    { title: "2. 栄養状態：フレイルの予防", order: 5, content: `<div class="flex flex-col justify-center h-full space-y-8 lg:space-y-12 px-4 lg:px-12 text-left"><div class="space-y-4 lg:space-y-6"><h4 class="text-2xl lg:text-5xl font-black text-orange-800 flex items-center gap-4 lg:gap-6"><span class="w-2 h-10 lg:w-3 lg:h-16 bg-orange-600 rounded-full"></span>しっかり食べて筋肉を守る</h4></div><ul class="space-y-4 lg:space-y-8 text-lg lg:text-4xl font-black text-slate-800 pl-0 leading-tight"><li class="whitespace-nowrap">・低栄養はフレイル（虚弱）の入り口</li><li class="whitespace-nowrap text-balance">・タンパク質の摂取を意識した献立工夫</li><li class="whitespace-nowrap">・食事の意欲を高める「見た目」と「環境」</li></ul></div>` },
    { title: "3. 口腔機能：全身疾患の予防", order: 6, content: `<div class="flex flex-col justify-center h-full space-y-8 lg:space-y-12 px-4 lg:px-12 text-left"><div class="space-y-4 lg:space-y-6"><h4 class="text-2xl lg:text-5xl font-black text-blue-800 flex items-center gap-4 lg:gap-6"><span class="w-2 h-10 lg:w-3 lg:h-16 bg-blue-600 rounded-full"></span>美味しく食べるためのケア</h4></div><ul class="space-y-4 lg:space-y-8 text-lg lg:text-4xl font-black text-slate-800 pl-0 leading-tight"><li class="whitespace-nowrap">・口腔清掃による誤嚥性肺炎の予防</li><li class="whitespace-nowrap">・口腔体操で嚥下機能を維持する</li><li class="whitespace-nowrap">・定期的な歯科検診と義歯の調整</li></ul></div>` },
    { title: "4. 社会参加：意欲の源泉", order: 7, content: `<div class="flex flex-col justify-center h-full space-y-8 lg:space-y-12 px-4 lg:px-12 text-left"><div class="space-y-4 lg:space-y-6"><h4 class="text-2xl lg:text-5xl font-black text-purple-900 flex items-center gap-4 lg:gap-6"><span class="w-2 h-10 lg:w-3 lg:h-16 bg-purple-700 rounded-full"></span>役割が人を元気にする</h4></div><ul class="space-y-4 lg:space-y-8 text-lg lg:text-4xl font-black text-slate-800 pl-0 leading-tight"><li class="whitespace-nowrap">・「してもらう側」から「する側」へ</li><li class="whitespace-nowrap">・施設内での役割（配膳、水やり等）の提案</li><li class="whitespace-nowrap text-balance">・他者との交流による認知症進行の抑制</li></ul></div>` },
    { title: "科学的介護（LIFE）の活用", order: 8, content: `<div class="p-6 lg:p-4 relative overflow-hidden text-left max-w-4xl mx-auto flex flex-col items-center h-full justify-center"><div class="absolute -top-10 -right-10 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50"></div><h4 class="text-[10px] lg:text-[8px] font-black tracking-[0.4em] uppercase text-emerald-800 mb-6 lg:mb-2 text-center py-2 px-6 bg-emerald-50 rounded-full border border-emerald-100 shadow-sm">PDCAサイクルを回す</h4><div class="space-y-4 lg:space-y-3 w-full lg:max-w-3xl text-slate-900"><div><p class="text-emerald-800 text-[10px] lg:text-[8px] mb-1 lg:mb-0 uppercase tracking-widest font-black">Plan：目標設定</p><div class="lg:flex lg:items-baseline lg:gap-6"><p class="text-2xl lg:text-3xl font-black whitespace-nowrap mb-1 lg:mb-0">科学的評価</p><p class="text-sm lg:text-xl font-bold text-slate-600">バーセルインデックス等で現状を数値化</p></div></div><div class="h-px bg-slate-100 lg:my-1"></div><div><p class="text-emerald-800 text-[10px] lg:text-[8px] mb-1 lg:mb-0 uppercase tracking-widest font-black">Do：介入実施</p><div class="lg:flex lg:items-baseline lg:gap-6"><p class="text-2xl lg:text-3xl font-black whitespace-nowrap mb-1 lg:mb-0">根拠あるケア</p><p class="text-sm lg:text-xl font-bold text-slate-600">多職種で計画に基づいたケアを実行</p></div></div><div class="h-px bg-slate-100 lg:my-1"></div><div><p class="text-emerald-800 text-[10px] lg:text-[8px] mb-1 lg:mb-0 uppercase tracking-widest font-black">Check：改善・提案</p><div class="lg:flex lg:items-baseline lg:gap-6"><p class="text-2xl lg:text-3xl font-black whitespace-nowrap mb-1 lg:mb-0">フィードバック</p><p class="text-sm lg:text-xl font-bold text-slate-600">結果を分析し、次のケアプランへ繋げる</p></div></div></div></div>` },
    { title: "三位一体：多職種連携の要", order: 9, content: `<div class="p-8 lg:p-12 bg-emerald-50 rounded-[2.5rem] lg:rounded-[4rem] border-4 border-emerald-300 border-dashed text-center shadow-inner max-w-4xl mx-auto flex flex-col items-center justify-center h-full px-4"><div class="bg-emerald-700 text-white px-6 lg:px-8 py-1.5 lg:py-2 rounded-full text-[8px] lg:text-[10px] font-black inline-block mb-6 lg:mb-8 uppercase tracking-widest shadow-lg">Crucial Point</div><h4 class="text-xl lg:text-3xl font-black text-emerald-950 mb-6 lg:mb-8 italic text-balance">「歩けない」は<br/>「足が弱い」からだけではない</h4><p class="text-lg lg:text-xl font-black text-emerald-900 leading-relaxed py-4 lg:py-6 px-4">栄養不足ならリハビリは逆効果。<br/>噛めなければ栄養は摂れない。<br/>全ての職種が一つに繋がる必要があります。</p></div>` },
    { title: "自立を妨げる「不適切な関わり」", order: 10, content: `<div class="space-y-6 lg:space-y-10 text-center flex flex-col items-center justify-center h-full px-4 w-full"><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-relaxed mb-4 lg:mb-8">「やりすぎ」という過剰介護</h4><div class="grid grid-cols-1 gap-4 lg:gap-6 max-w-2xl mx-auto w-full"><div class="p-6 lg:p-8 bg-white border-2 border-slate-200 rounded-3xl shadow-xl text-left flex items-center gap-4 lg:gap-6"><div class="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-700 text-white rounded-full flex items-center justify-center shrink-0 font-black text-xs lg:text-base">1</div><div><p class="font-black text-base lg:text-xl text-emerald-800 mb-1">指示的・管理的な言葉</p><p class="text-[10px] lg:text-sm font-bold text-slate-700 leading-relaxed text-balance">「立っちゃダメ」「これを食べて」と主体性を奪う関わり。</p></div></div><div class="p-6 lg:p-8 bg-white border-2 border-slate-200 rounded-3xl shadow-xl text-left flex items-center gap-4 lg:gap-6"><div class="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-700 text-white rounded-full flex items-center justify-center shrink-0 font-black text-xs lg:text-base">2</div><div><p class="font-black text-base lg:text-xl text-emerald-800 mb-1">効率重視の介助</p><p class="text-[10px] lg:text-sm font-bold text-slate-700 leading-relaxed text-balance">時間がかかるからと、本人ができることまで代行してしまう。</p></div></div></div></div>` },
    { title: "認知症と介護予防", order: 11, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-6 lg:space-y-8 px-4 w-full"><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-tight">「できない」を「工夫」で補う</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 max-w-5xl mx-auto w-full"><div class="p-6 lg:p-8 bg-emerald-50 border-2 border-emerald-100 rounded-[2rem] text-left space-y-3 lg:space-y-4 shadow-sm"><p class="font-black text-base lg:text-xl text-emerald-700">環境で支える</p><ul class="text-[10px] lg:text-sm font-bold text-slate-700 space-y-1 lg:space-y-2"><li>・トイレの場所を分かりやすく掲示</li><li>・使い慣れた道具で活動を継続</li><li>・生活リズムを整え、意欲を維持</li></ul></div><div class="p-6 lg:p-8 bg-blue-50 border-2 border-blue-100 rounded-[2rem] text-left space-y-3 lg:space-y-4 shadow-sm"><p class="font-black text-base lg:text-xl text-blue-700">強みを見つける</p><ul class="text-[10px] lg:text-sm font-bold text-slate-700 space-y-1 lg:space-y-2"><li>・昔の特技や趣味を活かす</li><li>・「ありがとう」と言われる場面を作る</li><li>・今できている動作を最大限に褒める</li></ul></div></div></div>` },
    { title: "ケーススタディ：配膳をしたいA様", order: 12, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-6 lg:space-y-8 px-4 w-full"><div class="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-emerald-200 mb-2 mx-auto">CASE STUDY</div><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-tight px-4">場面：食事の準備</h4><div class="p-6 lg:p-8 bg-white border-2 border-slate-100 rounded-[2rem] lg:rounded-[3rem] shadow-xl max-w-4xl text-left space-y-4 lg:space-y-6 w-full"><p class="text-sm lg:text-xl font-bold text-slate-800 leading-relaxed text-balance text-center">歩行が少し不安定なA様が、<br class="lg:hidden" />「私も手伝うわ」と<br class="lg:hidden" />配膳を手伝おうとされました。<br/>担当のB職員は転倒を恐れ、<br class="lg:hidden" />「危ないから座っててください」<br class="lg:hidden" />とお断りしました。</p><div class="h-px bg-slate-100"></div><p class="text-xs lg:text-lg font-black text-emerald-700 italic text-center px-4">この場面、B職員はどうすれば<br class="lg:hidden" />よかったでしょうか？</p></div></div>` },
    { title: "分析：安全と意欲のバランス", order: 13, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-6 lg:space-y-8 px-4 w-full"><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-tight">安全を守りつつ、<br class="lg:hidden" />意欲を「活用」する</h4><div class="p-6 lg:p-10 bg-emerald-50 border-2 border-emerald-100 rounded-[2.5rem] lg:rounded-[4rem] shadow-inner text-left max-w-4xl space-y-4 lg:space-y-6 mx-auto"><p class="text-base lg:text-xl font-black text-emerald-900">プロの提案</p><div class="grid grid-cols-1 gap-3 lg:gap-4 text-sm lg:text-lg font-bold text-slate-800"><div class="flex items-center gap-3 lg:gap-4 bg-white p-3 lg:p-4 rounded-xl lg:rounded-2xl border border-emerald-100 shadow-sm"><span class="w-6 h-6 lg:w-8 lg:h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] lg:text-sm shrink-0">1</span>「お箸を並べるのをお願いできますか？」と頼む</div><div class="flex items-center gap-3 lg:gap-4 bg-white p-3 lg:p-4 rounded-xl lg:rounded-2xl border border-emerald-100 shadow-sm"><span class="w-6 h-6 lg:w-8 lg:h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] lg:text-sm shrink-0">2</span>椅子に座ったままできる「ふきん畳み」をお願いする</div><div class="flex items-center gap-3 lg:gap-4 bg-white p-3 lg:p-4 rounded-xl lg:rounded-2xl border border-emerald-100 shadow-sm"><span class="w-6 h-6 lg:w-8 lg:h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] lg:text-sm shrink-0">3</span>安全な歩行ルートを確認し、見守りながら一緒に運ぶ</div></div></div></div>` },
    { title: "今日から変えられる「関わり」", order: 14, content: `<div class="space-y-6 lg:space-y-8 text-center flex flex-col items-center justify-center h-full w-full px-4"><h4 class="text-xl lg:text-3xl font-black text-slate-900 mb-4 lg:mb-6">自立支援チェックリスト</h4><div class="space-y-3 lg:space-y-4 font-black text-slate-900 text-sm lg:text-2xl max-w-4xl text-left"><div>□ 「〜しましょうか？」より「〜できますか？」と聞いているか？</div><div>□ 「危ない」という理由だけで、活動を制限していないか？</div><div>□ 些細な「できたこと」を、本人と一緒に喜べているか？</div><div>□ 食事・排泄・入浴の場面で、本人の力を活かせているか？</div><div>□ 「早く終わらせること」を目標にしていないか？</div></div></div>` },
    { title: "まとめ：明日の笑顔のために", order: 15, content: `<div class="flex flex-col items-center text-center space-y-8 lg:space-y-12 w-full h-full justify-center text-slate-900 px-4"><div class="w-24 h-24 lg:w-32 h-32 bg-emerald-700 rounded-[2.5rem] lg:rounded-[3.5rem] flex items-center justify-center shadow-2xl shadow-emerald-200 rotate-3 transition-transform hover:rotate-0 duration-500"><svg class="w-12 h-12 lg:w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div><h3 class="text-2xl lg:text-5xl font-black leading-tight">あなたのその一言が、<br/>利用者の「力」になります。</h3><div class="pt-8 lg:pt-12 border-t-2 border-slate-200 w-full max-w-md text-center"><p class="text-slate-500 font-black text-[8px] lg:text-[10px] uppercase tracking-[0.5em]">End of Session</p></div></div>` },
    { title: "理解度テストのご案内", order: 16, content: `
        <div class="flex flex-col items-center text-center space-y-6 lg:space-y-8 w-full h-full justify-center px-4">
          <div class="bg-emerald-600 text-white px-6 py-1.5 rounded-full text-[8px] lg:text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-4 lg:mb-6 shadow-lg">Course Completed</div>
          <h2 class="text-2xl lg:text-5xl font-black text-slate-900 leading-tight mb-2 lg:mb-4">講義セッション終了</h2>
          <p class="text-emerald-800 text-base lg:text-2xl font-black leading-relaxed">大変お疲れ様でした。<br/>最後に理解度テスト（全10問）を行います。</p>
          <div class="p-4 lg:p-6 bg-emerald-50 rounded-2xl lg:rounded-3xl border-2 border-emerald-100 max-w-lg mx-auto mt-6 lg:mt-8">
            <p class="text-emerald-900 font-black text-sm lg:text-xl flex items-center justify-center gap-3">
              <span class="w-2 h-2 bg-emerald-700 rounded-full"></span>
              全問正解を目指しましょう！
              <span class="w-2 h-2 bg-emerald-700 rounded-full"></span>
            </p>
          </div>
        </div>
      ` }
  ]

  const questionsData = [
    { text: '自立支援・重度化防止の考え方として、適切なものはどれか？', explanation: '本人が「できること」まで代行してしまうと、機能の低下を招きます。残存機能を活かし、強みに着目することが自立支援の基本です。', order: 1, choices: { create: [{ text: '利用者の強み（できること）に着目し、その力を活かす', isCorrect: true }, { text: '効率を重視し、時間がかかる動作は職員が代行する', isCorrect: false }, { text: '転倒を防ぐため、歩行練習よりも車椅子移動を徹底する', isCorrect: false }, { text: 'なんでも「やってあげる」ことが最高の親切である', isCorrect: false }] } },
    { text: 'ICF（国際生活機能分類）において、自立支援で最も重視すべき視点はどれか？', explanation: 'ICFでは「できないこと（障害）」だけでなく、本人の「活動」や「参加」など、ポジティブな要素に焦点を当てることを重視します。', order: 2, choices: { create: [{ text: '「できないこと」を補うだけでなく、「できること」を増やす', isCorrect: true }, { text: '医学的な診断名だけでケア内容を決定する', isCorrect: false }, { text: '身体機能の回復のみを目標とする', isCorrect: false }, { text: '環境の影響は考慮しない', isCorrect: false }] } },
    { text: '2024年度改正で推進されている、三位一体の連携に含まれないものはどれか？', explanation: 'リハビリテーション、口腔管理、栄養管理の3つを一体的に進めることが、重度化防止の核となっています。', order: 3, choices: { create: [{ text: '財務管理', isCorrect: true }, { text: 'リハビリテーション', isCorrect: false }, { text: '口腔管理', isCorrect: false }, { text: '栄養管理', isCorrect: false }] } },
    { text: '科学的介護（LIFE）において、PDCAサイクルを回す目的として正しいものは？', explanation: 'LIFEは、収集したデータを分析・フィードバックし、実際のケアの質を改善（PDCA）していくために活用されます。', order: 4, choices: { create: [{ text: '客観的なデータに基づき、ケアの質を継続的に改善する', isCorrect: true }, { text: '厚生労働省への報告作業を増やすため', isCorrect: false }, { text: '職員の監視を強化するため', isCorrect: false }, { text: '書類を増やすこと自体が目的である', isCorrect: false }] } },
    { text: '「フレイル（虚弱）」を予防するために、栄養面で特に意識すべきことは？', explanation: '筋肉量を維持しフレイルを防ぐためには、適切なエネルギー量に加えて、タンパク質の摂取が重要です。', order: 5, choices: { create: [{ text: 'タンパク質を含め、バランスの良い栄養を摂取する', isCorrect: true }, { text: '低カロリーなものだけを食べる', isCorrect: false }, { text: 'サプリメントのみで補う', isCorrect: false }, { text: '水分さえ摂っていれば問題ない', isCorrect: false }] } },
    { text: '口腔機能の低下が全身に与える影響として、誤っているものはどれか？', explanation: '口腔機能の低下は、噛めないことによる栄養不足や、誤嚥性肺炎のリスクを高めます。「心肺機能が向上する」ことはありません。', order: 6, choices: { create: [{ text: '心肺機能が劇的に向上する', isCorrect: true }, { text: '誤嚥性肺炎のリスクが高まる', isCorrect: false }, { text: '栄養状態が悪化する', isCorrect: false }, { text: '認知機能の低下に繋がることがある', isCorrect: false }] } },
    { text: '「生活リハビリ」の具体的な考え方として、適切なものはどれか？', explanation: 'リハビリは訓練室だけでなく、食事・更衣・移動などの日常生活動作そのものを通じて行うことが最も効果的です。', order: 7, choices: { create: [{ text: '日常生活のあらゆる動作をリハビリの機会として捉える', isCorrect: true }, { text: 'リハビリの時間以外はなるべく安静にしてもらう', isCorrect: false }, { text: '専門職に全てを任せ、介護職は関与しない', isCorrect: false }, { text: '歩行訓練だけをリハビリと呼ぶ', isCorrect: false }] } },
    { text: '社会参加の促進が介護予防に与える効果として、正しいものは？', explanation: '他者との交流や役割を持つことは、孤独を防ぎ、脳を活性化させ、ADL（日常生活動作）の維持に大きく貢献します。', order: 8, choices: { create: [{ text: '生きがいや役割を持つことで、生活意欲と機能維持に繋がる', isCorrect: true }, { text: '社会参加は疲れを招くだけで逆効果である', isCorrect: false }, { text: '一人で静かに過ごすことだけが介護予防である', isCorrect: false }, { text: '認知症の進行には全く影響しない', isCorrect: false }] } },
    { text: '認知症の方への介護予防・自立支援で、大切な視点はどれか？', explanation: 'できないことを指摘するのではなく、今できていることや得意なことを活かし、本人の尊厳と意欲を守る関わりが重要です。', order: 9, choices: { create: [{ text: '「できること」を最大限に褒め、尊厳と意欲を支える', isCorrect: true }, { text: '危ないことは全て禁止し、安全を最優先に管理する', isCorrect: false }, { text: 'できないことを厳しく指摘して訓練させる', isCorrect: false }, { text: '本人の意思よりも職員の都合を優先する', isCorrect: false }] } },
    { text: '自立支援を実践する上で、プロとして明日からできる関わりはどれか？', explanation: '「何でもしてあげる」過剰介護から脱却し、利用者が自分の力を使える場面を根気強く見守り、支えることがプロの関わりです。', order: 10, choices: { create: [{ text: '本人の「やろうとする意思」を尊重し、見守りながら支える', isCorrect: true }, { text: 'なるべく早く終わるように介助をスピードアップする', isCorrect: false }, { text: '本人が声を出すまで何もしない', isCorrect: false }, { text: '自分一人の判断でケアの方法をコロコロ変える', isCorrect: false }] } }
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
