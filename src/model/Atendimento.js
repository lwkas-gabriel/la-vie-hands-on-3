const db = require("../database");
const { DataTypes } = require("sequelize");

const Paciente = require("./Paciente");
const Psicologo = require("./Psicologo");

const Atendimentos = db.define("atendimentos" ,{
    paciente_id:{
        type:DataTypes.INTEGER,
        references:{
            model: Paciente,
            key: "id_paciente",
        }
    },
    psicologo_id:{
        type: DataTypes.INTEGER,
        references:{
            model: Psicologo,
            key: "id_psicologo",
        }
    },
    data_paciente:{
        type: DataTypes.DATE,
    },
    observacao:{
        type: DataTypes.STRING,
    },
    createdAt:{
        type: DataTypes.DATE,
    },
    updatedAt:{
        type: DataTypes.DATE,
    },
},
    {
        tableName: "atendimentos",
    }
);

module.exports = Atendimento;