const mongoose = require('mongoose');

const SignalTimingSchema = new mongoose.Schema({
  intersectionId: String,
  greenDuration: Number, 
  redDuration: Number,
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SignalTiming', SignalTimingSchema);
