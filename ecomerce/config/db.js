import {connect} from 'mongoose'


export const connectDB = async(url)=>{
    await connect(url)
    console.log('connection to Database successful!')
}