// routes/availabilityRoutes.js - Availability Routes Handling Endpoint Mapping
const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');

router.get('/check', availabilityController.checkAvailability);
router.post('/create', availabilityController.createAvailability);

module.exports = router;
