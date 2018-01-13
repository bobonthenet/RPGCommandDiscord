
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var d20 = require('d20');
var Foswig = require('foswig');
// Configure logger settings

var dwarfMaleChain = new Foswig(1);
var dwarfMaleNames = ["Dolgrin", "Grunyar", "Harsk", "Kazmuk", "Morgrym", "Rogar"]
dwarfMaleChain.addWordsToChain(dwarfMaleNames);

var dwarfFemaleChain = new Foswig(1);
var dwarfFemaleNames = [ "Agna", "Bodill", "Ingra", "Kotri", "Rusilka", "Yangrit"]
dwarfFemaleChain.addWordsToChain(dwarfFemaleNames);

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot

var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

bot.on('message', function(user, userID, channelID, message, event) {
    if (message === "You're a nerd!") {
        bot.sendMessage({
            to: channelID,
            message: "No, you're a nerd!!!"
        });
    }
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            case 'roll':
                bot.sendMessage({
                    to: channelID,
                    message: `@${user} rolled ${d20.roll(args.join(" "))}.`
                });
            break;
            case 'name':
              console.info(args)
              if(args[0] === 'dwarf') {
                if(args[1] === 'male') {
                  bot.sendMessage({
                    to: channelID,
                    message: `Randomly generated dwarf name: ${dwarfMaleChain.generateWord(5,15,true)}`
                  })
                } else if(args[1] === 'female')  {
                  bot.sendMessage({
                    to: channelID,
                    message: `Randomly generated dwarf name: ${dwarfFemaleChain.generateWord(5,15,true)}`
                  })
                }


              }

            // Just add any case commands if you want to..
         }
     }
});
