import React, { useState } from "react";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa"; // For icons

const LiveChat = () => {
  const [userName, setUserName] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "Support", message: "Hello! How can we assist you today?" },
  ]);

  const handleMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSendMessage = () => {
    if (userMessage.trim() !== "") {
      setChatHistory([...chatHistory, { sender: userName || "Guest", message: userMessage }]);
      setUserMessage(""); // Clear input after sending message
      setTimeout(() => {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { sender: "Support", message: "We are here to help!" },
        ]);
      }, 1000); // Simulating a response after 1 second
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-400 to-green-600 shadow-2xl rounded-lg w-full  mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-white flex items-center space-x-2">
        <FaUserCircle className="text-2xl" /> <span>Live Chat Support</span>
      </h3>

      {/* User Name Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-white">Your Name (optional)</label>
        <input
          type="text"
          value={userName}
          onChange={handleNameChange}
          className="w-full p-2 border-2 border-gray-300 rounded-lg"
          placeholder="Enter your name"
        />
      </div>

      {/* Chat History */}
      <div className="bg-white p-4 h-64 overflow-auto rounded-lg mb-4">
        <div className="space-y-2">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`${
                chat.sender === "Support" ? "text-green-600" : "text-gray-800"
              }`}
            >
              <strong>{chat.sender}: </strong>
              {chat.message}
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-white">Your Message</label>
        <textarea
          value={userMessage}
          onChange={handleMessageChange}
          className="w-full p-2 border-2 border-gray-300 rounded-lg h-24"
          placeholder="Type your message here"
        ></textarea>
      </div>

      {/* Send Button */}
      <button
        onClick={handleSendMessage}
        className="w-full bg-green-700 text-white p-2 rounded-lg flex items-center justify-center"
      >
        <FaPaperPlane className="mr-2" /> Send Message
      </button>
    </div>
  );
};

export default LiveChat;
