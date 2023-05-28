const Tournament = require("../models/tournamentSchema");


const createTournament = async (req, res) => {
    try {
        const { name, startDate, endDate, participants, status } = req.body;
    
        const newTournament = new Tournament({
          name,
          startDate,
          endDate,
          participants,
          status,
        });
    
        const savedTournament = await newTournament.save();
    
        res.status(201).json({ message: 'Tournament created successfully', tournament: savedTournament });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating tournament' });
      }
};

const editTournament = async (req, res) =>
{
    try {
        const { tournamentId } = req.params;
        const { name, startDate, endDate, participants, status } = req.body;

        const tournament = await Tournament.findByIdAndUpdate(
            tournamentId,
            {
                name,
                startDate,
                endDate,
                participants,
                status,
            },
            { new: true }
        );

        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: "Tournament not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Tournament updated successfully",
            tournament,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error updating tournament",
            error: error.message,
        });
    }
};

const registerTournament = async (req, res) => {
    try {
        const { tournamentId, participantName } = req.body;

        const tournament = await Tournament.findById(tournamentId);
        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: "Tournament not found",
            });
        }
        tournament.participants.push(participantName);
        const updatedTournament = await tournament.save();

        res.status(200).json({
            success: true,
            message: 'Registration successful',
            tournament: updatedTournament,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error registering for the tournament',
            error: error.message,
        });
    }
}

const scheduleTournament = async (req, res) => {
    try {
        const { tournamentId } = req.body;

        const tournament = await Tournament.findById(tournamentId);
        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: "Tournament not found",
            });
        }
        const { participants } = tournament;

        if (participants.length < 2) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient participants to create a match schedule',
            });
        }

        const shuffledParticipants = shuffleArray(participants);
        const totalRounds = participants.length - 1;
        const matchesPerRound = participants.length / 2;

        const schedule = [];

        for (let round = 1; round <= totalRounds; round++) {
            const roundMatches = [];
            for (let i = 0; i < matchesPerRound; i++) {
                const match = {
                    round,
                    date: null,
                    participants: [shuffledParticipants[i], shuffledParticipants[participants.length - 1 - i]],
                    result: {
                        winner: null,
                        loser: null,
                        score: null,
                    }
                };
                roundMatches.push(match);
            }
            schedule.push(roundMatches);
            shuffledParticipants.splice(1, 0, shuffledParticipants.pop());
        }
        tournament.matches = schedule;
            const updatedTournament = await tournament.save();

            res.status(200).json({
            success: true,
            message: 'Match schedule created successfully',
            tournament: updatedTournament,
    });
    } catch (error) {
        console.error(error);
            res.status(500).json({
            success: false,
            message: 'Error creating match schedule',
            error: error.message,
    });
    }
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

const resultTournament = async (req, res) => {
    try {
        const { tournamentId, matchId, winner, loser, score } = req.body;
    
        const tournament = await Tournament.findById(tournamentId);
        if (!tournament) {
          return res.status(404).json({
            success: false,
            message: 'Tournament not found',
          });
        }
    
        const match = tournament.matches.id(matchId);
        if (!match) {
          return res.status(404).json({
            success: false,
            message: 'Match not found',
          });
        }
    
        match.result.winner = winner;
        match.result.loser = loser;
        match.result.score = score;
    
        const updatedTournament = await tournament.save();
    
        res.status(200).json({
          success: true,
          message: 'Match result updated successfully',
          tournament: updatedTournament,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: 'Error updating match result',
          error: error.message,
        });
      }
}

const viewResultTournament = async (req, res) =>
{
    try {
        const { tournamentId } = req.params;

        const tournament = await Tournament.findById(tournamentId);
        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: "Tournament not found",
            });
        }

        const { matches } = tournament;
        const matchResults = matches.map((match) => ({
            matchId: match._id,
            round: match.round,
            date: match.date,
            participants: match.participants,
            result: match.result,
        }));

        res.status(200).json({
            success: true,
            message: "Match results retrieved successfully",
            results: matchResults,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error retrieving match results",
            error: error.message,
        });
    }
};

const deleteTournament = async (req, res) => {
    try {
        const { tournamentId } = req.params;

        const deletedTournament = await Tournament.findByIdAndDelete(tournamentId);

        if (!deletedTournament) {
            return res.status(404).json({
                success: false,
                message: "Tournament not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Tournament deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error deleting tournament",
            error: error.message,
        });
    }
};

const viewTournament = async(req, res) => {
    try {
        const tournaments = await Tournament.find();

        res.status(200).json({
            success: true,
            message: "Tournament retrieved successfully",
            tournaments,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error  retrieving tournaments",
            error: error.message,
        });
    }
};

module.exports = {
    createTournament,
    registerTournament,
    scheduleTournament,
    resultTournament,
    viewResultTournament,
    editTournament,
    deleteTournament,
    viewTournament
};