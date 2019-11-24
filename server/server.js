//Modules
const APP = require("express")();
const SERVER = require("http").Server(APP);
const BODY_PARSER = require("body-parser");
const MONGOOSE = require("./config/mongoose");

//Db conection
MONGOOSE.connect();

//Body Parser
let urlEncoderParser = BODY_PARSER.urlencoded({
    extended: true
});
APP.use(urlEncoderParser);
APP.use(BODY_PARSER.json());

//CORS
APP.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

//Routes
let user = require(__dirname + "/src/routing/user");
APP.use("/user", user);

//Port d"écoute
let port = process.env.PORT || 8000;
SERVER.listen(port, () => console.log("Listening on port" + port));