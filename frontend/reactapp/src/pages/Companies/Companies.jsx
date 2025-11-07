import React, { useContext, useEffect } from 'react';
import './Companies.css';
import { userContext } from '../../Context/Context';
import { assets } from '../../../../../admin/reactapp/src/assets/assets';
import {useNavigate} from 'react-router-dom'
const Companies = () => {
  const { url, companies, fetchcompanydata, cars, fetchcardata } = useContext(userContext);
const navigator=useNavigate()
  useEffect(() => {
    const loader = async () => {
      await fetchcardata();
      await fetchcompanydata();
    };
    loader();
  }, []);

  return (
    <div className="companiespg">
      {companies.map((company) => {
        
        const companyCars = cars.filter((car) => car.company === company._id);

        return (
          <div className="companydiv" key={company._id}>
            <div className="headers">
              <div className="headerleft">
                <h1>{company.name}</h1>
              </div>

              <div className="headerright">
                <div className='mailimg'>
                  <img src={assets.gmail_logo} alt="" />
                  <h4>{company.email}</h4>
                </div>
                <h4><span>Phone:</span>{company.phone}</h4>
                <h4><span>Address:</span>{company.address}</h4>
              </div>
            </div>

            <div className="footerdiv">
              <h3>Cars</h3>

              {companyCars.length > 0 ? (
                <div className="carlister">
                  {companyCars.map((car) => (
                    <div className="indiicar" key={car._id} onClick={()=>navigator(`/car/${car._id}`)}>
                      <img src={`${url}/carimg/${car.image}`} alt={car.name} />
                      <h2>
                        <span>Name:</span> {car.name}
                      </h2>
                      <h3>
                        <span>Model:</span> {car.model}
                      </h3>
                      <h3>
                        <span>Year:</span> {car.year}
                      </h3>
                      <h3>
                        <span>Rent:</span> ₹{car.rent}
                      </h3>
                      <h3>
                        <span>Available:</span> {car.available ? 'YES' : 'NO'}
                      </h3>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No cars available for this company.</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Companies;
