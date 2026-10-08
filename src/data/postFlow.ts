import {
  Layers,
  CalendarRange,
  UsersRound,
  TrendingUp,
  KanbanSquare,
  PenLine,
  CheckCheck,
  Send,
  UserCheck,
  Archive,
  ClipboardList,
  LifeBuoy,
  AlarmClock,
  BarChart3,
  LucideIcon,
} from "lucide-react";

import mixShot from "@/assets/flow-mix.webp";
import planShot from "@/assets/flow-plan.webp";
import teamShot from "@/assets/flow-team.webp";
import progressShot from "@/assets/flow-progress.webp";
import boardShot from "@/assets/flow-board.webp";
import contentShot from "@/assets/flow-content.webp";
import rejectShot from "@/assets/flow-reject.webp";
import mineShot from "@/assets/flow-mine.webp";
import shelfShot from "@/assets/flow-shelf.webp";
import todayShot from "@/assets/flow-today.webp";
import requestsShot from "@/assets/flow-requests.webp";
import queueShot from "@/assets/flow-queue.webp";
import reportShot from "@/assets/flow-report.webp";

// The inside story of the agency operating system, told as one post travelling through it.
// Told in Egyptian Arabic whatever the site language, the same call the owner made for the
// home page story, so it reads the way he actually explains it.
//
// Every screenshot here comes from the live system and has been scrubbed first: client names,
// employee names and faces, the team's own name and any demo text are blurred out. Nothing in
// the copy names the agency, a client or a member of staff.

export interface FlowStation {
  key: string;
  icon: LucideIcon;
  /** The screen this station lives on. */
  title: string;
  /** What I built here, in the first person. */
  story: string;
  /** The rule the system enforces at this station — the part people remember. */
  rule: string;
  /** A real screen, already scrubbed. */
  shot?: string;
  caption?: string;
  /** Shown instead of a screenshot when there is no screen for this step. */
  steps?: string[];
}

export const FLOW_INTRO = {
  label: "جوّه النظام",
  title: "رحلة بوست من الخطة للنشر",
  lead: "البوست مش بيتعمل. البوست بيعدّي.",
  sub: "من أول ما المزيج يتحط في ملف العميل، لحد ما الملف يروح لفولدر «اتنشر» على درايف — طريق واحد، ومحطات معروفة، وفي كل محطة صاحبها هو اللي يحرّكها. دي رحلة بوست واحد جوّه نظام تشغيل وكالة تسويق في مصر، بنيته بنفسي.",
  chain: [
    { t: "المزيج", d: "مرة واحدة لكل عميل" },
    { t: "الخطة", d: "مرة في الشهر" },
    { t: "البوست", d: "بند = مهمة" },
    { t: "اتنشر", d: "على المنصة وعلى درايف" },
  ],
  privacy:
    "كل اللقطات اللي تحت من النظام وهو شغّال. أسماء العملاء والموظفين وصورهم واسم الوكالة متخفية قبل ما تتحط هنا.",
  englishNote: "This case study is told in Egyptian Arabic, the way the team actually uses the system.",
};

export const FLOW: FlowStation[] = [
  {
    key: "mix",
    icon: Layers,
    title: "المزيج الشهري",
    story:
      "بدأت من أبسط سؤال: العميل ده بياخد كام بوست في الشهر، وإيه أنواعهم؟ حطيت الإجابة في ملف العميل مرة واحدة — تصميم، وكاروسيل، وفيديو، وريل — وكل واحد بعدده. ومن ساعتها، ده اللي بيتولّد منه شغل الشهر كله.",
    rule: "العميل اللي مالوش مزيج مايتعملّوش خطة. البنود بتتولّد من المزيج وبس، وأي شغل زيادة بيتسجّل على إنه «خارج الخطة» عشان يبان لوحده.",
    shot: mixShot,
    caption: "ملف العميل ← الخطة ← مزيج المحتوى الشهري الثابت",
  },
  {
    key: "plan",
    icon: CalendarRange,
    title: "خطة الشهر",
    story:
      "في أول الشهر، زرار واحد بيملا الخطة كلها من المزيج: بند لكل بوست، وكل بند فيه فكرته، وتاريخ نشره، ونشر ولا إعلان، وهدفه — وعي ولا سيلز ولا تفاعل.",
    rule: "خطة واحدة للحساب في الشهر. التانية النظام بيرفضها وبيوريك الخطة الموجودة، وبيبعت طلب للأدمن بسبب مكتوب — عشان الشغل مايتعدّش مرتين وتطلع تقارير بضعف الحقيقة.",
    shot: planShot,
    caption: "مهمة جديدة ← خطة — والبنود بتتملى من المزيج",
  },
  {
    key: "team",
    icon: UsersRound,
    title: "تيم الحساب",
    story:
      "كل حساب ليه طاقم ثابت: مين بيكتب، ومين بيعمل الديزاين، ومين بيراجع. أول ما تختار الحساب، النظام بيحط الناس في بنود الخطة بنفسه من الطاقم ده.",
    rule: "الدور اللي فيه شخص واحد بيتملى لوحده، واللي فيه أكتر من واحد بيديك اختيار. والملء مابيدوسش على حد اخترته بإيدك.",
    shot: teamShot,
    caption: "تعديل الحساب ← الفريق — دور لكل عضو. الأسماء والصور متخفية.",
  },
  {
    key: "progress",
    icon: TrendingUp,
    title: "الخطة الأب",
    story:
      "الخطة نفسها مالهاش زرار «تم» ولا شريط مراحل. هي حاوية بتعدّ: النسبة بتعلى مع كل مرحلة يعدّيها أي بند — مش بس لما البند يخلص — والعدد اللي فوق للي اتنشر فعلًا.",
    rule: "الملغي مش محسوب، والخطة بتتقفل لوحدها لما كله يتنشر. فالمدير بيبص على رقم واحد ويعرف الشهر ماشي إزاي.",
    shot: progressShot,
    caption: "لوحة الخطة — شريط التقدّم وشيبس المراحل",
  },
  {
    key: "board",
    icon: KanbanSquare,
    title: "البورد",
    story:
      "من هنا البوست بيبدأ يتحرك. كل عمود في البورد محطة، والرقم جنبه بيقولك كام مهمة واقفة فيها، وكل كارت فيه شريط رحلة صغير بيوريك المهمة وصلت فين ومع مين.",
    rule: "التسع محطات دي طريق واحد. كل نقلة مسموحة مكتوبة في الإعدادات، ومفيش قفز بين المحطات — واللي مش مكتوب ممنوع.",
    shot: boardShot,
    caption: "بورد المهام — عمود لكل محطة",
  },
  {
    key: "write",
    icon: PenLine,
    title: "الكتابة",
    story:
      "الكاتب بيستلم المهمة ويكتب الكلام اللي هيتحط على التصميم، أو سكريبت الفيديو بهوكه ومحتواه ودعوته للتصرّف. وتحتيهم الكابشن.",
    rule: "الكابشن العام وكل منصة لازم يتملّوا — مش صندوق واحد ولا العام لوحده. والشاشة بتكتب الناقص بالاسم تحت الزرار قبل ما تدوس.",
    shot: contentShot,
    caption: "تسليم الكونتنت — كابشن لكل منصة وعلامة «اتقرا»",
  },
  {
    key: "review",
    icon: CheckCheck,
    title: "المراجعة",
    story:
      "المراجع بيفتح التسليم، ويقرا كل جزء ويعلّمه «اتقرا» باسمه وبالوقت، ويكتب ملاحظته لو محتاج — والملاحظة بتوصل للكاتب إشعار، مش بيدوّر عليها.",
    rule: "«اتقرا» شرط مرور مش علامة، وأي تعديل بعدها بيرجّعها «مستني قراية». واللي دخّل المهمة المراجعة مايعدّيهاش بنفسه — لازم عين تانية تبصّ.",
    shot: rejectShot,
    caption: "نافذة «رفض ورجوع» — الوجهة والسبب والمطلوب، كلهم إلزاميين",
  },
  {
    key: "produce",
    icon: Send,
    title: "التنفيذ والنشر",
    story:
      "الديزاينر بيشوف البند أول ما يوصل مرحلته — مش قبل كده — عشان مايبقاش قدامه عشرين بوست لسه بيتكتبوا. يرفع الملف بمقاسه ويحرّكها، وبعد الاعتماد تروح للمودريشن يجدولها.",
    rule: "«جاهزة للنشر» مالهاش طريق غير تلاتة مع بعض: تاريخ نشر، ومفيش لفّة تعديل مفتوحة، وملف متعلّم «النهائي». واللي بيحدد النهائي هو المراجع — مش الديزاينر.",
    steps: ["تاريخ نشر", "مفيش تعديل مفتوح", "ديزاين نهائي معتمد", "جاهزة للنشر"],
  },
  {
    key: "mine",
    icon: UserCheck,
    title: "شاشة الموظف",
    story:
      "الموظف مابيشوفش البورد كله. بيشوف عمودين بس: «عليك دلوقتي» وكروته بتتفتح، و«جايالك قريب» وسطوره مابتتفتحش وبتقوله المهمة مع مين دلوقتي. يعني الشاشة بتقوله اعمل إيه، مش بتوريه كل حاجة وتسيبه يدوّر.",
    rule: "زرار «تم ✓» لصاحب المرحلة الحالية بس. غيره بيشوف كارت «دي مش مرحلتك» — وبيقوله المهمة فين ومع مين، فيعرف يكلّم مين بدل ما يعمل تحديث ويدوّر.",
    shot: mineShot,
    caption: "البورد من حساب موظف — عمودين ورف",
  },
  {
    key: "shelf",
    icon: Archive,
    title: "رف اللي خلص",
    story:
      "اللي خلص مابيختفيش ومابيفضلش في وشك. بيتطوى في رف تحت العمودين، فيه بحث بالاسم أو الحساب، والكروت متجمّعة بالشهر.",
    rule: "والملغاة برّه الرف ده خالص — هي مش «خلصت»، هي اتلغت، وفرق التلاتة دول بيبان في التقارير.",
    shot: shelfShot,
    caption: "رف «خلصت من عندك» مفتوح — ببحث وتجميع بالشهر",
  },
  {
    key: "today",
    icon: ClipboardList,
    title: "التقرير اليومي",
    story:
      "آخر اليوم، الموظف بيلاقي فوق تقريره كل حاجة عملها فعلًا في النظام، بساعتها. دوسة واحدة على علامة القسم والبند بيتحط مكانه، وبياخد الحساب والمهمة لوحده.",
    rule: "تقرير واحد في اليوم، ونافذة تعديل ٢٤ ساعة، وبيقدر يكتب بتاريخ فات لحد سبع أيام عمل — والمستقبل مرفوض. والسكور بيحسب المهمة على اللي كان ماسكها يومها، مش على اللي بدأها.",
    shot: todayShot,
    caption: "«شغلي النهارده» فوق التقرير — بأيقونات الأقسام الأربعة",
  },
  {
    key: "requests",
    icon: LifeBuoy,
    title: "طلبات التشغيل",
    story:
      "بدل فورمات جوجل المتفرّقة، حطيت الطلبات جوّه النظام: مشكلة IT، أو صلاحية، أو أدوات، أو صيانة، أو إنترنت وكهربا. واسم الشخص ووظيفته ورقمه بيتملّوا لوحدهم.",
    rule: "والعاجل بيوصل لفريق التشغيل على طول. وتفاصيل الطلب مابتطلعش برّه النظام — اللي بيخرج قوالب ثابتة فيها الاسم والأرقام بس.",
    shot: requestsShot,
    caption: "طلب جديد — الأنواع السبعة ودرجة الاستعجال",
  },
  {
    key: "queue",
    icon: AlarmClock,
    title: "طابور اليوم",
    story:
      "وده أول شاشة بيفتحها المدير الصبح: كل حاجة محتاجة تصرّف منه، مرتّبة بالإلحاح — اللي واقف أكتر من اللازم، واللي فات ميعاده، ونشر قرب ومفيش ملفات، وحسابات ساكتة.",
    rule: "جنب كل سطر زرار «إعادة إسناد» و«افتح المهمة» — فالشاشة مش بتبلّغ بس، بتتصرّف من مكانها. ومن هنا كمان بيوافق على طلب الخطة التانية.",
    shot: queueShot,
    caption: "طابور اليوم — مجمّع بالإلحاح",
  },
  {
    key: "report",
    icon: BarChart3,
    title: "تقرير الشركة",
    story:
      "وآخر محطة: ملخص الفترة بالعامية. عشر سطور، وكل سطر مسطّر بيفتح على تفاصيله، وتحتيهم «محتاج قرارك» بتلات سطور بالكتير.",
    rule: "الملخص ده قوالب مكتوبة بإيد — الأرقام من الداتابيز والجمل ثابتة، ومفيش نداء على أي موديل AI. وفي آخره سطر بيقول إن الأرقام بتحكي اللي اتسجّل في النظام بس.",
    shot: reportShot,
    caption: "تقرير الشركة — الكروت والملخص بالعامية",
  },
];

// Three things people mix up, and the whole permission model sits on the difference.
export const FLOW_PERMISSIONS = [
  {
    key: "edit",
    title: "يعدّل",
    tone: "leak" as const,
    what: "الحقول · التواريخ · الطاقم · المراجعين · الإلغاء",
    who: ["الإدارة", "اللي عمل المهمة", "الأكونت مانيجر", "صاحب الخطة"],
  },
  {
    key: "work",
    title: "يشتغل",
    tone: "gain" as const,
    what: "يكتب · يرفع · يعلّق",
    who: ["الكاتب — كونتنت", "الديزاينر — ملفات", "الفيديو والمونتاج"],
  },
  {
    key: "move",
    title: "يحرّك",
    tone: "primary" as const,
    what: "«تم ✓» و«رجّع خطوة»",
    who: ["صاحب المرحلة", "المراجع في المراجعة", "المالك والأدمن"],
  },
];

// The three conditions that hold a task where it is. The screen names the missing one.
export const FLOW_BLOCKERS = [
  {
    n: "١",
    title: "الكونتنت ناقص",
    body: "الكابشن العام وكل منصة، ومعاهم كلام التصميم أو سلايدات الكاروسيل أو سكريبت الفيديو. كله، مش واحد.",
  },
  {
    n: "٢",
    title: "لسه محدش قرا",
    body: "كل صندوق وكل جزء لازم يتعلّم «اتقرا» من المراجع — مش صاحب الكلام نفسه. وأي تعديل بعد القراية بيرجّعها.",
  },
  {
    n: "٣",
    title: "مفيش ديزاين نهائي",
    body: "ملف مرفوع ومتعلّم «النهائي»، ومعاه تاريخ نشر، ومفيش لفّة تعديل لسه مفتوحة.",
  },
];

export const FLOW_TAKEAWAYS = [
  "الشغل بيمشي في طريق واحد معروف، وكل نقلة مسموحة مكتوبة في الإعدادات.",
  "في كل لحظة فيه شخص واحد بس يقدر يحرّك المهمة — والباقي بيشوف هي مع مين.",
  "النظام مابيقولش «في حاجة غلط». بيكتب الشرط الناقص بالاسم تحت الزرار.",
  "اللي بيخرج برّه النظام قوالب ثابتة — مفيش كلام عميل ولا عنوان مهمة بيطلع على موبايل حد.",
];
