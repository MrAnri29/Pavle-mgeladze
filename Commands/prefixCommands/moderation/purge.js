const { EmbedBuilder } = require("discord.js");
const ms = require("ms");
const { fail } = require("../../../config.json");

module.exports = {
    name: "purge",
    description: "წაშალეთ ბევრი მესიჯი ერთდროულად",
    utilization: "purge <რაოდენობა>",
    example: "purge 99",
    cooldown: 5000,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    run: async (client, message, args) => {
        try {
            let parseNum = Number(args[0]);
            if (isNaN(parseNum)) {
                return message.reply({
                    content: `${fail} მოცემული რაოდენობა არ არის რიცხვი!`,
                });
            }
            const amount = parseNum + 1;
            if (amount > 100) {
                return message.reply({
                    content: `${fail} თქვენ არ შეგიძლიათ წაშალოთ 99-ზე მეტი მესიჯი ერთდროულად!`,
                });
            }
            const successEmbed = new EmbedBuilder()
                .setAuthor({
                    name: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true }),
                })
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setColor(0x5865f2)
                .setFooter({
                    text: client.user.tag,
                    iconURL: client.user.displayAvatarURL({ dynamic: true }),
                });

            const messages = await message.channel.messages.fetch({
                limit: amount,
            });

            const filtered = messages.filter(
                (msg) => Date.now() - msg.createdTimestamp < ms("14 days")
            );

            if (filtered.size <= 0) {
                successEmbed.setDescription(
                    `მე ვერ წავშლი მესიჯებს რომლებიც არის 14 დღეზე გვიან დაწერილი!`
                );
            } else if (messages.size > filtered.size) {
                successEmbed.setDescription(
                    `<:shield:1024330320159445002> წავშალე ${
                        filtered.size - 1
                    } მესიჯი!\nვერ წავშალე ${
                        messages.size - filtered.size
                    } მესიჯი რადგან მესიჯები არის 14 დღეზე გვიან დაწერილი!`
                );
            } else {
                successEmbed.setDescription(
                    `<:shield:1024330320159445002> წავშალე ${
                        filtered.size - 1
                    } მესიჯი!`
                );
            }

            await message.channel.bulkDelete(filtered);

            message.channel
                .send({
                    embeds: [successEmbed],
                })
                .then((msg) => {
                    setTimeout(() => msg.delete(), 5000);
                })
                .catch(() => null);
        } catch (err) {
            console.log(err);
        }
    },
};
