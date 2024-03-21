// routes/userRoutes.js - User Routes Handling Endpoint Mapping
const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + '-' + Math.random().toString(36).substring(2, 10); // Generate a unique suffix
    const fileName = uniqueSuffix + '-' + file.originalname; // Concatenate timestamp with random string and original filename
    req.uploadedFileName = fileName; // Store the filename without the 'uploads/' path in the request object
    cb(null, fileName); // Save the file with the directory path
  },
});

const upload = multer({ storage: storage });
router.post(
  '/register',
  upload.single('profileImage'),
  userController.register
);
router.post('/login', userController.login);
router.get('/all', userController.getUsers);
router.get('/role', userController.getUsersByRole);
router.get('/userid', userController.getUserById);
router.delete('/delete/:userId', userController.deleteUser);

module.exports = router;
