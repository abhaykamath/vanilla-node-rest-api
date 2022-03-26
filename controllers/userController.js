const UserModel = require('../models/userModel')

async function getUsers(req, res) {
    const users = await UserModel.findAllUsers()
    res.writeHead(200, {"Content-Type": "application/json"})
    res.end(JSON.stringify(users))
}

async function getUser(req, res, id) {
    try {
        const user = await UserModel.findUser(id)
        if(!user) {
            res.writeHead(404, {"Content-Type": "application/json"})
            res.end(JSON.stringify({"message": "User Not Found"}))
        }
        else {
            res.writeHead(200, {"Content-Type": "application/json"})
            res.end(JSON.stringify(user))
        }
    } catch (error) {
        console.log(error)
    }
}

async function createUser(req, res) {
    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async () => {
            const { name, age } = JSON.parse(body)
            const user = {
                name,
                age
            }
            const newUser = await UserModel.create(user)
            res.writeHead(201, {"Content-Type": "application/json"})
            res.end(JSON.stringify(newUser))
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser
}