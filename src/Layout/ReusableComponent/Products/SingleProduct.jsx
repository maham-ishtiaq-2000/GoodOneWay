import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import ProductImage from '../../../assets/productImg.png';
import SingleVariant from './SingleVariant';
import './SingleProduct.css';

const SingleProduct = ({ product }) => {
    const [count, setCount] = useState(0);
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count > 0 ? count - 1 : 0);
    const [isLiked, setIsLiked] = useState(false); // State to track whether the icon is liked
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const closeModal = () => {
        setIsClosing(true); // Start the closing animation
        setTimeout(() => {
            setIsModalOpen(false); // Close the modal after the animation completes
            setIsClosing(false); // Reset the closing state
        }, 300); // This timeout duration should match your CSS animation duration
    };

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        // Check if the input value is a number and not negative
        if (!isNaN(value) && value >= 0) {
            setCount(value);
        } else {
            setCount(0); // Reset to 0 if the input is not a valid number
        }
    };

    const toggleModal = () => {
        if (isModalOpen) {
            closeModal();
        } else {
            setIsModalOpen(true);
        }
    };

    const modalClass = isClosing ? 'modal-disappear' : 'modal-appear';



    console.log(product);

    return(
        <div className="flex flex-col items-center justify-center border border-lightGray border-2 bg-white rounded-lg px-2" 
             style={{ width: "200px", height: "340px", boxSizing: 'border-box' }}>
            {/* Icon aligned to the top end with padding */}
            <div className="self-end">
                {isLiked ? (
                    <AiFillHeart size={24} color="red" onClick={() => setIsLiked(false)} />
                ) : (
                    <AiOutlineHeart size={24} color="red" onClick={() => setIsLiked(true)} />
                )}
            </div>
            <img src={ProductImage} alt="Product" className='w-30 h-30' />
            {/* Description with specific width and justified text */}
            <div className="w-full text-center">
               <p className='text-xxs'>{product.description}</p>
               <p className='text-md mt-8'>£{product.price.toFixed(2)}<span className='text-xxs'>(Excl. Tax)</span></p>
            </div>
            {/* Conditionally render the button based on whether the product has variants */}
            {product.variant && product.variant.length > 0 && (
                <button
                    className='bg-red-500 text-white w-full rounded mt-2 py-1'
                    onClick={toggleModal}
                >
                    Select Variant
                </button>
            )}

            {/* Modal component */}
            {isModalOpen && (
           <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" onClick={closeModal}>
           <div className={`relative top-20 mx-auto p-5 border w-11/12 md:max-w-xl lg:max-w-2xl bg-white rounded-md shadow-lg ${modalClass}`}
               style={{ transform: 'translateY(0)' }}
               onClick={(e) => e.stopPropagation()}
           >
                  {/* Modal content */}
                  <div className="mt-3 text-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 font-semibold">{product.description}</h3>
                       <div style={{ height: '450px', overflowY: 'auto' , marginTop : '10px'}}>
                            {product.variant.map((variant, index) => (
                                <div key={index} style={{ marginBottom: '10px' }}>
                                    <SingleVariant item={variant}/>
                                </div>
                            ))}
                    </div>
                    
                  </div>
              </div>
          </div>
          
            )}
            {!product.variant && (
                <div className="flex items-center justify-center space-x-2 mt-1">
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

export default SingleProduct;
