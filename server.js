const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
require("colors");
const connectDb = require("./config/config");

// dotenv configuration
dotenv.config();

// db config
connectDb();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
    try {
        res.json("Get Request")
    } catch (error) {
        res.json(error)
    }
})

// routes
app.use("/api/v1/tournament", require("./routes/tournamentsRoutes"));
app.use("/api/v1/participant", require("./routes/participantsRoutes"));

// Port
const PORT = process.env.PORT || 8080

// listen
app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`. bgCyan.white)
});