import { PrismaClient } from '@prisma/client'

export async function seedHarassment(prisma: PrismaClient) {
  const slug = 'harassment'
  const courseData = {
    slug,
    title: 'ハラスメント対策研修（2024年度）',
    description: '〜誰もが安心して働ける、尊厳ある職場を創るために〜',
    introduction: `
        <div class="flex flex-col items-center justify-center text-center space-y-3 pt-4 px-4">
          <div class="flex items-center gap-4">
            <span class="h-px w-8 lg:w-12 bg-rose-700 rounded-full"></span>
            <p class="text-rose-800 font-black tracking-widest text-lg lg:text-2xl uppercase">ハラスメント対策研修</p>
            <span class="h-px w-8 lg:w-12 bg-rose-700 rounded-full"></span>
          </div>
          <h2 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight">「その言動、<br class="lg:hidden"/>相手はどう感じていますか？」</h2>
          <div class="max-w-2xl space-y-2 text-slate-800 text-sm lg:text-base leading-relaxed font-bold">
            <p>「熱心な指導のつもりだった」「冗談のつもりだった」<br/>その主観が、知らぬ間に誰かの尊厳を傷つけ、<br class="lg:hidden" />職場を破壊しているかもしれません。</p>
            <div class="p-4 lg:p-5 bg-rose-50 rounded-[1.5rem] lg:rounded-[2rem] border-2 border-rose-200 shadow-inner relative overflow-hidden text-[10px] lg:text-xs text-left mt-4">
              <div class="absolute top-0 right-0 w-16 h-16 lg:w-24 lg:h-24 bg-rose-100/50 rounded-bl-full"></div>
              <p class="relative z-10 italic text-rose-900 font-black text-xs lg:text-sm">ハラスメントは個人の尊厳を傷つけるだけでなく、離職の連鎖やケアの質の低下を招く、組織にとっての「猛毒」です。</p>
            </div>
            <p class="text-[10px] lg:text-sm text-slate-900 font-black text-center mt-4">2024年度からの義務化に伴い、今、全ての職員に<br/>「正しく恐れ、正しく振る舞う」知性が求められています。</p>
          </div>
        </div>
      `,
    learningObjectives: `
        <div class="flex flex-col items-center justify-center text-center space-y-4 pt-4 px-4 w-full">
          <div class="bg-rose-700 text-white px-6 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-2 shadow-lg shadow-rose-200">Learning Objectives</div>
          <div class="grid grid-cols-1 gap-3 w-full max-w-2xl">
            <div class="group p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-rose-400 transition-all duration-500">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-rose-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-rose-200">1</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-lg font-black text-slate-900">境界線を正しく理解する</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-relaxed">パワハラ、セクハラ、カスハラの定義と、指導との違いを明確に説明できる。</p>
              </div>
            </div>
            <div class="group p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-rose-400 transition-all duration-500">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-rose-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-rose-200">2</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-lg font-black text-slate-900">組織的な対応力を身につける</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-relaxed">ハラスメント発生時やカスハラ遭遇時に、独りで抱えずチームで動く手順を知る。</p>
              </div>
            </div>
            <div class="group p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-rose-400 transition-all duration-500">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-rose-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-rose-200">3</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-lg font-black text-slate-900">心理的安全性を自ら創る</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold">感情のコントロールやアサーティブな対話を通じ、風通しの良い職場を支える。</p>
              </div>
            </div>
          </div>
        </div>
      `,
    badgeLabel: 'ハラスメント',
    badgeIcon: 'ShieldCheck',
  }

  const slidesData = [
    { title: "ハラスメント対策研修", order: 0, content: `<div class="flex flex-col items-center justify-center text-center space-y-6 w-full h-full"><div class="relative w-full max-w-4xl px-4"><div class="absolute inset-0 bg-rose-400 blur-3xl opacity-20 scale-150 animate-pulse"></div><div class="relative bg-transparent lg:bg-white p-0 lg:p-16 rounded-none lg:rounded-[3.5rem] shadow-none lg:shadow-2xl border-none lg:border lg:border-slate-200 w-full mx-auto"><div class="bg-rose-700 text-white px-4 lg:px-6 py-1 lg:py-1.5 rounded-full text-[8px] lg:text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-6 lg:mb-8 shadow-sm">Legal Training 2024</div><h2 class="text-3xl lg:text-6xl font-black text-slate-900 leading-tight mb-4 text-balance px-4">ハラスメント対策研修</h2><p class="text-rose-700 text-sm lg:text-3xl font-black mt-2 whitespace-nowrap">〜誰もが自分らしく輝ける職場へ〜</p></div></div><div class="flex items-center justify-center gap-4 text-slate-500 font-black text-[8px] lg:text-[10px] tracking-widest pt-4"><span class="h-px w-6 lg:w-8 bg-slate-300"></span>CARE LEARNING SYSTEM<span class="h-px w-6 lg:w-8 bg-slate-300"></span></div></div>` },
    
    { title: "はじめに：義務化の重み", order: 1, content: `<div class="space-y-6 lg:space-y-8 text-center px-4 h-full flex flex-col justify-center"><div class="inline-flex items-center gap-3 px-4 py-2 bg-rose-100 text-rose-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-rose-200 mb-2 uppercase tracking-widest mx-auto">Obligation</div><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-tight px-4 text-balance">2024年度、全ての介護事業所に<br/>「ハラスメント防止措置」が義務化</h4><div class="p-0 lg:p-10 bg-transparent lg:bg-rose-50 border-none lg:border-2 lg:border-rose-100 shadow-none lg:shadow-xl rounded-none lg:rounded-[3rem] text-center lg:text-left text-sm lg:text-xl font-bold text-rose-800 space-y-4 lg:space-y-6 leading-relaxed max-w-4xl mx-auto px-4"><p class="font-black text-center lg:text-left text-balance">ハラスメントは、単なる「人間関係のトラブル」ではありません。法的に整備が義務付けられた、経営上の最重要課題の一つです。</p><p class="font-black text-rose-700 underline underline-offset-4 text-center lg:text-left text-balance">※対策を怠ると、虐待防止と同様、基本報酬の減算対象となる可能性があります。</p></div></div>` },

    { title: "ハラスメントが招く「組織の崩壊」", order: 2, content: `<div class="space-y-6 lg:space-y-10 text-center flex flex-col items-center justify-center h-full px-4 w-full"><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-relaxed mb-4 lg:mb-8 text-balance">ハラスメントを放置するコスト</h4><div class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto w-full"><div class="p-6 bg-white border-2 border-slate-200 rounded-3xl shadow-xl flex flex-col items-center gap-4"><div class="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-black">1</div><p class="font-black text-lg text-rose-800">人材の流出</p><p class="text-xs font-bold text-slate-600 text-balance text-center">優秀な職員から先に辞めていき、求人を出しても誰も来ない職場になります。</p></div><div class="p-6 bg-white border-2 border-slate-200 rounded-3xl shadow-xl flex flex-col items-center gap-4"><div class="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-black">2</div><p class="font-black text-lg text-rose-800">ケアの質の低下</p><p class="text-xs font-bold text-slate-600 text-balance text-center">恐怖による支配は職員の思考を停止させ、事故や虐待の温床となります。</p></div><div class="p-6 bg-white border-2 border-slate-200 rounded-3xl shadow-xl flex flex-col items-center gap-4"><div class="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-black">3</div><p class="font-black text-lg text-rose-800">法的リスク</p><p class="text-xs font-bold text-slate-600 text-balance text-center">損害賠償、行政処分、そしてSNSでの拡散。築き上げた信頼が瞬時に失われます。</p></div></div></div>` },

    { title: "1. パワーハラスメント（パワハラ）の定義", order: 3, content: `<div class="flex flex-col justify-center h-full space-y-8 lg:space-y-12 px-4 lg:px-12 text-left"><div class="space-y-4 lg:space-y-6"><h4 class="text-2xl lg:text-5xl font-black text-blue-900 flex items-center gap-4 lg:gap-6"><span class="w-2 h-10 lg:w-3 lg:h-16 bg-blue-700 rounded-full"></span>パワハラの「3要素」</h4></div><div class="space-y-4 lg:space-y-6 font-black text-slate-800 max-w-4xl"><p class="text-lg lg:text-2xl leading-relaxed">以下の3つを「全て満たすもの」がパワハラです：</p><ul class="space-y-4 lg:space-y-6 text-base lg:text-3xl pl-4"><li class="flex items-start gap-3"><span class="text-blue-700 text-2xl lg:text-4xl">①</span><span>優越的な関係を背景とした言動</span></li><li class="flex items-start gap-3"><span class="text-blue-700 text-2xl lg:text-4xl">②</span><span>業務上必要かつ相当な範囲を超えたもの</span></li><li class="flex items-start gap-3"><span class="text-blue-700 text-2xl lg:text-4xl">③</span><span>就業環境を害するもの（身体・精神的苦痛）</span></li></ul></div></div>` },

    { title: "「指導」と「パワハラ」の境界線", order: 4, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-6 lg:space-y-8 px-4 w-full"><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-tight">人格否定は100%パワハラです</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 max-w-5xl mx-auto w-full"><div class="p-6 lg:p-8 bg-blue-50 border-2 border-blue-100 rounded-[2rem] text-left space-y-3 shadow-sm"><p class="font-black text-base lg:text-xl text-blue-700">【業務上の指導】</p><ul class="text-[10px] lg:text-sm font-bold text-slate-700 space-y-1"><li>・目的が「業務の改善」にある</li><li>・相手の成長を願う意図がある</li><li>・ミスに対して、事実に基づき改善を促す</li><li>・対等な人間としての敬意がある</li></ul></div><div class="p-6 lg:p-8 bg-rose-50 border-2 border-rose-100 rounded-[2rem] text-left space-y-3 shadow-sm"><p class="font-black text-base lg:text-xl text-rose-700">【パワハラ】</p><ul class="text-[10px] lg:text-sm font-bold text-slate-700 space-y-1"><li>・目的が「感情の発散」にある</li><li>・「バカ」「辞めろ」など人格を否定する</li><li>・長時間、大声で、見せしめのように叱責する</li><li>・不可能な目標や、雑用ばかりを強いる</li></ul></div></div></div>` },

    { title: "2. セクシュアルハラスメント（セクハラ）", order: 5, content: `<div class="flex flex-col justify-center h-full space-y-8 lg:space-y-12 px-4 lg:px-12 text-left"><div class="space-y-4 lg:space-y-6"><h4 class="text-2xl lg:text-5xl font-black text-purple-900 flex items-center gap-4 lg:gap-6"><span class="w-2 h-10 lg:w-3 lg:h-16 bg-purple-700 rounded-full"></span>セクハラは「主観」が基準</h4></div><div class="space-y-6 lg:space-y-10 max-w-4xl"><p class="text-lg lg:text-3xl font-black text-slate-800 leading-relaxed text-balance">性的な言動により、相手が「不快だ」と感じれば、それはセクハラになり得ます。</p><div class="grid grid-cols-1 gap-4 font-black text-slate-700 text-sm lg:text-2xl"><div>・不必要な身体への接触（腰、肩、手など）</div><div>・性的な冗談、外見への執拗な言及</div><div>・食事やデートへの執拗な誘い</div><div>・「男（女）のくせに」といった役割の押し付け</div></div><p class="text-xs lg:text-lg font-bold text-rose-700 bg-rose-50 p-4 rounded-xl text-balance">※「そんなつもりじゃなかった」「冗談のつもりだった」は加害者の言い訳に過ぎません。</p></div></div>` },

    { title: "3. マタニティハラスメント等", order: 6, content: `<div class="flex flex-col items-center justify-center h-full text-left space-y-6 lg:space-y-10 px-6 lg:px-12 w-full"><h4 class="text-xl lg:text-3xl font-black text-emerald-800 flex items-center gap-4 w-full"><span class="w-2 h-10 lg:w-3 lg:h-16 bg-emerald-600 rounded-full"></span>妊娠・出産・育休への嫌がらせ</h4><p class="text-sm lg:text-2xl font-black leading-relaxed text-slate-900 max-w-4xl bg-emerald-50 p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-emerald-100 w-full text-balance">妊娠した職員に対し「忙しい時期に迷惑だ」「休むなら辞めろ」と言う、あるいは昇進・昇格で不利益な扱いをすることは法律で固く禁じられています。</p><p class="text-xs lg:text-xl font-black text-slate-700 text-center w-full">互いのライフステージを尊重し合うのがプロのチームです。</p></div>` },

    { title: "4. カスタマーハラスメント（カスハラ）", order: 7, content: `<div class="p-8 lg:p-12 bg-amber-50 rounded-[2.5rem] lg:rounded-[4rem] border-4 border-amber-300 border-dashed text-center shadow-inner max-w-4xl mx-auto flex flex-col items-center justify-center h-full px-4"><div class="bg-amber-700 text-white px-6 lg:px-8 py-1.5 lg:py-2 rounded-full text-[8px] lg:text-[10px] font-black inline-block mb-6 lg:mb-8 uppercase tracking-widest shadow-lg">介護現場の最重要課題</div><h4 class="text-xl lg:text-3xl font-black text-amber-950 mb-6 lg:mb-8 italic text-balance">利用者・家族からの<br/>暴言・暴力・過度な要求</h4><p class="text-lg lg:text-xl font-black text-amber-900 leading-relaxed py-4 lg:py-6 px-4">「お金を払っているんだから言うことを聞け」<br/>その一線を超えた要求は、サービスではありません。</p></div>` },

    { title: "カスハラへの組織的対応フロー", order: 8, content: `<div class="flex flex-col items-center justify-center h-full text-left space-y-6 lg:space-y-8 px-6 lg:px-12 w-full"><h4 class="text-xl lg:text-3xl font-black text-slate-900 text-center mb-4 uppercase tracking-widest w-full px-4">独りで抱え込まない・解決しない</h4><div class="space-y-6 lg:space-y-10 font-black text-slate-900 max-w-4xl mx-auto w-full"><div><p class="text-lg lg:text-2xl text-amber-700 mb-1 flex items-center gap-3"><span>1.</span> 記録と報告：</p><p class="text-sm lg:text-xl pl-8 lg:pl-12 text-slate-600 font-bold">言動、時間、場所を正確にメモ。すぐに上司へ報告。</p></div><div><p class="text-lg lg:text-2xl text-amber-700 mb-1 flex items-center gap-3"><span>2.</span> 複数人対応：</p><p class="text-sm lg:text-xl pl-8 lg:pl-12 text-slate-600 font-bold">密室を避け、必ず2名以上で対応。組織の姿勢を示す。</p></div><div><p class="text-lg lg:text-2xl text-amber-700 mb-1 flex items-center gap-3"><span>3.</span> 毅然とした拒絶：</p><p class="text-sm lg:text-xl pl-8 lg:pl-12 text-slate-600 font-bold">不当な要求には「ノー」を。必要なら警察や弁護士と連携。</p></div></div></div>` },

    { title: "アンコンシャス・バイアス（無意識の偏見）", order: 9, content: `<div class="space-y-6 lg:space-y-10 text-center flex flex-col items-center justify-center h-full px-4 w-full"><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-relaxed mb-4 lg:mb-8">「普通は〜でしょ」の危うさ</h4><div class="p-8 lg:p-12 bg-white border-[4px] border-slate-200 rounded-[2rem] shadow-xl max-w-3xl mx-auto w-full space-y-6"><p class="text-lg lg:text-2xl font-black text-slate-800 italic text-balance text-center">「最近の若い子は〜」「男のくせに〜」「介護職なんだから我慢しろ〜」</p><div class="h-px bg-slate-100"></div><p class="text-sm lg:text-xl font-bold text-blue-700 leading-relaxed text-balance text-center">自分の「当たり前」が、多様な背景を持つ仲間の心を折る武器になっていないか。常に問い続ける姿勢が重要です。</p></div></div>` },

    { title: "アンガーマネジメント：怒りを制御する", order: 10, content: `<div class="p-6 lg:p-4 relative overflow-hidden text-left max-w-4xl mx-auto flex flex-col items-center h-full justify-center"><div class="absolute -top-10 -right-10 w-64 h-64 bg-rose-50 rounded-full blur-3xl opacity-50"></div><h4 class="text-[10px] lg:text-[10px] font-black tracking-[0.4em] uppercase text-rose-800 mb-6 lg:mb-4 text-center py-2 px-6 bg-rose-50 rounded-full border border-rose-100 shadow-sm">6秒の魔法</h4><div class="space-y-4 lg:space-y-6 w-full lg:max-w-3xl text-slate-900"><div><p class="text-rose-800 text-[10px] lg:text-[10px] mb-1 uppercase tracking-widest font-black">Step 01. 衝動を抑える</p><div class="lg:flex lg:items-baseline lg:gap-6"><p class="text-2xl lg:text-4xl font-black whitespace-nowrap mb-1">6秒待つ</p><p class="text-sm lg:text-xl font-bold text-slate-600">怒りのピークは最初の6秒。深呼吸して嵐をやり過ごす。</p></div></div><div class="h-px bg-slate-100 lg:my-1"></div><div><p class="text-rose-800 text-[10px] lg:text-[10px] mb-1 uppercase tracking-widest font-black">Step 02. 言葉を選ぶ</p><div class="lg:flex lg:items-baseline lg:gap-6"><p class="text-2xl lg:text-4xl font-black whitespace-nowrap mb-1">「私」を主語に</p><p class="text-sm lg:text-xl font-bold text-slate-600">「あなたは〜」ではなく「私は（こうして欲しい）〜」と伝える。</p></div></div></div></div>` },

    { title: "アサーション：爽やかな自己主張", order: 11, content: `<div class="space-y-6 lg:space-y-10 text-center flex flex-col items-center justify-center h-full px-4 w-full"><h4 class="text-xl lg:text-3xl font-black text-emerald-900 leading-relaxed mb-4 lg:mb-8 text-balance">相手を尊重し、自分も大切にする</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto w-full"><div class="p-6 lg:p-8 bg-white border-2 border-slate-200 rounded-3xl shadow-xl text-left flex items-center gap-4 lg:gap-6"><div class="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-700 text-white rounded-full flex items-center justify-center shrink-0 font-black text-xs lg:text-base">1</div><div><p class="font-black text-base lg:text-xl text-emerald-800 mb-1">事実を伝える</p><p class="text-[10px] lg:text-sm font-bold text-slate-700 leading-relaxed text-balance">感情的にならず、「今、何が起きているか」を正確に述べる。</p></div></div><div class="p-6 lg:p-8 bg-white border-2 border-slate-200 rounded-3xl shadow-xl text-left flex items-center gap-4 lg:gap-6"><div class="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-700 text-white rounded-full flex items-center justify-center shrink-0 font-black text-xs lg:text-base">2</div><div><p class="font-black text-base lg:text-xl text-emerald-800 mb-1">提案をする</p><p class="text-[10px] lg:text-sm font-bold text-slate-700 leading-relaxed text-balance">責めるのではなく、「次はこうしませんか？」と前向きな代替案を出す。</p></div></div></div></div>` },

    { title: "相談窓口の重要性と守秘義務", order: 12, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-6 lg:space-y-8 px-4 w-full"><h4 class="text-xl lg:text-3xl font-black text-blue-900 leading-tight">声を上げた人が守られる仕組み</h4><div class="p-8 lg:p-10 bg-white border-4 border-blue-100 rounded-[2rem] lg:rounded-[3rem] shadow-xl max-w-4xl mx-auto w-full space-y-6"><p class="text-lg lg:text-2xl font-black leading-relaxed text-slate-900 text-balance">相談者のプライバシーは徹底的に保護されます。<br/><span class="text-rose-700 underline underline-offset-8 decoration-4">不利益な扱いは法律で禁止</span>されています。</p><div class="h-px bg-slate-100"></div><p class="text-xs lg:text-lg font-bold text-slate-600 text-balance">一人で悩まず、信頼できる上司や、設置された相談窓口をいつでも利用してください。</p></div></div>` },

    { title: "管理職の責任：放置という罪", order: 13, content: `<div class="flex flex-col justify-center h-full space-y-8 lg:space-y-12 px-4 lg:px-12 text-left"><div class="space-y-4 lg:space-y-6"><h4 class="text-2xl lg:text-5xl font-black text-rose-900 flex items-center gap-4 lg:gap-6"><span class="w-2 h-10 lg:w-3 lg:h-16 bg-rose-700 rounded-full"></span>「見て見ぬふり」は加担と同じ</h4></div><div class="space-y-6 lg:space-y-8 font-black text-slate-800 max-w-4xl text-base lg:text-2xl leading-relaxed"><div>1. 異変にいち早く気づき、事実関係を迅速に確認する</div><div>2. 被害者の心身を最優先で保護し、寄り添う</div><div>3. 行為者に対して、毅然とした態度で指導・処分を行う</div><div>4. 組織全体の風土を改善し、再発を防止する</div></div></div>` },

    { title: "ケーススタディ1：指導がエスカレートした時", order: 14, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-6 lg:space-y-8 px-4 w-full"><div class="inline-flex items-center gap-3 px-4 py-2 bg-rose-50 text-rose-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-rose-200 mb-2 mx-auto uppercase">CASE STUDY 01</div><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight px-4 text-balance">場面：新人のミスが続いた時</h4><div class="p-6 lg:p-8 bg-white border-2 border-slate-100 rounded-[2rem] shadow-xl max-w-4xl text-left space-y-4 w-full"><p class="text-sm lg:text-xl font-bold text-slate-800 leading-relaxed text-balance text-center">ベテラン職員のAさんは、新人のBさんのミスを「期待しているから」と、皆の前で1時間も厳しく叱責しました。<br/><span class="text-rose-600 font-black">「やる気あるの？向いてないんじゃない？」</span></p><div class="h-px bg-slate-100"></div><p class="text-xs lg:text-lg font-black text-rose-700 italic text-center px-4 text-balance">これは「熱心な指導」でしょうか？<br/>それとも「パワハラ」でしょうか？</p></div></div>` },

    { title: "ケース分析：『期待』という免罪符", order: 15, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-6 lg:space-y-8 px-4 w-full"><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-tight px-4 text-balance">分析：手段が目的を逸脱している</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 max-w-5xl mx-auto w-full"><div class="p-6 lg:p-8 bg-rose-50 border-2 border-rose-100 rounded-[2rem] text-left space-y-3 shadow-sm"><p class="font-black text-base lg:text-xl text-rose-700">【アウトな理由】</p><ul class="text-[10px] lg:text-sm font-bold text-slate-700 space-y-1"><li>・皆の前での叱責（羞恥心を与える）</li><li>・人格否定（向いてない等の発言）</li><li>・長時間（精神的苦痛の増大）</li></ul></div><div class="p-6 lg:p-8 bg-blue-50 border-2 border-blue-100 rounded-[2rem] text-left space-y-3 shadow-sm"><p class="font-black text-base lg:text-xl text-blue-700">【プロの指導】</p><ul class="text-[10px] lg:text-sm font-bold text-slate-700 space-y-1"><li>・別室で、1対1で行う</li><li>・ミスという「事象」にフォーカスする</li><li>・具体的な改善策を一緒に考える</li><li>・感情をぶつけず、冷静に伝える</li></ul></div></div></div>` },

    { title: "ケーススタディ2：利用者家族の無理難題", order: 16, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-6 lg:space-y-8 px-4 w-full"><div class="inline-flex items-center gap-3 px-4 py-2 bg-amber-50 text-amber-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-amber-200 mb-2 mx-auto uppercase">CASE STUDY 02</div><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight px-4 text-balance">場面：契約外の家事を強要される</h4><div class="p-6 lg:p-8 bg-white border-2 border-slate-100 rounded-[2rem] shadow-xl max-w-4xl text-left space-y-4 w-full"><p class="text-sm lg:text-xl font-bold text-slate-800 leading-relaxed text-balance text-center">訪問介護で、家族から「ついでに自分の部屋の掃除もして。お金払ってるんだから当然でしょ」と怒鳴られ、居座られました。</p><div class="h-px bg-slate-100"></div><p class="text-xs lg:text-lg font-black text-amber-700 italic text-center px-4 text-balance">サービス提供者のあなたなら、<br/>どう対応しますか？</p></div></div>` },

    { title: "ケース分析：サービスと屈従は違う", order: 17, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-6 lg:space-y-8 px-4 w-full"><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-tight px-4 text-balance">分析：組織で「断る」勇気</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 max-w-5xl mx-auto w-full"><div class="p-6 lg:p-8 bg-rose-50 border-2 border-rose-100 rounded-[2rem] text-left space-y-3 shadow-sm"><p class="font-black text-base lg:text-xl text-rose-700">【避けるべき対応】</p><ul class="text-[10px] lg:text-sm font-bold text-slate-700 space-y-1"><li>・自分一人で何とかしようと謝り続ける</li><li>・「今回だけなら」と要求を飲む</li><li>・相手を感情的に煽り、喧嘩する</li></ul></div><div class="p-6 lg:p-8 bg-emerald-50 border-2 border-emerald-100 rounded-[2rem] text-left space-y-3 shadow-sm"><p class="font-black text-base lg:text-xl text-emerald-700">【適切な対応】</p><ul class="text-[10px] lg:text-sm font-bold text-slate-700 space-y-1"><li>・契約外であることを丁寧に、かつ明確に伝える</li><li>・「一度事務所に持ち帰ります」と距離を置く</li><li>・事業所として担当者変更や契約終了を検討する</li></ul></div></div></div>` },

    { title: "SNSとハラスメント：デジタル時代の注意点", order: 18, content: `<div class="space-y-6 lg:space-y-10 text-center flex flex-col items-center justify-center h-full px-4 w-full"><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-relaxed mb-4 lg:mb-8 text-balance">ネットの「匿名性」は幻想です</h4><div class="p-8 lg:p-12 bg-white border-[4px] border-rose-200 rounded-[2rem] shadow-xl max-w-3xl mx-auto w-full space-y-6"><p class="text-sm lg:text-xl font-bold text-slate-800 leading-relaxed text-balance">SNSでの誹謗中傷、特定できる形での愚痴、不適切な写真の投稿。これらは職場外の行為であっても、就業環境を害するハラスメントとして懲戒の対象になり得ます。</p><div class="h-px bg-slate-100"></div><p class="text-xs lg:text-lg font-black text-rose-700 text-balance">デジタルタトゥーとして一生残り、あなた自身のキャリアを破壊することを自覚しましょう。</p></div></div>` },

    { title: "ハラスメントのない職場がもたらすもの", order: 19, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-6 lg:space-y-10 px-4 w-full"><h4 class="text-xl lg:text-3xl font-black text-blue-900 leading-tight">心理的安全性が生む「最高のケア」</h4><div class="p-8 lg:p-12 bg-blue-50 border-2 border-blue-200 rounded-[2.5rem] lg:rounded-[4rem] shadow-inner text-left max-w-4xl space-y-4 lg:space-y-6 mx-auto"><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8"><div class="bg-white p-6 rounded-3xl shadow-sm border border-blue-100"><p class="text-blue-800 font-black mb-2 text-lg">● 挑戦できる環境</p><p class="text-sm font-bold text-slate-600 leading-relaxed">失敗を責められないからこそ、新しい工夫や挑戦が生まれます。</p></div><div class="bg-white p-6 rounded-3xl shadow-sm border border-blue-100"><p class="text-blue-800 font-black mb-2 text-lg">● 事故の早期発見</p><p class="text-sm font-bold text-slate-600 leading-relaxed">ミスを即座に報告できる空気は、重大な事故を未然に防ぎます。</p></div></div></div></div>` },

    { title: "今日から変える。あなたから変える。", order: 20, content: `<div class="space-y-6 lg:space-y-8 text-center flex flex-col items-center justify-center h-full w-full px-4"><h4 class="text-xl lg:text-3xl font-black text-slate-900 mb-4 lg:mb-6">職場を「心理的な安全地帯」に</h4><div class="space-y-3 lg:space-y-4 font-black text-slate-900 text-sm lg:text-2xl max-w-4xl text-left"><div>□ 挨拶に「＋α」の言葉を添えていますか？</div><div>□ 相手の目を見て、話を聴いていますか？</div><div>□ 仲間の良いところを、口に出して伝えていますか？</div><div>□ 「ありがとう」が飛び交う空気を作っていますか？</div><div>□ 自分の感情の波を、相手にぶつけていませんか？</div></div></div>` },

    { title: "誇りある職場を、自分たちの手で", order: 21, content: `<div class="space-y-6 lg:space-y-10 text-center flex flex-col items-center justify-center h-full px-4 w-full"><h4 class="text-xl lg:text-3xl font-black text-slate-900 leading-tight">プロとしての倫理</h4><div class="p-8 lg:p-12 bg-white border-[4px] lg:border-[6px] border-rose-600 rounded-[2rem] lg:rounded-[3rem] shadow-2xl max-w-3xl mx-auto w-full"><p class="text-xl lg:text-3xl font-black text-rose-900 leading-relaxed italic text-balance">ハラスメントのない職場を作ることは、<br/>利用者様へ「最高のケア」を届けるための<br/>一番の近道です。</p></div><p class="font-black text-sm lg:text-xl text-slate-800 mt-4 text-balance">専門性を認め合い、支え合える<br class="lg:hidden" />最高のチームを共に目指しましょう。</p></div>` },

    { title: "全15科目、完遂おめでとうございます", order: 22, content: `<div class="flex flex-col items-center text-center space-y-8 lg:space-y-12 w-full h-full justify-center text-slate-900 px-4"><div class="w-24 h-24 lg:w-32 h-32 bg-rose-700 rounded-[2.5rem] lg:rounded-[3.5rem] flex items-center justify-center shadow-2xl shadow-rose-200 rotate-3 transition-transform hover:rotate-0 duration-500 mx-auto"><svg class="w-12 h-12 lg:w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div><h3 class="text-2xl lg:text-5xl font-black leading-tight">全課程を修了しました。<br/>あなたの学びが、現場を救います。</h3><div class="pt-8 lg:pt-12 border-t-2 border-slate-200 w-full max-w-md text-center mx-auto"><p class="text-slate-500 font-black text-[8px] lg:text-[10px] uppercase tracking-[0.5em]">End of All Sessions</p></div></div>` },

    { title: "理解度テストのご案内", order: 23, content: `
        <div class="flex flex-col items-center text-center space-y-6 lg:space-y-8 w-full h-full justify-center px-4">
          <div class="bg-emerald-600 text-white px-6 py-1.5 rounded-full text-[8px] lg:text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-4 lg:mb-6 shadow-lg">Course Completed</div>
          <h2 class="text-2xl lg:text-5xl font-black text-slate-900 leading-tight mb-2 lg:mb-4">講義セッション終了</h2>
          <p class="text-emerald-800 text-base lg:text-2xl font-black leading-relaxed">大変お疲れ様でした。<br/>最後に理解度テスト（全10問）を行います。</p>
          <div class="p-4 lg:p-6 bg-rose-50 rounded-2xl lg:rounded-3xl border-2 border-rose-100 max-w-lg mx-auto mt-6 lg:mt-8">
            <p class="text-rose-900 font-black text-sm lg:text-xl flex items-center justify-center gap-3">
              <span class="w-2 h-2 bg-rose-700 rounded-full"></span>
              「満点」で学びを締めくくりましょう！
              <span class="w-2 h-2 bg-rose-700 rounded-full"></span>
            </p>
          </div>
        </div>
      ` }
  ]

  const questionsData = [
    { text: 'パワーハラスメントの3要素に含まれない、誤った記述はどれか？', explanation: '「業務上必要かつ相当な範囲内」で行われる適切な指導は、たとえ厳しい内容であってもパワハラには該当しません。', order: 1, choices: { create: [{ text: '業務上必要かつ相当な範囲内で行われる指導', isCorrect: true }, { text: '優越的な関係を背景とした言動', isCorrect: false }, { text: '業務上必要かつ相当な範囲を超えた言動', isCorrect: false }, { text: '就業環境を害する（精神的・身体的苦痛を与える）', isCorrect: false }] } },
    { text: 'セクシュアルハラスメントの判断において、最も重視される基準はどれか？', explanation: '行為者に悪意や自覚がなくても、受けた相手が不快に感じ、尊厳を傷つけられたかどうかが最大の判断基準となります。', order: 2, choices: { create: [{ text: '受けた相手が不快に感じたかどうか（主観）', isCorrect: true }, { text: '行為者に悪意があったかどうか（意図）', isCorrect: false }, { text: '周囲の人が笑っていたかどうか', isCorrect: false }, { text: '一度きりの言動であったかどうか', isCorrect: false }] } },
    { text: '利用者やその家族による、職員への過度な要求や暴言・暴力を何というか？', explanation: 'カスタマーハラスメント（カスハラ）と呼ばれ、2024年度の義務化ではこれらへの対策も含まれています。', order: 3, choices: { create: [{ text: 'カスタマーハラスメント（カスハラ）', isCorrect: true }, { text: 'ケア・ハラスメント', isCorrect: false }, { text: 'シルバー・ハラスメント', isCorrect: false }, { text: 'ソーシャル・ハラスメント', isCorrect: false }] } },
    { text: '部下のミスに対し、皆の前で長時間、「バカ」「向いていないから辞めろ」と叱責する行為は？', explanation: '人格を否定する言葉や、羞恥心を与える場での長時間にわたる叱責は、明白なパワーハラスメントに該当します。', order: 4, choices: { create: [{ text: '明白なパワーハラスメントである', isCorrect: true }, { text: '期待の裏返しであり、教育の範囲である', isCorrect: false }, { text: '本人のためを思ってのことなら許される', isCorrect: false }, { text: 'ミスをした部下にも非があるためパワハラではない', isCorrect: false }] } },
    { text: '妊娠・出産・育児休業の取得等を理由に、不利益な扱いや嫌がらせをすることを何というか？', explanation: 'マタニティハラスメント（マタハラ）と呼ばれ、育児介護休業法や男女雇用機会均等法で厳しく禁じられています。', order: 5, choices: { create: [{ text: 'マタニティハラスメント', isCorrect: true }, { text: 'パタニティハラスメント', isCorrect: false }, { text: 'エイジハラスメント', isCorrect: false }, { text: 'ジェンダーハラスメント', isCorrect: false }] } },
    { text: 'カスハラ（利用者・家族からのハラスメント）への対応として、組織的に誤っているものはどれか？', explanation: 'カスハラへの対応を職員一人に任せることは、被害を深刻化させます。組織として複数名で対応し、毅然とした態度をとることが鉄則です。', order: 6, choices: { create: [{ text: '担当職員一人で最後まで誠意を持って謝罪させる', isCorrect: true }, { text: '密室を避け、必ず複数人で対応する', isCorrect: false }, { text: '言動の記録（メモや録音）を正確に残す', isCorrect: false }, { text: '不当な要求には、組織として明確に「ノー」を伝える', isCorrect: false }] } },
    { text: '自分自身が持つ「無意識の偏見や思い込み」が相手を傷つけることを何というか？', explanation: 'アンコンシャス・バイアスと呼ばれます。「男なら〜」「最近の若者は〜」といった偏見がハラスメントの引き金になります。', order: 7, choices: { create: [{ text: 'アンコンシャス・バイアス', isCorrect: true }, { text: 'アサーティブ・コミュニケーション', isCorrect: false }, { text: 'アンガーマネジメント', isCorrect: false }, { text: 'セルフ・コンパッション', isCorrect: false }] } },
    { text: '怒りの感情が湧いた際、衝動的な言動を抑えるために有効とされる「6秒の魔法」とは？', explanation: '怒りの感情のピークは約6秒とされるため、その間待つ（深呼吸する、数を数える）ことで冷静さを取り戻す技術です。', order: 8, choices: { create: [{ text: '怒りのピークが過ぎるまで最初の6秒を待つ', isCorrect: true }, { text: '6秒以内に相手に言い返してスッキリする', isCorrect: false }, { text: '6秒間相手を睨みつけて威嚇する', isCorrect: false }, { text: '6秒以内にその場から走り去る', isCorrect: false }] } },
    { text: 'ハラスメントの相談を受けた担当者が、最も優先すべき守秘義務はどれか？', explanation: '相談者のプライバシー保護と、相談したことによって不利益な扱いを受けないようにすることが最優先です。', order: 9, choices: { create: [{ text: '相談者の匿名性とプライバシーの徹底保護', isCorrect: true }, { text: '加害者に相談者の不満をそのまま伝えること', isCorrect: false }, { text: '相談内容を朝礼で全職員に共有すること', isCorrect: false }, { text: '事実確認ができるまで相談を放置すること', isCorrect: false }] } },
    { text: 'ハラスメントのない「心理的安全性の高い職場」の特徴として、正しいものはどれか？', explanation: '誰もが非難を恐れずに意見を言え、ミスを隠さず報告・相談できる状態が心理的安全性の高い職場です。', order: 10, choices: { create: [{ text: 'ミスや懸念を、非難を恐れずに素直に話せる', isCorrect: true }, { text: '上司の意見には絶対に反対が出ない', isCorrect: false }, { text: '職員同士のプライベートな付き合いが強制される', isCorrect: false }, { text: '波風を立てないよう、皆が本音を隠している', isCorrect: false }] } }
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
