const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userModel = new mongoose.Schema({

    name: {type: String, required: [true, "please add name"] },
    shop: {type: String, required: [true, 'please add your shop']},
    email: {
        type: String, 
        required: [true, "pleaase enter email"], 
        unique: true, 
        trim: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "please enter a valied email adress"]
    },
    password:{ 
        type: String, 
        required:[true, "please add password"],
        minLength: [6, "please use atleast 8 characters"],
       // maxLenngth: [23, "password can't exceed 23 characters" ]
    },
    photo:{
        type: String,
        required: [true, "please add photo"],
        default: 'https://i.bb.co/4pDNDk1/avatar.png'

    },

    phone:{
        type: String,
        required: [true, "please add phone number"],
        default: "+971"
    },

    desc: {
        type: String,
        maxLenngth: [320, 'cant excceed 320 characters'],
        default: 'description'   
    }


}, {
    timestamps: true
},)

// encrypt password before save

userModel.pre('save', async(next)=> {


    if(!this.isModified("password")){
        return next()
    }

    //hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword 
  next()
})

const User = mongoose.model('User', userModel)
module.exports = User