const {getPersonas, getPersonaById, postPersona, putPersona, deletePersona} = require("../models/personaModel.js");
const {engine} = require("../models/rulesModel.js");
module.exports = {
    getPersonas: (req, res) => {
        getPersonas((err, personas) => {
            if (err) {
                return res.status(500).json({ error: "Error al obtener las personas" });
            }
            res.json(personas);
        });
    },

    getPersonaById: (req, res) => {
    const { id } = req.params;
    getPersonaById(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener la persona" });
        }
        // Verificar si se encontró una persona
        if (!results || results.length === 0) {
            return res.status(404).json({ error: "Persona no encontrada" });
        }
        const persona = results[0]; // Acceder al primer (y único) resultado
        engine
            .run({ age: persona.edad })
            .then(results => {
                if (results.events.length > 0) {
                    return res.status(403).json({ error: results.events[0].params.message });
                }
                res.json(persona);
            })
            .catch(err => {
                console.error("Error al ejecutar las reglas:", err);
                res.status(500).json({ error: "Error al verificar las reglas" });
            });
    });
},
    postPersona(req, res) {
        const newPersona = req.body;
        postPersona(newPersona, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error al agregar la persona" });
            }
            res.status(201).json({ message: "Persona agregada con éxito", data: { id: result } });
        });
    },

    putPersona(req, res) {
        const { id } = req.params;
        const updatedPersona = req.body;
        putPersona(id, updatedPersona, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error al actualizar la persona" });
            }
            res.json({ message: "Persona actualizada con éxito", data: { affectedRows: result } });
        });
    },

    deletePersona(req, res) {
        const { id } = req.params;
        deletePersona(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error al eliminar la persona" });
            }
            res.json({ message: "Persona eliminada con éxito", data: { affectedRows: result } });
        });
    }

}