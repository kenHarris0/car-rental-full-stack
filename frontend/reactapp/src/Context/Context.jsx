import React, { Children, createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const userContext=createContext()

const Context = ({children}) => {
const url='http://localhost:5000'
const [loggedin,setloggedin]=useState(false)
const [userdata,setuserdata]=useState(null)
//checking auth

const checkauth=async()=>{
  try{
    const response=await axios.post(url+'/user/auth',{},{withCredentials:true})
    if(response.data.success){
      setloggedin(true)
      await fetchuserdata()
      await fetchcardata()
     
      
    }
    else{
      setloggedin(false)
    }

  }
  catch(err){
    console.log(err)
  }

}

//userdata fetch
const fetchuserdata=async()=>{
  try{
    const response=await axios.get(url+'/user/getuser',{withCredentials:true})
    if(response.data.success){
      setuserdata(response.data.payload)
       
    }
  }
  catch(err){
    console.log(err)
  }

}
// companies
const [companies,setallcompanies]=useState([])
const fetchcompanydata=async()=>{
  try{
    const response=await axios.get(url+'/company/getall',{withCredentials:true})
    if(response.data.success){
      setallcompanies(response.data.companies)
       
    }
  }
  catch(err){
    console.log(err)
  }

}
//all cars fetching
const [cars,setcars]=useState([])
const fetchcardata = async () => {
  try {
    const response = await axios.get(url + '/car/getall');

    if (response.data.success) {
      const allcars = response.data.payload;
      setcars(allcars);

      
      for (const car of allcars) {
        if (!car.available) {
          await checkavailablity(car._id);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const checkavailablity=async(id)=>{
  try{
    const response=await axios.post(url+'/car/check',{id})
    if(response.data.success){
      console.log("changed status")
      
    }

  }
  catch(err){
    console.log(err)
  }
}


const value={
   url,loggedin,setloggedin,userdata,setuserdata,
    checkauth,fetchuserdata,
    companies,setallcompanies,fetchcompanydata,
    cars,setcars,fetchcardata

}


useEffect(()=>{
    const reloadrun=async()=>{
 await checkauth()
  }
   reloadrun()
},[])

  return (
    <div>

        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
      
    </div>
  )
}

export default Context
