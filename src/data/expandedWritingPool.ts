import { AptisWritingModule } from '../types';
import { APTIS_TEST_SET_1, APTIS_TEST_SET_2 } from './aptisMockData';

export const EXPANDED_WRITING_MODULES: AptisWritingModule[] = [
  APTIS_TEST_SET_1.writing,
  APTIS_TEST_SET_2.writing,
  {
    themeName: 'ICAP Young Chartered Accountants & Professional Development Forum',
    part1: {
      id: 'w-p1-forum-03',
      context: 'You have joined the ICAP Young Chartered Accountants Professional Development Forum. Answer the 5 onboarding questions from the forum moderator in 1–5 words each.',
      questions: [
        {
          id: 'q1',
          prompt: 'What accounting qualification stage are you currently pursuing?',
          maxWords: 5,
          sampleAnswer: 'CAF examination candidate.'
        },
        {
          id: 'q2',
          prompt: 'Which technical training module interests you most?',
          maxWords: 5,
          sampleAnswer: 'Advanced forensic audit techniques.'
        },
        {
          id: 'q3',
          prompt: 'How often do you attend professional webinars?',
          maxWords: 5,
          sampleAnswer: 'Twice every calendar month.'
        },
        {
          id: 'q4',
          prompt: 'What is your preferred format for mentorship sessions?',
          maxWords: 5,
          sampleAnswer: 'Small weekend group workshops.'
        },
        {
          id: 'q5',
          prompt: 'Which foreign language would you like to learn for global engagements?',
          maxWords: 5,
          sampleAnswer: 'Business French.'
        }
      ]
    },
    part2: {
      id: 'w-p2-forum-03',
      formName: 'Professional Goals & Ethical Commitment Declaration',
      prompt: 'Please describe why you chose the chartered accountancy profession and what ethical standard you consider most crucial in corporate reporting. (Write 20–30 words)',
      minWords: 20,
      maxWords: 30,
      sampleAnswer: 'I chose chartered accountancy to master financial governance. Objectivity and integrity are paramount to guarantee public trust in corporate disclosures.'
    },
    part3: {
      id: 'w-p3-forum-03',
      clubName: 'Young Chartered Accountants Chat Room',
      context: 'You are participating in the forum chat room with other trainee accountants. Respond to all three messages. (Write 30–40 words for each response)',
      memberChats: [
        {
          id: 'chat1',
          memberName: 'Zainab (Audit Senior)',
          avatarInitials: 'ZS',
          message: 'Welcome to our network! How are you balancing long audit busy-season hours with your ICAP examination revisions?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'Balancing rigorous audit field schedules with exam preparation requires strict calendar time-blocking. I dedicate two disciplined hours each morning to revision before client engagements commence.'
        },
        {
          id: 'chat2',
          memberName: 'Bilal (Advisory Associate)',
          avatarInitials: 'BA',
          message: 'Our firm is organizing a weekend case-study hackathon on sustainability reporting (ESG). Do you think trainees should participate?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'Participating is indispensable because international sustainability standards are reshaping corporate disclosures. Hands-on case studies prepare trainees for emerging regulatory frameworks beyond conventional balance sheet audits.'
        },
        {
          id: 'chat3',
          memberName: 'Danish (Tax Consultant)',
          avatarInitials: 'DT',
          message: 'The committee is proposing replacing physical seminars with digital asynchronous modules. What is your view on this change?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'While digital modules offer scheduling convenience, in-person workshops foster spontaneous debates and networking. A hybrid model combining digital lectures with monthly physical panel discussions would be optimal.'
        }
      ]
    },
    part4: {
      id: 'w-p4-forum-03',
      clubName: 'Professional Development Forum Announcement',
      contextNotice: 'Dear Forum Members,\n\nDue to unforeseen budget reallocations by the regional committee, the upcoming Annual Chartered Accountants Leadership Retreat in Lahore has been cancelled. Instead, the administration intends to host a single 2-hour virtual webinar, and registration fees paid by members will not be refunded in cash but converted into non-transferable bookstore vouchers.',
      taskA: {
        prompt: 'Write an email to your fellow trainee friend (Ahmed). Express your feelings about the retreat cancellation and voucher policy, and suggest what you two should do instead. (Write 40–50 words)',
        minWords: 40,
        maxWords: 50,
        sampleAnswer: 'Hi Ahmed,\n\nI am really annoyed about the Lahore leadership retreat being called off! Converting our hard-earned registration fees into bookstore coupons is unfair. Let’s draft an email to the committee requesting cash refunds, or at least organize our own study group this weekend.\n\nBest,\nYour Friend'
      },
      taskB: {
        prompt: 'Write a formal email to the Forum President (Mr. Mansoor). Express your disappointment regarding the abrupt cancellation, explain why converting registration fees into bookstore vouchers is inappropriate, and formally request a full refund or an alternative in-person symposium. (Write 120–150 words)',
        minWords: 120,
        maxWords: 150,
        sampleAnswer: 'Dear Mr. Mansoor,\n\nI am writing to formally communicate my serious concern regarding the abrupt cancellation of the Annual Chartered Accountants Leadership Retreat in Lahore and the administrative decision to substitute cash refunds with bookstore vouchers.\n\nTrainees budgeted substantial personal funds and arranged client leave specifically to benefit from peer networking and interactive leadership workshops. A brief two-hour webinar does not provide equivalent professional development value. Furthermore, imposing non-transferable vouchers without member consent disregards the financial constraints faced by student accountants.\n\nWhile I appreciate the budgetary constraints faced by the regional committee, fair governance requires transparent stakeholder consideration. I respectfully urge the executive board to reconsider this directive and offer members either a full monetary refund or an adjusted in-person symposium before year-end.\n\nThank you for your prompt attention to this matter.\n\nYours sincerely,\nChartered Accountancy Trainee'
      }
    }
  },
  {
    themeName: 'Karachi Tech Innovators & Digital Skills Club',
    part1: {
      id: 'w-p1-tech-04',
      context: 'You have joined the Karachi Tech Innovators & Digital Skills Club. Answer the 5 onboarding questions from the club coordinator in 1–5 words each.',
      questions: [
        {
          id: 'q1',
          prompt: 'What programming language or technical tool are you learning?',
          maxWords: 5,
          sampleAnswer: 'Python data science libraries.'
        },
        {
          id: 'q2',
          prompt: 'Which digital workshop topic appeals to you most?',
          maxWords: 5,
          sampleAnswer: 'Artificial intelligence and automation.'
        },
        {
          id: 'q3',
          prompt: 'On which day do you prefer attending club meetups?',
          maxWords: 5,
          sampleAnswer: 'Saturday afternoon.'
        },
        {
          id: 'q4',
          prompt: 'What computer operating system do you use daily?',
          maxWords: 5,
          sampleAnswer: 'Linux and Windows.'
        },
        {
          id: 'q5',
          prompt: 'Where did you first hear about our tech club?',
          maxWords: 5,
          sampleAnswer: 'University campus noticeboard.'
        }
      ]
    },
    part2: {
      id: 'w-p2-tech-04',
      formName: 'Digital Project Proposal & Skill Profile Form',
      prompt: 'Please explain what software or data automation project you want to build this semester and how our community can help you. (Write 20–30 words)',
      minWords: 20,
      maxWords: 30,
      sampleAnswer: 'I aim to build an automated financial reconciliation script using Python. Technical mentorship from club seniors will help me write robust error-handling code.'
    },
    part3: {
      id: 'w-p3-tech-04',
      clubName: 'Tech Innovators Chat Room',
      context: 'You are chatting with other members in the club discussion room. Respond to all three messages. (Write 30–40 words for each response)',
      memberChats: [
        {
          id: 'chat1',
          memberName: 'Hassan (Full-Stack Developer)',
          avatarInitials: 'HD',
          message: 'Welcome! Are you more interested in front-end web design, backend systems, or data analytics?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'I am particularly drawn to data analytics and backend automation. Understanding databases and statistical algorithms is crucial for modern commercial reporting, though clean user interface design is also valuable.'
        },
        {
          id: 'chat2',
          memberName: 'Mariam (Cybersecurity Analyst)',
          avatarInitials: 'MA',
          message: 'We are hosting a weekend ethical hacking and data protection workshop. Do you think beginners should attend?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'Beginners should definitely attend because cyber hygiene and encryption are foundational to all software. Learning basic threat prevention early prevents costly vulnerabilities and fosters secure programming habits.'
        },
        {
          id: 'chat3',
          memberName: 'Usman (Cloud Engineer)',
          avatarInitials: 'UE',
          message: 'The committee wants to replace all physical coding sessions with purely online discord streams. What is your opinion?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'Physical coding sessions allow hands-on pair programming and immediate bug debugging that streams cannot match. A hybrid structure preserving monthly in-person hackathons alongside online streams would serve us best.'
        }
      ]
    },
    part4: {
      id: 'w-p4-tech-04',
      clubName: 'Karachi Tech Innovators Announcement',
      contextNotice: 'Notice to All Club Members:\n\nWe regret to announce that the annual 48-Hour National AI Hackathon scheduled at the Expo Centre has been cancelled due to venue double-booking. The executive committee has decided not to issue cash refunds for the registration fee. Instead, all registered members will receive 10 hours of pre-recorded software tutorial videos.',
      taskA: {
        prompt: 'Write an email to your fellow club member friend (Saad). Express your frustration about the hackathon cancellation and the video tutorial substitute, and suggest an alternative plan for this weekend. (Write 40–50 words)',
        minWords: 40,
        maxWords: 50,
        sampleAnswer: 'Hi Saad,\n\nI cannot believe they cancelled the 48-hour hackathon! Replacing a live coding competition with boring pre-recorded videos is completely unacceptable. Let’s meet up at my place this Saturday anyway and build our web project together over coffee.\n\nCheers,\nYour Friend'
      },
      taskB: {
        prompt: 'Write a formal email to the Club President (Ms. Shahida). Express your disappointment regarding the hackathon cancellation, explain why pre-recorded videos do not offer equivalent practical value, and formally request a full fee refund or a rescheduled in-person event. (Write 120–150 words)',
        minWords: 120,
        maxWords: 150,
        sampleAnswer: 'Dear Ms. Shahida,\n\nI am writing to express my profound disappointment regarding the sudden cancellation of the 48-Hour National AI Hackathon and the administrative decision to substitute our participation fees with pre-recorded tutorial videos.\n\nMembers registered for this hackathon specifically to experience intense collaborative problem-solving, rapid prototyping, and live networking with technology industry judges. Pre-recorded tutorial videos are readily available online for free and in no way compensate for the experiential learning and career exposure of a physical competition.\n\nFurthermore, withholding paid registration fees without participant consent creates significant dissatisfaction among the student developer community. I respectfully request that the executive management either reschedule the live competition for the coming month or issue immediate full cash refunds to all registered teams.\n\nThank you for considering my concerns, and I await your constructive response.\n\nYours sincerely,\nKarachi Tech Club Member'
      }
    }
  },
  {
    themeName: 'Lahore Readers & Heritage Book Circle',
    part1: {
      id: 'w-p1-book-05',
      context: 'You have joined the Lahore Readers & Heritage Book Circle. Answer the 5 onboarding questions from the reading coordinator in 1–5 words each.',
      questions: [
        {
          id: 'q1',
          prompt: 'What literary genre do you read most frequently?',
          maxWords: 5,
          sampleAnswer: 'Historical fiction and biography.'
        },
        {
          id: 'q2',
          prompt: 'How many books did you complete last year?',
          maxWords: 5,
          sampleAnswer: 'Approximately fifteen volumes.'
        },
        {
          id: 'q3',
          prompt: 'Do you prefer physical printed books or e-readers?',
          maxWords: 5,
          sampleAnswer: 'Physical printed paperbacks.'
        },
        {
          id: 'q4',
          prompt: 'What time of day do you usually read?',
          maxWords: 5,
          sampleAnswer: 'Late in the evening.'
        },
        {
          id: 'q5',
          prompt: 'Who is your favourite classic author?',
          maxWords: 5,
          sampleAnswer: 'Charles Dickens.'
        }
      ]
    },
    part2: {
      id: 'w-p2-book-05',
      formName: 'Book Club Reading Preferences & Discussion Form',
      prompt: 'Please tell us about a book that made a lasting impression on your worldview and why you recommend it to fellow members. (Write 20–30 words)',
      minWords: 20,
      maxWords: 30,
      sampleAnswer: 'I recommend "To Kill a Mockingbird" because it profoundly illustrates moral courage, judicial fairness, and empathy in the face of deep societal prejudice.'
    },
    part3: {
      id: 'w-p3-book-05',
      clubName: 'Heritage Book Circle Chat Room',
      context: 'You are chatting with fellow circle members in the book lounge. Respond to all three messages. (Write 30–40 words for each response)',
      memberChats: [
        {
          id: 'chat1',
          memberName: 'Ayesha (Literature Teacher)',
          avatarInitials: 'AT',
          message: 'Welcome to our circle! Which historical period or culture’s literature fascinates you the most?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'I am deeply drawn to Mughal-era poetry and post-colonial South Asian literature. Exploring how writers documented rapid urban changes, cultural identity, and social resilience offers profound historical perspectives.'
        },
        {
          id: 'chat2',
          memberName: 'Kamran (Novelist)',
          avatarInitials: 'KN',
          message: 'Our next month is dedicated to classic translated poetry. Do you find translated literature as powerful as the original text?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'While linguistic nuances inevitably shift during translation, gifted translators capture the emotional resonance and philosophical depth of the original masterpiece. Translations build vital bridges across diverse global cultures.'
        },
        {
          id: 'chat3',
          memberName: 'Farida (Historian)',
          avatarInitials: 'FH',
          message: 'The venue owner has raised rental rates, so we may have to relocate our monthly book meetings to a busy noisy cafe. What do you think?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'A noisy cafe would ruin the contemplative atmosphere necessary for serious literary debate. We should explore booking community library reading rooms or quiet university seminar halls instead.'
        }
      ]
    },
    part4: {
      id: 'w-p4-book-05',
      clubName: 'Lahore Heritage Book Circle Notice',
      contextNotice: 'Important Announcement to All Members:\n\nDue to unexpected renovations at the historic library hall, our upcoming Annual Author Gala featuring visiting international novelists has been cancelled. Furthermore, the committee has decided that the gala entry tickets cannot be refunded in cash; members will instead receive five back-issues of the circle’s printed quarterly newsletter.',
      taskA: {
        prompt: 'Write an email to your reading friend (Nida). Express your disappointment about the author gala cancellation and the newsletter replacement, and propose an alternative literary outing. (Write 40–50 words)',
        minWords: 40,
        maxWords: 50,
        sampleAnswer: 'Dear Nida,\n\nI was devastated to hear the author gala has been called off! Handing us old printed newsletters instead of refunding our ticket money is absurd. Why don’t we browse the old book bazaar on Mall Road this Sunday and grab tea instead?\n\nWarmly,\nYour Friend'
      },
      taskB: {
        prompt: 'Write a formal email to the Circle Chairperson (Dr. Aslam). Express your dissatisfaction with the event cancellation, explain why back-issues of newsletters are an unacceptable substitute for ticket holders, and formally request a full refund or an alternative author gathering. (Write 120–150 words)',
        minWords: 120,
        maxWords: 150,
        sampleAnswer: 'Dear Dr. Aslam,\n\nI am writing to formally voice my deep disappointment regarding the abrupt cancellation of the Annual Author Gala and the committee’s unilateral decision to offer archived quarterly newsletters in lieu of ticket refunds.\n\nMembers invested considerable anticipation and funds to interact directly with distinguished authors and participate in literary roundtables. Replacing an inspiring intellectual event with surplus printed newsletters is entirely inadequate and does not honor the value of members’ financial contributions.\n\nWhile I sympathize with the logistical constraints caused by library renovations, maintaining member goodwill requires transparent and equitable remedies. I respectfully request that the executive committee either organize an alternative outdoor literary gathering or initiate immediate, full monetary refunds for all affected ticket holders.\n\nThank you for your understanding and prompt intervention.\n\nYours sincerely,\nBook Circle Member'
      }
    }
  },
  {
    themeName: 'National Young Entrepreneurs & Business Incubator',
    part1: {
      id: 'w-p1-entrepreneur-06',
      context: 'You have joined the National Young Entrepreneurs & Business Incubator. Answer the 5 onboarding questions from the program director in 1–5 words each.',
      questions: [
        {
          id: 'q1',
          prompt: 'What business sector does your startup idea target?',
          maxWords: 5,
          sampleAnswer: 'Fintech and automated billing.'
        },
        {
          id: 'q2',
          prompt: 'What stage is your business currently at?',
          maxWords: 5,
          sampleAnswer: 'Prototype development stage.'
        },
        {
          id: 'q3',
          prompt: 'How many co-founders are on your core team?',
          maxWords: 5,
          sampleAnswer: 'Two co-founders.'
        },
        {
          id: 'q4',
          prompt: 'Which mentor specialization would help you most?',
          maxWords: 5,
          sampleAnswer: 'Venture capital pitch preparation.'
        },
        {
          id: 'q5',
          prompt: 'How did you discover our incubator program?',
          maxWords: 5,
          sampleAnswer: 'LinkedIn professional network.'
        }
      ]
    },
    part2: {
      id: 'w-p2-entrepreneur-06',
      formName: 'Executive Venture Summary & Market Validation Form',
      prompt: 'Briefly summarize your business proposition, target customer segment, and why your solution solves an urgent commercial problem. (Write 20–30 words)',
      minWords: 20,
      maxWords: 30,
      sampleAnswer: 'Our mobile platform automates invoice reconciliation for small retail businesses, saving merchants twenty manual hours weekly while eliminating costly calculation errors.'
    },
    part3: {
      id: 'w-p3-entrepreneur-06',
      clubName: 'Incubator Founders Lounge Chat',
      context: 'You are discussing business development strategies with other founders. Respond to all three messages. (Write 30–40 words for each response)',
      memberChats: [
        {
          id: 'chat1',
          memberName: 'Zubair (E-Commerce Founder)',
          avatarInitials: 'ZF',
          message: 'Welcome! How are you financing your initial customer discovery research before seeking angel investors?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'We are self-funding through personal savings and taking on small freelance accounting assignments. Bootstrapping during customer discovery forces fiscal discipline and prevents premature equity dilution before achieving product-market fit.'
        },
        {
          id: 'chat2',
          memberName: 'Anam (Healthtech Founder)',
          avatarInitials: 'AF',
          message: 'Do you believe early-stage founders should spend money on trademark registrations and patents immediately?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'Early intellectual property protection is crucial if you have proprietary technology. However, for most software startups, validating user demand and achieving sustainable traction should take priority over expensive legal filings.'
        },
        {
          id: 'chat3',
          memberName: 'Daniyal (Marketing Lead)',
          avatarInitials: 'DL',
          message: 'The incubator wants to replace our physical co-working desks with virtual zoom office hours. How do you feel about this?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'Physical co-working spaces encourage spontaneous founder collaboration, peer feedback, and vital investor introductions. Losing dedicated desks would severely diminish the incubator’s value proposition and community spirit.'
        }
      ]
    },
    part4: {
      id: 'w-p4-entrepreneur-06',
      clubName: 'National Incubator Board Bulletin',
      contextNotice: 'Attention Incubator Cohort Members:\n\nDue to the sudden withdrawal of a corporate anchor sponsor, the National Startup Investor Pitch Day in Islamabad has been cancelled. Furthermore, the incubator administration has stated that cohort security deposits will not be refunded in cash; instead, founders will receive a 6-month digital subscription to a corporate press release distribution portal.',
      taskA: {
        prompt: 'Write an email to your startup co-founder (Hamza). Express your shock about the pitch day cancellation and non-refundable deposit policy, and propose an immediate action plan. (Write 40–50 words)',
        minWords: 40,
        maxWords: 50,
        sampleAnswer: 'Hey Hamza,\n\nI am stunned that the pitch day has been called off! Forfeiting our deposit for useless press release subscriptions is completely unacceptable. Let’s immediately draft a formal protest to the board and reach out directly to angel investors via email.\n\nBest,\nYour Co-founder'
      },
      taskB: {
        prompt: 'Write a formal email to the Incubator Managing Director (Mr. Jahangir). Express your deep concern over the event cancellation, explain why a press release portal subscription is an inadequate remedy for early-stage startups, and formally demand a full deposit refund or a rescheduled investor showcase. (Write 120–150 words)',
        minWords: 120,
        maxWords: 150,
        sampleAnswer: 'Dear Mr. Jahangir,\n\nI am writing on behalf of our venture team to formally express our profound dismay regarding the abrupt cancellation of the National Startup Investor Pitch Day in Islamabad and the decision to convert cash security deposits into press release portal subscriptions.\n\nEarly-stage founders committed substantial time, marketing capital, and travel budgets specifically to showcase our working prototypes before venture capitalists. A generic PR distribution subscription provides virtually zero utility for pre-seed ventures seeking critical equity financing.\n\nArbitrarily retaining startup deposits during an economic crunch undermines trust in the incubator’s stewardship. I respectfully urge the executive management to either reschedule the investor showcase with regional angel syndicates or immediately execute full monetary refunds of all participant deposits.\n\nThank you for your urgent consideration of this matter.\n\nYours sincerely,\nCohort Venture Founder'
      }
    }
  },
  {
    themeName: 'Urban Cyclists & Active Commuters Association',
    part1: {
      id: 'w-p1-cycling-07',
      context: 'You have joined the Urban Cyclists & Active Commuters Association. Answer the 5 onboarding questions from the membership secretary in 1–5 words each.',
      questions: [
        {
          id: 'q1',
          prompt: 'What type of bicycle do you ride regularly?',
          maxWords: 5,
          sampleAnswer: 'Hybrid commuter road bicycle.'
        },
        {
          id: 'q2',
          prompt: 'How many kilometers do you cycle every week?',
          maxWords: 5,
          sampleAnswer: 'Roughly forty kilometers.'
        },
        {
          id: 'q3',
          prompt: 'Do you commute by bike to work or study?',
          maxWords: 5,
          sampleAnswer: 'Yes, every morning.'
        },
        {
          id: 'q4',
          prompt: 'What safety gear do you consider most essential?',
          maxWords: 5,
          sampleAnswer: 'Helmet and reflective vest.'
        },
        {
          id: 'q5',
          prompt: 'Where would you like our group to ride next?',
          maxWords: 5,
          sampleAnswer: 'Margalla Hills scenic trail.'
        }
      ]
    },
    part2: {
      id: 'w-p2-cycling-07',
      formName: 'City Commuter Safety & Route Feedback Form',
      prompt: 'Describe your daily bicycle route to work or campus, the primary road hazard you encounter, and one improvement the municipal council should implement. (Write 20–30 words)',
      minWords: 20,
      maxWords: 30,
      sampleAnswer: 'I cycle five kilometers along the main boulevard. Heavy commercial traffic and missing bike lanes are hazardous. The council must paint dedicated, barrier-protected cycle tracks.'
    },
    part3: {
      id: 'w-p3-cycling-07',
      clubName: 'Active Commuters Chat Room',
      context: 'You are chatting with fellow cycling club members. Respond to all three messages. (Write 30–40 words for each response)',
      memberChats: [
        {
          id: 'chat1',
          memberName: 'Arif (Trail Guide)',
          avatarInitials: 'AG',
          message: 'Welcome to the club! What is your advice for members cycling during heavy monsoon downpours?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'During monsoon showers, reduce your speed by half and increase braking distance because wet road surfaces lose grip. Equipping waterproof mudguards and ultra-bright blinking taillights is essential for motorist visibility.'
        },
        {
          id: 'chat2',
          memberName: 'Sumbul (Commuter Advocate)',
          avatarInitials: 'SA',
          message: 'Our association is petitioning corporate offices to install indoor bike racks and shower cubicles. Will employers agree?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'Forward-thinking companies will agree because encouraging cycling reduces employee healthcare claims and corporate parking congestion. Presenting data on productivity gains will convince management to invest in workplace facilities.'
        },
        {
          id: 'chat3',
          memberName: 'Nasir (Bike Mechanic)',
          avatarInitials: 'NM',
          message: 'The club committee wants to mandate expensive branded cycling kits for all weekend group rides. What is your stance?',
          minWords: 30,
          maxWords: 40,
          sampleAnswer: 'Mandating uniform high-priced kits creates unnecessary financial barriers for students and newcomers. Cycling should remain an inclusive, accessible pastime where basic comfort and safety helmets take priority over luxury fashion.'
        }
      ]
    },
    part4: {
      id: 'w-p4-cycling-07',
      clubName: 'Cyclists Association Executive Announcement',
      contextNotice: 'Notice to All Registered Cyclists:\n\nDue to municipal road closures for international summit motorcades, the Annual 50km City Charity Tour scheduled for this Sunday has been cancelled. Furthermore, the organizing committee has decided that participant registration fees cannot be refunded in cash; instead, each rider will receive two branded water bottles and a bumper sticker.',
      taskA: {
        prompt: 'Write an email to your riding companion (Taimoor). Express your frustration about the tour cancellation and the water bottle compensation, and propose a weekend alternative. (Write 40–50 words)',
        minWords: 40,
        maxWords: 50,
        sampleAnswer: 'Hi Taimoor,\n\nI am so annoyed about Sunday’s 50km charity ride being cancelled! Giving us cheap plastic bottles instead of refunding our entry fee is completely unacceptable. Let’s do our own morning loop through the countryside trails this Sunday instead.\n\nBest,\nYour Cycling Partner'
      },
      taskB: {
        prompt: 'Write a formal email to the Association President (Mr. Khawar). Express your strong dissatisfaction regarding the event cancellation, explain why promotional merchandise does not compensate for lost registration fees, and formally request a full refund or an organized rescheduled tour. (Write 120–150 words)',
        minWords: 120,
        maxWords: 150,
        sampleAnswer: 'Dear Mr. Khawar,\n\nI am writing to formally communicate my deep concern regarding the sudden cancellation of the Annual 50km City Charity Tour and the administration’s decision to substitute monetary refunds with branded merchandise.\n\nMembers paid their hard-earned registration fees in good faith to participate in a coordinated, police-escorted cycling event supporting public health. Compensating participants with promotional water bottles and stickers demonstrates a disregard for our financial investment and goodwill.\n\nWhile I recognize that municipal motorcade closures were beyond your immediate control, responsible organizational governance demands fair accountability. I respectfully request that the executive committee either reschedule the charity tour for the following weekend or provide full cash refunds to all registered cyclists without delay.\n\nThank you for your prompt attention to this urgent matter.\n\nYours sincerely,\nActive Commuters Association Member'
      }
    }
  }
];
