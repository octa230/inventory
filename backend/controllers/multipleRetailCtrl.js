const MultipleSale = require('../models/MultipleRetail');
const asyncHandler = require('express-async-handler')


const newMultipleSale = asyncHandler(async(req, res)=> {
    const newSale = new MultipleSale({
        saleItems: req.body.products.map((x)=> ({
            ...x,
            quantity: x.quantity,
            productName: x.name,
            price: x.price,
            arrangement: x.arrangement
        })),
        preparedBy: req.body.preparedBy,
        paidBy: req.body.paidBy,
        service: req.body.service,
        date: req.body.time,
        name: req.body.name,
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

const makeInvoice = asyncHandler(async(req, res)=> {
    const saleId = req.params.id;
    const sale = await MultipleSale.findById(saleId)
    
    if(sale){
        try{
        const invoice = new PDFDocument({size: 'A4'});
        const fileName = `invoice_${sale.createdAt.toString()}.pdf`
        const filePath = `./invoices/${fileName}`

        const address = `
                        Uplifting Floral Studio
                        CTRL_NO: ${sale._id}
                        Tel No: +971-00000000. 
                        Mail: sales@uplifting.ae,
                        Site: Uplifting.ae
                        PreparedBy ${sale.preparedBy}
                        Date: ${sale.createdAt.toLocaleString()}
        `

        const customerInfo = `
        Customer tel:  +971-0000000.
        Customer Name:  Marvin,
        Paid By: ${sale.paidBy}
        Ivoice Number:  ${sale.InvoiceCode}.
        `
    
        
        invoice.image('./images/logo.png', 50, 30, {fit:[100, 100], width: '200'} )
        invoice.moveDown()
        invoice.text(`${address}`, {align: 'right', lineGap: 4})
        invoice.moveDown()
        invoice.text(`${customerInfo}`, {width: 500, align:'left', lineGap:2})
        invoice.moveDown()
        invoice.fontSize(12).list(sale.saleItems.map((item)=> (
            `Name: ${item.productName}, 
            Qty: ${item.quantity}, 
            Unit Price: ${item.price}, 
            Arrangement: ${item.arrangement}, 
            SubTotal: ${item.subTotal}`)
            ), {width: '600', align: 'justify', wordSpacing: 8, lineGap: 20, lineBreak: true}, 400, 300)

    
        const writeStream = fs.createWriteStream(filePath)
        
        invoice.pipe(writeStream)
        invoice.end()
        
        writeStream.on('finish', ()=> {res.json({url: `/${fileName}`})})        
        }catch(error){
            res.send(error)
        }
    }})

module.exports = {newMultipleSale, makeInvoice, getSales}