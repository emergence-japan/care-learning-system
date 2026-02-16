import { PrismaClient } from '@prisma/client'

export async function seedEmergency(prisma: PrismaClient) {
  const slug = 'emergency'
  const courseData = {
    slug,
    title: '緊急時対応に関する研修（福祉用具含む）',
    description: '救急蘇生法（BLS/AED）から窒息対応、福祉用具の緊急操作までを網羅した「命を守る」研修。',
    introduction: `
        <div class="space-y-8">
          <div class="flex items-center gap-4">
            <span class="h-1 w-12 bg-red-600 rounded-full"></span>
            <p class="text-red-600 font-black tracking-widest text-sm uppercase">Life Saving Hook</p>
          </div>
          <h2 class="text-4xl font-black text-slate-900 leading-tight">もし今、目の前で利用者が倒れたら、<br/>あなたの「手」は動きますか？</h2>
          <div class="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
            <p>目の前で利用者が倒れた時、喉を詰まらせた時。<br/>あなたの頭は真っ白になるかもしれません。<br/>しかし、あなたの「手」が動きを覚えていれば、救える命があります。</p>
            <div class="p-8 bg-red-50/50 rounded-[2rem] border border-red-100 shadow-inner relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-red-100/30 rounded-bl-full"></div>
              <p class="relative z-10 font-medium italic">救急隊が到着するまでの「空白の数分間」が、その人の一生を左右します。<br/>最善の初動（BLS）と、福祉用具の緊急操作をマスターしましょう。</p>
            </div>
            <p>この研修は、厚生労働省の指針に準拠し、<br/>介護現場特有のトラブルへの即応力を養います。</p>
          </div>
        </div>
      `,
    learningObjectives: `
        <div class="grid grid-cols-1 gap-6 max-w-3xl mx-auto text-left">
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-red-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">1</div>
            <div>
              <h4 class="text-xl font-black text-slate-900 mb-2">救急蘇生とAEDの完遂</h4>
              <p class="text-slate-500 leading-relaxed font-medium">意識障害や心肺停止時のABCD評価を行い、<br/>迷わず胸骨圧迫とAED操作を実施できるようになる。</p>
            </div>
          </div>
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-red-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">2</div>
            <div>
              <h4 class="text-xl font-black text-slate-900 mb-2">窒息・用具トラブルへの即応</h4>
              <p class="text-slate-500 leading-relaxed font-medium">誤嚥時の背部叩打法、および介護リフト等の<br/>重大故障時の非常降下操作を習得する。</p>
            </div>
          </div>
        </div>
      `,
    badgeLabel: '緊急対応',
    badgeIcon: 'Clock',
  }

  const slidesData = [
    { 
      title: '緊急時対応に関する研修（福祉用具含む）', 
      order: 0, 
      content: `
        <div class="flex flex-col items-center text-center space-y-10">
          <div class="relative">
            <div class="absolute inset-0 bg-red-400 blur-3xl opacity-20 scale-150 animate-pulse"></div>
            <div class="relative bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 max-w-lg mx-auto">
              <div class="bg-red-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-8">Emergency Protocol</div>
              <h2 class="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                緊急時対応研修<br/>
                <span class="text-red-600 text-3xl">〜命をつなぐ初動の技術〜</span>
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
      title: '第一発見者の「ABCD」評価', 
      order: 1, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <div class="inline-flex items-center gap-3 px-4 py-2 bg-red-50 text-red-600 rounded-full text-xs font-black ring-1 ring-red-100">
            <span class="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
            INITIAL ASSESSMENT
          </div>
          <h4 class="text-3xl font-black text-slate-900 leading-tight">
            パニックを抑え、<br/>
            <span class="text-red-600 decoration-4 underline underline-offset-8">優先順位</span>を確認する
          </h4>
          <div class="relative grid grid-cols-2 gap-px bg-slate-200 p-px rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl max-w-2xl mx-auto">
            <div class="p-8 bg-white text-center space-y-3">
              <p class="text-xl font-black text-slate-900">A (Airway)</p>
              <p class="text-sm text-slate-400 leading-relaxed font-bold">気道：<br/>詰まっていないか</p>
            </div>
            <div class="p-8 bg-white text-center space-y-3">
              <p class="text-xl font-black text-slate-900">B (Breathing)</p>
              <p class="text-sm text-slate-400 leading-relaxed font-bold">呼吸：<br/>胸が動いているか</p>
            </div>
            <div class="p-8 bg-white text-center space-y-3">
              <p class="text-xl font-black text-slate-900">C (Circulation)</p>
              <p class="text-sm text-slate-400 leading-relaxed font-bold">循環：<br/>顔色、出血の有無</p>
            </div>
            <div class="p-8 bg-white text-center space-y-3">
              <p class="text-xl font-black text-slate-900">D (Disability)</p>
              <p class="text-sm text-slate-400 leading-relaxed font-bold">意識：<br/>呼びかけへの反応</p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '救命の鎖：胸骨圧迫とAED', 
      order: 2, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <div class="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden w-full max-w-4xl">
            <div class="absolute -top-10 -right-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
            <h4 class="text-3xl font-black mb-8">絶え間ない圧迫が脳を守る</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
              <div class="p-8 bg-white/5 border border-white/10 rounded-3xl shadow-inner">
                <p class="text-emerald-400 font-black text-sm mb-4 flex items-center gap-2">
                  <span class="w-2 h-2 bg-emerald-400 rounded-full"></span>胸骨圧迫
                </p>
                <p class="text-base leading-relaxed text-slate-300 font-bold">
                  ・「強く、速く、絶え間なく」<br/>
                  ・1分間に100〜120回のリズム<br/>
                  ・5cm以上沈むまで押す<br/>
                  ・圧迫のみでも有効です
                </p>
              </div>
              <div class="p-8 bg-white/5 border border-white/10 rounded-3xl shadow-inner">
                <p class="text-emerald-400 font-black text-sm mb-4 flex items-center gap-2">
                  <span class="w-2 h-2 bg-emerald-400 rounded-full"></span>AEDの役割
                </p>
                <p class="text-base leading-relaxed text-slate-300 font-bold">
                  ・電源を入れれば音声が誘導<br/>
                  ・心停止をリセットする唯一の手段<br/>
                  ・電気ショック後すぐ圧迫再開
                </p>
              </div>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '高齢者施設で多い「窒息」への対応', 
      order: 3, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <div class="p-12 bg-blue-50 rounded-[3.5rem] border-2 border-blue-100 border-dashed relative shadow-inner max-w-3xl mx-auto">
            <div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-10 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase shadow-xl">Choking Hazard</div>
            <h4 class="text-3xl font-black text-blue-900 mb-8">1分1秒を争う異物除去</h4>
            <div class="grid grid-cols-2 gap-8 mt-6 text-left">
              <div class="p-8 bg-white rounded-3xl shadow-sm border border-blue-100">
                <p class="text-blue-600 font-black text-lg mb-4">背部叩打法</p>
                <p class="text-sm leading-relaxed text-slate-600 font-bold">
                  肩甲骨の間を、手のひらの付け根で強く叩く。<br/>
                  意識の有無を問わず実施可能。
                </p>
              </div>
              <div class="p-8 bg-white rounded-3xl shadow-sm border border-blue-100">
                <p class="text-blue-600 font-black text-lg mb-4">腹部突き上げ法</p>
                <p class="text-sm leading-relaxed text-slate-600 font-bold">
                  後ろから抱え、みぞおちを上方へ圧迫。<br/>
                  意識がある場合のみ実施。
                </p>
              </div>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '福祉用具の緊急トラブル対応', 
      order: 4, 
      content: `
        <div class="p-12 bg-red-50 rounded-[3.5rem] border border-red-100 flex flex-col items-center text-center space-y-10 shadow-inner max-w-2xl mx-auto">
          <div class="w-24 h-24 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center shadow-red-100 font-black text-2xl text-red-600">SOS</div>
          <h4 class="text-3xl font-black text-red-900">宙吊り・停電・挟まり</h4>
          <div class="grid grid-cols-1 gap-6 w-full text-left">
            <div class="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-red-50">
              <p class="text-lg font-bold text-slate-700 leading-relaxed">
                <span class="text-red-600">介護リフト：</span><br/>
                非常降下レバーの場所を確認してください。<br/>
                停電時でも手動で下げることが可能です。
              </p>
            </div>
            <div class="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-red-50">
              <p class="text-lg font-bold text-slate-700 leading-relaxed">
                <span class="text-red-600">電動ベッド：</span><br/>
                停電時は手動ハンドルへの切り替え、<br/>
                または予備バッテリーでの操作が必要です。
              </p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '救急隊への情報伝達：ISBAR', 
      order: 5, 
      content: `
        <div class="space-y-8 flex flex-col items-center">
          <div class="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden w-full max-w-2xl">
            <div class="absolute -top-10 -right-10 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl"></div>
            <h4 class="text-[10px] font-black tracking-[0.4em] uppercase opacity-50 mb-10 text-center">Professional Handover</h4>
            <div class="space-y-4 text-lg font-bold text-left max-w-xl mx-auto">
              <p class="flex items-center gap-6"><span class="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">I</span><span>Identity: 名前、対象者名</span></p>
              <p class="flex items-center gap-6"><span class="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">S</span><span>Situation: 主症状、発見時間</span></p>
              <p class="flex items-center gap-6"><span class="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">B</span><span>Background: 既往歴、服薬</span></p>
              <p class="flex items-center gap-6"><span class="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">A</span><span>Assessment: 自分の評価</span></p>
              <p class="flex items-center gap-6"><span class="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">R</span><span>Recommendation: 搬送要請</span></p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: 'シミュレーション：食事中の急変', 
      order: 6, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center max-w-2xl mx-auto">
          <div class="p-10 bg-orange-50 border-2 border-orange-100 rounded-[3rem] shadow-sm">
            <p class="text-orange-900 text-2xl font-black leading-relaxed">
              食事中の利用者が突然喉を<br/>かきむしり、顔が真っ赤になりました。<br/>どうしますか？
            </p>
          </div>
          <div class="grid grid-cols-1 gap-6 w-full">
            <div class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-center gap-8 opacity-60">
              <span class="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0">×</span>
              <p class="text-lg font-bold italic text-left">「大丈夫ですか！」と背中をさすり、<br/>水を飲ませようとする</p>
            </div>
            <div class="p-8 bg-white border border-emerald-100 rounded-3xl shadow-2xl ring-2 ring-emerald-50 flex items-center gap-8">
              <span class="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shrink-0">○</span>
              <p class="text-lg font-black text-slate-900 leading-relaxed text-left">咳を促し、出なければ「背部叩打法」。<br/>同時に応援と119番、AEDを指示する。</p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: 'まとめ：迷わず、動く', 
      order: 7, 
      content: `
        <div class="flex flex-col items-center text-center space-y-12">
          <div class="w-28 h-28 bg-red-600 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-red-200 rotate-3">
            <svg class="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-4xl font-black text-slate-900 leading-tight">
            救急対応に「完璧」はありません。<br/>
            でも、「迷わない」ことは可能です。
          </h3>
          <p class="text-slate-500 font-bold text-xl max-w-sm mx-auto leading-relaxed">
            今日の知識が、明日誰かの命を<br/>つなぐバトンになります。<br/>
            自信を持って、その一歩を。
          </p>
          <div class="pt-12 border-t border-slate-100 w-full max-w-xs">
            <p class="text-slate-400 font-black text-[10px] uppercase tracking-[0.5em]">End of Session</p>
          </div>
        </div>
      ` 
    }
  ]

  const questionsData = [
    { text: '意識・呼吸がない利用者への胸骨圧迫の強さとリズムで正しいものはどれか。', explanation: '「強く（5cm以上沈むまで）」「速く（1分間に100〜120回）」「絶え間なく」行うことが救命の基本です。', order: 1, choices: { create: [{ text: '1分間に100〜120回、5cm以上沈むまで', isCorrect: true }, { text: '1分間に60回、優しくゆっくり', isCorrect: false }, { text: '1分間に200回、できるだけ速く', isCorrect: false }] } },
    { text: '喉に異物を詰まらせた際（窒息）、最初に行うべき対応はどれか。', explanation: '咳ができるなら咳を促し、出せない場合は直ちに背部叩打法等で異物の除去を試みます。水を飲ませるのは禁忌です。', order: 2, choices: { create: [{ text: '咳き込みを促し、出なければ背部叩打法を行う', isCorrect: true }, { text: '水をたくさん飲ませて流し込む', isCorrect: false }, { text: '意識がなくなるまで様子を見る', isCorrect: false }] } },
    { text: '介護リフト使用中に停電や故障で停止し、利用者が宙吊りになった際の対応は？', explanation: 'リフトには必ず「非常降下レバー（またはボタン）」が備わっています。手動で安全な位置まで下げる操作を行います。', order: 3, choices: { create: [{ text: '非常降下レバーを操作して手動で下ろす', isCorrect: true }, { text: '修理業者が来るまでそのまま待つ', isCorrect: false }, { text: 'リフトから無理やり抱きかかえて下ろす', isCorrect: false }] } },
    { text: '医療職や救急隊への正確な情報伝達のために用いられる、報告の構成手法を何というか。', explanation: 'ISBAR（Identity, Situation, Background, Assessment, Recommendation）と呼ばれます。', order: 4, choices: { create: [{ text: 'ISBAR（アイズバー）', isCorrect: true }, { text: 'PDCA（ピーディーシーエー）', isCorrect: false }, { text: 'OJT（オージェーティー）', isCorrect: false }] } },
    { text: 'AED（自動体外式除細動器）を使用すべき状態はどのような時か。', explanation: '呼びかけに反応がなく（意識なし）、正常な呼吸がない場合です。', order: 5, choices: { create: [{ text: '意識がなく、正常な呼吸がない時', isCorrect: true }, { text: '少し意識が朦朧としているが話せる時', isCorrect: false }, { text: '寝息を立ててぐっすり眠っている時', isCorrect: false }] } }
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
