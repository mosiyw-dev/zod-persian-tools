import { z } from "zod";

// ==========================================
// 1. DATASETS (دیتابیس کامل بانک‌ها)
// ==========================================

interface BankDetails {
  code: string; // نام انگلیسی (اسلاگ)
  name: string; // نام فارسی
}

// لیست کامل پیش‌شماره کارت‌های بانکی ایران
const BANKS: Record<string, BankDetails> = {
  "603799": { code: "melli", name: "بانک ملی ایران" },
  "589210": { code: "sepah", name: "بانک سپه" },
  "627648": { code: "tose_e_saderat", name: "بانک توسعه صادرات" },
  "627961": { code: "sanat_o_madan", name: "بانک صنعت و معدن" },
  "603770": { code: "keshavarzi", name: "بانک کشاورزی" },
  "628023": { code: "maskan", name: "بانک مسکن" },
  "627760": { code: "post_bank", name: "پست بانک ایران" },
  "502908": { code: "tose_e_taavon", name: "بانک توسعه تعاون" },
  "627412": { code: "eghtesad_novin", name: "بانک اقتصاد نوین" },
  "622106": { code: "parsian", name: "بانک پارسیان" },
  "502229": { code: "pasargad", name: "بانک پاسارگاد" },
  "639347": { code: "pasargad", name: "بانک پاسارگاد" },
  "627488": { code: "karafarin", name: "بانک کارآفرین" },
  "621986": { code: "saman", name: "بانک سامان" },
  "639346": { code: "sina", name: "بانک سینا" },
  "639607": { code: "sarmayeh", name: "بانک سرمایه" },
  "636214": { code: "ayandeh", name: "بانک آینده" },
  "502806": { code: "shahr", name: "بانک شهر" },
  "502938": { code: "day", name: "بانک دی" },
  "603769": { code: "saderat", name: "بانک صادرات" },
  "610433": { code: "mellat", name: "بانک ملت" },
  "991975": { code: "mellat", name: "بانک ملت" },
  "627353": { code: "tejarat", name: "بانک تجارت" },
  "585983": { code: "tejarat", name: "بانک تجارت" },
  "589463": { code: "refah", name: "بانک رفاه کارگران" },
  "627381": { code: "ansar", name: "بانک انصار" }, // ادغام شده در سپه
  "636949": { code: "hekmat", name: "بانک حکمت ایرانیان" }, // ادغام شده در سپه
  "505416": { code: "gardeshgari", name: "بانک گردشگری" },
  "606373": { code: "mehr_iran", name: "بانک مهر ایران" },
  "504172": { code: "resalat", name: "بانک رسالت" },
  "505785": { code: "iran_zamin", name: "بانک ایران زمین" },
  "505801": { code: "kosar", name: "موسسه اعتباری کوثر" }, // ادغام شده در سپه
  "639599": { code: "ghavamin", name: "بانک قوامین" }, // ادغام شده در سپه
  "606256": { code: "melal", name: "موسسه اعتباری ملل" },
  "581874": { code: "khavar_mianeh", name: "بانک خاورمیانه" },
  "636795": { code: "markazi", name: "بانک مرکزی" },
  "628157": { code: "moasse_tose_e", name: "موسسه اعتباری توسعه" },
  "507677": { code: "noor", name: "موسسه اعتباری نور" }
};

const OPERATORS = [
  { prefix: "0910", name: "mci" }, { prefix: "0911", name: "mci" }, { prefix: "0912", name: "mci" },
  { prefix: "0913", name: "mci" }, { prefix: "0914", name: "mci" }, { prefix: "0915", name: "mci" },
  { prefix: "0916", name: "mci" }, { prefix: "0917", name: "mci" }, { prefix: "0918", name: "mci" },
  { prefix: "0919", name: "mci" }, { prefix: "0990", name: "mci" }, { prefix: "0991", name: "mci" },
  { prefix: "0992", name: "mci" }, { prefix: "0993", name: "mci" }, { prefix: "0994", name: "mci" },
  { prefix: "0930", name: "irancell" }, { prefix: "0933", name: "irancell" }, { prefix: "0935", name: "irancell" },
  { prefix: "0936", name: "irancell" }, { prefix: "0937", name: "irancell" }, { prefix: "0938", name: "irancell" },
  { prefix: "0939", name: "irancell" }, { prefix: "0901", name: "irancell" }, { prefix: "0902", name: "irancell" },
  { prefix: "0903", name: "irancell" }, { prefix: "0904", name: "irancell" }, { prefix: "0905", name: "irancell" },
  { prefix: "0941", name: "irancell" },
  { prefix: "0920", name: "rightel" }, { prefix: "0921", name: "rightel" }, { prefix: "0922", name: "rightel" },
  { prefix: "0923", name: "rightel" },
  { prefix: "0998", name: "shatel" }, { prefix: "0999", name: "shatel" },
];

// ==========================================
// 2. RAW UTILS & HELPERS
// ==========================================

export const utils = {
  normalizeText: (text: string): string => {
    if (!text) return text;
    return text
      .replace(/ي/g, "ی").replace(/ك/g, "ک")
      .replace(/[۰٠]/g, "0").replace(/[۱١]/g, "1").replace(/[۲٢]/g, "2")
      .replace(/[۳٣]/g, "3").replace(/[۴٤]/g, "4").replace(/[۵٥]/g, "5")
      .replace(/[۶٦]/g, "6").replace(/[۷٧]/g, "7").replace(/[۸٨]/g, "8")
      .replace(/[۹٩]/g, "9").trim();
  },

  isNationalId: (code: string): boolean => {
    if (!/^\d{10}$/.test(code)) return false;
    if (/^(\d)\1+$/.test(code)) return false;
    const check = +code[9];
    const sum = code.substring(0, 9).split("").reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
    return sum < 2 ? check === sum : check === 11 - sum;
  },

  isLegalId: (code: string): boolean => {
    if (!/^\d{11}$/.test(code)) return false;
    const curr = parseInt(code.substring(10));
    const multiply = [29, 27, 23, 19, 17, 29, 27, 23, 19, 17];
    let sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(code.charAt(i)) * multiply[i];
    let remainder = sum % 11;
    if (remainder === 10) remainder = 0;
    return curr === remainder;
  },

  isBankCard: (code: string): boolean => {
    if (!/^\d{16}$/.test(code)) return false;
    let sum = 0;
    for (let i = 0; i < 16; i++) {
      let digit = parseInt(code[i]);
      if (i % 2 === 0) { digit *= 2; if (digit > 9) digit -= 9; }
      sum += digit;
    }
    return sum % 10 === 0;
  },

  // دریافت اطلاعات کامل بانک (نام فارسی و انگلیسی)
  getBankInfo: (cardNumber: string): BankDetails | null => {
    const prefix = cardNumber.substring(0, 6);
    return BANKS[prefix] || null;
  },

  // فقط نام انگلیسی (برای کلاس CSS)
  getBankSlug: (cardNumber: string): string | null => {
    const info = utils.getBankInfo(cardNumber);
    return info ? info.code : null;
  },

  isSheba: (sheba: string): boolean => {
    const s = sheba.toUpperCase().replace(/[\s-]/g, "").replace("IR", "");
    if (s.length !== 24 || !/^[0-9A-Z]+$/.test(s)) return false;
    const newStr = s.substring(4) + "1827" + s.substring(0, 2);
    let remainder = newStr;
    while (remainder.length > 2) {
      const block = remainder.slice(0, 9);
      remainder = (parseInt(block, 10) % 97) + remainder.slice(9);
    }
    return parseInt(remainder, 10) % 97 === 1;
  },

  isJalaliDate: (date: string): boolean => {
    if (!/^(13|14)\d\d[\/](0[1-9]|1[0-2])[\/](0[1-9]|[12]\d|3[01])$/.test(date)) return false;
    const parts = date.split('/');
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);
    if (month >= 1 && month <= 6 && day > 31) return false;
    if (month >= 7 && month <= 12 && day > 30) return false;
    return true;
  },

  getMobileOperator: (mobile: string): string | null => {
    const prefix = mobile.substring(0, 4);
    const op = OPERATORS.find(o => o.prefix === prefix);
    return op ? op.name : "other";
  }
};

// ==========================================
// 3. ZOD EXTENSIONS
// ==========================================

export const persianZod = {
  nationalId: (message: string = "کد ملی نامعتبر است") =>
    z.string().transform(utils.normalizeText).refine(utils.isNationalId, { message }),

  shenaseMelli: (message: string = "شناسه ملی حقوقی نامعتبر است") =>
    z.string().transform(utils.normalizeText).refine(utils.isLegalId, { message }),

  mobile: (message: string = "شماره موبایل نامعتبر است") =>
    z.string()
      .transform(utils.normalizeText)
      .refine((val) => /^09\d{9}$/.test(val), { message }),

  mobileOperator: (operator: "mci" | "irancell" | "rightel" | "shatel", message?: string) => 
    z.string()
      .transform(utils.normalizeText)
      .refine((val) => /^09\d{9}$/.test(val) && utils.getMobileOperator(val) === operator, { 
        message: message || `شماره باید متعلق به اپراتور ${operator} باشد` 
      }),

  bankCard: (message: string = "شماره کارت نامعتبر است") =>
    z.string()
      .transform((val) => utils.normalizeText(val).replace(/[\s-]/g, ""))
      .refine(utils.isBankCard, { message }),

  // اعتبارسنجی کارت بانک خاص (با استفاده از نام انگلیسی: mellat, melli...)
  bankCardFrom: (bankCode: string, message?: string) =>
    z.string()
      .transform((val) => utils.normalizeText(val).replace(/[\s-]/g, ""))
      .refine((val) => utils.isBankCard(val) && utils.getBankSlug(val) === bankCode, { 
        message: message || `کارت باید متعلق به بانک مورد نظر باشد` 
      }),

  sheba: (message: string = "شماره شبا نامعتبر است") =>
    z.string()
      .transform((val) => val.toUpperCase().replace(/[\s-]/g, "").replace("IR", ""))
      .refine((val) => val.length === 24, { message })
      .refine((val) => utils.isSheba("IR" + val), { message }),

  jalaliDate: (message: string = "تاریخ شمسی نامعتبر است") =>
    z.string().transform(utils.normalizeText).refine(utils.isJalaliDate, { message }),

  postalCode: (message: string = "کد پستی باید ۱۰ رقم باشد") =>
    z.string().transform(utils.normalizeText).refine((val) => /^\d{10}$/.test(val), { message }),
  
  /**
   * تبدیل و اعتبارسنجی قیمت
   * ورودی‌های رشته‌ای (مثل "1,000,000" یا اعداد فارسی) را تمیز کرده و به عدد تبدیل می‌کند.
   */
price: (message: string = "مبلغ نامعتبر است") =>
    z.preprocess(
      (val) => {
        if (typeof val === "string") {
          return utils.normalizeText(val.replace(/,/g, ""));
        }
        return val;
      },
      // تغییر: استفاده از { message } به جای { invalid_type_error }
      z.coerce.number({ message: message }).min(0, { message: message })
    ),
      
  passport: (message: string = "شماره گذرنامه نامعتبر است") =>
    z.string().transform(utils.normalizeText).refine((val) => /^[A-Z][0-9]{8}$/.test(val.toUpperCase()), { message }),
};

export const ir = persianZod;