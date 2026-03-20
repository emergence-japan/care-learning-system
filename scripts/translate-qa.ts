import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Question translations: { id: [textEn, explanationEn] }
const questionTranslations: Record<string, [string, string]> = {
  // ===== 高齢者虐待防止 =====
  "cmmelatyc000qtc98d7og2sgf": [
    "Which of the following actions constitutes 'inappropriate care (seeds of abuse)' that damages a resident's self-esteem in daily care?",
    "Silently moving someone's wheelchair without warning is a classic example of 'inappropriate care' — it ignores the resident's autonomy and causes anxiety and fear.",
  ],
  "cmmelatyc000vtc98jhvfstlz": [
    "Which category is NOT included in the '5 types of abuse' defined by the Elder Abuse Prevention Act?",
    "Self-neglect is a serious issue, but it is not included in the legally defined '5 types of abuse by care workers'.",
  ],
  "cmmelatyc0010tc987tgvlbuv": [
    "What is the correct combination of the '3 conditions' under which physical restraint is exceptionally permitted?",
    "All three conditions are required: imminence (danger to life), non-substitutability (no other means), and temporariness (short duration).",
  ],
  "cmmelatyd0015tc98phgh71o9": [
    "Which of the following is a correct example of 'inappropriate restraint' constituting physical abuse?",
    "Surrounding a bed with four rails completely restricts the resident's movement and constitutes physical restraint.",
  ],
  "cmmelatyd001atc98rd3dr6o0": [
    "Using phrases like 'Wait a moment' to restrict a resident's movement — known as 'speech lock' — is most likely to lead to which type of abuse?",
    "Verbal restriction of movement is a gateway to psychological abuse and physical abuse (physical restraint).",
  ],
  "cmmelatyd001ftc98upasimea": [
    "Which of the following is a correct description of neglect (care abandonment)?",
    "Intentionally ignoring nurse call buttons or allowing unsanitary conditions by neglecting toileting are typical examples.",
  ],
  "cmmelatye001ktc98tqsgp1jw": [
    "Which of the following is an example of 'improper handling of assets' constituting financial abuse?",
    "Using a resident's pension or savings without their consent — by family or staff — constitutes financial abuse.",
  ],
  "cmmelatye001ptc98c38qgqxy": [
    "What is the most appropriate response upon discovering a 'suspected' case of abuse?",
    "Even without definitive evidence, there is a legal obligation to report to the municipality at the stage of suspicion.",
  ],
  "cmmelatye001utc986w8xzq2f": [
    "When abuse is discovered, who is the legally mandated reporting destination?",
    "Under the Elder Abuse Prevention Act, reporting to the 'municipality' is legally required.",
  ],
  "cmmelatyf001ztc98aaaqud3o": [
    "Which of the following is NOT among the items that must be documented when physical restraint is applied?",
    "There is a legal obligation to document the manner, duration, reason, and efforts toward removal of restraint — but a personal reflection essay is not required.",
  ],

  // ===== 認知症ケア =====
  "cmmelava4002ttc98uo1cm96g": [
    "What is the most emphasized concept in the 'Dementia Basic Act' enacted in 2024?",
    "The pillars of the law are 'realizing an inclusive society' and 'preserving the individual's dignity'.",
  ],
  "cmmelava5002xtc98cifxl23r": [
    "What is the appropriate response to a resident with memory impairment who forgets events that just happened?",
    "Forgetting is a symptom caused by a brain disorder — scolding does not help. The priority is to provide a sense of security.",
  ],
  "cmmelava50031tc98rvwp0nrt": [
    "What should be considered first as a major contributing factor to the development of BPSD (behavioral and psychological symptoms of dementia)?",
    "Physical discomfort such as constipation or pain, or environmental unpleasantness, are major triggers of BPSD.",
  ],
  "cmmelava50035tc98lklvf91s": [
    "For a resident with disorientation who says 'I want to go home' in the evening, which reason is unlikely?",
    "It is usually not stubbornness — rather, anxiety from not knowing where they are, or a sense of responsibility based on past memories, is the cause.",
  ],
  "cmmelava50039tc98o8xe6w1j": [
    "What is it called when you infer a person's wishes and support them in making choices in their own way?",
    "This is called 'supported decision-making,' and it is the most fundamental principle of dementia care.",
  ],
  "cmmelava5003dtc98dnjeygdp": [
    "Which of the following is NOT included in the '3 don'ts' of communication with people with dementia?",
    "The 3 principles are: don't startle, don't rush, don't deny.",
  ],
  "cmmelava5003itc98qeqa0rm0": [
    "What is an effective approach to help a resident with dementia recognize food during meals?",
    "Increasing the color contrast of tableware helps organize visual information and makes food recognition easier.",
  ],
  "cmmelava6003mtc98n75u25dt": [
    "When speaking to a resident who refuses to bathe, which approach is more professionally appropriate?",
    "When the word 'bath' triggers resistance, choose words that evoke comfort — such as 'Would you like to feel refreshed?'",
  ],
  "cmmelava6003qtc9806c5wwxh": [
    "When a resident with dementia is panicking, what should be your first approach?",
    "First, get down to eye level and convey a sense of calm security with a gentle smile.",
  ],
  "cmmelava6003utc98lt6bkkff": [
    "In supported decision-making, why is it important to respect a person's past history and cherished values?",
    "It is essential to preserve the person's 'sense of self (identity)' and protect their dignity.",
  ],
  "cmmelava6003xtc98robqlbkr": [
    // extra choice — skip (not a question)
    "dummy", "dummy",
  ],

  // ===== 感染症・食中毒予防 =====
  "cmmelawh4004ntc98vgfs4uhr": [
    "What is the fundamental concept of treating every resident as a potential source of infection?",
    "This is called 'Standard Precautions' and is the foundation of modern infection control.",
  ],
  "cmmelawh4004rtc98txupaf1o": [
    "Which virus, common in winter, is largely unaffected by regular alcohol disinfectants?",
    "Norovirus is resistant to alcohol, so disinfection with sodium hypochlorite is essential.",
  ],
  "cmmelawh4004vtc98m6egab6m": [
    "When washing hands with soap, what is the minimum time needed to adequately remove viruses?",
    "Washing carefully for at least 30 seconds can physically rinse away viruses.",
  ],
  "cmmelawh4004ztc987tthoer7": [
    "When removing personal protective equipment (PPE), which item should be removed first because it is most heavily contaminated?",
    "Gloves, which have the most direct contact with contaminants, should be removed first, followed by the gown, then the mask.",
  ],
  "cmmelawh50054tc98xig37cvg": [
    "When handling vomit from a norovirus patient, what condition is most important to avoid?",
    "Allowing the contaminated area to dry causes the virus to become airborne and can lead to inhalation infection. Always keep it moist during cleanup.",
  ],
  "cmmelawh50058tc98i74yio9s": [
    "Among the 3 principles of food poisoning prevention, which does 'heating at 75°C for at least 1 minute' correspond to?",
    "Among 'don't contaminate, don't multiply, eliminate' — heating corresponds to 'eliminate (sterilize)'.",
  ],
  "cmmelawh6005ctc985k384q8n": [
    "For diseases that spread through the air (tuberculosis, measles, etc.), what is the most effective environmental measure?",
    "Ventilation is most important to expel airborne particles.",
  ],
  "cmmelawh6005gtc98gcujf9ea": [
    "In an infection control BCP (business continuity plan), which tasks should be suspended or postponed when staffing is insufficient?",
    "Non-life-critical activities such as recreational events should be suspended, with priority given to physical care.",
  ],
  "cmmelawh6005ktc989kox9wil": [
    "If you feel unwell with fever or diarrhea, what is the professional course of action?",
    "Coming in while sick can cause a cluster outbreak. Immediately report and await instructions — that is the correct response.",
  ],
  "cmmelawh6005otc98xz0hfquv": [
    "Which of the following is an INCORRECT statement about precautions when using sodium hypochlorite?",
    "Sodium hypochlorite is too irritating for direct use on skin/hands — it must not be used as a hand disinfectant.",
  ],

  // ===== 事故発生防止 =====
  "cmmelaxzj006htc98ptowzeb2": [
    "According to Heinrich's Law, how many 'near-miss incidents' are said to exist behind 1 serious accident?",
    "Known as the '1:29:300 rule,' 300 near-miss incidents are said to precede 1 serious accident.",
  ],
  "cmmelaxzj006ltc989nolbef1": [
    "Under the 2024 operational standards, which organization is required to be established for accident prevention?",
    "An Accident Prevention Committee must be established and convened at least once every 3 months.",
  ],
  "cmmelaxzj006ptc98lr0nre4c": [
    "Which type of accident has the highest frequency and the highest risk of serious injury such as fractures in elderly care facilities?",
    "Falls are the most frequent and carry a high risk of significantly reducing quality of life (ADL).",
  ],
  "cmmelaxzj006ttc98k4kbbsjm": [
    "What is the most appropriate posture to prevent aspiration during meals?",
    "Placing the feet flat on the floor and tucking the chin reduces the risk of aspiration.",
  ],
  "cmmelaxzj006xtc98hctovoez": [
    "When an accident occurs, what is the first priority for staff?",
    "Above all else, providing first aid to ensure the resident's safety is the top priority.",
  ],
  "cmmelaxzj0071tc98vcmkkoh6": [
    "Which of the following is an inappropriate view of the purpose of an accident report?",
    "Reports are written for recurrence prevention and information sharing — not to hold individuals responsible.",
  ],
  "cmmelaxzj0075tc98yb26xjpk": [
    "What is the analytical method of repeatedly asking 'why' to examine the cause of an incident called?",
    "Called 'Why-Why Analysis,' it is effective for tracing back to root causes (environment or systems).",
  ],
  "cmmelaxzj0079tc98d7w15b11": [
    "Who must the facility report to when a serious accident occurs?",
    "Reporting to the municipality (insurer) is a legally mandated obligation under operational standards.",
  ],
  "cmmelaxzk007dtc9896t563x6": [
    "What check must always be performed during transfer assistance to prevent falls from a wheelchair?",
    "Always confirm that the brakes on both wheels are locked so the wheelchair cannot move during the transfer.",
  ],
  "cmmelaxzk007htc98f1mgdf91": [
    "In the '5S' accident prevention framework, which 'S' involves tidying up unnecessary items that cause tripping?",
    "'Seiri (Sort)' involves separating necessary items from unnecessary ones and disposing of the unnecessary.",
  ],

  // ===== 緊急時対応 =====
  "cmmelazjy0089tc98g4i9ft1k": [
    "When the first responder discovers a resident collapsed on the floor, what should they do first?",
    "While ensuring your own safety, call loudly for nearby staff to assist.",
  ],
  "cmmelazjy008dtc98fmue4e8f": [
    "When checking the breathing of an unconscious resident, within how many seconds must a decision be made?",
    "Breathing should be assessed within 10 seconds; if uncertain, treat as 'no breathing' and begin intervention.",
  ],
  "cmmelazjy008htc98g5q4ga6i": [
    "What is the recommended tempo for chest compressions per minute?",
    "Continuous compressions at a rapid pace of 100–120 times per minute are essential.",
  ],
  "cmmelazjy008ltc98fbcpm9ze": [
    "When using an AED (automated external defibrillator), what is the most important priority?",
    "After turning it on, following the voice guidance instructions is the safest and most reliable approach.",
  ],
  "cmmelazjy008ptc984uuh4gym": [
    "If a resident is choking (airway obstruction) and is conscious, what is the first intervention?",
    "Perform back blows — striking the back firmly with the heel of your hand — to attempt removal of the foreign object.",
  ],
  "cmmelazjy008ttc98fn468t4f": [
    "When calling 119 for emergency services, which piece of information is INAPPROPRIATE to convey?",
    "Information irrelevant to the emergency (like the day's menu) is unnecessary. Prioritize the resident's condition, address, and other emergency information.",
  ],
  "cmmelazjy008xtc98zkmvf78m": [
    "If cardiac arrest is suspected, approximately what percentage does the survival rate decrease for every 1-minute delay in starting treatment?",
    "The survival rate drops by approximately 7–10% for every minute of delay, making immediate intervention critical.",
  ],
  "cmmelazjy0091tc98migm7aln": [
    "In a resident who has suffered a head injury, which is a high-urgency 'red flag' sign?",
    "Repeated vomiting suggests possible intracranial bleeding and is an extremely urgent sign.",
  ],
  "cmmelazjy0095tc9863mhnpqh": [
    "Which of the following responses to a resident having a seizure is INAPPROPRIATE?",
    "Inserting a towel or object into the mouth can cause choking or injury — this practice is no longer recommended.",
  ],
  "cmmelazjy0099tc98dki9433g": [
    "If a resident who has expressed a DNAR (do not attempt resuscitation) wish is choking, what is the correct response?",
    "Accidental events (choking, falls, etc.) are often outside the scope of DNAR, and first aid should generally be performed.",
  ],

  // ===== プライバシー保護 =====
  "cmmelb0tv00a1tc98y803pxkx": [
    "Which is the legally correct explanation of the scope of the 'duty of confidentiality'?",
    "Secrets learned in the course of work must not be disclosed even after retirement — the obligation is lifelong.",
  ],
  "cmmelb0tv00a5tc98hca51y4y": [
    "What is the most appropriate precaution regarding SNS use?",
    "Even without naming someone, there is a risk of identification through background details or circumstances — posts must be made with extreme care.",
  ],
  "cmmelb0tv00a9tc989ton3b0a": [
    "If you want to take a photo of a cute resident, what is the correct action?",
    "Taking photos on personal devices carries a high risk of data leakage and is prohibited. Always use a work-issued device.",
  ],
  "cmmelb0tv00adtc989nmi02cc": [
    "What is the correct method for properly disposing of personal information?",
    "Documents containing real names must be processed using a shredder or similar method to make them unreadable — disposing of them as-is risks leakage.",
  ],
  "cmmelb0tv00ahtc98ny9xw3ku": [
    "Why is it inappropriate to discuss a resident's condition with a colleague in an elevator?",
    "There is a risk of leaking information to unspecified third parties, as you cannot know who may be listening.",
  ],
  "cmmelb0tv00altc98hdnei234": [
    "What is the correct view on taking work materials home?",
    "Removing materials without permission is a serious violation regardless of the reason — it creates a significant risk of information leakage (contract breach).",
  ],
  "cmmelb0tv00aptc981zw2a0ol": [
    "When an information leak is discovered, what is the first priority?",
    "Without concealing the facts, immediately report to management so the organization can take action — this is the top priority.",
  ],
  "cmmelb0tv00attc98tfi930bo": [
    "When a family member (not the key contact) calls to ask about a resident's condition, how should you respond?",
    "Even for relatives, there are defined limits on what information can be shared — respond carefully after verifying.",
  ],
  "cmmelb0tv00axtc98nndrafpd": [
    "When you need to leave your PC while entering records, what must you always do?",
    "Immediately lock the screen using a shortcut key (e.g., Win+L) to prevent others from viewing it.",
  ],
  "cmmelb0tv00b1tc98b5ye26jr": [
    "What is the most fundamental principle under the Act on the Protection of Personal Information?",
    "The basic principle is to clearly specify the purpose of use and only use the information within that scope.",
  ],

  // ===== 倫理・法令遵守 =====
  "cmmelb21o00butc98abvv4wsb": [
    "Which explanation correctly distinguishes between 'compliance (law-abiding)' and 'ethics'?",
    "Compliance refers to the minimum rules (law) that must be followed, while ethics is a higher standard of conduct based on right/wrong and integrity.",
  ],
  "cmmelb21p00bytc98agcuze1b": [
    "When a resident or family member offers a tip (cash), what is the professional response?",
    "To prevent unfairness among residents and avoid trouble, politely but firmly decline — this is standard practice.",
  ],
  "cmmelb21p00c2tc989ehx8ifw": [
    "What is the problem with calling residents by a nickname like '-chan' or speaking to them informally?",
    "This undermines an equal relationship and creates a psychological tendency to look down on the other person, which can lower the barrier to abuse.",
  ],
  "cmmelb21p00c6tc98q9hwwj74": [
    "If fraudulent billing (falsified records, etc.) is discovered, what is the most severe penalty a facility can face?",
    "Fraudulent billing is a serious legal violation and can result in revocation of certification (facility closure).",
  ],
  "cmmelb21p00catc984bdc9hiv": [
    "What is the most important criterion for determining whether harassment (power harassment, sexual harassment) has occurred?",
    "Regardless of the perpetrator's intent, the standard is whether the recipient felt uncomfortable and had their dignity damaged.",
  ],
  "cmmelb21p00cetc98q30m5g3w": [
    "What is the correct legal interpretation of the 'duty of confidentiality'?",
    "The obligation to maintain the confidentiality of information obtained through work continues for life, even after retirement.",
  ],
  "cmmelb21p00citc982y5yhmxa": [
    "Which of the following is NOT included in the '3 conditions' required to justify physical restraint under the law?",
    "The 3 conditions are 'imminence, non-substitutability, and temporariness' — staff shortages are not a valid reason.",
  ],
  "cmmelb21p00cntc98gie7qmrq": [
    "When you discover a colleague engaging in inappropriate conduct (abuse, fraud, etc.), what is the correct attitude?",
    "Turning a blind eye leads to organizational misconduct. Use the internal reporting system to report correctly — this is an obligation.",
  ],
  "cmmelb21p00crtc985blhr6p1": [
    "In supported decision-making, what must care workers be most mindful of?",
    "It is important not to impose your own values, but to fully respect and support the resident's wishes.",
  ],
  "cmmelb21p00cvtc986r3tjldg": [
    "Under the 2024 operational standards, what has been made mandatory for legal compliance?",
    "Establishing a compliance framework, including formulating guidelines and setting up reporting channels, has been made mandatory.",
  ],

  // ===== 接遇・マナー =====
  "cmmelb37900dptc985h40f2rt": [
    "What is the most appropriate purpose of the 5 principles of hospitality (greeting, expression, appearance, language, attitude)?",
    "The purpose of hospitality is not mere formality — it is to demonstrate respect and dignity toward others through one's behavior.",
  ],
  "cmmelb37900dttc98w4dzsydw": [
    "What is the main reason that greeting someone while multitasking ('distracted greeting') is considered inappropriate?",
    "A greeting without eye contact conveys the message 'you are not important to me' — it comes across as rejection.",
  ],
  "cmmelb37900dxtc9823526rak": [
    "What is the danger of calling residents by their first name without honorifics or using a childish nickname?",
    "Inappropriate forms of address undermine an equal relationship and can lower the psychological barrier to abuse.",
  ],
  "cmmelb37900e1tc98fw6wya7z": [
    "What is it called when a resident's actions are restricted by saying things like 'Just wait!'?",
    "This is called 'speech lock (verbal restraint)' and is considered inappropriate care on par with physical restraint.",
  ],
  "cmmelb37900e5tc986d5ino5o": [
    "What is the benefit of rephrasing negative expressions like 'Please don't do that' into positive ones?",
    "Positive language (e.g., 'Let's stay seated') is easier for the brain to process and more likely to create a sense of security.",
  ],
  "cmmelb37900e9tc985ve02dr4": [
    "What are the softening words added to a request or refusal to cushion the impact called?",
    "Expressions like 'I'm sorry to trouble you' or 'If it's convenient' are called 'cushion words'.",
  ],
  "cmmelb37900edtc98jy4h1ke1": [
    "Which of the following is an INAPPROPRIATE attitude for active listening?",
    "Interrupting someone mid-conversation to share your own opinion is not active listening. The priority is to listen through to the end.",
  ],
  "cmmelb37900ehtc985913y6ag": [
    "What is the appropriate eye level when speaking with a resident with dementia?",
    "To avoid giving a sense of intimidation, align your gaze at the same level or slightly lower than the resident's.",
  ],
  "cmmelb37900eltc98iq7m5f30": [
    "What is the professionally appropriate attitude when receiving visitors (family or external specialists)?",
    "As the face of the facility, stop what you are doing, stand up, and greet them with respect.",
  ],
  "cmmelb37900eptc988y0f3cq6": [
    "In telephone etiquette, what is 'egoe (smiling voice)' that puts the other party at ease?",
    "Even when your face can't be seen, a bright and warm tone of voice that conveys your smile.",
  ],

  // ===== 災害対策 =====
  "cmmelb4f400fitc98c8ue1w18": [
    "In disaster response, what does 'mutual aid (kyojo)' refer to?",
    "It refers to staff, facilities, and nearby residents helping each other — a key element of facility disaster preparedness.",
  ],
  "cmmelb4f400fmtc98s5w9l0um": [
    "During a fire, when should you give up on initial firefighting with an extinguisher and focus on evacuation?",
    "When flames reach the ceiling, initial firefighting has exceeded its limit — immediately switch to evacuating and guiding residents.",
  ],
  "cmmelb4f400fqtc987ex3gxe7": [
    "In the event of potential flooding, at what alert level should an elderly care facility begin evacuation?",
    "'Warning Level 3 (Evacuation for Elderly Persons Etc.)' is the point at which facilities must begin evacuation.",
  ],
  "cmmelb4f500futc982n2q1hxm": [
    "In a disaster BCP (business continuity plan), which tasks should be prioritized when staffing and supplies are insufficient?",
    "Life-sustaining care such as rescue, meals, toileting, and medication must be the top priority.",
  ],
  "cmmelb4f500fytc98i0unxrlw": [
    "What are the 3 actions of 'ShakeOut' recommended as initial response immediately after an earthquake?",
    "The basic actions are: 'Drop low,' 'Cover your head,' and 'Hold on until shaking stops.'",
  ],
  "cmmelb4f500g2tc98ibbyk1ya": [
    "Which telephone service is effective for confirming the safety of staff and family during a disaster?",
    "'171 (Disaster Message Dial)' is an effective message board when calls to affected areas are hard to connect.",
  ],
  "cmmelb4f500g6tc982sxza846": [
    "What is the plan that has been made mandatory for all care facilities from 2024 to ensure operations continue after a disaster?",
    "Called BCP (Business Continuity Plan), formulation of this plan has been made mandatory for all facilities.",
  ],
  "cmmelb4f500gatc98v5qdp2f4": [
    "When outdoor evacuation is difficult during flooding, what is it called when you move to the 2nd floor or higher within the building?",
    "Moving vertically within a building is called 'vertical evacuation' and is effective in cases of sudden flooding.",
  ],
  "cmmelb4f500getc98ymt9edyn": [
    "During evacuation living, what is the serious condition where blood clots form in leg veins and travel to the lungs?",
    "'Economy class syndrome' caused by sitting in the same position for long periods is one cause of death during evacuation.",
  ],
  "cmmelb4f500gitc98o43fedhr": [
    "How many days' worth of emergency food and water is recommended as the minimum stockpile for a care facility?",
    "A minimum of 3 days' worth of supplies is strongly recommended to sustain operations until relief arrives.",
  ],

  // ===== 身体拘束廃止 =====
  "cmmelb5r300hbtc98q1bfzfmg": [
    "Which of the following is a correct example of the physical harm caused by physical restraint?",
    "Being immobilized by restraint leads to decreased muscle strength and bone density, worsening a bedridden condition.",
  ],
  "cmmelb5r300hftc98qlg8rm9c": [
    "Which of the following is included in the '11 items' of physical restraint defined by the Ministry of Health, Labour and Welfare?",
    "Surrounding a bed with four rails so the resident cannot get out independently is a representative example of physical restraint.",
  ],
  "cmmelb5r300hjtc98ww3g227s": [
    "Which of the following is NOT included in the '3 conditions' that must be met to exceptionally apply physical restraint?",
    "The 3 conditions are 'imminence, non-substitutability, and temporariness' — staff shortages are not a valid justification.",
  ],
  "cmmelb5r300hotc9834x5dypt": [
    "How should locking a wheelchair tray table so a resident cannot stand up be evaluated?",
    "This is an act of physically restricting movement and constitutes clear physical restraint.",
  ],
  "cmmelb5r300hstc98w8rlwn1r": [
    "When physical restraint has been applied, even temporarily, what is the legal obligation of the facility?",
    "There is a legal obligation to document and retain detailed records of the manner, duration, reason, and other specifics.",
  ],
  "cmmelb5r300hwtc98i1uyg37g": [
    "What is it called when medication is used to suppress activity beyond its intended therapeutic purpose?",
    "Called 'drug lock (chemical restraint),' this is considered a form of serious physical restraint.",
  ],
  "cmmelb5r300i0tc9811f1rt2n": [
    "Which of the following is an environmental measure that serves as an alternative to restraint?",
    "Using a low-height bed and impact-absorbing mats to cushion falls allows side rails to be removed.",
  ],
  "cmmelb5r400i4tc98buzl9sg7": [
    "What organization is required to be established within a facility to work toward abolishing physical restraint?",
    "Establishment of a Physical Restraint Optimization Committee (or Abolition Committee) is legally required.",
  ],
  "cmmelb5r400i8tc98leb13mee": [
    "Which of the following is the most appropriate example of the 'psychological' harm caused by physical restraint?",
    "The humiliation and despair of being restrained can worsen symptoms of dementia (BPSD).",
  ],
  "cmmelb5r400ictc98o0zpw5r4": [
    "What is the most important concept for achieving restraint-free care?",
    "It is important for a multidisciplinary team to consider 'why the person wants to move' and find alternative approaches.",
  ],

  // ===== 医療的ケア =====
  "cmmelb71d00j5tc98p6prjanp": [
    "In vital signs for elderly patients, which body temperature is considered a sign of serious deterioration?",
    "A low body temperature in the 35°C range is a dangerous sign indicating serious infection or severe immune suppression.",
  ],
  "cmmelb71i00j9tc984x8ydgle": [
    "What is the appropriate maximum duration for a single suctioning session during sputum suctioning?",
    "To prevent hypoxia, each suctioning session should be completed within 15 seconds.",
  ],
  "cmmelb71j00jdtc98b6gryxo7": [
    "What is the appropriate body position to prevent aspiration and reflux during tube feeding?",
    "Administer tube feeding with the upper body elevated 30–60 degrees (Fowler's position).",
  ],
  "cmmelb71j00jhtc98orlfup15": [
    "What is the most easily noticeable physical sign of dehydration in elderly residents?",
    "Dryness in the armpits and dryness of the oral mucosa are important signs of dehydration.",
  ],
  "cmmelb71j00jltc98by64f4hf": [
    "What does SBAR stand for — the standardized method used to report situations to medical staff?",
    "It stands for Situation, Background, Assessment, and Recommendation.",
  ],
  "cmmelb71j00jptc98zanbmclh": [
    "When a resident receiving insulin complains of cold sweats and hand tremors, what condition should be suspected?",
    "These are typical early symptoms of hypoglycemia, which can lead to loss of consciousness if left untreated.",
  ],
  "cmmelb71j00jttc98wmd9x2c2": [
    "In the Japan Coma Scale (JCS), which digit range indicates that the patient 'opens eyes in response to a call'?",
    "JCS two-digit scores (10, 20, 30) refer to states where the patient awakens in response to a stimulus (call or pain).",
  ],
  "cmmelb71j00jxtc981xdypcps": [
    "What is the most important attitude when care workers write progress notes?",
    "It is important to avoid subjective expressions like 'seemed uncomfortable' and instead record objective facts such as numbers and specific movements.",
  ],
  "cmmelb71k00k1tc986vxrgoh6": [
    "What is the main reason oral care contributes to the prevention of systemic diseases?",
    "Reducing bacteria in the oral cavity can significantly lower the risk of aspiration pneumonia.",
  ],
  "cmmelb71k00k5tc98km6rq1ud": [
    "When edema is detected in a resident, what observation should be made?",
    "Check the severity by pressing with a finger and observing whether the mark remains, and report to medical staff.",
  ],

  // ===== 看取り =====
  "cmmelb87x00kytc98qv7qxjxa": [
    "What is the process of discussing and sharing a person's wishes for medical care and treatment in advance called?",
    "Called ACP (Advance Care Planning), it is also known in Japan by the nickname 'Life Meeting'.",
  ],
  "cmmelb87y00l2tc98pxsmryna": [
    "What is the appropriate view of decreased appetite and fluid intake during the terminal phase?",
    "This is the body's natural preparation for the end of life. Forcing intake can actually cause discomfort (edema, respiratory secretions, etc.).",
  ],
  "cmmelb87y00l6tc98uiej7c1f": [
    "What should care workers do in response to physical pain during the terminal phase?",
    "Assess pain through facial expressions and movements, and promptly report to medical staff for palliative management.",
  ],
  "cmmelb87y00latc98pnebxiun": [
    "What is the irregular, jaw-moving breathing pattern seen as death approaches called?",
    "Called 'agonal breathing' (jaw breathing), this is one important sign that death is imminent.",
  ],
  "cmmelb87y00letc983moop14p": [
    "What is it called when you support bereaved family members in overcoming the grief of losing a loved one?",
    "Called 'grief care,' it is an important part of ongoing support even after bereavement.",
  ],
  "cmmelb87y00litc98f9ztpg9y": [
    "What is the term for an advance directive to decline life-prolonging treatment (refuse resuscitation attempts)?",
    "Called DNAR (Do Not Attempt Resuscitation), this must be shared in advance across the care team.",
  ],
  "cmmelb87y00lmtc981og2n7s1": [
    "What is the most appropriate description of the purpose of post-mortem care (angel care)?",
    "It is an important ritual to protect the dignity of the deceased while supporting the family in preparing emotionally to accept the death.",
  ],
  "cmmelb87y00lqtc9833yjinsd": [
    "What is the appropriate understanding of oral care during the terminal phase?",
    "It is important not only for infection prevention but also to alleviate the discomfort of dry mouth (thirst sensation).",
  ],
  "cmmelb87y00lutc98hsdnd31s": [
    "What is the correct approach to the mental care of care workers after a resident passes away?",
    "End-of-life care has a significant psychological impact on staff — sharing emotions and supporting each other as a team is necessary.",
  ],
  "cmmelb87y00lytc98ujbb0qrz": [
    "What is the most important 'non-verbal' care that care workers should provide in end-of-life care?",
    "Even without words, simply being present, holding the person's hand, and offering a warm gaze provides the greatest sense of security.",
  ],

  // ===== 精神的ケア =====
  "cmmelb9g600mstc98j28sr5f7": [
    "What is the communication technique that focuses on a person's emotions, accepts them without judging the factual accuracy, and responds with empathy?",
    "Called Validation, this is a highly effective technique for restoring self-esteem and reducing anxiety in people with dementia.",
  ],
  "cmmelb9g700mwtc986t6hzf48": [
    "What obligation was strengthened by the 2024 regulatory reform — rejecting uniform management and requiring respect for individual wishes and preferences?",
    "'Respect for personhood' has been made mandatory as the foundation of all care.",
  ],
  "cmmelb9g700n0tc989uynhpt3": [
    "What is the form of labor called in which managing and suppressing one's own emotions while working creates psychological burden?",
    "Called 'emotional labor,' care workers bear a heavy burden of this type and require appropriate support.",
  ],
  "cmmelb9g700n4tc98eb9ba519": [
    "What is it called when team members share their emotions after a difficult case to prevent staff burnout?",
    "Called 'debriefing,' expressing emotions helps maintain mental health.",
  ],
  "cmmelb9g700n8tc988ou275hz": [
    "Which of the following is NOT included in the 4 pillars of Humanitude?",
    "The 4 pillars are 'look,' 'talk,' 'touch,' and 'stand.' 'Scold' is not included.",
  ],
  "cmmelb9g700ndtc981zjmminb": [
    "How should a resident's wish to go home be evaluated — is it appropriate to use logic like 'You can't go home because it's night'?",
    "Logic only amplifies anxiety and does not lead to a resolution. First, accept the emotions behind 'wanting to go home'.",
  ],
  "cmmelb9g700nhtc98jb44eygk": [
    "What is the practice of using techniques such as mindfulness to reduce one's own stress called?",
    "Called 'self-care,' it is an essential skill for care workers to sustain their careers.",
  ],
  "cmmelb9g700nltc984o62ckq9": [
    "What is the appropriate mindset for a care worker who has been strongly rejected by a resident?",
    "Rather than blaming yourself, consider that the person's 'illness or anxiety' is causing this reaction — step back and assess the situation.",
  ],
  "cmmelb9g700nptc98ke1dmfe6": [
    "What is the most important attitude to maintain during a debriefing session?",
    "Without denying or criticizing others' feelings, 'listen with empathy first' — this is the foundation of mutual support.",
  ],
  "cmmelb9g700nttc98y6euty6m": [
    "What is the effect of making direct eye contact with a person with dementia?",
    "Aligning visual information directly delivers the message 'I recognize and value you' to the brain.",
  ],

  // ===== 介護予防・自立支援 =====
  "cmmelbalu00ootc98rpqfx1m2": [
    "Which of the following reflects the correct understanding of independence support and prevention of functional decline?",
    "Doing everything for a resident can cause functional decline. The foundation of independence support is to focus on their strengths and what they can still do.",
  ],
  "cmmelbalu00ottc98j502z2k6": [
    "In ICF (International Classification of Functioning), what is the most important perspective in independence support?",
    "ICF emphasizes focusing not only on 'what cannot be done (disability)' but also on positive elements such as 'activity' and 'participation'.",
  ],
  "cmmelbalu00oytc98fob80p07": [
    "Under the 2024 reform, which of the following is NOT included in the three integrated approaches promoted for care?",
    "Rehabilitation, oral management, and nutritional management are the three areas to be integrated for prevention of functional decline.",
  ],
  "cmmelbalu00p3tc98a0gubxve": [
    "What is the correct purpose of the PDCA cycle in evidence-based care (LIFE)?",
    "LIFE is used to analyze and feed back collected data to continuously improve (PDCA) the quality of actual care.",
  ],
  "cmmelbalu00p8tc98rbza9hd4": [
    "What should be especially emphasized in terms of nutrition to prevent frailty?",
    "In addition to adequate calories, protein intake is critical for maintaining muscle mass and preventing frailty.",
  ],
  "cmmelbalu00pdtc98h1bqscf0": [
    "Which of the following is an INCORRECT statement about the systemic effects of declining oral function?",
    "Declining oral function increases the risk of malnutrition from inability to chew and aspiration pneumonia — it does NOT dramatically improve cardiopulmonary function.",
  ],
  "cmmelbalu00pitc98ub2k0a8k": [
    "What is the correct concept of 'daily life rehabilitation'?",
    "Rather than limiting rehabilitation to a therapy room, using the activities of daily life themselves (meals, dressing, walking) is the most effective approach.",
  ],
  "cmmelbalu00pntc98a0nbiqiu": [
    "What is the correct effect of promoting social participation on care prevention?",
    "Interaction with others and having a role prevents loneliness, activates the brain, and greatly contributes to maintaining ADL (daily living activities).",
  ],
  "cmmelbalv00pstc985q8mldv3": [
    "What is an important perspective in independence support and care prevention for people with dementia?",
    "Rather than pointing out what cannot be done, focus on current abilities and strengths to protect the person's dignity and motivation.",
  ],
  "cmmelbalv00pxtc98fwsvx7sa": [
    "As a professional, what is an approach you can start today in implementing independence support?",
    "Moving away from excessive care ('doing everything for them') and patiently watching over and supporting residents as they use their own abilities.",
  ],

  // ===== ハラスメント対策 =====
  "cmmelbbsn00qrtc98lf1ofhsa": [
    "Which action satisfies ALL 3 elements of power harassment?",
    "Power harassment involves using a position of superiority to go beyond what is reasonable in work, harming the work environment — prolonged public verbal abuse constitutes this.",
  ],
  "cmmelbbsn00qwtc98k0djv0h1": [
    "Which of the following is an INCORRECT understanding of the criteria for sexual harassment?",
    "Sexual harassment is determined by the 'victim's subjective experience (discomfort),' not the 'perpetrator's intent.' Even if meant as a compliment, it is not permitted.",
  ],
  "cmmelbbsn00r1tc98puv8u6ny": [
    "What is the most 'avoidable' organizational response to customer harassment (customer abuse)?",
    "Forcing a single front-line worker to resolve the situation alone is a 'sacrificial lamb' response that invites further harm and resignations. Always respond as an organization (with multiple people).",
  ],
  "cmmelbbsn00r6tc987g7ft98t": [
    "What is the term for unfair treatment or harassment due to pregnancy, childbirth, or childcare?",
    "Called maternity harassment (matahara) or paternity harassment (patahara), these are included in the obligations mandated in 2024.",
  ],
  "cmmelbbsn00rbtc98cw75ygpt": [
    "What is it called when your own 'normal' or 'common sense' biases hurt others?",
    "Called unconscious bias, this becomes an unconscious trigger for harassment.",
  ],
  "cmmelbbsn00rgtc98lwzfzxdc": [
    "What is the '6-second rule' said to be effective for getting through the peak of anger?",
    "Since the peak of anger hormones dominating the brain is said to last about 6 seconds, waiting that long prevents impulsive verbal outbursts — an anger management technique.",
  ],
  "cmmelbbsn00rltc984sa7yule": [
    "What is the technique of respectfully expressing your own opinion while respecting others called?",
    "Called assertion (assertive communication), it uses techniques like the DESC method to express yourself clearly and positively.",
  ],
  "cmmelbbsn00rqtc98leehu5d3": [
    "What is the correct 'duty of care' for managers and facilities receiving harassment complaints?",
    "Retaliation against reporters is strictly prohibited by law — protecting the reporter's privacy and ensuring their safety is the top priority.",
  ],
  "cmmelbbso00rvtc98wbhywcbf": [
    "Which is the correct understanding of online defamation and posting workplace information on SNS?",
    "Even posts made outside the workplace can be subject to disciplinary action or legal liability if they damage the work environment through identification or defamation.",
  ],
  "cmmelbbso00s0tc982vjlpbpi": [
    "What is the greatest benefit to care settings of a 'psychologically safe workplace'?",
    "An environment where anyone can speak up without fear of blame leads to early reporting of mistakes (preventing concealment), and ultimately prevents serious accidents.",
  ],
};

// Choice translations: { id: textEn }
const choiceTranslations: Record<string, string> = {
  // 高齢者虐待防止
  "cmmelatyc000rtc98rh02u0ng": "Suddenly start pushing the wheelchair from behind without saying a word",
  "cmmelatyc000stc989skirpkm": "Always speak to the resident before moving to the next action",
  "cmmelatyc000ttc9850zuz8fj": "Ask a colleague to take over when you notice you are feeling irritated",
  "cmmelatyc000utc98cmluj54x": "Watch over and support without taking away what the resident can do independently",
  "cmmelatyc000wtc98pkm7pknn": "Self-neglect",
  "cmmelatyc000xtc988l7aiemb": "Psychological abuse",
  "cmmelatyc000ytc98ywd52ar3": "Neglect (care abandonment)",
  "cmmelatyc000ztc98jrfhrjez": "Financial abuse",
  "cmmelatyc0011tc983i2ul1g0": "Imminence · Non-substitutability · Temporariness",
  "cmmelatyd0012tc98ijatnzss": "Imminence · Safety · Continuity",
  "cmmelatyd0013tc98kxi01ole": "Urgency · Non-substitutability · Consent",
  "cmmelatyd0014tc9812eq8x75": "Effectiveness · Safety · Temporariness",
  "cmmelatyd0016tc98iaocrzq1": "Surrounding the bed with four side rails",
  "cmmelatyd0017tc98tssayxh3": "Using a bed exit sensor to prevent falls",
  "cmmelatyd0018tc9862xu05v6": "Positioning the resident to prevent aspiration during meals",
  "cmmelatyd0019tc98yy8cnlza": "Ensuring the wheelchair brakes are firmly engaged",
  "cmmelatyd001btc9860ubmgrj": "Psychological abuse · Physical abuse",
  "cmmelatyd001ctc989cnfa018": "Financial abuse",
  "cmmelatyd001dtc9865a8eojs": "Sexual abuse",
  "cmmelatyd001etc989txpob8o": "Does not fall under any type of abuse",
  "cmmelatyd001gtc98iyjlvkgj": "Intentionally ignoring nurse call buttons repeatedly",
  "cmmelatye001htc98mvixq9v2": "Adjusting meal portions based on the resident's physical condition",
  "cmmelatye001itc981lnczj85": "Not forcing rehabilitation when the resident refuses",
  "cmmelatye001jtc98s860xvou": "Increasing nighttime monitoring frequency for safety",
  "cmmelatye001ltc98gr1ddjek": "Using the resident's savings without their consent",
  "cmmelatye001mtc98464a5cmw": "Issuing payment reminders to a resident who cannot pay",
  "cmmelatye001ntc9822599zex": "A legal guardian managing assets under the law",
  "cmmelatye001otc98ga1fq74c": "Notifying about a revision to facility usage fees",
  "cmmelatye001qtc98w2qfi9te": "Report even on 'suspicion' without waiting for definitive evidence",
  "cmmelatye001rtc98cmcz5436": "Wait and observe until the resident explicitly makes a complaint",
  "cmmelatye001stc98ziawdat6": "First try to resolve it through discussion with the staff involved",
  "cmmelatye001ttc98n2hr8goj": "Report to the family and ask for their judgment",
  "cmmelatye001vtc98xau74dxc": "Municipality (local government)",
  "cmmelatye001wtc98cb1b74ld": "Police station only",
  "cmmelatye001xtc98tsy666oy": "Public health center",
  "cmmelatye001ytc98fj4sv07k": "The organization's legal counsel",
  "cmmelatyf0020tc98myhj2xee": "A personal reflection essay by the responsible staff member",
  "cmmelatyf0021tc98b58v5u4x": "The manner (specific method) of restraint",
  "cmmelatyf0022tc98lrysndbj": "The reason why restraint was unavoidable",
  "cmmelatyf0023tc98pz3rfevn": "Specific efforts toward removal of restraint",

  // 認知症ケア
  "cmmelava5002utc98dliznfij": "Realizing an inclusive society and preserving individual dignity",
  "cmmelava5002vtc98rs082m7t": "Uniform safety management within the facility",
  "cmmelava5002wtc98gulid0zc": "Providing medical care aimed at a complete cure for dementia",
  "cmmelava5002ytc983dytxte0": "Provide reassurance and accompany them without denial",
  "cmmelava5002ztc988z866zhm": "Say 'I told you that earlier, didn't I?'",
  "cmmelava50030tc98yp90rsbw": "Ask repeatedly until they remember",
  "cmmelava50032tc98yi37qx29": "Presence of physical discomfort or environmental unpleasantness",
  "cmmelava50033tc98tvk3pv2x": "The person's personality or willfulness",
  "cmmelava50034tc98vtnvqmjj": "Only forgetting to take medication",
  "cmmelava50036tc98snr6fcok": "Stubbornness to trouble the staff",
  "cmmelava50037tc98s73iafre": "Anxiety from not knowing where they are",
  "cmmelava50038tc988y43nzfa": "A sense of responsibility to prepare dinner for the family",
  "cmmelava5003atc98p7yjajmt": "Supported decision-making",
  "cmmelava5003btc98qq84l0bg": "Managed care",
  "cmmelava5003ctc98jkdf91rm": "Surrogate decision-making",
  "cmmelava5003etc983orx8uca": "Don't let them do anything",
  "cmmelava5003ftc98lwkpf5ed": "Don't startle",
  "cmmelava5003gtc98gzudk8cp": "Don't rush",
  "cmmelava5003htc98grw1et5i": "Don't deny",
  "cmmelava6003jtc98psj2s4wg": "Increase the color contrast of tableware",
  "cmmelava6003ktc98ze48e3ct": "Leave the TV on during meals",
  "cmmelava6003ltc98azybib2s": "Mix all the side dishes together",
  "cmmelava6003ntc98ayrmdj58": "Suggest comfort: 'Would you like to feel refreshed?'",
  "cmmelava6003otc98f3cfbnm3": "Persuade: 'It's the rules, please come in'",
  "cmmelava6003ptc987l6t8yks": "Cause anxiety: 'You'll become dirty'",
  "cmmelava6003rtc98hmj6d42a": "Get down to eye level and approach with a smile",
  "cmmelava6003stc98t90mulxq": "Stand over them and restrain them from above",
  "cmmelava6003ttc98eoviiz45": "Shout loudly to alert those nearby to the danger",
  "cmmelava6003vtc98rrcgcm2r": "To protect the person's dignity and sense of self",
  "cmmelava6003wtc98b54ppk1d": "To make facility management easier",
  "cmmelava6003xtc98robqlbkr": "Because it is simply a procedure in the manual",

  // 感染症
  "cmmelawh4004otc98tor2zekz": "Standard Precautions",
  "cmmelawh4004ptc98fib81051": "Universal manners",
  "cmmelawh4004qtc98ixn6x9ac": "Individual infection response",
  "cmmelawh4004stc98ltzjaa4z": "Norovirus",
  "cmmelawh4004ttc98alk7zd3u": "Influenza virus",
  "cmmelawh4004utc98q5k298us": "Adenovirus",
  "cmmelawh4004wtc984hsr05gr": "At least 30 seconds",
  "cmmelawh4004xtc98ezrmoiit": "About 10 seconds",
  "cmmelawh4004ytc98xtoi4hed": "More than 5 minutes",
  "cmmelawh40050tc9857xwstc5": "Gloves",
  "cmmelawh40051tc98etvfaa75": "Mask",
  "cmmelawh40052tc988o2yzyi6": "Gown",
  "cmmelawh40053tc985kqwrd9a": "Goggles",
  "cmmelawh50055tc98tff83tnc": "Allowing the contaminated area to dry out",
  "cmmelawh50056tc98zyx8l0za": "Soaking with sodium hypochlorite",
  "cmmelawh50057tc98mxitnr0k": "Using disposable protective equipment",
  "cmmelawh50059tc98pexp69sy": "Eliminate (kill)",
  "cmmelawh6005atc98l2q8nwf1": "Don't contaminate",
  "cmmelawh6005btc9847m6dq00": "Don't multiply",
  "cmmelawh6005dtc98zl4bn2mz": "Maintain constant air flow (ventilation)",
  "cmmelawh6005etc983e1i8m3h": "Wipe handrails with alcohol",
  "cmmelawh6005ftc980nbszb9r": "Wet-mop the floor",
  "cmmelawh6005htc98o8kvbz20": "Seasonal events and recreational activities",
  "cmmelawh6005itc981xiebdkw": "Meal and toileting assistance",
  "cmmelawh6005jtc98rrh7efvu": "Administering prescribed medications",
  "cmmelawh6005ltc985syq1dq7": "Report immediately and confirm whether you can come in",
  "cmmelawh6005mtc9889jnqpqp": "Come in quietly because we are short-staffed",
  "cmmelawh6005ntc98iat03os0": "Take medicine to lower the fever and then come in",
  "cmmelawh6005ptc9837woym2x": "Apply directly to hands for disinfection",
  "cmmelawh6005qtc985m2hgopk": "Dilute to the appropriate concentration",
  "cmmelawh6005rtc98ixbhz9fm": "It can corrode metal",

  // 事故発生防止
  "cmmelaxzj006itc9826ekl17i": "300 incidents",
  "cmmelaxzj006jtc98d3aiupjt": "30 incidents",
  "cmmelaxzj006ktc98pce0lfus": "100 incidents",
  "cmmelaxzj006mtc98aeel0dvb": "Accident Prevention Committee",
  "cmmelaxzj006ntc98k88zxdb9": "Zero Accident Achievement Team",
  "cmmelaxzj006otc9896ja5i95": "Personal Information Protection Committee",
  "cmmelaxzj006qtc98jb6z1kkx": "Falls and tumbles",
  "cmmelaxzj006rtc98hyq60dw9": "Medication errors",
  "cmmelaxzj006stc98fufiznd2": "Wandering (unauthorized departure)",
  "cmmelaxzj006utc98yni3432u": "Place feet flat on the floor and tuck the chin",
  "cmmelaxzj006vtc98tgp3jopn": "Tilt head back to make swallowing easier",
  "cmmelaxzj006wtc98i8r0uvfm": "Relax with feet off the ground",
  "cmmelaxzj006ytc98d9p8cj6n": "Provide first aid and rescue to the resident",
  "cmmelaxzj006ztc98qh9rqhjw": "Quickly write an incident report",
  "cmmelaxzj0070tc984oomt9m3": "Call the manager",
  "cmmelaxzj0072tc98zqy2hhgv": "To hold individuals responsible and impose penalties",
  "cmmelaxzj0073tc98n3i3n5qk": "To discuss recurrence prevention as a team",
  "cmmelaxzj0074tc98nvrpw4fa": "To accurately record the facts",
  "cmmelaxzj0076tc987y6rqd3i": "Why-Why Analysis",
  "cmmelaxzj0077tc9878drqid1": "Heinrich Analysis",
  "cmmelaxzj0078tc98f5tg2et1": "SWOT Analysis",
  "cmmelaxzj007atc98kyrnepme": "Family and municipality (insurer)",
  "cmmelaxzj007btc98i989rfx9": "Police only",
  "cmmelaxzk007ctc98yqr0czr3": "Neighboring care facilities",
  "cmmelaxzk007etc98aoo3j8f5": "Whether the brakes are securely engaged",
  "cmmelaxzk007ftc98z8mqk956": "Whether the tire pressure is adequate",
  "cmmelaxzk007gtc98kion3yx3": "Whether the backrest angle is appropriate",
  "cmmelaxzk007itc98e7m5qtw9": "Sort (Seiri)",
  "cmmelaxzk007jtc98jgivlv9z": "Cleanliness (Seiketsu)",
  "cmmelaxzk007ktc98ykmlg31k": "Habit (Shukan)",

  // 緊急時対応
  "cmmelazjy008atc980blkf05s": "Call out loudly for nearby staff to help",
  "cmmelazjy008btc98mhfbod39": "Call an ambulance alone",
  "cmmelazjy008ctc988t3ip7tf": "Call the manager first",
  "cmmelazjy008etc98zersu4wo": "Within 10 seconds",
  "cmmelazjy008ftc98ke1y0v5p": "Within 30 seconds",
  "cmmelazjy008gtc98ffdbobf1": "Within 1 minute",
  "cmmelazjy008itc984vea7ky5": "100–120 times per minute",
  "cmmelazjy008jtc98hxpo1hpi": "60–80 times per minute",
  "cmmelazjy008ktc98e1ey4od3": "More than 150 times",
  "cmmelazjy008mtc98fi6opiia": "Follow the voice guidance instructions",
  "cmmelazjy008ntc98as8uvcu2": "Immediately press the electric shock button",
  "cmmelazjy008otc98s8uv3vid": "Wait for a doctor to arrive before using it",
  "cmmelazjy008qtc98h6d9ah7l": "Perform back blows",
  "cmmelazjy008rtc98jllitwb0": "Use a vacuum cleaner to suction",
  "cmmelazjy008stc98gvzhh1n4": "Have the person drink a lot of water",
  "cmmelazjy008utc98zndr2zxs": "The day's meal menu",
  "cmmelazjy008vtc9800ezul5l": "The exact address and name of the facility",
  "cmmelazjy008wtc98p53zr7i2": "Whether the person is conscious and breathing",
  "cmmelazjy008ytc985y7sje0x": "About 10%",
  "cmmelazjy008ztc98ucq0lhcc": "About 1%",
  "cmmelazjy0090tc98lkh23gxu": "About 50%",
  "cmmelazjy0092tc98pc63t2ma": "Vomiting repeatedly",
  "cmmelazjy0093tc98mx9bcjqx": "The area struck is slightly red",
  "cmmelazjy0094tc98c4at7dxf": "The person is saying it hurts",
  "cmmelazjy0096tc98gjuark46": "Insert something in the mouth to prevent biting the tongue",
  "cmmelazjy0097tc98zsiyzesb": "Move surrounding objects to ensure safety",
  "cmmelazjy0098tc98ja1bmafj": "Time how many minutes it has been going on",
  "cmmelazjy009atc98zu5v7lrl": "Perform first aid and rescue as a general rule",
  "cmmelazjy009btc98o0pvh897": "Do nothing and just watch",
  "cmmelazjz009ctc98kg8iapqi": "Wait for the family to arrive before deciding",

  // プライバシー
  "cmmelb0tv00a2tc98n1l2ep21": "A lifelong obligation that continues even after retirement",
  "cmmelb0tv00a3tc98mtdmiq5u": "The obligation disappears at the moment of retirement",
  "cmmelb0tv00a4tc98751s2bgv": "It is acceptable to tell a friend",
  "cmmelb0tv00a6tc982a89juur": "Even without naming someone, there is a risk of personal identification",
  "cmmelb0tv00a7tc987t25mzfz": "A locked account makes posting safe",
  "cmmelb0tv00a8tc98gn2g1di4": "It is fine to post a photo from behind without permission",
  "cmmelb0tv00aatc98mzfr3cfx": "Never take photos on a personal smartphone",
  "cmmelb0tv00abtc98povzl218": "It is acceptable to take photos on a personal smartphone if you delete them later",
  "cmmelb0tv00actc989auzxnx8": "It is acceptable on a personal smartphone if the person gives permission",
  "cmmelb0tv00aetc98w6xs3aca": "Process with a shredder to make completely unreadable",
  "cmmelb0tv00aftc98x81fyqfe": "Tear into small pieces by hand and throw in the trash",
  "cmmelb0tv00agtc98arjf2u0q": "Reuse as scrap paper",
  "cmmelb0tv00aitc98yqalgdmm": "There is a risk of leaking to unspecified third parties",
  "cmmelb0tv00ajtc98dejf8wa5": "Because voices echo in elevators",
  "cmmelb0tv00aktc98wbs71ewb": "Because work conversations should be held in the break room",
  "cmmelb0tv00amtc987bwzxgcd": "Removing without permission is a serious violation",
  "cmmelb0tv00antc98sqe0yyx0": "It is recommended to reduce unpaid overtime",
  "cmmelb0tv00aotc98mwdhb245": "USB drives are safe to take out",
  "cmmelb0tv00aqtc98p7xfmrrn": "Report to management immediately",
  "cmmelb0tv00artc98duvawbvb": "Try to handle it yourself and keep it quiet",
  "cmmelb0tv00astc98czu8w93o": "Wait a few days and then report",
  "cmmelb0tv00autc98zagmeph4": "Confirm the scope of shareable information and do not answer independently",
  "cmmelb0tv00avtc98rd1k5btt": "It is fine to tell everything to any relative",
  "cmmelb0tv00awtc98g1yswgct": "Answer immediately because refusing would be rude",
  "cmmelb0tv00aytc98p4a55gjn": "Lock the screen (e.g., Win+L)",
  "cmmelb0tv00aztc983uxmjngf": "Leave the screen on",
  "cmmelb0tv00b0tc98cpv6f4lh": "Turn the keyboard upside down",
  "cmmelb0tv00b2tc98kcl3foqc": "Specify the purpose of use and only use within that scope",
  "cmmelb0tv00b3tc988ntnuzt5": "More information is always better",
  "cmmelb0tv00b4tc987ogf0787": "Share with all staff for convenience",

  // 倫理
  "cmmelb21p00bvtc980sirb7cw": "Ethics is a higher standard of conduct that goes beyond the law",
  "cmmelb21p00bwtc98c748n2dt": "If you are only compliant with the law, ethics are unnecessary",
  "cmmelb21p00bxtc98c1y2jcjk": "The law always takes precedence over ethics",
  "cmmelb21p00bztc98mg09ozzm": "Politely decline and accept only the gesture of kindness",
  "cmmelb21p00c0tc986jvca2w2": "Accept it privately, saying 'just this once'",
  "cmmelb21p00c1tc98rfn84rm4": "Accept if the person seems like they will get angry",
  "cmmelb21p00c3tc98sjkvqzd0": "Risks damaging dignity by looking down on the person",
  "cmmelb21p00c4tc989uvyjkf6": "It creates a friendly atmosphere so there is no problem at all",
  "cmmelb21p00c5tc989oifw285": "There is no problem if the person is happy",
  "cmmelb21p00c7tc98zhfa3bl8": "Revocation of facility certification (closure)",
  "cmmelb21p00c8tc98dts5zigi": "A verbal stern warning only",
  "cmmelb21p00c9tc981up9ru5a": "Only a reassignment of the responsible staff member",
  "cmmelb21p00cbtc98urer5i1k": "Whether the recipient felt uncomfortable and their dignity was harmed",
  "cmmelb21p00cctc98g6emrcit": "Whether the perpetrator had malicious intent",
  "cmmelb21p00cdtc984bbg8pqd": "Whether people around were laughing",
  "cmmelb21p00cftc98ry475mci": "The duty of confidentiality continues even after retirement",
  "cmmelb21p00cgtc986tf3q5ix": "The obligation disappears completely upon retirement",
  "cmmelb21p00chtc98jb0y5laq": "It is fine to discuss anything with colleagues",
  "cmmelb21p00cjtc98zgsey6u2": "Operational convenience due to staff shortages",
  "cmmelb21p00cktc9898jgdf4j": "'Imminence' — danger to life",
  "cmmelb21p00cltc98zqextlw7": "'Non-substitutability' — no other means available",
  "cmmelb21p00cmtc98m0ftl5lu": "'Temporariness' — short duration",
  "cmmelb21p00cotc984o3kvtjn": "Report promptly to management or use the internal reporting system",
  "cmmelb21p00cptc98elzv3ls2": "Turn a blind eye to avoid damaging the relationship",
  "cmmelb21p00cqtc98hcs2yysr": "Ignore it because it has nothing to do with you",
  "cmmelb21p00cstc98o06rk218": "Do not impose the care worker's values",
  "cmmelb21p00cttc986ap0nd2d": "Finish assistance efficiently",
  "cmmelb21p00cutc989v5ea2y0": "Do everything as the family says",
  "cmmelb21p00cwtc98rh0id5g3": "Formulating compliance guidelines and establishing a reporting framework",
  "cmmelb21p00cxtc98sf9yk23a": "Hosting a hospitality contest",
  "cmmelb21p00cytc983emxq1jp": "Investigating all staff members' SNS accounts",

  // 接遇・マナー
  "cmmelb37900dqtc98r1zolc1h": "To demonstrate respect and dignity toward others",
  "cmmelb37900drtc98036l2idr": "To impose the facility's rules",
  "cmmelb37900dstc98gmkgr6m3": "To complete tasks efficiently",
  "cmmelb37900dutc98ngzc6oic": "It gives the impression of disrespecting the other person",
  "cmmelb37900dvtc98wrajxoxe": "Because it increases work errors",
  "cmmelb37900dwtc98mho9lesn": "Because the voice becomes harder to hear",
  "cmmelb37900dytc989lq5m03k": "Lowers psychological barriers and makes abuse more likely",
  "cmmelb37900dztc980oq4286c": "It is recommended as it creates familiarity",
  "cmmelb37900e0tc98wq0fpr2x": "There is absolutely no problem if the person has given permission",
  "cmmelb37900e2tc98sqjzxo9g": "Speech lock",
  "cmmelb37900e3tc98ixmduncq": "Time management",
  "cmmelb37900e4tc98hl28dupn": "Presenting priorities",
  "cmmelb37900e6tc98w49020uo": "Makes it easier for the person to understand what to do next",
  "cmmelb37900e7tc98uhj7okzf": "Because it reduces staff stress",
  "cmmelb37900e8tc98oqxfl567": "Because it requires fewer words",
  "cmmelb37900eatc9831h4tugs": "Cushion words",
  "cmmelb37900ebtc98vzgnyd0p": "Guard words",
  "cmmelb37900ectc98ufx052z9": "Opaque words",
  "cmmelb37900eetc98f1pkbo4q": "Interrupt the person mid-conversation to share your own opinion",
  "cmmelb37900eftc98m1ja13d0": "Accept the other person's words without denial",
  "cmmelb37900egtc98dum4w2gj": "Nod at appropriate times",
  "cmmelb37900eitc98jqfzpnkl": "At the same level as or slightly lower than the other person's gaze",
  "cmmelb37900ejtc98mtppoueb": "Standing, looking down from above",
  "cmmelb37900ektc98qhlemkxx": "Calling out in a loud voice from a distance",
  "cmmelb37900emtc98505xwjic": "Stand up and greet with respect",
  "cmmelb37900entc98woamt7kv": "Bow while remaining seated because you are busy",
  "cmmelb37900eotc98bqcukqlx": "No need to greet if it is outside your area of responsibility",
  "cmmelb37900eqtc98ildsy6yn": "A bright tone of voice that conveys a smile",
  "cmmelb37900ertc98zqeyqljq": "A loud, intimidating voice",
  "cmmelb37900estc986uftup41": "A mechanical, emotionless voice",

  // 災害対策
  "cmmelb4f400fjtc98axxwmh0h": "Mutual assistance among staff, facilities, and nearby residents",
  "cmmelb4f400fktc98e3pul2no": "Protecting your own life on your own",
  "cmmelb4f400fltc98nwdxj2t3": "Public support from authorities or the Self-Defense Forces",
  "cmmelb4f400fntc98grl3dlaj": "When flames reach the ceiling",
  "cmmelb4f400fotc98tc9wd1ri": "When smoke begins to appear",
  "cmmelb4f400fptc988j9yoquk": "When sparks fly",
  "cmmelb4f400frtc98yydu2gjc": "Warning Level 3",
  "cmmelb4f400fstc98v5il1sw4": "Warning Level 5",
  "cmmelb4f400fttc9817tpopz0": "When an advisory is issued",
  "cmmelb4f500fvtc98zjpa74m2": "Rescue, meals, toileting, medication",
  "cmmelb4f500fwtc98i0l9rze1": "Recreational activities and seasonal events",
  "cmmelb4f500fxtc98f79j1an7": "Sheet changes, room rearrangement",
  "cmmelb4f500fztc98php448lr": "Drop low, protect your head, don't move",
  "cmmelb4f500g0tc98y1gyozat": "Stand up and run to the exit",
  "cmmelb4f500g1tc98p0napjkk": "Open windows and go extinguish the fire",
  "cmmelb4f500g3tc983mh9img2": "171 (Disaster Message Dial)",
  "cmmelb4f500g4tc98qbs20ujq": "117 (Time signal)",
  "cmmelb4f500g5tc98wcpz7j1g": "104 (Directory assistance)",
  "cmmelb4f500g7tc98722krnjo": "BCP (Business Continuity Plan)",
  "cmmelb4f500g8tc980jj0er36": "Disaster response manual",
  "cmmelb4f500g9tc986apxnzgf": "Evacuation route map",
  "cmmelb4f500gctc98lsl3vah9": "Horizontal evacuation",
  "cmmelb4f500gdtc98bl0iiajv": "Indoor shelter",
  "cmmelb4f500gbtc98dllc6iji": "Vertical evacuation",
  "cmmelb4f500gftc980e6hrnuj": "Economy class syndrome",
  "cmmelb4f500ggtc98gwcmzr4n": "Heat stroke",
  "cmmelb4f500ghtc989gxcq45q": "Aspiration pneumonia",
  "cmmelb4f500gjtc98n0eqx9nj": "3 days' worth",
  "cmmelb4f500gktc98qrv43e1p": "1 day's worth",
  "cmmelb4f500gltc98tebjqgve": "1 month's worth",

  // 身体拘束
  "cmmelb5r300hctc98l71uhsfz": "Muscle weakness and joint contracture (stiffening)",
  "cmmelb5r300hdtc98yca6lhx9": "Appetite increases",
  "cmmelb5r300hetc98yh3spdxk": "Cognitive function improves",
  "cmmelb5r300hgtc98c4o001tv": "Surrounding the bed with four side rails",
  "cmmelb5r300hhtc98trbrqxxp": "Placing a nurse call button at the resident's request",
  "cmmelb5r300hitc9805nv54i8": "Accompanying the resident during walking",
  "cmmelb5r300hktc98rg7vn5h6": "Operational convenience due to staff shortages",
  "cmmelb5r300hltc98w6y1k806": "'Imminence' — danger to life",
  "cmmelb5r300hmtc98iihx6d9j": "'Non-substitutability' — no other means",
  "cmmelb5r300hntc98954vkl0d": "'Temporariness' — short duration",
  "cmmelb5r300hptc984x1d3l72": "Constitutes physical restraint",
  "cmmelb5r300hqtc98qp095lhw": "It is not restraint if it is for posture maintenance",
  "cmmelb5r300hrtc98cqf2o38k": "It is permitted for 30 minutes after meals",
  "cmmelb5r300httc98dhxzgpy0": "Detailed documentation of the manner and duration",
  "cmmelb5r300hutc98xomrrkde": "A post-hoc report is sufficient",
  "cmmelb5r300hvtc98kx6fnh7t": "Documentation is not required",
  "cmmelb5r300hxtc98z0r20w12": "Drug lock",
  "cmmelb5r300hytc98qt296jv2": "Medical care",
  "cmmelb5r300hztc986ojsjetg": "Chemical support",
  "cmmelb5r300i1tc982elgas9w": "Use of low-height beds and impact-absorbing mats",
  "cmmelb5r300i2tc98d06sy2bs": "Lock the room door from the outside",
  "cmmelb5r300i3tc98217nmq2v": "Install higher rails",
  "cmmelb5r400i5tc986798x3wl": "Physical Restraint Optimization Committee",
  "cmmelb5r400i6tc98jm61jx4u": "Efficient Operations Committee",
  "cmmelb5r400i7tc98n91j64xj": "Incident Report Reception Desk",
  "cmmelb5r400i9tc98xhxfg4xk": "Decreased motivation due to humiliation and despair",
  "cmmelb5r400iatc98gtt7b0kw": "Becomes calm with increased sense of security",
  "cmmelb5r400ibtc98f4aq4qfy": "A feeling of gratitude toward staff develops",
  "cmmelb5r400idtc98cbrppv4p": "Explore the reason and background for wanting to move",
  "cmmelb5r400ietc98vztt8jy6": "Accept it as the resident's own responsibility if an accident occurs",
  "cmmelb5r400iftc983vwogw05": "Persuade the family that 'restraint is necessary for safety'",

  // 医療的ケア
  "cmmelb71i00j6tc983hefawiy": "35°C range (hypothermia)",
  "cmmelb71i00j7tc98n9a9145w": "36.5°C",
  "cmmelb71i00j8tc984ze5105c": "37.0°C",
  "cmmelb71i00jatc98k5b3ih4l": "Within 15 seconds",
  "cmmelb71i00jbtc98xuzb0568": "Within 1 minute",
  "cmmelb71i00jctc989anzf2pd": "Until nothing more comes out",
  "cmmelb71j00jetc982q1a7jzc": "Elevate upper body 30–60 degrees",
  "cmmelb71j00jftc98ihfzhjuq": "Lay completely flat",
  "cmmelb71j00jgtc98woeyt9ck": "Place in a prone position",
  "cmmelb71j00jitc9854xbng2p": "Dryness of the armpits",
  "cmmelb71j00jjtc987blo9ggt": "Facial swelling",
  "cmmelb71j00jktc98quka7ta3": "Excessive sweating",
  "cmmelb71j00jmtc98z609bq85": "Situation · Background · Assessment · Recommendation",
  "cmmelb71j00jntc98bnw6ew70": "Name · Age · Gender · Address",
  "cmmelb71j00jotc98p3cip1gd": "Meals · Toileting · Sleep · Bathing",
  "cmmelb71j00jqtc98yim9p1pm": "Hypoglycemia",
  "cmmelb71j00jrtc98jfutsng4": "High blood pressure",
  "cmmelb71j00jstc989jiughmd": "Dehydration",
  "cmmelb71j00jutc98s9o1z8oq": "Two digits (10–30)",
  "cmmelb71j00jvtc98sulglq6r": "One digit (1–3)",
  "cmmelb71j00jwtc98i107z2dz": "Three digits (100–300)",
  "cmmelb71j00jytc989g1yxm95": "Record objective facts accurately",
  "cmmelb71j00jztc981063fz95": "Write centered on personal impressions",
  "cmmelb71j00k0tc98i66u5u04": "Write in beautiful sentences",
  "cmmelb71k00k2tc98kxk9d7h5": "To prevent aspiration pneumonia",
  "cmmelb71k00k3tc981joy8qnk": "To treat cavities",
  "cmmelb71k00k4tc98sagdfrpv": "To sharpen the sense of taste",
  "cmmelb71k00k6tc9849zjjvaf": "Whether pressing leaves a mark that does not return",
  "cmmelb71k00k7tc98po4hcr64": "Whether the skin color looks bright",
  "cmmelb71k00k8tc98q39xq7yt": "Whether there is muscle development",

  // 看取り
  "cmmelb87y00kztc9825v0iitc": "ACP (Life Meeting)",
  "cmmelb87y00l0tc98zcnodkv9": "BCP (Business Continuity Plan)",
  "cmmelb87y00l1tc98d7dupfyk": "SBAR (Situation Report)",
  "cmmelb87y00l3tc98rpfnchmp": "It is the body's natural preparation — do not force it",
  "cmmelb87y00l4tc98jcbpf99b": "The person will deteriorate without being forced to eat",
  "cmmelb87y00l5tc98uzf27lt5": "Supplement fluids with a forced IV drip",
  "cmmelb87y00l7tc98jmfeac5o": "Collaborate with medical staff to prioritize pain relief",
  "cmmelb87y00l8tc98hggi1jz6": "Wait and observe, saying 'it's because of old age'",
  "cmmelb87y00l9tc98w0kb0tgt": "Leave the person until they make a complaint",
  "cmmelb87y00lbtc98mksd6oyi": "Agonal breathing (jaw breathing)",
  "cmmelb87y00lctc9854pmg661": "Deep breathing",
  "cmmelb87y00ldtc98j6erdgr7": "Abdominal breathing",
  "cmmelb87y00lftc98w52q7f92": "Grief care",
  "cmmelb87y00lgtc98wcg4ml5j": "Skin care",
  "cmmelb87y00lhtc98e2u1916l": "Foot care",
  "cmmelb87y00ljtc98h47gept8": "DNAR",
  "cmmelb87y00lktc98ay92oyxt": "AED",
  "cmmelb87y00lltc98trav2472": "CPR",
  "cmmelb87y00lntc98z5zzh3ym": "To protect the dignity of the deceased and support the family emotionally",
  "cmmelb87y00lotc98bbm8d4lh": "It is merely a cleaning task for the body",
  "cmmelb87y00lptc98e6aspfa1": "It is done only to fulfill a legal obligation",
  "cmmelb87y00lrtc9831yu2hiw": "Continue to alleviate dry mouth (thirst sensation)",
  "cmmelb87y00lstc984rhg9rpu": "Not necessary since the person will no longer eat",
  "cmmelb87y00lttc98fon9rmp6": "It is too dangerous and should not be done at all",
  "cmmelb87y00lvtc98putndxh5": "Share emotions as a team and support each other",
  "cmmelb87y00lwtc984k4dy14n": "As a professional, you must not grieve",
  "cmmelb87y00lxtc9841aqbrgz": "Forget it quickly and focus on the next task",
  "cmmelb87y00lztc984hey75i1": "Staying close, holding hands, and offering a sense of warmth and security",
  "cmmelb87y00m0tc98fhrv3odo": "Completing tasks briskly and professionally",
  "cmmelb87y00m1tc98w5mkd32c": "Continuing to watch from a distance",

  // 精神的ケア
  "cmmelb9g700mttc98c8h6jna4": "Validation",
  "cmmelb9g700mutc980x3qjy48": "Orientation",
  "cmmelb9g700mvtc983mo6z004": "Coaching",
  "cmmelb9g700mxtc982wnj9j5f": "Respect for personhood",
  "cmmelb9g700mytc9897i815mq": "Efficient management",
  "cmmelb9g700mztc98i40slz91": "Enforced safety",
  "cmmelb9g700n1tc98un0s6zxg": "Emotional labor",
  "cmmelb9g700n2tc9866qvznki": "Physical labor only",
  "cmmelb9g700n3tc98m31t5450": "Simple labor",
  "cmmelb9g700n5tc98etumqnk1": "Debriefing",
  "cmmelb9g700n6tc98cvp2afcm": "OJT (On-the-Job Training)",
  "cmmelb9g700n7tc98g27rm3u5": "Case study only",
  "cmmelb9g700n9tc98j0s18h4v": "Scold",
  "cmmelb9g700natc986tain6cz": "Look",
  "cmmelb9g700nbtc982311remr": "Touch",
  "cmmelb9g700nctc98ff9vqscn": "Talk",
  "cmmelb9g700netc98u4t3y955": "Inappropriate because it intensifies anxiety",
  "cmmelb9g700nftc98b6ewf0gq": "Communicating facts is professional honesty",
  "cmmelb9g700ngtc98ri152irx": "They will understand if you explain repeatedly",
  "cmmelb9g700nitc98kvfjlcuf": "Self-care",
  "cmmelb9g700njtc98disf82k4": "Self-sacrifice",
  "cmmelb9g700nktc98xbjpetxf": "Unpaid overtime",
  "cmmelb9g700nmtc98fjcvqaen": "Consider it an expression of anxiety rather than a personal attack",
  "cmmelb9g700nntc986j23idlu": "Blame yourself for being an unprofessional failure",
  "cmmelb9g700notc98p2bvgtnn": "Never provide care for that resident again",
  "cmmelb9g700nqtc98uwgy3rau": "Accept each other's feelings without criticism",
  "cmmelb9g700nrtc98lx1phnpf": "Try to find out who made a mistake",
  "cmmelb9g700nstc98saml6iio": "Only discuss logical solutions",
  "cmmelb9g700nutc98kxtxh4a8": "Provides a sense of security — 'I am recognized'",
  "cmmelb9g700nvtc98b9zrzuh1": "Gives a sense of intimidation to restrain them",
  "cmmelb9g700nwtc98or5umscj": "Communicates that they are being monitored",

  // 介護予防
  "cmmelbalu00optc980cg77bxd": "Focus on residents' strengths (what they can do) and make use of their abilities",
  "cmmelbalu00oqtc98k2jw6vpi": "Prioritize efficiency and have staff perform tasks that take the resident time",
  "cmmelbalu00ortc98gsk1zlmk": "To prevent falls, prioritize wheelchair use over walking practice",
  "cmmelbalu00ostc98iy8g6i5v": "Doing everything 'for' the resident is the highest form of kindness",
  "cmmelbalu00outc98897nhrcv": "Not just compensate for 'what cannot be done,' but also increase 'what can be done'",
  "cmmelbalu00ovtc98jvhwo6wi": "Determine care content based solely on the medical diagnosis",
  "cmmelbalu00owtc98qxurx4v3": "Focus only on recovering physical function",
  "cmmelbalu00oxtc989kvq859i": "Environmental factors are not considered",
  "cmmelbalu00oztc98pmynatt4": "Financial management",
  "cmmelbalu00p0tc98iqrm823u": "Rehabilitation",
  "cmmelbalu00p1tc989og8g0jf": "Oral management",
  "cmmelbalu00p2tc98yx84i3uh": "Nutritional management",
  "cmmelbalu00p4tc98kxfnp2zu": "Continuously improve care quality based on objective data",
  "cmmelbalu00p5tc98ips1a4f8": "To increase reporting work to the Ministry of Health, Labour and Welfare",
  "cmmelbalu00p6tc98fukahxn2": "To strengthen surveillance of staff",
  "cmmelbalu00p7tc98aqyksqe2": "Increasing documentation itself is the purpose",
  "cmmelbalu00p9tc987fk48cca": "Consume balanced nutrition including protein",
  "cmmelbalu00patc98rqdf6r7d": "Eat only low-calorie foods",
  "cmmelbalu00pbtc98a8u5dldc": "Supplement with only supplements",
  "cmmelbalu00pctc98snfphez7": "There is no problem as long as sufficient fluids are taken",
  "cmmelbalu00petc98uvd28sw2": "Cardiopulmonary function dramatically improves",
  "cmmelbalu00pftc98gc4jncia": "Risk of aspiration pneumonia increases",
  "cmmelbalu00pgtc98nq84ave9": "Nutritional status deteriorates",
  "cmmelbalu00phtc98a1ehxuy6": "Can lead to cognitive decline",
  "cmmelbalu00pjtc98kemwjbyr": "Treat every action in daily life as an opportunity for rehabilitation",
  "cmmelbalu00pktc98v880jd48": "Keep the resident as still as possible outside rehabilitation time",
  "cmmelbalu00pltc982hr5l2m9": "Leave everything to the specialists; care workers do not need to be involved",
  "cmmelbalu00pmtc9825ka7y7j": "Only walking training is called rehabilitation",
  "cmmelbalu00potc981sgjq5qc": "Having a sense of purpose and a role supports the will to live and maintenance of function",
  "cmmelbalu00pptc98zz1qp6s2": "Social participation only leads to fatigue and is counterproductive",
  "cmmelbalv00pqtc982d5se2wa": "Spending time quietly alone is the only form of care prevention",
  "cmmelbalv00prtc98kzeyiqs1": "Has absolutely no effect on the progression of dementia",
  "cmmelbalv00pttc98a07di39s": "Praise what 'can be done' to the fullest and support dignity and motivation",
  "cmmelbalv00putc98k0xjzcad": "Prohibit everything dangerous and prioritize safety above all through management",
  "cmmelbalv00pvtc98efhrr2rg": "Strictly point out what cannot be done and train them",
  "cmmelbalv00pwtc98l1po0jvl": "Prioritize the convenience of staff over the resident's wishes",
  "cmmelbalv00pytc98mvwcsuld": "Respect the resident's 'will to try' and support them through patient observation",
  "cmmelbalv00pztc98cj9mjnnt": "Speed up assistance to finish as quickly as possible",
  "cmmelbalv00q0tc98p5zt98x4": "Do nothing until the resident speaks up",
  "cmmelbalv00q1tc98f1wzme06": "Change the care method on your own judgment repeatedly",

  // ハラスメント
  "cmmelbbsn00qstc98gmtlrsrv": "Berate someone in front of everyone for a long time: 'You have no sense,' 'If you don't want to work, go home'",
  "cmmelbbsn00qttc98wk0qhuzb": "Call a subordinate who made a mistake to a private room and discuss the cause and improvement measures one-on-one",
  "cmmelbbsn00qutc98copv6emc": "Issue instructions in a strong tone because of high urgency in the work",
  "cmmelbbsn00qvtc98d2nji027": "Assign challenging tasks appropriate to the person's abilities",
  "cmmelbbsn00qxtc980tn27hos": "If the perpetrator 'intended to compliment,' it does not constitute harassment",
  "cmmelbbsn00qytc98xxafbkab": "If the recipient feels uncomfortable with a sexual remark and their motivation is undermined, it qualifies",
  "cmmelbbsn00qztc98udp0bw3h": "Gender-based harassment such as 'You're a man, so...' is also included",
  "cmmelbbsn00r0tc98sssnybkb": "Even a single act can qualify if it constitutes a serious violation",
  "cmmelbbsn00r2tc988krilsyh": "Make the responsible staff member apologize sincerely alone until the situation is resolved",
  "cmmelbbsn00r3tc98j0sv051u": "Accurately record facts (notes/recordings) and immediately report to the supervisor",
  "cmmelbbsn00r4tc98475xi3ee": "Warn: 'We cannot accept further abusive language,' and cut off the conversation with a firm attitude",
  "cmmelbbsn00r5tc98miol3p09": "For serious rights violations, consider consulting the police or terminating the contract",
  "cmmelbbsn00r7tc9838owuawg": "Maternity harassment / Paternity harassment",
  "cmmelbbsn00r8tc98ae6hwidm": "Gender harassment",
  "cmmelbbsn00r9tc9818uaa85h": "Silver harassment",
  "cmmelbbsn00ratc98etep9zss": "Age harassment",
  "cmmelbbsn00rctc98tlgggiwo": "Unconscious bias",
  "cmmelbbsn00rdtc986f2ktzxu": "Assertive communication",
  "cmmelbbsn00retc98ld5z8jb0": "Anger management",
  "cmmelbbsn00rftc98ncvzz9p8": "Self-compassion",
  "cmmelbbsn00rhtc98pzm5pwjm": "Wait the first 6 seconds to suppress impulsive actions",
  "cmmelbbsn00ritc98p993cq6k": "Counter and refute the other person's points within 6 seconds",
  "cmmelbbsn00rjtc986b10bdrj": "Shout for 6 seconds to release all emotions",
  "cmmelbbsn00rktc98uhycg01c": "Run away from the situation at full speed within 6 seconds",
  "cmmelbbsn00rmtc98vttr2fn3": "Assertion",
  "cmmelbbsn00rntc98t4gdslgt": "Mindfulness",
  "cmmelbbsn00rotc988wjj30xa": "Coaching",
  "cmmelbbsn00rptc981r2jvy6t": "Facilitation",
  "cmmelbbsn00rrtc985guc9g0g": "Protect the reporter's privacy and ensure they are not subjected to unfair treatment",
  "cmmelbbsn00rstc98y9o95290": "Dismiss the complaint ambiguously, saying 'these things happen to everyone'",
  "cmmelbbsn00rttc98u776qwj6": "Immediately tell the accused party exactly who reported what and the full details",
  "cmmelbbsn00rutc98lg6z4i6i": "If evidence is insufficient, watch and wait without conducting an investigation",
  "cmmelbbso00rwtc98195gz3qq": "Even posts made outside the workplace can be subject to disciplinary action or legal liability if they harm the work environment",
  "cmmelbbso00rxtc98txn6midh": "If using an anonymous account, you cannot be held responsible for anything you write",
  "cmmelbbso00rytc98fhvzg94j": "Even if true, exposing someone online is recognized as legitimate whistleblowing",
  "cmmelbbso00rztc98yxbcnhyg": "It is fine to post something that can identify a real person, as long as it is just venting",
  "cmmelbbso00s1tc986kdb279r": "Mistakes can be reported immediately without concealment, preventing serious accidents",
  "cmmelbbso00s2tc98ytxirylw": "Everyone exercises extreme care so as not to upset the supervisor",
  "cmmelbbso00s3tc98zby2gwyi": "Mandatory work parties and events build team cohesion",
  "cmmelbbso00s4tc98arbojwbb": "No one voices concerns so as not to make waves",
};

async function main() {
  console.log("Starting translation updates...");

  // Update questions
  const questionIds = Object.keys(questionTranslations);
  let qDone = 0;
  for (const id of questionIds) {
    const [textEn, explanationEn] = questionTranslations[id];
    if (textEn === "dummy") continue;
    await prisma.question.update({
      where: { id },
      data: { textEn, explanationEn },
    });
    qDone++;
  }
  console.log(`Updated ${qDone} questions`);

  // Update choices
  const choiceIds = Object.keys(choiceTranslations);
  let cDone = 0;
  for (const id of choiceIds) {
    await prisma.choice.update({
      where: { id },
      data: { textEn: choiceTranslations[id] },
    });
    cDone++;
  }
  console.log(`Updated ${cDone} choices`);

  await prisma.$disconnect();
  console.log("Done!");
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
