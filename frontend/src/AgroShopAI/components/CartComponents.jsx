import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const CartItem = ({ index, image, title, description,size, type,color, qty, price, originalPrice, updateQuantity, deleteItem }) => (
    <div className="flex justify-between items-start mb-4 border-b border-gray-200 pb-4">
        <img alt={title} className="w-24 h-24" src={image} />
        <div className="flex-1 ml-4">
            <h2 className="font-bold">{title}</h2>
            <p>{description}</p>

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

export {CartItem, OrderSummary, PromoCodeInput};