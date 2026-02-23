import { PrismaClient } from '@prisma/client'

export async function seedDisaster(prisma: PrismaClient) {
  const slug = 'disaster'
  const courseData = {
    slug,
    title: '災害対策・防災訓練研修（2024年度）',
    description: '〜命と生活を守り抜くBCPの実践力〜',
    introduction: `
        <div class="flex flex-col items-center justify-center text-center space-y-2 pt-2 px-4 text-balance">
          <div class="flex items-center gap-4">
            <span class="h-px w-8 lg:w-12 bg-orange-700 rounded-full"></span>
            <p class="text-orange-800 font-black tracking-widest text-lg lg:text-xl uppercase">災害対策研修</p>
            <span class="h-px w-8 lg:w-12 bg-orange-700 rounded-full"></span>
          </div>
          <h2 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight">「その時、あなたは利用者の手を<br/>離さずにいられますか？」</h2>
          <div class="max-w-2xl space-y-2 text-slate-800 text-sm lg:text-base leading-relaxed font-bold px-4 text-center">
            <p>災害は選べませんが、私たちの「備え」は選ぶことができます。<br class="lg:hidden" />パニックを最小限に抑えるのは、訓練と計画（BCP）だけです。</p>
            <div class="p-3 lg:p-4 bg-orange-50 rounded-[1.5rem] lg:rounded-[2rem] border-2 border-orange-200 shadow-inner relative overflow-hidden text-[10px] lg:text-xs text-left">
              <div class="absolute top-0 right-0 w-16 h-16 lg:w-20 lg:h-20 bg-orange-100/50 rounded-bl-full"></div>
              <p class="relative z-10 italic text-orange-900 font-black text-xs lg:text-sm leading-relaxed">施設は地域の「最後の砦」です。救命から避難生活まで、利用者の命を守り抜くプロとしての対応力を磨きましょう。</p>
            </div>
            <p class="text-[10px] lg:text-sm text-slate-900 font-black text-center mt-2">想定外を想定内に変える「生き残るための知恵」を習得しましょう。</p>
          </div>
        </div>
      `,
    learningObjectives: `
        <div class="flex flex-col items-center justify-center text-center space-y-3 pt-2 px-4 w-full text-balance text-center">
          <div class="bg-orange-700 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-1 shadow-lg shadow-orange-200">Learning Objectives</div>
          <div class="grid grid-cols-1 gap-2 w-full max-w-2xl">
            <div class="group p-3 lg:p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-orange-400 transition-all duration-500 text-center lg:text-left">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-orange-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-orange-200">1</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-base font-black text-slate-900">発災直後の初動を完遂できる</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-tight">シェイクアウト、初期消火、避難判断の基準を習得する。</p>
              </div>
            </div>
            <div class="group p-3 lg:p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-orange-400 transition-all duration-500 text-center lg:text-left">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-orange-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-orange-200">2</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-base font-black text-slate-900">災害BCPの核心を理解する</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-tight">人員不足時の優先業務と備蓄管理の鉄則を学ぶ。</p>
              </div>
            </div>
            <div class="group p-3 lg:p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-orange-400 transition-all duration-500 text-center lg:text-left">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-orange-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-orange-200">3</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-base font-black text-slate-900">共助と連携の力を高める</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-tight">安否確認、情報共有、地域との連携体制を習得する。</p>
              </div>
            </div>
          </div>
        </div>
      `,
    videoUrl: null,
    badgeLabel: '災害対策',
    badgeIcon: 'Flame',
  }

  const slidesData = [
    { title: "災害対策・防災訓練研修", order: 0, content: `<div class="flex flex-col items-center justify-center text-center space-y-4 w-full h-full text-balance"><div class="relative w-full max-w-4xl px-4"><div class="absolute inset-0 bg-orange-400 blur-3xl opacity-20 scale-150 animate-pulse text-center"></div><div class="relative bg-transparent lg:bg-white p-0 lg:p-12 rounded-none lg:rounded-[3.5rem] shadow-none lg:shadow-2xl border-none lg:border lg:border-slate-200 w-full mx-auto text-center"><div class="bg-orange-700 text-white px-4 lg:px-6 py-1 lg:py-1.5 rounded-full text-[8px] lg:text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-6 lg:mb-8 shadow-sm">法定研修 2024</div><h2 class="text-3xl lg:text-5xl font-black text-slate-900 leading-tight mb-4 text-center">災害対策・防災訓練</h2><p class="text-orange-700 text-sm lg:text-2xl font-black mt-2 whitespace-nowrap text-center">〜命と生活を守り抜くBCPの実践〜</p></div></div><div class="flex items-center justify-center gap-4 text-slate-500 font-black text-[8px] lg:text-[10px] tracking-widest pt-4 text-center w-full"><span class="h-px w-6 lg:w-8 bg-slate-300"></span>CARE LEARNING SYSTEM<span class="h-px w-6 lg:w-8 bg-slate-300"></span></div></div>` },
    { title: "2024年度 BCP完全義務化", order: 1, content: `<div class="space-y-4 lg:space-y-6 text-center px-4 h-full flex flex-col justify-center text-balance text-center"><div class="inline-flex items-center gap-3 px-4 py-1.5 bg-orange-100 text-orange-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-orange-200 mb-2 uppercase tracking-widest mx-auto text-center">法的義務</div><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight px-4 text-center w-full">「訓練」から「継続」へ</h4><div class="p-0 lg:p-8 bg-transparent lg:bg-orange-50 border-none lg:border-2 lg:border-orange-100 shadow-none lg:shadow-xl rounded-none lg:rounded-[3rem] text-center lg:text-left text-sm lg:text-lg font-bold text-orange-800 space-y-4 max-w-4xl mx-auto px-4 text-center"><p class="font-black text-center">これまでは「逃げること」が目的でした。しかしBCP（業務継続計画）は、被災後も人員が足りない中で「どう介護を続けるか」を計画する義務です。</p></div></div>` },
    { title: "災害対応の3原則：自助・共助・公助", order: 2, content: `<div class="space-y-4 lg:space-y-6 text-center px-4 h-full flex flex-col justify-center text-balance"><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight mb-2 px-4 text-center w-full">助け合いのピラミッド</h4><div class="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-5xl mx-auto w-full text-center"><div class="p-6 bg-white border-2 border-slate-200 rounded-[2rem] shadow-xl flex flex-col items-center gap-2"><p class="font-black text-lg text-orange-800">自助</p><p class="text-xs font-bold text-slate-700 leading-relaxed text-center">まずは自分の身を守る。自分が無事でなければ、誰も助けられません。</p></div><div class="p-6 bg-white border-2 border-slate-200 rounded-[2rem] shadow-xl flex flex-col items-center gap-2"><p class="font-black text-lg text-orange-800">共助</p><p class="text-xs font-bold text-slate-700 leading-relaxed text-center">職員、近隣住民と協力して利用者を守る。施設の力の見せ所です。</p></div><div class="p-6 bg-white border-2 border-slate-200 rounded-[2rem] shadow-xl flex flex-col items-center gap-2"><p class="font-black text-lg text-orange-800">公助</p><p class="text-xs font-bold text-slate-700 leading-relaxed text-center">公的支援。発災後3日は届かないと考え、自律的な行動が必要です。</p></div></div></div>` },
    { title: "地震：発災直後の0〜3分", order: 3, content: `<div class="space-y-6 lg:space-y-8 text-center h-full flex flex-col justify-center px-4 text-balance text-center"><div class="inline-flex items-center gap-3 px-4 py-2 bg-red-100 text-red-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-red-200 mb-2 shadow-sm mx-auto uppercase tracking-widest text-center"><span class="w-2 h-2 bg-red-700 rounded-full animate-ping"></span>MUST CHECK</div><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight text-center w-full">頭を守り、揺れに備える</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 max-w-4xl mx-auto w-full text-center px-4 text-center"><div class="p-4 lg:p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl lg:rounded-3xl text-center font-black text-sm lg:text-base text-slate-900 shadow-sm">1. シェイクアウト（低く・頭を守り・動かない）</div><div class="p-4 lg:p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl lg:rounded-3xl text-center font-black text-sm lg:text-base text-slate-900 shadow-sm">2. 窓ガラスや倒壊物から離れる</div><div class="p-4 lg:p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl lg:rounded-3xl text-center font-black text-sm lg:text-base text-slate-900 shadow-sm">3. 利用者の頭部を布団等で保護</div><div class="p-4 lg:p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl lg:rounded-3xl text-center font-black text-sm lg:text-base text-slate-900 shadow-sm">4. 揺れが収まるまで無理に動かない</div></div></div>` },
    { title: "火災：初期消火の限界点", order: 4, content: `<div class="flex flex-col items-center text-center space-y-4 lg:space-y-6 px-4 h-full justify-center text-balance text-center text-center"><div class="p-4 lg:p-6 bg-white rounded-[2rem] lg:rounded-[3.5rem] w-full max-w-2xl shadow-xl border-2 border-slate-200 shrink-0 text-center"><h4 class="text-xl lg:text-2xl font-black mb-2 text-slate-900 text-center text-balance px-4">天井に火が届いたら逃げる</h4><p class="text-[10px] lg:text-sm text-slate-900 font-black text-center text-center">消火器を諦めるタイミングが命を守る</p></div><div class="p-6 bg-orange-50 border-2 border-orange-100 rounded-3xl text-left max-w-3xl space-y-4 shadow-inner text-center"><p class="text-sm lg:text-lg font-black text-orange-900 leading-relaxed text-balance text-center">初期消火ができるのは「天井に届く前」までです。それ以降は即座に避難誘導に切り替えてください。防火扉を閉めて延焼を防ぐことが最優先です。</p></div></div>` },
    { title: "避難の判断基準：垂直か水平か", order: 5, content: `<div class="flex flex-col justify-center h-full space-y-6 lg:space-y-8 px-4 lg:px-12 text-left text-balance text-center"><div class="space-y-4"><h4 class="text-2xl lg:text-4xl font-black text-orange-900 flex items-center gap-4 lg:gap-6 justify-center"><span class="w-2 h-8 lg:w-3 lg:h-12 bg-orange-700 rounded-full"></span>状況に応じた避難</h4></div><ul class="space-y-4 lg:space-y-6 text-lg lg:text-3xl font-black text-slate-800 pl-0 leading-tight text-center"><li>・水平避難：屋外の安全な場所へ移動</li><li>・垂直避難：水害時、上階へ移動</li><li>・屋内退避：外が危険な場合の待機</li></ul><p class="text-rose-700 font-black text-sm lg:text-xl mt-4 text-center w-full">水害時は「早めの垂直避難」が鉄則</p></div>` },
    { title: "避難誘導の技術", order: 6, content: `<div class="flex flex-col justify-center h-full space-y-6 lg:space-y-8 px-4 lg:px-12 text-left text-balance text-center"><div class="space-y-4"><h4 class="text-2xl lg:text-4xl font-black text-orange-900 flex items-center gap-4 lg:gap-6 justify-center"><span class="w-2 h-8 lg:w-3 lg:h-12 bg-orange-700 rounded-full"></span>安全な搬送</h4></div><ul class="space-y-4 lg:space-y-6 text-lg lg:text-3xl font-black text-slate-800 pl-0 leading-tight text-center"><li>・車椅子：段差は後ろ向き、ベルト確認</li><li>・寝たきり：シーツ搬送を活用</li><li>・階段：複数人での担架搬送を推奨</li></ul></div>` },
    { title: "火災：煙の恐怖と対策", order: 7, content: `<div class="flex flex-col justify-center h-full space-y-6 lg:space-y-8 px-4 lg:px-12 text-left text-balance text-center"><div class="space-y-4"><h4 class="text-2xl lg:text-4xl font-black text-red-900 flex items-center gap-4 lg:gap-6 justify-center"><span class="w-2 h-8 lg:w-3 lg:h-12 bg-red-700 rounded-full"></span>煙は火より速い</h4></div><ul class="space-y-4 lg:space-y-6 text-lg lg:text-3xl font-black text-slate-800 pl-0 leading-tight text-center"><li>・姿勢を低く保つ（床付近の空気を吸う）</li><li>・濡れタオルで口鼻を覆う</li><li>・扉・シャッターを閉め切る</li></ul></div>` },
    { title: "BCP：人員不足時の優先業務", order: 8, content: `<div class="flex flex-col items-center text-center space-y-4 lg:space-y-6 px-4 h-full justify-center text-balance text-center"><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight text-center w-full">「やらないこと」を決める</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-3 font-black text-sm lg:text-base w-full max-w-4xl text-center"><div class="flex flex-col gap-3"><span class="px-6 py-2.5 bg-orange-50 border-2 border-orange-200 rounded-2xl text-orange-900 shadow-sm text-center">最優先：救命・食事・投薬</span><span class="px-6 py-2.5 bg-orange-50 border-2 border-orange-200 rounded-2xl text-orange-900 shadow-sm text-center text-balance">休止：レク・非緊急の清掃</span></div><div class="flex flex-col gap-3"><span class="px-6 py-2.5 bg-orange-50 border-2 border-orange-200 rounded-2xl text-orange-900 shadow-sm text-center">調整：更衣の簡略化</span><span class="px-6 py-2.5 bg-orange-50 border-2 border-orange-200 rounded-2xl text-orange-900 shadow-sm text-center text-balance">応援：近隣施設との相互協力</span></div></div></div>` },
    { title: "災害時の備蓄管理", order: 9, content: `<div class="flex flex-col justify-center h-full space-y-6 lg:space-y-8 px-4 lg:px-12 text-left text-balance text-center"><h4 class="text-xl lg:text-2xl font-black text-orange-900 text-center w-full">最低3日、理想は7日分</h4><ul class="space-y-4 lg:space-y-6 text-sm lg:text-xl font-black text-slate-800 pl-0 leading-tight text-center w-full"><li>・水：1人1日3リットル（調理用含）</li><li>・食料：常温保存、加熱不要なもの</li><li>・衛生：おむつ、簡易トイレ、消毒液</li></ul><p class="text-blue-700 font-black text-center w-full mt-4 text-sm lg:text-lg">ローリングストックでの管理を推奨</p></div>` },
    { title: "安否確認と情報共有", order: 10, content: `<div class="flex flex-col items-center justify-center h-full space-y-6 lg:space-y-8 px-4 w-full text-balance text-center"><h4 class="text-xl lg:text-2xl font-black text-slate-900 text-center w-full mb-2 px-4">誰が・どこに・無事かどうか</h4><div class="grid grid-cols-1 gap-3 lg:gap-4 w-full max-w-2xl text-center"><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-orange-700 text-white rounded-full flex items-center justify-center shrink-0">1</span>職員の安否：災害用伝言ダイヤル（171）</div><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-orange-700 text-white rounded-full flex items-center justify-center shrink-0">2</span>利用者の安否：トリアージと名簿作成</div><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-orange-700 text-white rounded-full flex items-center justify-center shrink-0">3</span>外部報告：市町村・家族への被害報告</div></div></div>` },
    { title: "水害・土砂災害への備え", order: 11, content: `<div class="flex flex-col items-center justify-center h-full space-y-6 lg:space-y-8 px-4 w-full text-balance text-center"><h4 class="text-xl lg:text-2xl font-black text-red-900 text-center w-full mb-2 px-4 animate-pulse">警戒レベル3で避難開始</h4><div class="grid grid-cols-1 gap-3 lg:gap-4 w-full max-w-2xl text-center"><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-red-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shrink-0">1</span>ハザードマップで浸水深を確認しておく</div><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-red-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shrink-0">2</span>雨が強くなる前に、上階への移動を完了</div><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-red-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shrink-0">3</span>夜間の大雨が予想される場合は日中に避難</div></div></div>` },
    { title: "避難生活での衛生管理", order: 12, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-6 lg:space-y-8 px-4 w-full text-balance text-center"><div class="inline-flex items-center gap-3 px-4 py-1.5 bg-orange-100 text-orange-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-orange-200 mb-2 mx-auto text-center">震災関連死の防止</div><h4 class="text-xl lg:text-2xl font-black text-orange-900 leading-tight px-4 text-center w-full">命を守る避難生活</h4><div class="p-6 lg:p-8 bg-white border-[4px] lg:border-[6px] border-orange-600 rounded-[2rem] lg:rounded-[3rem] shadow-2xl max-w-3xl mx-auto w-full text-center"><p class="text-lg lg:text-2xl font-black text-orange-900 leading-relaxed italic text-balance text-center">断水時の食中毒、口腔ケア不足による肺炎、血栓（エコノミークラス症候群）。これらを防ぐのが災害時の介護です。</p></div></div>` },
    { title: "災害時のメンタルケア（PFA）", order: 13, content: `<div class="flex flex-col items-center justify-center h-full text-left space-y-4 lg:space-y-6 px-6 lg:px-12 w-full text-balance text-center"><h4 class="text-xl lg:text-2xl font-black text-orange-700 text-center mb-2 uppercase tracking-widest w-full px-4">パニックを鎮める関わり</h4><div class="space-y-6 lg:space-y-8 font-black text-slate-900 max-w-4xl mx-auto w-full text-center"><div><p class="text-lg lg:text-2xl text-orange-600 mb-1 flex items-center gap-3 justify-center text-center"><span>●</span> 寄り添い</p><p class="text-sm lg:text-lg text-slate-600 font-bold text-center">無理に聞き出さず、そばにいる安心感を。</p></div><div><p class="text-lg lg:text-2xl text-orange-600 mb-1 flex items-center gap-3 justify-center text-center"><span>●</span> 正確な情報</p><p class="text-sm lg:text-lg text-slate-600 font-bold text-center">事実を優しく繰り返し伝え、不安を解消する。</p></div><div><p class="text-lg lg:text-2xl text-orange-600 mb-1 flex items-center gap-3 justify-center text-center"><span>●</span> 職員の休息</p><p class="text-sm lg:text-lg text-slate-600 font-bold text-center">交代で休みを取り、共倒れを防ぐ体制を作る。</p></div></div></div>` },
    { title: "満足感：備えが盾になる", order: 14, content: `<div class="space-y-6 lg:space-y-8 text-center flex flex-col items-center justify-center h-full px-4 w-full text-balance text-center text-balance"><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight px-4 text-center w-full">プロとしての誇り</h4><div class="p-8 lg:p-10 bg-white border-[4px] lg:border-[6px] border-orange-600 rounded-[2rem] lg:rounded-[3rem] shadow-2xl max-w-3xl mx-auto w-full text-center"><p class="text-xl lg:text-2xl font-black text-orange-900 leading-relaxed italic text-balance text-center">「訓練しているから大丈夫」<br/>その一言と落ち着いた態度が、<br/>何よりの「ケア」になります。</p></div><p class="font-black text-sm lg:text-lg text-slate-800 mt-2 text-center w-full px-4">今日学んだことが、いざという時の「勇気」に。</p></div>` },
    { title: "まとめ：今日から変えられること", order: 15, content: `<div class="flex flex-col items-center text-center space-y-6 lg:space-y-10 w-full h-full justify-center text-slate-900 px-4 text-center text-balance"><div class="w-24 h-24 lg:w-28 h-28 bg-orange-700 rounded-[2.5rem] lg:rounded-[3rem] flex items-center justify-center shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-500 mx-auto text-center"><svg class="w-12 h-12 lg:w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div><h3 class="text-2xl lg:text-4xl font-black leading-tight text-center w-full text-balance">想定外を、想定内に。<br/>備えこそが最高のケアです。</h3><div class="pt-8 lg:pt-10 border-t-2 border-slate-200 w-full max-w-md text-center mx-auto"><p class="text-slate-500 font-black text-[8px] lg:text-[10px] uppercase tracking-[0.5em]">研修終了</p></div></div>` },
    { title: "理解度テストのご案内", order: 16, content: `
        <div class="flex flex-col items-center text-center space-y-4 lg:space-y-6 w-full h-full justify-center px-4 text-center text-balance">
          <div class="bg-emerald-600 text-white px-6 py-1.5 rounded-full text-[8px] lg:text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-4 lg:mb-2 shadow-lg px-4 text-center">修了</div>
          <h2 class="text-2xl lg:text-4xl font-black text-slate-900 leading-tight mb-2 text-center w-full text-balance">講義セッション終了</h2>
          <p class="text-emerald-800 text-base lg:text-xl font-black leading-relaxed text-center w-full text-balance px-4">大変お疲れ様でした。<br/>最後に理解度テスト（全10問）を行います。</p>
          <div class="p-4 lg:p-6 bg-sky-50 rounded-2xl lg:rounded-3xl border-2 border-blue-100 max-w-lg mx-auto mt-6">
            <p class="text-blue-900 font-black text-sm lg:text-lg flex items-center justify-center gap-3 text-center">
              <span class="w-2 h-2 bg-blue-700 rounded-full"></span>    
              全問正解を目指しましょう！
              <span class="w-2 h-2 bg-blue-700 rounded-full"></span>    
            </p>
          </div>
        </div>
      ` }
  ]

  const questionsData = [
    { text: '災害対応における「共助（きょうじょ）」とは、どのような助け合いを指すか？', explanation: '職員同士、施設、近隣住民などが互いに助け合うことを指し、施設防災の要となります。', order: 1, choices: { create: [{ text: '職員、施設、近隣住民による助け合い', isCorrect: true }, { text: '自分の命を自分で守ること', isCorrect: false }, { text: '行政や自衛隊による公的な支援', isCorrect: false }] } },
    { text: '火災が発生した際、消火器による初期消火を断念し、避難に専念すべき基準はどれか？', explanation: '炎が天井にまで届いた場合は、初期消火の限界を超えているため、即座に避難・誘導に切り替えます。', order: 2, choices: { create: [{ text: '炎が天井まで届いたとき', isCorrect: true }, { text: '煙が出始めたとき', isCorrect: false }, { text: '火の粉が舞ったとき', isCorrect: false }] } },
    { text: '水害の恐れがある場合、高齢者施設において「避難を開始すべき」気象情報のレベルは？', explanation: '「警戒レベル3（高齢者等避難）」が発令された段階で、施設では避難を開始する必要があります。', order: 3, choices: { create: [{ text: '警戒レベル3', isCorrect: true }, { text: '警戒レベル5', isCorrect: false }, { text: '注意報が出たとき', isCorrect: false }] } },
    { text: '災害BCP（業務継続計画）において、人員や物資が不足した際に優先すべき業務はどれか？', explanation: '救命・食事・排泄・投薬など、利用者の生命維持に直結するケアを最優先します。', order: 4, choices: { create: [{ text: '救命、食事、排泄、投薬', isCorrect: true }, { text: 'レクリエーション、季節行事', isCorrect: false }, { text: 'シーツ交換、居室の模様替え', isCorrect: false }] } },
    { text: '地震発生直後の初動として推奨される「シェイクアウト」の3つの行動はどれか？', explanation: '「姿勢を低く」「頭を守り」「揺れが収まるまで動かない」が基本動作です。', order: 5, choices: { create: [{ text: '低く、頭を守り、動かない', isCorrect: true }, { text: '立ち上がり、出口へ走る', isCorrect: false }, { text: '窓を開け、火を消しに行く', isCorrect: false }] } },
    { text: '災害時に、職員や家族の安否を確認するために有効な、電話によるサービスはどれか？', explanation: '「171（災害用伝言ダイヤル）」は、被災地への電話が繋がりにくい時に有効な伝言板です。', order: 6, choices: { create: [{ text: '171（災害用伝言ダイヤル）', isCorrect: true }, { text: '117（時報）', isCorrect: false }, { text: '104（番号案内）', isCorrect: false }] } },
    { text: '2024年度から介護施設に義務付けられた、災害後も業務を続けるための計画を何というか？', explanation: 'BCP（Business Continuity Plan：業務継続計画）と呼ばれ、全施設での策定が義務化されました。', order: 7, choices: { create: [{ text: 'BCP（業務継続計画）', isCorrect: true }, { text: '防災マニュアル', isCorrect: false }, { text: '避難経路図', isCorrect: false }] } },
    { text: '水害時に、屋外への避難が困難な場合に「建物の2階以上へ移動する」ことを何というか？', explanation: '垂直方向に避難することを「垂直避難」と呼び、急な増水時などに有効な手段です。', order: 8, choices: { create: [{ text: '垂直避難', isCorrect: true }, { text: '水平避難', isCorrect: false }, { text: '屋内退避', isCorrect: false }] } },
    { text: '避難生活において、足の静脈に血栓ができ、肺に詰まってしまう重大な病気はどれか？', explanation: '長時間同じ姿勢でいることで起きる「エコノミークラス症候群」は、避難生活での死因の一つです。', order: 9, choices: { create: [{ text: 'エコノミークラス症候群', isCorrect: true }, { text: '熱中症', isCorrect: false }, { text: '誤嚥性肺炎', isCorrect: false }] } },
    { text: '災害時、施設における非常食や水の備蓄は「最低何日分」必要とされているか？', explanation: '支援物資が届くまでの間、自力で乗り切るために「最低3日分」の備蓄が強く推奨されています。', order: 10, choices: { create: [{ text: '3日分', isCorrect: true }, { text: '1日分', isCorrect: false }, { text: '1ヶ月分', isCorrect: false }] } }
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
