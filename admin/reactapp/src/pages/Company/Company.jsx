import React, { useContext, useState } from 'react'
import './Company.css'
import axios from 'axios'
import { Admincontext } from '../../Context/Context'
import {toast} from 'react-toastify'




const Company = () => {
const {url}=useContext(Admincontext)

const [companyinfo,setcompanyinfo]=useState({
  name:"",
  email:"",
  address:"",
  phone:""
})

const handlechange=(e)=>{
  const {name,value}=e.target
  setcompanyinfo(item=>({...item,[name]:value}))
}



const addCompany=async(e)=>{
  e.preventDefault()
  try{
    const response=await axios.post(url+'/company/addcompany',companyinfo,{withCredentials:true})
    if(response.data.success){
      toast.success("Company Added Successfully")
      setcompanyinfo({
        name:"",
  email:"",
  address:"",
  phone:""
      })
    }

  }
  catch(err){
    console.log(err)
  }
}


  return (
    <div className='company'>
      <h1>Company Page</h1>
      <h2>Add a New <span>Company To Your Fleet</span> </h2>

      <form onSubmit={addCompany} className='companyform'>
        <input type="text" placeholder='Company Name' name='name' value={companyinfo.name} onChange={handlechange} />
        <input type="text" placeholder='Address' name='address' value={companyinfo.address} onChange={handlechange} />
        <input type="email" placeholder='Email' name='email' value={companyinfo.email} onChange={handlechange}  />
        <input type="text" placeholder='Phone Number' name='phone' value={companyinfo.phone} onChange={handlechange} />
        <button type='submit'> Submit</button>
      </form>



      
    </div>
  )
}

export default Company
