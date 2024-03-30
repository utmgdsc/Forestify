import React from 'react';

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
        <div>user: not logged in</div>
      )}
    </div>
  );
};

export default Profile;