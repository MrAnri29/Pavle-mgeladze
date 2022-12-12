const {
    EmbedBuilder,
} = require('discord.js');

module.exports = {
    name: "help",
    description: "გიჩვენებთ ბოტის ბრძანებს",
    utilization: "help [command]",
    example: "help [command]",
    cooldown: 3000,
    userPerms: ["SendMessages"],
    botPerms: ["SendMessages"],
    run: async (client, message, args) => {
        const optionalCommand = args[0];
        if (optionalCommand) {
            const commands = client.commands.get(optionalCommand);

            if (!commands) {
                const errorMsg = "⛔ ეგეთი ბრძანება არ მოიძებნება";
                message.reply({ content: errorMsg, ephemeral: true });

                return;
            }

            const CmdDescription = commands.description || "არ აქვს";
            const CmdUtilization = "/" + commands.utilization || "არ აქვს";
            const CmdExample = "/" + commands.example || "არ აქვს";
            let CmdUserPerms = `${commands.userPerms}`;
            let CmdBotPerms = `${commands.botPerms}`;

            if (!commands.userPerms) CmdUserPerms = "არ აქვს";
            if (!commands.botPerms) CmdBotPerms = "არ აქვს";

            const colors = [0x800080, 0xffa500, 0xffff00, 0xc78ef4, 0xf7fb4b];

            const singleCmdEmbed = new EmbedBuilder();
            singleCmdEmbed.setAuthor({
                name: "ბრძანება: " + commands.name,
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

            return message.reply({ embeds: [singleCmdEmbed] });
        } else {
            const embed = new EmbedBuilder();

            embed.setColor(0x808080);
            embed.setAuthor({
                name: client.user.username,
                iconURL: client.user.displayAvatarURL({
                    dynamic: true,
                }),
            });

            const commands = client.commands;

            embed.addFields({
                name: `${client.user.username}-ს ბრძანებები`,
                value: commands.map((x) => `\`${x.name}\``).join(" | "),
            });

            embed.setTimestamp();

            message.reply({
                embeds: [embed],
            });
        }
    }
}