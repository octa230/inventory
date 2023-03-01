const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require('../utils/sendMail');


const generateToken = (id)=> {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"1d"})
}

/////register user//////

const registerUser = asyncHandler(async (req, res)=> {
   const {name, email, password } = req.body

   //from validation

   if(!name || !email || !password){
    res.status(400)
    throw new Error('please check all required fields')
   }

   if(password.length < 8){
    res.status(400)
    throw new Error('please check password length 8 characters')
   }
   
   //check if email already exists
  const userExists = await User.findOne({email})

  if(userExists){
    res.status(400)
    throw new Error("email or user already exists")
  }

 ////create new user ////

  const user = await User.create({
    name,
    email,
    password: hashedPassword

  }) 

  //generate token 

  const token = generateToken(user._id)

  //send HTTP-only Cookie

  res.cookie("token", token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), //1day
    sameSite: "none",
    secure: true,
  })

  if(user){
    const {_id, name, email, photo, phone, shop, desc, token} = user
    res.status(400).json({
        _id, 
        name, 
        email, 
        photo, 
        phone, 
        shop, 
        desc, 
        token,    
    })
  } else {
    res.status(400)
    throw new Error("invalid user data")
  }
})

//////login user////

const loginUser = asyncHandler(async(req, res)=> {
    const {email, password} = req.body

    //validate email
    if(!email || !password){
        res.status(400)
        throw new Error("please enter email and password") 
    }

    //check if user exists
    const user = await User.findOne({email})
    
    if(!user){
        res.status(400);
        throw new Error('user not found')
    }
    //user exists, check password validity

    const passwordValidity = await bcrypt.compare(password, user.password);

    //generate token 

    const token = generateToken(user._id)

  //send HTTP-only Cookie

  res.cookie("token", token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), //1day
    sameSite: "none",
    secure: true,
  })

    if(user && passwordValidity){
        res.json({
            _id,
            name,
            email,
            phone,
            shop,
            desc,
            token,
        })
    } else {
        res.status(400)
        throw new Error('invalid email and password')
    }
})


/////logout user////

const logoutUser = asyncHandler(async(req, res)=> {
res.cookie("token", "",{
    path: '/',
    httpOnly: true,
    expires: new Date(0), //1day
    sameSite: "none",
    secure: true,

})
return res.status(200).json({message: "logged out"})

})
 

/////get User profile//////

const getUser = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.user._id);

  if(user){
    const {_id, name, email, photo, phone, shop, desc} = user
    res.status(400).json({
        _id, 
        name, 
        email, 
        photo, 
        phone, 
        shop, 
        desc, 
    })
  } else {
    res.status(400)
    throw new Error("user not found")
  }
});

/////get login status//////

const loginStatus =asyncHandler(async(req, res)=>{

  const token = req.cookies.token;
  if(!token){
    return res.json(false)
  }

  const verified =  jwt.verify(token, process.env.JWT_SECRET)
  if(verified){
    res.json(true)
  }
  return res.json(false)
})


////update userInfo/////

const updateUserInfo = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.user._id)

  if(user){
    const {_id, name, email, photo, phone, desc } = user;

    user.email = email
    user.name = req.body.name || name
    user.phone = req.body.phone || phone
    user.desc = req.body.desc || desc
    user.photo = req.body.photo || photo

    const updatedUser = await user.save()

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      photo: updatedUser.photo,
      desc: updatedUser.desc
    })

  } else {
    res.status(404)
    throw new Error(" user not found")
  }
});

////change password////

const changePassword = asyncHandler(async(req, res)=>{

  const user = await User.findById(req.user._id);
  const {oldpassword, newpassword} = req.body

  //validate

  if(!user){
    res.status(400)
    throw new Error(" user not found, please login")
  }
  if(!oldpassword || ! newpassword){
    res.status(400)
    throw new Error("check both feilds")
  }

  //check oldpassword correspondance
  const passwordIsCorrect = await bcrypt.compare(oldpassword, user.password);

  //save new password 
  if(user && passwordIsCorrect){
    user.password = password
    await user.save()
    res.status(200).send("password changed successfully")
  } else {
    res.status(400);
    throw new Error('please add correct old password')
  }

}) 

////reset password////
const resetPassword = asyncHandler(async(req, res)=>{
  const {email} = req.body
  const user = await User.findOne({email})

  if(!user){
    res.status(404)
    throw new Error("user doesnt exist")
  }

  //create reset token

  const resetToken = crypto.randomBytes(32).toString("hex") + user._id

  //hash token before saving
  const hashedToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex")

  //save token to Db

  await new Token ({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000) ///30mins
  }).save()

  //construct reset url

  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`

  //reset email

  const message = `
  <h2>Hello: ${user.name}</h2>


  <p>Please use the url below to reset your password</p>
  <p>This link is valid for 30 minutes</p>

  
  <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

  <p>Regards....</p>

  <p>Team</p>
  `;

  const subject = `password reset request`
  const send_to = user.email
  const sent_from = process.env.EMAIL_USER

  try{
    await sendEmail(subject, message, send_to, sent_from)
    res.status(200).json({success: true, message: "reset email sent"})
  } catch (error) {

  }
  res.send("Forgot Password")
})



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    loginStatus,
    updateUserInfo,
    changePassword,
    resetPassword,
}