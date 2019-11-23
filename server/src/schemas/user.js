const MONGOOSE = require("mongoose");
const BCRYPT = require("bcrypt");
const JWT = require("jsonwebtoken");
const JWT_CONFIG = require("../../config/jwt");

let user = MONGOOSE.Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    twitch_login:{
        type: String
    },
    pseudo: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "visitor"
    },
    avatar: {
        type: String,
        default: ""
    }
}, {
    timestamp: {
        createdAt: "created_at"
    }
});

user.methods = {
    authentication: (password) => {
        return BCRYPT.compare(password, this.password)
            .then(res => this.isVisitor() ? false : res)
            .catch(err => err);
    },
    getToken: () => {

        let user = {
            id: this._id,
            twitch_login: this.twitch_login,
            pseudo: this.pseudo,
            role: this.role,
            avatar: this.avatar
        };

        return JWT.sign(user, JWT_CONFIG.private_key);
    },
    isAdmin: () => {
        return this.role === "admin";
    },
    isPlayer: () => {
        return this.role === "player";
    },
    isVisitor: () => {
        return this.role === "visitor";
    }
};

module.exports = MONGOOSE.model("User", user);