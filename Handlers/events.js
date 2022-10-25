const fs = require('fs');
const chalk = require('chalk')
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setHeading('Events', 'Stats').setBorder('|', '=', "0", "0")

module.exports = (client) => {
  console.log(chalk.magenta(`starting...`));
  fs.readdirSync('./Events/').forEach(dir => {
    const files = fs.readdirSync(`./Events/${dir}/`).filter(file => file.endsWith('.js'));
    files.forEach((file) => {
      require(`../Events/${dir}/${file}`)
      table.addRow(file.split('.js')[0], '🟢')
    })
  })
  console.log(chalk.greenBright(table.toString()))
};
