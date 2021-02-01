const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../config.json');

exports.run = async (client, message, args) => {
    message.delete()
  // PARTE ALTERNATIVA ONDE SOMENTE O DONO USA  
  //const roleID = [
  //  "ID DO DONO"
  // ];
  //if (!roleID.includes(message.author.id)) return message.channel.send({embed: {
  //  color: 3447003,
	//	description: `${message.author}\n:x: **| Apenas o <@&805332872856469536> pode usar esse comando!**`
	//	}}).then(msg => msg.delete({timeout: 7000}));
  const roleA = await message.guild.roles.cache.find(role => role.id === "EU COLOQUEI O CARGO DO ADM GERAL"); 

  if (
    !message.member.roles.cache.some(r =>
      [
        "ID DO CARGO 1",  //CARGO 1
        "ID DO CARGO 2",  //CARGO 2
        "ID DO CARGO 3",  //CARGO 3
        "ID DO CARGO 4"   //CARGO 4
      ].includes(r.id) )) {
    return message.channel.send({embed: {
    color: 3447003,
		description: `**${message.author.username} esse comando é restrito.**`}}).then(msg => msg.delete({timeout: 7000}));
  } 

  let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    client.db.add(`reputation_${message.guild.id}_${user.id}`, args[1])
    let reputation = await client.db.fetch(`reputation_${message.guild.id}_${user.id}`)

    if (args[1] > 10)
            return message.channel.send({embed: {
    color: 3447003,
    description: `${message.author}\n:x: **| Forneça um número de reputação limite máximo \`10\`!**`
    }}).then(msg => msg.delete({timeout: 5000}));

        if (args[1] < 1)
            return message.channel.send({embed: {
    color: 3447003,
    description: `${message.author}\n:x: **| Forneça um de reputação limite mínimo \`1\`!**`
    }}).then(msg => msg.delete({timeout: 5000}));

  let reason = args.slice(2).join(" ");
    if(!reason) reason = "Não informado";
    if(!reason) return message.channel.send("Forneça um motivo para o relatório").then(msg => msg.delete({timeout: 5000}));

  let reputationEmbed = new Discord.MessageEmbed()
    .setAuthor(`Sistema de Reputação ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
    .setThumbnail(message.author.displayAvatarURL())
    .setColor("#00FFFF")
    .setDescription(`<:TG200_addrep:805873029259329586>** ┃ O  ${message.author} adicionou uma reputação para ${user.user}\n> 🎁 Reputação Adicionado: \`+${args[1]}\`\n> :bank: Reputação no banco: \`${reputation}\`**\n📝**Motivo:**\n${reason}`);

    //message.channel.send(`Adicionado \`${args[1]}\` créditos para **${user}**'s balance.\n> Current balance: \`${bal}\` credits.`)
    message.channel.send(reputationEmbed)

};


module.exports.help = {
  name:"addrep",
  aliases: ["ar"]
}
