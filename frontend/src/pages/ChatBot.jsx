import React, { useState, useRef, useEffect } from 'react';

function ChatBot() {
  const [userPrompt, setUserPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatHistoryRef = useRef(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const sendMessage = async () => {
    if (userPrompt.trim() === '') return;

    setChatHistory((prevHistory) => [...prevHistory, { role: 'user', content: userPrompt }]);

    const response = await fetch('http://localhost:5000/AgroTech-AI_Bot', {
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

  const scrollToTop = () => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    setShowScrollToTop(chatHistory.length > 0);
  }, [chatHistory]);

  return (
    <div className='flex flex-col h-screen bg-green-600 p-5 mt-10'>
      <div
        className='flex-1 overflow-y-auto p-2 border border-green-700 rounded-lg mb-2'
        ref={chatHistoryRef}
      >
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`p-2 m-1 rounded-xl w-fit max-w-[80%] text-white ${
              message.role === 'user'
                ? 'bg-green-600 self-end rounded-tr-none'
                : 'bg-green-800 self-start rounded-tl-none'
            }`}
            dangerouslySetInnerHTML={{
              __html: `<strong>${message.role === 'user' ? 'You' : 'Assistant'}:</strong> ${message.content}`,
            }}
          />
        ))}
      </div>
      {showScrollToTop && (
        <button
          className='absolute bottom-5 right-5 bg-green-600 text-white rounded-lg p-2 cursor-pointer hover:bg-green-500 z-10'
          onClick={scrollToTop}
        >
          ↑
        </button>
      )}
      <div className='flex items-center bg-green-800 p-2 rounded-lg'>
        <input
          type='text'
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='ASK AGRIBOT...'
          className='flex-1 p-2 bg-green-700 text-white border border-green-600 rounded-lg outline-none'
        />
        <button
          className='bg-green-600 text-white p-2 rounded-lg ml-2 cursor-pointer hover:bg-green-500'
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
