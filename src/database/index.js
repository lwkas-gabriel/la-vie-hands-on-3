const Sequelize = require("sequelize");

//dados do banco
const DB_NAME = "lavie";
const DB_USER = "root";
const DB_PASS = "root";
const DB_CONFIG = {
    dialect: "mysql",
    host: "localhost",
    port: 3306
};

//objeto para guardar a conexão com o banco de dados!!
let db = {};

try{
    db = new Sequelize(DB_NAME, DB_USER, DB_PASS, DB_CONFIG);
}catch (error){
    console.error("erro ao tentar conectar no bando de dados!!");
}

async function hasConnection(){
    try {
        await db.authenticate();
        console.log("Banco de dados conectado!");
    } catch (error) {
        console.error("Trate o erro");
    }
}

Object.assign(db, {
    hasConnection,
});

module.exports = db;