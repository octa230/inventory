const express = require('express')
const {NewRetailSale} = require('../controllers/retailCtrl')

const retailRouter = express.Router()

retailRouter.post('/retail-sale', NewRetailSale)


module.exports = retailRouter