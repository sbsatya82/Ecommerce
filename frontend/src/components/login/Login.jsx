import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../reducers/userSlice';
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirect to '/account' if user is already logged in
    if (user !== null) {
      navigate('/account');
    }
  }, [user, navigate]); // Run effect whenever 'user' or 'navigate' changes

  const isAuthenticate = async (email, password) => {
    try {
      const { data } = await axios.post('/api/v1/login', {
        email: email,
        password: password,
      });
      console.log(data);
      if (data.success === true) {
        const loggedInUser = data.user;
        dispatch(login(loggedInUser));
        return true;
      } else {
        setError(data.message);
        return false;
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred.');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const email = e.target.elements.email.value;
    const password = e.target.elements.psw.value;

    try {
      const isAuthenticated = await isAuthenticate(email, password);

      if (isAuthenticated) {
        navigate('/account'); // Redirect to '/account' after successful login
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <p>
            Already have an account? Login or <Link to="/signup">Sign Up</Link>
          </p>

          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Enter Email" name="email" required />

          <label htmlFor="psw">Password</label>
          <input type="password" placeholder="Enter Password" name="psw" required />

          <label>
            <input type="checkbox" defaultChecked name="remember" style={{ marginBottom: '15px' }} />
            Remember me
          </label>

          {error && <p className="error-message">{error}</p>}

          <div className="buttons">
            <button type="button" className="cancelbtn">
              Cancel
            </button>
            <button type="submit" className="signupbtn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
