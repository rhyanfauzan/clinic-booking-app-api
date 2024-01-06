// services/doctorService.js - Doctor Service Handling Database Operations
const db = require('../../db');

async function searchDoctors(searchQuery) {
  try {
    const query = 'SELECT * FROM doctors WHERE name LIKE ? OR specialty LIKE ?';
    const [results] = await db.execute(query, [
      `%${searchQuery}%`,
      `%${searchQuery}%`,
    ]);
    return results;
  } catch (error) {
    throw new Error('Error searching for doctors');
  }
}

async function getAllDoctors() {
  try {
    const query = 'SELECT * FROM doctors';
    const [results] = await db.execute(query);
    return results;
  } catch (error) {
    throw new Error('Error fetching all doctors');
  }
}

async function createDoctor(name, specialty, gender, contact_number) {
  try {
    const query =
      'INSERT INTO doctors (name, specialty, gender, contact_number) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(query, [
      name,
      specialty,
      gender,
      contact_number,
    ]);
    return result;
  } catch (error) {
    throw new Error('Error creating doctor');
  }
}

async function deleteDoctorById(doctorId) {
  try {
    const query = 'DELETE FROM doctors WHERE id = ?';
    const [result] = await db.execute(query, [doctorId]);
    return result;
  } catch (error) {
    throw new Error('Error deleting doctor');
  }
}

module.exports = {
  searchDoctors,
  getAllDoctors,
  createDoctor,
  deleteDoctorById,
};
