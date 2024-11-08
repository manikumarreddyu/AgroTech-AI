// NotificationsComponent.js
import React from 'react';
import { Bell } from 'lucide-react';

const NotificationsComponent = ({ notifications }) => {
  return (
    <div>
      {notifications.map(notification => (
        <div key={notification.id} className="flex items-center border-b py-4">
          <Bell className="w-5 h-5 text-yellow-400 mr-2" />
          <p className="text-green-600">{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsComponent;
