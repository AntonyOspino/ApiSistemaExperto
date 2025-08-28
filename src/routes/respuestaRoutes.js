const express = require('express');
const router = express.Router();

const respuestaController = require('../controllers/respuestaController.js');

router.post('/add', respuestaController.enviarRespuesta);

module.exports = router;