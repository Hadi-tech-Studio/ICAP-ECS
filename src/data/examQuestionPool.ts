import { 
  GrammarQuestion, 
  VocabWordMatchItem, 
  VocabDefinitionItem, 
  VocabCollocationItem, 
  ReadingSection1, 
  ReadingSection2, 
  ReadingSection3, 
  ReadingSection4,
  AptisWritingModule
} from '../types';
import { APTIS_TEST_SET_1, APTIS_TEST_SET_2 } from './aptisMockData';
import { INITIAL_EXAM_QUESTIONS } from './mockData';
import { ADDITIONAL_CURATED_GRAMMAR_POOL } from './expandedGrammarPool';
import { ICAP_ECS_CURATED_GRAMMAR_POOL, ICAP_CORE_CATEGORIES, IcapCoreCategory } from './icapCoreGrammarPool';
import { 
  EXPANDED_READING_SECTION_1, 
  EXPANDED_READING_SECTION_2, 
  EXPANDED_READING_SECTION_3, 
  EXPANDED_READING_SECTION_4 
} from './expandedReadingPool';
import { EXPANDED_WRITING_MODULES as ALL_WRITING_MODULES } from './expandedWritingPool';
import { 
  EXPANDED_VOCAB_SENTENCE_POOL as ALL_VOCAB_SENTENCE_POOL, 
  EXPANDED_VOCAB_CONTEXT_POOL as ALL_VOCAB_CONTEXT_POOL,
  EXPANDED_VOCAB_MATCHING_POOL as FULL_VOCAB_MATCHING_POOL,
  EXPANDED_VOCAB_DEFINITIONS_POOL as FULL_VOCAB_DEFINITIONS_POOL,
  EXPANDED_VOCAB_COLLOCATIONS_POOL as FULL_VOCAB_COLLOCATIONS_POOL
} from './expandedVocabPool';

// Map initial exam questions from mockData into GrammarQuestion format with difficulty
const MOCK_DATA_GRAMMAR_POOL: GrammarQuestion[] = INITIAL_EXAM_QUESTIONS
  .filter(q => q.module === 'grammar')
  .map((q, idx) => ({
    id: `md-${q.id || idx}`,
    category: q.category || 'General Grammar',
    question: q.question,
    options: q.options,
    correctIndex: q.correctIndex,
    englishExplanation: q.englishExplanation || 'Follow standard ICAP grammar and syntax rules.',
    urduExplanation: q.urduExplanation || 'آئی کیپ گرائمر کے اصولوں کے مطابق درست جواب منتخب کریں۔',
    difficulty: (idx % 3 === 0 ? 'Easy' : idx % 3 === 1 ? 'Medium' : 'Hard') as 'Easy' | 'Medium' | 'Hard'
  }));

// Tag existing set 1 and set 2 questions with categories and difficulties
const SET_1_GRAMMAR_TAGGED: GrammarQuestion[] = APTIS_TEST_SET_1.core.grammarQuestions.map((q, idx) => ({
  ...q,
  id: q.id.startsWith('set1-') ? q.id : `set1-${q.id}`,
  difficulty: (idx % 3 === 0 ? 'Easy' : idx % 3 === 1 ? 'Medium' : 'Hard') as 'Easy' | 'Medium' | 'Hard'
}));

const SET_2_GRAMMAR_TAGGED: GrammarQuestion[] = APTIS_TEST_SET_2.core.grammarQuestions.map((q, idx) => ({
  ...q,
  id: q.id.startsWith('set2-') ? q.id : `set2-${q.id}`,
  difficulty: (idx % 3 === 1 ? 'Easy' : idx % 3 === 2 ? 'Medium' : 'Hard') as 'Easy' | 'Medium' | 'Hard'
}));

// Additional specialized ICAP ECS syllabus aligned MCQs across key topics
export const EXPANDED_GRAMMAR_POOL: GrammarQuestion[] = [
  // Category 1: Conditionals & Prudence
  {
    id: 'pool-g-cond-01',
    category: 'Conditionals & Prudence',
    difficulty: 'Medium',
    question: 'If the engagement partner _______ the audit strategy memorandum earlier, the fieldwork would have commenced on schedule.',
    options: ['approved', 'had approved', 'would approve', 'has approved'],
    correctIndex: 1,
    englishExplanation: 'Third conditional requires past perfect ("had approved") in the if-clause to discuss hypothetical past non-occurrences.',
    urduExplanation: 'تھرڈ کنڈیشنل جملے میں ماضی کی غیر حقیقی شرط کے لیے "if-clause" میں Past Perfect ("had approved") استعمال ہوتا ہے۔'
  },
  {
    id: 'pool-g-cond-02',
    category: 'Conditionals & Prudence',
    difficulty: 'Hard',
    question: '_______ any material discrepancies emerge during physical inventory observation, the audit team must immediately expand testing procedures.',
    options: ['Should', 'Were', 'Had', 'Would'],
    correctIndex: 0,
    englishExplanation: 'Inverted first conditional: "Should" replaces "If" to express a formal, conditional possibility in professional audit instructions.',
    urduExplanation: 'فارمل انگلش میں "If discrepancies emerge" کی جگہ انورژن کے ساتھ "Should any discrepancies emerge" لکھا جاتا ہے۔'
  },
  {
    id: 'pool-g-cond-03',
    category: 'Conditionals & Prudence',
    difficulty: 'Hard',
    question: 'Had the CFO not disclosed the contingent liability in the notes, the external auditors _______ a qualified audit opinion.',
    options: ['issued', 'will issue', 'would have issued', 'have issued'],
    correctIndex: 2,
    englishExplanation: 'Inverted third conditional ("Had + subject + past participle") takes "would have + past participle" in the result clause.',
    urduExplanation: 'جب شرطیہ جملہ "Had" سے شروع ہو (Inverted 3rd Conditional) تو نتیجہ والے حصے میں "would have issued" آئے گا۔'
  },
  {
    id: 'pool-g-cond-04',
    category: 'Conditionals & Prudence',
    difficulty: 'Easy',
    question: 'The management will approve the capital expenditure proposal provided that the internal rate of return _______ the hurdle rate.',
    options: ['exceeded', 'exceeds', 'will exceed', 'exceeding'],
    correctIndex: 1,
    englishExplanation: 'Conjunctions of condition ("provided that", "as long as") take the present simple ("exceeds") when referring to future conditions.',
    urduExplanation: '"Provided that" (اس شرط پر کہ) کے بعد آنے والے کلاز میں فیوچر کی جگہ Present Simple ("exceeds") استعمال ہوتا ہے۔'
  },

  // Category 2: Passive Voice in Auditing
  {
    id: 'pool-g-pass-01',
    category: 'Passive Voice in Auditing',
    difficulty: 'Medium',
    question: 'During our review of trade payables, several unauthorized journal entries _______ by the senior accountant.',
    options: ['identified', 'were identified', 'had identifying', 'have been identifying'],
    correctIndex: 1,
    englishExplanation: 'Passive voice with past simple ("were identified") is standard for reporting past audit findings impartially.',
    urduExplanation: 'آڈٹ فائنڈنگز کی رپورٹنگ میں معروضی اور غیر جانبدارانہ انداز کے لیے Past Simple Passive ("were identified") کا استعمال کیا جاتا ہے۔'
  },
  {
    id: 'pool-g-pass-02',
    category: 'Passive Voice in Auditing',
    difficulty: 'Hard',
    question: 'It _______ that internal control weaknesses contributed significantly to the inventory shrinkage.',
    options: ['is widely concluded', 'widely concluding', 'was widely to conclude', 'has widely concluding'],
    correctIndex: 0,
    englishExplanation: 'Impersonal passive construction ("It is widely concluded that...") maintains professional neutrality and objective tone.',
    urduExplanation: 'پروفیشنل اور نیوٹرل انداز اپنانے کے لیے Impersonal Passive ("It is widely concluded that...") کا استعمال کیا جاتا ہے۔'
  },
  {
    id: 'pool-g-pass-03',
    category: 'Passive Voice in Auditing',
    difficulty: 'Easy',
    question: 'All petty cash vouchers must _______ by the department head before reimbursement is processed.',
    options: ['sign', 'signed', 'be signed', 'signing'],
    correctIndex: 2,
    englishExplanation: 'Passive modal structure: "must be + past participle" ("must be signed").',
    urduExplanation: 'ماڈل ورب کے ساتھ Passive Voice بنانے کے لیے "must be + 3rd form" یعنی "must be signed" استعمال ہوتا ہے۔'
  },
  {
    id: 'pool-g-pass-04',
    category: 'Passive Voice in Auditing',
    difficulty: 'Medium',
    question: 'The financial statements for the fiscal year _______ by the statutory auditors prior to the annual general meeting.',
    options: ['were comprehensively examined', 'comprehensively examined', 'had comprehensively examining', 'are examining comprehensively'],
    correctIndex: 0,
    englishExplanation: 'Passive past voice ("were comprehensively examined") accurately reflects completed audit verification on financial statements.',
    urduExplanation: 'مکمل ہو چکے آڈٹ کام کے لیے Passive Voice ("were comprehensively examined") کا انتخاب درست ہے۔'
  },

  // Category 3: Subject-Verb Agreement
  {
    id: 'pool-g-sva-01',
    category: 'Subject-Verb Agreement',
    difficulty: 'Medium',
    question: 'The board of directors, together with the chief risk officer, _______ responsible for establishing internal risk parameters.',
    options: ['are', 'is', 'were', 'have been'],
    correctIndex: 1,
    englishExplanation: 'Phrases introduced by "together with" do not alter the number of the singular subject ("The board of directors is").',
    urduExplanation: 'جب Subject سنگولر ہو ("The board of directors") اور اس کے بعد "together with" آئے، تو Verb ہمیشہ Singular ("is") رہتا ہے۔'
  },
  {
    id: 'pool-g-sva-02',
    category: 'Subject-Verb Agreement',
    difficulty: 'Hard',
    question: 'Neither the audit manager nor the engagement seniors _______ able to substantiate the valuation of the intangible assets.',
    options: ['was', 'were', 'is', 'has been'],
    correctIndex: 1,
    englishExplanation: 'In "neither... nor" constructions, the verb agrees with the subject closest to it ("the engagement seniors were").',
    urduExplanation: '"Neither... nor" کے قاعدے کے مطابق ورب اپنے قریب ترین سبجیکٹ ("seniors" - جمع) کے مطابق یعنی "were" لگے گا۔'
  },
  {
    id: 'pool-g-sva-03',
    category: 'Subject-Verb Agreement',
    difficulty: 'Easy',
    question: 'Every ledger account and bank reconciliation statement _______ carefully scrutinized by the team.',
    options: ['was', 'were', 'are', 'have been'],
    correctIndex: 0,
    englishExplanation: 'Subjects preceded by "every" or "each" are singular and take a singular verb ("was").',
    urduExplanation: 'جب بھی سبجیکٹ سے پہلے "Every" یا "Each" آئے تو ورب ہمیشہ واحد (Singular - "was") ہوتا ہے۔'
  },
  {
    id: 'pool-g-sva-04',
    category: 'Subject-Verb Agreement',
    difficulty: 'Hard',
    question: 'A considerable number of non-compliance issues _______ documented in the interim management letter.',
    options: ['was', 'were', 'is', 'has been'],
    correctIndex: 1,
    englishExplanation: '"A number of..." takes a plural verb ("were"), whereas "The number of..." takes a singular verb.',
    urduExplanation: '"A number of" کے بعد ہمیشہ Plural Verb ("were") آتا ہے جبکہ "The number of" کے بعد Singular Verb آتا ہے۔'
  },

  // Category 4: Prepositions & Collocations
  {
    id: 'pool-g-prep-01',
    category: 'Prepositions & Collocations',
    difficulty: 'Easy',
    question: 'The accounting team must strictly adhere _______ the revised revenue recognition guidelines issued by the council.',
    options: ['with', 'to', 'on', 'for'],
    correctIndex: 1,
    englishExplanation: 'The verb "adhere" takes the dependent preposition "to" (adhere to rules/standards).',
    urduExplanation: 'لفظ "Adhere" کے ساتھ ہمیشہ Preposition "to" آتی ہے (Adhere to standards یعنی اصولوں کی پاسداری کرنا)۔'
  },
  {
    id: 'pool-g-prep-02',
    category: 'Prepositions & Collocations',
    difficulty: 'Medium',
    question: 'The finalization of the merger is contingent _______ receiving regulatory clearance from the competition commission.',
    options: ['to', 'on', 'with', 'for'],
    correctIndex: 1,
    englishExplanation: 'The adjective "contingent" pairs with the dependent preposition "upon" or "on" (contingent upon/on approval).',
    urduExplanation: '"Contingent" کے ساتھ Preposition "on" یا "upon" استعمال ہوتی ہے (جس کا مطلب ہے "مشروط ہونا")۔'
  },
  {
    id: 'pool-g-prep-03',
    category: 'Prepositions & Collocations',
    difficulty: 'Hard',
    question: 'Senior partners must abstain _______ participating in engagements where potential conflicts of interest exist.',
    options: ['to', 'from', 'of', 'in'],
    correctIndex: 1,
    englishExplanation: '"Abstain" takes the preposition "from" (abstain from voting / participating).',
    urduExplanation: '"Abstain" (باز رہنا / الگ رہنا) کے ساتھ ہمیشہ Preposition "from" آتی ہے۔'
  },
  {
    id: 'pool-g-prep-04',
    category: 'Prepositions & Collocations',
    difficulty: 'Medium',
    question: 'The internal audit department operates independently _______ executive management to ensure objectivity.',
    options: ['with', 'from', 'of', 'by'],
    correctIndex: 2,
    englishExplanation: '"Independent of" is the standard formal collocation denoting freedom from control or influence.',
    urduExplanation: 'انتظامیہ کے دباؤ سے آزاد رہنے کے لیے باوقار اصطلاح "independent of" استعمال کی جاتی ہے۔'
  },

  // Category 5: Inversion & Emphasis
  {
    id: 'pool-g-inv-01',
    category: 'Inversion & Emphasis',
    difficulty: 'Hard',
    question: 'Scarcely _______ the closing journal entries when the external server malfunctioned.',
    options: ['had the accounting team posted', 'the accounting team posted', 'did the accounting team post', 'has the accounting team posted'],
    correctIndex: 0,
    englishExplanation: 'Negative adverbial "Scarcely" at clause start triggers inverted past perfect: "Scarcely had + subject + past participle... when".',
    urduExplanation: 'جب جملہ "Scarcely" سے شروع ہو تو Past Perfect میں Inversion ہوتی ہے: "Scarcely had the team posted... when"۔'
  },
  {
    id: 'pool-g-inv-02',
    category: 'Inversion & Emphasis',
    difficulty: 'Hard',
    question: 'Under no circumstances _______ the trainee auditor share confidential client working papers with external parties.',
    options: ['should', 'ought', 'must be', 'should not'],
    correctIndex: 0,
    englishExplanation: 'Negative prepositional phrase "Under no circumstances" triggers subject-auxiliary inversion ("should the trainee auditor share").',
    urduExplanation: '"Under no circumstances" سے شروع ہونے والے جملے میں Inversion ہوتی ہے، اس لیے "should the trainee auditor share" درست ہے۔'
  },
  {
    id: 'pool-g-inv-03',
    category: 'Inversion & Emphasis',
    difficulty: 'Medium',
    question: 'Not only _______ the variance analysis on time, but she also identified key areas for cost reduction.',
    options: ['she completed', 'did she complete', 'she had completed', 'completed she'],
    correctIndex: 1,
    englishExplanation: 'Correlative conjunction "Not only" at the start of a sentence requires auxiliary inversion ("did she complete").',
    urduExplanation: '"Not only" کے ساتھ جملہ شروع کرتے وقت Inversion لازمی ہے: "did she complete"۔'
  },
  {
    id: 'pool-g-inv-04',
    category: 'Inversion & Emphasis',
    difficulty: 'Hard',
    question: 'Little _______ the finance director suspect that the treasury transactions contained significant foreign exchange exposure.',
    options: ['did', 'had', 'was', 'does'],
    correctIndex: 0,
    englishExplanation: '"Little did [someone] suspect" is a classic literary inversion expressing lack of realization.',
    urduExplanation: '"Little did [subject] suspect" ایک معیاری برطانوی ساخت ہے جس کا مطلب ہے کہ اسے بالکل بھی گمان نہ تھا۔'
  },

  // Category 6: Verb Tenses & Sequence
  {
    id: 'pool-g-tense-01',
    category: 'Verb Tenses & Sequence',
    difficulty: 'Easy',
    question: 'By the time the annual audit report is submitted next month, the team _______ on the project for twelve weeks.',
    options: ['will work', 'will have been working', 'have worked', 'had worked'],
    correctIndex: 1,
    englishExplanation: 'Future perfect continuous ("will have been working") expresses duration up to a specified future deadline.',
    urduExplanation: 'مستقبل کے ایک مخصوص وقت تک جاری رہنے والے عمل کے دورانیے کو بیان کرنے کے لیے Future Perfect Continuous استعمال ہوتا ہے۔'
  },
  {
    id: 'pool-g-tense-02',
    category: 'Verb Tenses & Sequence',
    difficulty: 'Medium',
    question: 'The external auditor confirmed that the entity _______ its accounting policy for leases in the preceding fiscal year.',
    options: ['changed', 'had changed', 'changes', 'has changed'],
    correctIndex: 1,
    englishExplanation: 'Past perfect ("had changed") indicates an action completed prior to the past confirmation.',
    urduExplanation: 'ماضی کے کسی واقعے سے پہلے مکمل ہو چکے کام کے لیے Past Perfect ("had changed") استعمال ہوتا ہے۔'
  },
  {
    id: 'pool-g-tense-03',
    category: 'Verb Tenses & Sequence',
    difficulty: 'Easy',
    question: 'The treasury department currently _______ alternative short-term financing options to manage working capital.',
    options: ['evaluates', 'is evaluating', 'has evaluated', 'evaluated'],
    correctIndex: 1,
    englishExplanation: 'Present continuous ("is evaluating") is required for an ongoing temporary action in progress.',
    urduExplanation: 'اس وقت جاری عارضی سرگرمی کو ظاہر کرنے کے لیے Present Continuous ("is evaluating") آتا ہے۔'
  },

  // Category 7: Modals & Professional Hedging
  {
    id: 'pool-g-modal-01',
    category: 'Modals & Professional Hedging',
    difficulty: 'Medium',
    question: 'The unexplained increase in gross margin _______ indicate aggressive revenue recognition policies.',
    options: ['can', 'could', 'must', 'should'],
    correctIndex: 1,
    englishExplanation: 'In formal auditing, "could" is used for professional hedging and cautious hypothesis rather than absolute certainty.',
    urduExplanation: 'آڈٹ میں حتمی نتیجے پر پہنچنے سے پہلے احتیاط کے طور پر Modals جیسے "could" (امکان ظاہر کرنے کے لیے) استعمال کیے جاتے ہیں۔'
  },
  {
    id: 'pool-g-modal-02',
    category: 'Modals & Professional Hedging',
    difficulty: 'Hard',
    question: 'The audit junior _______ corroborated the supplier statement with third-party confirmations before signing off.',
    options: ['must have', 'ought to have', 'may have', 'can have'],
    correctIndex: 1,
    englishExplanation: '"Ought to have + past participle" expresses an unfulfilled professional duty or obligation in the past.',
    urduExplanation: 'ماضی کے کسی فرضی یا اخلاقی فرض کی عدم ادائیگی پر پچھتاوے کے لیے "ought to have + 3rd form" استعمال ہوتا ہے۔'
  },
  {
    id: 'pool-g-modal-03',
    category: 'Modals & Professional Hedging',
    difficulty: 'Easy',
    question: 'Chartered accountants _______ maintain professional skepticism throughout the planning and performance of an audit.',
    options: ['might', 'must', 'could', 'would'],
    correctIndex: 1,
    englishExplanation: '"Must" conveys a non-negotiable professional mandate under International Standards on Auditing (ISA).',
    urduExplanation: 'آڈٹ کے بین الاقوامی معیار کے تحت پروفیشنل شکوک و شبہات (Skepticism) برقرار رکھنا لازمی ہے، اس لیے "must" درست ہے۔'
  },

  // Category 8: Relative Pronouns & Clauses
  {
    id: 'pool-g-rel-01',
    category: 'Relative Pronouns & Clauses',
    difficulty: 'Medium',
    question: 'The statutory audit framework, _______ was revised last quarter, introduces stringent sustainability reporting criteria.',
    options: ['that', 'which', 'who', 'whose'],
    correctIndex: 1,
    englishExplanation: 'Non-defining relative clauses set off by commas require "which", not "that".',
    urduExplanation: 'جب جملے میں کوما (,) لگا کر اضافی معلومات دی جائیں (Non-defining clause) تو "that" کی جگہ "which" استعمال ہوتا ہے۔'
  },
  {
    id: 'pool-g-rel-02',
    category: 'Relative Pronouns & Clauses',
    difficulty: 'Hard',
    question: 'The forensic partner to _______ the whistleblower delivered the encrypted documentation initiated an inquiry immediately.',
    options: ['who', 'whom', 'which', 'whose'],
    correctIndex: 1,
    englishExplanation: 'The objective relative pronoun "whom" is grammatically required following a preposition ("to whom").',
    urduExplanation: 'پریپوزیشن ("to") کے بعد مفعولی حالت (Objective Case) کے لیے ہمیشہ "whom" آتا ہے، "who" نہیں۔'
  },

  // Category 9: Articles & Determiners
  {
    id: 'pool-g-art-01',
    category: 'Articles & Determiners',
    difficulty: 'Easy',
    question: '_______ majority of the audit committee members voted in favor of appointing the forensic consulting firm.',
    options: ['A', 'The', 'An', 'No article'],
    correctIndex: 1,
    englishExplanation: '"The majority of..." refers to a specific known group of committee members.',
    urduExplanation: 'کمیٹی کے مخصوص ارکان کی اکثریت کا ذکر کرنے کے لیے معین آرٹیکل "The majority of" استعمال ہوتا ہے۔'
  },
  {
    id: 'pool-g-art-02',
    category: 'Articles & Determiners',
    difficulty: 'Hard',
    question: 'Management exhibited _______ regard for statutory tax withholding regulations during the transition period.',
    options: ['little', 'a little', 'few', 'a few'],
    correctIndex: 0,
    englishExplanation: '"Little" (without "a") denotes negative quantity ("almost none") with uncountable nouns like "regard".',
    urduExplanation: 'ناقابلِ شمار اسم ("regard") کے ساتھ منفی معنی (نہ ہونے کے برابر توجہ) دینے کے لیے "little" استعمال ہوتا ہے۔'
  },

  // Category 10: Vocabulary & Diction
  {
    id: 'pool-g-voc-01',
    category: 'Vocabulary & Diction',
    difficulty: 'Medium',
    question: 'The management implemented compensatory controls to _______ the risk of unauthorized system access.',
    options: ['aggravate', 'mitigate', 'procrastinate', 'exacerbate'],
    correctIndex: 1,
    englishExplanation: '"Mitigate" means to make less severe or reduce risk, which is standard risk management terminology.',
    urduExplanation: '"Mitigate" کا مطلب ہے خطرے کے اثرات کو کم کرنا (Reduce / Alleviate)۔'
  },
  {
    id: 'pool-g-voc-02',
    category: 'Vocabulary & Diction',
    difficulty: 'Hard',
    question: 'The company entered voluntary liquidation because it was no longer _______ and unable to pay debts as they fell due.',
    options: ['solvent', 'lucrative', 'contingent', 'redundant'],
    correctIndex: 0,
    englishExplanation: '"Solvent" denotes possessing assets in excess of liabilities and being capable of paying obligations.',
    urduExplanation: '"Solvent" کا مطلب ہے مالی طور پر مستحکم ہونا اور اپنے واجبات وقت پر ادا کرنے کی صلاحیت رکھنا۔'
  }
];

/**
 * Helper to normalize any grammar question into the 12 official ICAP ECS categories
 */
export function mapToIcapCategory(cat: string = '', questionText: string = ''): IcapCoreCategory {
  const c = cat.toLowerCase().trim();
  const q = questionText.toLowerCase().trim();

  // Synonyms
  if (c.includes('synonym') || q.includes('closest in meaning') || q.includes('synonym')) return 'Synonyms';
  // Antonyms
  if (c.includes('antonym') || q.includes('opposite meaning') || q.includes('antonym')) return 'Antonyms';
  // Subjunctive
  if (c.includes('subjun') || q.includes('insisted that') || q.includes('recommended that') || q.includes('imperative that') || q.includes('demand that') || q.includes('stipulate that') || q.includes('moved that')) return 'Subjunctive';
  // Inversions
  if (c.includes('invers') || q.includes('hardly had') || q.includes('seldom') || q.includes('under no circumstances') || q.includes('rarely') || q.includes('scarcely had') || q.includes('no sooner had') || q.includes('not only did') || q.includes('at no time')) return 'Inversions';
  // Relative Clauses
  if (c.includes('relative') || q.includes('to which') || q.includes('with whom') || q.includes('under which') || q.includes('whose') || q.includes('whereby') || q.includes('all of which')) return 'Relative Clauses';
  // Active / Passive
  if (c.includes('passive') || q.includes('were comprehensively audited') || q.includes('to have been') || q.includes('is widely suspected') || q.includes('must be approved') || q.includes('were brought to light') || q.includes('can be processed')) return 'Active / Passive';
  // Modal Conditionals
  if (c.includes('conditional') || c.includes('modal') || c.includes('wish') || q.includes('if the') || q.includes('had the') || q.includes('unless the') || q.includes('should any') || q.includes('were the') || q.includes('must have') || q.includes('cannot have') || q.includes('should have')) return 'Modal Conditionals';
  // Articles
  if (c.includes('article') || c.includes('determiner') || q.includes('zero article') || q.includes('professional skepticism') || q.includes('secp') || q.includes('european') || q.includes('due diligence')) return 'Articles';
  // Collocations
  if (c.includes('collocat') || c.includes('phrasal') || c.includes('idiom') || q.includes('due care') || q.includes('comply with') || q.includes('cast doubt') || q.includes('write off') || q.includes('reach a consensus') || q.includes('breach of') || q.includes('incur')) return 'Collocations';
  // Tenses
  if (c.includes('tense') || c.includes('aspect') || c.includes('past simple') || c.includes('present perfect') || c.includes('past continuous') || c.includes('time clause') || c.includes('by the time') || q.includes('by the time') || q.includes('had been scrutinizing') || q.includes('will have finalized')) return 'Tenses';
  // Verbs (Gerunds, infinitives, causatives, complementation)
  if (c.includes('verb') || c.includes('gerund') || c.includes('infinitive') || c.includes('causative') || c.includes('used to') || q.includes('look forward to') || q.includes('prohibited') || q.includes('had the junior') || q.includes('refused to') || q.includes('made the accounts')) return 'Verbs';

  // Default to Parts of Speech (prepositions, adverbs, conjunctions, agreement, quantifiers, pronouns)
  return 'Parts of Speech';
}

// Combine all grammar questions into the master pool
export const MASTER_GRAMMAR_POOL: GrammarQuestion[] = [
  ...ICAP_ECS_CURATED_GRAMMAR_POOL,
  ...SET_1_GRAMMAR_TAGGED,
  ...SET_2_GRAMMAR_TAGGED,
  ...MOCK_DATA_GRAMMAR_POOL,
  ...EXPANDED_GRAMMAR_POOL,
  ...ADDITIONAL_CURATED_GRAMMAR_POOL
];

// Deduplicate master grammar pool by question text similarity and map to 12 official ICAP categories
export const UNIQUE_GRAMMAR_POOL: GrammarQuestion[] = (() => {
  const seenTexts = new Set<string>();
  const unique: GrammarQuestion[] = [];
  for (const q of MASTER_GRAMMAR_POOL) {
    // Strictly filter out any question statement containing inline option labels like [A] / (A)
    if (/(?:\[[A-D]\]|\([A-D]\)|\[[a-d]\]|\([a-d]\))\s+[a-zA-Z0-9]/.test(q.question)) {
      continue;
    }
    const normalized = q.question.trim().toLowerCase().slice(0, 45);
    if (!seenTexts.has(normalized)) {
      seenTexts.add(normalized);
      const mappedCategory = mapToIcapCategory(q.category, q.question);
      unique.push({
        ...q,
        category: mappedCategory
      });
    }
  }
  return unique;
})();

// Additional pools for Vocabulary Tasks 1-5
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
    urduExplanation: '"Prudent" کا مطلب ہے دانشمندانہ، محتاط اور دور اندیش۔'
  },
  {
    id: 'vm-pool-05',
    targetWord: 'contingent',
    correctMatch: 'conditional on events',
    options: ['conditional on events', 'definite', 'permanent', 'irrevocable'],
    explanation: '"Contingent" describes liabilities dependent on uncertain future outcomes.',
    urduExplanation: '"Contingent" کا مطلب ہے کسی مستقبل کے واقعے سے مشروط ہونا۔'
  }
];

export const EXPANDED_VOCAB_DEFINITIONS_POOL: VocabDefinitionItem[] = [
  ...APTIS_TEST_SET_1.core.vocabDefinitions,
  ...APTIS_TEST_SET_2.core.vocabDefinitions,
  {
    id: 'vd-pool-01',
    definition: 'An allocation of the depreciable amount of an asset over its estimated useful economic life.',
    correctWord: 'Depreciation',
    options: ['Depreciation', 'Amortization', 'Impairment', 'Depletion'],
    explanation: 'Depreciation is the systematic write-off of tangible fixed assets.',
    urduExplanation: 'ٹھوس اثاثوں (Tangible Assets) کی مالیت میں وقت کے ساتھ منظم کمی کو Depreciation کہتے ہیں۔'
  },
  {
    id: 'vd-pool-02',
    definition: 'The ease with which an asset can be converted into ready cash without impacting price.',
    correctWord: 'Liquidity',
    options: ['Liquidity', 'Solvency', 'Profitability', 'Leverage'],
    explanation: 'Liquidity measures the readiness of assets to settle near-term obligations.',
    urduExplanation: 'اثاثے کو جلدی کیش میں تبدیل کرنے کی صلاحیت کو Liquidity کہتے ہیں۔'
  },
  {
    id: 'vd-pool-03',
    definition: 'A legal or ethical relationship of trust and care between an agent and principal.',
    correctWord: 'Fiduciary',
    options: ['Fiduciary', 'Beneficiary', 'Arbitrator', 'Guarantor'],
    explanation: 'A fiduciary has legal and moral duties to act solely in client interest.',
    urduExplanation: 'امانت داری اور دیانتداری کے قانونی رشتے کو Fiduciary کہتے ہیں۔'
  },
  {
    id: 'vd-pool-04',
    definition: 'Information whose omission or misstatement could influence economic decisions of users.',
    correctWord: 'Materiality',
    options: ['Materiality', 'Prudence', 'Going concern', 'Accrual'],
    explanation: 'Materiality is the threshold at which financial errors alter stakeholder judgment.',
    urduExplanation: 'ایسی اہم مالی معلومات جس کے چھپانے سے قاری کا فیصلہ بدل جائے اسے Materiality کہتے ہیں۔'
  }
];

export const EXPANDED_VOCAB_COLLOCATIONS_POOL: VocabCollocationItem[] = [
  ...APTIS_TEST_SET_1.core.vocabCollocations,
  ...APTIS_TEST_SET_2.core.vocabCollocations,
  {
    id: 'vc-pool-01',
    sentence: 'Auditors are required under the code of ethics to _______ due care and diligence.',
    options: ['exercise', 'make', 'perform', 'produce'],
    correctIndex: 0,
    explanation: '"Exercise due care" is the standard professional governance collocation.',
    urduExplanation: '"Exercise due care" کا مطلب ہے مکمل احتیاط اور ذمہ داری سے کام انجام دینا۔'
  },
  {
    id: 'vc-pool-02',
    sentence: 'The CFO called an urgent meeting to _______ the financial implications of the dispute.',
    options: ['weigh', 'heavier', 'scale', 'balance'],
    correctIndex: 0,
    explanation: '"Weigh implications" means to evaluate the consequences carefully.',
    urduExplanation: '"Weigh implications" کا مطلب ہے مالی اثرات اور نتائج کا بغور جائزہ لینا ہے۔'
  },
  {
    id: 'vc-pool-03',
    sentence: 'Failure to file annual statutory returns will _______ significant legal penalties.',
    options: ['incur', 'attract', 'obtain', 'induce'],
    correctIndex: 0,
    explanation: '"Incur penalties" means to become subject to financial fines through wrongdoing.',
    urduExplanation: '"Incur penalties" کا مطلب ہے قانونی سزاؤں یا جرمانوں کا مستوجب بننا۔'
  },
  {
    id: 'vc-pool-04',
    sentence: 'The committee was finally able to _______ a consensus regarding the revised budget.',
    options: ['reach', 'arrive', 'strike', 'make'],
    correctIndex: 0,
    explanation: '"Reach a consensus" is the customary collocation for collective agreement.',
    urduExplanation: 'اتفاقِ رائے تک پہنچنے کے لیے انگریزی میں "reach a consensus" استعمال ہوتا ہے۔'
  }
];

// Reading passages pools
export const EXPANDED_READING_SECTIONS: {
  section1: ReadingSection1[];
  section2: ReadingSection2[];
  section3: ReadingSection3[];
  section4: ReadingSection4[];
} = {
  section1: EXPANDED_READING_SECTION_1,
  section2: EXPANDED_READING_SECTION_2,
  section3: EXPANDED_READING_SECTION_3,
  section4: EXPANDED_READING_SECTION_4
};

// Writing modules pool (Authentic Aptis & ICAP scenarios)
export const EXPANDED_WRITING_MODULES: AptisWritingModule[] = ALL_WRITING_MODULES;

// Re-export full vocabulary pools
export const EXPANDED_VOCAB_SENTENCE_POOL = ALL_VOCAB_SENTENCE_POOL;
export const EXPANDED_VOCAB_CONTEXT_POOL = ALL_VOCAB_CONTEXT_POOL;
