const { EmbedBuilder } = require("discord.js");
const { afk } = require("../../../Collection/afk.js");

module.exports = {
    name: "afk",
    description: "დაიყენეთ AFK სტატუსი",
    utilization: "afk [მიზეზი]",
    example: "afk @vajex-ასთან ვარ გასული",
    cooldown: 5000,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    run: async (client, message, args) => {
        try {
            const reason = args[0] || "`მიზეზი არ არის მითითებული`";

            afk.set(message.author.id + message.guild.id, [Date.now(), reason]);
            message.member
                .setNickname(
                    `[AFK] ${message.member.nickname || message.author.username}`,
                    "Sets AFK status"
                )
                .catch(() => {
                    message
                        .reply({
                            content: ":x: მე ვერ შეგიცვლით ნიკნეიმს",
                        })
                        .then((msg) => {
                            setTimeout(() => {
                                msg.delete();
                            }, 1500);
                        });
                });

            const afkEmbed = new EmbedBuilder()
                .setAuthor({
                    name: `${message.author.tag}`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                    }),
                })
                .setTitle("თქვენ ხართ AFK")
                .setDescription(`\nმიზეზი: ${reason}`)
                .setTimestamp()
                .setColor(0x808080)
                .setThumbnail(
                    message.guild.iconURL({
                        dynamic: true,
                    })
                );

            message.reply({
                embeds: [afkEmbed],
            });
        } catch (err) {
            console.log(err);
        }
    },
};
