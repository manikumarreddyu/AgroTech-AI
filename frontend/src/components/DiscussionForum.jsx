import React, { useState, useEffect } from 'react';

const DiscussionForum = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');

    // Fetch questions from local storage (if available)
    useEffect(() => {
        const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
        setQuestions(storedQuestions);
    }, []);

    // Helper function to save questions to local storage
    const saveQuestionsToLocalStorage = (questions) => {
        localStorage.setItem('questions', JSON.stringify(questions));
    };

    // Helper function to add a new question
    const addQuestion = (content) => {
        const newQuestion = {
            id: Date.now(), // unique id
            content: content,
            answered: false,
            answer: '',
        };

        const updatedQuestions = [...questions, newQuestion];
        setQuestions(updatedQuestions);
        saveQuestionsToLocalStorage(updatedQuestions);
        setNewQuestion('');
    };

    // Helper function to add an answer to a question
    const addAnswer = (questionId, answerContent) => {
        const updatedQuestions = questions.map((question) =>
            question.id === questionId
                ? { ...question, answered: true, answer: answerContent }
                : question
        );
        setQuestions(updatedQuestions);
        saveQuestionsToLocalStorage(updatedQuestions);
    };

    // Function to render the Question Card
    const renderQuestionCard = (question) => {
        return (
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6 w-full md:w-[48%] lg:w-[30%] transition-transform transform hover:scale-105" key={question.id}>
                <p className="text-xl font-semibold text-gray-800">{question.content}</p>
                {question.answered ? (
                    <div className="mt-4 bg-white p-4 rounded-md shadow-md">
                        <h3 className="text-green-600 text-lg font-semibold">Answer:</h3>
                        <p className="text-gray-700">{question.answer}</p>
                    </div>
                ) : (
                    <AnswerForm questionId={question.id} />
                )}
            </div>
        );
    };

    // Function to render the Answer Form
    const AnswerForm = ({ questionId }) => {
        const [answer, setAnswer] = useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            if (answer.trim()) {
                addAnswer(questionId, answer);
                setAnswer('');
            }
        };

        return (
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md mt-4">
                <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Write your answer..."
                    className="w-full p-4 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
                <button
                    type="submit"
                    className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                >
                    Submit Answer
                </button>
            </form>
        );
    };

    // Function to render the Question Form
    const QuestionForm = () => {
        const handleSubmit = (e) => {
            e.preventDefault();
            if (newQuestion.trim()) {
                addQuestion(newQuestion);
            }
        };

        return (
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <textarea
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Ask your question..."
                    className="w-full p-4 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
                <button
                    onClick={handleSubmit}
                    className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                >
                    Ask Question
                </button>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-6 py-8 mt-20">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                AgroTech AI Discussion Forum
            </h1>

            <QuestionForm />

            <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Unanswered Questions</h2>
                <div className="flex flex-wrap gap-6">
                    {questions
                        .filter((question) => !question.answered)
                        .map((question) => renderQuestionCard(question))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 mt-8">Answered Questions</h2>
                <div className="flex flex-wrap gap-6">
                    {questions
                        .filter((question) => question.answered)
                        .map((question) => renderQuestionCard(question))}
                </div>
            </div>
        </div>
    );
};

export default DiscussionForum;
