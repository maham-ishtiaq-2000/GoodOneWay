import React, { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegBuilding, FaTags, FaHome, FaSearch, FaCartArrowDown } from 'react-icons/fa';
import { CartContext } from '../../Layout/context/CartContext';

const Footer = ({ formPage }) => {
    const { totalPrice, cartItems } = useContext(CartContext);
    const navigate = useNavigate();
    const totalSkus = cartItems.length;

    const remainingForFreeDelivery = 300 - totalPrice;
    let deliveryText = '';
    if (remainingForFreeDelivery > 0) {
        deliveryText = `Spend £${remainingForFreeDelivery.toFixed(2)} more for Free Next Day Delivery`;
    } else {
        deliveryText = 'Congrats! You have got free next day delivery';
    }

    const isActive = (path) => {
        return window.location.pathname === path;
    };

    return (
        <footer className="fixed inset-x-0 bottom-0 bg-white text-center pb-2 md:py-4 w-full">
            {!formPage && (
                <div
                    className="flex flex-col justify-center items-center pt-2 pb-1"
                    style={{ boxShadow: '0 -8px 10px -10px rgba(0, 0, 0, 0.3)' }}
                >
                    <p>
                        {totalSkus} SKUs <span style={{ margin: '0 10px' }}>|</span> £{totalPrice}
                        <span style={{ margin: '0 2px', fontSize: '11px', position: 'relative', top: '-2px' }}>
                            (Excl.Tax)
                        </span>
                    </p>
                    <p className="text-sm text-gray mt-2">{deliveryText}</p>
                </div>
            )}

            <div className="border-t border-gray w-full mb-2 pb-1"></div>

            <div className="relative lg:px-40 py-auto" style={{ height: '80px' }}> {/* Ensure adequate height for the nav bar */}

                <div className="flex justify-between items-center absolute inset-0">
                    <button className="block block absolute -translate-x-1/2 top-1/2 -translate-y-1/2"style={{ left: '10%' }}  onClick={() => navigate('/brand')}>
                        <FaRegBuilding
                            className={`ml-4 w-10 h-5 ${
                                isActive('/brand') ? 'text-red-500 text-2xl font-bold' : 'text-gray'
                            }`}
                        />
                        <span
                            className={`text-sm font-semibold ${
                                isActive('/brand') ? 'text-red-500 text-2xl font-bold' : 'text-gray'
                            }`}
                        >
                            Brands
                        </span>
                    </button>
                    <button className="block block absolute -translate-x-1/2 top-1/2 -translate-y-1/2" style={{ left: '30%' }} onClick={() => navigate('/categories')}>
                        <FaTags
                            className={`ml-7 w-10 h-5 ${
                                isActive('/categories') ? 'text-red-500 text-2xl font-bold' : 'text-gray'
                            }`}
                        />
                        <span
                            className={`text-sm font-semibold ${
                                isActive('/categories') ? 'text-red-500 text-2xl font-bold' : 'text-gray'
                            }`}
                        >
                            Categories
                        </span>
                    </button>
                    <button className="block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" onClick={() => navigate('/home')}>
                        <FaHome
                            className={`ml-3 w-10 h-5  ${
                                isActive('/home') ? 'text-red-500 text-2xl font-bold' : 'text-gray'
                            }`}
                        />
                        <span
                            className={`text-sm font-semibold ${
                                isActive('/home') ? 'text-red-500 text-2xl font-bold' : 'text-gray'
                            }`}
                        >
                            Home
                        </span>
                    </button>
                    <button className="block block absolute  top-1/2  -translate-y-1/2" onClick={() => navigate('/searchPage')}  style={{ right: '23%' }}>
                        <FaSearch
                            className={`w-10 h-5 ml-4 ${
                                isActive('/searchPage') ? 'text-red-500 text-2xl font-bold' : 'text-gray'
                            }`}
                        />
                        <span
                            className={`text-sm font-semibold ${
                                isActive('/searchPage') ? 'text-red-500 text-2xl font-bold' : 'text-gray'
                            }`}
                        >
                            Search
                        </span>
                    </button>
                    <button className="block mr-5 block absolute right-1  top-1/2 -translate-y-1/2" onClick={() => navigate('/cart')}>
                        <FaCartArrowDown
                            className={`mx-auto w-10 h-5 ml-2 ${
                                isActive('/cart') ? 'text-red-500 text-2xl font-bold' : 'text-gray'
                            }`}
                        />
                        <span
                            className={`text-sm font-semibold ${
                                isActive('/cart') ? 'text-red-500 text-2xl font-bold' : 'text-gray'
                            }`}
                        >
                            Cart
                        </span>
                    </button>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
