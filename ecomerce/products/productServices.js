import {Product} from './productModel.js'


export const createProductService = async(body) =>{
    const product = new Product(body)
    await product.save()
    return product
}

export const getProductByNameService= async(name) => {
    const findProduct = await Product.find({name})
    return findProduct
}
export const getProductByPriceService= async(price) => {
    const findProduct = await Product.findOne({price})
    return findProduct
}

export const getProductByImgUrlService= async(url) => {
    const findProduct = await Product.find({url})
    return findProduct
}

export const getProductByIdService = async(id) => {
    const user = await Product.findById(id)
    return user
}

export const getAllProductsService = async() => {
    const products = await Product.find()
    return products
}

export const updateProductService = async(body) => {
    const product = await Product.findOneAndUpdate(body)
    return product
}

export const deleteProductService = async(id, sellerId) => {
    const product = await Product.findByIdAndDelete(id, sellerId)
    return product
}