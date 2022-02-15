const express = require('express')
const router = express.Router()

// controller functions
const {getAllProducts, getAllProductsStatic} = require('../controllers/products')

//routes
router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductsStatic)


module.exports= router