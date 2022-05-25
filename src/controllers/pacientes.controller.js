const { Paciente } = require('../model');

const PacientesController = {
  async listarTodos(req, res) {
    const pacientes = await Paciente.findAll();
    res.status(200).json(pacientes);
  },
  async buscarPorId(req, res) {
    const { id_paciente } = req.params;
    const paciente = await Paciente.findByPk(id_paciente);
    if (paciente) {
      res.status(200).json(paciente);
    } else {
      res.status(404).json("Id não encontrado");
    }
  },
  async cadastrar(req, res) {
    const { nome, email, idade } = req.body;
    const novoPaciente = await Paciente.create({
      nome,
      email,
      idade,
    });
    res.status(201).json(novoPaciente);
  },
  async atualizar(req, res) {
    const { id_paciente } = req.params;
    const { nome, email, idade } = req.body;
    if(!id_paciente) return res.status(400).json("Id não encontrado");
    await Paciente.update(
      {
        nome,
        email,
        idade,
      },
      {
        where: {
          id_paciente: id_paciente
        },
      }
    );
    const pacienteAtualizado = await Paciente.findByPk(id_paciente);
    res.status(200).json(pacienteAtualizado);
  },
  async deletar(req, res) {
    const { id_paciente } = req.params
    if (!id_paciente) return res.status(404).json("Id não encontrado")
    await Paciente.destroy({
        where: {
            id_paciente: id_paciente
        }
    })
    res.status(204).json("Paciente excluido com sucesso")
}
};

module.exports = PacientesController;