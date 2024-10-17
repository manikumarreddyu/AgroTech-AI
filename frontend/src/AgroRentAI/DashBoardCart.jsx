import { useState } from 'react'
import { Calendar, ChevronDown, ChevronUp, DollarSign, Package, Search, ShoppingCart, Star, TrendingUp, Menu, X } from 'lucide-react'

const rentalHistory = [
    { id: 'R1001', item: 'Tractor', startDate: '2024-01-01', endDate: '2024-01-07', cost: 499.99 },
    { id: 'R1002', item: 'Harvester', startDate: '2024-02-10', endDate: '2024-02-17', cost: 799.50 },
    { id: 'R1003', item: 'Plough', startDate: '2024-03-05', endDate: '2024-03-10', cost: 199.99 },
    { id: 'R1004', item: 'Seed Drill', startDate: '2024-04-12', endDate: '2024-04-18', cost: 299.00 },
    { id: 'R1005', item: 'Fertilizer Spreader', startDate: '2024-05-05', endDate: '2024-05-12', cost: 149.75 },
  ];
  
  const analytics = {
    totalRentals: 25,
    totalSpent: 2947.23,
    averageRentalDuration: 6.8,
    topCategory: 'Agricultural Equipment'
  }
  
  const checkoutList = [
    { id: 'C1001', item: 'Combine Harvester', startDate: '2024-06-01', endDate: '2024-06-07', cost: 999.99 },
    { id: 'C1002', item: 'Sprayer', startDate: '2024-06-10', endDate: '2024-06-15', cost: 249.99 },
    { id: 'C1003', item: 'Baler', startDate: '2024-06-18', endDate: '2024-06-25', cost: 349.50 },
  ];

export default function Component() {
  const [activeTab, setActiveTab] = useState('history')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState(null)

  const toggleItemExpand = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Rental Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search rentals..."
                className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="container mx-auto px-4 py-2 flex flex-col space-y-2">
            <a href="#" className="text-gray-600 hover:text-green-500 transition-colors duration-200">Home</a>
            <a href="#" className="text-gray-600 hover:text-green-500 transition-colors duration-200">Profile</a>
            <a href="#" className="text-gray-600 hover:text-green-500 transition-colors duration-200">Settings</a>
            <div className="relative">
              <input
                type="text"
                placeholder="Search rentals..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeTab === 'history' ? 'bg-green-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            } transition-colors duration-200`}
          >
            Rental History
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeTab === 'analytics' ? 'bg-green-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            } transition-colors duration-200`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('checkout')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeTab === 'checkout' ? 'bg-green-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            } transition-colors duration-200`}
          >
            Checkout List
          </button>
        </div>

        {/* Rental History */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold p-4 border-b border-gray-200">Rental History</h2>
            {rentalHistory.map((rental) => (
              <div key={rental.id} className="border-b border-gray-200 last:border-b-0">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleItemExpand(rental.id)}
                >
                  <div className="flex items-center space-x-4">
                    <Package className="text-green-500" size={24} />
                    <div>
                      <h3 className="font-semibold">{rental.item}</h3>
                      <p className="text-sm text-gray-600">{rental.startDate} to {rental.endDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold">${rental.cost.toFixed(2)}</span>
                    {expandedItem === rental.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
                {expandedItem === rental.id && (
                  <div className="p-4 bg-gray-50">
                    <h4 className="font-semibold mb-2">Rental Details</h4>
                    <p className="text-sm text-gray-600 mb-2">Rental ID: {rental.id}</p>
                    <p className="text-sm text-gray-600 mb-2">Duration: {
                      Math.ceil((new Date(rental.endDate) - new Date(rental.startDate)) / (1000 * 60 * 60 * 24))
                    } days</p>
                    <div className="flex space-x-2 mt-4">
                      <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200">
                        Rent Again
                      </button>
                      <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200">
                        Leave Review
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Analytics */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Your Rental Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-green-100 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-green-500"><Package size={24} /></span>
                  <span className="text-2xl font-bold">{analytics.totalRentals}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Total Rentals</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-green-500"><DollarSign size={24} /></span>
                  <span className="text-2xl font-bold">${analytics.totalSpent.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Total Spent</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-yellow-500"><Calendar size={24} /></span>
                  <span className="text-2xl font-bold">{analytics.averageRentalDuration.toFixed(1)} days</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Avg. Rental Duration</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-purple-500"><Star size={24} /></span>
                  <span className="text-2xl font-bold">{analytics.topCategory}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Top Rental Category</p>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Rental Trends</h3>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <TrendingUp size={48} className="text-gray-400" />
                <span className="ml-2 text-gray-500">Trend chart placeholder</span>
              </div>
            </div>
          </div>
        )}

        {/* Checkout List */}
        {activeTab === 'checkout' && (
          <div className="bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold p-4 border-b border-gray-200">Checkout List</h2>
            {checkoutList.map((item) => (
              <div key={item.id} className="border-b border-gray-200 last:border-b-0">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <ShoppingCart className="text-green-500" size={24} />
                    <div>
                      <h3 className="font-semibold">{item.item}</h3>
                      <p className="text-sm text-gray-600">{item.startDate} to {item.endDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold">${item.cost.toFixed(2)}</span>
                    <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-200">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="p-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-xl">${checkoutList.reduce((sum, item) => sum + item.cost, 0).toFixed(2)}</span>
              </div>
              <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors duration-200">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}