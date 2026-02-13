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
          <h2 class="text-4xl font-black text-slate-900 leading-tight">信頼は一瞬で崩れ、<br/>二度と戻らない。</h2>
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
      slides: {
        create: [
          { title: 'プライバシー保護：信頼をつなぐ情報管理', order: 0, content: `<div class="flex flex-col items-center justify-center min-h-[300px] text-center space-y-12"><div class="relative"><div class="absolute inset-0 bg-indigo-400 blur-3xl opacity-20 scale-150 animate-pulse"></div><div class="relative bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 max-w-sm"><div class="bg-indigo-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-6">Information Ethics</div><h2 class="text-3xl font-black text-slate-900 leading-tight mb-4">プライバシー保護・個人情報保護<br/>〜利用者の安心を守るために〜</h2></div></div><div class="flex items-center gap-4 text-slate-400 font-black text-[10px] tracking-widest"><span class="h-px w-8 bg-slate-200"></span>CARE LEARNING SYSTEM<span class="h-px w-8 bg-slate-200"></span></div></div>` },
          { title: '個人情報とは何か？：識別情報の正体', order: 1, content: `<div class="space-y-8"><div class="inline-flex items-center gap-3 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black ring-1 ring-indigo-100"><span class="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></span>LEGAL DEFINITION</div><h4 class="text-2xl font-black text-slate-900 leading-tight">「特定の誰か」がわかれば、<br/><span class="text-indigo-600 decoration-4 underline underline-offset-8">すべてが個人情報</span>です</h4><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="p-6 bg-white border-2 border-slate-50 rounded-[2rem] shadow-sm"><p class="text-sm font-black text-slate-900 mb-2">直接的な情報</p><p class="text-[11px] text-slate-500 font-medium">氏名、生年月日、住所、顔写真、マイナンバー、病歴など。</p></div><div class="p-6 bg-white border-2 border-slate-50 rounded-[2rem] shadow-sm"><p class="text-sm font-black text-slate-900 mb-2">組み合わせによる特定</p><p class="text-[11px] text-slate-500 font-medium">単体では不明でも、複数を照合して個人を特定できるもの。</p></div></div></div>` },
          { title: '日常に潜む「情報の漏洩」リスク', order: 2, content: `<div class="space-y-8"><div class="flex flex-col items-center"><div class="bg-slate-100 px-4 py-1 rounded-full text-[10px] font-black text-slate-500 tracking-widest uppercase mb-4">Risk Analysis</div><h4 class="text-xl font-black text-slate-900 text-center leading-relaxed">悪意のない「うっかり」が人生を壊す</h4></div><div class="relative grid grid-cols-3 gap-px bg-slate-200 p-px rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl"><div class="p-6 bg-white flex flex-col items-center text-center space-y-3"><div class="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-black mx-auto">A</div><p class="text-xs font-black text-slate-900">施設外での立ち話</p><p class="text-[9px] text-slate-400 leading-tight">電車やカフェでの会話。匿名でも特定されるリスクがあります</p></div><div class="p-6 bg-white flex flex-col items-center text-center space-y-3"><div class="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-black mx-auto">B</div><p class="text-xs font-black text-slate-900">SNSへの投稿</p><p class="text-[9px] text-slate-400 leading-tight">背景に写り込んだ名札や景色、特定のケア内容から場所が特定されます</p></div><div class="p-6 bg-white flex flex-col items-center text-center space-y-3"><div class="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-black mx-auto">C</div><p class="text-xs font-black text-slate-900">管理の不徹底</p><p class="text-[9px] text-slate-400 leading-tight">離席時のPCロック忘れ、机の上の書類放置、シュレッダー忘れ</p></div></div></div>` },
          { title: '身体介助時のプライバシー配慮', order: 3, content: `<div class="space-y-8"><div class="p-8 bg-blue-50 rounded-[2.5rem] border-2 border-blue-100 border-dashed relative text-center"><div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">Dignity First</div><h4 class="text-2xl font-black text-blue-900 mb-4">「羞恥心」への配慮は、ケアの質</h4><p class="text-[11px] text-blue-800 italic font-medium">「認知症だから見えても平気」という傲慢さが、最大の権利侵害です。</p></div><div class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl"><div class="grid grid-cols-2 gap-4 text-left"><div class="p-4 bg-slate-50 rounded-2xl"><p class="text-[10px] font-black text-slate-900">露出の最小化</p><p class="text-[9px] text-slate-500">バスタオル等で、介助する部分以外は常に覆う</p></div><div class="p-4 bg-slate-50 rounded-2xl"><p class="text-[10px] font-black text-slate-900">視線の遮断</p><p class="text-[9px] text-slate-500">カーテンの隙間、ドアの開閉角度への細心の注意</p></div></div></div></div>` },
          { title: 'SNS・デジタル利用の厳格なルール', order: 4, content: `<div class="space-y-6"><div class="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"><h4 class="text-xs font-black tracking-[0.3em] uppercase opacity-50 mb-6">Digital Rules</h4><div class="space-y-4 text-lg font-black text-left"><div class="flex items-center gap-4"><span class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-xs">01</span><p>個人のスマホで利用者を撮影することは、原則禁止です</p></div><div class="flex items-center gap-4"><span class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-xs">02</span><p>利用者に関する情報をSNSに書くことは、匿名でも禁止です</p></div><div class="flex items-center gap-4"><span class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-xs">03</span><p>家族の同意＝本人の同意ではありません。手続きを厳守します</p></div></div></div></div>` },
          { title: '守秘義務の継続性：退職後も続く義務', order: 5, content: `<div class="space-y-8 text-center"><div class="p-10 bg-indigo-50 rounded-[3rem] border border-indigo-100 flex flex-col items-center space-y-6"><div class="w-20 h-20 bg-white rounded-[2rem] shadow-xl flex items-center justify-center text-indigo-600 font-black text-2xl">Law</div><h4 class="text-2xl font-black text-indigo-900">「辞めたら関係ない」は通りません</h4><p class="text-slate-600 font-medium leading-relaxed">社会福祉士及び介護福祉士法、および雇用契約により、業務上知り得た情報の秘密を守る義務は、退職した後も一生涯継続します。元同僚や家族への話も漏洩にあたります。</p></div></div>` },
          { title: 'シミュレーション：メールの誤送信', order: 6, content: `<div class="space-y-6"><div class="p-8 bg-orange-50 border-2 border-orange-100 rounded-[2.5rem] text-center"><p class="text-orange-900 text-lg font-black leading-relaxed">利用者のケアプランを家族に送る際、間違えて別の人に送信してしまいました。どうしますか？</p></div><div class="grid grid-cols-1 gap-4"><div class="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center gap-4 opacity-60"><span class="w-10 h-10 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center font-black">×</span><p class="text-xs font-bold italic">気づかれないことを祈って、何も報告せず黙っておく</p></div><div class="p-6 bg-white border border-emerald-100 rounded-2xl shadow-xl ring-2 ring-emerald-50 flex items-center gap-4"><span class="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-black shadow-lg">○</span><p class="text-xs font-black text-slate-900 font-bold">直ちに上司へ報告し、誤送信先に削除を依頼する。本人・家族へ誠実に謝罪し、経緯を説明する。</p></div></div></div>` },
          { title: 'まとめ：尊厳を守る最後の砦', order: 7, content: `<div class="flex flex-col items-center justify-center min-h-[450px] text-center space-y-10"><div class="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-200 rotate-3"><svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></div><h3 class="text-3xl font-black text-slate-900 leading-tight">プライバシーを守ることは、<br/>その人の人生を敬うことです。</h3><p class="text-slate-500 font-medium text-lg max-w-sm mx-auto leading-relaxed">あなたの「慎重な行動」が、この施設の信頼と利用者の笑顔を支えています。今日からまた、プロの自覚を持ちましょう。</p><div class="pt-10 border-t border-slate-100 w-full"><p class="text-slate-400 font-black text-xs uppercase tracking-[0.3em]">End of Session</p></div></div>` }
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
