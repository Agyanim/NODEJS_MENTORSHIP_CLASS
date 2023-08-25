import { User } from "../users/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

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
    const accessToken = jwt.sign(payload, JWT_SECRET, {expiresIn: '1m'})
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