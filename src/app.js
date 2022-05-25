const express = require("express"); //importando express
const routes = require("./routes"); //importando o routes
const handleError = require("./middlewares/handleError");
const db = require("./database"); // importando o banco de dados

const app = express();

db.hasConnection();

app.use(express.json());

app.use(routes);

app.use(handleError);

app.listen(3000, ()=> console.log("Servidor rodando na porta 3000!"));