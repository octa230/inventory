import mongoose from "mongoose"

const saleSchema = new mongoose.Schema({

saleItems:[
    {
        name: {type: String, required: true},
        quantity:{type: Number, required: true},
        price:{type: Number, required: true},
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    }
],
    isPaid: {type: Boolean, default: true},
    paidAt: {type: Date },
    totalPrice: {type: Number, required: true },


},
{
    timestamps: true
}
)
const Sale = mongoose.model('Sale', saleSchema);
module.exports = Sale