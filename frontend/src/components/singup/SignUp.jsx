import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../reducers/userSlice';
import axios from 'axios';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Redirect to '/account' if user is already logged in
    if (user !== null) {
      navigate('/account');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.psw.value;

    try {
      const response = await axios.post('/api/v1/register', {
        name,
        email,
        password,
      });
      console.log(response.data);
      if (response.data.success === true) {
        const loggedInUser = response.data.user;
        dispatch(login(loggedInUser));
        setIsError(false);
        navigate('/account');
      }
    } catch (error) {
        console.log(error);
        setMessage(error.response.data.message);
        setIsError(true);
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <p>
            Please fill in this form to create an account.{' '}
            <Link to="/login">Login</Link>
          </p>

          <label htmlFor="name">Name</label>
          <input type="text" placeholder="Enter Name" name="name" required />

          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Enter Email" name="email" required />

          <label htmlFor="psw">Password</label>
          <input type="password" placeholder="Enter Password" name="psw" required />

          <label>
            <input type="checkbox" defaultChecked name="remember" style={{ marginBottom: '15px' }} required />
            I Accept
          </label>

          <p>
            By creating an account you agree to our <a href="#">Terms & Privacy</a>.
          </p>

          {message && (
            <p style={{ color: isError ? 'red' : 'green' }}>{message}</p>
          )}

          <div className="buttons">
            <button type="button" className="cancelbtn">
              Cancel
            </button>
            <button type="submit" className="signupbtn">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
