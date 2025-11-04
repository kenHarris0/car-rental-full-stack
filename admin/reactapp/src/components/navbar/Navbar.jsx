import React, { useContext } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Admincontext } from '../../Context/Context'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Navbar = ({clicklogin,setclicklogin}) => {
  const {loggedin,setloggedin,checkauth,url,fetchuserdata,setuserdata}=useContext(Admincontext)
const navigator=useNavigate()


  const logout=async()=>{
    try{
      const response=await axios.post(url+'/user/logout',{},{withCredentials:true})
      if(response.data.success){
        setloggedin(false)
        setuserdata(null)
       
        
        
      }
    }
    catch(err){
      console.log(err)
    }
  }



  return (
    <div className='navbar'>

      <div className="leftnav">
        <img src={assets.logo} alt="" onClick={()=>navigator('/')}/>
        

      </div>

      <div className="rightnav">
        {!loggedin?<button onClick={() => setclicklogin(!clicklogin)}>Login</button>:<button onClick={logout}>Logout</button>}
      </div>
      
      
    </div>
  )
}

export default Navbar
