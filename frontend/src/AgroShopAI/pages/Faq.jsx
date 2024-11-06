import React, { useState } from "react";
import { BiChevronUp } from 'react-icons/bi';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqCount, setFaqCount] = useState(5); // Show 5 FAQs initially

  const faqs = [
    {
      "question": "What types of products does AgroShop offer?",
      "answer": "AgroShop offers a wide range of products to meet all agricultural needs, including seeds, fertilizers, pesticides, soil health kits, farming tools, machinery, and crop disease prediction tools."
    },
    {
      "question": "How can I track my order?",
      "answer": "Once your order is confirmed, we’ll send a tracking link to your email or SMS. You can also log in to your AgroShop account and go to 'My Orders' to view the current status of your order."
    },
    {
      "question": "Do you offer bulk discounts?",
      "answer": "Yes, we offer bulk discounts on selected products. Contact our customer support team or check the product page for information on available bulk pricing options."
    },
    {
      "question": "How do I return a product?",
      "answer": "If you’re not satisfied with your purchase, you can initiate a return within 7 days of receiving your order. Go to 'My Orders', select the item you wish to return, and follow the return instructions provided."
    },
    {
      "question": "Can I get expert advice on which products to buy?",
      "answer": "Yes! AgroShop provides access to expert recommendations for farmers. Our team can help you select the right products for your specific crops, soil type, and climate."
    },
    {
      "question": "What payment options are available?",
      "answer": "We accept multiple payment methods including credit/debit cards, net banking, UPI, and popular mobile wallets for a seamless checkout experience."
    },
    {
      "question": "Do you deliver to rural areas?",
      "answer": "Yes, AgroShop is committed to serving farmers across urban and rural areas. We deliver nationwide, ensuring that farmers everywhere have access to quality agricultural products."
    },
    {
      "question": "Are the products on AgroShop certified?",
      "answer": "Yes, we only offer products from certified suppliers to ensure quality and reliability. Each product listing includes certification details for your reference."
    },
    {
      "question": "Can I cancel my order?",
      "answer": "You can cancel your order before it is shipped by going to 'My Orders' and selecting the cancel option. Once shipped, cancellation may not be available."
    },
    {
      "question": "How does AgroShop handle product quality issues?",
      "answer": "If you encounter any quality issues with your purchase, please reach out to our support team. We will assist you with a return or exchange based on the situation."
    },
    {
      "question": "Does AgroShop offer any loyalty or reward program?",
      "answer": "Yes, AgroShop has a loyalty program where you earn points on every purchase. These points can be redeemed for discounts on future orders."
    },
    {
      "question": "Can I set up a subscription for recurring products like fertilizers?",
      "answer": "Yes, we offer a subscription service for products you need regularly, such as fertilizers and seeds. Choose the subscription option on the product page to set your delivery frequency."
    },
    {
      "question": "How can I contact customer support?",
      "answer": "You can reach our customer support team via phone, email, or live chat on our website. Our team is available to assist you Monday to Saturday from 9 AM to 6 PM."
    }
  ]
  
  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const loadMoreFAQs = () => {
    setFaqCount(prevCount => Math.min(prevCount + 3, faqs.length)); // Load 3 more FAQs but not exceed total FAQs
  };

  return (
    <div className="bg-green-100 w-full py-2">

    <section className="">
  <div className="max-w-4xl mx-auto px-4 bg-white py-16 rounded-lg">
    <h2 className="text-3xl md:text-4xl mb-10 font-bold text-green-600 text-center">
      Frequently Asked Questions
    </h2>
    <dl className="space-y-4">
      {faqs.slice(0, faqCount).map((faq, index) => (
        <div key={index} className="transition-transform duration-300 group">
          <div className="rounded-lg border border-green-300 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <button
              onClick={() => handleToggle(index)}
              className="flex justify-between items-center w-full p-4 text-lg font-semibold text-green-700 bg-gradient-to-r from-green-500 to-green-700 rounded-lg text-white transition-all duration-300 hover:bg-gradient-to-l"
            >
              <span>{faq.question}</span>
              <BiChevronUp
                className={`w-5 h-5 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
          <div
            className={`overflow-hidden transition-all duration-600 transform ${
              activeIndex === index ? 'max-h-[500px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'
            }`}
            style={{ transitionProperty: 'max-height, opacity, transform' }}
          >
            <div className="mt-2 p-4 rounded-lg bg-green-50 text-green-800">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </dl>
    {faqCount < faqs.length && (
      <div className="text-center mt-8">
        <button
          onClick={loadMoreFAQs}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-green-700 hover:scale-105 shadow-md"
        >
          Load More FAQs
        </button>
      </div>
    )}
  </div>
</section>
    </div>

  );
};

export default FAQ;
