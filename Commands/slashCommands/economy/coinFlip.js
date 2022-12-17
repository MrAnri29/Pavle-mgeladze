const { ApplicationCommandType, EmbedBuilder } = require("discord.js");
const { success, fail } = require("../../../config.json");
const profile = require("../../../models/wallet");

module.exports = {
    name: "coinflip",
    description: "გერბი თუ საფასური",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    utilization: "coinflip <თანხა> <არჩევანი>",
    example: "coinflip 500 საფასური",
    options: [
        {
            name: "amount",
            description: "რამდენის დადება გსურთ?",
            type: 4,
            required: true,
        },
        {
            name: "choice",
            description: "თქვენი არჩევანი",
            type: 3,
            required: true,
            choices: [
                {
                    name: "გერბი",
                    value: "გერბი",
                },
                {
                    name: "საფასური",
                    value: "საფასური",
                },
            ],
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
        const choice = interaction.options.getString("choice");

        const user = await profile.findOne({ userId: interaction.user.id });

        if (!user) {
            return interaction.reply({
                content: `${fail} თქვენ არ გაქვთ საფულე!\n*შესაქმნელად გამოიყენეთ ბრძანება /wallet-create*`,
                ephemeral: true,
            });
        }

        if (amount > user.balance) {
            return interaction.reply({
                content: `${fail} თქვენ არ გაქვთ საკმარისი თანხა!`,
            });
        }

        if (amount < 100) {
            return interaction.reply({
                content: `${fail} თქვენ ვერ დადებთ 100₾-ზე ნაკლებს!`,
            });
        }

        const cf = ["გერბი", "საფასური"];
        const cfRandom = cf[Math.floor(Math.random() * cf.length)];

        let win = Math.floor(Math.random() * 2000 + amount);

        if (win > user.balance) {
            win = user.balance;
        }

        const cfEmbed = new EmbedBuilder();

        if (cfRandom == choice) {
            cfEmbed
                .setDescription(
                    `გილოცავ! შენ მოიგე ${win}₾ რადგან ამოვარდა: ${cfRandom}!`
                )
                .setColor(0x008800);
            await profile.updateOne(
                { userId: interaction.user.id },
                {
                    balance: user.balance + win,
                }
            );
            return interaction.reply({
                embeds: [cfEmbed],
            });
        } else {
            cfEmbed
                .setDescription(
                    `ეჰ... შენ წააგე ${amount}₾ რადგან ამოვარდა: ${cfRandom}!`
                )
                .setColor(0xff0000);
            await profile.updateOne(
                { userId: interaction.user.id },
                {
                    balance: user.balance - amount,
                }
            );
            return interaction.reply({
                embeds: [cfEmbed],
            });
        }
    },
};