const Discord = require("discord.js");
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS
    
    ]
});

const prefix = "!";

Client.on("ready", () => {
    console.log("bot opérationnel");
});

Client.login(process.env.TOKEN);

Client.on("messageCreate", message => {
    if (message.author.bot) return;

    //!twitch
    if(message.content === prefix + "twitch"){
        message.reply("https://www.twitch.tv/perretetv")
    };

    //!planning
    if(message.content === prefix + "planning"){
        const embed = new Discord.MessageEmbed()
            .setColor("#CD5C5C")
            .setTitle("Planning")
            .setAuthor("PerreteBOT")
            .setDescription("Voici le planning de la semaine !")
            .addField("Lundi : 10H valorant") 
            .addField("Mardi :")
            .addField("mercredi :")
            .setTimestamp()

            message.channel.send({ embeds: [embed]});

    }
    
   
    //!youtube 
    if(message.content === prefix + "youtube"){
        message.reply("https://www.youtube.com/channel/UCEw2YJ4r-8xPUQIctKASzGg");
    };


    //!ping
    if(message.content === prefix + "ping"){
        message.reply("pong !");
    }
    //!help
    else if (message.content === prefix + "help"){
       const embed = new Discord.MessageEmbed()
           .setColor("#0099ff")
           .setTitle("Liste des commandes !")
           .setAuthor("PerreteBOT")
           .setDescription("Vous y trouverez la liste des commandes du bot !")
           .addField("!help", "Affiche la liste des commandes")
           .addField("!youtube", "Affiche le lien de la chaine Youtube !")
           .addField("!planning","Affiche le planning !")
           .setTimestamp();
           

           message.channel.send({ embeds: [embed]});
    }

    if(message.content === prefix + "annonce"){
        message.channel.send("Gros live ce soir venait nombreux ! @everyone")
    }

   
    }
);

Client.on("guildMemberAdd", member => {
    console.log("un membre est arrivé");
      Client.channels.cache.gets("937059458394239036").send("<@" + member.displayName + " est arrivé !");
      member.roles.add("871825479932465192")
});

Client.on("guildMemberRmove", member => {
    console.log("un membre a quitté le serveur.");
});

  
    
