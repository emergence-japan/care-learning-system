import { PrismaClient } from '@prisma/client'

export async function seedPrevention(prisma: PrismaClient) {
  const slug = 'restraint'
  const courseData = {
    slug,
    title: '身体拘束廃止・適正化研修（2024年度）',
    description: '〜「縛らない介護」を実現するプロの技術〜',
    introduction: `
        <div class="flex flex-col items-center justify-center text-center space-y-3 pt-4 px-4">
          <div class="flex items-center gap-4">
            <span class="h-px w-8 lg:w-12 bg-orange-700 rounded-full"></span>
            <p class="text-orange-800 font-black tracking-widest text-lg lg:text-2xl uppercase">身体拘束廃止研修</p>
            <span class="h-px w-8 lg:w-12 bg-orange-700 rounded-full"></span>
          </div>
          <h2 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight text-balance">「安全のため」なら、<br/>自由を奪ってもいいのでしょうか？</h2>
          <div class="max-w-2xl space-y-2 text-slate-800 text-sm lg:text-base leading-relaxed font-bold px-4 text-center">
            <p>転倒骨折のリスクと、縛られる精神的苦痛。<br class="lg:hidden" />私たちは常にこの天秤と向き合っています。</p>
            <div class="p-4 lg:p-5 bg-orange-50 rounded-[1.5rem] lg:rounded-[2rem] border-2 border-orange-200 shadow-inner relative overflow-hidden text-[10px] lg:text-xs text-left mt-4">
              <div class="absolute top-0 right-0 w-16 h-16 lg:w-24 lg:h-24 bg-orange-100/50 rounded-bl-full"></div>
              <p class="relative z-10 italic text-orange-900 font-black text-xs lg:text-sm leading-relaxed">安易な拘束は、利用者の身体機能を奪い、生きる気力を削ぐ「虐待」となり得ます。プロとして、拘束ゼロを目指すための技術を学びましょう。</p>
            </div>
          </div>
        </div>
      `,
    learningObjectives: `
        <div class="flex flex-col items-center justify-center text-center space-y-4 pt-4 px-4 w-full">
          <div class="bg-orange-700 text-white px-6 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-2 shadow-lg shadow-orange-200">Learning Objectives</div>
          <div class="grid grid-cols-1 gap-3 w-full max-w-2xl">
            <div class="group p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-orange-400 transition-all duration-500">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-orange-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-orange-200">1</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-lg font-black text-slate-900">3つの要件を厳格に理解する</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-relaxed">切迫性・非代替性・一時性の3要件と、手続きの重要性を理解する。</p>
              </div>
            </div>
            <div class="group p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-orange-400 transition-all duration-500">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-orange-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-orange-200">2</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-lg font-black text-slate-900">弊害（廃用症候群）を知る</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-relaxed">拘束が心身に与える深刻なダメージ（筋力低下、認知症進行）を学ぶ。</p>
              </div>
            </div>
            <div class="group p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-orange-400 transition-all duration-500">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-orange-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-orange-200">3</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-lg font-black text-slate-900">代替ケアを提案できる</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-relaxed">「縛る」以外の方法（環境調整、センサー活用等）を具体的に提案できる。</p>
              </div>
            </div>
          </div>
        </div>
      `,
    badgeLabel: '身体拘束',
    badgeIcon: 'Lock',
  }

  const slidesData = [
    { title: "身体拘束廃止研修", order: 0, content: `<div class="flex flex-col items-center justify-center text-center space-y-6 w-full h-full"><div class="relative w-full max-w-4xl px-4"><div class="absolute inset-0 bg-orange-400 blur-3xl opacity-20 scale-150 animate-pulse"></div><div class="relative bg-transparent lg:bg-white p-0 lg:p-16 rounded-none lg:rounded-[3.5rem] shadow-none lg:shadow-2xl border-none lg:border lg:border-slate-200 w-full mx-auto"><div class="bg-orange-700 text-white px-4 lg:px-6 py-1 lg:py-1.5 rounded-full text-[8px] lg:text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-6 lg:mb-8 shadow-sm">Legal Training 2024</div><h2 class="text-3xl lg:text-6xl font-black text-slate-900 leading-tight mb-4 text-balance px-4">身体拘束廃止研修</h2><p class="text-orange-700 text-sm lg:text-3xl font-black mt-2 whitespace-nowrap">〜「縛らない介護」を実現するプロの技術〜</p></div></div><div class="flex items-center justify-center gap-4 text-slate-500 font-black text-[8px] lg:text-[10px] tracking-widest pt-4"><span class="h-px w-6 lg:w-8 bg-slate-300"></span>CARE LEARNING SYSTEM<span class="h-px w-6 lg:w-8 bg-slate-300"></span></div></div>` },
    { title: "はじめに：身体拘束とは何か", order: 1, content: `<div class="space-y-6 lg:space-y-8 text-center px-4 h-full flex flex-col justify-center"><div class="inline-flex items-center gap-3 px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-orange-200 mb-2 uppercase tracking-widest mx-auto">Introduction</div><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-tight px-4 text-balance">自由を奪う全ての行為</h4><div class="p-0 lg:p-10 bg-transparent lg:bg-orange-50 border-none lg:border-2 lg:border-orange-100 shadow-none lg:shadow-xl rounded-none lg:rounded-[3rem] text-center lg:text-left text-sm lg:text-xl font-bold text-orange-800 space-y-4 lg:space-y-6 leading-relaxed max-w-4xl mx-auto px-4"><p class="font-black text-center lg:text-left text-balance">「ベッド柵で囲む」「つなぎ服を着せる」「車椅子にベルトで固定する」。</p><p class="font-black text-center lg:text-left text-balance">これらは全て身体拘束であり、高齢者虐待防止法においても原則禁止されている行為です。</p></div></div>` },
    { title: "なぜ禁止されているのか：3つの弊害", order: 2, content: `<div class="space-y-6 lg:space-y-8 text-center px-4 h-full flex flex-col justify-center"><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-tight mb-2 px-4 text-balance text-center w-full">拘束が招く3つの弊害</h4><div class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto w-full"><div class="p-6 bg-white border-2 border-slate-200 rounded-3xl shadow-xl flex flex-col items-center gap-4"><p class="font-black text-lg text-orange-800">1. 身体的弊害</p><p class="text-xs font-bold text-slate-600 text-balance text-center">関節拘縮、筋力低下、床ずれ（褥瘡）、食欲低下、心肺機能の低下。</p></div><div class="p-6 bg-white border-2 border-slate-200 rounded-3xl shadow-xl flex flex-col items-center gap-4"><p class="font-black text-lg text-orange-800">2. 精神的弊害</p><p class="text-xs font-bold text-slate-600 text-balance text-center">不安、怒り、屈辱、諦め、認知症の急激な進行（せん妄）。</p></div><div class="p-6 bg-white border-2 border-slate-200 rounded-3xl shadow-xl flex flex-col items-center gap-4"><p class="font-black text-lg text-orange-800">3. 社会的弊害</p><p class="text-xs font-bold text-slate-600 text-balance text-center">家族の不信感、施設への社会的評価の低下、職員の士気低下。</p></div></div></div>` },
    { title: "具体的行為：これらは全て「拘束」です", order: 3, content: `<div class="flex flex-col justify-center h-full space-y-8 lg:space-y-12 px-4 lg:px-12 text-left"><div class="space-y-4 lg:space-y-6"><h4 class="text-2xl lg:text-5xl font-black text-orange-900 flex items-center gap-4 lg:gap-6"><span class="w-2 h-10 lg:w-3 lg:h-16 bg-orange-700 rounded-full"></span>やっていませんか？</h4></div><ul class="space-y-4 lg:space-y-8 text-lg lg:text-4xl font-black text-slate-800 pl-0 leading-tight"><li class="whitespace-nowrap">・徘徊しないよう車椅子にベルトをする</li><li class="whitespace-nowrap">・点滴を抜かないようミトン手袋をつける</li><li class="whitespace-nowrap">・ベッドから降りられないよう柵で囲む</li><li class="whitespace-nowrap">・自分で脱げない「つなぎ服」を着せる</li><li class="whitespace-nowrap">・向精神薬で過剰に鎮静させる（ドラッグロック）</li></ul></div>` },
    { title: "例外的に認められる「3つの要件」", order: 4, content: `<div class="p-6 lg:p-4 relative overflow-hidden text-left max-w-4xl mx-auto flex flex-col items-center h-full justify-center"><div class="absolute -top-10 -right-10 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50"></div><h4 class="text-[10px] lg:text-[10px] font-black tracking-[0.4em] uppercase text-orange-800 mb-6 lg:mb-4 text-center py-2 px-6 bg-orange-50 rounded-full border border-orange-100 shadow-sm">3原則を全て満たす場合のみ</h4><div class="space-y-4 lg:space-y-6 w-full lg:max-w-3xl text-slate-900"><div><p class="text-orange-800 text-[10px] lg:text-[10px] mb-1 lg:mb-0 uppercase tracking-widest font-black">01. 切迫性</p><div class="lg:flex lg:items-baseline lg:gap-6"><p class="text-2xl lg:text-3xl font-black whitespace-nowrap mb-1 lg:mb-0">命の危険</p><p class="text-sm lg:text-xl font-bold text-slate-600">利用者本人または他者の生命・身体に危険が迫っている。</p></div></div><div class="h-px bg-slate-100 lg:my-1"></div><div><p class="text-orange-800 text-[10px] lg:text-[10px] mb-1 lg:mb-0 uppercase tracking-widest font-black">02. 非代替性</p><div class="lg:flex lg:items-baseline lg:gap-6"><p class="text-2xl lg:text-3xl font-black whitespace-nowrap mb-1 lg:mb-0">他に手なし</p><p class="text-sm lg:text-xl font-bold text-slate-600">拘束する以外に、代替する介護方法が全くない。</p></div></div><div class="h-px bg-slate-100 lg:my-1"></div><div><p class="text-orange-800 text-[10px] lg:text-[10px] mb-1 lg:mb-0 uppercase tracking-widest font-black">03. 一時性</p><div class="lg:flex lg:items-baseline lg:gap-6"><p class="text-2xl lg:text-3xl font-black whitespace-nowrap mb-1 lg:mb-0">一時的</p><p class="text-sm lg:text-xl font-bold text-slate-600">必要最小限の時間である（漫然と続けない）。</p></div></div></div></div>` },
    { title: "手続きの厳格化：勝手にやらない", order: 5, content: `<div class="space-y-6 lg:space-y-8 text-center h-full flex flex-col justify-center px-4"><div class="inline-flex items-center gap-3 px-4 py-2 bg-red-100 text-red-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-red-200 mb-2 shadow-sm mx-auto"><span class="w-2 h-2 bg-red-700 rounded-full animate-ping"></span>必須フロー</div><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-tight">組織として決定するプロセス</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 max-w-4xl mx-auto w-full px-4"><div class="p-4 lg:p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl lg:rounded-3xl text-center font-black text-sm lg:text-base text-slate-900 shadow-sm">1. カンファレンスで検討</div><div class="p-4 lg:p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl lg:rounded-3xl text-center font-black text-sm lg:text-base text-slate-900 shadow-sm">2. 本人・家族への説明と同意</div><div class="p-4 lg:p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl lg:rounded-3xl text-center font-black text-sm lg:text-base text-slate-900 shadow-sm">3. 記録の徹底（態様・時間）</div><div class="p-4 lg:p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl lg:rounded-3xl text-center font-black text-sm lg:text-base text-slate-900 shadow-sm">4. 解除に向けた毎日の再評価</div></div><p class="text-red-700 font-black text-[10px] lg:text-base mt-4 underline underline-offset-4 decoration-2 text-balance px-4">※個人の判断で行うことは許されません。</p></div>` },
    { title: "代替ケアの検討：転倒リスク", order: 6, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-6 lg:space-y-8 px-4 w-full"><div class="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-emerald-200 mb-2 mx-auto uppercase">Alternative Care</div><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-tight px-4 text-balance">「縛る」以外の選択肢</h4><div class="p-6 lg:p-10 bg-emerald-50 border-2 border-emerald-100 rounded-[2.5rem] lg:rounded-[4rem] shadow-inner text-left max-w-4xl space-y-4 lg:space-y-6 mx-auto"><p class="text-base lg:text-xl font-black text-emerald-900 text-center w-full">転倒を防ぐ環境調整</p><div class="grid grid-cols-1 gap-3 lg:gap-4 text-sm lg:text-lg font-bold text-slate-800"><div class="flex items-center gap-3 lg:gap-4 bg-white p-3 lg:p-4 rounded-xl lg:rounded-2xl border border-emerald-100 shadow-sm"><span class="w-6 h-6 lg:w-8 lg:h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] lg:text-sm shrink-0">1</span>低床ベッドの使用（落ちても怪我しない高さ）</div><div class="flex items-center gap-3 lg:gap-4 bg-white p-3 lg:p-4 rounded-xl lg:rounded-2xl border border-emerald-100 shadow-sm"><span class="w-6 h-6 lg:w-8 lg:h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] lg:text-sm shrink-0">2</span>衝撃吸収マットを床に敷く</div><div class="flex items-center gap-3 lg:gap-4 bg-white p-3 lg:p-4 rounded-xl lg:rounded-2xl border border-emerald-100 shadow-sm"><span class="w-6 h-6 lg:w-8 lg:h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] lg:text-sm shrink-0">3</span>離床センサーで動きを早期に察知する</div></div></div></div>` },
    { title: "代替ケアの検討：点滴抜去", order: 7, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-6 lg:space-y-8 px-4 w-full"><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-tight px-4 text-balance">「抜く理由」を考える</h4><div class="p-6 lg:p-10 bg-emerald-50 border-2 border-emerald-100 rounded-[2.5rem] lg:rounded-[4rem] shadow-inner text-left max-w-4xl space-y-4 lg:space-y-6 mx-auto"><p class="text-base lg:text-xl font-black text-emerald-900 text-center w-full">ミトンをつける前にできること</p><div class="grid grid-cols-1 gap-3 lg:gap-4 text-sm lg:text-lg font-bold text-slate-800"><div class="flex items-center gap-3 lg:gap-4 bg-white p-3 lg:p-4 rounded-xl lg:rounded-2xl border border-emerald-100 shadow-sm"><span class="w-6 h-6 lg:w-8 lg:h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] lg:text-sm shrink-0">1</span>痛みやかゆみがないか確認する</div><div class="flex items-center gap-3 lg:gap-4 bg-white p-3 lg:p-4 rounded-xl lg:rounded-2xl border border-emerald-100 shadow-sm"><span class="w-6 h-6 lg:w-8 lg:h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] lg:text-sm shrink-0">2</span>チューブが見えないよう衣服を工夫する</div><div class="flex items-center gap-3 lg:gap-4 bg-white p-3 lg:p-4 rounded-xl lg:rounded-2xl border border-emerald-100 shadow-sm"><span class="w-6 h-6 lg:w-8 lg:h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] lg:text-sm shrink-0">3</span>本当に点滴が必要か、医師と相談する</div></div></div></div>` },
    { title: "ケーススタディ：車椅子からの立ち上がり", order: 8, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-6 lg:space-y-8 px-4 w-full"><div class="inline-flex items-center gap-3 px-4 py-2 bg-orange-50 text-orange-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-orange-200 mb-2 mx-auto uppercase">Case Study</div><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-tight px-4 text-balance">場面：何度も立ち上がろうとする</h4><div class="p-6 lg:p-8 bg-white border-2 border-slate-100 rounded-[2rem] shadow-xl max-w-4xl text-left space-y-4 lg:space-y-6 w-full text-center"><p class="text-sm lg:text-xl font-bold text-slate-800 leading-relaxed text-balance px-4 text-center">認知症のA様は、車椅子から何度も立ち上がろうとし、転倒のリスクが高い状態です。<br class="lg:hidden" />忙しい業務中、あなたはベルトを使いたくなります。</p><div class="h-px bg-slate-100"></div><p class="text-xs lg:text-lg font-black text-orange-700 italic text-center px-4 text-balance text-center w-full">A様が立ち上がる「理由」は何でしょうか？<br class="lg:hidden" />トイレ？喉が渇いた？座り心地が悪い？</p></div></div>` },
    { title: "分析：理由を探れば解決策が見える", order: 9, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-6 lg:space-y-8 px-4 w-full"><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-tight px-4 text-balance">分析：ベルトなしでの解決</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 max-w-5xl mx-auto w-full"><div class="p-6 lg:p-8 bg-orange-50 border-2 border-orange-100 rounded-[2rem] text-left space-y-3 shadow-sm"><p class="font-black text-base lg:text-xl text-orange-700">【安易な拘束】</p><ul class="text-[10px] lg:text-sm font-bold text-slate-700 space-y-1"><li>・理由を考えず、ベルトで固定する</li><li>・「危ないから座って」と大声で制止する</li><li>・結果：A様は怒り、さらに暴れる</li></ul></div><div class="p-6 lg:p-8 bg-emerald-50 border-2 border-emerald-100 rounded-[2rem] text-left space-y-3 shadow-sm"><p class="font-black text-base lg:text-xl text-emerald-700">【プロの対応】</p><ul class="text-[10px] lg:text-sm font-bold text-slate-700 space-y-1"><li>・トイレ誘導を試みる（尿意の可能性）</li><li>・車椅子のクッションを調整する（痛みの除去）</li><li>・「何かお探しですか？」と優しく声をかける</li></ul></div></div></div>` },
    { title: "スピーチロック（言葉の拘束）の禁止", order: 10, content: `<div class="p-8 lg:p-12 bg-amber-50 rounded-[2.5rem] lg:rounded-[4rem] border-4 border-amber-300 border-dashed text-center shadow-inner max-w-4xl mx-auto flex flex-col items-center justify-center h-full px-4"><div class="bg-amber-700 text-white px-6 lg:px-8 py-1.5 lg:py-2 rounded-full text-[8px] lg:text-[10px] font-black inline-block mb-6 lg:mb-8 uppercase tracking-widest shadow-lg">見えない拘束</div><h4 class="text-xl lg:text-3xl font-black text-amber-950 mb-6 lg:mb-8 italic text-balance">「ちょっと待ってて」<br/>「動かないで」</h4><p class="text-lg lg:text-xl font-black text-amber-900 leading-relaxed py-4 lg:py-6 px-4">言葉で行動を制限することも「拘束」です。<br/>その一言が、利用者の意欲を奪います。</p></div>` },
    { title: "まとめ：拘束ゼロへの挑戦", order: 11, content: `<div class="flex flex-col items-center text-center space-y-8 lg:space-y-12 w-full h-full justify-center text-slate-900 px-4 text-center"><div class="w-24 h-24 lg:w-32 h-32 bg-orange-700 rounded-[2.5rem] lg:rounded-[3.5rem] flex items-center justify-center shadow-2xl shadow-orange-200 rotate-3 transition-transform hover:rotate-0 duration-500 mx-auto"><svg class="w-12 h-12 lg:w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></div><h3 class="text-2xl lg:text-5xl font-black leading-tight text-center w-full">「縛らない」は、<br/>「諦めない」こと。</h3><div class="pt-8 lg:pt-12 border-t-2 border-slate-200 w-full max-w-md text-center mx-auto"><p class="text-slate-500 font-black text-[8px] lg:text-[10px] uppercase tracking-[0.5em]">研修終了</p></div></div>` },
    { title: "理解度テストのご案内", order: 12, content: `
        <div class="flex flex-col items-center text-center space-y-6 lg:space-y-8 w-full h-full justify-center px-4 text-center">
          <div class="bg-emerald-600 text-white px-6 py-1.5 rounded-full text-[8px] lg:text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-4 lg:mb-6 shadow-lg px-4">修了</div>
          <h2 class="text-2xl lg:text-5xl font-black text-slate-900 leading-tight mb-2 lg:mb-4 text-balance text-center w-full px-4">講義セッション終了</h2>
          <p class="text-emerald-800 text-base lg:text-2xl font-black leading-relaxed text-center w-full text-balance px-4">大変お疲れ様でした。<br/>最後に理解度テスト（全10問）を行います。</p>
          <div class="p-4 lg:p-6 bg-orange-50 rounded-2xl lg:rounded-3xl border-2 border-orange-100 max-w-lg mx-auto mt-6 lg:mt-8">
            <p class="text-orange-900 font-black text-sm lg:text-xl flex items-center justify-center gap-3">
              <span class="w-2 h-2 bg-orange-700 rounded-full"></span>
              全問正解を目指しましょう！
              <span class="w-2 h-2 bg-orange-700 rounded-full"></span>
            </p>
          </div>
        </div>
      ` }
  ]

  const questionsData = [
    { text: '身体拘束が例外的に認められる「3つの要件」に含まれないものはどれか？', explanation: '切迫性（命の危険）、非代替性（他に手なし）、一時性（一時的）が3要件です。「家族の同意」は手続き上の要件ですが、3要件自体には含まれません（家族が同意しても、3要件を満たさなければ拘束は違法です）。', order: 1, choices: { create: [{ text: '家族の同意', isCorrect: true }, { text: '切迫性', isCorrect: false }, { text: '非代替性', isCorrect: false }, { text: '一時性', isCorrect: false }] } },
    { text: '次のうち、身体拘束に該当しない行為はどれか？', explanation: '離床センサーの使用は、行動を把握するためのものであり、身体の動き自体を制限するものではないため、一般的には拘束には該当しません（ただし、心理的圧迫にならないよう配慮は必要）。', order: 2, choices: { create: [{ text: '離床センサーを使用して動きを把握する', isCorrect: true }, { text: 'ベッド柵で四方を囲む', isCorrect: false }, { text: 'ミトン型手袋をつける', isCorrect: false }, { text: 'Y字ベルトで車椅子に固定する', isCorrect: false }] } },
    { text: '身体拘束を行うことによる「身体的弊害」として、誤っているものはどれか？', explanation: '身体拘束はストレスを増大させ、認知症の周辺症状（暴言・暴力など）を悪化させることが多いです。「認知症が改善する」ことはあり得ません。', order: 3, choices: { create: [{ text: '認知症の周辺症状（BPSD）が改善する', isCorrect: true }, { text: '関節が固まる（拘縮）', isCorrect: false }, { text: '筋力が低下する', isCorrect: false }, { text: '床ずれ（褥瘡）ができる', isCorrect: false }] } },
    { text: '「切迫性」の要件を満たす状態として、正しいものはどれか？', explanation: '利用者本人または他者の生命・身体に危険が差し迫っている状態を指します。', order: 4, choices: { create: [{ text: '利用者や他者の命・身体に危険が迫っている', isCorrect: true }, { text: '職員が忙しくて見守りができない', isCorrect: false }, { text: '家族から「拘束してほしい」と頼まれた', isCorrect: false }, { text: '夜間で職員の人数が少ない', isCorrect: false }] } },
    { text: '身体拘束を行う際の手続きとして、絶対に欠かせないものはどれか？', explanation: '身体拘束は重大な人権制限であるため、利用者本人（困難な場合は家族）への説明と同意、そして詳細な記録が義務付けられています。', order: 5, choices: { create: [{ text: '本人・家族への十分な説明と同意', isCorrect: true }, { text: '理事長の独断による決定', isCorrect: false }, { text: '事後報告での軽い謝罪', isCorrect: false }, { text: '口頭だけでの簡単な連絡', isCorrect: false }] } },
    { text: '車椅子から立ち上がろうとする利用者への「代替ケア」として、適切でないものはどれか？', explanation: '立ち上がれないようにベルトで固定することは、代替ケアではなく「拘束」そのものです。理由を探り、環境を調整するのが代替ケアです。', order: 6, choices: { create: [{ text: '立ち上がれないようベルトできつく固定する', isCorrect: true }, { text: 'トイレに行きたいのか確認し誘導する', isCorrect: false }, { text: '座り心地の良いクッションに交換する', isCorrect: false }, { text: '足の届く高さに車椅子を調整する', isCorrect: false }] } },
    { text: '言葉による拘束（スピーチロック）に該当する言葉はどれか？', explanation: '「ちょっと待ってて」「座ってて」など、行動を制限する言葉かけはスピーチロックと呼ばれ、心理的な拘束にあたります。', order: 7, choices: { create: [{ text: '「ちょっと待ってて！」「座ってて！」', isCorrect: true }, { text: '「どうされましたか？」', isCorrect: false }, { text: '「一緒に行きましょうか」', isCorrect: false }, { text: '「ゆっくりで大丈夫ですよ」', isCorrect: false }] } },
    { text: '点滴のチューブを抜いてしまう利用者への対応として、まず検討すべきことは？', explanation: 'いきなりミトンで拘束するのではなく、痛みやかゆみの有無を確認したり、衣服でチューブを隠したりする工夫をまず検討します。', order: 8, choices: { create: [{ text: '痛みや不快感がないかを確認する', isCorrect: true }, { text: 'すぐにミトン手袋を装着する', isCorrect: false }, { text: 'ベッドに手足を縛り付ける', isCorrect: false }, { text: '強い鎮静剤を使用する', isCorrect: false }] } },
    { text: '身体拘束を解除するために、日々行うべきことは何か？', explanation: '身体拘束は「一時的」なものであるため、状態を毎日観察し、拘束を解除できないか、または軽減できないかを検討し続ける必要があります。', order: 9, choices: { create: [{ text: '拘束の必要性を毎日再評価・検討する', isCorrect: true }, { text: '一度同意を得たら、ずっと拘束し続ける', isCorrect: false }, { text: '家族が面会に来る時だけ外す', isCorrect: false }, { text: '記録をつけるのをやめる', isCorrect: false }] } },
    { text: '「ドラッグロック」とは何を指すか？', explanation: '医療的な必要性を超えて、介護の手間を省くために向精神薬などを過剰に投与し、利用者を鎮静させる行為を指します。', order: 10, choices: { create: [{ text: '薬物によって行動を制限・鎮静させること', isCorrect: true }, { text: '薬の管理を鍵付きの棚ですること', isCorrect: false }, { text: '薬を飲み忘れないよう見守ること', isCorrect: false }, { text: '服薬ゼリーを使って飲みやすくすること', isCorrect: false }] } }
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
