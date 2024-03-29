const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
    },
    password: {
        type: String,
        minlength: 4,
        required: true,
    },
    favouriteGenre: {
        type: String,
        required: true,
        minlength: 4,
    },
})

module.exports = mongoose.model('User', schema)
