const User=require('../model/user.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const login=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await User.findOne({email})
        if(!user){
            return res.json({success:false,message:"user not found, register"})

        }
        const vrfypass=bcrypt.compare(password,user.password)
        if(!vrfypass){
            return res.json({success:false,message:"incorrect password"})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:2*60*60*1000
        })
        res.json({success:true,message:"logged in"})

    }
    catch(err){
        console.log(err)
    }

}

const register=async(req,res)=>{
    const {name,email,password}=req.body
    try{
           const user=await User.findOne({email})
        if(user){
            return res.json({success:false,message:"user  found, login"})

        }
        const hashit=bcrypt.hash(password,10)
       const newuser=new User({
        name,email,password
       })
       await newuser.save()
        const token=jwt.sign({id:newuser._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:2*60*60*1000
        })
        res.json({success:true,message:"registered successfully"})
    }
    catch(err){
        console.log(err)
    }

}

const logout=async(req,res)=>{
    try{
        res.clearCookie("token",{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
        })
        res.json({success:true,message:"logged out"})

    }
    catch(err){
        console.log(err)
    }
    

}

const getuserbyid=async(req,res)=>{
    const id=req.userId
    try{
        const user=await User.findById(id)
        res.json({success:true,payload:user})

    }
     catch(err){
        console.log(err)
    }

}
const checkauth=async(req,res)=>{
try{
    res.json({success:true,message:"user authenticated"})
}
 catch(err){
        console.log(err)
    }

}

module.exports={login,register,logout,getuserbyid,checkauth}