const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

console.log(publicPath)


const app = express()
const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', (socket) => {
    console.log('new client connected')
    
    socket.emit('newMessage', {
        from: 'mike@example.com',
        text: 'hey you putz',
        createdAt: 12345
    })
    
    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
    })

    socket.on('disconnect', (socket) => {
        console.log('client disconnected')
    })
})




app.use(express.static(publicPath))
//app.use(bodyParser.json())

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

