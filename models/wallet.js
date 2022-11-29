const mongoose = require("mongoose");

module.exports = mongoose.model(
    "wallet",
    new mongoose.Schema({
        userId: {
            type: String,
            required: true
        },
        balance: Number,
        bank: Number,
        daily: Number,
        monthly: Number,
    })
);
