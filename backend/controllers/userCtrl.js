const User = require("../models/user");
const bcrypt = require('bcryptjs');
const {token} = require('../utils/auth')
const asyncHandler = require('express-async-handler')



//create user

const createUser = asyncHandler(async(req, res)=> {
const newUser = new User({
    userName: req.body.name,
    password: bcrypt.hashSync(req.body.password)
})

const user = await newUser.save();
res.send({user}) 
token(user)
})


//login

const loginUser = asyncHandler(async(req, res)=> {
    const user = User.findOne({userName: req.body.userName})
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({userName: user.userName, token: token(user)})
            return
        }
        res.status(404).send({message: 'incorrect username or password'})
    }
})


module.exports = { createUser, loginUser }