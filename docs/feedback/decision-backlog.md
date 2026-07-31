# Decision Backlog — Product Learning

این backlog بر اساس evidence، فرضیات قابل مشاهده و اولویت‌های یادگیری تنظیم شده است. هدف، تبدیل شکایات یا مشاهدات پراکنده به یک لیست تصمیم‌محور برای گام بعدی است.

| Problem | Evidence | Impact | Priority |
| --- | --- | --- | --- |
| سردرگمی در اولین جلسه | تجربه‌ی ورود اولیه و نیاز به روشن بودن مفهوم محصول | High | P1 |
| ضعف مسیر شروع واضح | empty state و discoverability در اولین استفاده | High | P1 |
| بازگشت ضعیف بدون continuity | نیاز به Library و Player برای ایجاد حس ادامه‌ی تجربه | High | P1 |
| ابهام در ارزش Community | احتمال اینکه Community برای کاربر عادی هنوز preview-like به نظر برسد | Medium | P2 |
| ابهام در Creator value | creator ممکن است workflow و محدودیت‌های preview را درک نکند | Medium | P2 |
| نگرانی‌های reliability در اولین تجربه | loading/error/playback failure می‌تواند اعتماد کاربر را کاهش دهد | Medium | P2 |

## Decision Rules

- اگر مشکل در عمل تکرارپذیر باشد، در اولویت بالاتر قرار می‌گیرد.
- اگر مشکل برای تجربه‌ی اصلی و اولین جلسه تأثیرگذار باشد، با بالاترین اولویت بررسی می‌شود.
- اگر حل مشکل بدون feature جدید و بدون تغییر معماری ممکن باشد، این گزینه ترجیح داده می‌شود.
- اگر evidence کافی برای تصمیم وجود ندارد، اولویت به بررسی و observation داده می‌شود نه افزودن feature.

## Suggested Next Decision

تمرکز بعدی باید روی این سه موضوع باشد:
1. وضوح اولین جلسه و پیام اولیه محصول
2. تقویت مسیر شروع و reduce confusion
3. افزایش نشانه‌های بازگشت از طریق Library و Player continuity
