import { WritingPart4 } from '../types';

/**
 * Checks if a Part 4 task contains the banned default question
 * (such as Central Community Library, Zoom for 3 months, 15% fee increase, Mr. Harrison).
 */
export function isPart4DefaultOrBanned(part4: {
  contextNotice?: string;
  taskA?: { prompt?: string };
  taskB?: { prompt?: string };
  clubName?: string;
}): boolean {
  if (!part4) return true;
  const text = `${part4.clubName || ''} ${part4.contextNotice || ''} ${part4.taskA?.prompt || ''} ${part4.taskB?.prompt || ''}`.toLowerCase();
  return (
    text.includes('central community library') ||
    text.includes('zoom for the next three months') ||
    text.includes('shifted online via zoom') ||
    text.includes('mr. harrison') ||
    (text.includes('15%') && text.includes('membership subscription')) ||
    (text.includes('city book club') && text.includes('zoom'))
  );
}

/**
 * Authentic, diverse ICAP English Communication Skills (ECS) Part 4 Email Pool.
 * Spans varied professional scenarios, organizational entities, communication purposes,
 * recipients (Partners, Directors, Regulators, Ombudsmen, CFOs), and Task A friends.
 */
export const EXPANDED_PART4_EMAIL_POOL: WritingPart4[] = [
  {
    id: 'p4-icap-erp-01',
    clubName: 'Regional Audit & Financial Advisory Practice',
    scenarioTopic: 'Mandatory ERP Migration with Insufficient Trainee Training',
    communicationPurpose: 'Requesting phased implementation timeline and structured technical workshops',
    recipientTitle: 'Head of Quality Assurance & Risk Management',
    recipientName: 'Ms. Saira Malik, FCA',
    friendName: 'Bilal',
    contextNotice: 'MEMORANDUM: Ref QA/2026/09\nTo: All Assurance & Advisory Staff\nManagement has decreed that starting next Monday, all current audit documentation templates will be decommissioned and replaced by a proprietary cloud-based ERP audit suite. No formal classroom training will be provided; staff are expected to review a 400-page digital user manual independently during evening hours. Standard delivery deadlines for client working papers remain unchanged.',
    taskA: {
      prompt: 'Write an email to your peer colleague (Bilal). Share your anxiety regarding the sudden ERP rollout without hands-on training, discuss how this threatens working paper quality, and suggest practicing the software together over the weekend. (Write 40–60 words)',
      minWords: 40,
      maxWords: 60,
      sampleAnswer: 'Hi Bilal,\n\nDid you see the QA memo about the ERP software rollout? Expecting us to master a 400-page system overnight without formal training while maintaining deadlines is unrealistic. I am worried our audit trails will suffer. Can we meet at the office on Saturday morning to test the software interface together?\n\nBest,\nYour Friend'
    },
    taskB: {
      prompt: 'Write a formal email to the Head of Quality Assurance & Risk Management (Ms. Saira Malik, FCA). Express serious concerns about deploying complex audit software without classroom coaching, articulate the risk to documentation integrity under international auditing standards, and propose a phased transition model with supervised pilot teams. (Write 120–150 words)',
      minWords: 120,
      maxWords: 150,
      sampleAnswer: 'Dear Ms. Malik,\n\nI am writing to respectfully communicate substantial concerns regarding Memorandum QA/2026/09 concerning the immediate transition to the new cloud-based ERP audit suite.\n\nWhile modernization is commendable, deploying an intricate platform without interactive instruction poses grave risks to audit documentation rigor. Expecting engagement teams to assimilate complex functionalities solely through a 400-page manual while meeting tight client reporting deadlines significantly heightens the likelihood of technical recording errors.\n\nMay I propose that management adopt a phased implementation roadmap? Initiating a two-week pilot phase across selected non-statutory clients—combined with mandatory two-hour practical workshops led by systems champions—would allow trainees to build technical fluency safely. Meanwhile, maintaining parallel legacy workbooks would safeguard compliance with International Standards on Auditing (ISA 230).\n\nThank you for your constructive consideration.\n\nYours sincerely,\nAssurance Senior Trainee'
    }
  },
  {
    id: 'p4-icap-reloc-02',
    clubName: 'Metropolitan Chartered Accountancy Practice',
    scenarioTopic: 'Abrupt Office Relocation to Distant Motorway Zone',
    communicationPurpose: 'Petitioning for designated shuttle transit and flexible hybrid scheduling',
    recipientTitle: 'Director of Facilities & Operations',
    recipientName: 'Mr. Sohail Mirza',
    friendName: 'Sana',
    contextNotice: 'INTERNAL CIRCULAR: Ref ADM/2026/18\nTo: Trainees and Administrative Staff\nEffective the first of next month, our central downtown audit headquarters will be permanently relocated to the Industrial Technology Zone along the Outer Ring Highway. Staff parking is restricted to senior managers, and employees must arrange their own daily transport. Working hours will continue strictly as 8:30 AM to 6:00 PM.',
    taskA: {
      prompt: 'Write an email to your fellow trainee friend (Sana). Share your frustration about the sudden relocation to an inaccessible motorway zone, explain the commuting difficulties it creates, and propose organizing a trainee carpool. (Write 40–60 words)',
      minWords: 40,
      maxWords: 60,
      sampleAnswer: 'Hi Sana,\n\nI just read the circular about our office moving to the Outer Ring Highway! It is over 35 kilometers from the city center with zero public buses. Without company parking or transit, daily commuting will be exhausting. Shall we set up a carpool group with the other trainees to share fuel costs and driving shifts?\n\nWarmly,\nYour Friend'
    },
    taskB: {
      prompt: 'Write a formal email to the Director of Facilities & Operations (Mr. Sohail Mirza). Articulate the severe logistical challenges and safety hazards posed by the remote relocation for junior staff, explain how it impairs punctuality and evening exam classes, and propose pragmatic solutions such as a corporate shuttle service or hybrid work arrangements. (Write 120–150 words)',
      minWords: 120,
      maxWords: 150,
      sampleAnswer: 'Dear Mr. Mirza,\n\nI am writing on behalf of our trainee colleagues to express urgent concern regarding Circular ADM/2026/18 detailing the firm\'s relocation to the Industrial Technology Zone.\n\nThe new facility is inaccessible via public transit, placing severe financial and logistical burdens on junior trainees who rely on public buses. Furthermore, extended travel times will prevent students from attending evening ICAP exam coaching sessions, directly compromising their professional qualifications.\n\nTo mitigate these disruptions while supporting the firm’s operational goals, we respectfully request management to explore two constructive measures. First, establishing a dedicated shuttle service operating between the nearest metro station and the new campus would ensure punctual and secure commuting. Second, permitting a hybrid schedule where analytical documentation is completed remotely twice weekly would significantly alleviate transit pressures.\n\nWe appreciate your sympathetic review of this critical matter.\n\nYours sincerely,\nStudent Trainee Representative'
    }
  },
  {
    id: 'p4-icap-whistle-03',
    clubName: 'Corporate Governance & Internal Audit Council',
    scenarioTopic: 'Ethical Whistleblowing & Vendor Conflict-of-Interest Discovery',
    communicationPurpose: 'Reporting procurement irregularity and seeking confidentiality protection under ICAP Code of Ethics',
    recipientTitle: 'Chairman of Audit Committee & Ethics Board',
    recipientName: 'Barrister Asad Alam',
    friendName: 'Maria',
    contextNotice: 'ETHICS DIRECTIVE NOTICE:\nDuring the interim procurement audit of a major manufacturing client, your engagement team identified that three major IT hardware supply contracts—valued at 45 million rupees—were awarded without competitive bidding to a private enterprise owned by the client’s Procurement Director\'s immediate family. When you flagged this finding, the client’s Finance Controller warned your team to omit the discrepancy from the formal audit observations.',
    taskA: {
      prompt: 'Write an email to your trusted peer trainee (Maria). Confidentially explain the pressure you are facing from the client to bury this conflict-of-interest finding, express your ethical discomfort, and suggest reviewing the ICAP Code of Ethics together tonight. (Write 40–60 words)',
      minWords: 40,
      maxWords: 60,
      sampleAnswer: 'Hi Maria,\n\nI am in a very stressful ethical predicament. We uncovered unapproved multimillion-rupee contracts awarded directly to the client director\'s brother, but their controller told us to erase the findings from our audit papers. I refuse to compromise my integrity. Could we look through the ICAP Code of Ethics together tonight to verify proper whistleblowing protocols?\n\nBest,\nYour Colleague'
    },
    taskB: {
      prompt: 'Write a formal, confidential email to the Chairman of the Audit Committee & Ethics Board (Barrister Asad Alam). Formally report the identified procurement conflict-of-interest, document the intimidation attempt by client management, and request an executive review under whistleblowing safeguards to maintain audit independence. (Write 120–150 words)',
      minWords: 120,
      maxWords: 150,
      sampleAnswer: 'Dear Barrister Alam,\n\nI am writing in strict confidence to formally disclose a material governance irregularity identified during our current interim procurement audit, in accordance with the ICAP Code of Ethics.\n\nOur sampling of capital expenditure contracts revealed three uncompetitive IT equipment awards totaling 45 million rupees issued to an entity whose beneficial owner is closely related to the client\'s Procurement Director. When this lack of competitive bidding was presented for management representation, the Financial Controller explicitly requested that the observation be excluded from the audit memorandum.\n\nSuppressing this information contravenes statutory disclosure duties and compromises our professional skepticism. I therefore request that the Audit Committee initiate an independent inquiry into these transactions. Additionally, I request formal confirmation of whistleblower protections to ensure audit team members remain insulated from client retaliation.\n\nI remain available to present full supporting documentation.\n\nYours sincerely,\nSenior Audit Associate'
    }
  },
  {
    id: 'p4-icap-datab-04',
    clubName: 'Financial Analysts & Chartered Accountants Society',
    scenarioTopic: 'Sudden Discontinuation of Institutional Financial Database Subscriptions',
    communicationPurpose: 'Advocating for restoration of essential analytical research tools',
    recipientTitle: 'Chief Financial Officer & Knowledge Director',
    recipientName: 'Mr. Haris Qureshi, FCA',
    friendName: 'Daniyal',
    contextNotice: 'ADMINISTRATIVE NOTICE: Ref RES/2026/05\nTo: Research and Advisory Staff\nAs part of an organization-wide overhead rationalization drive, enterprise licenses for institutional financial databases (including Bloomberg Terminal and S&P Capital IQ) will terminate at the end of this week. Trainees performing business valuations and transfer pricing benchmarking are advised to rely on publicly available web search engines and company annual reports.',
    taskA: {
      prompt: 'Write an email to your fellow valuation trainee (Daniyal). Express your astonishment that specialized market databases are being discontinued, explain how this prevents accurate peer benchmarking, and propose sharing research techniques. (Write 40–60 words)',
      minWords: 40,
      maxWords: 60,
      sampleAnswer: 'Hi Daniyal,\n\nDid you see the notice about terminating our Bloomberg and Capital IQ subscriptions? Expecting us to perform multi-million rupee enterprise valuations using basic web searches is practically impossible! Our transfer pricing benchmarks will be indefensible. Let’s meet this afternoon to brainstorm alternative verified databases or free academic portals we might use.\n\nBest,\nYour Teammate'
    },
    taskB: {
      prompt: 'Write a formal email to the Chief Financial Officer & Knowledge Director (Mr. Haris Qureshi, FCA). Explain how the abrupt cancellation of institutional financial databases impairs valuation accuracy, increases litigation risk in client advisory engagements, and propose cost-effective alternatives such as pooled department licenses or academic consortia. (Write 120–150 words)',
      minWords: 120,
      maxWords: 150,
      sampleAnswer: 'Dear Mr. Qureshi,\n\nI am writing to respectfully highlight the operational implications of Notice RES/2026/05 regarding the immediate termination of our Bloomberg and S&P Capital IQ research subscriptions.\n\nWhile cost rationalization is understandable, specialized valuation and transfer pricing mandates require audited financial metrics, beta coefficients, and transaction multiples that public search engines cannot supply. Relying on unverified secondary web sources exposes the firm to severe regulatory censure from tax authorities and client litigation regarding valuation accuracy.\n\nRather than an outright cancellation, may we recommend a more targeted expenditure model? Consolidating individual user accounts into two shared terminal workstations or negotiating an academic corporate consortium rate would reduce subscription expenditures by upwards of 60% without disabling our core research capacity.\n\nWe hope this pragmatic alternative assists management in balancing fiscal prudence with analytical excellence.\n\nYours sincerely,\nValuation & Financial Advisory Trainee'
    }
  },
  {
    id: 'p4-icap-second-05',
    clubName: 'International Accounting & Secondment Forum',
    scenarioTopic: 'Revocation of Global Training Secondment Program',
    communicationPurpose: 'Challenging unilateral cancellation of merit secondments and requesting compensatory training',
    recipientTitle: 'Director of Education & Global Training at ICAP',
    recipientName: 'Dr. Zafar Iqbal',
    friendName: 'Hira',
    contextNotice: 'MEMORANDUM: Ref INT/2026/12\nTo: All Shortlisted International Secondment Candidates\nDue to geopolitical travel advisories and regional fiscal constraints, the 2026 International Audit Secondment to London and Dubai has been cancelled. Shortlisted candidates who completed rigorous technical evaluations and second language assessments will receive no replacement overseas placement or financial compensation.',
    taskA: {
      prompt: 'Write an email to your peer candidate friend (Hira). Share your heartbreak over the overseas secondment cancellation after six months of preparation, and suggest meeting up to discuss submitting a joint letter to the committee. (Write 40–60 words)',
      minWords: 40,
      maxWords: 60,
      sampleAnswer: 'Hi Hira,\n\nI am completely shattered by the secondment cancellation! We spent six grueling months studying for the aptitude exams and language certifications. To cancel everything with zero alternative opportunities is deeply disheartening. Can we grab coffee tomorrow during lunch to draft a collective appeal to the training council?\n\nYours in solidarity,\nYour Friend'
    },
    taskB: {
      prompt: 'Write a formal email to the Director of Education & Global Training at ICAP (Dr. Zafar Iqbal). Express profound disappointment regarding the abrupt cancellation of the international secondment program, outline the extensive investments made by qualifying candidates, and respectfully propose alternative cross-border remote engagements or prioritized placements for the subsequent intake. (Write 120–150 words)',
      minWords: 120,
      maxWords: 150,
      sampleAnswer: 'Dear Dr. Iqbal,\n\nI am writing on behalf of the shortlisted secondment candidates regarding Memorandum INT/2026/12 announcing the unexpected cancellation of the 2026 Global Audit Secondment Program.\n\nQualifying for this prestigious cohort required exceptional performance across comprehensive technical assessments, continuous professional ethics interviews, and substantial personal financial outlay for visa preparation. While we understand the macroeconomic constraints influencing overseas travel, terminating the initiative without transitional remedies leaves high-achieving trainees thoroughly demoralized.\n\nWe respectfully request the Directorate to evaluate two constructive alternatives. First, establishing virtual cross-border collaboration arrangements with our network\'s London and Dubai offices would allow candidates to acquire international advisory exposure remotely. Second, we urge that qualified candidates be guaranteed prioritized consideration for the 2027 secondment intake without having to repeat preliminary qualification rounds.\n\nThank you for your supportive leadership and consideration.\n\nYours sincerely,\nCandidate Representative'
    }
  },
  {
    id: 'p4-icap-surveil-06',
    clubName: 'Chartered Trainees Ethics & Workplace Standards Council',
    scenarioTopic: 'Mandatory Biometric Keylogging Surveillance Policy',
    communicationPurpose: 'Filing ethical dissent against intrusive software and requesting balanced productivity metrics',
    recipientTitle: 'Human Resources & Professional Practice Director',
    recipientName: 'Ms. Farida Khan',
    friendName: 'Saad',
    contextNotice: 'POLICY CIRCULAR: Ref HR/2026/33\nTo: All Audit & Tax Articleship Trainees\nIn order to enforce strict working discipline, mandatory surveillance software will be installed on all firm-issued laptops tomorrow. The software will log every keystroke, capture automated screen captures every five minutes, and record video via webcams randomly throughout the day. Any period of keyboard inactivity exceeding four minutes will be logged as unauthorized absence.',
    taskA: {
      prompt: 'Write an email to your fellow trainee friend (Saad). Express your outrage over the invasive keylogging and webcam surveillance policy, explain how it creates intense stress during audit work, and propose discussing it with your senior. (Write 40–60 words)',
      minWords: 40,
      maxWords: 60,
      sampleAnswer: 'Hi Saad,\n\nHave you seen this shocking HR circular? Installing automated keyloggers and random webcam captures on our laptops is an outrageous violation of privacy! In analytical audit work, we spend hours reading complex contracts without touching the keyboard. Let’s speak with our engagement manager immediately before this software is deployed.\n\nBest,\nYour Friend'
    },
    taskB: {
      prompt: 'Write a formal email to the Human Resources & Professional Practice Director (Ms. Farida Khan). Object to the invasive keylogging and continuous webcam surveillance policy, explain how it impairs professional trust and fails to reflect intellectual audit work, and propose objective deliverable-based performance evaluations instead. (Write 120–150 words)',
      minWords: 120,
      maxWords: 150,
      sampleAnswer: 'Dear Ms. Khan,\n\nI am writing on behalf of the audit articleship trainees to express profound concern regarding Policy Circular HR/2026/33 mandating the installation of automated keylogging and periodic webcam surveillance software.\n\nWhile monitoring organizational productivity is valid, continuous biometric and keystroke tracking fundamentally conflicts with the ethos of professional accountancy. Chartered accountancy demands critical analytical thinking, document review, and technical contemplation, none of which correlate directly with mechanical keystrokes. Furthermore, continuous automated webcam recording in remote client environments raises grave data confidentiality concerns under International Standard on Quality Management (ISQM 1).\n\nWe respectfully urge management to replace intrusive micromanagement tools with milestone-driven performance reviews. Evaluating engagement teams based on the timely completion of audit sections and working paper precision preserves professional dignity while ensuring operational accountability.\n\nWe look forward to an amicable dialogue.\n\nYours sincerely,\nTrainee Council Representative'
    }
  },
  {
    id: 'p4-icap-travel-07',
    clubName: 'Regional Field Audit Operations Forum',
    scenarioTopic: 'Unannounced Revocation of Outstation Travel Allowances',
    communicationPurpose: 'Petitioning for fair travel reimbursement and safety compliance during outstation client visits',
    recipientTitle: 'Managing Partner & Head of Assurance',
    recipientName: 'Mr. Jamil Akhtar, FCA',
    friendName: 'Fatima',
    contextNotice: 'FINANCE NOTIFICATION: Ref FIN/2026/22\nTo: Assurance Field Teams\nWith immediate effect, daily outstation travel and accommodation per diems for provincial factory audits are slashed by 65%. Trainees deployed on outstation inventory counts must arrange shared budget lodging in local dormitories, and receipts for intercity transport fares will no longer be reimbursed unless prior written authorization was stamped by the regional managing partner two weeks in advance.',
    taskA: {
      prompt: 'Write an email to your fellow field auditor (Fatima). Express your distress about the slashed travel allowances just before your upcoming rural factory audit, and suggest coordinating hotel bookings together. (Write 40–60 words)',
      minWords: 40,
      maxWords: 60,
      sampleAnswer: 'Hi Fatima,\n\nDid you see the finance circular? Cutting outstation per diems by 65% when we are scheduled for the cement plant audit next Monday is unbelievable. The remaining allowance won\'t even cover clean drinking water and safe transport! Can we look up secure, budget accommodations together this evening and talk to our partner tomorrow?\n\nWarm regards,\nYour Colleague'
    },
    taskB: {
      prompt: 'Write a formal email to the Managing Partner & Head of Assurance (Mr. Jamil Akhtar, FCA). Explain the severe personal safety and health risks created by drastically reduced outstation travel allowances, articulate the adverse impact on team morale during stock counts, and respectfully urge the restoration of standard subsistence reimbursements. (Write 120–150 words)',
      minWords: 120,
      maxWords: 150,
      sampleAnswer: 'Dear Mr. Akhtar,\n\nI am writing to respectfully bring to your immediate attention the serious operational and welfare challenges created by Finance Notification FIN/2026/22 regarding outstation travel allowances.\n\nExecuting mandatory physical inventory counts at remote industrial plants requires adequate rest and reliable transport to ensure auditor vigilance and personal safety. Slashed per diems make it impossible for junior trainees—particularly female field auditors—to secure secure accommodation and sanitized meals within industrial zones. Forcing staff to absorb substantial out-of-pocket costs on client engagements induces profound distress and compromises audit execution.\n\nWe earnestly request that executive management reinstate the standardized per diem scale for provincial engagements or arrange direct corporate billing with reputable regional hotel chains. Ensuring safe, dignified working conditions for field personnel is essential to preserving the firm’s audit quality and statutory duties.\n\nThank you for your decisive leadership.\n\nYours sincerely,\nSenior Field Auditor'
    }
  },
  {
    id: 'p4-icap-inventory-08',
    clubName: 'Independent Audit Standards & Statutory Assurance Circle',
    scenarioTopic: 'Client Management Denying Access to Physical Inventory Verification',
    communicationPurpose: 'Reporting scope limitation and requesting formal partner intervention under ISA 501',
    recipientTitle: 'Senior Engagement Partner',
    recipientName: 'Mr. Tariq Mahmud, FCA',
    friendName: 'Hamza',
    contextNotice: 'URGENT FIELD ENGAGEMENT MEMO:\nYou are currently leading the year-end inventory count at a major client manufacturing site. The client\'s General Manager of Warehousing has strictly barred your audit team from entering the bonded raw materials warehouse, citing "proprietary manufacturing trade secrets", and insists that the team accept unaudited internal stock ledgers instead.',
    taskA: {
      prompt: 'Write an email to your peer colleague (Hamza). Briefly explain the client\'s refusal to allow you into the warehouse, explain why accepting their ledgers blindly is impossible, and propose immediate escalation to the audit manager. (Write 40–60 words)',
      minWords: 40,
      maxWords: 60,
      sampleAnswer: 'Hi Hamza,\n\nWe have a major crisis at the warehouse. The plant manager is refusing to let our team enter the raw materials storage, claiming commercial secrets, and wants us to sign off on their internal excel sheets! This is a blatant scope limitation. I am calling our audit manager right now; please stand by to document the timeline.\n\nBest,\nYour Teammate'
    },
    taskB: {
      prompt: 'Write a formal, urgent email to the Senior Engagement Partner (Mr. Tariq Mahmud, FCA). Formally report the severe scope limitation imposed by client management under ISA 501 (Audit Evidence - Specific Considerations for Inventory), explain why unaudited ledgers cannot substantiate existence, and request formal partner intervention before the reporting deadline. (Write 120–150 words)',
      minWords: 120,
      maxWords: 150,
      sampleAnswer: 'Dear Mr. Mahmud,\n\nI am writing to urgently report a critical scope limitation encountered during today’s year-end physical inventory verification at the Apex Mills facility.\n\nUpon our arrival, the General Manager of Warehousing formally prohibited our audit team from accessing the primary bonded warehouse, alleging intellectual property confidentiality. Management demanded that we rely exclusively on unaudited internal inventory schedules to verify stock valued at 120 million rupees, representing 35% of total assets.\n\nPursuant to ISA 501, physical observation is mandatory to substantiate the existence and condition of material inventory. Accepting unverified records without direct physical sampling would violate professional standards and necessitate a qualified or disclaimed audit opinion. I respectfully request your direct intervention with the client\'s Board of Directors to secure unrestricted access or evaluate appropriate modifications to our auditor’s report.\n\nI await your urgent instructions.\n\nYours sincerely,\nAssurance Field Lead'
    }
  }
];

/**
 * Returns a truly fresh Part 4 email task, guaranteed not to be
 * the default library/Zoom/15% fee question, and avoiding previously seen scenarios.
 */
export function selectFreshPart4EmailTask(seenKeys: Set<string>): WritingPart4 {
  const eligible = EXPANDED_PART4_EMAIL_POOL.filter(p4 => {
    if (isPart4DefaultOrBanned(p4)) return false;
    if (seenKeys.has(p4.id) || seenKeys.has(p4.scenarioTopic || '') || seenKeys.has(p4.clubName)) return false;
    return true;
  });

  if (eligible.length > 0) {
    const randomIndex = Math.floor(Math.random() * eligible.length);
    return eligible[randomIndex];
  }

  // Fallback: pick any non-banned item from the pool
  const safePool = EXPANDED_PART4_EMAIL_POOL.filter(p4 => !isPart4DefaultOrBanned(p4));
  return safePool[Math.floor(Math.random() * safePool.length)] || EXPANDED_PART4_EMAIL_POOL[0];
}
