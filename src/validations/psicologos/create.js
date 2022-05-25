const { validate, Joi } = require("express-validation");

module.exports = validate({ 
    body: Joi.object({
        nome: Joi.string().required(),
        email: Joi.string().email().required(),
        senha: Joi.string().min(6).max(20).required(),
        apresentacao: Joi.string().required()
    })
});