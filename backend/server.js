const express=require('express')
const cors=require('cors')
const app=express()
const connection=require('./config/db')

const dotenv=require('dotenv')
const carroute=require('./routes/cars.routes')
const companyroute=require('./routes/company.routes')
const cookieParser=require('cookie-parser')
const userrouter=require('./routes/user.routes')
const frontendurl='http://localhost:5173'
app.use(cors({
  origin: frontendurl,
  credentials: true
}));
dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true })) 

app.use('/carimg',express.static('Carimages'))
app.use('/car',carroute)
app.use('/company',companyroute)
app.use('/user',userrouter)

app.listen(5000,()=>{
    connection()
    console.log("server running on port 5000")
})