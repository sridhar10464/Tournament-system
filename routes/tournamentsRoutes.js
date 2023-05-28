const express = require("express");
const {
    createTournament,
    registerTournament,
    scheduleTournament,
    resultTournament,
    viewResultTournament,
    editTournament,
    deleteTournament,
    viewTournament
} = require("../controllers/tournamentController");


const router = express.Router();

// POST-method
router.post("/create", createTournament);

// PUT-method
router.post("/register", registerTournament);

// POST-method
router.post("/schedule", scheduleTournament);

// POST-method
router.post("/result", resultTournament);

// GET-method
router.get("/result/:tournamentId", viewResultTournament);

// PUT-method
router.put("/edit/:tournamentId", editTournament);

// DELETE-method
router.delete("/delete/:tournamentId", deleteTournament);

// GET-method
router.get("/get-all/tournaments", viewTournament);

module.exports = router