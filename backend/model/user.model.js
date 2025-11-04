const mongoose=require('mongoose')

const schema=new mongoose.Schema({
   name:{type:String,required:true},
   email:{type:String,required:true,unique:true},
   password:{type:String,required:true},
   bookings: {
    type: [
      {
        carId: { type: mongoose.Schema.Types.ObjectId, ref: 'car' },
        hours: { type: Number }, 
        bookedAt: { type: Date, default: Date.now } 
      }
    ],
    default: []
  }
})



const user=mongoose.model('user',schema)


module.exports=user