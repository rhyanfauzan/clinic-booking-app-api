// controllers/doctorController.js - Doctor Controller Handling Request and Response
const { searchDoctors } = require('../services/doctorService');
const { getAllDoctors } = require('../services/doctorService');
const { createDoctor } = require('../services/doctorService');
const { deleteDoctorById } = require('../services/doctorService');

async function search(req, res) {
  const { searchQuery } = req.query;

  if (!searchQuery) {
    return res.status(400).json({
      status: false,
      message: 'Please provide a search query',
      result: null,
    });
  }

  try {
    const results = await searchDoctors(searchQuery);
    res.status(200).json({
      status: true,
      message: 'Doctors found',
      result: results,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error searching for doctors',
      result: null,
    });
  }
}

async function getAll(req, res) {
  try {
    const doctors = await getAllDoctors();
    res.status(200).json({
      status: true,
      message: 'All doctors retrieved',
      result: doctors,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error fetching all doctors',
      result: null,
    });
  }
}

async function create(req, res) {
  const { name, specialty, gender, contact_number } = req.body;

  if (!name || !specialty || !gender || !contact_number) {
    return res.status(400).json({
      status: false,
      message: 'Please provide name, specialty, gender, and contact_number',
      result: null,
    });
  }

  try {
    await createDoctor(name, specialty, gender, contact_number);
    res.status(201).json({
      status: true,
      message: 'Doctor created successfully',
      result: null,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error creating doctor',
      result: null,
    });
  }
}

async function remove(req, res) {
  const doctorId = req.params.id;

  if (!doctorId) {
    return res.status(400).json({
      status: false,
      message: 'Please provide a doctor ID',
      result: null,
    });
  }

  try {
    await deleteDoctorById(doctorId);
    res.status(200).json({
      status: true,
      message: 'Doctor deleted successfully',
      result: null,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error deleting doctor',
      result: null,
    });
  }
}

module.exports = { search, getAll, create, remove };
