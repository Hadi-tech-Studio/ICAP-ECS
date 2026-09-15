/**
 * ============================================================================
 * questionHistoryService.ts
 * Student Question History Tracking & Semantic Similarity Engine
 * 
 * Tracks every question, passage, and writing prompt seen by each student.
 * Uses normalized n-gram tokenization and Jaccard similarity metrics to detect
 * repeated or substantially similar questions and replace them automatically.
 * ============================================================================
 */

export interface TrackedQuestionItem {
  id: string;
  type: 'grammar-mcq' | 'error-identification' | 'sentence-based' | 'vocab' | 'reading-s1' | 'reading-s2' | 'reading-s3' | 'reading-s4' | 'writing-task';
  category?: string;
  normalizedText: string;
  tokens: string[];
  optionsSignature?: string;
  timestamp: number;
}

const HISTORY_STORAGE_KEY = 'icap_student_question_history_v2';
const MAX_HISTORY_ITEMS = 600;

// In-memory cache for blazing fast question retrieval
let memoryHistoryCache: TrackedQuestionItem[] | null = null;
const normalizedTextCache = new Map<string, { normalized: string; tokens: string[] }>();

// Standard English stop words to filter out when measuring semantic similarity
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'if', 'then', 'else', 'when', 'at',
  'from', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through',
  'during', 'before', 'after', 'above', 'below', 'to', 'of', 'up', 'down', 'in',
  'out', 'on', 'off', 'over', 'under', 'again', 'further', 'once', 'here', 'there',
  'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
  'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's',
  't', 'can', 'will', 'just', 'don', 'should', 'now', 'is', 'am', 'are', 'was',
  'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does',
  'did', 'doing', 'it', 'its', 'they', 'them', 'their', 'we', 'our', 'us', 'you',
  'your', 'he', 'him', 'his', 'she', 'her'
]);

/**
 * Normalizes text for comparison by stripping punctuation, lowercasing,
 * and extracting substantive content tokens with memoization.
 */
export function normalizeTextForComparison(rawText: string): { normalized: string; tokens: string[] } {
  if (!rawText) return { normalized: '', tokens: [] };
  
  const cached = normalizedTextCache.get(rawText);
  if (cached) return cached;

  const cleaned = rawText
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = cleaned.split(' ').filter(w => w.length > 2 && !STOP_WORDS.has(w));
  const result = {
    normalized: cleaned,
    tokens: Array.from(new Set(words))
  };

  if (normalizedTextCache.size > 2000) {
    normalizedTextCache.clear();
  }
  normalizedTextCache.set(rawText, result);
  return result;
}

/**
 * Computes semantic similarity between two texts using Jaccard index
 * and n-gram overlap on content tokens.
 * Returns a score between 0.0 (completely distinct) and 1.0 (identical).
 */
export function computeTextSimilarity(textA: string, textB: string): number {
  if (!textA || !textB) return 0;
  if (textA === textB) return 1.0;

  const { tokens: tokensA, normalized: normA } = normalizeTextForComparison(textA);
  const { tokens: tokensB, normalized: normB } = normalizeTextForComparison(textB);

  // Exact normalized match
  if (normA.length > 20 && normB.length > 20 && normA === normB) return 1.0;

  // Substring containment of substantial clauses (>= 40 chars)
  if (normA.length > 40 && normB.length > 40) {
    if (normA.includes(normB) || normB.includes(normA)) return 0.90;
  }

  if (tokensA.length === 0 || tokensB.length === 0) return 0;

  const setA = new Set(tokensA);
  const setB = new Set(tokensB);

  let intersectionCount = 0;
  for (const t of setA) {
    if (setB.has(t)) intersectionCount++;
  }

  const unionCount = new Set([...tokensA, ...tokensB]).size;
  const jaccardScore = unionCount > 0 ? intersectionCount / unionCount : 0;

  // If jaccard score is extremely low (< 0.2), skip bigram calculation for speed
  if (jaccardScore < 0.2) return jaccardScore * 0.6;

  // Bigram token overlap for structure similarity
  const getBigrams = (tokens: string[]) => {
    const bigrams = new Set<string>();
    for (let i = 0; i < tokens.length - 1; i++) {
      bigrams.add(`${tokens[i]}_${tokens[i + 1]}`);
    }
    return bigrams;
  };

  const bigramsA = getBigrams(tokensA);
  const bigramsB = getBigrams(tokensB);

  let bigramIntersection = 0;
  for (const bg of bigramsA) {
    if (bigramsB.has(bg)) bigramIntersection++;
  }

  const bigramUnion = new Set([...Array.from(bigramsA), ...Array.from(bigramsB)]).size;
  const bigramScore = bigramUnion > 0 ? bigramIntersection / bigramUnion : 0;

  // Blended score
  return (jaccardScore * 0.6) + (bigramScore * 0.4);
}

/**
 * Retrieves the full tracked student question history from in-memory cache or localStorage
 */
export function getStudentQuestionHistory(): TrackedQuestionItem[] {
  if (memoryHistoryCache !== null) {
    return memoryHistoryCache;
  }
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    memoryHistoryCache = raw ? JSON.parse(raw) : [];
    return memoryHistoryCache;
  } catch (err) {
    console.warn('[questionHistoryService] Failed to read student question history:', err);
    memoryHistoryCache = [];
    return [];
  }
}

/**
 * Checks if a candidate question or passage is substantially similar to
 * any item the student has previously encountered.
 * 
 * Default similarity threshold is 0.50 (50% conceptual token overlap).
 */
export function isQuestionSubstantiallySimilar(
  candidateText: string,
  type?: string,
  options?: string[],
  threshold = 0.50
): { isSimilar: boolean; similarityScore: number; matchedReason?: string } {
  if (!candidateText || candidateText.trim().length === 0) {
    return { isSimilar: false, similarityScore: 0 };
  }

  const history = getStudentQuestionHistory();
  if (history.length === 0) {
    return { isSimilar: false, similarityScore: 0 };
  }

  const { tokens: candTokens, normalized: candNorm } = normalizeTextForComparison(candidateText);
  const candOptionsSig = options ? options.map(o => o.toLowerCase().trim()).sort().join('|') : '';

  // Filter history to same general type if specified to keep checks sharp and fast
  const candidatesToCheck = type 
    ? history.filter(h => h.type === type || (h.type.startsWith('grammar') && type.startsWith('grammar')))
    : history;

  const items = candidatesToCheck.length > 0 ? candidatesToCheck : history;

  for (const item of items) {
    // 1. Direct options + stem match
    if (candOptionsSig && item.optionsSignature && candOptionsSig === item.optionsSignature) {
      return {
        isSimilar: true,
        similarityScore: 0.95,
        matchedReason: `Exact identical answer choices matched previous question (${item.id})`
      };
    }

    // 2. Exact normalized stem match
    if (candNorm.length > 20 && item.normalizedText === candNorm) {
      return {
        isSimilar: true,
        similarityScore: 1.0,
        matchedReason: `Identical question statement previously seen (${item.id})`
      };
    }

    // 3. Fast token overlap check before computing full similarity
    let commonTokenCount = 0;
    for (const tok of candTokens) {
      if (item.tokens.includes(tok)) commonTokenCount++;
    }
    if (candTokens.length > 0 && (commonTokenCount / candTokens.length) < (threshold * 0.7)) {
      continue;
    }

    // 4. Compute semantic token & bigram similarity
    const score = computeTextSimilarity(candidateText, item.normalizedText);
    if (score >= threshold) {
      return {
        isSimilar: true,
        similarityScore: score,
        matchedReason: `Substantially similar statement (${(score * 100).toFixed(0)}% semantic overlap with ${item.id})`
      };
    }
  }

  return { isSimilar: false, similarityScore: 0 };
}

let pendingHistoryPersistTimeout: any = null;

/**
 * Records newly presented questions into the student's question history (non-blocking)
 */
export function recordQuestionsToStudentHistory(
  items: Array<{
    id: string;
    text: string;
    type: TrackedQuestionItem['type'];
    category?: string;
    options?: string[];
  }>
): void {
  if (typeof window === 'undefined' || items.length === 0) return;

  try {
    const existing = getStudentQuestionHistory();
    const existingIds = new Set(existing.map(e => e.id));

    const newEntries: TrackedQuestionItem[] = [];

    for (const it of items) {
      if (!it.text || existingIds.has(it.id)) continue;
      const { normalized, tokens } = normalizeTextForComparison(it.text);
      const optionsSig = it.options ? it.options.map(o => o.toLowerCase().trim()).sort().join('|') : undefined;

      newEntries.push({
        id: it.id,
        type: it.type,
        category: it.category,
        normalizedText: normalized,
        tokens,
        optionsSignature: optionsSig,
        timestamp: Date.now()
      });
      existingIds.add(it.id);
    }

    if (newEntries.length > 0) {
      // Keep up to MAX_HISTORY_ITEMS to maintain fast performance and light footprint
      const combined = [...newEntries, ...existing].slice(0, MAX_HISTORY_ITEMS);
      memoryHistoryCache = combined;
      
      // Async non-blocking persistence so UI thread never stutters
      if (typeof window !== 'undefined') {
        if (pendingHistoryPersistTimeout) clearTimeout(pendingHistoryPersistTimeout);
        pendingHistoryPersistTimeout = setTimeout(() => {
          try {
            localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(combined));
          } catch (e) {}
        }, 100);
      }
    }
  } catch (err) {
    console.warn('[questionHistoryService] Failed to record questions to history:', err);
  }
}

/**
 * Returns student history metrics for display or diagnostic purposes
 */
export function getStudentHistoryStats(): {
  totalTracked: number;
  byType: Record<string, number>;
  latestTimestamp: number | null;
} {
  const history = getStudentQuestionHistory();
  const byType: Record<string, number> = {};

  for (const item of history) {
    byType[item.type] = (byType[item.type] || 0) + 1;
  }

  return {
    totalTracked: history.length,
    byType,
    latestTimestamp: history.length > 0 ? history[0].timestamp : null
  };
}

/**
 * Clears the student's question history
 */
export function clearStudentQuestionHistory(): void {
  memoryHistoryCache = [];
  normalizedTextCache.clear();
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch (err) {
    console.warn('[questionHistoryService] Failed to clear question history:', err);
  }
}

