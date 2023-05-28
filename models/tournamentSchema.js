const mongoose = require("mongoose");

const tournamentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        participants: [{
            type: String
        }],
        status: {
            type: String,
            enum: ["pending", "ongoing", "completed"]
        },
        matches: [
            {
                round: Number,
                date: Date,
                participants: [String],
                result: {
                    winner: String,
                    loser: String,
                    score: String,
                }
            }
        ]
    }
);

const Tournament = mongoose.model("Tournaments", tournamentSchema);

module.exports = Tournament;