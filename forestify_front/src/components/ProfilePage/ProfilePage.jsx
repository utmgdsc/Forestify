import React, { useEffect } from 'react';
import './ProfilePage.css';
import logo from '../Assets/logo.png';
import { toast } from 'react-toastify'; // Import toast

const Profile = ({ user }) => {
  useEffect(() => {
    if (!user) {
      toast.warn("You must log in first!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [user]); // Dependency array with user ensures this runs only when user changes

  return (
    <div>
      {user ? (
        <div className='slide'>
          <img src={logo} alt="logo" />
          <h1 className='welcome'>Welcome to Forestify! {user.username}</h1>
          <h2 className='tagline'>Your Profile:</h2>
          <p className='ptag'>Email: {user.email}</p>
          <p className='ptag'>Username: {user.username}</p>
        </div>
      ) : (
        <React.Fragment/>
      )}
    </div>
  );
};

export default Profile;
