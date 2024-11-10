import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa"; // Icons for toggling and search

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null); // For handling which FAQ is open
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How do I rent a product?",
      answer: "To rent a product, browse our catalog, choose the item you want, and select the rental duration.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept credit/debit cards, PayPal, and bank transfers.",
    },
    {
      question: "How do I return a product?",
      answer: "You can return the product by following the return instructions sent via email after your rental period ends.",
    },
    {
      question: "What should I do if the product is damaged?",
      answer: "If the product is damaged, please contact us immediately to arrange for repairs or a replacement.",
    },
    {
      question: "Can I track my rental order?",
      answer: "Yes, you can track your rental order status from your account dashboard.",
    },
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle open/close
  };

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gradient-to-r from-green-100 to-green-200 shadow-lg rounded-lg w-full max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold text-green-600 mb-4">Help Center & FAQ</h3>

      {/* Search Bar */}
      <div className="mb-6 flex items-center border-b border-gray-300 pb-2">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search FAQ"
          className="w-full p-2 border-none focus:outline-none text-gray-600"
        />
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 pb-4 cursor-pointer"
              onClick={() => handleToggle(index)}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-gray-800">{faq.question}</h4>
                {activeIndex === index ? (
                  <FaChevronUp className="text-gray-600" />
                ) : (
                  <FaChevronDown className="text-gray-600" />
                )}
              </div>
              {activeIndex === index && (
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No results found. Please try a different search term.</p>
        )}
      </div>
    </div>
  );
};

export default FAQ;
