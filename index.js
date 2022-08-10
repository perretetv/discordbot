const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS
    
    ]
});

var nbTicket = 0;

const prefix = "!";

/*Client.on("ready", async () => {
    var row = new Discord.MessageActionRow()
             .addComponents(new Discord.MessageButton()
                 .setCustomId("open-ticket")
                 .setLabel("ouvrir un ticket")
                 .setStyle("PRIMARY")
             );


    Client.channels.cache.get("1007010449453236264").send({content: "Appuyez sur le bouton pour ouvrir un ticket", components: [row]});
        
   
    console.log("bot opérationnel");
});
*/

Client.on("interactionCreate", interaction => {
    if(interaction.isButton()){
        if(interaction.customId === "open-ticket"){
            nbTicket++;

            interaction.guild.channels.create("ticket-" + nbTicket, {
               parent: "871848110807187506"
            }).then(channel => {
                var row = new Discord.MessageActionRow()
                    .addComponents(new Discord.MessageButton()
                          .setCustomId("close-ticket")
                          .setLabel("fermer le ticket")
                          .setStyle("DANGER")
                          );

                channel.send({content: "<@" + interaction.user.id + "> Voici votre ticket, vous pouvez le fermer en appuyant sur le boutton ci-dessous", components: [row]});

                interaction.reply({content: "ticket correctement créé", ephemeral: true});

            });
        }
        else if(interaction.customId === "close-ticket"){
            interaction.channel.setParent("1007030151671975966");

            var row = new Discord.MessageActionRow()
                    .addComponents(new Discord.MessageButton()
                    .setLabel("supprimer le ticket")
                    .setStyle("DANGER")
                    );

            interaction.message.delete();
            
            interaction.channel.send({content: "Supprimer le ticket :", components: [row]});
        
            interaction.reply({content: "ticket archivé", ephemeral: true});
        }
    }

});

Client.login(process.env.TOKEN);

Client.on("messageCreate", message => {
    if (message.author.bot) return;

    //!twitch
    if(message.content === prefix + "twitch"){
        message.reply("https://www.twitch.tv/perretetv")
    };
   
    //!youtube 
    if(message.content === prefix + "youtube"){
        message.reply("https://www.youtube.com/channel/UCEw2YJ4r-8xPUQIctKASzGg");
    };


    //!ping
    if(message.content === prefix + "ping"){
        message.reply("pong !");
    };

    //!salut
    if(message.content === prefix + "salut"){
        message.reply("Salut !");
    };
          

    //!help
     if (message.content === prefix + "help"){
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
    };

    //!planning
      if (message.content === prefix + "planning"){
        const embed = new Discord.MessageEmbed()
            .setColor("#BA4A00")
            .setTitle("Planning !")
            .setAuthor("PerreteBOT")
            .setDescription("Le Planning de la semaine !")
            .addField("Lundi :")
            .setTimestamp();


            message.channel.send({ embeds: [embed]})
      };



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

    
   

  
    
