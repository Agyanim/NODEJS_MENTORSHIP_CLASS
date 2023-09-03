import { Schema, model } from "mongoose";


const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {timestamps: true})

export const Product = model('product', productSchema)