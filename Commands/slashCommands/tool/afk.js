const {
  ApplicationCommandType,
  EmbedBuilder
} = require('discord.js');
const {
  afk
} = require("../../../Collection/afk.js")
const chalk = require("chalk")

module.exports = {
  name: 'afk',
  description: "დაიყენეთ AFK სტატუსი.",
  utilization: "afk [reason]",
  example: "afk მაღაზიაში ვარ გასული",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  options: [{
    name: 'reason',
    description: 'მიზეზი თუ რატომ იყენებთ AFK სტატუსს.',
    type: 3,
    required: false,
  }],
  run: async (client, interaction) => {
    try {
      const reason =
        interaction.options.getString("reason") || "`მიზეზი არ არის მითითებული`";
      const user = interaction.member;

      afk.set(interaction.user.id+interaction.guild.id, [Date.now(), reason])

      const afkEmbed = new EmbedBuilder()
        .setAuthor({
          name: `${interaction.user.tag}`,
          iconURL: user.displayAvatarURL({
            dynamic: true
          })
        })
        .setTitle('თქვენ ხართ AFK')
        .setDescription(`\nმიზეზი: ${reason}`)
        .setTimestamp()
        .setColor(0x808080)
        .setThumbnail(interaction.guild.iconURL({
          dynamic: true
        }))

      interaction.reply({
        embeds: [afkEmbed]
      })
    } catch (err) {
      console.log(err)
    }
  }
};