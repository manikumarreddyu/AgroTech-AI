// AvatarComponent.js
import React from 'react';

const AvatarComponent = ({ profilePicture, name }) => {
  // Fallback to a default value if name is undefined or empty
  const displayName = name || 'User';

  // Ensure the name is split safely
  const initials = displayName.split(' ').map(part => part[0]).join('');

  return (
    <div className="relative w-24 h-24 rounded-full bg-green-200 text-white flex items-center justify-center">
      {profilePicture ? (
        <img src={profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
      ) : (
        <span className="text-xl font-semibold">{initials}</span>
      )}
    </div>
  );
};

export default AvatarComponent;
