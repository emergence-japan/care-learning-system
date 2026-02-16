import { PrismaClient } from '@prisma/client'

export async function seedTerminal(prisma: PrismaClient) {
  const slug = 'terminal'
  const courseData = {
    slug,
    title: 'ターミナルケア（看取り）に関する研修',
    description: '厚生労働省の指針に準拠。ACPの実践から死別のケア、グリーフケアまでを網羅した決定版。',
    introduction: `
        <div class="space-y-8">
          <div class="flex items-center gap-4">
            <span class="h-1 w-12 bg-rose-600 rounded-full"></span>
            <p class="text-rose-600 font-black tracking-widest text-sm uppercase">Dignity at the End</p>
          </div>
          <h2 class="text-4xl font-black text-slate-900 leading-tight">最期に、どう<br/>思い出されたいですか？</h2>
          <div class="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
            <p>死は、単なる「終わり」ではありません。<br/>それは、その人が懸命に生きてきた人生の「完結」です。<br/>介護職は、その最も大切な幕引きを支える特別な存在です。</p>
            <div class="p-8 bg-rose-50/50 rounded-[2rem] border border-rose-100 shadow-inner relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-rose-100/30 rounded-bl-full"></div>
              <p class="relative z-10 font-medium italic">2024年度の報酬改定では、ACP（人生会議）を通じた<br/>継続的な話し合いが看取り加算の必須要件となりました。<br/>プロとしての技術と心構えを学びましょう。</p>
            </div>
            <p>この研修では、死への恐怖を「安心」に変えるための、<br/>具体的な意思決定支援と緩和の手法を学びます。</p>
          </div>
        </div>
      `,
    learningObjectives: `
        <div class="grid grid-cols-1 gap-6 max-w-3xl mx-auto text-left">
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-rose-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-rose-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">1</div>
            <div>
              <h4 class="text-xl font-black text-slate-900 mb-2">ACP（人生会議）の実践プロセス</h4>
              <p class="text-slate-500 leading-relaxed font-medium">厚労省のガイドラインを理解し、本人の意向を<br/>共有し続ける「繰り返しの対話」手法を習得する。</p>
            </div>
          </div>
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-rose-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-rose-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">2</div>
            <div>
              <h4 class="text-xl font-black text-slate-900 mb-2">看取り期のケアと家族支援</h4>
              <p class="text-slate-500 leading-relaxed font-medium">死の兆候に応じた安楽な介助と、家族の悲嘆（グリーフ）に<br/>寄り添うプロとしての関わり方を学ぶ。</p>
            </div>
          </div>
        </div>
      `,
    badgeLabel: '看取り',
    badgeIcon: 'HeartPulse',
  }

  const slidesData = [
    { 
      title: 'ターミナルケア（看取り）に関する研修', 
      order: 0, 
      content: `
        <div class="flex flex-col items-center text-center space-y-10">
          <div class="relative">
            <div class="absolute inset-0 bg-rose-400 blur-3xl opacity-20 scale-150 animate-pulse"></div>
            <div class="relative bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 max-w-lg mx-auto">
              <div class="bg-rose-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-8">Terminal Care</div>
              <h2 class="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                看取り研修<br/>
                <span class="text-rose-600 text-3xl">〜尊厳ある最期を支える〜</span>
              </h2>
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
      title: 'ACP（人生会議）：書類ではなく「対話」', 
      order: 1, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <div class="inline-flex items-center gap-3 px-4 py-2 bg-rose-50 text-red-600 rounded-full text-xs font-black ring-1 ring-rose-100">
            <span class="w-2 h-2 bg-rose-600 rounded-full animate-ping"></span>
            ADVANCE CARE PLANNING
          </div>
          <h4 class="text-3xl font-black text-slate-900 leading-tight">
            「どう生きたいか」を、<br/>
            <span class="text-rose-600 decoration-4 underline underline-offset-8">何度も、みんなで話し合う</span>
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl mx-auto pt-4">
            <div class="p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-sm hover:border-rose-100 transition-colors">
              <p class="text-lg font-black text-slate-900 mb-3 text-center">繰り返すプロセス</p>
              <p class="text-sm text-slate-500 font-bold leading-relaxed text-left">
                本人の意向は変わるもの。<br/>
                状態に合わせて、本人・家族・多職種で<br/>
                繰り返し話し合いを重ねます。
              </p>
            </div>
            <div class="p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-sm hover:border-rose-100 transition-colors">
              <p class="text-lg font-black text-slate-900 mb-3 text-center">記録の義務化</p>
              <p class="text-sm text-slate-500 font-bold leading-relaxed text-left">
                2024年度より、対話の内容を<br/>
                詳細に記録し保存することが<br/>
                看取り加算の必須要件となりました。
              </p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '身体の変化：死の兆候を見守る', 
      order: 2, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <div class="relative grid grid-cols-2 gap-px bg-slate-200 p-px rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl max-w-3xl mx-auto">
            <div class="p-8 bg-white text-center space-y-3">
              <p class="text-xl font-black text-slate-900">呼吸の変化</p>
              <p class="text-sm text-slate-400 leading-relaxed font-bold">下顎呼吸、死前喘鳴<br/>（喉のごろごろ音）</p>
            </div>
            <div class="p-8 bg-white text-center space-y-3">
              <p class="text-xl font-black text-slate-900">循環の変化</p>
              <p class="text-sm text-slate-400 leading-relaxed font-bold">血圧低下、チアノーゼ、<br/>尿量の減少</p>
            </div>
            <div class="p-8 bg-white text-center space-y-3">
              <p class="text-xl font-black text-slate-900">意識の変化</p>
              <p class="text-sm text-slate-400 leading-relaxed font-bold">傾眠傾向（ほぼ寝ている）、<br/>せん妄や幻覚</p>
            </div>
            <div class="p-8 bg-white text-center space-y-3">
              <p class="text-xl font-black text-slate-900">表情・動作</p>
              <p class="text-sm text-slate-400 leading-relaxed font-bold">苦痛のない穏やかな表情、<br/>反応の鈍化</p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '積極的緩和ケア：介護職にできること', 
      order: 3, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <div class="p-10 bg-blue-50 rounded-[3rem] border-2 border-blue-100 border-dashed relative shadow-inner max-w-3xl mx-auto">
            <h4 class="text-3xl font-black text-blue-900 mb-6">「何もしない」が看取りではない</h4>
            <p class="text-lg text-blue-800 italic font-bold">
              医療処置ではなく、心地よさを追求する<br/>「積極的なケア」が求められます。
            </p>
          </div>
          <div class="grid grid-cols-2 gap-6 max-w-3xl mx-auto pt-4">
            <div class="p-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
              <p class="text-lg font-black text-slate-900 mb-2">口腔の湿潤</p>
              <p class="text-sm text-slate-500 font-bold">喉の渇きを癒す保湿</p>
            </div>
            <div class="p-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
              <p class="text-lg font-black text-slate-900 mb-2">安楽な体位</p>
              <p class="text-sm text-slate-500 font-bold">痛みを感じにくい姿勢</p>
            </div>
            <div class="p-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
              <p class="text-lg font-black text-slate-900 mb-2">スキンシップ</p>
              <p class="text-sm text-slate-500 font-bold">手を握る安心感</p>
            </div>
            <div class="p-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
              <p class="text-lg font-black text-slate-900 mb-2">環境の調整</p>
              <p class="text-sm text-slate-500 font-bold">馴染みの音楽や香り</p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '家族の心理：予期悲嘆への理解', 
      order: 4, 
      content: `
        <div class="space-y-8 flex flex-col items-center">
          <div class="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden w-full max-w-3xl text-center">
            <div class="absolute -top-10 -right-10 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl"></div>
            <h4 class="text-[10px] font-black tracking-[0.4em] uppercase opacity-50 mb-10 text-center">Family Support</h4>
            <p class="text-xl text-rose-400 font-black mb-8 text-center">家族の「怒り」は愛情の裏返しです</p>
            <div class="grid grid-cols-1 gap-4 text-base font-bold max-w-md mx-auto text-slate-200 text-left">
              <div>1. 否認：死を受け入れられず医療を要求</div>
              <div>2. 怒り：なぜ助からないのかと責める</div>
              <div>3. 取り引き：神頼みをする</div>
              <div>4. 抑うつ・受容へ</div>
            </div>
            <p class="text-sm text-slate-500 mt-10 text-center leading-relaxed font-bold">
              家族が「最期にこれをやってあげられた」と<br/>思えるよう支援することがプロの役割です。
            </p>
          </div>
        </div>
      ` 
    },
    { 
      title: 'シミュレーション：意向の食い違い', 
      order: 5, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center max-w-2xl mx-auto">
          <div class="p-10 bg-orange-50 border-2 border-orange-100 rounded-[3rem] shadow-sm">
            <p class="text-orange-900 text-2xl font-black leading-relaxed">
              本人は「自然に」と希望。しかし急変時、<br/>
              家族が「救急車を！」と叫びました。<br/>どうしますか？
            </p>
          </div>
          <div class="grid grid-cols-1 gap-6 w-full">
            <div class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-center gap-8 opacity-60">
              <span class="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0">×</span>
              <p class="text-lg font-bold italic text-left">「以前そう決めたじゃないですか」<br/>と説得を試みる</p>
            </div>
            <div class="p-8 bg-white border border-emerald-100 rounded-3xl shadow-2xl ring-2 ring-emerald-50 flex items-center gap-8">
              <span class="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shrink-0">○</span>
              <p class="text-lg font-black text-slate-900 leading-relaxed text-left">家族の動揺に共感し、意向を伝えつつ、<br/>今の最善を迅速に再検討する</p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: 'まとめ：最高のエンディングを目指して', 
      order: 6, 
      content: `
        <div class="flex flex-col items-center text-center space-y-12">
          <div class="w-28 h-28 bg-rose-600 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-rose-200 rotate-3">
            <svg class="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 class="text-4xl font-black text-slate-900 leading-tight">
            看取りは、信頼の証。<br/>
            最後まで「その人らしく」を支える。
          </h3>
          <p class="text-slate-500 font-bold text-xl max-w-sm mx-auto leading-relaxed">
            あなたの寄り添いが、<br/>
            人生を美しい物語として完成させ、<br/>
            家族の未来を救います。
          </p>
          <div class="pt-12 border-t border-slate-100 w-full max-w-xs mx-auto text-center">
            <p class="text-slate-400 font-black text-[10px] uppercase tracking-[0.5em]">End of Session</p>
          </div>
        </div>
      ` 
    }
  ]

  const questionsData = [
    { text: '本人、家族、多職種で医療やケアの方針を継続的に話し合う取り組みを何というか。', explanation: 'ACP（アドバンス・ケア・プランニング）、愛称「人生会議」と呼ばれます。2024年度より記録が厳格化されました。', order: 1, choices: { create: [{ text: 'ACP（人生会議）', isCorrect: true }, { text: 'PDCAサイクル', isCorrect: false }, { text: 'BCP策定', isCorrect: false }] } },
    { text: '看取り期において、介護職員が果たすべき重要な役割はどれか。', explanation: '医療的な延命ではなく、本人の安楽を追求する「苦痛緩和」と、家族の揺れる思いに寄り添う「家族支援」が最大の役割です。', order: 2, choices: { create: [{ text: '苦痛緩和と家族支援', isCorrect: true }, { text: '延命治療の実施', isCorrect: false }, { text: '家族への説得', isCorrect: false }] } },
    { text: '死が近づいた際に見られる、不規則なあごを動かすような呼吸を何というか。', explanation: '下顎呼吸（かがくこきゅう）と呼ばれ、看取りの重要な兆候です。苦しそうに見えますが、本人に苦痛はないと言われています。', order: 3, choices: { create: [{ text: '下顎呼吸', isCorrect: true }, { text: '深呼吸', isCorrect: false }, { text: '過呼吸', isCorrect: false }] } },
    { text: '死別を経験した家族やスタッフの悲しみをケアし、回復を支えることを何というか。', explanation: 'グリーフケア（悲嘆のケア）と呼ばれます。スタッフ自身のメンタルヘルス維持にも不可欠です。', order: 4, choices: { create: [{ text: 'グリーフケア', isCorrect: true }, { text: 'マインドフルネス', isCorrect: false }, { text: 'ストレスチェック', isCorrect: false }] } },
    { text: '2024年度の報酬改定において、看取り加算の算定に必要なガイドラインはどれか。', explanation: '「人生の最終段階における医療・ケアの決定プロセスに関するガイドライン」の遵守と、指針の策定が必須です。', order: 5, choices: { create: [{ text: '人生の最終段階における決定プロセスガイドライン', isCorrect: true }, { text: '感染症対策ガイドライン', isCorrect: false }, { text: '身体拘束廃止ガイドライン', isCorrect: false }] } }
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
