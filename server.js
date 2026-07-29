const express = require("express");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");

const app = express();

app.use(cors());
app.use(express.json());

// Берём данные из переменных окружения Render
const TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const bot = new TelegramBot(TOKEN, {
    polling: false
});

app.post("/order", async (req, res) => {

    try {

        const {
            product,
            name,
            phone,
            city,
            delivery,
            place,
            comment
        } = req.body;

        const message = `
🛒 <b>Нове замовлення NETIX STORE</b>

👕 <b>Товар:</b>
${product}

👤 <b>Ім'я:</b>
${name}

📱 <b>Телефон:</b>
${phone}

🏙 <b>Місто:</b>
${city}

🚚 <b>Доставка:</b>
${delivery}

📦 <b>Відділення / Індекс:</b>
${place}

💬 <b>Коментар:</b>
${comment || "-"}
`;

        await bot.sendMessage(CHAT_ID, message, {
            parse_mode: "HTML"
        });

        res.json({
            success: true
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false
        });

    }

});

app.get("/", (req, res) => {
    res.send("NETIX STORE API працює ✅");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`NETIX STORE сервер запущений на порту ${PORT}`);
});