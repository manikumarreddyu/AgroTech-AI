import React from 'react'

const Nav = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="bg-gray-200 p-4">
      <ul className="flex space-x-4">
        <li>
          <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'font-bold' : ''}>
            Dashboard
          </button>
        </li>
        <li>
          <button onClick={() => setActiveTab('products')} className={activeTab === 'products' ? 'font-bold' : ''}>
            Products
          </button>
        </li>
        <li>
          <button onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? 'font-bold' : ''}>
            Orders
          </button>
        </li>
        <li>
          <button onClick={() => setActiveTab('analytics')} className={activeTab === 'analytics' ? 'font-bold' : ''}>
            Analytics
          </button>
        </li>

        <li>
          <button onClick={() => setActiveTab('settings')} className={activeTab === 'settings' ? 'font-bold' : ''}>
            Settings
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
