import { useEffect } from 'react';

const AiChatbot = () => {
    useEffect(() => {
        // Set up the configuration for the embedded chatbot
        window.embeddedChatbotConfig = {
            chatbotId: 'gFGhyBh-VR7_Q-8VPs_i6',
            domain: 'www.chatbase.co',
        };

        // Load the chatbot script
        const script = document.createElement('script');
        script.src = 'https://www.chatbase.co/embed.min.js';
        script.async = true;
        script.defer = true;
        script.setAttribute('chatbotId', 'gFGhyBh-VR7_Q-8VPs_i6');
        script.setAttribute('domain', 'www.chatbase.co');
        document.body.appendChild(script);

        // Cleanup script on unmount
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null; // No visual component; just loading the script
};

export default AiChatbot;
