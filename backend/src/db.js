function findUserByUsername(username) {
    switch (username) {
        case "admin":
            return {
                username: "admin",
                name: "Alcione",
                hashedPassword: "$2b$10$70gMmPXoI5IQubfbDeFJYuaUqlq0vDKjT1ImM8avOnUYGj9L9zlJm", // 123456
                isAdmin: true
            }
        case "peter":
            return {
                username: "peter",
                name: "Peter",
                hashedPassword: "$2b$10$12znFL.fgBaTm/Oa8r2kTOQ.hm508rJFMOl7786h/hd6TbSbbh2ai",// 67890
                isAdmin: false
            }
        default:
            throw new Error("user not found");
    }
}

function findUserAddress(username) {
    switch (username) {
        case "admin":
            return {
                street: "Rua das flores",
                number: 33,
                city: "São Paulo"
            }
        case "peter":
            return {
                street: "Street A",
                number: 78,
                city: "New York"
            }
        default:
            return {
                street: "",
                number: 0,
                city: ""
            }
    }
}


module.exports = {
    findUserByUsername, findUserAddress
}
