const express= require('express');
const router= express.Router()
const StudentModel= require('../models/students_model')

router.route('')
.get(async (req, res)=>{
    if(req.user.role == 'admin'){
        const result= await StudentModel.find()
        if(result.length>0){
            res.send(result)
    
        }
        else{
            res.status(404).send('No Students in the database')
        }
    }
    else{
        res.status(403).send('Only admins are allowed')
    }
    
 })
.post(async(req, res)=>{
    if(req.user.role == 'admin'){
        const result= await StudentModel(req.body).save()
        res.send(result)
    }
    else{
        res.status(403).send('Only admins are allowed')
    }
})



 module.exports= router