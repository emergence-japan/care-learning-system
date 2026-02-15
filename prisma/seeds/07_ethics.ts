import { PrismaClient } from '@prisma/client'

export async function seedEthics(prisma: PrismaClient) {
  const slug = 'ethics'
  const courseData = {
    slug,
    title: '倫理・法令遵守（コンプライアンス）に関する研修',
    description: '2024年改正の意思決定支援指針と虐待防止減算対応。プロとしての誠実さと法的責任を網羅した決定版。',
    introduction: `
        <div class="space-y-8">
          <div class="flex items-center gap-4">
            <span class="h-1 w-12 bg-zinc-600 rounded-full"></span>
            <p class="text-zinc-600 font-black tracking-widest text-sm uppercase">Curriculum Hook</p>
          </div>
          <h2 class="text-4xl font-black text-slate-900 leading-tight">「これくらい、みんなやってるし...」<br/>そんな小さな妥協が、大きな不正の入り口だとしたら？</h2>
          <div class="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
            <p>ひとつの小さな虚偽記載、慣れによるタメ口、同僚の不正の黙認。それらはすべて「利用者の人生」を軽んじる行為であり、施設の事業停止を招く重大なリスクです。</p>
            <div class="p-8 bg-zinc-50/50 rounded-[2rem] border border-zinc-100 shadow-inner relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-zinc-100/30 rounded-bl-full"></div>
              <p class="relative z-10 font-medium italic">倫理とは、誰も見ていない時のあなたの振る舞いです。法令遵守は守りの盾であり、倫理はプロとしての誇りです。</p>
            </div>
            <p>2024年度より、意思決定支援の徹底や虐待防止措置未実施減算が強化されました。最新の指針に基づき、プロとしての誠実さを再定義しましょう。</p>
          </div>
        </div>
      `,
    learningObjectives: `
        <div class="grid grid-cols-1 gap-6">
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-zinc-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-zinc-900 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">1</div>
            <div><h4 class="text-xl font-black text-slate-900 mb-2">意思決定支援と法的義務</h4><p class="text-slate-500 leading-relaxed font-medium">最新のガイドラインに基づき、本人の意向を尊重する意思決定支援の手順と、事業所の法的責任を100%理解する。</p></div>
          </div>
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-zinc-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-zinc-900 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">2</div>
            <div><h4 class="text-xl font-black text-slate-900 mb-2">誠実な記録と内部報告</h4><p class="text-slate-500 leading-relaxed font-medium">虚偽記載の禁止、ハラスメントの排除、および勇気ある内部報告（公益通報者保護）の重要性を実践レベルで習得する。</p></div>
          </div>
        </div>
      `,
    badgeLabel: '倫理遵守',
    badgeIcon: 'Scale',
  }

  const slidesData = [
    { title: '倫理・法令遵守（コンプライアンス）に関する研修', order: 0, content: `<div class="flex flex-col items-center text-center space-y-10"><div class="relative"><div class="absolute inset-0 bg-zinc-400 blur-3xl opacity-20 scale-150 animate-pulse"></div><div class="relative bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 max-w-lg mx-auto"><div class="bg-zinc-900 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-8">Compliance & Ethics</div><h2 class="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">倫理・法令遵守<br/><span class="text-zinc-600 text-3xl">〜誠実なケアのために〜</span></h2></div></div><div class="flex items-center justify-center gap-4 text-slate-400 font-black text-[10px] tracking-widest"><span class="h-px w-8 bg-slate-200"></span>CARE LEARNING SYSTEM<span class="h-px w-8 bg-slate-200"></span></div></div>` },
    { title: '法令遵守（コンプライアンス）の体系', order: 1, content: `<div class="space-y-10"><div class="inline-flex items-center gap-3 px-4 py-2 bg-zinc-50 text-zinc-600 rounded-full text-xs font-black ring-1 ring-zinc-100"><span class="w-2 h-2 bg-zinc-600 rounded-full animate-ping"></span>LEGAL FOUNDATION</div><h4 class="text-3xl font-black text-slate-900 leading-tight">法律は、あなたと利用者を<br/><span class="text-zinc-600 decoration-4 underline underline-offset-8">守るためのルール</span>です</h4><div class="grid grid-cols-1 sm:grid-cols-2 gap-6"><div class="p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-sm hover:border-zinc-100 transition-colors"><p class="text-lg font-black text-slate-900 mb-3">介護保険法・運営基準</p><p class="text-sm text-slate-500 font-medium leading-relaxed">サービスの質を保つための「最低限」のルール。違反は指定取消に繋がります。</p></div><div class="p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-sm hover:border-zinc-100 transition-colors"><p class="text-lg font-black text-slate-900 mb-3">高齢者虐待防止法</p><p class="text-sm text-slate-500 font-medium leading-relaxed">2024年度より「未実施減算」が導入され、組織的対応がさらに厳格化されました。</p></div></div></div>` },
    { title: 'グレーゾーン行動の危険性', order: 2, content: `<div class="space-y-10 text-center"><div class="flex flex-col items-center"><div class="bg-slate-100 px-6 py-1.5 rounded-full text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase mb-6">Boundary Analysis</div><h4 class="text-3xl font-black text-slate-900 leading-relaxed">「慣れ」がプロの境界線を曖昧にする</h4></div><div class="relative grid grid-cols-2 gap-px bg-slate-200 p-px rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl"><div class="p-8 bg-white space-y-4"><div class="w-14 h-14 bg-zinc-50 text-zinc-600 rounded-2xl flex items-center justify-center font-black mx-auto text-xl shadow-sm">A</div><p class="text-lg font-black text-slate-900">タメ口・愛称</p><p class="text-xs text-slate-400 leading-relaxed">親しき仲にも礼儀なしは、自尊心の侵害です</p></div><div class="p-8 bg-white space-y-4"><div class="w-14 h-14 bg-zinc-50 text-zinc-600 rounded-2xl flex items-center justify-center font-black mx-auto text-xl shadow-sm">B</div><p class="text-lg font-black text-slate-900">私物化・公私混同</p><p class="text-xs text-slate-400 leading-relaxed">備品の私的利用や、利用者への個人的贈答</p></div><div class="p-8 bg-white space-y-4"><div class="w-14 h-14 bg-zinc-50 text-zinc-600 rounded-2xl flex items-center justify-center font-black mx-auto text-xl shadow-sm">C</div><p class="text-lg font-black text-slate-900">記録の不正</p><p class="text-xs text-slate-400 leading-relaxed">「後で書けばいい」「やっていないがやったことにする」</p></div><div class="p-8 bg-white space-y-4"><div class="w-14 h-14 bg-zinc-50 text-zinc-600 rounded-2xl flex items-center justify-center font-black mx-auto text-xl shadow-sm">D</div><p class="text-lg font-black text-slate-900">ハラスメント</p><p class="text-xs text-slate-400 leading-relaxed">上下関係を利用した指導の逸脱、不適切な叱責</p></div></div></div>` },
    { title: '最新指針：意思決定支援', order: 3, content: `<div class="space-y-10"><div class="p-10 bg-zinc-50 rounded-[3rem] border-2 border-zinc-100 border-dashed relative text-center shadow-inner"><div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-10 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase shadow-xl">Self-Determination</div><h4 class="text-3xl font-black text-zinc-900 mb-6">「本人の意向」こそが正解</h4><p class="text-lg text-zinc-800 italic font-bold">「安全のために管理する」のではなく、「どうすれば本人の望みが叶うか」を追求します。</p></div><div class="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl"><p class="text-xl font-black text-slate-900 mb-6 flex items-center gap-3"><span class="w-2 h-8 bg-zinc-900 rounded-full"></span>2024年度 改正の急所</p><p class="text-base text-slate-600 leading-relaxed font-medium">全てのスタッフが本人の意思決定を支える具体的な手順（意向の推察、選択肢の提示、多職種合意）を理解し実践することが、法的に求められています。</p></div></div>` },
    { title: '誠実な記録：事実のみを記す', order: 4, content: `<div class="space-y-8"><div class="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden text-center"><div class="absolute -top-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div><h4 class="text-[10px] font-black tracking-[0.4em] uppercase opacity-50 mb-10">Integrity in Records</h4><p class="text-2xl font-black mb-10">やったことは書く。<br/>やっていないことは書かない。</p><div class="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 text-left max-w-xl mx-auto space-y-6"><p class="text-slate-200 text-lg leading-relaxed font-bold flex items-start gap-4"><span class="w-2 h-2 bg-zinc-400 rounded-full mt-2 shrink-0"></span>記録の虚偽記載は、介護報酬の不正請求に直結します。</p><p class="text-slate-200 text-lg leading-relaxed font-bold flex items-start gap-4"><span class="w-2 h-2 bg-zinc-400 rounded-full mt-2 shrink-0"></span>「忙しかったから」という理由は、監査では通用しません。</p><p class="text-slate-200 text-lg leading-relaxed font-bold flex items-start gap-4"><span class="w-2 h-2 bg-zinc-400 rounded-full mt-2 shrink-0"></span>正確な記録こそが、あなたと施設を守る最強のエビデンスです。</p></div></div></div>` },
    { title: '勇気ある報告：内部通報と保護', order: 5, content: `<div class="p-12 bg-zinc-50 rounded-[3.5rem] border border-zinc-100 flex flex-col items-center text-center space-y-10 shadow-inner"><div class="w-24 h-24 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center font-black text-3xl text-zinc-600 shadow-zinc-100">!!</div><h4 class="text-3xl font-black text-zinc-900">「見て見ぬふり」は共犯と同じ</h4><p class="text-xl text-slate-600 font-bold leading-relaxed max-w-2xl">同僚の不適切な言動や不正を見かけたら、直ちに報告してください。公益通報者保護法により、不利益を受けることは法律で禁じられています。組織の自浄作用が命を救います。</p></div>` },
    { title: 'シミュレーション：同僚の不正', order: 6, content: `<div class="space-y-10"><div class="p-10 bg-orange-50 border-2 border-orange-100 rounded-[3rem] text-center shadow-sm"><p class="text-orange-900 text-2xl font-black leading-relaxed">多忙な時間帯。同僚が「ケア記録を、やっていないが『やった』と書いておくよ。後でやるからさ」と言いました。あなたならどうしますか？</p></div><div class="grid grid-cols-1 gap-6"><div class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-center gap-8 opacity-60"><span class="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0">×</span><p class="text-lg font-bold italic">みんな大変な時期だし、その場は同意して黙っておく</p></div><div class="p-8 bg-white border border-emerald-100 rounded-3xl shadow-2xl ring-2 ring-emerald-50 flex items-center gap-8"><span class="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shrink-0">○</span><p class="text-lg font-black text-slate-900 leading-relaxed">「記録の虚偽は重大な違反になるからやめよう」と伝え、改善されない場合は上司に報告する。誠実な報告が施設を守ります。</p></div></div></div>` },
    { title: 'まとめ：選ばれるプロであるために', order: 7, content: `<div class="flex flex-col items-center text-center space-y-12"><div class="w-28 h-28 bg-zinc-900 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-zinc-400 rotate-3"><svg class="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div><h3 class="text-4xl font-black text-slate-900 leading-tight">倫理は、あなた自身の<br/>キャリアを守る最強の武器です</h3><p class="text-slate-500 font-bold text-xl max-w-sm mx-auto leading-relaxed">誠実さは、利用者様への最大のギフト。今日から、誇りを持って働ける職場を共に作りましょう。</p><div class="pt-12 border-t border-slate-100 w-full"><p class="text-slate-400 font-black text-[10px] uppercase tracking-[0.5em]">End of Session</p></div></div>` }
  ]

  const questionsData = [
    { text: '「誰も見ていない時の振る舞い」を重視し、プロとしての行動を律する考え方を何というか。', explanation: '倫理（エシックス）と呼ばれます。法令以前のプロとしての誇りの根幹です。', order: 1, choices: { create: [{ text: '倫理', isCorrect: true }, { text: '効率', isCorrect: false }, { text: '社交性', isCorrect: false }] } },
    { text: '2024年度から介護報酬改定で強化された、虐待防止に関する措置はどれか。', explanation: '虐待防止措置未実施減算が導入されました。組織的な防止体制がない事業所には厳しい経済的制裁が課されます。', order: 2, choices: { create: [{ text: '虐待防止措置未実施減算', isCorrect: true }, { text: 'レクリエーション充実加算', isCorrect: false }, { text: '夜勤手当増額義務', isCorrect: false }] } },
    { text: 'ケア記録において、実際には行っていない処置を「やった」と記載する行為はどのように評価されるか。', explanation: '重大な法令違反（虚偽記載・不正請求）であり、指定取消や返還請求の対象になります。', order: 3, choices: { create: [{ text: '重大な法令違反であり、決して許されない', isCorrect: true }, { text: '多忙な時期であれば多少の調整は許容される', isCorrect: false }, { text: '個人的なメモであれば問題ない', isCorrect: false }] } },
    { text: '同僚による虐待の疑いや不正を、勇気を持って職場や行政に報告した職員を守る法律を何というか。', explanation: '公益通報者保護法です。通報を理由とした解雇や不利益な扱いは法律で禁じられています。', order: 4, choices: { create: [{ text: '公益通報者保護法', isCorrect: true }, { text: '労働基準法', isCorrect: false }, { text: '個人情報保護法', isCorrect: false }] } },
    { text: '利用者の「意思決定支援」において、スタッフが最も優先すべきことは何か。', explanation: 'スタッフ側の都合や管理効率ではなく、本人の意向を最大限に尊重し、実現する方法を探ることです。', order: 5, choices: { create: [{ text: '本人の意向を最大限に尊重すること', isCorrect: true }, { text: '施設の管理効率を上げること', isCorrect: false }, { text: '家族の負担をゼロにすること', isCorrect: false }] } }
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
