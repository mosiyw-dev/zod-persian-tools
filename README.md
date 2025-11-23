# 🧰 جعبه‌ابزار ایرانی Zod (Zod Persian Tools)

[![npm version](https://img.shields.io/npm/v/zod-persian-tools?color=blue)](https://www.npmjs.com/package/zod-persian-tools)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

آقا خسته نشدی انقدر برای اعتبارسنجی **کد ملی**، **شماره کارت** و **موبایل** هی رفتی از پروژه‌های قبلیت Regex کپی-پیست کردی؟ 🤯

این پکیج اومده که نجاتت بده! یه اکستنشن ترتمیز برای **Zod** که همه چی رو برات هندل می‌کنه. فقط ولیدیت نمی‌کنه، بلکه دیتای کاربر رو **تمیز** هم می‌کنه (اعداد فارسی رو انگلیسی می‌کنه، "ی" و "ک" عربی رو درست می‌کنه و...).

خلاصه که: **بنویس و لذت ببر!** ☕

---

## ✨ ویژگی‌های خفن

- ✅ **کد ملی & شناسه ملی:** هم فرمت رو چک می‌کنه، هم الگوریتم ریاضیش رو.
- 💳 **کارت بانکی:** تشخیص می‌ده کارت معتبره یا نه. حتی می‌تونی بگی "فقط کارت بانک ملت رو قبول کن"!
- 📱 **موبایل:** تشخیص اپراتور (ایرانسل، همراه اول، رایتل و شاتل).
- 🧹 **جاروبرقی دیتا (Sanitizer):** کاربر اگه با کیبورد فارسی عدد بنویسه (`۱۲۳`) یا "ی" عربی بزنه، خودکار تبدیلش می‌کنه به فرمت استاندارد دیتابیس.
- 💰 **قیمت هوشمند:** کاربر می‌نویسه `1,200,000`، تو توی دیتابیس `1200000` (Number) تحویل می‌گیری.

---

## 📦 نصب

خیلی شیک و مجلسی نصبش کن (کنار Zod):

```bash
# اگه npm و یارانش رو داری:
npm install zod zod-persian-tools

# اگه مثل من pnpm بازی (پیشنهادی):
pnpm add zod zod-persian-tools

# اگه yarn داری:
yarn add zod zod-persian-tools
🚀 چطوری استفاده کنیم؟خیلی ساده! ir رو ایمپورت کن و بذارش تنگِ اسکیمای Zod.TypeScriptimport { z } from "zod";
import { ir } from "zod-persian-tools"; // اینه!

const SignupSchema = z.object({
  // ۱. کد ملی (هم ۱۰ رقم بودنش چک میشه هم الگوریتمش)
  nationalCode: ir.nationalId("جان من کد ملی درست وارد کن"),

  // ۲. موبایل (اینجا گفتیم فقط خط‌های ایرانسل رو میخوایم!)
  phone: ir.mobileOperator("irancell", "داداش فقط خط ایرانسل قبوله"),

  // ۳. کارت بانکی (مثلا فقط بانک ملت)
  // خودش خط تیره و فاصله رو حذف میکنه، نگران نباش
  cardNumber: ir.bankCardFrom("mellat", "فقط کارت ملت بده"),
  
  // ۴. قیمت (جادوی اصلی!)
  // کاربر میزنه: "۱,۵۰۰,۰۰۰" -> خروجی میشه: 1500000 (عدد خالص)
  price: ir.price(),

  // ۵. کد پستی
  postalCode: ir.postalCode(),
});
استفاده بدون Zod (Helper Functions)اگه Zod نداری یا فقط میخوای یه تابع رو جدا صدا بزنی، مشکلی نیست. از utils استفاده کن:TypeScriptimport { utils } from "zod-persian-tools";

// چک کردن کد ملی
if (utils.isNationalId("1234567890")) {
  console.log("حله!");
}

// گرفتن اسم بانک از روی شماره کارت
const bankName = utils.getBankInfo("610433...").name; 
console.log(bankName); // خروجی: "بانک ملت"
🛠 لیست کامل متدهامتدتوضیحاتمثال ورودیخروجی نهاییir.nationalId()کد ملی"001..."Stringir.shenaseMelli()شناسه ملی شرکت‌ها"101..."Stringir.mobile()موبایل (همه اپراتورها)"۰۹۱۲...""0912..."ir.mobileOperator(op)موبایل با اپراتور خاص"0935..."Stringir.bankCard()شماره کارت (Luhn Check)"6037-99...""603799..."ir.bankCardFrom(bank)کارت بانک خاص"6104..."Stringir.sheba()شماره شبا (با/بدون IR)"IR120..."Stringir.price()تبدیل قیمت (حذف کاما)"1,000"1000 (Number)ir.postalCode()کد پستی"123..."Stringir.passport()گذرنامه"A123..."Stringir.jalaliDate()تاریخ شمسی"1402/01/01"String❤️ مشارکت (Contribute)آقا این پروژه اوپن‌سورسه و متعلق به خودتونه. اگه باگی دیدی، بانکی جا مونده بود یا ایده خفنی داشتی، دمت گرم Pull Request بزن یا ایشو (Issue) باز کن.📄 لایسنسMIT. حالشو ببر.