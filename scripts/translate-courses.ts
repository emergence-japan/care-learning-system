import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper: replace Japanese text strings within HTML while preserving structure
function replaceInHtml(html: string, map: Record<string, string>): string {
  let result = html;
  for (const [ja, en] of Object.entries(map)) {
    result = result.replaceAll(ja, en);
  }
  return result;
}

const courses: Array<{
  id: string;
  titleEn: string;
  descriptionEn: string;
  loReplacements: Record<string, string>; // learningObjectives text replacements
}> = [
  {
    id: "cmlz3nnbf0001tcsoshu8jt64",
    titleEn: "Elder Abuse Prevention Training",
    descriptionEn: "~ To Protect Your Smile and the Smiles of Those in Your Care ~",
    loReplacements: {
      "Learning Objectives": "Learning Objectives",
      "自信を持って判断できる": "Make Confident, Informed Judgments",
      "何が虐待に当たるのか、その明確な定義を正しく説明できるようになる。":
        "Be able to clearly explain the definitions of what constitutes abuse.",
      "虐待の芽を見つけ、ケアを磨ける": "Detect Seeds of Abuse and Refine Your Care",
      "不適切なケアにいち早く気づき、日々の言葉掛けを改善できるようになる。":
        "Quickly notice inappropriate care and improve your daily communication with residents.",
      "自分と仲間を守る行動がとれる": "Take Action to Protect Yourself and Your Colleagues",
      "周囲で違和感を感じた際、適切な対応（報告）ができるようになる。":
        "Be able to respond appropriately (by reporting) when something feels wrong around you.",
    },
  },
  {
    id: "cmlz3no3n0025tcsotwazyj3q",
    titleEn: "Dementia Care Training",
    descriptionEn: "~ Supported Decision-Making and Coexistence for Peace of Mind ~",
    loReplacements: {
      "学習目標": "Learning Objectives",
      "本人の「意思」を尊重できる": "Respect the Person's Own Wishes",
      "最新の「意思決定支援」の考え方を理解し、本人の思いを汲み取れるようになる。":
        "Understand the latest approach to supported decision-making and learn to discern the resident's true wishes.",
      "生活場面ごとの工夫ができる": "Apply Practical Techniques for Daily Living",
      "食事・排泄・入浴など、認知症の特性に応じた具体的な介助技術を習得する。":
        "Learn specific care techniques tailored to the characteristics of dementia in areas such as meals, toileting, and bathing.",
      "BPSDを「SOS」と捉えられる": "Recognize BPSD as a \"Call for Help\"",
      "周辺症状（BPSD）の裏にある身体的・環境的要因を分析できるようになる。":
        "Be able to analyze the physical and environmental factors behind behavioral and psychological symptoms (BPSD).",
    },
  },
  {
    id: "cmlz3nqjk007ptcsogrl1m96f",
    titleEn: "Emergency Response Training",
    descriptionEn: "~ First Response and Lifesaving Skills for Decisive Action ~",
    loReplacements: {
      "救急要請の判断ができる": "Know When to Call Emergency Services",
      "直ちに119番通報すべき重大なサイン（レッドフラッグ）を習得する。":
        "Learn the serious red flag signs that require immediate emergency dispatch (119).",
      "心肺蘇生と窒息対応の完遂": "Master CPR and Choking Response",
      "胸骨圧迫、AED、背部叩打法などの緊急処置を正しく理解する。":
        "Correctly understand emergency procedures including chest compressions, AED use, and back blows.",
      "施設内連携を迷わず行う": "Coordinate Within the Facility Without Hesitation",
      "救命・連絡・他利用者への配慮といった、チームでの役割分担を習得する。":
        "Learn team role allocation for lifesaving, communication, and consideration for other residents.",
    },
  },
  {
    id: "cmlz3nouz0040tcsos107wrzu",
    titleEn: "Infection and Food Poisoning Prevention Training",
    descriptionEn: "~ Defense Techniques to 'Prevent Introduction and Spread' ~",
    loReplacements: {
      "標準予防策を完遂できる": "Implement Standard Precautions Completely",
      "全員が感染している前提で、正しい手洗いと防護具着脱を習得する。":
        "Assuming everyone is infected, learn correct handwashing and how to put on and remove PPE.",
      "発生時の初動を迷わない": "Act Decisively When an Outbreak Occurs",
      "ノロウイルス等の嘔吐物処理や、感染拡大を止める鉄則を理解する。":
        "Understand the correct procedures for handling vomit from norovirus and other rules to stop the spread of infection.",
      "BCPの役割を理解する": "Understand the Role of BCP",
      "人員不足などの緊急事態でも、命を守り抜く優先順位を知る。":
        "Know how to prioritize protecting lives even in emergencies such as staff shortages.",
    },
  },
  {
    id: "cmlz3nprx005vtcso9nr4fq0y",
    titleEn: "Accident Prevention Training",
    descriptionEn: "~ Safety Management That Turns 'Awareness' Into Team Strength ~",
    loReplacements: {
      "学習目標": "Learning Objectives",
      "ハインリッヒの法則を理解する": "Understand Heinrich's Law",
      "300件のヒヤリハットの裏にある1件の重大事故を防ぐ「気づき」の重要性を学ぶ。":
        "Learn the importance of 'awareness' in preventing the 1 serious accident behind 300 near-miss incidents.",
      "発生時の初動と報告を習得する": "Master Initial Response and Reporting",
      "救命優先の行動、正確な記録、ご家族・行政への適切な報告手順を理解する。":
        "Understand the procedures for life-saving priority actions, accurate documentation, and appropriate reporting to families and authorities.",
      "「なぜ」を深掘りし再発を防ぐ": "Dig Deep into \"Why\" to Prevent Recurrence",
      "個人の注意不足で終わらせず、環境や仕組みから対策を立てる技術を養う。":
        "Develop skills to address root causes in the environment and systems rather than simply attributing incidents to individual inattention.",
    },
  },
  {
    id: "cmlz3nta500d6tcsoyl3bwv3p",
    titleEn: "Hospitality and Etiquette Training",
    descriptionEn: "~ To Protect Residents' Dignity and Become a Trusted Professional ~",
    loReplacements: {
      "接遇の5原則を完遂できる": "Master the 5 Principles of Hospitality",
      "挨拶、表情、身だしなみ、言葉遣い、態度の基本を、プロの基準で身につける。":
        "Acquire the fundamentals of greeting, expression, appearance, language, and attitude to professional standards.",
      "スピーチロックを排除する": "Eliminate Speech Lock",
      "「ちょっと待って」などの言葉による拘束を自覚し、肯定的な表現に言い換える。":
        "Become aware of verbal restraint such as 'Just wait!' and learn to rephrase using positive expressions.",
      "非言語の力を活用できる": "Leverage the Power of Non-Verbal Communication",
      "視線の高さ、頷き、相槌などの「聴く態度」を通じて、深い信頼関係を構築する。":
        "Build deep trust through 'listening attitudes' such as eye level, nodding, and responsive sounds.",
    },
  },
  {
    id: "cmlz3nvs300iqtcsououu72jp",
    titleEn: "Medical Care Training",
    descriptionEn: "~ Observation Skills That Sustain Life and Early Detection of Abnormalities ~",
    loReplacements: {
      "法的境界線と責任を理解する": "Understand Legal Boundaries and Responsibilities",
      "認定特定行為としての喀痰吸引・経管栄養の範囲と、安全確保の法的義務を学ぶ。":
        "Learn the scope of sputum suctioning and tube feeding as certified specific care acts, and the legal obligations for ensuring safety.",
      "根拠ある観察技術を習得する": "Develop Evidence-Based Observation Skills",
      "バイタルの「数値」の裏にある「病態」を推測し、リスクを予見する観察眼を養う。":
        "Develop the observational ability to infer the 'clinical condition' behind vital sign 'numbers' and anticipate risks.",
      "多職種連携の質を高める": "Enhance Quality of Multidisciplinary Collaboration",
      "SBAR等の標準化された伝達手法を用い、看護師や医師と迅速かつ的確に連携する。":
        "Use standardized communication tools such as SBAR to collaborate quickly and accurately with nurses and physicians.",
    },
  },
  {
    id: "cmlz3nwks00khtcson00f0ds7",
    titleEn: "End-of-Life and Terminal Care Training",
    descriptionEn: "~ To Support the Final Stage of Life With Dignity ~",
    loReplacements: {
      "ACP（人生会議）を深掘りする": "Deepen Your Understanding of ACP (Life Meeting)",
      "本人の意向が揺れ動くことを前提に、多職種・家族と対話を重ねるプロセスを理解する。":
        "Understand the process of repeated dialogue with the multidisciplinary team and family, recognizing that the person's wishes may change over time.",
      "身体・精神的苦痛を緩和する": "Alleviate Physical and Psychological Suffering",
      "終末期の生理的変化（喘鳴、浮腫、斑紋等）を正しく理解し、非薬物的な緩和ケアを行う。":
        "Correctly understand terminal physiological changes (death rattle, edema, mottling, etc.) and provide non-pharmacological palliative care.",
      "グリーフケアと自己回復力": "Grief Care and Personal Resilience",
      "ご家族の悲嘆への伴走と、看取りに関わる職員自身のメンタルケア（自己変容）を学ぶ。":
        "Learn to accompany bereaved families through their grief and to care for your own mental health (personal transformation) as a staff member involved in end-of-life care.",
    },
  },
  {
    id: "cmlz3nuzv00gvtcsontxvy77f",
    titleEn: "Physical Restraint Abolition and Prevention Training",
    descriptionEn: "~ Aiming for Care That Binds Neither Body Nor Mind ~",
    loReplacements: {
      "拘束の「弊害」を深く知る": "Understand the Serious Harms of Restraint",
      "ADL低下、認知症の悪化、精神特屈辱感など、拘束が招く残酷な現実を理解する。":
        "Understand the harsh realities of restraint, including decreased ADL, worsening dementia, and the psychological impact of humiliation.",
      "「やむを得ない3要件」の厳格化": "Strict Adherence to the 3 Unavoidable Conditions",
      "例外的に行う場合の3要件と、記録・手続きの法的義務を正確に習得する。":
        "Accurately learn the 3 conditions for exceptional use of restraint and the legal obligations for documentation and procedures.",
      "代替案を導き出すチーム力": "Team Ability to Find Alternatives",
      "環境整備や個別性の理解を通じ、拘束に頼らない具体的なケアを提案できる。":
        "Be able to propose specific care approaches that do not rely on restraint, through environmental improvements and understanding individual needs.",
    },
  },
  {
    id: "cmlz3nu6v00f1tcso83zoq6vp",
    titleEn: "Disaster Preparedness and Drill Training",
    descriptionEn: "~ Practical BCP Skills to Protect Lives and Livelihoods ~",
    loReplacements: {
      "発災直後の初動を完遂できる": "Execute Immediate Actions Right After a Disaster",
      "シェイクアウト、初期消火、避難判断の基準を習得する。":
        "Learn the criteria for ShakeOut, initial firefighting, and evacuation decisions.",
      "災害BCPの核心を理解する": "Understand the Core of Disaster BCP",
      "人員不足時の優先業務と備蓄管理の鉄則を学ぶ。":
        "Learn the rules for priority tasks and stockpile management when staffing is insufficient.",
      "共助と連携の力を高める": "Strengthen Mutual Aid and Coordination",
      "安否確認、情報共有、地域との連携体制を習得する。":
        "Learn safety confirmation, information sharing, and coordination frameworks with the local community.",
    },
  },
  {
    id: "cmlz3nrnb009itcsooelgw2d9",
    titleEn: "Privacy and Personal Information Protection Training",
    descriptionEn: "~ Becoming an Information Professional Who Upholds Trust ~",
    loReplacements: {
      "守秘義務の範囲を正しく知る": "Understand the Scope of Confidentiality",
      "業務上知り得た情報の範囲と、退職後も続く重い法的責任を理解する。":
        "Understand the scope of information obtained through work and the serious legal responsibilities that continue even after retirement.",
      "現代のリスクを回避できる": "Prevent Modern Information Risks",
      "SNS、スマホ撮影、口頭での漏洩など、身近に潜む危険箇所を特定し、対策を学ぶ。":
        "Identify everyday risks such as SNS, smartphone photography, and verbal leaks, and learn countermeasures.",
      "漏洩時の初動を理解する": "Know the First Response to a Leak",
      "万が一事故が起きた際の、迅速な報告と被害拡大防止の手順を習得する。":
        "Learn the procedures for rapid reporting and preventing the spread of damage in the event of an incident.",
    },
  },
  {
    id: "cmlz3nsh200bbtcsojfuwi10g",
    titleEn: "Ethics and Legal Compliance Training",
    descriptionEn: "~ Professional Pride and Responsibility That Supports Honest Care ~",
    loReplacements: {
      "学習目標": "Learning Objectives",
      "介護職の倫理綱領を実践できる": "Apply the Code of Ethics for Care Workers",
      "人権尊重、自己決定の支援、公正な態度の重要性を再定義し、日々のケアに活かす。":
        "Redefine the importance of respecting human rights, supporting self-determination, and maintaining a fair attitude, and apply these to daily care.",
      "法令遵守の重要事項を習得する": "Master Key Points of Legal Compliance",
      "不正請求防止、ハラスメント対策、身体拘束禁止の法的根拠と責任を理解する。":
        "Understand the legal grounds and responsibilities for preventing fraudulent billing, addressing harassment, and prohibiting physical restraint.",
      "不適切な慣習を是正できる": "Correct Inappropriate Practices",
      "金品の授受や言葉遣い、SNS利用など、現場で陥りやすい問題に毅然と対応する。":
        "Respond firmly to common workplace pitfalls such as accepting gifts, inappropriate language, and social media use.",
    },
  },
  {
    id: "cmlz3nxbf00m6tcsoq71gg0hy",
    titleEn: "Mental and Emotional Care Training",
    descriptionEn: "~ Becoming an Emotional Professional Who Protects Residents and Yourself ~",
    loReplacements: {
      "感情を「肯定」する技術": "The Skill of \"Affirming\" Emotions",
      "バリデーション療法の基礎を習得し、利用者の不安を安心に変える関わりを学ぶ。":
        "Learn the basics of Validation therapy and discover how to transform residents' anxiety into a sense of security.",
      "人格尊重と個別ケアの実践": "Practicing Respect for Personhood and Individualized Care",
      "2024年度改正に基づき、一律の管理を排した「その人らしさ」を支える視点を養う。":
        "Based on the 2024 revisions, develop a perspective that supports each resident's 'unique self' by rejecting uniform management.",
      "感情労働のセルフケア": "Self-Care in Emotional Labor",
      "自身のストレスサインに気づき、チームでの支え合いを通じて心の健康を維持する。":
        "Notice your own signs of stress and maintain mental health through mutual support within the team.",
    },
  },
  {
    id: "cmlz3ny5n00o2tcsodfyyh5bj",
    titleEn: "Care Prevention and Independence Support Training",
    descriptionEn: "~ To Support the Strength to Live on One's Own Terms ~",
    loReplacements: {
      "強みに着目する視点を持つ": "Develop a Strengths-Based Perspective",
      "ICFに基づき、「できないこと」ではなく「できること」を見つけられる。":
        "Based on ICF, develop the ability to identify 'what can be done' rather than focusing on 'what cannot be done.'",
      "2024年改正の要点を理解する": "Understand Key Points of the 2024 Revisions",
      "リハ・口腔・栄養の一体的な取り組みと、科学的介護（LIFE）の意義を学ぶ。":
        "Learn the integrated approach of rehabilitation, oral management, and nutrition, and the significance of evidence-based care (LIFE).",
      "現場での具体的な支援を提案できる": "Propose Concrete Support Approaches in Practice",
      "過剰介護を避け、利用者の主体性を引き出す適切な声掛けを実践できる。":
        "Practice appropriate communication that draws out residents' independence while avoiding excessive assistance.",
    },
  },
  {
    id: "cmlz3nyyk00q8tcsosm4kx3gs",
    titleEn: "Harassment Prevention Training",
    descriptionEn: "~ Creating a Dignified Workplace Where Everyone Can Work With Peace of Mind ~",
    loReplacements: {
      "境界線を正しく理解する": "Correctly Understand the Boundaries",
      "パワハラ、セクハラ、カスハラの定義を学び、「指導」と「侵害」の違いを明確に説明できる。":
        "Learn the definitions of power harassment, sexual harassment, and customer harassment, and be able to clearly explain the difference between 'guidance' and 'violation.'",
      "組織的な対応力を身につける": "Develop Organizational Response Capabilities",
      "発生時やカスハラ遭遇時に、独りで抱えずチームで動く手順と、法的リスクを理解する。":
        "Understand the procedures for responding as a team rather than alone when harassment occurs, as well as the associated legal risks.",
      "心理的安全性を自ら創る": "Create Psychological Safety Yourself",
      "感情のコントロールやアサーティブな対話を通じ、誰もが意見を言える「最強の現場」を支える。":
        "Support the creation of 'the strongest workplace' where everyone can speak up, through emotional regulation and assertive dialogue.",
    },
  },
];

async function main() {
  console.log("Starting course translation updates...");

  for (const course of courses) {
    // Fetch current learningObjectives
    const current = await prisma.course.findUnique({
      where: { id: course.id },
      select: { learningObjectives: true },
    });

    if (!current) {
      console.warn(`Course not found: ${course.id}`);
      continue;
    }

    const learningObjectivesEn = replaceInHtml(
      current.learningObjectives ?? "",
      course.loReplacements
    );

    await prisma.course.update({
      where: { id: course.id },
      data: {
        titleEn: course.titleEn,
        descriptionEn: course.descriptionEn,
        learningObjectivesEn,
      },
    });

    console.log(`✓ ${course.titleEn}`);
  }

  await prisma.$disconnect();
  console.log("Done!");
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
