const express = require('express');
const {createProduct, deleteProduct, getAll, updateProduct, productName, getProduct} = require('../controllers/productCtrl')

const productRouter = express.Router();


productRouter.post('/new', createProduct)
productRouter.delete('/delete/:id', deleteProduct)
productRouter.get('/list', getAll)
productRouter.put('/update/:id', updateProduct)
productRouter.get('/:id', getProduct)
/* productRouter.delete('/delete-product/:id', deleteProduct)
productRouter.update('/update-product/:id', updateProduct)
productRouter.get('/products', listProducts) */

module.exports = productRouter