const db = require('../config/config.js');
const historialQueries = {
  getAllHistorialByUserId: "SELECT historial.*, diagnostico.nombre AS diagnostico_nombre, usuario.nombre AS usuario_nombre, diagnostico.descripcion, diagnostico.recomendaciones, diagnostico.nivel_gravedad FROM historial inner join diagnostico on historial.id_diagnostico = diagnostico.id inner join usuario on historial.id_usuario = usuario.id WHERE usuario.id = ? ORDER BY historial.fecha DESC",
  getLastHistorialByUserId: "SELECT historial.*, diagnostico.nombre AS diagnostico_nombre, usuario.nombre AS usuario_nombre, diagnostico.descripcion, diagnostico.recomendaciones, diagnostico.nivel_gravedad FROM historial inner join diagnostico on historial.id_diagnostico = diagnostico.id inner join usuario on historial.id_usuario = usuario.id WHERE usuario.id = ? ORDER BY historial.fecha DESC LIMIT 1",
  create: "INSERT INTO historial (ID_USUARIO, FECHA) VALUES (?, ?)",
  update: "UPDATE historial SET ID_USUARIO = ?, FECHA = ?, ID_DIAGNOSTICO = ? WHERE ID = ?",
}

class HistorialModel {
  async getAllHistorialByUserId(userId) {
    const [rows] = await db.query(historialQueries.getAllHistorialByUserId, [userId]);
    return rows;
  }

  async getLastHistorialByUserId(userId) {
    const [rows] = await db.query(historialQueries.getLastHistorialByUserId, [userId]);
    return rows[0] || null;
  }

  async createHistorial(data) {
    const { id_usuario, fecha } = data;
    const [result] = await db.query(historialQueries.create, [id_usuario, fecha]);
    return result.insertId;
  }

  async updateHistorial(id, data) {
    const { id_usuario, fecha, id_diagnostico } = data;
    const [result] = await db.query(historialQueries.update, [id_usuario, fecha, id_diagnostico, id]);
    return result.affectedRows;
  }
}

module.exports = new HistorialModel();