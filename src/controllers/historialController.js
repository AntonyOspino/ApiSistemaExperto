const {getAllHistorialByUserId, getLastHistorialByUserId} = require('../models/historialModel.js');

module.exports = {

    getAllHistorialByUserId: async (req, res) => {
        try {
            const userId = req.params.id;
            const historial = await getAllHistorialByUserId(userId);
            res.json(historial);
        } catch (err) {
            console.error("Error al obtener el historial:", err);
            res.status(500).json({ error: "Error al obtener el historial." });
        }
    },

    getLastHistorialByUserId: async (req, res) => {
        try {
            const userId = req.params.id;
            const historial = await getLastHistorialByUserId(userId);
            if (!historial) {
                return res.status(404).json({ message: "Historial no encontrado para este usuario." });
            }
            res.json(historial);
        } catch (err) {
            console.error("Error al obtener el último historial:", err);
            res.status(500).json({ error: "Error al obtener el último historial." });
        }
    }
}