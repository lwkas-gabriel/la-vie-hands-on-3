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
        const { nome, email, apresentacao } = req.body
        console.log(id_psicologo);
        //const newSenha = bcrypt.hashSync(req.body.senha, 10)
        if (!id_psicologo) return res.status(400).json('Id não encontrado.')
        const psicoAtualizado = await Psicologo.update(
            {
                nome,
                email,
                //senha: newSenha,
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
        if (!id_psicologo) return res.status(404).json('Id não encontrado.')
        await Psicologos.destroy({
            where: {
                id_psicologo: id_psicologo
            }
        })
        res.status(204).json('Psicologo deletado do banco de dados.')
    },
}

module.exports = psicologosController