const { Client, GatewayIntentBits, Partials, Collection, discord } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});

require('dotenv').config()
const config = require("./config.json")

client.commands = new Collection()
client.aliases = new Collection()
client.events = new Collection();
client.slashCommands = new Collection();
client.prefix = config.prefix;

module.exports = client;


['events', 'prefixCommands', 'slashCommand'].forEach((handler) => {
  require(`./Handlers/${handler}`)(client)
});


client.login(process.env.TOKEN)