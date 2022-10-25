const { ApplicationCommandType, EmbedBuilder } = require("discord.js");
const warnModel = require("../../../models/warnModel");
const moment = require("moment");

module.exports = {
  name: "warnings",
  description: "მიიღეთ ინფორმაცია მომხმარებლის გაფრთხილებების შესახებ",
  utilization: "warnings <user>",
  example: "warnings @vajex",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  options: [
    {
      name: "user",
      description: "მომხმარებელი",
      type: 6,
      required: true,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const target = interaction.options.getUser("user");

    const userWarnings = await warnModel.find({
      userId: target.id,
      guildId: interaction.guild.id,
    });

    if (!userWarnings.length)
      return interaction.reply({
        content: `${target.tag}-ს არ აქვს გაფრთხილებები`,
      });

    const embedDescription = userWarnings
      .map((warn) => {
        const moderator = interaction.guild.members.cache.get(warn.moderatorId);

        return [
          `**ID**: ${warn._id}`,
          `**მოდერატორი**: ${moderator || "გასულია სერვერიდან :("}`,
          `**მიზეზი**: ${warn.reason}`,
        ].join("\n");
      })
      .join("\n\n");

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${target.tag}-(ი)ს გაფრთხილებები`,
        iconURL: target.displayAvatarURL({ dynamic: true }),
      })
      .setDescription(embedDescription)
      .setTimestamp()
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setColor(0x808080);

    interaction.reply({
      embeds: [embed],
    });
  },
};
