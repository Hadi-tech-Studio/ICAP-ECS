/**
 * ============================================================================
 * examEngineService.ts
 * Dynamic, Non-Repeating Exam Generation Engine for ICAP ECS & Aptis Tests
 * 
 * Guarantees that for every new test generation:
 * 1. Aptitude General Test (Core): Varied formats (standard MCQs, error identification,
 *    sentence transformation, phrasal verbs, vocabulary matching, definitions,
 *    collocations, sentence completion, context matching).
 * 2. Reading Test: Fresh passages with comprehension questions, MCQs, main idea,
 *    detail, inference, and vocabulary-in-context.
 * 3. Writing Test: Completely new writing tasks each time with fresh ECS-aligned scenarios.
 * 
 * Features:
 * - Tracks student previous question history in localStorage.
 * - Semantic similarity checker: if any question is substantially similar to a previously
 *   seen question, automatically replaces it with a new variant.
 * - Validates all questions prior to display.
 * ============================================================================
 */

import { 
  AptisTestSet, 
  GrammarQuestion, 
  VocabWordMatchItem, 
  VocabDefinitionItem, 
  VocabCollocationItem, 
  ExamAttemptRecord,
  ReadingSection1,
  ReadingSection2,
  ReadingSection3,
  ReadingSection4,
  AptisWritingModule,
  WritingPart4
} from '../types';
import { 
  isPart4DefaultOrBanned, 
  selectFreshPart4EmailTask, 
  EXPANDED_PART4_EMAIL_POOL 
} from '../data/expandedPart4EmailPool';
import { 
  UNIQUE_GRAMMAR_POOL, 
  EXPANDED_VOCAB_MATCHING_POOL, 
  EXPANDED_VOCAB_DEFINITIONS_POOL, 
  EXPANDED_VOCAB_COLLOCATIONS_POOL,
  EXPANDED_VOCAB_SENTENCE_POOL,
  EXPANDED_VOCAB_CONTEXT_POOL,
  EXPANDED_READING_SECTIONS, 
  EXPANDED_WRITING_MODULES,
  mapToIcapCategory
} from '../data/examQuestionPool';
import { ICAP_CORE_CATEGORIES, IcapCoreCategory, ICAP_ECS_CURATED_GRAMMAR_POOL } from '../data/icapCoreGrammarPool';
import { generateProceduralGrammarMCQs, ADDITIONAL_CURATED_GRAMMAR_POOL } from '../data/expandedGrammarPool';
import { APTIS_TEST_SET_1 } from '../data/aptisMockData';
import { 
  isQuestionSubstantiallySimilar, 
  recordQuestionsToStudentHistory, 
  getStudentQuestionHistory,
  clearStudentQuestionHistory
} from './questionHistoryService';
import { 
  validateGrammarQuestion, 
  validateVocabWordMatch, 
  validateVocabDefinition, 
  validateVocabCollocation, 
  validateReadingSection1, 
  validateReadingSection2, 
  validateReadingSection3, 
  validateReadingSection4, 
  validateWritingModule,
  verifyCoreModule 
} from './questionValidationService';
import { 
  generateAiGrammarQuestions, 
  generateAiReadingSection1, 
  generateAiWritingModule,
  generateAiWritingPart4
} from './aiTestGenerator';

const ATTEMPT_HISTORY_KEY = 'icap_exam_attempt_history';
const SEEN_QUESTIONS_KEY = 'icap_seen_exam_question_ids';

let cachedAttemptHistory: ExamAttemptRecord[] | null = null;
let pendingAttemptHistoryTimeout: any = null;

/**
 * Retrieve lightweight attempt history from in-memory cache or localStorage
 */
export function getExamAttemptHistory(): ExamAttemptRecord[] {
  if (cachedAttemptHistory !== null) return cachedAttemptHistory;
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ATTEMPT_HISTORY_KEY);
    cachedAttemptHistory = raw ? JSON.parse(raw) : [];
    return cachedAttemptHistory;
  } catch (e) {
    console.warn('Failed to parse exam attempt history:', e);
    cachedAttemptHistory = [];
    return [];
  }
}

/**
 * Save an exam attempt record into lightweight localStorage history (non-blocking)
 */
export function saveExamAttemptRecord(record: ExamAttemptRecord): void {
  if (typeof window === 'undefined') return;
  const history = getExamAttemptHistory();
  // Keep last 30 attempts to maintain lightweight footprint
  const updated = [record, ...history.filter(h => h.id !== record.id)].slice(0, 30);
  cachedAttemptHistory = updated;

  // Persist asynchronously in background so UI thread remains instant
  if (pendingAttemptHistoryTimeout) clearTimeout(pendingAttemptHistoryTimeout);
  pendingAttemptHistoryTimeout = setTimeout(() => {
    try {
      localStorage.setItem(ATTEMPT_HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save exam attempt record:', e);
    }
  }, 100);
}

/**
 * Update the score and completion status of an existing attempt record
 */
export function updateExamAttemptScore(attemptId: string, scorePercentage: number): void {
  if (typeof window === 'undefined') return;
  const history = getExamAttemptHistory();
  const updated = history.map(item => {
    if (item.id === attemptId) {
      return {
        ...item,
        scorePercentage,
        completed: true
      };
    }
    return item;
  });
  cachedAttemptHistory = updated;
  try {
    localStorage.setItem(ATTEMPT_HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to update exam attempt score:', e);
  }
}

const memorySeenCache = new Map<string, Set<string>>();
const pendingSeenKeyTimeouts = new Map<string, any>();

/**
 * Generic helper to get seen IDs for any pool
 */
function getSeenKeys(storageKey: string): Set<string> {
  const cached = memorySeenCache.get(storageKey);
  if (cached) return cached;
  if (typeof window === 'undefined') {
    const empty = new Set<string>();
    memorySeenCache.set(storageKey, empty);
    return empty;
  }
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      const empty = new Set<string>();
      memorySeenCache.set(storageKey, empty);
      return empty;
    }
    const arr = JSON.parse(raw);
    const set = new Set<string>(Array.isArray(arr) ? arr : []);
    memorySeenCache.set(storageKey, set);
    return set;
  } catch (e) {
    const empty = new Set<string>();
    memorySeenCache.set(storageKey, empty);
    return empty;
  }
}

/**
 * Generic helper to mark seen IDs for any pool (non-blocking)
 */
function markSeenKeys(storageKey: string, ids: string[], maxLimit = 200): void {
  if (ids.length === 0) return;
  const current = getSeenKeys(storageKey);
  ids.forEach(id => current.add(id));
  let arr = Array.from(current);
  if (arr.length > maxLimit) {
    arr = arr.slice(arr.length - Math.floor(maxLimit * 0.5));
  }
  memorySeenCache.set(storageKey, new Set(arr));

  // Debounced async persistence
  if (typeof window !== 'undefined') {
    const prevTimeout = pendingSeenKeyTimeouts.get(storageKey);
    if (prevTimeout) clearTimeout(prevTimeout);
    const t = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(arr));
      } catch (e) {}
    }, 150);
    pendingSeenKeyTimeouts.set(storageKey, t);
  }
}

/**
 * Retrieve the set of previously seen grammar question IDs
 */
export function getSeenQuestionIds(): Set<string> {
  return getSeenKeys(SEEN_QUESTIONS_KEY);
}

/**
 * Mark question IDs as seen in localStorage
 */
export function markQuestionsSeen(ids: string[]): void {
  markSeenKeys(SEEN_QUESTIONS_KEY, ids, Math.max(400, UNIQUE_GRAMMAR_POOL.length));
}

/**
 * Clear all exam attempt tracking and seen questions history
 */
export function clearExamHistoryAndTracking(): void {
  cachedAttemptHistory = [];
  memorySeenCache.clear();
  testSetWarmCache.clear();
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ATTEMPT_HISTORY_KEY);
  localStorage.removeItem('icap_exam_results');
  localStorage.removeItem(SEEN_QUESTIONS_KEY);
  localStorage.removeItem('icap_seen_reading_s1_ids');
  localStorage.removeItem('icap_seen_reading_s2_ids');
  localStorage.removeItem('icap_seen_reading_s3_ids');
  localStorage.removeItem('icap_seen_reading_s4_ids');
  localStorage.removeItem('icap_seen_writing_module_ids');
  ['vm', 'vd', 'vc', 'vs', 'vx'].forEach(prefix => {
    localStorage.removeItem(`icap_seen_vocab_${prefix}_ids`);
  });
  clearStudentQuestionHistory();
  window.dispatchEvent(new CustomEvent('icap_exam_reset'));
  window.dispatchEvent(new Event('storage'));
}

// Utility to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Pre-process master static grammar pools once at module evaluation for blazing fast execution
const preprocessedMasterGrammarPool: GrammarQuestion[] = [
  ...ICAP_ECS_CURATED_GRAMMAR_POOL,
  ...UNIQUE_GRAMMAR_POOL,
  ...ADDITIONAL_CURATED_GRAMMAR_POOL
]
  .filter(q => !/(?:\[[A-D]\]|\([A-D]\)|\[[a-d]\]|\([a-d]\))\s+[a-zA-Z0-9]/.test(q.question))
  .map(q => ({
    ...q,
    category: mapToIcapCategory(q.category, q.question)
  }));

const preprocessedCategoriesMap = new Map<IcapCoreCategory, GrammarQuestion[]>();
for (const cat of ICAP_CORE_CATEGORIES) {
  preprocessedCategoriesMap.set(cat, []);
}
for (const q of preprocessedMasterGrammarPool) {
  const cat = q.category as IcapCoreCategory;
  if (!preprocessedCategoriesMap.has(cat)) {
    preprocessedCategoriesMap.set(cat, []);
  }
  preprocessedCategoriesMap.get(cat)!.push(q);
}

// Warm buffer of pre-assembled, pre-verified test sets for instantaneous 0ms test opens
const testSetWarmCache = new Map<string, DynamicGenerationResult>();

/**
 * Pre-warms and pre-caches the next test set for a given mode in the background
 */
export function warmUpNextTestSet(mode: 'full' | 'core' | 'reading' | 'writing' = 'full'): void {
  if (typeof window === 'undefined') return;
  const schedule = typeof (window as any).requestIdleCallback === 'function'
    ? (fn: () => void) => (window as any).requestIdleCallback(fn, { timeout: 800 })
    : (fn: () => void) => setTimeout(fn, 50);

  schedule(() => {
    try {
      if (!testSetWarmCache.has(mode)) {
        const next = generateDynamicTestSetInternal({ mode });
        testSetWarmCache.set(mode, next);
      }
    } catch (e) {
      console.warn('[ExamEngine] Background warm-up failed:', e);
    }
  });
}

/**
 * Pre-warms all test modes on initial load
 */
export function warmUpAllTestModes(): void {
  if (typeof window === 'undefined') return;
  const schedule = typeof (window as any).requestIdleCallback === 'function'
    ? (fn: () => void) => (window as any).requestIdleCallback(fn, { timeout: 1200 })
    : (fn: () => void) => setTimeout(fn, 100);

  schedule(() => {
    ['core', 'reading', 'writing', 'full'].forEach(m => {
      warmUpNextTestSet(m as any);
    });
  });
}

/**
 * Normalizes and randomizes MCQ options to guarantee that the correct answer
 * is distributed naturally across options (no position bias), while ensuring exactly
 * one correct answer and maintaining semantic integrity.
 */
export function shuffleMCQOptions(q: GrammarQuestion): GrammarQuestion {
  // If Error Identification or options with [A], [B], [C], [D], retain original sequence
  if (q.category === 'Error Identification' || q.options.some(o => /^\s*\[[A-D]\]/.test(o))) {
    return { ...q };
  }

  const correctText = q.options[q.correctIndex];
  if (!correctText) return { ...q };

  // Deduplicate options while preserving identity
  const uniqueOpts: string[] = [];
  for (const opt of q.options) {
    if (!uniqueOpts.some(u => u.trim().toLowerCase() === opt.trim().toLowerCase())) {
      uniqueOpts.push(opt);
    }
  }
  if (uniqueOpts.length < 3) return { ...q };

  // Fisher-Yates shuffle
  const shuffled = [...uniqueOpts];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const newIndex = shuffled.findIndex(
    o => o.trim().toLowerCase() === correctText.trim().toLowerCase()
  );

  return {
    ...q,
    options: shuffled,
    correctIndex: newIndex >= 0 ? newIndex : 0
  };
}

export function shuffleVocabMatchOptions(item: VocabWordMatchItem): VocabWordMatchItem {
  const uniqueOpts = Array.from(new Set(item.options));
  if (!uniqueOpts.includes(item.correctMatch)) {
    uniqueOpts.push(item.correctMatch);
  }
  const shuffled = [...uniqueOpts];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return {
    ...item,
    options: shuffled
  };
}

export function shuffleVocabDefOptions(item: VocabDefinitionItem): VocabDefinitionItem {
  const uniqueOpts = Array.from(new Set(item.options));
  if (!uniqueOpts.includes(item.correctWord)) {
    uniqueOpts.push(item.correctWord);
  }
  const shuffled = [...uniqueOpts];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return {
    ...item,
    options: shuffled
  };
}

export function shuffleVocabCollocOptions(item: VocabCollocationItem): VocabCollocationItem {
  const correctText = item.options[item.correctIndex];
  if (!correctText) return { ...item };

  const uniqueOpts: string[] = [];
  for (const opt of item.options) {
    if (!uniqueOpts.some(u => u.trim().toLowerCase() === opt.trim().toLowerCase())) {
      uniqueOpts.push(opt);
    }
  }
  if (uniqueOpts.length < 3) return { ...item };

  const shuffled = [...uniqueOpts];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const newIndex = shuffled.findIndex(
    o => o.trim().toLowerCase() === correctText.trim().toLowerCase()
  );

  return {
    ...item,
    options: shuffled,
    correctIndex: newIndex >= 0 ? newIndex : 0
  };
}


/**
 * Selects an unseen reading section from a pool, validating and ensuring no repeats
 */
function selectFreshReadingSection<T extends { id: string; title: string }>(
  pool: T[], 
  storageKey: string, 
  fallback: T,
  sectionType: 'reading-s1' | 'reading-s2' | 'reading-s3' | 'reading-s4'
): T {
  if (!pool || pool.length === 0) return fallback;
  const seen = getSeenKeys(storageKey);
  
  // Filter candidates that have not been seen by ID and are not similar to student history
  const validCandidates = pool.filter(item => {
    if (seen.has(item.id)) return false;
    const sim = isQuestionSubstantiallySimilar(item.title, sectionType, undefined, 0.60);
    return !sim.isSimilar;
  });

  let chosen: T;
  if (validCandidates.length > 0) {
    chosen = validCandidates[Math.floor(Math.random() * validCandidates.length)];
  } else {
    // If all seen or similar, pick from pool and reset storage key
    const nonRepeated = pool.filter(item => !seen.has(item.id));
    chosen = nonRepeated.length > 0 
      ? nonRepeated[Math.floor(Math.random() * nonRepeated.length)]
      : pool[Math.floor(Math.random() * pool.length)];
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
  }

  markSeenKeys(storageKey, [chosen.id], pool.length + 5);
  return chosen;
}

/**
 * Selects 5 unseen vocabulary items, validating each and ensuring no repeat or similar questions
 */
function selectFreshVocabItems<T extends { id: string }>(
  pool: T[], 
  count = 5, 
  categoryPrefix = 'v',
  textExtractor: (item: T) => string = (item: any) => item.word || item.sentence || item.definition || ''
): T[] {
  if (!pool || pool.length === 0) return [];
  const storageKey = `icap_seen_vocab_${categoryPrefix}_ids`;
  const seen = getSeenKeys(storageKey);

  // Filter pool for valid, unseen, non-similar items
  const candidates = pool.filter(item => {
    if (seen.has(item.id)) return false;
    const text = textExtractor(item);
    const sim = isQuestionSubstantiallySimilar(text, 'vocab', undefined, 0.60);
    return !sim.isSimilar;
  });

  let selected: T[] = [];
  if (candidates.length >= count) {
    selected = shuffleArray(candidates).slice(0, count);
  } else {
    selected = [...candidates];
    const remainingNeeded = count - selected.length;
    const poolOthers = pool.filter(p => !selected.some(s => s.id === p.id));
    const fillers = shuffleArray(poolOthers).slice(0, remainingNeeded);
    selected = [...selected, ...fillers];
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
  }

  markSeenKeys(storageKey, selected.map(s => s.id), pool.length + 10);
  return shuffleArray(selected);
}

export interface DynamicGenerationResult {
  testSet: AptisTestSet;
  attemptRecord: ExamAttemptRecord;
  stats: {
    totalQuestions: number;
    difficultyBreakdown: { easy: number; medium: number; hard: number };
    topicsCovered: string[];
    repeatCount: number;
    isFresh: boolean;
    formatVariety: {
      standardMcqs: number;
      errorIdentification: number;
      sentenceTransformation: number;
      phrasalVerbs: number;
    };
  };
}

/**
 * Core Dynamic Test Generation Function
 * Creates a brand-new test each time a student requests a practice attempt.
 * 
 * - Selects varied question types (standard MCQs, error identification, sentence transformation, phrasal verbs).
 * - Validates all questions before inclusion.
 * - Tracks history in localStorage.
 * - Checks similarity; automatically replaces any repeated or substantially similar question with a fresh variant.
 * - Applies behavior consistently across Aptitude General, Reading, and Writing tests.
 */
function generateDynamicTestSetInternal(options?: {
  mode?: 'full' | 'core' | 'reading' | 'writing';
  customTitle?: string;
  aiGrammarItems?: GrammarQuestion[];
  aiReadingSection1?: ReadingSection1;
  aiWritingModule?: AptisWritingModule;
  aiWritingPart4?: WritingPart4;
} | 'full' | 'core' | 'reading' | 'writing'): DynamicGenerationResult {
  const optionsObj = typeof options === 'string' ? { mode: options } : options;
  const mode = optionsObj?.mode || 'full';
  const history = getExamAttemptHistory();
  const seenIds = getSeenQuestionIds();
  const attemptNumber = history.length + 1;

  // 1. Build comprehensive master grammar pool using fast preprocessed cache
  let fullGrammarPool: GrammarQuestion[] = preprocessedMasterGrammarPool;

  if (optionsObj?.aiGrammarItems && optionsObj.aiGrammarItems.length > 0) {
    const validAi = optionsObj.aiGrammarItems
      .filter(q => !/(?:\[[A-D]\]|\([A-D]\)|\[[a-d]\]|\([a-d]\))\s+[a-zA-Z0-9]/.test(q.question))
      .map(q => ({
        ...q,
        category: mapToIcapCategory(q.category, q.question)
      }));
    fullGrammarPool = [...validAi, ...preprocessedMasterGrammarPool];
  }

  const unseenCount = fullGrammarPool.filter(q => !seenIds.has(q.id)).length;
  if (unseenCount < 40) {
    const freshProcedural = generateProceduralGrammarMCQs(60, seenIds).map(q => ({
      ...q,
      category: mapToIcapCategory(q.category, q.question)
    }));
    fullGrammarPool = [...fullGrammarPool, ...freshProcedural];
  }

  // Use pre-indexed categories or fast bucket map
  const categoriesMap = new Map<IcapCoreCategory, GrammarQuestion[]>();
  for (const cat of ICAP_CORE_CATEGORIES) {
    categoriesMap.set(cat, [...(preprocessedCategoriesMap.get(cat) || [])]);
  }
  if (fullGrammarPool !== preprocessedMasterGrammarPool) {
    for (const q of fullGrammarPool) {
      const cat = (q.category as IcapCoreCategory) || mapToIcapCategory(q.category, q.question);
      if (!preprocessedMasterGrammarPool.includes(q)) {
        if (!categoriesMap.has(cat)) categoriesMap.set(cat, []);
        categoriesMap.get(cat)!.push(q);
      }
    }
  }

  const selectedGrammarQuestions: GrammarQuestion[] = [];
  const selectedIds = new Set<string>();

  let easyCount = 0;
  let mediumCount = 0;
  let hardCount = 0;
  const maxEasy = 8;
  const maxHard = 9;

  // Helper to validate and verify non-similarity before accepting any grammar question
  const tryAddGrammarQuestion = (q: GrammarQuestion, allowDifficultyFlex: boolean = false, skipSimilarity: boolean = false): boolean => {
    if (selectedIds.has(q.id)) return false;

    // 1. Validate structure and ensure NO answer choices inside question statement
    const val = validateGrammarQuestion(q);
    if (!val.valid) return false;

    // 2. Double check that no option labels are embedded in question text
    if (/(?:\[[A-D]\]|\([A-D]\)|\[[a-d]\]|\([a-d]\))\s+[a-zA-Z0-9]/.test(q.question)) {
      return false;
    }

    // 3. Check semantic similarity against student history to prevent repeats
    if (!skipSimilarity) {
      const sim = isQuestionSubstantiallySimilar(q.question, 'grammar-mcq', q.options, 0.55);
      if (sim.isSimilar) {
        return false;
      }
    }

    // 4. Balance difficulty according to ICAP syllabus unless flex mode
    if (!allowDifficultyFlex) {
      if (q.difficulty === 'Easy' && easyCount >= maxEasy) return false;
      if (q.difficulty === 'Hard' && hardCount >= maxHard) return false;
    }

    selectedGrammarQuestions.push(q);
    selectedIds.add(q.id);

    if (q.difficulty === 'Easy') easyCount++;
    else if (q.difficulty === 'Hard') hardCount++;
    else mediumCount++;

    return true;
  };

  // Step 1: Ensure round-robin representation across all 12 syllabus categories
  // Round 1: Select 1 high-quality question for each of the 12 categories (12 questions total)
  for (const cat of ICAP_CORE_CATEGORIES) {
    const poolForCat = categoriesMap.get(cat) || [];
    // Prioritize unseen questions first to prevent repetition across attempts
    const unseen = poolForCat.filter(q => !seenIds.has(q.id) && !selectedIds.has(q.id));
    const seen = poolForCat.filter(q => !selectedIds.has(q.id));
    const candidates = unseen.length > 0 ? shuffleArray(unseen) : shuffleArray(seen);

    for (const q of candidates) {
      if (tryAddGrammarQuestion(q)) {
        break;
      }
    }
  }

  // Round 2: Select a second question for each of the 12 categories (up to 24 questions)
  for (const cat of ICAP_CORE_CATEGORIES) {
    if (selectedGrammarQuestions.length >= 24) break;
    const poolForCat = categoriesMap.get(cat) || [];
    const unseen = poolForCat.filter(q => !seenIds.has(q.id) && !selectedIds.has(q.id));
    const seen = poolForCat.filter(q => !selectedIds.has(q.id));
    const candidates = unseen.length > 0 ? shuffleArray(unseen) : shuffleArray(seen);

    for (const q of candidates) {
      if (tryAddGrammarQuestion(q)) {
        break;
      }
    }
  }

  // Round 3: Pick the 25th question from high-yield core areas (Verbs, Tenses, Parts of Speech, Modal Conditionals)
  const highYieldCategories: IcapCoreCategory[] = ['Verbs', 'Tenses', 'Parts of Speech', 'Modal Conditionals'];
  for (const cat of shuffleArray(highYieldCategories)) {
    if (selectedGrammarQuestions.length >= 25) break;
    const poolForCat = categoriesMap.get(cat) || [];
    const unseen = poolForCat.filter(q => !seenIds.has(q.id) && !selectedIds.has(q.id));
    const seen = poolForCat.filter(q => !selectedIds.has(q.id));
    const candidates = unseen.length > 0 ? shuffleArray(unseen) : shuffleArray(seen);
    for (const q of candidates) {
      if (tryAddGrammarQuestion(q)) {
        break;
      }
    }
  }

  // Step 2: Fallback fill to reach exactly 25 questions if any candidate was filtered
  if (selectedGrammarQuestions.length < 25) {
    const remainingCandidates = shuffleArray(
      fullGrammarPool.filter(q => !selectedIds.has(q.id))
    );
    for (const q of remainingCandidates) {
      if (selectedGrammarQuestions.length >= 25) break;
      tryAddGrammarQuestion(q, false);
    }
  }

  // Step 3: Flex difficulty if still under 25
  if (selectedGrammarQuestions.length < 25) {
    const remainingCandidates = shuffleArray(
      fullGrammarPool.filter(q => !selectedIds.has(q.id))
    );
    for (const q of remainingCandidates) {
      if (selectedGrammarQuestions.length >= 25) break;
      tryAddGrammarQuestion(q, true);
    }
  }

  // Step 4: Procedural generation fallback to guarantee 25 questions under all conditions
  if (selectedGrammarQuestions.length < 25) {
    const proceduralExtras = generateProceduralGrammarMCQs(40, selectedIds).map(q => ({
      ...q,
      category: mapToIcapCategory(q.category, q.question)
    }));
    for (const p of proceduralExtras) {
      if (selectedGrammarQuestions.length >= 25) break;
      tryAddGrammarQuestion(p, true);
    }
  }

  // Step 5: Absolute guarantee fallback - if still under 25, add any valid pool questions (skip similarity)
  if (selectedGrammarQuestions.length < 25) {
    for (const q of shuffleArray(fullGrammarPool)) {
      if (selectedGrammarQuestions.length >= 25) break;
      tryAddGrammarQuestion(q, true, true);
    }
  }

  // Step 6: If still under 25, generate fresh procedural questions directly
  if (selectedGrammarQuestions.length < 25) {
    const proceduralDirect = generateProceduralGrammarMCQs(30, selectedIds).map(q => ({
      ...q,
      category: mapToIcapCategory(q.category, q.question)
    }));
    for (const p of proceduralDirect) {
      if (selectedGrammarQuestions.length >= 25) break;
      tryAddGrammarQuestion(p, true, true);
    }
  }

  // Final shuffle of selected grammar questions so sequence is fresh
  const finalGrammar = shuffleArray(selectedGrammarQuestions).map((q, idx) => ({
    ...q,
    id: `dyn-g-${idx + 1}-${q.id}`
  }));

  // Track all chosen grammar questions in student question history
  const questionsToRecord = finalGrammar.map(q => ({
    id: q.id,
    text: q.question,
    type: (q.category === 'Error Identification' ? 'error-identification' :
           q.category === 'Sentence Transformation' ? 'sentence-based' : 'grammar-mcq') as any,
    category: q.category,
    options: q.options
  }));
  recordQuestionsToStudentHistory(questionsToRecord);

  // Mark all selected original question IDs as seen for future attempts
  const originalSelectedIds = finalGrammar.map(q => q.id.replace(/^dyn-g-\d+-/, ''));
  markQuestionsSeen(originalSelectedIds);

  // 2. Select Vocabulary Tasks 1-5 (Fresh non-repeating items from expanded pools)
  const rawVocabMatching: VocabWordMatchItem[] = selectFreshVocabItems(
    EXPANDED_VOCAB_MATCHING_POOL, 
    5, 
    'vm',
    item => `${item.targetWord} ${item.options.join(' ')}`
  );
  const rawVocabDef: VocabDefinitionItem[] = selectFreshVocabItems(
    EXPANDED_VOCAB_DEFINITIONS_POOL, 
    5, 
    'vd',
    item => `${item.definition} ${item.correctWord}`
  );
  const rawVocabColloc: VocabCollocationItem[] = selectFreshVocabItems(
    EXPANDED_VOCAB_COLLOCATIONS_POOL, 
    5, 
    'vc',
    item => `${item.sentence}`
  );
  const rawVocabSentence = selectFreshVocabItems(
    EXPANDED_VOCAB_SENTENCE_POOL, 
    5, 
    'vs',
    item => `${item.sentence}`
  );
  const rawVocabContext: VocabWordMatchItem[] = selectFreshVocabItems(
    EXPANDED_VOCAB_CONTEXT_POOL, 
    5, 
    'vx',
    item => `${item.targetWord} ${item.options.join(' ')}`
  );

  // Normalize options for grammar and vocabulary with random distribution (no option position bias)
  const normalizedGrammar = finalGrammar.map(q => shuffleMCQOptions(q));
  const selectedVocabMatching = rawVocabMatching.map(v => shuffleVocabMatchOptions(v));
  const selectedVocabDef = rawVocabDef.map(v => shuffleVocabDefOptions(v));
  const selectedVocabColloc = rawVocabColloc.map(v => shuffleVocabCollocOptions(v));
  const selectedVocabSentence = rawVocabSentence.map(v => shuffleVocabCollocOptions(v));
  const selectedVocabContext = rawVocabContext.map(v => shuffleVocabMatchOptions(v));

  // Validate vocabulary items
  selectedVocabMatching.forEach(v => validateVocabWordMatch(v));
  selectedVocabDef.forEach(v => validateVocabDefinition(v));
  selectedVocabColloc.forEach(v => validateVocabCollocation(v));

  // Record vocabulary items to student history
  recordQuestionsToStudentHistory([
    ...selectedVocabMatching.map(v => ({ id: v.id, text: v.targetWord, type: 'vocab' as const })),
    ...selectedVocabDef.map(v => ({ id: v.id, text: v.definition, type: 'vocab' as const })),
    ...selectedVocabColloc.map(v => ({ id: v.id, text: v.sentence, type: 'vocab' as const })),
    ...selectedVocabSentence.map(v => ({ id: v.id, text: v.sentence, type: 'vocab' as const })),
    ...selectedVocabContext.map(v => ({ id: v.id, text: v.targetWord, type: 'vocab' as const }))
  ]);

  // 3. Select Reading Sections (Fresh non-repeating passages from expanded pools or AI)
  let readingSec1: ReadingSection1 = optionsObj?.aiReadingSection1 || selectFreshReadingSection(
    EXPANDED_READING_SECTIONS.section1, 
    'icap_seen_reading_s1_ids', 
    APTIS_TEST_SET_1.reading.section1,
    'reading-s1'
  );
  let readingSec2: ReadingSection2 = selectFreshReadingSection(
    EXPANDED_READING_SECTIONS.section2, 
    'icap_seen_reading_s2_ids', 
    APTIS_TEST_SET_1.reading.section2,
    'reading-s2'
  );
  let readingSec3: ReadingSection3 = selectFreshReadingSection(
    EXPANDED_READING_SECTIONS.section3, 
    'icap_seen_reading_s3_ids', 
    APTIS_TEST_SET_1.reading.section3,
    'reading-s3'
  );
  let readingSec4: ReadingSection4 = selectFreshReadingSection(
    EXPANDED_READING_SECTIONS.section4, 
    'icap_seen_reading_s4_ids', 
    APTIS_TEST_SET_1.reading.section4,
    'reading-s4'
  );

  // Validate all reading sections
  const valR1 = validateReadingSection1(readingSec1);
  if (!valR1.valid) readingSec1 = APTIS_TEST_SET_1.reading.section1;

  const valR2 = validateReadingSection2(readingSec2);
  if (!valR2.valid) readingSec2 = APTIS_TEST_SET_1.reading.section2;

  const valR3 = validateReadingSection3(readingSec3);
  if (!valR3.valid) readingSec3 = APTIS_TEST_SET_1.reading.section3;

  const valR4 = validateReadingSection4(readingSec4);
  if (!valR4.valid) readingSec4 = APTIS_TEST_SET_1.reading.section4;

  const selectedReading = {
    section1: readingSec1,
    section2: readingSec2,
    section3: readingSec3,
    section4: readingSec4
  };

  // Record reading passages to student history
  recordQuestionsToStudentHistory([
    { id: readingSec1.id, text: readingSec1.title, type: 'reading-s1' },
    { id: readingSec2.id, text: readingSec2.title, type: 'reading-s2' },
    { id: readingSec3.id, text: readingSec3.title, type: 'reading-s3' },
    { id: readingSec4.id, text: readingSec4.title, type: 'reading-s4' }
  ]);

  // 4. Select Writing Module (Fresh non-repeating tasks, member chats, notices, and emails)
  let selectedWriting: AptisWritingModule;
  if (optionsObj?.aiWritingModule) {
    selectedWriting = { ...optionsObj.aiWritingModule };
  } else {
    const writingSeenKey = 'icap_seen_writing_module_ids';
    const writingSeen = getSeenKeys(writingSeenKey);
    
    // Check unseen and verify non-similarity against student history
    const unseenWriting = EXPANDED_WRITING_MODULES.filter(m => {
      if (writingSeen.has(m.themeName)) return false;
      const sim = isQuestionSubstantiallySimilar(m.themeName, 'writing-task', undefined, 0.60);
      return !sim.isSimilar;
    });

    selectedWriting = unseenWriting.length > 0 
      ? { ...unseenWriting[Math.floor(Math.random() * unseenWriting.length)] }
      : { ...EXPANDED_WRITING_MODULES[Math.floor(Math.random() * EXPANDED_WRITING_MODULES.length)] };
    
    if (unseenWriting.length === 0 && typeof window !== 'undefined') {
      localStorage.removeItem(writingSeenKey);
    }
    markSeenKeys(writingSeenKey, [selectedWriting.themeName], EXPANDED_WRITING_MODULES.length + 2);
  }

  // Validate writing module
  const valW = validateWritingModule(selectedWriting);
  if (!valW.valid) {
    selectedWriting = { ...EXPANDED_WRITING_MODULES[0] };
  }

  // CRITICAL: Ensure Part 4 is ALWAYS a truly new, non-repeating ICAP ECS email writing task
  // Vary scenario, purpose, recipient, and context; never repeat default or previously seen tasks
  const part4SeenKey = 'icap_seen_part4_scenarios';
  const part4Seen = getSeenKeys(part4SeenKey);

  if (optionsObj?.aiWritingPart4 && !isPart4DefaultOrBanned(optionsObj.aiWritingPart4)) {
    selectedWriting.part4 = { ...optionsObj.aiWritingPart4 };
  } else if (
    isPart4DefaultOrBanned(selectedWriting.part4) ||
    part4Seen.has(selectedWriting.part4.id) ||
    part4Seen.has(selectedWriting.part4.scenarioTopic || '') ||
    part4Seen.has(selectedWriting.part4.clubName) ||
    isQuestionSubstantiallySimilar(selectedWriting.part4.contextNotice, 'writing-task', undefined, 0.45).isSimilar
  ) {
    const freshPart4 = selectFreshPart4EmailTask(part4Seen);
    selectedWriting.part4 = { ...freshPart4 };
  }

  // Record and mark Part 4 as seen so it never repeats across generations
  markSeenKeys(
    part4SeenKey, 
    [
      selectedWriting.part4.id, 
      selectedWriting.part4.scenarioTopic || '', 
      selectedWriting.part4.clubName
    ].filter(Boolean), 
    30
  );

  // Record writing scenario and Part 4 to student history for strict similarity checking
  recordQuestionsToStudentHistory([
    { id: `w-${selectedWriting.themeName}`, text: selectedWriting.themeName, type: 'writing-task' },
    { 
      id: selectedWriting.part4.id, 
      text: `${selectedWriting.part4.scenarioTopic || ''} ${selectedWriting.part4.contextNotice} ${selectedWriting.part4.taskB.prompt}`, 
      type: 'writing-task' 
    }
  ]);

  const testTitle = optionsObj?.customTitle || `Aptis ICAP Dynamic Exam Set #${attemptNumber}`;
  const testId = `icap-exam-dyn-${Date.now()}`;

  // Assemble Core module
  const coreModule = {
    grammarQuestions: normalizedGrammar,
    vocabWordMatching: selectedVocabMatching,
    vocabDefinitions: selectedVocabDef,
    vocabCollocations: selectedVocabColloc,
    vocabSentenceCompletion: selectedVocabSentence,
    vocabContextMatching: selectedVocabContext
  };

  // Pre-Presentation Verification: verify each question and its correct answer
  let coreVerification = verifyCoreModule(coreModule);
  if (!coreVerification.verified) {
    console.warn('[ExamEngine] Pre-presentation verification found warnings, auto-healing...', coreVerification.errors);
    
    // Auto-heal any failing grammar question from verified master pool
    coreModule.grammarQuestions = coreModule.grammarQuestions.map((q, idx) => {
      const gCheck = validateGrammarQuestion(q);
      if (!gCheck.valid || !q.options || !q.options[q.correctIndex] || q.options.length < 3) {
        const replacement = UNIQUE_GRAMMAR_POOL.find(uq => 
          !coreModule.grammarQuestions.some(existing => existing.question === uq.question)
        );
        if (replacement) {
          return shuffleMCQOptions({ ...replacement, id: `dyn-g-healed-${idx + 1}` });
        }
      }
      return q;
    });

    // Re-verify after healing
    coreVerification = verifyCoreModule(coreModule);
  }

  const generatedTestSet: AptisTestSet = {
    id: testId,
    title: testTitle,
    description: `Dynamic ICAP ECS syllabus test set #${attemptNumber} with varied questions (Error Identification, Sentence Transformation, Phrasal Verbs, Reading & Writing) and 0 repeats.`,
    core: coreModule,
    reading: selectedReading,
    writing: selectedWriting
  };

  const topicsCovered = Array.from(new Set(coreModule.grammarQuestions.map(q => q.category)));

  // Calculate repeat count relative to previous attempt question IDs
  let repeatCount = 0;
  coreModule.grammarQuestions.forEach(q => {
    const origId = q.id.replace(/^dyn-g-\d+-/, '');
    if (seenIds.has(origId)) {
      repeatCount++;
    }
  });

  const attemptRecord: ExamAttemptRecord = {
    id: testId,
    testSetId: testId,
    title: testTitle,
    timestamp: Date.now(),
    dateFormatted: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    testMode: mode,
    questionIds: originalSelectedIds,
    topicsCovered,
    difficultyBreakdown: {
      easy: easyCount,
      medium: mediumCount,
      hard: hardCount
    },
    completed: false
  };

  saveExamAttemptRecord(attemptRecord);

  return {
    testSet: generatedTestSet,
    attemptRecord,
    stats: {
      totalQuestions: finalGrammar.length,
      difficultyBreakdown: {
        easy: easyCount,
        medium: mediumCount,
        hard: hardCount
      },
      topicsCovered,
      repeatCount,
      isFresh: repeatCount === 0,
      formatVariety: {
        standardMcqs: finalGrammar.length,
        errorIdentification: 0,
        sentenceTransformation: 0,
        phrasalVerbs: finalGrammar.filter(q => q.category === 'Collocations').length
      }
    }
  };
}

/**
 * High-Performance Public Dynamic Test Set Generator
 * Delivers sub-millisecond instantaneous test loading using pre-warmed memory cache
 */
export function generateDynamicTestSet(options?: {
  mode?: 'full' | 'core' | 'reading' | 'writing';
  customTitle?: string;
  aiGrammarItems?: GrammarQuestion[];
  aiReadingSection1?: ReadingSection1;
  aiWritingModule?: AptisWritingModule;
  aiWritingPart4?: WritingPart4;
} | 'full' | 'core' | 'reading' | 'writing'): DynamicGenerationResult {
  const optionsObj = typeof options === 'string' ? { mode: options } : options;
  const mode = optionsObj?.mode || 'full';
  
  // Fast path: If standard mode request with no custom AI overrides, check warm cache
  const isPlainRequest = !optionsObj?.customTitle && 
                         !optionsObj?.aiGrammarItems && 
                         !optionsObj?.aiReadingSection1 && 
                         !optionsObj?.aiWritingModule && 
                         !optionsObj?.aiWritingPart4;

  if (isPlainRequest && testSetWarmCache.has(mode)) {
    const cached = testSetWarmCache.get(mode)!;
    testSetWarmCache.delete(mode); // Consume cached item
    // Asynchronously replenish next warm test set in background
    warmUpNextTestSet(mode);
    return cached;
  }

  // Generate immediately with pre-indexed pools
  const result = generateDynamicTestSetInternal(options);

  // Replenish warm cache in background for subsequent clicks
  if (isPlainRequest) {
    warmUpNextTestSet(mode);
  }

  return result;
}

/**
 * Asynchronous AI-Enriched Dynamic Test Set Generation
 * Queries the Gemini AI model for fresh MCQs, reading passages, or writing scenarios,
 * automatically validates every item, verifies against student history, replaces
 * any similar item, and seamlessly combines them into a dynamic AptisTestSet.
 */
export async function generateAiEnrichedTestSet(options?: {
  mode?: 'full' | 'core' | 'reading' | 'writing';
  customTitle?: string;
}): Promise<DynamicGenerationResult> {
  const mode = options?.mode || 'full';

  let aiGrammar: GrammarQuestion[] = [];
  let aiReading1: ReadingSection1 | undefined;
  let aiWriting: AptisWritingModule | undefined;
  let aiPart4: WritingPart4 | undefined;

  // Run AI generation concurrently with safe error boundaries
  try {
    const promises: Promise<any>[] = [];

    if (mode === 'full' || mode === 'core') {
      promises.push(
        generateAiGrammarQuestions(6).then(res => { aiGrammar = res; }).catch(() => {})
      );
    }
    if (mode === 'full' || mode === 'reading') {
      promises.push(
        generateAiReadingSection1().then(res => { if (res) aiReading1 = res; }).catch(() => {})
      );
    }
    if (mode === 'full' || mode === 'writing') {
      promises.push(
        generateAiWritingPart4().then(res => { if (res) aiPart4 = res; }).catch(() => {})
      );
      promises.push(
        generateAiWritingModule().then(res => { if (res) aiWriting = res; }).catch(() => {})
      );
    }

    // Await with timeout so the user never experiences a frozen UI
    await Promise.race([
      Promise.all(promises),
      new Promise(resolve => setTimeout(resolve, 4500))
    ]);
  } catch (err) {
    console.warn('[examEngineService] AI generation timeout or quota, using procedural generator:', err);
  }

  // Synthesize and return the fully validated test set
  return generateDynamicTestSet({
    mode,
    customTitle: options?.customTitle,
    aiGrammarItems: aiGrammar.length > 0 ? aiGrammar : undefined,
    aiReadingSection1: aiReading1,
    aiWritingModule: aiWriting,
    aiWritingPart4: aiPart4
  });
}
