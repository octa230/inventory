const express = require('express');
const {newProduct, deleteProduct, getAll} = require('../controllers/productCtrl')

const productRouter = express.Router();


productRouter.post('/new-product', newProduct)
productRouter.delete('/delete/:id', deleteProduct)
productRouter.get('/list', getAll)
/* productRouter.delete('/delete-product/:id', deleteProduct)
productRouter.update('/update-product/:id', updateProduct)
productRouter.get('/products', listProducts) */

module.exports = productRouter