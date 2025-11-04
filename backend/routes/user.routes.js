const express=require('express')

const router=express.Router()
const authmiddleware=require('../middlewares/auth.middleware')

const {login,register,logout,getuserbyid,checkauth}=require('../controllers/user.controller')

router.post('/login',login)
router.post('/register',register)
router.post('/logout',logout)
router.get('/getuser',authmiddleware,getuserbyid)
router.post('/auth',authmiddleware,checkauth)

module.exports=router