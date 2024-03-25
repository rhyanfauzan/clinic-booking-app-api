// routes/cmsRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cmsController = require("../controllers/cmsController");
const { verifyToken } = require("../middleware/authMiddleware");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.random().toString(36).substring(2, 10); // Generate a unique suffix
    const fileName = uniqueSuffix + "-" + file.originalname; // Concatenate timestamp with random string and original filename
    req.uploadedFileName = fileName; // Store the filename without the 'uploads/' path in the request object
    cb(null, fileName); // Save the file with the directory path
  },
});

const upload = multer({ storage: storage });

// Define routes with authentication middleware
router.post(
  "/",
  verifyToken,
  upload.single("image"),
  cmsController.createBanners
);
router.delete("/:id", verifyToken, cmsController.deleteBanners);

// Public route for fetching all banner
router.get('/', cmsController.getAllBanners);

module.exports = router;
