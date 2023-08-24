import { Schema, model } from "mongoose";


const orderSchema = new Schema({
    buyerId: {
        type: Schema.Types.ObjectId,
        ref: 'Buyer'
    }
})