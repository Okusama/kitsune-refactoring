const TOURNAMENT  = require("../schemas/tournament");
const sanitize = require("mongo-sanitize");
const token = require("../utils/token");
const uuidv4 = require("uuid/v4");
const CLIENT = require("../../config/challonge");

const createTournament = (req, res) => {
    if (!req.body.token){
        res.status(401).json({
            "res": "You must be connected"
        })
    } else {
        token.getAdminPermission(req.body.token).then(decoded => {
            if (decoded){
                if (!req.body.name || !req.body.start_at){
                    res.status(400).json({
                        "res": "Bad Request Missing Info"
                    })
                } else {
                    let url = "kitsune" + uuidv4();
                    let name = sanitize(req.body.name);
                    let startAt = sanitize(req.body.start_at);
                    CLIENT.tournaments.create({
                        tournament: {
                            name: name,
                            url: url,
                        },
                        callback: (err, data) => {
                            if (err) {
                                res.status(500).json({
                                    "res": "Generation Failed"
                                });
                            } else {
                                let tournament = {
                                    name: name,
                                    start_at: startAt,
                                    state: "open",
                                    bracket_url: url
                                };
                                let createTournament = new TOURNAMENT(tournament);
                                createTournament.save((err, tournament) => {
                                    if (err) {
                                        res.status(500).json({
                                            "res": "Internal Server Error For Create Tournament"
                                        })
                                    } else {
                                        res.status(200).json({
                                            "res": "Tournament created"
                                        })
                                    }
                                })
                            }
                        }
                    });
                }
            } else {
                res.status(401).json({
                    "res": "You are not authorized"
                })
            }
        });

    }
};

exports.createTournamanent = createTournament;