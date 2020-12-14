const execute = (bot, message, args) => {
    const queue = bot.queues.get(message.guild.id);
    if(!queue) {
        return message.reply("Não há nenhuma música sendo reproduzida.");
    }
    queue.songs = [];
    bot.queues.set(message.guild.id, queue);
    queue.dispatcher.end();
    message.channel.send("⏹️ Todas as músicas foram paradas")
};

module.exports = {
    name: "stop",
    help: "Para todas as músicas na fila",
    execute,
}