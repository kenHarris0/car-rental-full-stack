import React, { useEffect } from 'react';
import './Checkout.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const success = params.get('success');
  const id = params.get('id');
  const hours = params.get('hours');
  const url = 'http://localhost:5000'; // make sure to match backend

  const addBooking = async () => {
    try {
      const response = await axios.post(
        `${url}/user/addbooking`,
        { id, hours },
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log('Booking confirmed');
        setTimeout(() => navigate('/'), 3000);
      } else {
        console.error(response.data.message);
      }
    } catch (err) {
      console.error('Booking error:', err);
    }
  };

  useEffect(() => {
    if (success === 'true') {
      addBooking();
    }
  }, [success]);

  return (
    <div className="checkout-page">
      {success === 'true' ? (
        <div className="checkout-container success">
          <img
            src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
            alt="success"
            className="checkout-icon"
          />
          <h2>Payment Successful 🎉</h2>
          <p>Your booking has been confirmed!</p>
          <p className="redirect-text">Redirecting you to home...</p>
        </div>
      ) : (
        <div className="checkout-container failed">
          <img
            src="https://cdn-icons-png.flaticon.com/512/753/753345.png"
            alt="failed"
            className="checkout-icon"
          />
          <h2>Payment Failed ❌</h2>
          <p>Something went wrong with your payment.</p>
          <button className="retry-btn" onClick={() => navigate('/')}>
            Go Back Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
