export interface Automation {
  name: string;
  description: string;
}

export interface Department {
  name: string;
  kpis: string[];
  automations: Automation[];
}

export interface Industry {
  id: string;
  icon: string;
  nameAr: string;
  nameEn: string;
  priority: "أعلى" | "عالي" | "متوسط";
  badge?: string;
  tagline: string;
  painPoint: string;
  solution: string;
  departments: Department[];
  results: string[];
  beforePoints: string[];
  afterPoints: string[];
  wasteStat: string;
  timeline: string;
  roiHoursPercent: number;
}

export const industries: Industry[] = [
  {
    id: "marketing-agencies",
    icon: "📱",
    nameAr: "وكالات التسويق",
    nameEn: "Marketing Agencies",
    priority: "أعلى",
    badge: "الأكثر طلباً",
    tagline: "تقارير عملاء تلقائية. أداء حملات لحظي. ROI واضح.",
    painPoint:
      "الفريق بيقضي 8 ساعات أسبوعياً يجمّع ريبورتات يدوي للعملاء من 5 منصات مختلفة. والعملاء مش حاسين بالقيمة.",
    solution:
      "Dashboard واحد لكل عميل — بيسحب الداتا تلقائي من Meta Ads + Google Ads + Analytics + CRM — وبيبعت ريبورت أسبوعي تلقائي.",
    beforePoints: [
      "8 ساعات أسبوعياً على ريبورتات يدوية",
      "عملاء مش حاسين بالقيمة",
      "بيانات من 5 منصات مشتتة",
      "قرارات بالإحساس مش بالداتا",
    ],
    afterPoints: [
      "ريبورت تلقائي كل يوم اثنين بدون لمسة يد",
      "كل عميل شايف Dashboard بتاعه لحظياً",
      "بيانات مجمعة من كل المنصات في مكان واحد",
      "قرارات مبنية على ROAS حقيقي لحظي",
    ],
    wasteStat: "8 ساعات أسبوعياً",
    timeline: "3–4 أسابيع",
    roiHoursPercent: 0.15,
    departments: [
      {
        name: "إدارة الحملات",
        kpis: [
          "ROAS لكل حملة",
          "CPL / CPA",
          "CTR & Conversion Rate",
          "Budget Utilization %",
          "Top Performing Ads",
          "Cost per Channel",
        ],
        automations: [
          {
            name: "Auto Campaign Report",
            description:
              "كل يوم اثنين الصبح — ريبورت أداء الحملات بيتبعت للعميل تلقائي",
          },
          {
            name: "Budget Alert",
            description:
              "لو حملة وصلت 80% من البادجت — alert فوري على Slack",
          },
          {
            name: "Performance Drop",
            description:
              "لو ROAS نزل تحت الـ threshold — نوتيفيكيشن + اقتراح تعديل",
          },
        ],
      },
      {
        name: "إدارة العملاء",
        kpis: [
          "عدد العملاء النشطين",
          "Retention Rate",
          "Revenue per Client",
          "NPS Score",
          "Upsell Pipeline",
          "Churn Risk",
        ],
        automations: [
          {
            name: "Client Health Score",
            description: "AI بيحسب health score لكل عميل",
          },
          {
            name: "Renewal Reminder",
            description:
              "قبل انتهاء العقد بشهر — sequence تلقائية",
          },
        ],
      },
    ],
    results: [
      "توفير وقت الريبورتات 85%",
      "رضا العملاء +40%",
      "Retention Rate 92%",
    ],
  },
  {
    id: "ecommerce",
    icon: "🛒",
    nameAr: "التجارة الإلكترونية",
    nameEn: "E-Commerce",
    priority: "أعلى",
    badge: "أسرع نتيجة",
    tagline: "مبيعات لحظية. مخزون ذكي. إعلانات محسّنة.",
    painPoint:
      "البيانات موزعة بين Shopify ومنصات الإعلانات وشركات الشحن. المدير بياخد قراراته بالإحساس. المخزون بيخلص فجأة.",
    solution:
      "Dashboard مركزي بيجمع المبيعات + المخزون + الإعلانات + الشحن — مع alerts ذكية وتنبؤات.",
    beforePoints: [
      "بيانات موزعة بين Shopify وإعلانات وشحن",
      "مخزون بيخلص من غير إنذار",
      "قرارات بداتا عمرها 3 أيام",
      "4 ساعات يومياً على ريبورتات يدوية",
    ],
    afterPoints: [
      "Dashboard مركزي لكل حاجة في مكان واحد",
      "Alert تلقائي لما المخزون يوصل الحد",
      "قرارات بداتا لحظية من كل المنصات",
      "يوم كامل محفوظ كل أسبوع",
    ],
    wasteStat: "4 ساعات يومياً",
    timeline: "2–3 أسابيع",
    roiHoursPercent: 0.2,
    departments: [
      {
        name: "المبيعات",
        kpis: [
          "Revenue يومي/أسبوعي",
          "AOV",
          "Conversion Rate",
          "Top Products",
          "Revenue by Channel",
          "Repeat Purchase Rate",
        ],
        automations: [
          {
            name: "Daily Sales Digest",
            description:
              "كل يوم الساعة 8 صباحاً — ملخص مبيعات على واتساب",
          },
          {
            name: "Flash Sale Trigger",
            description:
              "منتج بطيء + مخزون عالي → اقتراح عرض تلقائي",
          },
          {
            name: "VIP Customer Alert",
            description:
              "عميل وصل حد معين → tag + رسالة شكر",
          },
        ],
      },
      {
        name: "المخزون والعمليات",
        kpis: [
          "Stock Level per SKU",
          "Days of Inventory",
          "Reorder Alerts",
          "Fulfillment Rate",
          "Return Rate",
          "Shipping Time",
        ],
        automations: [
          {
            name: "Low Stock Alert",
            description:
              "منتج وصل Reorder Point → alert + Purchase Order draft",
          },
          {
            name: "Shipping Delay",
            description: "شحنة اتأخرت → alert + إيميل للعميل",
          },
          {
            name: "Return Analysis",
            description: "AI بيحلل أنماط المرتجعات",
          },
        ],
      },
      {
        name: "التسويق",
        kpis: [
          "ROAS per Platform",
          "CAC",
          "LTV:CAC Ratio",
          "Email Open Rate",
          "Cart Abandonment Rate",
          "Attribution",
        ],
        automations: [
          {
            name: "Abandoned Cart",
            description:
              "عميل ساب السلة → 3 رسائل (1h, 24h, 72h)",
          },
          {
            name: "Ad Spend Optimizer",
            description: "حملة ROAS تحت 2x → pause + alert",
          },
        ],
      },
    ],
    results: [
      "زيادة مبيعات +35%",
      "تقليل Out of Stock 90%",
      "توفير وقت المدير 4h/يوم",
    ],
  },
  {
    id: "saas",
    icon: "💻",
    nameAr: "شركات SaaS",
    nameEn: "SaaS Companies",
    priority: "أعلى",
    tagline: "MRR لحظي. Churn مبكر. Activation واضح.",
    painPoint:
      "الـ CEO بيجمع الأرقام من Stripe + HubSpot + Intercom يدوياً كل أسبوع — 4 ساعات. ومفيش early warning للـ churn.",
    solution:
      "Dashboard بيسحب من كل الأدوات — MRR, Churn, Activation, NPS — مع AI بيتنبأ بالـ churn.",
    beforePoints: [
      "4 ساعات أسبوعياً بيجمع Stripe + HubSpot يدوي",
      "مش عارف الـ churn قبل ما يحصل",
      "Trial users بيمشوا من غير follow-up",
      "مفيش early warning لأي حاجة",
    ],
    afterPoints: [
      "MRR وكل مؤشر في لحظته الحقيقية",
      "AI بيتنبأ بالـ churn قبل 30 يوم",
      "Onboarding sequence تلقائية لكل trial",
      "Dashboard واحد بيحكيلك كل حاجة",
    ],
    wasteStat: "4 ساعات أسبوعياً",
    timeline: "3–4 أسابيع",
    roiHoursPercent: 0.15,
    departments: [
      {
        name: "المبيعات والـ Pipeline",
        kpis: [
          "MRR & ARR",
          "Pipeline Value",
          "Win Rate",
          "Average Deal Size",
          "Sales Cycle Length",
          "Quota Attainment",
        ],
        automations: [
          {
            name: "Lead Scoring AI",
            description: "كل lead بياخد score تلقائي",
          },
          {
            name: "Stale Deal Alert",
            description:
              "deal بدون activity 3 أيام → Slack alert",
          },
          {
            name: "Expansion Trigger",
            description:
              "عميل وصل 80% usage → upsell sequence",
          },
        ],
      },
      {
        name: "نجاح العملاء",
        kpis: [
          "Churn Rate",
          "NPS",
          "Feature Adoption %",
          "Ticket Volume",
          "Resolution Time",
          "Health Score",
        ],
        automations: [
          {
            name: "Churn Prediction",
            description:
              "AI بيراقب usage — لو نازل → early warning",
          },
          {
            name: "Onboarding Sequence",
            description: "Trial جديد → 5 رسائل على 14 يوم",
          },
          {
            name: "CSAT Survey",
            description: "بعد كل تيكيت → survey + analysis",
          },
        ],
      },
    ],
    results: [
      "تقليل Churn -45%",
      "Trial Conversion +60%",
      "توفير وقت CEO 16h/شهر",
    ],
  },
  {
    id: "real-estate",
    icon: "🏢",
    nameAr: "العقارات",
    nameEn: "Real Estate",
    priority: "عالي",
    badge: "أعلى ROI",
    tagline: "ليدز منظمة. متابعة ذكية. مبيعات أسرع.",
    painPoint:
      "الليدز بتيجي وبتموت في الشيت. محدش بيعرف مين اتكلم مع مين. المدير مش شايف الصورة.",
    solution:
      "Sky Leads — CRM + Dashboard + AI بيستقبل الليد في أول دقيقة، بيصنفه، بيوزعه، بيتابع تلقائي.",
    beforePoints: [
      "ليدز بتموت في الشيت",
      "محدش عارف مين اتكلم مع مين",
      "رد على الليد بعد يومين أو تلاتة",
      "المدير مش شايف الصورة الكاملة",
    ],
    afterPoints: [
      "كل ليد بياخد رد في أقل من 3 دقائق",
      "Sky Leads بيوزع ويتابع تلقائياً",
      "إعادة توزيع تلقائية لو السيلز ما ردش",
      "Dashboard لحظي للمدير على موبايله",
    ],
    wasteStat: "ليدز ضايعة يومياً",
    timeline: "2–3 أسابيع",
    roiHoursPercent: 0.2,
    departments: [
      {
        name: "المبيعات",
        kpis: [
          "عدد الليدز اليومية",
          "تصنيف Hot/Warm/Cold",
          "وقت الرد",
          "Conversion Rate",
          "Revenue per Agent",
          "Pipeline Value",
        ],
        automations: [
          {
            name: "Instant Lead Assignment",
            description:
              "ليد يدخل → تصنيف → توزيع في أقل من دقيقة",
          },
          {
            name: "24h Reassignment",
            description:
              "السيلز ما ردش → الليد يتنقل لحد تاني",
          },
          {
            name: "Follow-up Sequence",
            description: "3 رسائل بسياق مختلف على أسبوع",
          },
          {
            name: "Hot Lead Alert",
            description:
              "ليد score عالي → نوتيفيكيشن فوري للمدير",
          },
        ],
      },
      {
        name: "التسويق",
        kpis: [
          "CPL per Campaign",
          "CPL per Area",
          "Best Ad",
          "Lead Source Distribution",
          "Budget vs Results",
          "Cost per Qualified Lead",
        ],
        automations: [
          {
            name: "CPL Alert",
            description:
              "CPL فاق benchmark المنطقة → alert + اقتراح",
          },
          {
            name: "Weekly Report",
            description: "ريبورت أسبوعي تلقائي للإدارة",
          },
        ],
      },
    ],
    results: [
      "وقت الرد <3min",
      "Conversion +47%",
      "ليدز ضايعة -80%",
    ],
  },
  {
    id: "restaurants",
    icon: "🍽️",
    nameAr: "المطاعم والفرانشايز",
    nameEn: "Restaurants & Franchise",
    priority: "عالي",
    tagline: "فروع تحت السيطرة. تكاليف واضحة. أداء لحظي.",
    painPoint:
      "صاحب الفرانشايز عنده 5 فروع ومش عارف أنهي فرع بيكسب وأنهي بيخسر.",
    solution:
      "Dashboard لكل فرع + Dashboard مجمع — مبيعات، تكاليف، مخزون، أداء الموظفين.",
    beforePoints: [
      "مش عارف أنهي فرع بيكسب وأنهي بيخسر",
      "Food waste من غير ما حد يلاحظ",
      "جدول الموظفين بالخمسة والتخمين",
      "إعادة طلب مخزون بعد ما يخلص",
    ],
    afterPoints: [
      "P&L لكل فرع في لحظته الحقيقية",
      "نظام تتبع الهدر مع alert تلقائي",
      "AI يقترح الجدول على أساس أوقات الذروة",
      "Reorder تلقائي قبل نفاد المخزون",
    ],
    wasteStat: "خسائر غير مرئية يومياً",
    timeline: "3–4 أسابيع",
    roiHoursPercent: 0.18,
    departments: [
      {
        name: "العمليات",
        kpis: [
          "Revenue per Branch",
          "Food Cost %",
          "Labor Cost %",
          "Orders per Hour",
          "Avg Ticket Size",
          "Waste %",
        ],
        automations: [
          {
            name: "Branch Comparison",
            description:
              "فرع تحت المتوسط → alert + تحليل السبب",
          },
          {
            name: "Inventory Auto-Order",
            description:
              "مكوّن وصل الحد → طلب شراء تلقائي",
          },
          {
            name: "Peak Hour Staffing",
            description:
              "AI يحلل أوقات الذروة ويقترح جدول",
          },
        ],
      },
    ],
    results: [
      "تقليل Food Waste -30%",
      "وضوح الأرباح 100%",
      "توفير تكاليف 22%",
    ],
  },
  {
    id: "logistics",
    icon: "🚛",
    nameAr: "الشركات اللوجستية",
    nameEn: "Logistics & Supply Chain",
    priority: "متوسط",
    tagline: "شحنات متتبعة. موردين منظمين. أسطول تحت السيطرة.",
    painPoint:
      "الشحنات بتتأخر ومحدش بيعرف غير لما العميل يشتكي.",
    solution:
      "Dashboard لتتبع الشحنات + المخزون + أداء الموردين + تكاليف النقل.",
    beforePoints: [
      "بتعرف إن الشحنة اتأخرت لما العميل يشتكي",
      "تكلفة التوصيل مش واضحة بالتفصيل",
      "مسارات التوصيل بالخبرة مش بالداتا",
      "أداء السائقين مش قابل للقياس",
    ],
    afterPoints: [
      "تتبع لحظي لكل شحنة مع early alert",
      "تكلفة كل توصيل محسوبة تلقائياً",
      "AI يقترح أفضل مسار كل يوم",
      "Scorecard لكل سائق أسبوعياً",
    ],
    wasteStat: "شكاوى يومية",
    timeline: "4–6 أسابيع",
    roiHoursPercent: 0.12,
    departments: [
      {
        name: "إدارة الشحن",
        kpis: [
          "On-Time Delivery %",
          "Avg Delivery Time",
          "Shipments in Transit",
          "Failed Deliveries",
          "Cost per Delivery",
          "Driver Performance",
        ],
        automations: [
          {
            name: "Delay Detection",
            description:
              "شحنة هتتأخر → alert + إيميل للعميل",
          },
          {
            name: "Route Optimization",
            description: "AI يقترح أفضل مسار يومياً",
          },
        ],
      },
    ],
    results: [
      "On-Time Delivery 96%",
      "تكلفة التوصيل -18%",
      "شكاوى -60%",
    ],
  },
  {
    id: "healthcare",
    icon: "🏥",
    nameAr: "المستشفيات والعيادات",
    nameEn: "Healthcare",
    priority: "متوسط",
    tagline: "مواعيد منظمة. إيرادات واضحة. مخزون أدوية متتبع.",
    painPoint:
      "المواعيد بتتلخبط، المرضى بينسوا، مخزون الأدوية بيخلص فجأة.",
    solution:
      "Dashboard لإدارة المواعيد + الإيرادات + مخزون الأدوية + أداء الأطباء.",
    beforePoints: [
      "المريض بينسى الموعد ومحدش بيذكره",
      "مخزون الأدوية بيخلص فجأة",
      "إيرادات الأطباء مش واضحة بالتفصيل",
      "Follow-up بعد الزيارة معدوم",
    ],
    afterPoints: [
      "تذكير تلقائي قبل 24h و2h على واتساب",
      "Alert لما أي دواء يوصل الحد الأدنى",
      "Revenue per doctor يومياً ومقارنة شهرية",
      "رسالة متابعة تلقائية بعد كل زيارة",
    ],
    wasteStat: "مواعيد ضائعة يومياً",
    timeline: "3–4 أسابيع",
    roiHoursPercent: 0.15,
    departments: [
      {
        name: "إدارة المواعيد والمرضى",
        kpis: [
          "Appointments/Day",
          "No-Show Rate",
          "Wait Time",
          "Patient Satisfaction",
          "Revenue per Doctor",
          "Medicine Stock",
        ],
        automations: [
          {
            name: "Appointment Reminder",
            description:
              "قبل 24h + 2h → واتساب تلقائي",
          },
          {
            name: "Low Medicine Alert",
            description: "دوا وصل الحد → alert + طلب شراء",
          },
          {
            name: "Follow-up Care",
            description:
              "بعد الزيارة → رسالة متابعة + survey",
          },
        ],
      },
    ],
    results: [
      "No-Show -55%",
      "رضا المرضى +38%",
      "إيرادات +25%",
    ],
  },
  {
    id: "education",
    icon: "🎓",
    nameAr: "المدارس والمراكز التعليمية",
    nameEn: "Education",
    priority: "متوسط",
    tagline: "طلاب متتبعين. حضور واضح. نتائج لحظية.",
    painPoint:
      "الحضور يدوي، النتائج بتتأخر، أولياء الأمور مش عارفين حاجة غير آخر الترم.",
    solution:
      "Dashboard لمتابعة الحضور + الدرجات + أداء المعلمين + التواصل مع أولياء الأمور.",
    beforePoints: [
      "الغياب بيتسجل يدوي وبيتنسى",
      "أولياء الأمور مش عارفين غير آخر الترم",
      "طالب تعبان أكاديمياً محدش لاحظ",
      "رسوم متأخرة وتحصيل يدوي",
    ],
    afterPoints: [
      "حضور تلقائي مع alert للغياب المتكرر",
      "تقرير أسبوعي لولي الأمر تلقائياً",
      "AI بيرصد انخفاض الدرجات مبكراً",
      "تذكير رسوم تلقائي قبل الاستحقاق",
    ],
    wasteStat: "ساعات تحصيل يدوي",
    timeline: "3–4 أسابيع",
    roiHoursPercent: 0.15,
    departments: [
      {
        name: "الشؤون الأكاديمية",
        kpis: [
          "Attendance Rate",
          "Average Grades",
          "At-Risk Students",
          "Teacher Performance",
          "Parent Engagement",
          "Fee Collection Rate",
        ],
        automations: [
          {
            name: "Absence Alert",
            description:
              "3 أيام غياب → رسالة لولي الأمر + alert للمشرف",
          },
          {
            name: "Grade Drop",
            description: "درجات نزلت → early intervention",
          },
          {
            name: "Fee Reminder",
            description: "قبل الدفع بأسبوع → تذكير تلقائي",
          },
        ],
      },
    ],
    results: [
      "Attendance +15%",
      "Parent Satisfaction +42%",
      "Fee Collection 95%",
    ],
  },
];

export const priorityColors: Record<string, string> = {
  أعلى: "#ef4444",
  عالي: "#f97316",
  متوسط: "#eab308",
};
