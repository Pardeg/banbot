const checkUserAgreement = (id, chatId, db, bot) => {

    if (!db[id.toString()]) {
        bot.banChatMember(chatId, id)
        return
    }

    delete db[id.toString()]
}

module.exports = {checkUserAgreement}