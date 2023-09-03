import { 
    createAccountService, 
    usernameExist, 
    getAllUsersService, 
    getUserByIdService, 
    deleteUserService, updateUserService } from "./userServices.js";
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

export const getAllUser = async(req, res, next) => {
    const users = await getAllUsersService()
    if (!users) {
        return next(APIError.customeError("unable to retrieve users"))
    }
    res.status(200).json({
        success: true,
        message: "users retrieve successfully",
        users
    })
} 

export const getUserById = async(req, res, next) => {
    const {id} = req.params
    if(!id) {
        return next(APIError.invalidrequest("Please supply the user ID as param"))
    }
    const users = await getUserByIdService(id)
    if (!users) {
        return next(APIError.notFound("User does not exist"))
    }
    res.status(200).json({
        success: true,
        message: "user retrieve successfully",
        users
    })
} 

export const updateUser = async(req, res, next) => {
    const {id} = req.params
    if(!id) {
        return next(APIError.invalidrequest("Please supply the user ID!"))
    }
    const users = await getUserByIdService(id)
    if (!users) {
        return next(APIError.notFound("User does not exist"))
    }
    const updatedUser = await updateUserService(req.body)
    res.status(200).json({
        success: true,
        message: "user updated successfully",
        user: updateUser
    })
} 

export const deleteUser = async(req, res, next) => {
    const {id} = req.params
    if(!id) {
        return next(APIError.invalidrequest("Please supply the user ID as param!"))
    }
    const users = await getUserByIdService(id)
    if (!users) {
        return next(APIError.notFound("User does not exist"))
    }
    const deletedUser = await deleteUserService(id)
    res.status(200).json({
        success: true,
        message: `User with username ${deletedUser.username} deleted successfully`
    })
}