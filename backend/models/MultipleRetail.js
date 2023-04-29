const mongoose = require('mongoose');

const MultipleRetailSchema = new mongoose.Schema({
    InvoiceCode: {type: String, required: true},
    saleItems:[{
        productName: {type: String, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true},
        arrangement: {type: String, required: true}
    }],
    InvoiceCode: {type: String, required: true},
    total:{type: Number, required: true},
    subTotal:{type: Number, required: true},
    date:{type: String, required: true},
    name:{type: String, required: true},
    paidBy: {type: String, required: true},
    preparedBy: {type: String, requred: true},
    service: {type: String, required: true}
},
{
    timestamps: true
}
)

const MultipleSale = mongoose.model('MultipleSale', MultipleRetailSchema)
module.exports = MultipleSale