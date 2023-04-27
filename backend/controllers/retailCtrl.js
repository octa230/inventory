const Retail = require("../models/Retail")
const asyncHandler = require('express-async-handler')


const NewRetailSale = asyncHandler(async(req, res)=> {
    const newSale = new Retail({
            InvoiceCode: "UPDXB/RTL_" + Math.floor(100000 + Math.random()* 900000),
            saleItems: req.body.saleItems.map((x)=> ({
                ...x, 
                product: x.id, 
                productName: x.productName, 
                quantity: x.quantity, 
                price: x.price, 
                subtotal: x.subtotal, 
                arrangement: x.arrangement
            })),
            paidBy: req.body.paidBy, 
            service: req.body.service,
            preparedBy: req.body.preparedBy,
            vat: req.body.vat,
            total: req.body.total
    })

    const sale = await newSale.save()
    res.status(200).send({message: 'retail sale recorded successfully', sale})
})

module.exports = {NewRetailSale}