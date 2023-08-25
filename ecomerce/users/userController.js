import { createAccountService, usernameExist } from "./userServices.js";
import APIError from '../middleware/apiError.js'

export const createAccount = async(req, res, next) =>{
    try {
        const {username, password} = req.body
        if(!username || !password) {
            return next(APIError.invalidrequest("Username and password is required!"))
        }
        const findUser = await usernameExist(username)
        if (findUser){
            return next(APIError.invalidrequest("username already exist!"))
        }
        const newUser = await createAccountService(req.body)
        res.status(201).json({
            success: true,
            message: `Account with username: ${newUser.username} created successfully`
        })
    } catch (error) {
        return next(error)
    }
}