# إزاي طلبات الفورم توصلك

فيه حاجتين، وكل واحدة شغالة لوحدها:
- **الجزء الأول:** كل طلب يوصلك **رسالة واتساب** أوتوماتيك (حوالي ٢٠ دقيقة، مرة واحدة).
- **الجزء التاني:** كل طلب يتسجّل في **Google Sheet** ويجيلك **إيميل** (١٠ دقايق).

---

# الجزء الأول: رسالة واتساب مع كل طلب

الرسالة بتتبعت من **واتساب نفسه** (WhatsApp Cloud API بتاعة Meta)، من غير أي خدمة وسيطة. محتاج تعمل الإعداد ده **مرة واحدة**، وبعدها كله متغيرات في Vercel.

## ١) اعمل App على Meta
1. افتح [developers.facebook.com/apps](https://developers.facebook.com/apps) وادخل بحساب فيسبوك بتاعك.
2. **Create App**. اختار **Other**، وبعدين **Business**، وسمّيه مثلًا «Website Leads».
3. في صفحة الـApp، جنب **WhatsApp** دوس **Set up**، واختار (أو اعمل) Business Account.

## ٢) هات رقم الإرسال ورقمك
1. من القايمة: **WhatsApp ← API Setup**.
2. Meta بتديك **رقم تجريبي مجاني** بيبعت منه. انسخ الرقم اللي مكتوب جنب **Phone number ID** (أرقام طويلة).
3. تحت **To**، دوس **Manage phone number list**، وضيف رقمك `+201148627137`، ودخّل الكود اللي هيجيلك على الواتساب.

## ٣) اعمل مفتاح دايم (Token)
المفتاح اللي بيظهر في صفحة API Setup بيخلص بعد ٢٤ ساعة، فمحتاج واحد دايم:
1. افتح [business.facebook.com/settings](https://business.facebook.com/settings) ← **Users ← System users ← Add**. سمّيه «website» وخليه **Admin**.
2. دوس **Assign assets**: اختار الـApp (Full control)، واختار الـWhatsApp account (Full control).
3. دوس **Generate new token**، واختار الـApp، و**Token expiration: Never**، وعلّم على:
   - `whatsapp_business_messaging`
   - `whatsapp_business_management`
4. انسخ الـToken واحفظه في مكان آمن (مش هيظهر تاني).

## ٤) اعمل قالب الرسالة (Template)
واتساب مابيسمحش إن رقم شركة يبعتلك رسالة عادية إلا لو إنت كلمته في آخر ٢٤ ساعة. القالب بيخلي الرسالة توصل في أي وقت:
1. افتح [WhatsApp Manager](https://business.facebook.com/wa/manage/message-templates/) ← **Create template**.
2. **Category:** Utility. **Name:** `new_lead`. **Language:** Arabic.
3. في **Body** الصق ده بالظبط:
   ```
   📩 طلب جديد من الموقع
   الاسم: {{1}}
   الإيميل: {{2}}
   الشركة: {{3}}
   الرسالة: {{4}}
   الصفحة: {{5}}
   ```
4. لو طلب أمثلة للمتغيرات، اكتب أي حاجة (مثلًا: أحمد، a@b.com، شركة، عايز نظام، /).
5. **Submit**. الموافقة غالبًا بتاخد دقايق.

## ٥) حط المتغيرات في Vercel
1. افتح المشروع على [vercel.com](https://vercel.com) ← **Settings ← Environment Variables**.
2. ضيف (والبيئة **Production**):
   - `WHATSAPP_TOKEN` = الـToken الدايم من خطوة ٣.
   - `WHATSAPP_PHONE_NUMBER_ID` = الرقم من خطوة ٢.
   - `WHATSAPP_TEMPLATE` = `new_lead`
   - `WHATSAPP_NOTIFY_TO` = رقمك بالأرقام بس، زي `201148627137` (لو هو نفس الرقم ده، مش لازم تضيفه).
3. روح **Deployments**، ودوس على الـ⋯ جنب آخر نشر ← **Redeploy**.

## ٦) جرّب
ابعت طلب من الفورم، وفي خلال ثواني هتجيلك رسالة «📩 طلب جديد من الموقع» فيها الاسم والإيميل والشركة والرسالة.

**لو ماوصلتش:** في Vercel افتح **Logs** ودوّر على `WhatsApp notify failed`، هتلاقي جنبها السبب اللي Meta رجّعته.

> ملاحظات:
> - الرقم التجريبي بيبعت لحد ٥ أرقام إنت مسجّلها، وده كفاية ليك. لو عايز الرسايل تيجي من رقم باسمك، ضيف رقم حقيقي من **API Setup ← Add phone number**، وغيّر `WHATSAPP_PHONE_NUMBER_ID`.
> - Meta ممكن تحاسب على رسايل القوالب حسب البلد، والتكلفة غالبًا صغيرة. تفاصيلها في [صفحة الأسعار](https://developers.facebook.com/docs/whatsapp/pricing).

---

# الجزء التاني: Google Sheet + إيميل

الخطوات دي مش محتاجة أي برنامج غير حساب جوجل.

## ١) اعمل الشيت
1. افتح [sheets.new](https://sheets.new) (هيفتح شيت جديد فاضي).
2. سمّيه مثلًا «طلبات الموقع».

## ٢) حط الكود
1. من فوق: **Extensions ← Apps Script**.
2. امسح أي كود موجود، والصق الكود اللي في الملف `docs/leads-apps-script.gs`.
3. في أول الكود، غيّر `PUT-THE-SAME-SECRET-HERE` لكلمة سر من اختيارك (حروف وأرقام إنجليزي، ١٥ حرف مثلًا). **احفظها عندك**، هتحتاجها في خطوة ٤.
4. اتأكد إن الإيميل في `NOTIFY_EMAIL` هو الإيميل اللي عايز الإشعارات تيجي عليه.
5. دوس **Save** (أيقونة الديسك).

## ٣) انشر الكود
1. فوق على اليمين: **Deploy ← New deployment**.
2. جنب «Select type» دوس على الترس ⚙️ واختار **Web app**.
3. اختار:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. دوس **Deploy**، وجوجل هيطلب منك تسمح بالصلاحيات. وافق (لو ظهرتلك «Google hasn't verified this app» دوس **Advanced** وبعدين **Go to…**).
5. هيظهرلك **Web app URL** بيخلص بـ`/exec`. انسخه.

## ٤) حط الرابط في Vercel
1. افتح المشروع على [vercel.com](https://vercel.com) ← **Settings ← Environment Variables**.
2. ضيف متغيرين (والبيئة **Production**):
   - `LEAD_WEBHOOK_URL` = الرابط اللي نسخته (بتاع `/exec`).
   - `LEAD_WEBHOOK_SECRET` = كلمة السر اللي كتبتها في الكود.
3. روح **Deployments**، ودوس على الـ⋯ جنب آخر نشر ← **Redeploy** (عشان المتغيرات الجديدة تشتغل).

## ٥) جرّب
ابعت طلب من الفورم في الموقع. في خلال ثواني هتلاقي:
- سطر جديد في شيت اسمه **Leads**.
- إيميل عنوانه «طلب جديد من الموقع».

لو ماحصلش، راجع إن كلمة السر هي هي في الكود وفي Vercel، وإنك عملت Redeploy.

> لو عدّلت الكود بعد كده: **Deploy ← Manage deployments ← ✏️ ← Version: New version ← Deploy**. الرابط بيفضل زي ما هو.
