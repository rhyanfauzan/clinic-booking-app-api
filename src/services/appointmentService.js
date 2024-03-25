// services/appointmentService.js - Appointment Service Handling Database Operations
const db = require('../../db');
async function scheduleAppointment(
  doctorId,
  patientId,
  appointmentDate,
  description
) {
  try {
    const query =
      'INSERT INTO appointments (doctor_id, patient_id, appointment_date, description) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(query, [
      doctorId,
      patientId,
      appointmentDate,
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
    const query = 'SELECT * FROM appointments WHERE patient_id = ?';
    const [results] = await db.execute(query, [userId]);
    return results;
  } catch (error) {
    throw new Error('Error fetching appointments by user ID');
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

async function getAppointmentById(appointmentId) {
  try {
    // Retrieve appointment details from the database
    const query = `
      SELECT a.id AS appointment_id, a.appointment_date, a.description, 
             p.id AS patient_id, p.full_name AS patient_username, p.profile_image AS patient_profile_image,
             d.id AS doctor_id, d.full_name AS doctor_username, d.profile_image AS doctor_profile_image
      FROM appointments a
      LEFT JOIN users p ON a.patient_id = p.id
      LEFT JOIN users d ON a.doctor_id = d.id
      WHERE a.id = ?;
    `;
    const [result] = await db.execute(query, [appointmentId]);
    return result[0];
  } catch (error) {
    throw new Error('Error fetching appointment details');
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
  getAppointments,
  getAppointmentById,
  softDeleteAppointment,
  permanentDeleteAppointment,
};
