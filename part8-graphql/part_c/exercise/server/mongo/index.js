const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const { MONGO_URL } = require('../util/config')

if (MONGO_URL && !mongoose.connection.readyState) {
    console.log('connecting to mongo db @ ', MONGO_URL)
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = {
    Author,
    Book,
}
