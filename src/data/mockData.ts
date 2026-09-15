import { Question, WritingScenario, WritingEvaluation, AudioDialogue, Flashcard, VideoLecture } from '../types';

export const INITIAL_EXAM_QUESTIONS: Question[] = [
  // Module 1: Grammar & Vocabulary (25 MCQs)
  {
    id: 'g1',
    module: 'grammar',
    category: 'Subject-Verb Agreement',
    question: 'The internal audit committee, along with the external compliance officers, _______ reviewing the quarterly financial reconciliations.',
    options: ['are', 'is', 'were', 'have been'],
    correctIndex: 1, // 'is'
    englishExplanation: 'When a singular subject ("The internal audit committee") is followed by parenthetical phrases like "along with", "as well as", or "together with", the verb remains singular ("is").',
    urduExplanation: 'جب اصل Subject واحد (singular) ہو جیسے "The internal audit committee" اور اس کے ساتھ "along with" یا "as well as" آئے، تو Verb ہمیشہ Singular ("is") ہی رہے گا۔'
  },
  {
    id: 'g2',
    module: 'grammar',
    category: 'Prepositions & Collocations',
    question: 'The management failed to comply _______ the disclosure standards outlined in IFRS 15 regarding revenue recognition.',
    options: ['to', 'with', 'for', 'about'],
    correctIndex: 1, // 'with'
    englishExplanation: 'The standard accounting verb "comply" strictly takes the dependent preposition "with" (comply with standards/regulations).',
    urduExplanation: 'لفظ "Comply" کے ساتھ ہمیشہ Preposition "with" استعمال ہوتی ہے (Comply with rules/standards یعنی اصولوں کی پیروی کرنا)۔'
  },
  {
    id: 'g3',
    module: 'grammar',
    category: 'Passive Voice in Auditing',
    question: 'Choose the most objective, professional passive phrasing for an audit discrepancy report:',
    options: [
      'We noticed that someone forgot to calculate depreciation.',
      'Depreciation on manufacturing equipment was inadvertently omitted from the ledger.',
      'The bookkeeper did not do the depreciation calculation.',
      'You have made a big error in depreciation ledger accounts.'
    ],
    correctIndex: 1, // B
    englishExplanation: 'Formal ICAP audit writing favors passive, non-accusatory voice ("was inadvertently omitted") over personal pronouns ("we", "you", "someone").',
    urduExplanation: 'آڈٹ رپورٹس میں پروفیشنل انداز اپنانے کے لیے Passive Voice استعمال کی جاتی ہے تاکہ کسی فرد پر الزام لگانے کے بجائے صرف مسئلے کی نشاندہی کی جائے ("was inadvertently omitted")۔'
  },
  {
    id: 'g4',
    module: 'grammar',
    category: 'Conditionals & Prudence',
    question: 'Had the CFO known about the unrecorded liability earlier, the final audited statements _______ issued on Friday.',
    options: ['would not be', 'would not have been', 'will not have been', 'had not been'],
    correctIndex: 1, // 'would not have been'
    englishExplanation: 'Third conditional (inverted past counterfactual): "Had + Subject + Past Participle" requires "would have / would not have been" in the main clause.',
    urduExplanation: 'یہ Third Conditional جملہ ہے (ماضی کی ناممکن شرط)۔ جب شروع میں "Had + 3rd form" آئے تو دوسرے حصے میں "would have / would not have been" کا استعمال لازمی ہے۔'
  },
  {
    id: 'g5',
    module: 'grammar',
    category: 'Vocabulary & Diction',
    question: 'Select the term that best denotes an accountant\'s formal duty to act in the best financial interest of the client:',
    options: ['Arbitrary obligation', 'Fiduciary duty', 'Pecuniary leisure', 'Contingent waiver'],
    correctIndex: 1, // B
    englishExplanation: '"Fiduciary duty" refers to the highest legal and ethical standard of care and trust owed by financial professionals to their beneficiaries/clients.',
    urduExplanation: '"Fiduciary duty" کا مطلب ہے امانت داری کا فرض — یعنی کلائنٹ کے مالی مفاد کا مکمل دیانتداری سے تحفظ کرنا۔'
  },
  {
    id: 'g6',
    module: 'grammar',
    category: 'Tenses & Consistency',
    question: 'Since last January, the accounting department _______ automated reconciliation software to reduce month-end closing errors.',
    options: ['utilizes', 'has been utilizing', 'was utilizing', 'had utilized'],
    correctIndex: 1, // 'has been utilizing'
    englishExplanation: 'The time indicator "Since last January" signals an action that started in the past and continues into the present, requiring the Present Perfect Continuous tense.',
    urduExplanation: 'لفظ "Since" ماضی سے شروع ہونے والے اور تاحال جاری کام کو ظاہر کرتا ہے، اس لیے Present Perfect Continuous ("has been utilizing") درست ہے۔'
  },
  {
    id: 'g7',
    module: 'grammar',
    category: 'Modal Verbs of Politeness',
    question: 'Which sentence demonstrates the most courteous and professional tone when requesting documentation from a senior client?',
    options: [
      'Send the bank confirmation letters right now.',
      'We demand you to hand over the bank statements.',
      'Could you please furnish the remaining bank confirmation statements by tomorrow noon?',
      'You must deliver the bank statements immediately.'
    ],
    correctIndex: 2, // C
    englishExplanation: 'In formal business communication, modal "Could you please..." paired with formal vocabulary ("furnish", "statements") provides polite deference without sounding aggressive.',
    urduExplanation: 'کاروباری خط و کتابت میں سینئر کلائنٹس سے معلومات مانگتے وقت نرم اور باوقار لہجہ ضروری ہے، جس کے لیے "Could you please furnish..." سب سے موزوں ہے۔'
  },
  {
    id: 'g8',
    module: 'grammar',
    category: 'Subject-Verb Agreement',
    question: 'Neither the managing partner nor the team associates _______ willing to sign the unaudited interim figures.',
    options: ['was', 'were', 'is', 'being'],
    correctIndex: 1, // 'were'
    englishExplanation: 'With "neither... nor...", the verb agrees with the subject closer to it. "The team associates" is plural, so plural verb "were" is correct.',
    urduExplanation: '"Neither... nor" والے جملوں میں Verb کا فیصلہ "nor" کے بعد والے Subject کے مطابق ہوتا ہے۔ چونکہ "team associates" جمع ہے، اس لیے "were" آئے گا۔'
  },
  {
    id: 'g9',
    module: 'grammar',
    category: 'Collocations & Idiomatic Usage',
    question: 'The auditors decided to _______ a thorough physical inventory count to verify warehouse stock levels.',
    options: ['perform', 'make', 'do', 'operate'],
    correctIndex: 0, // 'perform'
    englishExplanation: 'In professional audit terminology, one "performs an audit count" or "conducts an inventory inspection" rather than "makes" or "does".',
    urduExplanation: 'آڈٹ میں انوینٹری کی گنتی یا جانچ کے لیے "conduct" یا "perform an inventory count" کا باضابطہ لفظ استعمال ہوتا ہے، "make" یا "do" غیر معیاری ہے۔'
  },
  {
    id: 'g10',
    module: 'grammar',
    category: 'Parallelism & Structure',
    question: 'The audit junior is responsible for reviewing bank statements, compiling working papers, and _______ discrepancies to the senior.',
    options: ['to report', 'reporting', 'reported', 'reports'],
    correctIndex: 1, // 'reporting'
    englishExplanation: 'Parallel structure requires matching grammatical forms: "reviewing...", "compiling...", and "reporting...".',
    urduExplanation: 'جملے کی ہم آہنگی (Parallelism) برقرار رکھنے کے لیے تمام افعال کی ایک ہی شکل ہونی چاہیے: reviewing، compiling اور reporting۔'
  },
  {
    id: 'g11',
    module: 'grammar',
    category: 'Vocabulary & Terminology',
    question: 'An unverified difference between the general ledger cash balance and bank statement balance is known as a(n) _______ item.',
    options: ['reconciling', 'superficial', 'hypothetical', 'untenable'],
    correctIndex: 0, // 'reconciling'
    englishExplanation: 'Items creating timing differences between bank statements and cash ledgers are standardly called "reconciling items".',
    urduExplanation: 'کیش بک اور بینک اسٹیٹمنٹ کے فرق کو دور کرنے والی اشیاء کو اکاؤنٹنگ میں "Reconciling items" کہا جاتا ہے۔'
  },
  {
    id: 'g12',
    module: 'grammar',
    category: 'Modifiers & Clarity',
    question: 'Identify the sentence free from dangling or misplaced modifiers:',
    options: [
      'Having verified the invoices, the financial statement was finalized by the auditor.',
      'Having verified the invoices, the auditor finalized the financial statement.',
      'The financial statement was finalized, having verified the invoices, by the auditor.',
      'The auditor, after having invoices verified, finalize the statement.'
    ],
    correctIndex: 1, // B
    englishExplanation: 'The introductory participial phrase "Having verified the invoices" must be immediately followed by the noun performing that action: "the auditor".',
    urduExplanation: 'جملے کے شروع میں جب Participial Phrase ("Having verified...") آئے، تو اس کے فوراً بعد کام کرنے والا (the auditor) آنا چاہیے ورنہ Dangling Modifier کی غلطی ہو جاتی ہے۔'
  },
  {
    id: 'g13',
    module: 'grammar',
    category: 'Punctuation & Clauses',
    question: 'Choose the correctly punctuated compound sentence:',
    options: [
      'The trial balance was out of agreement therefore, the junior accountant reviewed the journal entries.',
      'The trial balance was out of agreement; therefore, the junior accountant reviewed the journal entries.',
      'The trial balance was out of agreement, therefore the junior accountant reviewed the journal entries.',
      'The trial balance was out of agreement; therefore the junior accountant, reviewed the journal entries.'
    ],
    correctIndex: 1, // B
    englishExplanation: 'Conjunctive adverbs ("therefore", "however", "moreover") joining two independent clauses require a semicolon before and a comma after.',
    urduExplanation: 'جب "therefore" دو مکمل جملوں کو جوڑے، تو اس سے پہلے Semicolon (;) اور اس کے بعد Comma (,) لگانا لازمی پنکچوایشن اصول ہے۔'
  },
  {
    id: 'g14',
    module: 'grammar',
    category: 'Prepositions',
    question: 'The management\'s estimate was not consistent _______ the historical loss rates observed over the preceding five fiscal years.',
    options: ['with', 'to', 'for', 'about'],
    correctIndex: 0, // 'with'
    englishExplanation: 'The adjective "consistent" is paired with "with" ("consistent with historical data").',
    urduExplanation: '"Consistent" کے ساتھ ہمیشہ "with" آتا ہے، جس کا مطلب ہے کہ ڈیٹا سابقہ معلومات کے عین مطابق ہے۔'
  },
  {
    id: 'g15',
    module: 'grammar',
    category: 'Subjunctive Mood',
    question: 'The audit engagement partner recommended that the client _______ its provisioning policy before the next reporting date.',
    options: ['revises', 'revise', 'revised', 'will revise'],
    correctIndex: 1, // 'revise'
    englishExplanation: 'Mandative subjunctive: verbs of recommendation, demand, or request ("recommended that...") take the base form of the verb ("revise", not "revises").',
    urduExplanation: 'جب جملے میں حکم یا تجویز کا لفظ آئے (جیسے "recommended that") تو Subjunctive mood کے تحت Verb کی پہلی اصل شکل (base form "revise") آتی ہے، چاہے Subject واحد ہی کیوں نہ ہو۔'
  },
  {
    id: 'g16',
    module: 'grammar',
    category: 'Vocabulary & Synonyms',
    question: 'Which word is the closest formal synonym for "substantiate" in the phrase "substantiate audit assertions"?',
    options: ['Corroborate', 'Undermine', 'Fabricate', 'Diminish'],
    correctIndex: 0, // 'Corroborate'
    englishExplanation: '"Substantiate" and "corroborate" both mean to provide evidence or support to prove the truth of a claim or financial assertion.',
    urduExplanation: '"Substantiate" اور "Corroborate" دونوں کا مطلب ہے کسی دعوے یا مالیاتی اعدادوشمار کو ثبوت اور شواہد سے ثابت کرنا۔'
  },
  {
    id: 'g17',
    module: 'grammar',
    category: 'Articles & Determiners',
    question: 'The company was granted _______ unique tax exemption certificate following the tribunal hearing.',
    options: ['a', 'an', 'the few', 'many'],
    correctIndex: 0, // 'a'
    englishExplanation: 'Although "unique" starts with a vowel letter, it begins with a consonant sound (/juː/), so the indefinite article "a" is used.',
    urduExplanation: 'لفظ "Unique" حرف \'U\' سے شروع ہوتا ہے مگر اس کی آواز "ی" (consonant sound /yoo/) سے نکلتی ہے، اس لیے "a unique" درست ہے نہ کہ "an"۔'
  },
  {
    id: 'g18',
    module: 'grammar',
    category: 'Conjunctions & Transition',
    question: 'The operating cash flow improved significantly; _______, net profit declined due to heavy impairment losses.',
    options: ['nevertheless', 'consequently', 'furthermore', 'because'],
    correctIndex: 0, // 'nevertheless'
    englishExplanation: '"Nevertheless" expresses contrast between the positive cash flow and the decline in net profit.',
    urduExplanation: '"Nevertheless" کا مطلب ہے "اس کے باوجود"۔ یہ دو متضاد پہلوؤں (کیش فلو میں بہتری لیکن منافع میں کمی) کے درمیان تضاد واضح کرتا ہے۔'
  },
  {
    id: 'g19',
    module: 'grammar',
    category: 'Direct vs Indirect Speech',
    question: 'The controller said, "We have reconciled all inter-company receivables." Correct indirect form:',
    options: [
      'The controller said that they have reconciled all inter-company receivables.',
      'The controller said that they had reconciled all inter-company receivables.',
      'The controller says that they had reconciled all inter-company receivables.',
      'The controller asked if they reconciled all inter-company receivables.'
    ],
    correctIndex: 1, // B
    englishExplanation: 'Present perfect ("have reconciled") in direct speech backshifts to past perfect ("had reconciled") in indirect speech when the reporting verb is in the past.',
    urduExplanation: 'ان ڈائریکٹ اسپیچ میں رپورٹنگ ورب "said" (ماضی) ہونے کی وجہ سے "have reconciled" تبدیل ہو کر "had reconciled" (Past Perfect) ہو جاتا ہے۔'
  },
  {
    id: 'g20',
    module: 'grammar',
    category: 'Word Confusion (Affect vs Effect)',
    question: 'The implementation of the new ERP system will directly _______ overall departmental productivity.',
    options: ['effect', 'affect', 'effective', 'affectionate'],
    correctIndex: 1, // 'affect'
    englishExplanation: '"Affect" is a verb meaning to influence or produce a change, whereas "effect" is typically a noun denoting the result.',
    urduExplanation: '"Affect" ایک ورب (Verb) ہے جس کا مطلب ہے "اثر انداز ہونا"، جبکہ "Effect" عام طور پر ایک ناؤن (Noun) ہوتا ہے جس کا مطلب ہے "نتیجہ یا اثر"۔'
  },
  {
    id: 'g21',
    module: 'grammar',
    category: 'Collocations',
    question: 'The board of directors is under a statutory obligation to exercise _______ care and diligence.',
    options: ['prudent', 'casual', 'frivolous', 'negligent'],
    correctIndex: 0, // 'prudent'
    englishExplanation: '"Prudent care" is a standard legal and corporate governance collocation indicating wise, sensible, and cautious oversight.',
    urduExplanation: '"Prudent care" کا مطلب ہے دانشمندانہ اور محتاط رویہ جو ہر ڈائریکٹر اور چارٹرڈ اکاؤنٹنٹ کے لیے قانونی طور پر لازم ہے۔'
  },
  {
    id: 'g22',
    module: 'grammar',
    category: 'Relative Pronouns',
    question: 'The firm hired an external forensic specialist _______ expertise in detecting payroll fraud was widely recognized.',
    options: ['who', 'whom', 'whose', 'which'],
    correctIndex: 2, // 'whose'
    englishExplanation: 'Possessive relative pronoun "whose" is required to show ownership of the expertise.',
    urduExplanation: 'ملکیت ظاہر کرنے کے لیے Relative Pronoun "whose" (جس کی مہارت) استعمال ہوتا ہے۔'
  },
  {
    id: 'g23',
    module: 'grammar',
    category: 'Business Idioms',
    question: 'In auditing, when evidence is sufficient and appropriate, auditors can obtain _______ assurance that statements are free of material misstatement.',
    options: ['absolute', 'reasonable', 'speculative', 'marginal'],
    correctIndex: 1, // 'reasonable'
    englishExplanation: 'Under International Standards on Auditing (ISA), auditors obtain "reasonable assurance" (high but not absolute level of assurance).',
    urduExplanation: 'بین الاقوامی آڈٹ معیار (ISA) کے مطابق آڈٹ میں کبھی "Absolute" (100% مکمل) گارنٹی نہیں دی جاتی بلکہ ہمیشہ "Reasonable assurance" (معقول یقین دہانی) حاصل کی جاتی ہے۔'
  },
  {
    id: 'g24',
    module: 'grammar',
    category: 'Comparative & Superlative',
    question: 'Of the two internal control frameworks reviewed, COSO was deemed _______ for multinational manufacturing entities.',
    options: ['the most suitable', 'more suitable', 'suitable', 'most suitably'],
    correctIndex: 1, // 'more suitable'
    englishExplanation: 'When comparing exactly two items ("Of the two..."), the comparative degree ("more suitable") is grammatically required.',
    urduExplanation: 'جب صرف دو چیزوں کا آپس میں موازنہ کیا جا رہا ہو تو ہمیشہ Comparative Degree ("more suitable") استعمال ہوتی ہے، "most" تین یا زائد چیزوں کے لیے آتا ہے۔'
  },
  {
    id: 'g25',
    module: 'grammar',
    category: 'Subject-Verb Inversion',
    question: 'Rarely _______ such a pervasive breakdown in internal authorization protocols during an initial audit engagement.',
    options: ['an audit team encounters', 'does an audit team encounter', 'an audit team did encounter', 'encounter an audit team'],
    correctIndex: 1, // B
    englishExplanation: 'Negative and restrictive adverbs (rarely, seldom, scarcely, never) placed at the beginning of a clause trigger subject-auxiliary inversion ("does an audit team encounter").',
    urduExplanation: 'جب جملہ "Rarely" یا "Never" سے شروع ہو تو Subject سے پہلے امدادی فعل (Auxiliary verb) آتا ہے: "does an audit team encounter"۔'
  }
];

export const READING_MODULE_QUESTIONS: Question[] = [
  {
    id: 'r1',
    module: 'reading',
    category: 'Reading Comprehension - Main Idea',
    passage: `In contemporary corporate governance, the concept of "materiality" serves as a foundational pillar for both financial accountants and statutory auditors. Materiality is not merely a quantitative threshold expressed in monetary terms; it encompasses qualitative dimensions that could alter the economic decisions of a reasonable user relying on financial statements. For instance, an unrecorded illegal transaction of an apparently negligible amount might nevertheless be qualitatively material because it reflects poorly on management integrity and compliance posture. Furthermore, auditors must continually calibrate performance materiality throughout the engagement lifecycle as unforeseen operational risks emerge.`,
    question: 'According to the passage, why might an quantitatively negligible unrecorded transaction still be regarded as material?',
    options: [
      'Because it automatically bankrupts the entity within 30 days.',
      'Because it reflects upon managerial integrity and corporate compliance.',
      'Because all unrecorded amounts are strictly forbidden under ISA.',
      'Because the tax authorities impose heavy double taxation penalties.'
    ],
    correctIndex: 1, // B
    englishExplanation: 'The passage explicitly notes that an amount may be material if "it reflects poorly on management integrity and compliance posture."',
    urduExplanation: 'پیراگراف میں واضح لکھا ہے کہ چھوٹی رقم بھی اس لیے اہم (Material) ہو سکتی ہے کیونکہ اس سے مینجمنٹ کی دیانتداری اور قوانین پر عملدرآمد پر سوالات اٹھتے ہیں۔'
  },
  {
    id: 'r2',
    module: 'reading',
    category: 'Reading Comprehension - Inference',
    passage: `In contemporary corporate governance, the concept of "materiality" serves as a foundational pillar for both financial accountants and statutory auditors. Materiality is not merely a quantitative threshold expressed in monetary terms; it encompasses qualitative dimensions that could alter the economic decisions of a reasonable user relying on financial statements. For instance, an unrecorded illegal transaction of an apparently negligible amount might nevertheless be qualitatively material because it reflects poorly on management integrity and compliance posture. Furthermore, auditors must continually calibrate performance materiality throughout the engagement lifecycle as unforeseen operational risks emerge.`,
    question: 'What is the implied role of "performance materiality" during an audit engagement?',
    options: [
      'It is fixed at the start of the year and never adjusted.',
      'It must be dynamically re-evaluated as unexpected operational risks surface.',
      'It guarantees that zero errors remain in ledger accounts.',
      'It allows the auditor to skip inventory physical verification.'
    ],
    correctIndex: 1, // B
    englishExplanation: 'The passage highlights that "auditors must continually calibrate performance materiality throughout the engagement lifecycle as unforeseen operational risks emerge."',
    urduExplanation: 'آڈٹ کے دوران جیسے جیسے نئے آپریشنل خطرات سامنے آتے ہیں، آڈٹ ٹیم کو اپنی پرفارمنس میٹریلٹی کو وقت کے ساتھ ایڈجسٹ کرنا پڑتا ہے۔'
  },
  {
    id: 'r3',
    module: 'reading',
    category: 'Sentence Cohesion & Ordering',
    question: 'Arrange the following four sentences into a cohesive, logically connected paragraph on Bank Reconciliation:\n\n[1] Consequently, the adjusted cash book balance matches the verified bank statement.\n[2] First, the accountant identifies unpresented cheques and direct debits.\n[3] Next, corresponding adjusting journal entries are passed in the general ledger.\n[4] Bank reconciliation begins with comparing the internal cash book against the bank statement.',
    options: [
      '[4] → [2] → [3] → [1]',
      '[2] → [4] → [1] → [3]',
      '[3] → [2] → [4] → [1]',
      '[4] → [3] → [2] → [1]'
    ],
    correctIndex: 0, // A
    englishExplanation: 'Logical sequence: [4] Introduction of process → [2] "First" identify items → [3] "Next" pass journal entries → [1] "Consequently" final matching result.',
    urduExplanation: 'منطقی ترتیب: پہلے مرحلے کا تعارف [4]، پھر پہلا قدم [2]، اگلا قدم [3]، اور آخر میں نتیجہ [1]۔'
  }
];

export const MOCK_WRITING_SCENARIOS: WritingScenario[] = [
  {
    id: 'sc-1',
    title: 'Audit Delay Notification Email',
    role: 'Audit Senior',
    recipient: 'Mr. Tariq Mehmood, Audit Engagement Partner',
    scenario: 'You are leading the year-end inventory audit at Apex Chemicals Ltd. Due to warehouse safety clearances and unexpected ERP system downtime, physical inventory verification will be delayed by 48 hours. Write a concise, professional 120–150 word formal email to your Audit Partner explaining the delay, highlighting mitigating steps taken, and requesting an extension on the working paper submission deadline.',
    requiredWordCount: { min: 120, max: 150 },
    keyPoints: [
      'State purpose of the email clearly in the opening sentence.',
      'State specific reasons: chemical warehouse safety protocol & ERP server outage.',
      'Describe risk mitigation measures (night shift team deployed, partial count completed).',
      'Request formal 48-hour deadline adjustment with courtesy.',
      'Maintain formal CA tone without emotional excuses.'
    ],
    sampleModelAnswer: `Dear Mr. Tariq,\n\nI am writing to formally apprise you of an unforeseen 48-hour delay in concluding the physical inventory verification at Apex Chemicals Ltd.\n\nThe delay stems from mandatory environmental safety inspections in the hazardous storage facility, compounded by temporary ERP server downtime at the client's premises. Consequently, full access to warehouse sub-ledgers was restricted yesterday.\n\nTo mitigate downstream scheduling impact, our audit team has completed preliminary testing on high-value items and scheduled weekend double-shifts with warehouse supervisors. We project completing the physical count by Tuesday noon.\n\nIn light of these developments, I respectfully request a 48-hour extension for submitting the finalized inventory working papers, now targeted for Wednesday close of business. Thank you for your continued guidance.\n\nYours sincerely,\nAudit Senior`
  },
  {
    id: 'sc-2',
    title: 'Management Letter Inquiry on Internal Controls',
    role: 'Statutory Auditor',
    recipient: 'Chief Financial Officer, Horizon Textiles Ltd',
    scenario: 'During the interim audit, your team observed that petty cash vouchers exceeding PKR 50,000 lacked dual managerial approvals, violating internal controls. Write a 120–150 word formal email requesting an explanation from the CFO and recommending corrective control measures.',
    requiredWordCount: { min: 120, max: 150 },
    keyPoints: [
      'Acknowledge ongoing interim audit cooperation.',
      'Clearly describe the control deviation (unapproved petty cash disbursements).',
      'Cite potential risk of unauthorized expenditures.',
      'Recommend dual-authorization policy reinforcement.',
      'Request management response within 3 business days.'
    ]
  },
  {
    id: 'sc-3',
    title: 'Bank Confirmation Follow-up Memo',
    role: 'Audit Team Lead',
    recipient: 'Senior Branch Manager, National Commercial Bank',
    scenario: 'Your firm has not received the standard bank confirmation letter for client Falcon Logistics for the year ended December 31, 2025. Write a 120–150 word urgent formal reminder requesting immediate dispatch of the direct bank certificate under ISA 505.',
    requiredWordCount: { min: 120, max: 150 },
    keyPoints: [
      'Reference initial confirmation dispatch date & client authorization letter.',
      'Cite statutory reporting deadlines under Companies Act.',
      'Request direct transmission to audit firm email/address.',
      'Provide audit team contact details for verification.'
    ]
  }
];

export const MOCK_WRITING_EVALUATION: WritingEvaluation = {
  score: 82,
  bandRating: 'CA Professional',
  toneRegister: 'Formal',
  summaryFeedback: 'Excellent professional structure with clear purpose, strong accounting vocabulary ("mitigating steps", "concluding verification"), and appropriate formal sign-offs. Minor preposition adjustments recommended.',
  urduSummary: 'بہترین پروفیشنل ای میل! آپ کا انداز مکمل طور پر باوقار اور آئی کیپ امتحانی معیار کے مطابق ہے۔ چند چھوٹی گرامر غلطیوں کی درستگی نیچے جدول میں درج ہے۔',
  grammarScore: 85,
  vocabularyScore: 84,
  cohesionScore: 78,
  sentences: [
    {
      originalSentence: "I am writing this email to telling you that audit is late.",
      correctedSentence: "I am writing to formally apprise you of an unforeseen delay in concluding the audit.",
      errorType: "Infinitive & Register Error",
      explanation: "Use 'to apprise' instead of 'to telling'. In formal audit correspondence, avoid casual phrasing like 'audit is late'.",
      urduExplanation: "'to' کے بعد ہمیشہ Verb کی پہلی شکل (infinitive) آتی ہے، اور پروفیشنل ای میل میں 'late' کے بجائے 'unforeseen delay' موزوں ہے۔"
    },
    {
      originalSentence: "The warehouse guy said we cannot count goods due to safety issues.",
      correctedSentence: "Warehouse management indicated that inventory verification was temporarily halted due to mandatory safety protocols.",
      errorType: "Informal Word Choice & Passive Shift",
      explanation: "Replace colloquial terms like 'warehouse guy' with 'warehouse management', and cite 'mandatory safety protocols' for clarity.",
      urduExplanation: "'Warehouse guy' غیر معیاری اور غیر رسمی لفظ ہے۔ اس کی جگہ 'warehouse management' کا استعمال کریں۔"
    },
    {
      originalSentence: "We have worked in night to finish fast.",
      correctedSentence: "The audit team scheduled evening shifts to expedite the verification process.",
      errorType: "Collocation & Preposition Error",
      explanation: "Use 'scheduled evening shifts to expedite' rather than 'worked in night to finish fast'.",
      urduExplanation: "کام جلدی ختم کرنے کے لیے پروفیشنل بزنس انگلش میں 'to expedite the process' کا فقرہ استعمال کیا جاتا ہے۔"
    },
    {
      originalSentence: "Please give us two more days to give report.",
      correctedSentence: "I respectfully request a 48-hour extension for submitting the finalized working paper report.",
      errorType: "Register & Politeness Tone",
      explanation: "Direct imperatives like 'Please give us...' can sound demanding. Use 'I respectfully request an extension...'.",
      urduExplanation: "سینئر پارٹنر سے گزارش کرتے وقت 'Please give' کے بجائے 'I respectfully request an extension' زیادہ مؤدبانہ ہے۔"
    }
  ]
};

export const MOCK_AUDIO_DIALOGUES: AudioDialogue[] = [
  {
    id: 'aud-1',
    title: 'Audit Partner Briefing on Materiality & Risk',
    speaker: 'Mr. Salman (Audit Partner) & Ayesha (Audit Senior)',
    duration: '2 min 15 sec',
    category: 'Audit & Assurance',
    script: `Good morning, team. Today we are initiating the statutory audit for Prime Logistics. Before we execute substantive procedures, I want everyone to revisit our materiality threshold. 

We have set planning materiality at 1.5% of gross revenue, which equates to forty-five million rupees. However, given recent turbulence in fuel hedging contracts, performance materiality is strictly capped at sixty percent of that figure. 

Ayesha, ensure your team substantiates all lease liabilities and scrutinizes any related-party transactions thoroughly. Remember, documentation must be robust enough to withstand independent regulatory scrutiny by ICAP quality review boards.`,
    highlightedTerms: [
      { term: 'Substantive procedures', definition: 'Audit testing designed to detect material misstatements at the assertion level.', urdu: 'آڈٹ کے وہ ٹیسٹ جن کے ذریعے مالیاتی کھاتوں میں غلطیوں کی چھان بین کی جاتی ہے۔' },
      { term: 'Performance materiality', definition: 'An amount set by the auditor at less than materiality for the financial statements as a whole.', urdu: 'وہ رقم جو خطرے سے بچنے کے لیے مجموعی میٹریلٹی سے کم رکھی جاتی ہے۔' },
      { term: 'Related-party transactions', definition: 'Business dealings between parties who have an existing close relationship or common ownership.', urdu: 'ایسے کاروباری لین دین جو آپس میں قریبی تعلق رکھنے والے اداروں کے درمیان ہوں۔' }
    ],
    quiz: [
      {
        question: 'What percentage of gross revenue was designated for planning materiality?',
        options: ['0.5%', '1.5%', '5.0%', '10.0%'],
        correctIndex: 1,
        explanation: 'The partner stated: "We have set planning materiality at 1.5% of gross revenue."',
        urduExplanation: 'پارٹنر نے واضح کہا تھا کہ پلاننگ میٹریلٹی مجموعی ریونیو کا 1.5 فیصد ہے۔'
      },
      {
        question: 'Why was performance materiality restricted to 60% of the threshold?',
        options: [
          'Because the client requested a discount.',
          'Due to turbulence and volatility in fuel hedging contracts.',
          'Because the audit team was short-staffed.',
          'To finish the audit one week early.'
        ],
        correctIndex: 1,
        explanation: 'The partner cited "recent turbulence in fuel hedging contracts" as the primary reason for a conservative performance materiality cap.',
        urduExplanation: 'ایندھن کے ہیجنگ معاہدوں میں غیر یقینی صورتحال کی وجہ سے پرفارمنس میٹریلٹی کو 60 فیصد تک محدود رکھا گیا۔'
      },
      {
        question: 'Which body was mentioned regarding independent quality review?',
        options: ['Tax Appeals Tribunal', 'ICAP Quality Review Board', 'Chamber of Commerce', 'State Bank Banking Court'],
        correctIndex: 1,
        explanation: 'The script emphasizes withstanding "independent regulatory scrutiny by ICAP quality review boards."',
        urduExplanation: 'آڈٹ دستاویزات ایسی ہونی چاہئیں جو ICAP کوالٹی ریویو بورڈ کی جانچ پر پوری اتریں۔'
      }
    ]
  },
  {
    id: 'aud-2',
    title: 'Board Audit Committee: Internal Control Deficiencies',
    speaker: 'Zubair Khan (Internal Audit Head) & Board Members',
    duration: '2 min 40 sec',
    category: 'Corporate Governance',
    script: `Respected committee members, our quarterly internal audit identified two material weaknesses in segregation of duties within the procurement division. 

Currently, single procurement officers possess authority to approve purchase orders, verify received goods, and initiate automated electronic vendor disbursements. This lack of dual authorization elevates the inherent risk of misappropriation. 

We strongly advise immediate segregation between goods receipt authorization and vendor payment release, alongside periodic third-party bank confirmations. Management has concurred with our findings and committed to implementing three-way matching controls within thirty calendar days.`,
    highlightedTerms: [
      { term: 'Segregation of duties', definition: 'Internal control principle assigning different steps of a transaction to different individuals to prevent fraud.', urdu: 'اختیارات کی تقسیم — یعنی ایک ہی فرد کو تمام مراحل کا اختیار نہ دینا تاکہ بدعنوانی روکی جا سکے۔' },
      { term: 'Three-way matching', definition: 'Verifying that Purchase Order, Receiving Report, and Vendor Invoice match before payment.', urdu: 'خریداری کا آرڈر، سامان کی رسید اور بل کا باہمی موازنہ۔' },
      { term: 'Inherent risk', definition: 'The susceptibility of an assertion to a misstatement before consideration of any related controls.', urdu: 'اندرونی کنٹرولز لاگو کرنے سے پہلے پایا جانے والا بنیادی خطرہ۔' }
    ],
    quiz: [
      {
        question: 'What was the primary control deficiency discovered in procurement?',
        options: [
          'Overpriced purchase orders',
          'Lack of segregation of duties allowing one officer to approve, receive, and pay',
          'Delayed quarterly tax filings',
          'Absence of physical warehouse security guards'
        ],
        correctIndex: 1,
        explanation: 'The speaker highlighted single officers having authority to approve, receive, and disburse without dual checks.',
        urduExplanation: 'بنیادی خامی یہ تھی کہ ایک ہی افسر کو سامان کی منظوری، وصولی اور ادائیگی کے تمام اختیارات حاصل تھے۔'
      },
      {
        question: 'What control mechanism did management agree to deploy within 30 days?',
        options: ['Cash on delivery', 'Three-way matching controls', 'Manual handwritten ledgers', 'Complete factory shutdown'],
        correctIndex: 1,
        explanation: 'Management committed to implementing "three-way matching controls within thirty calendar days."',
        urduExplanation: 'مینجمنٹ نے 30 دنوں میں Three-way matching لاگو کرنے پر اتفاق کیا۔'
      },
      {
        question: 'What risk does a single approval system elevate according to the auditor?',
        options: ['Interest rate fluctuation', 'Risk of misappropriation and fraud', 'Foreign exchange depreciation', 'Labor strikes'],
        correctIndex: 1,
        explanation: 'The speaker noted it "elevates the inherent risk of misappropriation."',
        urduExplanation: 'اس سے غبن اور دھوکہ دہی (Misappropriation) کا خطرہ بڑھ جاتا ہے۔'
      }
    ]
  },
  {
    id: 'aud-3',
    title: 'Client Meeting: Revenue Recognition (IFRS 15)',
    speaker: 'Fahad (Senior Consultant) & Client Controller',
    duration: '2 min 10 sec',
    category: 'Financial Reporting',
    script: `Under IFRS fifteen, revenue cannot be recognized upon signing a multi-year software licensing contract. Instead, we must delineate distinct performance obligations. 

If software customization and technical maintenance represent separate performance milestones, revenue must be apportioned according to relative stand-alone selling prices. 

Recognizing the total contract value upfront would lead to a material misstatement in your annual financial statements, potentially resulting in a qualified audit opinion.`,
    highlightedTerms: [
      { term: 'Performance obligations', definition: 'A promise in a contract with a customer to transfer a distinct good or service.', urdu: 'معاہدے کے تحت ادا کی جانے والی الگ الگ خدمات یا سامان کی ترسیل۔' },
      { term: 'Qualified audit opinion', definition: 'An audit opinion stating that financial statements are fairly presented except for a specific material matter.', urdu: 'ایسی آڈٹ رائے جس میں کسی مخصوص غلطی یا اعتراض کے علاوہ کھاتوں کو درست مانا جائے۔' },
      { term: 'Stand-alone selling price', definition: 'The price at which an entity would sell a promised good or service separately to a customer.', urdu: 'کسی سروس یا پروڈکٹ کی الگ سے فروخت کی جانے والی حقیقی قیمت۔' }
    ],
    quiz: [
      {
        question: 'According to IFRS 15, when is revenue recognized?',
        options: [
          'Immediately when cash is received in advance',
          'As each distinct performance obligation is satisfied over time',
          'Only at the end of ten fiscal years',
          'Whenever the CEO authorizes it verbally'
        ],
        correctIndex: 1,
        explanation: 'Revenue is recognized when or as distinct performance obligations are satisfied.',
        urduExplanation: 'IFRS 15 کے مطابق آمدنی تب تسلیم کی جاتی ہے جب معاہدے کی مخصوص ذمہ داریاں مکمل ہوں۔'
      },
      {
        question: 'What would happen if the entire contract revenue was recognized upfront?',
        options: [
          'The company would receive an award',
          'It would cause a material misstatement and potential qualified audit opinion',
          'The tax rate would drop to zero',
          'No impact on financial disclosures'
        ],
        correctIndex: 1,
        explanation: 'The consultant warned of "a material misstatement... potentially resulting in a qualified audit opinion."',
        urduExplanation: 'اس سے مالیاتی گوشواروں میں سنگین غلطی پیدا ہوگی اور کوالیفائیڈ آڈٹ رپورٹ جاری ہو سکتی ہے۔'
      },
      {
        question: 'How should revenue be apportioned between customization and maintenance?',
        options: [
          'Divided equally 50/50 arbitrarily',
          'According to relative stand-alone selling prices',
          'Based on client whims',
          'Ignored until the contract expires'
        ],
        correctIndex: 1,
        explanation: 'IFRS 15 requires allocation based on relative stand-alone selling prices.',
        urduExplanation: 'ہر سروس کی الگ مارکیٹ قیمت (Stand-alone selling price) کے تناسب سے تقسیم کیا جانا چاہیے۔'
      }
    ]
  }
];

export const MOCK_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    phrase: 'Mitigate Risk',
    pronunciation: '/ˈmɪt.ɪ.ɡeɪt rɪsk/',
    category: 'Audit & Assurance',
    definition: 'To take proactive measures to reduce the severity, likelihood, or negative impact of potential financial or operational loss.',
    exampleSentence: 'The internal audit team advised implementing dual authorization to mitigate the risk of fraudulent disbursements.',
    urduMeaning: 'خطرے کے اثرات یا امکان کو کم کرنا',
    romanUrdu: 'Khatray aur nuqsan ke asraat ko kam karna ya mehfooz tadabeer apnana.'
  },
  {
    id: 'fc-2',
    phrase: 'Adhere to Compliance',
    pronunciation: '/ədˈhɪər tuː kəmˈplaɪ.əns/',
    category: 'Corporate Law',
    definition: 'To strictly observe and follow statutory regulations, legal standards, and professional codes of governance.',
    exampleSentence: 'Chartered accountants must adhere to strict regulatory compliance guidelines issued by ICAP and SECP.',
    urduMeaning: 'قانونی ضوابط اور اصولوں کی سختی سے پابندی کرنا',
    romanUrdu: 'Qanooni qawaneen aur idarati usoolon par mukammal amal-dar-amad karna.'
  },
  {
    id: 'fc-3',
    phrase: 'Reconcile Accounts',
    pronunciation: '/ˈrek.ən.saɪl əˈkaʊnts/',
    category: 'Financial Reporting',
    definition: 'To compare two sets of financial records to ensure figures are in agreement and resolve discrepancies.',
    exampleSentence: 'The junior auditor was instructed to reconcile the general ledger bank balance with the year-end statement.',
    urduMeaning: 'کھاتوں کے فرق کو ملا کر درست کرنا (تطبیق دینا)',
    romanUrdu: 'Do mukhtalif khatajat ka aapas mein mawazna karke farq ko khatam karna.'
  },
  {
    id: 'fc-4',
    phrase: 'Substantiate Assertions',
    pronunciation: '/səbˈstæn.ʃi.eɪt əˈsɜː.ʃənz/',
    category: 'Audit & Assurance',
    definition: 'To provide sufficient, reliable, and appropriate documentary evidence to prove the accuracy of financial statement claims.',
    exampleSentence: 'Auditors must obtain third-party confirmations to substantiate management assertions regarding accounts receivable.',
    urduMeaning: 'ٹھوس شواہد اور ثبوتوں سے کسی دعوے کو ثابت کرنا',
    romanUrdu: 'Dastavezi sabooton ke zariye maali daawon ki tasdeeq karna.'
  },
  {
    id: 'fc-5',
    phrase: 'Material Misstatement',
    pronunciation: '/məˈtɪə.ri.əl ˌmɪsˈsteɪt.mənt/',
    category: 'Audit & Assurance',
    definition: 'Information in financial statements that is sufficiently incorrect, omitted, or obscured that it influences user economic decisions.',
    exampleSentence: 'Failing to record a major loan guarantee resulted in a material misstatement in the balance sheet.',
    urduMeaning: 'سنگین مالیاتی غلطی جو فیصلہ سازی پر اثر انداز ہو سکے',
    romanUrdu: 'Aisi bari ghalti ya jhol jo maali faisla sazi ko tabdeel kar sakti ho.'
  },
  {
    id: 'fc-6',
    phrase: 'Prudent Judgement',
    pronunciation: '/ˈpruː.dənt ˈdʒʌdʒ.mənt/',
    category: 'Business Ethics',
    definition: 'Exercising caution, sound reasoning, and professional skepticism when making accounting estimates under uncertainty.',
    exampleSentence: 'Exercising prudent judgement prevents the overstatement of assets and revenue in uncertain market conditions.',
    urduMeaning: 'دانشمندانہ اور محتاط پیشہ ورانہ رائے',
    romanUrdu: 'Ghair yaqeeni halaat mein ahtiyaat aur aqal-mandi se faisla karna.'
  },
  {
    id: 'fc-7',
    phrase: 'Due Diligence',
    pronunciation: '/djuː ˈdɪl.ɪ.dʒəns/',
    category: 'Corporate Law',
    definition: 'A comprehensive investigation or audit of a potential investment or product to confirm all material facts and liabilities.',
    exampleSentence: 'Before executing the merger, the advisory firm performed exhaustive financial due diligence on the target entity.',
    urduMeaning: 'مکمل اور گہری چھان بین و جانچ پڑتال',
    romanUrdu: 'Kisi karobari soday se pehle tamam maali records ki mukammal tehqeeq.'
  },
  {
    id: 'fc-8',
    phrase: 'Going Concern Assumption',
    pronunciation: '/ˈɡəʊ.ɪŋ kənˈsɜːn əˈsʌmp.ʃən/',
    category: 'Financial Reporting',
    definition: 'The fundamental accounting convention that an entity will continue operating in business for the foreseeable future (at least 12 months).',
    exampleSentence: 'If liabilities exceed assets significantly, the auditor must assess if the going concern assumption remains valid.',
    urduMeaning: 'کاروبار کے مستقبل میں جاری رہنے کا بنیادی مفروضہ',
    romanUrdu: 'Yeh bunyadi usool ke idara anay walay saal mein band nahi hoga balkay chalta rahega.'
  },
  {
    id: 'fc-9',
    phrase: 'Adverse Opinion',
    pronunciation: '/ˈæd.vɜːs əˈpɪn.jən/',
    category: 'Audit & Assurance',
    definition: 'An audit opinion issued when misstatements are both material and pervasive to the financial statements as a whole.',
    exampleSentence: 'The statutory auditor was forced to issue an adverse opinion due to pervasive unrecorded liabilities.',
    urduMeaning: 'منفی آڈٹ رائے (کھاتے مکمل طور پر غلط ہیں)',
    romanUrdu: 'Aisi audit report jahan ghaltiyan itni bari hon ke poore khate na-qabil e aitbaar hon.'
  },
  {
    id: 'fc-10',
    phrase: 'Fiduciary Duty',
    pronunciation: '/fɪˈdjuː.ʃi.ə.ri ˈdjuː.ti/',
    category: 'Business Ethics',
    definition: 'The highest standard of care, honesty, and loyalty owed by a professional holding financial trust for another entity.',
    exampleSentence: 'Corporate directors breach their fiduciary duty if they prioritize personal enrichment over shareholder wealth.',
    urduMeaning: 'امانت داری اور سچی وفاداری کا لازمی اخلاقی و قانونی فرض',
    romanUrdu: 'Doosron ke maali mafad ki mukammal imandari se hifazat karne ka farz.'
  }
];

export const MOCK_VIDEO_LECTURES: VideoLecture[] = [
  {
    id: 'vid-1',
    title: 'ICAP Functional English: Subject-Verb Agreement Masterclass',
    topic: 'Grammar Essentials for CA Students',
    youtubeId: 'dQw4w9WgXcQ', // Clean placeholder embed
    duration: '18 min',
    description: 'Learn the 10 crucial subject-verb agreement rules that frequently appear in ICAP PRC / CAF English examinations.',
    aiNotes: [
      'Singular subjects joined by "along with", "as well as", or "in addition to" take a singular verb.',
      'In "Neither... nor" and "Either... or" constructions, the verb agrees with the closer subject.',
      'Collective nouns (committee, jury, board) take singular verbs when acting as a unified entity.',
      'Indefinite pronouns like "each", "everyone", "neither" strictly take singular verbs.',
      'Inverted sentences (beginning with "Seldom", "Rarely", "There") place the auxiliary verb before the subject.'
    ]
  },
  {
    id: 'vid-2',
    title: 'Formal Business Email Writing for CA Articleship & Exams',
    topic: 'Professional Written Communication',
    youtubeId: 'VIDEO_ID_2',
    duration: '22 min',
    description: 'Master the 5-part email framework required for ICAP Business Writing scenarios and audit workplace communication.',
    aiNotes: [
      'Begin with a concise, polite purpose statement ("I am writing to apprise you of...").',
      'Use passive and non-accusatory voice when highlighting errors or audit discrepancies.',
      'Avoid casual contractions (use "do not" instead of "don\'t" in formal letters).',
      'Structure body into problem, mitigating actions taken, and explicit call-to-action.',
      'Close with professional sign-offs: "Yours sincerely" (known name) or "Yours faithfully" (unknown recipient).'
    ]
  },
  {
    id: 'vid-3',
    title: 'Active vs Passive Voice in Audit & Accounting Reports',
    topic: 'Tone, Register & Objectivity',
    youtubeId: 'VIDEO_ID_3',
    duration: '15 min',
    description: 'Why CA professionals prefer agentless passive voice in internal control reports and management representation letters.',
    aiNotes: [
      'Passive voice shifts focus from the person at fault to the actual financial discrepancy.',
      'Standard formula: Subject + Form of "to be" + Past Participle (e.g., "was inadvertently omitted").',
      'Avoid excessive nominalizations that make sentences overly dense and unreadable.',
      'Ensure introductory participial clauses modify the true subject to avoid dangling modifiers.',
      'Use modal hedging ("appears to be", "may indicate") when assertions are not yet 100% verified.'
    ]
  }
];
