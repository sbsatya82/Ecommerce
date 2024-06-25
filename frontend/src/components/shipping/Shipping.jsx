import React, { useState, useEffect } from 'react';
import { Country, State } from 'country-state-city';
import './Shipping.css'
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
  const [name, setName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('IN'); // Default country is India
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useNavigate();


  useEffect(() => {
    // Check if shipping details are already present in session storage
    const savedDetails = sessionStorage.getItem('shippingDetails');
    if (savedDetails) {
      const details = JSON.parse(savedDetails);
      setName(details.name);
      setContactNo(details.contactNo);
      setAddress(details.address);
      setCountry(details.country);
      setState(details.state);
      setCity(details.city);
      setPinCode(details.pinCode);
    }
 
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    sessionStorage.setItem('shippingDetails', JSON.stringify({
      name,
      contactNo,
      address,
      country,
      state,
      city,
      pinCode
    }));
    setLoading(false);
      history('/confirm-order');
  };

  return (
    <div className="container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h2>Delivery Details</h2>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="contactNo">Contact No</label>
          <input
            type="number"
            placeholder="Enter Contact No"
            name="contactNo"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            required
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            placeholder="Enter Address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <label htmlFor="country">Country</label>
          <select
            name="country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setState('');
            }}
            required
          >
            {Country.getAllCountries().map((item) => (
              <option key={item.isoCode} value={item.isoCode}>
                {item.name}
              </option>
            ))}
          </select>

          {country && (
            <>
              <label htmlFor="state">State</label>
              <select
                name="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              >
                <option value=''>Select State</option>
                {State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </>
          )}

          <label htmlFor="city">City</label>
          <input
            type="text"
            placeholder="Enter City"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />

          <label htmlFor="pinCode">Pin Code</label>
          <input
            type="text"
            placeholder="Enter Pin Code"
            name="pinCode"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <div className="buttons">
            <button type="submit" className="signupbtn" disabled={loading}>
              {loading ? 'Submitting...' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
