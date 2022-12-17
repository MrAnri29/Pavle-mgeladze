const { ApplicationCommandType, EmbedBuilder } = require("discord.js");
const config = require("../../../config.json");
const moment = require("moment");
const { rm } = require("fs/promises");

module.exports = {
    name: "whois",
    description: "მიიღეთ ინფორმაცია მომხმარებლის შესახებ.",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    utilization: "whois <user>",
    example: "whois @vajex",
    options: [
        {
            name: "user",
            description: "მომხმარებელი",
            type: 6,
            required: true,
        },
    ],
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (_, interaction) => {
        const target = interaction.options.getMember("user");

        // Console

        let color = target.displayHexColor;
        if (color === "#000000") color = config.transparent;

        const statuses = {
            online: "<:online_status:1021011072691470387> Online",
            dnd: "<:dnd_status:1021011263238713365> DND",
            idle: "<:idle_status:1021011154660757525> Idle",
            offline: "<:offline_status:1021011341747695666> Offline/Invisible",
        };

        const embed = new EmbedBuilder()
            .setAuthor({
                name: target.user.tag,
                iconURL: target.user.displayAvatarURL({ dynamic: true }),
            })
            .setColor(color)
            .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter({
                text: `ID: ${target.user.id}`,
            })
            .addFields(
                {
                    name: "შემოვიდა",
                    value: `<t:${parseInt(target.joinedTimestamp / 1000)}:f>`,
                    inline: true,
                },
                {
                    name: "დარეგისტრირდა",
                    value: `<t:${parseInt(
                        target.user.createdTimestamp / 1000
                    )}:f>`,
                    inline: true,
                },
                {
                    name: "ფოტო",
                    value: `[Link](${target.user.displayAvatarURL({
                        dynamic: true,
                        size: 1024,
                    })})`,
                    inline: true,
                },
                {
                    name: "სტატუსი",
                    value: statuses[target.presence.status],
                    inline: true,
                },
                {
                    name: `როლები [${target.roles.cache.size - 1}]`,
                    value: target.roles.cache
                        .filter((r) => !r.name.includes("everyone"))
                        .map((r) => r)
                        .sort((x, y) => y.position - x.position)
                        .join(", "),
                    inline: false,
                }
            );

        interaction.reply({
            embeds: [embed],
        });
    },
};
