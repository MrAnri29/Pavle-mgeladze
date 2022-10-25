const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const { transparent } = require("../../../config.json");

module.exports = {
  name: 'membercount',
  description: "შეამოწმეთ რამდენი მომხმარებელია სერვერზე",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  utilization: "membercount",
  example: "membercount",
  run: async (client, interaction) => {
    const embed = new EmbedBuilder();
    embed.setAuthor({ name: "მომხმარებლები", iconURL: interaction.guild.iconURL({ dynamic: true }) });
    embed.setDescription(`${interaction.guild.memberCount}`);
    embed.setTimestamp();
    embed.setColor(transparent);
    embed.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
    interaction.reply({ embeds: [embed] })
  }
};