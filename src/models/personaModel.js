const db = require("../config/config.js");


class Persona{
    getPersonas(callback) {
        const sql = "select * from persona"
        db.query(sql, callback);
    }

    getPersonaById(id, callback){
        const sql = "select * from persona where id = ?"
        db.query(sql, [id], callback);
    }

    postPersona(data, callback) {
        const { nombre, apellido, cedula, edad, celular } = data;
        const sql = "insert into persona (nombre, apellido, cedula, edad, celular) values (?,?,?,?,?)"
        db.query(sql, [nombre, apellido, cedula, edad, celular], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.insertId);
        });
    }

    putPersona(id, data, callback) {
        const { nombre, apellido, cedula, edad, celular } = data;
        const sql = "update persona set nombre = ?, apellido = ?, cedula = ?, edad = ?, celular = ? where id = ?"
        db.query(sql, [nombre, apellido, cedula, edad, celular, id], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.affectedRows);
        });
    }

    deletePersona(id, callback) {
        const sql = "delete from persona where id = ?"
        db.query(sql, [id], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.affectedRows);
        });
    }
}

module.exports = new Persona();