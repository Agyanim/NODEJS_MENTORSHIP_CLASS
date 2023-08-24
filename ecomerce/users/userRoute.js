import express from 'express'
import { createAccount } from './userController.js'

export const userRouter = express.Router()

userRouter.route('/').post(createAccount)