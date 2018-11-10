const expect = require('expect')

const {Users} = require('./users')

describe('Users', () => {
    let users
    
    beforeEach(() => {
        users = new Users()
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course' 
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }]
    })

    it('should add new user', () => {
        let users = new Users()
        const user = {
            id: '123',
            name: 'Andy',
            room: 'The Office Fans'
        }
        var resUser = users.addUser(user.id, user.name, user.room)
        expect(users.users).toEqual([user])
    })

    it('should remove one user', () => {
        let resUser = users.removeUser('1')
        expect(users.users.length).toBe(2)
    })

    it('should not remove one user', () => {
        let resUser = users.removeUser('12')
        expect(users.users.length).toBe(3)
    })

    it('should find user', () => {
        let resUser = users.getUser('1')
        expect(resUser).toEqual(users.users[0])
    })

    it('should not find user', () => {
        let resUser = users.getUser('12')
        expect(resUser).toBeFalsy()
    })

    it('should return users of same room', () => {
        let resUsers = users.getUserList('React Course')
        expect(resUsers).toEqual(['Jen'])
        resUsers = users.getUserList('Node Course')
        expect(resUsers).toEqual(['Mike', 'Julie'])
    })

})