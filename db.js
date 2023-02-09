const mongoose = require("mongoose");
const url = process.env.CONNECTION_STRING;
mongoose.connect(url);
