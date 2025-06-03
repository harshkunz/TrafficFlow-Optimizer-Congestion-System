const Congestion = require('../models/congestionModel');


exports.createCongestionEntry = async (req, res) => {
  try {
    const entry = new Congestion(req.body);
    await entry.save();
    res.status(200).json({status: "success" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getAllCongestion = async (req, res) => {
  try {
    const entries = await Congestion.find({});
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
