const { ApplicationCommandType } = require("discord.js");
const { success, fail } = require("../../../config.json");
const profile = require("../../../models/wallet");

module.exports = {
    name: "wallet-create",
    description: "გიკეთებთ საფულეს",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    utilization: "wallet-create",
    example: "wallet-create",
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (_, interaction) => {
        await interaction.deferReply();
        const isReg = await profile.find({
            userId: interaction.user.id,
        });
        if (isReg.length > 0) {
            return interaction.followUp({
                content: `${fail} თქვენ უკვე გაქვთ საფულე!`,
            });
        }
        if (isReg.length <= 0) {
            const createProfile = new profile({
                userId: interaction.user.id,
                balance: 1000,
                bank: 0,
            });

            createProfile.save().then(
                interaction.followUp({
                    content: `${success} თქვენ გააკეთეთ საფულე!`,
                })
            );
        }
    },
};