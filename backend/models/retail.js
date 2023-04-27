const mongoose = require("mongoose");

const retailSchema = new mongoose.Schema({
    InvoiceCode: {type: String, required: true},
    saleItems:[{
        id:{type: String, required: true},
        productName:{type: String, required: true},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true},
        subtotal: {type: Number, required: true},
        arrangement: {type: String, requried: true}
    }],
    paidBy:{type: String, required: true},
    service:{type: String, required: true},
    preparedBy:{type: String, required: true},
    vat:{type: Number, required: true},
    total: {type: Number, required: true}
},
{
    timestamps: true
}
)


const Retail = mongoose.model('Retail', retailSchema);
module.exports = Retail;