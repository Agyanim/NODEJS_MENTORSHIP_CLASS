import { 
    createProductService, 
    getAllProductsService, 
    getProductByIdService, 
    getProductByImgUrlService,
    getProductByNameService,
    getProductByPriceService,
    deleteProductService, updateProductService } from "./productServices.js";
import { getUserByIdService } from "../users/userServices.js";
import APIError from '../middleware/apiError.js'

export const createProduct = async(req, res, next) =>{
    try {
        const {productName, price, description, sellerId} = req.body
        if(!productName || !price || !description || !sellerId) {
            return next(APIError.invalidrequest("All fields are required!"))
        }
        const findUser = await getUserByIdService(sellerId)
        console.log(findUser)
        if (!findUser){
            return next(APIError.invalidrequest("invalid UserId"))
        }
        const newProduct = await createProductService(req.body)
        res.status(201).json({
            success: true,
            message: `Product with name: ${newProduct.productName} created successfully`
        })
    } catch (error) {
        return next(error)
    }
}

export const getAllProduct = async(req, res, next) => {
    const products = await getAllProductsService()
    if (!products) {
        return next(APIError.customeError("unable to retrieve products"))
    }
    res.status(200).json({
        success: true,
        message: "products retrieve successfully",
        products
    })
} 

export const getProductById = async(req, res, next) => {
    const {id} = req.params
    if(!id) {
        return next(APIError.invalidrequest("Please supply the product ID as param"))
    }
    const products = await getUserByIdService(id)
    if (!products) {
        return next(APIError.notFound("Product does not exist"))
    }
    res.status(200).json({
        success: true,
        message: "product retrieve successfully",
        products
    })
} 

export const getProductByImageUrl = async(req, res, next) => {
    const {url} = req.params
    if(!id) {
        return next(APIError.invalidrequest("Please supply the product url as param"))
    }
    const products = await getProductByImgUrlService(url)
    if (!products) {
        return next(APIError.notFound("Product does not exist"))
    }
    res.status(200).json({
        success: true,
        message: "product retrieve successfully",
        products
    })
} 

export const getProductByPrice = async(req, res, next) => {
    const {price} = req.params
    if(!id) {
        return next(APIError.invalidrequest("Please supply the product price as param"))
    }
    const products = await getProductByPriceService(price)
    if (!products) {
        return next(APIError.notFound("Product does not exist"))
    }
    res.status(200).json({
        success: true,
        message: "product retrieve successfully",
        products
    })
} 

export const getProductByName = async(req, res, next) => {
    const {name} = req.params
    if(!name) {
        return next(APIError.invalidrequest("Please supply the product price as param"))
    }
    const products = await getProductByNameService(name)
    if (!products) {
        return next(APIError.notFound("Product does not exist"))
    }
    res.status(200).json({
        success: true,
        message: "product retrieve successfully",
        products
    })
} 

export const updateProduct = async(req, res, next) => {
    const {id} = req.params
    if(!id) {
        return next(APIError.invalidrequest("Please supply the product ID as params!"))
    }
    const product = await getProductByIdService(id)
    if (!product) {
        return next(APIError.notFound("Product does not exist"))
    }
    const updatedProduct = await updateProductService(req.body)
    res.status(200).json({
        success: true,
        message: "product updated successfully",
        user: updatedProduct
    })
} 

export const deleteProduct = async(req, res, next) => {
    const {id, sellerId} = req.params
    if(!id || !sellerId) {
        return next(APIError.invalidrequest("Please supply the product ID and seller ID as param!"))
    }
    const product = await getProductByIdService(id)
    if (!users) {
        return next(APIError.notFound("Product does not exist"))
    }
    const deletedProduct = await deleteProductService(id, sellerId)
    res.status(200).json({
        success: true,
        message: `User with username ${deletedProduct.name} deleted successfully`
    })
}