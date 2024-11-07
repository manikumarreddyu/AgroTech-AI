import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash, BarChart, Bell } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toastify

const RentAdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState({
    popularProducts: [],
    revenue: '$0',
    rentalFrequency: [],
    userBehavior: [],
  });
  const ApiUrl = process.env.NODE_ENV === 'production'
    ? 'https://agrotech-ai-11j3.onrender.com'
    : 'http://localhost:8080';


  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    rating: 0,
    category: [],
  });
  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const productData = await fetchProducts();
      const orderData = await fetchOrders();
      const userData = await fetchUsers();
      const analyticsData = await fetchAnalytics();

      setProducts(productData);
      setOrders(orderData);
      setUsers(userData);
      setAnalytics(analyticsData);
    };

    fetchData();
  }, []);

  // Mock API calls
  const fetchProducts = async () => {
    return [
      { id: 1, name: 'Tractor', price: '$300', category: 'Heavy Machinery', availability: 'In Stock' },
      { id: 2, name: 'Lawn Mower', price: '$100', category: 'Gardening', availability: 'In Stock' },
    ];
  };

  const fetchOrders = async () => {
    return [
      { id: 1, item: 'Tractor', user: 'John Doe', status: 'Pending Approval', returnDate: '2024-12-01' },
      { id: 2, item: 'Lawn Mower', user: 'Jane Smith', status: 'Active', returnDate: '2024-11-15' },
    ];
  };

  const fetchUsers = async () => {
    return [
      { id: 1, name: 'John Doe', email: 'john@example.com', feedback: 'Excellent service!' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', feedback: 'Very helpful!' },
    ];
  };

  const fetchAnalytics = async () => {
    return {
      popularProducts: ['Tractor', 'Lawn Mower'],
      revenue: '$1200',
      rentalFrequency: ['Daily', 'Weekly'],
      userBehavior: ['Frequently rented Tractor and Plow'],
    };
  };

  const handleAddProduct = () => {
    setShowModal(true); // Open the modal to add a new product
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
    setNewProduct((prevState) => ({
      ...prevState,
      category: selectedCategories,
    }));
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    // Call the backend API to create a new product
    try {
      const response = await fetch(`${ApiUrl}/api/rent-products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const savedProduct = await response.json();
        setProducts([...products, savedProduct]); 
        setShowModal(false); 
        toast.success('Product added successfully!'); // Show success toast
      } else {
        console.error('Failed to add product');
        toast.error('Failed to add product. Please try again!'); // Show error toast
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error adding product. Please try again!'); // Show error toast
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal without saving
  };

  const handleUpdateProduct = (id) => {
    // Update product logic
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleOrderApproval = (id) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, status: 'Approved' } : order)));
  };

  const handleSendNotification = () => {
    // Send notification logic
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer/>
      <h1 className="text-3xl font-extrabold tracking-tight text-green-900 mb-8 mt-16">Admin Dashboard</h1>

      {/* Product Management Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl text-center text-green-500 font-bold mb-4">Product Management</h2>
        <button onClick={handleAddProduct} className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500 transition-colors duration-300 mb-4">
          <Plus className="inline w-4 h-4 mr-1" /> Add Product
        </button>
        <div>
          {products.map((product) => (
            <div key={product.id} className="flex justify-between items-center border-b py-4">
              <div>
                <p className="text-lg text-green-700">{product.name}</p>
                <p className="text-green-600">{product.price} - {product.category} - {product.availability}</p>
              </div>
              <div className="flex items-center">
                <button onClick={() => handleUpdateProduct(product.id)} className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-500 transition-colors duration-300 mr-2">
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-500 transition-colors duration-300">
                  <Trash className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Management Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl text-center text-green-500 font-bold mb-4">Order Management</h2>
        <div>
          {orders.map((order) => (
            <div key={order.id} className="flex justify-between items-center border-b py-4">
              <div>
                <p className="text-lg text-green-700">{order.item}</p>
                <p className="text-green-600">User: {order.user} - Status: {order.status} - Return Date: {order.returnDate}</p>
              </div>
              <button onClick={() => handleOrderApproval(order.id)} className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500 transition-colors duration-300">
                Approve
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 pt-4 pb-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl text-center text-green-500 font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmitProduct}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700">Image URL</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={newProduct.image}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="rating" className="block text-gray-700">Rating (0-5)</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={newProduct.rating}
                  onChange={handleInputChange}
                  min="0"
                  max="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700">Category</label>
                <select
                  multiple
                  id="category"
                  name="category"
                  value={newProduct.category}
                  onChange={handleCategoryChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Heavy Machinery">Heavy Machinery</option>
                  <option value="Gardening">Gardening</option>
                  <option value="Electronics">Electronics</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500 transition-colors duration-300">
                  Add Product
                </button>
                <button type="button" onClick={handleCloseModal} className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-400 transition-colors duration-300">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Management Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl text-center text-green-500 font-bold mb-4">User Management</h2>
        <div>
          {users.map((user) => (
            <div key={user.id} className="flex justify-between items-center border-b py-4">
              <div>
                <p className="text-lg text-green-700">{user.name}</p>
                <p className="text-green-600">Email: {user.email}</p>
                <p className="text-green-600">Feedback: {user.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics & Reporting Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl text-center text-green-500 font-bold mb-4">Analytics & Reporting</h2>
        <div>
          <p className="text-lg text-green-700">Revenue: {analytics.revenue}</p>
          <p className="text-green-700">Popular Products: {analytics.popularProducts.join(', ')}</p>
          <p className="text-green-700">Rental Frequency: {analytics.rentalFrequency.join(', ')}</p>
          <p className="text-green-700">User Behavior: {analytics.userBehavior.join(', ')}</p>
          <button className="bg-green-600 text-white px-6 py-3 mt-4 rounded-md hover:bg-green-500 transition-colors duration-300">
            <BarChart className="inline w-4 h-4 mr-1" /> View Detailed Report
          </button>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl text-center text-green-500 font-bold mb-4">Notifications</h2>
        <p className="text-green-600">Send reminders and alerts to users.</p>
        <button onClick={handleSendNotification} className="inline-block bg-green-600 text-white px-6 py-3 mt-4 rounded-md hover:bg-green-500 transition-colors duration-300">
          <Bell className="inline w-4 h-4 mr-1" /> Send Notifications
        </button>
      </div>
    </div>
  );
};

export default RentAdminDashboard;
