import { PrismaClient } from '@prisma/client'

export async function seedAccident(prisma: PrismaClient) {
  return await prisma.course.create({
    data: {
      title: '事故発生の防止・再発防止に関する研修（福祉用具含む）',
      description: '重大事故を防ぐための要因分析と、福祉用具の安全点検技術を網羅した安全管理の決定版。',
      introduction: `
        <div class="space-y-8">
          <div class="flex items-center gap-4">
            <span class="h-1 w-12 bg-amber-600 rounded-full"></span>
            <p class="text-amber-600 font-black tracking-widest text-sm uppercase">Risk Management Hook</p>
          </div>
          <h2 class="text-4xl font-black text-slate-900 leading-tight">「あ、危ない！」<br/>その瞬間、人生が変わる。</h2>
          <div class="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
            <p>1件の重大事故の影には、29件の軽微な事故があり、その下には300件の「ヒヤリハット」が隠れています。</p>
            <div class="p-8 bg-amber-50/50 rounded-[2rem] border border-amber-100 shadow-inner relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-amber-100/30 rounded-bl-full"></div>
              <p class="relative z-10 font-medium italic">事故は「個人の性格」で起きるのではなく、本人・環境・ケアの「隙間」で起きます。命を救うのは、あなたの気づきと、組織の仕組みです。</p>
            </div>
            <p>この研修では、2025年最新の事故予防ガイドラインに基づき、事故を未然に防ぐ分析力と、福祉用具を安全に使いこなす技術を学びます。</p>
          </div>
        </div>
      `,
      learningObjectives: `
        <div class="grid grid-cols-1 gap-6">
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-amber-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-amber-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">1</div>
            <div><h4 class="text-xl font-black text-slate-900 mb-2">事故の要因分析と再発防止</h4><p class="text-slate-500 leading-relaxed font-medium">「なぜなぜ分析」の手法を学び、個人の責任に帰さない組織的な再発防止策を立案できるようになる。</p></div>
          </div>
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-amber-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-amber-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">2</div>
            <div><h4 class="text-xl font-black text-slate-900 mb-2">福祉用具の安全点検技術</h4><p class="text-slate-500 leading-relaxed font-medium">車椅子・ベッド・リフトの日常点検項目を理解し、福祉用具に起因する事故を100%防ぐための知識を習得する。</p></div>
          </div>
        </div>
      `,
      slides: {
        create: [
          { title: '事故防止：命を守るリスクマネジメント', order: 0, content: `<div class="flex flex-col items-center justify-center min-h-[300px] text-center space-y-12"><div class="relative"><div class="absolute inset-0 bg-amber-400 blur-3xl opacity-20 scale-150 animate-pulse"></div><div class="relative bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 max-w-sm"><div class="bg-amber-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-6">Risk Management</div><h2 class="text-3xl font-black text-slate-900 leading-tight mb-4">事故防止・再発防止<br/>〜福祉用具の安全活用〜</h2></div></div><div class="flex items-center gap-4 text-slate-400 font-black text-[10px] tracking-widest"><span class="h-px w-8 bg-slate-200"></span>CARE LEARNING SYSTEM<span class="h-px w-8 bg-slate-200"></span></div></div>` },
          { title: 'ハインリッヒの法則：300件の宝', order: 1, content: `<div class="space-y-8"><div class="inline-flex items-center gap-3 px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-xs font-black ring-1 ring-amber-100"><span class="w-2 h-2 bg-amber-600 rounded-full animate-ping"></span>Heinrich's Law</div><h4 class="text-2xl font-black text-slate-900 leading-tight">1件の重大事故の裏には、<br/><span class="text-amber-600 decoration-4 underline underline-offset-8">300件のヒヤリ</span>があります</h4><div class="p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-sm text-center font-bold text-slate-700 leading-relaxed italic">ヒヤリハット報告は「ミスした報告」ではありません。重大事故を防ぐための「未来の命へのバトン」です。隠さず共有することが最大の防御です。</div></div>` },
          { title: '事故の3要因分析：なぜ起きたか？', order: 2, content: `<div class="space-y-8"><div class="flex flex-col items-center text-center"><div class="bg-slate-100 px-4 py-1 rounded-full text-[10px] font-black text-slate-500 tracking-widest uppercase mb-4">Root Cause Analysis</div><h4 class="text-xl font-black text-slate-900 leading-relaxed">個人のせいにせず、多角的に分析する</h4></div><div class="relative grid grid-cols-3 gap-px bg-slate-200 p-px rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl"><div class="p-6 bg-white flex flex-col items-center text-center space-y-3"><div class="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center font-black mx-auto">1</div><p class="text-xs font-black text-slate-900">本人要因</p><p class="text-[9px] text-slate-400">体調不良、認知症の影響、身体機能の低下、薬の副作用</p></div><div class="p-6 bg-white flex flex-col items-center text-center space-y-3"><div class="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center font-black mx-auto">2</div><p class="text-xs font-black text-slate-900">環境要因</p><p class="text-[9px] text-slate-400">床の濡れ、暗い照明、慣れない家具配置、段差</p></div><div class="p-6 bg-white flex flex-col items-center text-center space-y-3"><div class="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center font-black mx-auto">3</div><p class="text-xs font-black text-slate-900">ケア要因</p><p class="text-[9px] text-slate-400">確認不足、焦り、無理な介助姿勢、手順の不徹底</p></div></div></div>` },
          { title: '福祉用具の安全点検：車椅子', order: 3, content: `<div class="space-y-6"><div class="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"><h4 class="text-xs font-black tracking-[0.3em] uppercase opacity-50 mb-6">Equipment Check</h4><p class="text-sm text-amber-400 font-black mb-4">車椅子の事故は「点検」で100%防げます</p><div class="space-y-4 text-lg font-black text-left"><div class="flex items-center gap-4"><span class="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-xs">01</span><p>ブレーキ：遊びがないか、左右均等に効くか</p></div><div class="flex items-center gap-4"><span class="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-xs">02</span><p>タイヤ：空気圧は適切か、亀裂や摩耗はないか</p></div><div class="flex items-center gap-4"><span class="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-xs">03</span><p>足置き：緩みはないか、立ち上がり時の跳ね上げ</p></div></div></div></div>` },
          { title: '福祉用具の安全点検：ベッド・サイドレール', order: 4, content: `<div class="p-10 bg-amber-50 rounded-[3rem] border border-amber-100 flex flex-col items-center text-center space-y-6"><h4 class="text-2xl font-black text-amber-900">「隙間」が命を奪う</h4><p class="text-slate-600 text-sm font-medium leading-relaxed">ベッド柵の隙間や、柵とマットレスの間に首や手足が挟まる事故が多発しています。適合するサイズのマットレスを使用しているか、柵にガタつきがないか、毎日の確認が必須です。特に夜間の安否確認時に隙間をチェックしてください。</p></div>` },
          { title: '事故発生時の初動：命を守る3Step', order: 5, content: `<div class="space-y-6"><div class="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"><div class="space-y-4 text-lg font-black text-left"><div class="flex items-center gap-4"><span class="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-xs">01</span><p>救命と安全：呼吸・意識を確認。これ以上の転倒を防ぐ</p></div><div class="flex items-center gap-4"><span class="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-xs">02</span><p>報告と応援：一人で抱えず、即座に看護師やリーダーを呼ぶ</p></div><div class="flex items-center gap-4"><span class="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-xs">03</span><p>状況の保存：なぜ起きたか、そのままの状態で記録する</p></div></div></div></div>` },
          { title: '再発防止策の作り方：なぜなぜ分析', order: 6, content: `<div class="space-y-8 text-center"><h4 class="text-xl font-black text-slate-900 leading-relaxed">「注意する」は対策ではありません</h4><div class="p-8 bg-white border-2 border-slate-100 rounded-[2rem] shadow-xl"><p class="text-sm font-bold text-slate-700">× 「次は転ばないように職員全員で注意を徹底する」</p><div class="h-px bg-slate-100 my-4"></div><p class="text-sm font-black text-amber-600">○ 「センサーの配置を10cm手前に変更し、夜間の照明を上げる」</p></div><p class="text-[10px] text-slate-400 font-bold">仕組みや環境を変えることが、真の再発防止（組織の安全）です</p></div>` },
          { title: 'シミュレーション：転倒を発見したら', order: 7, content: `<div class="space-y-6"><div class="p-8 bg-orange-50 border-2 border-orange-100 rounded-[2.5rem] text-center"><p class="text-orange-900 text-lg font-black leading-relaxed">深夜、居室前で倒れている入所者を発見。意識はありますが混乱しています。あなたならどうしますか？</p></div><div class="grid grid-cols-1 gap-4"><div class="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center gap-4 opacity-60"><span class="w-10 h-10 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center font-black">×</span><p class="text-xs font-bold italic">すぐに抱き上げ、ベッドに運んでから様子を見る</p></div><div class="p-6 bg-white border border-emerald-100 rounded-2xl shadow-xl ring-2 ring-emerald-50 flex items-center gap-4"><span class="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-black shadow-lg">○</span><p class="text-xs font-black text-slate-900 font-bold">動かさずに呼吸と脈拍を確認し、ナースコールで応援を呼ぶ。外傷や出血をチェックする。</p></div></div></div>` },
          { title: '組織的対応：事故防止検討委員会の役割', order: 8, content: `<div class="space-y-8"><div class="p-10 bg-emerald-50 rounded-[3rem] border border-emerald-100 flex flex-col items-center text-center space-y-6"><div class="w-20 h-20 bg-white rounded-[2rem] shadow-xl flex items-center justify-center font-black text-emerald-600">Plan</div><h4 class="text-2xl font-black text-emerald-900">風通しの良い組織作り</h4><p class="text-slate-600 font-medium leading-relaxed">ヒヤリハットを「言える」環境こそが最強の安全策です。検討委員会を通じて多職種で改善案を共有し、個人の責任にしない文化を作りましょう。</p></div></div>` },
          { title: 'まとめ：安全は最大の思いやり', order: 9, content: `<div class="flex flex-col items-center justify-center min-h-[450px] text-center space-y-10"><div class="w-24 h-24 bg-amber-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-amber-200 rotate-3"><svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div><h3 class="text-3xl font-black text-slate-900 leading-tight">安全管理は、プロとしての<br/>「誇り」を守ることです。</h3><p class="text-slate-500 font-medium text-lg max-w-sm mx-auto leading-relaxed">あなたの「気づき」が、今日誰かの未来を救っています。自信を持って、日々の点検と報告を続けましょう。</p><div class="pt-10 border-t border-slate-100 w-full"><p class="text-slate-400 font-black text-xs uppercase tracking-[0.3em]">End of Session</p></div></div>` }
        ]
      },
      questions: {
        create: [
          { text: '1件の重大事故の影に300件の無傷の事故（ヒヤリハット）が潜んでいるという法則を何というか。', explanation: 'ハインリッヒの法則と呼ばれます。この300件の「ヒヤリ」を共有することが重大事故の防止に繋がります。', order: 1, choices: { create: [{ text: 'ハインリッヒの法則', isCorrect: true }, { text: 'パレートの法則', isCorrect: false }, { text: 'ムーアの法則', isCorrect: false }] } },
          { text: '事故の再発防止策を立案する際、不適切な考え方はどれか。', explanation: '「個人の不注意」や「努力」に頼るのではなく、手順や環境、仕組みを変えることが真の再発防止です。', order: 2, choices: { create: [{ text: '本人の不注意を厳しく叱責し反省させる', isCorrect: true }, { text: '作業手順やマニュアルを見直す', isCorrect: false }, { text: '福祉用具の種類や配置を変更する', isCorrect: false }, { text: '照明や床の材質などの環境を改善する', isCorrect: false }] } },
          { text: '事故の要因分析における「3要因」の正しい組み合わせはどれか。', explanation: '本人要因（心身の状態）、環境要因（設備や場所）、ケア要因（介助方法や確認不足）の3つです。', order: 3, choices: { create: [{ text: '本人要因・環境要因・ケア要因', isCorrect: true }, { text: '性格要因・運要因・天気要因', isCorrect: false }, { text: '食事要因・睡眠要因・運動要因', isCorrect: false }] } },
          { text: '車椅子の安全点検において、介助を開始する前に最も優先して確認すべきポイントはどこか。', explanation: 'ブレーキが確実に、かつ左右均等に効くことを確認することが最優先の安全点検です。', order: 4, choices: { create: [{ text: 'ブレーキの効き具合', isCorrect: true }, { text: 'クッションの柔らかさ', isCorrect: false }, { text: 'タイヤの汚れ', isCorrect: false }] } },
          { text: '介護施設において事故防止検討委員会の設置や、事故防止指針の整備は義務か。', explanation: '介護保険法等の運営基準により、委員会の開催（3ヶ月に1回以上等）や指針の整備は完全に義務化されています。', order: 5, choices: { create: [{ text: '運営基準により完全に義務化されている', isCorrect: true }, { text: '努力目標であり任意である', isCorrect: false }, { text: '大規模な施設のみ義務である', isCorrect: false }] } }
        ]
      }
    }
  })
}
