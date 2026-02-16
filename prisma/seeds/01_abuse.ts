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
            <span class="h-px w-12 bg-blue-600 rounded-full"></span>
            <p class="text-blue-600 font-black tracking-widest text-2xl uppercase">高齢者虐待防止研修</p>
            <span class="h-px w-12 bg-blue-600 rounded-full"></span>
          </div>
          <h2 class="text-2xl font-black text-slate-900 leading-tight">「自分だけは大丈夫」と<br/>思っていませんか？</h2>
          <div class="max-w-2xl space-y-2 text-slate-600 text-base leading-relaxed font-medium">
            <p>日々の忙しい業務の中で、つい言葉が強くなってしまったり、<br/>動作を急かしてしまったりしたことはありませんか？</p>
            <div class="p-5 bg-blue-50/50 rounded-[2rem] border border-blue-100 shadow-inner relative overflow-hidden text-xs">
              <div class="absolute top-0 right-0 w-24 h-24 bg-blue-100/30 rounded-bl-full"></div>
              <p class="relative z-10 italic text-blue-900">虐待は、疲れやストレス、そして「良かれと思って」やっている習慣が、<br/>知らぬ間に虐待に繋がってしまうことがあります。</p>
            </div>
            <p class="text-sm text-slate-800">この研修は、あなた自身と利用者様の笑顔を守るためのものです。<br/>今の自分のケアを、一度一緒に振り返ってみましょう。</p>
          </div>
        </div>
      `,
    learningObjectives: `
        <div class="flex flex-col items-center justify-center text-center space-y-4 pt-4">
          <div class="bg-slate-900 text-white px-6 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-2 shadow-lg">Learning Objectives</div>
          <div class="grid grid-cols-1 gap-3 w-full max-w-2xl">
            <div class="group p-4 bg-white border border-slate-100 rounded-[2rem] shadow-sm flex items-center gap-6 hover:shadow-xl transition-all duration-500">
              <div class="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center text-lg font-black shrink-0 shadow-lg">1</div>
              <div class="text-left">
                <h4 class="text-lg font-black text-slate-900">自信を持って判断できる</h4>
                <p class="text-slate-500 text-xs font-medium">何が虐待に当たるのか、その明確な定義を正しく説明できるようになる。</p>
              </div>
            </div>
            <div class="group p-4 bg-white border border-slate-100 rounded-[2rem] shadow-sm flex items-center gap-6 hover:shadow-xl transition-all duration-500">
              <div class="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center text-lg font-black shrink-0 shadow-lg">2</div>
              <div class="text-left">
                <h4 class="text-lg font-black text-slate-900">虐待の芽を見つけ、ケアを磨ける</h4>
                <p class="text-slate-500 text-xs font-medium">不適切なケアにいち早く気づき、日々の言葉掛けを改善できるようになる。</p>
              </div>
            </div>
            <div class="group p-4 bg-white border border-slate-100 rounded-[2rem] shadow-sm flex items-center gap-6 hover:shadow-xl transition-all duration-500">
              <div class="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center text-lg font-black shrink-0 shadow-lg">3</div>
              <div class="text-left">
                <h4 class="text-lg font-black text-slate-900">自分と仲間を守る行動がとれる</h4>
                <p class="text-slate-500 text-xs font-medium">周囲で違和感を感じた際、適切な対応（報告）ができるようになる。</p>
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
    { title: "高齢者虐待防止研修", order: 0, content: `<div class="flex flex-col items-center justify-center text-center space-y-6 w-full h-full"><div class="relative w-full max-w-4xl"><div class="absolute inset-0 bg-blue-400 blur-3xl opacity-20 scale-150 animate-pulse"></div><div class="relative bg-white p-10 lg:p-16 rounded-[3.5rem] shadow-2xl border border-slate-100 w-full mx-auto"><div class="bg-blue-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-8">Legal Training 2024</div><h2 class="text-4xl lg:text-6xl font-black text-slate-900 leading-tight mb-4 whitespace-nowrap overflow-hidden">高齢者虐待防止研修</h2><p class="text-blue-600 text-xl lg:text-3xl font-black mt-2 whitespace-nowrap">〜尊厳を守るプロフェッショナルとして〜</p></div></div><div class="flex items-center justify-center gap-4 text-slate-400 font-black text-[10px] tracking-widest pt-4"><span class="h-px w-8 bg-slate-200"></span>CARE LEARNING SYSTEM<span class="h-px w-8 bg-slate-200"></span></div></div>` },
    { title: "はじめに：『虐待』は身近にある", order: 1, content: `<div class="space-y-8 text-center"><h4 class="text-3xl font-black text-white leading-tight">「自分だけは絶対にしない」<br/>そう言い切れますか？</h4><div class="p-10 bg-slate-800 rounded-[3rem] text-left text-xl font-bold text-slate-300 space-y-6 leading-relaxed border border-slate-700"><p>虐待は、特別な人が起こす事件とは限りません。誰にでもある「心の余裕のなさ」が、ふとした瞬間に不適切なケアへと繋がってしまうのです。</p><p class="text-blue-400">この研修は、あなた自身と利用者様の笑顔を守るための「盾」を手に入れる時間です。</p></div></div>` },
    { title: "2024年度 義務化の背景", order: 2, content: `<div class="space-y-8 text-center"><h4 class="text-3xl font-black text-white leading-tight">なぜ今、対策が強化されたのか</h4><div class="grid grid-cols-2 gap-6 max-w-4xl mx-auto"><div class="p-8 bg-[#1e293b] border border-slate-700 rounded-[2.5rem] shadow-xl flex flex-col items-center gap-4"><p class="font-black text-xl text-blue-400">相談件数の増加</p><p class="text-sm font-bold text-slate-400">施設従事者による虐待の通報件数は、過去最高を更新し続けています。</p></div><div class="p-8 bg-[#1e293b] border border-slate-700 rounded-[2.5rem] shadow-xl flex flex-col items-center gap-4"><p class="font-black text-xl text-blue-400">深刻な人権侵害</p><p class="text-sm font-bold text-slate-400">尊厳を傷つける行為は、利用者の生きる意欲を奪う重大な侵害です。</p></div></div></div>` },
    { title: "義務化された4つの措置", order: 3, content: `<div class="space-y-8"><div class="inline-flex items-center gap-3 px-4 py-2 bg-red-500/10 text-red-500 rounded-full text-xs font-black ring-1 ring-red-500/20"><span class="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>MUST CHECK</div><h4 class="text-3xl font-black text-white leading-tight text-center">全ての事業所が実施すべき<br/>4つの必須事項</h4><div class="grid grid-cols-2 gap-4 max-w-4xl mx-auto"><div class="p-6 bg-slate-800 border border-slate-700 rounded-3xl text-center font-black text-slate-200 shadow-lg">1. 虐待防止委員会の開催</div><div class="p-6 bg-slate-800 border border-slate-700 rounded-3xl text-center font-black text-slate-200 shadow-lg">2. 指針の整備</div><div class="p-6 bg-slate-800 border border-slate-700 rounded-3xl text-center font-black text-slate-200 shadow-lg">3. 定期的な研修の実施</div><div class="p-6 bg-slate-800 border border-slate-700 rounded-3xl text-center font-black text-slate-200 shadow-lg">4. 担当者の配置</div></div><p class="text-center text-red-400 font-bold text-sm mt-4 underline underline-offset-4">※未実施の場合、基本報酬が1%減算されます。</p></div>` },
    { title: "高齢者虐待の「5つの定義」", order: 4, content: `<div class="flex flex-col items-center text-center space-y-10"><div class="p-10 bg-white rounded-[3.5rem] w-full max-w-2xl shadow-2xl"><h4 class="text-3xl font-black mb-4 text-slate-900">法的に定義された5つのカテゴリー</h4><p class="text-slate-500 font-bold">プロとして正確な線引きを理解しましょう</p></div><div class="flex flex-wrap justify-center gap-4 font-black text-slate-400 text-lg"><span class="px-6 py-3 bg-white/5 rounded-full ring-1 ring-white/10">身体的</span><span class="px-6 py-3 bg-white/5 rounded-full ring-1 ring-white/10">心理的</span><span class="px-6 py-3 bg-white/5 rounded-full ring-1 ring-white/10">ネグレクト</span><span class="px-6 py-3 bg-white/5 rounded-full ring-1 ring-white/10">性的</span><span class="px-6 py-3 bg-white/5 rounded-full ring-1 ring-white/10">経済的</span></div></div>` },
    { title: "1. 身体的虐待：直接的な暴力", order: 5, content: `<div class="space-y-8"><div class="p-10 bg-blue-900/20 rounded-[3rem] border border-blue-800 shadow-inner text-left"><h4 class="text-2xl font-black text-blue-400 mb-6 flex items-center gap-3"><span class="w-2 h-8 bg-blue-500 rounded-full"></span>身体的虐待（暴行）</h4><ul class="space-y-4 text-xl font-bold text-slate-300"><li>・殴る、蹴る、つねる、叩くなどの暴力</li><li>・無理やり食事を口に押し込む</li><li>・無理やり立ち上がらせる、または座らせる</li></ul></div></div>` },
    { title: "1. 身体的虐待：不適切な拘束", order: 6, content: `<div class="space-y-8"><div class="p-10 bg-blue-900/20 rounded-[3rem] border border-blue-800 shadow-inner text-left"><h4 class="text-2xl font-black text-blue-400 mb-6 flex items-center gap-3"><span class="w-2 h-8 bg-blue-500 rounded-full"></span>身体的虐待（行動制限）</h4><ul class="space-y-4 text-xl font-bold text-slate-300"><li>・ベッド柵（サイドレール）で四方を囲む</li><li>・車椅子に紐やベルトで縛り付ける</li><li>・向精神薬を過剰に投与して鎮静させる</li><li>・部屋に鍵をかけて閉じ込める</li></ul></div></div>` },
    { title: "2. 心理的虐待：言葉の暴力", order: 7, content: `<div class="space-y-8"><div class="p-10 bg-red-900/20 rounded-[3rem] border border-red-800 shadow-inner text-left"><h4 class="text-2xl font-black text-red-400 mb-6 flex items-center gap-3"><span class="w-2 h-8 bg-red-500 rounded-full"></span>心理的虐待</h4><ul class="space-y-4 text-xl font-bold text-slate-300"><li>・怒鳴る、ののしる、威圧的な態度をとる</li><li>・意図的な無視、排斥、仲間外れにする</li><li>・子供扱いする、自尊心を著しく傷つける言動</li></ul></div></div>` },
    { title: "3. 介護等放棄（ネグレクト）", order: 8, content: `<div class="space-y-8"><div class="p-10 bg-amber-900/20 rounded-[3rem] border border-amber-800 shadow-inner text-left"><h4 class="text-2xl font-black text-amber-400 mb-6 flex items-center gap-3"><span class="w-2 h-8 bg-amber-500 rounded-full"></span>介護等放棄</h4><ul class="space-y-4 text-xl font-bold text-slate-300"><li>・排泄物の放置、入浴をさせない等の不衛生</li><li>・食事や水分を十分に与えず衰弱させる</li><li>・必要な医療や介護サービスを意図的に受けさせない</li><li>・ナースコールを意図的に無視する</li></ul></div></div>` },
    { title: "4. 性的虐待：尊厳の侵害", order: 9, content: `<div class="space-y-8"><div class="p-10 bg-purple-900/20 rounded-[3rem] border border-purple-800 shadow-inner text-left"><h4 class="text-2xl font-black text-purple-400 mb-6 flex items-center gap-3"><span class="w-2 h-8 bg-purple-500 rounded-full"></span>性的虐待</h4><ul class="space-y-4 text-xl font-bold text-slate-300"><li>・排泄介助時等に不必要に身体を露出させる</li><li>・わいせつな言葉を投げかけ、本人を辱める</li><li>・本人が嫌がる不適切な接触、接吻、性交の強制</li></ul></div></div>` },
    { title: "5. 経済的虐待：財産の侵害", order: 10, content: `<div class="space-y-8"><div class="p-10 bg-emerald-900/20 rounded-[3rem] border border-emerald-800 shadow-inner text-left"><h4 class="text-2xl font-black text-emerald-400 mb-6 flex items-center gap-3"><span class="w-2 h-8 bg-emerald-500 rounded-full"></span>経済的虐待</h4><ul class="space-y-4 text-xl font-bold text-slate-300"><li>・本人の年金や預貯金を、家族や職員が勝手に使う</li><li>・不動産や預金通帳を不当に処分・隠匿する</li><li>・日常生活に必要な金銭を本人に与えない</li></ul></div></div>` },
    { title: "身体拘束の禁止と3つの例外要件", order: 11, content: `<div class="bg-slate-900 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden text-left"><div class="absolute -top-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div><h4 class="text-xs font-black tracking-[0.4em] uppercase opacity-50 mb-10 text-center text-blue-400">Strict Rule: 3 Principles</h4><div class="space-y-8 text-xl font-bold max-w-md mx-auto"><div><p class="text-blue-400 text-sm mb-2 uppercase">01. 切迫性</p><p>命や身体に重大な危険がある</p></div><div><p class="text-blue-400 text-sm mb-2 uppercase">02. 非代替性</p><p>他に手段が全くない</p></div><div><p class="text-blue-400 text-sm mb-2 uppercase">03. 一時性</p><p>必要最小限の時間である</p></div></div></div>` },
    { title: "身体拘束の手続きと記録", order: 12, content: `<div class="space-y-8 text-center"><h4 class="text-3xl font-black text-white leading-tight">組織の判断と詳細な記録が義務</h4><div class="p-10 bg-slate-800 border border-slate-700 rounded-[3rem] text-left shadow-xl space-y-4 font-bold text-slate-300"><p>1. 担当者だけでなく、チーム（委員会等）で慎重に検討する</p><p>2. 利用者本人・家族に説明し、必ず同意を得る</p><p>3. 拘束の時間、態様、解除への取り組みを毎回記録する</p><p>4. 毎日、解除できないかを評価し続ける</p></div></div>` },
    { title: "スピーチロック（言葉の拘束）", order: 13, content: `<div class="p-12 bg-amber-900/20 rounded-[4rem] border-4 border-amber-800 border-dashed text-center shadow-inner"><div class="bg-amber-600 text-white px-8 py-2 rounded-full text-[10px] font-black inline-block mb-8 uppercase tracking-widest">Crucial Point</div><h4 class="text-3xl font-black text-amber-900 mb-8 italic">「ちょっと待って」は<br/>心の自由を奪う拘束です</h4><p class="text-xl font-bold text-amber-200 leading-relaxed">何気ない一言が、身体拘束と同じ罪深さを<br/>持つことを自覚しましょう。</p></div>` },
    { title: "なぜ虐待は起きるのか：要因分析", order: 14, content: `<div class="space-y-10 text-center"><h4 class="text-3xl font-black text-white leading-relaxed">虐待は「環境のゆがみ」から生まれる</h4><div class="grid grid-cols-1 gap-6 max-w-2xl mx-auto"><div class="p-8 bg-slate-800 border border-slate-700 rounded-3xl text-left"><p class="font-black text-xl text-blue-400 mb-2">1. 教育・知識の不足</p><p class="text-sm font-bold text-slate-400">認知症の行動理解ができず、「わがまま」と捉えてしまう。</p></div><div class="p-8 bg-slate-800 border border-slate-700 rounded-3xl text-left"><p class="font-black text-xl text-blue-400 mb-2">2. 職員のストレス</p><p class="text-sm font-bold text-slate-400">過重労働、人手不足、プライベートの悩みによる余裕のなさ。</p></div></div></div>` },
    { title: "未然防止：自己チェックリスト", order: 15, content: `<div class="space-y-8 text-center"><h4 class="text-3xl font-black text-white">「ケアの質」を客観的に見る</h4><div class="p-10 bg-slate-800 rounded-[3.5rem] border border-slate-700 text-left space-y-6 font-bold text-slate-300 text-lg shadow-inner"><p>□ 利用者を「ちゃん・くん」付けで呼んでいないか？</p><p>□ 同意を得ずに、無言で車椅子を押していないか？</p><p>□ 食事を急かしたり、無理やり口に入れていないか？</p><p>□ 仲間の不適切な対応を、見て見ぬふりをしていないか？</p><p>□ 自分のストレスを、利用者にぶつけていないか？</p></div></div>` },
    { title: "早期発見と通報義務", order: 16, content: `<div class="bg-red-600 text-white p-12 rounded-[4rem] shadow-2xl text-center space-y-8"><h4 class="text-3xl font-black italic">「疑い」段階でも報告の義務</h4><div class="p-8 bg-white/10 rounded-3xl text-left border border-white/20"><p class="text-2xl font-bold leading-relaxed text-center">発見した者は、速やかに<br/><span class="text-yellow-300 underline underline-offset-8 decoration-4">市町村</span>へ通報する義務があります。</p></div><p class="text-sm font-bold opacity-90">※確実な証拠がなくても、ためらわずに報告することが命を救います。</p></div>` },
    { title: "通報者の保護規定", order: 17, content: `<div class="p-10 bg-slate-900 text-white rounded-[3rem] text-left shadow-xl border border-slate-800"><h4 class="text-2xl font-black mb-6 text-blue-400">公益通報者保護法</h4><p class="text-lg font-bold leading-relaxed mb-6 text-slate-300">虐待を通報したことを理由に、解雇や減給、嫌がらせなどの不利益な扱いをすることは法律で固く禁じられています。</p><p class="text-lg font-bold leading-relaxed text-slate-300">勇気ある行動が、利用者の命と職場の健全性を守ります。</p></div>` },
    { title: "組織の役割：虐待防止委員会", order: 18, content: `<div class="p-10 bg-emerald-900/20 rounded-[3rem] border border-emerald-800 text-left space-y-6"><h4 class="text-2xl font-black text-emerald-400 text-center mb-6">個人の責任にしない「仕組み」</h4><div class="space-y-4 font-bold text-slate-300 text-lg"><p class="flex gap-3"><span class="text-emerald-500">・</span>事例分析：個人を責めるのではなく、原因を特定し改善する。</p><p class="flex gap-3"><span class="text-emerald-500">・</span>相談窓口：職員が一人で悩み、すぐに話せる風土を作る。</p><p class="flex gap-3"><span class="text-emerald-500">・</span>再発防止：具体的な改善策を全スタッフで共有し、徹底する。</p></div></div>` },
    { title: "家族だったら？（倫理の遵守）", order: 19, content: `<div class="space-y-10 text-center"><h4 class="text-3xl font-black text-white leading-tight">プロとしての誇り</h4><div class="p-12 bg-white border-2 border-blue-500 rounded-[3rem] shadow-2xl max-w-3xl mx-auto"><p class="text-3xl font-black text-blue-900 leading-relaxed italic">「もし、目の前の利用者が<br/>自分の大切な家族だったら、<br/>同じことをしますか？」</p></div><p class="font-bold text-slate-500">その問いに自信を持って「はい」と答えられるケアを。</p></div>` },
    { title: "まとめ：今日から変えられること", order: 20, content: `<div class="flex flex-col items-center text-center space-y-12 w-full"><div class="w-32 h-32 bg-blue-600 rounded-[3.5rem] flex items-center justify-center shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-500"><svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div><h3 class="text-4xl lg:text-5xl font-black text-white leading-tight">笑顔のある職場を、<br/>全員で作りましょう。</h3><div class="pt-12 border-t border-slate-800 w-full text-center"><p class="text-slate-400 font-black text-[10px] uppercase tracking-[0.5em]">End of Session</p></div></div>` },
    { title: "理解度テストのご案内", order: 21, content: `
        <div class="flex flex-col items-center text-center space-y-8 w-full">
          <div class="relative">
            <div class="absolute inset-0 bg-emerald-400 blur-3xl opacity-20 scale-150 animate-pulse"></div>
            <div class="relative bg-white py-8 lg:py-10 px-12 lg:px-16 rounded-[4rem] shadow-2xl border border-slate-100 max-w-2xl mx-auto flex flex-col items-center">
              <div class="bg-emerald-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-6 text-balance">Course Completed</div>
              <h2 class="text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-4">講義セッション終了</h2>
              <p class="text-emerald-600 text-xl lg:text-2xl font-bold leading-relaxed text-balance">大変お疲れ様でした。<br/>最後に理解度テスト（全5問）を行います。</p>
            </div>
          </div>
          <div class="p-6 bg-blue-500/10 rounded-3xl border border-blue-500/20 max-w-lg mx-auto">
            <p class="text-blue-400 font-bold text-lg flex items-center justify-center gap-3">
              <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
              全問正解を目指しましょう！
              <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
            </p>
          </div>
        </div>
      ` }
  ]

  const questionsData = [
    { text: '2024年度より義務付けられた「4つの措置」に含まれないものは？', explanation: '監視カメラ設置は義務ではありません。', order: 1, choices: { create: [{ text: '監視カメラの常時設置', isCorrect: true }, { text: '研修の実施', isCorrect: false }, { text: '指針の整備', isCorrect: false }, { text: '委員会の開催', isCorrect: false }] } },
    { text: '高齢者虐待法で定義されている「5つの虐待」に含まれない行為は？', explanation: '教育内虐待という区分はありません。', order: 2, choices: { create: [{ text: '教育内虐待', isCorrect: true }, { text: '心理的虐待', isCorrect: false }, { text: '性的虐待', isCorrect: false }, { text: '経済的虐待', isCorrect: false }] } },
    { text: '身体拘束が例外的に認められる「3つの要件」は？', explanation: '切迫性・非代替性・一時性の3つです。', order: 3, choices: { create: [{ text: '切迫性・非代替性・一時性', isCorrect: true }, { text: '緊急性・安全性・同意性', isCorrect: false }] } },
    { text: '強い口調で行動を制限する「スピーチロック」は虐待にあたるか？', explanation: '心理的虐待や身体拘束にあたります。', order: 4, choices: { create: [{ text: '○（正しい）', isCorrect: true }, { text: '×（誤り）', isCorrect: false }] } },
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
