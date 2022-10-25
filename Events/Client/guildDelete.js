const client = require('../..')
const chalk = require('chalk')
const mongoose = require('mongoose')
const {
    EmbedBuilder
} = require("discord.js")

client.on("guildDelete", (guild) => {
    const embed = new EmbedBuilder()
        .setAuthor({
            name: guild.name,
            iconURL: guild.iconURL({
                dynamic: true
            })
        })
        .setTitle("მე გამაგდეს სერვერიდან!")
        .setThumbnail(guild.iconURL({
            dynamic: true
        }))
        .setDescription(`მომხმარებლები: ${guild.memberCount}\nowner: <@${guild.ownerId}>`)
        .setColor(0x808080)
        .setTimestamp();

    client.channels.cache.get('1009063681587417188').send({
        embeds: [embed]
    });
});