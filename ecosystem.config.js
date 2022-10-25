module.exports = {
    apps: [{
            name: "limit worker",
            script: "index.js", //<---- main file [index.js]
            args: "limit",
        },
        // {
        //     name: "rotate worker",
        //     script: "index.js", // <---- main file [index.js]
        //     args: "rotate",
        // },
    ],
};