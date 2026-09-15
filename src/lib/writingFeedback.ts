/**
 * writingFeedback.ts
 * Comprehensive writing evaluation and mistake detection engine for ICAP ECS and Aptis Writing.
 * Detects every mistake including grammar, spelling, word choice, sentence structure,
 * punctuation, clarity, and tone/register.
 * Compares student responses with benchmark suggested answers, providing itemized corrections
 * with explanations in English and Urdu, and improved full model answers.
 */

import { callGeminiAPI } from './api-handler';

export type WritingMistakeType = 
  | 'grammar' 
  | 'spelling' 
  | 'punctuation' 
  | 'word_choice' 
  | 'sentence_structure' 
  | 'clarity' 
  | 'tone';

export interface WritingMistake {
  id: string;
  original: string; // The exact snippet with error (what is wrong)
  replacement: string; // Corrected replacement snippet (corrected version)
  type: WritingMistakeType;
  explanation: string; // Brief reason why it is wrong and what rule applies
  urduExplanation?: string;
  startIndex: number;
  endIndex: number;
}

export interface WritingFeedbackResult {
  originalText: string;
  mistakes: WritingMistake[];
  improvedFullAnswer: string;
  benchmarkModelAnswer?: string;
  benchmarkComparisonNotes?: string;
  score: number; // 0-100
  bandRating: string;
  toneRegister: 'Formal' | 'Informal' | 'Mixed';
  grammarScore: number;
  vocabularyScore: number;
  cohesionScore: number;
  summaryFeedback: string;
  urduSummary?: string;
}

// Extensive dictionary of common spelling mistakes (word -> correct)
export const SPELLING_DICTIONARY: Record<string, string> = {
  'commited': 'committed',
  'untill': 'until',
  'seperate': 'separate',
  'seperated': 'separated',
  'seperately': 'separately',
  'recieve': 'receive',
  'recieved': 'received',
  'recieving': 'receiving',
  'occured': 'occurred',
  'occuring': 'occurring',
  'occurr': 'occur',
  'occurance': 'occurrence',
  'writting': 'writing',
  'writen': 'written',
  'informtion': 'information',
  'infomation': 'information',
  'managment': 'management',
  'finanical': 'financial',
  'statment': 'statement',
  'statments': 'statements',
  'tellling': 'telling',
  'becuase': 'because',
  'becouse': 'because',
  'definately': 'definitely',
  'definate': 'definite',
  'neccessary': 'necessary',
  'necesary': 'necessary',
  'acheive': 'achieve',
  'acheived': 'achieved',
  'truely': 'truly',
  'tommorrow': 'tomorrow',
  'tommorow': 'tomorrow',
  'calender': 'calendar',
  'goverment': 'government',
  'liabilty': 'liability',
  'liabilites': 'liabilities',
  'procedue': 'procedure',
  'proceedure': 'procedure',
  'prosedure': 'procedure',
  'reconcilation': 'reconciliation',
  'accross': 'across',
  'arguement': 'argument',
  'oppurtunity': 'opportunity',
  'oportunity': 'opportunity',
  'possession': 'possession',
  'posession': 'possession',
  'disapoint': 'disappoint',
  'embarass': 'embarrass',
  'fourty': 'forty',
  'freind': 'friend',
  'freinds': 'friends',
  'sucess': 'success',
  'sucessful': 'successful',
  'suprise': 'surprise',
  'beleive': 'believe',
  'beleived': 'believed',
  'enought': 'enough',
  'thier': 'their',
  'wierd': 'weird',
  'alot': 'a lot',
  'comunication': 'communication',
  'auditer': 'auditor',
  'acounting': 'accounting',
  'responsibilty': 'responsibility',
  'responisble': 'responsible',
  'resposible': 'responsible',
  'dificult': 'difficult',
  'confermation': 'confirmation',
  'schedul': 'schedule',
  'refering': 'referring',
  'begining': 'beginning',
  'existance': 'existence',
  'guarentee': 'guarantee',
  'maintainance': 'maintenance',
  'previlige': 'privilege',
  'priviledge': 'privilege',
  'recommand': 'recommend',
  'reccomend': 'recommend',
  'recommandation': 'recommendation',
  'accomodate': 'accommodate',
  'accomodation': 'accommodation',
  'adress': 'address',
  'adressed': 'addressed',
  'agressive': 'aggressive',
  'apparant': 'apparent',
  'colleague': 'colleague',
  'collegue': 'colleague',
  'comittee': 'committee',
  'disapear': 'disappear',
  'enviroment': 'environment',
  'foriegn': 'foreign',
  'harrass': 'harass',
  'independant': 'independent',
  'judgement': 'judgment',
  'liason': 'liaison',
  'mispell': 'misspell',
  'noticable': 'noticeable',
  'prefered': 'preferred',
  'proffesional': 'professional',
  'referance': 'reference',
  'relavent': 'relevant',
  'supercede': 'supersede',
  'tendancy': 'tendency',
  'unfortunatly': 'unfortunately',
  'busines': 'business',
  'experiance': 'experience',
  'explaning': 'explaining',
  'dissapointed': 'disappointed',
  'appriciate': 'appreciate',
  'sinserely': 'sincerely',
  'faithfull': 'faithfully',
  'intrested': 'interested',
  'sugestion': 'suggestion',
  'conveniance': 'convenience',
  'cancelation': 'cancellation',
  'availibility': 'availability',
  'attendence': 'attendance'
};

// Grammar & Idiom / Collocation rules with regex patterns
export interface GrammarRule {
  pattern: RegExp;
  replacement: string;
  type: WritingMistakeType;
  explanation: string;
  urduExplanation?: string;
}

export const GRAMMAR_AND_STYLE_RULES: GrammarRule[] = [
  // ==========================================
  // 1. GRAMMAR: Subject-Verb Agreement & Tenses
  // ==========================================
  {
    pattern: /\bhe don't\b/gi,
    replacement: 'he does not',
    type: 'grammar',
    explanation: "Third-person singular subject 'he' requires 'does not' rather than 'don't'.",
    urduExplanation: "تیسرے شخص واحد فاعل (He) کے ساتھ 'does not' آتا ہے، 'don't' نہیں۔"
  },
  {
    pattern: /\bshe don't\b/gi,
    replacement: 'she does not',
    type: 'grammar',
    explanation: "Third-person singular subject 'she' requires 'does not'.",
    urduExplanation: "فاعل (She) کے ساتھ 'does not' درست ہے۔"
  },
  {
    pattern: /\bit don't\b/gi,
    replacement: 'it does not',
    type: 'grammar',
    explanation: "Third-person singular subject 'it' requires 'does not'.",
    urduExplanation: "فاعل (It) کے ساتھ 'does not' استعمال کریں۔"
  },
  {
    pattern: /\beveryone are\b/gi,
    replacement: 'everyone is',
    type: 'grammar',
    explanation: "Indefinite pronoun 'everyone' takes a singular verb ('everyone is').",
    urduExplanation: "ضمیر 'everyone' ہمیشہ واحد فعل (is) کے ساتھ آتا ہے۔"
  },
  {
    pattern: /\beverybody are\b/gi,
    replacement: 'everybody is',
    type: 'grammar',
    explanation: "Indefinite pronoun 'everybody' takes a singular verb ('everybody is').",
    urduExplanation: "'everybody' کے ساتھ واحد فعل 'is' آتا ہے۔"
  },
  {
    pattern: /\beach of (them|us|the members|the students) are\b/gi,
    replacement: 'each of $1 is',
    type: 'grammar',
    explanation: "The subject 'each' is grammatically singular and requires the verb 'is'.",
    urduExplanation: "'each' کے بعد فعل ہمیشہ واحد (is) ہوتا ہے۔"
  },
  {
    pattern: /\bthe informations? (are|were)\b/gi,
    replacement: 'the information is',
    type: 'grammar',
    explanation: "'Information' is an uncountable noun with no plural 's' and takes a singular verb.",
    urduExplanation: "لفظ 'information' غیر شمار شدہ ہے، اس کے ساتھ 's' نہیں لگتا اور فعل واحد ہوتا ہے۔"
  },
  {
    pattern: /\bthe equipments? (are|were)\b/gi,
    replacement: 'the equipment was',
    type: 'grammar',
    explanation: "'Equipment' is uncountable in English and takes a singular verb.",
    urduExplanation: "'Equipment' کی جمع نہیں بنتی، اس کے ساتھ واحد فعل آتا ہے۔"
  },
  {
    pattern: /\bthe news (are|were)\b/gi,
    replacement: 'the news is',
    type: 'grammar',
    explanation: "'News' is an uncountable noun and requires a singular verb ('is' / 'was').",
    urduExplanation: "'News' بظاہر جمع لگتا ہے لیکن اس کے ساتھ واحد فعل آتا ہے۔"
  },
  {
    pattern: /\bhave went\b/gi,
    replacement: 'have gone',
    type: 'grammar',
    explanation: "Present perfect tense requires past participle: 'have gone', not past simple 'went'.",
    urduExplanation: "'have' کے ساتھ ورب کی تیسری فارم (gone) استعمال ہوتی ہے، 'went' نہیں۔"
  },
  {
    pattern: /\bhas went\b/gi,
    replacement: 'has gone',
    type: 'grammar',
    explanation: "Use past participle 'gone' with auxiliary 'has'.",
    urduExplanation: "'has' کے بعد تیسری فارم 'gone' درست ہے۔"
  },
  {
    pattern: /\bhave wrote\b/gi,
    replacement: 'have written',
    type: 'grammar',
    explanation: "Use the past participle 'written' with the auxiliary 'have'.",
    urduExplanation: "'have' کے بعد ورب کی تیسری فارم 'written' لگائی جاتی ہے۔"
  },
  {
    pattern: /\bhas wrote\b/gi,
    replacement: 'has written',
    type: 'grammar',
    explanation: "Use past participle 'written' with 'has'.",
    urduExplanation: "'has' کے بعد 'written' درست ہے۔"
  },
  {
    pattern: /\bdid not went\b/gi,
    replacement: 'did not go',
    type: 'grammar',
    explanation: "After auxiliary 'did not', use the base form 'go' rather than the past form 'went'.",
    urduExplanation: "'did not' کے بعد ہمیشہ ورب کی پہلی فارم (go) آتی ہے۔"
  },
  {
    pattern: /\bdid not saw\b/gi,
    replacement: 'did not see',
    type: 'grammar',
    explanation: "After 'did not', use the base form 'see'.",
    urduExplanation: "'did not' کے ساتھ پہلی فارم 'see' استعمال کریں۔"
  },
  {
    pattern: /\bdid not wrote\b/gi,
    replacement: 'did not write',
    type: 'grammar',
    explanation: "Use base verb 'write' following 'did not'.",
    urduExplanation: "'did not' کے بعد 'write' آئے گا۔"
  },
  {
    pattern: /\bdid not took\b/gi,
    replacement: 'did not take',
    type: 'grammar',
    explanation: "Use base verb 'take' after 'did not'.",
    urduExplanation: "'did not' کے بعد پہلی فارم 'take' درست ہے۔"
  },
  {
    pattern: /\bdid not knew\b/gi,
    replacement: 'did not know',
    type: 'grammar',
    explanation: "Use base verb 'know' after 'did not'.",
    urduExplanation: "'did not' کے بعد 'know' استعمال کریں۔"
  },
  {
    pattern: /\bwas knowing\b/gi,
    replacement: 'knew',
    type: 'grammar',
    explanation: "'Know' is a stative verb and is not normally used in continuous/progressive tenses.",
    urduExplanation: "ورب 'know' حالت ظاہر کرتا ہے، اس لیے اس کے ساتھ '-ing' نہیں لگتا۔"
  },
  {
    pattern: /\bam having a doubt\b/gi,
    replacement: 'have a doubt',
    type: 'grammar',
    explanation: "Use simple present 'have a doubt' / 'have a query' for mental state.",
    urduExplanation: "دماغی کیفیت یا شک ظاہر کرنے کے لیے 'have' سادہ حال میں آتا ہے۔"
  },
  // Infinitives
  {
    pattern: /\bto telling\b/gi,
    replacement: 'to inform',
    type: 'grammar',
    explanation: "After the infinitive marker 'to', use base verb 'inform' rather than gerund '-ing'.",
    urduExplanation: "'to' کے بعد ہمیشہ ورب کی پہلی فارم 'to inform' یا 'to tell' آتی ہے۔"
  },
  {
    pattern: /\bto informing\b/gi,
    replacement: 'to inform',
    type: 'grammar',
    explanation: "Use the base infinitive 'to inform' rather than 'to informing'.",
    urduExplanation: "'to' کے ساتھ ورب کی پہلی فارم 'to inform' درست ہے۔"
  },
  {
    pattern: /\bto giving\b/gi,
    replacement: 'to provide',
    type: 'grammar',
    explanation: "Use 'to provide' or 'to give' instead of 'to giving'.",
    urduExplanation: "'to' کے بعد 'to provide' یا 'to give' استعمال کریں۔"
  },
  {
    pattern: /\bto making\b/gi,
    replacement: 'to make',
    type: 'grammar',
    explanation: "Infinitive construction requires base form: 'to make'.",
    urduExplanation: "انفینیٹو کے ساتھ ورب کی پہلی فارم 'to make' استعمال ہوتی ہے۔"
  },
  {
    pattern: /\bto discussing\b/gi,
    replacement: 'to discuss',
    type: 'grammar',
    explanation: "Use base verb form 'to discuss' following the particle 'to'.",
    urduExplanation: "'to' کے بعد 'to discuss' درست ہے۔"
  },
  {
    pattern: /\bto writing\b/gi,
    replacement: 'to write',
    type: 'grammar',
    explanation: "Use base form 'to write'.",
    urduExplanation: "'to' کے ساتھ پہلی فارم 'to write' استعمال کریں۔"
  },
  {
    pattern: /\bmust to\b/gi,
    replacement: 'must',
    type: 'grammar',
    explanation: "Modal auxiliary 'must' is followed directly by the bare infinitive without 'to'.",
    urduExplanation: "ماڈل ورب 'must' کے بعد 'to' نہیں لگایا جاتا۔"
  },
  {
    pattern: /\bshould to\b/gi,
    replacement: 'should',
    type: 'grammar',
    explanation: "Modal auxiliary 'should' is followed directly by bare infinitive without 'to'.",
    urduExplanation: "'should' کے بعد 'to' کا استعمال غلط ہے۔"
  },
  {
    pattern: /\bcan to\b/gi,
    replacement: 'can',
    type: 'grammar',
    explanation: "Modal 'can' is followed by a bare verb without 'to'.",
    urduExplanation: "'can' کے فوراً بعد ورب کی پہلی فارم آتی ہے، 'to' نہیں۔"
  },
  {
    pattern: /\bcannot able to\b/gi,
    replacement: 'am unable to',
    type: 'grammar',
    explanation: "'Cannot' and 'able to' are redundant together. Use 'cannot' or 'am unable to'.",
    urduExplanation: "'Cannot' اور 'able to' کو ایک ساتھ استعمال کرنا غلط ہے۔ 'am unable to' لکھیں۔"
  },
  // Preposition collocations
  {
    pattern: /\bin night\b/gi,
    replacement: 'at night',
    type: 'grammar',
    explanation: "Standard English preposition with night is 'at night'.",
    urduExplanation: "رات کے لیے 'at night' درست پریپوزیشن ہے۔"
  },
  {
    pattern: /\bdiscuss about\b/gi,
    replacement: 'discuss',
    type: 'grammar',
    explanation: "'Discuss' is a transitive verb that directly takes an object without the preposition 'about'.",
    urduExplanation: "لفظ 'discuss' کے بعد 'about' لگانے کی ضرورت نہیں۔"
  },
  {
    pattern: /\bcomprise of\b/gi,
    replacement: 'comprise',
    type: 'grammar',
    explanation: "'Comprise' means 'consist of' and should not be followed by 'of' in active voice.",
    urduExplanation: "'Comprise' کے ساتھ 'of' نہیں لگایا جاتا۔"
  },
  {
    pattern: /\bcongratulate for\b/gi,
    replacement: 'congratulate on',
    type: 'grammar',
    explanation: "The correct preposition following 'congratulate' is 'on'.",
    urduExplanation: "مبارکباد کے لیے 'congratulate on' درست پریپوزیشن ہے۔"
  },
  {
    pattern: /\bresponsible of\b/gi,
    replacement: 'responsible for',
    type: 'grammar',
    explanation: "The correct preposition is 'responsible for'.",
    urduExplanation: "ذمہ داری کے لیے 'responsible for' درست ہے۔"
  },
  {
    pattern: /\bgood in\b/gi,
    replacement: 'good at',
    type: 'grammar',
    explanation: "When describing proficiency in a skill or subject, use 'good at'.",
    urduExplanation: "کسی کام یا مضمون میں مہارت کے لیے 'good at' استعمال ہوتا ہے۔"
  },
  {
    pattern: /\binterested for\b/gi,
    replacement: 'interested in',
    type: 'grammar',
    explanation: "The correct collocation is 'interested in'.",
    urduExplanation: "دلچسپی کے لیے 'interested in' درست ہے۔"
  },
  {
    pattern: /\blook forward to hear\b/gi,
    replacement: 'look forward to hearing',
    type: 'grammar',
    explanation: "In 'look forward to', 'to' is a preposition and must be followed by a gerund ('hearing').",
    urduExplanation: "'Look forward to' کے بعد ورب کے ساتھ '-ing' (hearing) لگانا لازمی ہے۔"
  },
  {
    pattern: /\blooking forward to meet\b/gi,
    replacement: 'looking forward to meeting',
    type: 'grammar',
    explanation: "Use gerund 'meeting' after 'looking forward to'.",
    urduExplanation: "'looking forward to' کے بعد 'meeting' آئے گا۔"
  },
  {
    pattern: /\bcomply to\b/gi,
    replacement: 'comply with',
    type: 'grammar',
    explanation: "The correct dependent preposition with comply is 'comply with'.",
    urduExplanation: "قوانین کی پاسداری کے لیے 'comply with' درست ہے۔"
  },
  {
    pattern: /\baccording with\b/gi,
    replacement: 'according to',
    type: 'grammar',
    explanation: "Standard idiom is 'according to'.",
    urduExplanation: "'according to' درست ترکیب ہے۔"
  },
  // Accidental duplicate words
  {
    pattern: /\b(the|is|in|that|and|to|we|they|he|she|it|of|for)\s+\1\b/gi,
    replacement: '$1',
    type: 'grammar',
    explanation: 'Accidental duplicate word detected.',
    urduExplanation: 'ایک ہی لفظ غلطی سے دو بار لکھا گیا ہے۔'
  },

  // ==========================================
  // 2. WORD CHOICE: Confusing Words & Idioms
  // ==========================================
  {
    pattern: /\bhave a big affect on\b/gi,
    replacement: 'have a significant effect on',
    type: 'word_choice',
    explanation: "'Effect' is the noun meaning result/impact, whereas 'affect' is primarily a verb.",
    urduExplanation: "اسم (Noun) کے طور پر 'effect' درست ہے، جبکہ 'affect' فعل ہوتا ہے۔"
  },
  {
    pattern: /\bit will effect our\b/gi,
    replacement: 'it will affect our',
    type: 'word_choice',
    explanation: "Use the verb 'affect' to mean influence or produce an effect on.",
    urduExplanation: "اثر ڈالنے کے لیے فعل 'affect' استعمال کریں۔"
  },
  {
    pattern: /\bmight loose\b/gi,
    replacement: 'might lose',
    type: 'word_choice',
    explanation: "Confused word: 'lose' means to misplace or suffer loss; 'loose' means not tight.",
    urduExplanation: "کھو دینے یا نقصان کے لیے 'lose' درست ہے، 'loose' کا مطلب ڈھیلا ہوتا ہے۔"
  },
  {
    pattern: /\bloose the opportunity\b/gi,
    replacement: 'lose the opportunity',
    type: 'word_choice',
    explanation: "Use 'lose' (to forfeit/miss) rather than 'loose' (unfastened).",
    urduExplanation: "موقع ضائع ہونے کے لیے 'lose the opportunity' لکھیں۔"
  },
  {
    pattern: /\btheir is\b/gi,
    replacement: 'there is',
    type: 'word_choice',
    explanation: "'There' indicates existence or location; 'their' is possessive.",
    urduExplanation: "موجودگی ظاہر کرنے کے لیے 'there is' آتا ہے، 'their' ملکیت کے لیے ہوتا ہے۔"
  },
  {
    pattern: /\btheir are\b/gi,
    replacement: 'there are',
    type: 'word_choice',
    explanation: "Use existential 'there are' rather than possessive 'their'.",
    urduExplanation: "'there are' درست املا اور انتخاب ہے۔"
  },
  {
    pattern: /\bthey're office\b/gi,
    replacement: 'their office',
    type: 'word_choice',
    explanation: "Use possessive pronoun 'their' before a noun, not the contraction 'they're' (they are).",
    urduExplanation: "ملکیت کے لیے 'their office' درست ہے، 'they're' کا مطلب 'they are' ہے۔"
  },
  {
    pattern: /\bplease advice me\b/gi,
    replacement: 'please advise me',
    type: 'word_choice',
    explanation: "'Advise' is the verb meaning to recommend; 'advice' is the uncountable noun.",
    urduExplanation: "فعل (Verb) کے لیے 'advise' درست ہے، جبکہ 'advice' اسم (Noun) ہے۔"
  },
  {
    pattern: /\ban advice\b/gi,
    replacement: 'some advice',
    type: 'word_choice',
    explanation: "'Advice' is uncountable; use 'some advice' or 'a piece of advice', not 'an advice'.",
    urduExplanation: "'Advice' غیر شمار شدہ اسم ہے، اس سے پہلے 'an' نہیں لگتا۔"
  },
  {
    pattern: /\baccounting principals\b/gi,
    replacement: 'accounting principles',
    type: 'word_choice',
    explanation: "'Principle' refers to a fundamental rule or truth; 'principal' refers to a chief person or school head.",
    urduExplanation: "اصولوں کے لیے 'principles' درست لفظ ہے۔"
  },
  {
    pattern: /\bborrow me\b/gi,
    replacement: 'lend me',
    type: 'word_choice',
    explanation: "'Lend' means to give temporarily; 'borrow' means to take temporarily.",
    urduExplanation: "امانت دینے کے لیے 'lend' اور لینے کے لیے 'borrow' استعمال ہوتا ہے۔"
  },
  {
    pattern: /\bexplain me\b/gi,
    replacement: 'explain to me',
    type: 'word_choice',
    explanation: "'Explain' requires the preposition 'to' before the person receiving the explanation.",
    urduExplanation: "لفظ 'explain' کے بعد شخص کے ساتھ 'to me' لگایا جاتا ہے۔"
  },
  {
    pattern: /\bsay me\b/gi,
    replacement: 'tell me',
    type: 'word_choice',
    explanation: "We tell someone something, or say something to someone. Use 'tell me'.",
    urduExplanation: "مجھ سے کہو کے لیے 'tell me' درست ہے۔"
  },
  {
    pattern: /\bdo a mistake\b/gi,
    replacement: 'make a mistake',
    type: 'word_choice',
    explanation: "The standard English collocation is 'make a mistake', not 'do a mistake'.",
    urduExplanation: "غلطی کے ساتھ فعل 'make' استعمال ہوتا ہے، یعنی 'make a mistake'۔"
  },
  {
    pattern: /\bdid a mistake\b/gi,
    replacement: 'made a mistake',
    type: 'word_choice',
    explanation: "Use past collocation 'made a mistake'.",
    urduExplanation: "ماضی میں 'made a mistake' درست ہے۔"
  },
  {
    pattern: /\bgive an exam\b/gi,
    replacement: 'take an exam',
    type: 'word_choice',
    explanation: "Students 'take' or 'sit' an exam; examiners 'give' or 'administer' an exam.",
    urduExplanation: "امتحان دینے والا طالب علم 'take an exam' کہتا ہے۔"
  },
  {
    pattern: /\bcope up with\b/gi,
    replacement: 'cope with',
    type: 'word_choice',
    explanation: "The correct idiom is 'cope with', without the redundant preposition 'up'.",
    urduExplanation: "درست محاورہ 'cope with' ہے، 'up' کا اضافہ غلط ہے۔"
  },
  {
    pattern: /\bpay attention on\b/gi,
    replacement: 'pay attention to',
    type: 'word_choice',
    explanation: "The standard preposition is 'pay attention to'.",
    urduExplanation: "توجہ دینے کے لیے 'pay attention to' درست پریپوزیشن ہے۔"
  },
  {
    pattern: /\bamount of people\b/gi,
    replacement: 'number of people',
    type: 'word_choice',
    explanation: "Use 'number of' for countable nouns like people; 'amount of' is for uncountable quantities.",
    urduExplanation: "لوگوں کی تعداد کے لیے 'number of people' استعمال کریں۔"
  },
  {
    pattern: /\bless people\b/gi,
    replacement: 'fewer people',
    type: 'word_choice',
    explanation: "Use 'fewer' with countable nouns and 'less' with uncountable amounts.",
    urduExplanation: "قابل شمار افراد کے لیے 'fewer' درست ہے۔"
  },

  // ==========================================
  // 3. SENTENCE STRUCTURE: Syntax, Run-ons & Fragments
  // ==========================================
  {
    pattern: /\b([a-z]+),\s+however,\s+([a-z]+)\b/gi,
    replacement: '$1. However, $2',
    type: 'sentence_structure',
    explanation: "Comma splice: 'however' cannot join two independent clauses with only commas. Use a period or semicolon.",
    urduExplanation: "دو مکمل جملوں کو صرف کوما اور 'however' سے نہیں جوڑا جا سکتا۔ فل اسٹاپ لگا کر نیا جملہ شروع کریں۔"
  },
  {
    pattern: /\b([a-z]+),\s+therefore,\s+([a-z]+)\b/gi,
    replacement: '$1. Therefore, $2',
    type: 'sentence_structure',
    explanation: "'Therefore' is a conjunctive adverb. Separate independent clauses with a period or semicolon.",
    urduExplanation: "'Therefore' سے پہلے فل اسٹاپ یا سیمی کولن لگانا لازمی ہے۔"
  },
  {
    pattern: /\bIs important that\b/gi,
    replacement: 'It is important that',
    type: 'sentence_structure',
    explanation: "Missing dummy subject: English requires the pronoun 'It' as subject: 'It is important that'.",
    urduExplanation: "انگریزی جملے میں فاعل کا ہونا ضروری ہے، اس لیے 'It is important' لکھیں۔"
  },
  {
    pattern: /\bIs necessary to\b/gi,
    replacement: 'It is necessary to',
    type: 'sentence_structure',
    explanation: "Sentence fragment missing subject: write 'It is necessary to'.",
    urduExplanation: "جملے کا آغاز 'It is necessary' سے کریں۔"
  },
  {
    pattern: /\bRarely I have seen\b/gi,
    replacement: 'Rarely have I seen',
    type: 'sentence_structure',
    explanation: "Negative adverbial 'Rarely' at the start of a clause triggers subject-auxiliary inversion.",
    urduExplanation: "منفی الفاظ (Rarely) سے جملہ شروع ہو تو امدادی فعل فاعل سے پہلے آتا ہے (Inversion)۔"
  },

  // ==========================================
  // 4. PUNCTUATION: Mechanics, Capitalization & Spacing
  // ==========================================
  {
    pattern: /\bi am writing\b/g,
    replacement: 'I am writing',
    type: 'punctuation',
    explanation: "The personal pronoun 'I' must always be capitalized.",
    urduExplanation: "انگریزی میں ضمیر 'I' ہمیشہ کیپٹل لکھا جاتا ہے۔"
  },
  {
    pattern: /\bi have\b/g,
    replacement: 'I have',
    type: 'punctuation',
    explanation: "Capitalize the personal pronoun 'I'.",
    urduExplanation: "ضمیر 'I' کو ہمیشہ کیپٹل لکھیں۔"
  },
  {
    pattern: /\bi will\b/g,
    replacement: 'I will',
    type: 'punctuation',
    explanation: "Capitalize the personal pronoun 'I'.",
    urduExplanation: "ضمیر 'I' کو ہمیشہ کیپٹل لکھیں۔"
  },
  {
    pattern: /\bi think\b/g,
    replacement: 'I think',
    type: 'punctuation',
    explanation: "Capitalize the personal pronoun 'I'.",
    urduExplanation: "ضمیر 'I' کو ہمیشہ کیپٹل لکھیں۔"
  },
  {
    pattern: /\bi would\b/g,
    replacement: 'I would',
    type: 'punctuation',
    explanation: "Capitalize the personal pronoun 'I'.",
    urduExplanation: "ضمیر 'I' کو ہمیشہ کیپٹل لکھیں۔"
  },
  {
    pattern: /\bi can\b/g,
    replacement: 'I can',
    type: 'punctuation',
    explanation: "Capitalize the personal pronoun 'I'.",
    urduExplanation: "ضمیر 'I' کو ہمیشہ کیپٹل لکھیں۔"
  },
  {
    pattern: /\s+([,.:;!?])/g,
    replacement: '$1',
    type: 'punctuation',
    explanation: "No space should appear before a punctuation mark.",
    urduExplanation: "رموز اوقاف (کوما، فل اسٹاپ وغیرہ) سے پہلے خالی جگہ (Space) نہیں دی جاتی۔"
  },
  {
    pattern: /([!?]){2,}/g,
    replacement: '$1',
    type: 'punctuation',
    explanation: "Avoid multiple consecutive exclamation marks or question marks in academic/business writing.",
    urduExplanation: "تحریر میں بار بار سوالیہ یا فجائیہ نشانات لگانا غیر پیشہ ورانہ ہے۔"
  },
  {
    pattern: /\b(However|Furthermore|Therefore|In addition|First of all|On the other hand|Moreover)\s+([A-Za-z])/g,
    replacement: '$1, $2',
    type: 'punctuation',
    explanation: "Introductory transition words require a following comma.",
    urduExplanation: "ابتدائی ربطی الفاظ (Transitions) کے بعد کوما لگانا لازمی ہے۔"
  },

  // ==========================================
  // 5. CLARITY: Redundancy, Conciseness & Flow
  // ==========================================
  {
    pattern: /\bat this moment in time\b/gi,
    replacement: 'currently',
    type: 'clarity',
    explanation: "'At this moment in time' is unnecessarily wordy. Replace with 'currently' or 'at present'.",
    urduExplanation: "طویل اور غیر ضروری عبارت کے بجائے جامع لفظ 'currently' استعمال کریں۔"
  },
  {
    pattern: /\bdue to the fact that\b/gi,
    replacement: 'because',
    type: 'clarity',
    explanation: "Replace verbose phrase 'due to the fact that' with concise conjunction 'because'.",
    urduExplanation: "'due to the fact that' کی جگہ سادہ اور واضح لفظ 'because' لکھیں۔"
  },
  {
    pattern: /\bin order to\b/gi,
    replacement: 'to',
    type: 'clarity',
    explanation: "In most contexts, 'in order to' can be simplified to 'to' without changing the meaning.",
    urduExplanation: "'in order to' کے بجائے محض 'to' لکھنا تحریر کو چست بناتا ہے۔"
  },
  {
    pattern: /\brevert back\b/gi,
    replacement: 'reply',
    type: 'clarity',
    explanation: "'Back' is redundant with 'revert'. Use 'reply' or 'respond' in business correspondence.",
    urduExplanation: "'revert back' غلط ترکیب ہے، صرف 'reply' یا 'respond' کہیں۔"
  },
  {
    pattern: /\bend result\b/gi,
    replacement: 'result',
    type: 'clarity',
    explanation: "Tautology: all results occur at the end. Use simply 'result' or 'outcome'.",
    urduExplanation: "لفظ 'end result' میں تکرار ہے، صرف 'result' لکھنا کافی ہے۔"
  },
  {
    pattern: /\bfuture plans\b/gi,
    replacement: 'plans',
    type: 'clarity',
    explanation: "Plans are inherently future-oriented. Use simply 'plans'.",
    urduExplanation: "منصوبہ ہمیشہ مستقبل کا ہوتا ہے، اس لیے صرف 'plans' درست ہے۔"
  },
  {
    pattern: /\bpast history\b/gi,
    replacement: 'history',
    type: 'clarity',
    explanation: "Redundant phrase: history is always past. Use 'history'.",
    urduExplanation: "'past history' میں غیر ضروری تکرار ہے۔"
  },
  {
    pattern: /\bclose proximity\b/gi,
    replacement: 'near',
    type: 'clarity',
    explanation: "Wordy expression: use 'near' or 'close to'.",
    urduExplanation: "سیدھا اور واضح لفظ 'near' استعمال کریں۔"
  },

  // ==========================================
  // 6. TONE & REGISTER: Formal vs. Informal Consistency
  // ==========================================
  {
    pattern: /\bwarehouse guy\b/gi,
    replacement: 'warehouse supervisor',
    type: 'tone',
    explanation: "Colloquial term 'guy' should be replaced with formal professional designation ('supervisor' or 'personnel').",
    urduExplanation: "پیشہ ورانہ خط و کتابت میں 'guy' کے بجائے 'supervisor' یا 'personnel' استعمال کریں۔"
  },
  {
    pattern: /\bgive us two more days to give report\b/gi,
    replacement: 'grant a two-day extension to submit the report',
    type: 'tone',
    explanation: "Replace direct informal imperative with a polite, professional request for an extension.",
    urduExplanation: "آڈٹ رپورٹ میں 'give report' کے بجائے 'submit the report' کا مؤدبانہ انداز اپنائیں۔"
  },
  {
    pattern: /\bgive report to the firm\b/gi,
    replacement: 'submit the report to the firm',
    type: 'word_choice',
    explanation: "In formal audit and corporate reports, use 'submit the report' rather than 'give report'.",
    urduExplanation: "رپورٹ پیش کرنے کے لیے 'submit the report' مناسب لفظ ہے۔"
  },
  {
    pattern: /\baudit is late\b/gi,
    replacement: 'audit has experienced an unforeseen delay',
    type: 'tone',
    explanation: "Passive, diplomatic framing ('has experienced an unforeseen delay') is preferred over blunt phrasing.",
    urduExplanation: "کاروباری رابطے میں 'audit is late' کے بجائے 'has experienced a delay' زیادہ شائستہ ہے۔"
  },
  {
    pattern: /\bthanks and regards\b/gi,
    replacement: 'Yours sincerely',
    type: 'tone',
    explanation: "In official ICAP letters to external partners or clients, use formal sign-off 'Yours sincerely' or 'Yours faithfully'.",
    urduExplanation: "باضابطہ خط میں 'Yours sincerely' زیادہ مستند ہے۔"
  },
  {
    pattern: /\basap\b/gi,
    replacement: 'at your earliest convenience',
    type: 'tone',
    explanation: "Replace casual acronym 'ASAP' with standard business phrase 'at your earliest convenience'.",
    urduExplanation: "'ASAP' کے بجائے 'at your earliest convenience' باوقار انداز ہے۔"
  },
  {
    pattern: /\bkinds of stuffs\b/gi,
    replacement: 'various matters',
    type: 'tone',
    explanation: "'Stuff' is too informal for academic and business writing. Use 'items', 'matters', or 'materials'.",
    urduExplanation: "'Stuff' غیر رسمی لفظ ہے۔ 'matters' یا 'items' استعمال کریں۔"
  },
  {
    pattern: /\bgonna\b/gi,
    replacement: 'going to',
    type: 'tone',
    explanation: "Slang contraction 'gonna' must be written as 'going to'.",
    urduExplanation: "تحریر میں 'gonna' کے بجائے 'going to' لکھیں۔"
  },
  {
    pattern: /\bwanna\b/gi,
    replacement: 'want to',
    type: 'tone',
    explanation: "Slang contraction 'wanna' must be written as 'want to'.",
    urduExplanation: "تحریر میں 'wanna' کے بجائے 'want to' لکھیں۔"
  },
  {
    pattern: /\bkinda\b/gi,
    replacement: 'somewhat',
    type: 'tone',
    explanation: "Colloquial 'kinda' must be replaced with 'somewhat' or 'rather'.",
    urduExplanation: "غیر رسمی لفظ 'kinda' کے بجائے 'somewhat' لکھیں۔"
  }
];

/**
 * Compare student's answer against the suggested benchmark model answer.
 * Produces insightful comparative notes on length, key information, and tone.
 */
function generateBenchmarkComparisonNotes(
  studentText: string,
  sampleAnswer?: string,
  targetWordCount?: string,
  register: 'formal' | 'informal' | 'general' = 'formal'
): string {
  if (!sampleAnswer || !sampleAnswer.trim()) {
    return 'Evaluated against ICAP English Communication Skills exam criteria for grammatical accuracy, cohesion, and register.';
  }

  const studentWords = studentText.trim() ? studentText.trim().split(/\s+/).filter(Boolean).length : 0;
  const sampleWords = sampleAnswer.trim().split(/\s+/).filter(Boolean).length;

  const notes: string[] = [];

  // 1. Length & Task Fulfillment
  if (studentWords < Math.round(sampleWords * 0.6)) {
    notes.push(`Response length (${studentWords} words) is below the benchmark model answer (${sampleWords} words); expand development of ideas to fully address all task prompts.`);
  } else if (studentWords > Math.round(sampleWords * 1.6)) {
    notes.push(`Response length (${studentWords} words) exceeds standard concise exam length (${sampleWords} words); aim for tighter conciseness without sacrificing essential points.`);
  } else {
    notes.push(`Word count (${studentWords} words) is well balanced and aligns closely with the benchmark model answer (${sampleWords} words).`);
  }

  // 2. Register & Salutation Alignment
  const hasFormalSalutation = /^(Dear\s+[A-Za-z\s.,]+|To\s+the\s+President)/i.test(studentText.trim());
  const sampleHasFormalSalutation = /^(Dear\s+[A-Za-z\s.,]+|To\s+the\s+President)/i.test(sampleAnswer.trim());

  if (register === 'formal' && sampleHasFormalSalutation && !hasFormalSalutation) {
    notes.push(`Missing formal salutation compared to model solution (e.g. 'Dear Sir/Madam,' or 'Dear President,').`);
  }

  const hasFormalSignoff = /(Yours sincerely|Yours faithfully|Kind regards|Best regards)/i.test(studentText.trim());
  const sampleHasFormalSignoff = /(Yours sincerely|Yours faithfully)/i.test(sampleAnswer.trim());

  if (register === 'formal' && sampleHasFormalSignoff && !hasFormalSignoff) {
    notes.push(`Missing appropriate formal institutional sign-off found in model solution (e.g. 'Yours sincerely,').`);
  }

  if (register === 'informal') {
    const hasInformalGreeting = /^(Hi|Hey|Hello\s+[A-Za-z]+|Dear\s+[A-Za-z]+)/i.test(studentText.trim());
    if (!hasInformalGreeting) {
      notes.push(`Model solution uses a friendly casual opening (e.g., 'Hi [Name],') suitable for a peer or friend.`);
    }
  }

  return notes.join(' ');
}

/**
 * Client-Side Linguistic Analyzer
 * Analyzes student's text, locates all spelling, grammar, punctuation, sentence structure,
 * word choice, clarity, and tone mistakes, calculates offsets, and crafts an improved full version.
 */
export function analyzeTextClientSide(
  text: string,
  contextPrompt?: string,
  register: 'formal' | 'informal' | 'general' = 'formal',
  sampleAnswer?: string
): WritingFeedbackResult {
  if (!text || !text.trim()) {
    return {
      originalText: text || '',
      mistakes: [],
      improvedFullAnswer: sampleAnswer || '',
      benchmarkModelAnswer: sampleAnswer,
      benchmarkComparisonNotes: sampleAnswer ? 'No student response was submitted for comparative analysis.' : undefined,
      score: 0,
      bandRating: 'Beginner',
      toneRegister: register === 'formal' ? 'Formal' : 'Informal',
      grammarScore: 0,
      vocabularyScore: 0,
      cohesionScore: 0,
      summaryFeedback: 'No text was submitted for analysis.'
    };
  }

  const mistakes: WritingMistake[] = [];
  let mistakeCounter = 1;

  // 1. Check for Spelling Mistakes
  const wordRegex = /\b[A-Za-z]+(?:'[A-Za-z]+)?\b/g;
  let wordMatch: RegExpExecArray | null;

  while ((wordMatch = wordRegex.exec(text)) !== null) {
    const rawWord = wordMatch[0];
    const lowerWord = rawWord.toLowerCase();
    const startIndex = wordMatch.index;
    const endIndex = startIndex + rawWord.length;

    if (SPELLING_DICTIONARY[lowerWord]) {
      let correctedWord = SPELLING_DICTIONARY[lowerWord];
      // Preserve case
      if (rawWord[0] === rawWord[0].toUpperCase()) {
        correctedWord = correctedWord.charAt(0).toUpperCase() + correctedWord.slice(1);
      }

      mistakes.push({
        id: `spelling-${mistakeCounter++}`,
        original: rawWord,
        replacement: correctedWord,
        type: 'spelling',
        explanation: `Spelling mistake: '${rawWord}' should be correctly spelled as '${correctedWord}'.`,
        urduExplanation: `'${rawWord}' کے ہجے (Spelling) غلط ہیں، درست ہجے '${correctedWord}' ہیں۔`,
        startIndex,
        endIndex
      });
    }
  }

  // 2. Check for Grammar, Sentence Structure, Word Choice, Punctuation, Clarity, and Tone Rules
  for (const rule of GRAMMAR_AND_STYLE_RULES) {
    // If informal register and rule is tone related to contractions, skip
    if (register === 'informal' && rule.type === 'tone' && rule.explanation.includes('contractions')) {
      continue;
    }

    let match: RegExpExecArray | null;
    rule.pattern.lastIndex = 0; // reset regex state
    while ((match = rule.pattern.exec(text)) !== null) {
      const matchText = match[0];
      const startIndex = match.index;
      const endIndex = startIndex + matchText.length;

      // Ensure not already overlapping an existing mistake
      const alreadyCaptured = mistakes.some(
        m => (startIndex >= m.startIndex && startIndex < m.endIndex) ||
             (endIndex > m.startIndex && endIndex <= m.endIndex)
      );

      if (!alreadyCaptured) {
        let replacement = rule.replacement;
        if (rule.replacement === '$1' && match[1]) {
          replacement = match[1];
        } else if (rule.replacement.includes('$1') && match[1]) {
          replacement = rule.replacement.replace('$1', match[1]);
          if (rule.replacement.includes('$2') && match[2]) {
            replacement = replacement.replace('$2', match[2]);
          }
        }

        // Match case if replacement is simple
        if (matchText[0] === matchText[0].toUpperCase() && replacement[0] !== replacement[0].toUpperCase()) {
          replacement = replacement.charAt(0).toUpperCase() + replacement.slice(1);
        }

        mistakes.push({
          id: `rule-${mistakeCounter++}`,
          original: matchText,
          replacement,
          type: rule.type,
          explanation: rule.explanation,
          urduExplanation: rule.urduExplanation,
          startIndex,
          endIndex
        });
      }
    }
  }

  // 3. Check for contractions in formal register
  if (register === 'formal') {
    const formalContractions: Record<string, string> = {
      "don't": "do not",
      "can't": "cannot",
      "won't": "will not",
      "didn't": "did not",
      "isn't": "is not",
      "aren't": "are not",
      "we'll": "we will",
      "i'm": "I am",
      "i've": "I have",
      "they're": "they are",
      "it's": "it is"
    };

    for (const [contraction, expansion] of Object.entries(formalContractions)) {
      const cRegex = new RegExp(`\\b${contraction}\\b`, 'gi');
      let cMatch: RegExpExecArray | null;
      while ((cMatch = cRegex.exec(text)) !== null) {
        const startIndex = cMatch.index;
        const endIndex = startIndex + cMatch[0].length;
        const alreadyCaptured = mistakes.some(
          m => (startIndex >= m.startIndex && startIndex < m.endIndex) ||
               (endIndex > m.startIndex && endIndex <= m.endIndex)
        );

        if (!alreadyCaptured) {
          const raw = cMatch[0];
          let rep = expansion;
          if (raw[0] === raw[0].toUpperCase()) {
            rep = rep.charAt(0).toUpperCase() + rep.slice(1);
          }
          mistakes.push({
            id: `tone-${mistakeCounter++}`,
            original: raw,
            replacement: rep,
            type: 'tone',
            explanation: `Formal register requires avoiding contractions like '${raw}'. Use the full form '${rep}'.`,
            urduExplanation: `باضابطہ تحریر میں شارٹ فارم (Contraction) سے پرہیز کریں اور '${rep}' مکمل لکھیں۔`,
            startIndex,
            endIndex
          });
        }
      }
    }
  }

  // 4. Check for missing terminal punctuation
  const trimmed = text.trim();
  if (trimmed.length > 0 && !/[.!?]$/.test(trimmed)) {
    const lastChar = trimmed.slice(-1);
    const lastIndex = text.lastIndexOf(lastChar);
    mistakes.push({
      id: `punct-${mistakeCounter++}`,
      original: lastChar,
      replacement: `${lastChar}.`,
      type: 'punctuation',
      explanation: 'Sentence lacks terminal punctuation. Add a concluding period.',
      urduExplanation: 'جملے کے اختتام پر فل اسٹاپ (.) لگانا لازمی ہے۔',
      startIndex: lastIndex,
      endIndex: lastIndex + 1
    });
  }

  // Sort mistakes by startIndex
  mistakes.sort((a, b) => a.startIndex - b.startIndex);

  // 5. Generate the Improved Full Answer
  let improvedFullAnswer = text;
  const reversedMistakes = [...mistakes].sort((a, b) => b.startIndex - a.startIndex);
  for (const m of reversedMistakes) {
    improvedFullAnswer =
      improvedFullAnswer.slice(0, m.startIndex) +
      m.replacement +
      improvedFullAnswer.slice(m.endIndex);
  }

  // Clean up punctuation and spacing in improved version
  improvedFullAnswer = improvedFullAnswer
    .replace(/\s+([.,!?;:])/g, '$1')
    .replace(/([.,!?;:])(?=[A-Za-z])/g, '$1 ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  // Ensure capitalization of sentence starts
  improvedFullAnswer = improvedFullAnswer.replace(/(^\s*|[.!?]\s+)([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase());

  // Calculate scores based on error density and task requirements
  const totalMistakes = mistakes.length;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  let baseScore = 94;
  baseScore -= totalMistakes * 5;
  if (baseScore < 45) baseScore = 45;
  if (baseScore > 98) baseScore = 98;

  let bandRating = 'CA Professional';
  if (baseScore < 60) bandRating = 'Beginner';
  else if (baseScore < 78) bandRating = 'Intermediate';

  const grammarErrors = mistakes.filter(m => m.type === 'grammar' || m.type === 'sentence_structure').length;
  const spellingErrors = mistakes.filter(m => m.type === 'spelling').length;
  const toneErrors = mistakes.filter(m => m.type === 'tone' || m.type === 'word_choice').length;
  const clarityErrors = mistakes.filter(m => m.type === 'clarity').length;

  const grammarScore = Math.max(50, 95 - grammarErrors * 9);
  const vocabularyScore = Math.max(50, 95 - (spellingErrors * 8 + toneErrors * 5));
  const cohesionScore = Math.max(60, 90 - (totalMistakes * 3 + clarityErrors * 4));

  const detectedCategories: string[] = [];
  if (grammarErrors > 0) detectedCategories.push(`${grammarErrors} grammar/structure`);
  if (spellingErrors > 0) detectedCategories.push(`${spellingErrors} spelling`);
  if (toneErrors > 0) detectedCategories.push(`${toneErrors} word choice/tone`);
  if (clarityErrors > 0) detectedCategories.push(`${clarityErrors} clarity`);

  const summaryFeedback = totalMistakes === 0
    ? 'Outstanding response! Demonstrates grammatical accuracy, appropriate vocabulary choice, and compliant tone register matching the benchmark model.'
    : `Identified ${totalMistakes} writing ${totalMistakes === 1 ? 'issue' : 'issues'} (${detectedCategories.join(', ')}). Review the highlighted errors below and examine how the improved version aligns with the suggested answer.`;

  const urduSummary = totalMistakes === 0
    ? 'شاندار تحریر! گرامر اور الفاظ کا چناؤ بالکل درست ہے۔'
    : `آپ کی تحریر میں ${totalMistakes} غلطیاں نوٹ کی گئی ہیں۔ ہر غلطی کی تصحیح اور مکمل بہتر ورژن نیچے فراہم کر دیا گیا ہے۔`;

  const benchmarkNotes = generateBenchmarkComparisonNotes(text, sampleAnswer, undefined, register);

  return {
    originalText: text,
    mistakes,
    improvedFullAnswer,
    benchmarkModelAnswer: sampleAnswer,
    benchmarkComparisonNotes: benchmarkNotes,
    score: baseScore,
    bandRating,
    toneRegister: register === 'formal' ? 'Formal' : register === 'informal' ? 'Informal' : 'Formal',
    grammarScore,
    vocabularyScore,
    cohesionScore,
    summaryFeedback,
    urduSummary
  };
}

/**
 * Async Writing Evaluation
 * Leverages Gemini 2.5 Flash if available, augmented with client-side fallback
 * to guarantee instantaneous, robust mistake detection and improved full answers.
 */
export async function analyzeWritingWithMistakes(
  text: string,
  scenarioContext?: { title?: string; prompt?: string; recipient?: string; sampleAnswer?: string },
  targetRegister: 'formal' | 'informal' | 'general' = 'formal'
): Promise<WritingFeedbackResult> {
  const fallback = analyzeTextClientSide(
    text,
    scenarioContext?.prompt,
    targetRegister,
    scenarioContext?.sampleAnswer
  );

  if (!text || !text.trim()) {
    return fallback;
  }

  const systemPrompt = `You are a Senior Lead Examiner for ICAP English Communication Skills (ECS) and Aptis General Writing.
Carefully examine the student's submitted response and COMPARE IT with the suggested benchmark model answer.
Your mission is to perform a thorough, uncompromising error analysis:
1. Detect and identify ALL mistakes without missing any:
   - Grammar (tense consistency, subject-verb agreement, prepositions, articles, passive voice)
   - Spelling (misspelled words, typos)
   - Word Choice (imprecise or inappropriate diction compared to the benchmark answer)
   - Sentence Structure (run-ons, comma splices, fragments, awkward syntax)
   - Punctuation (capitalization of 'I', commas, missing periods, apostrophes)
   - Clarity (redundant expressions, ambiguous phrases, wordy sentences)
   - Tone (formal vs. informal register compliance, salutations, sign-offs)
2. For each mistake, specify:
   - original: the EXACT substring from student text containing the mistake (what is wrong)
   - replacement: the clean, corrected replacement snippet (corrected version)
   - type: "grammar" | "spelling" | "punctuation" | "word_choice" | "sentence_structure" | "clarity" | "tone"
   - explanation: a specific, actionable reason explaining why this is wrong and how the correction improves it
   - urduExplanation: an Urdu explanation of the rule
3. Provide an "improvedFullAnswer": a polished, pristine, fully improved version of the entire student draft that fixes all issues while preserving the student's meaning.
4. Provide "benchmarkComparisonNotes": 2-3 specific sentences analyzing how the student's answer compares with the suggested answer in terms of content coverage, vocabulary level, and structural coherence.
5. Provide score (0-100), bandRating ("Beginner" | "Intermediate" | "CA Professional"), toneRegister ("Formal" | "Informal"), grammarScore, vocabularyScore, cohesionScore, summaryFeedback, and urduSummary.

CRITICAL: Return ONLY valid JSON matching this schema:
{
  "mistakes": [
    {
      "original": "exact error string",
      "replacement": "corrected string",
      "type": "grammar" | "spelling" | "punctuation" | "word_choice" | "sentence_structure" | "clarity" | "tone",
      "explanation": "concise explanation",
      "urduExplanation": "اردو وضاحت"
    }
  ],
  "improvedFullAnswer": "Complete rewritten and polished answer...",
  "benchmarkComparisonNotes": "Comparison with suggested answer...",
  "score": 82,
  "bandRating": "CA Professional",
  "toneRegister": "Formal",
  "grammarScore": 85,
  "vocabularyScore": 82,
  "cohesionScore": 80,
  "summaryFeedback": "Specific feedback",
  "urduSummary": "اردو خلاصہ"
}`;

  const userPrompt = `Context/Prompt: "${scenarioContext?.title || ''} - ${scenarioContext?.prompt || 'Business & Exam Writing'}"
Target Register: ${targetRegister}
Suggested Benchmark Model Answer:
"""
${scenarioContext?.sampleAnswer || 'N/A'}
"""
Student Submitted Text:
"""
${text}
"""`;

  try {
    const aiResponse = await callGeminiAPI<any>(systemPrompt, userPrompt, null);

    const rawMistakes = Array.isArray(aiResponse?.mistakes)
      ? aiResponse.mistakes
      : (Array.isArray(aiResponse?.errors)
        ? aiResponse.errors
        : (Array.isArray(aiResponse?.sentences) ? aiResponse.sentences : []));

    const improvedAnswer = aiResponse?.improvedFullAnswer ||
      aiResponse?.improvedAnswer ||
      aiResponse?.improvedText ||
      aiResponse?.modelAnswer ||
      aiResponse?.revisedAnswer ||
      fallback.improvedFullAnswer;

    if (aiResponse && (rawMistakes.length > 0 || improvedAnswer || typeof aiResponse.score === 'number' || aiResponse.score)) {
      // Map and locate indices in original text
      const mappedMistakes: WritingMistake[] = [];
      let mIdx = 1;

      for (const m of rawMistakes) {
        const originalSnippet = m.original || m.originalSentence || m.error || m.mistake || m.text || '';
        const replacementSnippet = m.replacement || m.correctedSentence || m.correction || m.suggested || m.suggestion || '';
        if (!originalSnippet || !replacementSnippet) continue;
        const startIndex = text.indexOf(originalSnippet);
        const endIndex = startIndex !== -1 ? startIndex + originalSnippet.length : 0;

        let detectedType: WritingMistakeType = 'grammar';
        const rawTypeStr = (m.type || m.errorType || '').toLowerCase();
        if (rawTypeStr.includes('spell')) detectedType = 'spelling';
        else if (rawTypeStr.includes('punct')) detectedType = 'punctuation';
        else if (rawTypeStr.includes('word') || rawTypeStr.includes('vocab')) detectedType = 'word_choice';
        else if (rawTypeStr.includes('struct') || rawTypeStr.includes('syntax') || rawTypeStr.includes('run-on')) detectedType = 'sentence_structure';
        else if (rawTypeStr.includes('clar') || rawTypeStr.includes('redund')) detectedType = 'clarity';
        else if (rawTypeStr.includes('tone') || rawTypeStr.includes('regis')) detectedType = 'tone';

        mappedMistakes.push({
          id: `ai-${mIdx++}`,
          original: originalSnippet,
          replacement: replacementSnippet,
          type: detectedType,
          explanation: m.explanation || `Corrected '${originalSnippet}' to '${replacementSnippet}'.`,
          urduExplanation: m.urduExplanation,
          startIndex: startIndex !== -1 ? startIndex : 0,
          endIndex: endIndex !== -1 ? endIndex : originalSnippet.length
        });
      }

      // Merge with any client-side errors that might have been missed by AI
      for (const clientMistake of fallback.mistakes) {
        const alreadyExists = mappedMistakes.some(
          m => m.original.toLowerCase() === clientMistake.original.toLowerCase()
        );
        if (!alreadyExists) {
          mappedMistakes.push(clientMistake);
        }
      }

      mappedMistakes.sort((a, b) => a.startIndex - b.startIndex);

      const parsedScore = typeof aiResponse.score === 'number'
        ? aiResponse.score
        : (parseInt(aiResponse.score, 10) || fallback.score);

      return {
        originalText: text,
        mistakes: mappedMistakes.length > 0 ? mappedMistakes : fallback.mistakes,
        improvedFullAnswer: improvedAnswer,
        benchmarkModelAnswer: scenarioContext?.sampleAnswer || fallback.benchmarkModelAnswer,
        benchmarkComparisonNotes: aiResponse.benchmarkComparisonNotes || fallback.benchmarkComparisonNotes,
        score: parsedScore,
        bandRating: aiResponse.bandRating || fallback.bandRating,
        toneRegister: aiResponse.toneRegister || fallback.toneRegister,
        grammarScore: typeof aiResponse.grammarScore === 'number' ? aiResponse.grammarScore : fallback.grammarScore,
        vocabularyScore: typeof aiResponse.vocabularyScore === 'number' ? aiResponse.vocabularyScore : fallback.vocabularyScore,
        cohesionScore: typeof aiResponse.cohesionScore === 'number' ? aiResponse.cohesionScore : fallback.cohesionScore,
        summaryFeedback: aiResponse.summaryFeedback || aiResponse.summary || fallback.summaryFeedback,
        urduSummary: aiResponse.urduSummary || aiResponse.urduExplanation || fallback.urduSummary
      };
    }
  } catch (err) {
    console.warn('[analyzeWritingWithMistakes] Gemini API analysis fallback to client analysis:', err);
  }

  return fallback;
}

/**
 * High-level helper to evaluate an exam writing task (Part 1, 2, 3, 4A, 4B)
 */
export async function evaluateExamWritingTask(
  studentText: string,
  sampleAnswer: string,
  taskInfo: {
    taskName: string;
    prompt: string;
    targetWordCount?: string;
    register?: 'formal' | 'informal' | 'general';
  }
): Promise<WritingFeedbackResult> {
  return analyzeWritingWithMistakes(
    studentText,
    {
      title: taskInfo.taskName,
      prompt: taskInfo.prompt,
      sampleAnswer: sampleAnswer
    },
    taskInfo.register || 'formal'
  );
}

/**
 * Synchronous instant evaluation helper for initial render
 */
export function evaluateExamWritingTaskSync(
  studentText: string,
  sampleAnswer: string,
  taskInfo: {
    taskName: string;
    prompt: string;
    targetWordCount?: string;
    register?: 'formal' | 'informal' | 'general';
  }
): WritingFeedbackResult {
  return analyzeTextClientSide(
    studentText,
    taskInfo.prompt,
    taskInfo.register || 'formal',
    sampleAnswer
  );
}
