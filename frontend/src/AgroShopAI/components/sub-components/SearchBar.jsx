import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate(); // Initialize navigate
    const debounceDelay = 300; // Delay in milliseconds
    const timeoutRef = useRef(null); // Ref to store the timeout

    // Close dropdown if clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle input change and search
    const handleChange = (e) => {
        setQuery(e.target.value);
        setIsDropdownOpen(true);

        // Clear previous timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set a new timeout to trigger the search
        timeoutRef.current = setTimeout(() => {
            handleSearch(e.target.value);
        }, debounceDelay);
    };

    const handleSearch = async (searchQuery) => {
        if (!searchQuery) {
            setResults([]);
            setIsDropdownOpen(false);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}api/search?query=${searchQuery}`);
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setResults([]);
        }
        setLoading(false);
    };

    // Handle click on a search result
    const handleResultClick = (productId) => {
        // Redirect to the product details page using the product ID
        navigate(`/agroshop/product/${productId}`);
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    return (
        <div className="relative flex-1 mx-4 hidden md:flex">
            {/* Search Input and Button */}
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-l-md focus:outline-none text-black"
            />
            <button
                onClick={() => handleSearch(query)} // Allow manual search
                disabled={!query || loading}
                className="bg-white text-green-600 px-4 rounded-r-md hover:bg-gray-200"
            >
                {loading ? 'Searching...' : 'Search'}
            </button>

            {/* Dropdown for Search Results */}
            {isDropdownOpen && results.length > 0 && (
                <div
                    ref={dropdownRef}
                    className="absolute top-full left-0 mt-2 w-full bg-white text-black rounded-lg shadow-lg transition-all duration-200"
                >
                    {loading ? (
                        <p className="text-center text-gray-500 py-2">Loading...</p>
                    ) : (
                        results.map((product) => (
                            <div
                                key={product._id}
                                className="flex items-center p-4 border-b border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleResultClick(product._id)} // Handle click
                            >
                                {/* Display the first image */}
                                {product.images && product.images[0] && (
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-16 h-16 rounded-md mr-4 object-cover"
                                    />
                                )}
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-semibold">{product.name}</h3>
                                    <span className="text-gray-600 text-sm">{product.brand?.name || 'Unknown Brand'}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
