import express from 'express'
import { isLoggedIn, isSeller, isAdmin } from '../middleware/authController.js'
import { getProduct } from './productController.js'

export const productRoute = express.Router()

productRoute.route('/').get(isLoggedIn, isSeller, getProduct)