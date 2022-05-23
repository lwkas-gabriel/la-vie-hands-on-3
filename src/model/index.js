const Atendimento = require("./Atendimento");
const Paciente = require("./Paciente");
const Psicologo = require("./Psicologo");

Paciente.belongsToMany(Psicologo, {
    foreignKey: "paciente_id",
    through: "Atendimento",
});

Psicologo.belongsToMany(Paciente, {
    foreignKey: "psicologo_id",
    through: "Atendimento",
});

module.exports = {
    Atendimento,
    Paciente,
    Psicologo
}
