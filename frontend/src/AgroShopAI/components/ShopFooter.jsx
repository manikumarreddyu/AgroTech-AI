import React from "react";
import { FaGithub, FaDiscord, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6"; // Corrected import for Twitter icon
import LOGO from "/favicon2.png";
const ShopFooter = () => {
  const socialMedia = [
    {
      Icon: FaGithub,
      link: "https://github.com/manikumarreddyu/AgroTech-AI",
      color: "#333",
    },
    { Icon: FaDiscord, link: "https://discord.gg/yRPQDDP6", color: "#7289DA" },
    {
      Icon: FaXTwitter,
      link: "https://twitter.com/YourTwitterHandle",
      color: "#1DA1F2",
    }, // Updated to FaTwitter
    {
      Icon: FaLinkedinIn,
      link: "https://www.linkedin.com/in/manikumarreddyu",
      color: "#0077B5",
    },
  ];
  return (
    <footer className="bg-green-900 text-white py-8 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* About and Office Address in one column */}
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 group transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <img
              src={LOGO}
              className="h-10 w-10 transition-transform duration-300 group-hover:rotate-12"
              alt="AgroTech AI Logo"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-white bg-clip-text text-transparent group-hover:from-lime-200 group-hover:to-white transition-all duration-300">
              AgroShop
            </span>
          </Link>
          <p className="text-sm mb-4 pl-2 pt-1">
            We are an agricultural e-commerce platform dedicated to connecting
            farmers, businesses, and consumers with the best products and
            services in the agriculture industry.
          </p>
          <h2 className="text-lg font-semibold mb-2 pl-2">Office Address</h2>
          <p className="text-sm pl-2">
            123 Agricultural Lane, Farming City, Country XYZ, 12345
          </p>
        </div>
        {/* Mail Us */}
        <div className="border-r border-gray-500 pr-3">
          <h2 className="text-lg font-semibold mb-2">Mail Us</h2>
          <p className="text-sm">
            Agro E-Commerce
            <br />
            123 Agricultural Lane, <br />
            Farming City, Country XYZ, 12345
            <br />
            Email: contact@agro-ecommerce.com
          </p>
          {/* Social Media with Icons */}
          <h2 className="text-lg font-semibold mt-4 mb-2">Follow Us</h2>
          <div className="flex space-x-4 mt-4">
            {socialMedia.map(({ Icon, link, color }, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                style={{
                  backgroundColor: "white",
                  color: color,
                  boxShadow: "0 0 0 0 rgba(255,255,255,0.7)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = color;
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.boxShadow = `0 0 0 8px rgba(255,255,255,0.3)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = color;
                  e.currentTarget.style.boxShadow =
                    "0 0 0 0 rgba(255,255,255,0.7)";
                }}
                aria-label={`Social media link ${index + 1}`}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Group Companies */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Group Companies</h2>
          <ul className="text-sm">
            <li>
              <a href="/" className="hover:underline">
                AgroTechAI
              </a>
            </li>
            <li>
              <a href="/AgroRentAI" className="hover:underline">
                AgroRent
              </a>
            </li>
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Help</h2>
          <ul className="text-sm">
            <li>
              <a href="/payment" className="hover:underline">
                Payment
              </a>
            </li>
            <li>
              <a href="/shipping" className="hover:underline">
                Shipping
              </a>
            </li>
            <li>
              <a href="/cancellation-return" className="hover:underline">
                Cancellation & Return
              </a>
            </li>
            <li>
              <a href="/agroshop/faq" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="/report" className="hover:underline">
                Report
              </a>
            </li>
          </ul>
        </div>

        {/* Consumer Policy */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Consumer Policy</h2>
          <ul className="text-sm">
            <li>
              <a href="/agroshop/cancellation-return" className="hover:underline">
                Cancellation & Return
              </a>
            </li>
            <li>
              <a href="/AgroShop/terms-of-use" className="hover:underline">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="/security" className="hover:underline">
                Security
              </a>
            </li>
            <li>
              <a href="/agroshop/privacy-policy" className="hover:underline">
                Privacy
              </a>
            </li>
            <li>
              <a href="/grievance" className="hover:underline">
                Grievance Redressal
              </a>
            </li>
            <li>
              <a href="/sitemap" className="hover:underline">
                Sitemap
              </a>
            </li>
            <li>
              <a href="/epr-compliance" className="hover:underline">
                EPR Compliance
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center border-t border-gray-400 pt-4">
        <p className="text-sm">
          &copy; 2024 Agro E-Commerce. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default ShopFooter;
