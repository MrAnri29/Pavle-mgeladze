const {
    ApplicationCommandType,
    EmbedBuilder,
    CommandInteraction,
} = require("discord.js");
const { transparent } = require("../../../config.json");
const axios = require("axios");

module.exports = {
    name: "pussy",
    description: "აგზავნის ქალის ორგანოს ფოტოს :)",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    utilization: "pussy",
    example: "pussy",
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
        const res = await axios.get(`https://nekobot.xyz/api/image?type=pussy`);
        const json = await res.data;
        const embed = new EmbedBuilder()
            .setColor(transparent)
            .setImage(json.message);
        await interaction.followUp({ embeds: [embed] });
    },
};
