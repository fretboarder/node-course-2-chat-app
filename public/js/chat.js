const socket = io()

const scrollToBottom = () => {
    const messages = $('#messages')
    const newMessage = messages.children('li:last-child')

    const clientHeight = messages.prop('clientHeight')
    const scrollTop = messages.prop('scrollTop')
    const scrollHeight = messages.prop('scrollHeight')
    const newMessageHeight = newMessage.innerHeight()
    const lastMessageHeight = newMessage.prev().innerHeight()

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight>= scrollHeight) {
        messages.scrollTop(scrollHeight)
    }
}


socket.on('connect', () => {
    const param = jQuery.deparam(window.location.search)
    socket.emit('join', param, (err) => {
        if (err) {
            alert(err)
            window.location.href = '/'
        } else {
            console.log('joined.')
        }
    })
    console.log('connected to server')
})

socket.on('disconnect', () => {
    console.log('disconnected from server')
})


socket.on('updateUserList', (userNames) => {
    var ol = $('<ol></ol>')

    userNames.forEach((name) => {
        ol.append($('<li></li>').text(name))
    })

    $('#users').html(ol)
})


socket.on('newMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('HH:MM:SS')
    let template = $('#message-template').html()
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    })
    $('#messages').append(html)
    scrollToBottom()
})

socket.on('newLocationMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('HH:MM:SS')
    let template = $('#location-message-template').html()
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    })
    $('#messages').append(html)
    scrollToBottom()
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