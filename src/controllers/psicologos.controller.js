const { Psicologo } = require('../model');
const bcrypt = require("bcryptjs");

const psicologosController = {
    async cadastrarPsicologo(req, res) {
        const { nome, email, senha, apresentacao } = req.body
        //console.log(`${nome} e ${senha} e ${email} e ${apresentacao}`);
        const existsUser = await Psicologo.count({ where: {email: email} });
        if (existsUser == 1) {
            return res.status(400).json("Email já existe");
        }
        const newSenha = bcrypt.hashSync(senha, 10)
        const newPsico = await Psicologo.create({
            nome,
            email,
            senha: newSenha,
            apresentacao
        })
        res.status(201).json(newPsico)
    },
    async listarPsico(req, res) {
        const psicologos = await Psicologo.findAll()
        res.json(psicologos)
    },
    async listarId(req, res) {
        const { id_psicologo } = req.params
        const psicologo = await Psicologo.findByPk(id_psicologo)
        res.json(psicologo)
    },
    async atualizarPsico(req, res) {
        const { id_psicologo } = req.params
        const { nome, senha, email, apresentacao } = req.body
        console.log(id_psicologo);
        //const newSenha = bcrypt.hashSync(req.body.senha, 10)
        const psicologo = await Psicologo.findByPk(id_psicologo)
        if (!psicologo) return res.status(400).json('Id não encontrado.')

        const newSenha = bcrypt.hashSync(senha, 10)
        const psicoAtualizado = await Psicologo.update(
            {
                nome,
                email,
                senha: newSenha,
                apresentacao
            },
            {
                where: {
                    id_psicologo: id_psicologo
                }
            }
        )
        const psico = await Psicologo.findByPk(id_psicologo)
        res.status(200).json(psico)
    },
    async deletarPsico(req, res) {
        const { id_psicologo } = req.params
        
        const psicologo = await Psicologo.findByPk(id_psicologo)
        if (!psicologo) return res.status(400).json('Id não encontrado.')
        await Psicologo.destroy({
            where: {
                id_psicologo: id_psicologo
            }
        })
        //204 é no content - meio doido não ter um feedback de exclusão, mas tudo bem
        res.status(204).send("excluido");
    },
}

module.exports = psicologosController