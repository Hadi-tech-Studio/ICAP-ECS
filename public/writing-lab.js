/**
 * writing-lab.js
 * Logic for AI Writing & Email Evaluation Lab
 */

(function() {
  'use strict';

  const ta = document.getElementById('writing-textarea');
  const counter = document.getElementById('char-word-counter');
  const badge = document.getElementById('word-badge');

  const fallbackEvaluation = {
    score: 82,
    bandRating: 'CA Professional',
    toneRegister: 'Formal',
    summaryFeedback: 'Clear purpose statement and strong vocabulary ("mitigating steps", "concluding verification"). Appropriate passive voice in auditing.',
    urduSummary: 'بہترین پروفیشنل ای میل! آپ کا انداز مکمل طور پر باوقار اور آئی کیپ امتحانی معیار کے مطابق ہے۔',
    sentences: [
      {
        originalSentence: "I am writing this email to telling you that audit is late.",
        correctedSentence: "I am writing to formally apprise you of an unforeseen delay in concluding the audit.",
        errorType: "Infinitive & Register Error",
        explanation: "Use 'to apprise' instead of 'to telling'. In formal audit writing, avoid casual phrasing."
      },
      {
        originalSentence: "The warehouse guy said we cannot count goods due to safety issues.",
        correctedSentence: "Warehouse management indicated that inventory verification was temporarily halted due to safety protocols.",
        errorType: "Informal Word Choice",
        explanation: "Replace colloquial 'warehouse guy' with 'warehouse management'."
      },
      {
        originalSentence: "Please give us two more days to give report.",
        correctedSentence: "I respectfully request a 48-hour extension for submitting the finalized working paper report.",
        errorType: "Register & Politeness Tone",
        explanation: "Use 'I respectfully request an extension' for polite professional deference."
      }
    ]
  };

  function updateCounts() {
    const text = ta.value.trim();
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    const chars = ta.value.length;

    if (counter) counter.textContent = `${chars} chars • ${words} words`;

    if (badge) {
      if (words === 0) {
        badge.textContent = 'Target: 120-150 words';
        badge.className = 'text-xs font-bold px-3 py-1 rounded-lg bg-amber-100 text-amber-800';
      } else if (words < 120) {
        badge.textContent = `Too Short (${120 - words} words left)`;
        badge.className = 'text-xs font-bold px-3 py-1 rounded-lg bg-amber-100 text-amber-800';
      } else if (words > 150) {
        badge.textContent = `Over Limit (${words - 150} excess words)`;
        badge.className = 'text-xs font-bold px-3 py-1 rounded-lg bg-rose-100 text-rose-800';
      } else {
        badge.textContent = 'Word Count Ideal (120–150)';
        badge.className = 'text-xs font-bold px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800';
      }
    }
  }

  if (ta) {
    ta.addEventListener('input', updateCounts);
  }

  document.getElementById('insert-demo-draft-btn')?.addEventListener('click', () => {
    ta.value = "Dear Mr. Tariq,\n\nI am writing this email to telling you that audit is late. The warehouse guy said we cannot count goods due to safety issues. Also computer ERP system stopped working yesterday morning.\n\nWe have worked in night to finish fast with the workers. Please give us two more days to give report to the firm.\n\nThanks and regards,\nAudit Senior";
    updateCounts();
  });

  document.getElementById('generate-scenario-btn')?.addEventListener('click', async () => {
    const btn = document.getElementById('generate-scenario-btn');
    btn.textContent = 'Generating Scenario...';

    const systemPrompt = "You are an ICAP English examiner. Generate a random 120-word audit or accounting email scenario. Return JSON with fields: title, role, recipient, scenario.";
    const fallback = {
      title: "Bank Confirmation Delay Reminder",
      role: "Statutory Auditor",
      recipient: "Chief Financial Officer, Horizon Textiles Ltd",
      scenario: "During the interim audit, your team observed unrecorded disbursements. Write a 120–150 word formal email requesting an explanation from the CFO and recommending corrective control measures."
    };

    if (window.callGeminiAPI) {
      const res = await window.callGeminiAPI(systemPrompt, "Generate scenario", fallback);
      if (res && res.title) {
        document.getElementById('scenario-title').textContent = res.title;
        document.getElementById('scenario-meta').textContent = `Role: ${res.role} | Recipient: ${res.recipient}`;
        document.getElementById('scenario-text').textContent = res.scenario;
      }
    }
    btn.textContent = '✨ Generate Random ICAP Scenario';
  });

  document.getElementById('analyze-writing-btn')?.addEventListener('click', async () => {
    const text = ta.value.trim();
    if (!text) {
      if (ta) ta.focus();
      return;
    }

    const btn = document.getElementById('analyze-writing-btn');
    btn.textContent = 'Analyzing Sentences...';

    const systemPrompt = `You are an ICAP CA English examiner. Analyze student email. Return JSON:
{
  "score": 82,
  "bandRating": "CA Professional" | "Intermediate" | "Beginner",
  "toneRegister": "Formal" | "Informal" | "Mixed",
  "summaryFeedback": "...",
  "urduSummary": "...",
  "sentences": [
    {
      "originalSentence": "...",
      "correctedSentence": "...",
      "errorType": "...",
      "explanation": "..."
    }
  ]
}`;

    let result = fallbackEvaluation;
    if (window.callGeminiAPI) {
      result = await window.callGeminiAPI(systemPrompt, text, fallbackEvaluation);
    }

    // Render diagnostic report
    const dashboard = document.getElementById('diagnostic-dashboard');
    if (dashboard) dashboard.classList.remove('hidden');

    document.getElementById('overall-score-meter').textContent = `Overall Score: ${result.score || 80} / 100`;
    document.getElementById('band-rating-val').textContent = result.bandRating || 'CA Professional';
    document.getElementById('tone-detector-val').textContent = result.toneRegister || 'Formal';
    document.getElementById('eval-summary').textContent = result.summaryFeedback || '';
    document.getElementById('eval-urdu').textContent = result.urduSummary || '';

    const tbody = document.getElementById('heatmap-tbody');
    if (tbody && Array.isArray(result.sentences)) {
      tbody.innerHTML = result.sentences.map(s => `
        <tr class="hover:bg-slate-50">
          <td class="p-3 text-rose-900 bg-rose-50/40 font-mono text-[11px] border-r border-slate-200">${s.originalSentence}</td>
          <td class="p-3 text-emerald-950 bg-emerald-50/40 font-semibold border-r border-slate-200">${s.correctedSentence}</td>
          <td class="p-3 border-r border-slate-200">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">${s.errorType}</span>
          </td>
          <td class="p-3 text-slate-600">${s.explanation}</td>
        </tr>
      `).join('');
    }

    btn.textContent = '⚡ Analyze Writing (AI Diagnostic)';
  });
})();
