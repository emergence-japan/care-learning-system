import { PrismaClient } from '@prisma/client'

export async function seedEmergency(prisma: PrismaClient) {
  return await prisma.course.create({
    data: {
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
            <p>目の前で利用者が倒れた時、喉を詰まらせた時。あなたの頭は真っ白になるかもしれません。しかし、あなたの「手」が動きを覚えていれば、救える命があります。</p>
            <div class="p-8 bg-red-50/50 rounded-[2rem] border border-red-100 shadow-inner relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-red-100/30 rounded-bl-full"></div>
              <p class="relative z-10 font-medium italic">救急隊が到着するまでの「空白の数分間」が、その人の一生を左右します。最善の初動（BLS）と、福祉用具の緊急操作をマスターしましょう。</p>
            </div>
            <p>この研修は、厚生労働省の「救急蘇生法の指針2020」に準拠し、介護現場特有のトラブルへの即応力を養います。</p>
          </div>
        </div>
      `,
      learningObjectives: `
        <div class="grid grid-cols-1 gap-6">
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-red-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">1</div>
            <div><h4 class="text-xl font-black text-slate-900 mb-2">救急蘇生とAEDの完遂</h4><p class="text-slate-500 leading-relaxed font-medium">意識障害や心肺停止時のABCD評価を行い、迷わず胸骨圧迫とAED操作を実施できる。</p></div>
          </div>
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-red-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">2</div>
            <div><h4 class="text-xl font-black text-slate-900 mb-2">窒息・用具トラブルへの即応</h4><p class="text-slate-500 leading-relaxed font-medium">誤嚥時の背部叩打法、および介護リフト等の重大故障時の非常降下操作を習得する。</p></div>
          </div>
        </div>
      `,
      slides: {
        create: [
          { title: '緊急時対応：救急蘇生と用具トラブル', order: 0, content: `<div class="flex flex-col items-center justify-center min-h-[300px] text-center space-y-12"><div class="relative"><div class="absolute inset-0 bg-red-400 blur-3xl opacity-20 scale-150 animate-pulse"></div><div class="relative bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 max-w-sm"><div class="bg-red-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-6">Emergency Protocol</div><h2 class="text-3xl font-black text-slate-900 leading-tight mb-4">緊急時対応研修<br/>〜命をつなぐ初動の技術〜</h2></div></div><div class="flex items-center gap-4 text-slate-400 font-black text-[10px] tracking-widest"><span class="h-px w-8 bg-slate-200"></span>CARE LEARNING SYSTEM<span class="h-px w-8 bg-slate-200"></span></div></div>` },
          { title: '第一発見者の「ABCD」評価', order: 1, content: `<div class="space-y-8"><div class="inline-flex items-center gap-3 px-4 py-2 bg-red-50 text-red-600 rounded-full text-xs font-black ring-1 ring-red-100"><span class="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>INITIAL ASSESSMENT</div><h4 class="text-2xl font-black text-slate-900 leading-tight">パニックを抑え、<br/><span class="text-red-600 decoration-4 underline underline-offset-8">優先順位</span>を確認する</h4><div class="relative grid grid-cols-2 gap-px bg-slate-200 p-px rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl"><div class="p-6 bg-white text-center space-y-2"><p class="text-xs font-black text-slate-900">A (Airway)</p><p class="text-[9px] text-slate-400 leading-tight">気道：詰まっていないか</p></div><div class="p-6 bg-white text-center space-y-2"><p class="text-xs font-black text-slate-900">B (Breathing)</p><p class="text-[9px] text-slate-400 leading-tight">呼吸：胸が動いているか</p></div><div class="p-6 bg-white text-center space-y-2"><p class="text-xs font-black text-slate-900">C (Circulation)</p><p class="text-[9px] text-slate-400 leading-tight">循環：顔色、出血の有無</p></div><div class="p-6 bg-white text-center space-y-2"><p class="text-xs font-black text-slate-900">D (Disability)</p><p class="text-[9px] text-slate-400 leading-tight">意識：呼びかけへの反応</p></div></div></div>` },
          { title: '救命の鎖：胸骨圧迫とAED', order: 2, content: `<div class="space-y-6"><div class="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-center"><h4 class="text-2xl font-black mb-6">絶え間ない圧迫が脳を守る</h4><div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left"><div class="p-4 bg-white/5 border border-white/10 rounded-2xl"><p class="text-emerald-400 font-black text-xs mb-2">胸骨圧迫</p><p class="text-xs leading-relaxed">・「強く、速く、絶え間なく」<br/>・1分間に100〜120回のリズム<br/>・5cm以上沈むまで押す<br/>・**人工呼吸が困難な場合は圧迫のみでも有効です**</p></div><div class="p-4 bg-white/5 border border-white/10 rounded-2xl"><p class="text-emerald-400 font-black text-xs mb-2">AEDの役割</p><p class="text-xs leading-relaxed">・電源を入れれば音声が誘導<br/>・心室細動をリセットする唯一の手段<br/>・電気ショック後すぐ圧迫再開</p></div></div></div></div>` },
          { title: '高齢者施設で多い「窒息」への対応', order: 3, content: `<div class="space-y-8"><div class="p-8 bg-blue-50 rounded-[2.5rem] border-2 border-blue-100 border-dashed relative text-center"><div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">Choking Hazard</div><h4 class="text-2xl font-black text-blue-900 mb-4">1分1秒を争う異物除去</h4><div class="grid grid-cols-2 gap-4 mt-6 text-left"><div class="p-4 bg-white rounded-2xl shadow-sm"><p class="text-blue-600 font-black text-xs mb-2">背部叩打法</p><p class="text-[10px] leading-tight">肩甲骨の間を、手のひらの付け根で強く叩く。意識の有無を問わず実施可能。</p></div><div class="p-4 bg-white rounded-2xl shadow-sm"><p class="text-blue-600 font-black text-xs mb-2">腹部突き上げ法</p><p class="text-[10px] leading-tight">後ろから抱え、みぞおちを上方へ圧迫。意識がある場合のみ実施。</p></div></div></div></div>` },
          { title: '福祉用具の緊急トラブル対応', order: 4, content: `<div class="p-10 bg-red-50 rounded-[3rem] border border-red-100 flex flex-col items-center text-center space-y-6"><h4 class="text-2xl font-black text-red-900">宙吊り・停電・挟まり</h4><div class="space-y-4 w-full text-left mt-6"><div class="bg-white/80 px-6 py-4 rounded-2xl shadow-sm"><p class="text-sm font-bold text-slate-700">介護リフト：非常降下レバー（赤い紐やレバー）の場所を今すぐ確認してください。停電時でも手動で下げることが可能です。</p></div><div class="bg-white/80 px-6 py-4 rounded-2xl shadow-sm"><p class="text-sm font-bold text-slate-700">電動ベッド：停電時は手動ハンドルへの切り替え、または予備バッテリーでの操作が必要です。</p></div></div></div>` },
          { title: '救急隊への情報伝達：ISBAR', order: 5, content: `<div class="space-y-6"><div class="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"><h4 class="text-xs font-black tracking-[0.3em] uppercase opacity-50 mb-6">Professional Handover</h4><div class="space-y-3 text-sm font-black"><p><span class="text-emerald-400 mr-2">I (Identity):</span> 施設名・自分の名前、対象者の氏名</p><p><span class="text-emerald-400 mr-2">S (Situation):</span> 発見時間、現在の主症状（呼吸なし等）</p><p><span class="text-emerald-400 mr-2">B (Background):</span> 既往歴、内服薬、DNARの有無</p><p><span class="text-emerald-400 mr-2">A (Assessment):</span> 自分の評価（心停止の疑い等）</p><p><span class="text-emerald-400 mr-2">R (Recommendation):</span> 搬送の要請、指示の仰ぎ</p></div></div></div>` },
          { title: 'シミュレーション：食事中の急変', order: 6, content: `<div class="space-y-6"><div class="p-8 bg-orange-50 border-2 border-orange-100 rounded-[2.5rem] text-center"><p class="text-orange-900 text-lg font-black leading-relaxed">食事中の利用者が突然喉をかきむしる動作（チョークサイン）をし、顔が真っ赤になりました。どうしますか？</p></div><div class="grid grid-cols-1 gap-4"><div class="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center gap-4 opacity-60"><span class="w-10 h-10 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center font-black">×</span><p class="text-xs font-bold italic">「大丈夫ですか！」と背中をさすりながら、水を飲ませようとする</p></div><div class="p-6 bg-white border border-emerald-100 rounded-2xl shadow-xl ring-2 ring-emerald-50 flex items-center gap-4"><span class="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-black shadow-lg">○</span><p class="text-xs font-black text-slate-900 font-bold">咳を促し、出なければ直ちに「背部叩打法」を実施。同時に周囲に応援と119番、AEDを指示する。</p></div></div></div>` },
          { title: 'まとめ：迷わず、動く', order: 7, content: `<div class="flex flex-col items-center justify-center min-h-[450px] text-center space-y-10"><div class="w-24 h-24 bg-red-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-red-200 rotate-3"><svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div><h3 class="text-3xl font-black text-slate-900 leading-tight">救急対応に「完璧」はありません。<br/>でも、「迷わない」ことは可能です。</h3><p class="text-slate-500 font-medium text-lg max-w-sm mx-auto leading-relaxed">今日の知識が、明日誰かの命をつなぐバトンになります。自信を持って、その一歩を踏み出してください。</p><div class="pt-10 border-t border-slate-100 w-full"><p class="text-slate-400 font-black text-xs uppercase tracking-[0.3em]">End of Session</p></div></div>` }
        ]
      },
      questions: {
        create: [
          { text: '意識・呼吸がない利用者への胸骨圧迫の強さとリズムで正しいものはどれか。', explanation: '「強く（5cm以上沈むまで）」「速く（1分間に100〜120回）」「絶え間なく」行うことが救命の基本です。', order: 1, choices: { create: [{ text: '1分間に100〜120回、5cm以上沈むまで', isCorrect: true }, { text: '1分間に60回、優しくゆっくり', isCorrect: false }, { text: '1分間に200回、できるだけ速く', isCorrect: false }] } },
          { text: '喉に異物を詰まらせた際（窒息）、最初に行うべき対応はどれか。', explanation: '咳ができるなら咳を促し、出せない場合は直ちに背部叩打法等で異物の除去を試みます。水を飲ませるのは禁忌です。', order: 2, choices: { create: [{ text: '咳き込みを促し、出なければ背部叩打法を行う', isCorrect: true }, { text: '水をたくさん飲ませて流し込む', isCorrect: false }, { text: '意識がなくなるまで様子を見る', isCorrect: false }] } },
          { text: '介護リフト使用中に停電や故障で停止し、利用者が宙吊りになった際の対応は？', explanation: 'リフトには必ず「非常降下レバー（またはボタン）」が備わっています。手動で安全な位置まで下げる操作を行います。', order: 3, choices: { create: [{ text: '非常降下レバーを操作して手動で下ろす', isCorrect: true }, { text: '修理業者が来るまでそのまま待つ', isCorrect: false }, { text: 'リフトから無理やり抱きかかえて下ろす', isCorrect: false }] } },
          { text: '医療職や救急隊への正確な情報伝達のために用いられる、報告の構成手法を何というか。', explanation: 'ISBAR（Identity, Situation, Background, Assessment, Recommendation）と呼ばれます。', order: 4, choices: { create: [{ text: 'ISBAR（アイズバー）', isCorrect: true }, { text: 'PDCA（ピーディーシーエー）', isCorrect: false }, { text: 'OJT（オージェーティー）', isCorrect: false }] } },
          { text: 'AED（自動体外式除細動器）を使用すべき状態はどのような時か。', explanation: '呼びかけに反応がなく（意識なし）、正常な呼吸がない場合です。', order: 5, choices: { create: [{ text: '意識がなく、正常な呼吸がない時', isCorrect: true }, { text: '少し意識が朦朧としているが話せる時', isCorrect: false }, { text: '寝息を立ててぐっすり眠っている時', isCorrect: false }] } }
        ]
      }
    }
  })
}
