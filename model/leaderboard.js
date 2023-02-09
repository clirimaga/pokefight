const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaderboardSchema = new Schema({
  id: { type: Number },
  name: {
    english: { type: String },
    japanese: { type: String },
    chinese: { type: String },
    french: { type: String },
  },
  type: [{ type: String }, { type: String }],
  base: {
    HP: { type: Number },
    Attack: { type: Number },
    Defense: { type: Number },
    "Sp. Attack": { type: Number },
    "Sp. Defense": { type: Number },
    Speed: { type: Number },
  },
  wins: { type: Number, default: 1 }
});

// const leaderboardSchema = new Schema({
// winner : {id: { type: Number },
//   name: {
//     english: { type: String },
//     japanese: { type: String },
//     chinese: { type: String },
//     french: { type: String },
//   },
//   type: [{ type: String }, { type: String }],
//   base: {
//     HP: { type: Number },
//     Attack: { type: Number },
//     Defense: { type: Number },
//     "Sp. Attack": { type: Number },
//     "Sp. Defense": { type: Number },
//     Speed: { type: Number },
//   },}
// });


module.exports = mongoose.model("Leaderboard", leaderboardSchema);
