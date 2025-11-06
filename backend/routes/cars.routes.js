const express=require('express')
const multer=require('multer')
const router=express.Router()


const{createCar,removeCar,getallcars,checkreturn}=require('../controllers/cars.controller')
const storage=multer.diskStorage({
    destination:'Carimages',
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }

})

const upload=multer({storage:storage})



router.post('/add',upload.single('image'),createCar)
router.post('/removecar',removeCar)
router.get('/getall',getallcars)
router.post('/check',checkreturn)


module.exports=router