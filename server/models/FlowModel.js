const mongoose = require('mongoose');

const flowSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming you have a User model
    required: true,
  },
  nodes: {
    type: Array,
    required: true,
  },
  edges: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: "Untitled Flow",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

module.exports = mongoose.model('Flow', flowSchema);
