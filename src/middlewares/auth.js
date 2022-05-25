const { expressjwt: jwt } = require("express-jwt");
//const expressJWT = require("express-jwt");
const secret = require("../configs/secret");

module.exports = jwt({
    secret: secret.key,
    algorithms: ["HS256"], 
});