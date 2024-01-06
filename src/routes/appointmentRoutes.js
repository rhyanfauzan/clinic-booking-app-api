// routes/appointmentRoutes.js - Appointment Routes Handling Endpoint Mapping
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/schedule', appointmentController.schedule);
router.get('/all', appointmentController.getAllAppointments);
router.get('/doctor/:doctorId', appointmentController.getAppointmentsByDoctor);
router.get('/user/:userId', appointmentController.getAppointmentsByUser);
router.get('/:appointmentId', appointmentController.getAppointmentDetails);
router.delete('/soft-delete/:appointmentId', appointmentController.softDelete);
router.delete(
  '/permanent-delete/:appointmentId',
  appointmentController.permanentDelete
);

module.exports = router;
