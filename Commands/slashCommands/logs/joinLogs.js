const {
    ApplicationCommandType,
    CommandInteraction,
} = require("discord.js");
const Guilds = require("../../../models/guilds");
const { success } = require("../../../config.json");

module.exports = {
    name: "logs-join",
    description: "დააყენეთ ახალი წევრების ლოგების არხი",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    utilization: "set-welcome <channel>",
    example: "set-welcome #join-logs",
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
        const joinChx = options.getChannel("channel");
        Guilds.findOne({ guildId: guild.id }, async (__, data) => {
            if (!data) {
                await Guilds.create({
                    guildId: guild.id,
                    joinChannel: joinChx.id,
                });
                return interaction.reply({
                    content: `${success} შემოსული წევრების ლოგები: ${joinChx}`,
                });
            } else if (data) {
                await Guilds.updateOne(
                    { guildId: guild.id },
                    {
                        joinChannel: joinChx.id,
                    }
                );
                return interaction.reply({
                    content: `${success} შემოსული წევრების ლოგები: ${joinChx}`,
                });
            }
        });
    },
};
