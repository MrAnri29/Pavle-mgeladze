const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "pp",
    description: "გიჩვენებთ მომხმარებლის პენისის ზომას",
    utilization: "pp <@user>",
    example: "pp @vajex",
    cooldown: 3000,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    run: async (_, message, args) => {
        const targetUser = args[0] ? message.mentions.members.first().user : message.author;

        let randomNumber = Math.floor(Math.random() * 10);

        if (targetUser.id === "671359057679876177") randomNumber = 30;

        if (targetUser.id === "217643659925913603") randomNumber = 30;

        const ppSize = new EmbedBuilder()
            .setAuthor({
                name: `${targetUser.username}-ის პენისი`,
                iconURL: targetUser.displayAvatarURL({ dynamic: true }),
            })
            .setColor(0x808080)
            .setTimestamp();

        if (targetUser.id === "671359057679876177")
            ppSize.setTitle("EXTRA LARGE");

        if (targetUser.id === "217643659925913603")
            ppSize.setTitle("EXTRA LARGE");

        if (randomNumber === 0) ppSize.setTitle("HIPER SMALL");

        const noPenis = () => {
            ppSize.setTitle("პენისი არ შეინიშნება");
        };

        if (targetUser.id === "764888738832187403") {
            noPenis();
        } else if (targetUser.id === "691768579720216587") {
            noPenis();
        } else if (targetUser.id === "985544918422421515") {
            noPenis();
        } else {
            ppSize.setDescription(`8${"=".repeat(randomNumber) + "="}D`);
        }

        const gotBitches = () => {
            ppSize.setTitle("Bro got bitches");
            ppSize.setDescription("8D");
        }

        if (targetUser.id === "687978557468835909") {
            gotBitches();
        } else if (targetUser.id === "809788368044556328") {
            gotBitches();
        }
        message.reply({ embeds: [ppSize] });
    },
};