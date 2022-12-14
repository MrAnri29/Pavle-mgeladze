const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const { success, fail } = require("../../../config.json");
const profile = require("../../../models/wallet");

module.exports = {
    name: "daily",
    description: "მიიღეთ თქვენი დღიური შემოსავალი!",
    type: ApplicationCommandType.ChatInput,
    cooldown: 86400000,
    utilization: "daily",
    example: "daily",
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (_, interaction) => {
        await interaction.deferReply();
        const user = await profile.findOne({ userId: interaction.user.id });

        if (!user) {
            return interaction.followUp({
                content: `${fail} თქვენ არ გაქვთ საფულე!\n*შესაქმნელად გამოიყენეთ ბრძანება /wallet-create*`,
                ephemeral: true,
            });
        }

        const date = Date.now() - user.daily;

        if (date < 86400000) {
            return interaction.followUp({
                content: `${fail} თქვენ უკვე აიღეთ თქვენი დღიური შემოსავალი!`,
                ephemeral: true,
            });
        }

        const amount = Math.floor(Math.random() * 500 + 100);

        await profile.updateOne(
            { userId: interaction.user.id },
            {
                balance: user.balance + amount,
                daily: Date.now(),
            }
        );

        interaction.followUp({
            content: `${success} თქვენ აიღეთ თქვენი დღიური შემოსავალი ${amount}₾`,
        });
    },
};