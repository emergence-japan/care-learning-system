import { PrismaClient } from '@prisma/client'

export async function seedAbuse(prisma: PrismaClient) {
  const slug = 'abuse'
  const courseData = {
    slug,
    title: '高齢者虐待防止研修（2024年度）',
    description: '〜自分と利用者の笑顔を守るために〜',
    introduction: `
        <div class="flex flex-col items-center justify-center text-center space-y-3 pt-4">
          <div class="flex items-center gap-4">
            <span class="h-px w-12 bg-blue-700 rounded-full"></span>
            <p class="text-blue-800 font-black tracking-widest text-2xl uppercase">高齢者虐待防止研修</p>
            <span class="h-px w-12 bg-blue-700 rounded-full"></span>
          </div>
          <h2 class="text-2xl font-black text-slate-900 leading-tight">「自分だけは大丈夫」と<br/>思っていませんか？</h2>
          <div class="max-w-2xl space-y-2 text-slate-800 text-base leading-relaxed font-bold">
            <p>日々の忙しい業務の中で、つい言葉が強くなってしまったり、<br/>動作を急かしてしまったりしたことはありませんか？</p>
            <div class="p-5 bg-blue-50 rounded-[2rem] border-2 border-blue-200 shadow-inner relative overflow-hidden text-xs">
              <div class="absolute top-0 right-0 w-24 h-24 bg-blue-100/50 rounded-bl-full"></div>
              <p class="relative z-10 italic text-blue-900 font-black text-sm">虐待は、疲れやストレス、そして「良かれと思って」やっている習慣が、<br/>知らぬ間に虐待に繋がってしまうことがあります。</p>
            </div>
            <p class="text-sm text-slate-900 font-black">この研修は、あなた自身と利用者様の笑顔を守るためのものです。<br/>今の自分のケアを、一度一緒に振り返ってみましょう。</p>
          </div>
        </div>
      `,
    learningObjectives: `
        <div class="flex flex-col items-center justify-center text-center space-y-4 pt-4">
          <div class="bg-blue-700 text-white px-6 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-2 shadow-lg shadow-blue-200">Learning Objectives</div>
          <div class="grid grid-cols-1 gap-3 w-full max-w-2xl">
            <div class="group p-4 bg-white border-2 border-slate-200 rounded-[2rem] shadow-sm flex items-center gap-6 hover:shadow-xl hover:border-blue-400 transition-all duration-500">
              <div class="w-12 h-12 bg-blue-700 text-white rounded-xl flex items-center justify-center text-lg font-black shrink-0 shadow-lg shadow-blue-200">1</div>
              <div class="text-left">
                <h4 class="text-lg font-black text-slate-900">自信を持って判断できる</h4>
                <p class="text-slate-800 text-xs font-bold leading-relaxed">何が虐待に当たるのか、その明確な定義を正しく説明できるようになる。</p>
              </div>
            </div>
            <div class="group p-4 bg-white border-2 border-slate-200 rounded-[2rem] shadow-sm flex items-center gap-6 hover:shadow-xl hover:border-blue-400 transition-all duration-500">
              <div class="w-12 h-12 bg-blue-700 text-white rounded-xl flex items-center justify-center text-lg font-black shrink-0 shadow-lg shadow-blue-200">2</div>
              <div class="text-left">
                <h4 class="text-lg font-black text-slate-900">虐待の芽を見つけ、ケアを磨ける</h4>
                <p class="text-slate-800 text-xs font-bold leading-relaxed">不適切なケアにいち早く気づき、日々の言葉掛けを改善できるようになる。</p>
              </div>
            </div>
            <div class="group p-4 bg-white border-2 border-slate-200 rounded-[2rem] shadow-sm flex items-center gap-6 hover:shadow-xl hover:border-blue-400 transition-all duration-500">
              <div class="w-12 h-12 bg-blue-700 text-white rounded-xl flex items-center justify-center text-lg font-black shrink-0 shadow-lg shadow-blue-200">3</div>
              <div class="text-left">
                <h4 class="text-lg font-black text-slate-900">自分と仲間を守る行動がとれる</h4>
                <p class="text-slate-800 text-xs font-bold leading-relaxed">周囲で違和感を感じた際、適切な対応（報告）ができるようになる。</p>
              </div>
            </div>
          </div>
        </div>
      `,
    videoUrl: 'https://www.youtube.com/watch?v=JVLmK8A5k1U',
    badgeLabel: '虐待防止',
    badgeIcon: 'ShieldAlert',
  }

  const slidesData = [
    { title: "高齢者虐待防止研修", order: 0, content: `<div class="flex flex-col items-center justify-center text-center space-y-6 w-full h-full"><div class="relative w-full max-w-4xl"><div class="absolute inset-0 bg-blue-400 blur-3xl opacity-20 scale-150 animate-pulse"></div><div class="relative bg-white p-10 lg:p-16 rounded-[3.5rem] shadow-2xl border border-slate-200 w-full mx-auto"><div class="bg-blue-700 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-8 shadow-sm">Legal Training 2024</div><h2 class="text-4xl lg:text-6xl font-black text-slate-900 leading-tight mb-4 whitespace-nowrap overflow-hidden">高齢者虐待防止研修</h2><p class="text-blue-700 text-xl lg:text-3xl font-black mt-2 whitespace-nowrap">〜尊厳を守るプロフェッショナルとして〜</p></div></div><div class="flex items-center justify-center gap-4 text-slate-500 font-black text-[10px] tracking-widest pt-4"><span class="h-px w-8 bg-slate-300"></span>CARE LEARNING SYSTEM<span class="h-px w-8 bg-slate-300"></span></div></div>` },
    { title: "はじめに：『虐待』は身近にある", order: 1, content: `<div class="space-y-8 text-center"><div class="inline-flex items-center gap-3 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs font-black ring-1 ring-blue-200 mb-4 uppercase tracking-widest">Introduction</div><h4 class="text-3xl font-black text-slate-900 leading-tight">「自分だけは絶対にしない」<br/>そう言い切れますか？</h4><div class="p-10 bg-slate-50 border-2 border-blue-100 shadow-xl rounded-[3rem] text-left text-xl font-bold text-slate-900 space-y-6 leading-relaxed max-w-4xl mx-auto"><p>虐待は、特別な人が起こす事件とは限りません。誰にでもある「心の余裕のなさ」が、ふとした瞬間に不適切なケアへと繋がってしまうのです。</p><p class="text-blue-800 font-black">この研修は、あなた自身と利用者様の笑顔を守るための「盾」を手に入れる時間です。</p></div></div>` },
    { title: "2024年度 義務化の背景", order: 2, content: `<div class="space-y-8 text-center"><h4 class="text-3xl font-black text-slate-900 leading-tight">なぜ今、対策が強化されたのか</h4><div class="grid grid-cols-2 gap-6 max-w-4xl mx-auto"><div class="p-8 bg-white border-2 border-slate-200 rounded-[2.5rem] shadow-xl flex flex-col items-center gap-4"><p class="font-black text-xl text-blue-800">相談件数の増加</p><p class="text-sm font-bold text-slate-700">施設従事者による虐待の通報件数は、過去最高を更新し続けています。</p></div><div class="p-8 bg-white border-2 border-slate-200 rounded-[2.5rem] shadow-xl flex flex-col items-center gap-4"><p class="font-black text-xl text-blue-800">深刻な人権侵害</p><p class="text-sm font-bold text-slate-700">尊厳を傷つける行為は、利用者の生きる意欲を奪う重大な侵害です。</p></div></div></div>` },
    { title: "義務化された4つの措置", order: 3, content: `<div class="space-y-8 text-center"><div class="inline-flex items-center gap-3 px-4 py-2 bg-red-100 text-red-800 rounded-full text-xs font-black ring-1 ring-red-200 mb-2 shadow-sm"><span class="w-2 h-2 bg-red-700 rounded-full animate-ping"></span>MUST CHECK</div><h4 class="text-3xl font-black text-slate-900 leading-tight">全ての事業所が実施すべき<br/>4つの必須事項</h4><div class="grid grid-cols-2 gap-4 max-w-4xl mx-auto"><div class="p-6 bg-slate-50 border-2 border-slate-200 rounded-3xl text-center font-black text-slate-900 shadow-sm hover:border-blue-400 transition-all">1. 虐待防止委員会の開催</div><div class="p-6 bg-slate-50 border-2 border-slate-200 rounded-3xl text-center font-black text-slate-900 shadow-sm hover:border-blue-400 transition-all">2. 指針の整備</div><div class="p-6 bg-slate-50 border-2 border-slate-200 rounded-3xl text-center font-black text-slate-900 shadow-sm hover:border-blue-400 transition-all">3. 定期的な研修の実施</div><div class="p-6 bg-slate-50 border-2 border-slate-200 rounded-3xl text-center font-black text-slate-900 shadow-sm hover:border-blue-400 transition-all">4. 担当者の配置</div></div><p class="text-red-700 font-black text-base mt-4 underline underline-offset-4 decoration-2">※未実施の場合、基本報酬が1%減算されます。</p></div>` },
    { title: "高齢者虐待の「5つの定義」", order: 4, content: `<div class="flex flex-col items-center text-center space-y-10"><div class="p-10 bg-white rounded-[3.5rem] w-full max-w-2xl shadow-2xl border-2 border-slate-200"><h4 class="text-3xl font-black mb-4 text-slate-900">法的に定義された5つのカテゴリー</h4><p class="text-slate-900 font-black">プロとして正確な線引きを理解しましょう</p></div><div class="flex flex-wrap justify-center gap-4 font-black text-lg"><span class="px-6 py-3 bg-blue-50 border-2 border-blue-200 rounded-full text-blue-900 shadow-sm">身体的</span><span class="px-6 py-3 bg-rose-50 border-2 border-rose-200 rounded-full text-rose-900 shadow-sm">心理的</span><span class="px-6 py-3 bg-amber-50 border-2 border-amber-200 rounded-full text-amber-900 shadow-sm">ネグレクト</span><span class="px-6 py-3 bg-purple-50 border-2 border-purple-200 rounded-full text-purple-900 shadow-sm">性的</span><span class="px-6 py-3 bg-emerald-50 border-2 border-emerald-200 rounded-full text-emerald-900 shadow-sm">経済的</span></div></div>` },
    { title: "1. 身体的虐待：直接的な暴力", order: 5, content: `<div class="space-y-8"><div class="p-10 bg-blue-50 rounded-[3rem] border-2 border-blue-200 shadow-xl text-left max-w-4xl mx-auto"><h4 class="text-2xl font-black text-blue-900 mb-6 flex items-center gap-3"><span class="w-2 h-8 bg-blue-700 rounded-full"></span>身体的虐待（暴行）</h4><ul class="space-y-4 text-xl font-black text-slate-900"><li>・殴る、蹴る、つねる、叩くなどの暴力</li><li>・無理やり食事を口に押し込む</li><li>・無理やり立ち上がらせる、または座らせる</li></ul></div></div>` },
    { title: "1. 身体的虐待：不適切な拘束", order: 6, content: `<div class="space-y-8"><div class="p-10 bg-blue-50 rounded-[3rem] border-2 border-blue-200 shadow-xl text-left max-w-4xl mx-auto"><h4 class="text-2xl font-black text-blue-900 mb-6 flex items-center gap-3"><span class="w-2 h-8 bg-blue-700 rounded-full"></span>身体的虐待（行動制限）</h4><ul class="space-y-4 text-xl font-black text-slate-900"><li>・ベッド柵（サイドレール）で四方を囲む</li><li>・車椅子に紐やベルトで縛り付ける</li><li>・向精神薬を過剰に投与して鎮静させる</li><li>・部屋に鍵をかけて閉じ込める</li></ul></div></div>` },
    { title: "2. 心理的虐待：言葉の暴力", order: 7, content: `<div class="space-y-8"><div class="p-10 bg-rose-50 rounded-[3rem] border-2 border-rose-200 shadow-xl text-left max-w-4xl mx-auto"><h4 class="text-2xl font-black text-rose-900 mb-6 flex items-center gap-3"><span class="w-2 h-8 bg-rose-700 rounded-full"></span>心理的虐待</h4><ul class="space-y-4 text-xl font-black text-slate-900"><li>・怒鳴る、ののしる、威圧的な態度をとる</li><li>・意図的な無視、排斥、仲間外れにする</li><li>・子供扱いする、自尊心を著しく傷つける言動</li></ul></div></div>` },
    { title: "3. 介護等放棄（ネグレクト）", order: 8, content: `<div class="space-y-8"><div class="p-10 bg-amber-50 rounded-[3rem] border-2 border-amber-200 shadow-xl text-left max-w-4xl mx-auto"><h4 class="text-2xl font-black text-amber-900 mb-6 flex items-center gap-3"><span class="w-2 h-8 bg-amber-700 rounded-full"></span>介護等放棄</h4><ul class="space-y-4 text-xl font-black text-slate-900"><li>・排泄物の放置、入浴をさせない等の不衛生</li><li>・食事や水分を十分に与えず衰弱させる</li><li>・必要な医療や介護サービスを意図的に受けさせない</li><li>・ナースコールを意図的に無視する</li></ul></div></div>` },
    { title: "4. 性的虐待：尊厳の侵害", order: 9, content: `<div class="space-y-8"><div class="p-10 bg-purple-50 rounded-[3rem] border-2 border-purple-200 shadow-xl text-left max-w-4xl mx-auto"><h4 class="text-2xl font-black text-purple-900 mb-6 flex items-center gap-3"><span class="w-2 h-8 bg-purple-700 rounded-full"></span>性的虐待</h4><ul class="space-y-4 text-xl font-black text-slate-900"><li>・排泄介助時等に不必要に身体を露出させる</li><li>・わいそつな言葉を投げかけ、本人を辱める</li><li>・本人が嫌がる不適切な接触、性交の強制</li></ul></div></div>` },
    { title: "5. 経済的虐待：財産の侵害", order: 10, content: `<div class="space-y-8"><div class="p-10 bg-emerald-50 rounded-[3rem] border-2 border-emerald-200 shadow-xl text-left max-w-4xl mx-auto"><h4 class="text-2xl font-black text-emerald-900 mb-6 flex items-center gap-3"><span class="w-2 h-8 bg-emerald-700 rounded-full"></span>経済的虐待</h4><ul class="space-y-4 text-xl font-black text-slate-900"><li>・本人の年金や預貯金を、家族や職員が勝手に使う</li><li>・不動産や預金通帳を不当に処分・隠匿する</li><li>・日常生活に必要な金銭を本人に与えない</li></ul></div></div>` },
    { title: "身体拘束の禁止と3つの例外要件", order: 11, content: `<div class="p-12 relative overflow-hidden text-left max-w-4xl mx-auto"><div class="absolute -top-10 -right-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50"></div><h4 class="text-xs font-black tracking-[0.4em] uppercase text-blue-800 mb-10 text-center py-2 bg-blue-50 rounded-full border border-blue-100 shadow-sm">Strict Rule: 3 Principles</h4><div class="space-y-8 text-xl font-black max-w-md mx-auto text-slate-900"><div><p class="text-blue-800 text-sm mb-2 uppercase tracking-widest font-black">01. 切迫性</p><p>命や身体に重大な危険がある</p></div><div class="h-px bg-slate-100"></div><div><p class="text-blue-800 text-sm mb-2 uppercase tracking-widest font-black">02. 非代替性</p><p>他に手段が全くない</p></div><div class="h-px bg-slate-100"></div><div><p class="text-blue-800 text-sm mb-2 uppercase tracking-widest font-black">03. 一時性</p><p>必要最小限の時間である</p></div></div></div>` },
    { title: "身体拘束の手続きと記録", order: 12, content: `<div class="space-y-8 text-center flex flex-col items-center justify-center h-full"><h4 class="text-3xl font-black text-slate-900 leading-tight mb-4">組織の判断と詳細な記録が義務</h4><div class="space-y-6 font-black text-slate-800 max-w-4xl text-2xl leading-relaxed text-left"><div>1. 担当者だけでなく、チームで慎重に検討する</div><div>2. 利用者本人・家族に説明し、必ず同意を得る</div><div>3. 拘束の態様、解除への取り組みを毎回記録する</div><div>4. 毎日、解除できないかを評価し続ける</div></div></div>` },
    { title: "スピーチロック（言葉の拘束）", order: 13, content: `<div class="p-12 bg-amber-50 rounded-[4rem] border-4 border-amber-300 border-dashed text-center shadow-inner max-w-4xl mx-auto"><div class="bg-amber-700 text-white px-8 py-2 rounded-full text-xs font-black inline-block mb-8 uppercase tracking-widest shadow-lg">Crucial Point</div><h4 class="text-3xl font-black text-amber-950 mb-8 italic">「ちょっと待って」は<br/>心の自由を奪う拘束です</h4><p class="text-xl font-black text-amber-900 leading-relaxed py-6">何気ない一言が、身体拘束と同じ罪深さを<br/>持つことを自覚しましょう。</p></div>` },
    { title: "なぜ虐待は起きるのか：要因分析", order: 14, content: `<div class="space-y-10 text-center flex flex-col items-center justify-center h-full"><h4 class="text-3xl font-black text-slate-900 leading-relaxed mb-8">虐待は「環境のゆがみ」から生まれる</h4><div class="grid grid-cols-1 gap-6 max-w-2xl mx-auto"><div class="p-8 bg-white border-2 border-slate-200 rounded-3xl shadow-xl text-left flex items-center gap-6"><div class="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center shrink-0 font-black">1</div><div><p class="font-black text-xl text-blue-800 mb-1">教育・知識の不足</p><p class="text-sm font-bold text-slate-700 leading-relaxed">認知症の行動理解ができず、「わがまま」と捉えてしまう。</p></div></div><div class="p-8 bg-white border-2 border-slate-200 rounded-3xl shadow-xl text-left flex items-center gap-6"><div class="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center shrink-0 font-black">2</div><div><p class="font-black text-xl text-blue-800 mb-1">職員のストレス</p><p class="text-sm font-bold text-slate-700 leading-relaxed">過重労働、人手不足、プライベートの悩みによる余裕のなさ。</p></div></div></div></div>` },
    { title: "未然防止：自己チェックリスト", order: 15, content: `<div class="space-y-8 text-center flex flex-col items-center justify-center h-full w-full"><h4 class="text-3xl font-black text-slate-900 mb-6">「ケアの質」を客観的に見る</h4><div class="space-y-4 font-black text-slate-900 text-2xl max-w-4xl text-left"><div>□ 利用者を「ちゃん・くん」付けで呼んでいないか？</div><div>□ 同意を得ずに、無言で車椅子を押していないか？</div><div>□ 食事を急かしたり、無理やり口に入れていないか？</div><div>□ 仲間の不適切な対応を、見て見ぬふりをしていないか？</div><div>□ 自分のストレスを、利用者にぶつけていないか？</div></div></div>` },
    { title: "ケーススタディ：現場の葛藤", order: 16, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-8"><div class="inline-flex items-center gap-3 px-4 py-2 bg-amber-50 text-amber-800 rounded-full text-xs font-black ring-1 ring-amber-200 mb-2">CASE STUDY</div><h4 class="text-3xl font-black text-slate-900 leading-tight">場面：人手不足の夕食時</h4><div class="p-8 bg-white border-2 border-slate-100 rounded-[3rem] shadow-xl max-w-4xl text-left space-y-6"><p class="text-xl font-bold text-slate-800 leading-relaxed">認知症のA様が何度も立ち上がります。配膳に追われるB職員は、つい強い口調で<br/><span class="text-rose-600 font-black">「座ってて！転んだらどうするの！」</span><br/>と言いながら、A様の肩を強く押さえて座らせました。</p><div class="h-px bg-slate-100"></div><p class="text-lg font-black text-blue-700 italic text-center">この「B職員の焦り」の中に、何が隠れているでしょうか？</p></div></div>` },
    { title: "分析：虐待の芽が生まれる瞬間", order: 17, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-8"><h4 class="text-3xl font-black text-slate-900 leading-tight">分析：それは「愛の鞭」か、それとも？</h4><div class="grid grid-cols-2 gap-6 max-w-5xl mx-auto"><div class="p-8 bg-rose-50 border-2 border-rose-100 rounded-3xl text-left space-y-4 shadow-sm"><p class="font-black text-xl text-rose-700">不適切なケア（虐待の芽）</p><ul class="text-sm font-bold text-slate-700 space-y-2"><li>・行動を力で制限する（身体的虐待）</li><li>・強い言葉で自尊心を傷つける（心理的虐待）</li><li>・「忙しいから仕方ない」という感覚の麻痺</li></ul></div><div class="p-8 bg-blue-50 border-2 border-blue-100 rounded-3xl text-left space-y-4 shadow-sm"><p class="font-black text-xl text-blue-700">背後にあるリスク</p><ul class="text-sm font-bold text-slate-700 space-y-2"><li>・過度なストレスによる感情の爆発</li><li>・「これくらいなら皆やっている」という慣れ</li><li>・孤立した環境での客観性の喪失</li></ul></div></div></div>` },
    { title: "解決：チームで連鎖を断ち切る", order: 18, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-8"><h4 class="text-3xl font-black text-slate-900 leading-tight">解決：プロとして「チーム」で守る</h4><div class="p-10 bg-emerald-50 border-2 border-emerald-100 rounded-[4rem] shadow-inner text-left max-w-4xl space-y-6"><p class="text-xl font-black text-emerald-900">一人で抱え込まず、不適切なケアを止める具体策</p><div class="grid grid-cols-1 gap-4 text-lg font-bold text-slate-800"><div class="flex items-center gap-4 bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm"><span class="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm shrink-0">1</span>自分が焦りを感じたら、深呼吸して「交代」を頼む</div><div class="flex items-center gap-4 bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm"><span class="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm shrink-0">2</span>同僚のきつい言動に気づいたら「手伝いましょうか？」と割って入る</div><div class="flex items-center gap-4 bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm"><span class="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm shrink-0">3</span>「忙しさ」を理由に尊厳を後回しにしない風土を全員で作る</div></div></div></div>` },
    { title: "早期発見と通報義務", order: 19, content: `<div class="flex flex-col items-center justify-center h-full text-center space-y-8"><h4 class="text-3xl font-black italic text-red-900">「疑い」段階でも報告の義務</h4><div class="p-10 bg-white border-4 border-red-100 rounded-[3rem] shadow-xl max-w-4xl"><p class="text-3xl font-black leading-relaxed text-center text-slate-900">発見した者は、速やかに<br/><span class="text-red-700 underline underline-offset-8 decoration-4">市町村</span>へ通報する義務があります。</p></div><p class="text-lg font-black text-red-800">※確実な証拠がなくても、ためらわずに報告することが命を救います。</p></div>` },
    { title: "通報者の保護規定", order: 20, content: `<div class="flex flex-col items-center justify-center h-full text-left space-y-10"><h4 class="text-3xl font-black text-blue-800 flex items-center gap-4"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>公益通報者保護法</h4><p class="text-2xl font-black leading-relaxed text-slate-900 max-w-4xl bg-blue-50 p-8 rounded-3xl border border-blue-100">虐待を通報したことを理由に、解雇や減給、嫌がらせなどの不利益な扱いをすることは法律で固く禁じられています。</p><p class="text-xl font-black text-blue-800 text-center">勇気ある行動が、利用者の命と職場の健全性を守ります。</p></div>` },
    { title: "組織の役割：虐待防止委員会", order: 21, content: `<div class="flex flex-col items-center justify-center h-full text-left space-y-8"><h4 class="text-3xl font-black text-emerald-900 text-center mb-6 uppercase tracking-widest">個人の責任にしない「仕組み」</h4><div class="space-y-6 font-black text-slate-900 text-2xl leading-relaxed max-w-4xl"><p class="flex gap-4"><span class="text-emerald-600">●</span> 事例分析：原因を特定し、組織で改善する。</p><p class="flex gap-4"><span class="text-emerald-600">●</span> 相談窓口：職員が一人で悩み、すぐに話せる風土を作る。</p><p class="flex gap-4"><span class="text-emerald-600">●</span> 再発防止：具体的な改善策を全スタッフで徹底する。</p></div></div>` },
    { title: "家族だったら？（倫理の遵守）", order: 22, content: `<div class="space-y-10 text-center flex flex-col items-center justify-center h-full"><h4 class="text-3xl font-black text-slate-900 leading-tight font-black">プロとしての誇り</h4><div class="p-12 bg-white border-[6px] border-blue-600 rounded-[3rem] shadow-2xl max-w-3xl mx-auto"><p class="text-3xl font-black text-blue-900 leading-relaxed italic">「もし、目の前の利用者が<br/>自分の大切な家族だったら、<br/>同じことをしますか？」</p></div><p class="font-black text-xl text-slate-800 mt-6">その問いに自信を持って「はい」と答えられるケアを。</p></div>` },
    { title: "まとめ：今日から変えられること", order: 23, content: `<div class="flex flex-col items-center text-center space-y-12 w-full h-full justify-center text-slate-900"><div class="w-32 h-32 bg-blue-700 rounded-[3.5rem] flex items-center justify-center shadow-2xl shadow-blue-200 rotate-3 transition-transform hover:rotate-0 duration-500"><svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div><h3 class="text-4xl lg:text-5xl font-black leading-tight">笑顔のある職場を、<br/>全員で作りましょう。</h3><div class="pt-12 border-t-2 border-slate-200 w-full max-w-md text-center"><p class="text-slate-500 font-black text-[10px] uppercase tracking-[0.5em]">End of Session</p></div></div>` },
    { title: "理解度テストのご案内", order: 24, content: `
        <div class="flex flex-col items-center text-center space-y-8 w-full h-full justify-center">
          <div class="bg-emerald-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-6 shadow-lg">Course Completed</div>
          <h2 class="text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-4 text-balance">講義セッション終了</h2>
          <p class="text-emerald-800 text-xl lg:text-2xl font-black leading-relaxed text-balance">大変お疲れ様でした。<br/>最後に理解度テスト（全5問）を行います。</p>
          <div class="p-6 bg-blue-50 rounded-3xl border-2 border-blue-100 max-w-lg mx-auto mt-8">
            <p class="text-blue-900 font-black text-xl flex items-center justify-center gap-3">
              <span class="w-2 h-2 bg-blue-700 rounded-full"></span>
              全問正解を目指しましょう！
              <span class="w-2 h-2 bg-blue-700 rounded-full"></span>
            </p>
          </div>
        </div>
      ` }
  ]

  const questionsData = [
    { text: '2024年度より義務付けられた「4つの措置」に含まれないものは？', explanation: '監視カメラ設置は義務ではありません。', order: 1, choices: { create: [{ text: '監視カメラの常時設置', isCorrect: true }, { text: '研修の実施', isCorrect: false }, { text: '指針の整備', isCorrect: false }, { text: '委員会の開催', isCorrect: false }] } },
    { text: '高齢者虐待法で定義されている「5つの虐待」に含まれない行為は？', explanation: '教育内虐待という区分はありません。', order: 2, choices: { create: [{ text: '教育内虐待', isCorrect: true }, { text: '心理的虐待', isCorrect: false }, { text: '性的虐待', isCorrect: false }, { text: '経済的虐待', isCorrect: false }] } },
    { text: '身体拘束が例外的に認められる「3つの要件」は？', explanation: '切迫性・非代替性・一時性の3つです。', order: 3, choices: { create: [{ text: '切迫性・非代替性・一時性', isCorrect: true }, { text: '緊急性・安全性・同意性', isCorrect: false }] } },
    { text: '強い口調で行動を制限する「スピーチロック」は虐待にあたるか？', explanation: '心理北虐待や身体拘束にあたります。', order: 4, choices: { create: [{ text: '○（正しい）', isCorrect: true }, { text: '×（誤り）', isCorrect: false }] } },
    { text: '虐待を発見した際の法律上の義務的な通報先は？', explanation: '市町村へ通報する義務があります。', order: 5, choices: { create: [{ text: '市町村', isCorrect: true }, { text: '警察のみ', isCorrect: false }, { text: '家族のみ', isCorrect: false }] } }
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
