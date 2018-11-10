const socket = io()

socket.on('connect', () => {
    console.log('connected to server')

    socket.emit('createMessage', {
        from: 'jen@example.com',
        text: 'hey you putz!'
    })

})

socket.on('disconnect', () => {
    console.log('disconnected from server')
})

socket.on('newMessage', (message) => {
    console.log('Got new message', message)
})