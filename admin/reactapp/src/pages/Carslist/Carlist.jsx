import React, { useContext, useEffect, useState } from 'react';
import './Carlist.css';
import { Admincontext } from '../../Context/Context';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import {toast} from 'react-toastify'
const Carlist = () => {
  const { url, userdata, fetchuserdata, fetchcompanydata, companies, fetchcardata, cars } =
    useContext(Admincontext);

  const [companycars, setCompanyCars] = useState([]);
  const [currentCars, setCurrentCars] = useState([])
 
  const [companyId, setCompanyId] = useState(null);


  const fetchAllCompanyCars = async (id) => {
    try {
      const response = await axios.post(`${url}/company/getcars`, { id }, { withCredentials: true });
      if (response.data.success) {
        setCompanyCars(response.data.payload);
        console.log(response.data.payload);
        

      }
    } catch (err) {
      console.error(err);
    }
  };


  const removecar=async(id,companyId)=>{
try{
  const response=await axios.post(url+'/car/removecar',{id,companyId},{withCredentials:true})
  if(response.data.success){
    toast.success("car removed successfully")
    await fetchcardata()
  }

}
catch (err) {
      console.error(err);
    }


  }
  useEffect(() => {
    const loadData = async () => {
      await fetchuserdata();
      await fetchcompanydata();
      await fetchcardata();
      
      
    };
    loadData();
    
  }, []);

  useEffect(() => {
    const loader=async()=>{
      
         if (userdata && companies.length > 0) {
      const company = companies.find((c) => c.email === userdata.email);
      if (company){
        setCompanyId(company._id)
        await fetchAllCompanyCars(company._id);
        
      } 
    }
    }
    loader()
   
  }, [userdata, companies]);


useEffect(() => {
  if (cars.length > 0 && companycars.length > 0) {
    const currCars = cars.filter((c) =>
      companycars.some((id) => String(id) === String(c._id))
    );
    setCurrentCars(currCars)
  }
}, [cars, companycars]);


  
  

  return (
  <div className="carlists">
    {currentCars.map(car=>{
        return(
            <div className={`carcard ${car.available?'active':""}`}>
                <img src={`http://localhost:5000/carimg/${car.image}`} alt="" />
                <h2><span>Name:</span>{car.name}</h2>
                <h3><span>Model:</span>{car.model}</h3>
                <h3><span>Year:</span>{car.year}</h3>
                <h3><span>Rent:</span>$ {car.rent}</h3>
                <h3><span>Available:</span>{car.available? 'YES':'NO'}</h3>
                <h3><span>Company:</span>{userdata.name}</h3>
                <button onClick={()=>removecar(car._id,companyId)}>Remove Car</button>
            </div>
        )
    })}



  </div>


)
};

export default Carlist;
