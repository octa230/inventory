const express = require('express');
const {
    registerUser, 
    loginUser, 
    logoutUser, 
    getUser, 
    loginStatus, 
    updateUserInfo, 
    changePassword,
    resetPassword
} = require('../controllers/userCtrl');

const protectedRoute = require('../midleware/authMiddleware');


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser)
userRouter.get('/logout', logoutUser);
userRouter.get('/profile', protectedRoute, getUser)
userRouter.get('/loggedIn', loginStatus)
userRouter.patch('/updateInfo', protectedRoute, updateUserInfo);
userRouter.patch('/changepassword', changePassword);
userRouter.post('/forgotPassword', resetPassword)

module.exports = userRouter