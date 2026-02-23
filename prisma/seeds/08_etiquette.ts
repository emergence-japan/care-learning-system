import { PrismaClient } from '@prisma/client'

export async function seedEtiquette(prisma: PrismaClient) {
  const slug = 'etiquette'
  const courseData = {
    slug,
    title: '接遇・マナー研修（2024年度）',
    description: '〜利用者の尊厳を守り、選ばれるプロになるために〜',
    introduction: `
        <div class="flex flex-col items-center justify-center text-center space-y-2 pt-2 px-4 text-balance">
          <div class="flex items-center gap-4">
            <span class="h-px w-8 lg:w-12 bg-amber-700 rounded-full"></span>
            <p class="text-amber-800 font-black tracking-widest text-lg lg:text-xl uppercase">接遇・マナー研修</p>
            <span class="h-px w-8 lg:w-12 bg-amber-700 rounded-full"></span>
          </div>
          <h2 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight">「技術は一流、でも接遇は二流。<br/>あなたはどちらからケアを受けたいですか？」</h2>
          <div class="max-w-2xl space-y-2 text-slate-800 text-sm lg:text-base leading-relaxed font-bold px-4 text-center">
            <p>どんなに完璧な介助技術を持っていても、言葉遣いや態度一つで、利用者の心は閉ざされてしまいます。</p>
            <div class="p-3 lg:p-4 bg-amber-50 rounded-[1.5rem] lg:rounded-[2rem] border-2 border-amber-200 shadow-inner relative overflow-hidden text-[10px] lg:text-xs text-left">
              <div class="absolute top-0 right-0 w-16 h-16 lg:w-20 lg:h-20 bg-amber-100/50 rounded-bl-full"></div>
              <p class="relative z-10 italic text-amber-900 font-black text-xs lg:text-sm leading-relaxed">接遇とは単なる「お作法」ではありません。目の前の人の「尊厳」を認め、敬意を払う心の現れが、介助をスムーズにし、施設を温かい「家」に変えるのです。</p>
            </div>
            <p class="text-[10px] lg:text-sm text-slate-900 font-black text-center mt-2">プロとしての品格を磨き、利用者から「あなたで良かった」と選ばれる存在になりましょう。</p>
          </div>
        </div>
      `,
    learningObjectives: `
        <div class="flex flex-col items-center justify-center text-center space-y-3 pt-2 px-4 w-full text-balance">
          <div class="bg-amber-700 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-1 shadow-lg shadow-amber-200">Learning Objectives</div>
          <div class="grid grid-cols-1 gap-2 w-full max-w-2xl">
            <div class="group p-3 lg:p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-amber-400 transition-all duration-500 text-center lg:text-left">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-amber-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-amber-200">1</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-base font-black text-slate-900">接遇の5原則を完遂できる</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-tight">挨拶、表情、身だしなみ、言葉遣い、態度の基本を、プロの基準で身につける。</p>
              </div>
            </div>
            <div class="group p-3 lg:p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-amber-400 transition-all duration-500 text-center lg:text-left">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-amber-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-amber-200">2</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-base font-black text-slate-900">スピーチロックを排除する</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-tight">「ちょっと待って」などの言葉による拘束を自覚し、肯定的な表現に言い換える。</p>
              </div>
            </div>
            <div class="group p-3 lg:p-4 bg-white border-2 border-slate-200 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm flex items-center gap-4 lg:gap-6 hover:shadow-xl hover:border-amber-400 transition-all duration-500 text-center lg:text-left">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-amber-700 text-white rounded-xl flex items-center justify-center text-base lg:text-lg font-black shrink-0 shadow-lg shadow-amber-200">3</div>
              <div class="text-left">
                <h4 class="text-sm lg:text-base font-black text-slate-900">非言語の力を活用できる</h4>
                <p class="text-slate-800 text-[10px] lg:text-xs font-bold leading-tight">視線の高さ、頷き、相槌などの「聴く態度」を通じて、深い信頼関係を構築する。</p>
              </div>
            </div>
          </div>
        </div>
      `,
    videoUrl: null,
    badgeLabel: '接遇向上',
    badgeIcon: 'Smile',
  }

  const slidesData = [
    { title: "接遇・マナー研修", order: 0, content: `<div class="flex flex-col items-center justify-center text-center space-y-4 w-full h-full text-balance"><div class="relative w-full max-w-4xl px-4"><div class="absolute inset-0 bg-amber-400 blur-3xl opacity-20 scale-150 animate-pulse text-center"></div><div class="relative bg-transparent lg:bg-white p-0 lg:p-12 rounded-none lg:rounded-[3.5rem] shadow-none lg:shadow-2xl border-none lg:border lg:border-slate-200 w-full mx-auto text-center"><div class="bg-amber-700 text-white px-4 lg:px-6 py-1 lg:py-1.5 rounded-full text-[8px] lg:text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-6 lg:mb-8 shadow-sm">法定研修 2024</div><h2 class="text-3xl lg:text-5xl font-black text-slate-900 leading-tight mb-4 text-center">接遇・マナー研修</h2><p class="text-amber-700 text-sm lg:text-2xl font-black mt-2 whitespace-nowrap text-center">〜利用者の尊厳を守る品格〜</p></div></div><div class="flex items-center justify-center gap-4 text-slate-500 font-black text-[8px] lg:text-[10px] tracking-widest pt-4 text-center w-full"><span class="h-px w-6 lg:w-8 bg-slate-300"></span>CARE LEARNING SYSTEM<span class="h-px w-6 lg:w-8 bg-slate-300"></span></div></div>` },
    { title: "接遇は「最高のケア」の一部", order: 1, content: `<div class="space-y-4 lg:space-y-6 text-center px-4 h-full flex flex-col justify-center text-balance"><div class="inline-flex items-center gap-3 px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-amber-200 mb-2 uppercase tracking-widest mx-auto">信頼の基盤</div><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight px-4 text-center w-full">「心」が開けば「身体」も動く</h4><div class="p-0 lg:p-8 bg-transparent lg:bg-amber-50 border-none lg:border-2 lg:border-amber-100 shadow-none lg:shadow-xl rounded-none lg:rounded-[3rem] text-center lg:text-left text-sm lg:text-lg font-bold text-amber-800 space-y-4 max-w-4xl mx-auto px-4 text-center"><p class="font-black text-center lg:text-left">接遇が不十分な介助は、利用者にとって「攻撃」に感じられます。信頼関係があれば介助への協力が得られ、お互いの負担が劇的に軽減します。</p><p class="font-black text-center lg:text-left text-amber-900 underline underline-offset-8 decoration-2 text-center">接遇は、介助を円滑にするための「最強の潤滑油」なのです。</p></div></div>` },
    { title: "接遇の5原則", order: 2, content: `<div class="space-y-4 lg:space-y-6 text-center px-4 h-full flex flex-col justify-center text-balance"><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight mb-2 px-4 text-center w-full">プロとしての基本チェック</h4><div class="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4 max-w-5xl mx-auto w-full text-center px-4"><div class="p-4 bg-white border-2 border-slate-200 rounded-2xl shadow-sm font-black">1. 挨拶</div><div class="p-4 bg-white border-2 border-slate-200 rounded-2xl shadow-sm font-black">2. 表情（笑顔）</div><div class="p-4 bg-white border-2 border-slate-200 rounded-2xl shadow-sm font-black">3. 身だしなみ</div><div class="p-4 bg-white border-2 border-slate-200 rounded-2xl shadow-sm font-black">4. 言葉遣い</div><div class="p-4 bg-white border-2 border-slate-200 rounded-2xl shadow-sm font-black">5. 態度</div></div><p class="text-slate-500 font-black text-[10px] lg:text-sm mt-4 text-center w-full">※どれか一つでも欠けると、プロの接遇とは言えません。</p></div>` },
    { title: "挨拶：ながら挨拶の卒業", order: 3, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-6 lg:space-y-8 px-4 w-full text-balance"><div class="inline-flex items-center gap-3 px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-[10px] lg:text-xs font-black ring-1 ring-amber-200 mb-2 mx-auto uppercase tracking-widest text-center">挨拶の極意</div><h4 class="text-xl lg:text-2xl font-black text-amber-900 leading-tight px-4 text-center w-full">作業の手を止める勇気</h4><div class="p-6 lg:p-10 bg-white border-[4px] lg:border-[6px] border-amber-600 rounded-[2rem] lg:rounded-[3rem] shadow-2xl max-w-3xl mx-auto w-full text-center"><p class="text-lg lg:text-2xl font-black text-amber-900 leading-relaxed italic text-balance text-center">「ながら挨拶」は「あなたは重要ではない」というメッセージです。一度足を止め、相手の目を見て挨拶を届けましょう。</p></div></div>` },
    { title: "身だしなみの基準", order: 4, content: `<div class="flex flex-col items-center text-center space-y-4 lg:space-y-6 px-4 h-full justify-center text-balance"><div class="p-4 lg:p-6 bg-white rounded-[2rem] lg:rounded-[3.5rem] w-full max-w-2xl shadow-xl border-2 border-slate-200 shrink-0 text-center"><h4 class="text-xl lg:text-2xl font-black mb-2 text-slate-900 text-center">清潔感と安全性が大前提</h4></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-3 font-black text-[10px] lg:text-sm w-full max-w-5xl"><div class="p-3 bg-amber-50 border-2 border-amber-200 rounded-2xl text-left"><p class="text-amber-900 mb-1 text-center">爪の長さ・汚れ</p><p class="text-slate-600 text-center">皮膚を傷つけないよう短く。不潔感を与えない。</p></div><div class="p-3 bg-amber-50 border-2 border-amber-200 rounded-2xl text-left"><p class="text-amber-900 mb-1 text-center">髪型・身なり</p><p class="text-slate-600 text-center">長い髪は結ぶ。シワのない衣服。装飾品は避ける。</p></div></div></div>` },
    { title: "尊厳を奪う言葉遣い", order: 5, content: `<div class="flex flex-col justify-center h-full space-y-6 lg:space-y-8 px-4 lg:px-12 text-left text-balance"><div class="space-y-4"><h4 class="text-2xl lg:text-4xl font-black text-amber-900 flex items-center gap-4 lg:gap-6 justify-center"><span class="w-2 h-8 lg:w-3 lg:h-12 bg-amber-700 rounded-full"></span>タメ口の弊害</h4></div><ul class="space-y-4 lg:space-y-6 text-lg lg:text-3xl font-black text-slate-800 pl-0 leading-tight text-center"><li>・「〜してね」「あーんして」</li><li>・人生の大先輩であることを忘れない</li><li>・敬称を略さない（「〜ちゃん」禁止）</li></ul><p class="text-rose-700 font-black text-sm lg:text-xl mt-4 text-center w-full">「親しみ」を「馴れ馴れしさ」へ履き違えない</p></div>` },
    { title: "プロの丁寧な言葉選び", order: 6, content: `<div class="flex flex-col justify-center h-full space-y-6 lg:space-y-8 px-4 lg:px-12 text-left text-balance text-center"><div class="space-y-4"><h4 class="text-2xl lg:text-4xl font-black text-amber-900 flex items-center gap-4 lg:gap-6 justify-center"><span class="w-2 h-8 lg:w-3 lg:h-12 bg-amber-700 rounded-full"></span>敬語の基本</h4></div><ul class="space-y-4 lg:space-y-6 text-lg lg:text-3xl font-black text-slate-800 pl-0 leading-tight text-center"><li>・丁寧語（〜です、〜ます）が基本</li><li>・「〜でよろしかったでしょうか」は誤用</li><li>・相手が聞き取りやすいトーンと速さ</li></ul></div>` },
    { title: "態度のマナー：拒絶サインを消す", order: 7, content: `<div class="flex flex-col justify-center h-full space-y-6 lg:space-y-8 px-4 lg:px-12 text-left text-balance text-center"><div class="space-y-4"><h4 class="text-2xl lg:text-4xl font-black text-amber-900 flex items-center gap-4 lg:gap-6 justify-center"><span class="w-2 h-8 lg:w-3 lg:h-12 bg-amber-700 rounded-full"></span>身体は語っている</h4></div><ul class="space-y-4 lg:space-y-6 text-lg lg:text-3xl font-black text-slate-800 pl-0 leading-tight text-center"><li>・腕組み、ポケットに手を入れる</li><li>・壁に寄りかかる、顎を出す</li><li>・利用者の方を向かずに作業する</li></ul></div>` },
    { title: "クッション言葉の活用", order: 8, content: `<div class="flex flex-col items-center text-center space-y-4 lg:space-y-6 px-4 h-full justify-center text-balance text-center"><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight text-center w-full">一言添える、大人の配慮</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-3 font-black text-sm lg:text-base w-full max-w-4xl text-center"><div class="flex flex-col gap-3"><span class="px-6 py-2.5 bg-amber-50 border-2 border-amber-200 rounded-2xl text-amber-900 shadow-sm text-center">「恐れ入りますが、」</span><span class="px-6 py-2.5 bg-amber-50 border-2 border-amber-200 rounded-2xl text-amber-900 shadow-sm text-center">「差し支えなければ、」</span></div><div class="flex flex-col gap-3"><span class="px-6 py-2.5 bg-amber-50 border-2 border-amber-200 rounded-2xl text-amber-900 shadow-sm text-center">「お忙しいところ恐縮ですが」</span><span class="px-6 py-2.5 bg-amber-50 border-2 border-amber-200 rounded-2xl text-amber-900 shadow-sm text-center">「せっかくですが今回は」</span></div></div></div>` },
    { title: "肯定的な表現への言い換え", order: 9, content: `<div class="flex flex-col justify-center h-full space-y-6 lg:space-y-8 px-4 lg:px-12 text-left text-balance text-center"><h4 class="text-xl lg:text-2xl font-black text-amber-900 text-center w-full">「〜しないで」を言わない</h4><ul class="space-y-4 lg:space-y-6 text-sm lg:text-xl font-black text-slate-800 pl-0 leading-tight text-center"><li>・×「動かないで」→ ○「座っていましょう」</li><li>・×「こぼさないで」→ ○「ゆっくり召し上がれ」</li><li>・×「走らないで」→ ○「ゆっくり歩きましょう」</li></ul><p class="text-blue-700 font-black text-center w-full mt-4 text-sm lg:text-lg">肯定的な指示は脳に届きやすくなります</p></div>` },
    { title: "スピーチロック：心の拘束", order: 10, content: `<div class="flex flex-col items-center justify-center h-full space-y-6 lg:space-y-8 px-4 w-full text-balance text-center"><h4 class="text-xl lg:text-2xl font-black text-red-900 text-center w-full mb-2 px-4 animate-pulse">言葉による拘束の排除</h4><div class="grid grid-cols-1 gap-3 lg:gap-4 w-full max-w-2xl text-center"><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-red-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shrink-0"><span class="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-red-400 opacity-75"></span>1</span>「ちょっと待ってて！」</div><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-red-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shrink-0">2</span>「ダメですよ！」</div><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-red-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shrink-0">3</span>「さっき言いましたよね！」</div></div></div>` },
    { title: "非言語のコミュニケーション力", order: 11, content: `<div class="flex flex-col items-center justify-center h-full space-y-6 lg:space-y-8 px-4 w-full text-balance text-center"><h4 class="text-xl lg:text-2xl font-black text-slate-900 text-center w-full mb-2 px-4">態度が言葉以上に伝わる</h4><div class="grid grid-cols-1 gap-3 lg:gap-4 w-full max-w-2xl text-center"><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-amber-700 text-white rounded-full flex items-center justify-center shrink-0">1</span>視線の高さを合わせる（膝をつく）</div><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-amber-700 text-white rounded-full flex items-center justify-center shrink-0">2</span>ゆっくりと深い頷き（受容）</div><div class="flex items-center gap-4 bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm font-black justify-center lg:justify-start text-sm lg:text-base"><span class="w-10 h-10 bg-amber-700 text-white rounded-full flex items-center justify-center shrink-0">3</span>温かい眼差し（笑顔のキープ）</div></div></div>` },
    { title: "傾聴：ありのままを聴く", order: 12, content: `<div class="flex flex-col items-center justify-center h-full text-left space-y-4 lg:space-y-6 px-6 lg:px-12 w-full text-balance text-center"><h4 class="text-xl lg:text-2xl font-black text-amber-700 text-center mb-2 uppercase tracking-widest w-full px-4">相手の心の声を拾う</h4><div class="space-y-6 lg:space-y-8 font-black text-slate-900 max-w-4xl mx-auto w-full text-center"><div><p class="text-lg lg:text-2xl text-amber-600 mb-1 flex items-center gap-3 justify-center text-center"><span>●</span> 受容</p><p class="text-sm lg:text-lg text-slate-600 font-bold text-center">否定せず、話を受け入れる。</p></div><div><p class="text-lg lg:text-2xl text-amber-600 mb-1 flex items-center gap-3 justify-center text-center"><span>●</span> 共感</p><p class="text-sm lg:text-lg text-slate-600 font-bold text-center">「それはお辛かったですね」と感情に寄り添う。</p></div><div><p class="text-lg lg:text-2xl text-amber-600 mb-1 flex items-center gap-3 justify-center text-center"><span>●</span> 待つ姿勢</p><p class="text-sm lg:text-lg text-slate-600 font-bold text-center">言葉に詰まっても急かさず、ゆっくり待つ。</p></div></div></div>` },
    { title: "満足感：品格が安心を創る", order: 13, content: `<div class="space-y-6 lg:space-y-8 text-center flex flex-col items-center justify-center h-full px-4 w-full text-balance text-center text-balance"><h4 class="text-xl lg:text-2xl font-black text-slate-900 leading-tight px-4 text-center w-full">プロとしての誇り</h4><div class="p-8 lg:p-10 bg-white border-[4px] lg:border-[6px] border-amber-600 rounded-[2rem] lg:rounded-[3rem] shadow-2xl max-w-3xl mx-auto w-full text-center"><p class="text-xl lg:text-2xl font-black text-amber-900 leading-relaxed italic text-balance text-center text-center">あなたの接遇が、<br/>施設を真の安らぎの場に変える。<br/>その誇りを持って向き合いましょう。</p></div><p class="font-black text-sm lg:text-lg text-slate-800 mt-2 text-center w-full px-4 text-center">今日学んだことを、最初の一歩に。</p></div>` },
    { title: "まとめ：今日から変えられること", order: 14, content: `<div class="flex flex-col items-center text-center space-y-6 lg:space-y-10 w-full h-full justify-center text-slate-900 px-4 text-center text-balance"><div class="w-24 h-24 lg:w-28 h-28 bg-amber-700 rounded-[2.5rem] lg:rounded-[3rem] flex items-center justify-center shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-500 mx-auto"><svg class="w-12 h-12 lg:w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div><h3 class="text-2xl lg:text-4xl font-black leading-tight text-center w-full text-balance">あなたの笑顔が、<br/>最高のケアになります。</h3><div class="pt-8 lg:pt-10 border-t-2 border-slate-200 w-full max-w-md text-center mx-auto"><p class="text-slate-500 font-black text-[8px] lg:text-[10px] uppercase tracking-[0.5em]">研修終了</p></div></div>` },
    { title: "理解度テストのご案内", order: 15, content: `
        <div class="flex flex-col items-center text-center space-y-4 lg:space-y-6 w-full h-full justify-center px-4 text-center text-balance">
          <div class="bg-emerald-600 text-white px-6 py-1.5 rounded-full text-[8px] lg:text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-4 lg:mb-2 shadow-lg px-4 text-center">修了</div>
          <h2 class="text-2xl lg:text-4xl font-black text-slate-900 leading-tight mb-2 text-center w-full text-balance">講義セッション終了</h2>
          <p class="text-emerald-800 text-base lg:text-xl font-black leading-relaxed text-center w-full text-balance px-4">大変お疲れ様でした。<br/>最後に理解度テスト（全10問）を行います。</p>
          <div class="p-4 lg:p-6 bg-amber-50 rounded-2xl lg:rounded-3xl border-2 border-amber-100 max-w-lg mx-auto mt-6">
            <p class="text-amber-900 font-black text-sm lg:text-lg flex items-center justify-center gap-3 text-center">
              <span class="w-2 h-2 bg-amber-700 rounded-full"></span>    
              全問正解を目指しましょう！
              <span class="w-2 h-2 bg-amber-700 rounded-full"></span>    
            </p>
          </div>
        </div>
      ` }
  ]

  const questionsData = [
    { text: '接遇の5原則（挨拶・表情・身だしなみ・言葉遣い・態度）の目的として、最も適切なものはどれか？', explanation: '接遇の目的は単なる形式ではなく、相手への「敬意」と「尊厳の保持」を態度で示すことにあります。', order: 1, choices: { create: [{ text: '相手への敬意と尊厳の保持を示す', isCorrect: true }, { text: '施設側のルールを押し付ける', isCorrect: false }, { text: '効率的に作業を終わらせる', isCorrect: false }] } },
    { text: '作業をしながら挨拶を行う「ながら挨拶」が不適切とされる最大の理由は何か？', explanation: '視線を合わせない挨拶は「あなたは大切ではない」という拒絶のメッセージとして伝わってしまうからです。', order: 2, choices: { create: [{ text: '相手を軽んじている印象を与えるため', isCorrect: true }, { text: '作業のミスが増えるから', isCorrect: false }, { text: '声が聞き取りにくくなるから', isCorrect: false }] } },
    { text: '利用者を呼び捨てにしたり、「〜ちゃん」と呼んだりすることの危険性はどれか？', explanation: '不適切な呼称は対等な関係を損ない、虐待の入り口となる「心理的障壁の低下」を招く恐れがあります。', order: 3, choices: { create: [{ text: '心理的障壁が下がり虐待に繋がりやすい', isCorrect: true }, { text: '親しみやすくなるので推奨される', isCorrect: false }, { text: '本人が許可していれば全く問題ない', isCorrect: false }] } },
    { text: '「ちょっと待ってて！」などの言葉で利用者の行動を制限することを何というか？', explanation: 'これを「スピーチロック（言葉による拘束）」と呼び、身体拘束と同様に不適切なケアとみなされます。', order: 4, choices: { create: [{ text: 'スピーチロック', isCorrect: true }, { text: 'タイムマネジメント', isCorrect: false }, { text: '優先順位の提示', isCorrect: false }] } },
    { text: '「〜しないでください」という否定的な表現を、肯定的な表現に言い換えるメリットは？', explanation: '肯定的な言葉（例：座っていましょう）は、脳が行動を理解しやすく、安心感を与えやすいためです。', order: 5, choices: { create: [{ text: '本人が次にすべき行動を理解しやすい', isCorrect: true }, { text: '職員のストレスが減るから', isCorrect: false }, { text: '言葉数が少なくて済むから', isCorrect: false }] } },
    { text: '相手に依頼や断りを入れる際、衝撃を和らげるために添える言葉を何というか？', explanation: '「恐れ入りますが」「差し支えなければ」などの言葉を「クッション言葉」と呼びます。', order: 6, choices: { create: [{ text: 'クッション言葉', isCorrect: true }, { text: 'ガード言葉', isCorrect: false }, { text: 'オブラート言葉', isCorrect: false }] } },
    { text: '話を聴く際の「傾聴（けいちょう）」の姿勢として、不適切なものはどれか？', explanation: '話を途中で遮って自分の意見を言うのは傾聴ではありません。まずは最後まで聴き切ることが重要です。', order: 7, choices: { create: [{ text: '話の途中で自分の意見を被せる', isCorrect: true }, { text: '相手の言葉を否定せずに受け入れる', isCorrect: false }, { text: '適切なタイミングで相槌を打つ', isCorrect: false }] } },
    { text: '認知症の利用者と視線を合わせて話す際の適切な高さはどれか？', explanation: '威圧感を与えないよう、相手よりも「少し低い」または「同じ高さ」に目線を合わせるのが基本です。', order: 8, choices: { create: [{ text: '相手の目線と同じか、少し低い位置', isCorrect: true }, { text: '立ったまま、上から見下ろす位置', isCorrect: false }, { text: '遠くから大きな声で呼びかける', isCorrect: false }] } },
    { text: '来客（ご家族や外部専門職）への対応として、プロとしてふさわしい態度は？', explanation: '施設の顔として、作業を中断して立ち上がり、敬意を持って挨拶・対応することが求められます。', order: 9, choices: { create: [{ text: '立ち上がって、敬意を持って挨拶する', isCorrect: true }, { text: '忙しいので、座ったまま会釈する', isCorrect: false }, { text: '自分の担当外なら挨拶しなくて良い', isCorrect: false }] } },
    { text: '電話応対において、相手に安心感を与える「笑声（えごえ）」とはどのような声か？', explanation: '顔は見えなくても、笑顔で話していることが伝わるような明るく温かいトーンの声のことです。', order: 10, choices: { create: [{ text: '笑顔が伝わるような明るいトーンの声', isCorrect: true }, { text: '大きな声で威圧的に話す声', isCorrect: false }, { text: '感情を抑えた機械的な声', isCorrect: false }] } }
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
