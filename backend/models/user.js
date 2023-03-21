const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    password: {type: String, required: true},
    sales:[{type: mongoose.Schema.Types.ObjectId, ref: 'Sale'}],  
})

const User = mongoose.model('User', userSchema);
module.exports = User;