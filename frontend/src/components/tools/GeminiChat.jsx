import React, { useEffect, useRef, useState } from 'react';
import { Container, TextField, Button, Paper, Box, List, ListItem, ListItemText, Divider, IconButton, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import img1 from "../../assets/tp.png";

const GeminiChat = () => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState(() => {
        const savedHistory = localStorage.getItem('chatHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });
    const chatContainerRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const formatMessage = (htmlContent) => {
        return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userInput) return;

        const userMessage = { sender: "User", text: userInput };
        setChatHistory((prev) => [...prev, userMessage]);
        setUserInput("");

        try {
            const previousMessages = chatHistory.map(msg => msg.text).join("\n");
            const res = await fetch('http://localhost:8080/api/generate-content/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: "Previous Responses By You: " + previousMessages + "\nMy New Query: " + userInput + "\nNote : Give response in HTML (Tags only, only inside body content)",
                }),
            });

            if (!res.ok) {
                throw new Error(`Server error: ${res.statusText}`);
            }

            const data = await res.json();
            const responseLines = data.generatedText.split('\n');
            const contentWithoutHeading = responseLines.slice(1).join('\n'); // Skip the first line

            const botMessage = { sender: "Gemini AI", text: contentWithoutHeading };
            setChatHistory((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClearChat = () => {
        setChatHistory([]);
        localStorage.removeItem('chatHistory');
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-6 mt-14 relative"
            style={{
                backgroundImage: `url(${img1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black opacity-40 pointer-events-none"></div>
            <Container style={{ zIndex: 1, marginBottom: '2rem' }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Paper elevation={3} style={{ padding: '1.5rem', borderRadius: '8px', background:"#05B913" }}>
                        <motion.h1
                            className="m-2 text-5xl text-center font-extrabold text-white"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            Gemini AI Chat
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Box
                                ref={chatContainerRef}
                                style={{
                                    height: '60vh',
                                    overflowY: 'auto',
                                    padding: '1rem',
                                    backgroundColor: '#f1f1f1',
                                    borderRadius: '8px',
                                    marginBottom: '1rem',
                                }}
                            >
                                <List>
                                    {chatHistory.map((msg, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            style={{ marginBottom: '0.5rem' }}
                                        >
                                            <ListItem
                                                alignItems="flex-start"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: msg.sender === "User" ? 'flex-end' : 'flex-start',
                                                }}
                                            >
                                                <Paper
                                                    elevation={1}
                                                    style={{
                                                        padding: '0.01rem 1rem',
                                                        borderRadius: '5px',
                                                        backgroundColor: msg.sender === "User" ? '#05B913' : 'white',
                                                        color: msg.sender === "User" ? 'white' : 'black',
                                                        maxWidth: '70%',
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={msg.sender === "User" ? msg.text : formatMessage(msg.text)}
                                                        secondary={msg.sender === "User" ? "" : msg.sender}
                                                        secondaryTypographyProps={{
                                                            style: { color: msg.sender === "User" ? '#bbdefb' : '#757575' },
                                                        }}
                                                    />
                                                </Paper>
                                            </ListItem>
                                        </motion.div>
                                    ))}
                                </List>
                            </Box>
                        </motion.div>
                        <Divider />
                        <Stack direction="row" spacing={2} style={{ marginTop: '1rem' }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Type a message..."
                                style={{ backgroundColor: 'white', borderRadius: '4px' }}
                            />
                            <Button type="submit" variant="contained" style={{ background: "white", color: "black" }} endIcon={<SendIcon />} onClick={handleSubmit}>
                                Send
                            </Button>
                            <Button variant="contained" style={{background:"white",color:"black"}} onClick={handleClearChat}>
                                Clear
                            </Button>
                        </Stack>
                    </Paper>
                </motion.div>
                <ToastContainer />
            </Container>
        </div>
    );
};

export default GeminiChat;
