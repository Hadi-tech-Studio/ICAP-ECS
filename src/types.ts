export interface GrammarQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  englishExplanation: string;
  urduExplanation: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface ExamAttemptRecord {
  id: string;
  testSetId: string;
  title: string;
  timestamp: number;
  dateFormatted: string;
  testMode: 'full' | 'core' | 'reading' | 'writing';
  questionIds: string[];
  topicsCovered: string[];
  difficultyBreakdown: { easy: number; medium: number; hard: number };
  scorePercentage?: number;
  completed?: boolean;
}

export interface VocabWordMatchItem {
  id: string;
  targetWord: string;
  correctMatch: string;
  options: string[];
  explanation: string;
  urduExplanation: string;
}

export interface VocabDefinitionItem {
  id: string;
  definition: string;
  correctWord: string;
  options: string[];
  explanation: string;
  urduExplanation: string;
}

export interface VocabCollocationItem {
  id: string;
  sentence: string; // contains blank ______
  options: string[];
  correctIndex: number;
  explanation: string;
  urduExplanation: string;
}

export interface AptisCoreModule {
  grammarQuestions: GrammarQuestion[]; // 25 questions
  vocabWordMatching: VocabWordMatchItem[]; // 5 questions (Task 1)
  vocabDefinitions: VocabDefinitionItem[]; // 5 questions (Task 2)
  vocabCollocations: VocabCollocationItem[]; // 5 questions (Task 3)
  vocabSentenceCompletion: VocabCollocationItem[]; // 5 questions (Task 4)
  vocabContextMatching: VocabWordMatchItem[]; // 5 questions (Task 5)
}

// Reading Module: 4 sections
export interface ReadingSection1 {
  id: string;
  title: string;
  introduction: string;
  paragraphs: {
    textBefore: string;
    gapId: string;
    options: string[];
    correctIndex: number;
    textAfter?: string;
  }[];
  explanations: Record<string, { english: string; urdu: string }>;
}

export interface ReadingSection2 {
  id: string;
  title: string;
  topic: string;
  correctOrder: number[]; // e.g. [0, 2, 4, 1, 3, 5]
  sentences: string[]; // 6 jumbled sentences
  explanation: string;
  urduExplanation: string;
}

export interface ReadingSection3 {
  id: string;
  title: string;
  topic: string;
  people: {
    id: string; // 'A', 'B', 'C', 'D'
    name: string;
    description: string;
  }[];
  questions: {
    id: string;
    statement: string;
    correctPersonId: string; // 'A', 'B', 'C', or 'D'
    explanation: string;
    urduExplanation: string;
  }[];
}

export interface ReadingSection4 {
  id: string;
  title: string;
  topic: string;
  introduction: string;
  headings: string[]; // available headings
  paragraphs: {
    id: string;
    paragraphNumber: number;
    text: string;
    correctHeadingIndex: number;
    explanation: string;
    urduExplanation: string;
  }[];
}

export interface AptisReadingModule {
  section1: ReadingSection1;
  section2: ReadingSection2;
  section3: ReadingSection3;
  section4: ReadingSection4;
}

// Writing Module: 4 parts linked by context
export interface WritingPart1 {
  id: string;
  context: string;
  questions: {
    id: string;
    prompt: string;
    maxWords: number; // usually 1-5
    sampleAnswer: string;
  }[];
}

export interface WritingPart2 {
  id: string;
  formName: string;
  prompt: string;
  minWords: number; // 20
  maxWords: number; // 30
  sampleAnswer: string;
}

export interface WritingPart3 {
  id: string;
  clubName: string;
  context: string;
  memberChats: {
    id: string;
    memberName: string;
    avatarInitials: string;
    message: string;
    minWords: number; // 30
    maxWords: number; // 40
    sampleAnswer: string;
  }[];
}

export interface WritingPart4 {
  id: string;
  clubName: string;
  contextNotice: string;
  scenarioTopic?: string;
  communicationPurpose?: string;
  recipientTitle?: string;
  recipientName?: string;
  friendName?: string;
  taskA: {
    prompt: string; // informal email to friend
    minWords: number; // 40
    maxWords: number; // 60
    sampleAnswer: string;
  };
  taskB: {
    prompt: string; // formal email to authority/recipient
    minWords: number; // 120
    maxWords: number; // 150
    sampleAnswer: string;
  };
}

export interface AptisWritingModule {
  themeName: string;
  part1: WritingPart1;
  part2: WritingPart2;
  part3: WritingPart3;
  part4: WritingPart4;
}

export interface AptisTestSet {
  id: string;
  title: string;
  description: string;
  core: AptisCoreModule;
  reading: AptisReadingModule;
  writing: AptisWritingModule;
}

export interface MarkingScaleLevel {
  band: string; // 'B2', 'B1', 'A2', 'A1', 'A0'
  numericScore: string;
  grammarDescription: string;
  vocabularyDescription: string;
  readingDescription: string;
  writingDescription: string;
}

export interface Question {
  id: string;
  module: 'grammar' | 'reading' | 'writing';
  category: string;
  passage?: string;
  question: string;
  options: string[];
  correctIndex: number; // 0, 1, 2, or 3
  englishExplanation: string;
  urduExplanation: string; // Urdu script & Roman Urdu
}

export interface WritingScenario {
  id: string;
  title: string;
  role: string;
  recipient: string;
  scenario: string;
  requiredWordCount: { min: number; max: number };
  keyPoints: string[];
  sampleModelAnswer?: string;
}

export interface SentenceFeedback {
  originalSentence: string;
  correctedSentence: string;
  errorType: string;
  explanation: string;
  urduExplanation?: string;
}

export interface WritingEvaluation {
  score: number; // 0 - 100
  bandRating: 'Beginner' | 'Intermediate' | 'CA Professional' | 'B1' | 'B2' | 'C1';
  toneRegister: 'Formal' | 'Informal' | 'Mixed';
  summaryFeedback: string;
  urduSummary?: string;
  grammarScore: number;
  vocabularyScore: number;
  cohesionScore: number;
  sentences: SentenceFeedback[];
}

export interface AudioDialogue {
  id: string;
  title: string;
  speaker: string;
  duration: string;
  category: string;
  script: string;
  highlightedTerms: { term: string; definition: string; urdu: string }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    urduExplanation: string;
  }[];
}

export interface Flashcard {
  id: string;
  phrase: string;
  pronunciation: string;
  category: 'Audit & Assurance' | 'Financial Reporting' | 'Business Ethics' | 'Professional Communication' | 'Corporate Law';
  definition: string;
  exampleSentence: string;
  urduMeaning: string;
  romanUrdu: string;
  mastered?: boolean;
}

export interface TopicImprovement {
  topic: string;
  category: 'Grammar' | 'Vocabulary' | 'Reading' | 'Writing' | string;
  incorrectCount: number;
  totalQuestions: number;
  accuracy: number;
  status: 'Weak' | 'Moderate' | 'Strong';
  recommendation: string;
}

export interface ExamResult {
  id: string;
  testSetId?: string;
  testTitle?: string;
  testMode?: 'full' | 'core' | 'reading' | 'writing';
  date: string;
  timestamp?: number;
  timeSpentSeconds: number;
  grammarScore: number; // out of 25
  vocabScore: number; // out of 25
  readingScore: number; // out of 50
  writingScore: number; // out of 50
  totalScore: number; // marks obtained
  maxScore?: number; // maximum possible marks (50 or 150)
  percentage: number;
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C';
  isPassed: boolean;
  correctAnswers?: number;
  incorrectAnswers?: number;
  unansweredQuestions?: number;
  totalQuestions?: number;
  categoryScores?: Record<string, { correct: number; total: number }>;
  topicsNeedingImprovement?: TopicImprovement[];
  sectionBreakdown?: {
    grammar?: { correct: number; total: number; marks: number; maxMarks: number };
    vocab?: { correct: number; total: number; marks: number; maxMarks: number };
    reading?: { correct: number; total: number; marks: number; maxMarks: number };
    writing?: { marks: number; maxMarks: number; tasksCompleted?: number; totalTasks?: number };
  };
}

export interface StudentExamAnswers {
  grammarAnswers: Record<string, number>;
  vocabMatchingAnswers: Record<string, string>;
  vocabDefAnswers: Record<string, string>;
  vocabCollocAnswers: Record<string, number>;
  vocabSentenceAnswers: Record<string, number>;
  vocabContextAnswers: Record<string, string>;
  readingSec1Answers: Record<string, number>;
  readingSec2Order: number[];
  readingSec3Answers: Record<string, string>;
  readingSec4Answers: Record<string, number>;
  writingPart1Answers?: Record<string, string>;
  writingPart1?: Record<string, string>;
  writingPart2Answer?: string;
  writingPart2?: string;
  writingPart3Answers?: Record<string, string>;
  writingPart3?: Record<string, string>;
  writingPart4AAnswer?: string;
  writingPart4A?: string;
  writingPart4BAnswer?: string;
  writingPart4B?: string;
}

export interface VideoLecture {
  id: string;
  title: string;
  topic: string;
  youtubeId: string;
  duration: string;
  description: string;
  aiNotes?: string[];
}

export type BookLevel = 'ICAP ECS' | 'Aptis General' | 'CEFR B2/C1' | 'All ECS Modules';
export type BookSubject = 
  | 'Comprehensive Master Notes'
  | 'Aptis General Core Skills'
  | 'Aptis General Reading Skills'
  | 'Aptis General Writing Skills'
  | 'Grammar Foundation'
  | 'C1 Advanced Rules'
  | 'Syntax Manual'
  | 'Vocabulary Mastery'
  | 'Writing Skills & Templates'
  | 'Reading Skills & Cohesion'
  | 'Grammar Foundation & C1 Rules'
  | 'Vocabulary Mastery & Word Pairs'
  | 'Writing Skills & Model Emails';

export type BookType = 'Study Text' | 'Handbook' | 'Summary Notes' | 'Cheat Sheet' | 'Examiner Report';

export interface BookChapter {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  readingTimeMinutes: number;
  wordCount: number;
  keyTakeaways: string[];
  urduSummary?: string;
  contentMarkdown: string;
  examTips?: string[];
  practiceQuestions?: {
    question: string;
    answer: string;
    explanation: string;
  }[];
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  edition: string;
  level: BookLevel;
  subject: BookSubject;
  type: BookType;
  coverGradient: string;
  badgeColor: string;
  totalPages: number;
  totalChapters: number;
  estimatedReadHours: number;
  rating: number;
  downloadsCount: number;
  description: string;
  urduOverview?: string;
  tags: string[];
  publishedDate: string;
  chapters: BookChapter[];
  pdfUrl?: string; // Optional external/simulated link
}

export interface BookBookmark {
  id: string;
  bookId: string;
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  bookTitle: string;
  snippet: string;
  note?: string;
  createdAt: string;
}

export interface BookHighlight {
  id: string;
  bookId: string;
  chapterId: string;
  text: string;
  color: 'yellow' | 'green' | 'blue' | 'purple';
  createdAt: string;
}

export interface UserReadingProgress {
  bookId: string;
  lastReadChapterId: string;
  completedChapterIds: string[];
  percentCompleted: number;
  lastReadAt: string;
}

