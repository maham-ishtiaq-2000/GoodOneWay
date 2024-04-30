import React, { useState, useContext } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import SingleVariant from './SingleVariant'; // Assuming SingleVariant is correctly imported
import { CartContext } from '../../../Layout/context/CartContext'; // Ensure correct path

const SingleFavouriteProduct = ({ product }) => {
    const { addToFavourites, removeFromFavourites } = useContext(CartContext);
    const [isLiked, setIsLiked] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const modalClass = isClosing ? 'modal-disappear' : 'modal-appear';
    
    let variants;
    if (product.variants) {
        variants = product.variants.edges.map(edge => edge.node);
    }

    const toggleFavourite = () => {
        setIsLiked(!isLiked);
        if (isLiked) {
            removeFromFavourites(product.id); // Assumes removeFromFavourites needs the product's id
        } else {
            addToFavourites({
                merchandiseId: product.id,
                imageURL: product.imageURL,
                title: product.title,
                price: product.price
            }); // Assumes addToFavourites needs these properties
        }
    };

    return (
        <> 
            <div className="flex flex-col items-center justify-start border border-lightGray border-2 bg-white rounded-lg px-1 relative" 
                style={{ width: "180px", height: "300px", boxSizing: 'border-box', margin: '0 20px' }}>
                <div className="w-full relative">
                    <div className="absolute top-0 right-0 p-1" style={{ cursor: 'pointer' }}>
                        {isLiked ? (
                            <AiFillHeart size={24} color="red" onClick={toggleFavourite} />
                        ) : (
                            <AiOutlineHeart size={24} color="red" onClick={toggleFavourite} />
                        )}
                    </div>
                    <img src={product.imageURL} alt="Product" className='w-30 h-25' />
                </div>
                <div className="w-full text-center mb-2">
                    <p className='text-xxs'>{product.title}</p>
                    <p className='text-md mt-8'>£{product.price}<span style={{"fontSize": "10px"}} className='text-gray'>(Excl. Tax)</span></p>
                </div>
                {!variants || variants.length !== 1 && (
                    <button className='text-white rounded mt-2 py-1 mx-auto mt-1' onClick={toggleModal}
                        style={{ width : '90%', position: 'absolute', bottom: '5px', left: '5', right: '5' ,"backgroundColor" : "#C71313"}}>
                        Select Variant
                    </button>
                )}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" style={{ zIndex: 1050 }} onClick={() => setIsModalOpen(false)}>
                        <div className={`relative top-20 mx-auto p-5 border w-11/12 md:max-w-xl lg:max-w-2xl bg-white rounded-md shadow-lg ${modalClass}`}
                            style={{ zIndex: 1051 }} onClick={(e) => e.stopPropagation()}>
                            <div className="mt-3 text-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 font-semibold">{product.title}</h3>
                                <div style={{ height: '450px', overflowY: 'auto', marginTop: '10px'}}>
                                    {variants && variants.map((variant, index) => (
                                        <div key={index} style={{ marginBottom: '10px' }}>
                                            <SingleVariant item={variant} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default SingleFavouriteProduct;
