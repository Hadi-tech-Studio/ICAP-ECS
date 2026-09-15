import { GrammarQuestion } from '../types';

export const ADDITIONAL_CURATED_GRAMMAR_POOL: GrammarQuestion[] = [
  // Category: Conditionals & Prudence
  {
    id: 'cg-cond-01',
    category: 'Conditionals & Prudence',
    difficulty: 'Medium',
    question: 'If the engagement manager _______ the risk assessment matrix earlier, the field audit would have started on time.',
    options: ['approved', 'had approved', 'would approve', 'has approved'],
    correctIndex: 1,
    englishExplanation: 'Third conditional requires past perfect ("had approved") in the if-clause to discuss hypothetical past actions.',
    urduExplanation: 'تھرڈ کنڈیشنل جملے میں ماضی کی غیر حقیقی شرط کے لیے "if-clause" میں Past Perfect ("had approved") آتا ہے۔'
  },
  {
    id: 'cg-cond-02',
    category: 'Conditionals & Prudence',
    difficulty: 'Hard',
    question: '_______ any material discrepancies be identified during the inventory count, notify the senior partner immediately.',
    options: ['Should', 'Were', 'Had', 'Would'],
    correctIndex: 0,
    englishExplanation: 'Inverted first conditional uses "Should + subject + bare infinitive" for formal workplace and audit instructions.',
    urduExplanation: 'باضابطہ اور رسمی ہدایات میں پہلی شرط کو الٹانے (Inversion) کے لیے "Should" سے جملہ شروع کیا جاتا ہے۔'
  },
  {
    id: 'cg-cond-03',
    category: 'Conditionals & Prudence',
    difficulty: 'Medium',
    question: 'If the tax authorities _______ the company’s amended return, the disputed penalty will be waived.',
    options: ['accept', 'accepted', 'will accept', 'had accepted'],
    correctIndex: 0,
    englishExplanation: 'First conditional uses present simple ("accept") in the conditional clause for realistic future outcomes.',
    urduExplanation: 'پہلی شرط میں ممکنہ مستقبل کے لیے "if" کے بعد Present Simple ("accept") آتا ہے۔'
  },
  {
    id: 'cg-cond-04',
    category: 'Conditionals & Prudence',
    difficulty: 'Hard',
    question: 'Had the internal control deficiencies _______ earlier, the financial fraud could have been prevented.',
    options: ['been detected', 'detected', 'were detected', 'being detected'],
    correctIndex: 0,
    englishExplanation: 'Inverted third conditional in the passive voice requires "Had + subject + been + past participle".',
    urduExplanation: 'ماضی کے غیر حقیقی پیسو کنڈیشنل میں "Had + subject + been detected" کی ساخت استعمال ہوتی ہے۔'
  },
  {
    id: 'cg-cond-05',
    category: 'Conditionals & Prudence',
    difficulty: 'Easy',
    question: 'If a company generates higher profits, it generally _______ more income tax.',
    options: ['pays', 'paid', 'is paying', 'will pay'],
    correctIndex: 0,
    englishExplanation: 'Zero conditional expresses a general commercial fact using present simple in both clauses.',
    urduExplanation: 'عام تجارتی حقائق اور مستقل اصولوں کے لیے زیرو کنڈیشنل میں پریزنٹ سمپل ("pays") آتا ہے۔'
  },

  // Category: Tenses & Aspects
  {
    id: 'cg-tense-01',
    category: 'Tenses & Aspects',
    difficulty: 'Medium',
    question: 'The external audit team _______ the client’s physical stock for three days before discovering the inventory shortage.',
    options: ['had been counting', 'counted', 'has counted', 'was counting'],
    correctIndex: 0,
    englishExplanation: 'Past perfect continuous emphasizes an action ongoing over time before another past event.',
    urduExplanation: 'ماضی کے کسی واقعے سے پہلے جاری رہنے والے طویل عمل کے لیے Past Perfect Continuous ("had been counting") آتا ہے۔'
  },
  {
    id: 'cg-tense-02',
    category: 'Tenses & Aspects',
    difficulty: 'Easy',
    question: 'Our firm _______ statutory auditing services to public listed corporations since 1995.',
    options: ['has provided', 'provided', 'provides', 'was providing'],
    correctIndex: 0,
    englishExplanation: 'Present perfect ("has provided") is used with "since" to denote an action starting in the past and continuing into the present.',
    urduExplanation: '"Since 1995" کے ساتھ ماضی سے اب تک جاری عمل کے لیے Present Perfect ("has provided") درست ہے۔'
  },
  {
    id: 'cg-tense-03',
    category: 'Tenses & Aspects',
    difficulty: 'Hard',
    question: 'By the time the annual general meeting concludes tomorrow, the shareholders _______ the revised dividend payout.',
    options: ['will have approved', 'will approve', 'have approved', 'had approved'],
    correctIndex: 0,
    englishExplanation: 'Future perfect ("will have approved") indicates an action that will be completed before a specified future milestone.',
    urduExplanation: 'مستقبل کے کسی مقررہ وقت سے پہلے مکمل ہونے والے کام کے لیے Future Perfect ("will have approved") آتا ہے۔'
  },
  {
    id: 'cg-tense-04',
    category: 'Tenses & Aspects',
    difficulty: 'Medium',
    question: 'While the forensic specialist _______ the transaction logs, the power supply unexpectedly tripped.',
    options: ['was examining', 'examined', 'has examined', 'had examined'],
    correctIndex: 0,
    englishExplanation: 'Past continuous ("was examining") is used for an ongoing background action interrupted by a shorter past action.',
    urduExplanation: 'ماضی میں جاری عمل کے دوران اچانک ہونے والے دوسرے واقعے کے وقت Past Continuous ("was examining") استعمال ہوتا ہے۔'
  },

  // Category: Modals & Prudence
  {
    id: 'cg-modal-01',
    category: 'Modals & Prudence',
    difficulty: 'Hard',
    question: 'The ledger accounts do not balance; there _______ an unrecorded journal voucher in the petty cash book.',
    options: ['must be', 'should have been', 'can be', 'would be'],
    correctIndex: 0,
    englishExplanation: '"Must be" indicates a strong logical deduction based on clear accounting evidence.',
    urduExplanation: 'حالات و شواہد کی بنیاد پر پختہ منطقی نتیجے (Logical Deduction) کے لیے "must be" آتا ہے۔'
  },
  {
    id: 'cg-modal-02',
    category: 'Modals & Prudence',
    difficulty: 'Medium',
    question: 'Trainees _______ disclose confidential client information under any circumstances.',
    options: ['must not', 'need not', 'might not', 'could not'],
    correctIndex: 0,
    englishExplanation: '"Must not" expresses strict prohibition required by professional ethical codes.',
    urduExplanation: 'سخت ممانعت اور اخلاقی پابندی کے لیے "must not" کا استعمال لازمی ہے۔'
  },
  {
    id: 'cg-modal-03',
    category: 'Modals & Prudence',
    difficulty: 'Hard',
    question: 'The management _______ the engagement partner before entering into such a high-risk credit commitment.',
    options: ['ought to have consulted', 'must consult', 'ought to consult', 'can have consulted'],
    correctIndex: 0,
    englishExplanation: '"Ought to have consulted" expresses moral obligation or sensible advisability in the past that was regrettably omitted.',
    urduExplanation: 'ماضی میں کسی ضروری مشورے یا اخلاقی ذمے داری کی کوتاہی پر تنقید کے لیے "ought to have consulted" آتا ہے۔'
  },
  {
    id: 'cg-modal-04',
    category: 'Modals & Prudence',
    difficulty: 'Easy',
    question: 'You _______ submit physical receipts if you have already uploaded clear scanned copies through the portal.',
    options: ['need not', 'must not', 'cannot', 'would not'],
    correctIndex: 0,
    englishExplanation: '"Need not" expresses absence of necessity or requirement.',
    urduExplanation: 'کسی کام کے غیر ضروری ہونے کو ظاہر کرنے کے لیے "need not" استعمال ہوتا ہے۔'
  },

  // Category: Passive & Impersonal Structures
  {
    id: 'cg-pass-01',
    category: 'Passive & Impersonal Structures',
    difficulty: 'Medium',
    question: 'It _______ that the revised international financial reporting standard will take effect from January next year.',
    options: ['is anticipated', 'anticipates', 'was anticipating', 'has anticipated'],
    correctIndex: 0,
    englishExplanation: 'Impersonal passive "It is anticipated that..." is standard in formal corporate and regulatory reporting.',
    urduExplanation: 'سرکاری اور کارپوریٹ رپورٹنگ میں غیر شخصی پیسو ساخت "It is anticipated that..." مستعمل ہے۔'
  },
  {
    id: 'cg-pass-02',
    category: 'Passive & Impersonal Structures',
    difficulty: 'Hard',
    question: 'The statutory annual report is expected _______ to all institutional investors before the close of business.',
    options: ['to be delivered', 'to deliver', 'being delivered', 'having delivered'],
    correctIndex: 0,
    englishExplanation: 'Passive infinitive "to be delivered" completes the structure "is expected + passive infinitive".',
    urduExplanation: '"is expected" کے بعد پیسو انفینیٹو یعنی "to be delivered" آتا ہے۔'
  },
  {
    id: 'cg-pass-03',
    category: 'Passive & Impersonal Structures',
    difficulty: 'Medium',
    question: 'Several material misstatements _______ by the external inspection team during preliminary audit sampling.',
    options: ['were identified', 'identified', 'have identified', 'are identifying'],
    correctIndex: 0,
    englishExplanation: 'Past passive ("were identified") is required because the misstatements were the recipient of the action in the past.',
    urduExplanation: 'ماضی میں کی گئی کارروائی کے مفعول (misstatements) کے لیے Past Passive ("were identified") آئے گا۔'
  },

  // Category: Inversion & Emphasis
  {
    id: 'cg-inv-01',
    category: 'Inversion & Emphasis',
    difficulty: 'Hard',
    question: 'Seldom _______ such blatant non-compliance with statutory tax withholding directives.',
    options: ['have we witnessed', 'we have witnessed', 'we witnessed', 'did we witnessed'],
    correctIndex: 0,
    englishExplanation: 'Negative frequency adverb "Seldom" at the sentence start triggers subject-auxiliary inversion: "have we witnessed".',
    urduExplanation: 'جب جملہ منفی لفظ "Seldom" سے شروع ہو تو امدادی فعل فاعل سے پہلے آتا ہے: "have we witnessed"۔'
  },
  {
    id: 'cg-inv-02',
    category: 'Inversion & Emphasis',
    difficulty: 'Hard',
    question: 'Not only _______ fail to maintain proper ledger records, but they also refused access to audit files.',
    options: ['did the client', 'the client did', 'the client had', 'has the client'],
    correctIndex: 0,
    englishExplanation: '"Not only" at the start of a clause requires inversion: "did + subject + base verb".',
    urduExplanation: '"Not only" سے شروع ہونے والے فقرے میں انورژن لازمی ہے: "did the client fail"۔'
  },
  {
    id: 'cg-inv-03',
    category: 'Inversion & Emphasis',
    difficulty: 'Hard',
    question: 'Under no circumstances _______ employees share client master encryption keys with third-party vendors.',
    options: ['may', 'should not', 'ought', 'do not'],
    correctIndex: 0,
    englishExplanation: 'Negative prepositional phrase "Under no circumstances" triggers inversion and takes positive auxiliary ("may" or "should").',
    urduExplanation: '"Under no circumstances" کے بعد فقرہ مثبت امدادی فعل کے ساتھ الٹ دیا جاتا ہے جیسے "may employees share"۔'
  },

  // Category: Conjunctions & Connectors
  {
    id: 'cg-conn-01',
    category: 'Conjunctions & Connectors',
    difficulty: 'Medium',
    question: '_______ the economic recession was severe, the retail conglomerate sustained an operating profit.',
    options: ['Although', 'Despite', 'However', 'In spite of'],
    correctIndex: 0,
    englishExplanation: '"Although" is followed by a complete clause with subject and finite verb ("the economic recession was severe").',
    urduExplanation: '"Although" کے بعد مکمل کلاز (Subject + Verb) آتا ہے۔'
  },
  {
    id: 'cg-conn-02',
    category: 'Conjunctions & Connectors',
    difficulty: 'Medium',
    question: 'The firm invested heavily in automation; _______, its administrative overhead fell by twenty percent.',
    options: ['consequently', 'whereas', 'nevertheless', 'unless'],
    correctIndex: 0,
    englishExplanation: '"Consequently" acts as a conjunctive adverb showing direct cause-and-effect after a semicolon.',
    urduExplanation: 'براہ راست نتیجے کو ظاہر کرنے کے لیے سیمی کولن کے بعد "consequently" (نتیجتاً) درست ہے۔'
  },
  {
    id: 'cg-conn-03',
    category: 'Conjunctions & Connectors',
    difficulty: 'Easy',
    question: '_______ the adverse market conditions, the new investment portfolio delivered steady returns.',
    options: ['Despite', 'Although', 'Even though', 'Whereas'],
    correctIndex: 0,
    englishExplanation: '"Despite" is a preposition followed directly by a noun phrase ("the adverse market conditions").',
    urduExplanation: '"Despite" کے بعد ناؤن فریز آتا ہے نہ کہ مکمل کلاز۔'
  },

  // Category: Subject-Verb Agreement
  {
    id: 'cg-sva-01',
    category: 'Subject-Verb Agreement',
    difficulty: 'Medium',
    question: 'Neither the chief financial officer nor the managing directors _______ available for comment yesterday.',
    options: ['were', 'was', 'is', 'are'],
    correctIndex: 0,
    englishExplanation: 'With "neither... nor", the verb agrees with the closer subject ("managing directors" is plural, requiring "were").',
    urduExplanation: '"Neither... nor" میں فعل کا فیصلہ "nor" کے قریبی فاعل ("managing directors") کے مطابق جمع میں ہوگا۔'
  },
  {
    id: 'cg-sva-02',
    category: 'Subject-Verb Agreement',
    difficulty: 'Hard',
    question: 'Every voucher, invoice, and receipt _______ scrutinized meticulously by the forensic team.',
    options: ['was', 'were', 'have been', 'are'],
    correctIndex: 0,
    englishExplanation: 'Subjects modified by "every" or "each" take a singular verb ("was"), even when multiple nouns are coordinated.',
    urduExplanation: 'جب بھی اسم کے ساتھ "Every" یا "Each" آئے تو فعل ہمیشہ واحد ("was") آتا ہے۔'
  },
  {
    id: 'cg-sva-03',
    category: 'Subject-Verb Agreement',
    difficulty: 'Medium',
    question: 'The audit committee _______ unanimously agreed to recommend the adoption of the governance charter.',
    options: ['has', 'have', 'are', 'were'],
    correctIndex: 0,
    englishExplanation: 'Collective noun acting as a single unified entity takes a singular verb ("has").',
    urduExplanation: 'جب کوئی کمیٹی یا ادارہ بطور ایک اکائی متفقہ فیصلہ کرے تو واحد فعل ("has") آتا ہے۔'
  },

  // Category: Subjunctive & Formal Recommendations
  {
    id: 'cg-subj-01',
    category: 'Subjunctive & Formal Recommendations',
    difficulty: 'Hard',
    question: 'The compliance partner insisted that the trainee _______ the working papers before the audit committee met.',
    options: ['revise', 'revises', 'revised', 'would revise'],
    correctIndex: 0,
    englishExplanation: 'Mandative subjunctive after verbs of demand/insistence uses the bare base form ("revise") regardless of subject.',
    urduExplanation: 'انگریزی سبجنکٹیو میں "insisted that" کے بعد ہمیشہ فعل کی بنیادی فارم (Bare infinitive "revise") آتی ہے۔'
  },
  {
    id: 'cg-subj-02',
    category: 'Subjunctive & Formal Recommendations',
    difficulty: 'Hard',
    question: 'It is imperative that every expenditure voucher _______ properly authorized by the department head.',
    options: ['be', 'is', 'was', 'being'],
    correctIndex: 0,
    englishExplanation: 'Formal subjunctive structure "It is imperative that + subject + be + past participle".',
    urduExplanation: 'رسمی سبجنکٹیو ساخت میں "imperative that" کے بعد "be" آتا ہے جیسے "be properly authorized"۔'
  },

  // Category: Relative Clauses & Pronouns
  {
    id: 'cg-rel-01',
    category: 'Relative Clauses & Pronouns',
    difficulty: 'Medium',
    question: 'The senior tax adviser _______ expertise saved the corporation millions has retired.',
    options: ['whose', 'whom', 'who', 'which'],
    correctIndex: 0,
    englishExplanation: 'Possessive relative pronoun "whose" refers to the person\'s ownership of the expertise.',
    urduExplanation: 'ملکیت کو ظاہر کرنے کے لیے متعلقہ ضمیر "whose" (جس کی مہارت) آتا ہے۔'
  },
  {
    id: 'cg-rel-02',
    category: 'Relative Clauses & Pronouns',
    difficulty: 'Medium',
    question: 'The financial records _______ were seized by regulatory inspectors date back to the previous fiscal year.',
    options: ['which', 'who', 'whom', 'whose'],
    correctIndex: 0,
    englishExplanation: '"Which" is the relative pronoun used for non-human things or records.',
    urduExplanation: 'بے جان اشیاء اور کھاتوں کے لیے "which" کا لفظ استعمال کیا جاتا ہے۔'
  },

  // Category: Gerunds & Infinitives
  {
    id: 'cg-ger-01',
    category: 'Gerunds & Infinitives',
    difficulty: 'Medium',
    question: 'The management is committed to _______ ethical reporting standards across all subsidiary units.',
    options: ['maintaining', 'maintain', 'maintained', 'have maintained'],
    correctIndex: 0,
    englishExplanation: 'In "committed to", "to" is a preposition, which must be followed by a gerund ("maintaining").',
    urduExplanation: '"Committed to" میں "to" ایک پریپوزیشن ہے جس کے بعد \'ing\' والی فارم (Gerund) آتی ہے۔'
  },
  {
    id: 'cg-ger-02',
    category: 'Gerunds & Infinitives',
    difficulty: 'Easy',
    question: 'The financial controller avoided _______ with the external media until the investigation was completed.',
    options: ['speaking', 'to speak', 'speak', 'spoken'],
    correctIndex: 0,
    englishExplanation: 'The verb "avoid" is followed by a gerund ("speaking"), not a to-infinitive.',
    urduExplanation: 'فعل "avoid" کے بعد ہمیشہ جیرنڈ یعنی \'ing\' والی فارم ("speaking") آتی ہے۔'
  },

  // Category: Inverted Conditionals (ICAP ECS Essential)
  {
    id: 'cg-invcond-01',
    category: 'Conditionals & Prudence',
    difficulty: 'Hard',
    question: '_______ the tax authorities issue a revised audit assessment, our firm will lodge a formal appeal immediately.',
    options: ['Should', 'Had', 'Were', 'Unless'],
    correctIndex: 0,
    englishExplanation: 'Inverted first conditional begins with "Should + subject + bare infinitive" (Should the tax authorities issue...).',
    urduExplanation: 'پہلی شرطیہ ساخت میں Inversion کے لیے "Should" کا استعمال کیا جاتا ہے جیسے "Should the tax authorities issue"۔'
  },
  {
    id: 'cg-invcond-02',
    category: 'Conditionals & Prudence',
    difficulty: 'Hard',
    question: '_______ the internal audit manager discovered the discrepancy earlier, the financial misstatement could have been averted.',
    options: ['Had', 'Should', 'Were', 'If'],
    correctIndex: 0,
    englishExplanation: 'Inverted third conditional replaces "If + past perfect" with "Had + subject + past participle".',
    urduExplanation: 'تیسری شرطیہ ساخت میں "If" کو ہٹا کر "Had" کو فاعل سے پہلے لا کر جملہ بنایا جاتا ہے۔'
  },
  {
    id: 'cg-invcond-03',
    category: 'Conditionals & Prudence',
    difficulty: 'Hard',
    question: '_______ the executive directors to approve the restructuring plan, operational costs would drop by fifteen percent.',
    options: ['Were', 'Should', 'Had', 'Would'],
    correctIndex: 0,
    englishExplanation: 'Inverted second conditional uses "Were + subject + to + infinitive" to express a formal hypothetical situation.',
    urduExplanation: 'دوسری فرضی شرط میں "Were + subject + to + infinitive" استعمال کیا جاتا ہے۔'
  },

  // Category: Modals & Professional Hedging
  {
    id: 'cg-hedge-01',
    category: 'Modals & Professional Hedging',
    difficulty: 'Hard',
    question: 'Based on the preliminary forensic report, the discrepancy in the ledger _______ to be the result of a software migration error.',
    options: ['would appear', 'must have', 'shall be', 'will be able'],
    correctIndex: 0,
    englishExplanation: 'Hedging with "would appear + to-infinitive" conveys professional prudence when findings are still provisional.',
    urduExplanation: 'پیشہ ورانہ محتاط رائے (Hedging) ظاہر کرنے کے لیے "would appear to be" کا استعمال ہوتا ہے۔'
  },
  {
    id: 'cg-hedge-02',
    category: 'Modals & Professional Hedging',
    difficulty: 'Medium',
    question: 'Given the sudden surge in raw material tariffs, total operating expenditure _______ exceed budgeted projections.',
    options: ['could conceivably', 'must to', 'ought have', 'should to'],
    correctIndex: 0,
    englishExplanation: '"Could conceivably" expresses a plausible future contingency with appropriate professional reserve.',
    urduExplanation: 'مستقبل کے ممکنہ خطرے کے محتاط اظہار کے لیے "could conceivably" مناسب ترین ماڈل ایکسپریشن ہے۔'
  },

  // Category: Prepositions & Dependent Prepositions
  {
    id: 'cg-prep-01',
    category: 'Prepositions & Collocations',
    difficulty: 'Medium',
    question: 'All registered charter accountants are required to comply strictly _______ the statutory code of professional ethics.',
    options: ['with', 'to', 'for', 'by'],
    correctIndex: 0,
    englishExplanation: 'The verb "comply" strictly takes the dependent preposition "with".',
    urduExplanation: 'فعل "comply" کے ساتھ ہمیشہ پریپوزیشن "with" آتی ہے (comply with the code)۔'
  },
  {
    id: 'cg-prep-02',
    category: 'Prepositions & Collocations',
    difficulty: 'Medium',
    question: 'The newly appointed finance committee resolved to adhere firmly _______ the recognized accounting standards.',
    options: ['to', 'with', 'on', 'in'],
    correctIndex: 0,
    englishExplanation: 'The verb "adhere" always collocates with the preposition "to".',
    urduExplanation: 'فعل "adhere" کے بعد ہمیشہ "to" آتا ہے یعنی کسی اصول کی پابندی کرنا۔'
  },
  {
    id: 'cg-prep-03',
    category: 'Prepositions & Collocations',
    difficulty: 'Hard',
    question: 'Commercial banks are legally mandated to abstain _______ granting unsecured credit facilities to affiliated directors.',
    options: ['from', 'to', 'with', 'against'],
    correctIndex: 0,
    englishExplanation: '"Abstain" requires the preposition "from" followed by a gerund ("granting").',
    urduExplanation: '"Abstain" کے ساتھ پریپوزیشن "from" آتی ہے اور اس کے بعد جیرنڈ لگتا ہے۔'
  },
  {
    id: 'cg-prep-04',
    category: 'Prepositions & Collocations',
    difficulty: 'Easy',
    question: 'The management team was held accountable _______ the board of directors for the unexpected operating deficit.',
    options: ['to', 'for', 'at', 'with'],
    correctIndex: 0,
    englishExplanation: 'One is held accountable "to" an authority or person, but accountable "for" an outcome.',
    urduExplanation: 'کسی اتھارٹی یا بورڈ کے سامنے جوابدہ ہونے کے لیے "accountable to" آتا ہے۔'
  },

  // Category: Phrasal Verbs & Professional Collocations
  {
    id: 'cg-pv-01',
    category: 'Phrasal Verbs & Collocations',
    difficulty: 'Medium',
    question: 'The audit partners concluded that the bad debt could no longer be recovered and must be _______ immediately.',
    options: ['written off', 'written down', 'written up', 'written in'],
    correctIndex: 0,
    englishExplanation: '"Write off" means to recognize that an outstanding asset or bad debt has zero value.',
    urduExplanation: 'ناقابل وصول قرضے کو کھاتوں سے خارج کرنے کے لیے فقرہ "written off" استعمال ہوتا ہے۔'
  },
  {
    id: 'cg-pv-02',
    category: 'Phrasal Verbs & Collocations',
    difficulty: 'Hard',
    question: 'Unutilized capital allowances may be _______ to set off against future taxable trading profits.',
    options: ['carried forward', 'carried through', 'carried off', 'carried out'],
    correctIndex: 0,
    englishExplanation: 'In taxation and accounting, unused losses or allowances are "carried forward" to subsequent tax periods.',
    urduExplanation: 'ٹیکس اور اکاؤنٹس میں مستقبل میں کٹوتی کے لیے خسارہ آگے لے جانے کو "carried forward" کہا جاتا ہے۔'
  },

  // Category: Articles & Determiners
  {
    id: 'cg-art-01',
    category: 'Articles & Determiners',
    difficulty: 'Medium',
    question: 'The forensic investigator noted that _______ few transaction records remained intact after the server malfunction.',
    options: ['a', 'the', 'an', 'some'],
    correctIndex: 0,
    englishExplanation: '"A few" emphasizes that a small positive quantity still existed, contrasting with "few" which implies almost none.',
    urduExplanation: '"A few" مثبت معنوں میں تھوڑی سی تعداد کو ظاہر کرتا ہے جبکہ اکیلا "few" نہ ہونے کے برابر کا مفہوم دیتا ہے۔'
  },
  {
    id: 'cg-art-02',
    category: 'Articles & Determiners',
    difficulty: 'Hard',
    question: 'Neither the managing partner nor _______ associate directors were present during the opening remarks of the seminar.',
    options: ['the', 'a', 'any', 'every'],
    correctIndex: 0,
    englishExplanation: 'Definite article "the" specifies the particular group of associate directors previously referred to.',
    urduExplanation: 'مخصوص ڈائریکٹرز کے لیے معین آرٹیکل "the" کا استعمال درست ہے۔'
  },

  // Category: Advanced Subject-Verb Agreement
  {
    id: 'cg-sva-adv-01',
    category: 'Subject-Verb Agreement',
    difficulty: 'Hard',
    question: 'A substantial number of qualified candidates _______ applied for the vacant treasury officer position.',
    options: ['have', 'has', 'is', 'was'],
    correctIndex: 0,
    englishExplanation: '"A number of + plural noun" takes a plural verb ("have"), unlike "the number of" which takes singular.',
    urduExplanation: '"A number of" کے ساتھ جمع فعل ("have") آتا ہے، جبکہ "The number of" کے ساتھ واحد فعل آتا ہے۔'
  },
  {
    id: 'cg-sva-adv-02',
    category: 'Subject-Verb Agreement',
    difficulty: 'Hard',
    question: 'The number of unresolved audit queries _______ decreased significantly since the implementation of ERP software.',
    options: ['has', 'have', 'are', 'were'],
    correctIndex: 0,
    englishExplanation: '"The number of" functions as a singular count subject and takes a singular verb ("has").',
    urduExplanation: '"The number of" ایک واحد اکائی شمار ہوتا ہے اس لیے اس کے ساتھ واحد فعل "has" آتا ہے۔'
  },

  // Category: Sentence Transformation
  {
    id: 'cg-trans-01',
    category: 'Sentence Transformation',
    difficulty: 'Hard',
    question: 'Select the sentence that has the exact same meaning: "Although revenue increased, profitability fell due to soaring logistics costs."',
    options: [
      'Despite the increase in revenue, profitability fell due to soaring logistics costs.',
      'Because revenue increased, profitability fell due to soaring logistics costs.',
      'Revenue increased; therefore, profitability fell due to soaring logistics costs.',
      'Unless revenue increased, profitability fell due to soaring logistics costs.'
    ],
    correctIndex: 0,
    englishExplanation: '"Despite + noun phrase" is the precise concessive equivalent to "Although + clause".',
    urduExplanation: '"Although" والی کلاز کو اسم کے ساتھ "Despite" میں تبدیل کرنے سے جملے کا مفہوم برقرار رہتا ہے۔'
  },
  {
    id: 'cg-trans-02',
    category: 'Sentence Transformation',
    difficulty: 'Hard',
    question: 'Select the sentence with the exact equivalent meaning: "As soon as the external auditors arrived, the CFO convened an urgent briefing."',
    options: [
      'No sooner had the external auditors arrived than the CFO convened an urgent briefing.',
      'Hardly had the external auditors arrived than the CFO convened an urgent briefing.',
      'No sooner the external auditors arrived when the CFO convened an urgent briefing.',
      'Scarcely had the external auditors arrived than the CFO convened an urgent briefing.'
    ],
    correctIndex: 0,
    englishExplanation: '"No sooner had... than..." is the grammatically precise correlative equivalent of "As soon as...".',
    urduExplanation: '"No sooner had" کے ساتھ ہمیشہ "than" کا جوڑا آتا ہے، جبکہ "Hardly/Scarcely" کے ساتھ "when" آتا ہے۔'
  },

  // Category: Subject-Verb Agreement & Error Identification Correction
  {
    id: 'cg-err-01',
    category: 'Parts of Speech',
    difficulty: 'Hard',
    question: 'The senior partner, together with two audit trainees, _______ finalized the comprehensive annual review report.',
    options: ['has', 'have', 'are', 'having'],
    correctIndex: 0,
    englishExplanation: 'Parenthetical phrases like "together with" do not change the number of the head subject ("senior partner" is singular, so it requires singular "has").',
    urduExplanation: '"Together with" فاعل کی تعداد تبدیل نہیں کرتا، اصل فاعل واحد ہے اس لیے "have" کی جگہ "has" آنا چاہیے۔'
  },
  {
    id: 'cg-err-02',
    category: 'Inversions',
    difficulty: 'Hard',
    question: 'Under no circumstances _______ client encryption keys to unauthorized external parties.',
    options: ['should company personnel disclose', 'company personnel should disclose', 'company personnel discloses', 'disclose company personnel'],
    correctIndex: 0,
    englishExplanation: 'Negative phrase "Under no circumstances" at the beginning of a clause mandates subject-auxiliary inversion ("should company personnel disclose").',
    urduExplanation: '"Under no circumstances" سے شروع ہونے والے جملے میں امدادی فعل فاعل سے پہلے آنا چاہیے (should company personnel disclose)۔'
  }
];

/**
 * Procedural Grammar MCQ Synthesizer
 * Generates fresh, grammatically sound ICAP ECS syllabus aligned questions
 * with authentic distractors and bilingual explanations.
 * This guarantees true unlimited testing even across hundreds of attempts!
 */
export function generateProceduralGrammarMCQs(count: number, avoidIds: Set<string> = new Set()): GrammarQuestion[] {
  const templates = [
    {
      category: 'Conditionals & Prudence',
      difficulty: 'Hard' as const,
      make: (i: number) => {
        const nouns = ['external auditor', 'forensic examiner', 'tax partner', 'compliance manager', 'credit analyst'];
        const actions = ['reconciled the bank statements', 'verified the inventory vouchers', 'scrutinized the ledger postings', 'inspected the shipping logs', 'audited the fixed asset register'];
        const noun = nouns[i % nouns.length];
        const action = actions[(i + 1) % actions.length];
        return {
          id: `proc-g-cond-${Date.now()}-${i}`,
          category: 'Conditionals & Prudence',
          difficulty: 'Hard' as const,
          question: `If the ${noun} had ${action} in a timely manner, the financial discrepancy _______ during the year-end audit.`,
          options: ['would have been caught', 'will be caught', 'has been caught', 'would catch'],
          correctIndex: 0,
          englishExplanation: 'Third conditional in the passive voice requires "would have been + past participle" in the main clause.',
          urduExplanation: 'ماضی کے غیر حقیقی کنڈیشنل پیسو فقرے میں مین کلاز میں "would have been caught" آتا ہے۔'
        };
      }
    },
    {
      category: 'Inversion & Emphasis',
      difficulty: 'Hard' as const,
      make: (i: number) => {
        const adverbs = ['Rarely', 'Seldom', 'Scarcely', 'Hardly'];
        const entities = ['the audit firm', 'the statutory regulator', 'the compliance bureau', 'the revenue board'];
        const adv = adverbs[i % adverbs.length];
        const ent = entities[i % entities.length];
        return {
          id: `proc-g-inv-${Date.now()}-${i}`,
          category: 'Inversion & Emphasis',
          difficulty: 'Hard' as const,
          question: `${adv} _______ such comprehensive transparency in corporate governance disclosures.`,
          options: [`has ${ent} encountered`, `${ent} has encountered`, `${ent} encountered`, `did ${ent} encountered`],
          correctIndex: 0,
          englishExplanation: `Sentence starting with limiting adverb "${adv}" requires subject-auxiliary inversion.`,
          urduExplanation: `جملہ جب "${adv}" سے شروع ہو تو امدادی فعل فاعل سے پہلے لایا جاتا ہے۔`
        };
      }
    },
    {
      category: 'Modals & Prudence',
      difficulty: 'Medium' as const,
      make: (i: number) => {
        const docs = ['The statutory balance sheet', 'The cash flow statement', 'The inventory verification report', 'The tax computation schedule'];
        const reasons = ['all account balances match the general ledger', 'the bank reconciliation shows zero variance', 'the supporting vouchers have been validated', 'the audit partner has signed the clearance sheet'];
        const doc = docs[i % docs.length];
        const reason = reasons[i % reasons.length];
        return {
          id: `proc-g-mod-${Date.now()}-${i}`,
          category: 'Modals & Prudence',
          difficulty: 'Medium' as const,
          question: `${doc} is ready for submission; since ${reason}, the figures _______ accurate.`,
          options: ['must be', 'can have been', 'might not be', 'ought to'],
          correctIndex: 0,
          englishExplanation: '"Must be" represents a high-probability logical deduction backed by verifiable evidence.',
          urduExplanation: 'مصدقہ شواہد کی بنیاد پر پختہ منطقی نتیجے کے لیے "must be" استعمال ہوتا ہے۔'
        };
      }
    },
    {
      category: 'Subject-Verb Agreement',
      difficulty: 'Medium' as const,
      make: (i: number) => {
        const singles = ['The audit engagement senior', 'The tax department manager', 'The compliance inspector', 'The financial controller'];
        const plurals = ['the trainees', 'the junior associates', 'the audit assistants', 'the ledger clerks'];
        const single = singles[i % singles.length];
        const plural = plurals[i % plurals.length];
        return {
          id: `proc-g-sva-${Date.now()}-${i}`,
          category: 'Subject-Verb Agreement',
          difficulty: 'Medium' as const,
          question: `Neither ${single} nor ${plural} _______ authorized to sign the final audit memorandum without partner consent.`,
          options: ['were', 'was', 'is', 'has been'],
          correctIndex: 0,
          englishExplanation: 'In "neither... nor" constructions, the verb agrees with the nearest noun subject (plural requires "were").',
          urduExplanation: '"Neither... nor" میں فعل کا فیصلہ "nor" کے قریب ترین اسم کے مطابق کیا جاتا ہے۔'
        };
      }
    },
    {
      category: 'Gerunds & Infinitives',
      difficulty: 'Easy' as const,
      make: (i: number) => {
        const verbs = ['look forward to', 'are committed to', 'have dedicated themselves to'];
        const obj = ['finalizing', 'auditing', 'inspecting', 'reviewing'];
        const vb = verbs[i % verbs.length];
        const ob = obj[i % obj.length];
        return {
          id: `proc-g-ger-${Date.now()}-${i}`,
          category: 'Gerunds & Infinitives',
          difficulty: 'Easy' as const,
          question: `All members of the accounting team ${vb} _______ the statutory return well before the fiscal filing deadline.`,
          options: [ob, `to ${ob.replace(/ing$/, 'e').replace(/tting$/, 't')}`, 'finalized', 'have finalized'],
          correctIndex: 0,
          englishExplanation: `Phrasal expressions like "${vb}" conclude with a preposition requiring a gerund ("-ing").`,
          urduExplanation: `پریپوزیشنل فقروں کے بعد ہمیشہ جیرنڈ یعنی \'-ing\' والی فارم آتی ہے۔`
        };
      }
    },
    {
      category: 'Subjunctive & Formal Recommendations',
      difficulty: 'Hard' as const,
      make: (i: number) => {
        const verbs = ['recommended', 'insisted', 'demanded', 'stipulated'];
        const v = verbs[i % verbs.length];
        return {
          id: `proc-g-sub-${Date.now()}-${i}`,
          category: 'Subjunctive & Formal Recommendations',
          difficulty: 'Hard' as const,
          question: `The corporate governance board ${v} that every subsidiary company _______ an independent audit committee immediately.`,
          options: ['establish', 'establishes', 'established', 'would establish'],
          correctIndex: 0,
          englishExplanation: 'Mandative subjunctive after verbs of recommendation requires the bare base form ("establish").',
          urduExplanation: 'رسمی سبجنکٹیو میں تجویز دینے والے فعل کے بعد بنیادی فارم ("establish") آتی ہے۔'
        };
      }
    },
    {
      category: 'Conjunctions & Connectors',
      difficulty: 'Medium' as const,
      make: (i: number) => {
        const clauses = [
          { clause: 'the manufacturing plant operated under severe power rationing', noun: 'the severe power rationing' },
          { clause: 'the foreign exchange market experienced intense volatility', noun: 'the intense foreign exchange volatility' },
          { clause: 'freight shipping costs increased substantially', noun: 'substantial increases in freight shipping costs' }
        ];
        const c = clauses[i % clauses.length];
        return {
          id: `proc-g-con-${Date.now()}-${i}`,
          category: 'Conjunctions & Connectors',
          difficulty: 'Medium' as const,
          question: `_______ ${c.clause}, the enterprise managed to achieve its budgeted sales targets.`,
          options: ['Although', 'Despite', 'However', 'In spite of'],
          correctIndex: 0,
          englishExplanation: '"Although" correctly introduces a finite subordinate clause with subject and verb.',
          urduExplanation: 'مکمل کلاز (فاعل + فعل) کو متعارف کرانے کے لیے "Although" کا استعمال ہوتا ہے۔'
        };
      }
    },
    // Category: Error Identification (Crucial ICAP ECS Question Type)
    // Category: Synonyms (Contextual Business Vocabulary)
    {
      category: 'Synonyms',
      difficulty: 'Medium' as const,
      make: (i: number) => {
        const synonymItems = [
          { word: 'substantiate', syn: 'corroborate', options: ['corroborate', 'dispute', 'contradict', 'abandon'], reason: '"Substantiate" means to support or prove with authentic evidence.' },
          { word: 'mitigate', syn: 'alleviate', options: ['alleviate', 'intensify', 'exacerbate', 'worsen'], reason: '"Mitigate" means to make less severe or serious.' },
          { word: 'stringent', syn: 'rigorous', options: ['rigorous', 'lax', 'flexible', 'negligent'], reason: '"Stringent" denotes strict, precise and exacting regulations.' },
          { word: 'prudent', syn: 'judicious', options: ['judicious', 'reckless', 'hasty', 'negligent'], reason: '"Prudent" means acting with care and sound foresight.' },
          { word: 'scrutinize', syn: 'examine thoroughly', options: ['examine thoroughly', 'casually skim', 'dismiss lightly', 'overlook'], reason: '"Scrutinize" means to inspect with critical, detailed care.' }
        ];
        const s = synonymItems[i % synonymItems.length];
        return {
          id: `proc-g-syn-${Date.now()}-${i}`,
          category: 'Synonyms',
          difficulty: 'Medium' as const,
          question: `In professional auditing and corporate reporting, the term "${s.word}" is closest in meaning to _______.`,
          options: s.options,
          correctIndex: 0,
          englishExplanation: s.reason,
          urduExplanation: `کارپوریٹ تناظر میں لفظ "${s.word}" کا درست مترادف "${s.syn}" ہے۔`
        };
      }
    },
    // Category: Antonyms (Contextual Business Vocabulary)
    {
      category: 'Antonyms',
      difficulty: 'Medium' as const,
      make: (i: number) => {
        const antonymItems = [
          { word: 'prudent', ant: 'reckless', options: ['reckless', 'cautious', 'vigilant', 'methodical'], reason: 'The antonym of "prudent" (cautious, sensible) is "reckless".' },
          { word: 'robust', ant: 'fragile', options: ['fragile', 'durable', 'sturdy', 'resilient'], reason: 'The antonym of "robust" (strong and firm) is "fragile".' },
          { word: 'transparent', ant: 'opaque', options: ['opaque', 'clear', 'candid', 'unveiled'], reason: 'The antonym of "transparent" (open and verifiable) is "opaque".' },
          { word: 'material', ant: 'immaterial', options: ['immaterial', 'significant', 'substantial', 'weighty'], reason: 'In accounting, the opposite of "material" (significant) is "immaterial".' },
          { word: 'mandatory', ant: 'voluntary', options: ['voluntary', 'compulsory', 'statutory', 'obligatory'], reason: 'The antonym of "mandatory" (required by regulation) is "voluntary".' }
        ];
        const a = antonymItems[i % antonymItems.length];
        return {
          id: `proc-g-ant-${Date.now()}-${i}`,
          category: 'Antonyms',
          difficulty: 'Medium' as const,
          question: `In statutory compliance and finance, the direct antonym (opposite meaning) of "${a.word}" is _______.`,
          options: a.options,
          correctIndex: 0,
          englishExplanation: a.reason,
          urduExplanation: `حسابداری اور قانون میں لفظ "${a.word}" کا درست متضاد "${a.ant}" ہے۔`
        };
      }
    },
    // Category: Active / Passive (Reporting and Impersonal Passives)
    {
      category: 'Active / Passive',
      difficulty: 'Hard' as const,
      make: (i: number) => {
        const passives = [
          { subject: 'The company\'s statutory records', verb: 'to have been altered', options: ['to have been altered', 'to alter', 'having altered', 'altering'], reason: 'The perfect passive infinitive ("to have been altered") expresses a past action performed on the records.' },
          { subject: 'Unallocated investment expenditures', verb: 'to have been routed', options: ['to have been routed', 'to route', 'having routed', 'routing'], reason: 'Reporting passive with perfect passive infinitive indicates prior transfer.' },
          { subject: 'The quarterly reconciliation schedule', verb: 'to have been verified', options: ['to have been verified', 'to verify', 'having verified', 'verifying'], reason: 'Passive infinitive structure denotes completed past verification.' }
        ];
        const p = passives[i % passives.length];
        return {
          id: `proc-g-pass-${Date.now()}-${i}`,
          category: 'Active / Passive',
          difficulty: 'Hard' as const,
          question: `${p.subject} appeared _______ prior to the surprise inspection by the compliance regulators.`,
          options: p.options,
          correctIndex: 0,
          englishExplanation: p.reason,
          urduExplanation: 'ماضی کے واقعے کو رپورٹ کرنے کے لیے Perfect Passive Infinitive کی ساخت درست ہے۔'
        };
      }
    },
    // Category: Relative Clauses
    {
      category: 'Relative Clauses',
      difficulty: 'Medium' as const,
      make: (i: number) => {
        const rels = [
          { text: 'The regulatory institution to _______ the formal disclosure was submitted has confirmed receipt.', pronoun: 'which', options: ['which', 'whom', 'that', 'where'], reason: 'Preposition "to" governing an institution requires the relative pronoun "which".' },
          { text: 'The senior compliance officer _______ inspected the warehouse detected discrepancies in stock counts.', pronoun: 'who', options: ['who', 'which', 'whom', 'whose'], reason: 'The subject pronoun referring to a person is "who".' },
          { text: 'The enterprise established a digital reporting structure _______ subsidiaries submit real-time cash positions.', pronoun: 'whereby', options: ['whereby', 'whereof', 'whereat', 'whereon'], reason: '"Whereby" (meaning by which or through which) links systems to their operational procedures.' }
        ];
        const r = rels[i % rels.length];
        return {
          id: `proc-g-rel-${Date.now()}-${i}`,
          category: 'Relative Clauses',
          difficulty: 'Medium' as const,
          question: r.text,
          options: r.options,
          correctIndex: 0,
          englishExplanation: r.reason,
          urduExplanation: 'جملے کی ساخت اور پریپوزیشن کے مطابق درست Relative Pronoun کا انتخاب کیا گیا ہے۔'
        };
      }
    },
    // Category: Articles
    {
      category: 'Articles',
      difficulty: 'Medium' as const,
      make: (i: number) => {
        const arts = [
          { text: 'Auditors must always exercise _______ professional prudence when assessing going concern assumptions.', correct: 'zero article (no article)', options: ['zero article (no article)', 'the', 'a', 'an'], reason: '"Professional prudence" is an abstract uncountable noun and takes zero article.' },
          { text: 'The engagement director requested _______ independent appraisal of the investment property.', correct: 'an', options: ['an', 'a', 'the', 'zero article (no article)'], reason: '"Independent" begins with a vowel sound, requiring "an".' },
          { text: 'The treasury division secured _______ European commercial line of credit yesterday.', correct: 'a', options: ['a', 'an', 'the', 'zero article (no article)'], reason: '"European" begins with the consonant glide /j/, requiring "a".' }
        ];
        const a = arts[i % arts.length];
        return {
          id: `proc-g-art-${Date.now()}-${i}`,
          category: 'Articles',
          difficulty: 'Medium' as const,
          question: a.text,
          options: a.options,
          correctIndex: 0,
          englishExplanation: a.reason,
          urduExplanation: 'آئی کیپ سلیبس کے مطابق آرٹیکل کے استعمال کا درست اصول لاگو کیا گیا ہے۔'
        };
      }
    },
    // Category: Collocations
    {
      category: 'Collocations',
      difficulty: 'Medium' as const,
      make: (i: number) => {
        const collocList = [
          { text: 'The audit committee members were finally able to _______ a consensus on the materiality threshold.', correct: 'reach', options: ['reach', 'arrive', 'strike', 'draw'], reason: '"Reach a consensus" is the standard formal collocation.' },
          { text: 'The emergence of hidden tax liabilities _______ doubt on the valuation of the target business.', correct: 'cast', options: ['cast', 'drew', 'threw', 'made'], reason: 'In accounting and law, one "casts doubt on" an assertion.' },
          { text: 'The listed corporation is statutorily required to _______ with all environmental protection directives.', correct: 'comply', options: ['comply', 'abide', 'conform', 'adhere'], reason: 'The verb "comply" is paired with the preposition "with" ("comply with").' }
        ];
        const c = collocList[i % collocList.length];
        return {
          id: `proc-g-col-${Date.now()}-${i}`,
          category: 'Collocations',
          difficulty: 'Medium' as const,
          question: c.text,
          options: c.options,
          correctIndex: 0,
          englishExplanation: c.reason,
          urduExplanation: 'حسابداری اور دفتری انگریزی کے مستند کلوکیشن کا انتخاب کیا گیا ہے۔'
        };
      }
    }
  ];

  const generated: GrammarQuestion[] = [];
  let index = 0;
  while (generated.length < count && index < 150) {
    const template = templates[index % templates.length];
    const item = template.make(index);
    if (!avoidIds.has(item.id)) {
      // Randomize options order and adjust correctIndex
      const correctText = item.options[item.correctIndex];
      const shuffled = [...item.options];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const newIndex = shuffled.indexOf(correctText);
      item.options = shuffled;
      item.correctIndex = newIndex >= 0 ? newIndex : 0;
      generated.push(item);
    }
    index++;
  }
  return generated;
}
