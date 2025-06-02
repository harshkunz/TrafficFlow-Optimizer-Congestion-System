const mongoose = require('mongoose');

const GPSDataSchema = new mongoose.Schema({
  vehicle_id: String,
  lat: Number,
  lng: Number,
  speed: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GPSData', GPSDataSchema);