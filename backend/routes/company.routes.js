const express=require('express')

const router=express.Router()


const{createCompany,removeCompany,getallcompany}=require('../controllers/company.controllers')

router.post('/addcompany',createCompany)
router.post('/removecompany',removeCompany)
router.get('/getall',getallcompany)

module.exports=router