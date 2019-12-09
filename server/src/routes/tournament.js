const TOURNAMENT_CONTROLLER = require("../controllers/tournament");
const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();

ROUTER.post("/create", TOURNAMENT_CONTROLLER.createTournamanent);

module.exports = ROUTER;