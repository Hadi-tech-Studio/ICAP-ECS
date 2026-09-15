/**
 * exam.js
 * Interactive Practice Test Engine logic for exam.html
 */

(function() {
  'use strict';

  // 110 minutes in seconds (1 hour 50 min)
  let timeLeft = 110 * 60;
  let timerInterval = null;
  let activeTab = 'module1';
  let isSubmitted = false;

  const grammarQuestions = [
    {
      id: 'g1',
      category: 'Subject-Verb Agreement',
      question: 'The internal audit committee, along with the external compliance officers, _______ reviewing the quarterly financial reconciliations.',
      options: ['are', 'is', 'were', 'have been'],
      correctIndex: 1,
      englishExplanation: 'When a singular subject ("The internal audit committee") is followed by parenthetical phrases like "along with", the verb remains singular ("is").',
      urduExplanation: 'جب اصل Subject واحد (singular) ہو اور اس کے ساتھ "along with" آئے، تو Verb ہمیشہ Singular ("is") رہے گا۔'
    },
    {
      id: 'g2',
      category: 'Prepositions & Collocations',
      question: 'The management failed to comply _______ the disclosure standards outlined in IFRS 15 regarding revenue recognition.',
      options: ['to', 'with', 'for', 'about'],
      correctIndex: 1,
      englishExplanation: 'The standard accounting verb "comply" strictly takes the dependent preposition "with".',
      urduExplanation: 'لفظ "Comply" کے ساتھ ہمیشہ Preposition "with" استعمال ہوتی ہے (Comply with rules/standards)۔'
    },
    {
      id: 'g3',
      category: 'Passive Voice in Auditing',
      question: 'Choose the most objective, professional passive phrasing for an audit discrepancy report:',
      options: [
        'We noticed that someone forgot to calculate depreciation.',
        'Depreciation on manufacturing equipment was inadvertently omitted from the ledger.',
        'The bookkeeper did not do the depreciation calculation.',
        'You have made a big error in depreciation ledger accounts.'
      ],
      correctIndex: 1,
      englishExplanation: 'Formal ICAP audit writing favors passive, non-accusatory voice ("was inadvertently omitted") over personal pronouns.',
      urduExplanation: 'آڈٹ رپورٹس میں پروفیشنل انداز اپنانے کے لیے Passive Voice استعمال کی جاتی ہے ("was inadvertently omitted")۔'
    },
    {
      id: 'g4',
      category: 'Conditionals & Prudence',
      question: 'Had the CFO known about the unrecorded liability earlier, the final audited statements _______ issued on Friday.',
      options: ['would not be', 'would not have been', 'will not have been', 'had not been'],
      correctIndex: 1,
      englishExplanation: 'Third conditional (inverted past counterfactual): "Had + Subject + Past Participle" requires "would have / would not have been".',
      urduExplanation: 'جب شروع میں "Had + 3rd form" آئے تو دوسرے حصے میں "would have / would not have been" کا استعمال لازمی ہے۔'
    },
    {
      id: 'g5',
      category: 'Vocabulary & Diction',
      question: 'Select the term that best denotes an accountant\'s formal duty to act in the best financial interest of the client:',
      options: ['Arbitrary obligation', 'Fiduciary duty', 'Pecuniary leisure', 'Contingent waiver'],
      correctIndex: 1,
      englishExplanation: '"Fiduciary duty" refers to the highest legal and ethical standard of care and trust owed by financial professionals.',
      urduExplanation: '"Fiduciary duty" کا مطلب ہے امانت داری کا فرض — یعنی کلائنٹ کے مالی مفاد کا مکمل دیانتداری سے تحفظ کرنا۔'
    }
  ];

  const readingQuestions = [
    {
      id: 'r1',
      category: 'Reading Comprehension',
      passage: 'In contemporary corporate governance, materiality is not merely a quantitative threshold expressed in monetary terms; it encompasses qualitative dimensions that could alter the economic decisions of a reasonable user relying on financial statements.',
      question: 'Why can a small unrecorded transaction still be regarded as material according to the passage?',
      options: [
        'Because it bankrupts the company immediately.',
        'Because it reflects upon managerial integrity and corporate governance.',
        'Because all small items are illegal.',
        'Because tax authorities fine everyone.'
      ],
      correctIndex: 1,
      englishExplanation: 'The passage notes that qualitative factors such as management integrity determine materiality.',
      urduExplanation: 'چھوٹی رقم بھی اس لیے Material ہو سکتی ہے کیونکہ اس سے مینجمنٹ کی دیانتداری پر سوالات اٹھتے ہیں۔'
    }
  ];

  let studentAnswers = {};
  let emailText = '';
  let explanationLangs = {};

  function startTimer() {
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        submitExam();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const el = document.getElementById('exam-timer');
    if (!el) return;
    const hrs = Math.floor(timeLeft / 3600);
    const mins = Math.floor((timeLeft % 3600) / 60);
    const secs = timeLeft % 60;
    el.textContent = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function updateProgress() {
    const total = grammarQuestions.length + readingQuestions.length + 1;
    const answered = Object.keys(studentAnswers).length + (emailText.trim().length > 20 ? 1 : 0);
    const pct = Math.round((answered / total) * 100);

    const countText = document.getElementById('answered-count-text');
    const pctText = document.getElementById('progress-percent-text');
    const bar = document.getElementById('progress-bar-fill');

    if (countText) countText.textContent = `${answered} of ${total} items answered`;
    if (pctText) pctText.textContent = `${pct}% Completed`;
    if (bar) bar.style.width = `${pct}%`;
  }

  function renderModule() {
    const container = document.getElementById('module-content-container');
    if (!container) return;

    if (activeTab === 'module1') {
      container.innerHTML = `
        <div class="space-y-4">
          ${grammarQuestions.map((q, idx) => {
            const selected = studentAnswers[q.id];
            const isCorrect = selected === q.correctIndex;
            const lang = explanationLangs[q.id] || 'english';

            return `
              <div class="bg-white rounded-2xl p-5 border ${isSubmitted ? (isCorrect ? 'border-emerald-300 bg-emerald-50/20' : 'border-rose-300 bg-rose-50/20') : 'border-slate-200'} shadow-sm">
                <div class="flex items-center justify-between mb-3">
                  <span class="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700">Q${idx + 1} • ${q.category}</span>
                  ${isSubmitted ? `<span class="text-xs font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}">${isCorrect ? 'Correct (+1)' : 'Incorrect (0)'}</span>` : ''}
                </div>
                <p class="text-sm font-semibold text-slate-900 mb-4">${q.question}</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  ${q.options.map((opt, optIdx) => `
                    <button class="opt-btn p-3 text-left rounded-xl border text-xs sm:text-sm font-medium transition ${selected === optIdx ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'}"
                      data-qid="${q.id}" data-opt="${optIdx}">
                      <span class="font-bold mr-2">${String.fromCharCode(65 + optIdx)}.</span> ${opt}
                    </button>
                  `).join('')}
                </div>

                ${isSubmitted ? `
                  <div class="mt-4 pt-3 border-t border-slate-200 text-xs">
                    <div class="flex justify-between items-center mb-1">
                      <span class="font-bold text-slate-800">Explanation:</span>
                      <button class="toggle-lang-btn text-xs font-bold text-emerald-700 underline" data-qid="${q.id}">
                        ${lang === 'english' ? '🇵🇰 Switch to Urdu (آسان اردو)' : '🇬🇧 Switch to English'}
                      </button>
                    </div>
                    <div class="p-3 bg-slate-50 rounded-xl text-slate-700 ${lang === 'urdu' ? 'font-urdu' : ''}">
                      ${lang === 'english' ? q.englishExplanation : q.urduExplanation}
                    </div>
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else if (activeTab === 'module2') {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span class="px-2 py-0.5 rounded text-xs font-bold bg-teal-100 text-teal-800">Reading Passage</span>
            <p class="text-xs sm:text-sm text-slate-800 mt-3 leading-relaxed font-serif bg-slate-50 p-4 rounded-xl border border-slate-200">
              ${readingQuestions[0].passage}
            </p>
          </div>
          ${readingQuestions.map((q, idx) => `
            <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <p class="text-sm font-semibold text-slate-900 mb-3">${q.question}</p>
              <div class="space-y-2">
                ${q.options.map((opt, optIdx) => `
                  <button class="opt-btn w-full p-3 text-left rounded-xl border text-xs sm:text-sm ${studentAnswers[q.id] === optIdx ? 'bg-teal-50 border-teal-500 font-bold' : 'bg-slate-50 border-slate-200'}"
                    data-qid="${q.id}" data-opt="${optIdx}">
                    <span class="font-bold mr-2">${String.fromCharCode(65 + optIdx)}.</span> ${opt}
                  </button>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (activeTab === 'module3') {
      container.innerHTML = `
        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 class="font-bold text-slate-900 text-sm">Module 3: Formal Audit Delay Email (120–150 words)</h3>
          <p class="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
            Scenario: You are an Audit Senior at Apex Chemicals. Safety clearance caused a 48-hour delay in inventory verification. Write a formal email to your Audit Partner explaining the delay and requesting an extension.
          </p>
          <textarea id="email-textarea" rows="6" placeholder="Dear Mr. Tariq,\n\nI am writing to formally apprise you of an unforeseen delay..." class="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-sans">${emailText}</textarea>
        </div>
      `;
    }

    attachEventListeners();
  }

  function attachEventListeners() {
    document.querySelectorAll('.opt-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        if (isSubmitted) return;
        const qid = btn.getAttribute('data-qid');
        const opt = parseInt(btn.getAttribute('data-opt'), 10);
        studentAnswers[qid] = opt;
        updateProgress();
        renderModule();
      });
    });

    document.querySelectorAll('.toggle-lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-qid');
        explanationLangs[qid] = explanationLangs[qid] === 'urdu' ? 'english' : 'urdu';
        renderModule();
      });
    });

    const ta = document.getElementById('email-textarea');
    if (ta) {
      ta.addEventListener('input', (e) => {
        emailText = e.target.value;
        updateProgress();
      });
    }
  }

  function submitExam() {
    clearInterval(timerInterval);
    isSubmitted = true;

    let score = 0;
    grammarQuestions.forEach((q) => {
      if (studentAnswers[q.id] === q.correctIndex) score++;
    });
    readingQuestions.forEach((q) => {
      if (studentAnswers[q.id] === q.correctIndex) score++;
    });

    const total = grammarQuestions.length + readingQuestions.length;
    const pct = Math.round((score / total) * 100);

    const card = document.getElementById('score-summary-card');
    const badge = document.getElementById('pass-fail-badge');
    const heading = document.getElementById('final-score-heading');

    if (card) card.classList.remove('hidden');
    if (heading) heading.textContent = `Overall Score: ${pct}%`;
    if (badge) {
      if (pct >= 50) {
        badge.textContent = 'PASSED (ICAP STANDARD)';
        badge.className = 'px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-emerald-400 text-slate-950';
      } else {
        badge.textContent = 'NEEDS PRACTICE (< 50%)';
        badge.className = 'px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-rose-500 text-white';
      }
    }

    renderModule();
  }

  // Bind tabs
  document.getElementById('tab-module1')?.addEventListener('click', () => {
    activeTab = 'module1';
    renderModule();
  });
  document.getElementById('tab-module2')?.addEventListener('click', () => {
    activeTab = 'module2';
    renderModule();
  });
  document.getElementById('tab-module3')?.addEventListener('click', () => {
    activeTab = 'module3';
    renderModule();
  });

  document.getElementById('submit-exam-btn')?.addEventListener('click', submitExam);
  document.getElementById('retake-exam-btn')?.addEventListener('click', () => {
    timeLeft = 110 * 60;
    studentAnswers = {};
    emailText = '';
    isSubmitted = false;
    document.getElementById('score-summary-card')?.classList.add('hidden');
    startTimer();
    renderModule();
  });

  // Dynamic Generator via Gemini
  document.getElementById('generate-ai-mcqs-btn')?.addEventListener('click', async () => {
    if (window.callGeminiAPI) {
      const btn = document.getElementById('generate-ai-mcqs-btn');
      btn.textContent = 'Generating 5 MCQs...';
      const systemPrompt = 'You are a Senior ICAP English Examiner. Generate 5 MCQs. Randomize correctIndex across 0, 1, 2, 3 equally. Return JSON array with fields: id, category, question, options, correctIndex, englishExplanation, urduExplanation.';
      const fallback = [
        {
          id: 'gen-' + Date.now(),
          category: 'Preposition in Law',
          question: 'The auditor was bound _______ the non-disclosure agreement.',
          options: ['by', 'with', 'to', 'for'],
          correctIndex: 0,
          englishExplanation: 'One is "bound by" a legal contract or agreement.',
          urduExplanation: 'کسی معاہدے کا پابند ہونے کے لیے "bound by" آتا ہے۔'
        }
      ];

      const res = await window.callGeminiAPI(systemPrompt, 'Generate 5 ICAP MCQs', fallback);
      if (Array.isArray(res)) {
        res.forEach(item => grammarQuestions.push(item));
        renderModule();
      }
      btn.textContent = '✨ +5 AI Questions (Gemini)';
    }
  });

  // Init
  startTimer();
  renderModule();
})();
