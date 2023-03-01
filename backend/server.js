const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const asyncHandler = require('express-async-handler')
const cors = require('cors');
const ErrorHandler = require('./midleware/errHandler')
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/userRoute')

const app = express();
dotenv.config()
const PORT = process.env.PORT



//middleware
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())


//routes middleware

app.use('/api/users/', userRouter)



//routes

app.get('/', asyncHandler(async(req, res)=> {
    res.send('home page')
}))

//errorMiddleware
app.use(ErrorHandler)




mongoose.connect(process.env.MONGO_URI)
.then(()=> {

        app.listen(process.env.PORT, ()=> {
            console.log(`app running on ${PORT}`)
        })
    
    }).catch((err)=> console.log(err))
