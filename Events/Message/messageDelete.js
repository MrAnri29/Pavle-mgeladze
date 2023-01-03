const { EmbedBuilder, Message } = require("@discordjs/builders");
const client = require("../..");
const Guilds = require("../../models/guilds");

/**
 * @param {Message} message
 */

client.on("messageDelete", async (message) => {
    if (message.author == null) return;
    if (message.author.bot) return;
    if (message.channel.type !== 0) return;
    Guilds.findOne({ guildId: message.guild.id }, async (_, data) => {
        if (!data) return;
        if (!data.msgChannel) return;
        const chx = data.msgChannel;
        const msgChx = message.guild.channels.cache.get(chx);
        if (!msgChx) return;
        msgChx
            .send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL({
                                dynamic: true,
                            }),
                        })
                        .setTitle(`მესიჯი წაიშალა #${message.channel.name}-ში`)
                        .setDescription((message.content ? message.content : "Null").slice(0, 4090) + (message.content > 4090 ? "..." : ""))
                        .setTimestamp()
                        .setFooter({
                            text: `ID: ${message.author.id}`,
                        })
                        .setColor(0xD90426),
                ],
            })
            .catch(() => null);
    });
});
