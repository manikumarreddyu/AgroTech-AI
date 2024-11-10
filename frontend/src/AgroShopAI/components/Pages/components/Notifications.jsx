import React, { useState } from 'react';

const Notifications = () => {
  // State for managing notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [appNotifications, setAppNotifications] = useState(true);
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [inventoryNotifications, setInventoryNotifications] = useState(false);

  const handleToggle = (setting, setter) => {
    setter(!setting);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission for saving the changes
    alert('Notification preferences saved!');
  };

  return (
    <div className="notifications-settings">
      <h3>Notification Settings</h3>
      <form onSubmit={handleSubmit}>
        <div className="notification-setting">
          <label>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => handleToggle(emailNotifications, setEmailNotifications)}
            />
            Email Notifications
          </label>
        </div>

        <div className="notification-setting">
          <label>
            <input
              type="checkbox"
              checked={smsNotifications}
              onChange={() => handleToggle(smsNotifications, setSmsNotifications)}
            />
            SMS Notifications
          </label>
        </div>

        <div className="notification-setting">
          <label>
            <input
              type="checkbox"
              checked={appNotifications}
              onChange={() => handleToggle(appNotifications, setAppNotifications)}
            />
            App Notifications
          </label>
        </div>

        <div className="notification-setting">
          <label>
            <input
              type="checkbox"
              checked={orderNotifications}
              onChange={() => handleToggle(orderNotifications, setOrderNotifications)}
            />
            Order Notifications
          </label>
        </div>

        <div className="notification-setting">
          <label>
            <input
              type="checkbox"
              checked={inventoryNotifications}
              onChange={() => handleToggle(inventoryNotifications, setInventoryNotifications)}
            />
            Inventory Notifications
          </label>
        </div>

        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default Notifications;
