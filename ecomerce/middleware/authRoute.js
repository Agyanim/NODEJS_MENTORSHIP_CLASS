import express from 'express'
import { login, refreshToken, isLoggedIn } from './authController.js'

export const authRoute = express.Router()

authRoute.route('/login').post(login)
authRoute.route('/refreshtoken').get(isLoggedIn,refreshToken)