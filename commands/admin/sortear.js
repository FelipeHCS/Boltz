const Discord = require('discord.js');
const ms = require('ms')

const execute = (bot, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("você não tem permissão para utilizar este comando").then(m => m.delete({ timeout: 10000 }));

    let canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if (!canal) return message.reply('> você precisa mencionar um canal antes de iniciar').then(m => m.delete({ timeout: 10000 }))

    let time = args[1];
    if (!args[1]) return message.reply('> você não informou quanto tempo irá durar o sorteio').then(m => m.delete({ timeout: 10000 }))

    if (!args[1].endsWith("d") && !args[1].endsWith("h") && !args[1].endsWith("m")) return message.reply('> você não informou um formato de tempo correto')
    //if (isNaN(args[1][1])) return message.reply('> não é um número')

    let embed = new Discord.MessageEmbed()
        .setColor(0x4e4c9a)
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTimestamp()

    message.channel.send('> Informe o título do sorteio')
    let title = message.channel.createMessageCollector(m => m.author.id === message.author.id, {
        max: 1,
        time: 60000
    });
    title.on("end", (collected) => {
        if (collected.size === 0) {
            return message.reply('> tempo de resposta esgotado')
        }
    })
    title.on("collect", () => {
        message.channel.send('> Informe a mensagem contida no sorteio')
        let desc = message.channel.createMessageCollector(m => m.author.id === message.author.id, {
            max: 1,
            time: 60000
        });
        desc.on("end", (collected) => {
            if (collected.size === 0) {
                return message.reply('> tempo de resposta esgotado')
            }
        })
        desc.on("collect", async () => {
            message.channel.bulkDelete(4, true)
            message.channel.send('> Sorteio iniciado!')
            embed.setTitle(title.collected.first().content)
            embed.setDescription(desc.collected.first().content)

            let m = await canal.send(embed);
            m.react("🎉")

            setTimeout(() => {
                if (m.reactions.cache.size == 0) return canal.send('> Não há pessoas para o sorteio :(')
                //if (m.reactions.cache.size == 1) return canal.send('> Poucas pessoas, sem sorteio!')
                let winner = m.reactions.cache.get("🎉").users.cache.filter(u => !u.bot).random()
                canal.send(`> 🎉 Parabéns **${winner}** por ganhar o sorteio de **${title.collected.first().content}!**`)
            }, ms(args[1]))

        })
    })
}

module.exports = {
    name: "sortear",
    execute,
}