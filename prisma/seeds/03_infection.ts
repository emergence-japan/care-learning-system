import { PrismaClient } from '@prisma/client'

export async function seedInfection(prisma: PrismaClient) {
  const slug = 'infection'
  const courseData = {
    slug,
    title: '感染症・食中毒の予防および蔓延防止に関する研修',
    description: '「持ち込まない・広げない」を徹底するための標準予防策と、2024年義務化のBCPまでを完全網羅。',
    introduction: `
        <div class="space-y-8">
          <div class="flex items-center gap-4"><span class="h-1 w-12 bg-sky-600 rounded-full"></span><p class="text-sky-600 font-black tracking-widest text-sm uppercase">Curriculum Hook</p></div>
          <h2 class="text-4xl font-black text-slate-900 leading-tight">あなたの手は、今、本当に<br/>「安全」だと言い切れますか？</h2>
          <div class="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
            <p>「自分は健康だから大丈夫」というその油断が、<br/>施設全体を巻き込むパンデミックの引き金になります。</p>
            <div class="p-8 bg-sky-50/50 rounded-[2rem] border border-sky-100 shadow-inner relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-sky-100/30 rounded-bl-full"></div>
              <p class="relative z-10 font-medium italic">高齢者の命を奪うのは病気だけではありません。<br/>私たちが持ち込むウイルスや細菌こそが、最大の脅威なのです。</p>
            </div>
            <p>この研修は、プロフェッショナルとして利用者の命を守る「盾」になるための、<br/>最新の防衛技術を学ぶ時間です。</p>
          </div>
        </div>
      `,
    learningObjectives: `
        <div class="grid grid-cols-1 gap-6">
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-sky-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-sky-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">1</div>
            <div><h4 class="text-xl font-black text-slate-900 mb-2">標準予防策（PPE・手洗い）の完遂</h4><p class="text-slate-500 leading-relaxed font-medium">全ての利用者が感染している可能性を前提とした、<br/>正しい防護具の着脱と手指衛生の手順をマスターする。</p></div>
          </div>
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-sky-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-sky-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">2</div>
            <div><h4 class="text-xl font-black text-slate-900 mb-2">蔓延防止とBCPの実践</h4><p class="text-slate-500 leading-relaxed font-medium">ノロウイルス等の発生時の初動対応と、<br/>2024年度から義務化された「BCP（業務継続計画）」の役割を理解する。</p></div>
          </div>
        </div>
      `,
    badgeLabel: '感染症',
    badgeIcon: 'HeartPulse',
  }

  const slidesData = [
    { 
      title: '感染症・食中毒の予防および蔓延防止に関する研修', 
      order: 0, 
      content: `
        <div class="flex flex-col items-center text-center space-y-10">
          <div class="relative">
            <div class="absolute inset-0 bg-sky-400 blur-3xl opacity-20 scale-150 animate-pulse"></div>
            <div class="relative bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 max-w-lg mx-auto">
              <div class="bg-sky-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-8">Infection Control</div>
              <h2 class="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                感染症・食中毒予防<br/>
                <span class="text-sky-600 text-3xl">〜持ち込まない・広げない〜</span>
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
      title: '基本概念：スタンダード・プリコーション', 
      order: 1, 
      content: `
        <div class="space-y-10 text-center">
          <div class="inline-flex items-center gap-3 px-4 py-2 bg-sky-50 text-sky-600 rounded-full text-xs font-black ring-1 ring-sky-100 mx-auto">
            <span class="w-2 h-2 bg-sky-600 rounded-full animate-ping"></span>
            CORE CONCEPT
          </div>
          <h4 class="text-3xl font-black text-slate-900 leading-tight">
            「全ての利用者が感染している」<br/>
            と<span class="text-sky-600 decoration-4 underline underline-offset-8">想定する</span>ことが基本です
          </h4>
          <div class="p-10 bg-white border-2 border-slate-50 rounded-[3rem] shadow-sm font-bold text-slate-700 text-xl leading-relaxed italic mx-auto max-w-2xl">
            血液、体液、排泄物、傷のある皮膚。<br/>
            これらは全て感染源であるとみなし、誰に対しても平等に、<br/>
            常に同じ高いレベルの予防策を実施します。
          </div>
        </div>
      ` 
    },
    { 
      title: '3つの主要な感染経路', 
      order: 2, 
      content: `
        <div class="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
          <div class="group p-6 bg-slate-50/50 rounded-3xl border border-slate-100 flex items-center gap-8 hover:bg-white hover:shadow-2xl transition-all duration-500">
            <div class="w-16 h-16 bg-sky-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shrink-0 shadow-lg">1</div>
            <div class="flex-1 text-left">
              <p class="text-xl font-black text-slate-900 mb-1">接触感染</p>
              <p class="text-sm text-slate-500 font-medium">手やドアノブを介して広がる。<br/>ノロウイルス、疥癬など。</p>
            </div>
          </div>
          <div class="group p-6 bg-slate-50/50 rounded-3xl border border-slate-100 flex items-center gap-8 hover:bg-white hover:shadow-2xl transition-all duration-500">
            <div class="w-16 h-16 bg-sky-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shrink-0 shadow-lg">2</div>
            <div class="flex-1 text-left">
              <p class="text-xl font-black text-slate-900 mb-1">飛沫感染</p>
              <p class="text-sm text-slate-500 font-medium">咳やくしゃみのしぶき（2m以内）で広がる。<br/>インフルエンザなど。</p>
            </div>
          </div>
          <div class="group p-6 bg-slate-50/50 rounded-3xl border border-slate-100 flex items-center gap-8 hover:bg-white hover:shadow-2xl transition-all duration-500">
            <div class="w-16 h-16 bg-sky-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shrink-0 shadow-lg">3</div>
            <div class="flex-1 text-left">
              <p class="text-xl font-black text-slate-900 mb-1">空気感染</p>
              <p class="text-sm text-slate-500 font-medium">空気中に漂う微粒子を吸い込んで広がる。<br/>結核、麻疹など。</p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '【IDクイズ】アルコールが効かないのは？', 
      order: 3, 
      content: `
        <div class="p-12 bg-slate-900 text-white rounded-[3.5rem] shadow-2xl relative overflow-hidden text-center">
          <div class="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-[100px]"></div>
          <h4 class="text-[10px] font-black tracking-[0.4em] uppercase opacity-50 mb-10">Interactive Quiz</h4>
          <p class="text-2xl font-black mb-12">次の中で、通常のアルコール消毒液が<br/>ほとんど効かないウイルスはどれ？</p>
          <div class="grid grid-cols-2 gap-8 max-w-xl mx-auto">
            <div class="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
              <p class="font-black text-lg group-hover:scale-110 transition-transform">インフルエンザ</p>
            </div>
            <div class="p-8 bg-red-600 rounded-[2.5rem] border border-red-500 shadow-xl animate-pulse">
              <p class="font-black text-lg mb-2">ノロウイルス</p>
              <p class="text-xs opacity-90 font-bold text-white">正解！次亜塩素酸Naが必要です</p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '最強の武器：正しい手指衛生', 
      order: 4, 
      content: `
        <div class="space-y-10 text-center">
          <h4 class="text-3xl font-black text-slate-900 leading-relaxed">石鹸で「30秒」洗っていますか？</h4>
          <div class="relative grid grid-cols-2 gap-px bg-slate-200 p-px rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl max-w-2xl mx-auto">
            <div class="p-10 bg-white space-y-4">
              <div class="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center font-black mx-auto text-xl shadow-sm">1</div>
              <p class="text-lg font-black text-slate-900">タイミング</p>
              <p class="text-sm text-slate-400 leading-relaxed">ケアの前後、汚染物に触れた後、<br/>手袋を脱いだ後も必須です</p>
            </div>
            <div class="p-10 bg-white space-y-4">
              <div class="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center font-black mx-auto text-xl shadow-sm">2</div>
              <p class="text-lg font-black text-slate-900">洗い残し注意</p>
              <p class="text-sm text-slate-400 leading-relaxed">指先、親指の付け根、手首、<br/>指の間は特に残ります</p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '重要：PPE（防護具）の「脱ぐ」順番', 
      order: 5, 
      content: `
        <div class="space-y-8">
          <div class="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
            <div class="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"></div>
            <h4 class="text-[10px] font-black tracking-[0.4em] uppercase opacity-50 mb-10 text-center">Strict Rules</h4>
            <p class="text-lg text-emerald-400 font-black mb-8 text-center">汚染面に触れないための「脱ぐ順番」が命を分けます</p>
            <div class="space-y-6 text-xl font-black max-w-md mx-auto">
              <div class="flex items-center gap-6">
                <span class="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">01</span>
                <p>手袋：外側を触らずに裏返して脱ぐ</p>
              </div>
              <div class="flex items-center gap-6">
                <span class="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">02</span>
                <p>ガウン：内側から丸めるように脱ぐ</p>
              </div>
              <div class="flex items-center gap-6">
                <span class="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">03</span>
                <p>マスク：表面に触れずゴム紐を持つ</p>
              </div>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '食中毒予防の3原則', 
      order: 6, 
      content: `
        <div class="space-y-10 text-center">
          <div class="p-12 bg-amber-50 rounded-[3.5rem] border-2 border-amber-100 border-dashed relative shadow-inner mx-auto max-w-2xl">
            <div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-10 py-2 rounded-full text-xs font-black tracking-[0.3em] uppercase shadow-xl">Food Safety</div>
            <h4 class="text-3xl font-black text-amber-900 mb-8">つけない・増やさない・やっつける</h4>
            <div class="grid grid-cols-3 gap-6">
              <div class="p-6 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-shadow">
                <p class="text-lg font-black text-slate-900 mb-2">1. 清潔</p>
                <p class="text-xs text-slate-500 font-bold">（つけない）</p>
              </div>
              <div class="p-6 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-shadow">
                <p class="text-lg font-black text-slate-900 mb-2">2. 迅速</p>
                <p class="text-xs text-slate-500 font-bold">（増やさない）</p>
              </div>
              <div class="p-6 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-shadow">
                <p class="text-lg font-black text-slate-900 mb-2">3. 加熱</p>
                <p class="text-xs text-slate-500 font-bold">（やっつける）</p>
              </div>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: 'ノロウイルス嘔吐物処理の鉄則', 
      order: 7, 
      content: `
        <div class="p-12 bg-red-50 rounded-[3.5rem] border border-red-100 flex flex-col items-center text-center space-y-10 shadow-inner max-w-2xl mx-auto">
          <div class="w-24 h-24 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center shadow-red-100">
            <svg class="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h4 class="text-3xl font-black text-red-900">乾燥は最大の敵</h4>
          <p class="text-xl text-red-800 font-bold leading-relaxed">
            乾燥してウイルスが舞い上がると、<br/>
            吸い込んで感染してしまいます。<br/>
            次亜塩素酸Naで浸し、外側から内側へ<br/>
            静かに拭き取ることが鉄則です。
          </p>
        </div>
      ` 
    },
    { 
      title: '発生時の初動シミュレーション', 
      order: 8, 
      content: `
        <div class="space-y-10 text-center max-w-2xl mx-auto">
          <div class="p-10 bg-orange-50 border-2 border-orange-100 rounded-[3rem] shadow-sm">
            <p class="text-orange-900 text-2xl font-black leading-relaxed">
              利用者が突然の嘔吐。<br/>
              周囲には他の利用者もいます。<br/>
              あなたならどうしますか？
            </p>
          </div>
          <div class="grid grid-cols-1 gap-6">
            <div class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-center gap-8 opacity-60">
              <span class="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0">×</span>
              <p class="text-lg font-bold italic text-left">すぐに素手で介助し、後で手洗いをする</p>
            </div>
            <div class="p-8 bg-white border border-emerald-100 rounded-3xl shadow-2xl ring-2 ring-emerald-50 flex items-center gap-8">
              <span class="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shrink-0">○</span>
              <p class="text-lg font-black text-slate-900 leading-relaxed text-left">周囲を遠ざけ、応援を呼び、<br/>PPEを装着してから処理を開始する</p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '2024年度最新要件：感染症BCP', 
      order: 9, 
      content: `
        <div class="space-y-10 text-center">
          <div class="flex flex-col items-center">
            <div class="bg-slate-100 px-6 py-1.5 rounded-full text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase mb-6">Business Continuity</div>
            <h4 class="text-3xl font-black text-slate-900 leading-relaxed">
              職員の半数が欠勤しても、<br/>
              命を守り抜くために
            </h4>
          </div>
          <div class="relative grid grid-cols-2 gap-px bg-slate-200 p-px rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl max-w-2xl mx-auto">
            <div class="p-10 bg-white space-y-4 text-center">
              <div class="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center font-black mx-auto text-xl shadow-sm">1</div>
              <p className="text-lg font-black text-slate-900">優先業務の絞り込み</p>
              <p className="text-xs text-slate-400 leading-relaxed">生命に関わるケアを最優先。<br/>レク等は休止します</p>
            </div>
            <div class="p-10 bg-white space-y-4 text-center">
              <div class="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center font-black mx-auto text-xl shadow-sm">2</div>
              <p className="text-lg font-black text-slate-900">情報共有ルート</p>
              <p className="text-xs text-slate-400 leading-relaxed">誰が、誰に、いつ報告するか。<br/>BCP指針を事前に共有する</p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '健康管理と「出勤しない勇気」', 
      order: 10, 
      content: `
        <div class="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative text-center overflow-hidden max-w-2xl mx-auto">
          <div class="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[100px]"></div>
          <h4 class="text-3xl font-black mb-10 italic text-sky-400">小さな「違和感」を隠さない</h4>
          <div class="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 text-left space-y-6">
            <p class="text-slate-200 text-xl font-bold flex items-start gap-6">
              <span class="w-2 h-2 bg-sky-400 rounded-full mt-3 shrink-0"></span>
              自身に熱や下痢がある場合は必ず報告し、<br/>施設からの指示を仰いでください。
            </p>
            <p class="text-slate-200 text-xl font-bold flex items-start gap-6">
              <span class="w-2 h-2 bg-sky-400 rounded-full mt-3 shrink-0"></span>
              自分の健康を守ることは、<br/>利用者を守ることそのものです。
            </p>
          </div>
        </div>
      ` 
    },
    { 
      title: 'まとめ：利用者の命を守る盾として', 
      order: 11, 
      content: `
        <div class="flex flex-col items-center text-center space-y-12">
          <div class="w-28 h-28 bg-sky-600 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-sky-200 rotate-3">
            <svg class="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 class="text-4xl font-black text-slate-900 leading-tight">
            手洗い一つが、<br/>誰かの未来を救う
          </h3>
          <p class="text-slate-500 font-bold text-xl max-w-sm mx-auto leading-relaxed">
            プロフェッショナルとして、<br/>「持ち込まない・広げない」を<br/>今日から再徹底しましょう。
          </p>
          <div class="pt-12 border-t border-slate-100 w-full max-w-xs">
            <p class="text-slate-400 font-black text-[10px] uppercase tracking-[0.5em]">End of Session</p>
          </div>
        </div>
      ` 
    }
  ]

  const questionsData = [
    { text: 'ノロウイルスに最も効果的な消毒液はどれか。', explanation: 'アルコールはノロウイルスには効きにくいため、0.1%以上の次亜塩素酸ナトリウムを使用します。', order: 1, choices: { create: [{ text: '次亜塩素酸ナトリウム', isCorrect: true }, { text: 'アルコール', isCorrect: false }, { text: '消毒用ハンドソープ', isCorrect: false }] } },
    { text: '個人防護具（PPE）を脱ぐ際、最も適切な順番はどれか。', explanation: '汚染の激しいものから脱ぎます。一般的に「手袋 → ガウン → マスク」の順で脱ぎます。', order: 2, choices: { create: [{ text: '手袋 → ガウン → マスク', isCorrect: true }, { text: 'マスク → 手袋 → ガウン', isCorrect: false }, { text: 'ガウン → マスク → 手袋', isCorrect: false }] } },
    { text: '食中毒予防の3原則に含まれないものはどれか。', explanation: '「つけない・増やさない・やっつける」が3原則です。', order: 3, choices: { create: [{ text: '冷まさない', isCorrect: true }, { text: 'つけない（清潔）', isCorrect: false }, { text: '増やさない（迅速）', isCorrect: false }, { text: 'やっつける（殺菌）', isCorrect: false }] } },
    { text: 'ノロウイルスの嘔吐物を処理する際、最も注意すべきことは何か。', explanation: '乾燥するとウイルスが空気中に舞い上がり、吸入感染を引き起こすため、乾燥させないことが最優先です。', order: 4, choices: { create: [{ text: '乾燥させないように素早く覆う', isCorrect: true }, { text: '掃除機で吸い取る', isCorrect: false }, { text: '水で薄めて広げる', isCorrect: false }] } },
    { text: '人員不足時に優先すべき業務はどれか（感染症BCP）。', explanation: '生命維持に直結する食事・排泄・投薬などの身体ケアを最優先し、レクリエーションなどは休止します。', order: 5, choices: { create: [{ text: '食事・排泄・投薬の身体ケア', isCorrect: true }, { text: '季節の行事やレクリエーション', isCorrect: false }, { text: '居室のワックス掛け', isCorrect: false }] } }
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
