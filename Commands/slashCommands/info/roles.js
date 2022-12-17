const { ApplicationCommandType, EmbedBuilder } = require("discord.js");
const { transparent } = require("../../../config.json");
const moment = require("moment");

module.exports = {
    name: "roles",
    description: "მიიღეთ ინფორმაცია სერვერის როლების შესახებ",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    utilization: "roles",
    example: "roles",
    userPerms: ["SendMessages", "ManageRoles"],
    botPerms: ["SendMessages"],
    run: async (_, interaction) => {
        const rolesCount = interaction.guild.roles.cache.size - 1;
        const rolesString = interaction.guild.roles.cache
            .filter((r) => !r.name.includes("everyone"))
            .map((r) => r)
            .sort((x, y) => y.position - x.position)
            .join(", ");

        let rolesFinal = "Error :/";
        if (rolesCount > 80) rolesFinal = `სულ: ${rolesCount}`;
        if (rolesCount <= 80) rolesFinal = `სულ: ${rolesCount}\n${rolesString}`;

        const roles = new EmbedBuilder()
            .setAuthor({
                name: interaction.guild.name,
                iconURL: interaction.guild.iconURL({ dynamic: true }),
            })
            .setDescription(rolesFinal)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setTimestamp()
            .setColor(0x808080);
        interaction.reply({ embeds: [roles] });
    },
};
