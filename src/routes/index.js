const express = require("express");

const routes = express.Router();

routes.get("/", (req, res) =>{
    res.end("Bem-vindo ao sistema la vie de acompanhamento psicologico!");
});

module.exports = routes;