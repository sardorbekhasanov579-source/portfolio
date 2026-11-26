require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.post("/send-message", async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ ok: false, error: "Ism va xabar majburiy." });
  }

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ ok: false, error: "Bot sozlanmagan — .env faylini tekshiring." });
  }

  const text = `📩 Yangi xabar (portfolio saytidan)\n\n👤 Ism: ${name}\n💬 Xabar: ${message}`;

  try {
    const tgResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text }),
      }
    );

    const data = await tgResponse.json();

    if (!data.ok) {
      console.error("Telegram xatosi:", data);
      return res.status(502).json({ ok: false, error: "Telegramga yuborib bo'lmadi." });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Server xatosi:", err);
    res.status(500).json({ ok: false, error: "Server xatosi yuz berdi." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server ishga tushdi: http://localhost:${PORT}`);
});
