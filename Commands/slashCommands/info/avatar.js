const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'avatar',
  description: "მიიღეთ მომხმარებლის პროფილის სურათი",
  options: [{
    name: "user",
    description: "მომხმარებელი",
    type: 6,
    required: false,
  }],
  utilization: "avatar [user]",
  example: "avatar @vajex",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  run: async (client, interaction) => {
    const targetUser = interaction.options.getMember("user") || interaction
    const selfEmbed = new EmbedBuilder();
    selfEmbed.setAuthor({ name: targetUser.user.tag });
    selfEmbed.setDescription(`**ლინკები:**\n[png](${targetUser.user.displayAvatarURL({ dynamic: false, size: 1024, format: "png" })}) | [jpg](${targetUser.user.displayAvatarURL({ dynamic: false, size: 1024, format: "jpg" })}) | [webp](${targetUser.user.displayAvatarURL({ dynamic: true, size: 1024, format: "webp" })})`)
    selfEmbed.setImage(`${targetUser.user.displayAvatarURL({ dynamic: true, size: 1024 })}`);
    selfEmbed.setColor(0x5982E2);

    interaction.reply({ embeds: [selfEmbed] })
  }
};