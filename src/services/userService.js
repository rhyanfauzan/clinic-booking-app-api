// services/userService.js - User Service Handling Database Operations
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../db");

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
      "INSERT INTO users (username, full_name, email, password, role, profile_image, contact, rating) VALUES (?, ?, ?, ?, ?, ?, ?, 0)";
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
    throw new Error("Error registering user");
  }
}

async function loginUser(email, password) {
  try {
    const query = "SELECT * FROM users WHERE email = ?";
    const [results] = await db.execute(query, [email]);

    if (results.length === 0) {
      throw new Error("Invalid email or password");
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        "your_secret_key",
        {
          expiresIn: "12h",
        }
      );
      return { userID: user.id, token, userData: user };
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    throw new Error("Error logging in");
  }
}

async function getAllUsers() {
  try {
    const query =
      "SELECT id, username, email, full_name, role, profile_image, rating FROM users";
    const [results] = await db.execute(query);
    return results;
  } catch (error) {
    throw new Error("Error fetching users");
  }
}

async function getAllUsersByRole(role) {
  try {
    const query =
      "SELECT id, username, email, full_name, role, profile_image, rating FROM users WHERE role = ?";
    const [users] = await db.execute(query, [role]);
    return users;
  } catch (error) {
    throw new Error("Error fetching users by role");
  }
}

async function getUsersById(userId) {
  try {
    const query =
      "SELECT id, username, email, full_name, role, profile_image, rating FROM users WHERE id = ?";
    const [users] = await db.execute(query, [userId]);
    return users;
  } catch (error) {
    throw new Error("Error fetching users by userId");
  }
}

async function getDoctorUserId(doctorName) {
  try {
    const query = 'SELECT id FROM users WHERE role = "doctor" AND name = ?'; // Adjust your query to find the doctor's userId
    const [result] = await db.execute(query, [doctorName]);
    if (result.length > 0) {
      return result[0].id;
    } else {
      throw new Error("Doctor not found");
    }
  } catch (error) {
    throw new Error("Error fetching doctor ID");
  }
}

async function deleteUserById(userId) {
  try {
    const query = "DELETE FROM users WHERE id = ?";
    const [result] = await db.execute(query, [userId]);
    return result;
  } catch (error) {
    throw new Error("Error deleting user");
  }
}

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getAllUsersByRole,
  getUsersById,
  getDoctorUserId,
  deleteUserById,
};
