const { ApplicationCommandType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "pp",
  description: "გაზომეთ მომხმარებლის პენისი.",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  utilization: "pp [user]",
  example: "pp @vajex",
  options: [
    {
      name: "user",
      description: "მომხმარებელი",
      type: 6,
      required: false,
    },
  ],
  run: async (client, interaction) => {
    const targetUser = interaction.options.getMember("user") || interaction;

    let randomNumber = Math.floor(Math.random() * 10);

    if (targetUser.user.id === "671359057679876177") randomNumber = 30;

    if (targetUser.user.id === "217643659925913603") randomNumber = 30;

    const ppSize = new EmbedBuilder()
      .setAuthor({
        name: `${targetUser.user.username}-ის პენისი`,
        iconURL: targetUser.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor(0x808080)
      .setTimestamp();

    if (targetUser.user.id === "671359057679876177")
      ppSize.setTitle("EXTRA LARGE");

    if (targetUser.user.id === "217643659925913603")
      ppSize.setTitle("EXTRA LARGE");

    if (randomNumber === 0) ppSize.setTitle("HIPER SMALL");

    if (targetUser.user.id === "764888738832187403") {
      ppSize.setTitle("პენისი არ შეინიშნება");
    } else if (targetUser.user.id === "691768579720216587") {
      ppSize.setTitle("პენისი არ შეინიშნება");
    } else if (targetUser.user.id === "985544918422421515") {
      ppSize.setTitle("პენისი არ შეინიშნება");
    } else {
      ppSize.setDescription(`8${"=".repeat(randomNumber) + "="}D`);
    }

    if (targetUser.user.id === "687978557468835909") {
      ppSize.setTitle("Bro got bitches");
      ppSize.setDescription("8D");
    } else if (targetUser.user.id === "809788368044556328") {
      ppSize.setTitle("Bro got bitches");
      ppSize.setDescription("8D");
    }
    interaction.reply({ embeds: [ppSize] });
  },
};
