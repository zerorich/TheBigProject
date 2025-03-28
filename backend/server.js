require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const SERVER_FETCH = process.env.SERVER_FETCH;
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_IDS = process.env.CHAT_IDS.split(","); // Разбиваем строку в массив

app.use(express.json());
app.use(cors());

app.post("/api/sendData", async (req, res) => {
    console.log("🔹 Запрос получен:", req.body);

    try {
        
        const response = await fetch(SERVER_FETCH, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        });

        console.log("🔹 Ответ от API получен");

        if (!response.ok) throw new Error("Ошибка при отправке данных");

        let message = `📩 *Новая заявка!*\n\n` +
            `👤 *Имя:* ${req.body.Имя}\n` +
            `👤 *Фамилия:* ${req.body.Фамилия}\n` +
            `👤 *Отчество:* ${req.body.Отчество}\n` +
            `🏫 *Место Учёбы/Работы:* ${req.body["Место Учёбы/Работы"]}\n` +
            `📞 *Номер телефона:* ${req.body["Номер телефона"]}\n` +
            `🆔 *Паспорт:* ${req.body["Серия и Номер Паспорта"]}\n` +
            `📌 *Кем Выдан:* ${req.body["Кем Выдан"]}\n` +
            `📅 *Когда Выдан:* ${req.body["Когда Выдан"]}\n` +
            `🩺 *Тип СД:* ${req.body["СД"]}`;

        let url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        for (let chatId of CHAT_IDS) {
            await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: "Markdown"
                })
            });
        }

        res.status(200).json({ message: "✅ Данные успешно отправлены!" });
    } catch (error) {
        console.error("❌ Ошибка:", error);
        res.status(500).json({ message: "❌ Ошибка при отправке данных." });
    }
});

app.listen(PORT, () => console.log(`🚀 Сервер запущен на http://localhost:${PORT}`));
