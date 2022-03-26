const users = require('../data/users.json')
const { v4: uuidv4} = require('uuid')
const { writeDataToFile} = require('../utils')

function findAllUsers() {
    return new Promise((resolve, reject) => {
        resolve(users)
    })
}

function findUser(id) {
    const user = users.find((u) => u.id === id)
    return new Promise((resolve, reject) => {
        resolve(user)
    })
}

function create(user) {
    return new Promise((resolve, reject) => {
        const newUser = {id: uuidv4(),...user}
        users.push(newUser)
        writeDataToFile('./data/users.json', users)
        resolve(newUser)
    })
}

module.exports = {
    findAllUsers,
    findUser,
    create
}