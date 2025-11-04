const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:String,required:true},
    cars:[
        {type:mongoose.Schema.Types.ObjectId,ref:'car',default:[]}
    ]
})



const company=mongoose.model('company',schema)


module.exports=company