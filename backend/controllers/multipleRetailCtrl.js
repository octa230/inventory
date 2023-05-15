const MultipleSale = require('../models/MultipleRetail');
const asyncHandler = require('express-async-handler')

//this function is dependent on the [ addunits] function 
/* const newMultipleSale = asyncHandler(async(req, res)=> {
    const newSale = new MultipleSale({
        saleItems: req.body.products.map((x)=> ({
            ...x,
            quantity: x.quantity,
            productName: x.name,
            price: x.price,
            arrangement: x.arrangement,
        })),
        preparedBy: req.body.preparedBy,
        paidBy: req.body.paidBy,
        service: req.body.service,
        date: req.body.time,
        name: req.body.name,
        subTotal: req.body.subTotal,
        units: req.body.selectedProducts.map((x)=> ({
            ...x,
            product: x.product,
            quantity: x.quantity
        })),
        total: req.body.total,
        InvoiceCode: req.body.invoiceNumber,
    })

    await newSale.save()
})  */

//new sale function
const makeSale = asyncHandler(async(req, res)=> {
        const newSale = new MultipleSale({
            saleItems: req.body.products.map((x)=> ({
                ...x,
                quantity: x.quantity,
                productName: x.name,
                price: x.price,
                arrangement: x.arrangement,
                photo: x.file
            })),
            preparedBy: req.body.preparedBy,
            paidBy: req.body.paidBy,
            service: req.body.service,
            date: req.body.time,
            name: req.body.name,
            units:[],
            subTotal: req.body.subTotal,
            total: req.body.total,
            InvoiceCode: req.body.invoiceNumber,
        })
    
        const sale = await newSale.save()
        res.status(201).send({message: 'sale recorded successfully', sale})
}) 

const getSales = asyncHandler(async(req, res)=> {
const sales = await MultipleSale.find();
res.send(sales)
})

const getsingleSale = asyncHandler(async(req, res)=> {
    const saleId = req.params.id
    const sale = await MultipleSale.findById(saleId)
    if(sale){
        res.send(sale)
    }else{
        res.status(404).send({message: "sale not found"})
    }
})

const addSaleUnits = asyncHandler(asyncHandler(async(req, res)=> {
    const saleId = req.params.id
    const sale = await MultipleSale.findById(saleId) 
    const {selectedProducts, arrangement} = req.body
    if(sale){
        sale.units.push({arrangement, products: selectedProducts.map((x)=> ({
            ...x,
            product: x.product,
            quantity: x.quantity
        }))})
    await sale.save();
    }else{
        res.status(404).send({message: "unable to add data"})
    }


    sale.units.push({arrangement, ...newProducts})
}))

module.exports = { /* newMultipleSale, */  getSales, getsingleSale, addSaleUnits, makeSale}