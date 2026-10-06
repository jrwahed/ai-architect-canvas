import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";


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
  "nav.about": { en: "About", ar: "عنّي" },
  "nav.services": { en: "Services", ar: "الخدمات" },
  "nav.caseStudies": { en: "Work", ar: "الأعمال" },
  "nav.process": { en: "Process", ar: "طريقة الشغل" },
  "nav.insights": { en: "Insights", ar: "رؤى" },
  "nav.contact": { en: "Contact", ar: "تواصل" },
  "nav.solutions": { en: "Solutions", ar: "الحلول" },
  "nav.bookCall": { en: "Book a Call", ar: "احجز مكالمة" },

  // ─── Hero ───
  "hero.badge": { en: "Mohamed Waheed — AI Growth Systems", ar: "محمد وحيد — أنظمة نمو بالذكاء الاصطناعي" },
  "hero.line1": { en: "Every lead, every task,", ar: "كل عميل، وكل مهمة،" },
  "hero.line2": { en: "every number…", ar: "وكل رقم…" },
  "hero.line3": { en: "in one smart system.", ar: "في نظام واحد ذكي." },
  "hero.subtitle": { en: "I'm Mohamed Waheed. I get your company off WhatsApp threads and scattered sheets and onto one connected system: AI handles the repetitive work, and you see what's working in numbers.", ar: "أنا محمد وحيد. بطلّع شركتك من جروبات الواتساب والشيتات المتفرقة لنظام واحد مربوط: الـAI بيعمل الشغل المتكرر، وإنت بتشوف إيه اللي شغال بالأرقام." },
  "hero.cta1": { en: "Book a free diagnosis", ar: "احجز تشخيص مجاني" },
  "hero.cta2": { en: "See systems I built", ar: "شوف أنظمة بنيتها" },
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
  "services.label": { en: "What I build", ar: "اللي ببنيه" },
  "services.title1": { en: "13 services, in 4 groups.", ar: "١٣ خدمة، في ٤ مجموعات." },
  "services.title2": { en: "Each one takes real work off your team.", ar: "كل واحدة بتشيل حِمل حقيقي عن فريقك." },
  "services.subtitle": { en: "Each system solves a specific business failure", ar: "كل نظام يحل خللاً تجارياً محدداً" },
  "services.problem": { en: "The Problem", ar: "المشكلة" },
  "services.solution": { en: "The Solution", ar: "الحل" },
  "services.delivers": { en: "What you get", ar: "اللي بيتسلم" },
  "services.duration": { en: "Timeline", ar: "المدة" },
  "services.bookCall": { en: "Book a Call →", ar: "احجز مكالمة ←" },
  

  "services.s1.title": { en: "Lead capture & follow-up", ar: "نظام جلب ومتابعة العملاء" },
  "services.s1.titleEn": { en: "AI-Powered Lead Generation System", ar: "AI-Powered Lead Generation System" },
  "services.s1.problem": { en: "Every new lead, from ads, WhatsApp or your website, lands in one place. AI scores it and hands it to the right person, and if nobody replies in time the system reminds them or reassigns it.", ar: "كل عميل جديد، من إعلان أو واتساب أو الموقع، بيدخل مكان واحد. الـAI بيقيّمه ويوزّعه على الشخص الصح، ولو محدش رد في وقته النظام بيفكّره أو بيحوّله لغيره." },
  "services.s1.solution": { en: "I identify your ideal client profile, build AI Agents that gather data, analyze companies, and write messages in your voice. I run the system first, then hand it over completely.", ar: "بحدد مين عميلك المثالي، ببني AI Agents تجمع الداتا وتحلل الشركات وتكتب رسائل بأسلوبك. بشغّل النظام الأول وبعدين أسلمه كامل." },
  "services.s1.d1": { en: "Leads from every source in one CRM", ar: "العملاء من كل المصادر في CRM واحد" },
  "services.s1.d2": { en: "AI scoring and automatic assignment", ar: "تقييم وتوزيع أوتوماتيك بالـAI" },
  "services.s1.d3": { en: "Follow-ups and reminders until the deal closes", ar: "متابعة وتذكير لحد ما الصفقة تتقفل" },
  "services.s1.d4": { en: "Smart follow-up system with timing and context", ar: "نظام متابعة ذكي بتوقيت وسياق" },
  "services.s1.d5": { en: "Team training + written operations guide", ar: "تدريب الفريق + دليل تشغيل مكتوب" },
  "services.s1.duration": { en: "2–4 weeks", ar: "٢–٤ أسابيع" },
  

  "services.s2.title": { en: "Automating repetitive work", ar: "أتمتة الشغل المتكرر" },
  "services.s2.titleEn": { en: "Marketing & Sales Automation", ar: "Marketing & Sales Automation" },
  "services.s2.problem": { en: "Anything your team does the same way every day, like messages, reports and moving data between tools, I make it run on its own.", ar: "أي حاجة فريقك بيعملها كل يوم بنفس الطريقة، زي الرسايل والتقارير ونقل الداتا بين البرامج، بخليها تتعمل لوحدها." },
  "services.s2.solution": { en: "I identify recurring tasks and build automated workflows from lead entry to conversion — so the team focuses on selling and creating.", ar: "بحدد المهام اللي بتتكرر، ببني Workflows تلقائية من أول ما الليد يدخل لحد ما يتحول لعميل — والفريق يركز على البيع والإبداع." },
  "services.s2.d1": { en: "I list the repetitive tasks and start with the biggest", ar: "بحصر المهام المتكررة وببدأ بأكبرهم" },
  "services.s2.d2": { en: "CRM, email, WhatsApp and sheets connected", ar: "ربط الـCRM والإيميل والواتساب والشيتات ببعض" },
  "services.s2.d3": { en: "n8n + AI workflows that run 24/7", ar: "Workflows بـn8n والـAI شغالة ٢٤ ساعة" },
  "services.s2.d4": { en: "Automated performance reports", ar: "تقارير أداء تلقائية" },
  "services.s2.d5": { en: "Team training + operations guide", ar: "تدريب الفريق + دليل تشغيل" },
  "services.s2.duration": { en: "3–6 weeks", ar: "٣–٦ أسابيع" },
  

  "services.s3.title": { en: "An operating system for your company", ar: "نظام تشغيل لشركتك" },
  "services.s3.titleEn": { en: "Operations & Team Alignment", ar: "Operations & Team Alignment" },
  "services.s3.problem": { en: "An internal app built around how your company works: tasks, daily reports, reviews, performance and HR. Everyone knows what to do, and the manager sees it all without asking.", ar: "برنامج داخلي على مقاس شركتك: المهام، والتقارير اليومية، والمراجعة، والأداء، والـHR. كل واحد عارف هو بيعمل إيه، والمدير شايف كل حاجة من غير ما يسأل." },
  "services.s3.solution": { en: "I design the full workflow end-to-end — who does what, when, and hands off to whom. I connect departments and clarify ownership and accountability.", ar: "بصمم مسار الشغل من أوله لآخره — مين بيعمل إيه، إمتى، وبيسلم لمين. بربط الأقسام ببعض وبوضّح الملكية والمسؤولية." },
  "services.s3.d1": { en: "Tasks with stages, reviews and automatic escalation", ar: "مهام بمراحل ومراجعة وتصعيد أوتوماتيك" },
  "services.s3.d2": { en: "Daily reports and performance per person", ar: "تقرير يومي ومتابعة أداء لكل موظف" },
  "services.s3.d3": { en: "Works on phone and desktop", ar: "بيشتغل على الموبايل والكمبيوتر" },
  "services.s3.d4": { en: "Connected task tracking system", ar: "نظام متابعة مهام مربوط" },
  "services.s3.d5": { en: "Management training + operations guide", ar: "تدريب المديرين + دليل تشغيل" },
  "services.s3.duration": { en: "4–6 weeks", ar: "٤–٦ أسابيع" },
  

  "services.s4.title": { en: "Business Intelligence dashboard", ar: "داشبورد Business Intelligence" },
  "services.s4.titleEn": { en: "Data & Decisions Dashboard", ar: "Data & Decisions Dashboard" },
  "services.s4.problem": { en: "I pull the numbers from your sheets, ads, CRM and accounts into one dashboard that updates itself. You see where money comes in and where it leaks, and decide with numbers.", ar: "بجمع الأرقام من الشيتات والإعلانات والـCRM والحسابات في داشبورد واحد بيتحدّث لوحده. تشوف الفلوس بتدخل منين وبتضيع فين، وتاخد القرار بالأرقام." },
  "services.s4.solution": { en: "I consolidate all data into one Dashboard showing the full picture in real-time — what's working, what's not, where money goes, and where the opportunity is.", ar: "بجمع كل البيانات في Dashboard واحد يوري الصورة الكاملة لحظياً — إيه شغال وإيه لأ، فين الفلوس بتروح، وفين الفرصة." },
  "services.s4.d1": { en: "All your data sources in one place", ar: "كل مصادر الداتا في مكان واحد" },
  "services.s4.d2": { en: "Clear KPIs we agree on together", ar: "مؤشرات واضحة (KPIs) بنتفق عليها سوا" },
  "services.s4.d3": { en: "Automatic daily or weekly report", ar: "تقرير أوتوماتيك يومي أو أسبوعي" },
  "services.s4.d4": { en: "Management training on reading and decision-making", ar: "تدريب الإدارة على القراءة واتخاذ القرار" },
  "services.s4.d5": { en: "Operations and maintenance guide", ar: "دليل تشغيل وصيانة" },
  "services.s4.duration": { en: "2–4 weeks", ar: "٢–٤ أسابيع" },
  

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
  "cases.c1.tag": { en: "Lead management with AI · Real estate", ar: "إدارة العملاء بالـAI · عقارات" },
  "cases.c1.title": { en: "From a dead spreadsheet to every lead in front of the right salesperson", ar: "من شيت ميت، لكل عميل قدام السيلز المناسب على طول" },
  "cases.c1.problem": { en: "A real estate company spending EGP 50,000 a month on ads. Leads landed in a spreadsheet, and some waited 4 days without a call. The budget was burning with nothing to show.", ar: "شركة عقارات بتصرف ٥٠ ألف جنيه في الشهر على الإعلانات. العملاء بيدخلوا شيت، وفي ناس فضلت ٤ أيام محدش كلمها. الفلوس بتتصرف ومفيش بيع." },
  "cases.c1.solution": { en: "I built Sky Leads: every lead is captured instantly, AI sorts it by how ready it is to buy, it goes to the right salesperson, and if nobody replies within 24 hours it moves to someone else automatically.", ar: "بنيت Sky Leads: كل عميل بيتسجّل فورًا، والـAI بيصنّفه حسب هو جاهز يشتري ولا لأ، وبيروح للسيلز المناسب، ولو محدش رد في ٢٤ ساعة بيتحوّل لغيره أوتوماتيك." },
  "cases.c1.r2l": { en: "Pipeline stages", ar: "مرحلة في الـCRM" },
  "cases.c1.r2v": { en: "12", ar: "١٢" },
  "cases.c1.r4l": { en: "Auto-reassignment", ar: "تحويل أوتوماتيك" },
  "cases.c1.r4v": { en: "24h", ar: "٢٤ ساعة" },

  "cases.c2.tag": { en: "AI outreach · Business development", ar: "تواصل بالـAI · تطوير أعمال" },
  "cases.c2.title": { en: "Personal outreach to the right companies, with no team and no budget", ar: "رسايل شخصية للشركات المناسبة، من غير فريق ولا ميزانية" },
  "cases.c2.problem": { en: "No ad budget and no sales team, but I needed to reach decision-makers in a specific sector on my own.", ar: "مفيش ميزانية إعلانات ولا فريق مبيعات، ومحتاج أوصل لأصحاب القرار في مجال معيّن لوحدي." },
  "cases.c2.solution": { en: "I built an AI workflow: pick the sector, AI collects and enriches company data, checks the fit, and drafts a personal message in my voice. I review every message before it goes out.", ar: "بنيت سلسلة شغل بالـAI: بحدد المجال، والـAI بيجمع داتا الشركات ويكمّلها، ويشوف مين مناسب، ويكتب رسالة شخصية بأسلوبي. وكل رسالة بتتراجع قبل ما تتبعت." },
  "cases.c2.r2l": { en: "Cost", ar: "التكلفة" },
  "cases.c2.r2v": { en: "$0", ar: "$0" },
  "cases.c2.r3l": { en: "Each Message", ar: "كل رسالة" },
  "cases.c2.r3v": { en: "Custom", ar: "مخصصة" },
  "cases.c2.r4l": { en: "Reviewed by a human", ar: "بتتراجع بإيد بشر" },
  "cases.c2.r4v": { en: "100%", ar: "١٠٠٪" },
  "cases.c3.tag": { en: "Content operations · Marketing", ar: "تشغيل المحتوى · تسويق" },
  "cases.c3.title": { en: "From last-minute chaos to a weekly content machine", ar: "من شغل على آخر لحظة، لماكينة محتوى ليها دورة أسبوعية" },
  "cases.c3.short": { en: "A brand voice system, a weekly production cycle, and 3 AI helpers for strategy, copy and design.", ar: "نظام لصوت البراند، ودورة إنتاج أسبوعية، و٣ مساعدين بالـAI للاستراتيجية والكتابة والتصميم." },
  "cases.c3.problem": { en: "The team worked in full reactive mode — no unified vision, no stable production system, no consistency in voice or messaging. Every piece of content started from scratch.", ar: "الفريق كان يعمل بأسلوب رد الفعل الكامل — لا رؤية موحدة، لا نظام إنتاج ثابت، لا اتساق في الصوت أو الرسائل. كل قطعة محتوى كانت تبدأ من الصفر." },
  "cases.c3.solution": { en: "Rebuilt the entire content operation: designed a Brand Messaging System (voice, tone, templates), built a weekly Content Operating Cycle, and deployed 3 AI layers — AI Strategist that translates goals into execution steps, AI Content Creator that builds ideas and copy, and an AI Design System that produces visuals on a fixed design framework.", ar: "أعدت بناء منظومة المحتوى الكاملة: نظام رسائل البراند، دورة تشغيل أسبوعية، وثلاث طبقات ذكاء اصطناعي — استراتيجي، منشئ محتوى، ونظام تصميم آلي." },


  "cases.c5.tag": { en: "Team operations · Internal OS", ar: "تشغيل الفريق · نظام داخلي" },
  "cases.c5.title": { en: "Clear view of who's doing what, without hiring anyone new", ar: "كل واحد بيعمل إيه باين قدامك، من غير ما توظّف حد جديد" },
  "cases.c5.short": { en: "Clear task rules, a daily and weekly rhythm, a live dashboard, and an assistant that gathers each person's daily work.", ar: "قواعد واضحة للمهام، وإيقاع يومي وأسبوعي، وداشبورد لايف، ومساعد بيجمع شغل كل واحد يوميًا." },
  "cases.c5.problem": { en: "Follow-up depended entirely on 'where is the work?' conversations. The manager had no visibility into the full picture. Ownership was unclear across all departments.", ar: "المتابعة كانت تعتمد على 'فين الشغل؟'. المدير لا يرى الصورة الكاملة. الملكية غير واضحة في جميع الأقسام." },
  "cases.c5.solution": { en: "Built an internal Operating System: clear task and follow-up rules, a Daily + Weekly Operating Rhythm, a real-time performance dashboard, and an AI Assistant that collects each team member's daily output and surfaces priorities and performance per role automatically.", ar: "بنيت نظام تشغيل داخلي متكامل: قواعد مهام واضحة، إيقاع تشغيلي يومي وأسبوعي، Dashboard لحظي، ومساعد ذكاء اصطناعي يجمع أداء كل عضو يومياً." },

  "cases.c6.tag": { en: "Hiring · HR system", ar: "التوظيف · نظام HR" },
  "cases.c6.title": { en: "Hiring by a clear scoring model, not gut feeling", ar: "توظيف بنموذج تقييم واضح، مش بالانطباع" },
  "cases.c6.short": { en: "A competency matrix, one interview template, AI that scores CVs against it, and automatic scheduling.", ar: "مصفوفة مهارات، ونموذج مقابلة موحّد، وAI بيقيّم الـCVs عليها، وترتيب المقابلات أوتوماتيك." },
  "cases.c6.problem": { en: "Candidate selection was based entirely on personal impressions. No consistent framework. Hiring took too long and quality was unpredictable.", ar: "اختيار المرشحين كان يعتمد على الانطباعات الشخصية. لا إطار ثابت. التوظيف كان بطيئاً وغير متوقع الجودة." },
  "cases.c6.solution": { en: "Designed a full hiring system: built a Competency Matrix and Score Framework, created a standardized measurable interview template, and deployed AI Screening that reads CVs and scores them against the model — plus automatic interview scheduling.", ar: "صممت نظام توظيف كامل: Competency Matrix، Score Framework، نموذج مقابلة موحد، وذكاء اصطناعي يقرأ الـ CVs ويقيمها تلقائياً مع جدولة المقابلات." },

  "cases.c7.tag": { en: "Financial BI · Operations", ar: "BI مالي · تشغيل" },
  "cases.c7.title": { en: "Live financial numbers instead of manual entry", ar: "أرقام الفلوس قدامك لحظة بلحظة، بدل الإدخال بالإيد" },
  "cases.c7.short": { en: "AI pulls and sorts the financial data into a live dashboard for management.", ar: "الـAI بيطلّع الداتا المالية ويصنّفها، وبتظهر في داشبورد لايف للإدارة." },
  "cases.c7.problem": { en: "The goal was never faster data entry — it was real-time tactical financial visibility. The team had no live view of cash flow, invoices, or performance.", ar: "الهدف لم يكن أسرع إدخال للبيانات بل رؤية مالية تكتيكية لحظية. الفريق لم يكن لديه أي رؤية حية للتدفق النقدي أو الأداء." },
  "cases.c7.solution": { en: "Built an automated financial intelligence layer: AI extracts, classifies, and analyzes financial data automatically, feeding a live Executive Financial Dashboard that gives decision-makers instant visibility into every critical metric.", ar: "بنيت طبقة ذكاء مالي آلية: استخراج وتصنيف وتحليل تلقائي، وDashboard مالي تنفيذي لحظي يمنح صناع القرار رؤية فورية لكل مؤشر حرج." },

  "cases.cta": { en: "Ready for results like these?", ar: "مستعد لنتائج كهذه؟" },
  "cases.ctaBtn": { en: "Book a Strategy Call", ar: "احجز مكالمة استراتيجية" },

  // ─── Process ───
  "process.label": { en: "The framework", ar: "طريقة الشغل" },
  "process.title1": { en: "HOW I", ar: "كيف" },
  "process.title2": { en: "BUILD SYSTEMS", ar: "أبني الأنظمة" },
  "process.subtitle": {
    en: "Five phases — from diagnosis to a fully operational system with trained team.",
    ar: "خمس مراحل — من التشخيص إلى نظام تشغيلي كامل مع فريق مدرّب."
  },
  "process.s1.label": { en: "Diagnose", ar: "التشخيص" },
  "process.s1.desc": { en: "I look at how your work really runs and pinpoint the 3 things wasting the most time and money. This step is free.", ar: "بشوف الشغل ماشي إزاي على الطبيعة، وبحدد أهم ٣ حاجات بتضيّع وقت وفلوس. والخطوة دي مجانية." },
  "process.s2.label": { en: "Design", ar: "التصميم" },
  "process.s2.desc": { en: "I design the system around your company: the steps, who owns what, where AI helps and where a fixed rule works better. We agree on the numbers we'll measure.", ar: "برسم النظام على مقاس شركتك: الخطوات، ومين مسؤول عن إيه، وفين الـAI يساعد وفين قاعدة ثابتة أحسن. ونتفق على الأرقام اللي هنقيس بيها." },
  "process.s3.label": { en: "Build", ar: "البناء" },
  "process.s3.desc": { en: "I build in stages, and each stage is tested on your team's real work, not made-up examples.", ar: "ببني على مراحل، وكل مرحلة بتتجرّب على شغل فريقك الحقيقي، مش على أمثلة." },
  "process.s4.label": { en: "Hand over & train", ar: "التسليم والتدريب" },
  "process.s4.desc": { en: "Team training and a written guide, until the team is comfortable running the system.", ar: "تدريب للفريق ودليل مكتوب، لحد ما الفريق يتعود على النظام ويشغّله." },
  "process.s5.label": { en: "Follow up & improve", ar: "المتابعة والتحسين" },
  "process.s5.desc": { en: "I keep watching the numbers after launch and adjust what needs adjusting, with monthly care if you want it.", ar: "بتابع الأرقام بعد التسليم، وبظبط اللي محتاج يتظبط، ولو حابب نكمّل بصيانة شهرية." },
  "process.cta": { en: "Tell me about your work", ar: "احكيلي عن شغلك" },

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
  "contact.label": { en: "Contact", ar: "تواصل" },
  "contact.title1": { en: "Ready to run", ar: "جاهز تشغّل شركتك" },
  "contact.title2": { en: "on a system?", ar: "بنظام؟" },
  "contact.desc": { en: "Tell me in 15 minutes how your work runs today and what's wearing your team out. I'll tell you where I'd start and what the system would look like.", ar: "احكيلي في ١٥ دقيقة الشغل ماشي إزاي النهارده، وإيه اللي مِتعب فريقك. وأنا أقولك هبدأ منين، والنظام هيبقى شكله إيه." },
  "contact.availability": { en: "Availability", ar: "التوفر" },
  "contact.availabilityValue": { en: "Taking new projects · Egypt & the Gulf", ar: "متاح لمشاريع جديدة · مصر والخليج" },
  "contact.engagement": { en: "Typical Timeline", ar: "الجدول الزمني" },
  "contact.engagementValue": { en: "2 weeks to 3 months, depending on size", ar: "من أسبوعين لـ٣ شهور حسب حجم النظام" },
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
  "contact.sentTitle": { en: "Your message is ready in WhatsApp", ar: "رسالتك جاهزة على واتساب" },
  "contact.sentDesc": {
    en: "Press send in WhatsApp so it reaches me. If WhatsApp didn't open, use one of the buttons below. Your details are still here.",
    ar: "دوس إرسال في واتساب عشان توصلني. لو واتساب ماتفتحش، استخدم واحد من الزرارين اللي تحت. بياناتك لسه محفوظة هنا.",
  },
  "contact.sentWhatsapp": { en: "Open WhatsApp", ar: "افتح واتساب" },
  "contact.sentEmail": { en: "Send by email instead", ar: "ابعتها بالإيميل بدل كده" },
  "contact.sentReset": { en: "Send a new request", ar: "إرسال طلب جديد" },

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
  // ─── Redesigned homepage ───
  "nav.products": { en: "Products", ar: "المنتجات" },
  "hero.eyebrow": { en: "BI & AI automation · Egypt & the Gulf", ar: "BI وأتمتة بالـAI · مصر والخليج" },
  "hero.byline": { en: "Mohamed Waheed · 5+ years in Business Development & Growth Marketing", ar: "محمد وحيد · +٥ سنين في تطوير الأعمال والتسويق" },
  "flow.title": { en: "A new lead, handled", ar: "عميل جديد، اتعامل معاه" },
  "flow.example": { en: "Example flow", ar: "مثال توضيحي" },
  "flow.s1": { en: "Lead arrives from a Facebook ad", ar: "عميل جاي من إعلان فيسبوك" },
  "flow.s2": { en: "AI qualifies it: ready to buy", ar: "الـAI قيّمه: جاهز يشتري" },
  "flow.s3": { en: "Assigned to the right salesperson", ar: "اتوزع على السيلز المناسب" },
  "flow.s4": { en: "First response", ar: "أول رد" },
  "flow.s4v": { en: "2:41 min", ar: "٢:٤١ دقيقة" },
  "proof.1v": { en: "13", ar: "١٣" },
  "proof.1l": { en: "Automated jobs running daily in my latest system", ar: "مهمة أوتوماتيك بتشتغل كل يوم في آخر نظام بنيته" },
  "proof.2v": { en: "21", ar: "٢١" },
  "proof.2l": { en: "People use my latest system every day", ar: "موظف بيستخدموا آخر نظام بنيته كل يوم" },
  "proof.3v": { en: "48", ar: "٤٨" },
  "proof.3l": { en: "Screens in that one system", ar: "شاشة في النظام ده لوحده" },
  "journey.label": { en: "Your company's journey with me", ar: "رحلة شركتك معايا" },
  "journey.title": { en: "From the first lead… to one system", ar: "من أول عميل… لحد نظام واحد" },
  "journey.station": { en: "Station", ar: "المحطة" },
  "journey.collected": { en: "Parts of the system built so far", ar: "أجزاء النظام اللي اتبنت لحد دلوقتي" },
  "journey.problem": { en: "The problem", ar: "المشكلة" },
  "journey.action": { en: "What I do", ar: "هعمل إيه" },
  "journey.gain": { en: "What you get", ar: "هتكسب إيه" },
  "journey.more": { en: "Service details", ar: "تفاصيل الخدمة" },
  "journey.hint": { en: "Scroll and I'll run", ar: "انزل وأنا هجري" },
  "journey.skip": { en: "Skip", ar: "تخطّى" },
  "journey.finish.label": { en: "Finish line", ar: "خط النهاية" },
  "journey.finish.title": { en: "All of it, in one system", ar: "كل ده… في نظام واحد" },
  "journey.finish.sub": { en: "You don't need every station at once. The free diagnosis shows which one comes first.", ar: "مش لازم تبدأ بكل المحطات مرة واحدة. التشخيص المجاني بيحدد تبدأ بأنهي محطة." },
  "services.ask": { en: "Ask about this system", ar: "اسأل عن النظام ده" },
  "services.askMsg": { en: "Hi Mohamed, I'd like to know more about:", ar: "أهلًا محمد، عايز أعرف أكتر عن:" },
  "work.label": { en: "Work", ar: "الأعمال" },
  "work.title": { en: "Real systems, with the numbers", ar: "أنظمة حقيقية، ومعاها الأرقام" },
  "work.sub": { en: "Systems I designed and built: what the problem was, what I built, and what changed.", ar: "أنظمة صممتها وبنيتها بنفسي: المشكلة كانت إيه، واتبنى إيه، وإيه اللي اتغير." },
  "work.featured": { en: "Featured", ar: "مشروع مميز" },
  "work.before": { en: "Before", ar: "قبل" },
  "work.built": { en: "What I built", ar: "اللي اتبنى" },
  "work.more": { en: "More systems", ar: "أنظمة تانية" },
  "work.shot": { en: "Screenshot from the system", ar: "صورة من النظام" },
  "why.label": { en: "Why me", ar: "ليه أنا" },
  "why.title": { en: "Not just a developer. I've worked inside companies: sales, marketing and operations.", ar: "مش مبرمج وخلاص. اشتغلت جوه الشركات: مبيعات وتسويق وتشغيل." },
  "why.body": { en: "5+ years in business development and marketing. I've lived the problem myself: endless sheets, manual follow-ups, decisions by guesswork. So I start from how your team actually works, then build the system around it.", ar: "أكتر من ٥ سنين في تطوير الأعمال والتسويق. عشت المشكلة بنفسي: شيتات مالهاش آخر، ومتابعة بالإيد، وقرارات بالتخمين. عشان كده ببدأ من طريقة شغل فريقك، وبعدين أبني النظام عليها." },
  "why.p1": { en: "I test the system on real work myself before I hand it over", ar: "بجرّب النظام بنفسي على شغل حقيقي قبل ما أسلّمه" },
  "why.p2": { en: "Team training and a written guide, so it keeps running without me", ar: "تدريب للفريق ودليل مكتوب، عشان النظام يفضل شغال من غيري" },
  "why.p3": { en: "Built with tools like n8n, OpenAI and Supabase, connected to what you already use", ar: "مبني بأدوات زي n8n وOpenAI وSupabase، ومربوط بالبرامج اللي عندك أصلًا" },
  "why.cv": { en: "Full experience & CV", ar: "الخبرة الكاملة والـCV" },
  "process.heading": { en: "From chaos to system", ar: "من الفوضى للنظام" },
  "products.label": { en: "Products", ar: "المنتجات" },
  "products.title": { en: "Tools I built from this work", ar: "أدوات بنيتها من الشغل ده" },
  "products.flowos": { en: "AI CRM and automation for any sales team: lead capture, scoring, follow-up and live dashboards.", ar: "CRM وأتمتة بالـAI لأي فريق مبيعات: استقبال العملاء، وتقييمهم، ومتابعتهم، وداشبورد مباشر." },
  "products.drivelead": { en: "An AI system built for car dealerships: from OLX & Facebook inquiry to delivery.", ar: "نظام بالـAI مخصوص لمعارض السيارات: من استفسار OLX وفيسبوك لحد التسليم." },
  "products.cta": { en: "Explore", ar: "اعرف أكتر" },
  "cta.mobileForm": { en: "Write your request", ar: "اكتب طلبك" },
  "footer.tagline": { en: "Business Intelligence and AI automation for companies that want to run on a system.", ar: "Business Intelligence وأتمتة بالـAI، للشركات اللي عايزة تشتغل بنظام." },
  "footer.explore": { en: "Explore", ar: "استكشف" },
  "footer.contact": { en: "Contact", ar: "تواصل" },
  "footer.location": { en: "Egypt & the Gulf", ar: "مصر والخليج" },
  "chips.title": { en: "What I build", ar: "اللي ببنيه" },
  "chips.1": { en: "BI dashboards", ar: "داشبورد وأرقام (BI)" },
  "chips.2": { en: "AI automation", ar: "أتمتة بالـAI" },
  "chips.3": { en: "CRM & lead follow-up", ar: "CRM ومتابعة عملاء" },
  "chips.4": { en: "Internal company systems", ar: "أنظمة تشغيل داخلية" },
  "marquee.label": { en: "Tools I build with", ar: "أدوات ببني بيها" },
  "why.yearsV": { en: "5+", ar: "+٥" },
  "why.yearsL": { en: "Years in BD & marketing", ar: "سنين في تطوير الأعمال والتسويق" },
  "hero.proof": { en: "Latest system I built: used every day by 21 people, with 48 screens.", ar: "آخر نظام بنيته: بيشتغل عليه ٢١ موظف كل يوم، وفيه ٤٨ شاشة." },
  "offer.label": { en: "First step", ar: "أول خطوة" },
  "offer.title": { en: "A free diagnosis of how your company works", ar: "تشخيص مجاني لشغل شركتك" },
  "offer.sub": { en: "Before we talk about any system, I look at how your work actually runs and tell you plainly where time and money are being lost.", ar: "قبل ما نتكلم في أي نظام، بشوف شغلك ماشي إزاي، وبقولك بصراحة فين الوقت والفلوس بيضيعوا." },
  "offer.s1.t": { en: "A 15-minute call", ar: "مكالمة ١٥ دقيقة" },
  "offer.s1.d": { en: "You tell me how work runs today and what's wearing your team out.", ar: "بتحكيلي الشغل ماشي إزاي النهارده، وإيه اللي مِتعب فريقك." },
  "offer.s2.t": { en: "I look at the work from the inside", ar: "بشوف الشغل من جوه" },
  "offer.s2.d": { en: "The sheets, the tools and the steps your team follows every day.", ar: "الشيتات والبرامج والخطوات اللي فريقك بيمشي عليها كل يوم." },
  "offer.s3.t": { en: "You get the diagnosis", ar: "بتستلم التشخيص" },
  "offer.s3.d": { en: "A map of your work, the 3 things that would save the most time and money once fixed, and what the system to fix them would look like and how long it would take.", ar: "خريطة لشغلك، وأهم ٣ حاجات لو اتحلّت هتوفّر وقت وفلوس، وشكل النظام اللي يحلّها ومدته." },
  "offer.free": { en: "Free", ar: "مجاني" },
  "offer.freeSub": { en: "No commitment, and the diagnosis is yours to keep.", ar: "من غير أي التزام، والتشخيص بتاعك تحتفظ بيه." },
  "offer.promise": { en: "If I don't find 3 things worth fixing, I'll tell you straight that you don't need a system yet.", ar: "لو مالقيتش ٣ حاجات تستاهل، هقولك بصراحة إنك مش محتاج نظام دلوقتي." },
  "offer.timeline": { en: "If you go ahead, the system is live in 2 weeks to 3 months, depending on its size.", ar: "لو كمّلنا، النظام بيبقى شغال خلال أسبوعين لـ٣ شهور، حسب حجمه." },
  "offer.direct": { en: "You deal with me directly, the person who builds the system.", ar: "بتتعامل معايا أنا مباشرةً، اللي ببني النظام بنفسي." },
  "offer.cta": { en: "Book the free diagnosis", ar: "احجز التشخيص المجاني" },
  "offer.msg": { en: "Hi Mohamed, I'd like to book the free diagnosis for my company.", ar: "أهلًا محمد، عايز أحجز التشخيص المجاني لشركتي." },
  "services.sub": { en: "Click any service to see the details: the problem, what gets built, what you receive, and examples.", ar: "دوس على أي خدمة وشوف التفاصيل: المشكلة، واللي هيتبني، وهتستلم إيه، وأمثلة." },
  "services.count": { en: "services", ar: "خدمات" },
  "process.sub": { en: "Five stages every system goes through, whatever its size.", ar: "٥ مراحل بيمشي عليها أي نظام، مهما كان حجمه." },
  "svc.all": { en: "All services", ar: "كل الخدمات" },
  "svc.problem": { en: "The problem", ar: "المشكلة" },
  "svc.build": { en: "What I build", ar: "اللي ببنيه" },
  "svc.deliverables": { en: "What you receive", ar: "هتستلم إيه" },
  "svc.useCases": { en: "Examples", ar: "أمثلة" },
  "svc.tools": { en: "Tools", ar: "الأدوات" },
  "svc.faq": { en: "Common questions", ar: "أسئلة بتتكرر" },
  "svc.ctaTitle": { en: "Not sure this is the right service? Start with the free diagnosis.", ar: "مش متأكد إن دي الخدمة المناسبة؟ ابدأ بالتشخيص المجاني." },
  "svc.related": { en: "Related services", ar: "خدمات قريبة" },
  "nav.whyMe": { en: "Why me", ar: "ليه أنا" },
  "nav.whyMeDesc": { en: "Background and how I work", ar: "الخلفية وطريقة الشغل" },
  "nav.processDesc": { en: "How a system gets built, step by step", ar: "النظام بيتبني إزاي، خطوة بخطوة" },
  "nav.cv": { en: "CV", ar: "الـCV" },
  "nav.cvDesc": { en: "Full experience, with a PDF download", ar: "الخبرة الكاملة، ومعاها ملف PDF" },
  "nav.flowosDesc": { en: "AI CRM and automation for any sales team", ar: "CRM وأتمتة بالـAI لأي فريق مبيعات" },
  "nav.driveleadDesc": { en: "AI system built for car dealerships", ar: "نظام بالـAI مخصوص لمعارض السيارات" },
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

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? "rtl" : "ltr";
  }, [lang, isAr]);

  return (
    <LanguageContext.Provider value={{ lang, isAr, toggle, t }}>
      <div dir={isAr ? "rtl" : "ltr"} className={isAr ? "font-arabic" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};
