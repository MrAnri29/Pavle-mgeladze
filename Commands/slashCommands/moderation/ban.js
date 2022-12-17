const { EmbedBuilder } = require("discord.js");
const chalk = require("chalk")
const { fail, ban } = require("../../../config.json")

module.exports = {
  name: "ban",
  description: "დაადეთ ბანი მომხმარებელს",
  options: [
    {
      name: "user",
      description: "მომხმარებელი ვისაც უნდა დაადოთ ბანი",
      type: 6,
      required: true,
    },
    {
      name: "reason",
      description: "რის გამო დაადეთ ბანი?",
      type: 3,
      required: false,
    },
  ],
  utilization: "ban <user> [reason]",
  example: "ban @vajex ზედმეტად ბევრს ტლიკინებს",
  userPerms: ['BanMembers', 'SendMessages'],
  botPerms: ['BanMembers', 'SendMessages'],
  run: async (client, interaction) => {
    const target = interaction.options.getMember("user");
    const reason =
      interaction.options.getString("reason") || "`მიზეზი არ არის მითითებული`";

    if (target.id === interaction.member.id)
      return interaction.reply({
        content: `${fail} შენს თავს ბანს ვერ დაადებ.`, ephemeral: true
      });

    if (target.id === client.id)
      return interaction.reply({
        content: `${fail} შენ მე ბანს ვერ დამადებ.`, ephemeral: true
      });

    if (target.id === interaction.guild.ownerId)
      return interaction.reply({
        content: `${fail} სერვერის მფლობელს ბანს ვერ დაადებ.`, ephemeral: true
      });

    if (
      target.roles.highest.position >=
      interaction.member.roles.highest.position
    )
      return interaction.reply({
        content: `${fail} მომხმარებლის როლი შენს როლზე მაღლა დგას ან ერთი და იგივე როლი გაქვთ ამიტომ შენ მას ბანს ვერ დაადებ.`, ephemeral: true
      });

    try {
      const embed = new EmbedBuilder()
        .setDescription(`${ban} ბანი დავადე ${target}-ს`)
        .setColor(0x36393F)
        .setAuthor({ name: target.user.tag, iconURL: target.displayAvatarURL() })
        .setTimestamp()
        .setFooter({ text: `მოდერატორი: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
        .addFields({ name: 'მიზეზი:', value: `${reason}`, inline: true })
        .setThumbnail('https://cdn.discordapp.com/avatars/985544918422421515/d338678d727f413fbb40fc4ab92df4f7.png?size=1024')
      await target.ban({
        reason,
      });
      interaction.reply({ embeds: [embed] })
    } catch (err) {
      interaction.reply({ content: `${fail} მომხმარებლის როლი ჩემს როლზე მაღლა დგას ან ერთი და იგივე როლი გვაქვს ამიტომ მე მას ბანს ვერ დავადებ`, ephemeral: true })
    }
  },
};