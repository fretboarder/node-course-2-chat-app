const _ = require('lodash')

class Users {
    constructor() {
        this.users = []
    }

    addUser(id, name, room) {
        const user = {id,name,room}
        this.users.push(user)
        return user
    }

    removeUser(id) {
        const removed = this.getUser(id)
        if (removed)
            this.users = this.users.filter((user) => user.id !== id)
        return removed
    }

    getUser (id) {
        return _.find(this.users, (user) => user.id === id)
    }

    getUserList(room) {
        const users = this.users.filter((user) => user.room === room)
        return users.map((user) => user.name)
    }
}


module.exports = {
    Users
}