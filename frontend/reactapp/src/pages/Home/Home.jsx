import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { userContext } from '../../Context/Context'
import {assets} from '../../assets/assets'
import {useNavigate} from 'react-router-dom'

const Home = () => {

  const {url,userdata,checkauth,fetchuserdata,loggedin,companies,fetchcompanydata,cars,fetchcardata}=useContext(userContext)
  const navigator=useNavigate()
  const[filter,setfilter]=useState("")


useEffect(()=>{
  const loader=async()=>{
 await fetchcardata()
  await fetchuserdata()
  }
  loader()
 
},[])

  return (
    <div className='homepg'>
       <div className="herotitle">
        <h1>Your Journey Starts Here — <span>Rent the Car, Own the Road</span></h1>
      </div>
      <div className="heropg">
        <img src={assets.banner_car_image} alt="" />
      </div>

      <div className="search">
        <input type="text" placeholder='Search cars' value={filter} onChange={(e)=>setfilter(e.target.value)} />
      </div>


      <div className="allcars">
        {cars.filter(car=>car.name.toLowerCase().includes(filter.toLowerCase())).map(car=>{
        return(
            <div className={`carcard ${car.available?'active':""}`} onClick={()=>navigator(`/car/${car._id}`)}>
                <img src={`http://localhost:5000/carimg/${car.image}`} alt="" />
                <h2><span>Name:</span>{car.name}</h2>
                <h3><span>Model:</span>{car.model}</h3>
                <h3><span>Year:</span>{car.year}</h3>
                <h3><span>Rent:</span>$ {car.rent}</h3>
                <h3><span>Available:</span>{car.available? 'YES':'NO'}</h3>
                
                
            </div>
        )
    }) }
      </div>

     
      
    </div>
  )
}
import './Home.css'
export default Home
