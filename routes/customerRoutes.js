const express = require('express');
const router = express.Router();
const {
    getAllCustomers,
    getGenderSummary,
    getLocationSummary,
    getLocationTypeSummary
} = require('../controllers/customerController');

router.get('/', getAllCustomers);
router.get('/gender', getGenderSummary);
router.get('/location', getLocationSummary);
router.get('/location-type', getLocationTypeSummary);

module.exports = router;