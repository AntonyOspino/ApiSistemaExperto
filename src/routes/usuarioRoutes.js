const express = require("express");

const router = express.Router();

const  usuarioController = require("../controllers/usuarioController.js");

router.get("/get", usuarioController.getUsuarios);
router.get("/get/:id", usuarioController.getUsuarioById);
router.post("/create", usuarioController.createUsuario);
router.put("/update/:id", usuarioController.updateUsuario);
router.delete("/delete/:id", usuarioController.deleteUsuario);

module.exports = router;