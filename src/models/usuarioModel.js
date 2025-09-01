const db = require("../config/config.js");

const userQueries = {
    selectAll: "select ID as id, NOMBRE as nombre, APELLIDO as apellido, IDENTIFICACION as identificacion, EDAD as edad, SEXO as sexo from usuario",
    selectById: "select ID as id, NOMBRE as nombre, APELLIDO as apellido, IDENTIFICACION as identificacion, EDAD as edad, SEXO as sexo from usuario where identificacion = ?",
    insert: "insert into usuario (nombre, apellido, identificacion, edad, sexo) values (?, ?, ?, ?, ?)",
    update: "update usuario set nombre = ?, apellido = ?, identificacion = ?, edad = ?, sexo = ? where identificacion = ?",
    delete: "delete from usuario where identificacion = ?"
};

class Usuario {
    async getUsuarios() {
        const [rows] = await db.query(userQueries.selectAll);
        return rows;
    }

    async createUsuario(data) {
        const { nombre, apellido, identificacion, edad, sexo } = data;
        const params = [nombre, apellido, identificacion, edad, sexo];
        const [result] = await db.query(userQueries.insert, params);
        return result.insertId;
    }

    async updateUsuario(identificacion, data) {
        const { nombre, apellido, edad, sexo } = data;
        const params = [nombre, apellido, edad, sexo, identificacion];
        const [result] = await db.query(userQueries.update, params);
        return result.affectedRows;
    }

    async deleteUsuario(identificacion) {
        const params = [identificacion];
        const [result] = await db.query(userQueries.delete, params);
        return result.affectedRows;
    }

    async getUsuarioById(identificacion) {
        const params = [identificacion];
        const [rows] = await db.query(userQueries.selectById, params);
        return rows[0];
    }

    async findOrCreateUser(usuario) {
        let user = await this.getUsuarioById(usuario.identificacion);
        if (!user) {
            user = await this.createUsuario(usuario);
        }
        return user;
    }

}

module.exports = new Usuario();