// services/ratingService.js - Rating Service Handling Database Operations
const db = require('../../db');

async function createRating(doctorId, userId, comment, rating, fullName) {
  try {
    const query = `
      INSERT INTO rating (doctor_id, user_id, comment, rating, full_name)
      VALUES (?, ?, ?, ?, ?)
    `;
    await db.query(query, [doctorId, userId, comment, rating, fullName]);
  } catch (error) {
    throw new Error('Error creating rating');
  }
}

async function getAllRatings() {
  try {
    const query = `
      SELECT r.*, u.username AS userName
      FROM rating r
      JOIN users u ON r.doctor_id = u.id
    `;
    const ratings = await db.query(query);
    return ratings;
  } catch (error) {
    throw new Error('Error fetching all ratings');
  }
}

module.exports = {
  createRating,
  getAllRatings,
};
