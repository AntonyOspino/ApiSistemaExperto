const express = require('express');

const router = express.Router();

const personaController = require('../controllers/personaController.js');

router.get('/get', personaController.getPersonas);
router.get('/get/:id', personaController.getPersonaById);
router.post('/add', personaController.postPersona);
router.put('/update/:id', personaController.putPersona);
router.delete('/delete/:id', personaController.deletePersona);

module.exports = router;