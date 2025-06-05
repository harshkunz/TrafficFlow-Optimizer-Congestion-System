const mongoose = require('mongoose');

const RouteRecommendationSchema = new mongoose.Schema({
  source: String,
  destination: String,
  recommendedRoute: [String],      // list of waypoint/area IDs
  estimatedTime: Number,           // in minutes
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RouteRecommendation', RouteRecommendationSchema);
