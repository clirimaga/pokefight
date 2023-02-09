const dotenv = require("dotenv").config();
const express = require("express");
require("./db");
const app = express();
const cors = require("cors");
const { json } = require("express");
const { pokemonRouter } = require("./routes/pokemon");
const { leaderboardRouter } = require("./routes/leaderboard");


app.use(express.json());
app.use(cors());

app.use("/pokemon", pokemonRouter);
app.use("/leaderboard", leaderboardRouter);


const PORT = 4001;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
