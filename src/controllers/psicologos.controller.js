const { Psicologos } = require('../model')

const psicologosController = {
    async cadastrarPsicologo(req, res) {
        const { nome, email, senha, apresentacao } = req.body
        const existsUser = await Psicologos.count({ where: { email } });
        if (existsUser) {
            return res.status(400).json("Email já existe");
        }
        const newSenha = bcrypt.hashSync(senha, 10)
        const newPsico = await Psicologos.create({
            nome,
            email,
            senha: newSenha,
            apresentacao
        })
        res.status(201).json(newPsico)
    },
    async listarPsico(req, res) {
        const psicologos = await Psicologos.findAll()
        res.json(psicologos)
    },
    async listarId(req, res) {
        const { id } = req.params
        const psicologo = await Psicologos.findByPk(id)
        res.json(psicologo)
    },
    async atualizarPsico(req, res) {
        const { id } = req.params
        const { nome, email, apresentacao } = req.body
        const newSenha = bcrypt.hashSync(req.body.senha, 10)
        if (!id) return res.status(400).json('Id não encontrado.')
        const psicoAtualizado = await Psicologos.update(
            {
                nome,
                email,
                senha: newSenha,
                apresentacao
            },
            {
                where: {
                    psico_id: id
                }
            }
        )
        const psico = await Psicologos.findByPk(id)
        res.status(200).json(psico)
    },
    async deletarPsico(req, res) {
        const { id } = req.params
        if (!id) return res.status(404).json('Id não encontrado.')
        await Psicologos.destroy({
            where: {
                id_psicologo: id
            }
        })
        res.status(204).json('Psicologo deletado do banco de dados.')
    },
}

module.exports = psicologosController