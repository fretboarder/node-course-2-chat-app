const socket = io()

socket.on('connect', () => {
    console.log('connected to server')
})

socket.on('disconnect', () => {
    console.log('disconnected from server')
})

socket.on('newMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('HH:MM:SS')
    let li = $('<li></li>')
    li.text(`${formattedTime} - ${message.from}: ${message.text}`)
    $('#messages').append(li)
})

socket.on('newLocationMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('HH:MM:SS')
    let li = $('<li></li>')
    let a = $('<a target="_blank">My current location</a>')
    
    li.text(`${formattedTime} - ${message.from}: `)
    a.attr('href', message.url)
    li.append(a) 
    $('#messages').append(li)
})

$('#message-form').on('submit', (e) => {
    e.preventDefault()

    let messageTextBox = $('[name=message]')
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, () => {
        messageTextBox.val('')
    })
})

const locationButton = $('#send-location')
locationButton.on('click', (e) => {
    if (!navigator.geolocation) {
        return alert('GeoLocation API not available')
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...')
    navigator.geolocation.getCurrentPosition((pos) => {
        locationButton.removeAttr('disabled').text('Send Location')
        socket.emit('createLocationMessage', {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        })
    }, () => {
        locationButton.removeAttr('disabled').text('Send Location')
        alert('Unable to fetch location')
    })
})