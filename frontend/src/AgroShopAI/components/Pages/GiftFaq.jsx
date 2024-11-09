import React from 'react'

function GiftFaq() {
  return (
    <div>
      {/* FAQ Section */}
      <section className="bg-white p-8 rounded-xl shadow-2xl mb-12">
          <h2 className="text-3xl font-bold mb-6 text-green-700">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { question: 'How do I purchase a gift card?', answer: 'You can purchase a gift card online through our website or in-store at any of our physical locations.' },
              { question: 'Can I use my gift card for online purchases?', answer: 'Yes, gift cards can be used for both online and in-store purchases.' },
              { question: 'Do gift cards expire?', answer: 'No, our gift cards do not have an expiration date.' },
              { question: 'Can I check my gift card balance?', answer: 'Yes, you can check your balance online or by calling our customer service.' },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
    </div>
  )
}

export default GiftFaq
