const JWT = require("jsonwebtoken");
const JWT_CONFIG = require("../../config/jwt");

let decode = (token) => {
    return new Promise((resolve, reject) => {
        JWT.verify(token, JWT_CONFIG.private_key, (err, decoded) => {
            if (decoded === undefined){
                reject(false);
            } else {
                resolve(decoded);
            }
        });
    });
}

let getApiPermission = (token) => {
    return decode(token)
        .then(decoded => decoded.role === "player" || decoded.role === "admin")
        .catch(err => false);
};

let getUserAdminPermission = (token) => {
    return decode(token)
        .then(decoded => decoded.role === "admin")
        .catch(err => false);
};

let getUserId = (token) => {
    return decode(token)
        .then(decoded => decoded.id)
};

exports.getAdminPermission = getUserAdminPermission;
exports.getApiPermission = getApiPermission;
exports.getUserId = getUserId;