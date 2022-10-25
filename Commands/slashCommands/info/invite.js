const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'invite',
  description: "მოიწვიეთ ბოტი.",
  utilization: "invite",
  example: "invite",
  cooldown: 3000,
  type: ApplicationCommandType.ChatInput,
  userPerms: [],
  botPerms: ['SendMessages'],
  run: async (client, interaction) => {
    const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=985544918422421515&permissions=1376739781702&scope=bot%20applications.commands`;
    const embed = new EmbedBuilder()
      .setTitle('მომიწვიე')
      .setDescription(`ჩემს მოსაწვევად დააკლიკე [აქ](${inviteUrl})`)
      .setColor('#03fcdb')
      .setTimestamp()
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({ text: client.user.tag })

    const actionRow = new ActionRowBuilder()
      .addComponents([
        new ButtonBuilder()
          .setLabel('Invite')
          .setURL(inviteUrl)
          .setStyle(ButtonStyle.Link)
      ])
    return interaction.reply({ embeds: [embed], components: [actionRow] })
  }
};
