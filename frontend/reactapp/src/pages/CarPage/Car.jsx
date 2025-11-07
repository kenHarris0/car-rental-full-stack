import React, { useContext, useEffect, useState } from 'react';
import './Car.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { userContext } from '../../Context/Context';

const Car = () => {
  const { url, cars, fetchcardata } = useContext(userContext);
  const { id } = useParams();
  const [carinfo, setcarinfo] = useState(null);
const [tot,settot]=useState(1)
  const[time,settime]=useState(1)
const [hour,sethour]=useState(1)
const makepayment=async(price,id,hours)=>{
    try{
        const response=await axios.post(url+'/user/payment',{price,id,hours},{withCredentials:true})
        if(response.data.success){
            window.location.href=response.data.sessionurl
        }

    }
    catch(err){
        console.log(err)
    }
}


  useEffect(() => {
    const loadCar = async () => {
      await fetchcardata();
    };
    loadCar();
  }, []);

  useEffect(() => {
    if (cars && id) {
      const currcar = cars.find(car => String(car._id) === String(id));
      setcarinfo(currcar);
    }
  }, [cars, id]);

  

  return (
    <div className='carpg'>
      {carinfo ? (
        <div className="car-detail">
          <img src={`${url}/carimg/${carinfo.image}`} alt={carinfo.name} />
          <h2>{carinfo.name}</h2>
          <p>Model: {carinfo.model}</p>
          <p>Year: {carinfo.year}</p>
          <p>Rent: ${carinfo.rent}</p>
          <p>Availability: {carinfo.available ? 'Available' : 'Not Available'}</p>
        </div>
      ) : (
        <p>Loading car details...</p>
      )}

      <div className="timings">
<div className={`tottime ${time===1?'active': ''}`} onClick={()=>{settime(1);settot(1*carinfo.rent);sethour(1)}}>
    <h2>1hour</h2>
</div>
<div className={`tottime ${time===3 ?'active': ''}`} onClick={()=>{settime(3);settot(3*carinfo.rent);sethour(3)}}>
    <h2>3hour</h2>
</div>
<div className={`tottime ${time===6?'active': ''}`} onClick={()=>{settime(6);settot(6*carinfo.rent);sethour(6)}}>
    <h2>6hour</h2>
</div>
<div className={`tottime ${time===8?'active': ''}`} onClick={()=>{settime(8);settot(8*carinfo.rent);sethour(8)}}>
    <h2>8hour</h2>
</div>
<div className={`tottime ${time===24?'active': ''}`} onClick={()=>{settime(24);settot(24*carinfo.rent);sethour(24)}}>
    <h2>1 Day</h2>
</div>
<div className={`tottime ${time===48?'active': ''}`} onClick={()=>{settime(48);settot(48*carinfo.rent);sethour(48)}}>
    <h2>2 Days</h2>
</div>

      </div>

      <div className='checkout'>
        <button  onClick={()=>makepayment(tot,carinfo._id,hour)}>Proceed to checkout</button>
      </div>
    </div>
  );
};

export default Car;
