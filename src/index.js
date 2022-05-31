require('dotenv').config()
const express = require('express')
const {adminService} = require('./service/admin.service')
const TelegramBot = require('node-telegram-bot-api')
const URL = process.env.ROOT_URL
const bot = new TelegramBot(process.env.API_KEY, {polling: true})
const db = {}
const TOKEN = process.env.API_KEY
const PORT = process.env.PORT || 8000

bot.setWebHook(`${URL}/bot${TOKEN}`)
const app = express()
app.use(express.json())

app.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Start Express Server
app.listen(PORT, () => {
    console.log(`Express server is listening on ${PORT}`);
});

bot.on('new_chat_members', (msg) => {

    msg.new_chat_members.forEach(user => {
        if (user.id.toString() !== process.env.BOT_ID)
            adminService.checkNewUser(bot, msg, db, user.id)
    })
})

bot.on('callback_query', (answ) => {

    adminService.checkUserAnswer(bot, answ, db)

})
