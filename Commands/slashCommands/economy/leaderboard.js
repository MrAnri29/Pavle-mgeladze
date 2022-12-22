const { ApplicationCommandType, EmbedBuilder } = require("discord.js");
const Wallets = require("../../../models/wallet");

module.exports = {
    name: "leaderboard",
    description: "შეამოწმეთ სერვერზე ყველაზე მდიდარი ხალხი",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    utilization: "leaderboard",
    example: "leaderboard",
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        let members = [];
        const wallets = await Wallets.find({});
        for (let obj of wallets) {
            if (
                interaction.guild.members.cache
                    .map((member) => member.id)
                    .includes(obj.userId)
            )
                members.push(obj);
        }

        const lb = new EmbedBuilder()
            .setTitle(`Leaderboard ${interaction.guild.name}-ზე`)
            .setColor(0x808080)
            .setFooter({
                text: "ვაი შე გაჭირვებულო... მოდი ქოდინგს გასწავლი და ფული გექნება",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            });

        members = members.sort((a, b) => {
            return (b.balance + b.bank) - (a.balance + a.bank);
        });

        member = members.filter((value) => {
            return( value.balance + value.bank )> 0;
        });

        let pos = 0;
        for (let obj of members) {
            pos++;
            if (obj.userId === interaction.user.id)
                lb.setFooter({
                    text: `თქვენ ხართ ${pos} ადგილზე`,
                    iconURL: interaction.guild.iconURL({ dynamic: false }),
                });
        }

        members = members.slice(0, 10);
        let desc = "";
        for (let i; i < members.length; i++) {
            let user = client.users.cache.get(members[i].userId);
            if (!user) return;
            let balance = members[i].balance + members[i].bank;
            desc = `${i++}. ${user.tag} - ${balance}`;
        }

        lb.setDescription(desc);

        interaction.reply({ embeds: [lb] });
    },
};
