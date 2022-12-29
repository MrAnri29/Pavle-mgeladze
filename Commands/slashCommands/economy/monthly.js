const { ApplicationCommandType, EmbedBuilder } = require("discord.js");
const { success, fail } = require("../../../config.json");
const profile = require("../../../models/wallet");

module.exports = {
    name: "monthly",
    description: "მიიღეთ თქვენი თვიური შემოსავალი!",
    type: ApplicationCommandType.ChatInput,
    cooldown: 2592000000,
    utilization: "monthly",
    example: "monthly",
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

        const date = Date.now() - user.monthly;

        if (date < 2592000000) {
            return interaction.followUp({
                content: `${fail} თქვენ უკვე აიღეთ თქვენი თვიური შემოსავალი!`,
                ephemeral: true,
            });
        }

        const amount = Math.floor(Math.random() * 2300 + 700);

        await profile.updateOne(
            { userId: interaction.user.id },
            {
                balance: user.balance + amount,
                monthly: Date.now(),
            }
        );

        interaction.followUp({
            content: `${success} თქვენ აიღეთ თქვენი თვიური შემოსავალი ${amount}₾`,
        });
    },
};
