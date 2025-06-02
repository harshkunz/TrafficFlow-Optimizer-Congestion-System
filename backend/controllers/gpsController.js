const GPS = require('../models/gpsModel');


exports.catchGPSData = async (req, res) => {
    try {
        const gpsData = new GPS(req.body);
        await gpsData.save();
        res.status(200).json({status: "success" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: err.message });
    }
};

exports.getGPSData = async (req, res) => {
    try {
        const gpsEntry = await GPS.findById(req.params.id);
        if(!gpsEntry){
        return res.status(404).json({ error: "Entry not found" });
        }
        res.json(gpsEntry);
    } catch {
        res.status(500).json({ error: err.message });
    }
};

