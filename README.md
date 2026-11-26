# Sardor — Portfolio sayt

## Qanday ochish kerak (VS Code)

1. VS Code'ni oching
2. **File → Open Folder** → `portfolio-sayt` papkasini tanlang
3. Chap tarafdagi fayllar ro'yxatidan `index.html` ustiga sichqonchaning o'ng tugmasini bosing
4. **"Open with Live Server"** ni tanlang (agar bu yo'q bo'lsa, Extensions bo'limidan "Live Server" kengaytmasini o'rnating)
5. Sayt brauzerda avtomatik ochiladi

> Live Server bo'lmasa ham bo'ladi — `index.html` faylini brauzerda to'g'ridan-to'g'ri ikki marta bosib ochsangiz ham sayt ko'rinadi, faqat avtomatik yangilanish ishlamaydi.

## Papka tuzilishi

```
portfolio-sayt/
├── index.html        → sahifaning asosiy tuzilishi (4 bo'lim)
├── css/style.css     → dizayn (ranglar, shrift, animatsiya)
├── js/script.js      → mobil menyu, aktiv link, Telegram bot ulanishi
├── images/           → diplom suratlari
├── server/           → Telegram botga xabar yuboruvchi kichik Node.js server
└── README.md         → shu fayl
```

## Telegram bot'ni ulash (server orqali)

Bot tokenini saytning JS kodiga to'g'ridan-to'g'ri yozish xavfsiz emas — uni har kim ko'ra oladi va botingizdan foydalanishi mumkin. Shuning uchun token **serverda**, foydalanuvchiga ko'rinmaydigan joyda saqlanadi, sayt esa shu serverga so'rov yuboradi.

**1-qadam — kerakli ma'lumotlarni oling (agar hali yo'q bo'lsa):**
- Telegram'da **@BotFather** bilan yozishib, bot tokeningizni oling (buni allaqachon qilgan bo'lsangiz, tokeningiz sizda bor)
- Chat ID'ni olish uchun botingizga bitta xabar yozing, so'ng brauzerda shu manzilni oching:
  `https://api.telegram.org/bot<TOKEN>/getUpdates`
  (o'rniga o'z tokeningizni qo'yib) — javobda `"chat":{"id": ...}` qismidagi raqam sizning chat ID'ingiz

**2-qadam — serverni sozlash:**
1. VS Code terminalida `server` papkasiga o'ting:
   ```
   cd server
   ```
2. Kerakli kutubxonalarni o'rnating:
   ```
   npm install
   ```
3. `.env.example` faylini nusxalab, nomini `.env` ga o'zgartiring, ichiga haqiqiy token va chat ID'ni yozing:
   ```
   TELEGRAM_BOT_TOKEN=...
   TELEGRAM_CHAT_ID=...
   ```

**3-qadam — serverni ishga tushiring:**
```
npm start
```
Terminalda `✅ Server ishga tushdi: http://localhost:3000` deb chiqsa — ishladi.

**4-qadam — saytni oching:**
`index.html` ni Live Server orqali oching va **Bog'lanish** bo'limida forma orqali sinab ko'ring — xabar Telegram botingizga kelishi kerak.

> ⚠️ Server ishlamay turgan vaqtda forma xabar yubora olmaydi — avval `npm start` bilan serverni ishga tushirib qo'ying, keyin saytni oching.

## Keyingi qadamlar

- **Ta'lim bo'limi**: `index.html` ichida `talim-note` degan qatorni toping — o'quv muassasa nomi, yo'nalish va yillarni yozib bersangiz, men to'ldirib beraman.
- **Matnlarni o'zgartirish**: barcha matnlar `index.html` ichida oddiy o'zbek tilida yozilgan — kerakli joyni topib, to'g'ridan-to'g'ri tahrirlashingiz mumkin.
- **Saytni internetga chiqarish**: hozircha sayt va server kompyuteringizda lokal ishlaydi. Internetga chiqarish (hosting) kerak bo'lsa, ayting — shuni ham bosqichma-bosqich ko'rsataman.
