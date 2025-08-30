const {getAllHistorialByUserId, getLastHistorialByUserId} = require('../models/historialModel.js');

module.exports = {

    getAllHistorialByUserId: async (req, res) => {
        try {
            const userId = req.params.id;
            const historial = await getAllHistorialByUserId(userId);
            if (!historial || historial.length === 0) {
                return res.status(404).json({ message: "Historial no encontrado para este usuario." });
            }
            res.json({message: "Historial encontrado para el usuario identificado con " + userId + ".", data: historial});
        } catch (err) {
            console.error("Error al obtener el historial:", err);
            res.status(500).json({ error: "Error al obtener el historial." });
        }
    },

    getLastHistorialByUserId: async (req, res) => {
        try {
            const userId = req.params.id;
            const historial = await getLastHistorialByUserId(userId);
            if (!historial || historial.length === 0) {
                return res.status(404).json({ message: "Historial no encontrado para este usuario." });
            }
            res.json({message: "Último historial encontrado para el usuario identificado con: " + userId + ".", data: historial});
        } catch (err) {
            console.error("Error al obtener el último historial:", err);
            res.status(500).json({ error: "Error al obtener el último historial." });
        }
    }
}