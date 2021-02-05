const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const { MessageEmbed } = require ("discord.js")

module.exports = {
    name: "daily",
    aliases: [],
    description: "Cooldown de comando",
    clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    userPermissions: [],
    run: async (client, message, args) => {
    message.delete()
		let user = message.author;
    
		let timeout = 10000;
		
		let teste2 = await client.db.fetch(`comando_${message.guild.id}_${user.id}`);
		
		if (teste2 !== null && timeout - (Date.now() - teste2) > 0) {
          let time = ms(timeout - (Date.now() - teste2));
          message.channel.send(`<:TG200_Fire:807309271712006188>**┃ ${message.author} Calma aí! Você precisa esperar \`${time.seconds}\` segundos para executar o comando novamente!**`)
      } else {
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ADD SEU COMANDO AQUI ABAIXO━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
        let avatar = message.author.displayAvatarURL({dynamic: true})
          let moneyEmbed = new Discord.MessageEmbed()
              .setTitle("TITULO")
              .setColor("#ff0015")
              .setAuthor(message.author.username, avatar)
              .setThumbnail("https://i.imgur.com/RGQCyjD.png")
              .setDescription(
                  "️`1º` EM BREVE\n"+
                  "`2º` EM BREVE\n"
              )
              .setTimestamp()
              .setFooter('EM BREVE');
          message.channel.send(moneyEmbed)
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
          client.db.set(`comando_${message.guild.id}_${user.id}`, Date.now())
      }
    }
}
