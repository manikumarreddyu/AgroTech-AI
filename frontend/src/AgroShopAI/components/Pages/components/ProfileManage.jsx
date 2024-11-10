import React, { useState } from "react";
import TabNav from "./TabNav";
import PersonalInfo from "./PersonalInfo";
import PasswordForm from "./PasswordForm";
import Notifications from "./Notifications";
import SecuritySettings from "./SecuritySettings";
import ActivityLog from "./ActivityLog";
import ActiveSessions from "./ActiveSessions";
import Message from "./Message";

export default function ProfileEdit() {
  const [activeTab, setActiveTab] = useState("personal");
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    email: "john.doe@agroshop.com",
    profilePicture: "/placeholder.svg?height=100&width=100",
  });
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    app: true,
    newOrders: true,
    lowInventory: false,
  });
  const [securitySettings, setSecuritySettings] = useState({
    securityQuestion: "What was your first pet's name?",
    securityAnswer: "",
    accountLockout: true,
  });
  const [activityLog] = useState([
    {
      type: "login",
      date: "2023-11-10 09:30:00",
      details: "Logged in from Chrome on Windows",
    },
    {
      type: "profile_update",
      date: "2023-11-09 14:15:00",
      details: "Updated email address",
    },
    {
      type: "password_change",
      date: "2023-11-08 11:00:00",
      details: "Changed password",
    },
  ]);
  const [activeSessions] = useState([
    { device: "Chrome on Windows", lastActive: "2023-11-10 10:30:00" },
    { device: "Safari on iPhone", lastActive: "2023-11-10 09:45:00" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Profile Edit</h1>

      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {message.text && <Message message={message} />}

      {activeTab === "personal" && (
        <PersonalInfo
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setMessage={setMessage}
        />
      )}
      {activeTab === "password" && (
        <PasswordForm
          password={password}
          setPassword={setPassword}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setMessage={setMessage}
        />
      )}
      {activeTab === "notifications" && (
        <Notifications
          notifications={notifications}
          setNotifications={setNotifications}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      {activeTab === "security" && (
        <SecuritySettings
          securitySettings={securitySettings}
          setSecuritySettings={setSecuritySettings}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      {activeTab === "activity" && <ActivityLog activityLog={activityLog} />}
      {activeTab === "sessions" && (
        <ActiveSessions activeSessions={activeSessions} />
      )}
    </div>
  );
}
