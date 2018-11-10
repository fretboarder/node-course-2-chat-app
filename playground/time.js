const moment = require('moment')


const date = moment()
date.add(1, 'year')
console.log(date.format('MMM Do, YYYY HH:MM:SS'))