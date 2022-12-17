const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "ping",
    description: "შეამოწმეთ ბოტის ბინგი.",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    utilization: "ping",
    example: "ping",
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    run: async (client, interaction) => {
        await interaction.reply(":ping_pong: Pong!");
        const msg = await interaction.fetchReply();
        const embed = new EmbedBuilder()
            .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            })
            .setColor("BLUE")
            .setTimestamp()
            .setDescription(
                `**Time:** ${Math.floor(
                    msg.createdTimestamp - interaction.createdTimestamp
                )} ms\n**API Ping:** ${client.ws.ping} ms`
            );
        interaction.editReply({
            embeds: [embed],
            content: `<@${interaction.user.id}>`,
        });
    },
};