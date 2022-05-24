const { Atendimento, Psicologo, Paciente } = require('../model');

const atendimentosController = {
    async cadastrar(req, res) {
        const { data_atendimento, observacao, paciente_id } = req.body;
        const { id_psicologo } = req.auth;
        const existsUser = await Paciente.count({ where: { paciente_id } });

            if (!existsUser) {
                return res.status(400).json("Paciente não cadastrado na base de dados!");
            }
            const novoAtendimento = await Atendimento.create({
                data_atendimento,
                observacao,
                id_paciente,
                id_psicologo: id_psicologo
            });

            res.status(201).json(novoAtendimento);
    },


    async listarAtendimentos(req, res) {
        const atendimentos = await Atendimento.findAll({
            include: [
                {
                    model: Psicologo,
                    attributes: ['nome']
                },
                {
                    model: Paciente
                }
            ]
        });
        res.status(200).json(atendimentos);
    },

    async listarId(req, res) {
        const { id } = req.params;

        const atendimento = await Atendimento.findByPk(id, {
            include: [
                {
                    model: Psicologo,
                    attributes: ['nome']
                },
                {
                    model: Paciente
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