const client = require('../..')
const chalk = require('chalk')
const mongoose = require('mongoose')

client.on("ready", () => {
  client.channels.cache
      .get("1038895942428008548")
      .send({ content: "<@671359057679876177> Bot is ready!" });
  console.log("Client • is ready")
  const activities = [
    { name: `${client.guilds.cache.size} Servers`, type: 2 }, // LISTENING
    { name: `${client.channels.cache.size} Channels`, type: 0 }, // PLAYING
    { name: `${client.users.cache.size} Users`, type: 3 }, // WATCHING
    { name: `ვსაუბრობ ბლოქჩეინსა და ქოუდინგზე`, type: 5 } // COMPETING
  ];
  const status = [
    'online',
    'dnd',
    'idle'
  ];
  let i = 0;
  setInterval(() => {
    if (i >= activities.length) i = 0
    client.user.setActivity(activities[i])
    i++;
  }, 5000);

  let s = 0;
  setInterval(() => {
    if (s >= activities.length) s = 0
    client.user.setStatus(status[s])
    s++;
  }, 30000);
  const Database = process.env.MONGO_DB

  if (Database) {
    mongoose.connect(Database, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log(chalk.cyan("Mongo Database • Connected"))
    }).catch((err) => {
      console.log(chalk.red(err))
    });
  }
});