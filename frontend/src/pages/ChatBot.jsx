import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css'; // Ensure this file includes the styles

function ChatBot() {
  const [userPrompt, setUserPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatHistoryRef = useRef(null); // Reference for scrolling
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const sendMessage = async () => {
    if (userPrompt.trim() === '') return;

    // Add the user's message to the chat history
    setChatHistory((prevHistory) => [...prevHistory, { role: 'user', content: userPrompt }]);

    // Send the prompt to the backend
    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userPrompt }),
    });

    const data = await response.json();
    if (data.response) {
      // Format the assistant's response as bullet points and headings
      const formattedResponse = data.response
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold the text for headings
        .replace(/\d\.\s/g, '<li>') // Add list item tags for numbered points
        .replace(/\n/g, '</li>'); // Close the list items on new lines

      // Update chat history with the assistant's response
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: 'assistant', content: formattedResponse },
      ]);
    }

    setUserPrompt(''); // Clear the input
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      sendMessage(); // Send message
    }
  };

  const scrollToBottom = () => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom(); // Auto-scroll to bottom when chat history updates
  }, [chatHistory]);

  const scrollToTop = () => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = 0; // Scroll to top of chat history
    }
  };

  // Show scroll to top button when there are messages
  useEffect(() => {
    if (chatHistory.length > 0) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  }, [chatHistory]);

  return (
    <div className='chat-container mt-10'>
      <div className='chat-history' ref={chatHistoryRef}>
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role}`}
            dangerouslySetInnerHTML={{
              __html: `<strong>${message.role === 'user' ? 'You' : 'Assistant'}:</strong> ${message.content}`,
            }}
          />
        ))}
      </div>
      {showScrollToTop && (
        <button className='scroll-to-top' onClick={scrollToTop}>↑</button>
      )}
      <div className='chat-input'>
        <input
          type="text"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          onKeyDown={handleKeyDown} // Handle enter key
          placeholder="ASK AGRIBOT..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;
