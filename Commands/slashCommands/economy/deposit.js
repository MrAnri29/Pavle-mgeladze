const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const { success, fail } = require('../../../config.json');
const profile = require("../../../models/wallet");

module.exports = {
    name: 'deposit',
    description: 'შეიტანეთ ფული ბანკში',
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    utilization: 'deposit <რაოდენობა>',
    example: 'deposit 1000',
    options: [{
        name: 'amount',
        description: 'რა თანხის შეტანა გნებავთ?',
        type: 4,
        required: true
    }],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async(client, interaction) => {
        const amount = interaction.options.getInteger("amount");
        const user = await profile.findOne({
            userId: interaction.user.id
        })

        if (!user) {
            return `${fail} თქვენ არ გაქვთ საფულე!\n*გასაკეთებლად გამოიყენეთ ბრძანება /wallet-create*`
        }

        if (amount > user.balance) {
            return interaction.reply({
                content: `${fail} თქვენ არგაქვთ საკმარისი თანხა!`,
                ephemeral: true
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

        interaction.reply({
            content: `${success} თქვენ შეიტანეთ ${amount}₾ ბანკში!`,
            ephemeral: true
        })
    }
}