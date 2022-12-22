const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "say",
    description: "say something",
    utilization: "say <message> || Embed as JSON",
    example: "say @vajex codingi iswavle",
    cooldown: 3000,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    run: async (client, message, _, argsF) => {
        const content = argsF.join(" ");
        if (content.includes("@everyone") || content.includes("@here")) {
            message.channel.send(
                "შენ ამ ბრძანებით არ შეგიძლია დათაგო everyone და here!"
            );
            return message.delete();
        }

        if (message.mentions.roles.first()) {
            message.channel.send("თქვენ არშეგიძლიათ მოპინგოთ როლები!");
            return message.delete();
        }
        if (message.mentions.users.first()) {
            message.channel.send("თქვენ არშეგიძლიათ მოპინგოთ ხალხი!");
            return message.delete();
        }
        const howToUse = new EmbedBuilder()
            .setTitle("ცალტვინაებისათვის")
            .setDescription("როგორ უნდა გამოვიყენოთ say ბრძანება")
            .addFields(
                {
                    name: "Utilization:",
                    value: "say <message> || Embed as JSON",
                },
                {
                    name: "Example:",
                    value: 'say @vajex codingi iswavle\nsay {"embeds":[{"title":"test","color":"010101"}]}',
                }
            )
            .setColor(0x808080)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }));
        if (!content) {
            return message.reply({
                embeds: [howToUse],
            });
        }
        try {
            if (content[0] === "{") {
                const params = JSON.parse(content);
                console.log(params);
                return message.reply(params).catch((err) => {
                    return message.reply({
                        embeds: [howToUse],
                    });
                });
            } else {
                return message.reply(content).catch((err) => {
                    return message.reply({ embeds: [howToUse] });
                });
            }
        } catch (err) {
            return message.reply({ embeds: [howToUse] });
        }
    },
};
