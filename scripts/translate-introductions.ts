import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function replaceInHtml(html: string, map: Record<string, string>): string {
  let result = html;
  for (const [ja, en] of Object.entries(map)) {
    result = result.replaceAll(ja, en);
  }
  return result;
}

const courses: Array<{
  id: string;
  replacements: Record<string, string>;
}> = [
  {
    id: "cmlz3nnbf0001tcsoshu8jt64", // Elder Abuse Prevention Training
    replacements: {
      "高齢者虐待防止研修": "Elder Abuse Prevention Training",
      "「自分だけは大丈夫」と<br/>思っていませんか？":
        "Don't you think,<br/>'It won't happen to me'?",
      "日々の忙しい業務の中で<br class=\"lg:hidden\" />つい言葉が強くなってしまったり、<br class=\"lg:hidden\" />動作を急かしてしまったりしたことは<br class=\"lg:hidden\" />ありませんか？":
        "In the midst of your busy daily work, have you ever found yourself<br class=\"lg:hidden\" />speaking harshly or rushing<br class=\"lg:hidden\" />someone's movements?",
      "虐待は、疲れやストレス、そして「良かれと思って」やっている習慣が、知らぬ間に虐待に繋がってしまうことがあります。":
        "Abuse can sometimes stem unnoticed from fatigue, stress, and habits done with the best of intentions.",
      "この研修は、あなた自身と利用者様の笑顔を守るためのものです。<br/>今の自分のケアを、一度一緒に振り返ってみましょう。":
        "This training is designed to protect both your smile and the smiles of those in your care.<br/>Let's take a moment together to reflect on your current care practices.",
    },
  },
  {
    id: "cmlz3no3n0025tcsotwazyj3q", // Dementia Care Training
    replacements: {
      "認知症ケア研修": "Dementia Care Training",
      "「なぜ、私の言葉が<br/>届かないんだろう？」":
        '"Why aren\'t my words<br/>getting through?"',
      "良かれと思ってやった介助なのに、拒絶されたり怒鳴られたり。<br class=\"lg:hidden\" />そんな経験はありませんか？":
        "Have you ever been rejected or shouted at despite doing your best to help?",
      "あなたが悪いのではありません。そこには、認知症という「真っ暗な霧」の中を歩く人の、切実な理由があるのです。":
        "It is not your fault. There are urgent reasons behind it — the person is walking through the 'pitch-black fog' of dementia.",
      "この研修は、そんな「届かない言葉」を「安心の絆」に変えるためのヒントを探る時間です。":
        "This training is a time to discover hints for transforming those 'unheard words' into 'bonds of reassurance.'",
    },
  },
  {
    id: "cmlz3nouz0040tcsos107wrzu", // Infection and Food Poisoning Prevention Training
    replacements: {
      "感染症・食中毒予防研修": "Infection & Food Poisoning Prevention Training",
      "あなたの手は、今、本当に<br/>「安全」だと言い切れますか？":
        "Can you say with confidence that your hands<br/>are truly 'safe' right now?",
      "目に見えないウイルスや細菌は、私たちの「油断」を入り口にして施設内に侵入します。":
        "Invisible viruses and bacteria enter facilities through our moments of 'carelessness.'",
      "高齢者の命を奪うのは病気だけではありません。持ち込む一粒のウイルスが、施設全体を巻き込むパンデミックの引き金になるのです。":
        "It is not only illness that can take elderly residents' lives. A single virus brought in can trigger a pandemic that engulfs the entire facility.",
      "プロとして、利用者の命を守る「最強の盾」を手に入れましょう。":
        "As a professional, equip yourself with the 'ultimate shield' to protect residents' lives.",
    },
  },
  {
    id: "cmlz3nprx005vtcso9nr4fq0y", // Accident Prevention Training
    replacements: {
      "事故発生防止研修": "Accident Prevention Training",
      "「事故は『防ぐ』もの？<br/>それとも『起きてしまう』もの？」":
        '"Are accidents something to \'prevent\'—<br/>or something that \'just happen\'?"',
      "介護の現場に「絶対」はありません。<br class=\"lg:hidden\" />どれだけ注意していても、事故は一瞬の隙を突いて発生します。":
        "There are no guarantees in care settings. No matter how careful you are, accidents happen in an unguarded moment.",
      "大切なのは、事故を「誰かのせい」にすることではありません。なぜ起きたのかを分析し、組織として二度と同じ悲しみを繰り返さない仕組みを作ることです。":
        "What matters is not blaming someone for the accident. It is analyzing why it happened and building systems as an organization to ensure the same tragedy never occurs again.",
      "この研修は、利用者と職員の双方を守るための「安全の盾」を手に入れるためのものです。":
        "This training is designed to equip you with a 'shield of safety' to protect both residents and staff.",
    },
  },
  {
    id: "cmlz3nqjk007ptcsogrl1m96f", // Emergency Response Training
    replacements: {
      "緊急時対応研修": "Emergency Response Training",
      "目の前で利用者が倒れた。<br/>あなたは「冷静」でいられますか？":
        "A resident has collapsed right in front of you.<br/>Can you stay 'calm'?",
      "緊急事態は、いつも突然やってきます。<br class=\"lg:hidden\" />パニックになるのは、あなたが弱いからではなく、「何をすべきか」が明確でないからです。":
        "Emergencies always arrive without warning. Panicking is not because you are weak — it is because 'what to do' is not yet clear in your mind.",
      "最初の数分間。その短時間の行動が、利用者の命の行方を左右します。医療職ではないあなたにしかできない「救命のバトン」があるのです。":
        "The first few minutes. The actions taken in that short time determine the fate of a resident's life. There is a 'lifesaving baton' that only you — not a medical professional — can carry.",
      "この研修は、いざという時に「動ける自分」になるための、最強の備えです。":
        "This training is the ultimate preparation for becoming someone who can 'take action' when it truly matters.",
    },
  },
  {
    id: "cmlz3nrnb009itcsooelgw2d9", // Privacy and Personal Information Protection Training
    replacements: {
      "プライバシー保護研修": "Privacy Protection Training",
      "「あなたの何気ないSNS投稿が、<br/>利用者の人生を変えてしまうかもしれません。」":
        '"Your casual social media post<br/>may change a resident\'s life forever."',
      "介護の仕事は、利用者の「最もプライベートな空間」に踏み込む仕事です。<br class=\"lg:hidden\" />私たちが知り得る情報は、本来、誰にも知られたくない大切な秘密です。":
        "Care work involves stepping into the 'most private space' of residents' lives. The information we come to know is, by nature, a precious secret that no one wants revealed.",
      "一度流出した情報は、二度と消せません。「信頼」を築くには何年もかかりますが、壊れるのは一瞬です。情報のプロとして、正しい知識を身につけましょう。":
        "Once information is leaked, it can never be erased. Building 'trust' takes years, but it can be destroyed in an instant. As an information professional, equip yourself with the right knowledge.",
      "この研修は、利用者とあなた自身の人生を守るための「情報の砦」を築くためのものです。":
        "This training is designed to build an 'information fortress' to protect both residents and your own life.",
    },
  },
  {
    id: "cmlz3nsh200bbtcsojfuwi10g", // Ethics and Legal Compliance Training
    replacements: {
      "倫理・法令遵守研修": "Ethics and Legal Compliance Training",
      "「これくらいならいいだろう」という甘い罠。<br/>その一歩が、利用者の人生を損なうかもしれません。":
        'The sweet trap of "this much should be fine."<br/>That one step may harm a resident\'s life.',
      "介護の仕事は、他者の人生に深く介入する「権力」を伴う仕事です。<br class=\"lg:hidden\" />私たちの「慣れ」や「慢心」は、時に利用者の尊厳を傷つける武器に変わります。":
        "Care work carries a 'power' that deeply intervenes in others' lives. Our 'complacency' and 'overconfidence' can sometimes become weapons that wound residents' dignity.",
      "ルールを守ることは、利用者を守ること、そしてあなた自身のプロとしてのキャリアを守ることです。誇りある誠実なケアのために、今一度、倫理の原点に立ち返りましょう。":
        "Following the rules means protecting residents and protecting your own professional career. For the sake of proud and sincere care, let's return together to the foundations of ethics.",
      "この研修は、迷った時の「正しい判断軸」を自分の中に育てるためのものです。":
        "This training is designed to cultivate your own 'correct decision-making compass' for moments of uncertainty.",
    },
  },
  {
    id: "cmlz3nta500d6tcsoyl3bwv3p", // Hospitality and Etiquette Training
    replacements: {
      "接遇・マナー研修": "Hospitality and Etiquette Training",
      "「技術は一流、でも接遇は二流。<br/>あなたはどちらからケアを受けたいですか？」":
        '"World-class skills, but second-rate hospitality.<br/>Which would you rather receive care from?"',
      "どんなに完璧な介助技術を持っていても、言葉遣いや態度一つで、利用者の心は閉ざされてしまいます。":
        "No matter how perfect your care techniques, a single choice of words or attitude can cause a resident's heart to close off.",
      "接遇とは単なる「お作法」ではありません。目の前の人の「尊厳」を認め、敬意を払う心の現れが、介助をスムーズにし、施設を温かい「家」に変えるのです。":
        "Hospitality is not mere 'etiquette.' It is the expression of recognizing the 'dignity' of the person before you — this smooths care interactions and transforms the facility into a warm 'home.'",
      "プロとしての品格を磨き、利用者から「あなたで良かった」と選ばれる存在になりましょう。":
        "Polish your professional character and become someone residents choose, saying 'I'm glad it was you.'",
    },
  },
  {
    id: "cmlz3nu6v00f1tcso83zoq6vp", // Disaster Preparedness and Drill Training
    replacements: {
      "災害対策研修": "Disaster Preparedness Training",
      "「その時、あなたは利用者の手を<br/>離さずにいられますか？」":
        '"In that moment, will you be able to hold<br/>a resident\'s hand without letting go?"',
      "災害は選べませんが、私たちの「備え」は選ぶことができます。<br class=\"lg:hidden\" />パニックを最小限に抑えるのは、訓練と計画（BCP）だけです。":
        "We cannot choose when disasters strike, but we can choose our 'preparation.' Only training and planning (BCP) can minimize panic.",
      "施設は地域の「最後の砦」です。救命から避難生活まで、利用者の命を守り抜くプロとしての対応力を磨きましょう。":
        "The facility is the 'last stronghold' of the community. From lifesaving to evacuation living, let's hone your capabilities as a professional who protects residents' lives through it all.",
      "想定外を想定内に変える「生き残るための知恵」を習得しましょう。":
        "Let's acquire the 'wisdom to survive' that turns the unexpected into the expected.",
    },
  },
  {
    id: "cmlz3nuzv00gvtcsontxvy77f", // Physical Restraint Abolition and Prevention Training
    replacements: {
      "身体拘束廃止研修": "Physical Restraint Abolition Training",
      "「安全のため」という言葉が、<br/>誰かの自由を奪っていませんか？":
        "Is the phrase 'for safety'<br/>taking away someone's freedom?",
      "身体拘束は、単なる「動作の制限」ではありません。それは、その方の「尊厳」と「生きる意欲」を根底から壊す行為です。":
        "Physical restraint is not merely a 'restriction of movement.' It is an act that fundamentally destroys a person's 'dignity' and 'will to live.'",
      "一度始めた拘束は、麻薬のように日常化します。2024年度の運営基準では、拘束廃止への取り組みがさらに厳格化されました。縛らないケアは、知識とチーム力で必ず実現できます。":
        "Once started, restraint becomes routine like a dependency. The 2024 operational standards have further tightened the requirements for restraint abolition. Restraint-free care can absolutely be achieved with knowledge and team strength.",
      "この研修は、拘束の連鎖を断ち切り、本当の安心を創るためのものです。":
        "This training is designed to break the chain of restraint and create true peace of mind.",
    },
  },
  {
    id: "cmlz3nvs300iqtcsououu72jp", // Medical Care Training
    replacements: {
      "医療制定ケア・喀痰吸引": "Medical Care and Sputum Suctioning",
      "利用者の「静かなSOS」を<br/>見逃していませんか？":
        "Are you missing residents'<br/>'silent SOS'?",
      "バイタル数値には現れない、ほんの少しの「活気のなさ」や「呼吸の浅さ」。<br class=\"lg:hidden\" />それは身体が発している切実な異変のサインかもしれません。":
        "A slight 'lack of vitality' or 'shallow breathing' that doesn't show up in vital sign numbers — it may be a desperate sign of change that the body is sending.",
      "私たちは医師ではありません。しかし、24時間その方に寄り添う私たちにしか気づけない「変化」があります。医療職へ確実なバトンを繋ぐ、観察のプロを目指しましょう。":
        "We are not doctors. However, there are 'changes' that only we — who are alongside residents 24 hours a day — can notice. Let's aim to become observation professionals who reliably pass the baton to medical staff.",
      "2024年度、医療的ケアの安全確保は全ての事業所に求められる必須スキルです。":
        "In fiscal year 2024, ensuring the safety of medical care is an essential skill required of all facilities.",
    },
  },
  {
    id: "cmlz3nwks00khtcson00f0ds7", // End-of-Life and Terminal Care Training
    replacements: {
      "看取り・ターミナルケア": "End-of-Life and Terminal Care",
      "「最期まで自分らしく」を支える、<br/>人生のフィナーレに伴走する。":
        "Supporting 'living true to oneself until the very end,'<br/>walking alongside life's finale.",
      "看取りは、死を待つ時間ではありません。最期までその人らしく「今を生きる」時間を支える、究極のケアです。":
        "End-of-life care is not a time of waiting for death. It is the ultimate care — supporting a person to 'live in the present' in their own way until the very end.",
      "ご本人の意向、ご家族の葛藤。そのすべてを包み込み、迷いながらも共に進む。介護職にしかできない「温かな看取り」のカタチを学びましょう。":
        "The resident's wishes, the family's struggles — embracing all of it and moving forward together, even amid uncertainty. Let's learn the form of 'warm end-of-life care' that only care professionals can provide.",
      "この研修は、尊厳ある旅立ちを支えるための「心の地図」を描くためのものです。":
        "This training is designed to draw a 'map of the heart' to support a dignified final journey.",
    },
  },
  {
    id: "cmlz3nxbf00m6tcsoq71gg0hy", // Mental and Emotional Care Training
    replacements: {
      "精神的ケア研修": "Mental and Emotional Care Training",
      "一生懸命なあなたほど、<br/>自分の「心の悲鳴」を無視していませんか？":
        "The harder you work,<br/>the more you may be ignoring your own 'heart's cry.'",
      "介護は心を削る「感情労働」です。あなたの心のコップが溢れそうなとき、良いケアは生まれません。":
        "Care work is 'emotional labor' that wears down the heart. When your emotional cup is about to overflow, good care cannot emerge.",
      "精神的ケアとは、相手を変えることではなく、ありのままの感情を認め、安心の居場所を共に作ること。そして、自分自身をケアする「技術」を学ぶことです。":
        "Mental and emotional care is not about changing others — it is about acknowledging feelings as they are and creating a safe space together. And it means learning the 'skill' of caring for yourself.",
      "この研修は、利用者とあなたの心を「人格の尊重」で繋ぐためのものです。":
        "This training is designed to connect residents and your own hearts through 'respect for personhood.'",
    },
  },
  {
    id: "cmlz3ny5n00o2tcsodfyyh5bj", // Care Prevention and Independence Support Training
    replacements: {
      "介護予防・自立支援研修": "Care Prevention and Independence Support Training",
      "「お世話」が利用者の<br/>力を奪っていませんか？":
        "Is 'helping' taking away<br/>residents' strength?",
      "良かれと思って先回りして手助けすることが、<br class=\"lg:hidden\" />実は利用者の「できること」を<br class=\"lg:hidden\" />減らしてしまっているかもしれません。":
        "Anticipating needs and helping with good intentions may actually be reducing what residents are able to do for themselves.",
      "介護予防の本質は、単に機能を維持することではなく、その人が「その人らしく」輝き続けるための意欲を支えることにあります。":
        "The essence of care prevention is not simply maintaining function — it is supporting the motivation for a person to continue shining in their own unique way.",
      "プロとして、利用者の「持てる力」を最大限に引き出す視点を身につけましょう。":
        "As a professional, develop the perspective to draw out the fullest potential of residents' existing strengths.",
    },
  },
  {
    id: "cmlz3nyyk00q8tcsosm4kx3gs", // Harassment Prevention Training
    replacements: {
      "ハラスメント対策研修": "Harassment Prevention Training",
      "「その言動、<br class=\"lg:hidden\"/>相手はどう感じていますか？\"":
        '"How do you think the other person<br class="lg:hidden"/>feels about that behavior?"',
      "「熱心な指導のつもりだった」「冗談のつもりだった」<br/>その主観が、知らぬ間に誰かの尊厳を傷つけ、<br class=\"lg:hidden\" />職場を破壊しているかもしれません。":
        '"I thought I was giving enthusiastic guidance." "I thought it was just a joke."<br/>Those subjective intentions may, without your knowing, be wounding someone\'s dignity and destroying the workplace.',
      "ハラスメントは個人の尊厳を傷つけるだけでなく、離職の連鎖やケアの質の低下を招く、組織にとっての「猛毒」です。放置すれば、積み上げてきた信頼は一瞬で崩れ去ります。":
        "Harassment not only wounds individual dignity — it triggers a chain of resignations and a decline in care quality, acting as 'deadly poison' for the organization. If left unaddressed, trust built up over years can crumble in an instant.",
      "2024年度からの義務化に伴い、今、全ての職員に<br/>「正しく恐れ、正しく振る舞う」知性が求められています。":
        'With the mandatory implementation from fiscal year 2024, all staff are now required<br/>to have the intelligence to "fear correctly and behave correctly."',
    },
  },
];

async function main() {
  console.log("Starting introduction translation updates...");

  for (const course of courses) {
    const current = await prisma.course.findUnique({
      where: { id: course.id },
      select: { introduction: true, titleEn: true },
    });

    if (!current) {
      console.warn(`Course not found: ${course.id}`);
      continue;
    }

    const introductionEn = replaceInHtml(
      current.introduction ?? "",
      course.replacements
    );

    await prisma.course.update({
      where: { id: course.id },
      data: { introductionEn },
    });

    console.log(`✓ ${current.titleEn}`);
  }

  await prisma.$disconnect();
  console.log("Done!");
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
