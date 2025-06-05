const Signal = require('../models/SignalTiming');
const Congestion = require('../models/congestionModel');


function getGreenDuration(level) {
  if(level === 'High') return 90;
  if(level === 'Moderate') return 60;
  return 30;
};

exports.updateSignal = async (req, res) => {
    try {
        const congestions = await Congestion.find().sort({ timestamp: -1 }).limit(10);

        for (const c of congestions){
            let greenDuration = getGreenDuration(c.congestionLevel);
            let redDuration = 120 - greenDuration;

            await Signal.findOneAndUpdate(
                { intersectionId: c.areaId },
                { greenDuration, redDuration, lastUpdated: new Date() },
                { upsert: true, new: true }
            );
        }
        res.json({ message: "Signal timings updated" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCurrentSignal = async (req, res) => {
    try {
        const states = await Signal.find();
        res.json(states);
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};