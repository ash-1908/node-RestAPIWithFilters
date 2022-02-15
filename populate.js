// // imports
// const productsArray = require('./products.json')
// const mongoose = require('mongoose')
// require('dotenv').config()
// const connectDB = require('./db/connect')
// const ProductModel = require('./models/product')

// //connect to mongo db and upload
// const populateDB = async() => {
//   try {
//     await connectDB(process.env.MONGO_URI)
//     console.log('database connected')
//     await ProductModel.deleteMany()
//     await ProductModel.create(productsArray)
//     process.exit(0)
//   } catch(error) {
//     console.log(error.message)
//     process.exit(1)
//   }
// }

// populateDB()
