import { PrismaClient } from '@prisma/client'

export async function seedTerminal(prisma: PrismaClient) {
  return await prisma.course.create({
    data: {
      title: 'ターミナルケア（看取り）に関する研修',
      description: '厚生労働省の意思決定支援ガイドラインに準拠。ACP（人生会議）の実践から死別のケア、グリーフケアまでを網羅した決定版。',
      introduction: `
        <div class="space-y-8">
          <div class="flex items-center gap-4">
            <span class="h-1 w-12 bg-rose-600 rounded-full"></span>
            <p class="text-rose-600 font-black tracking-widest text-sm uppercase">Dignity at the End</p>
          </div>
          <h2 class="text-4xl font-black text-slate-900 leading-tight">最期に、どう<br/>思い出されたいですか？</h2>
          <div class="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
            <p>死は、単なる「終わり」ではありません。それは、その人が懸命に生きてきた人生の「完結」です。介護職は、その最も大切な幕引きを最も近くで支える、特別な存在です。</p>
            <div class="p-8 bg-rose-50/50 rounded-[2rem] border border-rose-100 shadow-inner relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-rose-100/30 rounded-bl-full"></div>
              <p class="relative z-10 font-medium italic">2024年度の報酬改定では、ACP（人生会議）を通じた本人・家族との継続的な話し合いが、看取り加算の必須要件として強く求められています。プロとしての技術と心構えを学びましょう。</p>
            </div>
            <p>この研修では、死への恐怖を「安心」に変えるための、具体的な意思決定支援と苦痛緩和の手法を学びます。</p>
          </div>
        </div>
      `,
      learningObjectives: `
        <div class="grid grid-cols-1 gap-6">
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-rose-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-rose-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">1</div>
            <div><h4 class="text-xl font-black text-slate-900 mb-2">ACP（人生会議）の実践プロセス</h4><p class="text-slate-500 leading-relaxed font-medium">厚労省のガイドラインを理解し、本人の意向を多職種で共有し続ける「繰り返しの対話」手法を習得する。</p></div>
          </div>
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-rose-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-rose-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">2</div>
            <div><h4 class="text-xl font-black text-slate-900 mb-2">看取り期のケアと家族支援</h4><p class="text-slate-500 leading-relaxed font-medium">死の兆候に応じた安楽な介助と、家族の悲嘆（予期悲嘆・グリーフ）に寄り添うプロとしての関わり方を学ぶ。</p></div>
          </div>
        </div>
      `,
      slides: {
        create: [
          { title: 'ターミナルケア：人生の完結を支える', order: 0, content: `<div class="flex flex-col items-center justify-center min-h-[300px] text-center space-y-12"><div class="relative"><div class="absolute inset-0 bg-rose-400 blur-3xl opacity-20 scale-150 animate-pulse"></div><div class="relative bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 max-w-sm"><div class="bg-rose-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-6">Terminal Care</div><h2 class="text-3xl font-black text-slate-900 leading-tight mb-4">看取り研修<br/>〜尊厳ある最期を支える〜</h2></div></div><div class="flex items-center gap-4 text-slate-400 font-black text-[10px] tracking-widest"><span class="h-px w-8 bg-slate-200"></span>CARE LEARNING SYSTEM<span class="h-px w-8 bg-slate-200"></span></div></div>` },
          { title: 'ACP（人生会議）：書類ではなく「対話」', order: 1, content: `<div class="space-y-8"><div class="inline-flex items-center gap-3 px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-xs font-black ring-1 ring-rose-100"><span class="w-2 h-2 bg-rose-600 rounded-full animate-ping"></span>ADVANCE CARE PLANNING</div><h4 class="text-2xl font-black text-slate-900 leading-tight">「どう生きたいか」を、<br/><span class="text-rose-600 decoration-4 underline underline-offset-8">何度も、みんなで話し合う</span></h4><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="p-6 bg-white border-2 border-slate-50 rounded-[2rem] shadow-sm"><p class="text-sm font-black text-slate-900 mb-2">繰り返すプロセス</p><p class="text-[11px] text-slate-500 font-medium">本人の意向は変わるもの。状態の変化に合わせて、本人・家族・多職種で繰り返し話し合います。</p></div><div class="p-6 bg-white border-2 border-slate-50 rounded-[2rem] shadow-sm"><p class="text-sm font-black text-slate-900 mb-2">記録の義務化</p><p class="text-[11px] text-slate-500 font-medium">2024年度より、話し合いの内容を詳細に記録し保存することが加算の必須要件となりました。</p></div></div></div>` },
          { title: '身体の変化：死の兆候を見守る', order: 2, content: `<div class="space-y-8"><div class="relative grid grid-cols-2 gap-px bg-slate-200 p-px rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl"><div class="p-6 bg-white text-center space-y-3"><div class="w-10 h-10 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center font-black mx-auto">A</div><p class="text-xs font-black text-slate-900">呼吸の変化</p><p class="text-[9px] text-slate-400 leading-tight">下顎呼吸（あごを動かす）、死前喘鳴（喉のごろごろ音）</p></div><div class="p-6 bg-white text-center space-y-3"><div class="w-10 h-10 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center font-black mx-auto">B</div><p class="text-xs font-black text-slate-900">循環の変化</p><p class="text-[9px] text-slate-400 leading-tight">血圧低下、チアノーゼ（手足の青紫）、尿量の減少</p></div><div class="p-6 bg-white text-center space-y-3"><div class="w-10 h-10 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center font-black mx-auto">C</div><p class="text-xs font-black text-slate-900">意識の変化</p><p class="text-[9px] text-slate-400 leading-tight">傾眠傾向（ほぼ寝ている）、時折見せるせん妄や幻覚</p></div><div class="p-6 bg-white text-center space-y-3"><div class="w-10 h-10 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center font-black mx-auto">D</div><p class="text-xs font-black text-slate-900">表情・動作</p><p class="text-[9px] text-slate-400 leading-tight">苦痛のない穏やかな表情、呼びかけへの反応の鈍化</p></div></div></div>` },
          { title: '積極的緩和ケア：介護職にできること', order: 3, content: `<div class="space-y-8"><div class="p-8 bg-blue-50 rounded-[2.5rem] border-2 border-blue-100 border-dashed relative text-center"><h4 class="text-2xl font-black text-blue-900 mb-4">「何もしない」が看取りではない</h4><p class="text-[11px] text-blue-800 italic font-medium">過度な医療処置ではなく、心地よさを追求する「積極的なケア」が求められます。</p></div><div class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl"><div class="grid grid-cols-2 gap-4"><div class="p-4 bg-slate-50 rounded-2xl"><p class="text-[10px] font-black text-slate-900 mb-1">口腔の湿潤</p><p class="text-[9px] text-slate-500 font-medium">喉の渇きを癒す保湿。口の中を清潔に保つ</p></div><div class="p-4 bg-slate-50 rounded-2xl"><p class="text-[10px] font-black text-slate-900 mb-1">安楽な体位</p><p class="text-[9px] text-slate-500 font-medium">呼吸しやすい姿勢、痛みを感じにくいポジショニング</p></div><div class="p-4 bg-slate-50 rounded-2xl"><p class="text-[10px] font-black text-slate-900 mb-1">スキンシップ</p><p class="text-[9px] text-slate-500 font-medium">手を握る、背中をさする。触れることによる安心</p></div><div class="p-4 bg-slate-50 rounded-2xl"><p class="text-[10px] font-black text-slate-900 mb-1">環境の調整</p><p class="text-[9px] text-slate-500 font-medium">照明を落とし、馴染みの音楽や香りで包む</p></div></div></div></div>` },
          { title: '家族の心理：予期悲嘆への理解', order: 4, content: `<div class="space-y-6"><div class="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"><h4 class="text-xs font-black tracking-[0.3em] uppercase opacity-50 mb-6">Family Support</h4><p class="text-sm text-rose-400 font-black mb-4">家族の「怒り」や「否認」は愛情の裏返しです</p><div class="space-y-4 text-sm text-slate-300"><p>1. 否認：死を受け入れられず、過度な医療を要求する</p><p>2. 怒り：なぜ助からないのかと、スタッフや自分を責める</p><p>3. 取り引き：神頼みをする。4. 抑うつ。5. 受容。</p></div><p class="text-[10px] text-slate-500 mt-6 leading-relaxed">私たちは、家族が「最期にこれをやってあげられた」という満足感（後悔の少なさ）を持てるよう支援します。</p></div></div>` },
          { title: 'スタッフのグリーフケア：デブリーフィング', order: 5, content: `<div class="space-y-8"><div class="p-10 bg-rose-50 rounded-[3rem] border border-rose-100 flex flex-col items-center text-center space-y-6"><div class="w-20 h-20 bg-white rounded-[2rem] shadow-xl flex items-center justify-center font-black text-2xl text-rose-600">Care</div><h4 class="text-2xl font-black text-rose-900">ひとりで抱え込まない</h4><p class="text-slate-600 font-medium leading-relaxed">看取りの後、チームでその人の思い出を語り合い、自分たちのケアを振り返る時間を持ちましょう。感情を表出することが、スタッフの燃え尽き（バーンアウト）を防ぎます。</p></div></div>` },
          { title: 'シミュレーション：意向の食い違い', order: 6, content: `<div class="space-y-6"><div class="p-8 bg-orange-50 border-2 border-orange-100 rounded-[2.5rem] text-center"><p class="text-orange-900 text-lg font-black leading-relaxed">本人は「自然に最期を迎えたい」と希望していましたが、急変を目の当たりにした家族が動揺し「救急車を呼んで！」と叫びました。どうしますか？</p></div><div class="grid grid-cols-1 gap-4"><div class="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center gap-4 opacity-60"><span class="w-10 h-10 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center font-black">×</span><p class="text-xs font-bold italic">「以前そう決めたじゃないですか！」と家族を説得し、呼ばない</p></div><div class="p-6 bg-white border border-emerald-100 rounded-2xl shadow-xl ring-2 ring-emerald-50 flex items-center gap-4"><span class="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-black shadow-lg">○</span><p class="text-xs font-black text-slate-900 font-bold">家族の動揺に共感しつつ、本人のこれまでの意向を再度伝え、看護師や医師を含めて今現在の最善を迅速に再検討する（意思決定の再合意）</p></div></div></div>` },
          { title: 'まとめ：最高のエンディングを目指して', order: 7, content: `<div class="flex flex-col items-center justify-center min-h-[450px] text-center space-y-10"><div class="w-24 h-24 bg-rose-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-rose-200 rotate-3"><svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg></div><h3 class="text-3xl font-black text-slate-900 leading-tight">看取りは、信頼の証。<br/>最後まで「その人らしく」を支える。</h3><p class="text-slate-500 font-medium text-lg max-w-sm mx-auto leading-relaxed">あなたの寄り添いが、利用者の人生を美しい物語として完成させ、家族の未来を救います。</p><div class="pt-10 border-t border-slate-100 w-full"><p class="text-slate-400 font-black text-xs uppercase tracking-[0.3em]">End of Session</p></div></div>` }
        ]
      },
      questions: {
        create: [
          { text: '本人、家族、多職種で医療やケアの方針を継続的に話し合う取り組みを何というか。', explanation: 'ACP（アドバンス・ケア・プランニング）、愛称「人生会議」と呼ばれます。2024年度より記録が厳格化されました。', order: 1, choices: { create: [{ text: 'ACP（人生会議）', isCorrect: true }, { text: 'PDCAサイクル', isCorrect: false }, { text: 'BCP策定', isCorrect: false }] } },
          { text: '看取り期において、介護職員が果たすべき重要な役割はどれか。', explanation: '医療的な延命ではなく、本人の安楽を追求する「苦痛緩和」と、家族の揺れる思いに寄り添う「家族支援」が最大の役割です。', order: 2, choices: { create: [{ text: '苦痛緩和と家族支援', isCorrect: true }, { text: '延命治療の実施', isCorrect: false }, { text: '家族への説得', isCorrect: false }] } },
          { text: '死が近づいた際に見られる、不規則なあごを動かすような呼吸を何というか。', explanation: '下顎呼吸（かがくこきゅう）と呼ばれ、看取りの重要な兆候です。苦しそうに見えますが、本人に苦痛はないと言われています。', order: 3, choices: { create: [{ text: '下顎呼吸', isCorrect: true }, { text: '深呼吸', isCorrect: false }, { text: '過呼吸', isCorrect: false }] } },
          { text: '死別を経験した家族やスタッフの悲しみをケアし、回復を支えることを何というか。', explanation: 'グリーフケア（悲嘆のケア）と呼ばれます。スタッフ自身のメンタルヘルス維持にも不可欠です。', order: 4, choices: { create: [{ text: 'グリーフケア', isCorrect: true }, { text: 'マインドフルネス', isCorrect: false }, { text: 'ストレスチェック', isCorrect: false }] } },
          { text: '2024年度の報酬改定において、看取り加算の算定に必要なガイドラインはどれか。', explanation: '「人生の最終段階における医療・ケアの決定プロセスに関するガイドライン」の遵守と、指針の策定が必須です。', order: 5, choices: { create: [{ text: '人生の最終段階における決定プロセスガイドライン', isCorrect: true }, { text: '感染症対策ガイドライン', isCorrect: false }, { text: '身体拘束廃止ガイドライン', isCorrect: false }] } }
        ]
      }
    }
  })
}
