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

🚀 راهنمای استفاده
۱. استفاده با Zod (پیشنهادی)
بهترین روش استفاده، ترکیب کردنش با اسکیمای Zod هست. خودش هم ولیدیت میکنه هم تمیزکاری.

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

📚 لیست متدها (API)
<h3>👤 احراز هویت (Identity)</h3> <table width="100%"> <thead> <tr> <th width="25%">متد (Method)</th> <th width="45%">توضیحات</th> <th width="30%">خروجی نهایی</th> </tr> </thead> <tbody> <tr> <td><code>ir.nationalId()</code></td> <td>بررسی صحت ساختار و الگوریتم <strong>کد ملی</strong> (۱۰ رقم)</td> <td><code>string</code> (English Digits)</td> </tr> <tr> <td><code>ir.shenaseMelli()</code></td> <td>بررسی <strong>شناسه ملی</strong> اشخاص حقوقی و شرکت‌ها</td> <td><code>string</code></td> </tr> <tr> <td><code>ir.passport()</code></td> <td>بررسی فرمت <strong>گذرنامه</strong> (شروع با حرف انگلیسی + عدد)</td> <td><code>string</code></td> </tr> </tbody> </table>

<h3>💳 مالی و بانکی (Finance)</h3> <table width="100%"> <thead> <tr> <th width="25%">متد (Method)</th> <th width="45%">توضیحات</th> <th width="30%">خروجی نهایی</th> </tr> </thead> <tbody> <tr> <td><code>ir.bankCard()</code></td> <td>بررسی الگوریتم Luhn کارت بانکی (حذف خودکار فاصله/خط‌تیره)</td> <td><code>string</code> (16 Digits)</td> </tr> <tr> <td><code>ir.bankCardFrom(bank)</code></td> <td>اعتبارسنجی کارت متعلق به <strong>بانک خاص</strong> (مثلاً: <code>'mellat'</code>)</td> <td><code>string</code></td> </tr> <tr> <td><code>ir.sheba()</code></td> <td>بررسی صحت <strong>شماره شبا</strong> (پشتیبانی با/بدون IR)</td> <td><code>string</code> (With IR)</td> </tr> <tr> <td><code>ir.price()</code></td> <td>حذف کاما (<code>,</code>) و تبدیل اعداد فارسی به فرمت عددی</td> <td><code>number</code></td> </tr> </tbody> </table>

<h3>📞 تماس و ارتباطات (Contact)</h3> <table width="100%"> <thead> <tr> <th width="25%">متد (Method)</th> <th width="45%">توضیحات</th> <th width="30%">خروجی نهایی</th> </tr> </thead> <tbody> <tr> <td><code>ir.mobile()</code></td> <td>بررسی شماره موبایل ایران (فرمت <code>09xxxxxxxxx</code>)</td> <td><code>string</code></td> </tr> <tr> <td><code>ir.mobileOperator(op)</code></td> <td>بررسی موبایل با محدودیت <strong>اپراتور</strong>


<code>'mci'</code>, <code>'irancell'</code>, <code>'rightel'</code>, <code>'shatel'</code></td> <td><code>string</code></td> </tr> <tr> <td><code>ir.landline()</code></td> <td>بررسی تلفن ثابت (با پیش‌شماره استان)</td> <td><code>string</code></td> </tr> <tr> <td><code>ir.postalCode()</code></td> <td>بررسی کد پستی ۱۰ رقمی</td> <td><code>string</code></td> </tr> </tbody> </table>

<h3>🛠 ابزارهای کاربردی (Utils)</h3> <table width="100%"> <thead> <tr> <th width="25%">متد (Method)</th> <th width="45%">توضیحات</th> <th width="30%">خروجی نهایی</th> </tr> </thead> <tbody> <tr> <td><code>ir.jalaliDate()</code></td> <td>بررسی فرمت صحیح تاریخ شمسی (<code>1402/01/01</code>)</td> <td><code>string</code></td> </tr> <tr> <td><code>ir.persianChars()</code></td> <td>اطمینان از اینکه ورودی فقط شامل <strong>حروف فارسی</strong> است.</td> <td><code>string</code></td> </tr> <tr> <td><code>ir.vehiclePlate()</code></td> <td>بررسی فرمت استاندارد <strong>پلاک خودرو</strong></td> <td><code>string</code></td> </tr> </tbody> </table>

❤️ مشارکت (Contribute)
این پروژه Open Source هست و متعلق به جامعه برنامه‌نویسان ایران.

اگه باگی پیدا کردی، Issue بزن.

اگه ایده جدیدی داری، Pull Request بفرست.

اگه خوشت اومد، بهمون Star ⭐️ بده!