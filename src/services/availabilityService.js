// services/availabilityService.js - Availability Service Handling Database Operations
const db = require('../../db');

async function checkDoctorAvailability(doctorId, date, hour, minute) {
  try {
    const query = `
      SELECT * FROM doctor_availability
      WHERE doctor_id = ? AND date = ? AND hour = ? AND minute = ?
    `;
    const [availability] = await db.query(query, [
      doctorId,
      date,
      hour,
      minute,
    ]);

    return availability.length === 0; // Returns true if the slot is available, false otherwise
  } catch (error) {
    throw new Error('Error checking doctor availability');
  }
}

async function createDoctorAvailability(doctorId, date, hour, minute) {
  try {
    const query = `
      INSERT INTO doctor_availability (doctor_id, date, hour, minute)
      VALUES (?, ?, ?, ?)
    `;
    await db.query(query, [doctorId, date, hour, minute]);
  } catch (error) {
    throw new Error('Error creating doctor availability');
  }
}

module.exports = {
  checkDoctorAvailability,
  createDoctorAvailability,
};
