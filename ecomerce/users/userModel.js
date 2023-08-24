import {Schema, model} from 'mongoose'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'seller', 'buyer'],
        required: true,
        default: 'buyer'
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true})

export const User = model('user', userSchema)