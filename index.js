const Discord = require('discord.js'); // connect code of discord to change bot on discord API
const bot = new Discord.Client();
const config = require('./package.json');
const prefix = '!';
const bot_controller = config.bot_controller;

bot.on('ready',()=>{
    console.log("Bot started") // code START
    bot.user.setStatus("online") // status - online
    bot.user.setActivity("!info") // Play in the game "!info - команды"
})

bot.on('guildMemberAdd', (member) => {
    if ( member.user.username == "CovER" ) {
        member.send( "Приветствуем тебя на сервере **SKY** родной " + member.user.username )

        member.addRole( member.guild.roles.find('name','Админ') )
        member.addRole( member.guild.roles.find('name','rainbow') )
    }
})

bot.on('message',(message)=>{
    var member = message.member;
    var author = message.author; // author of message
    var msg = message.content.toUpperCase();
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);
    
    if(msg === prefix + 'INFO'){
        message.author.send("**Команды:**\n**!purge <count>** - *удалять сообщения*")
    }
    
    if(msg.startsWith(prefix + 'PURGE')){
        message.delete();

        async function purge() {

            if (!message.member.roles.find(role => role.name === bot_controller)) {
                message.channel.send('Тебе нужно \'rainbow\' роль чтобы использовать эту команду.');
                return;
            }

            if (isNaN(args[0])) {
                message.channel.send('Укажите количество удаляемых сообщений\n **!purge <count>**')

                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[1000000]});

            message.channel.bulkDelete(fetched).catch(error => message.channel.send(`${error}`));
            }
        purge();
    }
})

const size = config.colors;
const rainbow = new Array(size);

for (var i=0; i<size; i++) {
var red = sin_to_hex(i, 0 * Math.PI * 2/3); // 0 deg
var blue = sin_to_hex(i, 1 * Math.PI * 2/3); // 120 deg
var green = sin_to_hex(i, 2 * Math.PI * 2/3); // 240 deg

rainbow[i] = '#'+ red + green + blue;
}

function sin_to_hex(i, phase) {
var sin = Math.sin(Math.PI / size * 2 * i + phase);
var int = Math.floor(sin * 127) + 128;
var hex = int.toString(16);

return hex.length === 1 ? '0'+hex : hex;
}

let place = 0;
const servers = config.servers;

function changeColor() {
for (let index = 0; index < servers.length; ++index) {
bot.guilds.get(servers[index]).roles.find(role => role.name === bot_controller).setColor(rainbow[place])

if(place == (size - 1)){
place = 0;
}else{
place++;
}
}
}

bot.on('ready', () => {
setInterval( changeColor, config.speed );
})

bot.login( process.env.token ); // token to change bot configuration
