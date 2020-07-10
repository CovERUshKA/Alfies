const { Client, Attachment } = require('discord.js'); // connect code of discord to change bot on discord API
const bot = new Client();
const config = require('./package.json');
const prefix = config.prefix;
const bot_controller = config.bot_controller;
const mats = [ "блядь", "сука", "лох", "пидарас", "педик", "лошара", "блядина", "пидарасина", "блять", "пидорас", "пидр", "уёбок" ]
const servers = config.servers;

bot.on( 'ready', ()=>{
    console.log( `Bot logged in as ${bot.user.tag}` ) // code START
    bot.user.setStatus( "online" ) // status - online
    bot.user.setActivity( "!info" ) // Play in the game "!info - команды"
    setInterval( changeColor, config.speed );
})

bot.on( 'guildMemberAdd', (member) => {
    member.send( "Приветствую тебя на сервере **" + member.guild.name + "**")
})

bot.on( 'message', (message)=>{
    let member = message.member;
    let author = message.author; // author of message
    let msg = message.content.toUpperCase();
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);

    if ( message.content.toUpperCase().startsWith( prefix ) && message.channel.name == "📄⎝⏠⏝⏠⎠-общее📄" ) {

        if(msg === prefix + 'INFO'){
            message.author.send("**Команды:**\n**!purge  <count>** - *удалять сообщения*\n**!icon** - *возвращает иконку сервера*\n**!avatar** - *возвращает вашу аватарку*\n**!ping** - *возвращает ваш пинг*")
        }

        if(msg === prefix + 'ICON'){
            let attachment = new Attachment( message.guild.iconURL )
            message.channel.send( attachment )
        }

        if ( msg === prefix + 'AVATAR' ){
            let attachment = new Attachment( message.author.avatarURL.slice( 0, message.author.avatarURL.length - 10 ) )
            message.channel.send( attachment )
        }

        if ( msg.startsWith( prefix + 'BAN' ) ){
            if ( args[0] != null && args[1] != null ){
                message.guild.ban(args[0], { days: 1, reason: 'He needed to go already' })
            }else{
                message.reply( "Что-то не так. Сообщите CovERу об этом." )
            }
        }

        if ( msg.startsWith( prefix + 'PING' ) ){
            message.channel.send( message.author.client.ping )
        }
        
        if ( msg.startsWith( prefix + 'PURGE' ) ){
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
    } else {
        for ( let i = 0; i < message.content.split( " " ).length; i++ ) {
            for ( let a = 0; a < mats.length; a++ ) {
            
                if ( message.content.split( " " )[i].toLowerCase() == mats[a] ) {
                    console.log( message.content ) 
                    message.delete()
                    message.reply( "ай-ай-ай такое писать." )
                    return;
                }
            }
        }
    }
})

const size = config.colors;
const rainbow = new Array(size);

for (let i=0; i<size; i++) {
let red = sin_to_hex(i, 0 * Math.PI * 2/3); // 0 deg
let blue = sin_to_hex(i, 1 * Math.PI * 2/3); // 120 deg
let green = sin_to_hex(i, 2 * Math.PI * 2/3); // 240 deg

rainbow[i] = '#'+ red + green + blue;
}

function sin_to_hex(i, phase) {
let sin = Math.sin(Math.PI / size * 2 * i + phase);
let int = Math.floor(sin * 127) + 128;
let hex = int.toString(16);

return hex.length === 1 ? '0' + hex : hex;
}

let place = 0;

function changeColor() {

if ( place == ( size - 1 ) ) {
    place = 0;
} else {
    place++;
}

for (let index = 0; index < servers.length; ++index) {
    bot.guilds.get(servers[index]).roles.find(role => role.name === bot_controller).setColor(rainbow[index])
}
}

bot.login( process.env.TOKEN ); // token to change bot configuration
