/**
 * dashboard.js
 * Logic for student analytics & flashcard flip engine
 */

(function() {
  'use strict';

  const flashcards = [
    {
      phrase: 'Mitigate Risk',
      pronunciation: '/ˈmɪt.ɪ.ɡeɪt rɪsk/',
      category: 'Audit & Assurance',
      definition: 'To take proactive measures to reduce the severity or likelihood of financial or operational loss.',
      example: 'Dual authorization mitigates the risk of fraudulent disbursements.',
      urdu: 'خطرے کے اثرات یا امکان کو کم کرنا (Khatray ko kam karna)'
    },
    {
      phrase: 'Adhere to Compliance',
      pronunciation: '/ədˈhɪər tuː kəmˈplaɪ.əns/',
      category: 'Corporate Law',
      definition: 'To strictly follow statutory regulations, legal standards, and professional codes.',
      example: 'Chartered accountants must adhere to strict regulatory compliance guidelines.',
      urdu: 'قانونی ضوابط اور اصولوں کی سختی سے پابندی کرنا'
    },
    {
      phrase: 'Reconcile Accounts',
      pronunciation: '/ˈrek.ən.saɪl əˈkaʊnts/',
      category: 'Financial Reporting',
      definition: 'To compare two sets of records to ensure figures agree and resolve discrepancies.',
      example: 'The auditor was instructed to reconcile the general ledger with the bank statement.',
      urdu: 'کھاتوں کے فرق کو ملا کر درست کرنا (تطبیق دینا)'
    },
    {
      phrase: 'Substantiate Assertions',
      pronunciation: '/səbˈstæn.ʃi.eɪt əˈsɜː.ʃənz/',
      category: 'Audit & Assurance',
      definition: 'To provide reliable documentary evidence proving the truth of financial statement claims.',
      example: 'Auditors obtain third-party confirmations to substantiate management assertions.',
      urdu: 'ٹھوس شواہد اور ثبوتوں سے کسی دعوے کو ثابت کرنا'
    }
  ];

  let currentIndex = 0;
  let isFlipped = false;

  const card = document.getElementById('flashcard');
  const front = document.getElementById('card-front-content');
  const back = document.getElementById('card-back-content');

  function renderCard() {
    const item = flashcards[currentIndex];
    if (!item) return;

    if (!isFlipped) {
      front.classList.remove('hidden');
      back.classList.add('hidden');
      front.innerHTML = `
        <h3 class="text-3xl font-bold font-display text-white">"${item.phrase}"</h3>
        <p class="text-sm font-mono text-emerald-400 mt-2">${item.pronunciation}</p>
      `;
    } else {
      front.classList.add('hidden');
      back.classList.remove('hidden');
      back.innerHTML = `
        <p class="text-sm text-slate-200">
          <strong>Definition:</strong> ${item.definition}
        </p>
        <p class="text-xs text-slate-300 bg-slate-800/80 p-3 rounded-xl">
          <strong>Example:</strong> "${item.example}"
        </p>
        <div class="p-2.5 bg-emerald-950/60 rounded-xl text-emerald-300 font-urdu text-sm border border-emerald-500/30">
          ${item.urdu}
        </div>
      `;
    }
  }

  card?.addEventListener('click', () => {
    isFlipped = !isFlipped;
    renderCard();
  });

  document.getElementById('next-card-btn')?.addEventListener('click', () => {
    isFlipped = false;
    currentIndex = (currentIndex + 1) % flashcards.length;
    renderCard();
  });

  document.getElementById('prev-card-btn')?.addEventListener('click', () => {
    isFlipped = false;
    currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
    renderCard();
  });

  document.getElementById('reset-history-btn')?.addEventListener('click', () => {
    localStorage.removeItem('icap_exam_results');
    localStorage.removeItem('icap_writing_results');
    const resetBtn = document.getElementById('reset-history-btn');
    if (resetBtn) resetBtn.textContent = '✓ Records Cleared';
  });

  renderCard();
})();
