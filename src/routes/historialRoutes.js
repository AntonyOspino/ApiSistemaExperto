const express = require('express');
const router = express.Router();

const historialController = require('../controllers/historialController.js');

router.get('/get/:id', historialController.getAllHistorialByUserId);
router.get('/get/:id/last', historialController.getLastHistorialByUserId);

module.exports = router;
