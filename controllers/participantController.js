const Participant = require("../models/participantSchema");


const createParticipant = async (req, res) => {
    try {
        const { name, email, age } = req.body;

        const participant = new Participant({
            name, email, age
        });

        const newParticipant = await participant.save();

        res.status(201).json({
            success: true,
            message: "Participant created successfully",
            participant: newParticipant,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error creating participant",
            error: error.message,
        });
    }
};

const editParticipant = async (req,res) => {
    try {
        const { participantId } = req.params;
        const { name, email, age } = req.body;

        const editedParticipant = await Participant.findByIdAndUpdate(
            participantId,
            { name, email, age },
            { new: true }
        );

        if (!editedParticipant) {
            return res.status(404).json({
                success: false,
                message: "Participant not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Participant updated successfully",
            participant: editedParticipant,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error updating participant",
            error: error.message,
        });
    }
};

const deleteParticipant = async (req, res) => {
    try {
        const { participantId } = req.params;

        const deletedParticipant = await Participant.findByIdAndDelete(participantId);

        if (!deletedParticipant) {
            return res.status(404).json({
                success: false,
                message: "Participant not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Participant deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error deleting Participant",
            error: error.message
        });
    }
};

const viewParticipants = async (req, res) => {
    try {
        const participants = await Participant.find();

        res.status(200).json({
            success: true,
            message: "Participants retrieved successfully",
            participants,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error retrieving participants",
            error: error.message,
        });
    }
};

module.exports = {
    createParticipant,
    editParticipant,
    deleteParticipant,
    viewParticipants
};