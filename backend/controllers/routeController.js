const RouteModel = require('../models/RouteModel');


exports.routeRecommend = async (req, res) => {
    try {
        const { from, to } = req.query;
        let route = await RouteModel.findOne({ source: from, destination: to });

        if (!route) {
            route = {
                source: from,
                destination: to,
                recommendedRoute: ['pointA', 'pointB', 'pointC'],
                estimatedTime: 15,
                createdAt: new Date()
            };
            await new RouteModel(route).save();
        }
        res.json(route);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};