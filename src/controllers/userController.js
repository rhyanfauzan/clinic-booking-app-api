// controllers/userController.js - User Controller Handling Request and Response
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  registerUser,
  loginUser,
  getAllUsers,
  getAllUsersByRole,
  getUsersById,
  deleteUserById,
} = require("../services/userService");

async function register(req, res) {
  const { username, fullName, email, password, role, contact } = req.body;
  const profileImageWithPath = req.uploadedFileName; // Retrieve the filename with the 'uploads/' path

  if (!username || !fullName || !email || !password || !role) {
    return res.status(400).json({
      status: false,
      message: "Please provide username, full name, email, password, and role",
      result: null,
    });
  }

  var profileImage;

  if (profileImageWithPath != null && profileImageWithPath != "") {
    // Extracting the filename from the path
    profileImage = profileImageWithPath
      ? profileImageWithPath.split("/").slice(-1)[0]
      : ""; // Get the filename after the last '/'
  } else {
    profileImage = "logo.png";
  }

  try {
    await registerUser(
      username,
      fullName,
      email,
      password,
      role,
      profileImage,
      contact
    );
    res.status(201).json({
      status: true,
      message: "User registered successfully",
      result: null,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      status: false,
      message: "Error registering user",
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
      message: "Login successful",
      result: result,
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "Invalid email or password",
      result: null,
    });
  }
}

async function getUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      status: true,
      message: "Users retrieved successfully",
      result: users,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching users",
      result: null,
    });
  }
}

async function getUsersByRole(req, res) {
  const { role } = req.query;

  if (!role) {
    return res.status(400).json({
      status: false,
      message: "Please provide a role parameter",
      result: null,
    });
  }

  try {
    const users = await getAllUsersByRole(role);
    res.status(200).json({
      status: true,
      message: "Users retrieved successfully by role",
      result: users,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      status: false,
      message: "Error fetching users by role",
      result: null,
    });
  }
}


async function getUserById(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      status: false,
      message: "Please provide a id parameter",
      result: null,
    });
  }

  try {
    const users = await getUsersById(id);
    res.status(200).json({
      status: true,
      message: "Users retrieved successfully by id",
      result: users,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      status: false,
      message: "Error fetching users by id",
      result: null,
    });
  }
}

async function deleteUser(req, res) {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({
      status: false,
      message: "Please provide a user ID",
      result: null,
    });
  }

  try {
    await deleteUserById(userId);
    res.status(200).json({
      status: true,
      message: "User deleted successfully",
      result: null,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error deleting user",
      result: null,
    });
  }
}

module.exports = { register, login, getUsers, getUsersByRole, getUserById, deleteUser };
