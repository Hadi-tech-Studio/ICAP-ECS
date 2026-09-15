/**
 * ============================================================================
 * aiTestGenerator.ts
 * AI-Powered Dynamic Exam Content Generation & Intelligent Replacement Engine
 * 
 * Uses Gemini AI models via the server-side proxy `/api/gemini/generate` to
 * produce brand-new, non-repeating test content for:
 * 1. Aptitude General Test (MCQs, Error Identification, Sentence Transformation, Vocab)
 * 2. Reading Test (Diverse Passages, Gaps, Logic Reordering, 4-Perspective Views, Headings)
 * 3. Writing Test (ECS Scenarios, Onboarding, Statements, Group Chats, Informal & Formal Emails)
 * 
 * Automatically validates all questions and tests them for semantic similarity
 * against the student's previous history. Automatically substitutes any similar
 * question with a newly generated or verified alternative.
 * ============================================================================
 */

import { callGeminiAPI } from './api-handler';
import { 
  GrammarQuestion, 
  ReadingSection1, 
  ReadingSection2, 
  ReadingSection3, 
  ReadingSection4, 
  AptisWritingModule,
  WritingPart4
} from '../types';
import { 
  isPart4DefaultOrBanned, 
  selectFreshPart4EmailTask 
} from '../data/expandedPart4EmailPool';
import { 
  isQuestionSubstantiallySimilar, 
  recordQuestionsToStudentHistory 
} from './questionHistoryService';
import { 
  validateGrammarQuestion, 
  validateReadingSection1, 
  validateReadingSection2, 
  validateReadingSection3, 
  validateReadingSection4, 
  validateWritingModule 
} from './questionValidationService';

/**
 * Attempts to generate a batch of fresh grammar questions using Gemini AI
 */
export async function generateAiGrammarQuestions(
  count: number = 10,
  topics: string[] = ['Verbs', 'Parts of Speech', 'Tenses', 'Articles', 'Collocations', 'Inversions', 'Subjunctive', 'Synonyms', 'Antonyms', 'Modal Conditionals', 'Active / Passive', 'Relative Clauses']
): Promise<GrammarQuestion[]> {
  const prompt = `You are a senior exam designer for the ICAP English Communication Skills (ECS) Aptis General Core Test.
Generate ${count} distinct, high-quality, professional English grammar multiple-choice questions strictly aligned with the ICAP ECS syllabus.
The questions must cover the following 12 core areas:
- Verbs (gerunds, infinitives, causatives, phrasal verbs)
- Parts of Speech (adjectives, adverbs, nouns, prepositions, conjunctions)
- Tenses (perfect continuous, past perfect, future progressive)
- Articles & Determiners (definite, indefinite, zero article, quantifiers)
- Collocations & Business Idioms
- Inversions (negative adverbials, conditionals, correlatives)
- Subjunctive & Mandative Mood (demands, recommendations, necessity)
- Synonyms in formal corporate/accounting register
- Antonyms in formal corporate/accounting register
- Modal Conditionals & Mixed Conditionals (unreal past, deduction, obligation)
- Active / Passive Voice (formal reporting, impersonal structures)
- Relative Clauses (defining vs non-defining, prepositional relative clauses)

Return ONLY a valid JSON array of objects conforming to this exact schema:
[
  {
    "category": "Verbs" | "Parts of Speech" | "Tenses" | "Articles" | "Collocations" | "Inversions" | "Subjunctive" | "Synonyms" | "Antonyms" | "Modal Conditionals" | "Active / Passive" | "Relative Clauses",
    "difficulty": "Easy" | "Medium" | "Hard",
    "question": "Clear question sentence using a blank '_______' to be filled",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "englishExplanation": "Concise grammatical explanation",
    "urduExplanation": "اردو میں مختصر اور جامع وضاحت"
  }
]
CRITICAL RULES:
1. NEVER embed answer choices, options, or letters like [A], (A), [B] inside the question text. The question MUST contain only the sentence statement with '_______'.
2. Provide exactly 4 distinct, plausible options for each question.
3. The correctIndex MUST be 0, 1, 2, or 3.`;

  try {
    const result = await callGeminiAPI<GrammarQuestion[]>({
      prompt,
      systemInstruction: 'You are an expert Cambridge/Aptis/ICAP exam writer. Always output strictly valid JSON without conversational text.',
      responseMimeType: 'application/json',
      model: 'gemini-3.1-flash-lite'
    });

    if (Array.isArray(result) && result.length > 0) {
      const validated: GrammarQuestion[] = [];
      for (let i = 0; i < result.length; i++) {
        const item = result[i];
        const q: GrammarQuestion = {
          id: `ai-g-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 7)}`,
          category: item.category || 'General Grammar',
          difficulty: item.difficulty || 'Medium',
          question: item.question,
          options: item.options,
          correctIndex: item.correctIndex,
          englishExplanation: item.englishExplanation || 'Follow standard ICAP grammar and syntax rules.',
          urduExplanation: item.urduExplanation || 'آئی کیپ گرائمر کے اصولوں کے مطابق درست جواب منتخب کریں۔'
        };

        // 1. Validate structure
        const valRes = validateGrammarQuestion(q);
        if (!valRes.valid) continue;

        // 2. Check semantic similarity against student history
        const simRes = isQuestionSubstantiallySimilar(q.question, 'grammar-mcq', q.options, 0.50);
        if (simRes.isSimilar) {
          console.info(`[aiTestGenerator] AI question skipped due to similarity: "${q.question.substring(0, 40)}..."`);
          continue; // Automatically skip similar questions
        }

        validated.push(q);
      }
      return validated;
    }
  } catch (err) {
    console.warn('[aiTestGenerator] AI grammar generation fallback to procedural pool:', err);
  }

  return [];
}

/**
 * Attempts to generate a fresh Reading Section 1 (Workplace/Professional Notice with 5 gaps)
 */
export async function generateAiReadingSection1(): Promise<ReadingSection1 | null> {
  const prompt = `Create a brand new Aptis General Reading Test Section 1 for professional accounting trainees.
Topic: A corporate or financial memorandum, audit protocol notice, or workplace policy announcement.
It must contain 5 paragraphs with one gap each (gap1 to gap5).
Each gap must have 3 distinct options (correctIndex 0, 1, or 2).
Include English and Urdu explanations for each gap.

Return ONLY a valid JSON object matching this schema:
{
  "title": "Clear Title of Memo/Notice",
  "introduction": "Read the text below. Choose the word that best fits each gap.",
  "paragraphs": [
    {
      "textBefore": "Text before the gap...",
      "gapId": "gap1",
      "options": ["option1", "option2", "option3"],
      "correctIndex": 0,
      "textAfter": "...text after the gap."
    }
  ],
  "explanations": {
    "gap1": { "english": "Explanation...", "urdu": "وضاحت..." },
    "gap2": { "english": "Explanation...", "urdu": "وضاحت..." },
    "gap3": { "english": "Explanation...", "urdu": "وضاحت..." },
    "gap4": { "english": "Explanation...", "urdu": "وضاحت..." },
    "gap5": { "english": "Explanation...", "urdu": "وضاحت..." }
  }
}`;

  try {
    const result = await callGeminiAPI<any>({
      prompt,
      systemInstruction: 'You are an expert Cambridge/Aptis exam designer. Output strict JSON only.',
      responseMimeType: 'application/json',
      model: 'gemini-3.1-flash-lite'
    });

    if (result && result.title && Array.isArray(result.paragraphs) && result.paragraphs.length === 5) {
      const section: ReadingSection1 = {
        id: `ai-r-sec1-${Date.now()}`,
        title: result.title,
        introduction: result.introduction || 'Read the notice below. Choose the word that best fits each gap.',
        paragraphs: result.paragraphs,
        explanations: result.explanations || {}
      };

      const val = validateReadingSection1(section);
      if (val.valid) {
        const sim = isQuestionSubstantiallySimilar(section.title, 'reading-s1', undefined, 0.60);
        if (!sim.isSimilar) {
          return section;
        }
      }
    }
  } catch (err) {
    console.warn('[aiTestGenerator] AI Reading Section 1 fallback to procedural:', err);
  }

  return null;
}

/**
 * Attempts to generate a brand-new Writing Module (Theme, Part 1, Part 2, Part 3, Part 4)
 */
export async function generateAiWritingModule(): Promise<AptisWritingModule | null> {
  const prompt = `Create a completely new, authentic Aptis General Writing Test module aligned with the ICAP English Communication Skills (ECS) syllabus.
Choose an engaging professional or community club context (e.g., Young Corporate Governance Forum, Sustainable Business Circle, Forensic Data Association, Chartered Students Welfare Society, Global Trade Society).

Structure:
1. Part 1: 5 short onboarding questions (1-5 words each).
2. Part 2: Form Name and prompt requiring a 20-30 words declaration of personal motivation/ethics.
3. Part 3: 3 distinct member chat queries with sender names and questions (requiring 30-40 words each).
4. Part 4: Executive notice announcing an unexpected change or cancellation (e.g. conference venue change, workshop refund converted into vouchers, trip cancelled).
   - Task A: Informal email to a member friend (40-50 words).
   - Task B: Formal email to the President/Authority (120-150 words).

Return ONLY a valid JSON object matching the AptisWritingModule schema:
{
  "themeName": "Name of Society or Club",
  "part1": {
    "context": "You have joined the [Club]. Answer the 5 onboarding questions from the coordinator in 1-5 words each.",
    "questions": [
      { "id": "q1", "prompt": "Question 1?", "maxWords": 5, "sampleAnswer": "Sample answer." },
      { "id": "q2", "prompt": "Question 2?", "maxWords": 5, "sampleAnswer": "Sample answer." },
      { "id": "q3", "prompt": "Question 3?", "maxWords": 5, "sampleAnswer": "Sample answer." },
      { "id": "q4", "prompt": "Question 4?", "maxWords": 5, "sampleAnswer": "Sample answer." },
      { "id": "q5", "prompt": "Question 5?", "maxWords": 5, "sampleAnswer": "Sample answer." }
    ]
  },
  "part2": {
    "formName": "Membership Profile & Objectives Form",
    "prompt": "Please state why you joined... (Write 20-30 words)",
    "minWords": 20,
    "maxWords": 30,
    "sampleAnswer": "High quality sample answer."
  },
  "part3": {
    "clubName": "Club Discussion Room",
    "context": "You are chatting with members. Respond to all 3 messages. (Write 30-40 words each)",
    "memberChats": [
      { "id": "chat1", "memberName": "Ayesha (Senior Analyst)", "avatarInitials": "AA", "message": "Message 1?", "minWords": 30, "maxWords": 40, "sampleAnswer": "Sample response." },
      { "id": "chat2", "memberName": "Bilal (Audit Trainee)", "avatarInitials": "BT", "message": "Message 2?", "minWords": 30, "maxWords": 40, "sampleAnswer": "Sample response." },
      { "id": "chat3", "memberName": "Farhan (Coordinator)", "avatarInitials": "FC", "message": "Message 3?", "minWords": 30, "maxWords": 40, "sampleAnswer": "Sample response." }
    ]
  },
  "part4": {
    "clubName": "Club Executive Announcement",
    "contextNotice": "Official notice text regarding the unexpected event cancellation...",
    "taskA": {
      "prompt": "Write an email to your club friend. Express your thoughts and suggest an alternative. (Write 40-50 words)",
      "minWords": 40,
      "maxWords": 50,
      "sampleAnswer": "Hi... sample informal email."
    },
    "taskB": {
      "prompt": "Write a formal email to the President. Express your dissatisfaction and request a solution or refund. (Write 120-150 words)",
      "minWords": 120,
      "maxWords": 150,
      "sampleAnswer": "Dear President... sample formal email."
    }
  }
}`;

  try {
    const result = await callGeminiAPI<AptisWritingModule>({
      prompt,
      systemInstruction: 'You are an expert Cambridge/Aptis exam designer. Output strict JSON only.',
      responseMimeType: 'application/json',
      model: 'gemini-3.1-flash-lite'
    });

    if (result && result.themeName && result.part1 && result.part2 && result.part3 && result.part4) {
      let finalPart4 = result.part4;
      if (isPart4DefaultOrBanned(finalPart4)) {
        finalPart4 = selectFreshPart4EmailTask(new Set());
      }

      const module: AptisWritingModule = {
        themeName: result.themeName,
        part1: {
          id: `ai-w-p1-${Date.now()}`,
          context: result.part1.context,
          questions: result.part1.questions
        },
        part2: {
          id: `ai-w-p2-${Date.now()}`,
          formName: result.part2.formName,
          prompt: result.part2.prompt,
          minWords: result.part2.minWords || 20,
          maxWords: result.part2.maxWords || 30,
          sampleAnswer: result.part2.sampleAnswer
        },
        part3: {
          id: `ai-w-p3-${Date.now()}`,
          clubName: result.part3.clubName,
          context: result.part3.context,
          memberChats: result.part3.memberChats.map((c, idx) => ({
            id: `ai-chat-${idx + 1}`,
            memberName: c.memberName,
            avatarInitials: c.avatarInitials || c.memberName.substring(0, 2).toUpperCase(),
            message: c.message,
            minWords: c.minWords || 30,
            maxWords: c.maxWords || 40,
            sampleAnswer: c.sampleAnswer
          }))
        },
        part4: {
          id: `ai-w-p4-${Date.now()}`,
          clubName: finalPart4.clubName || result.part4.clubName || 'Executive Committee',
          scenarioTopic: finalPart4.scenarioTopic,
          communicationPurpose: finalPart4.communicationPurpose,
          recipientTitle: finalPart4.recipientTitle,
          recipientName: finalPart4.recipientName,
          friendName: finalPart4.friendName,
          contextNotice: finalPart4.contextNotice,
          taskA: finalPart4.taskA,
          taskB: finalPart4.taskB
        }
      };

      const val = validateWritingModule(module);
      if (val.valid) {
        const sim = isQuestionSubstantiallySimilar(module.themeName, 'writing-task', undefined, 0.60);
        if (!sim.isSimilar) {
          return module;
        }
      }
    }
  } catch (err) {
    console.warn('[aiTestGenerator] AI Writing Module fallback to procedural pool:', err);
  }

  return null;
}

/**
 * Dynamically generates a brand-new, authentic Part 4 Email Writing Task (Task 4A informal + Task 4B formal)
 * aligned with the ICAP English Communication Skills (ECS) syllabus using Gemini AI.
 * 
 * Guarantees variety across scenarios, communication purposes, recipients, and contexts.
 * Strictest anti-repetition rules: NEVER produces the default library/Zoom/15% fee task,
 * and verifies that the output has not been previously seen by the student.
 */
export async function generateAiWritingPart4(
  contextTheme?: string,
  excludedKeywords?: string[]
): Promise<WritingPart4 | null> {
  const scenarioAngles = [
    'Mandatory enterprise accounting software (ERP/SAP) migration scheduled with zero trainee classroom training',
    'Sudden curtailment of pre-exam study leaves two weeks prior to ICAP CAF examinations due to client audit deadlines',
    'Abrupt relocation of regional audit offices 40km away along a remote motorway with zero public transport or shuttle',
    'Whistleblowing discovery: uncompetitive multi-million procurement contracts awarded to client director’s family, with management intimidation',
    'Revocation of financial database research subscriptions (Bloomberg, Capital IQ) forcing reliance on unverified internet searches',
    'Cancellation of coveted international audit training secondments (London/Dubai) with zero compensatory opportunities',
    'Mandatory biometric surveillance and continuous keystroke logging software installed on trainee audit laptops',
    'Sudden 65% reduction in outstation provincial factory travel per diems and cancellation of intercity transit reimbursements',
    'Audit client plant manager refusing physical inventory observation access under claim of trade secrets',
    'Revocation of overtime compensation and transport allowances during peak busy-season statutory reporting',
    'Unilateral changes to ICAP Continuous Professional Development (CPD) certification criteria disqualifying trainee credits',
    'Urgent environmental sustainability (ESG) compliance audit finding hazardous chemical storage violations at client facility'
  ];

  const randomAngle = scenarioAngles[Math.floor(Math.random() * scenarioAngles.length)];

  const prompt = `You are a chief examiner designing an authentic writing assessment for the Institute of Chartered Accountants of Pakistan (ICAP) English Communication Skills (ECS) and Cambridge Aptis Writing examination (Part 4: Email Writing).

Create a COMPLETELY NEW, authentic Part 4 email task.
CRITICAL MANDATE: NEVER generate anything about a community library, Zoom meetings, or a 15% membership fee increase. This is the banned default question and must NEVER appear.

Theme Context: ${contextTheme || 'Chartered Accountancy & Professional Corporate Practice'}
Focus Scenario Angle: ${randomAngle}

Requirements:
1. "scenarioTopic": A concise, realistic workplace/accounting/governance dilemma.
2. "communicationPurpose": A specific objective (e.g. petitioning against arbitrary directive, requesting policy exemption, proposing compromise schedule, reporting ethics issue, seeking statutory clarification).
3. "recipientTitle": A realistic senior authority title (e.g. Senior Engagement Partner, Director of Student Training, Head of Quality Assurance & Risk Management, Audit Committee Chairperson, Chief Financial Officer, Human Resources Director, Ethics Ombudsman).
4. "recipientName": A realistic professional name with honorifics (e.g., Mr. Tariq Mahmud, FCA; Ms. Saira Malik; Dr. Zafar Iqbal; Barrister Asad Alam).
5. "friendName": A colleague/peer trainee name (e.g., Ahmed, Bilal, Sana, Maria, Daniyal, Hira, Saad, Fatima).
6. "clubName": The organizational entity or practice group name (e.g., Assurance Practice Committee, ICAP Trainee Council, Regional Audit & Governance Forum).
7. "contextNotice": A realistic internal memorandum, circular, or directive with reference number and date detailing the sudden policy change, disruption, or crisis (60-100 words).
8. "taskA":
   - prompt: Prompt to write an informal email to your friend (using the friendName chosen above). Express shock/concern, discuss impact on daily work/studies, and suggest a joint action or meeting to coordinate. (Write 40–60 words)
   - minWords: 40
   - maxWords: 60
   - sampleAnswer: A high-scoring informal email model answer (40-60 words) using natural contractions and conversational tone.
9. "taskB":
   - prompt: Prompt to write a formal email to the designated authority (using recipientTitle and recipientName). Express polite but firm concern/dissent, analyze the risks/impropriety under professional standards, and propose a constructive, workable compromise or solution. (Write 120–150 words)
   - minWords: 120
   - maxWords: 150
   - sampleAnswer: A high-scoring formal email model answer (120-150 words) adhering strictly to professional etiquette, no informal contractions, sophisticated discourse markers, and clear sign-off.

Return ONLY a valid JSON object matching this schema:
{
  "clubName": "...",
  "scenarioTopic": "...",
  "communicationPurpose": "...",
  "recipientTitle": "...",
  "recipientName": "...",
  "friendName": "...",
  "contextNotice": "...",
  "taskA": {
    "prompt": "...",
    "minWords": 40,
    "maxWords": 60,
    "sampleAnswer": "..."
  },
  "taskB": {
    "prompt": "...",
    "minWords": 120,
    "maxWords": 150,
    "sampleAnswer": "..."
  }
}`;

  try {
    const result = await callGeminiAPI<WritingPart4>({
      prompt,
      systemInstruction: 'You are an expert Cambridge/Aptis/ICAP exam writer. Always output strictly valid JSON without conversational text.',
      responseMimeType: 'application/json',
      model: 'gemini-3.1-flash-lite'
    });

    if (
      result &&
      result.contextNotice &&
      result.taskA &&
      result.taskA.prompt &&
      result.taskB &&
      result.taskB.prompt &&
      !isPart4DefaultOrBanned(result)
    ) {
      // Check semantic similarity against student history
      const sim = isQuestionSubstantiallySimilar(result.contextNotice, 'writing-task', undefined, 0.45);
      if (!sim.isSimilar) {
        return {
          id: `ai-w-p4-${Date.now()}`,
          clubName: result.clubName || 'Professional Practice Council',
          scenarioTopic: result.scenarioTopic || 'Professional Practice Directive',
          communicationPurpose: result.communicationPurpose || 'Formal Review and Policy Representation',
          recipientTitle: result.recipientTitle || 'Senior Practice Partner',
          recipientName: result.recipientName || 'Mr. Tariq Mahmud, FCA',
          friendName: result.friendName || 'Ahmed',
          contextNotice: result.contextNotice,
          taskA: {
            prompt: result.taskA.prompt,
            minWords: result.taskA.minWords || 40,
            maxWords: result.taskA.maxWords || 60,
            sampleAnswer: result.taskA.sampleAnswer || ''
          },
          taskB: {
            prompt: result.taskB.prompt,
            minWords: result.taskB.minWords || 120,
            maxWords: result.taskB.maxWords || 150,
            sampleAnswer: result.taskB.sampleAnswer || ''
          }
        };
      }
    }
  } catch (err) {
    console.warn('[aiTestGenerator] AI Part 4 generation fallback to procedural pool:', err);
  }

  return null;
}

