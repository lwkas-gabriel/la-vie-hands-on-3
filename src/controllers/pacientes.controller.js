const { Pacientes } = require('../model');

const PacientesController = {
  async listarTodos(req, res) {
    const pacientes = await Pacientes.findAll();
    res.status(200).json(pacientes);
  },
  async buscarPorId(req, res) {
    const { id } = req.params;
    const paciente = await Pacientes.findByPk(id);
    if (paciente) {
      res.status(200).json(paciente);
    } else {
      res.status(404).json("Id não encontrado");
    }
  },
  async cadastrar(req, res) {
    const { nome, email, idade } = req.body;
    const novoPaciente = await Pacientes.create({
      nome,
      email,
      idade,
    });
    res.status(201).json(novoPaciente);
  },
  async atualizar(req, res) {
    const { id } = req.params;
    const { nome, email, idade } = req.body;
    if(!id) return res.status(400).json("Id não encontrado");
    await Pacientes.update(
      {
        nome,
        email,
        idade,
      },
      {
        where: {
          id_paciente: id,
        },
      }
    );
    const pacienteAtualizado = await Pacientes.findByPk(id);
    res.status(200).json(pacienteAtualizado);
  },
  async deletar(req, res) {
    const { id } = req.params
    if (!id) return res.status(404).json("Id não encontrado")
    await Pacientes.destroy({
        where: {
            id_paciente: id
        }
    })
    res.status(204).json("Paciente excluido com sucesso")
}
};

module.exports = PacientesController;