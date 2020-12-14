const playSong = require("./play").playSong;

const execute = (bot, message, args) => {
    const queue = bot.queues.get(message.guild.id);
    if(!queue) {
        return message.reply("Não há nenhuma música sendo reproduzida.");
    }
    queue.songs.shift();
    bot.queues.set(message.guild.id, queue);
    playSong(bot, message, queue.songs[0]);

    message.channel.send("⏭️ Próxima música...").then(message.react('✅'));
};

module.exports = {
    name: "skip",
    help: "Pula a música atual para a próxima na fila",
    execute,
}