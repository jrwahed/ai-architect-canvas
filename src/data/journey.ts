import {
  Compass,
  Megaphone,
  Target,
  Send,
  MessageCircle,
  Contact,
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

type L = { en: string; ar: string };

// One stop on the home page "track": a part of the company, the problem there,
// what I do about it, and what the company gets. Ordered along a customer's journey.
export interface JourneyStation {
  key: string;
  icon: LucideIcon;
  dept: L;
  problem: L;
  action: L;
  gain: L;
  /** Service page slug in src/data/services.ts, when there is one. */
  slug?: string;
}

export const JOURNEY: JourneyStation[] = [
  {
    key: "diagnosis",
    icon: Compass,
    slug: "strategy",
    dept: { en: "Diagnosis", ar: "التشخيص" },
    problem: {
      en: "Everything runs, but nobody knows where the time and money leak.",
      ar: "الشغل ماشي، بس محدش عارف الوقت والفلوس بيضيعوا فين.",
    },
    action: {
      en: "I sit with the team, watch how the work really runs, and pick the 3 things to fix first.",
      ar: "بقعد مع الفريق، وبشوف الشغل ماشي إزاي على الطبيعة، وبحدد أهم ٣ حاجات نبدأ بيها.",
    },
    gain: {
      en: "A clear map of what to build and in what order. If you don't need a system, I'll tell you.",
      ar: "خريطة واضحة: نبني إيه وبأنهي ترتيب. ولو مش محتاج نظام هقولك.",
    },
  },
  {
    key: "ads",
    icon: Megaphone,
    dept: { en: "Marketing & ads", ar: "التسويق والإعلانات" },
    problem: {
      en: "Ad money goes out, and nobody knows which campaign brought a sale.",
      ar: "فلوس الإعلانات بتتصرف، ومحدش عارف أنهي حملة جابت بيع.",
    },
    action: {
      en: "I run the ads myself and connect every campaign to the system from the first click.",
      ar: "بشغّل الإعلانات بنفسي، وبربط كل حملة بالنظام من أول ضغطة.",
    },
    gain: {
      en: "You know where every lead came from, and the budget goes to what sells.",
      ar: "تعرف كل عميل جه منين، والفلوس تروح للحملة اللي بتبيع.",
    },
  },
  {
    key: "leads",
    icon: Target,
    slug: "lead-system",
    dept: { en: "Lead capture", ar: "جلب العملاء" },
    problem: {
      en: "Leads come from Facebook, WhatsApp and the website, and many slip away.",
      ar: "العملاء جايين من فيسبوك والواتساب والموقع، وكتير منهم بيضيع.",
    },
    action: {
      en: "I build one place that catches every lead automatically and hands it to someone on the team.",
      ar: "ببني مكان واحد بيستقبل كل العملاء أوتوماتيك، وبيوزّعهم على الفريق.",
    },
    gain: {
      en: "No lead gets lost, and every lead has an owner.",
      ar: "ولا عميل بيضيع، وكل عميل ليه مسؤول.",
    },
  },
  {
    key: "outreach",
    icon: Send,
    slug: "ai-outreach",
    dept: { en: "Reaching new customers", ar: "الوصول لعملاء جدد" },
    problem: {
      en: "The team waits for customers to show up on their own.",
      ar: "الفريق مستني العميل ييجي لوحده.",
    },
    action: {
      en: "I build lists of the right prospects. AI drafts a message for each one, and you approve it before it goes out.",
      ar: "بجهّز قوايم بالعملاء المناسبين، والـAI بيكتب لكل واحد رسالة على مقاسه، وإنت بتراجع قبل ما تتبعت.",
    },
    gain: {
      en: "A steady way to reach new customers without hiring more people.",
      ar: "باب مفتوح لعملاء جداد، من غير ما تزوّد موظفين.",
    },
  },
  {
    key: "service",
    icon: MessageCircle,
    slug: "whatsapp-agent",
    dept: { en: "Customer service", ar: "خدمة العملاء" },
    problem: {
      en: "Customers message at night or in the rush, and nobody answers.",
      ar: "العميل بيسأل بالليل أو وقت الزحمة، ومحدش بيرد.",
    },
    action: {
      en: "I build a WhatsApp agent that answers only from your own information, and hands over to a person when it should.",
      ar: "ببني وكيل واتساب بيرد من معلوماتك إنت بس، وبيحوّل للموظف لما الموضوع يحتاج بني آدم.",
    },
    gain: {
      en: "Every customer gets an answer on time, and the team handles what really needs them.",
      ar: "كل عميل بياخد رد في وقته، والفريق بيمسك اللي محتاجه فعلًا.",
    },
  },
  {
    key: "sales",
    icon: Contact,
    slug: "crm-setup",
    dept: { en: "Sales", ar: "المبيعات" },
    problem: {
      en: "Nobody knows who talked to whom, and follow-ups get forgotten.",
      ar: "محدش عارف مين كلّم مين، والمتابعة بتتنسي.",
    },
    action: {
      en: "I set up a CRM around how you already sell, with clear stages and follow-up reminders.",
      ar: "بركّب CRM على مقاس طريقة بيعكم، بمراحل واضحة وتذكير بالمتابعة.",
    },
    gain: {
      en: "You see where every deal stands and who owns the next step.",
      ar: "تشوف كل صفقة واقفة فين، ومين عليه الخطوة الجاية.",
    },
  },
  {
    key: "ops",
    icon: Network,
    slug: "company-os",
    dept: { en: "Operations", ar: "التشغيل" },
    problem: {
      en: "Every team has its own sheet and WhatsApp group, and the manager keeps asking \"where are we?\"",
      ar: "كل قسم ليه شيت وجروب واتساب، والمدير بيفضل يسأل: وصلنا لفين؟",
    },
    action: {
      en: "I build an operating system: tasks with review stages, a daily report, and an alert when something is late.",
      ar: "ببني نظام تشغيل: مهام بمراحل مراجعة، وتقرير يومي، وتنبيه لو حاجة اتأخرت.",
    },
    gain: {
      en: "The manager knows who did what, without a meeting.",
      ar: "المدير يعرف مين عمل إيه من غير اجتماع.",
    },
  },
  {
    key: "automation",
    icon: Workflow,
    slug: "automation",
    dept: { en: "Repetitive work", ar: "الشغل المتكرر" },
    problem: {
      en: "The same work every day, by hand: moving data, writing reports, sending the same messages.",
      ar: "نفس الشغل كل يوم بالإيد: نقل داتا، وتقارير، ونفس الرسايل.",
    },
    action: {
      en: "I connect the tools you already use, so the repetitive work runs on its own.",
      ar: "بربط الأدوات اللي عندك ببعض، والشغل المتكرر يمشي لوحده.",
    },
    gain: {
      en: "The team's time goes to work that needs thinking.",
      ar: "وقت الفريق يروح للشغل اللي محتاج تفكير.",
    },
  },
  {
    key: "knowledge",
    icon: MessagesSquare,
    slug: "company-assistant",
    dept: { en: "Company knowledge", ar: "معلومات الشركة" },
    problem: {
      en: "The same questions get asked every day, and the answers live in one person's head.",
      ar: "نفس الأسئلة بتتسأل كل يوم، والإجابة في دماغ شخص واحد.",
    },
    action: {
      en: "I build an assistant that answers only from the company's own files, and says so when it doesn't know.",
      ar: "ببني مساعد بيجاوب من ملفات الشركة بس، ولو مش عارف بيقول مش عارف.",
    },
    gain: {
      en: "Anyone on the team finds the answer on their own.",
      ar: "أي حد في الفريق يلاقي الإجابة لوحده.",
    },
  },
  {
    key: "people",
    icon: UserSearch,
    slug: "ai-hiring",
    dept: { en: "People & hiring", ar: "الموارد البشرية" },
    problem: {
      en: "A pile of CVs and no time, and team reviews are done by gut feeling.",
      ar: "CVs كتير ومفيش وقت، وتقييم الفريق بالإحساس.",
    },
    action: {
      en: "I sort applicants against clear criteria, and score performance with a fixed formula, not by mood.",
      ar: "بفرز المتقدمين بمعايير واضحة، وبقيّم الأداء بمعادلة ثابتة مش بالمزاج.",
    },
    gain: {
      en: "Faster hiring, and fair reviews everyone understands.",
      ar: "توظيف أسرع، وتقييم عادل الكل فاهمه.",
    },
  },
  {
    key: "finance",
    icon: FileScan,
    slug: "documents",
    dept: { en: "Finance & documents", ar: "الحسابات والمستندات" },
    problem: {
      en: "Invoices and documents are typed in by hand, and the same mistakes keep coming back.",
      ar: "الفواتير والمستندات بتتكتب بالإيد، ونفس الأخطاء بتتكرر.",
    },
    action: {
      en: "AI reads the invoice or document and puts the data where it belongs, and you review it.",
      ar: "الـAI بيقرا الفاتورة أو المستند، وبيدخّل البيانات في مكانها، وإنت بتراجع.",
    },
    gain: {
      en: "Tidy books without manual typing.",
      ar: "حسابات مترتبة من غير كتابة بالإيد.",
    },
  },
  {
    key: "numbers",
    icon: LayoutDashboard,
    slug: "bi-dashboard",
    dept: { en: "Numbers & decisions", ar: "الأرقام والقرار" },
    problem: {
      en: "The numbers are scattered, so decisions are made by guessing.",
      ar: "الأرقام متفرقة، والقرار بيتاخد بالتخمين.",
    },
    action: {
      en: "I bring ads, sales, operations and finance numbers together in one dashboard.",
      ar: "بجمع أرقام الإعلانات والمبيعات والتشغيل والحسابات في داشبورد واحد.",
    },
    gain: {
      en: "You know which campaign, rep and client actually make money.",
      ar: "تعرف أنهي حملة وموظف وعميل بيكسّب فعلًا.",
    },
  },
  {
    key: "training",
    icon: GraduationCap,
    slug: "ai-training",
    dept: { en: "Team training", ar: "تدريب الفريق" },
    problem: {
      en: "The system is ready, but the team doesn't know how to use it.",
      ar: "النظام جاهز، بس الفريق مش عارف يستخدمه.",
    },
    action: {
      en: "I train the team on the system and on AI using their real work, with a written guide.",
      ar: "بدرّب الفريق على النظام والـAI على شغلهم الحقيقي، ومعاهم دليل مكتوب.",
    },
    gain: {
      en: "A team that runs the system on its own, without coming back to me.",
      ar: "فريق بيشغّل النظام لوحده من غير ما يرجعلي.",
    },
  },
  {
    key: "care",
    icon: Wrench,
    slug: "care",
    dept: { en: "Ongoing care", ar: "المتابعة والتطوير" },
    problem: {
      en: "Any system left alone slowly stops being used.",
      ar: "أي نظام بيتساب من غير متابعة بيقف شوية بشوية.",
    },
    action: {
      en: "I keep watching the numbers after handover, and adjust and improve every month if you want.",
      ar: "بتابع الأرقام بعد التسليم، وبظبط وبطوّر كل شهر لو حابب.",
    },
    gain: {
      en: "A system that grows with your company.",
      ar: "نظام بيكبر مع شركتك.",
    },
  },
];
