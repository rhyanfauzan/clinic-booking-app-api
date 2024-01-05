// services/appointmentService.js - Appointment Service Handling Database Operations
const db = require('../db');

async function scheduleAppointment(
  doctorId,
  patientName,
  appointmentDate,
  userId
) {
  try {
    const query =
      'INSERT INTO appointments (doctor_id, patient_name, appointment_date, user_id) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(query, [
      doctorId,
      patientName,
      appointmentDate,
      userId,
    ]);
    return result;
  } catch (error) {
    throw new Error('Error scheduling appointment');
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

module.exports = {
  scheduleAppointment,
  getAppointmentsByUserId,
  getAppointmentsWithDoctorDetails,
  getAppointments,
};
