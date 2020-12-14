const Discord = require("discord.js");
const dotenv = require("dotenv");

const execute = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGE"))
    return message.reply("Quem você acha que é para usar esse comando?");
    if (isNaN(args[0]) || parseInt(args[0]) <= 0 ){
        return message.reply("Forneça um número de 0 a 100 mensagens.")
    }
    let deleteCount; 
    if (parseInt(args[0]) > 100){
        deleteCount = 100;
    } else {
        deleteCount = parseInt(args[0]);
    }
    message.channel.bulkDelete(deleteCount, true);
    message.channel.send(`${deleteCount} Mensagens foram limpas nesse chat`)
    .catch(err => console.log(err));
}   


module.exports = {
    name: "clear",
    execute,
}