/**
 * ============================================================================
 * questionValidationService.ts
 * Comprehensive Validation Engine for ICAP ECS / Aptis Test Components
 * 
 * Validates generated and selected questions for:
 * 1. Aptitude General Test (MCQs, Error Identification, Sentence-based, Vocab)
 * 2. Reading Test (Section 1 gap-fill, Section 2 reordering, Section 3 matching, Section 4 headings)
 * 3. Writing Test (Part 1 short forms, Part 2 statement, Part 3 chats, Part 4 informal/formal emails)
 * ============================================================================
 */

import { 
  GrammarQuestion, 
  VocabWordMatchItem, 
  VocabDefinitionItem, 
  VocabCollocationItem, 
  ReadingSection1, 
  ReadingSection2, 
  ReadingSection3, 
  ReadingSection4, 
  AptisWritingModule,
  AptisCoreModule 
} from '../types';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validates a Grammar / MCQ question
 */
export function validateGrammarQuestion(q: any): ValidationResult {
  const errors: string[] = [];

  if (!q) {
    return { valid: false, errors: ['Question object is null or undefined'] };
  }

  if (typeof q.question !== 'string' || q.question.trim().length < 10) {
    errors.push('Question statement must be at least 10 characters long');
  } else {
    // Strictly forbid putting answer choices / option labels inside the question text
    if (/(?:\[[A-D]\]|\([A-D]\)|\[[a-d]\]|\([a-d]\))\s+[a-zA-Z0-9]/.test(q.question)) {
      errors.push('Question statement must never contain answer choices or option markers ([A], (A)) inside the question text');
    }
  }

  if (!Array.isArray(q.options) || q.options.length < 3) {
    errors.push('Question must have at least 3 distinct options');
  } else {
    const uniqueOptions = new Set(q.options.map((o: any) => String(o).trim().toLowerCase()));
    if (uniqueOptions.size !== q.options.length) {
      errors.push('Options must not contain duplicate choices');
    }
  }

  if (
    typeof q.correctIndex !== 'number' || 
    q.correctIndex < 0 || 
    (Array.isArray(q.options) && q.correctIndex >= q.options.length)
  ) {
    errors.push(`correctIndex (${q.correctIndex}) is out of bounds for options length`);
  }

  if (typeof q.englishExplanation !== 'string' || q.englishExplanation.trim().length < 5) {
    errors.push('Question must include a valid English explanation');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validates a Vocabulary Word Match item
 */
export function validateVocabWordMatch(item: any): ValidationResult {
  const errors: string[] = [];
  const word = typeof item?.targetWord === 'string' ? item.targetWord : typeof item?.word === 'string' ? item.word : '';
  if (!item || word.trim().length < 2) {
    errors.push('Word must be non-empty and at least 2 characters');
  }
  if (!Array.isArray(item.options) || item.options.length < 3) {
    errors.push('Options must contain at least 3 choices');
  } else {
    const uniqueOptions = new Set(item.options.map((o: any) => String(o).trim().toLowerCase()));
    if (uniqueOptions.size !== item.options.length) {
      errors.push('Options must not contain duplicate choices');
    }
  }
  if (typeof item.correctMatch !== 'string' || !item.options?.includes(item.correctMatch)) {
    errors.push('correctMatch must be present in options');
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Validates a Vocabulary Definition item
 */
export function validateVocabDefinition(item: any): ValidationResult {
  const errors: string[] = [];
  if (!item || typeof item.definition !== 'string' || item.definition.trim().length < 8) {
    errors.push('Definition must be non-empty and descriptive');
  }
  if (!Array.isArray(item.options) || item.options.length < 3) {
    errors.push('Options must contain at least 3 choices');
  }
  if (typeof item.correctWord !== 'string' || !item.options?.includes(item.correctWord)) {
    errors.push('correctWord must be present in options');
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Validates a Vocabulary Collocation / Sentence completion item
 */
export function validateVocabCollocation(item: any): ValidationResult {
  const errors: string[] = [];
  if (!item || typeof item.sentence !== 'string' || item.sentence.trim().length < 10) {
    errors.push('Sentence must be non-empty');
  }
  if (!Array.isArray(item.options) || item.options.length < 3) {
    errors.push('Options must contain at least 3 choices');
  }
  if (
    typeof item.correctIndex !== 'number' || 
    item.correctIndex < 0 || 
    (Array.isArray(item.options) && item.correctIndex >= item.options.length)
  ) {
    errors.push('correctIndex is out of range');
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Validates Reading Section 1 (Passage Gap-Fill)
 */
export function validateReadingSection1(sec: ReadingSection1): ValidationResult {
  const errors: string[] = [];
  if (!sec || typeof sec.title !== 'string' || sec.title.trim().length === 0) {
    errors.push('Reading Section 1 missing title');
  }
  if (!Array.isArray(sec.paragraphs) || sec.paragraphs.length < 4) {
    errors.push('Reading Section 1 must have at least 4-5 gap paragraphs');
  } else {
    sec.paragraphs.forEach((p, idx) => {
      if (!Array.isArray(p.options) || p.options.length < 2) {
        errors.push(`Paragraph ${idx + 1} has insufficient options`);
      }
      if (typeof p.correctIndex !== 'number' || p.correctIndex < 0 || p.correctIndex >= p.options.length) {
        errors.push(`Paragraph ${idx + 1} correctIndex out of bounds`);
      }
    });
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Validates Reading Section 2 (Jumbled Reordering)
 */
export function validateReadingSection2(sec: ReadingSection2): ValidationResult {
  const errors: string[] = [];
  if (!sec || typeof sec.title !== 'string') {
    errors.push('Reading Section 2 missing title');
  }
  if (!Array.isArray(sec.sentences) || sec.sentences.length !== 6) {
    errors.push('Reading Section 2 must contain exactly 6 jumbled sentences');
  }
  if (!Array.isArray(sec.correctOrder) || sec.correctOrder.length !== 6) {
    errors.push('Reading Section 2 correctOrder must have length 6');
  } else {
    const sorted = [...sec.correctOrder].sort((a, b) => a - b);
    const isValidPermutation = sorted.every((val, idx) => val === idx);
    if (!isValidPermutation) {
      errors.push('correctOrder must be a valid permutation of [0, 1, 2, 3, 4, 5]');
    }
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Validates Reading Section 3 (4-Person Matching)
 */
export function validateReadingSection3(sec: ReadingSection3): ValidationResult {
  const errors: string[] = [];
  if (!sec || typeof sec.title !== 'string') {
    errors.push('Reading Section 3 missing title');
  }
  if (!Array.isArray(sec.people) || sec.people.length !== 4) {
    errors.push('Reading Section 3 must have exactly 4 people (A, B, C, D)');
  }
  if (!Array.isArray(sec.questions) || sec.questions.length < 6) {
    errors.push('Reading Section 3 must have at least 6-7 matching questions');
  } else {
    const validPeopleIds = new Set(sec.people.map(p => p.id));
    sec.questions.forEach((q, idx) => {
      if (!validPeopleIds.has(q.correctPersonId)) {
        errors.push(`Question ${idx + 1} has invalid correctPersonId: ${q.correctPersonId}`);
      }
    });
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Validates Reading Section 4 (Headings Matching)
 */
export function validateReadingSection4(sec: ReadingSection4): ValidationResult {
  const errors: string[] = [];
  if (!sec || typeof sec.title !== 'string') {
    errors.push('Reading Section 4 missing title');
  }
  if (!Array.isArray(sec.headings) || sec.headings.length < 5) {
    errors.push('Reading Section 4 must have at least 5-7 headings');
  }
  if (!Array.isArray(sec.paragraphs) || sec.paragraphs.length < 4) {
    errors.push('Reading Section 4 must have at least 4-7 paragraphs');
  } else {
    sec.paragraphs.forEach((p, idx) => {
      if (typeof p.correctHeadingIndex !== 'number' || p.correctHeadingIndex < 0 || p.correctHeadingIndex >= sec.headings.length) {
        errors.push(`Paragraph ${idx + 1} heading index is out of bounds`);
      }
    });
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Validates Aptis Writing Module
 */
export function validateWritingModule(mod: AptisWritingModule): ValidationResult {
  const errors: string[] = [];
  if (!mod || typeof mod.themeName !== 'string') {
    errors.push('Writing module missing themeName');
  }
  if (!mod.part1 || !Array.isArray(mod.part1.questions) || mod.part1.questions.length !== 5) {
    errors.push('Writing Part 1 must contain exactly 5 short questions');
  }
  if (!mod.part2 || typeof mod.part2.prompt !== 'string' || mod.part2.prompt.length < 20) {
    errors.push('Writing Part 2 must contain a detailed personal/ethical prompt');
  }
  if (!mod.part3 || !Array.isArray(mod.part3.memberChats) || mod.part3.memberChats.length !== 3) {
    errors.push('Writing Part 3 must contain exactly 3 member chat messages');
  }
  if (!mod.part4 || !mod.part4.taskA || !mod.part4.taskB) {
    errors.push('Writing Part 4 must contain both Task A (informal email) and Task B (formal email)');
  }
  return { valid: errors.length === 0, errors };
}

export interface CoreVerificationResult {
  verified: boolean;
  errors: string[];
  itemCount: number;
  grammarCount: number;
  vocabCount: number;
}

/**
 * Pre-Presentation Verification for the Aptis General Core Test
 * Verifies every single question, distractor, and correct answer
 * across all 25 Grammar MCQs and 25 Vocabulary items (50 total).
 */
export function verifyCoreModule(core: AptisCoreModule): CoreVerificationResult {
  const errors: string[] = [];

  if (!core) {
    return {
      verified: false,
      errors: ['Core module is null or undefined'],
      itemCount: 0,
      grammarCount: 0,
      vocabCount: 0
    };
  }

  // 1. Verify Grammar (exactly 25 questions)
  if (!Array.isArray(core.grammarQuestions) || core.grammarQuestions.length !== 25) {
    errors.push(`Grammar questions count must be exactly 25 (found ${core.grammarQuestions?.length || 0})`);
  } else {
    core.grammarQuestions.forEach((q, idx) => {
      const gVal = validateGrammarQuestion(q);
      if (!gVal.valid) {
        errors.push(`Grammar Q${idx + 1} (${q?.id || 'unnamed'}): ${gVal.errors.join('; ')}`);
      }
      if (!q.options || q.options[q.correctIndex] === undefined || String(q.options[q.correctIndex]).trim() === '') {
        errors.push(`Grammar Q${idx + 1} has undefined or empty correct answer choice`);
      }
    });
  }

  // 2. Verify Vocabulary Task 1: Word Matching (5 items)
  if (!Array.isArray(core.vocabWordMatching) || core.vocabWordMatching.length !== 5) {
    errors.push(`Vocab Word Matching count must be exactly 5 (found ${core.vocabWordMatching?.length || 0})`);
  } else {
    core.vocabWordMatching.forEach((item, idx) => {
      const vVal = validateVocabWordMatch(item);
      if (!vVal.valid) {
        errors.push(`Vocab Task 1 item ${idx + 1} (${item?.id}): ${vVal.errors.join('; ')}`);
      }
    });
  }

  // 3. Verify Vocabulary Task 2: Definitions (5 items)
  if (!Array.isArray(core.vocabDefinitions) || core.vocabDefinitions.length !== 5) {
    errors.push(`Vocab Definitions count must be exactly 5 (found ${core.vocabDefinitions?.length || 0})`);
  } else {
    core.vocabDefinitions.forEach((item, idx) => {
      const vVal = validateVocabDefinition(item);
      if (!vVal.valid) {
        errors.push(`Vocab Task 2 item ${idx + 1} (${item?.id}): ${vVal.errors.join('; ')}`);
      }
    });
  }

  // 4. Verify Vocabulary Task 3: Collocations (5 items)
  if (!Array.isArray(core.vocabCollocations) || core.vocabCollocations.length !== 5) {
    errors.push(`Vocab Collocations count must be exactly 5 (found ${core.vocabCollocations?.length || 0})`);
  } else {
    core.vocabCollocations.forEach((item, idx) => {
      const vVal = validateVocabCollocation(item);
      if (!vVal.valid) {
        errors.push(`Vocab Task 3 item ${idx + 1} (${item?.id}): ${vVal.errors.join('; ')}`);
      }
    });
  }

  // 5. Verify Vocabulary Task 4: Sentence Completion (5 items)
  if (!Array.isArray(core.vocabSentenceCompletion) || core.vocabSentenceCompletion.length !== 5) {
    errors.push(`Vocab Sentence Completion count must be exactly 5 (found ${core.vocabSentenceCompletion?.length || 0})`);
  } else {
    core.vocabSentenceCompletion.forEach((item, idx) => {
      const vVal = validateVocabCollocation(item);
      if (!vVal.valid) {
        errors.push(`Vocab Task 4 item ${idx + 1} (${item?.id}): ${vVal.errors.join('; ')}`);
      }
    });
  }

  // 6. Verify Vocabulary Task 5: Context Matching (5 items)
  if (!Array.isArray(core.vocabContextMatching) || core.vocabContextMatching.length !== 5) {
    errors.push(`Vocab Context Matching count must be exactly 5 (found ${core.vocabContextMatching?.length || 0})`);
  } else {
    core.vocabContextMatching.forEach((item, idx) => {
      const vVal = validateVocabWordMatch(item);
      if (!vVal.valid) {
        errors.push(`Vocab Task 5 item ${idx + 1} (${item?.id}): ${vVal.errors.join('; ')}`);
      }
    });
  }

  const grammarCount = core.grammarQuestions?.length || 0;
  const vocabCount = 
    (core.vocabWordMatching?.length || 0) +
    (core.vocabDefinitions?.length || 0) +
    (core.vocabCollocations?.length || 0) +
    (core.vocabSentenceCompletion?.length || 0) +
    (core.vocabContextMatching?.length || 0);

  return {
    verified: errors.length === 0,
    errors,
    itemCount: grammarCount + vocabCount,
    grammarCount,
    vocabCount
  };
}

