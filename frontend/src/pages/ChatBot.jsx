import React, { useState, useRef, useEffect } from 'react';

function ChatBot() {
  const [userPrompt, setUserPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatHistoryRef = useRef(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const sendMessage = async () => {
    if (userPrompt.trim() === '') return;

    setChatHistory((prevHistory) => [...prevHistory, { role: 'user', content: userPrompt }]);

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

      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: 'assistant', content: formattedResponse },
      ]);
    }

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
    setShowScrollToTop(chatHistory.length > 0);
  }, [chatHistory]);

  return (
    <div className='max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8'>
      <h1 className="text-2xl text-center text-green-500 font-bold ">AgroTech AI ChatBot</h1>
      <div
        className='flex flex-col overflow-y-auto p-2 border-2 border-green-500 rounded-lg mt-6 mb-2'
        ref={chatHistoryRef}
      >
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`p-2 m-1 rounded-xl w-fit max-w-[80%] text-white ${
              message.role === 'user'
                ? 'bg-green-600 self-start rounded-tr-none'
                : 'bg-green-600 self-end rounded-tl-none'
            }`}
            dangerouslySetInnerHTML={{
              __html: `<strong>${message.role === 'user' ? 'You' : 'Assistant'}:</strong> ${message.content}`,
            }}
          />
        ))}
      </div>

      <div className='flex items-center bg-green-500 p-2 rounded-lg'>
        <input
          type='text'
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Ask AgroTech-AI ChatBot...'
          className='flex-1 p-2 bg-white text-black border-2 border-green-600 rounded-lg outline-none'
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


