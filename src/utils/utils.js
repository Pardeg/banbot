const checkUserAgreement = (id, chatId, db, bot) => {

    if (!db[id.toString()]) {
        bot.banChatMember(chatId, id)
        return
    }

    bot.sendMessage(chatId, 'BAN')
    delete db[id.toString()]
}

module.exports = {checkUserAgreement}