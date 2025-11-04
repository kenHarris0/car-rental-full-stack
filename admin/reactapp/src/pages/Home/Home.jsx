import React, { useContext, useEffect } from 'react'
import './Home.css'

import {useNavigate} from 'react-router-dom'
import { Admincontext } from '../../Context/Context'
const Home = () => {
  const {userdata,fetchuserdata,loggedin}=useContext(Admincontext)

  const navigator=useNavigate()


   useEffect(() => {
    const reloader = async () => {
      await fetchuserdata()
    }
    reloader()
  }, [])

  const isadmin=userdata?.email==='admin123@gmail.com'


  return (
    <div className='homepg'>

      {!isadmin && <div className="part1" onClick={()=>navigator('/cars')}>
        <h1>Add Cars</h1>
      </div>}

      {isadmin && <div className="part2" onClick={()=>navigator('/company')}>
        <h1>Add Company</h1>
      </div>}

      {isadmin && <div className="part2" onClick={()=>navigator('/dashboard')}>
        <h1>Admin Dashboard</h1>
      </div>}
      
    </div>
  )
}

export default Home
