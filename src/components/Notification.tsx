import React, { useState, useEffect } from "react";

interface Notification {
  id: string;
  message: string;
}

interface NotificationListProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onRemove,
}) => {
  useEffect(() => {
    const timers = notifications.map((notification) =>
      setTimeout(() => onRemove(notification.id), 5000)
    );

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [notifications, onRemove]);

  return (
    <div className="fixed top-24 right-4 flex flex-col space-y-2 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-blue-600 text-white px-6 py-3 rounded shadow-lg transition-opacity"
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
