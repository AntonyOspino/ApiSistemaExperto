const db = require('../config/config.js');
const diagnosticoQueries = {
    getDiagnosticoById: "SELECT nombre, descripcion, recomendaciones, nivel_gravedad FROM diagnostico WHERE id = ?",
    getAllDiagnosticos: "SELECT nombre, descripcion, recomendaciones, nivel_gravedad FROM diagnostico"
}

class DiagnosticoModel {
    async getDiagnosticoById(id) {
        const [rows] = await db.query(diagnosticoQueries.getDiagnosticoById, [id]);
        return rows ? rows[0] : [];
    }

    async getAllDiagnosticos() {
        const [rows] = await db.query(diagnosticoQueries.getAllDiagnosticos);
        return rows || [];
    }
}

module.exports = new DiagnosticoModel();
