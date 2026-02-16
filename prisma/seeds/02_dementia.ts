import { PrismaClient } from '@prisma/client'

export async function seedDementia(prisma: PrismaClient) {
  const slug = 'dementia'
  const courseData = {
    slug,
    title: '認知症を正しく知ろう',
    description: '〜安心を届けるケアのヒント〜',
    introduction: `
        <div class="space-y-12 text-center flex flex-col items-center">
          <div class="flex items-center gap-4">
            <span class="h-1 w-12 bg-emerald-600 rounded-full"></span>
            <p class="text-emerald-600 font-black tracking-widest text-sm uppercase">Welcome</p>
            <span class="h-1 w-12 bg-emerald-600 rounded-full"></span>
          </div>
          <h2 class="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            「なぜ、私の言葉が<br/>
            <span class="text-emerald-600 text-3xl lg:text-5xl">届かないんだろう？」</span>
          </h2>
          <div class="space-y-8 text-slate-600 text-lg leading-relaxed max-w-2xl">
            <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-bold text-slate-500 mb-8 text-center">
              ※本研修は、2024年施行の認知症基本法に基づき、<br/>最新の認知症ケアと意思決定支援を100%網羅しています。
            </div>
            <p class="font-bold">
              良かれと思ってやった介助なのに、<br/>
              拒否されたり怒鳴られたり。<br/>
              そんな経験はありませんか？
            </p>
            <div class="p-10 bg-emerald-50/50 rounded-[3rem] border border-emerald-100 shadow-inner relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-emerald-100/30 rounded-bl-full"></div>
              <p class="relative z-10 font-black italic text-emerald-900 text-xl leading-relaxed">
                あなたが悪いのではありません。<br/>
                そこには、認知症という「真っ暗な霧」の中を<br/>
                歩く人の、切実な理由があるのです。
              </p>
            </div>
            <p class="font-medium text-base text-slate-500">
              この研修は、そんな「届かない言葉」を<br/>
              「安心の絆」に変えるためのヒントを探る時間です。<br/>
              国が定める共生社会の指針に基づき、<br/>
              共に生きるケアを学びましょう。
            </p>
          </div>
        </div>
      `,
    learningObjectives: `
        <div class="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
          <div class="group p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-emerald-50 transition-all duration-500 flex items-start gap-8 text-left">
            <div class="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shrink-0 shadow-lg shadow-emerald-100 group-hover:scale-110 transition-transform">1</div>
            <div>
              <h4 class="text-xl font-black text-slate-900 mb-2">本人の「意思」を尊重できる</h4>
              <p class="text-slate-500 leading-relaxed font-bold text-base">
                厚生労働省の「意思決定支援」の考え方を理解し、<br/>
                本人の思いを汲み取れるようになる。
              </p>
            </div>
          </div>
          <div class="group p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-emerald-50 transition-all duration-500 flex items-start gap-8 text-left">
            <div class="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shrink-0 shadow-lg shadow-emerald-100 group-hover:scale-110 transition-transform">2</div>
            <div>
              <h4 class="text-xl font-black text-slate-900 mb-2">生活場面ごとの工夫ができる</h4>
              <p class="text-slate-500 leading-relaxed font-bold text-base">
                食事・排泄・入浴など、認知症の特性に応じた<br/>
                具体的な介助と環境設定を習得する。
              </p>
            </div>
          </div>
        </div>
      `,
    badgeLabel: '認知症',
    badgeIcon: 'Zap',
  }

  const slidesData = [
    { 
      title: '認知症を正しく知ろう', 
      order: 0, 
      content: `
        <div class="flex flex-col items-center text-center space-y-10">
          <div class="relative">
            <div class="absolute inset-0 bg-emerald-400 blur-3xl opacity-20 scale-150 animate-pulse"></div>
            <div class="relative bg-white p-12 lg:p-16 rounded-[4rem] shadow-2xl border border-slate-100 max-w-3xl mx-auto flex flex-col items-center">
              <div class="bg-emerald-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-10">Dementia Care</div>
              <h2 class="text-4xl lg:text-6xl font-black text-slate-900 leading-tight mb-8">
                認知症を正しく知ろう
              </h2>
              <span class="h-px w-24 bg-slate-200 mb-8"></span>
              <p class="text-emerald-600 text-xl lg:text-3xl font-black tracking-tighter">
                〜安心を届けるケアのヒント〜
              </p>
            </div>
          </div>
          <div class="flex items-center justify-center gap-4 text-slate-400 font-black text-[10px] tracking-widest">
            <span class="h-px w-8 bg-slate-200"></span>
            CARE LEARNING SYSTEM
            <span class="h-px w-8 bg-slate-200"></span>
          </div>
        </div>
      ` 
    },
    { 
      title: '社会的背景：認知症基本法（2024）', 
      order: 1, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <div class="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black ring-1 ring-emerald-100">
            <span class="w-2 h-2 bg-emerald-600 rounded-full animate-ping"></span>
            LEGAL CONTEXT
          </div>
          <h4 class="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            認知症は「特別なこと」ではなく<br/>
            <span class="text-emerald-600 decoration-4 underline underline-offset-8 text-2xl lg:text-4xl">共に生きる隣人</span>の姿です
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl pt-4">
            <div class="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-xl shadow-slate-100/50 flex flex-col items-center text-center">
              <div class="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p class="text-2xl font-black text-slate-900 mb-4">共生社会の実現</p>
              <p class="text-base text-slate-500 leading-relaxed font-bold">
                認知症基本法に基づき、<br/>尊厳を保持しつつ希望を持って<br/>暮らせる社会を目指します。
              </p>
            </div>
            <div class="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-xl shadow-slate-100/50 flex flex-col items-center text-center">
              <div class="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p class="text-2xl font-black text-slate-900 mb-4">本人の尊厳</p>
              <p class="text-base text-slate-500 leading-relaxed font-bold">
                「何もできない人」ではなく、<br/>人生の主体者として<br/>意思を尊重することが基本です。
              </p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '医学的基礎：3つの原因疾患', 
      order: 2, 
      content: `
        <div class="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
          <div class="group p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 flex items-center gap-10 hover:bg-white hover:shadow-2xl transition-all duration-500">
            <div class="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center text-3xl font-black shrink-0 shadow-xl group-hover:scale-110 transition-transform">1</div>
            <div class="flex-1 text-left">
              <p class="text-2xl font-black text-slate-900 mb-2">アルツハイマー型</p>
              <p class="text-base text-slate-500 font-bold leading-relaxed">
                脳全体が萎縮し、物忘れや<br/>判断力の低下が緩やかに進行します。
              </p>
            </div>
          </div>
          <div class="group p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 flex items-center gap-10 hover:bg-white hover:shadow-2xl transition-all duration-500">
            <div class="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center text-3xl font-black shrink-0 shadow-xl group-hover:scale-110 transition-transform">2</div>
            <div class="flex-1 text-left">
              <p class="text-2xl font-black text-slate-900 mb-2">レビー小体型</p>
              <p class="text-base text-slate-500 font-bold leading-relaxed">
                幻視（ないものが見える）や、<br/>歩行の不安定さが特徴的です。
              </p>
            </div>
          </div>
          <div class="group p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 flex items-center gap-10 hover:bg-white hover:shadow-2xl transition-all duration-500">
            <div class="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center text-3xl font-black shrink-0 shadow-xl group-hover:scale-110 transition-transform">3</div>
            <div class="flex-1 text-left">
              <p class="text-2xl font-black text-slate-900 mb-2">血管性認知症</p>
              <p class="text-base text-slate-500 font-bold leading-relaxed">
                脳梗塞等により、できることと<br/>できないことが混在して現れます。
              </p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '中核症状：脳の故障', 
      order: 3, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <div class="p-12 bg-blue-50 rounded-[3.5rem] border-2 border-blue-100 border-dashed relative shadow-inner max-w-2xl">
            <div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-2 rounded-full text-xs font-black tracking-widest shadow-xl">MEDICAL FACT</div>
            <h4 class="text-3xl lg:text-4xl font-black text-blue-900 mb-8">
              本人の「努力」では<br/>
              <span class="text-4xl lg:text-5xl mt-2 inline-block">解決できません</span>
            </h4>
            <p class="text-xl text-blue-800 italic font-bold leading-relaxed">
              これは脳という「器械」の故障です。<br/>
              叱ったり励ましたりしても解決しません。
            </p>
          </div>
          <div class="grid grid-cols-2 gap-8 w-full max-w-3xl pt-4">
            <div class="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-100/50 flex flex-col items-center justify-center">
              <p class="text-2xl font-black text-slate-900 mb-3 text-center">記憶障害</p>
              <p class="text-sm text-slate-400 font-bold leading-relaxed text-center">直前の出来事を<br/>完全に忘れる</p>
            </div>
            <div class="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-100/50 flex flex-col items-center justify-center">
              <p class="text-2xl font-black text-slate-900 mb-3 text-center">見当識障害</p>
              <p class="text-sm text-slate-400 font-bold leading-relaxed text-center">時間、場所、人が<br/>わからない</p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: 'BPSD（行動・心理症状）の真実', 
      order: 4, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <div class="flex flex-col items-center text-center">
            <div class="bg-slate-100 px-6 py-1.5 rounded-full text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase mb-8">Behavioral Analysis</div>
            <h4 class="text-4xl lg:text-5xl font-black text-slate-900 leading-relaxed">
              BPSDは<br/>
              <span class="text-emerald-600">「SOSのメッセージ」</span>
            </h4>
          </div>
          <div class="relative grid grid-cols-2 gap-px bg-slate-200 p-px rounded-[3.5rem] overflow-hidden border border-slate-200 shadow-2xl max-w-4xl">
            <div class="p-10 bg-white flex flex-col items-center text-center space-y-6 hover:bg-emerald-50/30 transition-colors">
              <div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm">A</div>
              <p class="text-xl font-black text-slate-900">身体的要因</p>
              <p class="text-sm text-slate-400 leading-relaxed font-bold">
                便秘、脱水、痛み、痒みなどが<br/>不穏や徘徊の原因となります
              </p>
            </div>
            <div class="p-10 bg-white flex flex-col items-center text-center space-y-6 hover:bg-emerald-50/30 transition-colors">
              <div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm">B</div>
              <p class="text-xl font-black text-slate-900">環境的要因</p>
              <p class="text-sm text-slate-400 leading-relaxed font-bold">
                眩しい光、騒音、暑さ。<br/>環境一つで症状は落ち着きます
              </p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '意思決定支援のあり方', 
      order: 5, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <div class="bg-slate-900 text-white p-12 lg:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden w-full max-w-3xl">
            <div class="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <h4 class="text-[10px] font-black tracking-[0.4em] uppercase opacity-50 mb-12 text-center">MHLW Policy</h4>
            <p class="text-3xl lg:text-4xl font-black mb-12 italic text-emerald-400 leading-tight">
              本人の意向を<br/>最後まで探し続けること
            </p>
            <div class="space-y-8 text-lg font-bold text-left max-w-md mx-auto text-slate-200">
              <div class="flex items-center gap-8">
                <span class="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center font-black text-base shadow-lg shrink-0">01</span>
                <p>意向の把握：表情や嗜好から推察する</p>
              </div>
              <div class="flex items-center gap-8">
                <span class="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center font-black text-base shadow-lg shrink-0">02</span>
                <p>環境の調整：本人が選択しやすい提示</p>
              </div>
              <div class="flex items-center gap-8">
                <span class="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center font-black text-base shadow-lg shrink-0">03</span>
                <p>チーム検討：多職種で最善を議論する</p>
              </div>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: 'まとめ：あなたの笑顔が最高のケア', 
      order: 6, 
      content: `
        <div class="flex flex-col items-center text-center space-y-12">
          <div class="w-32 h-32 bg-emerald-600 rounded-[3.5rem] flex items-center justify-center shadow-2xl shadow-emerald-200 rotate-3 transition-transform hover:rotate-0 duration-500">
            <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="space-y-6">
            <h3 class="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              認知症ケアに<br/>
              <span class="text-emerald-600">正解はありません。</span>
            </h3>
            <p class="text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
              でも、「寄り添う心」は<br/>共通です。
            </p>
          </div>
          <p class="text-slate-500 font-bold text-xl max-w-sm mx-auto leading-relaxed pt-4">
            今日から笑顔のケアを<br/>始めましょう。
          </p>
          <div class="pt-12 border-t border-slate-100 w-full text-center max-w-xs mx-auto">
            <p class="text-slate-400 font-black text-[10px] uppercase tracking-[0.5em]">End of Session</p>
          </div>
        </div>
      ` 
    }
  ]

  const questionsData = [
    { text: '認知症基本法（2024）で定められたケアの目的はどれか。', explanation: '本人の尊厳を保持し、共生を目指すことが目的です。', order: 1, choices: { create: [{ text: '本人の尊厳を保持し、共生を目指す', isCorrect: true }, { text: '施設内での一律の安全管理', isCorrect: false }] } },
    { text: 'BPSD（行動・心理症状）が発生する大きな要因のひとつは何か。', explanation: '便秘や痛みなどの身体的苦痛が原因となることが多いです。', order: 2, choices: { create: [{ text: '便秘や痛みなどの身体的苦痛', isCorrect: true }, { text: '本人の性格の問題', isCorrect: false }] } },
    { text: '本人の意向を最大限に尊重する支援方法を何というか。', explanation: '意思決定支援と呼ばれます。', order: 3, choices: { create: [{ text: '意思決定支援', isCorrect: true }, { text: '管理型ケア', isCorrect: false }] } },
    { text: '食事において本人が認識しやすくするための環境設定はどれか。', explanation: '食器のコントラストを上げることが有効です。', order: 4, choices: { create: [{ text: '食器の色のコントラストを上げる', isCorrect: true }, { text: 'テレビをつけたままで食事する', isCorrect: false }] } },
    { text: '2024年度から義務化された「認知症介護基礎研修」の対象は誰か？', explanation: '介護サービス事業所に勤務する、無資格の全介護職員が受講義務の対象です。', order: 5, choices: { create: [{ text: '無資格の全介護職員', isCorrect: true }, { text: 'ケアマネジャーのみ', isCorrect: false }] } }
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
