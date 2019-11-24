const USER = require("../schemas/user");
const BCRYPT = require("bcrypt");
const BCRYPT_CONFIG = require("../../config/bcrypt");
const sanitize = require("mongo-sanitize");
const token = require("../utils/token");

let signup = (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.pseudo){

        res.status(400).json({
            "res": "Missing Info for create User"
        });

    } else {

        let email = sanitize(req.body.email);
        let password = sanitize(req.body.password);
        let pseudo = sanitize(req.body.pseudo);

        BCRYPT.hash(password, BCRYPT_CONFIG.saltRounds).then( hash => {
            let user = {
                email: email,
                password: hash,
                pseudo: pseudo,
                twitch_login: ""
            };
            //Create a Promise if user's email already exist
            let findUser = new Promise((resolve, reject) => {
                USER.findOne({
                    email: user.email
                }, (err, result) => {
                    if (err) {
                        reject(500);
                    } else {
                        if (result) {
                            reject(204)
                        } else {
                            resolve(true)
                        }
                    }
                })
            });

            //Generate a User or throw error
            findUser.then(() => {

                let createUser = new USER(user);
                createUser.save((err, user) => {
                    if (err) {
                        res.status(500).json({
                            "res": "Internal Server Error For Create User"
                        })
                    } else {
                        res.status(200).json({
                            "res": "User Register",
                        })
                    }
                });

            }).catch( err => {

                switch (err) {
                    case 204: {
                        res.status(204).json({
                            "res" : "User already exist"
                        });
                        break;
                    } default: {
                        res.status(500).json({
                            "res": "Internal Server Error In Promise"
                        });
                        break;
                    }
                }
            });
        }).catch( err => {
            res.status(500).json({
                "res": "Internal Server Error Hash password"
            });
        });

    }
};

let signin = (req, res) => {
    if (!req.body.email || !req.body.password){
        res.status(400).json({
            "res": "Bad Request"
        })
    } else {
        let email = sanitize(req.body.email);
        let password = sanitize(req.body.password);
        USER.findOne({
            email: email
        }, (err, user) => {
            if (err) {
                res.status(500).json({
                    "res": "Internal Server Error"
                })
            } else if (!user){
                res.status(401).json({
                    "res": "User doesn't exist"
                })
            } else {
                if (user.authentication(password)){
                    let userToken = {
                        role: user.role,
                        id: user._id
                    };
                    res.status(200).json({
                        "res": "Successful authentication",
                        "token": user.getToken(userToken),
                        "isLogin": true,
                        "isAdmin": user.role === "admin",
                        "userId": user._id,
                        "pseudo": user.pseudo,
                        "avatar": user.avatar,
                        "twitch_login": user.twitch_login
                    })
                } else {
                    res.status(401).json({
                        "res": "Bad Password",
                        "isLogin": false
                    })
                }
            }
        });
    }
};

let authentication = (req, res) => {
    if(!req.body.token){
        res.status(400).json({
            "res": "Bad Request"
        })
    } else {

        let userToken = sanitize(req.body.token);

        token.getApiPermission(userToken).then(apiPerm => {
            if(apiPerm){
                token.getAdminPermission(userToken).then(adminPerm => {
                    let isAdmin = false;
                    if (adminPerm){
                        isAdmin = true;
                    }
                    token.getUserId(userToken)
                        .then(id => {
                            USER.findById(id, "_id avatar", (err, user) => {
                                if (err){
                                    res.status(404).json({
                                        "res": "Id Not Found"
                                    })
                                } else {
                                    res.status(200).json({
                                        "res": "Valid User",
                                        "isLogin": true,
                                        "isAdmin": isAdmin,
                                        "id": user._id,
                                        "avatar": user.avatar
                                    })
                                }
                            })

                    });
                });
            } else {
                res.status(401).json({
                    "res": "You are not authorized"
                })
            }
        })
    }
};


module.exports.signup = signup;
module.exports.signin = signin;
module.exports.authentication = authentication;