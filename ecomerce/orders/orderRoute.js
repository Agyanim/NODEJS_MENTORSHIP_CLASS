import express from 'express'
import { isLoggedIn, isBuyer } from '../middleware/authController.js'
import { isAdmin } from '../middleware/authServices.js'
// import { getProduct } from './productController.js'

export const productRoute = express.Router()

productRoute.route('/').get(isLoggedIn, isBuyer || isAdmin)