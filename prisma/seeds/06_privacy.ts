import { PrismaClient } from '@prisma/client'

export async function seedPrivacy(prisma: PrismaClient) {
  return await prisma.course.create({
    data: {
      title: 'プライバシー保護・個人情報保護に関する研修',
      description: '2025年改正ガイダンス対応。SNSリスクから守秘義務、日常業務のプライバシー配慮までを網羅した決定版。',
      introduction: `
        <div class="space-y-8">
          <div class="flex items-center gap-4">
            <span class="h-1 w-12 bg-indigo-600 rounded-full"></span>
            <p class="text-indigo-600 font-black tracking-widest text-sm uppercase">Curriculum Hook</p>
          </div>
          <h2 class="text-4xl font-black text-slate-900 leading-tight">何気ない一言が、利用者の人生を<br/>壊してしまうリスクを考えたことはありますか？</h2>
          <div class="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
            <p>廊下での何気ない立ち話、個人のスマホでのうっかりした撮影、SNSへの匿名投稿。あなたが「これくらい」と思ったその瞬間、利用者の人生と施設の信頼が踏みにじられます。</p>
            <div class="p-8 bg-indigo-50/50 rounded-[2rem] border border-indigo-100 shadow-inner relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-indigo-100/30 rounded-bl-full"></div>
              <p class="relative z-10 font-medium italic">個人情報は、預かっている大切な「財産」です。プロとして情報を守ることは、利用者の「尊厳」を守ることそのものです。</p>
            </div>
            <p>この研修では、2025年改正の最新指針に基づき、デジタル時代の情報管理とプライバシー保護の鉄則を学びます。</p>
          </div>
        </div>
      `,
      learningObjectives: `
        <div class="grid grid-cols-1 gap-6">
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-indigo-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">1</div>
            <div><h4 class="text-xl font-black text-slate-900 mb-2">個人情報と守秘義務の遵守</h4><p class="text-slate-500 leading-relaxed font-medium">法的な定義を正しく理解し、SNSリスクや退職後の義務を含めた守秘義務を100%実践できる。</p></div>
          </div>
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-indigo-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">2</div>
            <div><h4 class="text-xl font-black text-slate-900 mb-2">日常業務でのプライバシー配慮</h4><p class="text-slate-500 leading-relaxed font-medium">身体介助、申し送り、書類管理など、あらゆる場面で利用者のプライバシーを保護する手法を習得する。</p></div>
          </div>
        </div>
      `,
      badgeLabel: '個人情報',
      badgeIcon: 'BookOpen',
      slides: {
        create: [
          { title: 'プライバシー保護・個人情報保護に関する研修', order: 0, content: `<div class="flex flex-col items-center text-center space-y-10"><div class="relative"><div class="absolute inset-0 bg-indigo-400 blur-3xl opacity-20 scale-150 animate-pulse"></div><div class="relative bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 max-w-lg mx-auto"><div class="bg-indigo-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-8">Information Ethics</div><h2 class="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">プライバシー保護<br/><span class="text-indigo-600 text-3xl">〜利用者の安心を守るために〜</span></h2></div></div><div class="flex items-center justify-center gap-4 text-slate-400 font-black text-[10px] tracking-widest"><span class="h-px w-8 bg-slate-200"></span>CARE LEARNING SYSTEM<span class="h-px w-8 bg-slate-200"></span></div></div>` },
          { title: '個人情報とは何か？：識別情報の正体', order: 1, content: `<div class="space-y-10"><div class="inline-flex items-center gap-3 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black ring-1 ring-indigo-100"><span class="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></span>LEGAL DEFINITION</div><h4 class="text-3xl font-black text-slate-900 leading-tight">「特定の誰か」がわかれば、<br/><span class="text-indigo-600 decoration-4 underline underline-offset-8">すべてが個人情報</span>です</h4><div class="grid grid-cols-1 sm:grid-cols-2 gap-6"><div class="p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-sm hover:border-indigo-100 transition-colors"><p class="text-lg font-black text-slate-900 mb-3">直接的な情報</p><p class="text-sm text-slate-500 font-medium leading-relaxed">氏名、生年月日、住所、顔写真、マイナンバー、病歴など。</p></div><div class="p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-sm hover:border-indigo-100 transition-colors"><p class="text-lg font-black text-slate-900 mb-3">組み合わせによる特定</p><p class="text-sm text-slate-500 font-medium leading-relaxed">単体では不明でも、複数を照合して個人を特定できるもの。</p></div></div></div>` },
          { title: '日常に潜む「情報の漏洩」リスク', order: 2, content: `<div class="space-y-10 text-center"><div class="flex flex-col items-center"><div class="bg-slate-100 px-6 py-1.5 rounded-full text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase mb-6">Risk Analysis</div><h4 class="text-3xl font-black text-slate-900 leading-relaxed">悪意のない「うっかり」が人生を壊す</h4></div><div class="relative grid grid-cols-3 gap-px bg-slate-200 p-px rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl"><div class="p-8 bg-white space-y-4"><div class="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black mx-auto text-xl shadow-sm">A</div><p class="text-lg font-black text-slate-900">施設外での立ち話</p><p class="text-xs text-slate-400 leading-relaxed">電車やカフェでの会話。匿名でも特定されるリスクがあります</p></div><div class="p-8 bg-white space-y-4"><div class="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black mx-auto text-xl shadow-sm">B</div><p class="text-lg font-black text-slate-900">SNSへの投稿</p><p class="text-xs text-slate-400 leading-relaxed">背景の名札や景色、特定のケア内容から場所が特定されます</p></div><div class="p-8 bg-white space-y-4"><div class="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black mx-auto text-xl shadow-sm">C</div><p class="text-lg font-black text-slate-900">管理の不徹底</p><p class="text-xs text-slate-400 leading-relaxed">PCロック忘れ、書類放置、シュレッダー忘れ</p></div></div></div>` },
          { title: '身体介助時のプライバシー配慮', order: 3, content: `<div class="space-y-10"><div class="p-10 bg-blue-50 rounded-[3rem] border-2 border-blue-100 border-dashed relative text-center shadow-inner"><div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-10 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase shadow-xl">Dignity First</div><h4 class="text-3xl font-black text-blue-900 mb-6">「羞恥心」への配慮は、ケアの質</h4><p class="text-lg text-blue-800 italic font-bold">「認知症だから見えても平気」という傲慢さが、最大の権利侵害です。</p></div><div class="grid grid-cols-2 gap-6 max-w-3xl mx-auto"><div class="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm"><p class="text-lg font-black text-slate-900 mb-2">露出の最小化</p><p class="text-sm text-slate-500 font-medium">バスタオル等で、介助する部分以外は常に覆う</p></div><div class="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm"><p class="text-lg font-black text-slate-900 mb-2">視線の遮断</p><p class="text-sm text-slate-500 font-medium">カーテンの隙間、ドアの開閉角度への細心の注意</p></div></div></div>` },
          { title: 'SNS・デジタル利用の厳格なルール', order: 4, content: `<div class="space-y-8"><div class="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden"><div class="absolute -top-10 -right-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div><h4 class="text-[10px] font-black tracking-[0.4em] uppercase opacity-50 mb-10 text-center">Digital Rules</h4><div class="space-y-6 text-xl font-black max-w-xl mx-auto"><div class="flex items-center gap-8"><span class="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">01</span><p>個人のスマホで利用者を撮影することは、原則禁止です</p></div><div class="flex items-center gap-8"><span class="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">02</span><p>利用者に関する情報をSNSに書くことは、匿名でも禁止です</p></div><div class="flex items-center gap-8"><span class="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">03</span><p>家族の同意＝本人の同意ではありません。手続きを厳守します</p></div></div></div></div>` },
          { title: '守秘義務の継続性：退職後も続く義務', order: 5, content: `<div class="p-12 bg-indigo-50 rounded-[3.5rem] border border-indigo-100 flex flex-col items-center text-center space-y-10 shadow-inner"><div class="w-24 h-24 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center font-black text-3xl text-indigo-600 shadow-indigo-100">Law</div><h4 class="text-3xl font-black text-indigo-900">「辞めたら関係ない」は通りません</h4><p class="text-xl text-slate-600 font-bold leading-relaxed max-w-2xl">社会福祉士及び介護福祉士法、および雇用契約により、業務上知り得た情報の秘密を守る義務は、退職した後も一生涯継続します。元同僚や家族への話も漏洩にあたります。</p></div>` },
          { title: 'シミュレーション：メールの誤送信', order: 6, content: `<div class="space-y-10"><div class="p-10 bg-orange-50 border-2 border-orange-100 rounded-[3rem] text-center shadow-sm"><p class="text-orange-900 text-2xl font-black leading-relaxed">利用者のケアプランを家族に送る際、間違えて別の人に送信してしまいました。どうしますか？</p></div><div class="grid grid-cols-1 gap-6"><div class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-center gap-8 opacity-60"><span class="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0">×</span><p class="text-lg font-bold italic">気づかれないことを祈って、何も報告せず黙っておく</p></div><div class="p-8 bg-white border border-emerald-100 rounded-3xl shadow-2xl ring-2 ring-emerald-50 flex items-center gap-8"><span class="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shrink-0">○</span><p class="text-lg font-black text-slate-900 leading-relaxed">直ちに上司へ報告し、誤送信先に削除を依頼する。本人・家族へ誠実に謝罪し、経緯を説明する。</p></div></div></div>` },
          { title: 'まとめ：尊厳を守る最後の砦', order: 7, content: `<div class="flex flex-col items-center text-center space-y-12"><div class="w-28 h-28 bg-indigo-600 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-indigo-200 rotate-3"><svg class="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></div><h3 class="text-4xl font-black text-slate-900 leading-tight">プライバシーを守ることは、<br/>その人の人生を敬うことです。</h3><p class="text-slate-500 font-bold text-xl max-w-sm mx-auto leading-relaxed">あなたの「慎重な行動」が、この施設の信頼と利用者の笑顔を支えています。今日からまた、プロの自覚を持ちましょう。</p><div class="pt-12 border-t border-slate-100 w-full"><p class="text-slate-400 font-black text-[10px] uppercase tracking-[0.5em]">End of Session</p></div></div>` }
        ]
      },
      questions: {
        create: [
          { text: '個人情報保護法において「個人情報」に該当するものはどれか。', explanation: '特定の個人を識別できるすべての情報は個人情報です。氏名や顔写真だけでなく、病歴や身体的特徴の組み合わせも含まれます。', order: 1, choices: { create: [{ text: '氏名、住所、顔写真など個人を特定できるものすべて', isCorrect: true }, { text: '名字だけ（フルネームでないもの）', isCorrect: false }, { text: '既に亡くなった方の情報すべて', isCorrect: false }] } },
          { text: '職場の出来事や利用者の様子を個人のSNSに投稿する際、正しい態度はどれか。', explanation: '原則として、職場のいかなる情報も個人のSNSに投稿してはいけません。匿名や顔隠しであっても特定のリスクがあり、信頼を損なう行為です。', order: 2, choices: { create: [{ text: '絶対に投稿しない', isCorrect: true }, { text: '顔をスタンプで隠せば投稿してもよい', isCorrect: false }, { text: '利用者が喜んでいれば投稿してもよい', isCorrect: false }] } },
          { text: '介護職員の守秘義務は、退職した後どうなるか。', explanation: '社会福祉士及び介護福祉士法等の規定により、退職した後も業務上知り得た秘密を守る義務は生涯継続します。', order: 3, choices: { create: [{ text: '退職した後も継続する', isCorrect: true }, { text: '退職届を受理された時点で無くなる', isCorrect: false }, { text: '1年経過すれば話してもよい', isCorrect: false }] } },
          { text: '身体介助（入浴や排泄）の際に露出を最小限に抑え、カーテンを閉める主な理由は何か。', explanation: '利用者の羞恥心に配慮し、一人の人間としての尊厳を保持するためです。マナーではなく法的・倫理的な義務です。', order: 4, choices: { create: [{ text: '利用者の尊厳と羞恥心を守るため', isCorrect: true }, { text: '部屋の温度を保つため', isCorrect: false }, { text: 'スタッフの作業効率を上げるため', isCorrect: false }] } },
          { text: '万が一、書類の紛失や情報の誤送信など「情報漏洩」に気づいた際、最初に行うべきことは何か。', explanation: '隠蔽は被害を拡大させ、信頼を致命的に壊します。直ちに上司や担当者に報告し、組織として対応することが最優先です。', order: 5, choices: { create: [{ text: '直ちに上司や管理者に報告する', isCorrect: true }, { text: '自分でこっそり回収・削除を試みる', isCorrect: false }, { text: '気づかれないようにシュレッダーする', isCorrect: false }] } }
        ]
      }
    }
  })
}
