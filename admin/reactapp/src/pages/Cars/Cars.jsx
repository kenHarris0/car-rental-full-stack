import React, { useState } from 'react'
import './Cars.css'
import {assets} from '../../assets/assets'
import {useContext, useEffect } from 'react'
import axios from 'axios'
import {Admincontext} from '../../Context/Context'
import {toast} from 'react-toastify'
const Cars = () => {
const {url,userdata,fetchuserdata,companies,setallcompanies,fetchcompanydata}=useContext(Admincontext)


  const [cardata,setcardata]=useState({
    name:"",
    model:"",
    year:"",
    rent:0,
    image:""

  })

  const handlechange=(e)=>{
    const {name,value}=e.target
    setcardata(item=>({...item,[name]:value}))
  }

  const handlefile=(e)=>{
    const file=e.target.files[0]
    setcardata(item=>({...item,image:file}))
  }

const handlesubmit = async (e) => {
  e.preventDefault();

  if (!userdata || !userdata._id) {
    toast.error("Please wait, user data not loaded yet!");
    return;
  }

  try {
    const formdata = new FormData();
    formdata.append('name', cardata.name);
    formdata.append('model', cardata.model);
    formdata.append('year', cardata.year);
    formdata.append('rent', cardata.rent);
    formdata.append('image', cardata.image);
    
    formdata.append('company', companyId);

    console.log('URL used for adding car:', `${url}/car/add`)

    const response = await axios.post(`${url}/car/add`, formdata, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    console.log('Create car response:', response?.data)
    if (response?.data?.success) {
      toast.success('Car added to the business')
      setcardata({
         name:"",
    model:"",
    year:"",
    rent:0,
    image:""
      })
    } else {
      toast.error(response?.data?.message || 'Unexpected response')
    }
  } catch (err) {
    console.error('Error adding car:', err?.response || err)
    toast.error('Error adding car')
  }
};

useEffect(()=>{
  const loader=async()=>{
await  fetchuserdata()
await fetchcompanydata()
  }
 loader()

},[])
let companyId = null;
if (userdata && companies.length > 0) {
  const companyObj = companies.find(company => company.email === userdata.email);
  companyId = companyObj?._id;
}


  return (
    <div className='cars'>
      <h1>Add Cars to your Business</h1>

      <form onSubmit={handlesubmit} className='carform'>
        <label htmlFor='image'>
          <img src={assets.addIcon} alt="" />

</label>
<input type="file" hidden  name='image' id='image' onChange={handlefile}/>
        <input type="text" placeholder='name' name='name' value={cardata.name} onChange={handlechange}/>
        <input type="text" placeholder='model' name='model' value={cardata.model} onChange={handlechange}/>
        <input type="text" placeholder='year' name='year' value={cardata.year} onChange={handlechange}/>
        <input type="number" placeholder='rent' name='rent' value={cardata.rent} onChange={handlechange} />
        <button type='submit'>Submit</button>

      </form>
      
    </div>
  )
}

export default Cars
