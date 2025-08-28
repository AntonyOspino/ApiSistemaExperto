const {getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario} = require("../models/usuarioModel.js");

module.exports = {

    getUsuarios: async (req, res) => {
        try {
            const usuarios = await getUsuarios();
            res.json(usuarios);
        } catch (err) {
            console.error("Error al obtener usuarios:", err);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    getUsuarioById: async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = await getUsuarioById(id);
            if (!usuario) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            res.json(usuario);
        } catch (err) {
            console.error("Error al obtener usuario por ID:", err);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    createUsuario: async (req, res) => {
        try {
            const newUser = req.body;
            const userId = await createUsuario(newUser);
            res.status(201).json({ id: userId });
        } catch (err) {
            console.error("Error al crear usuario:", err);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    updateUsuario: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedUser = req.body;
            const affectedRows = await updateUsuario(id, updatedUser);
            if (affectedRows === 0) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            res.json({ affectedRows });
        } catch (err) {
            console.error("Error al actualizar usuario:", err);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    deleteUsuario: async (req, res) => {
        try {
            const { id } = req.params;
            const affectedRows = await deleteUsuario(id);
            if (affectedRows === 0) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            res.json({ message: "Usuario eliminado", data: { affectedRows } });
        } catch (err) {
            console.error("Error al eliminar usuario:", err);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

};