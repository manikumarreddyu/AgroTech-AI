import React, { useState } from "react";
import Header from "./components/Sellerheader";
import Nav from "./components/SellerNav";
import SellerDashboardPage from "./components/SellerDashboardPage";
import SellerProductManagementPage from "./components/SellerProductManagementPage";
import SellerOrderManagementPage from "./components/SellerOrderManagementPage";
import SellerAnalyticsPage from "./components/SellerAnalyticsPage";
import SellerSettingsPage from "./components/SellerSettingsPage";

export default function SellerAccountPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState(initialProducts);
  const [orders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedProduct, setExpandedProduct] = useState(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: "New Product",
      price: 0,
      stock: 0,
    };
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const toggleProductExpansion = (id) => {
    setExpandedProduct(expandedProduct === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Nav activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="p-4">
        {activeTab === "dashboard" && (
          <SellerDashboardPage
            sellerInfo={sellerInfo}
            products={products}
            orders={orders}
          />
        )}
        {activeTab === "products" && (
          <SellerProductManagementPage
            products={filteredProducts}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleAddProduct={handleAddProduct}
            handleDeleteProduct={handleDeleteProduct}
            expandedProduct={expandedProduct}
            toggleProductExpansion={toggleProductExpansion}
          />
        )}
        {activeTab === "orders" && (
          <SellerOrderManagementPage orders={orders} />
        )}
        {activeTab === "analytics" && <SellerAnalyticsPage />}
        {activeTab === "settings" && (
          <SellerSettingsPage sellerInfo={sellerInfo} />
        )}
      </main>
    </div>
  );
}

const sellerInfo = {
  name: "Ravi Singh",
  storeName: "Fitness Pro",
  email: "ravi.singh@example.com",
  joinDate: "July 8, 2023",
  sellerId: "S99887",
  location: "Chennai, India",
  phone: "+91 9876543255",
  returnPolicy: "Returns accepted within 30 days for unused items",
  shippingPolicy:
    "Free shipping on orders over ₹2500, ships in 2 business days",
  paymentMethods: ["Credit Card", "UPI", "Amazon Pay"],
};

const initialProducts = [
  { id: 1, name: "Organic Tomatoes", price: 2.99, stock: 100 },
  { id: 2, name: "Fresh Lettuce", price: 1.99, stock: 50 },
  { id: 3, name: "Free-range Eggs", price: 3.99, stock: 200 },
];

const initialOrders = [
  { id: 1, date: "2024-03-01", status: "Shipped", total: 29.99 },
  { id: 2, date: "2024-02-28", status: "Processing", total: 15.99 },
  { id: 3, date: "2024-02-27", status: "Delivered", total: 45.99 },
];
