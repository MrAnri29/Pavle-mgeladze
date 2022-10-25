const { ApplicationCommandType, EmbedBuilder } = require("discord.js");
const { transparent } = require("../../../config.json");
const moment = require("moment");

module.exports = {
  name: "serverinfo",
  description: "მიიღეთ ინფორმაცია სერვერის შესახებ",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  utilization: "serverinfo",
  example: "serverinfo",
  run: async (client, interaction) => {
    const owner = await interaction.guild.members.fetch(
      interaction.guild.ownerId
    );
    const createdAt = moment(interaction.guild.createdAt);

    const totalChannels = interaction.guild.channels.cache.size;
    const categories = interaction.guild.channels.cache.filter(
      (c) => c.type === 4
    ).size;
    const textChannels = interaction.guild.channels.cache.filter(
      (c) => c.type === 0
    ).size;
    const voiceChannels = interaction.guild.channels.cache.filter(
      (c) => c.type === 2 || c.type === 13
    ).size;
    const threadChannels = interaction.guild.channels.cache.filter(
      (c) => c.type === 12 || c.type === 11
    ).size;

    const memberCache = interaction.guild.members.cache;
    const all = memberCache.size;
    const bots = memberCache.filter((m) => m.user.bot).size;
    const users = all - bots;
    const onlineUsers = memberCache.filter(
      (m) => m.user && m.presence?.status === "online"
    ).size;
    const onlineBots = memberCache.filter(
      (m) => m.user.bot && m.presence?.status === "online"
    ).size;
    const onlineAll = onlineUsers + onlineBots;
    const rolesCount = interaction.guild.roles.cache.size - 1;

    const getMembersInRole = (members, role) => {
      return members.filter((m) => m.roles.cache.has(role.id)).size;
    };

    const rolesString = interaction.guild.roles.cache
      .filter((r) => !r.name.includes("everyone"))
      .map((r) => r)
      .sort((x, y) => y.position - x.position)
      .join(", ");

    const serverInfo = new EmbedBuilder();
    serverInfo.setAuthor({
      name: interaction.guild.name,
      iconURL: interaction.guild.iconURL({ dynamic: true }),
    });
    
    let rolesFinal = "Error :/";
    if (rolesCount > 30) rolesFinal = `სულ: ${rolesCount}`;
    if (rolesCount <= 30) rolesFinal = `სულ: ${rolesCount}\n${rolesString}`;
    
    serverInfo.setColor(transparent);
    serverInfo.addFields(
      { name: `მფლობელი:`, value: `${owner}`, inline: true },
      {
        name: `მომხმარებლები:`,
        value: `სულ: ${all}\nბოტები: ${bots}\nმომხმარებლები: ${users}\nაქტიური წევრები: ${onlineUsers}\nაქტიური ბოტები: ${onlineBots}\nყველა აქტიური მომხმარებელი: ${onlineAll}`,
        inline: true,
      },
      {
        name: `არხები:`,
        value: `სულ: ${totalChannels}\n<:category:1016416897329270875>: ${categories}\n<:txt:1016416795197972480>: ${textChannels}\n<:voice:1016416483758330017>: ${voiceChannels}\n<:thread:1016417036013932564>: ${threadChannels}`,
        inline: true,
      },
      { name: `როლები:`, value: `${rolesFinal}`, inline: false }
    );
    serverInfo.setFooter({
      text: `ID: ${interaction.guild.id} || შეიქმნა: ${createdAt.fromNow()}`,
    });
    serverInfo.setThumbnail(interaction.guild.iconURL({ dynamic: true }));
    serverInfo.setImage(
      interaction.guild.bannerURL({ dynamic: true, size: 512 })
    );

    interaction.reply({ embeds: [serverInfo] });
  },
};
