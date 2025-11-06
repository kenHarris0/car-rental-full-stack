const express=require('express')

const router=express.Router()


const{createCompany,removeCompany,getallcompany,getCompanycars}=require('../controllers/company.controllers')

router.post('/addcompany',createCompany)
router.post('/removecompany',removeCompany)
router.get('/getall',getallcompany)
router.post('/getcars',getCompanycars)

module.exports=router