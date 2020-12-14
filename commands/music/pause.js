const execute = (bot, message, args) => {
    const queue = bot.queues.get(message.guild.id);
    if(!queue) {
        return message.reply("Não há nenhuma música sendo reproduzida.");
    }
    queue.dispatcher.pause();
    message.channel.send("⏸️ Música pausada");
};

module.exports = {
    name: "pause",
    help: "Pausa a música atual",
    execute,
};