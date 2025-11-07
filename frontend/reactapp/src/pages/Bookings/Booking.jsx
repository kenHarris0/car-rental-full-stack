import React, { useContext, useEffect, useState } from 'react'
import './Booking.css'
import axios from 'axios'
import { userContext } from '../../Context/Context'

const Booking = () => {
  const [bookings, setBookings] = useState([])
  const { url, userdata, fetchuserdata, cars, fetchcardata } = useContext(userContext)

  const fetchAllBookings = async () => {
    try {
      const response = await axios.get(`${url}/user/getallbookings`, { withCredentials: true })
      if (response.data.success) {
        setBookings(response.data.payload)
        console.log(response.data.payload)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const loader = async () => {
      await fetchAllBookings()
    }
    loader()
  }, [userdata])

  useEffect(() => {
    const loader = async () => {
      await fetchuserdata()
      await fetchcardata()
    }
    loader()
  }, [])

  return (
    <div className='bookingpg'>
      {bookings.length === 0 ? (
        <h2>No bookings found.</h2>
      ) : (
        bookings.map((booking, ind) => {
          let car = null
          let expiry=null
          if (cars?.length > 0) {
            car = cars.find(carr => carr._id === booking.carId)
            expiry=car?.Bookeduntil ? new Date(car.Bookeduntil) : null
          }
          const isExpired = expiry && expiry < new Date()
          

          return (
            <div className={`indibooking ${isExpired ? 'expired' : 'active'}`} key={ind}>
              {car ? (
                <>
                  <h2>{car.name}</h2>
                  <p><strong>Model:</strong> {car.model}</p>
                  <p><strong>Year:</strong> {car.year || 'N/A'}</p>
                  <p><strong>Rent (per hour):</strong> ₹{car.rent}</p>
                  <p><strong>Hours booked:</strong> {booking.hours} hour(s)</p>
                  <p><strong>Booked on:</strong> {new Date(booking.bookedAt).toLocaleString()}</p>
                </>
              ) : (
                <p>Car details not found.</p>
              )}
            </div>
          )
        })
      )}
    </div>
  )
}

export default Booking
