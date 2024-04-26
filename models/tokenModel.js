
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
