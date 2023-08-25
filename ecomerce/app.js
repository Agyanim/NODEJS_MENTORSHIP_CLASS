import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import {connectDB} from './config/db.js'
import {userRouter} from './users/userRoute.js'
import { errorHandler } from './middleware/errorHandler.js'
import { authRoute } from './middleware/authRoute.js'
import { productRoute } from './products/productRoute.js'

dotenv.config()

const PORT = process.env.PORT
const DB_URL = process.env.MONGODB_URL

const app = express()
app.use(express.json())
app.use(cookieParser())


app.get('/', (req, res)=>{
    res.status(200).json({
        success: true,
        message: "Welcome to our Ecommerce API!"
    })
})

app.use('/users', userRouter)
app.use('/auth', authRoute)
app.use('/product', productRoute)
app.use(errorHandler)

app.listen(PORT, async()=>{
    await connectDB(DB_URL)
    console.log(`Server is running on http://localhost:${PORT}...`)
})
