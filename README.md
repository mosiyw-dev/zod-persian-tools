<div align="center">

# 🇮🇷 Zod Persian Tools

**کامل‌ترین جعبه‌ابزار اعتبارسنجی و اصلاح داده‌های ایرانی برای Zod**

[![npm version](https://img.shields.io/npm/v/zod-persian-tools?color=3b82f6&label=npm+package)](https://www.npmjs.com/package/zod-persian-tools)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![Downloads](https://img.shields.io/npm/dt/zod-persian-tools?color=green)](https://www.npmjs.com/package/zod-persian-tools)

<p align="center">
  <a href="#-ویژگیها">ویژگی‌ها</a> •
  <a href="#-نصب">نصب</a> •
  <a href="#-راهنمای-استفاده">راهنمای استفاده</a> •
  <a href="#-لیست-متدها-api">لیست متدها</a> •
  <a href="#-مشارکت">مشارکت</a>
</p>

</div>

---

## 🧐 چرا این پکیج؟

خسته نشدی از اینکه برای هر پروژه بری سراغ `Regex`های قدیمی برای چک کردن **کد ملی** یا **شماره موبایل**؟
این پکیج یک **اکستنشن (Extension)** برای `Zod` هست که دو تا کار مهم انجام میده:

1.  **Validation (اعتبارسنجی):** بررسی میکنه دیتای ورودی (مثل الگوریتم کد ملی یا کارت بانکی) درست باشه.
2.  **Sanitization (تمیزکاری):** دیتای کثیف رو تمیز میکنه! (مثلاً اعداد فارسی رو انگلیسی میکنه، کاما رو از قیمت حذف میکنه و...).

> **شعار ما:** بنویس و لذت ببر، بقیه‌ش با ما! ☕

---

## ✨ ویژگی‌ها

* ✅ **کد ملی & شناسه ملی:** بررسی دقیق فرمت و الگوریتم ریاضی.
* 💳 **کارت بانکی:** بررسی الگوریتم Luhn و تشخیص نام بانک.
* 📱 **موبایل:** تشخیص اپراتور (همراه اول، ایرانسل، رایتل و...).
* 🧹 **فارسی‌ساز هوشمند:** تبدیل خودکار اعداد فارسی/عربی (`۱۲۳`) به انگلیسی (`123`) و اصلاح حروف (`ی` و `ک`).
* 💰 **قیمت:** دریافت قیمت فرمت‌دهی شده (`1,000,000`) و تبدیل به `Number` خالص.

---

## 📦 نصب

خیلی ساده کنار پکیج `zod` نصبش کنید:

```bash
# npm
npm install zod zod-persian-tools

# pnpm (پیشنهادی)
pnpm add zod zod-persian-tools

# yarn
yarn add zod zod-persian-tools
```

## 🚀 راهنمای استفاده
۱. استفاده با Zod (پیشنهادی)
بهترین روش استفاده، ترکیب کردنش با اسکیمای Zod هست. خودش هم ولیدیت میکنه هم تمیزکاری.

```bash
import { z } from "zod";
import { ir } from "zod-persian-tools";

const UserSchema = z.object({
  // اعتبارسنجی کد ملی
  nationalCode: ir.nationalId("کد ملی اشتباه است"),

  // فقط شماره‌های ایرانسل رو قبول میکنه!
  phoneNumber: ir.mobileOperator("irancell", "فقط خط ایرانسل مجاز است"),

  // کارت بانکی (مثلاً فقط بانک ملت)
  // نکته: خط تیره و فاصله رو خودش حذف میکنه
  cardNumber: ir.bankCardFrom("mellat", "لطفا کارت ملت وارد کنید"),

  // تبدیل قیمت: کاربر میزنه "۱,۵۰۰,۰۰۰" -> شما عدد 1500000 میگیرید
  amount: ir.price(),
  
  // کد پستی ۱۰ رقمی
  postalCode: ir.postalCode(),
});

۲. استفاده بدون Zod (توابع کمکی)
اگه نخواستی از Zod استفاده کنی، می‌تونی توابع رو مستقیم صدا بزنی:

TypeScript

import { utils } from "zod-persian-tools";

// بررسی درستی کد ملی
if (utils.isNationalId("0071234567")) {
  console.log("Valid!");
}

// دریافت نام بانک از روی شماره کارت
const bankName = utils.getBankInfo("603799...").name;
console.log(bankName); // "بانک ملی ایران"
```

## 🛠 لیست متدها (API)

متد,توضیحات,ورودی نمونه,خروجی نهایی
ir.nationalId(),اعتبارسنجی کد ملی,"""0012345678""",string
ir.shenaseMelli(),شناسه ملی حقوقی,"""1010...""",string
ir.mobile(),موبایل (تمام اپراتورها),"""۰۹۱۲...""","""0912..."""
ir.mobileOperator(op),موبایل با اپراتور خاص,"""0935...""",string
ir.bankCard(),شماره کارت (همه بانک‌ها),"""6037-99...""","""603799..."""
ir.bankCardFrom(bank),کارت بانک خاص,"""6104...""",string
ir.sheba(),شماره شبا (با/بدون IR),"""IR120...""",string
ir.price(),قیمت (حذف کاما + تبدیل),"""1,000""",number
ir.postalCode(),کد پستی ۱۰ رقمی,"""1234567890""",string
ir.jalaliDate(),تاریخ شمسی,"""1402/01/01""",string
ir.passport(),شماره گذرنامه,"""A12345678""",string


## ❤️ مشارکت (Contribute)

این پروژه Open Source هست و متعلق به جامعه برنامه‌نویسان ایران.

اگه باگی پیدا کردی، Issue بزن.

اگه ایده جدیدی داری، Pull Request بفرست.

اگه خوشت اومد، بهمون Star ⭐️ بده!