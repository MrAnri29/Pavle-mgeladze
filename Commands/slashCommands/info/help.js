const { ApplicationCommandType, EmbedBuilder } = require("discord.js");
const { transparent } = require("../../../config.json");

module.exports = {
  name: "help",
  description: "დამხმარე ბრძანება.",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  options: [
    {
      name: "command",
      description: "ბრძანება",
      type: 3,
      required: false,
    },
  ],
  utilization: "help",
  example: "help",
  run: async (client, interaction) => {
    const optionalCommand = interaction.options.getString("command");
    if (optionalCommand) {
      const slashCommand = client.slashCommands.get(optionalCommand);

      if (!slashCommand) {
        const errorMsg = "⛔ ეგეთი ბრძანება არ მოიძებნება";
        interaction.reply({ content: errorMsg, ephemeral: true });

        return;
      }

      const CmdDescription = slashCommand.description || "არ აქვს";
      const CmdUtilization = "/" + slashCommand.utilization || "არ აქვს";
      const CmdExample = "/" + slashCommand.example || "არ აქვს";
      let CmdUserPerms = `${slashCommand.userPerms}`;
      let CmdBotPerms = `${slashCommand.botPerms}`;

      if (!slashCommand.userPerms) CmdUserPerms = "არ აქვს";
      if (!slashCommand.botPerms) CmdBotPerms = "არ აქვს";

      const colors = [0x800080, 0xffa500, 0xffff00, 0xc78ef4, 0xf7fb4b];

      const singleCmdEmbed = new EmbedBuilder();
      singleCmdEmbed.setAuthor({
        name: "ბრძანება: " + slashCommand.name,
        iconURL: client.user.displayAvatarURL(),
      });
      singleCmdEmbed.setColor(
        colors[Math.floor(Math.random() * colors.length)]
      );
      singleCmdEmbed.addFields(
        { name: "⚜ აღწერა:", value: CmdDescription },
        { name: "🔱 გამოყენება:", value: CmdUtilization },
        { name: "⚓ მაგალითი:", value: CmdExample },
        { name: "🚀 მომხმარებლის უფლებები:", value: CmdUserPerms },
        { name: "🔥 ბოტის უფლებები:", value: CmdBotPerms }
      );
      singleCmdEmbed.setThumbnail(client.user.displayAvatarURL());
      singleCmdEmbed.setTimestamp();

      return interaction.reply({ embeds: [singleCmdEmbed] });
    } else {
      const embed = new EmbedBuilder();

      embed.setColor(transparent);
      embed.setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL({
          dynamic: true,
        }),
      });

      const slashCommand = client.slashCommands;

      embed.addFields({
        name: `${client.user.username}-ს ბრძანებები`,
        value: slashCommand.map((x) => `\`${x.name}\``).join(" | "),
      });

      embed.setTimestamp();

      interaction.reply({
        embeds: [embed],
      });
    }
  },
};
