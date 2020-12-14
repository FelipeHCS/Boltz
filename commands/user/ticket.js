const Discord = require("discord.js")
const execute = async (bot, message, args) => {

    let supportCategory = message.guild.channels.cache.get("773069568523632641");

    if (message.guild.me.hasPermission("MANAGE_CHANNELS") && !supportCategory) {
        supportCategory = await message.guild.channels.create('Tickets',{
            type: "category",
        });
    };
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS") && !supportCategory){
        message.channel.send("Você não tem permissões para criar a categoria do ticket")
    }

    if (!message.guild.roles.cache.find(role => role.name === "Support Team")){
        await (message.guild.roles.create({
            name: "Support Team",
            color: "Blue",
        }));
    };


    const channelName = `ticket-${message.author.username}-${message.author.discriminator}`
    if (message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.username.toLowerCase()}-${message.author.discriminator}`)){
        return message.channel.send("Desculpe, mas você já possui um ticket aberto!")
    }

    message.guild.channels.create(channelName, { parent: '773069568523632641', topic: `Ticket Owner: ${message.author.id}`}).then(c => {
        
        const sr = message.guild.roles.cache.get('785534719827509289') // Id do cargo do bot
        const everyone = message.guild.roles.cache.find(role => role.name === "@everyone")
        c.updateOverwrite(sr, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false,
        });
        c.updateOverwrite(everyone, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false,
        });
        c.updateOverwrite(message.author,{
            SEND_MESSAGES:true,
            VIEW_CHANNEL:true,
        });
        let CreatedTicketEmbed = new Discord.MessageEmbed()
            .setColor('#e4b400')
            .setTitle("Ticket para Suporte")
            .setDescription(`<@${message.author.id}> Seu canal de suporte é <#${c.id}> `)
            .setTimestamp()
            .setFooter("Equipe AP 10")
            message.channel.send(CreatedTicketEmbed)
            // Comando enviado no canal após a mensagem.

            let GreetEmbed = new Discord.MessageEmbed()
            .setColor('#e4b400')
            .addField("Ticket para Suporte", `<@${message.author.id}> Obrigado por entrar em contato conosco!`)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL())
            // Comando enviado após a criação do canal de ticket.
                 c.send(GreetEmbed)
    }).catch(console.error);
}

module.exports = {
    name: "ticket",
    execute,
}