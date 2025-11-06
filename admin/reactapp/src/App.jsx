import React, { useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify' 
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home/Home'
import Company from './pages/Company/Company'
import Cars from './pages/Cars/Cars'
import Login from './pages/Login/Login'
import Dashboard from './pages/Adminboard/Dashboard'
import Carlist from './pages/Carslist/Carlist'
import Admincarslist from './pages/Admincarlist/Admincarslist'

const App = () => {

const [clicklogin,setclicklogin]=useState(false);


  return (
    
    <div className='app'>
      <ToastContainer/>
      <Navbar clicklogin={clicklogin} setclicklogin={setclicklogin}/>
      {clicklogin && <Login clicklogin={clicklogin} setclicklogin={setclicklogin}/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/company' element={<Company/>}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/carlist' element={<Carlist/>}/>
        <Route path="/listcars/:id" element={<Admincarslist />} /> 
      </Routes>
      
    </div>
  )
}

export default App
