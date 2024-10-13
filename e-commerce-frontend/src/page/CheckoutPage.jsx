import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckOutPage = () => {
    const [show, setShow] = useState(false);
    const [activeTab, setActiveTab] = useState("visa");

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    const handleShow = (e) => {
        e.preventDefault();
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    
    const handleOrderConfirm = () => {
        alert("Your Order is Placed Successfully");
        localStorage.removeItem("cart");
        navigate(from, { replace: true });
    }

    return (
        <div className="flex justify-center items-center bg-white h-screen">
            <button className="p-2 bg-green-500 text-white rounded-md" onClick={handleShow}>Proceed to CheckOut</button>
            <Modal show={show} onHide={handleClose} animation={false} centered>
                <div className="p-4">
                    <h5 className="px-3 mb-3 text-center">Select Your Payment Method</h5>
                    <div className="modal-content mx-auto" style={{ maxWidth: '500px', maxHeight: '80vh' }}>
                        <div className="modal-body overflow-auto" style={{ maxHeight: '70vh' }}>
                            <div className="mt-3">
                                <div className="flex justify-center mb-3">
                                    <label className="mr-4">
                                        <input 
                                            type="radio" 
                                            checked={activeTab === "visa"} 
                                            onChange={() => handleTabChange("visa")} 
                                            className="hidden" 
                                        />
                                        <span className={`inline-block p-2 rounded-full ${activeTab === "visa" ? "bg-green-500 text-white" : "bg-gray-200"}`}>Visa</span>
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            checked={activeTab === "paypal"} 
                                            onChange={() => handleTabChange("paypal")} 
                                            className="hidden" 
                                        />
                                        <span className={`inline-block p-2 rounded-full ${activeTab === "paypal" ? "bg-green-500 text-white" : "bg-gray-200"}`}>PayPal</span>
                                    </label>
                                </div>
                                {/* Contents */}
                                <div className="tab-content" id='myTabContent'>
                                    {/* Visa Content */}
                                    <div className={`tab-pane fade ${activeTab === "visa" ? "show active" : ""}`} id="visa" role="tabpanel" aria-labelledby='visa-tab'>
                                        <div className="mt-4 mx-4">
                                            <div className="text-center">
                                                <h5>Credit Card</h5>
                                            </div>
                                            <div className='mt-3'>
                                                <div className='relative mb-5 w-full'>
                                                    <input type="text" name="name" id="name" className='border-b-2 border-gray-300 focus:border-blue-400 w-full py-2 px-3' required />
                                                    <span className='absolute top-2 left-3 transition-transform duration-500 transform -translate-y-5'>Card Holder Name</span>
                                                </div>
                                                <div className='relative mb-5 w-full'>
                                                    <input type="text" name="number" id="number" className='border-b-2 border-gray-300 focus:border-blue-400 w-full py-2 px-3' required />
                                                    <span className='absolute top-2 left-3 transition-transform duration-500 transform -translate-y-5'>Card Number</span>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <div className='relative mb-5 w-full'>
                                                        <input type="text" name="date" id="date" className='border-b-2 border-gray-300 focus:border-blue-400 w-full py-2 px-3' required />
                                                        <span className='absolute top-2 left-3 transition-transform duration-500 transform -translate-y-5'>Expiry Date (MM/YY)</span>
                                                    </div>
                                                    <div className='relative mb-5 w-full'>
                                                        <input type="text" name="cvv" id="cvv" className='border-b-2 border-gray-300 focus:border-blue-400 w-full py-2 px-3' required />
                                                        <span className='absolute top-2 left-3 transition-transform duration-500 transform -translate-y-5'>CVV</span>
                                                    </div>
                                                </div>
                                                <div className='px-5'>
                                                    <button className='bg-green-500 text-white rounded-full w-full py-2' onClick={handleOrderConfirm}>Order Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* PayPal Content */}
                                    <div className={`tab-pane fade ${activeTab === "paypal" ? "show active" : ""}`} id="paypal" role="tabpanel" aria-labelledby='paypal-tab'>
                                        <div className="mt-4 mx-4">
                                            <div className="text-center">
                                                <h5>PayPal Account Info</h5>
                                            </div>
                                            <div className='mt-3'>
                                                <div className='relative mb-5 w-full'>
                                                    <input type="email" name="email" id="email" className='border-b-2 border-gray-300 focus:border-blue-400 w-full py-2 px-3' required />
                                                    <span className='absolute top-2 left-3 transition-transform duration-500 transform -translate-y-5'>Your Email</span>
                                                </div>
                                                <div className='relative mb-5 w-full'>
                                                    <input type="text" name="name" id="paypalName" className='border-b-2 border-gray-300 focus:border-blue-400 w-full py-2 px-3' required />
                                                    <span className='absolute top-2 left-3 transition-transform duration-500 transform -translate-y-5'>Enter Your Name</span>
                                                </div>
                                                <div className='relative mb-5 w-full'>
                                                    <input type="text" name="info" id="info" className='border-b-2 border-gray-300 focus:border-blue-400 w-full py-2 px-3' required />
                                                    <span className='absolute top-2 left-3 transition-transform duration-500 transform -translate-y-5'>Extra info</span>
                                                </div>
                                                <div className='px-5'>
                                                    <button className='bg-green-500 text-white rounded-full w-full py-2' onClick={handleOrderConfirm}>Add PayPal</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Payment Disclaimer */}
                                <p className='mt-3 px-4 text-sm italic'>
                                    <em>Payment Disclaimer: </em>
                                    In no event shall payment or partial payment by Owner for any material or service
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CheckOutPage;
