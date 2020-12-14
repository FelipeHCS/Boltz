/*const ytdl = require("ytdl-core");
const search = require("yt-search");
const Discord = require("discord.js");

const execute = async (bot, message, args) => {
  let cavatar = bot.user.displayAvatarURL()
  let embed1 = new Discord.MessageEmbed()
    .setColor('#e4b400')
    .setAuthor(`${bot.user.username}`, cavatar)
    .setDescription('Você deve inserir uma música😉')

  const s = args.join(" ");
  if (!s) return message.channel.send(embed1)
  try {
    search(s, async (err, result) => {
      if (err) {
        throw err;
      } else if (result && result.videos.length > 0) {
        const song = result.videos[0];
        const queue = bot.queues.get(message.guild.id);
        if (queue) {
          queue.songs.push(song);
          bot.queues.set(message.guild.id, queue)
          message.channel.send(`✅ **${song.title}** adicionada à fila.\n➡️ Solicitado por: **${message.author}**`)
        } else await playSong(bot, message, song);
      } else {
        return message.channel.send("🚫 Eu não consegui achar essa música, por favor digite novamente...");
      };
    });
  } catch (e) {
    console.error(e);
  }
};

const playSong = async (bot, message, song) => {
  let queue = bot.queues.get(message.member.guild.id);
  if (!song) {
    if (queue) {
      queue.connection.disconnect();
      return bot.queues.delete(message.member.guild.id);
    }
  }
  if (!message.member.voice.channel) {
    return message.reply(
      "Você precisa estar em um canal de voz para iniciar uma música."
    );
  }
  if (!queue) {
    const conn = await message.member.voice.channel.join();
    queue = {
      volume: 10,
      connection: conn,
      dispatcher: null,
      songs: [song],
    };
    bot.queues.set(message.member.guild.id, queue);
  }
  const url = song.url;
  queue.dispatcher = await queue.connection.play(
    await ytdl(url, { highWaterMark: 1 << 25, filter: "audioonly", quality: "highestaudio" }));
  queue.dispatcher.on("finish", () => {
    queue.songs.shift();
    playSong(bot, message, queue.songs[0]);
  });
  let bavatar = bot.user.displayAvatarURL()
  const embed = new Discord.MessageEmbed()
    .setAuthor(`${bot.user.username}`, bavatar)
    .setTitle(`🎵 Tocando agora: ${song.title}`)
    .setURL(url)
    .setDescription(`⏰ Duração: ${song.duration.timestamp}\n👀 Visualizações: ${song.views}`)
    .setColor('#e4b400')

  message.channel.send(embed);
};

module.exports = {
  name: "play",
  help: "Reproduz uma música.",
  execute,
  playSong,
};*/