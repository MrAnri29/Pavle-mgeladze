const { ApplicationCommandType, EmbedBuilder } = require("discord.js");
const { fail, transparent } = require("../../../config.json");
const profile = require("../../../models/wallet");

module.exports = {
    name: "balance",
    description: "შეამოწმეთ რამდენი თანხა გაქვთ ბალანსზე",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    utilization: "balance",
    example: "balance",
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (_, interaction) => {
        const user = await profile.findOne({
            userId: interaction.user.id,
        });

        if (!user) {
            return interaction.reply({
                content: `${fail} თქვენ არ გაქვთ საფულე!\n*შესაქმნელად გამოიყენეთ ბრძანება /wallet-create*`,
                ephemeral: true,
            });
        }

        const userEmbed = new EmbedBuilder()
            .setAuthor({
                name: `საფულე ${interaction.guild.name}-ისთვის`,
                IconURL: interaction.guild.iconURL({ dynamic: true }),
            })
            .setDescription(
                `ბალანსი: ${user.balance}₾,\n\
                ბანკი: ${user.bank}₾,\n\
                სულ: ${user.balance + user.bank}₾`
            )
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setColor(transparent);

        interaction.reply({
            embeds: [userEmbed],
        });
    },
};
