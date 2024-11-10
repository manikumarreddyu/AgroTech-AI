import React, { useState } from 'react'


const initialNotices = [
  { id: 1, title: 'New Organic Fertilizers', content: 'Check out our latest range of organic fertilizers, now available!', date: '2024-03-10', active: true },
  { id: 2, title: 'Seasonal Seed Sale', content: 'Get 20% off on all vegetable seeds this week.', date: '2024-03-08', active: true },
  { id: 3, title: 'Farming Workshop', content: 'Join our expert-led workshop on sustainable farming practices this Saturday.', date: '2024-03-05', active: false },
  { id: 4, title: 'New Irrigation Systems', content: 'Explore our new range of water-efficient irrigation systems.', date: '2024-03-03', active: true },
  { id: 5, title: 'Pest Control Webinar', content: 'Register for our upcoming webinar on organic pest control methods.', date: '2024-03-01', active: true },
]

// Dummy data for featured products
const featuredProducts = [
  { id: 1, name: 'Organic Tomato Seeds', price: '$4.99', image: '/placeholder.svg?height=100&width=100' },
  { id: 2, name: 'Premium Soil Mix', price: '$19.99', image: '/placeholder.svg?height=100&width=100' },
  { id: 3, name: 'Eco-Friendly Pesticide', price: '$24.99', image: '/placeholder.svg?height=100&width=100' },
  { id: 4, name: 'Garden Tool Set', price: '$49.99', image: '/placeholder.svg?height=100&width=100' },
]

export default function Notification() {
  const [notices, setNotices] = useState(initialNotices)
  const [newNotice, setNewNotice] = useState({ title: '', content: '', date: '' })
  const [isAdmin, setIsAdmin] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewNotice(prev => ({ ...prev, [name]: value }))
  }

  const addNotice = () => {
    if (newNotice.title && newNotice.content && newNotice.date) {
      setNotices(prev => [
        { id: prev.length + 1, ...newNotice, active: true },
        ...prev,
      ])
      setNewNotice({ title: '', content: '', date: '' })
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
    }
  }

  const toggleNoticeStatus = (id) => {
    setNotices(prev =>
      prev.map(notice =>
        notice.id === id ? { ...notice, active: !notice.active } : notice
      )
    )
  }

  const deleteNotice = (id) => {
    setNotices(prev => prev.filter(notice => notice.id !== id))
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Agroshop</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Products</a></li>
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="bg-green-100 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-4">Welcome to Agroshop</h2>
          <p className="text-xl text-green-700 mb-8">Your one-stop shop for all agricultural needs</p>
          <a href="#" className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300">Shop Now</a>
        </div>
      </div>

      <main className="container mx-auto p-4">
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {isAdmin ? 'Switch to User View' : 'Switch to Admin View'}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Latest Notices</h2>
            {isAdmin && (
              <div className="mb-8 bg-green-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Add New Notice</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="title"
                    value={newNotice.title}
                    onChange={handleInputChange}
                    placeholder="Notice Title"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <textarea
                    name="content"
                    value={newNotice.content}
                    onChange={handleInputChange}
                    placeholder="Notice Content"
                    className="w-full p-2 border border-gray-300 rounded"
                    rows={4}
                  ></textarea>
                  <input
                    type="date"
                    name="date"
                    value={newNotice.date}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <button
                    onClick={addNotice}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Add Notice
                  </button>
                </div>
              </div>
            )}
            <div className="space-y-4">
              {notices
                .filter(notice => isAdmin || notice.active)
                .map(notice => (
                  <div key={notice.id} className="border border-gray-200 p-4 rounded shadow-sm bg-white">
                    <h3 className="text-lg font-semibold">{notice.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">Posted on: {notice.date}</p>
                    <p className="mb-2">{notice.content}</p>
                    {isAdmin && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleNoticeStatus(notice.id)}
                          className={`px-3 py-1 rounded text-white ${
                            notice.active ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
                          }`}
                        >
                          {notice.active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => deleteNotice(notice.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredProducts.map(product => (
                <div key={product.id} className="border border-gray-200 p-4 rounded shadow-sm bg-white">
                  <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2 rounded" />
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-green-600 font-bold">{product.price}</p>
                  <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-green-800 text-white mt-12 py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Agroshop</h3>
            <p>Your trusted partner in agricultural solutions. We provide high-quality products and expert advice for all your farming needs.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Our Products</a></li>
              <li><a href="#" className="hover:underline">Farming Tips</a></li>
              <li><a href="#" className="hover:underline">Sustainability</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>123 Farm Road, Greenville, AG 12345</p>
            <p>Phone: (555) 123-4567</p>
            <p>Email: info@agroshop.com</p>
          </div>
        </div>
      </footer>

      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg">
          New notice added successfully!
        </div>
      )}
    </div>
  )
}