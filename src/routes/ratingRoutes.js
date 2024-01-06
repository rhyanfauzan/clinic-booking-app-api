const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

router.get('/all', ratingController.getAll);
router.post('/create', ratingController.create);

module.exports = router;
