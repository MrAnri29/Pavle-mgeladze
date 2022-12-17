const {
    ApplicationCommandType,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const { ownerId } = require("../../../config.json");
const moment = require("moment");
const { version } = require("../../../package.json");

module.exports = {
    name: "botinfo",
    description: "მიიღეთ ინფორმაცია ბოტის შესახებ.",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    utilization: "botinfo",
    example: "botinfo",
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    run: async (client, interaction) => {
        var d = moment.duration(client.uptime, "milliseconds");
        var days = Math.floor(d.asDays());
        var hours = Math.floor(d.asHours() - days * 24);
        var mins = Math.floor(d.asMinutes()) - hours * 60;
        var seconds = Math.floor(d.asSeconds()) - mins * 60;

        let invite = `[ლინკი](https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=8&scope=bot%20applications.commands)`,
            inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=8&scope=bot%20applications.commands`;

        const actionRow = new ActionRowBuilder().addComponents([
            new ButtonBuilder()
                .setLabel("Invite")
                .setURL(inviteUrl)
                .setStyle(ButtonStyle.Link),
        ]);

        const embed = new EmbedBuilder()
            .setAuthor({
                name: `${client.user.tag}-ის ინფორმაცია`,
                iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setColor(0x808080)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: `Owner:`, value: `<@${ownerId}>`, inline: true },
                {
                    name: `servers:`,
                    value: `${client.guilds.cache.size}`,
                    inline: true,
                },
                {
                    name: `members:`,
                    value: `${client.users.cache.size} `,
                    inline: true,
                },
                {
                    name: `uptime:`,
                    value: `${days}:${hours}:${mins}:${seconds}`,
                    inline: true,
                },
                { name: `version:`, value: `${version}`, inline: true },
                { name: `invite:`, value: `${invite}`, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: `ID: ${client.user.id}` });
        interaction.reply({ embeds: [embed], components: [actionRow] });
    },
};
