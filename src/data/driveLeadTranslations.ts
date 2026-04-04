type Lang = "en" | "ar";

const dl: Record<string, Record<Lang, string>> = {
  // ─── Hero ───
  "hero.badge": {
    ar: "نظام ذكي لمعارض السيارات في مصر",
    en: "AI-Powered System for Car Dealerships in Egypt",
  },
  "hero.title1": {
    ar: "نظام الـ AI اللي بيدير",
    en: "The AI System That Runs",
  },
  "hero.title2": {
    ar: "معارض السيارات بالكامل.",
    en: "Your Entire Dealership.",
  },
  "hero.desc": {
    ar: "مش مجرد CRM. ده نظام متكامل بيجمعلك كل الاستفسارات من فيسبوك وجوجل و OLX — بيوزعهم على السيلز — بيتابع كل عميل لحد ما يستلم العربية — وبيقولك بالظبط فلوسك رايحة فين.",
    en: "Not just a CRM. A complete system that captures every inquiry from Facebook, Google & OLX — assigns them to sales — tracks every customer until delivery — and tells you exactly where your money is going.",
  },
  "hero.experience": {
    ar: "خبرة في سوق السيارات المصري. أكتر من 50 معرض. أكتر من 12,000 استفسار شهرياً.",
    en: "Deep experience in the Egyptian car market. 50+ dealerships. 12,000+ monthly inquiries.",
  },
  "hero.cta1": {
    ar: "احجز مكالمة مجانية",
    en: "Book a Free Call",
  },
  "hero.cta2": {
    ar: "شوف المنصة شغالة إزاي",
    en: "See How It Works",
  },
  "hero.stat1v": { ar: "+50", en: "50+" },
  "hero.stat1l": { ar: "معرض سيارات", en: "Car Dealerships" },
  "hero.stat2v": { ar: "12,000+", en: "12,000+" },
  "hero.stat2l": { ar: "استفسار شهرياً", en: "Monthly Inquiries" },
  "hero.stat3v": { ar: "40%", en: "40%" },
  "hero.stat3l": { ar: "انخفاض في تكلفة الاستفسار", en: "Lower Cost Per Lead" },
  "hero.stat4v": { ar: "3x", en: "3x" },
  "hero.stat4l": { ar: "سرعة إغلاق الصفقات", en: "Faster Deal Closing" },

  // Pipeline stages
  "pipeline.1": { ar: "استفسار جديد", en: "New Inquiry" },
  "pipeline.2": { ar: "زيارة المعرض", en: "Showroom Visit" },
  "pipeline.3": { ar: "تجربة القيادة", en: "Test Drive" },
  "pipeline.4": { ar: "التفاوض", en: "Negotiation" },
  "pipeline.5": { ar: "تم البيع", en: "Sold" },
  "pipeline.6": { ar: "التسليم", en: "Delivery" },

  // ─── Pain Section ───
  "pain.label": { ar: "المشكلة الحقيقية", en: "The Real Problem" },
  "pain.title": {
    ar: "أكبر فجوة في معارض السيارات.",
    en: "The Biggest Gap in Car Dealerships.",
  },
  "pain.desc": {
    ar: "المشكلة مش إن مفيش عملاء. المشكلة إن العملاء بييجوا وبيروحوا ومحدش عارف ليه. الاستفسارات بتدخل من 10 أماكن مختلفة ومفيش حاجة واحدة بتربطهم.",
    en: "The problem isn't that there are no customers. The problem is customers come and go and nobody knows why. Inquiries pour in from 10 different sources with nothing connecting them.",
  },
  "pain.1.title": { ar: "الاستفسارات بتضيع", en: "Inquiries Get Lost" },
  "pain.1.desc": {
    ar: "العميل بيبعت على فيسبوك. واحد تاني بيتصل. واحد تالت بيسأل على OLX. واحد رابع بيمشي في المعرض. كل واحد في مكان. السيلز مش عارف يلحق. واللي بيلحقه — بينسى التاني.",
    en: "One customer messages on Facebook. Another calls. A third asks on OLX. A fourth walks into the showroom. Each one in a different place. Sales can't keep up — and the ones they reach, they forget the rest.",
  },
  "pain.2.title": { ar: "مش عارف مين جاد ومين بيسأل وخلاص", en: "Can't Tell Serious Buyers from Window Shoppers" },
  "pain.2.desc": {
    ar: "فريق المبيعات بيضيع ساعات بيكلم ناس مش هتشتري. مفيش تصنيف، مفيش أولويات. واحد ميزانيته مليون وواحد ميزانيته 200 ألف — الاتنين بيتعاملوا نفس المعاملة.",
    en: "Your sales team wastes hours talking to people who won't buy. No classification, no priorities. Someone with a 1M budget and someone with 200K — both get the same treatment.",
  },
  "pain.3.title": { ar: "بتصرف على إعلانات وما بتعرفش النتيجة", en: "Spending on Ads With No Visibility" },
  "pain.3.desc": {
    ar: "بتحط 50 ألف في إعلانات الشهر ده. طب جابوا كام استفسار؟ الاستفسارات دي اتحولوا صفقات ولا لأ؟ أنهي حملة جابت نتيجة وأنهي حرقت فلوس؟ محدش عارف.",
    en: "You spend 50K on ads this month. How many inquiries did they bring? Did those turn into deals? Which campaign delivered and which burned money? Nobody knows.",
  },
  "pain.4.title": { ar: "العميل بيبرد في دقايق", en: "Leads Go Cold in Minutes" },
  "pain.4.desc": {
    ar: "العميل اللي بيسأل عن عربية — لو مكلمتهوش في أول 10 دقائق — احتمال كبير يكون راح معرض تاني. من غير نظام سريع، فريقك مش هيقدر يلحق.",
    en: "A customer asking about a car — if you don't contact them in the first 10 minutes — they've likely gone to another dealership. Without a fast system, your team can't keep up.",
  },
  "pain.5.title": { ar: "المدير شايف أرقام ناقصة", en: "Management Flying Blind" },
  "pain.5.desc": {
    ar: "صاحب المعرض بيسأل \"بعنا كام الشهر ده؟\" والإجابة بتيجي بعد يومين. مفيش داشبورد. مفيش أرقام لحظية. القرارات بتتاخد بالإحساس مش بالداتا.",
    en: "The owner asks \"How many did we sell this month?\" and the answer takes two days. No dashboard. No real-time numbers. Decisions are made by gut feeling, not data.",
  },

  // ─── Video Section ───
  "video.label": { ar: "شوفه بنفسك", en: "See It Yourself" },
  "video.title": { ar: "شوف المنصة شغالة.", en: "Watch the Platform in Action." },
  "video.desc": {
    ar: "نظرة عامة في دقيقتين على المنصة وإزاي الـ AI بيحول استفسارات معرضك لصفقات حقيقية.",
    en: "A 2-minute overview of how AI turns your dealership inquiries into real deals.",
  },
  "video.cta": { ar: "شوف الفيديو", en: "Watch Video" },

  // ─── How It Works ───
  "how.label": { ar: "إزاي بيشتغل", en: "How It Works" },
  "how.title": {
    ar: "نظام واحد متصل. من الاستفسار للتسليم.",
    en: "One Connected System. From Inquiry to Delivery.",
  },
  "how.1.title": { ar: "الاستفسارات بتنزل أوتوماتيك", en: "Inquiries Land Automatically" },
  "how.1.desc": {
    ar: "عميل بعت رسالة على فيسبوك؟ واحد ملأ فورم على جوجل؟ حد سأل على OLX؟ حد اتصل بالمعرض؟ كل الاستفسارات بتنزل في مكان واحد — أوتوماتيك — من غير ما حد يعمل حاجة يدوي.",
    en: "Customer messaged on Facebook? Filled a Google form? Asked on OLX? Called the showroom? All inquiries land in one place — automatically — no manual work needed.",
  },
  "how.1.highlight": {
    ar: "مش بتنسخ أرقام من فيسبوك. المنصة بتجيبهم لوحدها.",
    en: "No copying numbers from Facebook. The platform fetches them automatically.",
  },
  "how.2.title": { ar: "الـ AI بيصنف كل عميل", en: "AI Classifies Every Lead" },
  "how.2.desc": {
    ar: "كل عميل بيدخل بياخد تقييم فوري. الـ AI بيشوف: ميزانيته كام؟ العربية اللي عاوزها موجودة عندك؟ عنده عربية للبدل؟ محتاج تمويل؟ بيحدد مين \"سخن\" ومين \"فاتر\" ومين \"بارد\" — فريقك يعرف يكلم مين الأول.",
    en: "Every lead gets an instant score. AI checks: budget, desired car availability, trade-in, financing needs. It identifies who's \"hot\", \"warm\", and \"cold\" — so your team knows who to call first.",
  },
  "how.2.highlight": {
    ar: "العميل الصح، في الوقت الصح، للسيلز الصح.",
    en: "The right customer, at the right time, to the right salesperson.",
  },
  "how.3.title": { ar: "السيلز بيتابع كل خطوة", en: "Sales Tracks Every Step" },
  "how.3.desc": {
    ar: "كل عميل عنده ملف كامل: اسمه، رقمه، العربية اللي عاوزها، ميزانيته، هل عنده بدل، هل محتاج تمويل. السيلز بيسحبه من مرحلة للتانية. كل مرحلة واضحة. مفيش عميل بيتنسى.",
    en: "Every customer has a complete profile: name, number, desired car, budget, trade-in, financing. Sales drags them from stage to stage. Every stage is clear. No customer gets forgotten.",
  },
  "how.4.title": { ar: "المخزون مربوط بالعملاء", en: "Inventory Linked to Customers" },
  "how.4.desc": {
    ar: "كل عربية في المعرض مسجلة في المنصة — الماركة والموديل والسنة واللون والسعر والحالة. لما عميل يشتري عربية — بتربط العربية بالعميل. بتعرف بالظبط: بعنا كام عربية، بكام، ومين اشتراها.",
    en: "Every car in your showroom is registered — make, model, year, color, price, status. When a customer buys — the car links to them. You know exactly: how many sold, at what price, and who bought them.",
  },
  "how.4.highlight": {
    ar: "مش أرقام تقديرية. أرقام حقيقية.",
    en: "Not estimates. Real numbers.",
  },
  "how.5.title": { ar: "الـ AI بيحسن كل حاجة", en: "AI Optimizes Everything" },
  "how.5.desc": {
    ar: "كل أسبوع، الـ AI بيحلل: أنهي حملة جابت أحسن استفسارات؟ أنهي سيلز بيقفل أكتر؟ فين العملاء بيوقفوا ومش بيكملوا؟ بيديك توصيات واضحة — مش كلام عام، توصيات بأرقام من بياناتك انت.",
    en: "Every week, AI analyzes: which campaign brought the best leads? Which salesperson closes most? Where do customers drop off? It gives clear recommendations — not generic advice, data-driven insights from your own numbers.",
  },
  "how.5.highlight": {
    ar: "كل أسبوع المنصة بتبقى أذكى.",
    en: "Every week the platform gets smarter.",
  },

  // ─── Features ───
  "feat.label": { ar: "المنصة من جوة", en: "Inside the Platform" },
  "feat.title": {
    ar: "نظام واحد. عشر قدرات بتغير كل حاجة.",
    en: "One System. Ten Capabilities That Change Everything.",
  },

  // Feature 1: CRM
  "feat.crm.title": { ar: "CRM ذكي لمعارض السيارات", en: "Smart CRM for Car Dealerships" },
  "feat.crm.subtitle": {
    ar: "كل عميل. متتبع. متصنف. من الاستفسار للتسليم.",
    en: "Every customer. Tracked. Classified. From inquiry to delivery.",
  },
  "feat.crm.desc": {
    ar: "الـ CRM مش بس بيحفظ أرقام تليفونات. بيقول لفريقك بالظبط: مين يكلمه دلوقتي، يقوله إيه، والعميل ده قد إيه احتمال يشتري.",
    en: "This CRM doesn't just store phone numbers. It tells your team exactly: who to call now, what to say, and how likely this customer is to buy.",
  },
  "feat.crm.hot": {
    ar: "عميل سخن — ميزانيته مناسبة، العربية موجودة، عنده بدل. ده الأول.",
    en: "Hot lead — budget fits, car available, has trade-in. Priority one.",
  },
  "feat.crm.warm": {
    ar: "عميل فاتر — مهتم بس محتاج متابعة. محتاج زيارة أو تجربة قيادة.",
    en: "Warm lead — interested but needs follow-up. Needs a visit or test drive.",
  },
  "feat.crm.cold": {
    ar: "عميل بارد — لسه بيسأل. حطه في المتابعة ومتضيعش وقت السيلز.",
    en: "Cold lead — just browsing. Queue for follow-up, don't waste sales time.",
  },
  "feat.crm.stat1": { ar: "23% معدل تحويل", en: "23% Conversion Rate" },
  "feat.crm.stat2": { ar: "أقل من دقيقة للرد", en: "Under 1 Min Response" },
  "feat.crm.stat3": { ar: "تصنيف ذكي بالـ AI", en: "AI-Powered Scoring" },

  // Feature 2: Inventory
  "feat.inv.title": { ar: "إدارة المخزون", en: "Inventory Management" },
  "feat.inv.subtitle": {
    ar: "كل عربية في معرضك — مسجلة ومتتبعة.",
    en: "Every car in your showroom — registered and tracked.",
  },
  "feat.inv.desc": {
    ar: "سجل كل العربيات بالتفاصيل الكاملة. الماركة والموديل والسنة واللون والكيلومترات والسعر وسعر الشراء. عندك 50 عربية؟ 200 عربية؟ ارفع ملف الإكسل مرة واحدة وكل العربيات هتتسجل في ثانية.",
    en: "Register all cars with full details. Make, model, year, color, mileage, price, purchase cost. 50 cars? 200? Upload one Excel file and they're all registered instantly.",
  },
  "feat.inv.available": { ar: "متاحة — جاهزة للبيع", en: "Available — Ready to sell" },
  "feat.inv.reserved": { ar: "محجوزة — عميل حاجزها", en: "Reserved — Customer holding" },
  "feat.inv.sold": { ar: "تم البيع — مربوطة بالعميل", en: "Sold — Linked to buyer" },
  "feat.inv.transit": { ar: "في الطريق — لسه واصلة", en: "In Transit — Arriving soon" },

  // Feature 3: Trade-in
  "feat.trade.title": { ar: "نظام البدل الذكي", en: "Smart Trade-in System" },
  "feat.trade.subtitle": {
    ar: "عميلك عنده عربية قديمة؟ حولها لفرصة بيع.",
    en: "Customer has an old car? Turn it into a sales opportunity.",
  },
  "feat.trade.desc": {
    ar: "40% من عملاء المعارض عندهم عربية عاوزين يبدلوها. المنصة بتتعامل مع ده أوتوماتيك. لما عميل يقول \"عندي عربية عاوز أبدلها\" — المنصة بتعمل سجل تلقائي لعربيته.",
    en: "40% of dealership customers have a car they want to trade. The platform handles this automatically. When a customer says \"I have a car to trade\" — the platform creates an automatic record.",
  },

  // Feature 4: Dashboard
  "feat.dash.title": { ar: "داشبورد الأداء", en: "Performance Dashboard" },
  "feat.dash.subtitle": {
    ar: "أرقامك الحقيقية. لحظية. من غير ما تسأل حد.",
    en: "Your real numbers. Real-time. Without asking anyone.",
  },
  "feat.dash.desc": {
    ar: "أول ما تفتح المنصة — تشوف كل حاجة في ثانية: إجمالي الإنفاق، عدد الاستفسارات، تكلفة الاستفسار، نسبة التحويل، عدد العربيات المباعة. كل رقم بيتحدث لحظياً.",
    en: "The moment you open the platform — you see everything: total spend, inquiry count, cost per lead, conversion rate, cars sold. Every number updates in real-time.",
  },

  // Feature 5: Ad Analytics
  "feat.ads.title": { ar: "تحليل الحملات الإعلانية", en: "Ad Campaign Analytics" },
  "feat.ads.subtitle": {
    ar: "كل جنيه إعلانات — عارف راح فين.",
    en: "Every ad pound — you know where it went.",
  },
  "feat.ads.desc": {
    ar: "المنصة بتسحب بيانات حملاتك من فيسبوك وجوجل أوتوماتيك. كل حملة بتشوف: اسمها، كام صرفت، كام استفسار جابت، تكلفة الاستفسار. بتعرف في ثانية أنهي حملة تزودلها ميزانية وأنهي توقفها.",
    en: "The platform pulls campaign data from Facebook & Google automatically. For each campaign: name, spend, inquiries, cost per lead. Instantly know which to scale and which to kill.",
  },

  // Feature 6: Sales Performance
  "feat.sales.title": { ar: "أداء فريق المبيعات", en: "Sales Team Performance" },
  "feat.sales.subtitle": {
    ar: "اعرف مين بيبيع ومين محتاج مساعدة — بالأرقام.",
    en: "Know who's selling and who needs help — by the numbers.",
  },
  "feat.sales.desc": {
    ar: "كل واحد في فريق السيلز عنده كارت فيه: كام استفسار استلم، كام زيارة، كام تجربة قيادة، كام صفقة قفل، نسبة التحويل. ترتيب تلقائي — اللي بيبيع أكتر فوق.",
    en: "Every salesperson has a card showing: inquiries received, visits, test drives, deals closed, conversion rate. Auto-ranked — top sellers on top.",
  },

  // Feature 7: Pipeline
  "feat.pipe.title": { ar: "قمع المبيعات", en: "Sales Pipeline" },
  "feat.pipe.subtitle": {
    ar: "شوف فين العملاء بيوقفوا — وصلحها.",
    en: "See where customers drop off — and fix it.",
  },
  "feat.pipe.desc": {
    ar: "رسم بياني واضح بيوريك كام عميل في كل مرحلة ونسبة التحويل بين كل مرحلة والتانية. القمع بيوريك بالظبط فين الفلوس بتضيع.",
    en: "A clear funnel showing how many customers are at each stage with conversion rates between them. The funnel shows exactly where money is being lost.",
  },

  // Feature 8: Smart Reports
  "feat.report.title": { ar: "التقارير الذكية", en: "Smart Reports" },
  "feat.report.subtitle": {
    ar: "تقرير أسبوعي يتكتب لوحده — في 8 سطور.",
    en: "Weekly report that writes itself — in 8 lines.",
  },
  "feat.report.desc": {
    ar: "اضغط زرار واحد. الذكاء الاصطناعي بيحلل كل بياناتك — الحملات والاستفسارات والسيلز — ويكتبلك تقرير من 8 سطور بالعامية المصرية. تقدر تنسخه وتبعته للشريك أو تطبعه PDF.",
    en: "Press one button. AI analyzes all your data — campaigns, inquiries, sales — and writes an 8-line report. Copy and send to your partner or print as PDF.",
  },

  // Feature 9: DriveMind
  "feat.mind.title": { ar: "DriveMind — مستشار الذكاء الاصطناعي", en: "DriveMind — AI Consultant" },
  "feat.mind.subtitle": {
    ar: "مستشار تسويق سيارات — شغال 24 ساعة ومش بيتأخر.",
    en: "Car marketing consultant — working 24/7 and never late.",
  },
  "feat.mind.desc": {
    ar: "DriveMind بيحلل كل بياناتك ويديك تقييم شامل من 100 درجة: أداء الحملات، جودة الاستفسارات، سرعة المبيعات، معدل الاستجابة. وبيديك تنبيهات لحظية.",
    en: "DriveMind analyzes all your data and gives a comprehensive score out of 100: campaign performance, lead quality, sales velocity, response rate. Plus real-time alerts.",
  },
  "feat.mind.score1": { ar: "أداء الحملات (25 درجة)", en: "Campaign Performance (25pts)" },
  "feat.mind.score2": { ar: "جودة الاستفسارات (25 درجة)", en: "Lead Quality (25pts)" },
  "feat.mind.score3": { ar: "سرعة المبيعات (25 درجة)", en: "Sales Velocity (25pts)" },
  "feat.mind.score4": { ar: "معدل الاستجابة (25 درجة)", en: "Response Rate (25pts)" },

  // Feature 10: WhatsApp
  "feat.wa.title": { ar: "واتساب بكبسة", en: "One-Click WhatsApp" },
  "feat.wa.subtitle": {
    ar: "من المنصة للواتساب — في ثانية.",
    en: "From platform to WhatsApp — in one second.",
  },
  "feat.wa.desc": {
    ar: "جنب كل عميل في الـ CRM فيه زرار واتساب. اضغط عليه — يفتحلك واتساب مباشرة برقم العميل جاهز. من غير ما تنسخ رقم أو تدور أو تغلط في رقم.",
    en: "Next to every customer in the CRM is a WhatsApp button. Click it — WhatsApp opens with the customer's number ready. No copying, searching, or wrong numbers.",
  },

  // ─── Target Audience ───
  "target.label": { ar: "ده لمين", en: "Who It's For" },
  "target.title": {
    ar: "اتبنى لمعارض السيارات اللي عاوزة تكبر.",
    en: "Built for Car Dealerships That Want to Grow.",
  },
  "target.1.title": { ar: "صاحب المعرض / المدير العام", en: "Dealership Owner / GM" },
  "target.1.desc": {
    ar: "بتسأل \"بعنا كام الشهر ده؟\" والإجابة بتتأخر؟ مع DriveLead هتفتح المنصة وتشوف كل رقم لحظياً. إجمالي الإنفاق، عدد الصفقات، الربح الفعلي، أداء كل واحد في الفريق. قراراتك هتكون بالداتا مش بالإحساس.",
    en: "Asking \"How many did we sell this month?\" and waiting for answers? With DriveLead, open the platform and see every number in real-time. Total spend, deals, actual profit, team performance. Decisions by data, not gut feeling.",
  },
  "target.2.title": { ar: "مدير المبيعات", en: "Sales Manager" },
  "target.2.desc": {
    ar: "عندك 5 سيلز و 200 استفسار في الشهر. مين يتعامل مع مين؟ مين بيقفل ومين مش بيقفل؟ DriveLead بيوزع الاستفسارات أوتوماتيك، بيتابع أداء كل واحد بالأرقام، وبيقولك مين يستاهل مكافأة ومين محتاج تدريب.",
    en: "You have 5 salespeople and 200 inquiries a month. Who handles whom? Who's closing and who's not? DriveLead distributes inquiries automatically, tracks everyone's performance, and tells you who deserves a bonus and who needs training.",
  },
  "target.3.title": { ar: "السيلز", en: "Sales Rep" },
  "target.3.desc": {
    ar: "بدل ما تدور في 5 أماكن على أرقام العملاء — كل عملاءك في مكان واحد. تعرف العميل عاوز إيه وميزانيته كام. تضغط زرار تكلمه واتساب. تحركه من مرحلة للتانية. تركز على البيع — الباقي المنصة بتعمله.",
    en: "Instead of searching 5 places for customer numbers — all your customers in one place. Know what they want and their budget. Click to WhatsApp them. Move them stage to stage. Focus on selling — the platform handles the rest.",
  },
  "target.4.title": { ar: "مدير التسويق", en: "Marketing Manager" },
  "target.4.desc": {
    ar: "بتصرف على إعلانات ومش عارف أنهي حملة بتجيب عملاء حقيقيين وأنهي بتحرق فلوس؟ DriveLead بيربط كل جنيه إعلانات بالنتيجة الفعلية. مش بس كام استفسار — كام صفقة اتقفلت من الحملة دي.",
    en: "Spending on ads without knowing which campaign brings real buyers and which burns money? DriveLead links every ad pound to actual results. Not just inquiries — how many deals closed from that campaign.",
  },

  // ─── Integrations ───
  "int.title": {
    ar: "بيشتغل مع كل المنصات اللي بتستخدمها",
    en: "Works With Every Platform You Use",
  },
  "int.subtitle": {
    ar: "كل المصادر بتنزل في مكان واحد — أوتوماتيك.",
    en: "All sources land in one place — automatically.",
  },

  // ─── Metrics ───
  "metrics.title": {
    ar: "أرقام من معارض حقيقية.",
    en: "Numbers from Real Dealerships.",
  },
  "metrics.1v": { ar: "40%", en: "40%" },
  "metrics.1l": { ar: "انخفاض في تكلفة الاستفسار", en: "Lower Cost Per Lead" },
  "metrics.2v": { ar: "3x", en: "3x" },
  "metrics.2l": { ar: "سرعة الرد على العملاء", en: "Faster Customer Response" },
  "metrics.3v": { ar: "2x", en: "2x" },
  "metrics.3l": { ar: "زيادة في معدل إغلاق الصفقات", en: "Higher Deal Close Rate" },
  "metrics.4v": { ar: "<1", en: "<1" },
  "metrics.4l": { ar: "دقيقة متوسط وقت الاستجابة", en: "Minute Avg. Response Time" },
  "metrics.5v": { ar: "100%", en: "100%" },
  "metrics.5l": { ar: "رؤية على أداء الفريق والحملات", en: "Visibility on Team & Campaign Performance" },

  // ─── Testimonials ───
  "test.title": { ar: "شهادات العملاء", en: "Client Testimonials" },
  "test.1.quote": {
    ar: "كنا بنضيع نص الاستفسارات عشان السيلز مش بيلحق يرد. دلوقتي كل استفسار بينزل أوتوماتيك والسيلز بيرد في أقل من دقيقة. المبيعات زادت 60% في أول شهرين.",
    en: "We were losing half our inquiries because sales couldn't respond fast enough. Now every inquiry lands automatically and sales responds in under a minute. Sales increased 60% in the first two months.",
  },
  "test.1.name": { ar: "أحمد خالد", en: "Ahmed Khaled" },
  "test.1.role": { ar: "صاحب معرض النيل للسيارات", en: "Owner, Al-Nil Car Showroom" },
  "test.2.quote": {
    ar: "أول مرة أعرف بالظبط أنهي حملة بتجيبلي عملاء بيشتروا فعلاً. وقفت 3 حملات كانت بتحرق فلوس وحولت الميزانية للحملة اللي شغالة. وفرت 40% من ميزانية الإعلانات.",
    en: "First time I knew exactly which campaign brings buyers who actually purchase. Stopped 3 campaigns burning money and redirected budget to what works. Saved 40% of ad budget.",
  },
  "test.2.name": { ar: "سارة مصطفى", en: "Sara Mostafa" },
  "test.2.role": { ar: "مديرة تسويق، معارض الصفوة", en: "Marketing Manager, Al-Safwa Showrooms" },
  "test.3.quote": {
    ar: "الداشبورد غيرت حياتي. بفتح الموبايل الصبح وبعرف كل حاجة — كام استفسار دخل أمبارح، مين رد ومين لأ، كام صفقة اتقفلت. من غير ما أسأل حد.",
    en: "The dashboard changed my life. I open my phone in the morning and know everything — how many inquiries came yesterday, who responded and who didn't, how many deals closed. Without asking anyone.",
  },
  "test.3.name": { ar: "عمر فاروق", en: "Omar Farouk" },
  "test.3.role": { ar: "مدير عام، معارض المستقبل", en: "General Manager, Al-Mostaqbal Showrooms" },

  // ─── Pricing ───
  "price.title": { ar: "ابدأ مجاناً. كبّر لما تحتاج.", en: "Start Free. Scale When You Need." },
  "price.noContract": { ar: "من غير عقود طويلة — ابدأ ووقف في أي وقت.", en: "No long contracts — start and stop anytime." },

  "price.free.name": { ar: "المجانية", en: "Free" },
  "price.free.price": { ar: "0 جنيه/شهر", en: "0 EGP/mo" },
  "price.free.desc": { ar: "مناسبة لمعرض صغير بيبدأ.", en: "Perfect for a small dealership starting out." },
  "price.free.f1": { ar: "حتى 50 استفسار شهرياً", en: "Up to 50 inquiries/month" },
  "price.free.f2": { ar: "مستخدم واحد", en: "1 User" },
  "price.free.f3": { ar: "CRM أساسي", en: "Basic CRM" },
  "price.free.f4": { ar: "داشبورد", en: "Dashboard" },
  "price.free.f5": { ar: "واتساب بكبسة", en: "One-click WhatsApp" },

  "price.pro.name": { ar: "الاحترافية", en: "Professional" },
  "price.pro.price": { ar: "تواصل معنا", en: "Contact Us" },
  "price.pro.desc": { ar: "مناسبة لمعرض متوسط عنده 3-10 سيلز.", en: "For a mid-size dealership with 3-10 salespeople." },
  "price.pro.f1": { ar: "استفسارات غير محدودة", en: "Unlimited inquiries" },
  "price.pro.f2": { ar: "حتى 10 مستخدمين", en: "Up to 10 users" },
  "price.pro.f3": { ar: "كل صفحات المنصة", en: "All platform features" },
  "price.pro.f4": { ar: "ربط فيسبوك وجوجل أوتوماتيك", en: "Auto Facebook & Google sync" },
  "price.pro.f5": { ar: "إدارة المخزون", en: "Inventory management" },
  "price.pro.f6": { ar: "نظام البدل", en: "Trade-in system" },
  "price.pro.f7": { ar: "التقارير الذكية بالـ AI", en: "AI-powered smart reports" },
  "price.pro.f8": { ar: "DriveMind", en: "DriveMind AI" },
  "price.pro.f9": { ar: "دعم واتساب", en: "WhatsApp support" },

  "price.ent.name": { ar: "المعارض الكبيرة", en: "Enterprise" },
  "price.ent.price": { ar: "تواصل معنا", en: "Contact Us" },
  "price.ent.desc": { ar: "مناسبة لمجموعة معارض أو وكيل.", en: "For multi-location dealerships or distributors." },
  "price.ent.f1": { ar: "كل حاجة في الاحترافية", en: "Everything in Professional" },
  "price.ent.f2": { ar: "مستخدمين غير محدودين", en: "Unlimited users" },
  "price.ent.f3": { ar: "فروع متعددة", en: "Multi-branch support" },
  "price.ent.f4": { ar: "تدريب الفريق", en: "Team training" },
  "price.ent.f5": { ar: "أكاونت مانجر مخصص", en: "Dedicated account manager" },
  "price.ent.f6": { ar: "تخصيص حسب الطلب", en: "Custom development" },
  "price.ent.f7": { ar: "أولوية في الدعم", en: "Priority support" },

  "price.cta": { ar: "ابدأ مجاناً", en: "Start Free" },
  "price.ctaPro": { ar: "تواصل معنا", en: "Contact Us" },
  "price.popular": { ar: "الأكثر طلباً", en: "Most Popular" },

  // ─── FAQ ───
  "faq.title": { ar: "أسئلة شائعة", en: "Frequently Asked Questions" },
  "faq.1.q": { ar: "هل محتاج خبرة تقنية عشان أستخدم المنصة؟", en: "Do I need technical experience to use the platform?" },
  "faq.1.a": { ar: "لا خالص. المنصة سهلة زي الفيسبوك. وبندرب فريقك عليها في جلسة واحدة.", en: "Not at all. The platform is as easy as Facebook. We train your team in one session." },
  "faq.2.q": { ar: "البيانات بتاعتي آمنة؟", en: "Is my data safe?" },
  "faq.2.a": { ar: "أكيد. كل معرض بياناته منفصلة تماماً عن أي معرض تاني. ومحدش يقدر يشوف بيانات غيره.", en: "Absolutely. Each dealership's data is completely isolated. No one can see another's data." },
  "faq.3.q": { ar: "هل بتشتغل على الموبايل؟", en: "Does it work on mobile?" },
  "faq.3.a": { ar: "أيوه. المنصة بتفتح من أي موبايل أو تابلت أو كمبيوتر. مفيش تطبيق محتاج تنزله — بتفتح من المتصفح.", en: "Yes. The platform opens on any phone, tablet, or computer. No app to download — it runs in the browser." },
  "faq.4.q": { ar: "لو عندي عربيات كتير — أقدر أرفعهم مرة واحدة؟", en: "Can I upload many cars at once?" },
  "faq.4.a": { ar: "أيوه. حضر ملف إكسل وارفعه من صفحة المخزون — كل العربيات هتتسجل في ثانية.", en: "Yes. Prepare an Excel file and upload it from the inventory page — all cars register instantly." },
  "faq.5.q": { ar: "هل بتدعم العربيات المستعملة والجديدة؟", en: "Does it support new and used cars?" },
  "faq.5.a": { ar: "أيوه. الاتنين. كل عربية بتحدد حالتها: جديدة، مستعملة، أو معتمدة مستعملة.", en: "Yes, both. Each car has its condition: new, used, or certified pre-owned." },
  "faq.6.q": { ar: "إيه المنصات اللي بتسحب منها الاستفسارات؟", en: "Which platforms does it pull inquiries from?" },
  "faq.6.a": { ar: "فيسبوك وإنستجرام (أوتوماتيك)، جوجل (أوتوماتيك)، OLX و ContactCars و Hatla2ee (يدوي أو بالربط). وكمان تليفون وزيارة معرض.", en: "Facebook & Instagram (auto), Google (auto), OLX, ContactCars & Hatla2ee (manual or linked). Plus phone calls and walk-ins." },
  "faq.7.q": { ar: "إيه الفرق بينكم وبين أي CRM تاني؟", en: "What makes you different from other CRMs?" },
  "faq.7.a": { ar: "DriveLead مش CRM عام. ده نظام متخصص لمعارض السيارات في مصر. المراحل مصممة لدورة بيع العربيات. التقارير بتفهم سوق السيارات. الـ AI بيتكلم بلغة المعارض.", en: "DriveLead isn't a generic CRM. It's a system specialized for Egyptian car dealerships. Stages are designed for car sales cycles. Reports understand the car market. AI speaks dealership language." },
  "faq.8.q": { ar: "لو عندي أكتر من فرع؟", en: "What if I have multiple branches?" },
  "faq.8.a": { ar: "الباقة الكبيرة بتدعم فروع متعددة — كل فرع بياناته لوحده والمدير بيشوف الكل.", en: "The Enterprise plan supports multiple branches — each branch has its own data and managers see everything." },
  "faq.9.q": { ar: "ممكن أجرب قبل ما أدفع؟", en: "Can I try before paying?" },
  "faq.9.a": { ar: "أيوه. الباقة المجانية موجودة عشان تجرب. ولو حبيت عرض على المنصة — احجز مكالمة وهنوريك كل حاجة.", en: "Yes. The free plan is there to try. And if you want a demo — book a call and we'll show you everything." },

  // ─── Final CTA ───
  "cta.label": { ar: "ابدأ دلوقتي", en: "Start Now" },
  "cta.title": {
    ar: "معرضك يستاهل يشتغل بذكاء.",
    en: "Your Dealership Deserves to Work Smart.",
  },
  "cta.subtitle": {
    ar: "خلاص متخمنش. ابدأ تقفل صفقات.",
    en: "Stop guessing. Start closing deals.",
  },
  "cta.desc": {
    ar: "احجز مكالمة مجانية 30 دقيقة. هنفهم معرضك ونوريك إزاي DriveLead هيغير طريقة شغلك.",
    en: "Book a free 30-minute call. We'll understand your dealership and show you how DriveLead will transform your workflow.",
  },
  "cta.btn1": { ar: "احجز مكالمتك المجانية", en: "Book Your Free Call" },
  "cta.btn2": { ar: "كلمنا على واتساب", en: "Message Us on WhatsApp" },
  "cta.trust1": { ar: "من غير أي التزام", en: "No commitment" },
  "cta.trust2": { ar: "30 دقيقة بس", en: "Just 30 minutes" },
  "cta.trust3": { ar: "تحليل مجاني لحملاتك الحالية", en: "Free analysis of your current campaigns" },

  // ─── Footer ───
  "foot.tagline": { ar: "DriveLead — نظام ذكي لمعارض السيارات", en: "DriveLead — AI-Powered System for Car Dealerships" },
  "foot.home": { ar: "الرئيسية", en: "Home" },
  "foot.about": { ar: "عنّا", en: "About" },
  "foot.platform": { ar: "المنصة", en: "Platform" },
  "foot.pricing": { ar: "الأسعار", en: "Pricing" },
  "foot.contact": { ar: "تواصل معنا", en: "Contact" },
  "foot.wa": { ar: "تواصل عبر واتساب", en: "Contact via WhatsApp" },
  "foot.copy": { ar: "© 2026 DriveLead. جميع الحقوق محفوظة.", en: "© 2026 DriveLead. All rights reserved." },
  "foot.location": { ar: "القاهرة، مصر", en: "Cairo, Egypt" },
};

export default dl;

export function useDriveLeadT(lang: "en" | "ar") {
  return (key: string): string => {
    const entry = dl[key];
    if (!entry) return key;
    return entry[lang] || entry.en || key;
  };
}
