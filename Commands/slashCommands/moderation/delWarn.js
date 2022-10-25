const {
    ApplicationCommandType,
    EmbedBuilder
} = require('discord.js');
const warnModel = require('../../../models/warnModel.js');

module.exports = {
    name: "warn-delete",
    description: "წაუშალეთ გაფრთხილება მომხმარებელს",
    options: [{
        name: "warnid",
        description: "გაფრთხილების ID",
        type: 3,
        required: true,
    }, ],
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    utilization: "warn-delete <warnId>",
    example: "warn-delete 6342346234862534865",
    run: async (client, interaction) => {
        const warnId = interaction.options.getString("warnid");

        const data = await warnModel.findById(warnId)

        if (!data) {
            interaction.reply({
                content: `\`${warnId}\` ასეთი ID-თ გაფრთხილება არ მოიძებნება`
            })
        }

        data.delete();

        const removedWarnUser = interaction.guild.members.cache.get(data.userId);

        interaction.reply({
            content: `წავუშალე გაფრთხილება ${removedWarnUser}-ს`,
            ephemeral: true
        })
    }
};