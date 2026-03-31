import { createContext, useContext, useState, useCallback, ReactNode } from "react";


type Lang = "en" | "ar";

interface LanguageContextType {
  lang: Lang;
  isAr: boolean;
  toggle: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

const translations: Record<string, Record<Lang, string>> = {
  // ─── Navbar ───
  "nav.about": { en: "About", ar: "من أنا" },
  "nav.services": { en: "Services", ar: "الخدمات" },
  "nav.caseStudies": { en: "Results", ar: "النتائج" },
  "nav.process": { en: "Process", ar: "المنهجية" },
  "nav.insights": { en: "Insights", ar: "رؤى" },
  "nav.contact": { en: "Contact", ar: "تواصل" },
  "nav.solutions": { en: "Solutions", ar: "الحلول" },
  "nav.bookCall": { en: "Book a Call", ar: "احجز مكالمة" },

  // ─── Hero ───
  "hero.badge": { en: "Mohamed Waheed — AI Growth Systems", ar: "محمد وحيد — أنظمة نمو بالذكاء الاصطناعي" },
  "hero.line1": { en: "Your business is leaking", ar: "شركتك بتخسر وقت،" },
  "hero.line2": { en: "time, leads, and revenue.", ar: "عملاء… وإيرادات." },
  "hero.line3": { en: "I build the system that stops it.", ar: "أنا ببني النظام اللي بيوقف ده." },
  "hero.subtitle": {
    en: "I diagnose inefficiencies across marketing, sales, and operations — then design and build AI-powered systems that eliminate waste and accelerate growth.",
    ar: "بشخّص القصور في التسويق، المبيعات، والعمليات.\nوببني سيستم شغل يخلي كل حاجة ماشية بنظام… مش بعشوائية."
  },
  "hero.cta1": { en: "Book a 15-min Call", ar: "احجز مكالمة ١٥ دقيقة" },
  "hero.cta2": { en: "See How It Works", ar: "كيف يعمل النظام" },
  "hero.scroll": { en: "Scroll to Explore", ar: "استكشف المزيد" },

  // ─── About ───
  "about.label": { en: "01 // The Problem", ar: "01 // المشكلة" },
  "about.title1": { en: "COMPANIES", ar: "الشركات" },
  "about.title2": { en: "ARE BROKEN", ar: "تعمل بخلل" },
  "about.p1": {
    en: "Most companies don't have a strategy problem — they have an execution problem. Marketing runs ads, but leads die in spreadsheets. Sales exists, but spends half its time on data entry. Operations run, but no one sees the full picture. The result: wasted budget, missed revenue, and teams that burn out without knowing why.",
    ar: "معظم الشركات لا تعاني من مشكلة استراتيجية — بل من مشكلة تنفيذ. التسويق يشغّل إعلانات، لكن العملاء المحتملين يضيعون في جداول البيانات. المبيعات موجودة، لكن نصف وقتها يذهب في إدخال بيانات. العمليات تسير، لكن لا أحد يرى الصورة الكاملة. النتيجة: ميزانيات مهدرة، إيرادات ضائعة، وفرق تحترق دون معرفة السبب."
  },
  "about.p2": {
    en: "I'm Mohamed Waheed. I find exactly where the leaks are — then build AI-powered systems that close them permanently.",
    ar: "أنا محمد وحيد. أحدد بالضبط أين التسريبات — ثم أبني أنظمة مدعومة بالذكاء الاصطناعي تغلقها نهائياً."
  },
  "about.pillar1": { en: "AI-Powered Lead Capture & Follow-up", ar: "استقطاب ومتابعة عملاء بالذكاء الاصطناعي" },
  "about.pillar2": { en: "Cross-Team Operations Alignment", ar: "مواءمة العمليات بين الأقسام" },
  "about.pillar3": { en: "Real-Time Decision Dashboards", ar: "لوحات قرارات لحظية" },
  "about.stat1v": { en: "3", ar: "٣" },
  "about.stat1l": { en: "Active Systems Live", ar: "أنظمة تعمل حالياً" },
  "about.stat2v": { en: "12", ar: "١٢" },
  "about.stat2l": { en: "CRM Pipelines Built", ar: "مسار CRM تم بناؤه" },
  "about.stat3v": { en: "<3min", ar: "<٣ دقائق" },
  "about.stat3l": { en: "Avg. Lead Response", ar: "متوسط وقت الاستجابة" },
  "about.stat4v": { en: "24h", ar: "٢٤ ساعة" },
  "about.stat4l": { en: "Auto-Reassignment", ar: "إعادة توزيع تلقائي" },
  "about.accepting": { en: "Accepting New Projects", ar: "متاح لمشاريع جديدة" },
  "about.cta": { en: "Get Your System Blueprint", ar: "احصل على مخطط نظامك" },

  // ─── Philosophy ───
  "philosophy.label": { en: "// My Approach", ar: "// منهجيتي" },
  "philosophy.wrongTitle": { en: "What most companies do", ar: "اللي الشركات بتعمله غلط" },
  "philosophy.wrongSub": { en: "Looks good on paper — breaks everything in practice", ar: "حلول شكلها حلو… بس بتكسر الشغل أكتر" },
  "philosophy.w1": { en: "Hire more people instead of fixing the system", ar: "تزود ناس بدل ما تصلّح السيستم" },
  "philosophy.w2": { en: "Stack tools on top of each other with no integration", ar: "ترمي أدوات فوق بعض بدون ربط" },
  "philosophy.w3": { en: "Automate random tasks with no strategy", ar: "تأتمت شغل عشوائي" },
  "philosophy.w4": { en: "Buy dashboards nobody ever opens", ar: "تشتري dashboards محدش بيستخدمها" },
  "philosophy.wrongFooter": { en: "These are band-aids — not systems.", ar: "دي حلول مؤقتة… مش سيستم" },
  "philosophy.rightTitle": { en: "I build systems that actually work", ar: "أنا ببني سيستم بيشتغل فعلاً" },
  "philosophy.rightSub": { en: "Not temporary fixes — a system that grows with you", ar: "مش حلول مؤقتة — سيستم بيكبر معاك" },
  "philosophy.rightHighlight": { en: "systems", ar: "أنظمة" },
  "philosophy.r1": { en: "Identify the real problem", ar: "بنحدد المشكلة الحقيقية" },
  "philosophy.r2": { en: "Redesign the flow from scratch", ar: "بنظبط الفلو من الأول" },
  "philosophy.r3": { en: "Automate with precision, not randomness", ar: "نأتمت بدقة مش عشوائي" },
  "philosophy.r4": { en: "Deliver a fully working system", ar: "نسلم سيستم شغال بالكامل" },
  "philosophy.result": { en: "The result: a complete operating system that runs without you", ar: "النتيجة: نظام تشغيلي كامل يعمل بدونك" },

  // ─── Services ───
  "services.label": { en: "02 // Services", ar: "02 // الخدمات" },
  "services.title1": { en: "Four systems.", ar: "أربعة أنظمة." },
  "services.title2": { en: "One mission: eliminate chaos.", ar: "مهمة واحدة: القضاء على الفوضى." },
  "services.subtitle": { en: "Each system solves a specific business failure", ar: "كل نظام يحل خللاً تجارياً محدداً" },
  "services.problem": { en: "The Problem", ar: "المشكلة" },
  "services.solution": { en: "The Solution", ar: "الحل" },
  "services.delivers": { en: "What you get", ar: "اللي بيتسلم" },
  "services.duration": { en: "Timeline", ar: "المدة" },
  "services.bookCall": { en: "Book a Call →", ar: "احجز مكالمة ←" },
  

  "services.s1.title": { en: "AI-Powered Lead Generation", ar: "نظام توليد ومتابعة العملاء" },
  "services.s1.titleEn": { en: "AI-Powered Lead Generation System", ar: "AI-Powered Lead Generation System" },
  "services.s1.problem": { en: "No system for new clients — random outreach, ads with no follow-up. Team wastes time on wrong people and loses ready buyers.", ar: "مفيش نظام لتوليد العملاء — Outreach عشوائي، إعلانات من غير متابعة. الفريق بيضيع وقت في ناس مش مناسبين وبيفوّت ناس كانوا هيشتروا." },
  "services.s1.solution": { en: "I identify your ideal client profile, build AI Agents that gather data, analyze companies, and write messages in your voice. I run the system first, then hand it over completely.", ar: "بحدد مين عميلك المثالي، ببني AI Agents تجمع الداتا وتحلل الشركات وتكتب رسائل بأسلوبك. بشغّل النظام الأول وبعدين أسلمه كامل." },
  "services.s1.d1": { en: "AI Agents for collecting and organizing target company data", ar: "AI Agents لتجميع وتنظيم بيانات الشركات المستهدفة" },
  "services.s1.d2": { en: "AI Agent to analyze each company before outreach", ar: "AI Agent لتحليل كل شركة قبل التواصل" },
  "services.s1.d3": { en: "AI Agent writing personalized messages in your voice", ar: "AI Agent لكتابة رسائل مخصصة بأسلوبك" },
  "services.s1.d4": { en: "Smart follow-up system with timing and context", ar: "نظام متابعة ذكي بتوقيت وسياق" },
  "services.s1.d5": { en: "Team training + written operations guide", ar: "تدريب الفريق + دليل تشغيل مكتوب" },
  "services.s1.duration": { en: "2–4 weeks", ar: "2–4 أسابيع" },
  

  "services.s2.title": { en: "Marketing & Sales Automation", ar: "أتمتة التسويق والمبيعات" },
  "services.s2.titleEn": { en: "Marketing & Sales Automation", ar: "Marketing & Sales Automation" },
  "services.s2.problem": { en: "Team wastes time on repetitive tasks — emails, data entry, manual follow-ups, reports. Things fall through the cracks.", ar: "الفريق بيضيع وقته في مهام متكررة — إيميلات، إدخال بيانات، متابعات يدوية، تقارير. والحاجات بتقع." },
  "services.s2.solution": { en: "I identify recurring tasks and build automated workflows from lead entry to conversion — so the team focuses on selling and creating.", ar: "بحدد المهام اللي بتتكرر، ببني Workflows تلقائية من أول ما الليد يدخل لحد ما يتحول لعميل — والفريق يركز على البيع والإبداع." },
  "services.s2.d1": { en: "Current process map + waste points identified", ar: "خريطة العمليات الحالية + نقاط الهدر" },
  "services.s2.d2": { en: "Workflows built on n8n or suitable tools", ar: "Workflows مبنية على n8n أو أدوات مناسبة" },
  "services.s2.d3": { en: "CRM + Email + WhatsApp integration", ar: "ربط CRM + Email + WhatsApp" },
  "services.s2.d4": { en: "Automated performance reports", ar: "تقارير أداء تلقائية" },
  "services.s2.d5": { en: "Team training + operations guide", ar: "تدريب الفريق + دليل تشغيل" },
  "services.s2.duration": { en: "3–6 weeks", ar: "3–6 أسابيع" },
  

  "services.s3.title": { en: "Operations & Team Alignment", ar: "تنظيم العمليات وربط الأقسام" },
  "services.s3.titleEn": { en: "Operations & Team Alignment", ar: "Operations & Team Alignment" },
  "services.s3.problem": { en: "Every department works in isolation, things fall between the chairs, manager keeps asking 'where is the work?' with no clear answer.", ar: "كل قسم شغال لوحده، حاجات بتقع بين الكراسي، المدير بيسأل 'فين الشغل؟' ومحدش عنده إجابة واضحة." },
  "services.s3.solution": { en: "I design the full workflow end-to-end — who does what, when, and hands off to whom. I connect departments and clarify ownership and accountability.", ar: "بصمم مسار الشغل من أوله لآخره — مين بيعمل إيه، إمتى، وبيسلم لمين. بربط الأقسام ببعض وبوضّح الملكية والمسؤولية." },
  "services.s3.d1": { en: "Cross-department workflow map (Process Map)", ar: "خريطة تدفق الشغل بين الأقسام (Process Map)" },
  "services.s3.d2": { en: "Clear role and ownership definitions", ar: "تعريف واضح للأدوار والملكيات" },
  "services.s3.d3": { en: "Daily + Weekly Operating Rhythm", ar: "Operating Rhythm (يومي + أسبوعي)" },
  "services.s3.d4": { en: "Connected task tracking system", ar: "نظام متابعة مهام مربوط" },
  "services.s3.d5": { en: "Management training + operations guide", ar: "تدريب المديرين + دليل تشغيل" },
  "services.s3.duration": { en: "4–6 weeks", ar: "4–6 أسابيع" },
  

  "services.s4.title": { en: "Data & Decisions Dashboard", ar: "لوحة قرارات ذكية" },
  "services.s4.titleEn": { en: "Data & Decisions Dashboard", ar: "Data & Decisions Dashboard" },
  "services.s4.problem": { en: "Data scattered across Excel, sheets, and different platforms. Manager makes decisions by guesswork, not numbers.", ar: "البيانات متفرقة في Excel وشيتات ومنصات مختلفة، والمدير بياخد قرارات بالتخمين مش بالأرقام." },
  "services.s4.solution": { en: "I consolidate all data into one Dashboard showing the full picture in real-time — what's working, what's not, where money goes, and where the opportunity is.", ar: "بجمع كل البيانات في Dashboard واحد يوري الصورة الكاملة لحظياً — إيه شغال وإيه لأ، فين الفلوس بتروح، وفين الفرصة." },
  "services.s4.d1": { en: "Dashboard connected to real data sources", ar: "Dashboard متصل بمصادر البيانات الحقيقية" },
  "services.s4.d2": { en: "Clear agreed-upon KPIs", ar: "مؤشرات أداء واضحة (KPIs) متفق عليها" },
  "services.s4.d3": { en: "Automated reports (daily / weekly)", ar: "تقارير تلقائية (يومية / أسبوعية)" },
  "services.s4.d4": { en: "Management training on reading and decision-making", ar: "تدريب الإدارة على القراءة واتخاذ القرار" },
  "services.s4.d5": { en: "Operations and maintenance guide", ar: "دليل تشغيل وصيانة" },
  "services.s4.duration": { en: "2–4 weeks", ar: "2–4 أسابيع" },
  

  // ─── Industries ───
  "industries.label": { en: "// Industries", ar: "// القطاعات" },
  "industries.title": { en: "Built for", ar: "مصمم لـ" },
  "industries.titleHighlight": { en: "your industry", ar: "قطاعك" },
  "industries.1": { en: "Real Estate", ar: "العقارات" },
  "industries.2": { en: "Trade & Manufacturing", ar: "التجارة والتصنيع" },
  "industries.3": { en: "Marketing Agencies", ar: "وكالات التسويق" },
  "industries.4": { en: "Law Firms", ar: "المكاتب القانونية" },
  "industries.5": { en: "Finance & Accounting", ar: "المالية والمحاسبة" },
  "industries.6": { en: "Healthcare", ar: "الرعاية الصحية" },
  "industries.7": { en: "E-Commerce", ar: "التجارة الإلكترونية" },
  "industries.8": { en: "SaaS & Technology", ar: "البرمجيات والتقنية" },

  // ─── Case Studies ───
  "cases.label": { en: "03 // Proven Results", ar: "03 // نتائج مثبتة" },
  "cases.title1": { en: "SYSTEMS", ar: "أنظمة" },
  "cases.title2": { en: "THAT DELIVER", ar: "تحقق نتائج" },
  "cases.subtitle": {
    en: "Real systems built for real companies — with measurable outcomes.",
    ar: "أنظمة حقيقية بُنيت لشركات حقيقية — بنتائج قابلة للقياس."
  },
  "cases.problemLabel": { en: "The Problem", ar: "المشكلة" },
  "cases.solutionLabel": { en: "The Solution", ar: "الحل" },
  "cases.c1.tag": { en: "AI Lead Management — Real Estate", ar: "إدارة عملاء بالذكاء الاصطناعي — عقارات" },
  "cases.c1.title": {
    en: "From dead spreadsheets to a 3-minute response system",
    ar: "من جداول بيانات ميتة إلى نظام استجابة في ٣ دقائق"
  },
  "cases.c1.problem": {
    en: "A real estate company spending EGP 50,000/month on ads. Leads landed in a spreadsheet — some waited 4 days without any contact. Budget burned, zero conversion.",
    ar: "شركة عقارات تنفق ٥٠,٠٠٠ جنيه شهرياً على الإعلانات. العملاء المحتملون يدخلون جدول بيانات — بعضهم انتظر ٤ أيام دون أي تواصل. ميزانية تحترق، تحويل صفري."
  },
  "cases.c1.solution": {
    en: "Built Sky Leads — an AI system that captures leads instantly, classifies them by intent, assigns to the right salesperson, and auto-reassigns if no response within 24 hours.",
    ar: "بنيتُ Sky Leads — نظام ذكاء اصطناعي يستقبل العملاء فوراً، يصنفهم حسب نيّة الشراء، يوزعهم على البائع المناسب، ويعيد التوزيع تلقائياً إذا لم يكن هناك رد خلال ٢٤ ساعة."
  },
  "cases.c1.r1l": { en: "Response Time", ar: "وقت الاستجابة" },
  "cases.c1.r1v": { en: "<3 min", ar: "<٣ دقائق" },
  "cases.c1.r2l": { en: "CRM Pipelines", ar: "مسارات CRM" },
  "cases.c1.r2v": { en: "12", ar: "١٢" },
  "cases.c1.r3l": { en: "Active Companies", ar: "شركات نشطة" },
  "cases.c1.r3v": { en: "3", ar: "٣" },
  "cases.c1.r4l": { en: "Auto-Reassignment", ar: "إعادة توزيع تلقائي" },
  "cases.c1.r4v": { en: "24h", ar: "٢٤ ساعة" },

  "cases.c2.tag": { en: "AI Outreach — Business Development", ar: "تواصل بالذكاء الاصطناعي — تطوير أعمال" },
  "cases.c2.title": {
    en: "20 personalized outreach messages per hour — zero team, zero budget",
    ar: "٢٠ رسالة تواصل مخصصة في الساعة — بدون فريق وبدون ميزانية"
  },
  "cases.c2.problem": {
    en: "No advertising budget. No sales team. Needed to reach decision-makers in a specific sector — alone.",
    ar: "لا ميزانية إعلانات. لا فريق مبيعات. أحتاج الوصول لصنّاع القرار في قطاع محدد — بمفردي."
  },
  "cases.c2.solution": {
    en: "Built an AI-powered workflow: define the sector, AI scrapes and enriches company data, analyzes fit, and drafts a personalized message in my voice. Every message reviewed before sending.",
    ar: "بنيتُ سلسلة عمل بالذكاء الاصطناعي: أحدد القطاع، الذكاء الاصطناعي يجمع ويثري بيانات الشركات، يحلل الملاءمة، ويصيغ رسالة مخصصة بأسلوبي. كل رسالة تُراجع قبل الإرسال."
  },
  "cases.c2.r1l": { en: "Messages/Hour", ar: "رسائل/ساعة" },
  "cases.c2.r1v": { en: "20", ar: "٢٠" },
  "cases.c2.r2l": { en: "Cost", ar: "التكلفة" },
  "cases.c2.r2v": { en: "$0", ar: "$0" },
  "cases.c2.r3l": { en: "Each Message", ar: "كل رسالة" },
  "cases.c2.r3v": { en: "Custom", ar: "مخصصة" },
  "cases.c2.r4l": { en: "Human Oversight", ar: "إشراف بشري" },
  "cases.c2.r4v": { en: "100%", ar: "١٠٠٪" },
  "cases.c3.tag": { en: "Content Operations — Marketing", ar: "عمليات المحتوى — تسويق" },
  "cases.c3.title": { en: "From reactive chaos to a 3x faster content machine", ar: "من فوضى رد الفعل إلى ماكينة محتوى أسرع 3 مرات" },
  "cases.c3.problem": { en: "The team worked in full reactive mode — no unified vision, no stable production system, no consistency in voice or messaging. Every piece of content started from scratch.", ar: "الفريق كان يعمل بأسلوب رد الفعل الكامل — لا رؤية موحدة، لا نظام إنتاج ثابت، لا اتساق في الصوت أو الرسائل. كل قطعة محتوى كانت تبدأ من الصفر." },
  "cases.c3.solution": { en: "Rebuilt the entire content operation: designed a Brand Messaging System (voice, tone, templates), built a weekly Content Operating Cycle, and deployed 3 AI layers — AI Strategist that translates goals into execution steps, AI Content Creator that builds ideas and copy, and an AI Design System that produces visuals on a fixed design framework.", ar: "أعدت بناء منظومة المحتوى الكاملة: نظام رسائل البراند، دورة تشغيل أسبوعية، وثلاث طبقات ذكاء اصطناعي — استراتيجي، منشئ محتوى، ونظام تصميم آلي." },
  "cases.c3.r1l": { en: "Production Speed", ar: "سرعة الإنتاج" },
  "cases.c3.r1v": { en: "3x", ar: "3x" },
  "cases.c3.r2l": { en: "Brand Consistency", ar: "اتساق البراند" },
  "cases.c3.r2v": { en: "95%", ar: "95%" },
  "cases.c3.r3l": { en: "Manual Effort", ar: "تقليل الجهد اليدوي" },
  "cases.c3.r3v": { en: "-70%", ar: "70%-" },
  "cases.c3.r4l": { en: "System", ar: "النظام" },
  "cases.c3.r4v": { en: "Always On", ar: "يعمل دائماً" },

  "cases.c4.tag": { en: "Lead Generation — B2B Outreach", ar: "توليد عملاء — B2B" },
  "cases.c4.title": { en: "20 personalized outreach messages per hour — zero team, zero budget", ar: "٢٠ رسالة تواصل مخصصة في الساعة — بدون فريق وبدون ميزانية" },
  "cases.c4.problem": { en: "No advertising budget. No sales team. Needed to reach decision-makers in a specific sector — alone, with no resources.", ar: "لا ميزانية إعلانات. لا فريق مبيعات. الحاجة للوصول لصنّاع القرار في قطاع محدد — بمفردي وبدون موارد." },
  "cases.c4.solution": { en: "Built an AI-powered outreach workflow: define the sector, AI scrapes and enriches company data, analyzes fit, then drafts a fully personalized message in the founder's voice. Every message reviewed before sending. Zero cost, full control.", ar: "بنيت سلسلة عمل بالذكاء الاصطناعي: تحديد القطاع، جمع وإثراء بيانات الشركات، تحليل الملاءمة، وصياغة رسالة مخصصة بالأسلوب الشخصي. كل رسالة تراجع قبل الإرسال." },
  "cases.c4.r1l": { en: "Messages/Hour", ar: "رسائل/ساعة" },
  "cases.c4.r1v": { en: "20", ar: "٢٠" },
  "cases.c4.r2l": { en: "Cost", ar: "التكلفة" },
  "cases.c4.r2v": { en: "$0", ar: "$0" },
  "cases.c4.r3l": { en: "Personalization", ar: "التخصيص" },
  "cases.c4.r3v": { en: "100%", ar: "١٠٠٪" },
  "cases.c4.r4l": { en: "Human Oversight", ar: "الإشراف البشري" },
  "cases.c4.r4v": { en: "Full", ar: "كامل" },

  "cases.c5.tag": { en: "Team Operations — Internal OS", ar: "عمليات الفريق — نظام تشغيل داخلي" },
  "cases.c5.title": { en: "Full visibility into who is doing what — without a single extra hire", ar: "وضوح كامل في من يعمل ماذا — بدون أي توظيف جديد" },
  "cases.c5.problem": { en: "Follow-up depended entirely on 'where is the work?' conversations. The manager had no visibility into the full picture. Ownership was unclear across all departments.", ar: "المتابعة كانت تعتمد على 'فين الشغل؟'. المدير لا يرى الصورة الكاملة. الملكية غير واضحة في جميع الأقسام." },
  "cases.c5.solution": { en: "Built an internal Operating System: clear task and follow-up rules, a Daily + Weekly Operating Rhythm, a real-time performance dashboard, and an AI Assistant that collects each team member's daily output and surfaces priorities and performance per role automatically.", ar: "بنيت نظام تشغيل داخلي متكامل: قواعد مهام واضحة، إيقاع تشغيلي يومي وأسبوعي، Dashboard لحظي، ومساعد ذكاء اصطناعي يجمع أداء كل عضو يومياً." },
  "cases.c5.r1l": { en: "Decision Speed", ar: "سرعة القرار" },
  "cases.c5.r1v": { en: "+60%", ar: "+٦٠٪" },
  "cases.c5.r2l": { en: "Meeting Time", ar: "وقت الاجتماعات" },
  "cases.c5.r2v": { en: "-50%", ar: "-٥٠٪" },
  "cases.c5.r3l": { en: "Ownership Clarity", ar: "وضوح الملكية" },
  "cases.c5.r3v": { en: "100%", ar: "١٠٠٪" },
  "cases.c5.r4l": { en: "New Hires Needed", ar: "توظيف جديد" },
  "cases.c5.r4v": { en: "0", ar: "صفر" },

  "cases.c6.tag": { en: "Talent Acquisition — HR System", ar: "اكتساب المواهب — نظام HR" },
  "cases.c6.title": { en: "Hiring time cut from 7 days to 24 hours with a structured evaluation model", ar: "وقت التوظيف من ٧ أيام إلى ٢٤ ساعة بنموذج تقييم منهجي" },
  "cases.c6.problem": { en: "Candidate selection was based entirely on personal impressions. No consistent framework. Hiring took too long and quality was unpredictable.", ar: "اختيار المرشحين كان يعتمد على الانطباعات الشخصية. لا إطار ثابت. التوظيف كان بطيئاً وغير متوقع الجودة." },
  "cases.c6.solution": { en: "Designed a full hiring system: built a Competency Matrix and Score Framework, created a standardized measurable interview template, and deployed AI Screening that reads CVs and scores them against the model — plus automatic interview scheduling.", ar: "صممت نظام توظيف كامل: Competency Matrix، Score Framework، نموذج مقابلة موحد، وذكاء اصطناعي يقرأ الـ CVs ويقيمها تلقائياً مع جدولة المقابلات." },
  "cases.c6.r1l": { en: "Time to Hire", ar: "وقت التوظيف" },
  "cases.c6.r1v": { en: "24h", ar: "٢٤ ساعة" },
  "cases.c6.r2l": { en: "Previously", ar: "كان سابقاً" },
  "cases.c6.r2v": { en: "7 days", ar: "٧ أيام" },
  "cases.c6.r3l": { en: "Selection Quality", ar: "جودة الاختيار" },
  "cases.c6.r3v": { en: "+85%", ar: "+٨٥٪" },
  "cases.c6.r4l": { en: "Process", ar: "العملية" },
  "cases.c6.r4v": { en: "Automated", ar: "آلية" },

  "cases.c7.tag": { en: "Financial Intelligence — Operations", ar: "الذكاء المالي — العمليات" },
  "cases.c7.title": { en: "Real-time financial visibility — from manual entry to instant tactical decisions", ar: "رؤية مالية لحظية — من الإدخال اليدوي إلى قرارات تكتيكية فورية" },
  "cases.c7.problem": { en: "The goal was never faster data entry — it was real-time tactical financial visibility. The team had no live view of cash flow, invoices, or performance.", ar: "الهدف لم يكن أسرع إدخال للبيانات بل رؤية مالية تكتيكية لحظية. الفريق لم يكن لديه أي رؤية حية للتدفق النقدي أو الأداء." },
  "cases.c7.solution": { en: "Built an automated financial intelligence layer: AI extracts, classifies, and analyzes financial data automatically, feeding a live Executive Financial Dashboard that gives decision-makers instant visibility into every critical metric.", ar: "بنيت طبقة ذكاء مالي آلية: استخراج وتصنيف وتحليل تلقائي، وDashboard مالي تنفيذي لحظي يمنح صناع القرار رؤية فورية لكل مؤشر حرج." },
  "cases.c7.r1l": { en: "Decision Speed", ar: "سرعة القرار" },
  "cases.c7.r1v": { en: "Real-time", ar: "لحظي" },
  "cases.c7.r2l": { en: "Team Time Saved", ar: "وقت الفريق المُوفَّر" },
  "cases.c7.r2v": { en: "75%", ar: "٧٥٪" },
  "cases.c7.r3l": { en: "Data Accuracy", ar: "دقة البيانات" },
  "cases.c7.r3v": { en: "99%", ar: "٩٩٪" },
  "cases.c7.r4l": { en: "Manual Work", ar: "العمل اليدوي" },
  "cases.c7.r4v": { en: "Near Zero", ar: "شبه صفر" },

  "cases.cta": { en: "Ready for results like these?", ar: "مستعد لنتائج كهذه؟" },
  "cases.ctaBtn": { en: "Book a Strategy Call", ar: "احجز مكالمة استراتيجية" },

  // ─── Process ───
  "process.label": { en: "02 // Process", ar: "02 // المنهجية" },
  "process.title1": { en: "HOW I", ar: "كيف" },
  "process.title2": { en: "BUILD SYSTEMS", ar: "أبني الأنظمة" },
  "process.subtitle": {
    en: "Five phases — from diagnosis to a fully operational system with trained team.",
    ar: "خمس مراحل — من التشخيص إلى نظام تشغيلي كامل مع فريق مدرّب."
  },
  "process.s1.label": { en: "Listen & Observe", ar: "اسمع وراقب" },
  "process.s1.desc": { en: "I enter your business and understand how it actually operates. No assumptions — only observed reality.", ar: "أدخل شركتك وأفهم كيف تعمل فعلياً. لا افتراضات — فقط الواقع المُلاحظ." },
  "process.s2.label": { en: "Find the Bottleneck", ar: "حدد العنق" },
  "process.s2.desc": { en: "I map every workflow and identify exactly where time, money, and leads are being lost.", ar: "أرسم كل سير عمل وأحدد بالضبط أين يضيع الوقت والمال والعملاء." },
  "process.s3.label": { en: "Design the System", ar: "صمّم السيستم" },
  "process.s3.desc": { en: "I architect a custom system — not a template. Every business gets a unique solution.", ar: "أصمم نظاماً مخصصاً — وليس قالباً جاهزاً. كل شركة تحصل على حل فريد." },
  "process.s4.label": { en: "Build & Test", ar: "ابني واختبر" },
  "process.s4.desc": { en: "I build and test the system myself before deployment — ensuring it works in production.", ar: "أبني وأختبر النظام بنفسي قبل النشر — لضمان أنه يعمل في البيئة الحقيقية." },
  "process.s5.label": { en: "Launch & Scale", ar: "أطلق وكبّر" },
  "process.s5.desc": { en: "I hand over the complete system with team training, documentation, and ongoing support.", ar: "أسلّم النظام كاملاً مع تدريب الفريق، التوثيق، والدعم المستمر." },
  "process.cta": { en: "Start Your System Build", ar: "ابدأ بناء نظامك" },

  // ─── Blog ───
  "blog.label": { en: "05 // Insights", ar: "05 // رؤى" },
  "blog.title1": { en: "THINKING", ar: "أفكار حول" },
  "blog.title2": { en: "IN SYSTEMS", ar: "بناء الأنظمة" },
  "blog.subtitle": { en: "Strategy, AI, and operational thinking", ar: "استراتيجية، ذكاء اصطناعي، وتفكير تشغيلي" },
  "blog.readArticle": { en: "Read Article", ar: "اقرأ المقال" },
  "blog.p1.title": {
    en: "Why 70% of leads die before anyone contacts them",
    ar: "لماذا يضيع ٧٠٪ من العملاء المحتملين قبل أن يتواصل معهم أحد"
  },
  "blog.p1.excerpt": {
    en: "The problem isn't your ads. It's what happens after someone clicks. Most leads enter a spreadsheet and are never contacted again.",
    ar: "المشكلة ليست إعلاناتك. إنها ما يحدث بعد أن ينقر شخص ما. معظم العملاء يدخلون جدول بيانات ولا يُتواصل معهم مرة أخرى."
  },
  "blog.p2.title": {
    en: "AI is not magic — AI is a mirror",
    ar: "الذكاء الاصطناعي ليس سحراً — إنه مرآة"
  },
  "blog.p2.excerpt": {
    en: "If your operations are chaos, AI will scale the chaos. Fix the system first, then layer in intelligence.",
    ar: "إذا كانت عملياتك فوضى، فالذكاء الاصطناعي سيُضخّم الفوضى. أصلح النظام أولاً، ثم أضف طبقة الذكاء."
  },
  "blog.p3.title": {
    en: "Your company is running — but running wrong",
    ar: "شركتك تعمل — لكن تعمل بشكل خاطئ"
  },
  "blog.p3.excerpt": {
    en: "Ads are live. Sales team exists. But leads leak, handoffs fail, and nobody knows what's working. Sound familiar?",
    ar: "الإعلانات تعمل. فريق المبيعات موجود. لكن العملاء يتسربون، والتسليمات تفشل، ولا أحد يعرف ما الذي ينجح. يبدو مألوفاً؟"
  },
  "blog.p4.title": {
    en: "One workflow that saves 4 hours every day",
    ar: "سلسلة عمل واحدة توفر ٤ ساعات يومياً"
  },
  "blog.p4.excerpt": {
    en: "How I built an AI-powered cold outreach system using Claude and n8n — and the real, measurable results it delivered.",
    ar: "كيف بنيت نظام تواصل بارد مدعوم بالذكاء الاصطناعي باستخدام Claude وn8n — والنتائج الحقيقية القابلة للقياس."
  },

  // ─── Contact ───
  "contact.label": { en: "06 // Get Started", ar: "06 // ابدأ الآن" },
  "contact.title1": { en: "READY TO", ar: "مستعد" },
  "contact.title2": { en: "BUILD YOUR SYSTEM?", ar: "لبناء نظامك؟" },
  "contact.desc": {
    en: "Tell me about your business in 15 minutes. I'll identify your biggest operational leak and outline a system to fix it.",
    ar: "أخبرني عن شركتك في ١٥ دقيقة. سأحدد أكبر تسريب تشغيلي لديك وأرسم مخطط نظام لإصلاحه."
  },
  "contact.availability": { en: "Availability", ar: "التوفر" },
  "contact.availabilityValue": { en: "Accepting projects — Egypt & Gulf", ar: "متاح لمشاريع — مصر والخليج" },
  "contact.engagement": { en: "Typical Timeline", ar: "الجدول الزمني" },
  "contact.engagementValue": { en: "2–10 week system build", ar: "بناء نظام من ٢–١٠ أسابيع" },
  "contact.whatsapp": { en: "Message on WhatsApp", ar: "أرسل رسالة على واتساب" },
  "contact.formTitle": { en: "Book a Strategy Call", ar: "احجز مكالمة استراتيجية" },
  "contact.name": { en: "Full Name", ar: "الاسم الكامل" },
  "contact.namePlaceholder": { en: "Your name", ar: "اسمك" },
  "contact.email": { en: "Email", ar: "البريد الإلكتروني" },
  "contact.emailPlaceholder": { en: "you@company.com", ar: "you@company.com" },
  "contact.company": { en: "Company", ar: "الشركة" },
  "contact.companyPlaceholder": { en: "Company name", ar: "اسم الشركة" },
  "contact.message": { en: "What's your biggest challenge?", ar: "ما أكبر تحدٍّ تواجهه؟" },
  "contact.messagePlaceholder": {
    en: "Describe your current situation — what's working and what's not.",
    ar: "صف وضعك الحالي — ما الذي يعمل وما الذي لا يعمل."
  },
  "contact.submit": { en: "BOOK YOUR CALL", ar: "احجز مكالمتك" },
  "contact.submitted": { en: "REQUEST SENT", ar: "تم الإرسال" },

  // ─── Solutions Page ───
  "sol.heroLabel": { en: "// Industry Solutions", ar: "// حلول القطاعات" },
  "sol.heroTitle1": { en: "Your business is bleeding", ar: "شركتك بتخسر فلوس" },
  "sol.heroTitle2": { en: "money right now.", ar: "دلوقتي." },
  "sol.heroDesc": {
    en: "We build the exact dashboard and automation system that stops it — for your industry, your team, your numbers.",
    ar: "بنبني النظام والـ Dashboard بالظبط اللي بيوقف الخسارة — لقطاعك، لفريقك، لأرقامك."
  },
  "sol.selectIndustry": { en: "Select your industry", ar: "اختر قطاعك" },
  "sol.problem": { en: "The Problem", ar: "المشكلة" },
  "sol.solution": { en: "The Solution", ar: "الحل" },
  "sol.kpis": { en: "Dashboard KPIs", ar: "مؤشرات الأداء" },
  "sol.automations": { en: "Automations", ar: "الأتمتة" },
  "sol.automationsCount": { en: "automations", ar: "أتمتة" },
  "sol.results": { en: "Expected Results", ar: "النتائج المتوقعة" },
  "sol.cta": { en: "Get This System for My Company", ar: "أريد هذا النظام لشركتي" },
  "sol.viewCase": { en: "View Full Details", ar: "عرض التفاصيل الكاملة" },
  "sol.viewFullCase": { en: "View Full Case Study", ar: "عرض دراسة الحالة" },
  "sol.bottomTitle1": { en: "Don't see your industry?", ar: "لا ترى قطاعك؟" },
  "sol.bottomTitle2": { en: "I'll design a custom system.", ar: "سأصمم نظاماً مخصصاً لك." },
  "sol.bottomDesc": {
    en: "Every company has unique challenges. Let's discuss yours and find the right system.",
    ar: "كل شركة لها تحديات فريدة. لنناقش تحدياتك ونجد النظام المناسب."
  },
  "sol.bottomCta": { en: "Book a Strategy Call", ar: "احجز مكالمة استراتيجية" },
  "sol.backHome": { en: "Back to Home", ar: "العودة للرئيسية" },
  "sol.priority.highest": { en: "Highest Impact", ar: "أعلى تأثير" },
  "sol.priority.high": { en: "High Impact", ar: "تأثير عالٍ" },
  "sol.priority.medium": { en: "Growing Demand", ar: "طلب متزايد" },

  // ─── Solutions Page NEW ───
  "sol.beforeTitle": { en: "Before", ar: "قبل" },
  "sol.afterTitle": { en: "After our system", ar: "بعد نظامنا" },
  "sol.weBuild": { en: "We build this →", ar: "← إحنا بنبني ده" },
  "sol.roiTitle": { en: "Calculate what this is costing you right now", ar: "احسب كام بيكلفك غياب النظام ده" },
  "sol.roiEmployees": { en: "Employees doing manual reports", ar: "عدد الموظفين اللي بيعملوا ريبورتات يدوية" },
  "sol.roiSalary": { en: "Average monthly salary (EGP)", ar: "متوسط الراتب الشهري (بالجنيه)" },
  "sol.roiWaste": { en: "You're losing {amount} EGP/month on work that can be automated", ar: "بتخسر {amount} جنيه/شهر على شغل يمكن يتعمل تلقائي" },
  "sol.roiDays": { en: "= {days} work days wasted every month", ar: "= {days} يوم عمل ضايع كل شهر" },
  "sol.roiTimeline": { en: "Our system fixes this in 2–4 weeks", ar: "نظامنا بيحل الجزء ده خلال 2–4 أسابيع" },
  "sol.roiCta": { en: "I want to save this time →", ar: "عاوز أوفر الوقت ده ←" },
  "sol.stickyReady": { en: "Ready to build a system for", ar: "جاهز تبني نظام لـ" },
  "sol.stickyQuestion": { en: "?", ar: "؟" },
  "sol.badge.mostPopular": { en: "Most Popular", ar: "الأكثر طلباً" },
  "sol.badge.highestRoi": { en: "Highest ROI", ar: "أعلى ROI" },
  "sol.badge.fastestResults": { en: "Fastest Results", ar: "أسرع نتيجة" },
  "sol.painTicker.1": { en: "Marketing agencies spend 8 hours/week on manual reports", ar: "وكالات التسويق بتقضي 8 ساعات/أسبوع على ريبورتات يدوية" },
  "sol.painTicker.2": { en: "Real estate leads wait 4 days without contact", ar: "ليدز العقارات بتستنى 4 أيام من غير تواصل" },
  "sol.painTicker.3": { en: "E-commerce owners make decisions with 3-day-old data", ar: "أصحاب التجارة الإلكترونية بياخدوا قرارات بداتا عمرها 3 أيام" },
  "sol.painTicker.4": { en: "SaaS founders spend 4 hours/week collecting numbers manually", ar: "مؤسسي SaaS بيقضوا 4 ساعات/أسبوع بيجمعوا أرقام يدوي" },
  "sol.painTicker.5": { en: "Restaurant owners don't know which branch is losing money", ar: "أصحاب المطاعم مش عارفين أنهي فرع بيخسر" },

  // ─── Footer ───
  "footer.seo": {
    en: "AI Growth Systems — Lead Generation — Marketing Automation — Sales Automation — Operations — Dashboards — AI Agents — Egypt — Gulf",
    ar: "أنظمة نمو بالذكاء الاصطناعي — توليد عملاء — أتمتة تسويق — أتمتة مبيعات — عمليات — لوحات بيانات — وكلاء ذكاء اصطناعي — مصر — الخليج"
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  const toggle = useCallback(() => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  const t = useCallback(
    (key: string) => translations[key]?.[lang] ?? key,
    [lang]
  );

  const isAr = lang === "ar";

  return (
    <LanguageContext.Provider value={{ lang, isAr, toggle, t }}>
      <div dir={isAr ? "rtl" : "ltr"} className={isAr ? "font-arabic" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};
