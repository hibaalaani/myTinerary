const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  signUp: {
    type: Array
  },
  login: {
    type: String
  }
});
module.exports = mongoose.model("users", usersSchema);
