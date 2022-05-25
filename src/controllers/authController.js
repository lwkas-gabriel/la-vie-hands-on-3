const Psicologo = require("../model/Psicologo");
const jwt = require("jsonwebtoken");
const secret = require("../configs/secret");
const bcrypt = require("bcryptjs");

const AuthController = {

    async login(req, res){
        const { email, senha } = req.body;
        
        //console.log(`${email} e ${senha}`);
        const user = await Psicologo.findOne({
            where: {
                email: email
            }
        });

        if(!user){
            return res.status(400).json("Email não cadastrado");
        }

        if(!bcrypt.compareSync(senha, user.senha)){
            //codigo de erro - não autorizado
            return res.status(401).json("Senha inválida!");
        }

        const token = jwt.sign(
            {
            id: user.id_psicologo, 
            email: user.email,
            nome: user.nome
            },
            secret.key);
            
        return res.json(token);
    }

};

module.exports = AuthController;