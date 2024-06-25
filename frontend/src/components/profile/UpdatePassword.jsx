import React ,{ useState }from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const UpdatePassword = () => {
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const { oldPassword , newPassword, confirmPassword } = formData;
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/v1/password/update", {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      if (response.status === 200) {
        setMessage("Password updated successfully!");
        setIsError(false);
      } else {
        console.log(response.data.message);
        setMessage(response.data.message);
        setIsError(true);
      }
    } catch (error) {
      console.log("API request failed:", error.response.data.message);
      setMessage(error.response.data.message);
      setIsError(true);
    }
  };
  return (
    <div className="container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h1>Update Password</h1>

          <label htmlFor="name">Old Password</label>
          <input
            type="password"
            placeholder="Enter Old Password"
            onChange={handleChange}
            value={oldPassword}
            name="oldPassword"
            required
          />

          <label htmlFor="email">New Password</label>
          <input
            type="password"
            onChange={handleChange}
            placeholder="New Password"
            value={newPassword}
            name="newPassword"
            required
          />
          <label htmlFor="email"> Confirm Password</label>
          <input
            type="password"
            onChange={handleChange}
            placeholder="New Password"
            value={confirmPassword}
            name="confirmPassword"
            required
          />

          {message && (
            <p style={{ color: isError ? "red" : "green" }}>{message}</p>
          )}

          <div className="buttons">
            <button type="submit" className="signupbtn">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
