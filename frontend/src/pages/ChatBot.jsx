import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

function ChatBot() {
  const [userPrompt, setUserPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatHistoryRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [firstMessageSent, setFirstMessageSent] = useState(false);

  // Updated pre-made prompts array
  const preMadePrompts = [
    "What is AgroTech AI?",
    "How does the equipment rental platform work?",
    "Is there any training for using the technology?",
    "How do I get started with AgroTech AI?",
    "Why use AI in agriculture?",
    "How do we do it?",
    "What kind of solutions does AgroTech AI offer?",
    "What features does AgroTech AI offer?",
    "How do I create an account?",
    "Where can I find more information about your features?",
  ];

  const loadChatHistory = () => {
    const savedChatHistory = localStorage.getItem('chatHistory');
    if (savedChatHistory) {
      setChatHistory(JSON.parse(savedChatHistory));
    }
  };

  const saveChatHistory = (history) => {
    localStorage.setItem('chatHistory', JSON.stringify(history));
  };

  const sendMessage = async (prompt) => {
    const messageToSend = prompt || userPrompt.trim(); // Ensure no leading/trailing spaces
    if (messageToSend === '') return;
  
    setLoading(true);
    const updatedHistory = [...chatHistory, { role: 'user', content: messageToSend }];
    setChatHistory(updatedHistory);
    saveChatHistory(updatedHistory);
  
    console.log("Sending message:", messageToSend); // Check the prompt being sent
  
    if (!firstMessageSent) {
      setShowLoadingModal(true);
      setFirstMessageSent(true);
    }
  
    try {
      const response = await fetch('https://agrotech-api.onrender.com/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: messageToSend }),
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
        // Log the updated chat history for debugging
        console.log("Updated chat history:", updatedAssistantHistory);

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

  const handlePromptSelect = (prompt) => {
    console.log("Selected prompt:", prompt);
    setUserPrompt(prompt); // Set the selected prompt in the input field
    sendMessage(prompt); // Send the selected pre-made prompt
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
    setShowLoadingModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 p-6 flex items-center justify-center bg-cover bg-center mt-16" 
    >
      <div className="w-full max-w-4xl bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-lg overflow-hidden">
        <div className="border-b border-green-200 p-4">
          <h1 className="text-3xl font-bold text-green-800 text-center">AgroTech AI ChatBot</h1>
        </div>
        <div className="p-6">
          <div className="h-[60vh] overflow-y-auto pr-4" ref={chatHistoryRef}>
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`flex items-start mb-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                  <div className={`p-2 rounded-full ${message.role === 'user' ? 'bg-green-600' : 'bg-green-800'}`}>
                    {message.role === 'user' ? <FaUser className="text-white" /> : <FaRobot className="text-white" />}
                  </div>
                  <div
                    className={`p-3 rounded-lg max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-green-600 text-white rounded-tr-none'
                        : 'bg-green-100 text-green-800 rounded-tl-none'
                    }`}
                    dangerouslySetInnerHTML={{ __html: message.content }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-green-200 p-4">
          <div className="flex w-full items-center space-x-2">
            <input
              type="text"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask AgroTech-AI ChatBot..."
              className="flex-1 p-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button 
              onClick={sendMessage} 
              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg flex items-center justify-center transition-colors duration-200"
            >
              <FaPaperPlane className="mr-2" />
              Send
            </button>
          </div>
          <div className="mt-4">
            {preMadePrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptSelect(prompt)}
                className="bg-green-300 hover:bg-green-400 text-green-800 dark:bg-green-700 dark:hover:bg-green-600 dark:text-green-100 p-2 rounded-lg m-1 transition-colors duration-200"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {showLoadingModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-2xl p-6 max-w-sm w-full m-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-green-800">Your AI Agent is on the way...</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-center text-gray-600">
                The model may take <strong>1 - 2 minutes</strong> to load. Please be patient!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
