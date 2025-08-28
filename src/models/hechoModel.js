const db = require("../config/config.js");

const hechoQueries = {
  selectAll: "SELECT * FROM hecho",
  selectById: "SELECT * FROM hecho WHERE ID_HECHO = ?",
  insert: "INSERT INTO hecho (ID_HISTORIAL, ID_PREGUNTA, RESPUESTA) VALUES (?, ?, ?)",
  update: "UPDATE hecho SET ID_HISTORIAL = ?, ID_PREGUNTA = ?, RESPUESTA = ? WHERE ID_HECHO = ?",
  delete: "DELETE FROM hecho WHERE ID = ?",
};

class Hecho {
  async getHechos() {
    const [rows] = await db.query(hechoQueries.selectAll);
    return rows;
  }

  async createHecho(data) {
    const { ID_HISTORIAL, ID_PREGUNTA, RESPUESTA } = data;
    const params = [ID_HISTORIAL, ID_PREGUNTA, RESPUESTA];
    const [result] = await db.query(hechoQueries.insert, params);
    return result.insertId;
  }

  async updateHecho(id, data) {
    const { ID_HISTORIAL, ID_PREGUNTA, RESPUESTA } = data;
    const params = [ID_HISTORIAL, ID_PREGUNTA, RESPUESTA, id];
    const [result] = await db.query(hechoQueries.update, params);
    return result.affectedRows;
  }

  async deleteHecho(id) {
    const params = [id];
    const [result] = await db.query(hechoQueries.delete, params);
    return result.affectedRows;
  }

  async getHechoById(id) {
    const params = [id];
    const [rows] = await db.query(hechoQueries.selectById, params);
    return rows[0];
  }
}

module.exports = new Hecho();