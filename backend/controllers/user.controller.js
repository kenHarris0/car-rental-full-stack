const User=require('../model/user.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Stripe=require('stripe')
const Car=require('../model/cars.model')
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
const handlepayment=async(req,res)=>{
    const {price,id,hours}=req.body
    const stripe=new Stripe(process.env.STRIPE_SECRET)
    const frontendurl='http://localhost:5173'
    try{
    const session=await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        line_items:[{
            price_data:{
                currency:'inr',
                product_data:{
                    name:'car booking'
                },
                unit_amount:price*100

            },
            quantity:1

        }],
        mode:'payment',
        success_url:`${frontendurl}/checkout?success=true&id=${id}&hours=${hours}`,
        cancel_url:`${frontendurl}/checkout?success=false&id=${id}`,
        

    })
    res.json({success:true,sessionurl:session.url})
}
  catch(err){
        console.log(err)
    }

}
const addtobooking = async (req, res) => {
  const { id, hours } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    const car = await Car.findById(id);
    if (!car) return res.json({ success: false, message: "Car not found" });

    if (!car.available) {
      return res.json({ success: false, message: "Car is already booked" });
    }

    const booking = {
      carId: id,
      hours,
      bookedAt: new Date(),
    };

    user.bookings.push(booking);
    await user.save();

    car.available = false;
    car.Bookeduntil = new Date(Date.now() + hours * 60 * 60 * 1000); 
    await car.save();

    res.json({ success: true, message: "Booking added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getallbookings=async(req,res)=>{
    try{
        const id=req.userId
        const user=await User.findById(id)
        res.json({success:true,payload:user.bookings})

    }
    catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}


module.exports={login,register,logout,getuserbyid,checkauth,handlepayment,addtobooking,getallbookings}