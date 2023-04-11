const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({

saleItems:[
    {    
        code: {type: String, required: true},
        name: {type: String, required: true},
        quantity: {type: Number, required: true},
        price:{type: Number, required: true},
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    }],

    paidAt: {type: Date },
    itemsPrice: {type: Number, required: true},
    soldBy:{type: String, required: true},
    InvoiceCode: {type: String, required: true},
    taxPrice:{type: Number, required: true},
    totalPrice: {type: Number, required: true },
    
},

{
    timestamps: true
}
)
const Sale = mongoose.model('Sale', saleSchema);
module.exports = Sale