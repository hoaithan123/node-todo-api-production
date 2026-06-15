const prisma = require("../config/prisma")

async function getUserByUsername(username) {
    const user = await prisma.users.findUnique({ where: { username: username } }
    )
    return user
}

async function createUser(username, hashedPassword) {
    const newuser = await prisma.users.create({
        data: {
            username: username,
            password: hashedPassword
        }
    })
    return newuser

}
module.exports = { getUserByUsername, createUser }