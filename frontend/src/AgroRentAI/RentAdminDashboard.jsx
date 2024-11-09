import React, { useState, useEffect } from "react";
import { User, BarChart, Box, Package, Bell } from "lucide-react";
import ProductManagement from "./components/AdminProductManagement";
import OrderManagement from "./components/AdminOrderManagement";
import UserManagement from "./components/AdminUserManagement";
import Analytics from "./components/AdminAnalytics";


const RentAdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("Product Management");
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

  // Dummy data based on the schema
  const fetchProducts = async () => {
    return [
      {
        _id: '1',
        name: 'Tractor',
        description: 'Heavy-duty tractor for large farm operations',
        price: 30000,
        image: 'tractor.jpg',
        category: ['Heavy Machinery'],
        availabilityStatus: 'available',
        rentalPricePerDay: 200,
        rentalDurationOptions: ['daily', 'weekly'],
        maxRentalDuration: 30,
        depositAmount: 1000,
        rentalTerms: 'Damage costs will be deducted from the deposit.',
        rentedQuantity: 2,
        reviews: [
          { rentalId: '1', rating: 5, comment: 'Great tractor!' },
        ],
        rating: 5,
      },
      {
        _id: '2',
        name: 'Lawn Mower',
        description: 'Electric lawn mower suitable for small gardens',
        price: 500,
        image: 'lawnmower.jpg',
        category: ['Gardening'],
        availabilityStatus: 'available',
        rentalPricePerDay: 20,
        rentalDurationOptions: ['hourly', 'daily'],
        maxRentalDuration: 7,
        depositAmount: 50,
        rentalTerms: 'Return in good condition.',
        rentedQuantity: 5,
        reviews: [
          { rentalId: '2', rating: 4, comment: 'Very useful!' },
        ],
        rating: 4,
      }
    ];
  };

  const fetchOrders = async () => {
    return [
      {
        rentalId: '1',
        product: 'Tractor',
        quantity: 1,
        rentalDuration: 'weekly',
        rentalDate: '2024-11-01',
        returnDate: '2024-11-08',
        status: 'ongoing',
      },
      {
        rentalId: '2',
        product: 'Lawn Mower',
        quantity: 2,
        rentalDuration: 'daily',
        rentalDate: '2024-11-05',
        returnDate: '2024-11-06',
        status: 'returned',
      },
    ];
  };

  const fetchUsers = async () => {
    return [
      {
        _id: 'u1',
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'john@example.com',
        address: '123 Farm Lane',
        role: 'farmer',
        isVerified: true,
        rentals: [
          {
            rentalId: '1',
            product: 'Tractor',
            quantity: 1,
            rentalDuration: 'weekly',
            rentalDate: '2024-11-01',
            returnDate: '2024-11-08',
            status: 'ongoing',
          },
        ],
        wishlist: [],
        cart: [],
      },
      {
        _id: 'u2',
        firstName: 'Jane',
        lastName: 'Smith',
        username: 'janesmith',
        email: 'jane@example.com',
        address: '456 Garden Blvd',
        role: 'customer',
        isVerified: false,
        rentals: [
          {
            rentalId: '2',
            product: 'Lawn Mower',
            quantity: 2,
            rentalDuration: 'daily',
            rentalDate: '2024-11-05',
            returnDate: '2024-11-06',
            status: 'returned',
          },
        ],
        wishlist: [],
        cart: [],
      }
    ];
  };

  const fetchAnalytics = async () => {
    return {
      popularProducts: ['Tractor', 'Lawn Mower'],
      revenue: '$1200',
      rentalFrequency: ['Daily', 'Weekly'],
      userBehavior: ['Frequently rented Tractor and Lawn Mower'],
    };
  }

  const handleAddProduct =()=> {
      return
  }

  const handleUpdateProduct =()=> {
      return
  }

  const handleDeleteProduct =()=>{
    return
  }

  const handleOrderApproval = () => {
    return
  }


  const renderSectionContent = () => {
    switch (activeSection) {
      case "Product Management":
        return <ProductManagement products={products} onAddProduct={handleAddProduct} onUpdateProduct={handleUpdateProduct} onDeleteProduct={handleDeleteProduct} />;
      case "Order Management":
        return <OrderManagement orders={orders} onOrderApproval={handleOrderApproval} />;
      case "User Management":
        return <UserManagement users={users} />;
      case "Analytics & Reporting":
        return <Analytics />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-1/4 bg-green-50 p-6 mt-14">
        <h2 className="text-2xl font-extrabold tracking-tight text-green-900 mb-6">
          Admin Dashboard
        </h2>
        <ul className="space-y-4">
          <li className="cursor-pointer" onClick={() => setActiveSection("Product Management")}>
            <Box className="inline mr-2" /> Product Management
          </li>
          <li className="cursor-pointer" onClick={() => setActiveSection("Order Management")}>
            <Package className="inline mr-2" /> Order Management
          </li>
          <li className="cursor-pointer" onClick={() => setActiveSection("User Management")}>
            <User className="inline mr-2" /> User Management
          </li>
          <li className="cursor-pointer" onClick={() => setActiveSection("Analytics & Reporting")}>
            <BarChart className="inline mr-2" /> Analytics & Reporting
          </li>
        </ul>
      </aside>
  
      <main className="w-3/4 bg-white p-8">
        <h2 className="text-2xl font-bold text-green-500 mb-4">
          {activeSection}
        </h2>
        {renderSectionContent()}
      </main>
    </div>
  );
  
};

export default RentAdminDashboard;
