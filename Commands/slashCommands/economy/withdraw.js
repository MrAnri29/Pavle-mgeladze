const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const { success, fail } = require("../../../config.json");
const profile = require("../../../models/wallet");

module.exports = {
    name: "withdraw",
    description: "გამოიტანეთ თანხა ბანკიდან",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    utilization: "withdraw <რაოდენობა>",
    example: "withdraw 1000",
    options: [
        {
            name: "amount",
            description: "რა თანხის გამოტანა გსურთ?",
            type: 4,
            required: true,
        },
    ],
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (_, interaction) => {
        const amount = interaction.options.getInteger("amount");
        const user = await profile.findOne({ userId: interaction.user.id });

        if (!user) {
            return interaction.reply({
                content: `${fail} თქვენ არ გაქვთ საფულე!\n*შესაქმნელად გამოიყენეთ ბრძანება /wallet-create*`,
                ephemeral: true,
            });
        }

        if (amount > user.bank) {
            return interaction.reply({
                content: `${fail} თქვენ არგაქვთ საკმარისი თანხა!`,
                ephemeral: true,
            });
        }

        await profile.updateOne(
            { userId: interaction.user.id },
            {
                balance: user.balance + amount,
                bank: user.bank - amount,
            }
        );

        interaction.reply({
            content: `${success} თქვენ გამოიტანეთ ${amount}₾ ბანკიდან!`,
            ephemeral: true,
        });
    },
};