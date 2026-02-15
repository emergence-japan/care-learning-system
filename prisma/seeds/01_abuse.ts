import { PrismaClient } from '@prisma/client'

export async function seedAbuse(prisma: PrismaClient) {
  const slug = 'abuse'
  const courseData = {
    slug,
    title: '高齢者虐待防止研修',
    description: '〜自分と利用者の笑顔を守るために〜',
    introduction: `
        <div class="space-y-8">
          <div class="flex items-center gap-4">
            <span class="h-1 w-12 bg-blue-600 rounded-full"></span>
            <p class="text-blue-600 font-black tracking-widest text-sm uppercase">Welcome</p>
          </div>
          <h2 class="text-4xl font-black text-slate-900 leading-tight">「自分だけは大丈夫」と<br/>思っていませんか？</h2>
          <div class="space-y-6 text-slate-600 text-lg leading-relaxed">
            <p>日々の忙しい業務の中で、つい言葉が強くなってしまったり、動作を急かしてしまったりしたことはありませんか？</p>
            <div class="p-8 bg-blue-50/50 rounded-[2rem] border border-blue-100 shadow-inner relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-blue-100/30 rounded-bl-full"></div>
              <p class="relative z-10 font-medium italic">虐待は、疲れやストレス、そして「良かれと思って」やっている日常の習慣が、知らぬ間に虐待に繋がってしまうことがあります。</p>
            </div>
            <p>この研修は、あなた自身と利用者様の笑顔を守るためのものです。今の自分のケアを、一度一緒に振り返ってみましょう。</p>
          </div>
        </div>
      `,
    learningObjectives: `
        <div class="grid grid-cols-1 gap-6">
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-blue-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform">1</div>
            <div>
              <h4 class="text-xl font-black text-slate-900 mb-2">自信を持って判断できる</h4>
              <p class="text-slate-500 leading-relaxed font-medium">何が虐待に当たるのか、その明確な定義を正しく説明できるようになる。</p>
            </div>
          </div>
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-blue-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform">2</div>
            <div>
              <h4 class="text-xl font-black text-slate-900 mb-2">虐待の芽を見つけ、ケアを磨ける</h4>
              <p class="text-slate-500 leading-relaxed font-medium">不適切なケアにいちいち気づき、日々の言葉掛けをより良いものへ改善できるようになる。</p>
            </div>
          </div>
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-blue-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform">3</div>
            <div>
              <h4 class="text-xl font-black text-slate-900 mb-2">自分と仲間を守る行動がとれる</h4>
              <p class="text-slate-500 leading-relaxed font-medium">周囲で「あれ？」と思う場面に遭遇した際、適切な対応（報告）ができるようになる。</p>
            </div>
          </div>
        </div>
      `,
    badgeLabel: '虐待防止',
    badgeIcon: 'Shield',
    videoUrl: 'https://www.youtube.com/watch?v=JVLmK8A5k1U',
  }

  const slidesData = [
    { title: '高齢者虐待防止研修 〜基礎から学ぶ未然防止策〜', order: 0, content: `<div class="flex flex-col items-center text-center space-y-10"><div class="relative"><div class="absolute inset-0 bg-blue-400 blur-3xl opacity-20 scale-150 animate-pulse"></div><div class="relative bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 max-w-lg mx-auto"><div class="bg-blue-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-8">Course Material</div><h2 class="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">高齢者虐待防止研修<br/><span class="text-blue-600 text-3xl">〜基礎から学ぶ未然防止策〜</span></h2></div></div><div class="flex items-center justify-center gap-4 text-slate-400 font-black text-[10px] tracking-widest"><span class="h-px w-8 bg-slate-200"></span>CARE LEARNING SYSTEM<span class="h-px w-8 bg-slate-200"></span></div></div>` },
    { title: '2024年度制度改正のポイント', order: 1, content: `<div class="space-y-8"><div class="inline-flex items-center gap-3 px-4 py-2 bg-red-50 text-red-600 rounded-full text-xs font-black ring-1 ring-red-100"><span class="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>MUST CHECK</div><h4 class="text-3xl font-black text-slate-900 leading-tight">虐待防止は「努力目標」から<br/><span class="text-red-600 decoration-4 underline underline-offset-8">必須の義務</span>へと変わりました</h4><div class="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner"><p class="text-sm font-black text-slate-900 mb-6 flex items-center gap-2"><svg class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>義務化された「4つの措置」</p><ul class="grid grid-cols-1 gap-3 text-xs font-bold text-slate-600"><li class="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm"><span class="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px]">1</span>虐待防止委員会の設置・定期開催</li><li class="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm"><span class="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px]">2</span>虐待防止のための指針の整備</li><li class="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm"><span class="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px]">3</span>職員に対する定期的な研修の実施</li><li class="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm"><span class="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px]">4</span>虐待防止を推進する担当者の配置</li></ul></div></div>` },
    { title: '虐待の5つの種類：その線引きを知る', order: 2, content: `<div class="grid grid-cols-1 gap-4"><div class="group p-5 bg-slate-50/50 rounded-3xl border border-slate-100 flex items-center gap-6 hover:bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"><div class="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-xl font-black text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">1</div><div class="flex-1"><p class="text-lg font-black text-slate-900">身体的虐待</p><p class="text-sm text-slate-500 font-medium">殴る、蹴る、身体拘束、過剰な投薬など。</p></div></div><div class="group p-5 bg-red-50/30 rounded-3xl border border-red-100 flex items-center gap-6 hover:bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"><div class="w-14 h-14 bg-red-600 rounded-2xl shadow-lg flex items-center justify-center text-xl font-black text-white">2</div><div class="flex-1"><p class="text-lg font-black text-red-900 flex items-center gap-2">心理的虐待<span class="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest">CHECK!</span></p><p class="text-sm text-red-700 font-medium">怒鳴る、無視、自尊心を傷つける言葉掛け。</p></div></div><div class="group p-5 bg-red-50/30 rounded-3xl border border-red-100 flex items-center gap-6 hover:bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"><div class="w-14 h-14 bg-red-600 rounded-2xl shadow-lg flex items-center justify-center text-xl font-black text-white">3</div><div class="flex-1"><p class="text-lg font-black text-red-900 flex items-center gap-2">ネグレクト（放置）<span class="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest">CHECK!</span></p><p class="text-sm text-red-700 font-medium">オムツ放置、食事の未提供、必要な医療の拒否。</p></div></div></div>` },
    { title: '身体拘束とスピーチロック', order: 3, content: `<div class="space-y-10"><div class="p-10 bg-amber-50 rounded-[3rem] border-2 border-amber-100 border-dashed relative"><div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-8 py-2 rounded-full text-xs font-black tracking-widest shadow-xl">DANGER</div><h4 class="text-3xl font-black text-amber-900 text-center mb-6">「ちょっと待って」は言葉の拘束です</h4><p class="text-lg text-amber-800 text-center leading-relaxed font-bold italic">言葉によって本人の行動を制限することは心理的虐待や身体拘束にあたります。</p></div><div class="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-100/50"><p class="text-lg font-black text-slate-900 mb-8 flex items-center gap-3"><span class="w-2 h-8 bg-slate-900 rounded-full"></span>身体拘束がもたらす4つの重大な弊害</p><div class="grid grid-cols-2 gap-6"><div class="p-6 bg-slate-50 rounded-3xl"><p class="text-sm font-black text-slate-900 mb-2">身体的弊害</p><p class="text-xs text-slate-500 font-bold">筋力低下・褥瘡・食欲不振</p></div><div class="p-6 bg-slate-50 rounded-3xl"><p class="text-sm font-black text-slate-900 mb-2">精神性弊害</p><p class="text-xs text-slate-500 font-bold">屈辱感・恐怖・怒り</p></div><div class="p-6 bg-slate-50 rounded-3xl"><p class="text-sm font-black text-slate-900 mb-2">知的弊害</p><p class="text-xs text-slate-500 font-bold">認知症の進行・せん妄</p></div><div class="p-6 bg-slate-50 rounded-3xl"><p class="text-sm font-black text-slate-900 mb-2">社会的弊害</p><p class="text-xs text-slate-500 font-bold">家族や地域との不信感</p></div></div></div></div>` },
    { title: '虐待が起こるメカニズム', order: 4, content: `<div class="space-y-10"><div class="flex flex-col items-center"><div class="bg-slate-100 px-6 py-1.5 rounded-full text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase mb-6">Background Analysis</div><h4 class="text-3xl font-black text-slate-900 text-center leading-relaxed">虐待は「個人の性格」ではなく<br/><span class="text-blue-600 italic">負の連鎖</span>から生まれる</h4></div><div class="relative grid grid-cols-2 gap-px bg-slate-200 p-px rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl"><div class="p-8 bg-white flex flex-col items-center text-center space-y-4"><div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-lg">A</div><p class="text-sm font-black text-slate-900">知識・技術不足</p><p class="text-xs text-slate-400 leading-relaxed font-medium">認知症への理解不足により「わがまま」と捉えてしまう</p></div><div class="p-8 bg-white flex flex-col items-center text-center space-y-4"><div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-lg">B</div><p class="text-sm font-black text-slate-900">職員のストレス</p><p class="text-xs text-slate-400 leading-relaxed font-medium">人手不足による焦りや、自身の体調不良、孤立感</p></div><div class="p-8 bg-white flex flex-col items-center text-center space-y-4"><div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-lg">C</div><p class="text-sm font-black text-slate-900">職場の孤立</p><p class="text-xs text-slate-400 leading-relaxed font-medium">「助けて」と言えない環境や、チームの連携不足</p></div><div class="p-8 bg-white flex flex-col items-center text-center space-y-4"><div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-lg">D</div><p class="text-sm font-black text-slate-900">慣れと感覚麻痺</p><p class="text-xs text-slate-400 leading-relaxed font-medium">不適切なケアが「当たり前」になってしまう恐怖</p></div></div></div>` },
    { title: '身体拘束の「3要件」と厳格な手続き', order: 5, content: `<div class="space-y-8"><div class="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden"><div class="absolute -top-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div><h4 class="text-[10px] font-black tracking-[0.4em] uppercase opacity-50 mb-8 text-center">Strict Rules</h4><div class="space-y-6"><div class="flex items-center gap-6"><span class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center font-black text-sm shadow-lg">01</span><p class="font-black text-xl lg:text-2xl">切迫性：命に危険がある</p></div><div class="flex items-center gap-6"><span class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center font-black text-sm shadow-lg">02</span><p class="font-black text-xl lg:text-2xl">非代替性：他に手段がない</p></div><div class="flex items-center gap-6"><span class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center font-black text-sm shadow-lg">03</span><p class="font-black text-xl lg:text-2xl">一時性：必要最小限の時間</p></div></div></div><div class="grid grid-cols-3 gap-4"><div class="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm text-center"><p class="text-[10px] font-black text-slate-400 uppercase mb-2">Step 1</p><p class="text-sm font-bold text-slate-900 leading-tight">チーム判断</p></div><div class="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm text-center"><p class="text-[10px] font-black text-slate-400 uppercase mb-2">Step 2</p><p class="text-sm font-bold text-slate-900 leading-tight">家族同意</p></div><div class="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm text-center"><p class="text-[10px] font-black text-slate-400 uppercase mb-2">Step 3</p><p class="text-sm font-bold text-slate-900 leading-tight">詳細な記録</p></div></div></div>` },
    { title: 'まとめ：利用者の尊厳を守るために', order: 6, content: `<div class="flex flex-col items-center text-center space-y-12"><div class="w-28 h-28 bg-blue-600 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-blue-200 rotate-3"><svg class="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div><h3 class="text-4xl font-black text-slate-900 leading-tight">プロフェッショナルとして、<br/>尊厳を守るケアを</h3><p class="text-slate-500 font-bold text-xl max-w-sm mx-auto leading-relaxed">今日から、笑顔のある職場を全員で作っていきましょう。</p><div class="pt-12 border-t border-slate-100 w-full"><p class="text-slate-400 font-black text-[10px] uppercase tracking-[0.5em]">End of Session</p></div></div>` }
  ]

  const questionsData = [
    { text: '2024年度より義務付けられた「4つの措置」に含まれないものは？', explanation: '監視カメラ設置は義務ではありません。', order: 1, choices: { create: [{ text: '監視カメラの常時設置', isCorrect: true }, { text: '研修の実施', isCorrect: false }, { text: '指針の整備', isCorrect: false }, { text: '委員会の開催', isCorrect: false }] } },
    { text: '高齢者虐待法で定義されている「5つの虐待」に含まれない行為は？', explanation: '教育的虐待という区分はありません。', order: 2, choices: { create: [{ text: '教育内虐待', isCorrect: true }, { text: '心理的虐待', isCorrect: false }, { text: '性的虐待', isCorrect: false }, { text: '経済的虐待', isCorrect: false }] } },
    { text: '身体拘束が例外的に認められる「3つの要件」は？', explanation: '切迫性・非代替性・一時性の3つです。', order: 3, choices: { create: [{ text: '切迫性・非代替性・一時性', isCorrect: true }, { text: '緊急性・安全性・同意性', isCorrect: false }] } },
    { text: '強い口調で行動を制限する「スピーチロック」は虐待にあたるか？', explanation: '心理的虐待や身体拘束にあたります。', order: 4, choices: { create: [{ text: '○（正しい）', isCorrect: true }, { text: '×（誤り）', isCorrect: false }] } },
    { text: '虐待を発見した際の法律上の義務的な通報先は？', explanation: '市町村へ通報する義務があります。', order: 5, choices: { create: [{ text: '市町村', isCorrect: true }, { text: '警察のみ', isCorrect: false }, { text: '家族のみ', isCorrect: false }] } }
  ]

  // Upsert logic based on SLUG
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
