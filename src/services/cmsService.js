// services/cmsService.js
const db = require('../../db');

// Service content 
async function createContent({ title, description, image }) {
  try {
    const query = "INSERT INTO content (title, description, image) VALUES (?, ?, ?)";
    await db.execute(query, [title, description, image]);
  } catch (error) {
    throw new Error("Error creating content");
  }
}

async function updateContent(id, { title, description }) {
  try {
    const query = "UPDATE content SET title = ?, description = ? WHERE id = ?";
    await db.execute(query, [title, description, id]);
  } catch (error) {
    throw new Error("Error updating content");
  }
}

async function getAllContent() {
  try {
    const query = "SELECT * FROM content";
    const [content] = await db.execute(query);
    return content;
  } catch (error) {
    throw new Error("Error fetching content");
  }
}

async function deleteContent(id) {
  try {
    const query = "DELETE FROM content WHERE id = ?";
    await db.execute(query, [id]);
  } catch (error) {
    throw new Error("Error deleting content");
  }
}

// Service Banner
async function createBanner({ additional, image }) {
  try {
    const query = "INSERT INTO banner (additional, image) VALUES (?, ?)";
    await db.execute(query, [additional, image]);
  } catch (error) {
    throw new Error("Error creating banner");
  }
}

async function getAllBanner() {
  try {
    const query = "SELECT * FROM banner";
    const [banner] = await db.execute(query);
    return banner;
  } catch (error) {
    throw new Error("Error fetching banner");
  }
}

async function deleteBanner(id) {
  try {
    const query = "DELETE FROM banner WHERE id = ?";
    await db.execute(query, [id]);
  } catch (error) {
    throw new Error("Error deleting banner");
  }
}

module.exports = {
  createContent,
  updateContent,
  getAllContent,
  deleteContent,
  createBanner,
  getAllBanner,
  deleteBanner
};
