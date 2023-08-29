import mongoose from "mongoose";
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/usermodel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async ()=>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createUser = await User.insertMany(users)

        const adminUser = createUser[0]._id
        const sampleProducts = products.map((product)=>{
            return {...product,user:adminUser}
        })
        await Product.insertMany(sampleProducts)

        console.log('Data imported'.green.inverse)
    } catch (error) {
        console.log(`${error}`.red.inverse)
    }
}

const destroyData = async ()=>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data destroyed'.red.inverse)
    }
    catch(err){
        console.error(`${err}`.red.inverse)
    }
}

if(process.argv[2]==='-d'){
    destroyData()
}
else{
    importData()
}