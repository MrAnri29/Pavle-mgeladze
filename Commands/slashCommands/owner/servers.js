const {
  ApplicationCommandType,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");
const { fail } = require("../../../config.json");
const chalk = require("chalk");

module.exports = {
  name: "servers",
  description: "Display servers bot is in",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  utilization: "servers",
  example: "servers",
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    if (
      interaction.user.id !== "671359057679876177" &&
      interaction.user.id !== "217643659925913603"
    )
      return interaction.channel.send({
        content: `${fail} მხოლოდ BOT-ის მფლობელებს შეუძლია გამოიყენოს ეს ბრძანება!`,
      });

    const embed = new EmbedBuilder().setAuthor({
      name: `${client.user.username}-ის სერვერები`,
      iconURL: client.user.displayAvatarURL({ dynamic: true }),
    });

    try {
      var invites = [];
      client.guilds.cache.forEach(async (guild) => {
        const channel = guild.channels.cache
          .filter((channel) => channel.type === 0)
          .first();

        if (
          !channel ||
          !guild.members.me.permissions.has(
            PermissionsBitField.Flags.CreateInstantInvite
          )
        )
          return;

        await channel
          .createInvite({
            maxAge: 0,
            maxUses: 0,
          })
          .then((inv) => invites.push(inv.url));

        await embed.addFields({
          name: guild.name,
          value: "\u200B",
        });
      });
    } catch (e) {
      console.log(chalk.red(e));
    }

      interaction.reply({ embeds: [embed] });
        interaction.channel.send({ content: invites.join("\n") || "NICHIEVO" })
  },
};
