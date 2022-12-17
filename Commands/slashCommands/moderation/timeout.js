const { ApplicationCommandType, EmbedBuilder } = require("discord.js");
const { fail, transparent } = require("../../../config.json");
const ms = require("ms");

module.exports = {
  name: "timeout",
  description: "დაადეთ მომხმარებელს timeout-ი",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  utilization: "timeout <user> <time> [reason]",
  example: "timeout @vajex 5min ზედმეტად ბევრს ტლიკინებ!",
  options: [
    {
      name: "user",
      description: "მომხმარებელი",
      type: 6,
      required: true,
    },
    {
      name: "time",
      description: "დრო",
      type: 3,
      required: true,
      choices: [
        {
          name: "1min",
          value: "1min",
        },
        {
          name: "3min",
          value: "3min",
        },
        {
          name: "5min",
          value: "5min",
        },
        {
          name: "10min",
          value: "10min",
        },
        {
          name: "15min",
          value: "15min",
        },
        {
          name: "30min",
          value: "30min",
        },
        {
          name: "1hr",
          value: "1hr",
        },
        {
          name: "1day",
          value: "1day",
        },
        {
          name: "1week",
          value: "1week",
        },
      ],
    },
    {
      name: "reason",
      description: "მიზეზი",
      type: 3,
      required: false,
    },
  ],
  userPerms: ["ModerateMembers", "SendMessages"],
  botPerms: ["ModerateMembers", "SendMessages"],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const user = interaction.options.getMember("user");
    const time = interaction.options.getString("time");
    const reason = interaction.options.getString("reason") || "არ მოუცემიათ";

    if (user.user.id === interaction.user.id)
      return interaction.reply({
        content: `${fail} შენს თავს ვერ დაათაიმაუთებ`,
      });
    if (user.user.id === client.id)
      return interaction.reply({ content: `${fail} შენ მე ბანს ვერ დამადებ` });
    if (user.user.id === interaction.guild.ownerId)
      return interaction.reply({
        content: `${fail} სერვერის მფლობელს ვერ დაათაიმაუთებ`,
      });
    if (
      user.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.reply({
        content: `${fail} თქვენ არგაქვთ მაგდენი უფლება`,
      });
    if (
      user.roles.highest.position >=
      interaction.guild.members.me.roles.highest.position
    )
      return interaction.reply({
        content: `${fail} მე არ მაქვს მაგდენი უფლება`,
      });

    try {
      const embed = new EmbedBuilder()
        .setTitle("თქვენ დაგადეს Timeout")
        .setAuthor({
          name: interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true }),
        })
        .setDescription(
          `სერვერი: ${interaction.guild.name}\nდრო: ${time}\nმიზეზი: ${reason}`
        )
        .setFooter({
          text: `moderator: ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp()
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setColor(transparent);

      user.timeout(ms(time), reason).then(async () => {
        await interaction.reply({
          content: `დავადე **Timeout** ${user.user.tag}-ს\nმიზეზი: ${reason}\nდრო: ${time}`,
        }),
          user
            .send({
              embeds: [embed],
            })
            .catch(() => {
              return interaction
                .followUp(`${fail} მე მას პირადში ვერმივწერ`)
                .then((msg) => {
                  setTimeout(() => {
                    msg.delete();
                  }, 5000);
                });
            });
      });
    } catch (e) {
      interaction.reply({ content: `${fail} დაფიქსირდა შეცდომა :/` });
    }
  },
};
