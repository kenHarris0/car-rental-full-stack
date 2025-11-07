import React, { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import { ToastContainer } from 'react-toastify'
import Car from './pages/CarPage/Car'
import Checkout from './pages/Checkout/Checkout'
import Companies from './pages/Companies/Companies'
import Booking from './pages/Bookings/Booking'
const App = () => {

  const [clicklogin,setclicklogin]=useState(false)


  return (
    <div className='app'>
      <ToastContainer/>
      <Navbar clicklogin={clicklogin} setclicklogin={setclicklogin}/>
      {clicklogin && <Login clicklogin={clicklogin} setclicklogin={setclicklogin}/>}

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/car/:id' element={<Car/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/company' element={<Companies/>}/>
        <Route path='/bookings' element={<Booking/>}/>
      </Routes>

      
    </div>
  )
}

export default App
