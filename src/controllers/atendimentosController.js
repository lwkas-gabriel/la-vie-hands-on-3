const { Atendimentos, Psicologos, Pacientes } = require('../model');

const atendimentosController = {
    async cadastrar(req, res) {
        const { data_atendimento, observacao, paciente_id } = req.body;
        const { id } = req.auth;
        const existsUser = await Pacientes.count({ where: { paciente_id } });

            if (!existsUser) {
                return res.status(400).json("Paciente não cadastrado na base de dados!");
            }
            const novoAtendimento = await Atendimentos.create({
                data_atendimento,
                observacao,
                id_paciente,
                id_psicologo: id
            });

            res.status(201).json(novoAtendimento);
    },


    async listarAtendimentos(req, res) {
        const atendimentos = await Atendimentos.findAll({
            include: [
                {
                    model: Psicologos,
                    attributes: ['nome']
                },
                {
                    model: Pacientes
                }
            ]
        });
        res.status(200).json(atendimentos);
    },

    async listarId(req, res) {
        const { id } = req.params;

        const atendimento = await Atendimentos.findByPk(id, {
            include: [
                {
                    model: Psicologos,
                    attributes: ['nome']
                },
                {
                    model: Pacientes
                }
            ]
        });

        if (atendimento) {
            res.status(200).json(atendimento);
        } else {
            res.status(404).json('Id não encontrado');
        }
    },
}

module.exports = atendimentosController;