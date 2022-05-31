const {checkUserAgreement} = require("../utils/utils");

class AdminService {
    async checkUserAnswer(bot, answ, db) {

        if (answ.from.id === answ.message.reply_to_message.new_chat_member.id && answ.data === '1') {
            db[answ.from.id] = true

        }

    }

    checkNewUser(bot, msg, db, userId) {
        const opts = {
            reply_to_message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [[{text: 'Дорого', callback_data: '1'}]]
            }
        };

        bot.sendMessage(msg.chat.id, 'Гофру восемь тыщ поменять', opts)
        setTimeout(() => checkUserAgreement(userId, msg.chat.id, db, bot), 10000)
    }
}

const adminService = new AdminService()
module.exports = {adminService}