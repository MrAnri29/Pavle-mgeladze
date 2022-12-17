const { EmbedBuilder } = require("discord.js");
const { fail, kick } = require("../../../config.json");

module.exports = {
  name: "kick",
  description: "გააგდეთ მომხმარებელი სერვერიდან",
  options: [
    {
      name: "user",
      description: "მომხმარებელი რომლის გაგდებაც გსურთ",
      type: 6,
      required: true,
    },
    {
      name: "reason",
      description: "რის გამო აგდებთ მომხმარებელს?",
      type: 3,
      required: false,
    },
  ],
  utilization: "kick <user> [reason]",
  example: "kick @vajex ზედმეტად ბევრს ტლიკინებს",
  userPerms: ['KickMembers', 'SendMessages'],
  botPerms: ['KickMembers', 'SendMessages'],
  run: async (client, interaction) => {
    const target = interaction.options.getMember("user");
    const reason =
      interaction.options.getString("reason") || "`მიზეზი არ არის მითითებული`";

    if (target.id === interaction.member.id)
      return interaction.reply({
        content: `${fail} შენს თავს ვერ გააგდებ.`, ephemeral: true
      });

    if (target.id === client.id)
      return interaction.reply({
        content: `${fail} შენ მე ვერ გამაგდებ.`, ephemeral: true
      });

    if (target.id === interaction.guild.ownerId)
      return interaction.reply({
        content: `${fail} სერვერის მფლობელს ვერ გააგდებ.`, ephemeral: true
      });

    if (
      target.roles.highest.position >=
      interaction.member.roles.highest.position
    )
      return interaction.reply({
        content: `${fail} მომხმარებლის როლი შენს როლზე მაღლა დგას ან ერთი და იგივე როლი გაქვთ ამიტომ შენ მას ვერ გააგდებ.`, ephemeral: true
      });

    try {
      const embed = new EmbedBuilder()
        .setDescription(`${kick} გავაგდე ${target}`)
        .setColor(0x36393F)
        .setAuthor({ name: target.user.tag, iconURL: target.displayAvatarURL() })
        .setTimestamp()
        .setFooter({ text: `მოდერატორი: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
        .addFields({ name: 'მიზეზი:', value: `${reason}`, inline: true })
        .setThumbnail('https://cdn.discordapp.com/avatars/985544918422421515/d338678d727f413fbb40fc4ab92df4f7.png?size=1024')
      await target.kick({
        reason,
      });
      interaction.reply({ embeds: [embed] })
    } catch (err) {
      interaction.reply({ content: `${fail} მომხმარებლის როლი ჩემს როლზე მაღლა დგას ან ერთი და იგივე როლი გვაქვს ამიტომ მე მას ვერ გავაგდებ`, ephemeral: true })
    }
  },
};