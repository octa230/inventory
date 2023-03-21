const jwt = require('jsonwebtoken')

const token = (user)=>{
    return jwt.sign({
        id: user._id,
        userName: user.userName,
        password: user.password
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '2h' 
        }
        )
}

const isAuth = (req, res, next)=>{
    const authorization = req.headers.authorization;
    if(authorization){
        const token = authorization.slice(7, authorization.length)
        jwt.verify(token, process.env.JWT_SECRET, (err, decode)=> {
            if(err){
                res.status(401).send({message: 'Invalid Token'})
            }else{
                req.user = decode;
                next()
            }
        })
    }else{
        res.status(401).send({message: 'no token'})
    }
}

module.exports ={token, isAuth}