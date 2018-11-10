const expect = require('expect')

const {generateMessage,generateLocationMessage} = require('./message')

const messages = [
    {
        from: 'user1',
        text: 'text from user1'
    }
]

const geoMessages = [
    {
        from: 'user1',
        latitutde: 1,
        longitude: 2
    }
]

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        const message = generateMessage(messages[0].from, messages[0].text)
        expect(message.from).toBe(messages[0].from)
        expect(message.text).toBe(messages[0].text)
        expect(typeof message.createdAt).toBe('number')
    })
})

describe('generateLocationMessage', () => {
    const url = `https://www.google.com/maps?q=${geoMessages[0].latitutde},${geoMessages[0].longitude}`
    
    it('should generate the correct location message object', () => {
        const message = generateLocationMessage(geoMessages[0].from, geoMessages[0].latitutde, geoMessages[0].longitude)
        expect(message.from).toBe(geoMessages[0].from)
        expect(message.url).toBe(url)
        expect(typeof message.createdAt).toBe('number')
    })
})

