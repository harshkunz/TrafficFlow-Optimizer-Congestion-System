const mongoose = require('mongoose');

const CongestionDataSchema = new mongoose.Schema({
  areaId: String,
  vehicleCount: Number,
  avgSpeed: Number,
  congestionLevel: { type: String, enum: ['Low', 'Moderate', 'High'] },
  congestionScore: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CongestionData', CongestionDataSchema)

