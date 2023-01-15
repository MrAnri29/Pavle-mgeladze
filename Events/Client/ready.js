const client = require("../..");
const chalk = require("chalk");
const mongoose = require("mongoose");
const { EmbedBuilder } = require("discord.js");

// vajexas kargistyvna
const CronJob = require("cron").CronJob;
const vajexasMolocvisDescription = `
vajex axla anris sheidzleba dzinavs, amitom kodi dawera mis magivrad me ro mogiloco.
xoda she gamoyleebulo gilocav dabadebis dges. bevr nashebsa da dzudzuebs gisurveb. imdeni mayuti dageprintos ro shveicariis bankebshic ver chaetios.
Dzaan gafaseb da tesli adamiani xar chemtvis. shen roara aqamde amdens ver mivagwevdi. karoche magrad miyvarxar (megobrulad no homo) da yvelafer kargs gisurveb.
`;

const vajexasMolocva = new EmbedBuilder()
    .setAuthor({
        name: "sheni yverkaca",
        iconURL: `https://cdn.discordapp.com/avatars/671359057679876177/693fbe50becb01a74ede8f5c4c130517.webp?size=1024`,
    })
    .setThumbnail(
        `https://media.discordapp.net/attachments/972852458340614166/1063808473424482485/IMG_1536.jpg?width=260&height=473`
    )
    .setDescription(vajexasMolocvisDescription)
    .setImage(
        `https://cdn.discordapp.com/attachments/972826746598617109/1064190735911485461/me_da_vajexa.jpg`
    )
    .setColor(0xff0000);

client.on("ready", () => {
    const job = new CronJob(
        "0 0 16 0 *",
        function vajexasDabDge() {
            const guild = client.guilds.cache.get("985545808881549402");
            guild.members.cache
                .get("217643659925913603")
                .send({ embeds: [vajexasMolocva] })
                .catch(() => {
                    return guild.channels.cache
                        .get("1064195026143432866")
                        .send({
                            content:
                                "<@217643659925913603> ANRIM XOGITXRA DIRECT MESSAGES CHARTE AM SERVERZEO VAAAAAX",
                            embeds: [vajexasMolocva],
                        });
                });

            guild.members.cache.get("671359057679876177").send({ content: "mivuloce" });
        },
        null,
        true,
        "Asia/Tbilisi"
    );

    job.start();

    client.channels.cache
        .get("1051825677961265232")
        .send({ content: "Bot is ready!" });
    console.log("Client • is ready");
    const activities = [
        { name: `${client.guilds.cache.size} Servers`, type: 2 }, // LISTENING
        { name: `${client.channels.cache.size} Channels`, type: 0 }, // PLAYING
        { name: `${client.users.cache.size} Users`, type: 3 }, // WATCHING
        { name: `ვსაუბრობ ბლოქჩეინსა და ქოუდინგზე`, type: 5 }, // COMPETING
    ];
    const status = ["online", "dnd", "idle"];
    let i = 0;
    setInterval(() => {
        if (i >= activities.length) i = 0;
        client.user.setActivity(activities[i]);
        i++;
    }, 5000);

    let s = 0;
    setInterval(() => {
        if (s >= activities.length) s = 0;
        client.user.setStatus(status[s]);
        s++;
    }, 30000);
    const Database = process.env.MONGO_DB;

    if (Database) {
        mongoose
            .connect(Database, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log(chalk.cyan("Mongo Database • Connected"));
            })
            .catch((err) => {
                console.log(chalk.red(err));
            });
    }
});
