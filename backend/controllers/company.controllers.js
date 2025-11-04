const Company=require('../model/company.model')
const Car=require('../model/cars.model')

const createCompany=async(req,res)=>{
    const {name,address,email,phone}=req.body
    try{
        const newcomp=new Company({
            name,email,address,phone
        })
        await newcomp.save()
        res.json({success:true,message:"company added"})

    }
    catch(err){
        console.log(err)
    }
    

}

const removeCompany=async(req,res)=>{
    const id=req.body.id
    try{
        const company=await Company.findByIdAndDelete(id)
        if(company){
            res.json({success:true,message:"company removed"})
        }
        else{
            res.json({success:false,message:"no company found"})
        }

    }
    catch(err){
        console.log(err)
    }
    
}

const getallcompany=async(req,res)=>{
    try{
        const companies=await Company.find()
        res.json({success:true,companies})
    }
    catch(err){
        console.log(err)
    }
}

module.exports={createCompany,removeCompany,getallcompany}