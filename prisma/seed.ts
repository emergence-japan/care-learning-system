import { PrismaClient, Role, Status } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.choice.deleteMany({})
  await prisma.question.deleteMany({})
  await prisma.slide.deleteMany({})
  await prisma.enrollment.deleteMany({})
  await prisma.course.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.facility.deleteMany({})
  await prisma.corporation.deleteMany({})

  // 法人の作成
  const corp = await prisma.corporation.create({
    data: { name: 'ケア・グループ法人' }
  })

  // ユーザー作成
  const staffA = await prisma.user.create({
    data: {
      email: 'staff_a@example.com',
      name: 'ひまわりスタッフ',
      password: 'staff_password',
      role: Role.STAFF,
      corporationId: corp.id,
    },
  })

  // 研修の作成
  const course1 = await prisma.course.create({
    data: {
      title: '高齢者虐待防止研修（2024年度）',
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
              <p class="text-slate-500 leading-relaxed font-medium">不適切なケアにいち早く気づき、日々の言葉掛けをより良いものへ改善できるようになる。</p>
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
      videoUrl: 'https://www.youtube.com/watch?v=JVLmK8A5k1U',
      slides: {
        create: [
          {
            title: '高齢者虐待防止研修 〜基礎から学ぶ未然防止策〜',
            content: `
              <div class="flex flex-col items-center justify-center min-h-[300px] text-center space-y-12">
                <div class="relative">
                  <div class="absolute inset-0 bg-blue-400 blur-3xl opacity-20 scale-150 animate-pulse"></div>
                  <div class="relative bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 max-w-sm">
                    <div class="bg-blue-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-6">Course Material</div>
                    <h2 class="text-3xl font-black text-slate-900 leading-tight mb-4">高齢者虐待防止研修<br/>〜基礎から学ぶ未然防止策〜</h2>
                  </div>
                </div>
                <div class="flex items-center gap-4 text-slate-400 font-black text-[10px] tracking-widest">
                  <span class="h-px w-8 bg-slate-200"></span>
                  CARE LEARNING SYSTEM
                  <span class="h-px w-8 bg-slate-200"></span>
                </div>
              </div>
            `,
            order: 0,
          },
          {
            title: '2024年度制度改正のポイント',
            content: `
              <div class="space-y-8">
                <div class="inline-flex items-center gap-3 px-4 py-2 bg-red-50 text-red-600 rounded-full text-xs font-black ring-1 ring-red-100">
                  <span class="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
                  MUST CHECK
                </div>
                <h4 class="text-2xl font-black text-slate-900 leading-tight">虐待防止は「努力目標」から<br/><span class="text-red-600 decoration-4 underline underline-offset-8">必須の義務</span>へと変わりました</h4>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="p-6 bg-white border-2 border-slate-50 rounded-[2rem] shadow-sm hover:border-blue-100 transition-colors">
                    <div class="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-slate-200">
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p class="text-sm font-black text-slate-900 mb-2">完全義務化</p>
                    <p class="text-[11px] text-slate-500 leading-relaxed font-medium">措置（委員会・指針・研修等）の実施が全サービスで必須に。</p>
                  </div>
                  <div class="p-6 bg-white border-2 border-slate-50 rounded-[2rem] shadow-sm hover:border-red-100 transition-colors">
                    <div class="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-red-100">
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <p class="text-sm font-black text-slate-900 mb-2">報酬減算リスク</p>
                    <p class="text-[11px] text-slate-500 leading-relaxed font-medium">未実施の場合、介護報酬の減算（1%減）が適用されます。</p>
                  </div>
                </div>
              </div>
            `,
            order: 1,
          },
          {
            title: '虐待の5つの種類：その線引きを知る',
            content: `
              <div class="grid grid-cols-1 gap-3">
                <div class="group p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center gap-5 hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div class="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-lg font-black text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">1</div>
                  <div class="flex-1">
                    <p class="text-sm font-black text-slate-900">身体的虐待</p>
                    <p class="text-[10px] text-slate-500 font-medium">殴る、蹴る、身体拘束などが含まれます。</p>
                  </div>
                </div>
                <div class="group p-4 bg-red-50/30 rounded-2xl border border-red-100 flex items-center gap-5 hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div class="w-12 h-12 bg-red-600 rounded-xl shadow-sm flex items-center justify-center text-lg font-black text-white">2</div>
                  <div class="flex-1">
                    <p class="text-sm font-black text-red-900 flex items-center gap-2">
                      心理的虐待
                      <span class="bg-red-600 text-white px-2 py-0.5 rounded text-[8px] font-black tracking-widest">CHECK!</span>
                    </p>
                    <p class="text-[10px] text-red-700 font-medium">無視、子供扱い、自尊心を傷つける暴言。</p>
                  </div>
                </div>
                <div class="group p-4 bg-red-50/30 rounded-2xl border border-red-100 flex items-center gap-5 hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div class="w-12 h-12 bg-red-600 rounded-xl shadow-sm flex items-center justify-center text-lg font-black text-white">3</div>
                  <div class="flex-1">
                    <p class="text-sm font-black text-red-900 flex items-center gap-2">
                      ネグレクト（放置）
                      <span class="bg-red-600 text-white px-2 py-0.5 rounded text-[8px] font-black tracking-widest">CHECK!</span>
                    </p>
                    <p class="text-[10px] text-red-700 font-medium">ナースコール無視、おむつ交換の意図的な放置。</p>
                  </div>
                </div>
                <div class="group p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center gap-5 hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div class="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-lg font-black text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">4</div>
                  <div class="flex-1">
                    <p class="text-sm font-black text-slate-900">性的虐待</p>
                    <p class="text-[10px] text-slate-500 font-medium">わいせつな行為、排泄介助時の不要な露出。</p>
                  </div>
                </div>
                <div class="group p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center gap-5 hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div class="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-lg font-black text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">5</div>
                  <div class="flex-1">
                    <p class="text-sm font-black text-slate-900">経済的虐待</p>
                    <p class="text-[10px] text-slate-500 font-medium">年金や預貯金を本人の同意なく使うこと。</p>
                  </div>
                </div>
              </div>
            `,
            order: 2,
          },
          {
            title: '身体拘束とスピーチロック',
            content: `
              <div class="space-y-8">
                <div class="p-8 bg-amber-50 rounded-[2.5rem] border-2 border-amber-100 border-dashed relative">
                  <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-6 py-1 rounded-full text-[10px] font-black tracking-widest">DANGER</div>
                  <h4 class="text-2xl font-black text-amber-900 text-center mb-4">「ちょっと待って」は言葉の拘束です</h4>
                  <p class="text-[11px] text-amber-800 text-center leading-relaxed font-medium italic">
                    言葉によって本人の行動を制限することは心理的虐待や身体拘束にあたります。
                  </p>
                </div>
                
                <div class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100">
                  <p class="text-sm font-black text-slate-900 mb-6 flex items-center gap-2">
                    <span class="w-1.5 h-6 bg-slate-900 rounded-full"></span>
                    身体拘束がもたらす4つの重大な弊害
                  </p>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="p-4 bg-slate-50 rounded-2xl">
                      <p class="text-[10px] font-black text-slate-900 mb-1">身体的弊害</p>
                      <p class="text-[9px] text-slate-500 font-medium">筋力低下・褥瘡・食欲不振</p>
                    </div>
                    <div class="p-4 bg-slate-50 rounded-2xl">
                      <p class="text-[10px] font-black text-slate-900 mb-1">精神的弊害</p>
                      <p class="text-[9px] text-slate-500 font-medium">屈辱感・恐怖・怒り</p>
                    </div>
                    <div class="p-4 bg-slate-50 rounded-2xl">
                      <p class="text-[10px] font-black text-slate-900 mb-1">知的弊害</p>
                      <p class="text-[9px] text-slate-500 font-medium">認知症の進行・せん妄</p>
                    </div>
                    <div class="p-4 bg-slate-50 rounded-2xl">
                      <p class="text-[10px] font-black text-slate-900 mb-1">社会的弊害</p>
                      <p class="text-[9px] text-slate-500 font-medium">家族や地域との不信感</p>
                    </div>
                  </div>
                </div>
              </div>
            `,
            order: 3,
          },
          {
            title: '虐待が起こるメカニズム',
            content: `
              <div class="space-y-8">
                <div class="flex flex-col items-center">
                  <div class="bg-slate-100 px-4 py-1 rounded-full text-[10px] font-black text-slate-500 tracking-widest uppercase mb-4">Background Analysis</div>
                  <h4 class="text-xl font-black text-slate-900 text-center leading-relaxed">虐待は「個人の性格」ではなく<br/><span class="text-blue-600 italic">負の連鎖</span>から生まれる</h4>
                </div>
                
                <div class="relative grid grid-cols-2 gap-px bg-slate-200 p-px rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl">
                  <div class="p-6 bg-white flex flex-col items-center text-center space-y-3">
                    <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-black">A</div>
                    <p class="text-xs font-black text-slate-900">知識・技術不足</p>
                    <p class="text-[9px] text-slate-400 leading-tight">認知症への理解不足により「わがまま」と捉えてしまう</p>
                  </div>
                  <div class="p-6 bg-white flex flex-col items-center text-center space-y-3">
                    <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-black">B</div>
                    <p class="text-xs font-black text-slate-900">職員のストレス</p>
                    <p class="text-[9px] text-slate-400 leading-tight">人手不足による焦りや、自身の体調不良、孤立感</p>
                  </div>
                  <div class="p-6 bg-white flex flex-col items-center text-center space-y-3">
                    <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-black">C</div>
                    <p class="text-xs font-black text-slate-900">職場の孤立</p>
                    <p class="text-[9px] text-slate-400 leading-tight">「助けて」と言えない環境や、チームの連携不足</p>
                  </div>
                  <div class="p-6 bg-white flex flex-col items-center text-center space-y-3">
                    <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-black">D</div>
                    <p class="text-xs font-black text-slate-900">慣れと感覚麻痺</p>
                    <p class="text-[9px] text-slate-400 leading-tight">不適切なケアが「当たり前」になってしまう恐怖</p>
                  </div>
                </div>
              </div>
            `,
            order: 4,
          },
          {
            title: '身体拘束の「3要件」と厳格な手続き',
            content: `
              <div class="space-y-6">
                <div class="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                  <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                  <h4 class="text-xs font-black tracking-[0.3em] uppercase opacity-50 mb-6">Strict Rules</h4>
                  <div class="space-y-4">
                    <div class="flex items-center gap-4">
                      <span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-black text-xs">01</span>
                      <p class="font-black text-lg">切迫性：命に危険がある</p>
                    </div>
                    <div class="flex items-center gap-4">
                      <span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-black text-xs">02</span>
                      <p class="font-black text-lg">非代替性：他に手段がない</p>
                    </div>
                    <div class="flex items-center gap-4">
                      <span class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-black text-xs">03</span>
                      <p class="font-black text-lg">一時性：必要最小限の時間</p>
                    </div>
                  </div>
                </div>
                
                <div class="grid grid-cols-3 gap-3">
                  <div class="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm text-center">
                    <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Step 1</p>
                    <p class="text-[10px] font-bold text-slate-900 leading-tight">チーム判断</p>
                  </div>
                  <div class="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm text-center">
                    <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Step 2</p>
                    <p class="text-[10px] font-bold text-slate-900 leading-tight">家族同意</p>
                  </div>
                  <div class="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm text-center">
                    <p class="text-[9px] font-black text-slate-400 uppercase mb-1">Step 3</p>
                    <p class="text-[10px] font-bold text-slate-900 leading-tight">詳細な記録</p>
                  </div>
                </div>
              </div>
            `,
            order: 5,
          },
          {
            title: '虐待の芽を摘む：チームで守る',
            content: `
              <div class="space-y-8">
                <div class="p-10 bg-emerald-50 rounded-[3rem] border border-emerald-100 flex flex-col items-center text-center space-y-6">
                  <div class="w-20 h-20 bg-white rounded-[2rem] shadow-xl shadow-emerald-100 flex items-center justify-center">
                    <svg class="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <h4 class="text-2xl font-black text-emerald-900">一人で抱え込まず、チームで守る</h4>
                  <div class="space-y-4 w-full">
                    <div class="bg-white/80 backdrop-blur px-6 py-4 rounded-2xl shadow-sm flex items-center gap-4 text-left">
                      <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <p class="text-sm font-bold text-slate-700">セルフチェック：自分の心の余裕を確認する</p>
                    </div>
                    <div class="bg-white/80 backdrop-blur px-6 py-4 rounded-2xl shadow-sm flex items-center gap-4 text-left">
                      <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <p class="text-sm font-bold text-slate-700">チームケア：難しい対応はすぐに相談し、負担を分散する</p>
                    </div>
                  </div>
                </div>
              </div>
            `,
            order: 6,
          },
          {
            title: '発見時の対応：違和感を大切にする',
            content: `
              <div class="space-y-8">
                <div class="relative p-10 bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden">
                  <div class="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
                  <h4 class="text-2xl font-black text-white text-center mb-8 italic">「報告」は仲間を売ることではなく、<br/>利用者と仲間を守ること</h4>
                  
                  <div class="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                    <p class="text-xs font-black text-blue-400 tracking-widest uppercase">Important Policy</p>
                    <p class="text-slate-300 text-sm leading-relaxed font-medium">
                      「虐待か確信が持てなくても構いません。同僚のケアに対して『何か変だ』という違和感を感じた段階で、すぐに相談してください。」
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-4 px-6 py-4 bg-blue-50 text-blue-700 rounded-2xl border border-blue-100">
                  <svg class="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  <p class="text-[10px] font-black leading-tight">通報者は公益通報者保護法により守られます。勇気ある一歩が最悪の事態を防ぎます。</p>
                </div>
              </div>
            `,
            order: 7,
          },
          {
            title: 'ケーススタディ：現場の判断力を磨く',
            content: `
              <div class="space-y-6">
                <div class="p-8 bg-orange-50 border-2 border-orange-100 rounded-[2.5rem]">
                  <div class="flex items-center gap-3 mb-4 text-orange-600 font-black text-xs uppercase tracking-widest">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Simulation
                  </div>
                  <p class="text-orange-900 text-lg font-black leading-relaxed">人手不足の夜勤帯。転倒リスクの高いA様が、何度も車椅子から立ち上がろうとしています。</p>
                </div>
                
                <div class="grid grid-cols-1 gap-4">
                  <div class="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center gap-4 opacity-60">
                    <span class="w-10 h-10 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center font-black">×</span>
                    <p class="text-xs font-bold text-slate-500 italic">「座ってて！」と叫ぶ（スピーチロック）、またはベルトで固定する</p>
                  </div>
                  <div class="p-6 bg-white border border-emerald-100 rounded-2xl shadow-xl shadow-emerald-50 flex items-center gap-4 ring-2 ring-emerald-50">
                    <span class="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-black shadow-lg shadow-emerald-100">○</span>
                    <p class="text-xs font-black text-slate-900">歩きたい理由を汲み取る、ナースステーション近くで見守る等の工夫をする</p>
                  </div>
                </div>
              </div>
            `,
            order: 8,
          },
          {
            title: 'まとめ：利用者の尊厳を守るために',
            content: `
              <div class="flex flex-col items-center justify-center min-h-[400px] text-center space-y-10">
                <div class="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-blue-200 rotate-3">
                  <svg class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 class="text-3xl font-black text-slate-900 leading-tight">プロフェッショナルとして、<br/>尊厳を守るケアを</h3>
                <p class="text-slate-500 font-medium text-lg max-w-sm">
                  虐待防止は、専門職としての誇りを守ることでもあります。今日から、笑顔のある職場を全員で作っていきましょう。
                </p>
                <div class="pt-10 border-t border-slate-100 w-full">
                  <p class="text-slate-400 font-black text-xs uppercase tracking-[0.3em]">End of Session</p>
                </div>
              </div>
            `,
            order: 9,
          }
        ]
      },
      questions: {
        create: [
          {
            text: '2024年度（令和6年度）より、高齢者虐待防止措置として全サービス事業所に義務付けられた「4つの措置」に含まれないものはどれか。',
            explanation: '義務化されたのは、①委員会の開催、②指針の整備、③研修の実施、④担当者の配置の4点です。監視カメラの設置は義務に含まれていません。',
            order: 1,
            choices: {
              create: [
                { text: '虐待防止委員会の開催', isCorrect: false },
                { text: '虐待防止のための指針の整備', isCorrect: false },
                { text: '居室への監視カメラの常時設置', isCorrect: true },
                { text: '虐待防止のための研修の実施', isCorrect: false },
              ],
            },
          },
          {
            text: '高齢者虐待防止法で定義されている「5つの虐待」に含まれない行為はどれか。',
            explanation: '高齢者虐待は「身体的虐待」「ネグレクト」「心理的虐待」「性的虐待」「経済的虐待」の5つです。「教育的虐待」という区分はありません。',
            order: 2,
            choices: {
              create: [
                { text: '身体的虐待（暴行や身体拘束）', isCorrect: false },
                { text: '心理的虐待（暴言や無視）', isCorrect: false },
                { text: '教育的虐待（厳しい指導）', isCorrect: true },
                { text: '経済的虐待（年金や預貯金の不正使用）', isCorrect: false },
              ],
            },
          },
          {
            text: '身体拘束は原則禁止されていますが、例外的に認められるために満たすべき「3つの要件」の組み合わせとして正しいものはどれか。',
            explanation: '例外的に拘束が認められるには、①切迫性（生命・身体への危険が著しく高い）、②非代替性（他に方法がない）、③一時性（一時的なものである）の全てを満たす必要があります。',
            order: 3,
            choices: {
              create: [
                { text: '「切迫性」「非代替性」「一時性」', isCorrect: true },
                { text: '「緊急性」「永続性」「安全性」', isCorrect: false },
                { text: '「必要性」「効率性」「同意性」', isCorrect: false },
                { text: '「家族の同意」「人手不足」「夜間のみ」', isCorrect: false },
              ],
            },
          },
          {
            text: '利用者に対して「ちょっと待って！」「座っていて！」と強い口調で行動を制限する言葉をかける「スピーチロック」は、虐待にあたる可能性があるか。',
            explanation: '言葉によって行動を抑制することは「スピーチロック」と呼ばれ、心理的虐待や身体拘束にあたる可能性があります。',
            order: 4,
            choices: {
              create: [
                { text: '○（正しい）', isCorrect: true },
                { text: '×（誤り）', isCorrect: false },
              ],
            },
          },
          {
            text: '施設内で高齢者虐待を発見した、または虐待の疑いがあると思われた場合、法律上の義務的な通報・報告先はどこか。',
            explanation: '養介護施設従事者は、虐待を発見した（または疑いがある）場合、速やかに「市町村」へ通報する義務があります。',
            order: 5,
            choices: {
              create: [
                { text: '利用者の家族のみ', isCorrect: false },
                { text: '市町村（または地域包括支援センター）', isCorrect: true },
                { text: '警察署のみ', isCorrect: false },
                { text: '誰にも報告しなくてよい', isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  })

  // 受講実績
  await prisma.enrollment.createMany({
    data: [
      { userId: staffA.id, courseId: course1.id, status: Status.NOT_STARTED },
    ]
  })

  console.log('Seed data fully updated with PREMIUM slides and enhanced design')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })