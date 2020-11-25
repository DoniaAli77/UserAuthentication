const StudentRoutes= require('./routes/students_routes')
const AuthenticationRoutes= require('./routes/auth')
const jwt= require('jsonwebtoken')
const verify= require('./routes/tokenverification')

const express= require('express')
const app= express()
app.use(express.json())
app.use('', AuthenticationRoutes)

//could be done like this
app.use((req, res, next)=>{
    const token= req.headers.token
    if(!token)  
    {
        return res.status(401).status('Access deined')
    }
    try{
        const verified= jwt.verify(token, process.env.TOKEN_SECRET)
        req.user= verified
        next()
    }
    catch(err){
        res.status(400).send('Invalid Request')
    }
})

//but it's better to do it in a seperate file 
//to seperate your functions from the routes for more clarity
//app.use(verify)

app.use('/students' ,StudentRoutes)
module.exports.app = app
