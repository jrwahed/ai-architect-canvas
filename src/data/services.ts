import {
  Compass,
  GraduationCap,
  Target,
  MessageCircle,
  Send,
  Contact,
  Workflow,
  Network,
  MessagesSquare,
  UserSearch,
  FileScan,
  LayoutDashboard,
  Wrench,
  LucideIcon,
} from "lucide-react";

type L = { en: string; ar: string };

export type ServiceGroup = "strategy" | "sales" | "ops" | "data";

export interface Service {
  slug: string;
  group: ServiceGroup;
  icon: LucideIcon;
  title: L;
  short: L;
  problem: L;
  build: L[];
  deliverables: L[];
  timeline: L;
  tools: string[];
  useCases: L[];
  faq: { q: L; a: L }[];
  proof?: { label: L; to: string };
}

export const SERVICE_GROUPS: Record<ServiceGroup, L> = {
  strategy: { en: "Analysis & strategy", ar: "التحليل والاستراتيجية" },
  sales: { en: "Sales & customers", ar: "المبيعات والعملاء" },
  ops: { en: "Operations & automation", ar: "التشغيل والأتمتة" },
  data: { en: "Numbers & ongoing care", ar: "الأرقام والمتابعة" },
};

const DECIDED_IN_DIAGNOSIS: L = { en: "Set during the diagnosis", ar: "بتتحدد في التشخيص" };

export const SERVICES: Service[] = [
  /* ─── Analysis & strategy ─── */
  {
    slug: "strategy",
    group: "strategy",
    icon: Compass,
    title: { en: "Business analysis & AI strategy", ar: "تحليل الشركة واستراتيجية الـAI" },
    short: {
      en: "Your numbers, where you stand, and a clear plan for where AI and automation fit.",
      ar: "أرقامك، ووضعك فين، وخطة واضحة الـAI والأتمتة يدخلوا فين.",
    },
    problem: {
      en: "Everyone says \"use AI\", but nobody tells you where to start, what it's worth, or what to leave alone. So companies buy tools that don't get used, or wait and fall behind.",
      ar: "الكل بيقول \"استخدم AI\"، بس محدش بيقولك تبدأ منين، ولا هيفرق بكام، ولا إيه اللي تسيبه. فالشركات يا إما بتشتري أدوات محدش بيستخدمها، يا إما بتستنى وتتأخر.",
    },
    build: [
      { en: "An analysis of your numbers: sales, marketing, operations and team", ar: "تحليل أرقامك: المبيعات، والتسويق، والتشغيل، والفريق" },
      { en: "An assessment of where you stand today and where time and money are lost", ar: "تقييم لوضعك النهارده، وفين الوقت والفلوس بيضيعوا" },
      { en: "A vision for what the company should look like when it runs on a system", ar: "رؤية لشكل الشركة لما تشتغل بنظام" },
      { en: "A step-by-step plan for bringing in AI agents and automation, starting with what pays off first", ar: "خطة خطوة بخطوة لدخول الـAI agents والأتمتة، بتبدأ باللي بيجيب نتيجة الأول" },
    ],
    deliverables: [
      { en: "A written report of the current state, with numbers", ar: "تقرير مكتوب بالوضع الحالي، بالأرقام" },
      { en: "A list of opportunities ranked by impact and effort", ar: "قايمة فرص مترتبة حسب التأثير والمجهود" },
      { en: "A roadmap: what to build first, second and third", ar: "خريطة طريق: نبني إيه الأول والتاني والتالت" },
      { en: "A meeting to walk your management through it", ar: "اجتماع أشرح فيه الخطة للإدارة" },
    ],
    timeline: DECIDED_IN_DIAGNOSIS,
    tools: ["Google Sheets", "Looker Studio", "GA4", "AI Agents"],
    useCases: [
      { en: "A company that wants to use AI but doesn't know where to start", ar: "شركة عايزة تستخدم AI ومش عارفة تبدأ منين" },
      { en: "A manager who wants an outside view of the numbers before deciding", ar: "مدير عايز نظرة من برّه على الأرقام قبل ما ياخد قرار" },
      { en: "A team growing fast whose way of working no longer fits", ar: "فريق بيكبر بسرعة وطريقة الشغل مابقتش مناسبة" },
    ],
    faq: [
      {
        q: { en: "Do I have to build the system with you afterwards?", ar: "لازم أبني النظام معاك بعد كده؟" },
        a: { en: "No. The plan is useful on its own, and you decide what happens next.", ar: "لأ. الخطة مفيدة لوحدها، وإنت اللي بتقرر الخطوة الجاية." },
      },
      {
        q: { en: "What's the difference from the free diagnosis?", ar: "إيه الفرق بينها وبين التشخيص المجاني؟" },
        a: {
          en: "The diagnosis points out the 3 biggest problems. The strategy goes deeper: a full analysis of the numbers and a complete plan.",
          ar: "التشخيص بيطلّع أهم ٣ مشاكل. الاستراتيجية أعمق: تحليل كامل للأرقام وخطة كاملة.",
        },
      },
    ],
  },
  {
    slug: "ai-training",
    group: "strategy",
    icon: GraduationCap,
    title: { en: "AI training for your team", ar: "تدريب فريقك على الـAI" },
    short: {
      en: "Your team learns to use AI in its own daily work, not in theory.",
      ar: "فريقك يتعلم يستخدم الـAI في شغله اليومي، مش كلام نظري.",
    },
    problem: {
      en: "The team has heard of ChatGPT, but uses it randomly or not at all. The tools are there; the know-how isn't.",
      ar: "الفريق سمع عن ChatGPT، بس بيستخدمه بشكل عشوائي أو مش بيستخدمه خالص. الأدوات موجودة، بس مفيش حد عارف يستفيد منها.",
    },
    build: [
      { en: "Training built on your team's real tasks", ar: "تدريب مبني على مهام فريقك الحقيقية" },
      { en: "Ready-made prompts and templates for each role", ar: "أوامر (prompts) وقوالب جاهزة لكل دور" },
      { en: "Clear rules: what to use AI for and what not to", ar: "قواعد واضحة: نستخدم الـAI في إيه، ومانستخدموش في إيه" },
      { en: "Hands-on practice during the sessions", ar: "تطبيق عملي جوه الجلسات" },
    ],
    deliverables: [
      { en: "Training sessions for the team", ar: "جلسات تدريب للفريق" },
      { en: "A prompt library for your company", ar: "مكتبة prompts خاصة بشركتك" },
      { en: "A written guide the team can go back to", ar: "دليل مكتوب الفريق يرجعله" },
    ],
    timeline: DECIDED_IN_DIAGNOSIS,
    tools: ["OpenAI API", "AI Agents", "Google Sheets"],
    useCases: [
      { en: "Sales teams writing messages and follow-ups", ar: "فرق مبيعات بتكتب رسايل ومتابعات" },
      { en: "Marketing teams producing content", ar: "فرق تسويق بتعمل محتوى" },
      { en: "Managers preparing reports and summaries", ar: "مديرين بيجهزوا تقارير وملخصات" },
    ],
    faq: [
      {
        q: { en: "Does my team need a technical background?", ar: "فريقي محتاج يكون تقني؟" },
        a: { en: "No. The training is built for people who aren't technical.", ar: "لأ. التدريب معمول لناس مش تقنيين." },
      },
    ],
  },

  /* ─── Sales & customers ─── */
  {
    slug: "lead-system",
    group: "sales",
    icon: Target,
    title: { en: "Lead capture & follow-up", ar: "نظام جلب ومتابعة العملاء" },
    short: {
      en: "Every lead in one place, scored by AI, sent to the right person, followed up until it closes.",
      ar: "كل عميل في مكان واحد، بيتقيّم بالـAI، ويروح للشخص الصح، ويتتابع لحد ما يتقفل.",
    },
    problem: {
      en: "Leads come from ads, WhatsApp and the website and land in a sheet or someone's phone. Some wait days for a reply and buy from whoever answered first.",
      ar: "العملاء جايين من الإعلانات والواتساب والموقع، وبيقعوا في شيت أو على موبايل حد. في ناس بتستنى أيام لحد ما حد يرد، وبتشتري من اللي رد الأول.",
    },
    build: [
      { en: "Leads from every source land in one CRM automatically", ar: "العملاء من كل المصادر بيدخلوا CRM واحد أوتوماتيك" },
      { en: "AI scores each lead by how ready it is to buy", ar: "الـAI بيقيّم كل عميل حسب هو جاهز يشتري ولا لأ" },
      { en: "Automatic assignment to the right salesperson", ar: "توزيع أوتوماتيك على السيلز المناسب" },
      { en: "Reminders, and reassignment if nobody replies in time", ar: "تذكير، وتحويل لحد تاني لو محدش رد في وقته" },
    ],
    deliverables: [
      { en: "A working CRM with your sales stages", ar: "CRM شغال بمراحل البيع بتاعتك" },
      { en: "Automations for capture, scoring and follow-up", ar: "أتمتة للاستقبال والتقييم والمتابعة" },
      { en: "A dashboard for response time and conversions", ar: "داشبورد لوقت الرد والتحويل" },
      { en: "Team training and a written guide", ar: "تدريب للفريق ودليل مكتوب" },
    ],
    timeline: { en: "2–4 weeks", ar: "٢–٤ أسابيع" },
    tools: ["n8n", "OpenAI API", "WhatsApp", "HubSpot", "Zoho CRM", "Meta Ads", "Google Sheets"],
    useCases: [
      { en: "Real estate companies running ads", ar: "شركات عقارات بتشغّل إعلانات" },
      { en: "Car dealerships getting inquiries from OLX and Facebook", ar: "معارض عربيات جايلها استفسارات من OLX وفيسبوك" },
      { en: "Any sales team losing leads between people", ar: "أي فريق مبيعات العملاء بتضيع بين أفراده" },
    ],
    faq: [
      {
        q: { en: "Can it work with the CRM I already have?", ar: "ينفع يشتغل على الـCRM اللي عندي؟" },
        a: { en: "Usually yes. I connect to what you have, or set up a new one if needed.", ar: "غالبًا آه. بربط على اللي عندك، أو بركّب واحد جديد لو محتاج." },
      },
    ],
    proof: { label: { en: "See Sky Leads: replies in under 3 minutes", ar: "شوف Sky Leads: رد في أقل من ٣ دقايق" }, to: "/#work" },
  },
  {
    slug: "whatsapp-agent",
    group: "sales",
    icon: MessageCircle,
    title: { en: "AI WhatsApp agent", ar: "وكيل واتساب بالـAI" },
    short: {
      en: "Replies to your customers on WhatsApp in Arabic, qualifies them, books, and logs everything in the CRM.",
      ar: "بيرد على عملاءك في الواتساب بالعربي، ويقيّمهم، ويحجز، ويسجّل كل حاجة في الـCRM.",
    },
    problem: {
      en: "Your customers message you on WhatsApp at all hours. The team can't answer everyone quickly, the same questions repeat, and conversations get lost.",
      ar: "عملاءك بيكلموك على الواتساب في أي وقت. الفريق مش ملاحق يرد على الكل بسرعة، ونفس الأسئلة بتتكرر، ومحادثات بتضيع.",
    },
    build: [
      { en: "An agent that answers in Arabic (or English) from your own information", ar: "وكيل بيرد بالعربي (أو الإنجليزي) من معلوماتك إنت" },
      { en: "Questions to qualify the customer before handing over", ar: "أسئلة بتقيّم العميل قبل ما يتحوّل" },
      { en: "Booking appointments or visits", ar: "حجز مواعيد أو زيارات" },
      { en: "Handover to a person when needed, with the full conversation", ar: "تحويل لموظف لما يلزم، ومعاه المحادثة كلها" },
    ],
    deliverables: [
      { en: "A working agent on your WhatsApp number", ar: "وكيل شغال على رقم الواتساب بتاعك" },
      { en: "A connection to your CRM", ar: "ربط بالـCRM بتاعك" },
      { en: "A page to review conversations", ar: "مكان تراجع فيه المحادثات" },
      { en: "A guide for updating the agent's information", ar: "دليل لتحديث معلومات الوكيل" },
    ],
    timeline: DECIDED_IN_DIAGNOSIS,
    tools: ["WhatsApp", "n8n", "OpenAI API", "AI Agents", "RAG"],
    useCases: [
      { en: "Clinics and service businesses booking appointments", ar: "عيادات وخدمات بتحجز مواعيد" },
      { en: "Real estate and car dealers answering inquiries", ar: "عقارات ومعارض عربيات بترد على الاستفسارات" },
      { en: "Online stores answering order questions", ar: "متاجر أونلاين بترد على أسئلة الطلبات" },
    ],
    faq: [
      {
        q: { en: "What if the agent doesn't know the answer?", ar: "لو الوكيل مايعرفش الإجابة؟" },
        a: {
          en: "It answers only from the information you give it, and hands the conversation to a person when it isn't sure.",
          ar: "بيرد من المعلومات اللي إنت إدّيتهاله بس، ولو مش متأكد بيحوّل المحادثة لموظف.",
        },
      },
    ],
  },
  {
    slug: "ai-outreach",
    group: "sales",
    icon: Send,
    title: { en: "Reaching new customers with AI", ar: "الوصول لعملاء جدد بالـAI" },
    short: {
      en: "AI finds the right companies, researches them, and drafts a personal message for each one.",
      ar: "الـAI بيلاقي الشركات المناسبة، ويدرسها، ويكتب رسالة شخصية لكل واحدة.",
    },
    problem: {
      en: "You need new clients, but finding the right companies and writing to each one by hand takes forever, and generic messages get ignored.",
      ar: "محتاج عملاء جدد، بس إنك تدوّر على الشركات المناسبة وتكتب لكل واحدة بإيدك بياخد وقت كبير، والرسايل العامة محدش بيرد عليها.",
    },
    build: [
      { en: "A clear profile of your ideal client", ar: "تحديد واضح لعميلك المثالي" },
      { en: "AI that collects and enriches company data", ar: "AI بيجمع داتا الشركات ويكمّلها" },
      { en: "AI that checks each company's fit", ar: "AI بيشوف كل شركة مناسبة ولا لأ" },
      { en: "A personal message in your voice, reviewed before sending", ar: "رسالة شخصية بأسلوبك، وبتتراجع قبل ما تتبعت" },
    ],
    deliverables: [
      { en: "A working outreach pipeline", ar: "سلسلة تواصل شغالة" },
      { en: "A sheet or CRM with the target companies", ar: "شيت أو CRM فيه الشركات المستهدفة" },
      { en: "Follow-up templates", ar: "قوالب للمتابعة" },
      { en: "A guide to run it yourself", ar: "دليل تشغّلها بيه بنفسك" },
    ],
    timeline: DECIDED_IN_DIAGNOSIS,
    tools: ["n8n", "OpenAI API", "AI Agents", "Google Sheets"],
    useCases: [
      { en: "B2B companies selling to other companies", ar: "شركات بتبيع لشركات (B2B)" },
      { en: "Agencies and consultants looking for clients", ar: "وكالات واستشاريين بيدوّروا على عملاء" },
      { en: "A founder selling on their own without a team", ar: "صاحب شركة بيبيع لوحده من غير فريق" },
    ],
    faq: [
      {
        q: { en: "Are the messages sent automatically?", ar: "الرسايل بتتبعت لوحدها؟" },
        a: { en: "I build it so every message is reviewed before it goes out.", ar: "ببنيه بحيث كل رسالة تتراجع قبل ما تتبعت." },
      },
    ],
    proof: { label: { en: "See AI Outreach: 20 personal messages an hour", ar: "شوف AI Outreach: ٢٠ رسالة شخصية في الساعة" }, to: "/#work" },
  },
  {
    slug: "crm-setup",
    group: "sales",
    icon: Contact,
    title: { en: "Ready-made CRM setup", ar: "تركيب CRM جاهز" },
    short: {
      en: "Zoho, HubSpot or Odoo, set up around how your team actually sells.",
      ar: "Zoho أو HubSpot أو Odoo، متظبط على طريقة بيع فريقك.",
    },
    problem: {
      en: "You bought a CRM, but nobody uses it properly: the stages don't match reality, the data is incomplete, and the team went back to sheets.",
      ar: "اشتريت CRM، بس محدش بيستخدمه صح: المراحل مش شبه الواقع، والداتا ناقصة، والفريق رجع للشيتات.",
    },
    build: [
      { en: "Choosing the right CRM for your size and budget", ar: "اختيار الـCRM المناسب لحجمك وميزانيتك" },
      { en: "Sales stages and fields that match your process", ar: "مراحل بيع وخانات شبه شغلك" },
      { en: "Moving your old data in", ar: "نقل الداتا القديمة" },
      { en: "Connecting it to WhatsApp, email and your ads", ar: "ربطه بالواتساب والإيميل والإعلانات" },
    ],
    deliverables: [
      { en: "A CRM ready to use", ar: "CRM جاهز للاستخدام" },
      { en: "Your data moved and cleaned", ar: "الداتا متنقلة ومتنضفة" },
      { en: "Team training", ar: "تدريب للفريق" },
      { en: "A written guide", ar: "دليل مكتوب" },
    ],
    timeline: DECIDED_IN_DIAGNOSIS,
    tools: ["Zoho CRM", "HubSpot", "WhatsApp", "Make", "Zapier"],
    useCases: [
      { en: "A company moving from sheets to a CRM for the first time", ar: "شركة بتنقل من الشيتات لـCRM لأول مرة" },
      { en: "A CRM that exists but nobody uses", ar: "CRM موجود ومحدش بيستخدمه" },
      { en: "Moving from one CRM to another", ar: "نقل من CRM لـCRM تاني" },
    ],
    faq: [
      {
        q: { en: "Ready-made CRM or a custom system?", ar: "CRM جاهز ولا نظام مخصوص؟" },
        a: {
          en: "It depends on your work. In the diagnosis I'll tell you which fits you better.",
          ar: "حسب شغلك. في التشخيص بقولك أنهي فيهم أنسب ليك.",
        },
      },
    ],
  },

  /* ─── Operations & automation ─── */
  {
    slug: "automation",
    group: "ops",
    icon: Workflow,
    title: { en: "Automating repetitive work", ar: "أتمتة الشغل المتكرر" },
    short: {
      en: "Messages, reports and moving data between tools, done on their own.",
      ar: "الرسايل والتقارير ونقل الداتا بين البرامج، بتتعمل لوحدها.",
    },
    problem: {
      en: "Your team spends hours every week on the same tasks: copying data, writing the same reports, sending the same messages. Things get missed.",
      ar: "فريقك بيقضي ساعات كل أسبوع في نفس المهام: نقل داتا، ونفس التقارير، ونفس الرسايل. وحاجات بتقع.",
    },
    build: [
      { en: "A list of the repetitive tasks, biggest first", ar: "حصر المهام المتكررة، والأكبر الأول" },
      { en: "Workflows that run on their own, 24/7", ar: "Workflows بتشتغل لوحدها ٢٤ ساعة" },
      { en: "Connecting the CRM, email, WhatsApp and sheets", ar: "ربط الـCRM والإيميل والواتساب والشيتات" },
      { en: "AI where judgment or writing is needed", ar: "AI في الأماكن اللي محتاجة تفكير أو كتابة" },
    ],
    deliverables: [
      { en: "A map of the work and where time is wasted", ar: "خريطة للشغل وفين الوقت بيضيع" },
      { en: "Working automations", ar: "أتمتة شغالة" },
      { en: "Automatic reports", ar: "تقارير أوتوماتيك" },
      { en: "Team training and a guide", ar: "تدريب للفريق ودليل" },
    ],
    timeline: { en: "3–6 weeks", ar: "٣–٦ أسابيع" },
    tools: ["n8n", "Make", "Zapier", "OpenAI API", "Google Sheets", "WhatsApp"],
    useCases: [
      { en: "Daily and weekly reports built automatically", ar: "تقارير يومية وأسبوعية بتتعمل لوحدها" },
      { en: "Moving orders and leads between tools", ar: "نقل الطلبات والعملاء بين البرامج" },
      { en: "Content production with AI", ar: "إنتاج محتوى بالـAI" },
    ],
    faq: [
      {
        q: { en: "What if something breaks?", ar: "لو حاجة وقفت؟" },
        a: {
          en: "You get a guide for the common issues, and there's a monthly care option if you want me to keep watching it.",
          ar: "بتستلم دليل للمشاكل المعروفة، وفي خدمة صيانة شهرية لو عايزني أفضل متابعه.",
        },
      },
    ],
    proof: { label: { en: "See the content system: 3x faster", ar: "شوف نظام المحتوى: أسرع ٣ مرات" }, to: "/#work" },
  },
  {
    slug: "company-os",
    group: "ops",
    icon: Network,
    title: { en: "An operating system for your company", ar: "نظام تشغيل لشركتك" },
    short: {
      en: "An internal app for tasks, daily reports, reviews, performance and HR, built around your company.",
      ar: "برنامج داخلي للمهام والتقارير اليومية والمراجعة والأداء والـHR، على مقاس شركتك.",
    },
    problem: {
      en: "Every team works on its own sheet and WhatsApp group. The manager keeps asking \"where are we?\", and nobody has a clear answer.",
      ar: "كل قسم شغال على شيت وجروب واتساب لوحده. والمدير بيفضل يسأل \"وصلنا لفين؟\"، ومحدش عنده إجابة واضحة.",
    },
    build: [
      { en: "Tasks with stages, reviews and automatic escalation", ar: "مهام بمراحل ومراجعة وتصعيد أوتوماتيك" },
      { en: "A daily report for each employee, and team tracking", ar: "تقرير يومي لكل موظف، ومتابعة للفريق" },
      { en: "Performance measured by a clear formula", ar: "أداء بيتقاس بمعادلة واضحة" },
      { en: "HR, forms and files in one place", ar: "HR ونماذج وملفات في مكان واحد" },
    ],
    deliverables: [
      { en: "A web app that works on phone and desktop", ar: "برنامج بيشتغل على الموبايل والكمبيوتر" },
      { en: "Permissions for each role", ar: "صلاحيات لكل دور" },
      { en: "Dashboards for management", ar: "داشبورد للإدارة" },
      { en: "Training and a written guide", ar: "تدريب ودليل مكتوب" },
    ],
    timeline: { en: "4–6 weeks", ar: "٤–٦ أسابيع" },
    tools: ["React", "Supabase", "AI Agents", "RAG", "Google Drive"],
    useCases: [
      { en: "Marketing agencies with many clients", ar: "وكالات تسويق عندها عملاء كتير" },
      { en: "Companies whose teams work across several departments", ar: "شركات فرقها شغالة بين أقسام كتير" },
      { en: "Managers who want to see everything without asking", ar: "مديرين عايزين يشوفوا كل حاجة من غير ما يسألوا" },
    ],
    faq: [
      {
        q: { en: "Why not use a ready-made tool?", ar: "ليه مش أداة جاهزة؟" },
        a: {
          en: "Sometimes a ready-made tool is enough, and I'll tell you if it is. A custom system makes sense when your work has its own steps and rules.",
          ar: "ساعات الأداة الجاهزة بتكفي، وهقولك لو كده. النظام المخصوص بيفرق لما شغلك ليه خطوات وقواعد خاصة بيه.",
        },
      },
    ],
    proof: { label: { en: "See the agency system: 21 people, 48 screens", ar: "شوف نظام الوكالة: ٢١ موظف و٤٨ شاشة" }, to: "/work/agency-os" },
  },
  {
    slug: "company-assistant",
    group: "ops",
    icon: MessagesSquare,
    title: { en: "Smart company assistant", ar: "مساعد الشركة الذكي" },
    short: {
      en: "An AI that answers your team's questions from your company's own files and approved replies only.",
      ar: "AI بيجاوب على أسئلة فريقك من ملفات شركتك وردودها المعتمدة بس.",
    },
    problem: {
      en: "The information is scattered across Drive, chats and people's heads. Every new question means interrupting someone, and answers differ from person to person.",
      ar: "المعلومات متفرقة بين درايف والمحادثات ودماغ الناس. كل سؤال جديد معناه إنك توقّف حد عن شغله، والإجابة بتختلف من شخص للتاني.",
    },
    build: [
      { en: "Collecting and organising your company's files", ar: "تجميع وترتيب ملفات الشركة" },
      { en: "An assistant that answers only from those files", ar: "مساعد بيجاوب من الملفات دي بس" },
      { en: "Approved replies copied word for word, without AI rewriting them", ar: "ردود معتمدة بتتنسخ زي ما هي، من غير ما الـAI يغيّرها" },
      { en: "Permissions: each person sees only what they're allowed to", ar: "صلاحيات: كل واحد يشوف اللي مسموحله بس" },
    ],
    deliverables: [
      { en: "A working assistant for the team", ar: "مساعد شغال للفريق" },
      { en: "An organised knowledge base", ar: "قاعدة معرفة مترتبة" },
      { en: "A way to add new files and replies", ar: "طريقة لإضافة ملفات وردود جديدة" },
      { en: "A guide", ar: "دليل" },
    ],
    timeline: DECIDED_IN_DIAGNOSIS,
    tools: ["RAG", "AI Agents", "Supabase", "Google Drive"],
    useCases: [
      { en: "Account managers answering about any client", ar: "مديري حسابات بيجاوبوا عن أي عميل" },
      { en: "Onboarding new employees", ar: "تعريف الموظفين الجداد بالشغل" },
      { en: "Support teams using the same approved replies", ar: "فرق دعم بتستخدم نفس الردود المعتمدة" },
    ],
    faq: [
      {
        q: { en: "Can it make up an answer?", ar: "ممكن يألّف إجابة؟" },
        a: {
          en: "I build it to answer only from your files, and to say so when the information isn't there.",
          ar: "ببنيه يجاوب من ملفاتك بس، ولو المعلومة مش موجودة يقول كده.",
        },
      },
    ],
    proof: { label: { en: "See the assistant inside the agency system", ar: "شوف المساعد جوه نظام الوكالة" }, to: "/work/agency-os" },
  },
  {
    slug: "ai-hiring",
    group: "ops",
    icon: UserSearch,
    title: { en: "AI hiring system", ar: "نظام توظيف بالـAI" },
    short: {
      en: "AI reads CVs, scores them against a clear model, and schedules interviews.",
      ar: "الـAI بيقرا الـCVs، ويقيّمها بنموذج واضح، ويرتّب المقابلات.",
    },
    problem: {
      en: "Hiring depends on personal impressions, CVs pile up, and it takes too long to find the right person.",
      ar: "التوظيف معتمد على الانطباع الشخصي، والـCVs بتتكوّم، وبياخد وقت طويل لحد ما تلاقي الشخص الصح.",
    },
    build: [
      { en: "A clear evaluation model for each role", ar: "نموذج تقييم واضح لكل وظيفة" },
      { en: "AI that reads CVs and scores them against the model", ar: "AI بيقرا الـCVs ويقيّمها على النموذج" },
      { en: "A unified interview template", ar: "نموذج مقابلة موحّد" },
      { en: "Automatic interview scheduling", ar: "ترتيب المقابلات أوتوماتيك" },
    ],
    deliverables: [
      { en: "A working hiring pipeline", ar: "سلسلة توظيف شغالة" },
      { en: "Evaluation models for your roles", ar: "نماذج تقييم لوظايفك" },
      { en: "A candidates dashboard", ar: "داشبورد للمرشحين" },
      { en: "A guide for HR", ar: "دليل للـHR" },
    ],
    timeline: DECIDED_IN_DIAGNOSIS,
    tools: ["n8n", "OpenAI API", "AI Agents", "Google Sheets"],
    useCases: [
      { en: "Companies hiring often", ar: "شركات بتوظّف كتير" },
      { en: "Sales and customer service roles with many applicants", ar: "وظايف مبيعات وخدمة عملاء عليها متقدمين كتير" },
      { en: "HR teams wanting a fairer, clearer process", ar: "فرق HR عايزة طريقة أعدل وأوضح" },
    ],
    faq: [
      {
        q: { en: "Does the AI make the hiring decision?", ar: "الـAI هو اللي بيقرر مين يتعيّن؟" },
        a: { en: "No. It sorts and scores; the decision stays with your team.", ar: "لأ. هو بيرتّب ويقيّم، والقرار بيفضل عند فريقك." },
      },
    ],
    proof: { label: { en: "See the hiring system: from 7 days to 24 hours", ar: "شوف نظام التوظيف: من ٧ أيام لـ٢٤ ساعة" }, to: "/#work" },
  },
  {
    slug: "documents",
    group: "ops",
    icon: FileScan,
    title: { en: "Reading invoices and documents", ar: "قراءة الفواتير والمستندات" },
    short: {
      en: "AI reads invoices, contracts and forms, pulls out the data, and puts it where it belongs.",
      ar: "الـAI بيقرا الفواتير والعقود والنماذج، ويطلّع منها الداتا، ويحطها في مكانها.",
    },
    problem: {
      en: "Someone on your team types invoice and document data in by hand. It's slow, and mistakes happen.",
      ar: "في حد في فريقك بيكتب داتا الفواتير والمستندات بإيده. ده بطيء، والغلط وارد.",
    },
    build: [
      { en: "Receiving documents from email, WhatsApp or a folder", ar: "استقبال المستندات من الإيميل أو الواتساب أو فولدر" },
      { en: "AI that reads them and extracts the fields you need", ar: "AI بيقراها ويطلّع الخانات اللي محتاجها" },
      { en: "Review of anything the AI isn't sure about", ar: "مراجعة لأي حاجة الـAI مش متأكد منها" },
      { en: "Sending the data to your sheets or system", ar: "إرسال الداتا للشيت أو النظام بتاعك" },
    ],
    deliverables: [
      { en: "A working document pipeline", ar: "سلسلة شغالة للمستندات" },
      { en: "A review screen", ar: "شاشة مراجعة" },
      { en: "A connection to your sheets or accounting", ar: "ربط بالشيتات أو الحسابات" },
      { en: "A guide", ar: "دليل" },
    ],
    timeline: DECIDED_IN_DIAGNOSIS,
    tools: ["n8n", "OpenAI API", "AI Agents", "Google Sheets"],
    useCases: [
      { en: "Supplier invoices", ar: "فواتير الموردين" },
      { en: "Contracts and forms", ar: "العقود والنماذج" },
      { en: "Receipts and expense claims", ar: "الإيصالات وطلبات المصروفات" },
    ],
    faq: [
      {
        q: { en: "Does it read Arabic?", ar: "بيقرا عربي؟" },
        a: {
          en: "Yes, in most cases. It depends on the quality of the document, and we test on your real documents first.",
          ar: "آه، في أغلب الحالات. بيعتمد على جودة المستند، وبنجرّب على مستنداتك الحقيقية الأول.",
        },
      },
    ],
  },

  /* ─── Numbers & ongoing care ─── */
  {
    slug: "bi-dashboard",
    group: "data",
    icon: LayoutDashboard,
    title: { en: "Business Intelligence dashboard", ar: "داشبورد Business Intelligence" },
    short: {
      en: "All your numbers in one dashboard that updates itself.",
      ar: "كل أرقامك في داشبورد واحد بيتحدّث لوحده.",
    },
    problem: {
      en: "The numbers are spread across ads, the CRM, sheets and accounting. Decisions are made by gut feeling, and nobody knows for sure what's making money.",
      ar: "الأرقام متفرقة بين الإعلانات والـCRM والشيتات والحسابات. والقرارات بتتاخد بالتخمين، ومحدش عارف بالظبط إيه اللي بيكسّب.",
    },
    build: [
      { en: "Connecting all your data sources", ar: "ربط كل مصادر الداتا" },
      { en: "Clear KPIs we agree on together", ar: "مؤشرات واضحة (KPIs) بنتفق عليها سوا" },
      { en: "A dashboard that updates itself", ar: "داشبورد بيتحدّث لوحده" },
      { en: "An automatic daily or weekly report", ar: "تقرير أوتوماتيك يومي أو أسبوعي" },
    ],
    deliverables: [
      { en: "A live dashboard", ar: "داشبورد لايف" },
      { en: "Definitions for every number", ar: "تعريف لكل رقم" },
      { en: "Automatic reports", ar: "تقارير أوتوماتيك" },
      { en: "Training for management on reading it", ar: "تدريب للإدارة على قرايته" },
    ],
    timeline: { en: "2–4 weeks", ar: "٢–٤ أسابيع" },
    tools: ["Looker Studio", "Google Sheets", "GA4", "Meta Ads", "Google Ads", "n8n"],
    useCases: [
      { en: "Which campaign actually brings in money", ar: "أنهي حملة بتجيب فلوس فعلًا" },
      { en: "Each salesperson's and each team's performance", ar: "أداء كل سيلز وكل فريق" },
      { en: "Cash flow and invoices at a glance", ar: "الفلوس الداخلة والخارجة والفواتير في نظرة واحدة" },
    ],
    faq: [
      {
        q: { en: "Where does the data come from?", ar: "الداتا بتيجي منين؟" },
        a: {
          en: "From the tools you already use. I connect them so nobody has to type numbers in by hand.",
          ar: "من البرامج اللي بتستخدمها أصلًا. بربطها ببعض عشان محدش يكتب أرقام بإيده.",
        },
      },
    ],
    proof: { label: { en: "See the financial dashboard", ar: "شوف الداشبورد المالي" }, to: "/#work" },
  },
  {
    slug: "care",
    group: "data",
    icon: Wrench,
    title: { en: "Monthly care & improvement", ar: "صيانة وتطوير شهري" },
    short: {
      en: "After launch, I keep watching the system, fixing issues and adding improvements.",
      ar: "بعد التسليم، بفضل متابع النظام، وبصلّح، وبضيف تحسينات.",
    },
    problem: {
      en: "Systems need looking after: tools update, the business changes, and new ideas come up. Without follow-up, a good system slowly stops being used.",
      ar: "أي نظام محتاج حد يتابعه: البرامج بتتحدّث، والشغل بيتغير، وأفكار جديدة بتطلع. ومن غير متابعة، النظام الكويس بيبطّل يتستخدم واحدة واحدة.",
    },
    build: [
      { en: "Monitoring that the automations are running", ar: "متابعة إن الأتمتة شغالة" },
      { en: "Fixing any issue that comes up", ar: "تصليح أي مشكلة تظهر" },
      { en: "Monthly improvements based on the numbers", ar: "تحسينات كل شهر على حسب الأرقام" },
      { en: "A monthly review with you", ar: "مراجعة شهرية معاك" },
    ],
    deliverables: [
      { en: "A monthly report of what was done", ar: "تقرير شهري باللي اتعمل" },
      { en: "Fixes and updates", ar: "تصليحات وتحديثات" },
      { en: "Agreed improvements", ar: "تحسينات متفق عليها" },
    ],
    timeline: { en: "Monthly", ar: "شهري" },
    tools: ["n8n", "OpenAI API", "Looker Studio"],
    useCases: [
      { en: "After any system I've built", ar: "بعد أي نظام بنيته" },
      { en: "Companies without an in-house technical team", ar: "شركات مالهاش فريق تقني جوّه" },
    ],
    faq: [
      {
        q: { en: "Is it required?", ar: "هي إجبارية؟" },
        a: {
          en: "No. Every system comes with a guide so you can run it yourself; care is an option if you want it.",
          ar: "لأ. كل نظام بييجي معاه دليل عشان تشغّله بنفسك، والصيانة اختيار لو حابب.",
        },
      },
    ],
  },
];

export const serviceBySlug = (slug?: string) => SERVICES.find((s) => s.slug === slug);
