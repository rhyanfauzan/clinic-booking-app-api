// controllers/availabilityController.js  Availability Controller Handling Request and Response
const {
  checkDoctorAvailability,
  createDoctorAvailability,
} = require('../services/availabilityService');

async function checkAvailability(req, res) {
  try {
    const { doctorId, date, hour, minute } = req.query;

    if (!doctorId || !date || !hour || !minute) {
      return res.status(400).json({
        status: false,
        message: 'Please provide doctorId, date, hour, and minute',
        result: null,
      });
    }

    const isAvailable = await checkDoctorAvailability(
      doctorId,
      date,
      hour,
      minute
    );

    res.status(200).json({
      status: true,
      message: 'Availability checked',
      result: { isAvailable },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error checking availability',
      result: null,
    });
  }
}

async function createAvailability(req, res) {
  const { doctorId, date, hour, minute } = req.body;

  if (!doctorId || !date || !hour || !minute) {
    return res.status(400).json({
      status: false,
      message: 'Please provide doctorId, date, hour, and minute',
      result: null,
    });
  }

  try {
    await createDoctorAvailability(doctorId, date, hour, minute);
    res.status(201).json({
      status: true,
      message: 'Doctor availability created successfully',
      result: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error creating doctor availability',
      result: null,
    });
  }
}

module.exports = {
  checkAvailability,
  createAvailability,
};
