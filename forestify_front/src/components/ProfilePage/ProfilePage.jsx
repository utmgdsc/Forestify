import React from 'react';
import './ProfilePage.css';
import { LoginSignup } from '../LoginSignup/LoginSignup';

const Profile = ({ user }) => {
  return (
    <div>
      {user ? ( // Check if user is not null
        <div>
          {user.username ? ( // Check if user.username is not null
            <div className='centered'>user: {user.username}</div>
          ) : (
            <div>user: logged in but username not available</div>
          )}
        </div>
      ) : (
          <LoginSignup />

      )}
    </div>
  );
};

//note https://www.youtube.com/watch?v=XwTp2ePRBYk
export default Profile;