const db = require("./db");
const auth = require("./auth");

async function home(req, reply) {
    return reply.send({"message": "Hello World"});
}

async function admin(req, reply) {
    const user = auth.decodeToken(req.cookies["session"]);

    if (!user) {
        return reply.code(401).send({"message": "Unauthorized"});
    }

    if (!user.isAdmin) {
        return reply.code(401).send({"message": "Unauthorized"});
    }

    return reply.code(200).send({"message": `Hello ${user.name}, you are the admin!`});
}

async function profile(req, reply) {
    const user = auth.decodeToken(req.cookies["session"]);

    if (!user) {
        return reply.code(401).send({"message": "Unauthorized"});
    }

    const address = db.findUserAddress(user.username);

    return reply.code(200).send(
        {
            "message": `Hello ${user.name}`,
            "address": {
                "street": address.street,
                "number": address.number,
                "city": address.city
            }
        }
    );
}

async function logout(req, reply) {
    reply.clearCookie("session", {httpOnly: true});
    return reply.code(200).send({"message": "loggged out"});
}

async function login(req, reply) {
    const {username, password} = req.body;

    console.debug(`got username: ${username}`);

    try {
        // Find User
        const user = db.findUserByUsername(username);

        // Compare passwords
        if (!await auth.comparePassword(password, user.hashedPassword)) {
            console.debug("passwords did not match");
            return reply.code(404).send({"message": "user not found"});
        }

        // Generate token
        const token = await auth.generateToken(user);

        // Set cookie
        reply.setCookie("session", token, {httpOnly: true});

        // OK
        return reply.send({
            name: user.name,
            username: user.username,
            token: token,
            isAdmin: user.isAdmin
        });
    } catch (e) {
        // User not found
        console.debug("user not found");
        return reply.code(404).send({"message": "user not found"});
    }
}

module.exports = {
    home, login, logout, profile, admin
};
