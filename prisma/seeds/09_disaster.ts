import { PrismaClient } from '@prisma/client'

export async function seedDisaster(prisma: PrismaClient) {
  const slug = 'disaster'
  const courseData = {
    slug,
    title: '非常災害時の対応（BCPを含む）に関する研修',
    description: '2024年4月からのBCP義務化に対応。地震・水害・火災時の優先判断と組織的対応を網羅。',
    introduction: `
        <div class="space-y-8">
          <div class="flex items-center gap-4">
            <span class="h-1 w-12 bg-orange-600 rounded-full"></span>
            <p class="text-orange-600 font-black tracking-widest text-sm uppercase">BCP Essential Hook</p>
          </div>
          <h2 class="text-4xl font-black text-slate-900 leading-tight">もし深夜、一人夜勤中に巨大地震が起きたら...<br/>あなたは誰の命を真っ先に守りますか？</h2>
          <div class="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
            <p>地震、水害、そして火災。災害は、私たちが最も「準備ができていない時」に襲ってきます。<br/>パニックを抑え、命を救うのは、唯一「日頃の想定（BCP）」だけです。</p>
            <div class="p-8 bg-orange-50/50 rounded-[2rem] border border-orange-100 shadow-inner relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-orange-100/30 rounded-bl-full"></div>
              <p class="relative z-10 font-medium italic">2024年度より、BCP（業務継続計画）の策定と職員への周知が「完全義務化」されました。<br/>未策定の場合は報酬減算の対象となる、極めて重要な項目です。</p>
            </div>
            <p>この研修では、災害発生時の「優先順位」と、<br/>組織としてケアを止めないための鉄則を学びます。</p>
          </div>
        </div>
      `,
    learningObjectives: `
        <div class="grid grid-cols-1 gap-6 max-w-3xl mx-auto text-left">
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-orange-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-orange-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">1</div>
            <div>
              <h4 class="text-xl font-black text-slate-900 mb-2">BCPに基づく優先業務の判断</h4>
              <p class="text-slate-500 leading-relaxed font-medium">極限状態で、どのケアを優先し、何を休止すべきかの<br/>組織的判断基準を理解する。</p>
            </div>
          </div>
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-orange-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-orange-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">2</div>
            <div>
              <h4 class="text-xl font-black text-slate-900 mb-2">避難技術と安全確保の完遂</h4>
              <p class="text-slate-500 leading-relaxed font-medium">地震（シェイクアウト）、水害（垂直・水平避難）、<br/>火災（初期消火・通報）の具体的行動手順をマスターする。</p>
            </div>
          </div>
        </div>
      `,
    badgeLabel: '災害対策',
    badgeIcon: 'Flame',
  }

  const slidesData = [
    { 
      title: '非常災害時の対応（BCP：業務継続計画を含む）に関する研修', 
      order: 0, 
      content: `
        <div class="flex flex-col items-center text-center space-y-10">
          <div class="relative">
            <div class="absolute inset-0 bg-orange-400 blur-3xl opacity-20 scale-150 animate-pulse"></div>
            <div class="relative bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 max-w-lg mx-auto">
              <div class="bg-orange-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-8">Crisis Management</div>
              <h2 class="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                非常災害時の対応<br/>
                <span class="text-orange-600 text-3xl">〜BCPの基本と実践〜</span>
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
      title: '2024年度 義務化の背景：なぜBCPか', 
      order: 1, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <div class="inline-flex items-center gap-3 px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-xs font-black ring-1 ring-orange-100">
            <span class="w-2 h-2 bg-orange-600 rounded-full animate-ping"></span>
            LEGAL MANDATE
          </div>
          <h4 class="text-3xl font-black text-slate-900 leading-tight">
            「書類」ではなく<br/>
            <span class="text-orange-600 decoration-4 underline underline-offset-8">「命を救う仕組み」</span>です
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl mx-auto pt-4">
            <div class="p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-sm hover:border-orange-100 transition-colors">
              <p class="text-lg font-black text-slate-900 mb-3">未策定時の減算リスク</p>
              <p class="text-sm text-slate-500 font-bold leading-relaxed">
                基本報酬の1%〜3%が減算対象です。<br/>組織的な対応体制の構築が不可欠です。
              </p>
            </div>
            <div class="p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-sm hover:border-orange-100 transition-colors">
              <p class="text-lg font-black text-slate-900 mb-3">研修と訓練の義務</p>
              <p class="text-sm text-slate-500 font-bold leading-relaxed">
                全職員が「自分の役割」を<br/>知っていることが要件となります。
              </p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '災害時の「3大ピンチ」を想定する', 
      order: 2, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <div class="flex flex-col items-center">
            <div class="bg-slate-100 px-6 py-1.5 rounded-full text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase mb-6">Crisis Analysis</div>
            <h4 class="text-3xl font-black text-slate-900 leading-relaxed">これらが「同時」に起きた時、どう動くか</h4>
          </div>
          <div class="relative grid grid-cols-3 gap-px bg-slate-200 p-px rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl max-w-5xl mx-auto">
            <div class="p-10 bg-white space-y-4">
              <div class="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center font-black mx-auto text-xl shadow-sm">A</div>
              <p class="text-lg font-black text-slate-900">インフラ停止</p>
              <p class="text-xs text-slate-400 font-bold leading-relaxed">停電・断水・通信断絶。<br/>情報が集まらない恐怖</p>
            </div>
            <div class="p-10 bg-white space-y-4">
              <div class="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center font-black mx-auto text-xl shadow-sm">B</div>
              <p class="text-lg font-black text-slate-900">人員不足</p>
              <p class="text-xs text-slate-400 font-bold leading-relaxed">スタッフ自身が被災。<br/>通常の半分以下でのケア</p>
            </div>
            <div class="p-10 bg-white space-y-4">
              <div class="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center font-black mx-auto text-xl shadow-sm">C</div>
              <p class="text-lg font-black text-slate-900">物品の枯渇</p>
              <p class="text-xs text-slate-400 font-bold leading-relaxed">おむつ、食料、燃料不足。<br/>物流が止まった状態</p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '避難判断の基準：垂直か、水平か', 
      order: 3, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <div class="p-10 bg-blue-50 rounded-[3rem] border-2 border-blue-100 border-dashed relative shadow-inner max-w-3xl mx-auto">
            <h4 class="text-3xl font-black text-blue-900 mb-6">無理な移動が事故を招く</h4>
            <p class="text-lg text-blue-800 italic font-bold">
              「外へ逃げる」だけが避難ではありません。<br/>
              状況に応じた最善を選択します。
            </p>
          </div>
          <div class="grid grid-cols-2 gap-6 max-w-4xl mx-auto pt-4">
            <div class="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
              <p class="text-lg font-black text-slate-900 mb-3 text-center">水平避難（屋外へ）</p>
              <p class="text-sm text-slate-500 font-bold leading-relaxed text-left">
                火災、地滑り、建物倒壊のリスクがある時。<br/>
                安全な広場等へ水平移動します。
              </p>
            </div>
            <div class="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
              <p class="text-lg font-black text-slate-900 mb-3 text-center">垂直避難（上階へ）</p>
              <p class="text-sm text-slate-500 font-bold leading-relaxed text-left">
                水害、津波の危険がある時。<br/>
                2階以上の浸水リスクのない場所へ移動します。
              </p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '業務のトリアージ：ケアの優先順位', 
      order: 4, 
      content: `
        <div class="space-y-8 flex flex-col items-center">
          <div class="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden w-full max-w-3xl">
            <div class="absolute -top-10 -right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
            <h4 class="text-[10px] font-black tracking-[0.4em] uppercase opacity-50 mb-10 text-center">Prioritization</h4>
            <p class="text-xl text-orange-400 font-black mb-10 text-center">「全部やる」は不可能です。生命維持に特化します</p>
            <div class="space-y-6 text-xl font-black max-w-md mx-auto text-left text-slate-200">
              <div class="flex items-center gap-8">
                <span class="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">01</span>
                <p>最優先：食事・水分、排泄、投薬、安否</p>
              </div>
              <div class="flex items-center gap-8">
                <span class="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">02</span>
                <p>休止：レク、リハビリ、定期入浴、清掃</p>
              </div>
            </div>
            <p class="text-sm text-slate-500 mt-10 text-center leading-relaxed italic">
              何をやめるかを事前に決めておくことが、現場の混乱を防ぎます。
            </p>
          </div>
        </div>
      ` 
    },
    { 
      title: '地震発生！その瞬間の初動行動', 
      order: 5, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <h4 class="text-3xl font-black text-slate-900 leading-relaxed">自分と利用者の身を守る「3ステップ」</h4>
          <div class="p-12 bg-white border-2 border-slate-100 rounded-[3.5rem] shadow-2xl max-w-2xl mx-auto w-full">
            <div class="grid grid-cols-3 gap-4 text-center text-xs font-black uppercase text-orange-600 mb-6">
              <p>1. DROP!</p>
              <p>2. COVER!</p>
              <p>3. HOLD ON!</p>
            </div>
            <div class="grid grid-cols-3 gap-4 text-center text-sm text-slate-700 font-bold">
              <p>まず低く<br/>（転倒防止）</p>
              <p>頭を守り<br/>（落下物から）</p>
              <p>揺れが収まる<br/>まで待つ</p>
            </div>
          </div>
          <div class="p-8 bg-orange-50 rounded-[2.5rem] text-sm font-bold leading-relaxed max-w-xl mx-auto border border-orange-100 italic text-orange-900">
            ※介護現場では、利用者の車椅子ブレーキをかけ、<br/>
            頭部をクッション等で保護する行動も同時に行います。
          </div>
        </div>
      ` 
    },
    { 
      title: 'シミュレーション：深夜の緊急事態', 
      order: 6, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center max-w-2xl mx-auto">
          <div class="p-10 bg-orange-50 border-2 border-orange-100 rounded-[3rem] shadow-sm">
            <p class="text-orange-900 text-2xl font-black leading-relaxed">
              深夜2時、地震発生。スタッフはあなた一人。<br/>
              全館停電し、利用者の悲鳴が聞こえます。<br/>どうしますか？
            </p>
          </div>
          <div class="grid grid-cols-1 gap-6 w-full">
            <div class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-center gap-8 opacity-60">
              <span class="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0">×</span>
              <p class="text-lg font-bold italic text-left">真っ先に厨房の火元を確認し、<br/>その後に安否確認をする</p>
            </div>
            <div class="p-8 bg-white border border-emerald-100 rounded-3xl shadow-2xl ring-2 ring-emerald-50 flex items-center gap-8">
              <span class="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shrink-0">○</span>
              <p class="text-lg font-black text-slate-900 leading-relaxed text-left">まず自身の安全を確保。大声で呼びかけ<br/>利用者を安心させつつ、安否を確認する。</p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: 'まとめ：日頃の訓練が命を分ける', 
      order: 7, 
      content: `
        <div class="flex flex-col items-center text-center space-y-12">
          <div class="w-28 h-28 bg-orange-600 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-orange-200 rotate-3">
            <svg class="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h3 class="text-4xl font-black text-slate-900 leading-tight">
            BCPは、利用者の人生を<br/>
            守り抜くための約束です。
          </h3>
          <p class="text-slate-500 font-bold text-xl max-w-sm mx-auto leading-relaxed">
            今日の知識を、明日の訓練へ。<br/>
            備えだけが、パニックを<br/>「救命の技術」に変えます。
          </p>
          <div class="pt-12 border-t border-slate-100 w-full max-w-xs mx-auto text-center">
            <p class="text-slate-400 font-black text-[10px] uppercase tracking-[0.5em]">End of Session</p>
          </div>
        </div>
      ` 
    }
  ]

  const questionsData = [
    { text: '2024年度より、全ての介護施設において策定と職員への周知が「義務化」された計画はどれか。', explanation: 'BCP（業務継続計画）と呼ばれます。感染症や自然災害が発生しても、重要な業務を継続するための計画です。未策定の場合は基本報酬の減算対象となります。', order: 1, choices: { create: [{ text: 'BCP（業務継続計画）', isCorrect: true }, { text: '中期経営計画', isCorrect: false }, { text: '職員旅行計画', isCorrect: false }, { text: 'ボランティア活用計画', isCorrect: false }] } },
    { text: '地震発生時の身を守る基本行動「シェイクアウト」の正しい3つの手順はどれか。', explanation: '「まず低く(Drop)」「頭を守り(Cover)」「揺れが収まるまで待つ(Hold on)」が基本です。', order: 2, choices: { create: [{ text: 'まず低く・頭を守り・動かない', isCorrect: true }, { text: 'すぐに立ち上がり・窓を開け・外へ走る', isCorrect: false }, { text: '火元へ走り・消火器を持ち・叫ぶ', isCorrect: false }] } },
    { text: '災害等による人員不足時に、BCPに基づいて優先的に継続すべき業務はどれか。', explanation: '生命維持に不可欠な食事・水分補給、排泄介助、必要な投薬などを最優先し、レクリエーション等は一時休止します。', order: 3, choices: { create: [{ text: '生命維持に関わる食事・排泄・投薬', isCorrect: true }, { text: '定期的なレクリエーション', isCorrect: false }, { text: '居室のワックス掛けや大掃除', isCorrect: false }] } },
    { text: '水害や津波の危険がある際、建物の2階以上の安全な場所へ避難することを何というか。', explanation: '上階へ移動することを「垂直避難」、屋外の離れた安全な場所へ移動することを「水平避難」と呼びます。', order: 4, choices: { create: [{ text: '垂直避難', isCorrect: true }, { text: '水平避難', isCorrect: false }, { text: '平行避難', isCorrect: false }] } },
    { text: '避難後の生活において、脱水や運動不足から生じる「エコノミークラス症候群」を防ぐために重要なことは？', explanation: 'こまめな水分補給と、足首を回すなどの適度な運動が血栓の予防に不可欠です。', order: 5, choices: { create: [{ text: 'こまめな水分補給と足の運動', isCorrect: true }, { text: '食事を極限まで減らすこと', isCorrect: false }, { text: '一日中横になって動かないこと', isCorrect: false }] } }
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
