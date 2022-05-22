const express = require("express");

const routes = express.Router();

//a lógica lá de baixo, mas aplicando a camada "controller" do padrão de projeto MVC

routes.get("/", (req, res) =>{
    res.end("Bem-vindo ao sistema la vie de acompanhamento psicologico!");
});

// routes.get("/produto/listar-produtos", produtoController.listarProduto);
// routes.post("/produto/cadastrar-produto", produtoController.cadastrarProduto);
// routes.delete("/produto/:codigo/deletar-produto", produtoController.deletarProduto);
// routes.put("/produto/:codigo/atualizar-produto", produtoController.atualizarProduto);

module.exports = routes;