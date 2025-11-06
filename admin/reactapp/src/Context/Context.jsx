import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import axios from 'axios'
export const Admincontext=createContext()



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

//comapnys in work

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

//getallcars

const [cars,setcars]=useState([])
const fetchcardata=async()=>{
  try{
    const response=await axios.get(url+'/car/getall',{withCredentials:true})
    if(response.data.success){
      setcars(response.data.payload)
      
    }
  }
  catch(err){
    console.log(err)
  }

}










useEffect(()=>{
  const reloadrun=async()=>{
 await checkauth()
  }
   reloadrun()
   
  
},[])


const value={
    url,
    loggedin,setloggedin,checkauth,
    userdata,fetchuserdata,setuserdata,
    companies,setallcompanies,fetchcompanydata,
    cars,setcars,fetchcardata
}

  return (
    <div>
        <Admincontext.Provider value={value}>
            {children}
        </Admincontext.Provider>
      
    </div>
  )
}

export default Context
