const db = require('../config/config.js');
const diagnosticoQueries = {
    getDiagnosticoById: "SELECT * FROM diagnostico WHERE id = ?"
}

class DiagnosticoModel {
    getDiagnosticoById(id, callback) {
        const query = diagnosticoQueries.getDiagnosticoById;
        db.query(query, [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                const diagnostico = results[0] ? new DiagnosticoModel(results[0]) : null;
                callback(null, diagnostico);
            }
        });
    }
}

module.exports = new DiagnosticoModel();
