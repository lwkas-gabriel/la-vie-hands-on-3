const db = require("../database");
const { DataTypes } = require("sequelize");

const Pacientes = db.define("pacientes", {
    id_paciente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome:{
        type: DataTypes.STRING,
    },
    idade:{
        type: DataTypes.DATE,
    },
    email:{
        type:DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE
    },
},
    {
        tableName: "pacientes"
    }
);

module.exports = Pacientes;