const USER_CONTROLLER = require("../controllers/user");
const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();

ROUTER.post("/signup", USER_CONTROLLER.signup);
ROUTER.post("/signin", USER_CONTROLLER.signin);
ROUTER.post("/authentication", USER_CONTROLLER.authentication);

module.exports = ROUTER;