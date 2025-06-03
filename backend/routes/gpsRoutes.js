const express = require('express');
const router = express.Router();
const { catchGPSData, getData, getById } = require('../controllers/gpsController');


router.post('/traffic', catchGPSData);
router.get('/traffic', getData);
router.get('/traffic/:id', getById);


module.exports = router;