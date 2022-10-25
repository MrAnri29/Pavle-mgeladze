const warnModel = require("../../../models/warnModel");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "warn",
  description: "გააფრთხილეთ მომხმარებელი.",
  options: [
    {
      name: "user",
      description: "მომხმარებელი რომლის გაფრთხილებაც გსურთ",
      type: 6,
      required: true,
    },
    {
      name: "reason",
      description: "რის გამო აგდებთ მომხმარებელს?",
      type: 3,
      required: true,
    },
  ],
  utilization: "warn <user> <reason>",
  example: "warn @vajex ზედმეტად ბევრს ტლიკინებს",
  userPerms: ["KickMembers"],
  botPerms: ["KickMembers"],
  run: async (client, interaction) => {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");

    new warnModel({
      userId: user.id,
      guildId: interaction.guild.id,
      moderatorId: interaction.user.id,
      reason,
      timestamp: Date.now(),
    }).save();

    user
      .send({
        content: `თქვენ გაგაფრთხილეს **${interaction.guild.name}**-ში. იმიტომ რომ: ${reason}`,
      })
      .catch((e) => {
        interaction.channel.send({
          content: `<@${user.id}> ძმა შენ გაგაფრთხილეს, დმ ვერ გწერ ამიტო აქ გეტყვი მიზეზს რა\nმიზეზი: \`${reason}\``,
        });
      });

    const warnedEmbed = new EmbedBuilder()
      .setAuthor({
        name: user.tag,
        iconURL: user.displayAvatarURL({ dynamic: true }),
      })
      .addFields(
        { name: "გავაფრთხილე:", value: `${user}`, inline: true },
        { name: "მიზეზი:", value: `${reason}`, inline: true }
      )
      .setColor(0x808080)
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: `მოდერატორი: ${interaction.user.tag}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
      });

    interaction.reply({
      embeds: [warnedEmbed],
      ephemeral: true,
    });
  },
};
