const Leaderboard = require("../model/leaderboard");

const getWinner = async (req, res) => {
  try {
    const winners = await Leaderboard.find({});
    res.json(winners);
  } catch (error) {
    res.status(500).send(error.messages);
  }
};

const createWinner = async (req, res) => {
  try {
    console.log(req.body);
    const { id, name, type, base, wins } = req.body;
    //if id exists find by id and update the score + 1
    const winner = await Leaderboard.findOne({ id });
    if (winner) {
      const updatedWinner = await Leaderboard.updateOne(
        { id },
        { $inc: { wins: 1 } }
      );
      res.json(updatedWinner);
    }
    //if id doesnt exist then create a new object
    else {
      const newWinner = await Leaderboard.create({ id, name, type, base });
      res.json(newWinner);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createWinner,
  getWinner,
};
