// controllers/appointmentController.js - Appointment Controller Handling Request and Response
const {
  scheduleAppointment,
  getAppointmentsByDoctorId,
  getAppointmentsByUserId,
  getAppointments,
  getAppointmentById,
  softDeleteAppointment,
  permanentDeleteAppointment,
} = require('../services/appointmentService');

async function schedule(req, res) {
  const { doctorId, appointmentDate, description, patientId } = req.body;

  if (!doctorId || !appointmentDate || !description || !patientId) {
    return res.status(400).json({
      status: false,
      message:
        'Please provide doctorId, appointmentDate, description, and patientId',
      result: null,
    });
  }

  try {
    await scheduleAppointment(
      doctorId,
      patientId,
      appointmentDate,
      description
    );
    res.status(201).json({
      status: true,
      message: 'Appointment scheduled successfully',
      result: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error scheduling appointment',
      result: null,
    });
  }
}

async function getAppointmentsByDoctor(req, res) {
  const doctorId = req.params.doctorId;

  if (!doctorId) {
    return res.status(400).json({
      status: false,
      message: 'Please provide a doctor ID',
      result: null,
    });
  }

  try {
    const appointments = await getAppointmentsByDoctorId(doctorId);
    res.status(200).json({
      status: true,
      message: 'Appointments retrieved by doctor ID',
      result: appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error fetching appointments by doctor ID',
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
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error fetching appointments by user ID',
      result: null,
    });
  }
}

async function getAppointmentDetails(req, res) {
  const appointmentId = req.params.appointmentId;

  try {
    const appointment = await getAppointmentById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        status: false,
        message: 'Appointment not found',
        result: null,
      });
    }
    res.status(200).json({
      status: true,
      message: 'Appointment details retrieved successfully',
      result: appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error fetching appointment details',
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
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error fetching appointments',
      result: null,
    });
  }
}

async function softDelete(req, res) {
  const appointmentId = req.params.appointmentId;

  if (!appointmentId) {
    return res.status(400).json({
      status: false,
      message: 'Please provide an appointment ID',
      result: null,
    });
  }

  try {
    await softDeleteAppointment(appointmentId);
    res.status(200).json({
      status: true,
      message: 'Appointment soft deleted successfully',
      result: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error soft deleting appointment',
      result: null,
    });
  }
}

async function permanentDelete(req, res) {
  const appointmentId = req.params.appointmentId;

  if (!appointmentId) {
    return res.status(400).json({
      status: false,
      message: 'Please provide an appointment ID',
      result: null,
    });
  }

  try {
    await permanentDeleteAppointment(appointmentId);
    res.status(200).json({
      status: true,
      message: 'Appointment permanently deleted successfully',
      result: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error permanently deleting appointment',
      result: null,
    });
  }
}

module.exports = {
  schedule,
  getAppointmentsByDoctor,
  getAppointmentsByUser,
  getAppointmentDetails,
  getAllAppointments,
  softDelete,
  permanentDelete,
};
