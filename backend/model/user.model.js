// models/User.js
const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  accountHash: { type: String, required: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
