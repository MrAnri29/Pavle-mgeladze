const { ApplicationCommandType, CommandInteraction } = require("discord.js");
const Guilds = require("../../../models/guilds");
const { success } = require("../../../config.json");

module.exports = {
    name: "logs-msg",
    description: "მესიჯ ლოგები",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    utilization: "logs-msg <channel>",
    example: "logs-msg #msg-logs",
    userPerms: ["SendMessages", "ManageGuild"],
    botPerms: ["SendMessages"],
    options: [
        {
            name: "channel",
            description: "მომავალი ლოგების არხი",
            type: 7,
            channel_types: [0],
            required: true,
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (_, interaction) => {
        const { guild, options } = interaction;
        const msgChx = options.getChannel("channel");
        Guilds.findOne({ guildId: guild.id }, async (__, data) => {
            if (!data) {
                await Guilds.create({
                    guildId: guild.id,
                    msgChannel: msgChx.id,
                });
                return interaction.reply({
                    content: `${success} მესიჯ ლოგები: ${msgChx}`,
                });
            } else if (data) {
                await Guilds.updateOne(
                    { guildId: guild.id },
                    {
                        msgChannel: msgChx.id,
                    }
                );
                return interaction.reply({
                    content: `${success} მესიჯ ლოგები: ${msgChx}`,
                });
            }
        });
    },
};