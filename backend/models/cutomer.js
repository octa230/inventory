import mongoose from "mongoose";


const customerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    company: {type: String, required: true},
    taxNumber: {type: String, required: true},
    createdAt:{type: Date, default: Date.now}
},
{
    timestamps: true, 
}
)