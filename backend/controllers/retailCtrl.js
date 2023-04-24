const Retail = require("../models/retail")
const asyncHandler = require('express-async-handler')


const NewRetailSale = asyncHandler(async(req, res)=> {
    const newSale = new Retail({
            InvoiceCode: "UPDXB/RTL_" + Math.floor(100000 + Math.random()* 900000),
            name: req.body.name,   
            paidBy: req.body.paidBy, 
            service: req.body.service,
            arrangement: req.body.arrangement,
            preparedBy: req.body.preparedBy,
            productName: req.body.productName, 
            price: req.body.price, 
            vat: req.body.vat,
            total: req.body.total
    })

    const sale = await newSale.save()
    res.status(200).send({message: 'retail sale recorded successfully', sale})
})

module.exports = {NewRetailSale}