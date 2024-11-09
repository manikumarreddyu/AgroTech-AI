import React from 'react'

function GiftTest() {
  return (
    <div>
       {/* Testimonials */}
       <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-green-800">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: 'Sarah L.', text: 'The AgroShop gift card was the perfect present for my gardening-obsessed friend!', avatar: '/placeholder.svg?height=50&width=50' },
              { name: 'Mike T.', text: 'I love the flexibility of the gift card. I was able to get exactly what I needed for my vegetable garden.', avatar: '/placeholder.svg?height=50&width=50' },
              { name: 'Emily R.', text: 'The gift card process was smooth, and I received excellent customer service when I had questions.', avatar: '/placeholder.svg?height=50&width=50' },
              { name: 'David K.', text: 'AgroShop has become my go-to for all things gardening. The gift card is a great way to share the love!', avatar: '/placeholder.svg?height=50&width=50' },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </section>
    </div>
  )
}

export default GiftTest