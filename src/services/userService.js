// services/userService.js - User Service Handling Database Operations
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

async function registerUser(username, email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const [result] = await db.execute(query, [username, email, hashedPassword]);
    return result;
  } catch (error) {
    throw new Error('Error registering user');
  }
}

async function loginUser(email, password) {
  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [results] = await db.execute(query, [email]);

    if (results.length === 0) {
      throw new Error('Invalid email or password');
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ userId: user.id }, 'your_secret_key', {
        expiresIn: '1h',
      });
      return { token };
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    throw new Error('Error logging in');
  }
}

module.exports = { registerUser, loginUser };
