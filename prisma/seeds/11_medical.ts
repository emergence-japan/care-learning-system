import { PrismaClient } from '@prisma/client'

export async function seedMedical(prisma: PrismaClient) {
  const slug = 'medical'
  const courseData = {
    slug,
    title: '医療に関する研修（連携・観察・医療的ケア）',
    description: 'バイタル観察の極意から医行為の範囲、専門職への正確な報告術（ISBAR）までを網羅した医療連携の決定版。',
    introduction: `
        <div class="space-y-8">
          <div class="flex items-center gap-4">
            <span class="h-1 w-12 bg-rose-600 rounded-full"></span>
            <p class="text-rose-600 font-black tracking-widest text-sm uppercase">Medical Bridge Hook</p>
          </div>
          <h2 class="text-4xl font-black text-slate-900 leading-tight">「いつもと何かが違う...」<br/>その声を、自信を持って届けていますか？</h2>
          <div class="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
            <p>毎日接しているあなただからこそ気づける、「なんとなく元気がない」という変化。<br/>それは医師も気づけない、重大な急変のサインかもしれません。</p>
            <div class="p-8 bg-rose-50/50 rounded-[2rem] border border-rose-100 shadow-inner relative overflow-hidden">
              <div class="absolute top-0 right-0 w-24 h-24 bg-rose-100/30 rounded-bl-full"></div>
              <p class="relative z-10 font-medium italic">介護と医療は、利用者の命を守るための「同じチーム」です。<br/>自信を持って医療職と繋がるための『技術』を学びましょう。</p>
            </div>
            <p>この研修では、数値の裏側にある事実を見抜く観察力と、<br/>国際標準の「報告術（ISBAR）」をマスターします。</p>
          </div>
        </div>
      `,
    learningObjectives: `
        <div class="grid grid-cols-1 gap-6 max-w-3xl mx-auto text-left">
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-rose-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-rose-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">1</div>
            <div>
              <h4 class="text-xl font-black text-slate-900 mb-2">疾病の早期発見と観察術</h4>
              <p class="text-slate-500 leading-relaxed font-medium">高齢者に多い疾患の兆候を理解し、バイタル数値と<br/>「見た目」を統合したアセスメントができるようになる。</p>
            </div>
          </div>
          <div class="group p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-rose-50 transition-all duration-500 flex items-start gap-6">
            <div class="w-14 h-14 bg-rose-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg group-hover:scale-110 transition-transform">2</div>
            <div>
              <h4 class="text-xl font-black text-slate-900 mb-2">正確な報告スキル（ISBAR）</h4>
              <p class="text-slate-500 leading-relaxed font-medium">介護職が行える医行為の法的範囲を理解し、<br/>専門職へ根拠を持って情報を伝える報告術を習得する。</p>
            </div>
          </div>
        </div>
      `,
    badgeLabel: '医療連携',
    badgeIcon: 'HeartPulse',
  }

  const slidesData = [
    { 
      title: '医療に関する研修（連携・観察・医療的ケア）', 
      order: 0, 
      content: `
        <div class="flex flex-col items-center text-center space-y-10">
          <div class="relative">
            <div class="absolute inset-0 bg-rose-400 blur-3xl opacity-20 scale-150 animate-pulse"></div>
            <div class="relative bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 max-w-lg mx-auto">
              <div class="bg-rose-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase inline-block mb-8">Medical Collaboration</div>
              <h2 class="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                医療に関する研修<br/>
                <span class="text-rose-600 text-3xl">〜命をつなぐ観察と報告〜</span>
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
      title: 'バイタルサイン：数値の「裏」を読み解く', 
      order: 1, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <div class="inline-flex items-center gap-3 px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-xs font-black ring-1 ring-rose-100">
            <span class="w-2 h-2 bg-rose-600 rounded-full animate-ping"></span>
            VITAL SIGNS
          </div>
          <h4 class="text-3xl font-black text-slate-900 leading-tight">
            数値が「正常」でも、<br/>
            <span class="text-rose-600 decoration-4 underline underline-offset-8">重症の場合があります</span>
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl mx-auto pt-4">
            <div class="p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-sm hover:border-rose-100 transition-colors">
              <p class="text-lg font-black text-slate-900 mb-3">体温の落とし穴</p>
              <p class="text-sm text-slate-500 font-bold leading-relaxed text-left">
                高齢者は平熱が低いため、37.0度で<br/>
                発熱のサインであることがあります。<br/>
                顔の赤らみや「熱さ」を重視しましょう。
              </p>
            </div>
            <div class="p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-sm hover:border-rose-100 transition-colors">
              <p class="text-lg font-black text-slate-900 mb-3">SpO2の重要性</p>
              <p class="text-sm text-slate-500 font-bold leading-relaxed text-left">
                酸素飽和度90%以下は緊急事態。<br/>
                いつもより「2〜3%低い」だけでも、<br/>
                肺炎や脱水の可能性があります。
              </p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '「いつもと違う」を見抜く4つの視点', 
      order: 2, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <div class="flex flex-col items-center">
            <div class="bg-slate-100 px-6 py-1.5 rounded-full text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase mb-6">Observation Analysis</div>
            <h4 class="text-3xl font-black text-slate-900 leading-relaxed">数値に表れない「異変の正体」</h4>
          </div>
          <div class="relative grid grid-cols-2 gap-px bg-slate-200 p-px rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl max-w-3xl mx-auto">
            <div class="p-8 bg-white flex flex-col items-center text-center space-y-4">
              <div class="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm">A</div>
              <p class="text-sm font-black text-slate-900">顔色・表情</p>
              <p class="text-[10px] text-slate-400 font-bold leading-relaxed">青白い、赤ら顔、目が合わない、<br/>呼びかけへの反応が鈍い</p>
            </div>
            <div class="p-8 bg-white flex flex-col items-center text-center space-y-4">
              <div class="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm">B</div>
              <p class="text-sm font-black text-slate-900">食事・水分</p>
              <p class="text-[10px] text-slate-400 font-bold leading-relaxed">食欲低下、飲み込みが悪い、<br/>口の中に食べ物を溜めている</p>
            </div>
            <div class="p-8 bg-white flex flex-col items-center text-center space-y-4">
              <div class="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm">C</div>
              <p class="text-sm font-black text-slate-900">排泄・尿</p>
              <p class="text-[10px] text-slate-400 font-bold leading-relaxed">尿の色が濃い、回数が極端に少ない<br/>（脱水や感染の兆候）</p>
            </div>
            <div class="p-8 bg-white flex flex-col items-center text-center space-y-4">
              <div class="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm">D</div>
              <p class="text-sm font-black text-slate-900">動作・意識</p>
              <p class="text-[10px] text-slate-400 font-bold leading-relaxed">ふらつき、ろれつが回らない、<br/>急に怒りっぽくなった</p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '介護職ができる「医行為」の境界線', 
      order: 3, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <div class="p-10 bg-rose-50 rounded-[3rem] border-2 border-rose-100 border-dashed relative shadow-inner max-w-3xl mx-auto">
            <div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-rose-600 text-white px-10 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase shadow-xl">Legal Scope</div>
            <h4 class="text-3xl font-black text-rose-900 mb-6">法的範囲を正しく守る</h4>
            <p class="text-lg text-rose-800 italic font-bold">
              「親切心」での自己判断が、<br/>重大な法的トラブルを招くことがあります。
            </p>
          </div>
          <div class="grid grid-cols-2 gap-6 max-w-3xl mx-auto pt-4">
            <div class="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
              <p class="text-lg font-black text-slate-900 mb-4">○ 実施可能</p>
              <p class="text-sm text-slate-500 font-bold leading-relaxed text-left">
                ・爪切り、耳垢清掃<br/>
                ・皮膚への軟膏塗布<br/>
                ・市販の目薬点眼
              </p>
            </div>
            <div class="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
              <p class="text-lg font-black text-rose-600 mb-4">× 原則禁止</p>
              <p class="text-sm text-slate-500 font-bold leading-relaxed text-left">
                ・インスリン注射<br/>
                ・褥瘡の処置、摘便<br/>
                ・喀痰吸引（要研修）
              </p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '魔法の報告術：ISBAR（アイズバー）', 
      order: 4, 
      content: `
        <div class="space-y-8 flex flex-col items-center">
          <div class="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden w-full max-w-3xl">
            <div class="absolute -top-10 -right-10 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl"></div>
            <h4 class="text-[10px] font-black tracking-[0.4em] uppercase opacity-50 mb-10 text-center">Professional Handover</h4>
            <p class="text-xl text-emerald-400 font-black mb-10 text-center">医師や看護師へ、根拠を伝える構成</p>
            <div class="space-y-4 text-lg font-bold text-left max-w-xl mx-auto text-slate-200">
              <p class="flex items-center gap-6"><span class="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">I</span><span>Identity: 「私は〇〇です」</span></p>
              <p class="flex items-center gap-6"><span class="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">S</span><span>Situation: 「△△様に発熱があります」</span></p>
              <p class="flex items-center gap-6"><span class="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">B</span><span>Background: 「既往に心疾患があります」</span></p>
              <p class="flex items-center gap-6"><span class="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">A</span><span>Assessment: 「脱水の疑いを感じます」</span></p>
              <p class="flex items-center gap-6"><span class="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-sm shadow-lg shrink-0">R</span><span>Recommendation: 「受診すべきでしょうか？」</span></p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: '内服管理：5つの「正しい」の徹底', 
      order: 5, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center">
          <h4 class="text-3xl font-black text-rose-900 leading-relaxed">
            与薬ミスは「組織の事故」
          </h4>
          <div class="p-12 bg-white border-2 border-rose-100 rounded-[3.5rem] shadow-2xl max-w-3xl mx-auto">
            <div class="grid grid-cols-5 gap-4 text-[10px] font-black text-rose-600 uppercase mb-8">
              <div>1.人</div><div>2.薬</div><div>3.量</div><div>4.方法</div><div>5.時間</div>
            </div>
            <p class="text-lg text-slate-500 font-bold leading-relaxed">
              特に「他者の薬」を飲ませる事故は<br/>
              命に直結します。手渡し前の<br/>
              <span class="text-rose-600">指差し呼称</span>と<span class="text-rose-600">ダブルチェック</span>を<br/>
              ルーチン化してください。
            </p>
          </div>
        </div>
      ` 
    },
    { 
      title: 'シミュレーション：数値に出ない異変', 
      order: 6, 
      content: `
        <div class="space-y-10 text-center flex flex-col items-center max-w-2xl mx-auto">
          <div class="p-10 bg-orange-50 border-2 border-orange-100 rounded-[3rem] shadow-sm">
            <p class="text-orange-900 text-2xl font-black leading-relaxed">
              夕食時、A様が食べ残しぼんやり。<br/>
              熱も血圧も正常です。どうしますか？
            </p>
          </div>
          <div class="grid grid-cols-1 gap-6 w-full">
            <div class="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-center gap-8 opacity-60">
              <span class="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0">×</span>
              <p class="text-lg font-bold italic text-left">バイタルが正常なので、<br/>「眠いだけかな」と自己判断する</p>
            </div>
            <div class="p-8 bg-white border border-emerald-100 rounded-3xl shadow-2xl ring-2 ring-emerald-50 flex items-center gap-8">
              <span class="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shrink-0">○</span>
              <p class="text-lg font-black text-slate-900 leading-relaxed text-left">「いつもと違う」ことを看護師に<br/>ISBARで即報告する。</p>
            </div>
          </div>
        </div>
      ` 
    },
    { 
      title: 'まとめ：チーム医療の架け橋として', 
      order: 7, 
      content: `
        <div class="flex flex-col items-center text-center space-y-12">
          <div class="w-28 h-28 bg-rose-600 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-rose-200 rotate-3">
            <svg class="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 class="text-4xl font-black text-slate-900 leading-tight">
            医療連携は、<br/>信頼のバトンパスです。
          </h3>
          <p class="text-slate-500 font-bold text-xl max-w-sm mx-auto leading-relaxed">
            一番近くにいるあなたの「気づき」が、<br/>
            利用者の命をつないでいます。<br/>
            自信を持って、その声を届けてください。
          </p>
          <div class="pt-12 border-t border-slate-100 w-full max-w-xs mx-auto text-center">
            <p class="text-slate-400 font-black text-[10px] uppercase tracking-[0.5em]">End of Session</p>
          </div>
        </div>
      ` 
    }
  ]

  const questionsData = [
    { text: '高齢者のバイタルサイン観察において、正しい知識はどれか。', explanation: '高齢者は平熱が低く、重症でも熱が上がりにくい場合があるため、37度台であっても数値だけでなく全身状態の観察が重要です。', order: 1, choices: { create: [{ text: '平熱が低いため37度台でも発熱のサインである可能性がある', isCorrect: true }, { text: '38度を超えなければ異常なしと判断してよい', isCorrect: false }, { text: '数値さえ正常なら、顔色が悪くても報告の必要はない', isCorrect: false }] } },
    { text: '医療職や看護師への正確な情報伝達のために用いられる、報告の標準的な構成手法を何というか。', explanation: 'ISBAR（状況・背景・評価・提案）と呼ばれる世界標準の手法です。2024年度の改定でも医療連携の要として重視されています。', order: 2, choices: { create: [{ text: 'ISBAR（アイズバー）', isCorrect: true }, { text: 'PDCAサイクル', isCorrect: false }, { text: 'SWOT分析', isCorrect: false }] } },
    { text: '介護職員が原則として「医行為ではない」として実施できる処置はどれか。', explanation: '爪切り（周囲に異常なし）、耳垢清掃、軟膏塗布、目薬の点眼などは医行為に該当しません。', order: 3, choices: { create: [{ text: '爪切り、耳垢清掃、皮膚への軟膏塗布', isCorrect: true }, { text: 'インスリン注射の実施', isCorrect: false }, { text: '褥瘡（床ずれ）の処置', isCorrect: false }] } },
    { text: '誤嚥性肺炎を予防するために、介護現場で最も効果的とされる日常ケアはどれか。', explanation: '口腔ケアにより口内の細菌数を抑制することが、肺への細菌侵入を防ぎ、肺炎発症のリスクを劇減させます。', order: 4, choices: { create: [{ text: '食後の丁寧な口腔ケア', isCorrect: true }, { text: '居室の掃除', isCorrect: false }, { text: '入浴の回数を増やすこと', isCorrect: false }] } },
    { text: '喀痰吸引や経管栄養を介護職員が実施するために不可欠な法的手続きはどれか。', explanation: '所定の研修を修了し、都道府県に「認定特定行為業務従事者」として登録されている必要があります。', order: 5, choices: { create: [{ text: '都道府県への認定特定行為業務従事者登録', isCorrect: true }, { text: '現場リーダーの口頭での許可', isCorrect: false }, { text: '本人の家族からの承諾のみ', isCorrect: false }] } }
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
