const express = require('express');
const dotenv = require("dotenv").config();
const {GoogleGenerativeAI} = require('@google/generative-ai');

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
    const { prompt } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const generatedText = await response.text();

        res.status(200).json({ generatedText });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
