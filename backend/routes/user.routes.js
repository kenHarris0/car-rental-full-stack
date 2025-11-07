const express=require('express')

const router=express.Router()
const authmiddleware=require('../middlewares/auth.middleware')

const {login,register,logout,getuserbyid,checkauth,handlepayment,addtobooking,getallbookings}=require('../controllers/user.controller')

router.post('/login',login)
router.post('/register',register)
router.post('/logout',logout)
router.get('/getuser',authmiddleware,getuserbyid)
router.post('/auth',authmiddleware,checkauth)
router.post('/payment',handlepayment)
router.post('/addbooking',authmiddleware,addtobooking)
router.get('/getallbookings',authmiddleware,getallbookings)


module.exports=router