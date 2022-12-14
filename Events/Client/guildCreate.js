const client = require('../..')
const chalk = require('chalk')
const mongoose = require('mongoose')
const {
    EmbedBuilder
} = require("discord.js")

client.on("guildCreate", (guild) => {
    const embed = new EmbedBuilder()
        .setAuthor({
            name: guild.name,
            iconURL: guild.iconURL({
                dynamic: true
            })
        })
        .setTitle("მე დამამატეს სერვერზე!")
        .setThumbnail(guild.iconURL({
            dynamic: true
        }))
        .setDescription(`მომხმარებლები: ${guild.memberCount}\nowner: <@${guild.ownerId}>`)
        .setColor(0x808080)
        .setTimestamp();

    client.channels.cache.get("1047083145641590885").send({
        embeds: [embed],
    });
});