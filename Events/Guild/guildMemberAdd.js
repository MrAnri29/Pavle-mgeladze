const { EmbedBuilder } = require("@discordjs/builders");
const client = require("../..");
const Guilds = require("../../models/guilds");

client.on("guildMemberAdd", async (member) => {
    Guilds.findOne({ guildId: member.guild.id }, async (_, data) => {
        if (!data) return;
        if (!data.joinChannel) return;
        const chx = data.joinChannel;
        const joinChx = member.guild.channels.cache.get(chx);
        if (!joinChx) return;
        joinChx
            .send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({
                            name: member.user.tag,
                            iconURL: member.user.displayAvatarURL({
                                dynamic: true,
                            }),
                        })
                        .setDescription(
                            `${member.user}, დარეგისტრირდა: <t:${parseInt(
                                member.user.createdTimestamp / 1000
                            )}:D>`
                        )
                        .setTimestamp()
                        .setFooter({
                            text: `ID: ${member.user.id}`,
                        })
                        .setColor(0x7df188),
                ],
            })
            .catch(() => null);
    });
});
