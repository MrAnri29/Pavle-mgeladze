const {
    ApplicationCommandType,
    EmbedBuilder,
    CommandInteraction,
} = require("discord.js");
const axios = require("axios");
const { transparent } = require("../../../config.json");

module.exports = {
    name: "hentai",
    description: "აგზავნის ჰენტაის",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    utilization: "hentai",
    example: "hentai",
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (_, interaction) => {
        await interaction.deferReply();
        if (!interaction.channel.nsfw) {
            return interaction.followUp({
                content: "აქ არშეიძლება 18+ კონტენტის გაგზავნა!!!",
                ephemeral: true,
            });
        }
        const res = await axios.get(`https://nekobot.xyz/api/image?type=hentai`);
        const data = res.data;
        const embed = new EmbedBuilder()
            .setColor(transparent)
            .setImage(data.message);
        await interaction.followUp({ embeds: [embed] });
    },
};
