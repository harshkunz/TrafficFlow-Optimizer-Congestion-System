const AlertModel = require('../models/AlertModel');
const Congestion = require('../models/congestionModel');


exports.createAlert = async (req, res) => {
  try {
      const congestions = await Congestion.find({ congestionLevel: 'High' });

      for (const c of congestions) {
          const alert = {
              areaId: c.areaId,
              level: 'Critical',
              message: `High congestion detected at ${c.areaId}`,
              timestamp: new Date()
          };
          await new AlertModel(alert).save();
      }
      res.json({ message: "Alerts created for high congestion areas" });

  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await AlertModel.find(); 
    res.status(200).json(alerts);
  } catch (error) {
    console.error("Error fetching alerts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

