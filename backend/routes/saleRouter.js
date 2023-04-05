const express = require('express');
const {getSales, 
    makeSale, 
    getSingleSale, 
    salesSummary, 
    deleteSale} = require('../controllers/saleCtrl')



const salesRouter = express.Router();


salesRouter.get('/all-sales', getSales)
salesRouter.post('/make-sale', makeSale)
salesRouter.get('/get-sale', getSingleSale)
salesRouter.get('/summary', salesSummary)
salesRouter.delete('/delete-sale', deleteSale)


module.exports = salesRouter