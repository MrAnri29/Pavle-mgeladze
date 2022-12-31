const {
    ApplicationCommandType,
    EmbedBuilder,
    CommandInteraction,
} = require("discord.js");
const axios = require("axios");
const { transparent } = require("../../../config.json");

module.exports = {
    name: "porn",
    description: "აგზავნის პორნოებს",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    utilization: "porn",
    example: "porn",
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (_, interaction) => {
        await interaction.deferReply()
        if (!interaction.channel.nsfw) {
            return interaction.followUp({
                content: "აქ არშეიძლება 18+ კონტენტის გაგზავნა!!!",
                ephemeral: true,
            });
        }
        const res = await axios.get(`https://nekobot.xyz/api/image?type=pgif`);
        const data = res.data;
        const embed = new EmbedBuilder()
            .setColor(transparent)
            .setImage(data.message);
        await interaction.followUp({ embeds: [embed] });
    },
};
