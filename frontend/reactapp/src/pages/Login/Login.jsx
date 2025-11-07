import React, { useContext, useState } from 'react'

import { userContext } from '../../Context/Context'
import axios from 'axios'
import './Login.css'
import {toast} from 'react-toastify'

const Login = ({clicklogin,setclicklogin}) => {
    const {url, loggedin,setloggedin,checkauth}=useContext(userContext)

    
const [ipdata,setipdata]=useState({
    name:"",
    email:"",
    password:""
})
const [loginstate,setloginstate]=useState('signup')

const handlechange=(e)=>{
const {name,value}=e.target
setipdata(item=>({...item,[name]:value}))
}

const handlesubmit=async(e)=>{
    e.preventDefault()
    if(loginstate==='signup'){
        try{
            const response=await axios.post(url+'/user/register',ipdata,{withCredentials:true})
            if(response.data.success){
toast.success('registered')
await checkauth()
setclicklogin(false)
setloggedin(true)
            }

        }
        catch(err){
            console.log(err)
        }

    }
    else{
        try{
            const response=await axios.post(url+'/user/login',{email:ipdata.email,password:ipdata.password},{withCredentials:true})
            if(response.data.success){
toast.success('logged in')
await checkauth()
setclicklogin(false)
setloggedin(true)
            }

        }
        catch(err){
            console.log(err)
        }

    }
}

  return (
    <div className='login'>
        <div className="innercont">
            <h1>{loginstate==='signup' ? 'Signup' : 'Login'} Page</h1>
            <form onSubmit={handlesubmit}>
                {loginstate==='signup' && <input type="text" placeholder='Username' name='name' value={ipdata.name} onChange={handlechange} />}
                <input type="email" placeholder='Email' name='email' value={ipdata.email} onChange={handlechange}/>
                <input type="password" placeholder='Password' name='password' value={ipdata.password} onChange={handlechange}/>
                <button type='submit'>{loginstate==='signup' ? 'Signup' : 'Login'}</button>
                {loginstate==='signup' ? <p className='changer' onClick={()=>setloginstate('login')}>Already have an account?</p> : <p className='changer' onClick={()=>setloginstate('signup')}>Don't have an account?</p>}
            </form>
        </div>
      
    </div>
  )
}

export default Login
