const { ApplicationCommandType, EmbedBuilder } = require("discord.js");
const ms = require("ms");
const { fail } = require("../../../config.json");

module.exports = {
  name: "purge",
  description: "წაშალეთ რამდენიმე მესიჯი ერთდროულად",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  utilization: "purge <amount>",
  example: "purge 10",
  options: [
    {
      name: "amount",
      description: "რამდენი მესიჯი გინდათ რომ წაშალოთ",
      type: 4,
      required: true,
    },
  ],
  userPerms: ["ManageMessages", "SendMessages"],
  botPerms: ["ManageMessages", "SendMessages"],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const amount = interaction.options.getInteger("amount");

    if (amount >= 100)
      return interaction.reply({
        content: `${fail} თქვენ არშეგიძლიათ წაშალოთ 99-ზე მეტი მესიჯი ერთდროულად`,
      });

    const successEmbed = new EmbedBuilder()
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setColor(0x5865f2)
      .setFooter({
        text: client.user.tag,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      });

    const messages = await interaction.channel.messages.fetch({
      limit: amount,
    });

    const filtered = messages.filter(
      (msg) => Date.now() - msg.createdTimestamp < ms("14 days")
    );

    if (filtered.size <= 0) {
      successEmbed.setDescription(
        `მე ვერ წავშლი მესიჯებს რომლებიც არის 14 დღეზე გვიან დაწერილი!`
      );
    } else if (messages.size > filtered.size) {
      successEmbed.setDescription(
        `<:shield:1024330320159445002> წავშალე ${
          filtered.size
        } მესიჯი!\nვერ წავშალე ${
          messages.size - filtered.size
        } მესიჯი რადგან მესიჯები არის 14 დღეზე გვიან დაწერილი!`
      );
    } else {
      successEmbed.setDescription(
        `<:shield:1024330320159445002> წავშალე ${filtered.size} მესიჯი!`
      );
    }

    await interaction.channel.bulkDelete(filtered);

    interaction
      .reply({
        embeds: [successEmbed],
      })
      .then(() => {
        setTimeout(() => interaction.deleteReply(), 5000);
      })
      .catch(() => null);
  },
};
