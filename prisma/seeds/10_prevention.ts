import { PrismaClient } from '@prisma/client'

export async function seedPrevention(prisma: PrismaClient) {
  const slug = 'restraint' // 身体拘束廃止の共通スラグ
  const courseData = {
    slug,
    title: '身体拘束廃止研修（2024年度）',
    description: '〜自由と尊厳を守る、拘束に頼らないケア〜',
    introduction: `
        <div class="flex flex-col items-center justify-center text-center space-y-2 pt-2 px-4 text-balance">
          <div class="flex items-center gap-4">
            <span class="h-px w-8 lg:w-12 bg-red-700 rounded-full"></span>
            <p class="text-red-800 font-black tracking-widest text-lg lg:text-xl uppercase">身体拘束廃止研修</p>
            <span class="h-px w-8 lg:w-12 bg-red-700 rounded-full"></span>
          </div>
          <h2 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight">「その拘束は、本当に<br/>『命』を守るためのものですか？」</h2>
          <div class="max-w-2xl space-y-2 text-slate-800 text-sm lg:text-base leading-relaxed font-bold px-4 text-center">
            <p>「転倒が怖いから」「点滴を抜くから」<br class="lg:hidden" />そんな理由で行われる拘束が、実は利用者の「生きる意欲」を奪っているかもしれません。</p>
            <div class="p-3 lg:p-4 bg-red-50 rounded-[1.5rem] lg:rounded-[2rem] border-2 border-red-200 shadow-inner relative overflow-hidden text-[10px] lg:text-xs text-left">
              <div class="absolute top-0 right-0 w-16 h-16 lg:w-20 lg:h-20 bg-red-100/50 rounded-bl-full"></div>
              <p class="relative z-10 italic text-red-900 font-black text-xs lg:text-sm leading-relaxed">身体拘束は、単なる行動制限ではなく、その方の「人権」そのものを縛る行為です。2024年度の運営基準でも、拘束ゼロへの取り組みは、施設の質を問う絶対的な条件となっています。</p>
            </div>
            <p class="text-[10px] lg:text-sm text-slate-900 font-black text-center mt-2">この研修は、拘束という安易な手段を捨て、プロとして「自由」を守り抜く覚悟を決めるためのものです。</p>
          </div>
        </div>
      `,
    learningObjectives: `
        <div class="flex flex-col items-center justify-center text-center space-y-3 pt-2 px-4 w-full text-balance text-center">
          <div class="bg-red-700 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-1 shadow-lg shadow-red-200">Learning Objectives</div>
          <div class="grid grid-cols-1 gap-2 w-full max-w-2xl">
            <div class="group p-3 lg:p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-red-400 transition-all duration-500 text-center lg:text-left">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-red-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-red-200">1</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-base font-black text-slate-900">身体拘束の3要件を完遂できる</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-tight">切迫性・非代替性・一時性の定義を理解し、例外的な拘束時の法的正当性を判断できる。</p>
              </div>
            </div>
            <div class="group p-3 lg:p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-red-400 transition-all duration-500 text-center lg:text-left">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-red-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-red-200">2</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-base font-black text-slate-900">拘束の弊害を科学的に理解する</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-tight">筋力低下、褥瘡、認知症悪化など、拘束がもたらす身体的・精神的な「二次被害」を学ぶ。</p>
              </div>
            </div>
            <div class="group p-3 lg:p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-red-400 transition-all duration-500 text-center lg:text-left">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-red-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-red-200">3</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-base font-black text-slate-900">具体的な代替ケアを提案できる</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-tight">立ち上がりや点滴抜去に対し、拘束以外の方法（環境調整や関わり）を選択できるようになる。</p>
              </div>
            </div>
          </div>
        </div>
      `,
    badgeLabel: '拘束廃止',
    badgeIcon: 'UserX',
  }

  const slidesData = [
    { title: "身体拘束廃止研修", order: 0, content: `<div class="flex flex-col items-center justify-center text-center space-y-4 w-full h-full text-balance"><div class="relative w-full max-w-4xl px-4"><div class="absolute inset-0 bg-red-400 blur-3xl opacity-20 scale-150 animate-pulse"></div><div class="relative bg-transparent lg:bg-white p-0 lg:p-12 rounded-none lg:rounded-[3.5rem] shadow-none lg:shadow-2xl border-none lg:border lg:border-slate-200 w-full mx-auto text-center"><div class="bg-red-700 text-white px-4 lg:px-6 py-1 lg:py-1.5 rounded-full text-[8px] lg:text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-6 lg:mb-8 shadow-sm">法定研修 2024</div><h2 class="text-3xl lg:text-5xl font-black text-slate-900 leading-tight mb-4 text-center">身体拘束廃止研修</h2><p class="text-red-700 text-sm lg:text-2xl font-black mt-2 whitespace-nowrap text-center">〜自由と尊厳を守り抜くために〜</p></div></div><div class="flex items-center justify-center gap-4 text-slate-500 font-black text-[8px] lg:text-[10px] tracking-widest pt-4 text-center"><span class="h-px w-6 lg:w-8 bg-slate-300"></span>CARE LEARNING SYSTEM<span class="h-px w-6 lg:w-8 bg-slate-300"></span></div></div>` },
    { title: "身体拘束とは？：定義の確認", order: 1, content: `<div class="space-y-4 lg:space-y-6 text-center px-4 h-full flex flex-col justify-center text-balance"><div class="inline-flex items-center gap-3 px-4 py-1.5 bg-red-100 text-red-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-red-200 mb-2 uppercase tracking-widest mx-auto text-center">行動の自由の剥奪</div><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight px-4 text-center w-full">「自分の意思で動けない」状態</h4><div class="p-0 lg:p-8 bg-transparent lg:bg-red-50 border-none lg:border-2 lg:border-red-100 shadow-none lg:shadow-xl rounded-none lg:rounded-[3rem] text-center lg:text-left text-sm lg:text-lg font-bold text-red-800 space-y-4 max-w-4xl mx-auto px-4 text-center"><p class="font-black text-center text-balance">身体拘束とは、衣類または綿入り手袋（ミトン）の着用、および器具を使用して、一時的に本人の身体を制限し、その行動の自由を奪う行為を指します。</p></div></div>` },
    { title: "拘束の種類1：物理的な制限", order: 2, content: `<div class="space-y-4 lg:space-y-6 text-center px-4 h-full flex flex-col justify-center text-balance"><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight mb-2 px-4 text-center w-full">現場に潜む代表的な拘束</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl mx-auto w-full text-center"><div class="p-6 lg:p-8 bg-white border-2 border-slate-200 rounded-[2rem] lg:rounded-[2.5rem] shadow-xl flex flex-col items-center gap-2 lg:gap-4"><p class="font-black text-lg lg:text-xl text-red-800">四方を柵で囲む</p><p class="text-xs lg:text-sm font-bold text-slate-700 leading-relaxed text-center">ベッドの四方をサイドレール等で囲い、自力で降りられないようにする行為。</p></div><div class="p-6 lg:p-8 bg-white border-2 border-slate-200 rounded-[2rem] lg:rounded-[2.5rem] shadow-xl flex flex-col items-center gap-2 lg:gap-4"><p class="font-black text-lg lg:text-xl text-red-800">ミトン・ベルトの使用</p><p class="text-xs lg:text-sm font-bold text-slate-700 leading-relaxed text-center">チューブを抜かないよう手を覆う、車椅子から落ちないようベルトで縛る行為。</p></div></div></div>` },
    { title: "拘束の種類2：言葉と薬物", order: 3, content: `<div class="space-y-6 lg:space-y-8 text-center h-full flex flex-col justify-center px-4 text-balance"><div class="inline-flex items-center gap-3 px-4 py-2 bg-red-100 text-red-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-red-200 mb-2 shadow-sm mx-auto uppercase tracking-widest"><span class="w-2 h-2 bg-red-700 rounded-full animate-ping"></span>MUST CHECK</div><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight text-center w-full">心と脳を縛る行為</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 max-w-4xl mx-auto w-full text-center px-4"><div class="p-4 lg:p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl lg:rounded-3xl text-center font-black text-sm lg:text-base text-slate-900 shadow-sm">スピーチロック（言葉による拘束）：「座ってて！」「ダメ！」</div><div class="p-4 lg:p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl lg:rounded-3xl text-center font-black text-sm lg:text-base text-slate-900 shadow-sm">化学的拘束：不穏を抑えるために、向精神薬を過剰に投与すること</div></div></div>` },
    { title: "拘束がもたらす4つの弊害", order: 4, content: `<div class="flex flex-col items-center text-center space-y-4 lg:space-y-6 px-4 h-full justify-center text-balance text-center"><div class="p-4 lg:p-6 bg-white rounded-[2rem] lg:rounded-[3.5rem] w-full max-w-2xl shadow-xl border-2 border-slate-200 shrink-0 text-center"><h4 class="text-xl lg:text-2xl font-black mb-2 text-slate-900 text-center">「守る」つもりが「壊す」結果に</h4></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-3 font-black text-[10px] lg:text-sm w-full max-w-5xl"><div class="p-3 bg-red-50 border-2 border-red-200 rounded-2xl text-left"><p class="text-red-900 mb-1">身体的弊害</p><p class="text-slate-600">筋力の低下（廃用症候群）、褥瘡、食欲不振、心肺機能の低下。</p></div><div class="p-3 bg-red-50 border-2 border-red-200 rounded-2xl text-left"><p class="text-red-900 mb-1">精神的弊害</p><p class="text-slate-600">絶望感、屈辱感、恐怖。認知症の症状が急速に悪化（不穏等）。</p></div><div class="p-3 bg-red-50 border-2 border-red-200 rounded-2xl text-left"><p class="text-red-900 mb-1">社会的弊害</p><p class="text-slate-600">家族との信頼関係の崩壊。施設全体の「介護の質」への不信感。</p></div><div class="p-3 bg-red-50 border-2 border-red-200 rounded-2xl text-left"><p class="text-red-900 mb-1">経済的弊害</p><p class="text-slate-600">ADL低下による介護負担増、基本報酬の減算対象。</p></div></div></div>` },
    { title: "拘束禁止の例外：3要件", order: 5, content: `<div class="flex flex-col justify-center h-full space-y-6 lg:space-y-8 px-4 lg:px-12 text-left text-balance"><div class="space-y-4 text-center"><h4 class="text-2xl lg:text-4xl font-black text-red-900 flex items-center gap-4 lg:gap-6 justify-center"><span class="w-2 h-8 lg:w-3 lg:h-12 bg-red-700 rounded-full"></span>やむを得ない場合の3要件</h4></div><ul class="space-y-4 lg:space-y-6 text-lg lg:text-3xl font-black text-slate-800 pl-0 leading-tight text-center"><li>1. 切迫性：本人や他者の命に危険が目前にある</li><li>2. 非代替性：他に代わるケアの方法が全くない</li><li>3. 一時性：短時間かつ限定的である</li></ul><p class="text-red-700 font-black text-[10px] lg:text-lg mt-4 text-center w-full">※3つ全てを満たし、記録を残すことが義務です</p></div>` },
    { title: "手続きなしの拘束は「虐待」", order: 6, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-4 lg:space-y-6 px-4 w-full text-balance"><div class="inline-flex items-center gap-3 px-4 py-1.5 bg-red-100 text-red-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-red-200 mb-2 mx-auto uppercase tracking-widest text-center">重大な権利侵害</div><h4 class="text-xl lg:text-2xl font-black text-red-900 leading-tight px-4 text-center w-full">安易な判断が罪を生む</h4><div class="p-6 lg:p-8 bg-white border-[4px] lg:border-[6px] border-red-600 rounded-[2rem] lg:rounded-[3rem] shadow-2xl max-w-3xl mx-auto w-full text-center"><p class="text-lg lg:text-2xl font-black text-red-900 leading-relaxed italic text-balance text-center">正式な手続きを経ない拘束は、法的に「虐待」とみなされます。個人の判断で行うことは許されません。</p></div></div>` },
    { title: "代替案1：転倒への対策", order: 7, content: `<div class="flex flex-col justify-center h-full space-y-6 lg:space-y-8 px-4 lg:px-12 text-left text-balance"><div class="space-y-4 text-center"><h4 class="text-2xl lg:text-4xl font-black text-emerald-900 flex items-center gap-4 lg:gap-6 justify-center"><span class="w-2 h-8 lg:w-3 lg:h-12 bg-emerald-700 rounded-full"></span>転倒を防ぐ代替ケア</h4></div><ul class="space-y-4 lg:space-y-6 text-lg lg:text-3xl font-black text-slate-800 pl-0 leading-tight text-center"><li>・離床センサーによる早期の気づき</li><li>・ベッドの高さを「超低床」にする</li><li>・衝撃を吸収する床マットの活用</li></ul><p class="text-blue-700 font-black text-sm lg:text-xl mt-4 text-center w-full">「縛る」よりも「安全な環境」を作る</p></div>` },
    { title: "代替案2：点滴抜去への対策", order: 8, content: `<div class="flex flex-col justify-center h-full space-y-6 lg:space-y-8 px-4 lg:px-12 text-left text-balance text-center"><div class="space-y-4 text-center"><h4 class="text-2xl lg:text-4xl font-black text-emerald-900 flex items-center gap-4 lg:gap-6 justify-center"><span class="w-2 h-8 lg:w-3 lg:h-12 bg-emerald-700 rounded-full"></span>不快感を取り除く</h4></div><ul class="space-y-4 lg:space-y-6 text-lg lg:text-3xl font-black text-slate-800 pl-0 leading-tight text-center"><li>・抜去：チューブを衣服の中に隠す</li><li>・弄便：排泄リズムの把握と早期対応</li><li>・注意を逸らす（手遊び、音楽、会話）</li></ul></div>` },
    { title: "代替案3：なぜ立ち上がるのか？", order: 9, content: `<div class="flex flex-col items-center text-center space-y-4 lg:space-y-6 px-4 h-full justify-center text-balance text-center"><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight text-center w-full">「ニーズ」を満たす介助へ</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-3 font-black text-sm lg:text-base w-full max-w-4xl text-center"><div class="flex flex-col gap-3"><span class="px-6 py-2.5 bg-emerald-50 border-2 border-emerald-200 rounded-2xl text-emerald-900 shadow-sm text-center">便意・尿意はないか？</span><span class="px-6 py-2.5 bg-emerald-50 border-2 border-emerald-200 rounded-2xl text-emerald-900 shadow-sm text-center">痛みや痒みはないか？</span></div><div class="flex flex-col gap-3"><span class="px-6 py-2.5 bg-emerald-50 border-2 border-emerald-200 rounded-2xl text-emerald-900 shadow-sm text-center text-balance">座り心地は悪くないか？</span><span class="px-6 py-2.5 bg-emerald-50 border-2 border-emerald-200 rounded-2xl text-emerald-900 shadow-sm text-center text-balance">不安ではないか？</span></div></div></div>` },
    { title: "身体拘束廃止委員会の役割", order: 10, content: `<div class="flex flex-col items-center justify-center h-full space-y-6 lg:space-y-8 px-4 w-full text-balance text-center"><h4 class="text-xl lg:text-2xl font-black text-slate-900 text-center w-full mb-2 px-4">組織で取り組むゼロへの道</h4><div class="grid grid-cols-1 gap-3 lg:gap-4 w-full max-w-2xl text-center"><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center shrink-0">1</span>3ヶ月に1回以上の定期的な開催</div><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center shrink-0">2</span>拘束を行っている全事例の個別検討</div><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center shrink-0">3</span>廃止に向けた具体的期限と対策の策定</div></div></div>` },
    { title: "家族への説明と同意：信頼構築", order: 11, content: `<div class="flex flex-col items-center justify-center h-full space-y-6 lg:space-y-8 px-4 w-full text-balance text-center"><h4 class="text-xl lg:text-2xl font-black text-slate-900 text-center w-full mb-2 px-4">「安全のため」だけでは不十分</h4><div class="grid grid-cols-1 gap-3 lg:gap-4 w-full max-w-2xl text-center"><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center shrink-0">1</span>拘束によるデメリットを正直に伝える</div><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center shrink-0">2</span>廃止に向けた施設の「努力」を共有する</div><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center shrink-0">3</span>「一緒に見守る」関係性を築く</div></div></div>` },
    { title: "満足感：外す勇気が尊厳を守る", order: 12, content: `<div class="space-y-6 lg:space-y-8 text-center flex flex-col items-center justify-center h-full px-4 w-full text-balance text-center"><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight px-4 text-center w-full">プロとしての挑戦</h4><div class="p-8 lg:p-10 bg-white border-[4px] lg:border-[6px] border-red-600 rounded-[2rem] lg:rounded-[3rem] shadow-2xl max-w-3xl mx-auto w-full text-center"><p class="text-xl lg:text-2xl font-black text-red-900 leading-relaxed italic text-balance text-center">身体拘束を外した後に見せる、<br/>利用者の「晴れやかな表情」。<br/>それこそが、私たちの目指すべき姿です。</p></div><p class="font-black text-sm lg:text-lg text-slate-800 mt-2 text-center w-full px-4">拘束に頼らない技術を、共に磨き続けましょう。</p></div>` },
    { title: "不適切なフットレフト外し", order: 13, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-4 lg:space-y-6 px-4 w-full text-balance text-center"><div class="inline-flex items-center gap-3 px-4 py-1.5 bg-red-50 text-red-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-red-200 mb-2 mx-auto uppercase">不適切な使用</div><h4 class="text-xl lg:text-2xl font-black text-red-900 leading-tight px-4 text-center w-full">「足」を奪わない</h4><div class="p-6 lg:p-8 bg-white border-[4px] lg:border-[6px] border-red-600 rounded-[2rem] lg:rounded-[3rem] shadow-2xl max-w-3xl mx-auto w-full text-center"><p class="text-lg lg:text-2xl font-black text-red-900 leading-relaxed italic text-balance text-center">自力で立ち上がれる方のフットレフト（足置き）を外し、座面を高くして立ち上がれなくする行為は、身体拘束です。</p></div></div>` },
    { title: "認知症と身体拘束の関係性", order: 14, content: `<div class="flex flex-col items-center justify-center h-full text-left space-y-4 lg:space-y-6 px-6 lg:px-12 w-full text-balance text-center"><h4 class="text-xl lg:text-2xl font-black text-red-900 text-center mb-2 uppercase tracking-widest w-full px-4">不安を増幅させる悪循環</h4><div class="p-6 bg-white border-2 border-red-100 rounded-3xl text-left max-w-3xl space-y-4 shadow-sm mx-auto text-center"><p class="text-sm lg:text-lg font-black text-slate-800 leading-relaxed text-center text-balance">拘束される理由が理解できない方にとって、拘束は恐怖でしかありません。恐怖からパニックが強まり、さらに拘束を強めるという負の連鎖を断ち切る必要があります。</p></div></div>` },
    { title: "環境調整：暗がりを作らない", order: 15, content: `<div class="flex flex-col items-center justify-center h-full text-left space-y-4 lg:space-y-6 px-6 lg:px-12 w-full text-balance text-center"><h4 class="text-xl lg:text-2xl font-black text-emerald-900 text-center mb-2 uppercase tracking-widest w-full px-4 text-center">視覚的な安心を</h4><div class="space-y-6 lg:space-y-8 font-black text-slate-900 max-w-4xl mx-auto w-full text-center"><div><p class="text-lg lg:text-2xl text-emerald-700 mb-1 flex items-center gap-3 justify-center"><span>●</span> 足元の照明</p><p class="text-sm lg:text-lg text-slate-600 font-bold text-center">夜間の足元灯を整備し、自分の位置を把握しやすくする。</p></div><div><p class="text-lg lg:text-2xl text-emerald-700 mb-1 flex items-center gap-3 justify-center"><span>●</span> 衣服の調整</p><p class="text-sm lg:text-lg text-slate-600 font-bold text-center">裾の長いパジャマや、滑りやすい靴下を改善する。</p></div></div></div>` },
    { title: "身体拘束記録の必須3項目", order: 16, content: `<div class="flex flex-col items-center justify-center h-full space-y-6 lg:space-y-8 px-4 w-full text-balance text-center"><h4 class="text-xl lg:text-2xl font-black text-slate-900 text-center w-full mb-2 px-4">法的保護のための記録</h4><div class="grid grid-cols-1 gap-3 lg:gap-4 w-full max-w-2xl text-center"><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center shrink-0">1</span>拘束の具体的態様（方法）と理由</div><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center shrink-0">2</span>拘束の開始時間と終了時間</div><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center shrink-0">3</span>その際の本人の心身の状況</div></div></div>` },
    { title: "まとめ：今日から変えられること", order: 17, content: `<div class="flex flex-col items-center text-center space-y-6 lg:space-y-10 w-full h-full justify-center text-slate-900 px-4 text-center text-balance"><div class="w-24 h-24 lg:w-28 h-28 bg-red-700 rounded-[2.5rem] lg:rounded-[3rem] flex items-center justify-center shadow-2xl shadow-red-200 rotate-3 transition-transform hover:rotate-0 duration-500 mx-auto"><svg class="w-12 h-12 lg:w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></div><h3 class="text-2xl lg:text-4xl font-black leading-tight text-center w-full text-balance">縛らない、諦めない。<br/>それがプロのケアです。</h3><div class="pt-8 lg:pt-10 border-t-2 border-slate-200 w-full max-w-md text-center mx-auto"><p class="text-slate-500 font-black text-[8px] lg:text-[10px] uppercase tracking-[0.5em]">研修終了</p></div></div>` },
    { title: "理解度テストのご案内", order: 18, content: `
        <div class="flex flex-col items-center text-center space-y-4 lg:space-y-6 w-full h-full justify-center px-4 text-center text-balance">
          <div class="bg-emerald-600 text-white px-6 py-1.5 rounded-full text-[8px] lg:text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-4 lg:mb-2 shadow-lg px-4 text-center">修了</div>
          <h2 class="text-2xl lg:text-4xl font-black text-slate-900 leading-tight mb-2 text-center w-full text-balance">講義セッション終了</h2>
          <p class="text-emerald-800 text-base lg:text-xl font-black leading-relaxed text-center w-full text-balance px-4">大変お疲れ様でした。<br/>最後に理解度テスト（全10問）を行います。</p>
          <div class="p-4 lg:p-6 bg-red-50 rounded-2xl lg:rounded-3xl border-2 border-red-100 max-w-lg mx-auto mt-6">
            <p class="text-red-900 font-black text-sm lg:text-lg flex items-center justify-center gap-3 text-center">
              <span class="w-2 h-2 bg-red-700 rounded-full"></span>    
              全問正解を目指しましょう！
              <span class="w-2 h-2 bg-red-700 rounded-full"></span>    
            </p>
          </div>
        </div>
      ` }
  ]

  const questionsData = [
    { text: '身体拘束が例外的に認められる「3つの要件」に含まれないものはどれか？', explanation: '切迫性、非代替性、一時性が3要件です。「家族の同意」は手続き上の要件ですが、3要件自体には含まれません。', order: 1, choices: { create: [{ text: '家族の同意', isCorrect: true }, { text: '切迫性', isCorrect: false }, { text: '非代替性', isCorrect: false }, { text: '一時性', isCorrect: false }] } },
    { text: '次のうち、身体拘束に該当しない行為はどれか？', explanation: '離床センサーの使用は、行動を把握するためのものであり、身体の動き自体を制限するものではないため拘束には該当しません。', order: 2, choices: { create: [{ text: '離床センサーを使用して動きを把握する', isCorrect: true }, { text: 'ベッド柵で四方を囲む', isCorrect: false }, { text: 'ミトン型手袋をつける', isCorrect: false }, { text: 'Y字ベルトで車椅子に固定する', isCorrect: false }] } },
    { text: '身体拘束を行うことによる「身体的弊害」として、誤っているものはどれか？', explanation: '身体拘束はストレスを増大させ、認知症の症状を悪化させることが多いです。「認知症が改善する」ことはありません。', order: 3, choices: { create: [{ text: '認知症の症状が改善する', isCorrect: true }, { text: '関節が固まる（拘縮）', isCorrect: false }, { text: '筋力が低下する', isCorrect: false }, { text: '床ずれ（褥瘡）ができる', isCorrect: false }] } },
    { text: '「切迫性」の要件を満たす状態として、正しいものはどれか？', explanation: '利用者本人または他者の生命・身体に危険が差し迫っている状態を指します。', order: 4, choices: { create: [{ text: '利用者や他者の命・身体に危険が迫っている', isCorrect: true }, { text: '職員が忙しくて見守りができない', isCorrect: false }, { text: '家族から「拘束してほしい」と頼まれた', isCorrect: false }] } },
    { text: '身体拘束を行う際の手続きとして、運営基準で義務付けられているものはどれか？', explanation: '本人（家族）への説明と同意、および詳細な記録が厳格に義務付けられています。', order: 5, choices: { create: [{ text: '本人・家族への十分な説明と同意', isCorrect: true }, { text: '管理者の独断による即時決定', isCorrect: false }, { text: '事後報告のみの対応', isCorrect: false }] } },
    { text: '車椅子から立ち上がろうとする利用者への「代替ケア」として、適切でないものはどれか？', explanation: 'ベルトで固定することは「拘束」そのものです。理由を探り環境を整えるのが代替ケアです。', order: 6, choices: { create: [{ text: '立ち上がれないようベルトで固定する', isCorrect: true }, { text: 'トイレに行きたいのか確認し誘導する', isCorrect: false }, { text: '座り心地の良いクッションに交換する', isCorrect: false }] } },
    { text: '言葉による拘束（スピーチロック）に該当する言葉はどれか？', explanation: '「ちょっと待ってて」「座ってて」など、行動を制限する言葉かけは心理的な拘束にあたります。', order: 7, choices: { create: [{ text: '「ちょっと待ってて！」「座ってて！」', isCorrect: true }, { text: '「どうされましたか？」', isCorrect: false }, { text: '「一緒に行きましょうか」', isCorrect: false }] } },
    { text: '点滴のチューブを抜いてしまう利用者への対応として、まず検討すべきことは？', explanation: 'いきなりミトンを使うのではなく、痛みやかゆみの確認、衣服での保護などをまず検討します。', order: 8, choices: { create: [{ text: '痛みや不快感がないかを確認する', isCorrect: true }, { text: 'すぐにミトン手袋を装着する', isCorrect: false }, { text: 'ベッドに手足を縛り付ける', isCorrect: false }] } },
    { text: '身体拘束を解除するために、日々行うべきことは何か？', explanation: '状態を毎日観察し、拘束を解除できないか、軽減できないかを検討し続ける必要があります。', order: 9, choices: { create: [{ text: '拘束の必要性を毎日再評価・検討する', isCorrect: true }, { text: '一度同意を得たら、ずっと拘束し続ける', isCorrect: false }, { text: '家族が面会に来る時だけ外す', isCorrect: false }] } },
    { text: '「ドラッグロック」とは何を指すか？', explanation: '医療的な必要性を超えて、介護の手間を省くために向精神薬などを過剰に投与し鎮静させる行為です。', order: 10, choices: { create: [{ text: '薬物によって行動を制限・鎮静させること', isCorrect: true }, { text: '薬の管理を鍵付きの棚ですること', isCorrect: false }, { text: '薬を飲み忘れないよう見守ること', isCorrect: false }] } }
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
