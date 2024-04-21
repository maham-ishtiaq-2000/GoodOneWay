import React from 'react';
import { FaCartArrowDown, FaHome, FaRegBuilding, FaSearch, FaTags } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer 
      className="fixed inset-x-0 bottom-0 bg-white text-center py-2 md:py-4 lg:pl-40 lg:pr-40"
      style={{ boxShadow: '0 -4px 5px -5px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex flex-row md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <button className="block" onClick={() => navigate('/brand')}>
          <FaRegBuilding className="mx-auto w-10 h-5 ml-5 text-gray" style={{ display: 'block' }} />
          <span className='text-sm text-gray font-semibold ml-5'>Brands</span>
        </button>
        <button className="block" onClick={() => navigate('/home')}>
          <FaTags className="mx-auto w-10 h-5 ml-5 text-gray" style={{ display: 'block' }} />
          <span className='text-sm text-gray font-semibold'>Categories</span>
        </button>
        <button className="block" onClick={() => navigate('/home')}>
          <FaHome className="mx-auto w-10 h-5 ml-5 text-gray mr-2" style={{ display: 'block' }} />
          <span className='text-sm text-gray font-semibold'>Home</span>
        </button>
        <button className="block" onClick={() => navigate('/home')}>
          <FaSearch className="mx-auto w-10 h-5 ml-5 text-gray mr-2" style={{ display: 'block' }} />
          <span className='text-sm text-gray font-semibold'>Search</span>
        </button>
        <button className="block" onClick={() => navigate('/home')}>
          <FaCartArrowDown className="mx-auto w-10 h-5 ml-5 text-gray mr-2" style={{ display: 'block' }} />
          <span className='text-sm text-gray font-semibold'>Cart</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
