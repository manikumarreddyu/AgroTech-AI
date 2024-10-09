import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaRobot } from 'react-icons/fa';
import bgHero from "../assets/bgHero.png";

function ChatBot() {
  const [userPrompt, setUserPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatHistoryRef = useRef(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Function to load chat history from localStorage
  const loadChatHistory = () => {
    const savedChatHistory = localStorage.getItem('chatHistory');
    if (savedChatHistory) {
      setChatHistory(JSON.parse(savedChatHistory));
    }
  };

  // Function to save chat history to localStorage
  const saveChatHistory = (history) => {
    localStorage.setItem('chatHistory', JSON.stringify(history));
  };

  const sendMessage = async () => {
    if (userPrompt.trim() === '') return;

    const updatedHistory = [...chatHistory, { role: 'user', content: userPrompt }];
    setChatHistory(updatedHistory);
    saveChatHistory(updatedHistory);  // Save updated history to localStorage

    const response = await fetch('https://agrotech-chatbot.onrender.com/AgroTech-ChatBot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userPrompt }),
    });

    const data = await response.json();
    if (data.response) {
      const formattedResponse = data.response
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\d\.\s/g, '<li>')
        .replace(/\n/g, '</li>');

      const updatedAssistantHistory = [
        ...updatedHistory,
        { role: 'assistant', content: formattedResponse },
      ];
      setChatHistory(updatedAssistantHistory);
      saveChatHistory(updatedAssistantHistory);  // Save updated history to localStorage
    }

    setUserPrompt('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    setShowScrollToTop(chatHistory.length > 0);
  }, [chatHistory]);

  // Load chat history from localStorage when the component mounts
  useEffect(() => {
    loadChatHistory();
  }, []);

  return (
<<<<<<< HEAD
    <div className='flex flex-col h-screen p-5' style={{ backgroundImage: `url(${bgHero})`}}>
      <div
        className='flex-1 overflow-y-auto p-2 border border-green-700 rounded-lg mb-2 mt-16'
=======
    <div className='max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8'>
      <h1 className="text-2xl text-center text-green-500 font-bold ">AgroTech AI ChatBot</h1>
      <div
        className='flex flex-col overflow-y-auto p-2 border-2 border-green-500 rounded-lg mt-6 mb-2'
>>>>>>> 7c81e0d42720e7ed1517c231a49dcfd496ccdc01
        ref={chatHistoryRef}
      >
        {chatHistory.map((message, index) => (
          <div
            key={index}
<<<<<<< HEAD
            className={`flex items-start mb-2 ${
              message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
=======
            className={`p-2 m-1 rounded-xl w-fit max-w-[80%] text-white ${
              message.role === 'user'
                ? 'bg-green-600 self-start rounded-tr-none'
                : 'bg-green-600 self-end rounded-tl-none'
>>>>>>> 7c81e0d42720e7ed1517c231a49dcfd496ccdc01
            }`}
          >
            {/* Adding user and assistant icons without text */}
            {message.role === 'user' ? (
              <FaUser className='text-black text-2xl ml-2' />
            ) : (
              <FaRobot className='text-black text-2xl mr-2' />
            )}
            <div
              className={`p-2 m-1 rounded-xl w-fit max-w-[80%] text-white ${
                message.role === 'user'
                  ? 'bg-green-700 rounded-tr-none self-end'
                  : 'bg-green-800 rounded-tl-none self-start'
              }`}
              dangerouslySetInnerHTML={{
                __html: message.content,
              }}
            />
          </div>
        ))}
      </div>

      <div className='flex items-center bg-green-500 p-2 rounded-lg'>
        <input
          type='text'
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
<<<<<<< HEAD
          placeholder='ASK AGRIBOT...'
          className='flex-1 p-2 text-white border border-green-600 rounded-lg outline-none'
=======
          placeholder='Ask AgroTech-AI ChatBot...'
          className='flex-1 p-2 bg-white text-black border-2 border-green-600 rounded-lg outline-none'
>>>>>>> 7c81e0d42720e7ed1517c231a49dcfd496ccdc01
        />
        <button
          className='bg-green-600 text-white p-2 rounded-lg ml-2 cursor-pointer hover:bg-green-700'
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot;


