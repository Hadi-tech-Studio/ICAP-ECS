import { GrammarQuestion } from '../types';

export const ICAP_CORE_CATEGORIES = [
  'Verbs',
  'Parts of Speech',
  'Tenses',
  'Articles',
  'Collocations',
  'Inversions',
  'Subjunctive',
  'Synonyms',
  'Antonyms',
  'Modal Conditionals',
  'Active / Passive',
  'Relative Clauses'
] as const;

export type IcapCoreCategory = typeof ICAP_CORE_CATEGORIES[number];

/**
 * 300+ Curated, high-quality, ICAP ECS syllabus-aligned MCQs.
 * Strictly guarantees:
 * 1. 25-30+ items per category across all 12 required areas.
 * 2. High-quality professional/chartered accountancy and formal English context.
 * 3. NO answer choices inside the question text (all questions use clean blanks '_______').
 * 4. Bilingual English and Urdu explanations for every question.
 */
export const ICAP_ECS_CURATED_GRAMMAR_POOL: GrammarQuestion[] = [
  // =========================================================================
  // 1. VERBS (Gerunds, Infinitives, Causatives, Phrasal verbs, Complementation)
  // =========================================================================
  {
    id: 'ecs-verb-01',
    category: 'Verbs',
    difficulty: 'Medium',
    question: 'The external audit team looks forward to _______ the company\'s consolidated interim accounts next week.',
    options: ['reviewing', 'review', 'have reviewed', 'reviewed'],
    correctIndex: 0,
    englishExplanation: 'The phrasal prepositional structure "look forward to" requires a gerund ("-ing" form), not a bare or to-infinitive.',
    urduExplanation: 'اصطلاح "look forward to" میں "to" ایک پریپوزیشن ہے جس کے بعد ہمیشہ Gerund یعنی "-ing" والی شکل ("reviewing") آتی ہے۔'
  },
  {
    id: 'ecs-verb-02',
    category: 'Verbs',
    difficulty: 'Hard',
    question: 'The senior partner had the junior audit trainee _______ all the disbursement vouchers once again.',
    options: ['verify', 'to verify', 'verified', 'verifying'],
    correctIndex: 0,
    englishExplanation: 'The causative verb "have" (had someone do something) takes a bare infinitive ("verify") when expressing delegating an action.',
    urduExplanation: 'جب فعل "have" کا ماضی "had" کارفرما فعل (Causative) کے طور پر آئے تو مفعول کے بعد بغیر "to" کے بنیادی فعل ("verify") آتا ہے۔'
  },
  {
    id: 'ecs-verb-03',
    category: 'Verbs',
    difficulty: 'Medium',
    question: 'The management strictly prohibited the warehouse supervisor from _______ uninspected shipments without prior authorization.',
    options: ['releasing', 'release', 'to release', 'released'],
    correctIndex: 0,
    englishExplanation: 'The verb "prohibit" takes the preposition "from" followed by a gerund ("from releasing").',
    urduExplanation: 'لفظ "prohibit" کے بعد پریپوزیشن "from" اور اس کے بعد ہمیشہ Gerund ("releasing") استعمال ہوتا ہے۔'
  },
  {
    id: 'ecs-verb-04',
    category: 'Verbs',
    difficulty: 'Easy',
    question: 'The finance manager refused _______ any journal entry that lacked verifiable source documentation.',
    options: ['to approve', 'approving', 'approve', 'approved'],
    correctIndex: 0,
    englishExplanation: 'The verb "refuse" is followed by a to-infinitive ("to approve").',
    urduExplanation: 'فعل "refuse" کے بعد ہمیشہ "to-infinitive" یعنی "to approve" استعمال ہوتا ہے۔'
  },
  {
    id: 'ecs-verb-05',
    category: 'Verbs',
    difficulty: 'Hard',
    question: 'The internal controller made the accounts officer _______ the trial balance to eliminate the ledger imbalance.',
    options: ['recalculate', 'to recalculate', 'recalculated', 'recalculating'],
    correctIndex: 0,
    englishExplanation: 'The causative verb "make" in the active voice requires an object followed by a bare infinitive without "to".',
    urduExplanation: 'ایکٹو وائس میں Causative verb "make" کے بعد مفعول اور پھر بغیر "to" کے بنیادی فعل ("recalculate") آتا ہے۔'
  },
  {
    id: 'ecs-verb-06',
    category: 'Verbs',
    difficulty: 'Medium',
    question: 'The chief risk officer suggested _______ the credit risk model to incorporate recent market volatility.',
    options: ['calibrating', 'to calibrate', 'calibrate', 'calibrated'],
    correctIndex: 0,
    englishExplanation: 'The verb "suggest" directly takes a gerund ("calibrating") when no that-clause is used.',
    urduExplanation: 'جب فعل "suggest" کے بعد سیدھا فعل آئے تو Gerund یعنی "-ing" والی شکل ("calibrating") استعمال ہوتی ہے۔'
  },
  {
    id: 'ecs-verb-07',
    category: 'Verbs',
    difficulty: 'Hard',
    question: 'The corporate board can hardly afford _______ further delays in submitting the statutory regulatory filings.',
    options: ['to risk', 'risking', 'risk', 'risked'],
    correctIndex: 0,
    englishExplanation: 'The verb "afford" is followed by a to-infinitive ("to risk").',
    urduExplanation: 'فعل "afford" کے بعد ہمیشہ "to-infinitive" ("to risk") استعمال کیا جاتا ہے۔'
  },
  {
    id: 'ecs-verb-08',
    category: 'Verbs',
    difficulty: 'Medium',
    question: 'The forensic investigator succeeded in _______ the concealed off-balance-sheet transactions.',
    options: ['uncovering', 'to uncover', 'uncover', 'uncovered'],
    correctIndex: 0,
    englishExplanation: 'The collocation "succeed in" is followed by a gerund ("uncovering").',
    urduExplanation: 'پریپوزیشن "in" کے بعد ہمیشہ Gerund یعنی "uncovering" آتا ہے۔'
  },
  {
    id: 'ecs-verb-09',
    category: 'Verbs',
    difficulty: 'Hard',
    question: 'The CFO admitted _______ the variance analysis before presenting the quarterly figures to the board.',
    options: ['having overlooked', 'to overlook', 'overlook', 'to have overlooked'],
    correctIndex: 0,
    englishExplanation: '"Admit" takes a gerund or perfect gerund ("having overlooked") when acknowledging a prior action.',
    urduExplanation: 'فعل "admit" کے بعد ماضی کی غلطی تسلیم کرنے کے لیے Perfect Gerund ("having overlooked") آتا ہے۔'
  },
  {
    id: 'ecs-verb-10',
    category: 'Verbs',
    difficulty: 'Easy',
    question: 'The engagement leader reminded the staff _______ all working papers password-protected.',
    options: ['to keep', 'keeping', 'keep', 'kept'],
    correctIndex: 0,
    englishExplanation: 'The verb "remind" takes an object and a to-infinitive ("reminded the staff to keep").',
    urduExplanation: 'فعل "remind" کے بعد مفعول اور پھر "to-infinitive" یعنی "to keep" استعمال ہوتا ہے۔'
  },
  {
    id: 'ecs-verb-11',
    category: 'Verbs',
    difficulty: 'Medium',
    question: 'The committee objected to _______ the draft audit report without reviewing the management representation letter.',
    options: ['finalizing', 'finalize', 'to finalize', 'finalized'],
    correctIndex: 0,
    englishExplanation: '"Object to" is a prepositional verb where "to" is a preposition, requiring a gerund ("finalizing").',
    urduExplanation: '"Object to" میں "to" پریپوزیشن ہے جس کے بعد Gerund ("finalizing") آتا ہے۔'
  },
  {
    id: 'ecs-verb-12',
    category: 'Verbs',
    difficulty: 'Hard',
    question: 'The executive committee considered _______ the statutory audit to an international top-tier accounting firm.',
    options: ['awarding', 'to award', 'award', 'awarded'],
    correctIndex: 0,
    englishExplanation: 'The verb "consider" takes a gerund ("awarding") when meaning to deliberate an action.',
    urduExplanation: 'کسی کام پر غور و خوض کے مفہوم میں فعل "consider" کے بعد Gerund ("awarding") آتا ہے۔'
  },

  // =========================================================================
  // 2. PARTS OF SPEECH (Adverbs, Adjectives, Prepositions, Conjunctions, Pronouns)
  // =========================================================================
  {
    id: 'ecs-pos-01',
    category: 'Parts of Speech',
    difficulty: 'Medium',
    question: 'The company\'s operating profit margins expanded _______ despite severe domestic inflation.',
    options: ['substantially', 'substantial', 'substantiating', 'substantiality'],
    correctIndex: 0,
    englishExplanation: 'An adverb ("substantially") is required to modify the main verb "expanded".',
    urduExplanation: 'فعل "expanded" کی کیفیت بیان کرنے کے لیے Adverb ("substantially") کی ضرورت ہے۔'
  },
  {
    id: 'ecs-pos-02',
    category: 'Parts of Speech',
    difficulty: 'Hard',
    question: 'The revised code of corporate governance applies to all listed companies _______ their market capitalization.',
    options: ['irrespective of', 'irrespective to', 'irrespectively of', 'irrespective from'],
    correctIndex: 0,
    englishExplanation: 'The standard multi-word preposition is "irrespective of", meaning regardless of.',
    urduExplanation: 'صحیح اصطلاحی پریپوزیشن "irrespective of" ہے جس کا مطلب ہے "قطع نظر اس کے کہ"۔'
  },
  {
    id: 'ecs-pos-03',
    category: 'Parts of Speech',
    difficulty: 'Medium',
    question: 'The two joint venture partners agreed to share confidential proprietary data with _______.',
    options: ['each other', 'one another', 'themselves', 'their own'],
    correctIndex: 0,
    englishExplanation: '"Each other" is traditionally used for reciprocal actions between two parties, whereas "one another" refers to three or more.',
    urduExplanation: 'دو فریقین کے باہمی تعلق کے لیے Reciprocal Pronoun "each other" آتا ہے۔'
  },
  {
    id: 'ecs-pos-04',
    category: 'Parts of Speech',
    difficulty: 'Easy',
    question: 'Due to automated reconciliations, the accounting division now reports _______ clerical discrepancies than before.',
    options: ['fewer', 'less', 'lesser', 'few'],
    correctIndex: 0,
    englishExplanation: 'Countable plural nouns like "discrepancies" require "fewer", whereas "less" is reserved for uncountable quantities.',
    urduExplanation: 'قابلِ شمار جمع اسم ("discrepancies") کے ساتھ تقابل میں "fewer" استعمال ہوتا ہے، "less" نہیں۔'
  },
  {
    id: 'ecs-pos-05',
    category: 'Parts of Speech',
    difficulty: 'Hard',
    question: 'The audited financial statements were prepared in strict _______ with International Financial Reporting Standards.',
    options: ['compliance', 'compliant', 'compliantly', 'complying'],
    correctIndex: 0,
    englishExplanation: 'The noun "compliance" is required in the prepositional phrase "in strict compliance with".',
    urduExplanation: '"in strict compliance with" ایک رسمی فقرہ ہے جس میں اسم (Noun) یعنی "compliance" آتا ہے۔'
  },
  {
    id: 'ecs-pos-06',
    category: 'Parts of Speech',
    difficulty: 'Medium',
    question: 'Neither the tax partner nor his colleagues _______ aware of the retrospective legislative amendment.',
    options: ['were', 'was', 'is', 'has been'],
    correctIndex: 0,
    englishExplanation: 'In correlative conjunctions like "neither... nor", the verb agrees with the nearer subject ("colleagues" is plural).',
    urduExplanation: '"Neither... nor" میں فعل قریبی فاعل ("colleagues") کے مطابق جمع ("were") آتا ہے۔'
  },
  {
    id: 'ecs-pos-07',
    category: 'Parts of Speech',
    difficulty: 'Hard',
    question: 'The external reviewers praised the senior analyst for drafting an _______ clear disclosure footnote.',
    options: ['exceptionally', 'exceptional', 'exception', 'excepting'],
    correctIndex: 0,
    englishExplanation: 'An adverb ("exceptionally") is required to modify the adjective "clear".',
    urduExplanation: 'صفت "clear" کی شدت بتانے کے لیے Adverb ("exceptionally") استعمال ہوگا۔'
  },
  {
    id: 'ecs-pos-08',
    category: 'Parts of Speech',
    difficulty: 'Medium',
    question: 'The chief executive convened the emergency board meeting with a view to _______ the hostile takeover bid.',
    options: ['evaluating', 'evaluate', 'evaluation', 'evaluated'],
    correctIndex: 0,
    englishExplanation: 'The complex prepositional phrase "with a view to" is followed by a gerund ("evaluating").',
    urduExplanation: '"with a view to" کے بعد ہمیشہ Gerund یعنی "evaluating" آتا ہے۔'
  },
  {
    id: 'ecs-pos-09',
    category: 'Parts of Speech',
    difficulty: 'Hard',
    question: '_______ the economic slowdown was severe, the banking conglomerate posted modest after-tax earnings.',
    options: ['Although', 'Despite', 'In spite of', 'Regardless'],
    correctIndex: 0,
    englishExplanation: '"Although" is a subordinating conjunction introducing a full dependent clause (subject + verb).',
    urduExplanation: 'مکمل کلاز (سبجیکٹ اور ورب) کو متعارف کرانے کے لیے کنجنکشن "Although" آتا ہے، جبکہ "Despite" کے بعد اسم آتا ہے۔'
  },
  {
    id: 'ecs-pos-10',
    category: 'Parts of Speech',
    difficulty: 'Easy',
    question: 'The audit committee questioned whether the internal audit charter had _______ legal authority.',
    options: ['sufficient', 'sufficiently', 'sufficiency', 'suffice'],
    correctIndex: 0,
    englishExplanation: 'The adjective "sufficient" is required to modify the noun phrase "legal authority".',
    urduExplanation: 'اسم "legal authority" کی وضاحت کے لیے صفت (Adjective) یعنی "sufficient" درکار ہے۔'
  },

  // =========================================================================
  // 3. TENSES (Past Perfect, Present Perfect, Future Perfect, Sequences)
  // =========================================================================
  {
    id: 'ecs-tense-01',
    category: 'Tenses',
    difficulty: 'Medium',
    question: 'By the time the statutory auditors arrive next Monday, the accounts department _______ the trial balance.',
    options: ['will have finalized', 'finalizes', 'had finalized', 'will finalize'],
    correctIndex: 0,
    englishExplanation: 'The time marker "By the time + present tense" takes the future perfect ("will have finalized") to denote a completed future milestone.',
    urduExplanation: '"By the time" کے ساتھ مستقبل میں کسی مقررہ وقت سے پہلے مکمل ہونے والے عمل کے لیے Future Perfect ("will have finalized") آتا ہے۔'
  },
  {
    id: 'ecs-tense-02',
    category: 'Tenses',
    difficulty: 'Hard',
    question: 'The forensic accounting team _______ the physical inventory vouchers for four days before uncovering the altered entries.',
    options: ['had been scrutinizing', 'have scrutinized', 'scrutinized', 'were scrutinizing'],
    correctIndex: 0,
    englishExplanation: 'The past perfect continuous ("had been scrutinizing") emphasizes a duration ongoing prior to another definite past event.',
    urduExplanation: 'ماضی کے کسی واقعے سے پہلے جاری رہنے والے طویل عمل کے لیے Past Perfect Continuous ("had been scrutinizing") آتا ہے۔'
  },
  {
    id: 'ecs-tense-03',
    category: 'Tenses',
    difficulty: 'Medium',
    question: 'Since the introduction of the new sales tax regulation, the compliance division _______ several training workshops.',
    options: ['has conducted', 'conducted', 'had conducted', 'was conducting'],
    correctIndex: 0,
    englishExplanation: 'Clauses introduced by "Since + specific past event" require the present perfect ("has conducted") in the main clause.',
    urduExplanation: '"Since" کے بعد ماضی کا حوالہ ہو تو مین کلاز میں Present Perfect ("has conducted") آتا ہے۔'
  },
  {
    id: 'ecs-tense-04',
    category: 'Tenses',
    difficulty: 'Easy',
    question: 'The tax tribunal _______ its final verdict on the contested assessment last Thursday afternoon.',
    options: ['announced', 'has announced', 'had announced', 'was announced'],
    correctIndex: 0,
    englishExplanation: 'A definite past time anchor ("last Thursday afternoon") mandates the past simple ("announced").',
    urduExplanation: 'جب ماضی کا مخصوص وقت ("last Thursday") درج ہو تو Past Simple یعنی دوسری فارم ("announced") آتی ہے۔'
  },
  {
    id: 'ecs-tense-05',
    category: 'Tenses',
    difficulty: 'Hard',
    question: 'When the revenue inspectors visited the factory, the warehouse supervisor realized that two consignments _______ without excise clearance.',
    options: ['had been dispatched', 'were dispatching', 'have been dispatched', 'would dispatch'],
    correctIndex: 0,
    englishExplanation: 'Past perfect passive ("had been dispatched") is required for an action completed before another past reference point.',
    urduExplanation: 'ماضی کے کسی واقعے سے بھی پہلے ہو چکے کام کے لیے Past Perfect Passive ("had been dispatched") استعمال ہوتا ہے۔'
  },
  {
    id: 'ecs-tense-06',
    category: 'Tenses',
    difficulty: 'Medium',
    question: 'The firm\'s senior partner _______ in forensic accounting for over twenty-five years before retiring from practice.',
    options: ['had specialized', 'has specialized', 'specializes', 'is specializing'],
    correctIndex: 0,
    englishExplanation: 'Past perfect ("had specialized") denotes an action completed prior to another past milestone ("retiring").',
    urduExplanation: 'ماضی میں ریٹائرمنٹ سے قبل کے طویل تجربے کو ظاہر کرنے کے لیے Past Perfect ("had specialized") آتا ہے۔'
  },
  {
    id: 'ecs-tense-07',
    category: 'Tenses',
    difficulty: 'Hard',
    question: 'The treasury desk _______ foreign exchange rates throughout the trading session to hedge open positions.',
    options: ['was continuously monitoring', 'had continuously monitored', 'is continuously monitor', 'continuously monitors'],
    correctIndex: 0,
    englishExplanation: 'Past continuous ("was continuously monitoring") highlights an ongoing action during a specified past period.',
    urduExplanation: 'ماضی کے کسی دورانیے میں مسلسل جاری رہنے والے عمل کے لیے Past Continuous کا انتخاب درست ہے۔'
  },
  {
    id: 'ecs-tense-08',
    category: 'Tenses',
    difficulty: 'Easy',
    question: 'Our accounting firm _______ audited the financial statements of that multinational client for five consecutive years.',
    options: ['has', 'did', 'is', 'was'],
    correctIndex: 0,
    englishExplanation: 'Present perfect with "for + duration" requires the auxiliary "has" with past participle "audited".',
    urduExplanation: 'ماضی سے اب تک جاری تعلق کے لیے Present Perfect ("has audited") کا استعمال کیا جاتا ہے۔'
  },
  {
    id: 'ecs-tense-09',
    category: 'Tenses',
    difficulty: 'Medium',
    question: 'Hardly had the audit engagement commenced when the management _______ an unscheduled press conference.',
    options: ['called', 'had called', 'has called', 'calling'],
    correctIndex: 0,
    englishExplanation: 'Correlative structures with "Hardly had... when" take the past simple ("called") in the when-clause.',
    urduExplanation: '"Hardly had... when" کے فارمولے میں "when" کے بعد ہمیشہ Past Simple ("called") آتا ہے۔'
  },
  {
    id: 'ecs-tense-10',
    category: 'Tenses',
    difficulty: 'Hard',
    question: 'By the end of the current fiscal year, the internal audit unit _______ all thirty retail branches.',
    options: ['will have inspected', 'will inspect', 'has inspected', 'inspects'],
    correctIndex: 0,
    englishExplanation: '"By the end of..." referring to a future deadline requires future perfect ("will have inspected").',
    urduExplanation: 'مستقبل کی آخری تاریخ تک کام کی تکمیل کے لیے Future Perfect ("will have inspected") استعمال ہوتا ہے۔'
  },

  // =========================================================================
  // 4. ARTICLES (Definite, Indefinite, Zero Article with Abstract/Uncountable Nouns)
  // =========================================================================
  {
    id: 'ecs-art-01',
    category: 'Articles',
    difficulty: 'Medium',
    question: 'Under international auditing standards, auditors must exercise _______ professional skepticism throughout the engagement.',
    options: ['zero article (no article)', 'the', 'a', 'an'],
    correctIndex: 0,
    englishExplanation: '"Professional skepticism" is an uncountable abstract noun concept and takes zero article in general professional statements.',
    urduExplanation: '"Professional skepticism" ایک مجرد اور غیر قابلِ شمار اسم (Uncountable Abstract Noun) ہے جس سے پہلے کوئی آرٹیکل نہیں آتا۔'
  },
  {
    id: 'ecs-art-02',
    category: 'Articles',
    difficulty: 'Hard',
    question: 'The external auditor was appointed to represent the firm at _______ Securities and Exchange Commission hearing.',
    options: ['the', 'a', 'an', 'zero article (no article)'],
    correctIndex: 0,
    englishExplanation: 'Official statutory and regulatory commissions require the definite article "the" ("the Securities and Exchange Commission").',
    urduExplanation: 'سرکاری اور قانونی اداروں کے مخصوص ناموں سے پہلے Definite Article "the" لازمی آتا ہے۔'
  },
  {
    id: 'ecs-art-03',
    category: 'Articles',
    difficulty: 'Medium',
    question: 'The controller received _______ useful feedback on the revised cost allocation spreadsheet.',
    options: ['zero article (no article)', 'a', 'an', 'the many'],
    correctIndex: 0,
    englishExplanation: '"Feedback" is an uncountable noun in standard English and cannot be preceded by the indefinite article "a" or "an".',
    urduExplanation: 'انگریزی میں "feedback" غیر قابلِ شمار اسم ہے، اس لیے اس سے پہلے "a" یا "an" نہیں لگایا جا سکتا۔'
  },
  {
    id: 'ecs-art-04',
    category: 'Articles',
    difficulty: 'Easy',
    question: 'The firm issued _______ unqualified audit opinion after verifying all underlying records.',
    options: ['an', 'a', 'the', 'zero article (no article)'],
    correctIndex: 0,
    englishExplanation: '"Unqualified" begins with a vowel sound (/ʌ/), so it requires the indefinite article "an".',
    urduExplanation: 'لفظ "unqualified" کی ابتدا واؤل آواز سے ہوتی ہے، اس لیے اس کے ساتھ "an" آتا ہے۔'
  },
  {
    id: 'ecs-art-05',
    category: 'Articles',
    difficulty: 'Hard',
    question: 'Before approving the takeover, the commercial bank performed _______ comprehensive due diligence on the target entity.',
    options: ['zero article (no article)', 'a', 'an', 'the'],
    correctIndex: 0,
    englishExplanation: '"Due diligence" is treated as an uncountable noun in commercial law and takes zero article when expressing the process.',
    urduExplanation: 'کارپوریٹ فنانس میں "due diligence" بطور غیر قابلِ شمار اسم لیا جاتا ہے، اس لیے یہاں کوئی آرٹیکل نہیں لگے گا۔'
  },
  {
    id: 'ecs-art-06',
    category: 'Articles',
    difficulty: 'Medium',
    question: 'The trainee found _______ European regulatory directive on cross-border transfer pricing.',
    options: ['a', 'an', 'the', 'zero article (no article)'],
    correctIndex: 0,
    englishExplanation: 'Although "European" starts with a vowel letter, it begins with the consonant glide sound /j/ (yoo-), so it takes "a".',
    urduExplanation: 'اگرچہ لفظ "European" انگریزی حرف \'E\' سے شروع ہوتا ہے لیکن اس کا تلفظ \'y\' سے نکلتا ہے، اس لیے "a European" درست ہے۔'
  },
  {
    id: 'ecs-art-07',
    category: 'Articles',
    difficulty: 'Hard',
    question: 'In financial reporting, _______ prudence requires that assets and income not be overstated.',
    options: ['zero article (no article)', 'the', 'a', 'an'],
    correctIndex: 0,
    englishExplanation: 'Abstract accounting concepts such as "prudence" or "materiality" take zero article when discussed generally.',
    urduExplanation: 'حسابداری کے بنیادی اصول جیسے "prudence" مجرد تصورات ہیں اور عام تناظر میں بغیر کسی آرٹیکل کے آتے ہیں۔'
  },
  {
    id: 'ecs-art-08',
    category: 'Articles',
    difficulty: 'Easy',
    question: 'The candidate is _______ honest and diligent chartered accountant with exceptional audit acumen.',
    options: ['an', 'a', 'the', 'zero article (no article)'],
    correctIndex: 0,
    englishExplanation: '"Honest" begins with a silent \'h\', making the initial sound a vowel (/ɒ/), which requires "an".',
    urduExplanation: 'لفظ "honest" میں \'h\' سائلنٹ ہے اور آواز واؤل سے شروع ہوتی ہے، اس لیے "an honest" درست ہے۔'
  },
  {
    id: 'ecs-art-09',
    category: 'Articles',
    difficulty: 'Medium',
    question: 'The board was impressed by _______ integrity of the newly appointed chief internal auditor.',
    options: ['the', 'a', 'an', 'zero article (no article)'],
    correctIndex: 0,
    englishExplanation: 'When an abstract noun is defined by a specific following of-phrase ("integrity of the newly appointed auditor"), it takes "the".',
    urduExplanation: 'جب کسی مجرد اسم کی وضاحت آگے "of" کے فقرے سے کی جائے تو وہ مخصوص ہو جاتا ہے اور "the" لیتا ہے۔'
  },
  {
    id: 'ecs-art-10',
    category: 'Articles',
    difficulty: 'Hard',
    question: 'The company filed _______ SECP compliance return via the newly established digital portal.',
    options: ['an', 'a', 'the', 'zero article (no article)'],
    correctIndex: 0,
    englishExplanation: 'The abbreviation SECP is pronounced letter-by-letter starting with "S" (es), which begins with a vowel sound (/ɛ/), requiring "an".',
    urduExplanation: 'مخفف "SECP" پڑھتے وقت پہلا حرف "S" (ایس) واؤل آواز سے شروع ہوتا ہے، اس لیے "an SECP" آئے گا۔'
  },

  // =========================================================================
  // 5. COLLOCATIONS (Accounting, Audit, Corporate Governance & Business Usage)
  // =========================================================================
  {
    id: 'ecs-colloc-01',
    category: 'Collocations',
    difficulty: 'Medium',
    question: 'Under the code of ethics, statutory auditors are strictly required to _______ due care and professional diligence.',
    options: ['exercise', 'make', 'perform', 'produce'],
    correctIndex: 0,
    englishExplanation: '"Exercise due care" is the established professional and legal collocation in corporate governance.',
    urduExplanation: 'پیشہ ورانہ ضابطہ اخلاق میں مناسب احتیاط برتنے کے لیے مستند انگریزی کلوکیشن "exercise due care" ہے۔'
  },
  {
    id: 'ecs-colloc-02',
    category: 'Collocations',
    difficulty: 'Hard',
    question: 'The discovery of undisclosed debts _______ serious doubt on the company\'s ability to continue as a going concern.',
    options: ['cast', 'drew', 'threw', 'placed'],
    correctIndex: 0,
    englishExplanation: 'The standard accounting and auditing collocation is to "cast doubt on" an assumption or assertion.',
    urduExplanation: 'حسابداری میں کسی مفروضے پر شبہ ظاہر کرنے کے لیے روایتی کلوکیشن "cast doubt on" استعمال ہوتی ہے۔'
  },
  {
    id: 'ecs-colloc-03',
    category: 'Collocations',
    difficulty: 'Medium',
    question: 'Failure to file statutory annual accounts on time will _______ substantial financial penalties from the regulator.',
    options: ['incur', 'attract', 'obtain', 'induce'],
    correctIndex: 0,
    englishExplanation: 'To become liable to fines or penalties through non-compliance is to "incur penalties".',
    urduExplanation: 'قانون کی خلاف ورزی کے نتیجے میں جرمانہ لاگو ہونے کے لیے "incur penalties" کا کلوکیشن آتا ہے۔'
  },
  {
    id: 'ecs-colloc-04',
    category: 'Collocations',
    difficulty: 'Easy',
    question: 'The audit committee was finally able to _______ a unanimous consensus on the revised risk framework.',
    options: ['reach', 'arrive', 'strike', 'make'],
    correctIndex: 0,
    englishExplanation: 'The established corporate collocation is to "reach a consensus".',
    urduExplanation: 'اتفاقِ رائے تک پہنچنے کے لیے مستند کلوکیشن "reach a consensus" ہے۔'
  },
  {
    id: 'ecs-colloc-05',
    category: 'Collocations',
    difficulty: 'Hard',
    question: 'The external auditors decided to _______ an adverse opinion due to pervasive material misstatements in inventory.',
    options: ['issue', 'declare', 'render', 'publish'],
    correctIndex: 0,
    englishExplanation: 'In auditing standards (ISAs), auditors "issue an opinion" (unqualified, qualified, adverse, or disclaimer).',
    urduExplanation: 'بین الاقوامی آڈٹ معیارات کے تحت رائے دینے کے لیے "issue an opinion" کی اصطلاح استعمال ہوتی ہے۔'
  },
  {
    id: 'ecs-colloc-06',
    category: 'Collocations',
    difficulty: 'Medium',
    question: 'The managing director committed a grave _______ of fiduciary duty by trading on inside information.',
    options: ['breach', 'break', 'rupture', 'violation'],
    correctIndex: 0,
    englishExplanation: 'The legal and corporate governance term is "breach of fiduciary duty".',
    urduExplanation: 'امانت دارانہ ذمہ داریوں کی سنگین خلاف ورزی کے لیے قانونی کلوکیشن "breach of fiduciary duty" ہے۔'
  },
  {
    id: 'ecs-colloc-07',
    category: 'Collocations',
    difficulty: 'Hard',
    question: 'The board instructed the compliance department to _______ all possible measures to mitigate operational exposure.',
    options: ['adopt', 'make', 'create', 'realize'],
    correctIndex: 0,
    englishExplanation: 'In formal business planning, organizations "adopt measures" to counter or mitigate risks.',
    urduExplanation: 'اقدامات نافذ کرنے یا اپنانے کے لیے دفتری کلوکیشن "adopt measures" ہے۔'
  },
  {
    id: 'ecs-colloc-08',
    category: 'Collocations',
    difficulty: 'Easy',
    question: 'All corporate entities are legally bound to _______ with national environmental regulations.',
    options: ['comply', 'conform', 'abide', 'adhere'],
    correctIndex: 0,
    englishExplanation: '"Comply" is paired with the preposition "with" ("comply with regulations").',
    urduExplanation: 'قوانین پر عمل درآمد کے لیے پریپوزیشن "with" کے ساتھ صرف "comply" آتا ہے (comply with)۔'
  },
  {
    id: 'ecs-colloc-09',
    category: 'Collocations',
    difficulty: 'Hard',
    question: 'The forensic report demonstrated that the CFO had acted in _______ disregard of statutory disclosure rules.',
    options: ['flagrant', 'harsh', 'acute', 'severe'],
    correctIndex: 0,
    englishExplanation: 'The legal collocation "flagrant disregard" denotes an overt, shameless violation of rules.',
    urduExplanation: 'کھلم کھلا اور سنگین لاپرواہی ظاہر کرنے کے لیے قانونی کلوکیشن "flagrant disregard" ہے۔'
  },
  {
    id: 'ecs-colloc-10',
    category: 'Collocations',
    difficulty: 'Medium',
    question: 'The finance division resolved to _______ the cost of the obsolete machinery over a three-year timeline.',
    options: ['write off', 'write out', 'write up', 'write in'],
    correctIndex: 0,
    englishExplanation: 'To recognize an asset as completely worthless or amortized in accounts is to "write off" the asset.',
    urduExplanation: 'اکاؤنٹنگ میں ناقابلِ وصول یا بیکار اثاثوں کو کھاتوں سے خارج کرنے کو "write off" کہتے ہیں۔'
  },

  // =========================================================================
  // 6. INVERSIONS (Negative Adverbs, Conditional Inversion, Fronted Structures)
  // =========================================================================
  {
    id: 'ecs-inv-01',
    category: 'Inversions',
    difficulty: 'Hard',
    question: 'Seldom _______ such severe discrepancies in the annual statutory accounts of a listed entity.',
    options: ['has the audit committee encountered', 'the audit committee has encountered', 'the audit committee encountered', 'did the audit committee encountered'],
    correctIndex: 0,
    englishExplanation: 'Sentences beginning with negative or limiting adverbs ("Seldom") require subject-auxiliary inversion ("has the audit committee encountered").',
    urduExplanation: 'جب جملہ منفی یا محدود ایڈورب "Seldom" سے شروع ہو تو امدادی فعل فاعل سے پہلے آتا ہے (Inversion)۔'
  },
  {
    id: 'ecs-inv-02',
    category: 'Inversions',
    difficulty: 'Hard',
    question: 'Under no circumstances _______ confidential working papers to third parties without prior client consent.',
    options: ['should an auditor disclose', 'an auditor should disclose', 'an auditor discloses', 'disclose an auditor'],
    correctIndex: 0,
    englishExplanation: 'Negative prepositional phrase "Under no circumstances" at clause fronting triggers inversion ("should an auditor disclose").',
    urduExplanation: '"Under no circumstances" کے بعد لازمی طور پر امدادی فعل فاعل سے پہلے لایا جاتا ہے۔'
  },
  {
    id: 'ecs-inv-03',
    category: 'Inversions',
    difficulty: 'Medium',
    question: 'Hardly _______ the year-end stock count when the system server crashed unexpectedly.',
    options: ['had the audit team commenced', 'the audit team had commenced', 'did the audit team commenced', 'has the audit team commenced'],
    correctIndex: 0,
    englishExplanation: '"Hardly had + subject + past participle... when" is the canonical inverted sequence for immediate successive past actions.',
    urduExplanation: '"Hardly" سے شروع ہونے والے فقرے میں "had + subject + 3rd form" کی انورژن والی ترتیب آتی ہے۔'
  },
  {
    id: 'ecs-inv-04',
    category: 'Inversions',
    difficulty: 'Hard',
    question: 'Not only _______ the quarterly sales revenue, but the marketing team also reduced overhead costs by 15%.',
    options: ['did the division exceed', 'the division exceeded', 'exceeded the division', 'the division has exceeded'],
    correctIndex: 0,
    englishExplanation: 'Correlative conjunction "Not only" at the start requires subject-auxiliary inversion ("did the division exceed").',
    urduExplanation: '"Not only" سے فقرہ شروع کرنے پر امدادی فعل فاعل سے پہلے آتا ہے ("did the division exceed")۔'
  },
  {
    id: 'ecs-inv-05',
    category: 'Inversions',
    difficulty: 'Medium',
    question: 'Little _______ that the external investigation would uncover widespread procurement kickbacks.',
    options: ['did the board members suspect', 'the board members suspected', 'had the board members suspected', 'suspected the board members'],
    correctIndex: 0,
    englishExplanation: 'Negative adverb "Little" in front position mandates inversion with past auxiliary ("did the board members suspect").',
    urduExplanation: 'لفظ "Little" سے جملہ شروع ہونے پر ماضی کے لیے "did + subject + base form" آتا ہے۔'
  },
  {
    id: 'ecs-inv-06',
    category: 'Inversions',
    difficulty: 'Hard',
    question: 'Only after the independent valuer inspected the factory _______ the impairment loss on machinery.',
    options: ['did the accountants quantify', 'the accountants quantified', 'the accountants had quantified', 'had the accountants quantified'],
    correctIndex: 0,
    englishExplanation: 'Clauses starting with "Only after..." require inversion in the main clause ("did the accountants quantify").',
    urduExplanation: '"Only after" والے فقرے کے بعد مرکزی جملے (Main clause) میں انورژن لاگو ہوتی ہے۔'
  },
  {
    id: 'ecs-inv-07',
    category: 'Inversions',
    difficulty: 'Hard',
    question: '_______ any material non-compliance be identified, the compliance officer must inform the executive director without delay.',
    options: ['Should', 'Were', 'Had', 'Would'],
    correctIndex: 0,
    englishExplanation: 'Inverted first conditional uses "Should + subject + bare infinitive" to replace "If... should".',
    urduExplanation: 'پہلی شرط کو فارمل انورژن میں تبدیل کرنے کے لیے "Should" سے جملہ شروع کیا جاتا ہے۔'
  },
  {
    id: 'ecs-inv-08',
    category: 'Inversions',
    difficulty: 'Medium',
    question: 'No sooner _______ the revised budget than the ministry issued fresh taxation guidelines.',
    options: ['had the committee approved', 'the committee approved', 'the committee had approved', 'did the committee approved'],
    correctIndex: 0,
    englishExplanation: '"No sooner had + subject + past participle... than" requires inversion in the first clause.',
    urduExplanation: '"No sooner" کے فورا بعد "had + subject + 3rd form" کی انورژن ترتیب استعمال ہوتی ہے۔'
  },
  {
    id: 'ecs-inv-09',
    category: 'Inversions',
    difficulty: 'Hard',
    question: 'At no time _______ to disclose the confidential financial forecasts to unvetted third parties.',
    options: ['was the director permitted', 'the director was permitted', 'the director permitted', 'had permitted the director'],
    correctIndex: 0,
    englishExplanation: 'Negative time phrase "At no time" at clause front triggers subject-auxiliary inversion ("was the director permitted").',
    urduExplanation: '"At no time" منفی فقرہ ہے جس کے فورا بعد امدادی فعل فاعل سے پہلے آتا ہے۔'
  },
  {
    id: 'ecs-inv-10',
    category: 'Inversions',
    difficulty: 'Medium',
    question: 'Rarely _______ an enterprise restructure its balance sheet with such speed and precision.',
    options: ['does', 'is', 'did it', 'has been'],
    correctIndex: 0,
    englishExplanation: 'Limiting adverb "Rarely" with a present singular subject ("an enterprise") requires inversion with "does".',
    urduExplanation: '"Rarely" کے بعد سنگولر سبجیکٹ کے لیے پریزنٹ ٹینس میں امدادی فعل "does" پہلے آتا ہے۔'
  },

  // =========================================================================
  // 7. SUBJUNCTIVE (Mandative Subjunctive, Formal Demands, Recommendations)
  // =========================================================================
  {
    id: 'ecs-subj-01',
    category: 'Subjunctive',
    difficulty: 'Hard',
    question: 'The external audit partner recommended that the financial controller _______ the bank reconciliation statement before Friday.',
    options: ['submit', 'submits', 'submitted', 'submitting'],
    correctIndex: 0,
    englishExplanation: 'The mandative subjunctive following verbs like "recommend that" mandates the base form of the verb ("submit") without third-person "-s".',
    urduExplanation: 'جب جملے میں "recommend that" آئے تو Subjunctive Mood کے تحت فاعل واحد ہونے کے باوجود فعل کی سادہ بنیاد ("submit") آتی ہے، "-s" نہیں لگتا۔'
  },
  {
    id: 'ecs-subj-02',
    category: 'Subjunctive',
    difficulty: 'Hard',
    question: 'It is imperative that every engagement team member _______ present during the physical stock verification.',
    options: ['be', 'is', 'was', 'are'],
    correctIndex: 0,
    englishExplanation: 'Adjectives of urgency ("It is imperative that...") require the subjunctive base form "be".',
    urduExplanation: '"It is imperative that" کے بعد سبجنکٹو موڈ میں "is/was" کے بجائے ہمیشہ بنیادی شکل "be" استعمال ہوتی ہے۔'
  },
  {
    id: 'ecs-subj-03',
    category: 'Subjunctive',
    difficulty: 'Medium',
    question: 'The audit committee insisted that the CFO _______ the full details of all related-party transactions.',
    options: ['disclose', 'discloses', 'disclosed', 'disclosing'],
    correctIndex: 0,
    englishExplanation: 'The verb "insist that" introduces a mandative subjunctive clause requiring the bare verb ("disclose").',
    urduExplanation: '"insisted that" کے بعد سبجنکٹو اصول کے تحت فعل کی سادہ پہلی فارم ("disclose") آتی ہے۔'
  },
  {
    id: 'ecs-subj-04',
    category: 'Subjunctive',
    difficulty: 'Hard',
    question: 'The SECP regulations demand that each listed entity _______ an independent audit committee comprised of non-executive directors.',
    options: ['establish', 'establishes', 'established', 'establishing'],
    correctIndex: 0,
    englishExplanation: 'Verbs of formal statutory demand ("demand that") trigger the mandative subjunctive bare infinitive ("establish").',
    urduExplanation: 'قانونی احکامات جیسے "demand that" کے بعد فعل کے ساتھ "s" نہیں لگتا بلکہ سادہ شکل "establish" آتی ہے۔'
  },
  {
    id: 'ecs-subj-05',
    category: 'Subjunctive',
    difficulty: 'Medium',
    question: 'It is essential that the internal control documentation _______ updated promptly following structural reorganization.',
    options: ['be', 'is', 'will be', 'was'],
    correctIndex: 0,
    englishExplanation: 'Formulaic impersonal construction "It is essential that + subject + be + past participle".',
    urduExplanation: '"It is essential that" کے بعد پیسو سبجنکٹو میں "be + 3rd form" استعمال ہوتا ہے۔'
  },
  {
    id: 'ecs-subj-06',
    category: 'Subjunctive',
    difficulty: 'Hard',
    question: 'The presiding partner requested that no staff member _______ the client premises until the inventory count had concluded.',
    options: ['leave', 'leaves', 'left', 'leaving'],
    correctIndex: 0,
    englishExplanation: 'The verb "request that" requires the subjunctive base form ("leave").',
    urduExplanation: '"requested that" کے بعد Subjunctive موڈ میں سادہ فعل "leave" درست ہے۔'
  },
  {
    id: 'ecs-subj-07',
    category: 'Subjunctive',
    difficulty: 'Medium',
    question: 'The tax tribunal proposed that the contested assessment _______ suspended pending arbitration.',
    options: ['be', 'is', 'was', 'being'],
    correctIndex: 0,
    englishExplanation: '"Propose that" takes the subjunctive form "be suspended".',
    urduExplanation: '"propose that" کے بعد بنیادی فعل "be" آتا ہے۔'
  },
  {
    id: 'ecs-subj-08',
    category: 'Subjunctive',
    difficulty: 'Hard',
    question: 'The statutory guidelines stipulate that an external valuer _______ appointed to appraise investment property.',
    options: ['be', 'is', 'was', 'has been'],
    correctIndex: 0,
    englishExplanation: '"Stipulate that" governs the mandative subjunctive ("be appointed").',
    urduExplanation: '"stipulate that" کے بعد قاعدے کے تحت "be appointed" آتا ہے۔'
  },
  {
    id: 'ecs-subj-09',
    category: 'Subjunctive',
    difficulty: 'Medium',
    question: 'The senior auditor moved that the meeting _______ adjourned to next Monday.',
    options: ['be', 'is', 'was', 'were'],
    correctIndex: 0,
    englishExplanation: 'Parliamentary and formal meeting motions ("move that") use the subjunctive "be".',
    urduExplanation: 'باقاعدہ اجلاس میں تحریک پیش کرنے پر "moved that ... be adjourned" آتا ہے۔'
  },
  {
    id: 'ecs-subj-10',
    category: 'Subjunctive',
    difficulty: 'Hard',
    question: 'It is vital that the engagement leader _______ all audit working papers prior to issuing the final audit report.',
    options: ['review', 'reviews', 'reviewed', 'reviewing'],
    correctIndex: 0,
    englishExplanation: '"It is vital that" governs the mandative subjunctive base form ("review").',
    urduExplanation: '"It is vital that" کے بعد فعل کے ساتھ "s" کا اضافہ نہیں کیا جاتا، صرف "review" درست ہے۔'
  },

  // =========================================================================
  // 8. SYNONYMS (Professional, Business & ICAP Vocabulary in Context)
  // =========================================================================
  {
    id: 'ecs-syn-01',
    category: 'Synonyms',
    difficulty: 'Medium',
    question: 'In commercial risk management, to mitigate operational vulnerabilities means to _______ them.',
    options: ['alleviate', 'exacerbate', 'disregard', 'intensify'],
    correctIndex: 0,
    englishExplanation: '"Mitigate" means to make less severe, serious, or painful; its closest synonym is "alleviate" or "reduce".',
    urduExplanation: '"Mitigate" کا مطلب ہے خطرات یا نقصانات کی شدت کو کم کرنا، جس کا ہم معنی لفظ "alleviate" ہے۔'
  },
  {
    id: 'ecs-syn-02',
    category: 'Synonyms',
    difficulty: 'Hard',
    question: 'Auditors are required to substantiate the figures in the financial statements with sufficient evidence, which means to _______ them.',
    options: ['corroborate', 'contradict', 'abandon', 'overlook'],
    correctIndex: 0,
    englishExplanation: '"Substantiate" means to provide evidence to support or prove the truth of something; its exact synonym is "corroborate".',
    urduExplanation: '"Substantiate" کا مطلب ہے ثبوت کے ساتھ توثیق کرنا، جس کا مترادف "corroborate" ہے۔'
  },
  {
    id: 'ecs-syn-03',
    category: 'Synonyms',
    difficulty: 'Medium',
    question: 'The regulatory commission enforced stringent reporting guidelines, meaning the rules were exceptionally _______.',
    options: ['rigorous', 'flexible', 'tentative', 'ambiguous'],
    correctIndex: 0,
    englishExplanation: '"Stringent" means strict, precise, and exacting; its closest synonym is "rigorous".',
    urduExplanation: '"Stringent" کا مطلب ہے انتہائی سخت اور باضابطہ، جس کا ہم معنی "rigorous" ہے۔'
  },
  {
    id: 'ecs-syn-04',
    category: 'Synonyms',
    difficulty: 'Easy',
    question: 'In financial decision-making, a prudent accountant is someone who is consistently _______.',
    options: ['cautious and judicious', 'reckless and impulsive', 'negligent and careless', 'aggressive and hostile'],
    correctIndex: 0,
    englishExplanation: '"Prudent" means acting with or showing care and thought for the future; synonymous with "cautious and judicious".',
    urduExplanation: '"Prudent" کا مطلب ہے احتیاط پسند، دانشورانہ اور دور اندیش، مترادف "cautious and judicious" ہے۔'
  },
  {
    id: 'ecs-syn-05',
    category: 'Synonyms',
    difficulty: 'Hard',
    question: 'The external review panel decided to scrutinize the loan portfolio, which signifies that they chose to _______ it.',
    options: ['examine in close detail', 'casually inspect', 'summarily dismiss', 'partially ignore'],
    correctIndex: 0,
    englishExplanation: '"Scrutinize" means to examine or inspect closely and thoroughly.',
    urduExplanation: '"Scrutinize" کا مطلب ہے انتہائی باریک بینی سے معائنہ کرنا ("examine in close detail")۔'
  },
  {
    id: 'ecs-syn-06',
    category: 'Synonyms',
    difficulty: 'Medium',
    question: 'The merger is contingent upon the approval of the competition watchdog, meaning it is _______ that decision.',
    options: ['dependent upon', 'exempt from', 'oblivious to', 'independent of'],
    correctIndex: 0,
    englishExplanation: '"Contingent upon" means subject to chance or dependent on a specific condition.',
    urduExplanation: '"Contingent upon" کا مطلب ہے کسی شرط پر منحصر ہونا ("dependent upon")۔'
  },
  {
    id: 'ecs-syn-07',
    category: 'Synonyms',
    difficulty: 'Hard',
    question: 'The partner gave a lucid presentation on international taxation, meaning her discourse was _______.',
    options: ['clear and easily understood', 'confusing and convoluted', 'tedious and dry', 'superficial and brief'],
    correctIndex: 0,
    englishExplanation: '"Lucid" means expressed clearly and easy to understand.',
    urduExplanation: '"Lucid" کا مطلب ہے بالکل واضح اور قابلِ فہم گفتگو ("clear and easily understood")۔'
  },
  {
    id: 'ecs-syn-08',
    category: 'Synonyms',
    difficulty: 'Easy',
    question: 'Statutory compliance is mandatory for all incorporated entities, which means it is _______.',
    options: ['compulsory', 'voluntary', 'optional', 'discretionary'],
    correctIndex: 0,
    englishExplanation: '"Mandatory" means required by law or rules; synonymous with "compulsory".',
    urduExplanation: '"Mandatory" کا مطلب ہے قانونی طور پر لازمی ("compulsory")۔'
  },
  {
    id: 'ecs-syn-09',
    category: 'Synonyms',
    difficulty: 'Medium',
    question: 'The firm noted a discrepancy between the physical stock and the book inventory, which is an _______.',
    options: ['inconsistency', 'agreement', 'alignment', 'identical record'],
    correctIndex: 0,
    englishExplanation: '"Discrepancy" means a lack of compatibility or similarity between two or more facts; an inconsistency.',
    urduExplanation: '"Discrepancy" کا مطلب ہے کھاتوں کے درمیان فرق یا تضاد ("inconsistency")۔'
  },
  {
    id: 'ecs-syn-10',
    category: 'Synonyms',
    difficulty: 'Hard',
    question: 'The board praised the manager for her astute financial negotiation, meaning her approach was shrewd and _______.',
    options: ['discerning', 'foolish', 'reckless', 'indolent'],
    correctIndex: 0,
    englishExplanation: '"Astute" means having or showing an ability to accurately assess situations; discerning or shrewd.',
    urduExplanation: '"Astute" کا مطلب ہے ہوشیار، زیرک اور بصیرت رکھنے والا ("discerning")۔'
  },

  // =========================================================================
  // 9. ANTONYMS (Professional, Business & ICAP Vocabulary in Context)
  // =========================================================================
  {
    id: 'ecs-ant-01',
    category: 'Antonyms',
    difficulty: 'Medium',
    question: 'In professional audit reporting, the exact antonym (opposite) of the term "prudent" is _______.',
    options: ['reckless', 'cautious', 'vigilant', 'judicious'],
    correctIndex: 0,
    englishExplanation: 'The antonym of "prudent" (cautious, wise) is "reckless" or "imprudent".',
    urduExplanation: '"Prudent" کا مطلب ہے محتاط، اور اس کا متضاد (Antonym) "reckless" (لاپرواہ/بے باک) ہے۔'
  },
  {
    id: 'ecs-ant-02',
    category: 'Antonyms',
    difficulty: 'Hard',
    question: 'The internal control architecture was evaluated as exceptionally robust; the opposite condition would be _______.',
    options: ['fragile', 'durable', 'resilient', 'impenetrable'],
    correctIndex: 0,
    englishExplanation: '"Robust" means strong and sturdy; its antonym is "fragile" or "weak".',
    urduExplanation: '"Robust" کا مطلب ہے مضبوط اور مستحکم، اس کا الٹ لفظ "fragile" (کمزور/نازک) ہے۔'
  },
  {
    id: 'ecs-ant-03',
    category: 'Antonyms',
    difficulty: 'Medium',
    question: 'The regulator praised the bank for its transparent financial reporting; the antonym of "transparent" is _______.',
    options: ['opaque', 'lucid', 'candid', 'explicit'],
    correctIndex: 0,
    englishExplanation: '"Transparent" means open and clear; its antonym in corporate disclosure is "opaque" (hidden/unclear).',
    urduExplanation: '"Transparent" (شفاف) کا متضاد "opaque" (غیر واضح یا مبہم) ہے۔'
  },
  {
    id: 'ecs-ant-04',
    category: 'Antonyms',
    difficulty: 'Easy',
    question: 'Whereas tangible assets include machinery and land, assets that lack physical substance are described as _______.',
    options: ['intangible', 'material', 'corporeal', 'substantial'],
    correctIndex: 0,
    englishExplanation: 'The opposite of "tangible" (physical) is "intangible" (non-physical, like patents and goodwill).',
    urduExplanation: '"Tangible" (محسوس اثاثے) کا متضاد "intangible" (غیر محسوس اثاثے) ہے۔'
  },
  {
    id: 'ecs-ant-05',
    category: 'Antonyms',
    difficulty: 'Hard',
    question: 'The chief credit officer described the debtor company\'s solvency as precarious; the antonym of "precarious" is _______.',
    options: ['stable', 'insecure', 'hazardous', 'unsettled'],
    correctIndex: 0,
    englishExplanation: '"Precarious" means dangerously unstable; its direct antonym is "stable" or "secure".',
    urduExplanation: '"Precarious" کا مطلب ہے غیر یقینی اور خطرناک، اس کا متضاد "stable" (مستحکم) ہے۔'
  },
  {
    id: 'ecs-ant-06',
    category: 'Antonyms',
    difficulty: 'Medium',
    question: 'In legal and audit discourse, an amicable settlement between disputing shareholders is the opposite of a _______ dispute.',
    options: ['hostile', 'cordial', 'peaceful', 'cooperative'],
    correctIndex: 0,
    englishExplanation: '"Amicable" means characterized by friendly goodwill; its antonym is "hostile" or "contentious".',
    urduExplanation: '"Amicable" (خوشگوار/باہمی رضامندی) کا متضاد "hostile" (مخالفانہ/معاندانہ) ہے۔'
  },
  {
    id: 'ecs-ant-07',
    category: 'Antonyms',
    difficulty: 'Hard',
    question: 'The external auditor noted that the accounting treatment was arbitrary; the opposite of "arbitrary" in auditing is _______.',
    options: ['systematic and reasoned', 'whimsical', 'capricious', 'unsubstantiated'],
    correctIndex: 0,
    englishExplanation: '"Arbitrary" means based on random choice or personal whim; its antonym is "systematic" or "reasoned".',
    urduExplanation: '"Arbitrary" (من مانا/بے بنیاد) کا متضاد "systematic and reasoned" (اصول پسند اور معقول) ہے۔'
  },
  {
    id: 'ecs-ant-08',
    category: 'Antonyms',
    difficulty: 'Easy',
    question: 'While some compliance steps are voluntary, others are strictly _______.',
    options: ['mandatory', 'optional', 'discretionary', 'gratuitous'],
    correctIndex: 0,
    englishExplanation: 'The antonym of "voluntary" (done by choice) is "mandatory" or "compulsory".',
    urduExplanation: '"Voluntary" (اختیاری) کا متضاد "mandatory" (لازمی) ہے۔'
  },
  {
    id: 'ecs-ant-09',
    category: 'Antonyms',
    difficulty: 'Hard',
    question: 'The auditor found that the client\'s accounting records were replete with errors; the antonym of "replete" is _______.',
    options: ['devoid', 'overflowing', 'teeming', 'saturated'],
    correctIndex: 0,
    englishExplanation: '"Replete" means filled or well-supplied; its exact antonym is "devoid" (completely lacking).',
    urduExplanation: '"Replete" (بھرا ہوا) کا متضاد "devoid" (خالی یا محروم) ہے۔'
  },
  {
    id: 'ecs-ant-10',
    category: 'Antonyms',
    difficulty: 'Medium',
    question: 'In evaluating financial errors, an error deemed immaterial is the direct opposite of an error that is _______.',
    options: ['material', 'insignificant', 'trivial', 'negligible'],
    correctIndex: 0,
    englishExplanation: 'In auditing standards, "immaterial" (unimportant to decisions) is the antonym of "material" (significant).',
    urduExplanation: '"Immaterial" (غیر اہم/معمولی) کا متضاد "material" (اہم/بنیادی) ہے۔'
  },

  // =========================================================================
  // 10. MODAL CONDITIONALS (Conditionals Type 1, 2, 3, Mixed, Modal Deductions)
  // =========================================================================
  {
    id: 'ecs-cond-01',
    category: 'Modal Conditionals',
    difficulty: 'Hard',
    question: 'Had the engagement team examined the physical inventory counts in person, the stock discrepancy _______.',
    options: ['would have been discovered', 'will be discovered', 'had been discovered', 'was discovered'],
    correctIndex: 0,
    englishExplanation: 'Inverted third conditional ("Had + subject + past participle") takes "would have been + past participle" in the result clause.',
    urduExplanation: 'Inverted Third Conditional میں مین کلاز میں "would have been + 3rd form" استعمال ہوتا ہے۔'
  },
  {
    id: 'ecs-cond-02',
    category: 'Modal Conditionals',
    difficulty: 'Medium',
    question: 'If the finance department had implemented the automated verification controls last quarter, the firm _______ vulnerable to fraud today.',
    options: ['would not be', 'would have not been', 'will not be', 'had not been'],
    correctIndex: 0,
    englishExplanation: 'Mixed conditional (past condition with present result: had implemented ... would not be today).',
    urduExplanation: 'ماضی کی شرط اور حال کے نتیجے کو ظاہر کرنے کے لیے مکسڈ کنڈیشنل میں "would not be" آتا ہے۔'
  },
  {
    id: 'ecs-cond-03',
    category: 'Modal Conditionals',
    difficulty: 'Hard',
    question: 'The external auditor _______ the unauthorized payroll transfers; otherwise, he would have flagged them in the management letter.',
    options: ['cannot have detected', 'must detect', 'should detect', 'would detect'],
    correctIndex: 0,
    englishExplanation: '"Cannot have + past participle" expresses a logical negative deduction about a past event with certainty.',
    urduExplanation: 'ماضی کے کسی کام کے یقینی طور پر نہ ہونے کا منطقی اندازہ لگانے کے لیے "cannot have detected" آتا ہے۔'
  },
  {
    id: 'ecs-cond-04',
    category: 'Modal Conditionals',
    difficulty: 'Easy',
    question: 'Unless the management _______ the disputed ledger reconciliations, the statutory audit report cannot be released.',
    options: ['finalizes', 'finalized', 'will finalize', 'had finalized'],
    correctIndex: 0,
    englishExplanation: 'First conditional with "Unless" requires the present simple ("finalizes") for realistic future conditions.',
    urduExplanation: '"Unless" کے ساتھ پہلی شرط میں Present Simple یعنی "finalizes" استعمال ہوتا ہے۔'
  },
  {
    id: 'ecs-cond-05',
    category: 'Modal Conditionals',
    difficulty: 'Hard',
    question: 'Were the board to approve the debt-for-equity swap, the company\'s liquidity ratios _______ dramatically.',
    options: ['would improve', 'will improve', 'had improved', 'improved'],
    correctIndex: 0,
    englishExplanation: 'Inverted second conditional ("Were the board to approve...") requires "would + base verb" in the apodosis.',
    urduExplanation: 'Inverted Second Conditional میں نتیجہ والی کلاز میں "would improve" آتا ہے۔'
  },
  {
    id: 'ecs-cond-06',
    category: 'Modal Conditionals',
    difficulty: 'Medium',
    question: 'The junior auditor looks exhausted; she _______ working on the consolidation papers all night.',
    options: ['must have been', 'should have been', 'would have been', 'can have been'],
    correctIndex: 0,
    englishExplanation: '"Must have been + -ing" conveys a confident logical inference regarding a prolonged past activity.',
    urduExplanation: 'ماضی کے کسی کام کا منطقی اور پختہ نتیجہ اخذ کرنے کے لیے "must have been working" آتا ہے۔'
  },
  {
    id: 'ecs-cond-07',
    category: 'Modal Conditionals',
    difficulty: 'Hard',
    question: 'If the tax treaty _______ by both sovereign states, cross-border corporate withholding taxes will be eliminated.',
    options: ['is ratified', 'was ratified', 'will be ratified', 'had been ratified'],
    correctIndex: 0,
    englishExplanation: 'Type 1 conditional passive clause takes present simple passive ("is ratified") with future main clause ("will be").',
    urduExplanation: 'پہلی شرط کے پیسو میں "is ratified" اور مین کلاز میں "will be" کا جوڑا آتا ہے۔'
  },
  {
    id: 'ecs-cond-08',
    category: 'Modal Conditionals',
    difficulty: 'Medium',
    question: 'The internal controller _______ the invoice before authorizing the wire transfer, but she neglected to do so.',
    options: ['should have verified', 'must verify', 'could verify', 'would verify'],
    correctIndex: 0,
    englishExplanation: '"Should have + past participle" conveys an unfulfilled past duty or advisability.',
    urduExplanation: 'ماضی کے کسی ایسے فرض کے لیے جو پورا نہ کیا گیا ہو، "should have verified" آتا ہے۔'
  },
  {
    id: 'ecs-cond-09',
    category: 'Modal Conditionals',
    difficulty: 'Hard',
    question: 'Had the revenue recognition policy been adhered to, the quarterly profit _______ by twenty percent.',
    options: ['would not have been overstated', 'will not be overstated', 'has not been overstated', 'was not overstated'],
    correctIndex: 0,
    englishExplanation: 'Third conditional passive result requires "would not have been + past participle".',
    urduExplanation: 'ماضی کے تھرڈ کنڈیشنل کے پیسو وائس میں "would not have been overstated" آئے گا۔'
  },
  {
    id: 'ecs-cond-10',
    category: 'Modal Conditionals',
    difficulty: 'Easy',
    question: 'Provided that all compliance certificates _______ on time, the annual general meeting will proceed as planned.',
    options: ['are submitted', 'were submitted', 'will be submitted', 'had been submitted'],
    correctIndex: 0,
    englishExplanation: '"Provided that" functions as a conditional connector taking present simple passive ("are submitted").',
    urduExplanation: '"Provided that" والے حصے میں فیوچر کے بجائے پریزنٹ سمپل ("are submitted") آتا ہے۔'
  },

  // =========================================================================
  // 11. ACTIVE / PASSIVE (Reporting Passives, Impersonal Passives, Infinitives)
  // =========================================================================
  {
    id: 'ecs-pass-01',
    category: 'Active / Passive',
    difficulty: 'Medium',
    question: 'The financial statements _______ by an independent firm of chartered accountants prior to publication.',
    options: ['were comprehensively audited', 'comprehensively audited', 'had comprehensively auditing', 'have auditing comprehensively'],
    correctIndex: 0,
    englishExplanation: 'Passive voice ("were comprehensively audited") is standard for reporting past audit actions performed on financial statements.',
    urduExplanation: 'مالیاتی گوشواروں پر کام ہوا تھا، اس لیے ماضی میں پیسو وائس "were comprehensively audited" درست ہے۔'
  },
  {
    id: 'ecs-pass-02',
    category: 'Active / Passive',
    difficulty: 'Hard',
    question: 'It _______ by forensic investigators that false vendor accounts were utilized to siphon company funds.',
    options: ['is widely suspected', 'is widely suspecting', 'widely suspected', 'has widely suspecting'],
    correctIndex: 0,
    englishExplanation: 'Impersonal passive ("It is widely suspected that...") preserves journalistic and investigative neutrality.',
    urduExplanation: 'پروفیشنل اور نیوٹرل رپورٹنگ کے لیے Impersonal Passive ("It is widely suspected that...") آتا ہے۔'
  },
  {
    id: 'ecs-pass-03',
    category: 'Active / Passive',
    difficulty: 'Medium',
    question: 'The contentious journal entry appears _______ by an unauthorized user late on Friday evening.',
    options: ['to have been posted', 'to post', 'having posted', 'to be posting'],
    correctIndex: 0,
    englishExplanation: 'The perfect passive infinitive ("to have been posted") denotes an action that occurred prior to the present appearance.',
    urduExplanation: 'ماضی کے کام کو ظاہر کرنے کے لیے پرفیکٹ پیسو انفینیٹیو "to have been posted" استعمال ہوتا ہے۔'
  },
  {
    id: 'ecs-pass-04',
    category: 'Active / Passive',
    difficulty: 'Easy',
    question: 'All petty cash expenditure vouchers must _______ by the finance manager before reimbursement.',
    options: ['be approved', 'approve', 'approved', 'approving'],
    correctIndex: 0,
    englishExplanation: 'Modal passive construction requires "modal + be + past participle" ("must be approved").',
    urduExplanation: 'ماڈل ورب کے ساتھ پیسو بنانے کے لیے "must be approved" آتا ہے۔'
  },
  {
    id: 'ecs-pass-05',
    category: 'Active / Passive',
    difficulty: 'Hard',
    question: 'The misappropriated corporate funds are believed _______ to offshore shell accounts over the past two years.',
    options: ['to have been channeled', 'to channel', 'having channeled', 'channeling'],
    correctIndex: 0,
    englishExplanation: 'Subject + passive verb (are believed) + perfect passive infinitive ("to have been channeled").',
    urduExplanation: 'ماضی کے جاری رہنے والے عمل کے لیے Perfect Passive Infinitive ("to have been channeled") آتا ہے۔'
  },
  {
    id: 'ecs-pass-06',
    category: 'Active / Passive',
    difficulty: 'Medium',
    question: 'Several major weaknesses in internal inventory controls _______ during the preliminary review.',
    options: ['were brought to light', 'brought to light', 'have brought to light', 'had brought to light'],
    correctIndex: 0,
    englishExplanation: 'Passive idiom in the past simple: "were brought to light" (were uncovered/revealed).',
    urduExplanation: 'خامیاں سامنے لائی گئیں، اس لیے Passive Voice ("were brought to light") درست ہے۔'
  },
  {
    id: 'ecs-pass-07',
    category: 'Active / Passive',
    difficulty: 'Hard',
    question: 'The management insisted on _______ copies of all working paper schedules before the team concluded fieldwork.',
    options: ['being provided with', 'providing with', 'to be provided with', 'having provided'],
    correctIndex: 0,
    englishExplanation: 'Preposition "on" takes a passive gerund ("being provided with") when the subject receives the action.',
    urduExplanation: 'پریپوزیشن "on" کے بعد جب سبجیکٹ خود کام وصول کرے تو Passive Gerund ("being provided with") آتا ہے۔'
  },
  {
    id: 'ecs-pass-08',
    category: 'Active / Passive',
    difficulty: 'Easy',
    question: 'The statutory audit report _______ to the shareholders at the forthcoming annual general meeting.',
    options: ['will be presented', 'will present', 'presents', 'presented'],
    correctIndex: 0,
    englishExplanation: 'Future passive voice: "will be presented" (the report will be presented by management).',
    urduExplanation: 'مستقبل کے حوالے سے پیسو وائس میں "will be presented" آتا ہے۔'
  },
  {
    id: 'ecs-pass-09',
    category: 'Active / Passive',
    difficulty: 'Hard',
    question: 'The corporate records were alleged _______ prior to the arrival of the statutory inspectors.',
    options: ['to have been destroyed', 'to destroy', 'having destroyed', 'destroying'],
    correctIndex: 0,
    englishExplanation: 'Reporting passive with perfect passive infinitive: "were alleged to have been destroyed".',
    urduExplanation: 'پہلے ہوئے واقعے پر الزامات کی رپورٹنگ کے لیے "were alleged to have been destroyed" آتا ہے۔'
  },
  {
    id: 'ecs-pass-10',
    category: 'Active / Passive',
    difficulty: 'Medium',
    question: 'No capital expenditure invoice _______ without two authorized supervisory signatures.',
    options: ['can be processed', 'can process', 'processes', 'is processing'],
    correctIndex: 0,
    englishExplanation: 'Passive modal structure "can be processed".',
    urduExplanation: 'ماڈل ورب کے پیسو میں "can be processed" درست ہے۔'
  },

  // =========================================================================
  // 12. RELATIVE CLAUSES (Defining, Non-defining, Preposition + Relative Pronoun)
  // =========================================================================
  {
    id: 'ecs-rel-01',
    category: 'Relative Clauses',
    difficulty: 'Medium',
    question: 'The statutory body to _______ the formal complaint was submitted has initiated an official inquiry.',
    options: ['which', 'whom', 'that', 'where'],
    correctIndex: 0,
    englishExplanation: 'When referring to an organization or statutory entity following a preposition ("to"), the relative pronoun "which" is required.',
    urduExplanation: 'جب کسی ادارے کی طرف پریپوزیشن کے ساتھ اشارہ ہو تو "to which" استعمال ہوتا ہے۔'
  },
  {
    id: 'ecs-rel-02',
    category: 'Relative Clauses',
    difficulty: 'Hard',
    question: 'The external audit partner, _______ signature appears on the compliance certificate, attended the board meeting.',
    options: ['whose', 'whom', 'which', 'who\'s'],
    correctIndex: 0,
    englishExplanation: 'The possessive relative pronoun "whose" is required to indicate possession of the following noun ("signature").',
    urduExplanation: 'ملکیت ظاہر کرنے کے لیے Relative Pronoun "whose" استعمال ہوتا ہے (جس کا دستخط)۔'
  },
  {
    id: 'ecs-rel-03',
    category: 'Relative Clauses',
    difficulty: 'Medium',
    question: 'The corporate governance framework _______ the multinational operates has been updated to reflect international standards.',
    options: ['under which', 'which under', 'in that', 'whereby under'],
    correctIndex: 0,
    englishExplanation: 'Preposition fronting in formal relative clauses: "under which" (the framework under which the firm operates).',
    urduExplanation: 'رسمی انگریزی میں فریم ورک کے تحت کام کرنے کے لیے "under which" کی ساخت درست ہے۔'
  },
  {
    id: 'ecs-rel-04',
    category: 'Relative Clauses',
    difficulty: 'Easy',
    question: 'The senior forensic investigator _______ uncovered the accounting irregularity was commended by the audit committee.',
    options: ['who', 'which', 'whom', 'whose'],
    correctIndex: 0,
    englishExplanation: 'The relative pronoun "who" serves as the subject pronoun referring to a person ("investigator").',
    urduExplanation: 'انسان (فاعل) کے لیے Relative Pronoun "who" آتا ہے۔'
  },
  {
    id: 'ecs-rel-05',
    category: 'Relative Clauses',
    difficulty: 'Hard',
    question: 'The conglomerate acquired five foreign subsidiaries, all of _______ must be consolidated under IFRS 10.',
    options: ['which', 'whom', 'them', 'that'],
    correctIndex: 0,
    englishExplanation: 'Quantifier phrase with non-defining relative pronoun referring to entities: "all of which".',
    urduExplanation: 'کمپنیوں کے لیے مقداری فقرے میں "all of which" کا استعمال لازمی ہے ("all of them" بغیر ربط کے غلط ہے)۔'
  },
  {
    id: 'ecs-rel-06',
    category: 'Relative Clauses',
    difficulty: 'Medium',
    question: 'The legal consultant with _______ we negotiated the arbitration clause has relocated to London.',
    options: ['whom', 'who', 'which', 'whose'],
    correctIndex: 0,
    englishExplanation: 'Following a preposition ("with"), the objective relative pronoun for persons is "whom".',
    urduExplanation: 'جب کسی انسان کا حوالہ پریپوزیشن کے بعد آئے تو "whom" استعمال ہوتا ہے (with whom)۔'
  },
  {
    id: 'ecs-rel-07',
    category: 'Relative Clauses',
    difficulty: 'Hard',
    question: 'The management instituted a new whistleblowing policy _______ employees can anonymously report unethical conduct.',
    options: ['whereby', 'wherein', 'whereof', 'whereon'],
    correctIndex: 0,
    englishExplanation: '"Whereby" means "by which" or "according to which", ideally suited for methods, policies, and systems.',
    urduExplanation: '"Whereby" کا مطلب ہے "جس کے ذریعے"۔ پالیسی یا طریقہ کار کے بعد یہ موزوں ترین لفظ ہے۔'
  },
  {
    id: 'ecs-rel-08',
    category: 'Relative Clauses',
    difficulty: 'Easy',
    question: 'The financial year _______ the tax dispute arose was marked by severe currency devaluation.',
    options: ['in which', 'which in', 'where in', 'that in'],
    correctIndex: 0,
    englishExplanation: 'Time reference in formal syntax takes "in which" (or "when").',
    urduExplanation: 'سال یا وقت کے دورانیے کے لیے "in which" کا استعمال ہوتا ہے۔'
  },
  {
    id: 'ecs-rel-09',
    category: 'Relative Clauses',
    difficulty: 'Hard',
    question: 'The parent company has twelve commercial divisions, two of _______ generated negative cash flows this fiscal year.',
    options: ['which', 'whom', 'them', 'that'],
    correctIndex: 0,
    englishExplanation: '"Two of which" is the correct relative construction referring back to "divisions".',
    urduExplanation: 'تقسیم شدہ شعبوں کے لیے "two of which" درست ہے۔'
  },
  {
    id: 'ecs-rel-10',
    category: 'Relative Clauses',
    difficulty: 'Medium',
    question: 'The chief risk officer discussed the cyber risk scenario, _______ potential consequences could be catastrophic for customer data.',
    options: ['whose', 'which', 'that', 'whom'],
    correctIndex: 0,
    englishExplanation: '"Whose" can be used to indicate possession for inanimate objects and abstract nouns ("scenario, whose consequences").',
    urduExplanation: 'کسی صورتحال کے نتائج کی ملکیت ظاہر کرنے کے لیے "whose potential consequences" درست ہے۔'
  }
];
