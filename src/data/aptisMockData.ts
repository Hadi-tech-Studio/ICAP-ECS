import { AptisTestSet, MarkingScaleLevel } from '../types';

export const APTIS_MARKING_SCALES: MarkingScaleLevel[] = [
  {
    band: 'C (C1/C2)',
    numericScore: '43 - 50',
    grammarDescription: 'Shows consistent and accurate control of complex grammatical structures. Errors are rare and difficult to spot.',
    vocabularyDescription: 'Broad range of sophisticated vocabulary, idioms, and collocations used naturally and with precision in context.',
    readingDescription: 'Understands with ease virtually all forms of written English, including abstract, structurally complex, or highly colloquial texts.',
    writingDescription: 'Can produce clear, smoothly flowing, complex texts in an appropriate and effective style, logical structure, and perfect tone register.'
  },
  {
    band: 'B2',
    numericScore: '35 - 42',
    grammarDescription: 'Good grammatical control. Occasional slips or non-systematic errors and minor flaws in sentence structure may occur.',
    vocabularyDescription: 'Good range of vocabulary for general and professional topics. Can vary phrasing to avoid frequent repetition.',
    readingDescription: 'Can read with a large degree of independence, adapting style and speed of reading to different texts and purposes.',
    writingDescription: 'Can write clear, detailed texts on a variety of subjects, synthesising and evaluating information and arguments. Clear distinction between formal and informal register.'
  },
  {
    band: 'B1',
    numericScore: '26 - 34',
    grammarDescription: 'Uses reasonably accurately a repertoire of frequently used routines and patterns associated with more predictable situations.',
    vocabularyDescription: 'Sufficient vocabulary to express themselves with some circumlocutions on topics such as family, hobbies, work, travel and current events.',
    readingDescription: 'Can read straightforward factual texts on subjects related to their field of interest with a satisfactory level of comprehension.',
    writingDescription: 'Can write straightforward connected texts on a range of familiar subjects within their field of interest by linking a series of shorter discrete elements.'
  },
  {
    band: 'A2',
    numericScore: '16 - 25',
    grammarDescription: 'Uses some simple structures correctly, but still systematically makes basic mistakes (e.g. confuses tenses and forgets to agree).',
    vocabularyDescription: 'Sufficient vocabulary for the expression of basic communicative needs and simple everyday survival tasks.',
    readingDescription: 'Can understand short, simple texts on familiar matters of a concrete type which consist of high frequency everyday or job-related language.',
    writingDescription: 'Can write a series of simple phrases and sentences linked with simple connectors like "and", "but" and "because".'
  },
  {
    band: 'A1',
    numericScore: '0 - 15',
    grammarDescription: 'Shows only limited control of a few simple grammatical structures and sentence patterns in a memorised repertoire.',
    vocabularyDescription: 'Has a very basic vocabulary repertoire of isolated words and phrases related to particular concrete situations.',
    readingDescription: 'Can understand very short, simple texts, for example on notices and posters or in small catalogues.',
    writingDescription: 'Can give information about personal details in writing (e.g. nationality, address, age) using simple isolated words and phrases.'
  }
];

export const APTIS_TEST_SET_1: AptisTestSet = {
  id: 'set-1',
  title: 'Aptis Practice Test 01 - General & CA Journey Standard',
  description: 'Official ICAP ECS standard format: Core (25 Grammar + 25 Vocab), Reading (4 Sections), and Writing (4 Parts on Book Club context).',
  core: {
    grammarQuestions: [
      {
        id: 's1-g1',
        category: 'Past Simple vs Present Perfect',
        question: 'He _______ to the supermarket yesterday afternoon to purchase office supplies.',
        options: ['went', 'has gone', 'goes', 'had been going'],
        correctIndex: 0,
        englishExplanation: 'The definite past time marker "yesterday afternoon" requires the Past Simple tense ("went").',
        urduExplanation: 'جب جملے میں ماضی کا مخصوص وقت "yesterday" دیا گیا ہو تو ہمیشہ Past Simple یعنی فعل کی دوسری شکل ("went") استعمال ہوتی ہے۔'
      },
      {
        id: 's1-g2',
        category: 'Third Conditional',
        question: 'If you _______ me earlier, I would have sent the financial report before the deadline.',
        options: ['told', 'have told', 'had told', 'would tell'],
        correctIndex: 2,
        englishExplanation: 'In third conditional sentences expressing an unreal past situation, the if-clause requires the Past Perfect ("had told").',
        urduExplanation: 'یہ Third Conditional جملہ ہے (ماضی کی نا ممکن شرط)۔ "if" والے حصے میں "had + 3rd form" یعنی "had told" آتا ہے۔'
      },
      {
        id: 's1-g3',
        category: 'Prepositions with Adjectives',
        question: 'She is extremely interested _______ learning international financial reporting standards.',
        options: ['at', 'in', 'on', 'with'],
        correctIndex: 1,
        englishExplanation: 'The adjective "interested" is always paired with the preposition "in".',
        urduExplanation: 'لفظ "interested" کے ساتھ ہمیشہ Preposition "in" استعمال ہوتی ہے (interested in something)۔'
      },
      {
        id: 's1-g4',
        category: 'Passive Voice',
        question: 'The annual audit report _______ by the senior partner before it was dispatched to the client.',
        options: ['reviewed', 'was reviewed', 'has reviewed', 'is reviewing'],
        correctIndex: 1,
        englishExplanation: 'The subject "report" receives the action in the past, so the passive form "was reviewed" is required.',
        urduExplanation: 'رپورٹ خود کام نہیں کرتی بلکہ اس پر کام ہوتا ہے، اس لیے ماضی میں پیسو وائس "was reviewed" درست ہے۔'
      },
      {
        id: 's1-g5',
        category: 'Modal Verbs of Obligation',
        question: 'All employees _______ wear their security identification badges at all times inside the premises.',
        options: ['must', 'might', 'ought', 'would'],
        correctIndex: 0,
        englishExplanation: '"Must" is used to express strict obligation and official regulations.',
        urduExplanation: 'سرکاری قانون یا سخت پابندی کو ظاہر کرنے کے لیے "must" کا استعمال کیا جاتا ہے۔'
      },
      {
        id: 's1-g6',
        category: 'Time Conjunctions (For vs Since)',
        question: 'Our team has been working on this internal control system _______ three consecutive months.',
        options: ['since', 'for', 'during', 'from'],
        correctIndex: 1,
        englishExplanation: '"For" is used with a period/duration of time ("three consecutive months"), whereas "since" is used with a starting point.',
        urduExplanation: 'وقت کی مدت (duration جیسے 3 ماہ) کے ساتھ "for" آتا ہے، جبکہ مخصوص نقطہ آغاز کے ساتھ "since" آتا ہے۔'
      },
      {
        id: 's1-g7',
        category: 'Reported Speech',
        question: 'The manager asked me where I _______ during the emergency evacuation.',
        options: ['had been', 'have been', 'am', 'will be'],
        correctIndex: 0,
        englishExplanation: 'In indirect/reported questions with a past reporting verb ("asked"), the past tense backshifts to the Past Perfect ("had been").',
        urduExplanation: 'رپورٹنگ ورب "asked" (ماضی) ہونے کی وجہ سے ان ڈائریکٹ اسپیچ میں Past Perfect ("had been") بن جاتا ہے۔'
      },
      {
        id: 's1-g8',
        category: 'Subject-Verb Agreement',
        question: 'Neither the team leader nor the accountants _______ able to locate the missing voucher.',
        options: ['was', 'were', 'is', 'has'],
        correctIndex: 1,
        englishExplanation: 'When subjects are connected by "neither... nor", the verb agrees with the closer subject ("accountants" is plural, so "were").',
        urduExplanation: '"Neither... nor" میں فعل کا فیصلہ "nor" کے بعد والے لفظ کے مطابق ہوتا ہے۔ چونکہ "accountants" جمع ہے اس لیے "were" آئے گا۔'
      },
      {
        id: 's1-g9',
        category: 'Contrast Connectors',
        question: '_______ it rained heavily all morning, the team completed the physical inventory inspection.',
        options: ['Although', 'Despite', 'However', 'In spite'],
        correctIndex: 0,
        englishExplanation: '"Although" is a subordinating conjunction followed by a full subject-verb clause ("it rained heavily").',
        urduExplanation: '"Although" کے بعد مکمل جملہ (Subject + Verb) آتا ہے جیسے "Although it rained..."۔'
      },
      {
        id: 's1-g10',
        category: 'Gerund vs Infinitive',
        question: 'We look forward to _______ your delegation at the upcoming national conference.',
        options: ['meet', 'meeting', 'met', 'have met'],
        correctIndex: 1,
        englishExplanation: 'In the phrasal verb "look forward to", the "to" is a preposition and must be followed by a gerund ("meeting").',
        urduExplanation: '"Look forward to" میں "to" ایک Preposition ہے جس کے بعد ہمیشہ \'ing\' والی فارم (Gerund) یعنی "meeting" آتی ہے۔'
      },
      {
        id: 's1-g11',
        category: 'Relative Clauses',
        question: 'The consultant _______ designed the internal risk framework has received an industry award.',
        options: ['which', 'who', 'whom', 'whose'],
        correctIndex: 1,
        englishExplanation: '"Who" is the relative pronoun used as the subject referring to a person ("The consultant").',
        urduExplanation: 'کسی شخص (consultant) کے لیے بطور Subject "who" (جس نے) استعمال ہوتا ہے۔'
      },
      {
        id: 's1-g12',
        category: 'Articles & Countability',
        question: 'The firm provided _______ useful information regarding the revised corporate tax laws.',
        options: ['a', 'an', 'some', 'many'],
        correctIndex: 2,
        englishExplanation: '"Information" is an uncountable noun, so it cannot take "a/an" or "many". It correctly pairs with "some".',
        urduExplanation: 'لفظ "Information" ایک Uncountable noun ہے، اس لیے اس کے ساتھ "a" یا "many" نہیں آ سکتا بلکہ "some" آئے گا۔'
      },
      {
        id: 's1-g13',
        category: 'Comparative Structures',
        question: 'This automated ledger system is much _______ than the legacy manual spreadsheet.',
        options: ['efficient', 'more efficient', 'most efficient', 'efficiently'],
        correctIndex: 1,
        englishExplanation: 'The comparative form for multi-syllable adjectives with "than" requires "more efficient".',
        urduExplanation: 'دو چیزوں کے موازنے میں "than" کے ساتھ "more efficient" کا استعمال کیا جاتا ہے۔'
      },
      {
        id: 's1-g14',
        category: 'Question Tags',
        question: 'You haven\'t finalized the bank reconciliation yet, _______ you?',
        options: ['have', 'haven\'t', 'did', 'do'],
        correctIndex: 0,
        englishExplanation: 'A negative statement ("haven\'t finalized") takes a positive question tag ("have you?").',
        urduExplanation: 'منفی جملے کے آخر میں مثبت ٹیگ (Positive Tag) یعنی "have you?" آتا ہے۔'
      },
      {
        id: 's1-g15',
        category: 'Second Conditional',
        question: 'If I _______ more experience in forensic auditing, I would apply for that senior managerial role.',
        options: ['have', 'had', 'have had', 'will have'],
        correctIndex: 1,
        englishExplanation: 'Second conditional (hypothetical present) uses "if + Past Simple (had)" and "would + base verb".',
        urduExplanation: 'Second Conditional میں موجودہ دور کی فرضی شرط کے لیے "if + Past Simple (had)" استعمال ہوتا ہے۔'
      },
      {
        id: 's1-g16',
        category: 'Inversion after Negative Adverbs',
        question: 'Scarcely _______ the presentation when the fire alarm began ringing.',
        options: ['we had started', 'had we started', 'did we started', 'we started'],
        correctIndex: 1,
        englishExplanation: 'Negative limiting adverbs like "Scarcely" at the start of a sentence trigger inversion: "had we started".',
        urduExplanation: 'جب جملہ "Scarcely" سے شروع ہو تو Auxiliary verb فاعل سے پہلے آتا ہے: "had we started"۔'
      },
      {
        id: 's1-g17',
        category: 'Adverb Placement',
        question: 'She _______ attends the weekly audit department briefing on Monday mornings.',
        options: ['always', 'always is', 'is always', 'has always'],
        correctIndex: 0,
        englishExplanation: 'Adverbs of frequency like "always" are placed before normal main verbs ("attends").',
        urduExplanation: 'تعدد ظاہر کرنے والے ایڈوربز جیسے "always" عام طور پر مین ورب (attends) سے پہلے آتے ہیں۔'
      },
      {
        id: 's1-g18',
        category: 'Subjunctive Mood',
        question: 'The compliance director insisted that every staff member _______ the mandatory training session.',
        options: ['attends', 'attend', 'attended', 'will attend'],
        correctIndex: 1,
        englishExplanation: 'Verbs of demand/insistence followed by "that" require the subjunctive base form ("attend").',
        urduExplanation: 'حکمیہ الفاظ ("insisted that") کے بعد سبجنکٹو موڈ کے تحت ورب کی بنیادی شکل ("attend") آتی ہے۔'
      },
      {
        id: 's1-g19',
        category: 'Dependent Preposition',
        question: 'The revised balance sheet differs significantly _______ the draft published last month.',
        options: ['with', 'from', 'at', 'by'],
        correctIndex: 1,
        englishExplanation: 'The verb "differ" is paired with the preposition "from" ("differs from").',
        urduExplanation: 'لفظ "differ" کے ساتھ ہمیشہ Preposition "from" استعمال ہوتی ہے (differs from یعنی مختلف ہونا)۔'
      },
      {
        id: 's1-g20',
        category: 'Used to vs Be used to',
        question: 'Having worked night shifts for years, the auditor is used to _______ under high pressure.',
        options: ['work', 'working', 'worked', 'be worked'],
        correctIndex: 1,
        englishExplanation: '"Be used to" (accustomed to) takes a gerund (-ing form), so "working" is correct.',
        urduExplanation: '"is used to" (عادی ہونا) کے بعد ہمیشہ \'ing\' والی شکل یعنی "working" آتی ہے۔'
      },
      {
        id: 's1-g21',
        category: 'Causative Verbs',
        question: 'The chief auditor had the junior accountant _______ the supporting ledgers again.',
        options: ['check', 'to check', 'checked', 'checking'],
        correctIndex: 0,
        englishExplanation: 'The causative structure "have someone do something" uses the bare infinitive ("check").',
        urduExplanation: 'جب "had someone" بطور causative آئے تو اس کے بعد بغیر \'to\' کے پہلی فارم ("check") آتی ہے۔'
      },
      {
        id: 's1-g22',
        category: 'Wish in the Past',
        question: 'I wish I _______ more time to double-check the calculations before submitting.',
        options: ['have', 'had had', 'would have', 'have had'],
        correctIndex: 1,
        englishExplanation: 'To express regret about a past situation, "wish + Past Perfect (had had)" is used.',
        urduExplanation: 'ماضی کے کسی پچھتاوے کے لیے "wish" کے بعد Past Perfect ("had had") استعمال کیا جاتا ہے۔'
      },
      {
        id: 's1-g23',
        category: 'Pronouns & Reflexives',
        question: 'The committee members prepared the comprehensive report all by _______.',
        options: ['theirselves', 'themselves', 'them', 'theirs'],
        correctIndex: 1,
        englishExplanation: 'The standard reflexive pronoun for "they/members" is "themselves" ("theirselves" is non-standard).',
        urduExplanation: 'جمع فاعل کے لیے درست Reflexive Pronoun "themselves" ہے، "theirselves" غلط لفظ ہے۔'
      },
      {
        id: 's1-g24',
        category: 'Connectors of Purpose',
        question: 'He arrived thirty minutes early _______ miss the opening remarks of the keynote speaker.',
        options: ['so as not to', 'in order to not', 'so that to', 'for not to'],
        correctIndex: 0,
        englishExplanation: '"So as not to + base verb" is the formal English connector for negative purpose.',
        urduExplanation: 'منفی مقصد ظاہر کرنے کے لیے باضابطہ فقرہ "so as not to (miss)" استعمال ہوتا ہے۔'
      },
      {
        id: 's1-g25',
        category: 'Modals of Deduction',
        question: 'The lights are off and the doors are locked; everyone _______ gone home for the weekend.',
        options: ['must have', 'can have', 'should have', 'ought to'],
        correctIndex: 0,
        englishExplanation: '"Must have + past participle" expresses a logical certainty or strong deduction about a past event.',
        urduExplanation: 'ماضی کے کسی واقعے کے بارے میں پختہ نتیجے (strong deduction) کے لیے "must have" آتا ہے۔'
      }
    ],
    // Vocabulary Tasks (25 items)
    vocabWordMatching: [
      {
        id: 's1-v1',
        targetWord: 'study',
        correctMatch: 'learn',
        options: ['learn', 'teach', 'forget', 'ignore'],
        explanation: '"Study" and "learn" share the same core meaning of acquiring knowledge.',
        urduExplanation: '"Study" اور "Learn" دونوں کا بنیادی مطلب پڑھنا یا علم حاصل کرنا ہے۔'
      },
      {
        id: 's1-v2',
        targetWord: 'receive',
        correctMatch: 'get',
        options: ['get', 'give', 'send', 'lose'],
        explanation: '"Receive" means to get or be given something.',
        urduExplanation: '"Receive" کا مطلب ہے حاصل کرنا یا ملنا (Get)۔'
      },
      {
        id: 's1-v3',
        targetWord: 'start',
        correctMatch: 'begin',
        options: ['begin', 'finish', 'halt', 'pause'],
        explanation: '"Start" and "begin" are direct synonyms meaning to initiate an action.',
        urduExplanation: '"Start" اور "Begin" دونوں کا مطلب ہے شروع کرنا۔'
      },
      {
        id: 's1-v4',
        targetWord: 'choose',
        correctMatch: 'select',
        options: ['select', 'reject', 'abandon', 'dislike'],
        explanation: '"Choose" and "select" both mean to pick out from a set of alternatives.',
        urduExplanation: '"Choose" اور "Select" دونوں کا مطلب ہے منتخب کرنا۔'
      },
      {
        id: 's1-v5',
        targetWord: 'end',
        correctMatch: 'finish',
        options: ['finish', 'create', 'continue', 'commence'],
        explanation: '"End" and "finish" mean to reach the conclusion of something.',
        urduExplanation: '"End" اور "Finish" دونوں کا مطلب ہے اختتام کرنا۔'
      }
    ],
    vocabDefinitions: [
      {
        id: 's1-v6',
        definition: 'A place where books and reference materials are kept for reading or borrowing.',
        correctWord: 'Library',
        options: ['Library', 'Bookstore', 'Laboratory', 'Auditorium'],
        explanation: 'A library is a designated building or room containing collections of books and periodicals.',
        urduExplanation: 'وہ جگہ جہاں کتابیں پڑھنے یا ادھار لینے کے لیے رکھی جاتی ہیں اسے "Library" کہتے ہیں۔'
      },
      {
        id: 's1-v7',
        definition: 'A formal arrangement or agreement to meet someone at a specific time and location.',
        correctWord: 'Appointment',
        options: ['Appointment', 'Accident', 'Application', 'Announcement'],
        explanation: 'An appointment is a scheduled time for a meeting or consultation.',
        urduExplanation: 'کسی سے مقررہ وقت پر ملنے کے باضابطہ وقت کو "Appointment" کہتے ہیں۔'
      },
      {
        id: 's1-v8',
        definition: 'A professional person whose job is to inspect and examine financial accounts and records.',
        correctWord: 'Auditor',
        options: ['Auditor', 'Architect', 'Author', 'Actor'],
        explanation: 'An auditor is an independent professional who reviews financial statements for accuracy.',
        urduExplanation: 'کھاتوں اور مالیاتی دستاویزات کی جانچ پڑتال کرنے والے پیشہ ور کو "Auditor" کہا جاتا ہے۔'
      },
      {
        id: 's1-v9',
        definition: 'Money that is paid back to a customer when goods are returned or an order is cancelled.',
        correctWord: 'Refund',
        options: ['Refund', 'Reward', 'Receipt', 'Revenue'],
        explanation: 'A refund is repayment of money to a dissatisfied customer or for returned goods.',
        urduExplanation: 'سامان واپس کرنے پر گاہک کو واپس کی جانے والی رقم کو "Refund" کہتے ہیں۔'
      },
      {
        id: 's1-v10',
        definition: 'The ability to make good judgments and take quick, sensible decisions in business.',
        correctWord: 'Acumen',
        options: ['Acumen', 'Affection', 'Accuracy', 'Anxiety'],
        explanation: 'Business acumen refers to keen insight and shrewdness in commercial matters.',
        urduExplanation: 'کاروباری معاملات میں دانائی اور فوری درست فیصلے کرنے کی صلاحیت کو "Acumen" کہتے ہیں۔'
      }
    ],
    vocabCollocations: [
      {
        id: 's1-v11',
        sentence: 'Before launching the new marketing campaign, the team must _______ a decision on the budget.',
        options: ['make', 'do', 'take', 'create'],
        correctIndex: 0,
        explanation: 'The natural English collocation is "make a decision" (not "do a decision").',
        urduExplanation: 'انگلش میں فیصلہ کرنے کے لیے قدرتی لفظ "make a decision" ہے، "do" غلط ہے۔'
      },
      {
        id: 's1-v12',
        sentence: 'After three hours of continuous auditing, the supervisor told the team to _______ a break.',
        options: ['take', 'make', 'do', 'catch'],
        correctIndex: 0,
        explanation: 'The standard collocation for resting is "take a break".',
        urduExplanation: 'وقفہ لینے کے لیے درست فقرہ "take a break" استعمال ہوتا ہے۔'
      },
      {
        id: 's1-v13',
        sentence: 'Please _______ close attention to the instructions given on page two of the question booklet.',
        options: ['pay', 'give', 'keep', 'spend'],
        correctIndex: 0,
        explanation: 'The established idiom is "pay attention" (focus one\'s mind).',
        urduExplanation: 'توجہ دینے کے لیے معیاری لفظ "pay attention" ہے۔'
      },
      {
        id: 's1-v14',
        sentence: 'The unexpected thunderstorm caused _______ damage to the warehouse roof.',
        options: ['heavy', 'strong', 'thick', 'hard'],
        correctIndex: 0,
        explanation: 'In English, severe financial or structural destruction is described as "heavy damage" or "severe damage".',
        urduExplanation: 'شدید نقصان کے لیے انگریزی میں "heavy damage" کی ترکیب استعمال ہوتی ہے۔'
      },
      {
        id: 's1-v15',
        sentence: 'He was so exhausted after the accounting exam that he fell _______ asleep on the couch.',
        options: ['fast', 'deep', 'hard', 'heavy'],
        correctIndex: 0,
        explanation: 'The standard collocation for being completely or deeply asleep is "fast asleep".',
        urduExplanation: 'گہری نیند میں سو جانے کے لیے "fast asleep" کا محاورہ بولا جاتا ہے۔'
      }
    ],
    vocabSentenceCompletion: [
      {
        id: 's1-v16',
        sentence: 'The auditor found substantial evidence to _______ the claim made by the supplier.',
        options: ['corroborate', 'contradict', 'conceal', 'complicate'],
        correctIndex: 0,
        explanation: '"Corroborate" means to confirm or give support to a statement or finding with evidence.',
        urduExplanation: '"Corroborate" کا مطلب ہے ثبوت کے ساتھ کسی بیان یا دعوے کی تصدیق کرنا۔'
      },
      {
        id: 's1-v17',
        sentence: 'Due to strict compliance rules, attendance at the anti-money laundering seminar is _______.',
        options: ['mandatory', 'optional', 'voluntary', 'accidental'],
        correctIndex: 0,
        explanation: '"Mandatory" means required by law or rules; compulsory.',
        urduExplanation: '"Mandatory" کا مطلب ہے لازمی اور قانونی طور پر ضروری۔'
      },
      {
        id: 's1-v18',
        sentence: 'The sudden decline in consumer demand had a negative _______ on company profitability.',
        options: ['impact', 'affect', 'aspect', 'access'],
        correctIndex: 0,
        explanation: '"Impact" (noun) denotes a marked effect or influence.',
        urduExplanation: 'منفی اثر ڈالنے کے لیے ناؤن کے طور پر "negative impact" درست لفظ ہے۔'
      },
      {
        id: 's1-v19',
        sentence: 'The board praised the manager for her _______ in resolving the client dispute amicably.',
        options: ['diplomacy', 'dishonesty', 'delay', 'danger'],
        correctIndex: 0,
        explanation: '"Diplomacy" refers to skill and tact in dealing with people and delicate situations.',
        urduExplanation: 'معاملات کو خوش اسلوبی اور دانشمندی سے حل کرنے کی صلاحیت کو "Diplomacy" کہتے ہیں۔'
      },
      {
        id: 's1-v20',
        sentence: 'An auditor must maintain strict _______ and never share sensitive client data with outsiders.',
        options: ['confidentiality', 'casualness', 'carelessness', 'confidence'],
        correctIndex: 0,
        explanation: '"Confidentiality" is the state of keeping secret and non-public data safe.',
        urduExplanation: 'کلائنٹ کی خفیہ معلومات کو صیغہ راز میں رکھنے کو "Confidentiality" کہتے ہیں۔'
      }
    ],
    vocabContextMatching: [
      {
        id: 's1-v21',
        targetWord: 'objective',
        correctMatch: 'impartial',
        options: ['impartial', 'biased', 'emotional', 'subjective'],
        explanation: 'In audit and evaluation contexts, "objective" means unbiased and impartial.',
        urduExplanation: 'غیر جانبدارانہ فیصلے کو "Objective" یا "Impartial" کہا جاتا ہے۔'
      },
      {
        id: 's1-v22',
        targetWord: 'lucrative',
        correctMatch: 'profitable',
        options: ['profitable', 'worthless', 'risky', 'expensive'],
        explanation: '"Lucrative" means producing a great deal of profit.',
        urduExplanation: '"Lucrative" کا مطلب ہے انتہائی منافع بخش (Profitable)۔'
      },
      {
        id: 's1-v23',
        targetWord: 'diligent',
        correctMatch: 'hardworking',
        options: ['hardworking', 'lazy', 'careless', 'impatient'],
        explanation: '"Diligent" describes someone showing care and conscientiousness in work.',
        urduExplanation: '"Diligent" کا مطلب ہے محنتی اور توجہ سے کام کرنے والا (Hardworking)۔'
      },
      {
        id: 's1-v24',
        targetWord: 'feasible',
        correctMatch: 'practical',
        options: ['practical', 'impossible', 'hopeless', 'imaginary'],
        explanation: '"Feasible" means possible and practical to do easily or conveniently.',
        urduExplanation: '"Feasible" کا مطلب ہے قابل عمل اور حقیقت پسندانہ (Practical)۔'
      },
      {
        id: 's1-v25',
        targetWord: 'scrutinize',
        correctMatch: 'examine',
        options: ['examine', 'ignore', 'overlook', 'skim'],
        explanation: '"Scrutinize" means to inspect or examine closely and critically.',
        urduExplanation: '"Scrutinize" کا مطلب ہے باریک بینی سے جانچ پڑتال کرنا (Examine closely)۔'
      }
    ]
  },
  reading: {
    section1: {
      id: 's1-r-sec1',
      title: 'Section 1: Sentence Comprehension',
      introduction: 'Read the short message below and choose the word which best fits each gap.',
      paragraphs: [
        {
          textBefore: 'Dear Members,\n\nWe are pleased to announce that our annual club meeting will be held on Friday evening at 7:00 PM in the main hall. Please make sure to arrive on time because the president will deliver an important ',
          gapId: 'gap-1',
          options: ['speech', 'ticket', 'flight', 'receipt'],
          correctIndex: 0,
          textAfter: ' regarding the club\'s future activities.'
        },
        {
          textBefore: 'Refreshments will be served after the presentation. If you have any special dietary ',
          gapId: 'gap-2',
          options: ['requirements', 'appointments', 'complaints', 'agreements'],
          correctIndex: 0,
          textAfter: ', please inform the club secretary by Wednesday.'
        },
        {
          textBefore: 'In addition, we will be collecting the annual membership ',
          gapId: 'gap-3',
          options: ['fee', 'loan', 'fine', 'debt'],
          correctIndex: 0,
          textAfter: ' during the event. You may pay by cash or credit card.'
        },
        {
          textBefore: 'Please bring your membership card with you to facilitate quick ',
          gapId: 'gap-4',
          options: ['entry', 'departure', 'exit', 'refusal'],
          correctIndex: 0,
          textAfter: ' at the reception desk.'
        },
        {
          textBefore: 'We look forward to seeing all of you there and hope you will have a wonderful ',
          gapId: 'gap-5',
          options: ['time', 'lesson', 'journey', 'flight'],
          correctIndex: 0,
          textAfter: ' catching up with fellow members.'
        }
      ],
      explanations: {
        'gap-1': { english: 'The president delivers a "speech" at a formal meeting.', urdu: 'صدر تقریب میں تقریر (speech) پیش کرتا ہے۔' },
        'gap-2': { english: '"Dietary requirements" is the standard phrase for food preferences/allergies.', urdu: 'کھانے پینے کی ترجیحات کے لیے "dietary requirements" بولا جاتا ہے۔' },
        'gap-3': { english: 'Clubs collect an annual membership "fee".', urdu: 'کلب کی سالانہ فیس کے لیے لفظ "membership fee" آتا ہے۔' },
        'gap-4': { english: 'Showing a card allows quick "entry" (access into the venue).', urdu: 'کارڈ دکھا کر جلد داخلہ (entry) حاصل ہوتا ہے۔' },
        'gap-5': { english: '"Have a wonderful time" is the standard English idiom for enjoying oneself.', urdu: '"Have a wonderful time" یعنی اچھا وقت گزارنا۔' }
      }
    },
    section2: {
      id: 's1-r-sec2',
      title: 'Section 2: Text Cohesion (Story / Process Re-ordering)',
      topic: 'How an Audit Trainee Begins a New Project',
      sentences: [
        'First, she downloaded the previous year\'s audit working papers and familiarized herself with the client\'s business operations.',
        'Upon arriving at the audit firm on Monday morning, Fatima met her engagement senior for an initial project briefing.',
        'Finally, by late afternoon, she submitted her organized work to the senior for quality review.',
        'Next, she performed detailed analytical checks on the inventory accounts and documented all variances.',
        'During the lunch break, she discussed complex accounting entries with the client\'s chief accountant.',
        'After the meeting, she was assigned the task of verifying current year sales revenues and inventory figures.'
      ],
      // Correct chronological sequence:
      // 1 (Index 1): Upon arriving...
      // 2 (Index 5): After the meeting...
      // 3 (Index 0): First, she downloaded...
      // 4 (Index 3): Next, she performed...
      // 5 (Index 4): During the lunch break...
      // 6 (Index 2): Finally, by late afternoon...
      correctOrder: [1, 5, 0, 3, 4, 2],
      explanation: 'Chronological cohesion: Begins with morning arrival -> after meeting -> First step (download papers) -> Next step (analytical checks) -> Lunch break discussion -> Finally submitting at late afternoon.',
      urduExplanation: 'منطقی ترتیب: صبح کی آمد (Upon arriving) -> میٹنگ کے بعد کام سونپنا -> پہلا قدم (First) -> اگلا قدم (Next) -> دوپہر کا وقفہ (Lunch) -> اور اختتام (Finally)۔'
    },
    section3: {
      id: 's1-r-sec3',
      title: 'Section 3: Short Text Reading / Opinion Matching',
      topic: 'Four People Discussing Their Opinions on Remote Working in Accountancy',
      people: [
        {
          id: 'A',
          name: 'Person A (Hamza)',
          description: 'I love working from home because it saves me two hours of stressful traffic every single day. I can concentrate better in my quiet home office without the constant chatter and interruptions of an open-plan audit room. However, I sometimes miss the casual coffee break chats with teammates.'
        },
        {
          id: 'B',
          name: 'Person B (Sara)',
          description: 'While flexibility is great, junior trainees struggle without immediate face-to-face coaching from seniors. When complex accounting issues arise, it takes much longer to explain them over video calls than simply pointing at a ledger sheet together at the same desk.'
        },
        {
          id: 'C',
          name: 'Person C (Tariq)',
          description: 'For me, cybersecurity and data privacy are the biggest concerns. Auditing clients requires handling confidential payroll and banking records. Working on home Wi-Fi networks poses genuine risks that every accounting firm must manage very strictly.'
        },
        {
          id: 'D',
          name: 'Person D (Zainab)',
          description: 'A hybrid model is the ideal compromise. Spending two days at the client\'s physical office for stock counts and meetings, combined with three days of analytical desk work from home, gives both high productivity and good team bonding.'
        }
      ],
      questions: [
        {
          id: 'sec3-q1',
          statement: 'Who highlights the dangers of handling sensitive client data on unsecured home connections?',
          correctPersonId: 'C',
          explanation: 'Person C (Tariq) explicitly discusses cybersecurity, data privacy, and confidential client records.',
          urduExplanation: 'طارق (Person C) نے ہوم انٹرنیٹ پر حساس ڈیٹا اور سائبر سیکیورٹی کے خطرات کا ذکر کیا ہے۔'
        },
        {
          id: 'sec3-q2',
          statement: 'Who believes that remote work makes training and mentoring new junior staff more difficult?',
          correctPersonId: 'B',
          explanation: 'Person B (Sara) notes that junior trainees struggle without face-to-face coaching from senior colleagues.',
          urduExplanation: 'سارہ (Person B) نے جونیئر عملے کی تربیت میں مشکلات کا حوالہ دیا ہے۔'
        },
        {
          id: 'sec3-q3',
          statement: 'Who appreciates saving daily commuting time and finding quiet focus at home?',
          correctPersonId: 'A',
          explanation: 'Person A (Hamza) mentions saving two hours of stressful traffic and focusing better in a quiet room.',
          urduExplanation: 'حمزہ (Person A) نے ٹریفک کے وقت کی بچت اور پرسکون ماحول کا فائدہ بتایا۔'
        },
        {
          id: 'sec3-q4',
          statement: 'Who recommends combining office days with remote working days as the best solution?',
          correctPersonId: 'D',
          explanation: 'Person D (Zainab) advocates a hybrid model (two days in office, three days at home).',
          urduExplanation: 'زینب (Person D) نے ہائبرڈ ماڈل (دفتر اور گھر دونوں کا امتزاج) تجویز کیا۔'
        },
        {
          id: 'sec3-q5',
          statement: 'Who mentions missing informal social interactions with colleagues despite enjoying quiet focus?',
          correctPersonId: 'A',
          explanation: 'Person A (Hamza) concludes: "However, I sometimes miss the casual coffee break chats with teammates."',
          urduExplanation: 'حمزہ (Person A) نے ساتھیوں کے ساتھ چائے کے وقفوں میں گپ شپ کو یاد کرنے کی بات کی۔'
        },
        {
          id: 'sec3-q6',
          statement: 'Who argues that physical presence is crucial during stock inspections and meetings?',
          correctPersonId: 'D',
          explanation: 'Person D (Zainab) mentions visiting client premises for stock counts and meetings.',
          urduExplanation: 'زینب (Person D) نے فزیکل اسٹاک کاؤنٹ کے لیے دفتر جانے کی ضرورت پر زور دیا۔'
        },
        {
          id: 'sec3-q7',
          statement: 'Who finds screen-sharing and video calls less efficient for complex explanations than working side-by-side?',
          correctPersonId: 'B',
          explanation: 'Person B (Sara) states: "it takes much longer to explain them over video calls than simply pointing at a ledger sheet together."',
          urduExplanation: 'سارہ (Person B) نے ویڈیو کالز پر پیچیدہ کھاتوں کی تفہیم کو آمنے سامنے کے مقابلے سست قرار دیا۔'
        }
      ]
    },
    section4: {
      id: 's1-r-sec4',
      title: 'Section 4: Long Text Comprehension & Paragraph Headings',
      topic: 'The Evolution of Professional Accountancy in the Digital Age',
      introduction: 'Read the passage below. Match each numbered paragraph (1-5) to the most suitable heading from the list.',
      headings: [
        'A. The Shift from Manual Bookkeeping to Strategic Advisory',
        'B. Emerging Cybersecurity Threats in Cloud Accounting',
        'C. The Essential Role of Continuous Lifelong Learning',
        'D. Artificial Intelligence and Automated Data Processing',
        'E. The Unchanging Importance of Professional Ethics'
      ],
      paragraphs: [
        {
          id: 'p-1',
          paragraphNumber: 1,
          text: 'Historically, the primary responsibility of an accountant was the meticulous recording of transactions in physical journals and balancing endless columns of figures. Today, modern enterprise software performs routine bookkeeping tasks in milliseconds. As a consequence, accountants are no longer mere scorekeepers; they have transitioned into strategic financial advisors who interpret complex data to guide high-level executive decisions.',
          correctHeadingIndex: 0, // A
          explanation: 'Paragraph 1 focuses on the transition from manual ledger recording to strategic financial guidance (Heading A).',
          urduExplanation: 'پیراگراف 1 کا موضوع روایتی کھاتہ نویسی سے نکل کر اسٹریٹجک مشیر بننے کا سفر ہے (Heading A)۔'
        },
        {
          id: 'p-2',
          paragraphNumber: 2,
          text: 'The integration of artificial intelligence and machine learning is reshaping the audit profession. Machine algorithms can now analyze millions of transactions in seconds, flagging unusual journal entries and anomalous payment patterns with remarkable accuracy. This automation frees audit professionals from repetitive manual sampling, allowing them to focus on high-risk areas.',
          correctHeadingIndex: 3, // D
          explanation: 'Paragraph 2 describes how machine learning and AI process massive transaction data and detect anomalies (Heading D).',
          urduExplanation: 'پیراگراف 2 میں مصنوعی ذہانت (AI) اور خودکار ڈیٹا پروسیسنگ کا تفصیلی ذکر ہے (Heading D)۔'
        },
        {
          id: 'p-3',
          paragraphNumber: 3,
          text: 'However, storing vast amounts of financial and client information in cloud databases creates unprecedented vulnerabilities. Cybercriminals increasingly target accounting firms to intercept bank accounts, payroll registers, and intellectual property. Firms must implement robust multi-factor authentication, end-to-end encryption, and rigorous vulnerability assessments to safeguard client trust.',
          correctHeadingIndex: 1, // B
          explanation: 'Paragraph 3 discusses vulnerabilities, cloud threats, cyberattacks, and encryption measures (Heading B).',
          urduExplanation: 'پیراگراف 3 کلاؤڈ ڈیٹا اور سائبر سیکیورٹی کے نئے خطرات پر روشنی ڈالتا ہے (Heading B)۔'
        },
        {
          id: 'p-4',
          paragraphNumber: 4,
          text: 'Given the rapid pace of technological disruption, technical expertise gained during initial qualification quickly becomes obsolete. Contemporary accountants must embrace continuous professional development. Mastering data analytics tools, programming fundamentals, and evolving international tax legislation is now an ongoing career necessity rather than an optional bonus.',
          correctHeadingIndex: 2, // C
          explanation: 'Paragraph 4 emphasizes that qualifications become outdated and accountants must continually learn new analytical skills (Heading C).',
          urduExplanation: 'پیراگراف 4 مسلسل سیکھنے (Continuous Lifelong Learning) کی اہمیت واضح کرتا ہے (Heading C)۔'
        },
        {
          id: 'p-5',
          paragraphNumber: 5,
          text: 'Despite the arrival of algorithms and digital tools, the human core of the profession remains constant. Objectivity, integrity, and professional skepticism cannot be automated. When financial statements are scrutinized, society relies on the independent judgment and moral compass of the certified accountant to uphold truth and fair representation.',
          correctHeadingIndex: 4, // E
          explanation: 'Paragraph 5 underscores that moral compass, integrity, objectivity, and professional ethics remain irreplaceable (Heading E).',
          urduExplanation: 'پیراگراف 5 بتاتا ہے کہ اخلاقیات، دیانتداری اور دیانتدارانہ فیصلہ سازی ہمیشہ ناقابل تبدیل رہے گی (Heading E)۔'
        }
      ]
    }
  },
  writing: {
    themeName: 'City Book & Professional Reading Club',
    part1: {
      id: 'w-p1',
      context: 'You are filling in an application form to join the City Book & Professional Reading Club. Answer 5 quick questions in 1–5 words each.',
      questions: [
        {
          id: 'q1',
          prompt: 'What is your current occupation or course of study?',
          maxWords: 5,
          sampleAnswer: 'Trainee Chartered Accountant'
        },
        {
          id: 'q2',
          prompt: 'What genre of books do you enjoy reading most?',
          maxWords: 5,
          sampleAnswer: 'Business biographies and economics'
        },
        {
          id: 'q3',
          prompt: 'How often do you read books each week?',
          maxWords: 5,
          sampleAnswer: 'Two to three times weekly'
        },
        {
          id: 'q4',
          prompt: 'What is your preferred format (e.g. print, e-book, audiobook)?',
          maxWords: 5,
          sampleAnswer: 'Hardcover print and e-books'
        },
        {
          id: 'q5',
          prompt: 'How did you hear about our reading club?',
          maxWords: 5,
          sampleAnswer: 'Through a university colleague'
        }
      ]
    },
    part2: {
      id: 'w-p2',
      formName: 'Club Membership Profile',
      prompt: 'Please tell us about your personal reading interests and why you decided to join our club. (Write 20–30 words)',
      minWords: 20,
      maxWords: 30,
      sampleAnswer: 'I have a strong passion for financial economics and leadership literature. I joined this club to connect with fellow professionals and exchange inspiring insights on modern corporate strategies.'
    },
    part3: {
      id: 'w-p3',
      clubName: 'City Book Club Forum',
      context: 'You are participating in the online member chat room. Three other members have posted questions. Respond to all three members in 30–40 words each.',
      memberChats: [
        {
          id: 'chat-1',
          memberName: 'Sarah (Member since 2023)',
          avatarInitials: 'SK',
          message: 'Welcome to our club! I usually struggle to finish long non-fiction books because of work. How do you manage your reading schedule alongside busy professional commitments?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'I set aside twenty minutes before bedtime every night and listen to audiobooks during my morning commute. Breaking lengthy chapters into short daily segments makes steady progress manageable without stress.'
        },
        {
          id: 'chat-2',
          memberName: 'David (Discussion Coordinator)',
          avatarInitials: 'DM',
          message: 'We are organizing our monthly book selection poll next week. What is one business or personal development book that you think every young professional should read, and why?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'I highly recommend "Thinking, Fast and Slow" by Daniel Kahneman. It provides brilliant psychological insights into cognitive biases, which helps accountants and managers make rational and objective financial decisions.'
        },
        {
          id: 'chat-3',
          memberName: 'Amina (Event Host)',
          avatarInitials: 'AH',
          message: 'We are planning our first in-person weekend meetup at the central library cafe. Would you prefer a weekend morning breakfast discussion or a weekday evening session?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'I would definitely prefer a Saturday morning breakfast meetup. Weekend mornings are much more relaxed for thoughtful discussions, as weekday evenings are often occupied with overtime audit duties and deadlines.'
        }
      ]
    },
    part4: {
      id: 'w-p4-audit-leave-01',
      clubName: 'Chartered Accountants Trainee Council & Professional Development Forum',
      scenarioTopic: 'Audit Trainee Busy-Season Hours & Pre-Exam Study Leave Curtailment',
      communicationPurpose: 'Filing a formal representation to negotiate policy compromise and preserve exam revision time',
      recipientTitle: 'Chairman of Trainee Development & Welfare Committee',
      recipientName: 'Mr. Tariq Mahmud, FCA',
      friendName: 'Ahmed',
      contextNotice: 'You have just received this official internal directive from the Firm Training Committee:\n\n"MEMORANDUM: Ref TC/2026/04\nTo: All Trainee Chartered Accountants\nDue to tight statutory audit deadlines for listed financial institutions, all approved pre-examination study leaves for the upcoming ICAP CAF assessments are hereby curtailed from fifteen working days to three days. In addition, trainees are required to work mandatory 10-hour shifts across upcoming weekends without compensatory leave."',
      taskA: {
        prompt: 'Write an email to your fellow trainee friend (Ahmed). Share your reaction to the sudden reduction in study leaves and weekend shift requirements, explain how it impacts your exam preparation, and suggest how you two can coordinate a shared study timetable. (Write 40–60 words)',
        minWords: 40,
        maxWords: 60,
        sampleAnswer: 'Hi Ahmed,\n\nDid you see the latest circular from the Training Committee? Slashing our pre-exam study leaves from fifteen days to just three—and forcing weekend shifts—is devastating! My CAF revision schedule is completely wrecked. Let’s meet for coffee this evening to combine our audit summaries and divide revision topics so we can survive this busy season.\n\nBest,\nYour Friend'
      },
      taskB: {
        prompt: 'Write a formal email to the Chairman of the Trainee Development & Welfare Committee (Mr. Tariq Mahmud, FCA). Express your serious concern regarding the drastic reduction of pre-examination study leaves, explain how this policy will adversely affect trainees\' examination performance and professional wellbeing, and propose a constructive compromise such as staggered remote shifts or compensatory study hours. (Write 120–150 words)',
        minWords: 120,
        maxWords: 150,
        sampleAnswer: 'Dear Mr. Mahmud,\n\nI am writing on behalf of the trainee cohort to formally communicate our grave concern regarding Memorandum TC/2026/04, which curtails approved pre-examination study leaves to three days and mandates weekend shifts.\n\nWhile we fully appreciate the statutory pressures of the listed audit deadlines, this abrupt directive severely jeopardizes our preparation for the upcoming ICAP examinations. Trainees have methodically scheduled their revision syllabi around the standard fifteen-day leave entitlement. Eliminating this dedicated study period will inevitably result in diminished academic performance and elevated burnout.\n\nMay we respectfully suggest a balanced compromise? The firm could implement a staggered scheduling model where trainees support client field engagements during critical audit phases in exchange for flexible morning study hours. Alternatively, allocating compensatory revision days immediately following audit sign-off would preserve both client deliverables and trainee development.\n\nThank you for your understanding and guidance.\n\nYours sincerely,\nChartered Accountancy Trainee'
      }
    }
  }
};

export const APTIS_TEST_SET_2: AptisTestSet = {
  id: 'set-2',
  title: 'Aptis Practice Test 02 - Professional Communication & Travel Society',
  description: 'Second authentic test set: Core Grammar & Vocab (50 items), Reading (4 Sections), and Writing (4 Parts on Travel & Expedition Society context).',
  core: {
    grammarQuestions: [
      {
        id: 's2-g1',
        category: 'Past Continuous vs Past Simple',
        question: 'While the compliance officer _______ the transactions, the power suddenly went out.',
        options: ['audited', 'was auditing', 'has audited', 'is auditing'],
        correctIndex: 1,
        englishExplanation: 'An ongoing past background action interrupted by a shorter event uses the Past Continuous ("was auditing").',
        urduExplanation: 'جب ماضی میں کوئی طویل کام جاری ہو اور اس کے دوران کوئی دوسرا واقعہ پیش آئے تو "was/were + ing" یعنی "was auditing" آتا ہے۔'
      },
      {
        id: 's2-g2',
        category: 'First Conditional',
        question: 'Unless the management _______ the supporting documents by noon, the report will be delayed.',
        options: ['provides', 'will provide', 'provided', 'would provide'],
        correctIndex: 0,
        englishExplanation: '"Unless" takes the present simple tense in the condition clause for future outcomes.',
        urduExplanation: '"Unless" والے حصے میں مستقبل کے لیے Present Simple ("provides") آتا ہے، "will" نہیں لگایا جاتا۔'
      },
      {
        id: 's2-g3',
        category: 'Preposition of Cause',
        question: 'The flight was cancelled due _______ severe adverse weather conditions over the mountains.',
        options: ['to', 'for', 'with', 'from'],
        correctIndex: 0,
        englishExplanation: 'The standard compound preposition of cause is "due to".',
        urduExplanation: 'کسی وجہ کو ظاہر کرنے کے لیے انگریزی میں "due to" کا فقرہ استعمال ہوتا ہے۔'
      },
      {
        id: 's2-g4',
        category: 'Modal Verbs of Advice',
        question: 'You _______ verify all cross-references before handing over the file to the senior partner.',
        options: ['ought to', 'must to', 'should to', 'may to'],
        correctIndex: 0,
        englishExplanation: '"Ought" is correctly followed by "to + base verb" (ought to verify).',
        urduExplanation: 'مشورے کے لیے "ought to verify" درست ہے، "should to" یا "must to" غلط انگلش ہے۔'
      },
      {
        id: 's2-g5',
        category: 'Both vs Neither',
        question: '_______ of the two draft contracts met the rigorous regulatory standards required by law.',
        options: ['Neither', 'None', 'Any', 'Every'],
        correctIndex: 0,
        englishExplanation: 'When referring to exactly two items in the negative, "Neither" is used ("Neither of the two...").',
        urduExplanation: 'جب دو چیزوں میں سے کسی ایک کا بھی انتخاب نہ ہو تو "Neither of the two" بولا جاتا ہے۔'
      },
      {
        id: 's2-g6',
        category: 'Present Perfect with Just',
        question: 'The finance director has just _______ the revised budget for the upcoming fiscal quarter.',
        options: ['approved', 'approving', 'approve', 'was approved'],
        correctIndex: 0,
        englishExplanation: 'Present perfect ("has just") requires the past participle form ("approved").',
        urduExplanation: '"has just" کے بعد ورب کی تیسری شکل (Past Participle) یعنی "approved" آتی ہے۔'
      },
      {
        id: 's2-g7',
        category: 'Relative Pronoun with Preposition',
        question: 'The firm with _______ we signed the joint venture agreement is based in Singapore.',
        options: ['whom', 'which', 'who', 'whose'],
        correctIndex: 1,
        englishExplanation: 'A company/firm is an organization/thing, so the preposition pairs with "which" ("with which we signed").',
        urduExplanation: 'کسی ادارے یا کمپنی کے لیے Preposition کے بعد "which" یعنی "with which" کا استعمال ہوتا ہے۔'
      },
      {
        id: 's2-g8',
        category: 'Adverbials of Concession',
        question: 'In spite of _______ exhausted, the audit team finalized the inventory count on time.',
        options: ['being', 'be', 'been', 'they were'],
        correctIndex: 0,
        englishExplanation: '"In spite of" is a prepositional phrase that must be followed by a gerund ("being") or a noun phrase.',
        urduExplanation: '"In spite of" کے بعد ہمیشہ Gerund یعنی "being" آتا ہے۔'
      },
      {
        id: 's2-g9',
        category: 'Indirect Questions',
        question: 'Could you please let me know when the meeting _______ tomorrow morning?',
        options: ['starts', 'will it start', 'does it start', 'start'],
        correctIndex: 0,
        englishExplanation: 'In indirect questions, word order follows statement order (subject + verb: "when the meeting starts").',
        urduExplanation: 'ان ڈائریکٹ سوالیہ جملوں میں عام جملے کی ترتیب (Subject + Verb: "the meeting starts") رہتی ہے۔'
      },
      {
        id: 's2-g10',
        category: 'Verb + Gerund',
        question: 'He strictly denied _______ any confidential corporate data to external third parties.',
        options: ['disclosing', 'to disclose', 'disclose', 'having been disclosed'],
        correctIndex: 0,
        englishExplanation: 'The verb "deny" takes a gerund (-ing form), so "disclosing" is correct.',
        urduExplanation: 'لفظ "deny" کے بعد ہمیشہ Gerund یعنی \'ing\' والی شکل ("disclosing") آتی ہے۔'
      },
      {
        id: 's2-g11',
        category: 'Quantifiers',
        question: 'There is _______ hope of recovering the lost investment following the firm\'s liquidation.',
        options: ['little', 'few', 'a few', 'many'],
        correctIndex: 0,
        englishExplanation: '"Hope" is uncountable and negative in sense here, so "little" (meaning almost none) is correct.',
        urduExplanation: '"Hope" نا قابل شمار ہے، اور نہ ہونے کے برابر امید کے لیے "little" آتا ہے۔'
      },
      {
        id: 's2-g12',
        category: 'As well as + Subject Agreement',
        question: 'The chairman, as well as his fellow directors, _______ attending the annual general meeting.',
        options: ['is', 'are', 'were', 'have been'],
        correctIndex: 0,
        englishExplanation: 'Parenthetical phrases like "as well as his fellow directors" do not change the singular subject "The chairman", so "is" is correct.',
        urduExplanation: '"as well as" کے آنے سے اصل فاعل (The chairman) کی واحد حیثیت نہیں بدلتی، اس لیے "is" ہی آئے گا۔'
      },
      {
        id: 's2-g13',
        category: 'Negative Inversion',
        question: 'Not only _______ the quarterly targets, but they also reduced operational expenditure by 10%.',
        options: ['did they exceed', 'they exceeded', 'they did exceed', 'exceeded they'],
        correctIndex: 0,
        englishExplanation: 'Sentences beginning with "Not only" require auxiliary inversion ("did they exceed").',
        urduExplanation: '"Not only" سے جملہ شروع ہونے پر امدادی فعل پہلے آتا ہے: "did they exceed"۔'
      },
      {
        id: 's2-g14',
        category: 'Passive Infinitive',
        question: 'These confidential tax files must _______ in the fireproof safe before you leave the office.',
        options: ['be locked', 'lock', 'locking', 'have locked'],
        correctIndex: 0,
        englishExplanation: 'Modal passive requires "must + be + past participle" (be locked).',
        urduExplanation: 'پیسو وائس میں "must be locked" (مقفل کیا جانا چاہیے) درست ہے۔'
      },
      {
        id: 's2-g15',
        category: 'Had better + Base Verb',
        question: 'You had better _______ the client before finalizing the draft invoice.',
        options: ['consult', 'to consult', 'consulting', 'consulted'],
        correctIndex: 0,
        englishExplanation: '"Had better" takes the bare infinitive without "to" (consult).',
        urduExplanation: '"Had better" کے بعد بغیر \'to\' کے پہلی فارم ("consult") آتی ہے۔'
      },
      {
        id: 's2-g16',
        category: 'Time Clauses with Future Meaning',
        question: 'As soon as the accountant _______ the reconciliation, we will print the trial balance.',
        options: ['completes', 'will complete', 'completed', 'is completing'],
        correctIndex: 0,
        englishExplanation: 'In time clauses starting with "as soon as", the present simple is used to refer to future events.',
        urduExplanation: '"As soon as" والے حصے میں مستقبل کے لیے Present Simple ("completes") استعمال ہوتا ہے۔'
      },
      {
        id: 's2-g17',
        category: 'Reflexive Pronouns',
        question: 'The trainee taught _______ advanced financial modeling using free online tutorials.',
        options: ['himself', 'him', 'his', 'he'],
        correctIndex: 0,
        englishExplanation: 'When the subject and object are the same person, the reflexive pronoun "himself" is used.',
        urduExplanation: 'جب کام کرنے والا اور جس پر اثر پڑے وہ ایک ہی شخص ہو تو "himself" آتا ہے۔'
      },
      {
        id: 's2-g18',
        category: 'Prepositions after Verbs',
        question: 'The audit partner complimented the junior staff _______ their meticulous working paper layout.',
        options: ['on', 'for', 'with', 'about'],
        correctIndex: 0,
        englishExplanation: 'The verb "compliment" takes the dependent preposition "on" (complimented someone on something).',
        urduExplanation: 'کسی کی تعریف کرنے کے لیے "complimented on" بولا جاتا ہے۔'
      },
      {
        id: 's2-g19',
        category: 'Either... or Agreement',
        question: 'Either the chief financial officer or the internal controllers _______ responsible for the error.',
        options: ['are', 'is', 'was', 'has been'],
        correctIndex: 0,
        englishExplanation: 'With "either... or", the verb agrees with the closer subject ("internal controllers" is plural, so "are").',
        urduExplanation: '"Either... or" میں "or" کے بعد والے لفظ (controllers) کے مطابق فعل "are" آئے گا۔'
      },
      {
        id: 's2-g20',
        category: 'Compound Conjunctions',
        question: 'He kept the backup hard drive in a waterproof pouch _______ it would be damaged by rain.',
        options: ['lest', 'unless', 'so that', 'provided'],
        correctIndex: 0,
        englishExplanation: '"Lest" means "for fear that / in order to prevent that" and is followed by a subjunctive or modal.',
        urduExplanation: '"Lest" کا مطلب ہے "ایسا نہ ہو کہ" (lest it should be damaged)۔'
      },
      {
        id: 's2-g21',
        category: 'Subjunctive in Demands',
        question: 'The SECP regulations demand that every listed entity _______ an independent audit committee.',
        options: ['maintain', 'maintains', 'maintained', 'will maintain'],
        correctIndex: 0,
        englishExplanation: 'Verbs of demand require the subjunctive base form ("maintain").',
        urduExplanation: '"demand that" کے بعد سبجنکٹو کے اصول کے تحت پہلی فارم ("maintain") آتی ہے۔'
      },
      {
        id: 's2-g22',
        category: 'Comparison with As... As',
        question: 'This year\'s corporate tax return is not nearly as complicated _______ last year\'s return.',
        options: ['as', 'than', 'like', 'from'],
        correctIndex: 0,
        englishExplanation: 'Equal comparison structure is "as + adjective + as".',
        urduExplanation: 'برابری کے موازنے کے لیے "as... as" کا جوڑا بنتا ہے۔'
      },
      {
        id: 's2-g23',
        category: 'Wish with Would',
        question: 'I wish our clients _______ submitting their bank statements at the very last minute.',
        options: ['would stop', 'stop', 'will stop', 'stopped to'],
        correctIndex: 0,
        englishExplanation: '"Wish + would + verb" is used to express annoyance and a desire for someone else to change their habit.',
        urduExplanation: 'کسی دوسرے کے رویے پر بیزاری ظاہر کرنے کے لیے "wish + would + verb" استعمال ہوتا ہے۔'
      },
      {
        id: 's2-g24',
        category: 'Preposition of Exception',
        question: 'All committee members voted in favor of the proposal _______ Mr. Usman, who abstained.',
        options: ['except', 'besides', 'accept', 'apart'],
        correctIndex: 0,
        englishExplanation: '"Except" means not including; other than.',
        urduExplanation: '"Except" کا مطلب ہے "سوائے اس کے" یا "کے علاوہ"۔'
      },
      {
        id: 's2-g25',
        category: 'Perfect Participle Clause',
        question: '_______ the risk assessment, the senior auditor proceeded to test journal entries.',
        options: ['Having completed', 'Completing', 'Completed', 'Have completed'],
        correctIndex: 0,
        englishExplanation: 'The perfect participle "Having completed" indicates that one action was finished before the next began.',
        urduExplanation: 'پہلا کام مکمل ہونے کے بعد دوسرا شروع کرنے کے لیے "Having completed" کا استعمال ہوتا ہے۔'
      }
    ],
    vocabWordMatching: [
      {
        id: 's2-v1',
        targetWord: 'purchase',
        correctMatch: 'buy',
        options: ['buy', 'sell', 'borrow', 'lend'],
        explanation: '"Purchase" and "buy" both mean to acquire goods in exchange for money.',
        urduExplanation: '"Purchase" اور "Buy" دونوں کا مطلب ہے خریدنا۔'
      },
      {
        id: 's2-v2',
        targetWord: 'assist',
        correctMatch: 'help',
        options: ['help', 'harm', 'stop', 'delay'],
        explanation: '"Assist" and "help" mean to give support to someone.',
        urduExplanation: '"Assist" اور "Help" کا مطلب ہے مدد کرنا۔'
      },
      {
        id: 's2-v3',
        targetWord: 'vacant',
        correctMatch: 'empty',
        options: ['empty', 'crowded', 'full', 'occupied'],
        explanation: '"Vacant" means not filled or occupied; empty.',
        urduExplanation: '"Vacant" اور "Empty" کا مطلب ہے خالی۔'
      },
      {
        id: 's2-v4',
        targetWord: 'commence',
        correctMatch: 'start',
        options: ['start', 'conclude', 'terminate', 'cease'],
        explanation: '"Commence" is the formal synonym for "start".',
        urduExplanation: '"Commence" کا مطلب ہے باضابطہ آغاز کرنا (Start)۔'
      },
      {
        id: 's2-v5',
        targetWord: 'sufficient',
        correctMatch: 'enough',
        options: ['enough', 'lacking', 'scarce', 'inadequate'],
        explanation: '"Sufficient" means adequate or enough for the purpose.',
        urduExplanation: '"Sufficient" اور "Enough" کا مطلب ہے کافی یا وافر۔'
      }
    ],
    vocabDefinitions: [
      {
        id: 's2-v6',
        definition: 'A written statement detailing the financial transactions in a bank account over a specific period.',
        correctWord: 'Statement',
        options: ['Statement', 'Signature', 'Schedule', 'Settlement'],
        explanation: 'A bank statement details cash flows and balance records.',
        urduExplanation: 'بینک کے کھاتوں کی تفصیل بتانے والے پرچے کو "Bank Statement" کہتے ہیں۔'
      },
      {
        id: 's2-v7',
        definition: 'A document that legally binds two or more parties to an agreed set of promises or terms.',
        correctWord: 'Contract',
        options: ['Contract', 'Catalogue', 'Certificate', 'Receipt'],
        explanation: 'A contract is a formal, legally enforceable agreement.',
        urduExplanation: 'فریقین کے درمیان قانونی معاہدے کو "Contract" کہا جاتا ہے۔'
      },
      {
        id: 's2-v8',
        definition: 'The total value of goods sold and services provided by a company during a financial period.',
        correctWord: 'Revenue',
        options: ['Revenue', 'Liability', 'Deficit', 'Expense'],
        explanation: 'Revenue is the gross income generated by a business from its core operations.',
        urduExplanation: 'کاروبار کی کل حاصل شدہ آمدنی کو "Revenue" کہتے ہیں۔'
      },
      {
        id: 's2-v9',
        definition: 'A planned route or journey with a detailed schedule of events and destinations.',
        correctWord: 'Itinerary',
        options: ['Itinerary', 'Invoice', 'Inventory', 'Insurance'],
        explanation: 'An itinerary is a detailed travel plan and timetable.',
        urduExplanation: 'سفر اور دوروں کے طے شدہ شیڈول کو "Itinerary" کہتے ہیں۔'
      },
      {
        id: 's2-v10',
        definition: 'An official inspection of an organization\'s accounts by an independent professional body.',
        correctWord: 'Audit',
        options: ['Audit', 'Auction', 'Analysis', 'Assembly'],
        explanation: 'An audit is a formal examination of financial records and statements.',
        urduExplanation: 'کھاتوں کی باضابطہ آزادانہ جانچ پڑتال کو "Audit" کہا جاتا ہے۔'
      }
    ],
    vocabCollocations: [
      {
        id: 's2-v11',
        sentence: 'The research team made a breakthrough discovery that will _______ a difference to clean energy.',
        options: ['make', 'do', 'take', 'have'],
        correctIndex: 0,
        explanation: 'The established collocation is "make a difference".',
        urduExplanation: 'فرق لانے یا بہتری پیدا کرنے کے لیے "make a difference" بولا جاتا ہے۔'
      },
      {
        id: 's2-v12',
        sentence: 'Before going on an international trek, you should _______ travel insurance.',
        options: ['take out', 'make out', 'do out', 'bring out'],
        correctIndex: 0,
        explanation: 'In English, the idiom for purchasing an insurance policy is "take out insurance".',
        urduExplanation: 'انشورنس پالیسی خریدنے کے لیے "take out insurance" کا فقرہ آتا ہے۔'
      },
      {
        id: 's2-v13',
        sentence: 'The junior accountant was asked to _______ an eye on the cash register during the lunch hour.',
        options: ['keep', 'put', 'hold', 'give'],
        correctIndex: 0,
        explanation: 'The idiom "keep an eye on" means to watch and protect carefully.',
        urduExplanation: 'کسی چیز پر نظر رکھنے اور حفاظت کے لیے "keep an eye on" کا محاورہ ہے۔'
      },
      {
        id: 's2-v14',
        sentence: 'We need to _______ our best to finish the reconciliation before the weekend.',
        options: ['do', 'make', 'give', 'take'],
        correctIndex: 0,
        explanation: 'The standard expression is "do our best" (strive with maximum effort).',
        urduExplanation: 'پوری کوشش کرنے کے لیے "do our best" بولا جاتا ہے۔'
      },
      {
        id: 's2-v15',
        sentence: 'The company launched a campaign to _______ awareness about ethical corporate governance.',
        options: ['raise', 'rise', 'lift', 'grow'],
        correctIndex: 0,
        explanation: 'One "raises awareness" (transitive verb with object) about an important social/ethical issue.',
        urduExplanation: 'شعور و آگاہی بیدار کرنے کے لیے "raise awareness" کی ترکیب استعمال ہوتی ہے۔'
      }
    ],
    vocabSentenceCompletion: [
      {
        id: 's2-v16',
        sentence: 'The audit committee questioned the _______ of the valuation methods used for intangible assets.',
        options: ['validity', 'vacancy', 'vanity', 'variation'],
        correctIndex: 0,
        explanation: '"Validity" refers to the quality of being logically or factually sound and acceptable.',
        urduExplanation: '"Validity" کا مطلب ہے قانونی اور منطقی صحت و درستی۔'
      },
      {
        id: 's2-v17',
        sentence: 'The managing partner urged the team to remain _______ and not jump to hasty conclusions.',
        options: ['prudent', 'reckless', 'hasty', 'careless'],
        correctIndex: 0,
        explanation: '"Prudent" means acting with or showing care and thought for the future.',
        urduExplanation: '"Prudent" کا مطلب ہے محتاط اور دانشمندانہ۔'
      },
      {
        id: 's2-v18',
        sentence: 'To avoid any conflict of interest, the consultant chose to _______ from voting on the resolution.',
        options: ['abstain', 'absorb', 'abolish', 'abide'],
        correctIndex: 0,
        explanation: '"Abstain" means to formally refrain from an action such as voting.',
        urduExplanation: '"Abstain" کا مطلب ہے ووٹنگ یا کسی فیصلے سے خود کو الگ رکھنا۔'
      },
      {
        id: 's2-v19',
        sentence: 'The CFO promised that all travel expenditures would be fully _______ upon receipt submission.',
        options: ['reimbursed', 'resigned', 'reprimanded', 'retained'],
        correctIndex: 0,
        explanation: '"Reimbursed" means to repay an amount that someone has spent on official duty.',
        urduExplanation: '"Reimbursed" کا مطلب ہے خرچ کی گئی رقم کی واپسی کی ادائیگی کرنا۔'
      },
      {
        id: 's2-v20',
        sentence: 'A thorough internal investigation confirmed that the accounting records were completely _______.',
        options: ['flawless', 'fraudulent', 'faulty', 'fictitious'],
        correctIndex: 0,
        explanation: '"Flawless" means free from any error, defect, or imperfection.',
        urduExplanation: '"Flawless" کا مطلب ہے بے عیب اور بالکل درست۔'
      }
    ],
    vocabContextMatching: [
      {
        id: 's2-v21',
        targetWord: 'transparent',
        correctMatch: 'clear',
        options: ['clear', 'opaque', 'secret', 'dark'],
        explanation: 'In corporate contexts, "transparent" means open, honest, and clear.',
        urduExplanation: '"Transparent" کا مطلب ہے شفاف اور واضح (Clear)۔'
      },
      {
        id: 's2-v22',
        targetWord: 'innovative',
        correctMatch: 'creative',
        options: ['creative', 'traditional', 'stale', 'customary'],
        explanation: '"Innovative" means introducing new and creative ideas or methods.',
        urduExplanation: '"Innovative" کا مطلب ہے تخلیقی اور جدید (Creative)۔'
      },
      {
        id: 's2-v23',
        targetWord: 'adverse',
        correctMatch: 'unfavorable',
        options: ['unfavorable', 'beneficial', 'friendly', 'pleasant'],
        explanation: '"Adverse" means preventing success or development; unfavorable or hostile.',
        urduExplanation: '"Adverse" کا مطلب ہے ناموافق یا منفی (Unfavorable)۔'
      },
      {
        id: 's2-v24',
        targetWord: 'comprehensive',
        correctMatch: 'thorough',
        options: ['thorough', 'incomplete', 'limited', 'narrow'],
        explanation: '"Comprehensive" means complete and including all aspects.',
        urduExplanation: '"Comprehensive" کا مطلب ہے جامع اور مکمل (Thorough)۔'
      },
      {
        id: 's2-v25',
        targetWord: 'durable',
        correctMatch: 'long-lasting',
        options: ['long-lasting', 'fragile', 'temporary', 'weak'],
        explanation: '"Durable" means able to withstand wear, pressure, or damage over time.',
        urduExplanation: '"Durable" کا مطلب ہے پائیدار اور دیرپا (Long-lasting)۔'
      }
    ]
  },
  reading: {
    section1: {
      id: 's2-r-sec1',
      title: 'Section 1: Sentence Comprehension',
      introduction: 'Read the short notice about an upcoming study tour and choose the best word for each gap.',
      paragraphs: [
        {
          textBefore: 'Attention Students,\n\nOur department has organized an educational field trip to the National Stock Exchange on Monday morning. All participants must assemble at the main gate at 8:00 AM sharp. Please ensure you wear formal business ',
          gapId: 's2-gap-1',
          options: ['attire', 'luggage', 'jewelry', 'equipment'],
          correctIndex: 0,
          textAfter: ' in accordance with exchange security rules.'
        },
        {
          textBefore: 'A chartered luxury coach will provide direct ',
          gapId: 's2-gap-2',
          options: ['transportation', 'entertainment', 'accommodation', 'negotiation'],
          correctIndex: 0,
          textAfter: ' to the venue and return us to campus by 3:00 PM.'
        },
        {
          textBefore: 'During the visit, a senior financial analyst will give a guided ',
          gapId: 's2-gap-3',
          options: ['tour', 'race', 'flight', 'voyage'],
          correctIndex: 0,
          textAfter: ' of the automated trading floor.'
        },
        {
          textBefore: 'Students are encouraged to take notes and ask insightful questions to enhance their ',
          gapId: 's2-gap-4',
          options: ['understanding', 'suspicion', 'dispute', 'hesitation'],
          correctIndex: 0,
          textAfter: ' of capital market dynamics.'
        },
        {
          textBefore: 'If you wish to participate, please register your name with the student coordinator and pay the registration ',
          gapId: 's2-gap-5',
          options: ['fee', 'bill', 'debt', 'wage'],
          correctIndex: 0,
          textAfter: ' by Thursday afternoon.'
        }
      ],
      explanations: {
        's2-gap-1': { english: '"Business attire" is the formal term for professional clothing.', urdu: 'پیشہ ورانہ لباس کے لیے "business attire" کا لفظ آتا ہے۔' },
        's2-gap-2': { english: 'A coach provides "transportation" (conveyance).', urdu: 'بس کے ذریعے سفر اور ٹرانسپورٹ کی سہولت ملتی ہے۔' },
        's2-gap-3': { english: 'A senior analyst gives a guided "tour" (walkthrough).', urdu: 'رہنمائی کے ساتھ دورہ کرنے کو "guided tour" کہتے ہیں۔' },
        's2-gap-4': { english: 'Asking questions enhances one\'s "understanding" (knowledge).', urdu: 'سوالات پوچھنے سے فہم و تفہیم (understanding) میں اضافہ ہوتا ہے۔' },
        's2-gap-5': { english: 'You pay a registration "fee" to join an official trip.', urdu: 'رجسٹریشن کے لیے فیس (fee) ادا کی جاتی ہے۔' }
      }
    },
    section2: {
      id: 's2-r-sec2',
      title: 'Section 2: Text Cohesion',
      topic: 'The Journey of an International Travel Explorer',
      sentences: [
        'Initially, Bilal spent several weeks researching off-the-beaten-path destinations across Northern Pakistan.',
        'Having packed all necessary mountaineering equipment, he departed from Lahore on an early morning flight.',
        'During the trek, he documented traditional folklore and photographed breathtaking mountain landscapes.',
        'Upon arriving at Skardu airport, he met his local wilderness guide and finalized their trail route.',
        'After returning home, he compiled his photographs and field notes into a widely praised travel memoir.',
        'The journey through the rugged valleys tested his physical endurance to the absolute limit.'
      ],
      correctOrder: [0, 1, 3, 5, 2, 4],
      explanation: 'Chronological cohesion: 1. Researching destination -> 2. Packing and departing -> 3. Arriving at airport & meeting guide -> 4. Rigorous valley journey -> 5. Documenting folklore during trek -> 6. Compiling memoir after returning home.',
      urduExplanation: 'منطقی ربط: سفر کی منصوبہ بندی (Initially) -> سامان پیک کرکے روانگی -> ایئرپورٹ پہنچ کر گائیڈ سے ملاقات -> وادی میں کٹھن سفر -> یادداشتیں قلمبند کرنا -> گھر واپسی پر کتاب تیار کرنا۔'
    },
    section3: {
      id: 's2-r-sec3',
      title: 'Section 3: Opinion Matching',
      topic: 'Four Accounting Professionals Discussing Sustainable Finance and ESG Reporting',
      people: [
        {
          id: 'A',
          name: 'Person A (Adnan)',
          description: 'Environmental reporting should not just be a marketing exercise. Companies must calculate their true carbon footprints using rigorous, auditable mathematical metrics. Without standardized external verification, green claims lack credibility.'
        },
        {
          id: 'B',
          name: 'Person B (Maryam)',
          description: 'Small and medium enterprises often lack the financial resources and specialized personnel to comply with complex ESG disclosure frameworks. Regulatory bodies must introduce simplified reporting tiers so small businesses aren\'t overwhelmed.'
        },
        {
          id: 'C',
          name: 'Person C (Kashif)',
          description: 'Global institutional investors are now prioritizing sustainable businesses over pure short-term profitability. Entities with strong social and governance credentials attract cheaper capital and enjoy higher long-term market valuations.'
        },
        {
          id: 'D',
          name: 'Person D (Hina)',
          description: 'Professional accounting education needs an immediate overhaul to incorporate sustainability auditing. Trainees today must learn environmental accounting alongside traditional balance sheets and cash flow reconciliations.'
        }
      ],
      questions: [
        {
          id: 's2-sec3-q1',
          statement: 'Who points out that small businesses might struggle with the complexity and cost of ESG compliance?',
          correctPersonId: 'B',
          explanation: 'Person B (Maryam) highlights the challenges faced by small and medium enterprises with complex frameworks.',
          urduExplanation: 'مریم (Person B) نے چھوٹے کاروباروں پر اخراجات اور پیچیدگی کے بوجھ کی نشاندہی کی۔'
        },
        {
          id: 's2-sec3-q2',
          statement: 'Who insists that environmental claims must be independently audited with standard scientific metrics?',
          correctPersonId: 'A',
          explanation: 'Person A (Adnan) emphasizes auditable metrics and independent external verification.',
          urduExplanation: 'عدنان (Person A) نے آزادانہ سائنسی جانچ اور آڈٹ کے معیار پر زور دیا۔'
        },
        {
          id: 's2-sec3-q3',
          statement: 'Who argues that sustainable companies gain an advantage in securing lower-cost investment capital?',
          correctPersonId: 'C',
          explanation: 'Person C (Kashif) notes sustainable businesses attract cheaper capital and higher valuations.',
          urduExplanation: 'کاشف (Person C) نے سستے کیپیٹل اور سرمایہ کاروں کی ترجیح کا فائدہ بتایا۔'
        },
        {
          id: 's2-sec3-q4',
          statement: 'Who believes that accountancy curriculums should immediately include environmental auditing modules?',
          correctPersonId: 'D',
          explanation: 'Person D (Hina) argues that professional education must incorporate sustainability alongside traditional ledgers.',
          urduExplanation: 'حنا (Person D) نے تعلیمی نصاب میں ماحولیاتی آڈٹ شامل کرنے پر زور دیا۔'
        },
        {
          id: 's2-sec3-q5',
          statement: 'Who proposes establishing a simplified tier of reporting tailored specifically for smaller entities?',
          correctPersonId: 'B',
          explanation: 'Person B (Maryam) calls for simplified reporting tiers for smaller enterprises.',
          urduExplanation: 'مریم (Person B) نے چھوٹے اداروں کے لیے آسان اصول بنانے کا مطالبہ کیا۔'
        },
        {
          id: 's2-sec3-q6',
          statement: 'Who warns that without proof, corporate sustainability claims are merely public relations gimmicks?',
          correctPersonId: 'A',
          explanation: 'Person A (Adnan) states environmental reporting must not be a mere marketing exercise.',
          urduExplanation: 'عدنان (Person A) نے خبردار کیا کہ بغیر ثبوت کے یہ صرف مارکیٹنگ کا شعبدہ ہے۔'
        },
        {
          id: 's2-sec3-q7',
          statement: 'Who notes a fundamental change in how global investment funds evaluate corporate performance?',
          correctPersonId: 'C',
          explanation: 'Person C (Kashif) mentions institutional investors prioritizing sustainability over short-term profits.',
          urduExplanation: 'کاشف (Person C) نے عالمی سرمایہ کاروں کی بدلتی ترجیحات کا ذکر کیا۔'
        }
      ]
    },
    section4: {
      id: 's2-r-sec4',
      title: 'Section 4: Long Text Comprehension & Headings',
      topic: 'Corporate Social Responsibility and Modern Enterprise',
      introduction: 'Match each paragraph (1-5) to the most appropriate heading.',
      headings: [
        'A. Aligning Corporate Profit with Societal Welfare',
        'B. The Dangers of Greenwashing and Deceptive Advertising',
        'C. Engaging Local Communities through Philanthropy',
        'D. Employee Well-being and Inclusive Workplace Culture',
        'E. Measuring Non-Financial Value and Long-Term Impact'
      ],
      paragraphs: [
        {
          id: 's2-p-1',
          paragraphNumber: 1,
          text: 'For decades, classical economics argued that the sole obligation of a business was maximizing shareholder profit. However, forward-thinking enterprises now recognize that financial success and societal welfare are deeply interconnected. Creating shared value means addressing societal challenges while building competitive business models.',
          correctHeadingIndex: 0,
          explanation: 'Paragraph 1 focuses on connecting corporate profit with societal benefit (Heading A).',
          urduExplanation: 'پیراگراف 1 کا تعلق کاروباری منافع اور سماجی فلاح کے باہمی ملاپ سے ہے (Heading A)۔'
        },
        {
          id: 's2-p-2',
          paragraphNumber: 2,
          text: 'Unfortunately, some corporations engage in cosmetic environmentalism to mislead consumers. Known as "greenwashing," this practice involves spending more money on advertising eco-friendly claims than on actual environmental sustainability. Regulatory authorities and discerning consumers are increasingly imposing heavy penalties on such deceptive practices.',
          correctHeadingIndex: 1,
          explanation: 'Paragraph 2 highlights deceptive environmental claims and greenwashing (Heading B).',
          urduExplanation: 'پیراگراف 2 میں دھوکہ دہی پر مبنی اشتہار بازی اور گرین واشنگ کا ذکر ہے (Heading B)۔'
        },
        {
          id: 's2-p-3',
          paragraphNumber: 3,
          text: 'Meaningful corporate responsibility also begins with how an organization treats its own internal workforce. Fostering mental health initiatives, ensuring equitable pay structures, and providing ergonomic workstations enhance employee morale and drastically reduce staff turnover rates.',
          correctHeadingIndex: 3,
          explanation: 'Paragraph 3 details internal employee welfare, mental health, and fair workplace culture (Heading D).',
          urduExplanation: 'پیراگراف 3 ملازمین کی فلاح و بہبود اور کام کے ماحول سے متعلق ہے (Heading D)۔'
        },
        {
          id: 's2-p-4',
          paragraphNumber: 4,
          text: 'Building trust with local residents near manufacturing plants requires active grassroots engagement. Supporting regional schools, sponsoring clean water facilities, and funding youth sports programs foster genuine goodwill and secure a strong social license to operate.',
          correctHeadingIndex: 2,
          explanation: 'Paragraph 4 focuses on community engagement, local schools, clean water, and philanthropy (Heading C).',
          urduExplanation: 'پیراگراف 4 مقامی کمیونٹی اور فلاحی کاموں کے ذریعے اعتماد سازی پر مبنی ہے (Heading C)۔'
        },
        {
          id: 's2-p-5',
          paragraphNumber: 5,
          text: 'Ultimately, accounting systems must evolve to quantify intangible non-financial achievements. Developing robust impact metrics allows corporate leaders to demonstrate to stakeholders how ethical practices safeguard brand resilience and generate sustained value over future decades.',
          correctHeadingIndex: 4,
          explanation: 'Paragraph 5 emphasizes quantifying intangible value and long-term impact metrics (Heading E).',
          urduExplanation: 'پیراگراف 5 طویل مدتی اثرات اور غیر مالیاتی کامیابیوں کی پیمائش پر مرکوز ہے (Heading E)۔'
        }
      ]
    }
  },
  writing: {
    themeName: 'International Travel & Cultural Society',
    part1: {
      id: 'w2-p1',
      context: 'You are applying to join the International Travel & Cultural Society. Answer 5 questions in 1–5 words each.',
      questions: [
        {
          id: 'w2-q1',
          prompt: 'Which country would you like to travel to next?',
          maxWords: 5,
          sampleAnswer: 'Japan or Turkey'
        },
        {
          id: 'w2-q2',
          prompt: 'What type of travel do you prefer (e.g. historical, adventure, nature)?',
          maxWords: 5,
          sampleAnswer: 'Historical cultural heritage tours'
        },
        {
          id: 'w2-q3',
          prompt: 'Do you prefer traveling alone or in groups?',
          maxWords: 5,
          sampleAnswer: 'With small organized groups'
        },
        {
          id: 'w2-q4',
          prompt: 'What languages do you speak comfortably?',
          maxWords: 5,
          sampleAnswer: 'English, Urdu, and conversational Arabic'
        },
        {
          id: 'w2-q5',
          prompt: 'What is your primary hobby when exploring new places?',
          maxWords: 5,
          sampleAnswer: 'Photography and historical architecture'
        }
      ]
    },
    part2: {
      id: 'w2-p2',
      formName: 'Travel Experience Statement',
      prompt: 'Please describe a memorable trip you took in the past and what you learned from the experience. (Write 20–30 words)',
      minWords: 20,
      maxWords: 30,
      sampleAnswer: 'Last summer, I explored the historic mountain valleys of Gilgit-Baltistan. The trip taught me immense appreciation for preserved regional heritage and the warm resilience of indigenous communities.'
    },
    part3: {
      id: 'w2-p3',
      clubName: 'Travel Society Member Forum',
      context: 'In the society online chat forum, three fellow travelers have posted questions. Answer each question in 30–40 words.',
      memberChats: [
        {
          id: 'w2-chat-1',
          memberName: 'Marcus (Adventure Guide)',
          avatarInitials: 'MB',
          message: 'Planning international trips can be overwhelming. What is your go-to method for researching local culture, safety guidelines, and budget accommodations before departure?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'I rely on official government travel advisories for safety and consult verified travel journals and local bloggers for cultural customs. Booking certified homestays ensures authentic experiences while staying comfortably within budget.'
        },
        {
          id: 'w2-chat-2',
          memberName: 'Elena (Photography Lead)',
          avatarInitials: 'ER',
          message: 'We are curating our society photo exhibition next month. Do you prefer capturing spontaneous street moments and local portraits, or wide scenic landscapes, and why?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'I love capturing spontaneous street portraits and cultural markets. Human expressions reflect the true soul and daily spirit of a nation, whereas empty landscape shots often lack emotional connection and narrative depth.'
        },
        {
          id: 'w2-chat-3',
          memberName: 'Farhan (Society President)',
          avatarInitials: 'FK',
          message: 'We are organizing our winter study expedition. Would you support a mountain trekking expedition in the north or an archaeological heritage tour along historic trade routes?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'I strongly favor the historic trade route expedition. Exploring ancient caravanserais and archaeological ruins offers profound educational insights into historical commerce and civilizational exchange, which aligns perfectly with our society mission.'
        }
      ]
    },
    part4: {
      id: 'w2-p4',
      clubName: 'International Travel Society',
      contextNotice: 'You have received this notification from the Society Committee:\n\n"Dear Members, due to sudden administrative changes at our affiliated airline partner, our subsidized group expedition to Istanbul scheduled for November has been cancelled. Instead, the society will arrange a domestic weekend trip to a nearby resort, and remaining funds will be retained as future credit rather than refunded immediately."',
      taskA: {
        prompt: 'Write an email to your travel friend (Kamran). Tell him about the cancellation, express your disappointment, and suggest your own independent weekend travel plan. (Write around 50 words)',
        minWords: 40,
        maxWords: 60,
        sampleAnswer: 'Hi Kamran,\n\nI just read the terrible news from the travel society. Our Istanbul expedition is cancelled, and they are replacing it with a local resort trip without immediate refunds! I am really upset. Why don\'t we book our own weekend hiking trip to Murree hills instead?\n\nBest,\nTariq'
      },
      taskB: {
        prompt: 'Write a formal email to the Society Secretary (Ms. Roberts). Express your dissatisfaction regarding the cancellation and withholding of refunds, outline why this policy is unfair to members, and request a full cash refund option immediately. (Write 120–150 words)',
        minWords: 120,
        maxWords: 150,
        sampleAnswer: 'Dear Ms. Roberts,\n\nI am writing to formally express my deep disappointment regarding the abrupt cancellation of our scheduled November expedition to Istanbul and the committee’s subsequent decision to retain member funds as credit.\n\nMany members, including myself, registered and paid specifically for the international cultural learning opportunity in Turkey. Replacing an international expedition with a domestic resort stay does not offer equivalent educational or experiential value. Furthermore, withholding direct cash refunds in favor of future credits creates financial hardship for students who budgeted diligently for this trip.\n\nWhile I acknowledge the difficulties caused by airline partner disruptions, fair governance dictates that members who do not wish to attend the local alternative must be granted prompt, unconditional refunds.\n\nI respectfully urge the committee to review this policy and initiate direct refund processing at the earliest convenience. Thank you for your attention.\n\nYours sincerely,\nSociety Member'
      }
    }
  }
};

export const ALL_APTIS_TEST_SETS: AptisTestSet[] = [
  APTIS_TEST_SET_1,
  APTIS_TEST_SET_2
];
