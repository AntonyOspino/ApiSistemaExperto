const db = require("../config/config.js");

const userQueries = {
    selectAll: "select * from usuario",
    selectById: "select * from usuario where id = ?",
    insert: "insert into usuario (nombre, apellido, nombre_usuario, password, edad, sexo) values (?, ?, ?, ?, ?, ?)",
    update: "update usuario set nombre = ?, apellido = ?, nombre_usuario = ?, password = ?, edad = ?, sexo = ? where id = ?",
    delete: "delete from usuario where id = ?"
}

class Usuario {
    async getUsuarios() {
        const [rows] = await db.query(userQueries.selectAll);
        return rows;
    }

    async createUsuario(data) {
        const { nombre, apellido, username, password, edad, sexo } = data;
        const params = [nombre, apellido, username, password, edad, sexo];
        const [result] = await db.query(userQueries.insert, params);
        return result.insertId;
    }

    async updateUsuario(id, data) {
        const { nombre, apellido, username, password, edad, sexo } = data;
        const params = [nombre, apellido, username, password, edad, sexo, id];
        const [result] = await db.query(userQueries.update, params);
        return result.affectedRows;
    }

    async deleteUsuario(id) {
        const params = [id];
        const [result] = await db.query(userQueries.delete, params);
        return result.affectedRows;
    }

    async getUsuarioById(id) {
        const params = [id];
        const [rows] = await db.query(userQueries.selectById, params);
        return rows[0];
    }
}

module.exports = new Usuario();