import React from 'react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send to an API)
    alert("Message submitted!");
  };

  return (
    <div className="max-w-[1240px] mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name:</label>
          <input type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700">Subject:</label>
          <input type="text" id="subject" name="subject" className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700">Message:</label>
          <textarea id="message" name="message" className="w-full p-2 border border-gray-300 rounded" required></textarea>
        </div>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Send Message</button>
      </form>

      <div className="mb-8">
        <h3 className="text-xl font-bold">Contact Information</h3>
        <p>Email: <a href="mailto:info@agrotech.com" className="text-blue-500">info@agrotech.com</a></p>
        <p>Phone: <a href="tel:+1234567890" className="text-blue-500">+1 (234) 567-890</a></p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold">Our Location</h3>
        <p>123 AgroTech Lane, Farming City, AG 12345</p>
        <div className="h-64 w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509178!2d144.95373531531797!3d-37.81720997975197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f2bfa39%3A0xa53e5c1a03bff6b!2sAgroTech!5e0!3m2!1sen!2sus!4v1633638358298!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold">Follow Us</h3>
        <div className="flex space-x-4">
          <a href="https://facebook.com/agrotech" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com/agrotech" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://linkedin.com/company/agrotech" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://instagram.com/agrotech" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold">FAQs</h3>
        <ul className="list-disc pl-5">
          <li>What services do you provide? - We offer AI solutions for agriculture, including crop predictions and soil analysis.</li>
          <li>How can I get support? - You can reach out via our contact form or email us directly.</li>
          <li>Where are you located? - Our office is located at 123 AgroTech Lane, Farming City, AG 12345.</li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
