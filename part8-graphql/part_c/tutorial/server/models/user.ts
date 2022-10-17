import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Person',
        },
    ],
})

export const User = mongoose.model('User', schema)
