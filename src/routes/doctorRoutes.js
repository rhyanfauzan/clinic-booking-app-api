// routes/doctorRoutes.js - Doctor Routes Handling Endpoint Mapping
const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/search', doctorController.search);
router.get('/', doctorController.getAll);
router.post('/create', doctorController.create);
router.delete('/delete/:id', doctorController.remove);

module.exports = router;
