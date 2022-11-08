const mongoose = require('mongoose')
const Person = require('./models/person')
const User = require('./models/user')
const { MONGO_URL } = require('../utils/config')

if (MONGO_URL && !mongoose.connection.readyState) {
    console.log('connecting to mongo db @ ', MONGO_URL)
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = {
    Person,
    User,
}
