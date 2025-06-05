const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  areaId: String,
  level: { type: String, enum: ['Warning', 'Critical'] },
  message: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', AlertSchema);
