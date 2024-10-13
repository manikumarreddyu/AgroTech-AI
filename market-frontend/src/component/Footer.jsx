import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-400 to-green-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              We are a leading e-commerce platform offering a wide range of products 
              at competitive prices with an exceptional user experience.
            </p>
          </div>
          
          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/shop" className="hover:underline">Shop</a></li>
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="text-sm space-y-2">
              <li>Email: <a href="mailto:support@ecommerce.com" className="hover:underline">support@ecommerce.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="hover:underline">+123-456-7890</a></li>
              <li>Address: Madhapur, Hyderabad, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-sm border-t border-white pt-4">
          <p>&copy; 2024 E-commerce Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
