const mongoose = require('mongoose');

const connectToDb=async()=>{
    try{
        mongoose.connect('mongodb://localhost:27017/carrental')
        console.log("connected to db")
    }
    catch(err){
        console.log(err)
    }
}

module.exports=connectToDb