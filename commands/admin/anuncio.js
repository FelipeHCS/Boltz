const Discord = require("discord.js");
const execute = async (bot, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Você não possui permissão.`)
    
    message.channel.send(`Digite # e mencione o canal para o envio!`).then(msg => {
        let cp = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
        .on('collect', c => {
            canal = c.mentions.channels.first ()
                if (!canal){
                    message.reply(`Mencione um canal!`)
                }else{
                    message.channel.send(`Qual o título?`).then(msg2 => {
                        let cl = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
                        .on('collect', c=> {
                             title = c.content

                            message.channel.send(`Qual a mensagem desse anúncio?`).then(msg3 => {
                                let ck = message.channel.createMessageCollector(x=> x.author.id == message.author.id, {max: 1})
                                .on('collect', c => {
                                     desc = c.content

                                    message.channel.send(`Anúncio enviado ao canal ${canal} com Sucesso.`)

                                    let embed = new Discord.MessageEmbed()

                                    .setColor('#594fa9')
                                    .setFooter(message.author.tag, message.author.avatarURL())
                                    .setTitle(title)
                                    .setDescription(desc)

                                    canal.send(`@everyone`,embed)
                                })
                            })
                        })
                    })
                }
            })
        })
    }
module.exports = {
    name: "anuncio",
    execute,
}