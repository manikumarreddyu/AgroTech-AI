import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaRobot, FaTimes } from 'react-icons/fa';
import bgHero from "../assets/bgHero.png";
import loadingGif from "../assets/loading.gif";

function ChatBot() {
  const [userPrompt, setUserPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatHistoryRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(true); // Changed to show modal

  const loadChatHistory = () => {
    const savedChatHistory = localStorage.getItem('chatHistory');
    if (savedChatHistory) {
      setChatHistory(JSON.parse(savedChatHistory));
    }
  };

  const saveChatHistory = (history) => {
    localStorage.setItem('chatHistory', JSON.stringify(history));
  };

  const sendMessage = async () => {
    if (userPrompt.trim() === '') return;

    setLoading(true);
    const updatedHistory = [...chatHistory, { role: 'user', content: userPrompt }];
    setChatHistory(updatedHistory);
    saveChatHistory(updatedHistory);

    try {
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
        saveChatHistory(updatedAssistantHistory);
      } else if (data.error) {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setLoading(false);
    setUserPrompt('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    loadChatHistory();
  }, []);

  const handleCloseModal = () => {
    setShowLoadingModal(false); // Close modal
  };

  return (
    <div className='flex flex-col h-screen p-6 mt-16' style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover' }}>
      <h1 className="text-3xl text-center text-green-600 font-bold mb-4">AgroTech AI ChatBot</h1>

      {/* Modal for loading message */}
      {showLoadingModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 transition-opacity duration-300 ease-in-out">
  <div className="flex flex-col p-8 bg-gradient-to-r from-green-500 to-green-700 rounded-lg shadow-2xl max-w-md w-full transform transition-transform duration-300 ease-in-out scale-110">
    <button className="self-end text-white hover:text-gray-300 transition-transform transform hover:scale-125" onClick={handleCloseModal}>
      <FaTimes className="text-2xl" />
    </button>
    <h2 className="text-xl font-bold text-white mb-3 text-center">Your AI Agent is on the way...</h2>
    <img src={loadingGif} alt="Loading..." className="mx-auto w-16 h-16 mb-3" />
    <p className="text-white text-center">The model may take some <strong>1 - 2 minutes</strong> to load. Please be patient!</p>
  </div>
</div>


    )}


      <div
        className='flex-1 overflow-y-auto p-2 border-2 border-green-500 rounded-lg mb-4 bg-white shadow-lg'
        ref={chatHistoryRef}
      >
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex items-start mb-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {message.role === 'user' ? (
              <FaUser className='text-black text-2xl ml-2' />
            ) : (
              <FaRobot className='text-black text-2xl mr-2' />
            )}
            <div
              className={`p-3 m-1 rounded-lg w-fit max-w-[80%] text-white transition duration-200 ${
                message.role === 'user'
                  ? 'bg-green-600 rounded-tr-none self-end'
                  : 'bg-green-700 rounded-tl-none self-start'
              }`}
              dangerouslySetInnerHTML={{
                __html: message.content,
              }}
            />
          </div>
        ))}
      </div>

      <div className='flex items-center bg-green-500 p-3 rounded-lg shadow-lg'>
        <input
          type='text'
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Ask AgroTech-AI ChatBot...'
          className='flex-1 p-3 bg-white text-black border-2 border-green-600 rounded-lg outline-none transition duration-200 focus:ring-2 focus:ring-green-300'
        />
        <button
          className='bg-red-600 text-white p-3 rounded-lg ml-2 cursor-pointer hover:bg-red-700 transition duration-200'
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
