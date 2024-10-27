import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const CartPage = () => {
    // State to manage cart items
    const [cartItems, setCartItems] = useState([
        {
            image: "https://m.media-amazon.com/images/I/516L-SkxinL._SL1007_.jpg",
            title: "Basil Seeds",
            description: "High-quality basil seeds ideal for home gardening and culinary use.",
            itemNo: "67190cc7bf4fd76a51b41a1c",
            size: "1",
            type: true,
            color: "Green",
            qty: 2,
            price: 380,
            originalPrice: 540,
        },
        {
            image: "https://m.media-amazon.com/images/I/51-vLPhInnL._SL1000_.jpg",
            title: "Pumpkin Seeds",
            description: "Harvest Seeds Pvt Ltd - High-quality pumpkin seeds.",
            itemNo: "67190cc7bf4fd76a51b41a1d",
            size: "Size 1",
            color: "Orange",
            qty: 1,
            price: 270,
            originalPrice: 300,
        },
        {
            image: "https://m.media-amazon.com/images/I/71Jr4-H19wL._SL1100_.jpg",
            title: "Lettuce Seeds",
            description: "Fresh Harvest Pvt Ltd - Premium lettuce seeds.",
            itemNo: "67190cc7bf4fd76a51b41a1e",
            size: "Size 1",
            color: "Green",
            qty: 1,
            price: 225,
            originalPrice: 250,
        },
        // Add more items as needed
    ]);

    // Function to update quantity
    const updateQuantity = (index, newQty) => {
        setCartItems(prevItems =>
            prevItems.map((item, i) => (i === index ? { ...item, qty: newQty } : item))
        );
    };

    // Function to delete item
    const deleteItem = (index) => {
        setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    // Calculate subtotal
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

    return (
        <div className="bg-gray-800 font-sans min-h-screen">
            <div className="p-4 min-w-screen m-0">
                <div className="flex flex-col md:flex-row justify-between ">
                    <div className="md:w-3/4 w-full bg-white p-6">
                        <h1 className="text-2xl font-bold mb-4">YOUR CART</h1>
                        <div className="border-b-2 border-gray-200 pb-2 mb-4">
                            <div className="flex justify-between text-gray-500">
                                <span className="flex-1">PRODUCT</span>
                                <span className="flex-initial w-24 text-center">PRICE</span>
                                <span className="flex-initial w-24 text-center">TOTAL</span>
                            </div>
                        </div>

                        {cartItems.map((item, index) => (
                            <CartItem
                                key={item.itemNo}
                                index={index}
                                image={item.image}
                                title={item.title}
                                description={item.description}
                                itemNo={item.itemNo}
                                size={item.size}
                                type = {item.type}
                                color={item.color}
                                qty={item.qty}
                                price={item.price}
                                originalPrice={item.originalPrice}
                                updateQuantity={updateQuantity}
                                deleteItem={deleteItem} // Pass the delete function
                            />
                        ))}
                    </div>

                    <div className="md:w-1/4 bg-white p-6 mt-4 md:mt-0 ">
                        <h2 className="text-xl font-bold mb-4">SUMMARY</h2>
                        <PromoCodeInput />
                        <OrderSummary subtotal={subtotal} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const CartItem = ({ index, image, title, description, itemNo, size, type,color, qty, price, originalPrice, updateQuantity, deleteItem }) => (
    <div className="flex justify-between items-start mb-4 border-b border-gray-200 pb-4">
        <img alt={title} className="w-24 h-24" src={image} />
        <div className="flex-1 ml-4">
            <h2 className="font-bold">{title}</h2>
            <p>{description}</p>
            <p>ITEM NO: {itemNo}</p>
            <p>SIZE: {size} {type ? "Kg" : "L"}</p>
            <p>COLOR: {color}</p>
            <p>QTY: 
                    <button onClick={() => updateQuantity(index, Math.max(1, qty - 1))} className="text-red-500 mx-2">-</button>
                    <span className="mx-2">{qty}</span>
                    <button onClick={() => updateQuantity(index, qty + 1)} className="text-green-500 mx-2">+</button>
              
            </p>
            <div className="flex space-x-4 text-gray-500">
                <button onClick={() => deleteItem(index)} className="hover:text-red-500">
                    <FontAwesomeIcon icon={faTrashAlt} /> {/* Trash Can Icon */}
                </button>
            </div>
        </div>
        <div className="flex flex-col items-end text-right w-24"> {/* Width set for alignment */}
            {originalPrice && (
                <p className="line-through text-gray-400">₹{originalPrice.toFixed(2)}</p>
            )}
            <p className="font-bold">₹{price.toFixed(2)}</p>
        </div>
        <div className="flex flex-col items-end text-right w-24"> {/* Width set for alignment */}
            <p className="font-bold">₹{(price * qty).toFixed(2)}</p> {/* Calculate total */}
        </div>
    </div>
);

const PromoCodeInput = () => (
    <div className="mb-4">
        <label className="block text-gray-500 mb-2" htmlFor="promo-code">
            Do you have a promo code?
        </label>
        <div className="flex flex-wrap">
            <input
                className="border border-gray-300 p-2 flex-1 min-w-0" // Added 'min-w-0' to prevent overflow
                id="promo-code"
                placeholder="Enter code"
                type="text"
            />
            <button className="bg-black text-white p-2 ml-2">
                APPLY
            </button>
        </div>
    </div>
);

const OrderSummary = ({ subtotal }) => (
    <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between mb-2">
            <span>SUBTOTAL</span>
            <span className="font-bold">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span className="text-gray-500">TBD</span>
        </div>
        <div className="flex justify-between mb-4">
            <span>
                Sales Tax
                <i className="fas fa-info-circle"></i>
            </span>
            <span className="text-gray-500">TBD</span>
        </div>
        <div className="flex justify-between mb-4">
            <span className="font-bold">ESTIMATED TOTAL</span>
            <span className="font-bold">₹{subtotal.toFixed(2)}</span> {/* You can calculate the total here as well */}
        </div>
        <button className="bg-black text-white w-full py-2">CHECKOUT</button>
        <p className="text-gray-500 text-sm mt-4">Need help? Call us at 1-877-707-6272</p>
    </div>
);

export default CartPage;
