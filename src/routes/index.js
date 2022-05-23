const express = require("express");
const pacienteController = require("../controllers/pacientes.controller");
const psicologoController = require("../controllers/psicologos.controller");
const atendimentoController = require("../controllers/atendimentosController");


const routes = express.Router();

routes.get("/", (req, res) =>{
    res.end("Bem-vindo ao sistema la vie de acompanhamento psicologico!");
});

//pacientes
routes.get("/pacientes", pacienteController.listarTodos);
routes.get("/pacientes/:id_paciente", pacienteController.buscarPorId);
routes.post("/pacientes", pacienteController.cadastrar);
routes.delete("/pacientes/:id_paciente", pacienteController.deletar);
routes.put("/pacientes/:id_paciente", pacienteController.atualizar);

//psicologos
routes.get("/psicologos", psicologoController.listarPsico);
routes.get("/psicologos/:id_psicologo", psicologoController.listarId);
routes.post("/psicologos", psicologoController.cadastrarPsicologo);
routes.delete("/psicologos/:id_psicologo", psicologoController.deletarPsico);
routes.put("/psicologos/:id_psicologo", psicologoController.atualizarPsico);

//atendimento
routes.post("/atendimentos", atendimentoController.cadastrar);
routes.get("/atendimentos/:id", atendimentoController.listarId);

module.exports = routes;