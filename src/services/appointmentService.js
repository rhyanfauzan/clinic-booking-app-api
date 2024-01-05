// services/appointmentService.js - Appointment Service Handling Database Operations
const db = require('../db');
async function scheduleAppointment(
  doctorId,
  patientName,
  appointmentDate,
  userId,
  description
) {
  try {
    const query =
      'INSERT INTO appointments (doctor_id, patient_name, appointment_date, user_id, description) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.execute(query, [
      doctorId,
      patientName,
      appointmentDate,
      userId,
      description,
    ]);
    return result;
  } catch (error) {
    throw new Error('Error scheduling appointment');
  }
}

async function getAppointmentsByDoctorId(doctorId) {
  try {
    const query = 'SELECT * FROM appointments WHERE doctor_id = ?';
    const [results] = await db.execute(query, [doctorId]);
    return results;
  } catch (error) {
    throw new Error('Error fetching appointments by doctor ID');
  }
}

async function getAppointmentsByUserId(userId) {
  try {
    const query = 'SELECT * FROM appointments WHERE user_id = ?';
    const [results] = await db.execute(query, [userId]);
    return results;
  } catch (error) {
    throw new Error('Error fetching appointments by user ID');
  }
}

async function getAppointmentsWithDoctorDetails(userId) {
  try {
    const query = `
      SELECT a.*, d.name AS doctor_name, d.specialty, d.gender AS doctor_gender, d.contact_number AS doctor_contact
      FROM appointments a
      INNER JOIN doctors d ON a.doctor_id = d.id
      WHERE a.user_id = ?
    `;
    const [results] = await db.execute(query, [userId]);
    return results;
  } catch (error) {
    throw new Error('Error fetching appointments with doctor details');
  }
}

async function getAppointments() {
  try {
    const query = 'SELECT * FROM appointments';
    const [results] = await db.execute(query);
    return results;
  } catch (error) {
    throw new Error('Error fetching appointments');
  }
}

async function softDeleteAppointment(appointmentId) {
  try {
    const query = 'UPDATE appointments SET is_deleted = true WHERE id = ?';
    const [result] = await db.execute(query, [appointmentId]);
    return result;
  } catch (error) {
    throw new Error('Error soft deleting appointment');
  }
}

async function permanentDeleteAppointment(appointmentId) {
  try {
    const query = 'DELETE FROM appointments WHERE id = ?';
    const [result] = await db.execute(query, [appointmentId]);
    return result;
  } catch (error) {
    throw new Error('Error permanently deleting appointment');
  }
}

module.exports = {
  scheduleAppointment,
  getAppointmentsByDoctorId,
  getAppointmentsByUserId,
  getAppointmentsWithDoctorDetails,
  getAppointments,
  softDeleteAppointment,
  permanentDeleteAppointment,
};
