const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wallet: { type: String, required: true, unique: true },
  friendId: { type: String },
  userImg: { type: String },
});

module.exports = model("TronUser", schema);
