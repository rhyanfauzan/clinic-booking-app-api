// controllers/userController.js - User Controller Handling Request and Response
const { registerUser, loginUser } = require('../services/userService');

async function register(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      status: false,
      message: 'Please provide username, email, and password',
      result: null,
    });
  }

  try {
    await registerUser(username, email, password);
    res.status(201).json({
      status: true,
      message: 'User registered successfully',
      result: null,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error registering user',
      result: null,
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const result = await loginUser(email, password);
    res.status(200).json({
      status: true,
      message: 'Login successful',
      result: result,
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: 'Invalid email or password',
      result: null,
    });
  }
}

module.exports = { register, login };
