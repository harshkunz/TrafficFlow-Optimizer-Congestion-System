const express = require('express');
const router = express.Router();
const { updateSignal, getCurrentSignal } = require('../controllers/signalController');
const { routeRecommend } = require('../controllers/routeController');
const { createAlert } = require('../controllers/alertController');


router.post('/signal', updateSignal);
router.get('/current-signal', getCurrentSignal);

router.get('/route', routeRecommend);

router.post('/create-alert', createAlert);


module.exports = router;

