const Company = require('../model/company.model')
const Car = require('../model/cars.model')

const createCar = async (req, res) => {
  const image = req?.file ? req.file.filename : null
  
  const { name, model, year, rent, company } = req.body

  try {
    const currCompany = await Company.findById(company)
    if (!currCompany) {
      return res.json({ success: false, message: 'Company not found' })
    }
    const newCar = new Car({
      name,
      image,
      model,
      year,
      rent,
      company,
      
    })
    await newCar.save()
    currCompany.cars.push(newCar._id)
    await currCompany.save()

    res.json({ success: true, message: 'Car added to company', car: newCar })
  } catch (error) {
    console.error('Error creating car:', error)
    res.status(500).json({ success: false, message: 'Error adding car' })
  }
}

const removeCar = async (req, res) => {
  const {id,companyId}=req.body

  try{
      const car=await Car.findByIdAndDelete(id)
       await Company.findByIdAndUpdate(companyId, {
      $pull: { cars: id },
    });
      res.json({success:true,message:"car removed"})

  }
   catch(err){
      console.log(err)
    }

}

const getallcars=async(req,res)=>{
  try{
    const cars=await Car.find()
    res.json({success:true,payload:cars})
   
  }
   catch(err){
      console.log(err)
    }
}

const checkreturn=async(req,res)=>{
  const {id}=req.body
  try{
   const car=await Car.findById(id)
   const currdate=new Date()
   if(car.Bookeduntil && car.Bookeduntil<currdate){
    car.Bookeduntil=null
    car.available=true
    await car.save()
   }

   res.json({success:true,message:'updated'})


   
  }
   catch(err){
      console.log(err)
    }
}


module.exports = { createCar, removeCar ,getallcars,checkreturn}
