import axios from 'axios';
import React ,{ useState }from 'react'
import { useDispatch, useSelector } from 'react-redux';

function EditProfile() {
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
  });
  const { name, email } = formData;
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/v1/me/update', {
        name: formData.name,
        email: formData.email,
      });
      
      if (response.status === 200) {
        setMessage('Profile updated successfully!');
        setIsError(false);
      } else {
        setMessage('Failed to update profile. Please try again.');
        setIsError(true);
      }
    } catch (error) {
      console.log('API request failed:', error);
      setMessage('Failed to update profile. Please try again.');
      setIsError(true);
    }
  };
  return (
    <div className="container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="Enter Name" onChange={handleChange} value={name} name="name" required />

          <label htmlFor="email">Email</label>
          <input type="email" onChange={handleChange} placeholder="Enter Email" value={email} name="email" required />


          {message && (
            <p style={{ color: isError ? 'red' : 'green' }}>{message}</p>
          )}

          <div className="buttons">
            <button type="submit" className="signupbtn">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
