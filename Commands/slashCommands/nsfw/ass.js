const {
    ApplicationCommandType,
    EmbedBuilder,
    CommandInteraction,
} = require("discord.js");
const { transparent } = require("../../../config.json");
const axios = require("axios");

module.exports = {
    name: "ass",
    description: "ტრაკი",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    utilization: "ass [hentai/real]",
    example: "ass real",
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    options: [
        {
            name: "type",
            description: "უბრალოდ აირჩიეთ",
            type: 3,
            required: false,
            choises: [
                {
                    name: "real",
                    value: "rl",
                },
                {
                    name: "hentai",
                    value: "h",
                },
            ],
        },
    ],
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
        if (
            !interaction.options.get("type") ||
            interaction.options.get("type")?.value === "rl"
        ) {
            category = "ass";
        } else {
            category = "hass";
        }
        const res = await axios.get(
            `https://nekobot.xyz/api/image?type=${category}`
        );
        const data = res.data;
        const embed = new EmbedBuilder()
            .setColor(transparent)
            .setImage(data.message);
        await interaction.followUp({ embeds: [embed] });
    },
};
