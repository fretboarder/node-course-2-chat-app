const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

console.log(publicPath)


const app = express()
const server = http.createServer(app)
const io = socketIO(server)
app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('new client connected')
    
    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'))
    socket.broadcast.emit('newMessage', generateMessage('Admin', `New user joined`))
  
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message)
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback('This is from the server')
    })

    socket.on('disconnect', (socket) => {
        console.log('client disconnected')
    })
})


//app.use(bodyParser.json())

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

