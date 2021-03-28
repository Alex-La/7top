const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true, unique: false },
  value: { type: Array, required: true },
  time: { type: String, required: false },
  players: { type: Number, required: false },
});

module.exports = model("Ball", schema);
