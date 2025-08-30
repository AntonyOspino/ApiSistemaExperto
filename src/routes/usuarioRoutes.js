const express = require("express");

const router = express.Router();

const  usuarioController = require("../controllers/usuarioController.js");

router.get("/get", usuarioController.getUsuarios);
router.get("/get/:identificacion", usuarioController.getUsuarioById);
router.post("/create", usuarioController.createUsuario);
router.put("/update/:identificacion", usuarioController.updateUsuario);
router.delete("/delete/:identificacion", usuarioController.deleteUsuario);

module.exports = router;