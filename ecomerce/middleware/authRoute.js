import express from 'express'
import { login } from './authController.js'

export const authRoute = express.Router()

authRoute.route('/login').post(login)