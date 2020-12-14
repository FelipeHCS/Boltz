const Discord = require("discord.js");
const dotenv = require("dotenv"); //Arquivos de pastas.
const fs = require("fs"); //Serve para ler os conteúdos.
const path = require("path"); //Puxar pastas.
const ytdl = require('ytdl-core');
const { runInContext } = require("vm");

dotenv.config();

const bot = new Discord.Client();

bot.commands = new Discord.Collection();
bot.queues = new Map();

const usersMap = new Map() //Anti-Spam

const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));

const folders = fs.readdirSync(path.join(__dirname, "/commands"))
for (var folder of folders) {
    const files = fs.readdirSync(path.join(__dirname, "/commands", folder)).filter((filename) => /^.*\.(t|j)s$/.test(filename))
    for (var filename of files) {
        const command = require(`./commands/${folder}/${filename}`);
        bot.commands.set(command.name, command);
    }
}

for (const file of commandFiles) {
    const command = require(path.join(__dirname, "commands", `${file}`));
    bot.commands.set(command.name, command);
}
console.log(bot.commands);

bot.on('ready', () => { //Iniciando o comando de Status do Bot.
    let activities = [ //Iniciando as atividades do Bot.
        `Digite p.help`,
        `V1.0 By: Felipe#5995`
    ]
    i = 0;
    setInterval(() => bot.user.setActivity(`${activities[i++ %
        activities.length]}`, {
        type: "PLAYING"
    }), 1000 * 60); //Marcação do tempo para troca de Status

    console.log(`--------------------//inicializando//-----------------\n 
${bot.user.username} foi conectado com sucesso e já estamos em ${bot.guilds.cache.size} servidores ( ͡° ͜ʖ ͡°) \n 
    -----------------//iniciado com sucesso//-----------------`)
});
bot.on("guildMemberAdd", async (member) => { 
    member.roles.add('773067395349610507')
})

bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (message.member.hasPermission("ADMINISTRATOR")) {
    } else if (message.content.includes('https://discord.gg/') || message.content.includes('discord.gg/')) {
        message.delete();
        return message.reply('É proibido enviar convites de outros servidores aqui 👮‍♂️ ')
    };

   // if (message.guild.id != "") return message.channel.send("Você não pode utilizar comandos nesse servidor")

    if (usersMap.has(message.author.id)) {
        const dataUser = usersMap.get(message.author.id);
        let msgCount = dataUser.msgCount;
        ++msgCount;
        if (parseInt(msgCount) === 10) {
            const roleMute = message.guild.roles.cache.get('741807835997929563');
            message.member.roles.add(roleMute);
            message.channel.bulkDelete(10, true)
            message.channel.send('Você foi mutado 👮‍♂️');
            setTimeout(() => {
                message.member.roles.remove(role);
                message.channel.send('Você foi desmutado, juízo 👮‍♂️ ');
            }, 10000)
        } else {
            dataUser.msgCount = msgCount;
            usersMap.set(message.author.id, dataUser)
        }
    } else {
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: null
        });
        setTimeout(() => {
            usersMap.delete(message.author.id);
        }, 10000)
    }
    if (message.content.toLowerCase().startsWith(process.env.BOT_PREFIX)) {
        const args = message.content.toLowerCase().slice(process.env.BOT_PREFIX.length).split(" ");
        const command = args.shift();
        try {
            bot.commands.get(command).execute(bot, message, args);
        } catch (e) {
            return message.reply("não reconheço este comando 😔");
        }
    }
})
bot.login(process.env.BOT_TOKEN);