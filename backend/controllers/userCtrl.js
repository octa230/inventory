const User = require("../models/user");
const bcrypt = require('bcrypt');
const {token} = require('../utils/auth')
const asyncHandler = require('express-async-handler')



//create user

const createUser = asyncHandler(async(req, res)=> {
//const saltRounds = 10;
const newUser = new User({
    userName: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, saltRounds = 10)
})

const user = await newUser.save();
res.send({user}) 
token(user)
})


//login

const loginUser = asyncHandler(async(req, res)=> {

    const {password, userName} = req.body;
    const user = await User.findOne({userName})
    const hashPassword = bcrypt.compareSync(password, user.password)

    if(user){
        if(hashPassword){
            res.send({
                userId: user._id,
                email: user.email,
                userName: user.userName
            })
        }
    }
})



module.exports = { createUser, loginUser }