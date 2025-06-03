const express = require('express');
const router = express.Router();
const { createCongestionEntry, getAllCongestion } = require('../controllers/congestionController');

router.post('/congestion', createCongestionEntry);
router.get('/congestion', getAllCongestion);

module.exports = router;