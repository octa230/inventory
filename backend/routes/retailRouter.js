const express = require('express')
const {NewRetailSale} = require('../controllers/retailCtrl')

const retailRouter = express.Router()

retailRouter.post('/new-retail', NewRetailSale)

module.exports = retailRouter