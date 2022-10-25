const client = require('../..')
const {
  EmbedBuilder,
  Collection,
  PermissionsBitField
} = require('discord.js')
const ms = require('ms')
const prefix = client.prefix;
const cooldown = new Collection()
const {
  afk
} = require('../../Collection/afk.js')
const moment = require('moment')

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (message.channel.type !== 0) return;


  // AFK
  const afkMember = message.mentions.members.first();
  if (afkMember) {
    const data = afk.get(afkMember.id+message.guild.id)

    if (data) {
      const [timestamp, reason] = data
      const timeAgo = moment(timestamp).fromNow()
      message.reply({
        content: `${afkMember} არის AFK\nმიზეზი: ${reason} || ${timeAgo}`
      })
    }
  }
  if (!message.content.startsWith('!afk')) {
    const gData = afk.get(message.author.id+message.guild.id)
    if (gData) {
      afk.delete(message.author.id+message.guild.id)
      message.reply({
        content: `თქვენ აღარ ხართ AFK`
      })
    }
  }
  // end of afk

  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = client.commands.get(cmd)
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) {
    if (command.cooldown) {
      if (cooldown.has(`${command.name}${message.author.id}`)) return message.channel.send({
        content: `You are on \`${ms(cooldown.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` cooldown!`
      })
      if (command.userPerms || command.botPerms) {
        if (!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
          const userPerms = new EmbedBuilder()
            .setDescription(`🚫 ${message.author}, You don't have \`${command.userPerms}\` permissions to use this command!`)
            .setColor('Red')
          return message.reply({
            embeds: [userPerms]
          })
        }
        if (!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
          const botPerms = new EmbedBuilder()
            .setDescription(`🚫 ${message.author}, I don't have \`${command.botPerms}\` permissions to use this command!`)
            .setColor('Red')
          return message.reply({
            embeds: [botPerms]
          })
        }
      }

      command.run(client, message, args)
      cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
      setTimeout(() => {
        cooldown.delete(`${command.name}${message.author.id}`)
      }, command.cooldown);
    } else {
      if (command.userPerms || command.botPerms) {
        if (!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
          const userPerms = new EmbedBuilder()
            .setDescription(`🚫 ${message.author}, You don't have \`${command.userPerms}\` permissions to use this command!`)
            .setColor('Red')
          return message.reply({
            embeds: [userPerms]
          })
        }

        if (!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
          const botPerms = new EmbedBuilder()
            .setDescription(`🚫 ${message.author}, I don't have \`${command.botPerms}\` permissions to use this command!`)
            .setColor('Red')
          return message.reply({
            embeds: [botPerms]
          })
        }
      }
      command.run(client, message, args)
    }
  }

});