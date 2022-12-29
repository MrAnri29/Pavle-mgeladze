const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const { success, fail } = require('../../../config.json');
const profile = require("../../../models/wallet");

module.exports = {
    name: "deposit",
    description: "შეიტანეთ ფული ბანკში",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    utilization: "deposit <რაოდენობა>",
    example: "deposit 1000",
    options: [
        {
            name: "amount",
            description: "რა თანხის შეტანა გნებავთ?",
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
        await interaction.deferReply();
        const amount = interaction.options.getInteger("amount");
        const user = await profile.findOne({
            userId: interaction.user.id,
        });

        if (!user) {
            return `${fail} თქვენ არ გაქვთ საფულე!\n*გასაკეთებლად გამოიყენეთ ბრძანება /wallet-create*`;
        }

        if (amount > user.balance) {
            return interaction.followUp({
                content: `${fail} თქვენ არგაქვთ საკმარისი თანხა!`,
                ephemeral: true,
            });
        }

        await profile.updateOne(
            { userId: interaction.user.id },
            {
                $set: {
                    balance: user.balance - amount,
                    bank: user.bank + amount,
                },
            }
        );

        interaction.followUp({
            content: `${success} თქვენ შეიტანეთ ${amount}₾ ბანკში!`,
            ephemeral: true,
        });
    },
};