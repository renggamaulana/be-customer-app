const express = require('express');
const router = express.Router();
const {
    getAllCustomers,
    getGenderSummary,
    getLocationSummary
} = require('../controllers/customerController');

router.get('/', getAllCustomers);
router.get('/gender', getGenderSummary);
router.get('/location', getLocationSummary);

module.exports = router;