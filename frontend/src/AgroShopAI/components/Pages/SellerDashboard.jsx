import React, { useState } from "react";
import Header from "./components/Sellerheader";
import Nav from "./components/SellerNav";
import SellerDashboardPage from "./components/SellerDashboardPage";
import SellerProductManagementPage from "./components/SellerProductManagementPage";
import SellerOrderManagementPage from "./components/SellerOrderManagementPage";
import SellerAnalyticsPage from "./components/SellerAnalyticsPage";
import SellerSettingsPage from "./components/SellerSettingsPage";
import ProductEntry from "./components/productEntry";
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
        {activeTab === "add" && (
          <ProductEntry/>
          
        )}
        {activeTab === "settings" && (
          <SellerSettingsPage initialSellerData={sellerInfo} />
        )}
      </main>
    </div>
  );
}

const sellerInfo = {
  name: "Ravi Singh",
  storeName: "Swaraj Krishi Udyog",
  email: "contact@swarajkrishi.com",
  joinDate: "July 8, 2023",
  sellerId: "S99887",
  location: "Madhya Pradesh, India",
  phone: "(91) 98765 43210",
  returnPolicy: "We take pride in the quality of our products. If you are not satisfied with your order, please contact us within 24 hours of receipt. We will gladly replace the items or issue a full refund. Due to the perishable nature of our products, returns are not accepted, but we will ensure your satisfaction with the purchase.",
  shippingPolicy: "We offer free shipping on orders over ₹2000. Most orders are processed and shipped within 2-3 business days. During peak harvest seasons, this may extend to 4-5 days. We currently ship across India, with delivery times depending on the location.",
  paymentMethods: ["Credit Card", "UPI", "Amazon Pay"],
  profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlie4MsQ9pJSSKY7DoEpxn3uBAq-rT7in1sA&s',
  tagline: "Farm Fresh, Straight from the Fields",
  sellerType: "Business",
  customerService: "Monday-Saturday, 9AM-6PM IST",
  socialMedia: {
    facebook: "https://facebook.com/swarajkrishi",
    instagram: "https://instagram.com/swarajkrishi",
    twitter: "https://twitter.com/swarajkrishi",
  },
  about: "Swaraj Krishi Udyog is a family-run agricultural enterprise located in the heart of Madhya Pradesh, India. We specialize in a wide range of organic fruits, vegetables, and grains, cultivated using sustainable farming practices. Our mission is to promote healthy living by offering fresh, organic produce while contributing to a greener, cleaner environment.",
  
  policies: {
    shipping: "We offer free shipping on orders over ₹2000. Most orders are processed and shipped within 2-3 business days. During peak harvest seasons, this may extend to 4-5 days. We currently ship across India, with delivery times depending on the location.",
    returns: "We take pride in the quality of our products. If you are not satisfied with your order, please contact us within 24 hours of receipt. We will gladly replace the items or issue a full refund. Due to the perishable nature of our products, returns are not accepted, but we will ensure your satisfaction with the purchase.",
    support: "Customer support is available Monday to Saturday, 9 AM to 6 PM IST. You can reach us via email at support@swarajkrishi.com or by phone at (91) 98765 43210. We aim to respond to all queries within 24 hours."
  }
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
