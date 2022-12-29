const { EmbedBuilder } = require("@discordjs/builders");
const client = require("../..");
const Guilds = require("../../models/guilds");

client.on("guildMemberRemove", async (member) => {
    Guilds.findOne({ guildId: member.guild.id }, async (_, data) => {
        if (!data) return;
        if (!data.leaveChannel) return;
        const chx = data.leaveChannel;
        const leaveChx = member.guild.channels.cache.get(chx);
        if (!leaveChx) return;
        let rolesStr = member.roles.cache
            .filter((r) => !r.name.includes("everyone"))
            .map((r) => r)
            .sort((x, y) => y.position - x.position)
            .join(", ");

        if (rolesStr.length > 1024) {
            rolesStr =
                "მომხმარებელს იმდენი როლი აქვს რო ემბედშიც ვერ დაეტევა ლმაო";
        }
        leaveChx
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
                        .addFields({
                            name: "როლები",
                            value: rolesStr,
                            inline: true,
                        })
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
