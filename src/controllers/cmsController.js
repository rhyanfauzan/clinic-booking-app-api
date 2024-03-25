// controllers/cmsController.js
const {
  createContent,
  updateContent,
  getAllContent,
  deleteContent,
  createBanner,
  getAllBanner,
  deleteBanner
} = require("../services/cmsService");

// Function to handle creation of new content
async function createContents(req, res) {
  // Extracting required fields from request body
  const { title, description } = req.body;
  const imageWithPath = req.uploadedFileName; // Retrieve the filename with the 'uploads/' path

  // Check if required fields are provided
  if (!title || !description) {
    return res.status(400).json({
      status: false,
      message: "Please provide title and description",
      result: null,
    });
  }

  let image = "";

  // Extracting the filename from the path
  if (imageWithPath) {
    image = imageWithPath.split("/").slice(-1)[0];
  }

  try {
    // Call the service function to create new content
    await createContent({ title, description, image });
    res.status(201).json({
      status: true,
      message: "Content created successfully",
      result: null,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      status: false,
      message: "Error creating content",
      result: null,
    });
  }
}

// Function to handle updating existing content
async function updateContents(req, res) {
  // Extracting content ID from request parameters
  const { id } = req.params;
  // Extracting required fields from request body
  const { title, description } = req.body;

  // Check if required fields are provided
  if (!title || !description) {
    return res.status(400).json({
      status: false,
      message: "Please provide title and description",
      result: null,
    });
  }

  try {
    // Call the service function to update content without changing the image
    await updateContent(id, { title, description });
    res.status(200).json({
      status: true,
      message: "Content updated successfully",
      result: null,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      status: false,
      message: "Error updating content",
      result: null,
    });
  }
}

// Function to handle retrieving all content
async function getAllContents(req, res) {
  try {
    // Call the service function to get all content
    const content = await getAllContent();
    res.status(200).json({
      status: true,
      message: "All content retrieved successfully",
      result: content,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      status: false,
      message: "Error fetching content",
      result: null,
    });
  }
}

// Function to handle deletion of content
async function deleteContents(req, res) {
  // Extracting content ID from request parameters
  const { id } = req.params;

  try {
    // Call the service function to delete content
    await deleteContent(id);
    res.status(200).json({
      status: true,
      message: "Content deleted successfully",
      result: null,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      status: false,
      message: "Error deleting content",
      result: null,
    });
  }
}


// Function to handle creation of new banner
async function createBanners(req, res) {
  // Extracting required fields from request body
  const { additional } = req.body;
  const imageWithPath = req.uploadedFileName; // Retrieve the filename with the 'uploads/' path

  // Check if required fields are provided
  if (!imageWithPath) {
    return res.status(400).json({
      status: false,
      message: "Please provide iage",
      result: null,
    });
  }

  let image = "";

  // Extracting the filename from the path
  if (imageWithPath) {
    image = imageWithPath.split("/").slice(-1)[0];
  }

  try {
    // Call the service function to create new banner
    await createBanner({ additional, image });
    res.status(201).json({
      status: true,
      message: "Banner created successfully",
      result: null,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      status: false,
      message: "Error creating banner",
      result: null,
    });
  }
}

// Function to handle retrieving all banner
async function getAllBanners(req, res) {
  try {
    // Call the service function to get all banner
    const banner = await getAllBanner();
    res.status(200).json({
      status: true,
      message: "All banner retrieved successfully",
      result: banner,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      status: false,
      message: "Error fetching banner",
      result: null,
    });
  }
}

// Function to handle deletion of banner
async function deleteBanners(req, res) {
  // Extracting banner ID from request parameters
  const { id } = req.params;

  try {
    // Call the service function to delete banner
    await deleteBanner(id);
    res.status(200).json({
      status: true,
      message: "Banner deleted successfully",
      result: null,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      status: false,
      message: "Error deleting banner",
      result: null,
    });
  }
}

module.exports = {
  createContents,
  updateContents,
  getAllContents,
  deleteContents,
  createBanners,
  getAllBanners,
  deleteBanners,
};
