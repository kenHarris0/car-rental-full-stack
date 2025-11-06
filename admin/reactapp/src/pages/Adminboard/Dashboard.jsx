import React, { useContext, useEffect, useState } from 'react'
import './Dashboard.css'
import {Admincontext} from '../../Context/Context'
import axios from 'axios' 
import {useNavigate} from 'react-router-dom'
const Dashboard = () => {
  
  const {url,companies,setallcompanies,fetchcompanydata}=useContext(Admincontext)
  const navigator=useNavigate()

  useEffect(()=>{
    fetchcompanydata()
  },[])



  return (
    <div className='dashboard'>
      <h2>Companies List</h2>
      <div className='companieslist'>
        {companies.map((company,index)=>{
          return (
            <div className="companyy">
              <h3><span>Name:</span> {company.name}</h3>
              <h4><span>Email:</span> {company.email}</h4>
              <h4><span>Phone:</span> {company.phone}</h4>
              <p><span>Address:</span> {company.address}</p>
              <button onClick={()=>navigator(`/listcars/${company._id}`)}>CARS</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
