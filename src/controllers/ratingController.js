// controllers/ratingController.js - Rating Controller Handling Request and Response
const {
  getAllRatings,
  getAllRatingsByDoctorId,
  createRating,
  deleteRatingById,
} = require('../services/ratingService');

async function getAll(req, res) {
  try {
    const ratings = await getAllRatings();

    res.status(200).json({
      status: true,
      message: 'All ratings fetched successfully',
      result: ratings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error fetching ratings',
      result: null,
    });
  }
}

async function getAllById(req, res) {
  try {
    const { doctorId } = req.params;

    // Fetch all ratings for the specified doctor
    const doctorRatings = await getAllRatingsByDoctorId(doctorId);

    res.status(200).json({
      status: true,
      message: `All ratings for Doctor ID ${doctorId} fetched successfully`,
      result: doctorRatings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error fetching ratings for the doctor',
      result: null,
    });
  }
}

async function create(req, res) {
  const { doctorId, userId, comment, rating, fullName } = req.body;

  if (!doctorId || !userId || !comment || !rating || !fullName) {
    return res.status(400).json({
      status: false,
      message: 'Please provide doctorId, userId, comment, rating, and fullName',
      result: null,
    });
  }

  try {
    await createRating(doctorId, userId, comment, rating, fullName);
    res.status(201).json({
      status: true,
      message: 'Rating created successfully',
      result: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error creating rating',
      result: null,
    });
  }
}

async function deleteRating(req, res) {
  const ratingId = req.params.ratingId;

  if (!ratingId) {
    return res.status(400).json({
      status: false,
      message: 'Please provide a rating ID',
      result: null,
    });
  }

  try {
    await deleteRatingById(ratingId);

    res.status(200).json({
      status: true,
      message: 'Rating deleted successfully',
      result: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error deleting rating',
      result: null,
    });
  }
}

module.exports = {
  getAll,
  getAllById,
  create,
  deleteRating,
};
