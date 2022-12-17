const { EmbedBuilder } = require("discord.js");
const { success } = require("../../../config.json");

module.exports = {
    name: "report-bug",
    description: "დაარეპორტეთ ბაგი",
    utilization: "report-bug <bug description>",
    example: "report-bug ბოტი არ აგზავნის ემბედს",
    cooldown: 10000,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    run: async (client, message, _, argsF) => {
        const bug = argsF.join(" ").replace("report-bug", "");
        client.channels.cache.get("1053615734351220766").send({
            content: "<@&1053615771567272066>",
            embeds: [
                new EmbedBuilder()
                    .setColor(0xff0000)
                    .setTitle("NEW BUG DETECTED")
                    .setDescription(bug)
                    .setFooter({
                        text: `Reported by: ${message.author.tag}`,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    })
                    .setThumbnail(
                        client.user.displayAvatarURL({ dynamic: true })
                    )
                    .setTimestamp(),
            ],
        });
        message.reply({
            content: `${success} **BUG**: ${bug}`
        }).then((msg) => {
            setTimeout(() => {
                msg.delete();
            }, 3000)
        })
    },
};
