import React from 'react'
import './Admincarslist.css'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Admincontext } from '../../Context/Context';
import { useContext } from 'react';
const Admincarslist = () => {
   const { url, userdata, fetchuserdata, fetchcompanydata, companies, fetchcardata, cars } =
    useContext(Admincontext);

  const [companycars, setCompanyCars] = useState([]);
  const [currentCars, setCurrentCars] = useState([])
 
 const { id } = useParams()


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
      if (id){
        await fetchAllCompanyCars(id);
        
      } 
    
    }
    loader()
   
  }, [id]);


useEffect(() => {
  if (cars.length > 0 && companycars.length > 0) {
    const currCars = cars.filter((c) =>
      companycars.some((cid) => String(cid) === String(c._id))
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
                
                

            </div>
        )
    })}



  </div>


)
};

export default Admincarslist
