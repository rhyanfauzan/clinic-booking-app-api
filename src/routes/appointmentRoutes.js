// routes/appointmentRoutes.js - Appointment Routes Handling Endpoint Mapping
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/schedule', appointmentController.schedule);
router.get('/all', appointmentController.getAllAppointments);
router.get('/user/:userId', appointmentController.getAppointmentsByUser);

module.exports = router;
