import { json } from 'express'
import {User} from './userModel.js'
import bycryptjs from 'bcryptjs'


export const createAccountService = async(body) =>{
    const user = new User(body)
    const salt = bycryptjs.genSaltSync(10)
    const hashedPassword = bycryptjs.hashSync(body.password, salt)
    user.password = hashedPassword
    await user.save()
    return user
}

export const usernameExist = async(username) =>{
    const findUser = await User.findOne({username})
    if(!findUser || !findUser.username) {
        return false
    } else {
        return true
    }
}

export const getUserByUsername = async(username) => {
    const findUser = await User.findOne({username})
    return findUser
}