const {
    ApplicationCommandType,
    EmbedBuilder,
    CommandInteraction,
} = require("discord.js");
const Wallets = require("../../../models/wallet");
const { transparent } = require("../../../config.json");

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
        await interaction.deferReply()
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
            .setColor(transparent)
            .setFooter({
                text: "ვაი შე გაჭირვებულო... მოდი ქოდინგს გასწავლი და ფული გექნება",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            });

        members = members.sort((a, b) => {
            return b.balance + b.bank - (a.balance + a.bank);
        }).filter((value) => {
            return value.balance + value.bank > 0;
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

        members = members.slice(0, 5);
        let desc = "";
        for (i = 0; i < members.length; i++) {
            let user = client.users.cache.get(members[i].userId);
            if (!user) return;
            let bal = members[i].balance + members[i].bank
            desc += `${1 + i}. *${
                user.tag
            }* : \`${bal.toLocaleString()} 💠\`\n`;
        }
        lb.setDescription(desc)

        interaction.followUp({ embeds: [lb] });
    },
};
