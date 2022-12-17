const { ApplicationCommandType, EmbedBuilder } = require("discord.js");
const { success, fail } = require("../../../config.json");
const profile = require("../../../models/wallet");

module.exports = {
    name: "rob",
    description: "მოიპარეთ ფული",
    type: ApplicationCommandType.ChatInput,
    cooldown: 7200000,
    utilization: "rob <მომხმარებელი>",
    example: "rob @vajex",
    options: [
        {
            name: "user",
            description: "ვისი გაქურდვა გსურთ?",
            type: 6,
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
        const member = interaction.options.getUser("user");
        const user = await profile.findOne({ userId: interaction.user.id });
        const target = await profile.findOne({ userId: member.id });
        if (!target) {
            return interaction.reply({
                content: `${fail} მას საფულეც არ აქვს და როგორ გაქურდავ?`,
                ephemeral: true,
            });
        }

        if (!user) {
            return interaction.reply({
                content: `${fail} თქვენ არ გაქვთ საფულე\n*შესაქმნელად გამოიყენეთ ბრძანება /wallet-create*`,
                ephemeral: true,
            });
        }

        const date = Date.now() - user.rob;

        if (date < 7200000) {
            return interaction.reply({
                content: `${fail} თქვენ უკვე გამოიყენეთ ეს ბრძანება!`,
            });
        }

        if (target.balance <= 0) {
            return interaction.reply({
                content: `${fail} არგეცოდება? ისედაც ვალებშია ადამიანი`,
            });
        }

        const rob = Math.abs(Math.floor(Math.random() * 2));
        let amount = Math.abs(Math.floor(Math.random() * 500 + 50));

        if (amount > target.balance) {
            amount = target.balance;
        } else if (amount > user.balance) {
            amount = user.balance;
        }

        if (rob === 1) {
            await profile.updateOne(
                { userId: interaction.user.id },
                {
                    balance: user.balance + amount,
                    rob: Date.now(),
                }
            );
            await profile.updateOne(
                { userId: member.id },
                {
                    balance: target.balance - amount,
                }
            );
            return interaction.reply({
                content: `${success} თქვენ მოპარეთ **${member.username}**-ს ${amount} ლარი!`,
            });
        } else {
            await profile.updateOne(
                { userId: interaction.user.id },
                {
                    balance: user.balance - amount,
                    rob: Date.now(),
                }
            );
            return interaction.reply({
                content: `${fail} თქვენ დაგიჭირათ პოლიციამ და დაგაჯარიმათ ${amount} ლარით!`,
            });
        }
    },
};
