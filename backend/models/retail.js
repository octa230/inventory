const mongoose = require("mongoose");

const retailSchema = new mongoose.Schema({
    InvoiceCode: {type: String, required: true},
    name:{type: String, required: true},
    paidBy:{type: String, required: true},
    service:{type: String, required: true},
    arrangement:{type: String, required: true},
    preparedBy:{type: String, required: true},
    productName: {type: String, required: true}, 
    price:{type: Number, required: true},
    vat:{type: Number, required: true},
    total: {type: Number, required: true}
},
{
    timestamps: true
}
)


const Retail = mongoose.model('Retail', retailSchema);
module.exports = Retail;