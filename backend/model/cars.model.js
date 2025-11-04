const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    name:{type:String,required:true},
    model:{type:String,required:true},
    year:{type:String},
    image:{type:String},
    rent:{type:Number,required:true},
    available:{type:Boolean,default:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
    ,

    company:{type:mongoose.Schema.Types.ObjectId,ref:'company'}
})

const cars=mongoose.model('car',schema)


module.exports=cars