const express=require('express')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')

const authuser=async(req,res,next)=>{
    try{
        const token=req.cookies.token
        if(!token){
            return res.json({success:false,message:"auth failed"})
        }
        const vrfy=jwt.verify(token,process.env.JWT_SECRET)
        if(vrfy.id){
            req.userId=vrfy.id
            next()
        }
        else{
            return res.json({success:false,message:"auth failed"})
        }

    }
    catch(err){
        console.log(err)
    }
}

module.exports=authuser