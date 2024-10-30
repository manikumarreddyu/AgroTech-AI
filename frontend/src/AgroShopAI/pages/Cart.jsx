import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, PromoCodeInput, OrderSummary } from '../components/CartComponents';
import LoginPrompt from '../components/LoginPrompt';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const CartPage = () => {
    const { isLoggedIn, userData } = useAuth(); 
    const [cartItems, setCartItems] = useState([]); 
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            if (isLoggedIn) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}api/cart/${userData}`);
                    setCartItems(response.data.cart || []);
                } catch (error) {
                    console.error("Failed to fetch cart items:", error);
                } finally {
                    console.log(cartItems)
                    setLoading(false);
                }
            }
        };
        fetchCartItems();
    }, [isLoggedIn, userData]);

    const updateQuantity = async (index, newQty) => {
        const item = cartItems[index];
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_BASE_URL}api/cart/${userData}/update`, {
                variantId: item.variantId._id, // Use variantId._id instead of itemNo
                quantity: newQty
            });
            setCartItems(prevItems =>
                prevItems.map((item, i) => (i === index ? { ...item, quantity: newQty } : item))
            );
        } catch (error) {
            console.error("Failed to update cart item quantity:", error);
        }
    };

    const deleteItem = async (index) => {
        const item = cartItems[index];
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}api/cart/${userData}/remove`, { data: { variantId: item.variantId._id } });
            setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
        } catch (error) {
            console.error("Failed to delete cart item:", error);
        }
    };

    const subtotal = cartItems.length ? cartItems.reduce((acc, item) => acc + (item.variantId.price * (1 - (item.productId.offer / 100)) * item.quantity), 0) : 0;

    if (!isLoggedIn) {
        return <LoginPrompt />;
    }

    return (
        <div className="bg-gray-800 font-sans min-h-screen">
            <div className="p-4 min-w-screen m-0">
                {loading ? (
                    <p>Loading cart...</p>
                ) : (
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="md:w-3/4 w-full bg-white p-6">
                            <h1 className="text-2xl font-bold mb-4">YOUR CART</h1>
                            {cartItems.length === 0 ? (
                                <div className="text-center text-gray-500 p-6">
                                    <p>Your cart is empty.</p>
                                    <p>Browse our products and start adding items to your cart.</p>
                                    <button 
                                        onClick={() => navigate('/agroshop')}
                                        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        Go to Shop
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="border-b-2 border-gray-200 pb-2 mb-4">
                                        <div className="flex justify-between text-gray-500">
                                            <span className="flex-1">PRODUCT</span>
                                            <span className="flex-initial w-24 text-center">PRICE</span>
                                            <span className="flex-initial w-24 text-center">TOTAL</span>
                                        </div>
                                    </div>

                                    {cartItems.map((item, index) => (
                                        <CartItem
                                            key={item.variantId._id} // Use variantId._id as the key
                                            index={index}
                                            image={item.productId.images[0]} // Assuming the first image is used
                                            title={item.productId.name} // Use productId.name for the title
                                            description={item.productId.description}

                                            size={item.variantId.size}
                                            type={item.variantId.type}
                                            color={item.variantId.color}
                                            qty={item.quantity} // Use quantity for qty
                                            price={item.variantId.price * (1 - (item.productId.offer / 100))}
                                            originalPrice={item.variantId.price}
                                            updateQuantity={updateQuantity}
                                            deleteItem={deleteItem}
                                        />
                                    ))}
                                </>
                            )}
                        </div>

                        <div className="md:w-1/4 bg-white p-6 mt-4 md:mt-0">
                            <h2 className="text-xl font-bold mb-4">SUMMARY</h2>
                            <PromoCodeInput />
                            <OrderSummary subtotal={subtotal} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
