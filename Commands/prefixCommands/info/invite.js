const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder
} = require('discord.js');

module.exports = {
    name: 'invite',
    description: "მოიწვიეთ ბოტი.",
    utilization: "invite",
    example: "invite",
    cooldown: 3000,
    userPerms: ['SendMessages'],
    botPerms: ['SendMessages'],
    run: async (client, message) => {
        const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=8&scope=bot%20applications.commands`;
        const embed = new EmbedBuilder()
            .setTitle('მომიწვიე')
            .setDescription(`ჩემს მოსაწვევად დააკლიკე [აქ](${inviteUrl})`)
            .setColor('#03fcdb')
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({
                text: client.user.tag
            })

        const actionRow = new ActionRowBuilder()
            .addComponents([
                new ButtonBuilder()
                .setLabel('Invite')
                .setURL(inviteUrl)
                .setStyle(5)
            ])
        message.reply({
            embeds: [embed],
            components: [actionRow]
        })
    }
};