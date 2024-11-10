import React, { useState } from 'react';

const SecuritySettings = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const handleToggle2FA = () => {
    setTwoFactorAuth(!twoFactorAuth);
  };

  const handleChangePassword = () => {
    setChangePassword(true);
    // Implement password change functionality here
  };

  return (
    <div className="security-settings">
      <h3>Security Settings</h3>
      <div className="setting">
        <label>
          <input
            type="checkbox"
            checked={twoFactorAuth}
            onChange={handleToggle2FA}
          />
          Enable Two-Factor Authentication
        </label>
      </div>
      <div className="setting">
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
    </div>
  );
};

export default SecuritySettings;
