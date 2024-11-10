export default function Header() {
  return (
    <header className="bg-green-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <img
            src="/assets/logo.png"
            alt="AgroShop Logo"
            className="w-8 h-8 object-cover rounded-full"
          />
          <h1 className="text-3xl font-bold">AgroShop</h1>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 text-lg">
          <a href="/" className="hover:text-green-300 transition duration-200 ease-in-out">Home</a>
          <a href="/products" className="hover:text-green-300 transition duration-200 ease-in-out">Products</a>
          <a href="/about" className="hover:text-green-300 transition duration-200 ease-in-out">About Us</a>
          <a href="/contact" className="hover:text-green-300 transition duration-200 ease-in-out">Contact</a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button className="text-white text-2xl">
            <i className="fa fa-bars"></i>
          </button>
        </div>
      </div>
    </header>
  )
}
