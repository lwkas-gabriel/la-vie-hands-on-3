const express = require("express");
const pacienteController = require("../controllers/pacientes.controller");
const psicologoController = require("../controllers/psicologos.controller");
const atendimentoController = require("../controllers/atendimentosController");
const authController = require("../controllers/authController");
const psicologoCreate = require("../validations/psicologos/create");
const pacienteCreate = require("../validations/pacientes/create");
const pacienteEdit = require("../validations/pacientes/edit");
const psicologoEdit = require("../validations/psicologos/edit");
const authLoginValidation = require("../validations/auth/login");
const auth = require("../middlewares/auth");

const routes = express.Router();

routes.get("/", (req, res) =>{
    res.end("Bem-vindo ao sistema la vie de acompanhamento psicologico!");
});

//pacientes
routes.get("/pacientes", pacienteController.listarTodos);
routes.get("/pacientes/:id_paciente", pacienteController.buscarPorId);
routes.post("/pacientes", pacienteCreate, pacienteController.cadastrar);
routes.delete("/pacientes/:id_paciente", pacienteController.deletar);
routes.put("/pacientes/:id_paciente", pacienteEdit ,pacienteController.atualizar);

//psicologos
routes.get("/psicologos", psicologoController.listarPsico);
routes.get("/psicologos/:id_psicologo", psicologoController.listarId);
routes.post("/psicologos", psicologoCreate,psicologoController.cadastrarPsicologo);
routes.delete("/psicologos/:id_psicologo", psicologoController.deletarPsico);
routes.put("/psicologos/:id_psicologo", psicologoEdit, psicologoController.atualizarPsico);

//atendimento
routes.get("/atendimentos/:paciente_id", atendimentoController.listarId); //lista pelo id do paciente
routes.get("/atendimentos", atendimentoController.listarAtendimentos); //lista todos
routes.post("/atendimentos", auth, atendimentoController.cadastrar); //aqui o psicologo precisa estar autenticado pra cadastrar um novo

//login

routes.post("/login", authLoginValidation, authController.login);

module.exports = routes;