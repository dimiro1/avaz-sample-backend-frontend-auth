const bcrypt = require("bcrypt");
const secrets = require("./secrets");
const {createSigner, createDecoder} = require('fast-jwt')

const jwtSigner = createSigner({key: secrets.JWT_SECRET});
const jwtDecoder = createDecoder();

async function comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword)
}

async function generateToken(user) {
    return jwtSigner({
        name: user.name,
        username: user.username,
        isAdmin: user.isAdmin,
    })
}

function decodeToken(token) {
    try {
        return jwtDecoder(token);
    } catch (e) {
        return undefined;
    }
}

module.exports = {
    comparePassword, generateToken, decodeToken
}
