import express from 'express'
import { createAccount, getAllUser, getUserById, deleteUser, updateUser } from './userController.js'

export const userRouter = express.Router()

userRouter.route('/').post(createAccount).get(getAllUser)
userRouter.route('/:id').put(updateUser).delete(deleteUser).get(getUserById)