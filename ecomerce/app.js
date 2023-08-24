import express from 'express'
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'
import {userRouter} from './users/userRoute.js'

dotenv.config()

const PORT = process.env.PORT
const DB_URL = process.env.MONGODB_URL

const app = express()
app.use(express.json())

app.get('/', (req, res)=>{
    res.status(200).json({
        success: true,
        message: "Welcome to our Ecommerce API!"
    })
})
app.use('/user', userRouter)

app.listen(PORT, async()=>{
    await connectDB(DB_URL)
    console.log(`Server is running on http://localhost:${PORT}...`)
})
