const { ApplicationCommandType, EmbedBuilder, CommandInteraction } = require("discord.js");
const { success } = require("../../../config.json");

module.exports = {
    name: "report-bug",
    description: "დაარეპორტეთ ბაგი",
    type: ApplicationCommandType.ChatInput,
    cooldown: 10000,
    utilization: "report-bug <bug-description>",
    example: "report-bug ბოტი არ აგზავნის ემბედს",
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    options: [
        {
            name: "bug",
            description: "ბაგი",
            type: 3,
            required: true,
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const bug = interaction.options.getString("bug");
        client.channels.cache.get("1053615734351220766").send({
            content: "<@&1053615771567272066>",
            embeds: [
                new EmbedBuilder()
                    .setColor(0xff0000)
                    .setTitle("NEW BUG DETECTED")
                    .setDescription(bug)
                    .setFooter({
                        text: `Reported by: ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                        }),
                    })
                    .setThumbnail(
                        client.user.displayAvatarURL({ dynamic: true })
                    )
                    .setTimestamp(),
            ],
        });
        interaction.reply({
            content: `${success} **BUG**: ${bug}`,
            ephemeral: true,
        });
    },
};
