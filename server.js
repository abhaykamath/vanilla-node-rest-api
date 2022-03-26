const http = require('http')
const UserContoller = require('./controllers/userController')

const server = http.createServer((req, res) => {
    if(req.method === 'GET' && req.url === '/api/users') {
        UserContoller.getUsers(req, res)
    } 
    else if(req.method === 'GET' && req.url.match(/\/api\/users\/\w+/)) {
        const id = req.url.split('/')[3]
        UserContoller.getUser(req, res, id)
    }
    else if(req.method === 'POST' && req.url === '/api/users') {
        UserContoller.createUser(req, res)
    }
    else {
        res.writeHead(404, {"Content-Type": "application/json"})
        res.end(JSON.stringify({"message": "Route Not Found"})) 
    }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, console.log(`Server running on port ${PORT}`))