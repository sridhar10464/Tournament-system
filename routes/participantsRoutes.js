const express = require("express");
const { createParticipant, editParticipant, deleteParticipant, viewParticipants } = require("../controllers/participantController");

const router = express.Router();

// POST-method
router.post("/add-participant", createParticipant);

// PUT-method
router.put("/edit-participant/:participantId", editParticipant);

// DELETE-method
router.delete("/delete-participant/:participantId", deleteParticipant);

// GET-method
router.get("/get-all/participants", viewParticipants);

module.exports = router;