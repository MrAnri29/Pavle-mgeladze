const {
    ApplicationCommandType,
    EmbedBuilder,
    ChannelType,
} = require("discord.js");

module.exports = {
    name: "say",
    description: "ათქმევინეთ ბოტს რაიმე.",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    utilization: "say <text>",
    example: "say @vajexa მაგარი კაცია",
    options: [
        {
            name: "text",
            description: "თქვენი ტექსტი",
            type: 3,
            required: true,
        },
        {
            name: "channel",
            description: "არხი სადაც გინდათ გააგზავნოთ მესიჯი",
            type: 7,
            channel_types: [0],
            required: false,
        },
    ],
    userPerms: ["SendMessages", "MentionEveryone"],
    botPerms: ["SendMessages", "MentionEveryone"],
    run: async (_, interaction) => {
        const text = interaction.options.getString("text");
        const channel = interaction.options.getChannel("channel");
        if (text.includes("@everyone") || text.includes("@here"))
            return message.reply(
                "შენ ამ ბრძანებით არ შეგიძლია დათაგო everyone და here!"
            );
        if (channel) {
            const channelX = interaction.guild.channels.cache.get(channel.id);
            channelX.send({ content: text }).then(
                interaction.reply({
                    content: "გავაგზავნე!",
                    ephemeral: true,
                })
            );
        } else {
            interaction.channel.send({ content: text }).then(
                interaction.reply({
                    content: "გავაგზავნე!",
                    ephemeral: true,
                })
            );
        }
    },
};
