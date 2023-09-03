import { User } from "../users/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'
import APIError from "./apiError.js";
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET

export const validatePassword = async(password, hashedpassword) => {
    const validPassword = bcryptjs.compareSync(password, hashedpassword)
    if (validPassword) {
        return true
    } else {
        return false
    }
}
export const loginService = async(username, password, role) => {
    const payload = {
        username,
        password,
        role
    }
    const accessToken = jwt.sign(payload, JWT_SECRET, {expiresIn: '30m'})
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, {expiresIn: '1d'})
    const user = await User.findOne({username})
    user.refreshToken = refreshToken
    user.save()
    return accessToken
}

export const verifyToken = async(token) => {
    try {
    jwt.verify(token, REFRESH_SECRET)
        return true
    } catch (error) {
        return false
    }
}
export const refreshTokenService = (username, role) => {
    const payload = {
        username,
        role
    }
    const accessToken = jwt.sign(payload, JWT_SECRET, {expiresIn: '30m'})
    return accessToken
}

export const isLoggedInService = async(accessToken) => {
   try {
    const loggedInUser = jwt.verify(accessToken, JWT_SECRET)
    return loggedInUser
   } catch (error) {
    return false
   }

} 

export const isAdminService = async(role) => {
    if (role !== 'admin') {
        return false
    } else {
        return true
    }
}

export const isSellerService = async(role) => {
    if (role !== 'seller') {
        return false
    } else {
        return true
    }
}

export const isBuyerService = async(role) => {
    if (role !== 'buyer') {
        return false
    } else {
        return true
    }
}