import { PrismaClient } from '@prisma/client'

export async function seedEtiquette(prisma: PrismaClient) {
  const slug = 'etiquette'
  const courseData = {
    slug,
    title: '接遇に関する研修',
    description: '「尊厳保持」を核としたプロのコミュニケーション技術。ミラーリングから感情労働のセルフケアまで。',
    introduction: `
        <div class="space-y-8">
          <div class="flex items-center gap-4">
            <span class="h-1 w-12 bg-blue-600 rounded-full"></span>
            <p class="text-blue-600 font-black tracking-widest text-sm uppercase">Curriculum Hook</p>
          </div>
          <h2 class="text-4xl font-black text-slate-900 leading-tight">「技術はいいけど、あの人はちょっと...」<br/>そう思われてしまう理由を考えたことはありますか？</h2>
          <div class="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
            <p>介護技術がどれほど高くても、立ち居振る舞い一つで、利用者様は「大切にされていない」と感じてしまいます。</p>
            <div class="p-8 bg-blue-50/50 rounded-[2rem] border border-blue-100 shadow-inner relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-blue-100/30 rounded-bl-full"></div>
              <p class="relative z-10 font-medium italic">接遇はマナー（作法）ではありません。それは利用者の「尊厳」を守り、あなたの「プロとしての誇り」を示す権利擁護の技術です。</p>
            </div>
            <p>笑顔と言葉遣いの一つが、ケアの効果を何倍にも高めます。利用者様との信頼関係を築く「魔法の技術」を学びましょう。</p>
          </div>
        </div>
      `,
    learningObjectives: `
        <div class="grid grid-cols-1 gap-6">
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-blue-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">1</div>
            <div><h4 class="text-xl font-black text-slate-900 mb-2">尊厳保持と非言語技術</h4><p class="text-slate-500 leading-relaxed font-medium">目線の高さ、パーソナルスペース、ミラーリング等の非言語技術を用い、利用者が「尊重されている」と感じる接遇を実践できる。</p></div>
          </div>
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-blue-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">2</div>
            <div><h4 class="text-xl font-black text-slate-900 mb-2">感情管理とセルフケア</h4><p class="text-slate-500 leading-relaxed font-medium">「感情労働」としての介護を理解し、笑顔を維持するためのセルフケアとハラスメントへの組織的対応をマスターする。</p></div>
          </div>
        </div>
      `,
    badgeLabel: '接遇マナー',
    badgeIcon: 'Sparkles',
  }

  const slidesData = [
    { title: '接遇に関する研修', order: 0, content: `<div class="flex flex-col items-center text-center space-y-10"><div class="relative"><div class="absolute inset-0 bg-blue-400 blur-3xl opacity-20 scale-150 animate-pulse"></div><div class="relative bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 max-w-lg mx-auto"><div class="bg-blue-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-8">Hospitality Skill</div><h2 class="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">接遇に関する研修<br/><span class="text-blue-600 text-3xl">〜選ばれるプロになるために〜</span></h2></div></div><div class="flex items-center justify-center gap-4 text-slate-400 font-black text-[10px] tracking-widest"><span class="h-px w-8 bg-slate-200"></span>CARE LEARNING SYSTEM<span class="h-px w-8 bg-slate-200"></span></div></div>` },
    { title: '接遇の理念：サービスではなく「権利擁護」', order: 1, content: `<div class="space-y-10"><div class="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black ring-1 ring-blue-100"><span class="w-2 h-2 bg-blue-600 rounded-full animate-ping"></span>CORE PHILOSOPHY</div><h4 class="text-3xl font-black text-slate-900 leading-tight">「人格の尊重」は<br/><span class="text-blue-600 decoration-4 underline underline-offset-8">法的義務</span>です</h4><div class="p-10 bg-white border-2 border-slate-50 rounded-[3rem] shadow-sm font-bold text-slate-700 text-xl leading-relaxed text-center">介護保険法において「利用者の人格を尊重する」ことは運営基準の第一歩。不適切な態度は「マナー違反」ではなく、法的な「人格尊重義務違反」となり得ることを認識してください。</div></div>` },
    { title: '接遇の5原則：プロの身だしなみ', order: 2, content: `<div class="space-y-10 text-center"><div class="relative grid grid-cols-5 gap-px bg-slate-200 p-px rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl"><div class="p-8 bg-white space-y-4"><div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black mx-auto text-lg shadow-sm">1</div><p class="text-base font-black text-slate-900">挨拶</p><p class="text-[10px] text-slate-400 leading-tight">相手を見て、明るく先手で</p></div><div class="p-8 bg-white space-y-4"><div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black mx-auto text-lg shadow-sm">2</div><p class="text-base font-black text-slate-900">表情</p><p class="text-[10px] text-slate-400 leading-tight">穏やかな「専門職の笑顔」</p></div><div class="p-8 bg-white space-y-4"><div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black mx-auto text-lg shadow-sm">3</div><p class="text-base font-black text-slate-900">態度</p><p class="text-[10px] text-slate-400 leading-tight">適切な距離感と姿勢</p></div><div class="p-8 bg-white space-y-4"><div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black mx-auto text-lg shadow-sm">4</div><p class="text-base font-black text-slate-900">身だしなみ</p><p class="text-[10px] text-slate-400 leading-tight">清潔感と安全性の両立</p></div><div class="p-8 bg-white space-y-4"><div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black mx-auto text-lg shadow-sm">5</div><p class="text-base font-black text-slate-900">言葉遣い</p><p class="text-[10px] text-slate-400 leading-tight">プロとしての正しい敬語</p></div></div></div>` },
    { title: '非言語の技術：目線の高さと空間', order: 3, content: `<div class="space-y-8"><div class="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden"><div class="absolute -top-10 -right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div><h4 class="text-[10px] font-black tracking-[0.4em] uppercase opacity-50 mb-10 text-center">Non-Verbal Communication</h4><div class="space-y-6 text-xl font-black max-w-2xl mx-auto"><div class="flex items-center gap-8"><span class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">01</span><p>目線の高さを合わせる：立ったまま見下ろすと、相手は威圧感と恐怖を感じます</p></div><div class="flex items-center gap-8"><span class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">02</span><p>パーソナルスペース：正面から急接近せず、斜め前から安心感を与えつつ近づく</p></div><div class="flex items-center gap-8"><span class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">03</span><p>ミラーリング：相手のリズムに合わせることで、潜在的な信頼感を醸成する</p></div></div></div></div>` },
    { title: '言葉の壁：赤ちゃん言葉の危険性', order: 4, content: `<div class="space-y-10"><div class="p-10 bg-blue-50 rounded-[3rem] border-2 border-blue-100 border-dashed relative text-center shadow-inner"><div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-10 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase shadow-xl">Rights Advocacy</div><h4 class="text-3xl font-black text-blue-900 mb-6">「ちゃん付け」は人格の軽視です</h4><p class="text-lg text-blue-800 italic font-bold">親しみを「なれなれしさ」と履き違えていませんか？不適切な言葉遣いは、心理的虐待の第一歩です。</p></div><div class="grid grid-cols-2 gap-6 max-w-3xl mx-auto"><div class="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm"><p class="text-lg font-black text-slate-400 mb-3">× 馴れ合い</p><p class="text-base text-slate-500 font-bold leading-relaxed">「ごはん食べようね」<br/>「お利口さんだね」</p></div><div class="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm ring-2 ring-blue-50"><p class="text-lg font-black text-blue-600 mb-3">○ プロの接遇</p><p class="text-base text-slate-900 font-bold leading-relaxed">「お食事をお持ちしました」<br/>「素晴らしいですね」</p></div></div></div>` },
    { title: '「聴く」技術：共感と傾聴', order: 5, content: `<div class="p-12 bg-emerald-50 rounded-[3.5rem] border border-emerald-100 flex flex-col items-center text-center space-y-10 shadow-inner"><div class="w-24 h-24 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center font-black text-4xl text-emerald-600 shadow-emerald-100">👂</div><h4 class="text-3xl font-black text-emerald-900">受容的態度の「オウム返し」</h4><p class="text-xl text-slate-600 font-bold leading-relaxed max-w-xl">相手の言葉をそのまま繰り返すことで、「自分の話を聴いてもらえている」という安心感を与えます。否定やアドバイスの前に、まずは徹底的に聴くことが、意思決定支援の基盤です。</p></div>` },
    { title: '感情労働：自分を守るセルフケア', order: 6, content: `<div class="space-y-10 text-center"><div class="flex flex-col items-center"><div class="bg-slate-100 px-6 py-1.5 rounded-full text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase mb-6">Mental Support</div><h4 class="text-3xl font-black text-slate-900 leading-relaxed">笑顔を保つための「心の余裕」</h4></div><div class="p-12 bg-white border-2 border-slate-50 rounded-[3.5rem] shadow-sm text-center font-bold text-slate-700 text-xl leading-relaxed italic max-w-2xl mx-auto">介護は高度な「感情労働」です。自分の疲れに気づき、「今、少し余裕がないです」とチームに相談することは、プロとしての責任です。</div></div>` },
    { title: 'ハラスメントと接遇の境界線', order: 7, content: `<div class="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative text-center overflow-hidden text-white"><div class="absolute -bottom-10 -right-10 w-64 h-64 bg-red-500/10 rounded-full blur-[100px]"></div><h4 class="text-[10px] font-black tracking-[0.4em] uppercase opacity-50 mb-10">Boundary Management</h4><p class="text-2xl font-black mb-10">毅然とした接遇が、あなたと組織を守ります</p><p class="text-lg text-slate-300 leading-relaxed font-bold max-w-2xl mx-auto">理不尽な要求に対しては、一人の問題にせず、組織として「接遇のガイドライン」に基づき、礼儀を保ちつつ毅然と対応します。</p></div>` },
    { title: 'シミュレーション：多忙な時のナースコール', order: 8, content: `<div class="space-y-10"><div class="p-10 bg-orange-50 border-2 border-orange-100 rounded-[3rem] text-center shadow-sm"><p class="text-orange-900 text-2xl font-black leading-relaxed">多忙な時間帯。何度もナースコールを鳴らす利用者に、どう声をかけますか？</p></div><div class="grid grid-cols-1 gap-6"><div class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-center gap-8 opacity-60"><span class="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0">×</span><p class="text-lg font-bold italic">「ちょっと待ってください！今忙しいんです！」と声を荒らげて去る</p></div><div class="p-8 bg-white border border-emerald-100 rounded-3xl shadow-2xl ring-2 ring-emerald-50 flex items-center gap-8"><span class="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shrink-0">○</span><p class="text-lg font-black text-slate-900 leading-relaxed">「〇〇様、お呼びでしょうか。5分ほどお時間をいただけますか？」と具体的な時間を提示して安心させる</p></div></div></div>` },
    { title: 'まとめ：選ばれるプロとしての誇り', order: 9, content: `<div class="flex flex-col items-center text-center space-y-12"><div class="w-28 h-28 bg-blue-600 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-blue-200 rotate-3"><svg class="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div><h3 class="text-4xl font-black text-slate-900 leading-tight">接遇は、あなた自身を<br/>輝かせるための技術です。</h3><p class="text-slate-500 font-bold text-xl max-w-sm mx-auto leading-relaxed">今日から一つ、新しい笑顔の習慣を始めてみませんか。あなたの立ち居振る舞いが、この施設の質を決めています。</p><div class="pt-12 border-t border-slate-100 w-full"><p class="text-slate-400 font-black text-[10px] uppercase tracking-[0.5em]">End of Session</p></div></div>` }
  ]

  const questionsData = [
    { text: '接遇の「5原則」に含まれないものはどれか。', explanation: '挨拶、表情、態度、身だしなみ、言葉遣いが5原則です。「効率」は接遇の原則ではありません。', order: 1, choices: { create: [{ text: '挨拶', isCorrect: false }, { text: '表情', isCorrect: false }, { text: '効率・スピード', isCorrect: true }, { text: '身だしなみ', isCorrect: false }] } },
    { text: '利用者とコミュニケーションをとる際、非言語技術として適切な態度はどれか。', explanation: '威圧感を与えず安心感を与えるため、相手の目線の高さに合わせることが重要です。', order: 2, choices: { create: [{ text: '目線の高さを合わせる（腰を下ろす）', isCorrect: true }, { text: '腕組みをしながら威厳を持って話す', isCorrect: false }, { text: '立ったまま見下ろして指示を出す', isCorrect: false }] } },
    { text: '「赤ちゃん言葉」や過度なタメ口での介助は、どのような法的・倫理的リスクがあるか。', explanation: '本人の尊厳を傷つけ、権利侵害（虐待の芽）になる恐れがあります。厚生労働省の指針でも改善が求められています。', order: 3, choices: { create: [{ text: '本人の尊厳を侵害し、虐待に繋がる恐れがある', isCorrect: true }, { text: '親しみが増して利用者に喜ばれる', isCorrect: false }, { text: '認知症の方には理解しやすいため推奨される', isCorrect: false }] } },
    { text: '相手の話を聴く際、相手の言葉を繰り返すことで共感を示す技術を何というか。', explanation: 'オウム返し（バックトラッキング）と呼ばれ、信頼関係構築に有効な傾聴術です。', order: 4, choices: { create: [{ text: 'オウム返し（ミラーリング・バックトラッキング）', isCorrect: true }, { text: 'スルー（聞き流し）', isCorrect: false }, { text: 'アドバイス（助言）', isCorrect: false }] } },
    { text: '介護職が自身の感情を管理・抑制しながら働く「感情労働」において、適切な行動はどれか。', explanation: '一人で抱え込まず、チームに相談して応援を頼むことが、燃え尽き防止とケアの質維持に不可欠です。', order: 5, choices: { create: [{ text: '周囲に相談し、応援を頼む', isCorrect: true }, { text: '限界まで一人で我慢して笑顔を作る', isCorrect: false }, { text: 'イライラをそのまま利用者にぶつける', isCorrect: false }] } }
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
