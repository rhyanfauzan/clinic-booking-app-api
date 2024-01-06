// services/userService.js - User Service Handling Database Operations
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../db');

// services/userService.js - User Service Handling Database Operations
async function registerUser(
  username,
  fullName,
  email,
  password,
  role,
  profileImage,
  contact
) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      'INSERT INTO users (username, full_name, email, password, role, profile_image, contact) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await db.execute(query, [
      username,
      fullName, // Insert full_name into the query
      email,
      hashedPassword,
      role,
      profileImage,
      contact,
    ]);
    return result;
  } catch (error) {
    throw new Error('Error registering user');
  }
}

async function loginUser(email, password) {
  try {
    const query = 'SELECT id, role, password FROM users WHERE email = ?';
    const [results] = await db.execute(query, [email]);

    if (results.length === 0) {
      throw new Error('Invalid email or password');
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        'your_secret_key',
        {
          expiresIn: '1h',
        }
      );
      return { token, role: user.role };
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    throw new Error('Error logging in');
  }
}

async function getAllUsers() {
  try {
    const query = 'SELECT * FROM users';
    const [results] = await db.execute(query);
    return results;
  } catch (error) {
    throw new Error('Error fetching users');
  }
}

async function getAllUsersByRole(role) {
  try {
    const query = 'SELECT * FROM users WHERE role = ?';
    const [users] = await db.execute(query, [role]);
    return users;
  } catch (error) {
    throw new Error('Error fetching users by role');
  }
}

async function deleteUserById(userId) {
  try {
    const query = 'DELETE FROM users WHERE id = ?';
    const [result] = await db.execute(query, [userId]);
    return result;
  } catch (error) {
    throw new Error('Error deleting user');
  }
}

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getAllUsersByRole,
  deleteUserById,
};
