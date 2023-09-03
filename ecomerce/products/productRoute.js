import express from 'express'
import { isLoggedIn, isSeller, isAdmin } from '../middleware/authController.js'
import { getAllProduct, createProduct, getProductById, updateProduct, deleteProduct, getProductByName, getProductByImageUrl } from './productController.js'

export const productRoute = express.Router()

productRoute.route('/').get(isLoggedIn, isAdmin, getAllProduct).post(isLoggedIn, isSeller, createProduct)
productRoute.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct)
productRoute.route('/:name').get(getProductByName)
productRoute.route('/:url').get(getProductByImageUrl)