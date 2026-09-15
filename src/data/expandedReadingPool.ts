import { 
  ReadingSection1, 
  ReadingSection2, 
  ReadingSection3, 
  ReadingSection4 
} from '../types';
import { APTIS_TEST_SET_1, APTIS_TEST_SET_2 } from './aptisMockData';

// ============================================================================
// READING SECTION 1: Sentence Comprehension / Short Workplace & Community Notices (5 Gaps)
// ============================================================================
export const EXPANDED_READING_SECTION_1: ReadingSection1[] = [
  APTIS_TEST_SET_1.reading.section1,
  APTIS_TEST_SET_2.reading.section1,
  {
    id: 'read-sec1-p03',
    title: 'Physical Inventory Count & Audit Protocol Notice',
    introduction: 'Read the warehouse audit instructions below. Choose the word that best fits each gap.',
    paragraphs: [
      {
        textBefore: 'All audit trainees assigned to the annual inventory verification must report to the warehouse gate by 08:00 AM. Before commencing counting,',
        gapId: 'gap1',
        options: ['verify', 'cancel', 'publish'],
        correctIndex: 0,
        textAfter: 'that all count sheets bear the official seal of the financial controller.'
      },
      {
        textBefore: 'Count teams must not deviate from their assigned aisles without prior authorization. If any damaged or obsolete packaging is',
        gapId: 'gap2',
        options: ['noticed', 'omitted', 'shipped'],
        correctIndex: 0,
        textAfter: ', it must be separately noted in the physical verification sheet.'
      },
      {
        textBefore: 'Once an aisle count is completed, compare your recorded quantities with the client’s inventory tag. In case of a discrepancy, recount the section',
        gapId: 'gap3',
        options: ['immediately', 'rarely', 'never'],
        correctIndex: 0,
        textAfter: 'in the presence of the warehouse floor manager.'
      },
      {
        textBefore: 'Movement of goods into or out of the dispatch yard is strictly prohibited during counting hours. All shipping docks must remain',
        gapId: 'gap4',
        options: ['sealed', 'accessible', 'active'],
        correctIndex: 0,
        textAfter: 'until the final reconciliation summary is signed.'
      },
      {
        textBefore: 'Finally, ensure that both count teams endorse each page. The signed working papers must be delivered to the engagement senior before',
        gapId: 'gap5',
        options: ['departure', 'lunch', 'break'],
        correctIndex: 0,
        textAfter: 'this evening.'
      }
    ],
    explanations: {
      gap1: {
        english: '"Verify" is the appropriate auditing verb for confirming document accuracy.',
        urdu: 'دستاویزات کی درستگی چیک کرنے کے لیے آڈٹ میں "verify" استعمال ہوتا ہے۔'
      },
      gap2: {
        english: '"Noticed" fits the observational context of identifying damaged stock.',
        urdu: 'خراب مال نظر آنے پر "noticed" کا لفظ مناسب ہے۔'
      },
      gap3: {
        english: '"Immediately" emphasizes urgent audit protocol in reconciling discrepancies.',
        urdu: 'اختلاف کی صورت میں فوری ری کاؤنٹ کے لیے "immediately" آئے گا۔'
      },
      gap4: {
        english: '"Sealed" indicates secure control over goods during verification.',
        urdu: 'سٹاک گنتی کے دوران مال کی نقل و حرکت روکنے کے لیے ڈوکس "sealed" رکھی جاتی ہیں۔'
      },
      gap5: {
        english: '"Departure" indicates leaving the facility at the end of the day.',
        urdu: 'شام کو ویئر ہاؤس سے واپسی ("departure") سے پہلے دستخط شدہ پیپرز دینا لازمی ہے۔'
      }
    }
  },
  {
    id: 'read-sec1-p04',
    title: 'Workplace Ergonomics & Health Safety Directive',
    introduction: 'Read the occupational health notice below. Choose the word that best fits each gap.',
    paragraphs: [
      {
        textBefore: 'Due to prolonged screen time during busy season, management has introduced new ergonomic guidelines. Employees are strongly encouraged to',
        gapId: 'gap1',
        options: ['adjust', 'ignore', 'break'],
        correctIndex: 0,
        textAfter: 'their monitor height so the top of the display aligns with eye level.'
      },
      {
        textBefore: 'Chairs should support the lower back comfortably, and feet must rest flat on the floor or on an approved',
        gapId: 'gap2',
        options: ['footrest', 'instrument', 'envelope'],
        correctIndex: 0,
        textAfter: 'to alleviate lumbar strain.'
      },
      {
        textBefore: 'Medical specialists advise taking a five-minute stretch break after every sixty minutes of typing. Maintaining a rigid posture without movement can cause',
        gapId: 'gap3',
        options: ['severe', 'beneficial', 'pleasant'],
        correctIndex: 0,
        textAfter: 'muscle fatigue and repetitive strain injuries.'
      },
      {
        textBefore: 'Department heads will conduct weekly safety walk-throughs to identify substandard desk setups. Any defective seating will be replaced',
        gapId: 'gap4',
        options: ['promptly', 'reluctantly', 'rarely'],
        correctIndex: 0,
        textAfter: 'by the facilities management team.'
      },
      {
        textBefore: 'Your overall physical wellbeing remains our top organizational priority. Please report any persistent wrist discomfort to human resources before it',
        gapId: 'gap5',
        options: ['worsens', 'improves', 'heals'],
        correctIndex: 0,
        textAfter: 'and requires medical leave.'
      }
    ],
    explanations: {
      gap1: {
        english: '"Adjust" means to alter or move something slightly to achieve the desired fit or position.',
        urdu: 'سکرین کی اونچائی کو مناسب سطح پر لانے کے لیے "adjust" کا لفظ موزوں ہے۔'
      },
      gap2: {
        english: '"Footrest" is the specialized ergonomic support item for feet.',
        urdu: 'پاؤں کو سہارا دینے والے ارگونومک آلے کو "footrest" کہا جاتا ہے۔'
      },
      gap3: {
        english: '"Severe" describes intense or acute negative physical fatigue.',
        urdu: 'شدید پٹھوں کے درد کے لیے "severe" استعمال ہوتا ہے۔'
      },
      gap4: {
        english: '"Promptly" means swiftly and without unnecessary delay.',
        urdu: 'خراب کرسیوں کو فوری تبدیل کرنے کے لیے "promptly" آئے گا۔'
      },
      gap5: {
        english: '"Worsens" describes a condition becoming more severe or deteriorating.',
        urdu: 'تکلیف بڑھنے کے عمل کے لیے "worsens" درست لفظ ہے۔'
      }
    }
  },
  {
    id: 'read-sec1-p05',
    title: 'Annual Professional Tax Seminar & Registration Rules',
    introduction: 'Read the professional development bulletin below. Choose the word that best fits each gap.',
    paragraphs: [
      {
        textBefore: 'The Regional Council invites all practicing accountants to attend the upcoming seminar on recent statutory sales tax reforms. To secure a seat, delegates must',
        gapId: 'gap1',
        options: ['register', 'hesitate', 'protest'],
        correctIndex: 0,
        textAfter: 'online using their national member identification number.'
      },
      {
        textBefore: 'The seminar syllabus focuses on automated withholding tax modules and recent appellate tribunal precedents. Participants will receive',
        gapId: 'gap2',
        options: ['comprehensive', 'confusing', 'hazardous'],
        correctIndex: 0,
        textAfter: 'course handbooks alongside digital computation templates.'
      },
      {
        textBefore: 'Continuing professional education credits will only be awarded to attendees who remain present for the entire session. Spot biometric verification will be',
        gapId: 'gap3',
        options: ['conducted', 'refused', 'prohibited'],
        correctIndex: 0,
        textAfter: 'at both the morning entry and evening dismissal.'
      },
      {
        textBefore: 'Lunch and networking refreshments will be served in the grand ballroom. Delegates with specific dietary preferences should notify the secretariat in',
        gapId: 'gap4',
        options: ['advance', 'arrears', 'haste'],
        correctIndex: 0,
        textAfter: 'to ensure appropriate catering arrangements.'
      },
      {
        textBefore: 'We trust this symposium will significantly enhance your understanding of evolving fiscal legislation and look forward to your active',
        gapId: 'gap5',
        options: ['participation', 'absence', 'rejection'],
        correctIndex: 0,
        textAfter: 'throughout the question-and-answer panels.'
      }
    ],
    explanations: {
      gap1: {
        english: '"Register" is the formal action of signing up for an academic or professional conference.',
        urdu: 'سیمینار میں شرکت کے لیے اندراج کرنے کو "register" کہتے ہیں۔'
      },
      gap2: {
        english: '"Comprehensive" describes thorough, broad, and all-inclusive study material.',
        urdu: 'مکمل اور جامع تعلیمی مواد کے لیے "comprehensive" آئے گا۔'
      },
      gap3: {
        english: '"Conducted" is standardly paired with formal procedural checks or verifications.',
        urdu: 'بائیو میٹرک تصدیق انجام دینے کے لیے "conducted" درست فعل ہے۔'
      },
      gap4: {
        english: '"In advance" is the standard idiomatic expression meaning ahead of time.',
        urdu: 'پہلے سے مطلع کرنے کے لیے "in advance" کا محاورہ بولا جاتا ہے۔'
      },
      gap5: {
        english: '"Participation" denotes actively joining in discussions and events.',
        urdu: 'پینل مباحثوں میں فعال شرکت کے لیے "participation" درست ہے۔'
      }
    }
  },
  {
    id: 'read-sec1-p06',
    title: 'Cloud Document Migration & Client Data Confidentiality',
    introduction: 'Read the information technology bulletin below. Choose the word that best fits each gap.',
    paragraphs: [
      {
        textBefore: 'As part of our digital modernization road map, all audit engagement files will migrate to our secure cloud repository this weekend. Trainees must',
        gapId: 'gap1',
        options: ['synchronize', 'delete', 'disperse'],
        correctIndex: 0,
        textAfter: 'their local draft working papers before Friday midnight.'
      },
      {
        textBefore: 'Access to the cloud platform is strictly governed by multi-factor authentication. Under no circumstances should team members share their security credentials or',
        gapId: 'gap2',
        options: ['passwords', 'signatures', 'calculators'],
        correctIndex: 0,
        textAfter: 'with temporary external contractors.'
      },
      {
        textBefore: 'The platform automatically creates timestamped version histories for every revised spreadsheet. This transparent tracking helps compliance teams',
        gapId: 'gap3',
        options: ['prevent', 'celebrate', 'encourage'],
        correctIndex: 0,
        textAfter: 'unauthorized alterations to finalized audit conclusions.'
      },
      {
        textBefore: 'If you encounter any synchronization conflicts or broken hyperlinks, please contact the dedicated IT helpdesk. Technical specialists will be available',
        gapId: 'gap4',
        options: ['round-the-clock', 'rarely', 'unwillingly'],
        correctIndex: 0,
        textAfter: 'throughout the weekend migration window.'
      },
      {
        textBefore: 'Safeguarding client commercial secrets is an ethical cornerstone of the accounting profession. Your strict adherence to these cyber security guidelines is',
        gapId: 'gap5',
        options: ['essential', 'optional', 'disapproved'],
        correctIndex: 0,
        textAfter: 'for maintaining institutional accreditation.'
      }
    ],
    explanations: {
      gap1: {
        english: '"Synchronize" describes aligning and updating local files with a cloud server.',
        urdu: 'لوکل فائلوں کو سرور کے ساتھ اپ ڈیٹ کرنے کے لیے "synchronize" درست اصطلاح ہے۔'
      },
      gap2: {
        english: '"Passwords" are authentication secrets that must never be shared.',
        urdu: 'سیکیورٹی اسناد میں "passwords" کا لفظ بالکل موزوں ہے۔'
      },
      gap3: {
        english: '"Prevent" means to stop something undesirable from happening.',
        urdu: 'غیر مجاز تبدیلیوں کو روکنے کے لیے "prevent" کا استعمال ہوگا۔'
      },
      gap4: {
        english: '"Round-the-clock" means 24/7 continuous availability.',
        urdu: 'چوبیس گھنٹے دستیابی کے لیے "round-the-clock" کا فقرہ بولا جاتا ہے۔'
      },
      gap5: {
        english: '"Essential" means absolutely necessary and indispensable.',
        urdu: 'ضوابط پر سختی سے عمل درآمد انتہائی ضروری ("essential") ہے۔'
      }
    }
  },
  {
    id: 'read-sec1-p07',
    title: 'Public Transit Smart Card Transition & Student Fare Subsidy',
    introduction: 'Read the municipal transport announcement below. Choose the word that best fits each gap.',
    paragraphs: [
      {
        textBefore: 'The Metro Transport Authority is phasing out paper tokens across all rapid transit terminals starting next Monday. Commuters are advised to',
        gapId: 'gap1',
        options: ['obtain', 'discard', 'counterfeit'],
        correctIndex: 0,
        textAfter: 'a contactless smart card from customer service kiosks.'
      },
      {
        textBefore: 'Registered college and professional accounting students are entitled to a thirty percent concession on all monthly travel passes. To activate this discount, you must',
        gapId: 'gap2',
        options: ['present', 'conceal', 'destroy'],
        correctIndex: 0,
        textAfter: 'a valid student enrollment card alongside proof of identity.'
      },
      {
        textBefore: 'Smart cards can be topped up through automated cash deposit machines, mobile banking apps, or bank debit cards. Digital recharges reflect',
        gapId: 'gap3',
        options: ['instantaneously', 'yearly', 'gradually'],
        correctIndex: 0,
        textAfter: 'on your balance without requiring manual validation.'
      },
      {
        textBefore: 'Cardholders must tap both when entering the platform turnstiles and upon exiting their destination station. Failure to tap out will result in the deduction of the',
        gapId: 'gap4',
        options: ['maximum', 'minimum', 'nominal'],
        correctIndex: 0,
        textAfter: 'route fare automatically.'
      },
      {
        textBefore: 'Lost cards can be blocked immediately by calling our toll-free customer helpline. Any remaining monetary credit will be safely',
        gapId: 'gap5',
        options: ['transferred', 'forfeited', 'erased'],
        correctIndex: 0,
        textAfter: 'to your replacement card within twenty-four hours.'
      }
    ],
    explanations: {
      gap1: {
        english: '"Obtain" means to acquire or get possession of the smart card.',
        urdu: 'سمارٹ کارڈ حاصل کرنے کے لیے "obtain" درست فعل ہے۔'
      },
      gap2: {
        english: '"Present" means to show or submit a document for inspection.',
        urdu: 'رعایت کے لیے اپنا کارڈ دکھانے / پیش کرنے کو "present" کہتے ہیں۔'
      },
      gap3: {
        english: '"Instantaneously" means immediately without any lag.',
        urdu: 'فوری بیلنس اپ ڈیٹ ہونے کے لیے "instantaneously" آئے گا۔'
      },
      gap4: {
        english: '"Maximum" is the penalty route charge applied if tap-out is omitted.',
        urdu: 'کارڈ نہ دکھانے کی صورت میں زیادہ سے زیادہ ("maximum") کرایہ کٹتا ہے۔'
      },
      gap5: {
        english: '"Transferred" means moved from the old lost card account to the new card.',
        urdu: 'بقیہ رقم نئے کارڈ میں منتقل ("transferred") کر دی جائے گی۔'
      }
    }
  }
];

// ============================================================================
// READING SECTION 2: Text Cohesion / Scrambled Narrative (6 Sentences)
// ============================================================================
export const EXPANDED_READING_SECTION_2: ReadingSection2[] = [
  APTIS_TEST_SET_1.reading.section2,
  APTIS_TEST_SET_2.reading.section2,
  {
    id: 'read-sec2-p03',
    title: 'The Rise of Luca Pacioli and Double-Entry Bookkeeping',
    topic: 'History of Accounting & Modern Commerce',
    correctOrder: [0, 3, 1, 4, 2, 5],
    sentences: [
      'During the early Italian Renaissance, merchants in Venice struggled to track complex maritime trade partnerships across the Mediterranean.',
      'Recognizing this growing commercial necessity, the Franciscan friar and mathematician Luca Pacioli compiled these scattered merchant customs.',
      'Consequently, this revolutionary methodology established the enduring principle that every debit transaction must have an equal credit offset.',
      'Without a standardized recording system, financial disputes and merchant bankruptcies were frequent occurrences.',
      'In 1494, he published his seminal encyclopedia "Summa de Arithmetica", dedicating a landmark chapter specifically to double-entry ledger bookkeeping.',
      'Today, Pacioli is universally celebrated as the father of modern accounting, having created the foundational language of global business.'
    ],
    explanation: 'Chronological progression: Begins with the historical problem faced by Venetian merchants (0), explains the consequence of having no standardized system (3), introduces Luca Pacioli compiling merchant practices (1), dates his publication in 1494 (4), details the double-entry accounting rule (2), and concludes with his modern legacy as the father of accounting (5).',
    urduExplanation: 'وینس کے تاجروں کے مسائل سے شروع ہو کر (0)، بغیر نظام کے دیوالیہ پن (3)، پیکولی کی کاوش (1)، 1494ء کی مشہور کتاب (4)، ڈیبٹ کریڈٹ کا انقلابی اصول (2) اور بابائے اکاؤنٹنگ کے جدید اعزاز پر اختتام (5)۔'
  },
  {
    id: 'read-sec2-p04',
    title: 'Automated Continuous Auditing in Modern Professional Firms',
    topic: 'Audit Technology & Automation',
    correctOrder: [0, 3, 1, 4, 2, 5],
    sentences: [
      'Traditionally, statutory audits relied heavily on retroactive sampling of historical financial transactions.',
      'As an immediate result, anomaly detection algorithms now flag irregular journal entries in real time.',
      'This technological shift has fundamentally transformed the speed and assurance of statutory financial reporting.',
      'However, the widespread adoption of cloud enterprise resource planning systems initiated an automated continuous audit model.',
      'These instantaneous alerts allow compliance teams to investigate potential control overrides before period-end close.',
      'Consequently, chartered accountants can deliver far more strategic, proactive advisory value to corporate stakeholders.'
    ],
    explanation: 'Logical narrative flow: Contrast starts with traditional backward-looking audits (0), introduces cloud ERP systems as the turning point (3), describes the emergence of real-time anomaly algorithms (1), explains how prompt alerts enable investigation (4), defines this technological shift (2), and highlights the strategic advisory benefit for accountants (5).',
    urduExplanation: 'روایتی آڈٹ سے کلاؤڈ سسٹمز (0, 3)، پھر رئیل ٹائم الگورتھم (1)، فوری الرٹس کی جانچ (4)، سائنسی تبدیلی (2) اور چارٹرڈ اکاؤنٹنٹ کے اسٹریٹجک کردار (5) کا منطقی تسلسل۔'
  },
  {
    id: 'read-sec2-p05',
    title: 'The Enron Collapse and the Genesis of Modern Corporate Governance',
    topic: 'Corporate Ethics & Statutory Regulation',
    correctOrder: [0, 2, 4, 1, 3, 5],
    sentences: [
      'At the turn of the millennium, energy conglomerate Enron was widely heralded as one of the most innovative corporations in the world.',
      'Public outrage intensified when it was discovered that external auditors had actively colluded in concealing the impending insolvency.',
      'Behind this glamorous facade, senior executives had systematically concealed billions of dollars in toxic liabilities using special purpose entities.',
      'In direct legislative response, the United States Congress enacted the landmark Sarbanes-Oxley Act of 2002 to overhaul corporate responsibility.',
      'When independent whistleblowers eventually alerted financial journalists, the artificial market valuation unraveled in catastrophic bankruptcy.',
      'Consequently, international capital markets instituted rigorous internal control mandates and independent audit oversight committees.'
    ],
    explanation: 'Narrative structure: Establishes Enron\'s initial high reputation (0), exposes the reality of hidden debts (2), describes whistleblowers triggering catastrophic bankruptcy (4), points to external auditor collusion (1), notes the legislative remedy with the Sarbanes-Oxley Act (3), and finishes with lasting global governance standards (5).',
    urduExplanation: 'اینرون کی بظاہر کامیابی (0)، پوشیدہ نقصانات اور قرضے (2)، وسل بلورز اور دیوالیہ پن (4)، بیرونی آڈیٹرز کی ملی بھگت (1)، ساربنز آکسلے ایکٹ کا نفاذ (3) اور عالمی کارپوریٹ گورننس اصلاحات پر اختتام (5)۔'
  },
  {
    id: 'read-sec2-p06',
    title: 'The Evolution of Central Banking and Paper Currency',
    topic: 'Economics & Monetary History',
    correctOrder: [0, 3, 1, 4, 2, 5],
    sentences: [
      'For centuries, commercial transactions across Europe were settled strictly through heavy gold and silver bullion coins.',
      'To alleviate the logistical hazard of transporting heavy chests of metal, goldsmiths began issuing paper deposit receipts.',
      'Recognizing the immense economic power of this fiduciary credit, national governments moved to formalize these private paper promises.',
      'However, carrying large physical quantities of precious metal over long distances exposed merchants to highway robbery and immense shipping expenses.',
      'Soon, merchants began circulating these trusted paper notes directly among themselves as a convenient medium of exchange.',
      'In 1694, the Bank of England was chartered, marking the birth of modern institutional central banking and sovereign paper currency.'
    ],
    explanation: 'Chronological development: Explains ancient settlement via metallic coins (0), highlights the vulnerability and burden of carrying metals (3), introduces goldsmith deposit receipts (1), details the circulation of receipts as paper money (4), describes governmental recognition (2), and concludes with the chartering of the Bank of England in 1694 (5).',
    urduExplanation: 'دھاتی سکوں کی تاریخ (0)، ان کے وزن اور ڈاکوؤں کا خطرہ (3)، صرافوں کی کاغذی رسیدیں (1)، رسیدوں کا بطور کرنسی تبادلہ (4)، حکومتی سرپرستی (2) اور 1694ء میں بینک آف انگلینڈ کے قیام کا تاریخی تسلسل (5)۔'
  }
];

// ============================================================================
// READING SECTION 3: Short Text Matching / 4 Perspectives on a Topic (7 Statements)
// ============================================================================
export const EXPANDED_READING_SECTION_3: ReadingSection3[] = [
  APTIS_TEST_SET_1.reading.section3,
  APTIS_TEST_SET_2.reading.section3,
  {
    id: 'read-sec3-p03',
    title: 'The Future of Remote Working in Professional Accounting & Audit',
    topic: 'Workplace Models & Professional Training',
    people: [
      {
        id: 'A',
        name: 'Kamran (Audit Partner)',
        description: 'Kamran believes physical office attendance is indispensable for trainee apprenticeships and rapid team problem-solving during busy audit season.'
      },
      {
        id: 'B',
        name: 'Sara (Senior Tax Consultant)',
        description: 'Sara emphasizes that eliminating long commutes has dramatically improved deep concentration and analytical report drafting for intricate corporate tax files.'
      },
      {
        id: 'C',
        name: 'Bilal (Audit Trainee)',
        description: 'Bilal appreciates the flexibility of remote working but worries about feeling isolated and missing out on spontaneous mentorship from senior managers.'
      },
      {
        id: 'D',
        name: 'Dr. Tariq (Organizational Psychologist)',
        description: 'Dr. Tariq advocates for structured hybrid schedules, warning that full remote work degrades long-term institutional loyalty and company culture.'
      }
    ],
    questions: [
      {
        id: 'q1',
        statement: 'Mentions that uninterrupted quiet time at home facilitates thorough review of complex financial data.',
        correctPersonId: 'B',
        explanation: 'Sara highlights how working without commute and distraction helps her concentrate deeply on intricate corporate tax files.',
        urduExplanation: 'سارہ نے واضح کیا کہ گھر پر پرسکون ماحول میں پیچیدہ ٹیکس امور پر گہری توجہ دی جا سکتی ہے۔'
      },
      {
        id: 'q2',
        statement: 'Believes in-person collaboration is essential for junior staff to master practical audit procedures quickly.',
        correctPersonId: 'A',
        explanation: 'Kamran stresses that physical office presence is indispensable for trainee apprenticeship and fast team problem-solving.',
        urduExplanation: 'کامران کا مؤقف ہے کہ جونیئر ٹرینیز کی عملی تربیت اور مسائل کے فوری حل کے لیے دفتر میں موجود ہونا ناگزیر ہے۔'
      },
      {
        id: 'q3',
        statement: 'Expresses concern about a lack of informal guidance and professional bonding with colleagues.',
        correctPersonId: 'C',
        explanation: 'Bilal notes feeling isolated and missing out on spontaneous, casual mentorship from senior managers.',
        urduExplanation: 'بلال کو تنہائی کا احساس اور سینئرز سے قدرتی رہنمائی نہ ملنے پر تشویش ہے۔'
      },
      {
        id: 'q4',
        statement: 'Warns that an entirely home-based workforce can undermine corporate culture and staff retention.',
        correctPersonId: 'D',
        explanation: 'Dr. Tariq points out that completely remote work weakens long-term organizational loyalty and firm culture.',
        urduExplanation: 'ڈاکٹر طارق نے خبردار کیا کہ مکمل طور پر گھر سے کام کرنے سے ادارہ جاتی وفاداری کمزور ہوتی ہے۔'
      },
      {
        id: 'q5',
        statement: 'Recommends a balanced model combining designated office days with home working.',
        correctPersonId: 'D',
        explanation: 'Dr. Tariq specifically champions a structured hybrid framework.',
        urduExplanation: 'ڈاکٹر طارق ہائبرڈ ماڈل (دفتر اور گھر کا امتزاج) کی پرزور وکالت کرتے ہیں۔'
      },
      {
        id: 'q6',
        statement: 'Finds daily travel to client locations both exhausting and inefficient.',
        correctPersonId: 'B',
        explanation: 'Sara emphasizes the major relief gained from eliminating long and draining commutes.',
        urduExplanation: 'سارہ نے طویل اور تھکا دینے والے سفر سے نجات کو بہترین قرار دیا ہے۔'
      },
      {
        id: 'q7',
        statement: 'Values schedule autonomy while simultaneously recognizing career development risks.',
        correctPersonId: 'C',
        explanation: 'Bilal appreciates schedule flexibility while acknowledging worries about career mentorship.',
        urduExplanation: 'بلال لچکدار اوقات کو پسند کرنے کے ساتھ ساتھ کیریئر میں رہنمائی کی کمی پر بھی متفکر ہے۔'
      }
    ]
  },
  {
    id: 'read-sec3-p04',
    title: 'Artificial Intelligence and the Future of Chartered Accountancy',
    topic: 'Technological Disruption & Accounting Skills',
    people: [
      {
        id: 'A',
        name: 'Farhan (Chief Technology Officer)',
        description: 'Farhan contends that machine learning will eliminate routine voucher entry, compelling future accountants to become data analysts and strategic advisors.'
      },
      {
        id: 'B',
        name: 'Zainab (Forensic Auditor)',
        description: 'Zainab argues that while algorithms excel at detecting statistical anomalies, human skepticism and legal intuition remain irreplaceable during fraud trials.'
      },
      {
        id: 'C',
        name: 'Hamza (Chartered Accountant Trainee)',
        description: 'Hamza feels anxious about AI taking over entry-level accounting roles, wondering how students will gain foundational experience.'
      },
      {
        id: 'D',
        name: 'Professor Amina (Accounting Academic)',
        description: 'Professor Amina asserts that university and professional curricula must urgently integrate Python, data visualization, and ethics alongside debit and credit rules.'
      }
    ],
    questions: [
      {
        id: 'q1',
        statement: 'Argues that professional judgment and human intuition cannot be replicated by automated tools in court proceedings.',
        correctPersonId: 'B',
        explanation: 'Zainab emphasizes that human skepticism and investigative intuition are irreplaceable during courtroom fraud cases.',
        urduExplanation: 'زینب کا موقف ہے کہ عدالتی کارروائی اور فراڈ کی تفتیش میں انسانی شکوک و بصیرت کا نعم البدل کوئی الگورتھم نہیں ہے۔'
      },
      {
        id: 'q2',
        statement: 'Predicts that repetitive bookkeeping tasks will be completely automated, shifting focus to advisory roles.',
        correctPersonId: 'A',
        explanation: 'Farhan contends machine learning will remove routine voucher work, transforming accountants into strategic advisors.',
        urduExplanation: 'فرحان کے مطابق معمول کی بک کیپنگ خودکار ہو جائے گی اور اکاؤنٹنٹس مشاورتی کردار اپنائیں گے۔'
      },
      {
        id: 'q3',
        statement: 'Expresses apprehension regarding the availability of introductory positions for young trainees.',
        correctPersonId: 'C',
        explanation: 'Hamza worries about the disappearance of entry-level jobs where trainees historically built foundational experience.',
        urduExplanation: 'حمزہ کو جونیئر لیول کی ملازمتوں کے خاتمے اور بنیادی تجربہ نہ ملنے پر تشویش ہے۔'
      },
      {
        id: 'q4',
        statement: 'Advocates for a comprehensive reform of educational accounting syllabi to include coding and data analytics.',
        correctPersonId: 'D',
        explanation: 'Professor Amina insists that accounting education must immediately adopt data science and coding tools.',
        urduExplanation: 'پروفیسر آمنہ نے نصاب میں پائتھون اور ڈیٹا اینالیٹکس شامل کرنے پر زور دیا ہے۔'
      },
      {
        id: 'q5',
        statement: 'Specializes in uncovering corporate deception and evaluating evidentiary trails.',
        correctPersonId: 'B',
        explanation: 'Zainab is a forensic auditor specializing in fraud investigations and legal evidence.',
        urduExplanation: 'زینب بطور فارنزک آڈیٹر مالیاتی فراڈ اور شواہد کی کھوج میں مہارت رکھتی ہے۔'
      },
      {
        id: 'q6',
        statement: 'Views modern technological adoption as an imperative evolution rather than a threat to the accounting profession.',
        correctPersonId: 'A',
        explanation: 'Farhan sees automation as an opportunity for accountants to elevate their commercial value.',
        urduExplanation: 'فرحان ٹیکنالوجی کو خطرہ نہیں بلکہ چارٹرڈ اکاؤنٹنٹ کے کردار کی مثبت ترقی سمجھتا ہے۔'
      },
      {
        id: 'q7',
        statement: 'Highlights the critical balance between technological fluency and moral responsibility.',
        correctPersonId: 'D',
        explanation: 'Professor Amina highlights ethical governance alongside computational tools in training.',
        urduExplanation: 'پروفیسر آمنہ نے تکنیکی مہارت کے ساتھ اخلاقی ذمے داری کی ضرورت کو اجاگر کیا ہے۔'
      }
    ]
  }
];

// ============================================================================
// READING SECTION 4: Long Text with Paragraph Headings Matching (5 Paragraphs, 7 Headings)
// ============================================================================
export const EXPANDED_READING_SECTION_4: ReadingSection4[] = [
  APTIS_TEST_SET_1.reading.section4,
  APTIS_TEST_SET_2.reading.section4,
  {
    id: 'read-sec4-p03',
    title: 'The Evolution of Corporate Financial Auditing: From Bookkeeper Check to Strategic Risk Governance',
    topic: 'History and Philosophy of Assurance',
    introduction: 'Read the comprehensive passage on the development of financial assurance. Match each numbered paragraph to the most appropriate heading from the list. There are two headings you will not need.',
    headings: [
      'Clerical Verification in the Industrial Era',
      'The Emergence of Internal Controls and Sampling',
      'Regulatory Reforms Prompted by Corporate Scandals',
      'The Shift Toward Continuous Data Analytics',
      'Total Abandonment of Human Auditors',
      'Fostering Public Confidence in Capital Markets',
      'The Threat of Unregulated Overseas Monopolies'
    ],
    paragraphs: [
      {
        id: 'p1',
        paragraphNumber: 1,
        text: 'During the nineteenth-century Industrial Revolution, corporate auditing existed primarily as a rudimentary arithmetical verification exercise. Wealthy railway magnates and factory owners employed ledger clerks to physically match invoices against journal entries. The primary goal was narrow: to prevent employee pilferage and ensure that managers did not abscond with cash proceeds. Auditors reviewed almost every individual receipt, treating financial records as historical static archives rather than forward-looking commercial barometers.',
        correctHeadingIndex: 0,
        explanation: 'Paragraph 1 details how early 19th-century audits were simple, manual, clerical checks designed to stop worker theft.',
        urduExplanation: 'پہلا پیراگراف 19ویں صدی کے صنعتی انقلاب میں دستی کھاتوں کی کلیریکل تصدیق اور چوری روکنے کے طریقہ کار پر بحث کرتا ہے۔'
      },
      {
        id: 'p2',
        paragraphNumber: 2,
        text: 'As transnational enterprises expanded exponentially across continents in the mid-twentieth century, checking every transaction became a physical impossibility. Audit firms shifted their paradigm from comprehensive transaction re-performance to the systematic evaluation of a company’s internal control systems. By rigorously testing whether a client had reliable authorization procedures, accountants could statistically sample a modest percentage of transactions while maintaining robust assurance over the balance sheet.',
        correctHeadingIndex: 1,
        explanation: 'Paragraph 2 explains the mid-20th-century transition to internal control assessments and statistical sampling methods.',
        urduExplanation: 'دوسرا پیراگراف ہر انٹری چیک کرنے کے بجائے انٹرنل کنٹرولز اور سیمپلنگ کے طریقہ کار کو اپنانے کی وضاحت کرتا ہے۔'
      },
      {
        id: 'p3',
        paragraphNumber: 3,
        text: 'The onset of the twenty-first century was scarred by catastrophic corporate collapses, most notably Enron, WorldCom, and Parmalat. These debacles revealed that sophisticated executive deception could easily bypass conventional testing procedures when audit firms suffered from conflicts of interest. The subsequent passage of sweeping legislation, such as the Sarbanes-Oxley Act, established strict independent regulatory oversight and prohibited auditing firms from providing lucrative consulting contracts to their assurance clients.',
        correctHeadingIndex: 2,
        explanation: 'Paragraph 3 highlights how corporate fraud debacles led to stringent statutory reforms and independent regulators.',
        urduExplanation: 'تیسرا پیراگراف اینرون اور ورلڈ کام جیسے بڑے کارپوریٹ اسکینڈلز کے بعد ساربنز آکسلے ایکٹ جیسے سخت قوانین کی پیدائش پر محیط ہے۔'
      },
      {
        id: 'p4',
        paragraphNumber: 4,
        text: 'Today, the assurance profession is undergoing its most profound transformation since the invention of double-entry ledger bookkeeping. Rather than conducting retrospective sampling months after the financial year-end has concluded, contemporary audit practices deploy continuous machine-learning algorithms directly into live cloud ERP environments. Millions of ledger entries are scrutinized simultaneously, enabling compliance teams to uncover irregular transaction patterns instantaneously.',
        correctHeadingIndex: 3,
        explanation: 'Paragraph 4 focuses on contemporary machine learning algorithms and continuous data analytics in the cloud.',
        urduExplanation: 'چوتھا پیراگراف روایتی پوسٹ آڈٹ کے بجائے کلاؤڈ سسٹمز میں رئیل ٹائم ڈیٹا اینالیٹکس اور مسلسل نگرانی کو اجاگر کرتا ہے۔'
      },
      {
        id: 'p5',
        paragraphNumber: 5,
        text: 'Ultimately, the fundamental purpose of financial statement assurance transcends mechanical computation and compliance checklists. Without credible, verified financial reporting, investors, banking institutions, and trading partners would withdraw their liquidity from public exchanges. By providing an objective stamp of truthfulness, the chartered accountancy profession serves as an indispensable pillar that underpins global economic stability and market trust.',
        correctHeadingIndex: 5,
        explanation: 'Paragraph 5 summarizes the core socio-economic purpose of auditing: generating trust and confidence in public capital markets.',
        urduExplanation: 'پانچواں پیراگراف آڈٹ کے بنیادی مقصد یعنی مارکیٹ اور سرمایہ کاروں میں اعتماد کی بحالی اور معاشی استحکام پر روشنی ڈالتا ہے۔'
      }
    ]
  },
  {
    id: 'read-sec4-p04',
    title: 'The Dynamics of Behavioral Finance: Psychological Biases in Corporate Capital Allocation',
    topic: 'Behavioral Economics & Decision Sciences',
    introduction: 'Read the comprehensive analysis of behavioral finance below. Match each numbered paragraph to the most appropriate heading from the list. There are two headings you will not need.',
    headings: [
      'The Rational Market Fallacy in Classical Economics',
      'The Perils of Overconfidence in Executive Decisions',
      'Loss Aversion and the Hesitation to Liquidate Assets',
      'Herd Mentality During Speculative Bubbles',
      'Complete Disappearance of Financial Market Volatility',
      'Integrating Psychological Auditing into Corporate Governance',
      'Absolute Superiority of Intuitive Gut Instincts'
    ],
    paragraphs: [
      {
        id: 'p1',
        paragraphNumber: 1,
        text: 'For decades, classical finance theory rested on the rigid presumption of market rationality. Academics posited that corporate leaders and retail investors acted as perfectly logical decision-makers who dispassionately processed all available information to maximize economic utility. However, empirical reality persistently defied these elegant mathematical models, demonstrating that financial market prices frequently diverge wildly from underlying book values due to deep-seated human psychology.',
        correctHeadingIndex: 0,
        explanation: 'Paragraph 1 critiques classical economic assumptions that market participants behave with perfect logic.',
        urduExplanation: 'پہلا پیراگراف کلاسیکی معاشیات کے اس مفروضے پر تنقید کرتا ہے کہ سرمایہ کار ہمیشہ مکمل عقل و دانش سے فیصلے کرتے ہیں۔'
      },
      {
        id: 'p2',
        paragraphNumber: 2,
        text: 'One of the most destructive cognitive distortions observed in boardrooms is the overconfidence effect. Chief executive officers frequently overestimate their predictive capabilities while drastically downplaying macroeconomic volatility. Empirical studies show that corporate acquisitions driven by executive hubris routinely destroy shareholder wealth, as bidding firms overpay for targets in the unwarranted belief that their managerial prowess can rectify any structural operational deficiency.',
        correctHeadingIndex: 1,
        explanation: 'Paragraph 2 explores how executive overconfidence and hubris lead to destructive corporate mergers and acquisitions.',
        urduExplanation: 'دوسرا پیراگراف ایگزیکٹوز کے ضرورت سے زیادہ خود اعتمادی (hubris) اور غلط کاروباری خریداریوں کے نقصانات کو بیان کرتا ہے۔'
      },
      {
        id: 'p3',
        paragraphNumber: 3,
        text: 'Equally pervasive is the psychological principle of loss aversion, formulated by psychologists Daniel Kahneman and Amos Tversky. Humans experience the pain of a financial loss twice as intensely as they relish the joy of an equivalent gain. In corporate asset management, this manifests as an irrational reluctance to terminate failing capital expenditure projects, with management pouring fresh capital into unviable ventures merely to postpone recording a formal accounting write-off.',
        correctHeadingIndex: 2,
        explanation: 'Paragraph 3 details loss aversion and the behavioral resistance to shutting down failing capital projects.',
        urduExplanation: 'تیسرا پیراگراف نقصان سے خوف (Loss Aversion) اور ناکام پروجیکٹس کو بند کرنے سے ہچکچاہٹ کے نفسیاتی پہلو پر بحث کرتا ہے۔'
      },
      {
        id: 'p4',
        paragraphNumber: 4,
        text: 'Social proof, colloquially known as herd behavior, further exacerbates systemic instability across financial sectors. When asset valuations begin to surge, individual fund managers fear the professional reputational penalty of sitting on cash reserves while their peers reap fleeting windfalls. This conformist panic compels institutional capital to flood into speculative asset bubbles, driving valuations to heights detached from any realistic discounted cash flow metric.',
        correctHeadingIndex: 3,
        explanation: 'Paragraph 4 describes herd behavior and social conformity fueling speculative asset bubbles.',
        urduExplanation: 'چوتھا پیراگراف بھیڑ چال (Herd Mentality) اور دیکھا دیکھی میں مصنوعی مالیاتی بلبلے بننے کی تفصیل پیش کرتا ہے۔'
      },
      {
        id: 'p5',
        paragraphNumber: 5,
        text: 'In response to these systemic behavioral pitfalls, forward-thinking audit committees and enterprise risk teams are rethinking their governance frameworks. Rather than relying solely on backward-looking financial ratios, modern boards are implementing formal red-team reviews and dissenting opinions before finalizing major capital outlays. Recognizing that human irrationality is predictable allows organizations to construct structural safeguards that protect shareholder value from innate cognitive biases.',
        correctHeadingIndex: 5,
        explanation: 'Paragraph 5 outlines how governance structures and audit committees build safeguards against cognitive biases.',
        urduExplanation: 'پانچواں پیراگراف ان نفسیاتی خامیوں سے بچنے کے لیے بورڈ رومز میں ریڈ ٹیم اور تنقیدی جائزوں کی شمولیت پر زور دیتا ہے۔'
      }
    ]
  }
];
