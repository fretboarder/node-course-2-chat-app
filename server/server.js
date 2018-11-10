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
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    })
    
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: `New user joined`,
        createdAt: new Date().getTime()
    })
  
    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
        
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
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

