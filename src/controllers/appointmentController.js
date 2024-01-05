// controllers/appointmentController.js - Appointment Controller Handling Request and Response
const {
  scheduleAppointment,
  getAppointmentsByUserId,
  getAppointmentsWithDoctorDetails,
  getAppointments,
} = require('../services/appointmentService');

async function schedule(req, res) {
  const { doctorId, patientName, appointmentDate, userId } = req.body;

  if (!doctorId || !patientName || !appointmentDate || !userId) {
    return res.status(400).json({
      status: false,
      message:
        'Please provide doctorId, patientName, appointmentDate, and userId',
      result: null,
    });
  }

  try {
    await scheduleAppointment(doctorId, patientName, appointmentDate, userId);
    res.status(201).json({
      status: true,
      message: 'Appointment scheduled successfully',
      result: null,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error scheduling appointment',
      result: null,
    });
  }
}

async function getAppointmentsByUser(req, res) {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({
      status: false,
      message: 'Please provide a user ID',
      result: null,
    });
  }

  try {
    const appointments = await getAppointmentsByUserId(userId);
    res.status(200).json({
      status: true,
      message: 'Appointments retrieved by user ID',
      result: appointments,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error fetching appointments by user ID',
      result: null,
    });
  }
}

async function getAppointmentsByUser(req, res) {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({
      status: false,
      message: 'Please provide a user ID',
      result: null,
    });
  }

  try {
    const appointments = await getAppointmentsWithDoctorDetails(userId);
    res.status(200).json({
      status: true,
      message: 'Appointments retrieved by user ID',
      result: appointments,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error fetching appointments by user ID',
      result: null,
    });
  }
}

async function getAllAppointments(req, res) {
  try {
    const appointments = await getAppointments();
    res.status(200).json({
      status: true,
      message: 'All appointments retrieved',
      result: appointments,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error fetching appointments',
      result: null,
    });
  }
}
module.exports = {
  schedule,
  getAppointmentsByUser,
  getAllAppointments,
};
