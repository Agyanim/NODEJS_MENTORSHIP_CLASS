import {User} from './userModel.js'


export const createAccountService = async(body) =>{
    const user = new User(body)
    await user.save()
    return user
}

export const usernameExist = async(username) =>{
    const findUser = await User.find({username})
    if(!findUser) {
        return false
    } else {
        return true
    }
}