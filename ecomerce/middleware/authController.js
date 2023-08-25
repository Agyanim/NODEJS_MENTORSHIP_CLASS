import { loginService, validatePassword, isLoggedInService } from "./authServices.js"
import { usernameExist, getUserByUsername} from "../users/userServices.js"
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
    res.cookie('access_token', accessToken, {
        httpOnly: true
    })
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
    res.status(200).json("User already logged in")
}