import { 
  VocabWordMatchItem, 
  VocabDefinitionItem, 
  VocabCollocationItem 
} from '../types';
import { APTIS_TEST_SET_1, APTIS_TEST_SET_2 } from './aptisMockData';

// ============================================================================
// VOCABULARY TASK 1: Word Matching / Synonyms (Target Word -> Synonym)
// ============================================================================
export const EXPANDED_VOCAB_MATCHING_POOL: VocabWordMatchItem[] = [
  ...APTIS_TEST_SET_1.core.vocabWordMatching,
  ...APTIS_TEST_SET_2.core.vocabWordMatching,
  {
    id: 'vm-pool-01',
    targetWord: 'reconcile',
    correctMatch: 'harmonize',
    options: ['harmonize', 'disregard', 'postpone', 'liquidate'],
    explanation: '"Reconcile" means to check for harmony or agreement between accounts.',
    urduExplanation: '"Reconcile" کا مطلب ہے کھاتوں کے درمیان تال میل اور مطابقت پیدا کرنا۔'
  },
  {
    id: 'vm-pool-02',
    targetWord: 'scrutinize',
    correctMatch: 'examine closely',
    options: ['examine closely', 'ignore', 'approve quickly', 'disclose'],
    explanation: '"Scrutinize" means to examine working papers with close critical detail.',
    urduExplanation: '"Scrutinize" کا مطلب ہے گہری نظر سے اور باریک بینی سے جانچ پڑتال کرنا۔'
  },
  {
    id: 'vm-pool-03',
    targetWord: 'statutory',
    correctMatch: 'mandatory by law',
    options: ['mandatory by law', 'voluntary', 'temporary', 'customary'],
    explanation: '"Statutory" means required, enacted, or permitted by statute or law.',
    urduExplanation: '"Statutory" کا مطلب ہے قانون کے تحت لازمی قرار دیا گیا۔'
  },
  {
    id: 'vm-pool-04',
    targetWord: 'prudent',
    correctMatch: 'cautious and sensible',
    options: ['cautious and sensible', 'reckless', 'hasty', 'generous'],
    explanation: '"Prudent" denotes acting with care and sound financial foresight.',
    urduExplanation: '"Prudent" کا مطلب ہے محتاط، دور اندیش اور عقل مندی سے کام لینے والا۔'
  },
  {
    id: 'vm-pool-05',
    targetWord: 'materiality',
    correctMatch: 'significance',
    options: ['significance', 'tangibility', 'triviality', 'decoration'],
    explanation: 'In auditing, "materiality" refers to the threshold of significance that influences decisions.',
    urduExplanation: 'آڈٹ میں "materiality" کا مطلب ہے اہمیت اور اثر انگیزی کی وہ حد جو فیصلوں کو بدل سکے۔'
  },
  {
    id: 'vm-pool-06',
    targetWord: 'contingent',
    correctMatch: 'dependent on events',
    options: ['dependent on events', 'permanent', 'immediate', 'unconditional'],
    explanation: '"Contingent" describes liabilities dependent on uncertain future occurrences.',
    urduExplanation: '"Contingent" سے مراد وہ ذمہ داری یا امر ہے جس کا دارومدار مستقبل کے کسی واقعے پر ہو۔'
  },
  {
    id: 'vm-pool-07',
    targetWord: 'amortize',
    correctMatch: 'gradually write off',
    options: ['gradually write off', 'double in value', 'borrow suddenly', 'inflate'],
    explanation: '"Amortize" means to gradually write off the initial cost of an asset over time.',
    urduExplanation: '"Amortize" کا مطلب ہے کسی اثاثے کی لاگت کو مدت کے دوران بتدریج منہا کرنا۔'
  },
  {
    id: 'vm-pool-08',
    targetWord: 'fiduciary',
    correctMatch: 'trust-based',
    options: ['trust-based', 'hostile', 'speculative', 'fictitious'],
    explanation: 'A "fiduciary" duty is an ethical obligation based on legal trust and integrity.',
    urduExplanation: '"Fiduciary" کا مطلب ہے امانت داری اور قانونی اعتماد پر مبنی فرض۔'
  },
  {
    id: 'vm-pool-09',
    targetWord: 'discrepancy',
    correctMatch: 'inconsistency',
    options: ['inconsistency', 'agreement', 'similarity', 'guarantee'],
    explanation: '"Discrepancy" refers to a lack of compatibility or divergence between two figures.',
    urduExplanation: '"Discrepancy" کا مطلب ہے کھاتوں یا اعداد و شمار میں عدم مطابقت یا فرق۔'
  },
  {
    id: 'vm-pool-10',
    targetWord: 'substantiate',
    correctMatch: 'provide evidence for',
    options: ['provide evidence for', 'discredit', 'overlook', 'conceal'],
    explanation: '"Substantiate" means to establish proof or back a claim with valid documentary evidence.',
    urduExplanation: '"Substantiate" کا مطلب ہے ٹھوس شواہد اور دستاویزی ثبوتوں سے ثابت کرنا۔'
  },
  {
    id: 'vm-pool-11',
    targetWord: 'feasible',
    correctMatch: 'achievable',
    options: ['achievable', 'impossible', 'costly', 'disastrous'],
    explanation: '"Feasible" means capable of being done or carried out smoothly.',
    urduExplanation: '"Feasible" کا مطلب ہے قابل عمل یا جس کا پورا ہونا ممکن ہو۔'
  },
  {
    id: 'vm-pool-12',
    targetWord: 'lucrative',
    correctMatch: 'profitable',
    options: ['profitable', 'worthless', 'perilous', 'monotonous'],
    explanation: '"Lucrative" refers to an endeavor that produces substantial profit.',
    urduExplanation: '"Lucrative" کا مطلب ہے منافع بخش اور معاشی طور پر فائدہ مند۔'
  }
];

// ============================================================================
// VOCABULARY TASK 2: Word Definitions (Definition -> Word)
// ============================================================================
export const EXPANDED_VOCAB_DEFINITIONS_POOL: VocabDefinitionItem[] = [
  ...APTIS_TEST_SET_1.core.vocabDefinitions,
  ...APTIS_TEST_SET_2.core.vocabDefinitions,
  {
    id: 'vd-pool-01',
    definition: 'A formal independent examination and verification of an organization’s financial accounts and operational records.',
    correctWord: 'Audit',
    options: ['Audit', 'Auction', 'Autopsy', 'Avenue'],
    explanation: 'An audit is an independent review of books of account.',
    urduExplanation: 'مالیاتی کھاتوں کی غیر جانبدارانہ جانچ پڑتال کو "Audit" کہا جاتا ہے۔'
  },
  {
    id: 'vd-pool-02',
    definition: 'A financial statement summarizing a company’s assets, liabilities, and shareholders’ equity at a specific point in time.',
    correctWord: 'Balance Sheet',
    options: ['Balance Sheet', 'Cash Ledger', 'Stock Register', 'Voucher File'],
    explanation: 'The balance sheet presents the financial position of an enterprise on a given date.',
    urduExplanation: 'مخصوص تاریخ پر کمپنی کے اثاثہ جات اور واجبات کو ظاہر کرنے والے گوشوارے کو "Balance Sheet" کہتے ہیں۔'
  },
  {
    id: 'vd-pool-03',
    definition: 'An intentional deception or misrepresentation made for personal gain or to damage another party financially.',
    correctWord: 'Fraud',
    options: ['Fraud', 'Fault', 'Friction', 'Flaw'],
    explanation: 'Fraud is intentional dishonesty resulting in unauthorized financial benefit.',
    urduExplanation: 'ذاتی فائدے کے لیے جان بوجھ کر دھوکہ دہی کرنے کو "Fraud" کہتے ہیں۔'
  },
  {
    id: 'vd-pool-04',
    definition: 'The ease with which an asset can be converted into ready cash without affecting its market price.',
    correctWord: 'Liquidity',
    options: ['Liquidity', 'Longevity', 'Legality', 'Liability'],
    explanation: 'Liquidity refers to how quickly assets can be converted to cash.',
    urduExplanation: 'اثاثے کو فوری نقد رقم میں تبدیل کرنے کی آسانی اور صلاحیت کو "Liquidity" کہتے ہیں۔'
  },
  {
    id: 'vd-pool-05',
    definition: 'A sum of money paid regularly by a company to its shareholders out of its profits.',
    correctWord: 'Dividend',
    options: ['Dividend', 'Debit', 'Discount', 'Deposit'],
    explanation: 'A dividend represents distributed net earnings paid to equity holders.',
    urduExplanation: 'کمپنی کے منافع میں سے شیئر ہولڈرز کو ملنے والے حصے کو "Dividend" کہا جاتا ہے۔'
  },
  {
    id: 'vd-pool-06',
    definition: 'The gradual decrease in the economic value of a tangible fixed asset due to wear and tear, age, or obsolescence.',
    correctWord: 'Depreciation',
    options: ['Depreciation', 'Deflation', 'Devaluation', 'Derivation'],
    explanation: 'Depreciation allocates tangible fixed asset cost over its useful life.',
    urduExplanation: 'استعمال یا وقت گزرنے سے کسی فکسڈ اثاثے کی قیمت میں بتدریج کمی کو "Depreciation" کہتے ہیں۔'
  },
  {
    id: 'vd-pool-07',
    definition: 'The process of identifying, analyzing, and taking precautionary measures to mitigate uncertainty in investments.',
    correctWord: 'Risk Management',
    options: ['Risk Management', 'Crisis Reaction', 'Arbitrage Trade', 'Credit Rating'],
    explanation: 'Risk management systematically handles financial uncertainties.',
    urduExplanation: 'مالیاتی خطرات کی نشاندہی اور پیشگی روک تھام کے عمل کو "Risk Management" کہتے ہیں۔'
  },
  {
    id: 'vd-pool-08',
    definition: 'A legal designation of a person or business unable to repay debts owed to creditors.',
    correctWord: 'Bankruptcy',
    options: ['Bankruptcy', 'Brevity', 'Barter', 'Bounty'],
    explanation: 'Bankruptcy is the legal status when liabilities exceed the capacity to repay.',
    urduExplanation: 'قرضے واپس نہ کر سکنے پر قانونی طور پر نادہندہ ہونے کو "Bankruptcy" کہتے ہیں۔'
  },
  {
    id: 'vd-pool-09',
    definition: 'An employee or insider who exposes illegal, illicit, or unethical activity occurring within an organization.',
    correctWord: 'Whistleblower',
    options: ['Whistleblower', 'Watchman', 'Warden', 'Witness'],
    explanation: 'A whistleblower reports internal corporate misconduct to authorities.',
    urduExplanation: 'ادارے کے اندر ہونے والی بے ضابطگیوں اور غیر قانونی کاموں کو افشا کرنے والے کو "Whistleblower" کہتے ہیں۔'
  },
  {
    id: 'vd-pool-10',
    definition: 'The systematic recording, summarizing, and reporting of economic transactions for business management.',
    correctWord: 'Accounting',
    options: ['Accounting', 'Actuary', 'Appraisal', 'Auditing'],
    explanation: 'Accounting is the discipline of maintaining financial records.',
    urduExplanation: 'معاشی لین دین کے باقاعدہ اندراج اور خلاصہ تیار کرنے کے علم کو "Accounting" کہتے ہیں۔'
  }
];

// ============================================================================
// VOCABULARY TASK 3: Common Collocations (Fill in the blank with correct collocate)
// ============================================================================
export const EXPANDED_VOCAB_COLLOCATIONS_POOL: VocabCollocationItem[] = [
  ...APTIS_TEST_SET_1.core.vocabCollocations,
  ...APTIS_TEST_SET_2.core.vocabCollocations,
  {
    id: 'vc-pool-01',
    sentence: 'The engagement partner decided to _______ an opinion with reservations regarding stock valuations.',
    options: ['express', 'pronounce', 'shout', 'declare'],
    correctIndex: 0,
    explanation: 'In professional audit standards, one "expresses an opinion" on financial statements.',
    urduExplanation: 'آڈٹ کی بین الاقوامی اصطلاح میں رائے دینے کے لیے "express an opinion" کہا جاتا ہے۔'
  },
  {
    id: 'vc-pool-02',
    sentence: 'The audit committee requested the CFO to _______ light on the sudden decline in operating cash flow.',
    options: ['shed', 'shine', 'throw', 'spark'],
    correctIndex: 0,
    explanation: 'The established English idiom is to "shed light on" an issue (clarify or explain).',
    urduExplanation: 'کسی معاملے پر وضاحت دینے یا روشنی ڈالنے کے لیے "shed light on" کا محاورہ بولا جاتا ہے۔'
  },
  {
    id: 'vc-pool-03',
    sentence: 'To ensure statutory compliance, all publicly listed firms must _______ with international standards.',
    options: ['comply', 'consent', 'cooperate', 'conform'],
    correctIndex: 0,
    explanation: '"Comply" standardly pairs with the preposition "with" to denote obeying regulations.',
    urduExplanation: 'قوانین و ضوابط کی پیروی کرنے کے لیے "comply with" کا استعمال ہوتا ہے۔'
  },
  {
    id: 'vc-pool-04',
    sentence: 'The manufacturing company failed to _______ the deadline for filing its annual corporate tax return.',
    options: ['meet', 'reach', 'catch', 'hit'],
    correctIndex: 0,
    explanation: 'The standard business collocation is to "meet a deadline".',
    urduExplanation: 'مقررہ وقت یا ڈیڈ لائن پر کام مکمل کرنے کے لیے "meet the deadline" بولا جاتا ہے۔'
  },
  {
    id: 'vc-pool-05',
    sentence: 'The newly qualified chartered accountant was able to _______ valuable experience during fieldwork.',
    options: ['gain', 'win', 'earn', 'conquer'],
    correctIndex: 0,
    explanation: 'One "gains experience" through practical exposure and work.',
    urduExplanation: 'عملی تجربہ حاصل کرنے کے لیے "gain experience" کی ترکیب درست ہے۔'
  },
  {
    id: 'vc-pool-06',
    sentence: 'The sudden surge in interest rates has _______ serious concern among property developers.',
    options: ['raised', 'risen', 'arisen', 'lifted'],
    correctIndex: 0,
    explanation: 'The standard collocation is to "raise concern" (cause worry).',
    urduExplanation: 'تشویش یا خدشات پیدا کرنے کے لیے "raise concern" استعمال ہوتا ہے۔'
  },
  {
    id: 'vc-pool-07',
    sentence: 'Both trading partners signed an agreement to _______ business on a reciprocal basis.',
    options: ['conduct', 'direct', 'lead', 'perform'],
    correctIndex: 0,
    explanation: 'In commercial English, parties "conduct business".',
    urduExplanation: 'کاروبار چلانے یا لین دین کے لیے "conduct business" درست اصطلاح ہے۔'
  },
  {
    id: 'vc-pool-08',
    sentence: 'The management decided to _______ advantage of tax incentives introduced in the federal budget.',
    options: ['take', 'make', 'have', 'catch'],
    correctIndex: 0,
    explanation: 'The idiomatic verb phrase is to "take advantage of" an opportunity.',
    urduExplanation: 'کسی رعایت یا موقع سے فائدہ اٹھانے کے لیے "take advantage of" کہا جاتا ہے۔'
  }
];

// ============================================================================
// VOCABULARY TASK 4: Sentence Completion (Vocab in Context)
// ============================================================================
export const EXPANDED_VOCAB_SENTENCE_POOL: VocabCollocationItem[] = [
  ...APTIS_TEST_SET_1.core.vocabSentenceCompletion,
  ...APTIS_TEST_SET_2.core.vocabSentenceCompletion,
  {
    id: 'vs-pool-01',
    sentence: 'The senior auditor found substantial supporting documents to _______ the expense claim.',
    options: ['corroborate', 'contradict', 'conceal', 'complicate'],
    correctIndex: 0,
    explanation: '"Corroborate" means to confirm or substantiate a claim with documentary proof.',
    urduExplanation: '"Corroborate" کا مطلب ہے ثبوت کے ساتھ کسی بیان یا دعوے کی تصدیق کرنا۔'
  },
  {
    id: 'vs-pool-02',
    sentence: 'Due to revised securities regulations, attendance at the quarterly compliance briefing is _______.',
    options: ['mandatory', 'optional', 'voluntary', 'accidental'],
    correctIndex: 0,
    explanation: '"Mandatory" means compulsory or legally binding.',
    urduExplanation: '"Mandatory" کا مطلب ہے لازمی اور قانونی طور پر ضروری۔'
  },
  {
    id: 'vs-pool-03',
    sentence: 'The sharp drop in global demand had a severe _______ on the exporter’s profit margins.',
    options: ['impact', 'affect', 'aspect', 'access'],
    correctIndex: 0,
    explanation: 'As a noun denoting marked effect, "impact" is the correct term.',
    urduExplanation: 'اثر ظاہر کرنے کے لیے بطور ناؤن "impact" درست ہے۔'
  },
  {
    id: 'vs-pool-04',
    sentence: 'An external auditor must maintain professional _______ and never disclose confidential client records.',
    options: ['confidentiality', 'casualness', 'carelessness', 'confusion'],
    correctIndex: 0,
    explanation: '"Confidentiality" is the ethical duty to safeguard private data.',
    urduExplanation: 'معلومات کو صیغہ راز میں رکھنے کے اخلاقی اصول کو "confidentiality" کہتے ہیں۔'
  },
  {
    id: 'vs-pool-05',
    sentence: 'The corporate board commended the financial analyst for her _______ in resolving the tax discrepancy.',
    options: ['diligence', 'dishonesty', 'delay', 'disinterest'],
    correctIndex: 0,
    explanation: '"Diligence" refers to persistent, thorough, and careful effort.',
    urduExplanation: 'انتھک اور باریک بین محنت کے لیے "diligence" کا لفظ موزوں ہے۔'
  },
  {
    id: 'vs-pool-06',
    sentence: 'The engagement team carried out rigorous procedures to _______ the authenticity of the invoice.',
    options: ['verify', 'vibrate', 'vanish', 'violate'],
    correctIndex: 0,
    explanation: '"Verify" means to check the truth or accuracy of something.',
    urduExplanation: 'درستگی اور سچائی کی جانچ پڑتال کے لیے "verify" استعمال ہوتا ہے۔'
  },
  {
    id: 'vs-pool-07',
    sentence: 'The CFO delivered a lucid presentation that served to _______ the complex regulatory guidelines.',
    options: ['clarify', 'confuse', 'conceal', 'condemn'],
    correctIndex: 0,
    explanation: '"Clarify" means to make an idea clear and easy to understand.',
    urduExplanation: 'معاملات کو آسان اور واضح انداز میں سمجھانے کو "clarify" کہتے ہیں۔'
  },
  {
    id: 'vs-pool-08',
    sentence: 'The firm adopted a highly _______ posture in estimating provisions for uncollectible receivables.',
    options: ['conservative', 'reckless', 'hasty', 'careless'],
    correctIndex: 0,
    explanation: 'In accounting prudence, a "conservative" estimate avoids overstating assets.',
    urduExplanation: 'حکمت و احتیاط کے اصول کے مطابق محتاط تخمینہ لگانے کو "conservative" کہتے ہیں۔'
  }
];

// ============================================================================
// VOCABULARY TASK 5: Context Matching (Word Pairs / Contextual Synonyms)
// ============================================================================
export const EXPANDED_VOCAB_CONTEXT_POOL: VocabWordMatchItem[] = [
  ...APTIS_TEST_SET_1.core.vocabContextMatching,
  ...APTIS_TEST_SET_2.core.vocabContextMatching,
  {
    id: 'vx-pool-01',
    targetWord: 'objective',
    correctMatch: 'unbiased',
    options: ['unbiased', 'subjective', 'emotional', 'prejudiced'],
    explanation: '"Objective" in professional ethics means impartial and unbiased.',
    urduExplanation: 'پیشہ ورانہ اخلاقیات میں "objective" کا مطلب ہے غیر جانبدار اور منصف مزاج۔'
  },
  {
    id: 'vx-pool-02',
    targetWord: 'comply',
    correctMatch: 'abide by',
    options: ['abide by', 'resist', 'reject', 'disregard'],
    explanation: '"Comply" means to conform to or abide by established rules.',
    urduExplanation: '"Comply" کا مطلب ہے قوانین کی پاسداری کرنا (Abide by)۔'
  },
  {
    id: 'vx-pool-03',
    targetWord: 'fluctuate',
    correctMatch: 'oscillate',
    options: ['oscillate', 'stabilize', 'freeze', 'stagnate'],
    explanation: '"Fluctuate" means to rise and fall irregularly.',
    urduExplanation: '"Fluctuate" کا مطلب ہے قیمت یا تعداد میں اتار چڑھاؤ آنا۔'
  },
  {
    id: 'vx-pool-04',
    targetWord: 'consolidate',
    correctMatch: 'combine',
    options: ['combine', 'divide', 'scatter', 'isolate'],
    explanation: '"Consolidate" means to unite or combine multiple parts into a whole.',
    urduExplanation: '"Consolidate" کا مطلب ہے مختلف کھاتوں یا کمپنیوں کو ایک ساتھ جوڑنا۔'
  },
  {
    id: 'vx-pool-05',
    targetWord: 'adverse',
    correctMatch: 'unfavourable',
    options: ['unfavourable', 'beneficial', 'advantageous', 'pleasant'],
    explanation: '"Adverse" describes unfavorable or opposing conditions or audit opinions.',
    urduExplanation: '"Adverse" کا مطلب ہے منفی، غیر موافق یا نامساعد۔'
  },
  {
    id: 'vx-pool-06',
    targetWord: 'competent',
    correctMatch: 'capable',
    options: ['capable', 'inept', 'clumsy', 'unskilled'],
    explanation: '"Competent" means having the necessary ability, knowledge, or skill.',
    urduExplanation: '"Competent" کا مطلب ہے لائق، قابل اور ماہر۔'
  },
  {
    id: 'vx-pool-07',
    targetWord: 'allocate',
    correctMatch: 'distribute',
    options: ['distribute', 'withhold', 'confiscate', 'gather'],
    explanation: '"Allocate" means to distribute resources for a specific purpose.',
    urduExplanation: '"Allocate" کا مطلب ہے بجٹ یا وسائل کو مخصوص مقاصد کے لیے تقسیم کرنا۔'
  },
  {
    id: 'vx-pool-08',
    targetWord: 'transparency',
    correctMatch: 'openness',
    options: ['openness', 'secrecy', 'opacity', 'ambiguity'],
    explanation: '"Transparency" implies clarity, openness, and lack of hidden agendas.',
    urduExplanation: '"Transparency" کا مطلب ہے شفافیت، سچائی اور کھلا پن۔'
  }
];
