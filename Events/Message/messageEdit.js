const { EmbedBuilder, Message } = require("@discordjs/builders");
const client = require("../..");
const Guilds = require("../../models/guilds");

/**
 * @param {Message} oldMsg
 * @param {Message} newMsg
 */

client.on("messageUpdate", async (oldMsg, newMsg) => {
    if (oldMsg.author == null) return;
    if (oldMsg.author.bot) return;
    if (oldMsg.content === newMsg.content) return;
    if (oldMsg.channel.type !== 0) return;
    Guilds.findOne({ guildId: newMsg.guild.id }, async (_, data) => {
        if (!data) return;
        if (!data.msgChannel) return;
        const chx = data.msgChannel;
        const msgChx = newMsg.guild.channels.cache.get(chx);
        if (!msgChx) return;
        const limit = 2000;
        const original =
            oldMsg.content.slice(0, limit) +
            (oldMsg.content.length > limit ? "..." : "");
        const updated =
            newMsg.content.slice(0, limit) +
            (newMsg.content.length > limit ? "..." : "");
        const embed = new EmbedBuilder()
            .setAuthor({
                name: newMsg.author.username,
                iconURL: newMsg.author.displayAvatarURL({ dynamic: true }),
            })
            .setColor(0x56a0d3)
            .setTitle(`მესიჯი დააედითეს #${newMsg.channel.name}-ში`)
            .setURL(newMsg.url)
            .setDescription(
                `
            ძველი: ${original}
            ახალი: ${updated}
            `
            )
            .setTimestamp()
            .setFooter({ text: `ID: ${newMsg.author.id}` });
        msgChx
            .send({
                embeds: [embed],
            })
            .catch(() => null);
    });
});
