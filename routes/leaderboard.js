const express = require("express");
const leaderboardRouter = express.Router();
const {
  createWinner,getWinner
} = require("../controller/leaderboard");

leaderboardRouter.route("/").post(createWinner).get(getWinner)

module.exports = {
leaderboardRouter,
};
