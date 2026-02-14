import { PrismaClient } from '@prisma/client'

export async function seedMental(prisma: PrismaClient) {
  return await prisma.course.create({
    data: {
      title: '精神的ケアに関する研修',
      description: '2024年改正の人格尊重要件に対応。バリデーション療法から感情労働のセルフケアまで。',
      introduction: `
        <div class="space-y-8">
          <div class="flex items-center gap-4">
            <span class="h-1 w-12 bg-indigo-600 rounded-full"></span>
            <p class="text-indigo-600 font-black tracking-widest text-sm uppercase">Empathy Support Hook</p>
          </div>
          <h2 class="text-4xl font-black text-slate-900 leading-tight">一生懸命なあなたほど、<br/>自分の「心の悲鳴」を無視していませんか？</h2>
          <div class="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
            <p>そんな自分を責めていませんか？介護は心を削る「感情労働」です。あなたの心のコップが溢れそうなとき、良いケアは生まれません。</p>
            <div class="p-8 bg-indigo-50/50 rounded-[2rem] border border-indigo-100 shadow-inner relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-indigo-100/30 rounded-bl-full"></div>
              <p class="relative z-10 font-medium italic">2024年度の法改正では「人格の尊重」がさらに強く求められています。本人の感情に焦点を当てる『技術』と、自分自身をケアする『勇気』を学びましょう。</p>
            </div>
            <p>精神的ケアとは、相手の心を変えることではなく、ありのままの感情を認め、安心の居場所を共に作ることです。</p>
          </div>
        </div>
      `,
      learningObjectives: `
        <div class="grid grid-cols-1 gap-6">
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-indigo-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">1</div>
            <div><h4 class="text-xl font-black text-slate-900 mb-2">感情に焦点を当てる技術</h4><p class="text-slate-500 leading-relaxed font-medium">バリデーション療法の基礎を習得し、認知症や精神的不安を抱える利用者の「感情」を否定せず受容する力を養う。</p></div>
          </div>
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-indigo-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">2</div>
            <div><h4 class="text-xl font-black text-slate-900 mb-2">感情労働の理解とセルフケア</h4><p class="text-slate-500 leading-relaxed font-medium">スタッフ自身のストレスサインに気づき、チームでのデブリーフィング（振り返り）を通じてメンタルヘルスを維持する手法を学ぶ。</p></div>
          </div>
        </div>
      `,
      slides: {
        create: [
          { title: '精神的ケア：心と心が響き合う瞬間のために', order: 0, content: `<div class="flex flex-col items-center justify-center min-h-[300px] text-center space-y-12"><div class="relative"><div class="absolute inset-0 bg-indigo-400 blur-3xl opacity-20 scale-150 animate-pulse"></div><div class="relative bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 max-w-sm"><div class="bg-indigo-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-6">Mental Wellness</div><h2 class="text-3xl font-black text-slate-900 leading-tight mb-4">精神的ケアに関する研修<br/>〜利用者と自分の心を守る〜</h2></div></div><div class="flex items-center gap-4 text-slate-400 font-black text-[10px] tracking-widest"><span class="h-px w-8 bg-slate-200"></span>CARE LEARNING SYSTEM<span class="h-px w-8 bg-slate-200"></span></div></div>` },
          { title: '人格の尊重：2024年度の最重要指針', order: 1, content: `<div class="space-y-8"><div class="inline-flex items-center gap-3 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black ring-1 ring-indigo-100"><span class="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></span>DIGNITY POLICY</div><h4 class="text-2xl font-black text-slate-900 leading-tight">「利用者」である前に、<br/><span class="text-indigo-600 decoration-4 underline underline-offset-8">豊かな人生を歩んだ個人</span>です</h4><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="p-6 bg-white border-2 border-slate-50 rounded-[2rem] shadow-sm"><p class="text-sm font-black text-slate-900 mb-2">人格尊重義務</p><p class="text-[11px] text-slate-500 font-medium">本人の意向、嗜好、生活歴を重視し、一律の管理を排したケアが法的に求められています。</p></div><div class="p-6 bg-white border-2 border-slate-50 rounded-[2rem] shadow-sm"><p class="text-sm font-black text-slate-900 mb-2">精神的自立への支援</p><p class="text-[11px] text-slate-500 font-medium">身体の介助だけでなく、社会的な役割や意欲を維持するための関わりが不可欠です。</p></div></div></div>` },
          { title: '魔法の技法：バリデーション', order: 2, content: `<div class="space-y-8"><div class="flex flex-col items-center text-center"><div class="bg-slate-100 px-4 py-1 rounded-full text-[10px] font-black text-slate-500 tracking-widest uppercase mb-4">Communication Technique</div><h4 class="text-xl font-black text-slate-900 text-center leading-relaxed">感情を「肯定（Validate）」する</h4></div><div class="relative grid grid-cols-2 gap-px bg-slate-200 p-px rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl"><div class="p-6 bg-white text-center space-y-3"><div class="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-black mx-auto">1</div><p class="text-xs font-black text-slate-900">評価しない</p><p class="text-[9px] text-slate-400">正しいか間違いかではなく、「その時どう感じたか」を聴く</p></div><div class="p-6 bg-white text-center space-y-3"><div class="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-black mx-auto">2</div><p class="text-xs font-black text-slate-900">リフレージング</p><p class="text-[9px] text-slate-400">相手の言葉を繰り返すことで、「わかってもらえた」安心感を作る</p></div></div></div>` },
          { title: '介護は「感情労働」である', order: 3, content: `<div class="space-y-8"><div class="p-8 bg-blue-50 rounded-[2.5rem] border-2 border-blue-100 border-dashed relative text-center"><div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">Self-Support</div><h4 class="text-2xl font-black text-blue-900 mb-4">心を「整える」のも専門スキル</h4><p class="text-[11px] text-blue-800 italic font-medium">感情労働とは、自身の感情を管理・抑制する仕事。スタッフのメンタルダウンは組織の損失です。</p></div><div class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl"><p class="text-sm font-black text-slate-900 mb-6 flex items-center gap-2"><span class="w-1.5 h-6 bg-blue-600 rounded-full"></span>心のコップを溢れさせないために</p><div class="grid grid-cols-2 gap-4"><div class="p-4 bg-slate-50 rounded-2xl"><p class="text-[10px] font-black text-slate-900 mb-1">デブリーフィング</p><p class="text-[9px] text-slate-500 font-medium leading-relaxed">辛い体験をチームで話し、感情を溜め込まない</p></div><div class="p-4 bg-slate-50 rounded-2xl"><p class="text-[10px] font-black text-slate-900 mb-1">境界線の意識</p><p class="text-[9px] text-slate-500 font-medium leading-relaxed">オンとオフの切り替えを儀式化する</p></div></div></div></div>` },
          { title: '認知症の方への心理的サポート', order: 4, content: `<div class="space-y-6"><div class="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"><h4 class="text-xs font-black tracking-[0.3em] uppercase opacity-50 mb-6">Empathic Approach</h4><div class="space-y-4 text-lg font-black text-left"><div class="flex items-center gap-4"><span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-xs">01</span><p>「見る」：正面から、同じ目線の高さで優しく</p></div><div class="flex items-center gap-4"><span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-xs">02</span><p>「触れる」：広い面積でゆっくりと包み込む</p></div><div class="flex items-center gap-4"><span class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-xs">03</span><p>「話す」：穏やかなトーンで、一度にひとつずつ</p></div></div></div></div>` },
          { title: 'シミュレーション：繰り返す訴えへの対応', order: 5, content: `<div class="space-y-6"><div class="p-8 bg-orange-50 border-2 border-orange-100 rounded-[2.5rem] text-center"><p class="text-orange-900 text-lg font-black leading-relaxed">夕方、「家に帰りたい」と同じ訴えを何度も繰り返す利用者がいます。どう関わりますか？</p></div><div class="grid grid-cols-1 gap-4"><div class="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center gap-4 opacity-60"><span class="w-10 h-10 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center font-black">×</span><p class="text-xs font-bold italic">「さっきも言いましたよ、今は夜だから帰れません」と現実を突きつける</p></div><div class="p-6 bg-white border border-emerald-100 rounded-2xl shadow-xl ring-2 ring-emerald-50 flex items-center gap-4"><span class="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-black shadow-lg">○</span><p class="text-xs font-black text-slate-900 font-bold">「お家に帰りたいんですね（感情の受容）」と共鳴し、その背景にある不安を聴く。昔の話を聞くなどして安心できる居場所を作る。</p></div></div></div>` },
          { title: 'まとめ：満たされた心から、良いケアを', order: 6, content: `<div class="flex flex-col items-center justify-center min-h-[450px] text-center space-y-10"><div class="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-200 rotate-3"><svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg></div><h3 class="text-3xl font-black text-slate-900 leading-tight">精神的ケアは、<br/>自分を大切にすることから。</h3><p class="text-slate-500 font-medium text-lg max-w-sm mx-auto leading-relaxed">あなたの心が穏やかであれば、それは鏡のように利用者に伝わります。自分を労わり、チームで心を支え合いましょう。</p><div class="pt-10 border-t border-slate-100 w-full"><p class="text-slate-400 font-black text-xs uppercase tracking-[0.3em]">End of Session</p></div></div>` }
        ]
      },
      questions: {
        create: [
          { text: '利用者の感情に焦点を当て、事実の正誤を問わずに受容し共感するコミュニケーション技法を何というか。', explanation: 'バリデーション（Validation）と呼ばれ、認知症の方の自尊心の回復や不安の軽減に有効です。', order: 1, choices: { create: [{ text: 'バリデーション', isCorrect: true }, { text: 'オリエンテーション', isCorrect: false }, { text: 'コーチング', isCorrect: false }] } },
          { text: '2024年度の介護報酬改定において、全てのケアの基盤として強化された、一律の管理を排した視点はどれか。', explanation: '「人格の尊重」が、虐待防止や意思決定支援の根幹として再定義され、義務化されました。', order: 2, choices: { create: [{ text: '人格の尊重（本人の意向・生活歴の重視）', isCorrect: true }, { text: '一律の安全管理', isCorrect: false }, { text: '介護効率の最大化', isCorrect: false }] } },
          { text: '自分自身の感情を管理・抑制しながら働くことで、精神的負担が生じる労働形態を何というか。', explanation: '感情労働（Emotional Labor）と呼ばれます。介護職はこの負担が大きいため、適切なセルフケアが必要です。', order: 3, choices: { create: [{ text: '感情労働', isCorrect: true }, { text: '単純労働', isCorrect: false }, { text: '肉体労働のみ', isCorrect: false }] } },
          { text: 'スタッフの燃え尽き（バーンアウト）を防ぐため、看取りや困難事例の後にチームで感情を共有し合うことを何というか。', explanation: 'デブリーフィング（振り返り）と呼ばれます。感情を表出することで、精神的な健康を保ちます。', order: 4, choices: { create: [{ text: 'デブリーフィング', isCorrect: true }, { text: 'OJT（職場内訓練）', isCorrect: false }, { text: '業務日報の作成', isCorrect: false }] } },
          { text: '強い不安から同じ訴えを繰り返す利用者に対し、プロとして取るべき態度はどれか。', explanation: '現実的な正論（説得）で否定するのではなく、その時の感情（寂しさや不安）を肯定し受容することが重要です。', order: 5, choices: { create: [{ text: '感情を肯定し受容する', isCorrect: true }, { text: '正論で説得し、間違いを正す', isCorrect: false }, { text: '聞こえないふりをして立ち去る', isCorrect: false }] } }
        ]
      }
    }
  })
}
