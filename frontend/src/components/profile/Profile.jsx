import React from 'react'
import{Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import './Profile.css'

function Profile() {
  const { user } = useSelector((state) => state.user);
  return (
    <div className='profile-container'>
      <div className='profile-image'>
        
        <div className='image'>
        <img src="https://i.pinimg.com/736x/87/14/55/8714556a52021ba3a55c8e7a3547d28c.jpg" alt="" />
        </div>
        <Link to='/me/update'>Edit Profile</Link>
      </div>
      <div className='profile-text'>
        <div>
          <h3>Name</h3>
          <p>{user.name}</p>
        </div>
        <div>
          <h3>Email</h3>
          <p>{user.email}</p>
        </div>
        <div>
          <h3>Join On</h3>
          <p>{String(user.createdAt).substring(0,10)}</p>
        </div>
        <div>
          <Link to='/password/update'>Change Password</Link>
        </div>
      </div>
    </div>
  )
}

export default Profile
