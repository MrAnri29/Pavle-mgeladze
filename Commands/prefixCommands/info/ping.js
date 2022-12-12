const {
    EmbedBuilder,
} = require('discord.js');

module.exports = {
    name: "ping",
    description: "გაიგეთ ბოტის პინგი",
    utilization: "ping",
    example: "ping",
    cooldown: 3000,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    run: async (client, message, args) => {
    const myMsg = await message.reply(":ping_pong: Pong!");
    const msg = await message.fetch();
    const embed = new EmbedBuilder()
        .setAuthor({
            name: message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
        })
        .setColor(0x808080)
        .setTimestamp()
        .setDescription(
            `**Time:** ${Math.floor(
                msg.createdTimestamp - message.createdTimestamp
            )} ms\n**API Ping:** ${client.ws.ping} ms`
        );
    myMsg.edit({
        embeds: [embed],
        content: `<@${message.author.id}>`,
    });
    }
}