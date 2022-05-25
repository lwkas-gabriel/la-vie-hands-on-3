const { Atendimento, Psicologo, Paciente } = require('../model');

const atendimentosController = {
    async cadastrar(req, res) {
        const { paciente_id, data_atendimento, observacao } = req.body;
        const { id } = req.auth;
        const existsUser = await Paciente.count({ where: { id_paciente: paciente_id } });

            if (!existsUser) {
                return res.status(400).json("Paciente não cadastrado na base de dados!");
            }
            const novoAtendimento = await Atendimento.create({
                paciente_id: paciente_id,
                psicologo_id: id,
                data_atendimento: data_atendimento,
                observacao: observacao
            });

            res.status(201).json(novoAtendimento);
    },


    async listarAtendimentos(req, res) {
        const atendimentos = await Atendimento.findAll(
            // {
            // include: [
            //     {
            //         model: Psicologo,
            //         attributes: ['psicologo_id']
            //     },
            //     {
            //         model: Paciente,
            //         attributes: ['paciente_id']
            //     }
            // ]
            // }
        );
        res.status(200).json(atendimentos);
    },

    async listarId(req, res) {
        const { paciente_id } = req.params;

        console.log(paciente_id);

        const atendimento = await Atendimento.findByPk(paciente_id
        //     , {
        //     include: [
        //         {
        //             model: Psicologo,
        //             attributes: ['nome']
        //         },
        //         {
        //             model: Paciente
        //         }
        //     ]
        // }
        );

        if (atendimento) {
            res.status(200).json(atendimento);
        } else {
            res.status(404).json('Id não encontrado');
        }
    },
}

module.exports = atendimentosController;