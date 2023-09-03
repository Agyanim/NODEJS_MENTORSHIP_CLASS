import { 
    loginService, 
    validatePassword, 
    isLoggedInService, 
    isAdminService, 
    isBuyerService, 
    isSellerService, refreshTokenService, verifyToken } from "./authServices.js"
import { 
    usernameExist, 
    getUserByUsername, 
    getUserByIdService, 
    getAllUsersService, 
    deleteUserService, updateUserService} from "../users/userServices.js"
import APIError from './apiError.js'

export const login = async(req, res, next) => {
    const {username, password} = req.body
    const userExist = await usernameExist(username)
    if (!userExist) {
        return next(APIError.notFound(`User with username ${username} does not exits!`))
    }
    const user = await getUserByUsername(username)
    const validPassword = await validatePassword(password, user.password)
    if (!validPassword) {
        return next(APIError.unAuthenticated("Invalid login credential!"))
    }
    const accessToken = await loginService(username, password, user.role)
    res.cookie('access_token', accessToken)
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token: accessToken
    })
}

export const isLoggedIn = async(req, res, next) => {
    const access_token = req.cookies.access_token
    if (!access_token) {
        return next(APIError.invalidrequest("No acces token!"))
    }
  
    const loggedInUser = await isLoggedInService(access_token)
    if (!loggedInUser) {
        return next(APIError.unAuthorized("You need to login first!"))
    }
    req.username = loggedInUser.username
    req.role = loggedInUser.role
    next()
}

export const isAdmin = async(req, res, next) => {
    const role = req.role
    const isAdmin = await isAdminService(role)
    if (!isAdmin) {
        return next(APIError.unAuthorized("Only admin can acces this route!"))
    }
    next()
}

export const isSeller = async(req, res, next) => {
    const role = req.role
    const isSeller = await isSellerService(role)
    const isAdmin = await isAdminService(role)
    if (!isSeller && !isAdmin) {
        return next(APIError.unAuthorized("Only sellers can acces this route!"))
    }
    next()
}

export const isBuyer = async(req, res, next) => {
    const role = req.role
    const isBuyer = await isBuyerService(role)
    const isAdmin = await isAdminService(role)
    if (!isBuyer && !isAdmin) {
        return next(APIError.unAuthorized("Only buyers can acces this route!"))
    }
    next()
}

export const getUserById = async(req, res, next) => {
    const {id} = req.param
    if (!id) {
        return next(APIError.invalidrequest("please supply the user ID as param"))
    }
    const user = await getUserByIdService(id)
    if (!user) {
        return next(APIError.notFound(`user with id ${id} not found`))
    }
    res.status(200).json({
        success: true,
        message: "user retrieved successfully",
        user: user
    })
}

export const getAllUser = async(req, res, next) => {
    const users = await getAllUsersService()
    if (!users) {
        return next(APIError.customeError())
    }
    res.status(200).json({
        success: true,
        message: "User accounts retrieved successfully",
        users: users
    })
}

export const refreshToken = async(req, res, next) => {
    const username = req.username
    if (!username) {
        return next(APIError.unAuthenticated("No valid user"))
    }
    const user = await getUserByUsername(username)
    const validToken = await verifyToken(user.refreshToken)
    if (!validToken) {
        return next(APIError.unAuthenticated("invalid token!"))
    }
    const accessToken = refreshTokenService(req.username, req.role)
    req.cookies.access_token = accessToken
    res.status(200).json({
        success: true,
        message: "Token refreshed successfully"
    })
}