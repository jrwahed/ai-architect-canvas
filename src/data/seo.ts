// Title and description for every public page. Used at runtime (SeoManager) and at build time
// (vite.config.ts writes a copy of index.html per page with these tags, plus sitemap.xml).
import { SERVICES } from "./services";

export const SITE_URL = "https://mohamedwaheed.com";

export interface PageMeta {
  path: string;
  title: string;
  description: string;
}

const NAME = "Mohamed Waheed";

export const HOME_META: PageMeta = {
  path: "/",
  title: `${NAME} | Business Intelligence & AI Automation`,
  description:
    "بحوّل شغل شركتك من شيتات وواتساب وتخمين لنظام ذكي واحد: داشبورد أرقام (BI)، وأتمتة بالـAI، وCRM، وأنظمة تشغيل داخلية. Business Intelligence & AI automation for companies in Egypt and the Gulf.",
};

const STATIC_PAGES: PageMeta[] = [
  HOME_META,
  {
    path: "/solutions",
    title: `حلول حسب المجال | AI Solutions by Industry — ${NAME}`,
    description:
      "أنظمة BI وأتمتة بالـAI حسب مجال شركتك، ومعاها حاسبة للعائد. AI and BI systems by industry, with an ROI calculator.",
  },
  {
    path: "/work/agency-os",
    title: `نظام تشغيل وكالة تسويق | Agency Operating System — ${NAME}`,
    description:
      "دراسة حالة: نظام واحد بيدير الشغل اليومي لوكالة تسويق: التقارير، والمهام والمراجعة، والأداء، وملفات العملاء، والـHR. Case study: one system that runs a marketing agency's day-to-day work.",
  },
  {
    path: "/work/agency-os/inside",
    title: `جوّه النظام: رحلة بوست من الخطة للنشر | Inside the Agency OS — ${NAME}`,
    description:
      "جولة بالصور جوّه نظام تشغيل وكالة تسويق: المزيج، والخطة، والبورد، والمراجعة، والنشر، والتقرير اليومي — وكل قاعدة النظام بيفرضها. A screen-by-screen walkthrough of the agency operating system.",
  },
  {
    path: "/flowos",
    title: `FlowOS | CRM وأتمتة بالـAI لفرق المبيعات — ${NAME}`,
    description:
      "CRM وأتمتة بالـAI لأي فريق مبيعات: استقبال العملاء، وتقييمهم، ومتابعتهم، وداشبورد مباشر. AI CRM and automation for any sales team.",
  },
  {
    path: "/drivelead",
    title: `DriveLead | نظام بالـAI لمعارض السيارات — ${NAME}`,
    description:
      "نظام بالـAI مخصوص لمعارض السيارات: من استفسار OLX وفيسبوك لحد التسليم. An AI system built for car dealerships, from inquiry to delivery.",
  },
  {
    path: "/cv",
    title: `السيرة الذاتية | CV — ${NAME}`,
    description:
      "خبرة محمد وحيد في تطوير الأعمال والتسويق وبناء أنظمة الـAI، ومعاها ملف PDF. Experience in business development, marketing and AI systems, with a PDF download.",
  },
];

const SERVICE_PAGES: PageMeta[] = SERVICES.map((s) => ({
  path: `/services/${s.slug}`,
  title: `${s.title.ar} | ${s.title.en} — ${NAME}`,
  description: `${s.short.ar} ${s.short.en}`,
}));

export const ALL_PAGES: PageMeta[] = [...STATIC_PAGES, ...SERVICE_PAGES];

export const metaFor = (pathname: string): PageMeta | undefined => {
  const path = pathname !== "/" ? pathname.replace(/\/+$/, "") : pathname;
  return ALL_PAGES.find((p) => p.path === path);
};
