const fastify = require('fastify')({logger: true});
const handlers = require("./handlers");
const secrets = require("./secrets");

async function main() {
    fastify.register(require('fastify-cookie'), {
        secret: secrets.COOKIE_SECRET,
    });

    fastify.register(require('fastify-cors'), {
        origin: ["http://localhost:3000", "http://localhost:5000"],
        credentials: true
    });

    // register handlers
    fastify.get("/", handlers.home);

    fastify.post("/login", handlers.login);
    fastify.post("/logout", handlers.logout);

    fastify.get("/profile", handlers.profile);
    fastify.get("/admin", handlers.admin);

    // start server
    await fastify.listen(process.env["PORT"] || 5000);
}

main().catch((err) => {
    if (err) throw err;
});
