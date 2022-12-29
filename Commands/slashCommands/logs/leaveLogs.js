const { ApplicationCommandType, CommandInteraction } = require("discord.js");
const Guilds = require("../../../models/guilds");
const { success } = require("../../../config.json");

module.exports = {
    name: "log-leave",
    description: "დააყენეთ გასული წევრების ლოგების არხი",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    utilization: "log-leave <channel>",
    example: "log-leave #leave-logs",
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
        const leaveChx = options.getChannel("channel");
        Guilds.findOne({ guildId: guild.id }, async (__, data) => {
            if (!data) {
                await Guilds.create({
                    guildId: guild.id,
                    leaveChannel: leaveChx.id,
                });
                return interaction.reply({
                    content: `${success} გასული წევრების ლოგები: ${leaveChx}`,
                });
            } else if (data) {
                await Guilds.updateOne(
                    { guildId: guild.id },
                    {
                        leaveChannel: leaveChx.id,
                    }
                );
                return interaction.reply({
                    content: `${success} გასული წევრების ლოგები: ${leaveChx}`,
                });
            }
        });
    },
};
