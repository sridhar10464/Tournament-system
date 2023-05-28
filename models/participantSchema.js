const mongoose = require("mongoose");

const participantSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        age: {
            type: Number,
            required: true,
        },
    }
);

const Participant = mongoose.model("participant", participantSchema);

module.exports = Participant;