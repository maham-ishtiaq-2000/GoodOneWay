import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import SingleVariant from './SingleVariant';
import './SingleProduct.css';

const SingleFeaturedProduct = ({ product }) => {
    const [count, setCount] = useState(0);
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count > 0 ? count - 1 : 0);
    const [isLiked, setIsLiked] = useState(false); // State to track whether the icon is liked
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setIsClosing(false);
        }, 300);
    };

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value >= 0) {
            setCount(value);
        } else {
            setCount(0);
        }
    };

    const toggleModal = () => {
        if (isModalOpen) {
            closeModal();
        } else {
            setIsModalOpen(true);
        }
    };

    let variants;
    const modalClass = isClosing ? 'modal-disappear' : 'modal-appear';
    if(product.variants){
        variants = product.variants.edges.map(edge => edge.node);
    }
    else{
        console.log(variants)
    }
 

    return (
        <div className="flex flex-col items-center justify-start border border-lightGray border-2 bg-white rounded-lg px-2 relative" 
        style={{ width: "200px", height: "350px", boxSizing: 'border-box' }}>
       <div className="w-full relative">
           <div className="absolute top-0 right-0 p-1" style={{ cursor: 'pointer' }}>
               {isLiked ? (
                   <AiFillHeart size={24} color="red" onClick={() => setIsLiked(false)} />
               ) : (
                   <AiOutlineHeart size={24} color="red" onClick={() => setIsLiked(true)} />
               )}
           </div>
           <img src={product.img} alt="Product" className='w-30 h-25' />
       </div>
       <div className="w-full text-center mb-2">
           <p className='text-xxs'>{product.title}</p>
           <p className='text-md mt-8'>£{product.priceRange.minVariantPrice.amount}<span style={{"fontSize": "10px"}} className='text-gray'>(Excl. Tax)</span></p>
       </div>
       {variants && (
           <button
               className='bg-red-500 text-white rounded mt-2 py-1 mx-auto mt-1'
               onClick={toggleModal}
               style={{ width : '90%', position: 'absolute', bottom: '5px', left: '5', right: '5' }}

           >
               Select Variant
           </button>
       )}
       {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" style={{ zIndex: 1050 }} onClick={closeModal}>
               <div className={`relative top-20 mx-auto p-5 border w-11/12 md:max-w-xl lg:max-w-2xl bg-white rounded-md shadow-lg ${modalClass}`}
                    style={{ zIndex: 1051 }}
                    onClick={(e) => e.stopPropagation()}>
                   <div className="mt-3 text-center">
                       <h3 className="text-lg leading-6 font-medium text-gray-900 font-semibold">{product.title}</h3>
                       <div style={{ height: '450px', overflowY: 'auto', marginTop: '10px'}}>
                           {variants.map((variant, index) => (
                               <div key={index} style={{ marginBottom: '10px' }}>
                                    <SingleVariant item={variant}></SingleVariant>
                               </div>
                           ))}
                       </div>
                   </div>
               </div>
           </div>
       )}
       
      {!variants && (
          <div className="flex items-center justify-center space-x-2 mt-1"  style={{ width : '90%', position: 'absolute', bottom: '5px', left: '5', right: '5' }}
          >
              <button
                  onClick={decrement}
                  className="bg-red-500 text-white font-bold rounded px-4 h-7"
                  type="button"
              >
                  -
              </button>
              <input 
                  type="text"
                  value={count}
                  onChange={handleInputChange}
                  className="w-12 text-center"
              />
              <button
                  onClick={increment}
                  className="bg-red-500 text-white font-bold rounded px-4 h-7"
                  type="button"
              >
                  +
              </button>
          </div>
      )}
      
   </div>
    );
}

export default SingleFeaturedProduct;
