const {newMultipleSale, makeInvoice, getSales} = require('../controllers/multipleRetailCtrl');
const express = require('express');


const multipleSaleRoutes = express.Router()

multipleSaleRoutes.post('/new-sale', newMultipleSale)
multipleSaleRoutes.get('/list', getSales)
multipleSaleRoutes.post('/make-invoice/:id', makeInvoice)

module.exports = {multipleSaleRoutes}