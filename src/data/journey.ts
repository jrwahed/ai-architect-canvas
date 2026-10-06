import {
  Compass,
  Send,
  Megaphone,
  Target,
  Contact,
  MessageCircle,
  Network,
  Workflow,
  MessagesSquare,
  UserSearch,
  FileScan,
  LayoutDashboard,
  GraduationCap,
  Wrench,
  LucideIcon,
} from "lucide-react";

// The home page story ("how does every part of your company get smart?"), one station per part.
// The owner wants it shown in Arabic whatever the site language, so only `ar` is rendered on the
// home page; `en` is kept for the reduced-motion list and future use.
// Numbers are only the measured ones from the agency operating system (September 2026); no client
// names, no estimates.
type L = { en: string; ar: string };

export interface JourneyStation {
  key: string;
  icon: LucideIcon;
  dept: L;
  /** The chapter: what I do in this part of the company, told in the first person. */
  story: L;
  /** The steps of a framework, shown as a chain of chips. */
  steps?: L[];
  /** A real system I built that proves it. */
  proof?: L;
  gain: L;
  /** Service page slug in src/data/services.ts, when there is one. */
  slug?: string;
}

export const JOURNEY: JourneyStation[] = [
  {
    key: "diagnosis",
    icon: Compass,
    slug: "strategy",
    dept: { en: "Diagnosis", ar: "التشخيص: قبل أي حاجة، بقعد وأتفرج" },
    story: {
      en: "The first week I don't build anything. I watch how the work really runs, and pick the 3 things wasting the most time and money.",
      ar: "أول أسبوع مش ببني. بشوف الشغل ماشي إزاي على الطبيعة، وبطلّع أهم ٣ حاجات بتضيّع وقت وفلوس.",
    },
    gain: {
      en: "A clear map of where to start. If you don't need a system, I'll tell you.",
      ar: "خريطة واضحة نبدأ منين. ولو مش محتاج نظام، هقولك.",
    },
  },
  {
    key: "outreach",
    icon: Send,
    slug: "ai-outreach",
    dept: { en: "Getting customers: the framework (human + AI)", ar: "جلب العملاء: الفريم ورك (بني آدم + AI)" },
    story: {
      en: "We don't wait for customers to show up. We go to them with a 7-step system. AI does the collecting, the analysis and the writing; you review every message before it goes out.",
      ar: "مش بنستنى العميل ييجي. بنروح له بنظام من ٧ خطوات. الـAI بيعمل الجمع والتحليل والكتابة، وإنت بتراجع كل رسالة قبل ما تتبعت.",
    },
    steps: [
      { en: "Pick the sectors", ar: "تحديد القطاعات" },
      { en: "Extract companies", ar: "استخراج الشركات" },
      { en: "Smart analysis", ar: "تحليل ذكي لمين مناسب" },
      { en: "Pick the decision-maker", ar: "اختيار صاحب القرار" },
      { en: "A personal message", ar: "رسالة مخصصة بصوتك" },
      { en: "Follow-up", ar: "متابعة" },
      { en: "Call", ar: "مكالمة" },
    ],
    proof: {
      en: "AI Outreach: I built it and run it for myself, with no team and no ad budget.",
      ar: "AI Outreach: بنيته وشغّلته لنفسي من غير فريق ولا ميزانية إعلانات.",
    },
    gain: { en: "A door open to new customers every week.", ar: "باب مفتوح لعملاء جداد كل أسبوع." },
  },
  {
    key: "ads",
    icon: Megaphone,
    dept: { en: "Ads: from the ad to the sale", ar: "الإعلانات: من الإعلان للبيع" },
    story: {
      en: "I run the ads myself and connect every campaign to the system from the first click, so you know where every customer came from.",
      ar: "بشغّل الإعلانات بنفسي، وبربط كل حملة بالنظام من أول ضغطة، فتعرف كل عميل جه منين.",
    },
    gain: { en: "The budget goes to the campaign that actually sells.", ar: "الفلوس تروح للحملة اللي بتبيع فعلًا." },
  },
  {
    key: "leads",
    icon: Target,
    slug: "lead-system",
    dept: { en: "Receiving leads: no lead gets lost", ar: "استقبال الليدز: ولا عميل بيضيع" },
    story: {
      en: "Every lead, from Facebook, WhatsApp, the website or messages, is captured instantly in one place, sorted by how ready it is to buy, sent to the right salesperson, and moved to someone else automatically if nobody replies.",
      ar: "كل عميل، من فيسبوك أو واتساب أو الموقع أو الرسايل، بيتسجّل فورًا في مكان واحد، وبيتصنّف حسب جاهزيته للشراء، وبيروح للسيلز المناسب، ولو محدش رد عليه بيتحوّل لحد تاني أوتوماتيك.",
    },
    proof: {
      en: "Sky Leads, for a real estate company, instead of a spreadsheet where a lead could wait for days.",
      ar: "Sky Leads لشركة عقارات، بدل شيت كان العميل بيستنى فيه أيام.",
    },
    gain: { en: "Every lead has an owner and a follow-up.", ar: "كل عميل ليه مسؤول ومتابعة." },
  },
  {
    key: "sales",
    icon: Contact,
    slug: "crm-setup",
    dept: { en: "Sales: where every deal stands", ar: "المبيعات: كل صفقة واقفة فين" },
    story: {
      en: "A CRM around how you already sell: clear stages, follow-up reminders, and a report that tells the manager where the deals stand and who owns the next step.",
      ar: "CRM على مقاس طريقة بيعكم: مراحل واضحة، وتذكير بالمتابعة، وتقرير للمدير بيقوله الصفقات واقفة فين ومين عليه الخطوة الجاية.",
    },
    gain: { en: "Follow-ups that don't get forgotten.", ar: "متابعة مابتتنسيش." },
  },
  {
    key: "service",
    icon: MessageCircle,
    slug: "whatsapp-agent",
    dept: { en: "Customer service: an answer on time, from your own information", ar: "خدمة العملاء: رد في وقته، ومن معلوماتك إنت بس" },
    story: {
      en: "A WhatsApp agent answers the repeated questions from the company's files. The important questions have approved replies, written once and sent word for word with no AI, and it hands over when a person is needed.",
      ar: "وكيل واتساب بيرد على الأسئلة المتكررة من ملفات الشركة، والأسئلة المهمة ليها ردود معتمدة بتتكتب مرة وبتتبعت حرف بحرف من غير AI، ولما الموضوع يحتاج بني آدم بيحوّل.",
    },
    proof: {
      en: "In the agency operating system: 35 clients with a knowledge base and 76 approved replies.",
      ar: "في نظام الوكالة: ٣٥ عميل ليهم قاعدة معرفة، و٧٦ رد معتمد.",
    },
    gain: { en: "The customer gets the right answer on time.", ar: "العميل بياخد رد صح في وقته." },
  },
  {
    key: "ops",
    icon: Network,
    slug: "company-os",
    dept: { en: "Operations: the manager knows without a meeting", ar: "التشغيل: المدير يعرف من غير اجتماع" },
    story: {
      en: "An operating system: every task goes through review stages, every employee writes a daily report, and anything late escalates on its own.",
      ar: "نظام تشغيل: كل مهمة بتعدّي على مراحل مراجعة، وكل موظف بيكتب تقرير يومي، ولو حاجة اتأخرت بتتصعّد لوحدها.",
    },
    proof: {
      en: "A full operating system for a marketing agency in Egypt, built by me alone and used every day: 21 employees, 65 clients, 48 screens and 13 automations (September 2026).",
      ar: "نظام تشغيل كامل لوكالة تسويق في مصر، بنيته لوحدي، وشغال كل يوم: ٢١ موظف، و٦٥ عميل، و٤٨ شاشة، و١٣ مهمة أوتوماتيك (أرقام سبتمبر ٢٠٢٦).",
    },
    gain: { en: "You know who did what without asking.", ar: "تعرف مين عمل إيه من غير ما تسأل." },
  },
  {
    key: "automation",
    icon: Workflow,
    slug: "automation",
    dept: { en: "Repetitive work: it runs on its own", ar: "الشغل المتكرر: يمشي لوحده" },
    story: {
      en: "I connect your tools to each other: data moves by itself, reports write themselves, and content has a fixed cycle.",
      ar: "بربط أدواتك ببعض: الداتا تتنقل لوحدها، والتقارير تتكتب لوحدها، والمحتوى ليه دورة ثابتة.",
    },
    proof: {
      en: "A content machine for a marketing team: a fixed brand voice, a weekly production cycle, and 3 AI helpers for strategy, copy and design.",
      ar: "ماكينة محتوى لفريق تسويق: صوت ثابت للبراند، ودورة إنتاج أسبوعية، و٣ مساعدين AI للاستراتيجية والكتابة والتصميم.",
    },
    gain: { en: "The team's time goes to work that needs thinking.", ar: "وقت الفريق للشغل اللي محتاج تفكير." },
  },
  {
    key: "knowledge",
    icon: MessagesSquare,
    slug: "company-assistant",
    dept: { en: "Company knowledge: the answer isn't in one person's head", ar: "معلومات الشركة: الإجابة مش في دماغ شخص واحد" },
    story: {
      en: "An internal assistant that answers the team only from the company's files, and ready forms for every repeated request.",
      ar: "مساعد داخلي بيجاوب الفريق من ملفات الشركة بس، ونماذج جاهزة لكل طلب متكرر.",
    },
    proof: {
      en: "In the agency operating system: 13 forms, and every client's files organised on Drive and linked to the system.",
      ar: "في نظام الوكالة: ١٣ نموذج، وملفات كل عميل متنظمة على درايف ومربوطة بالنظام.",
    },
    gain: { en: "Anyone finds the answer on their own.", ar: "أي حد يلاقي الإجابة لوحده." },
  },
  {
    key: "people",
    icon: UserSearch,
    slug: "ai-hiring",
    dept: { en: "People: by criteria, not by mood", ar: "الموارد البشرية: بمعايير، مش بالمزاج" },
    story: {
      en: "Hiring with a skills matrix that AI screens against. Performance is scored with a fixed formula everyone understands, not by AI.",
      ar: "التوظيف بمصفوفة مهارات والـAI بيفرز عليها. والأداء بيتحسب بمعادلة ثابتة الكل فاهمها، مش بالـAI.",
    },
    proof: {
      en: "A hiring system with one interview template and automatic scheduling, and a performance formula with fixed weights in the agency operating system.",
      ar: "نظام توظيف بنموذج مقابلة موحد وترتيب مقابلات أوتوماتيك. ومعادلة أداء بأوزان ثابتة في نظام الوكالة.",
    },
    gain: { en: "Faster hiring, and fair reviews.", ar: "توظيف أسرع، وتقييم عادل." },
  },
  {
    key: "finance",
    icon: FileScan,
    slug: "documents",
    dept: { en: "Finance & documents: no manual entry", ar: "الحسابات والمستندات: من غير إدخال بالإيد" },
    story: {
      en: "AI reads the invoice or document and puts the data where it belongs, and you review it.",
      ar: "الـAI بيقرا الفاتورة أو المستند ويحط البيانات في مكانها، وإنت بتراجع.",
    },
    proof: {
      en: "A financial dashboard for management: the data is pulled and sorted automatically and shows up live.",
      ar: "داشبورد مالي للإدارة: الداتا بتتطلّع وتتصنّف أوتوماتيك وبتظهر لحظة بلحظة.",
    },
    gain: { en: "Tidy books.", ar: "حسابات مترتبة." },
  },
  {
    key: "numbers",
    icon: LayoutDashboard,
    slug: "bi-dashboard",
    dept: { en: "Numbers & decisions: one dashboard", ar: "الأرقام والقرار: داشبورد واحد" },
    story: {
      en: "Ads, sales, operations and finance numbers in one place.",
      ar: "أرقام الإعلانات والمبيعات والتشغيل والحسابات في مكان واحد.",
    },
    gain: { en: "You know which campaign, rep and client actually make money.", ar: "تعرف أنهي حملة وموظف وعميل بيكسّب فعلًا." },
  },
  {
    key: "training",
    icon: GraduationCap,
    slug: "ai-training",
    dept: { en: "Team training", ar: "تدريب الفريق" },
    story: {
      en: "I train the team on the system and on AI using their real work, with a written guide.",
      ar: "بدرّب الفريق على النظام والـAI على شغلهم الحقيقي، ومعاهم دليل مكتوب.",
    },
    gain: { en: "A team that runs the system on its own.", ar: "فريق بيشغّل النظام لوحده." },
  },
  {
    key: "care",
    icon: Wrench,
    slug: "care",
    dept: { en: "Follow-up & improvement", ar: "المتابعة والتطوير" },
    story: {
      en: "After handover I keep watching the numbers, and improve every month if you want.",
      ar: "بعد التسليم بفضل متابع الأرقام، وبطوّر كل شهر لو حابب.",
    },
    gain: { en: "A system that grows with your company.", ar: "نظام بيكبر مع شركتك." },
  },
];
