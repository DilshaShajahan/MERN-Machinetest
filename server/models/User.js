const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  isVerified: { type: Boolean, default: false },
  password: { type: String },
});

module.exports = mongoose.model('User', userSchema);
