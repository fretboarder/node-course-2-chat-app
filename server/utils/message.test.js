const expect = require('expect')

const {generateMessage} = require('./message')

const messages = [
    {
        from: 'user1',
        text: 'text from user1'
    }
]

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        const message = generateMessage(messages[0].from, messages[0].text)
        expect(message.from).toBe(messages[0].from)
        expect(message.text).toBe(messages[0].text)
        expect(message).toMatchObject(messages[0])
    })
})

