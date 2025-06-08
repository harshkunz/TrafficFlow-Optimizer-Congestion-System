const express = require('express');
const router = express.Router();
const { updateSignal, getCurrentSignal } = require('../controllers/signalController');
const { routeRecommend } = require('../controllers/routeController');
const { createAlert, getAlerts } = require('../controllers/alertController');


router.post('/signal', updateSignal);
router.get('/current-signal', getCurrentSignal);

router.get('/route', routeRecommend);

router.post('/create-alert', createAlert);
router.get('/alert', getAlerts);


module.exports = router;

