const db = require("../database");
const { DataTypes } = require("sequelize");

const Psicologos = db.define("psicologos", {
    id_psicologo:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome:{
        type: DataTypes.STRING,
    },
    senha:{
        type: DataTypes.STRING,
        unique: true,
    },
    apresentacao:{
        type: DataTypes.STRING,
    },
    createdAt:{
        type: DataTypes.DATE,
    },
    updatedAt:{
        type: DataTypes.DATE,
    }
},
    {
        tableName: "psicologos"
    }
);

module.exports = Psicologos;