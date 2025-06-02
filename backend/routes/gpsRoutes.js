const express = require('express');
const router = express.Router();
const { catchGPSData, getGPSData } = require('../controllers/gpsController');


router.post('/gps', catchGPSData);
router.get('/gps/:id', getGPSData);


module.exports = router;