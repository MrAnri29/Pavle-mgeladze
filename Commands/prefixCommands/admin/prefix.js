const { EmbedBuilder } = require("discord.js");
const Guilds = require("../../../models/guilds");

module.exports = {
    name: "prefix",
    description: "დააყენეთ თქვენთვის სასურველი პრეფიქსი",
    utilization: "prefix <prefix>",
    example: "prefix #",
    cooldown: 10000,
    userPerms: ["SendMessages", "Administrator"],
    botPerms: ["SendMessages", "Administrator"],
    run: async (client, message, args, _, prefix) => {
        if (!args[0])
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({
                            name: `${message.guild.name}-ზე ჩემი პრეფიქსი`,
                            iconUrl: message.guild.iconURL({ dynamic: true }),
                        })
                        .setDescription(prefix)
                        .setColor(0x808080),
                ],
            });
        if (args[0].length > 5)
            return message.reply(
                "ხოარ გაგიტკბა ძმა? პრეფიქსსში არშეიძლება იყოს 5-ზე მეტი სიმბოლო"
            );
        const guild = await Guilds.findOne({
            guildId: message.guild.id,
        });
        if (!guild) {
            await Guilds.create({
                guildId: message.guild.id,
                prefix: args[0],
            });
            return message.reply("ახალი პრეფიქსია: " + args[0]);
        } else {
            await Guilds.updateOne(
                { guildId: message.guild.id },
                { prefix: args[0] }
            );
            return message.reply("ახალი პრეფიქსია: " + args[0]);
        }
    },
};
