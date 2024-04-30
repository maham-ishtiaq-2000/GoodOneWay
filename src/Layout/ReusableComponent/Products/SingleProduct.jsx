import React, { useState, useContext, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import SingleVariant from './SingleVariant';
import { CartContext } from '../../../Layout/context/CartContext';
import './SingleProduct.css';

const SingleProduct = ({ product }) => {
    const { cartItems, addToCart, addToCartFromQuantityInput, removeFromCart, addToFavourites, removeFromFavourites, favourites } = useContext(CartContext);
    const [count, setCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        // Find the item in the cart and set the input box to show the correct quantity
        const cartItem = cartItems.find(item => item.merchandiseId === product.variants.edges[0].node.id);
        if (cartItem) {
            setCount(cartItem.quantity);
        } else {
            setCount(0);
        }
    }, [cartItems, product.variants.edges]);

    useEffect(() => {
        const isFavorited = favourites.some(item => item.merchandiseId === product.variants.edges[0].node.id);
        setIsLiked(isFavorited);
    }, [favourites, product.variants.edges]);
    

    const increment = () => {
        const newCount = count + 1;
        setCount(newCount);
        addToCartFromQuantityInput({
            merchandiseId: product.variants.edges[0].node.id,
            imageURL: product.featuredImage.url,
            title: product.title,
            description: product.description,
            price: product.priceRange.maxVariantPrice.amount,
            quantity: newCount
        }, newCount);
    };

    const decrement = () => {
        if (count > 1) {
            const newCount = count - 1;
            setCount(newCount);
            addToCartFromQuantityInput({
                merchandiseId: product.variants.edges[0].node.id,
                imageURL: product.featuredImage.url,
                title: product.title,
                description: product.description,
                price: product.priceRange.maxVariantPrice.amount
            }, newCount);
        } else if (count === 1) {
            setCount(0);  // Update the local state to zero
            removeFromCart(product.variants.edges[0].node.id);  // Call removeFromCart to remove the item
        }
    };
    
    
    const handleInputChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (!isNaN(newQuantity)) {
            setCount(newQuantity);
            addToCartFromQuantityInput({
                merchandiseId: product.variants.edges[0].node.id,
                imageURL: product.featuredImage.url,
                title: product.title,
                description: product.description,
                price: product.priceRange.maxVariantPrice.amount
            }, newQuantity);
        }
    };

    const toggleFavourite = () => {
        setIsLiked(!isLiked);
        if (!isLiked) {
            addToFavourites({
                merchandiseId: product.variants.edges[0].node.id,
                imageURL: product.featuredImage.url,
                title: product.title,
                description: product.description,
                price: product.priceRange.maxVariantPrice.amount
            });
        } else {
            removeFromFavourites(product.variants.edges[0].node.id);
        }
    };
    

    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const modalClass = isClosing ? 'modal-disappear' : 'modal-appear';
    const variants = product.variants.edges.map(edge => edge.node);

    return (
      <>
         <div className="relative border border-lightGray border-2 " style={{ width: '180px', height: '300px', overflow: 'hidden' }}>
         {isLiked ? (
                        <AiFillHeart className="absolute top-0 right-0 text-red-500 text-3xl" color="red" onClick={toggleFavourite} style={{"cursor" : "pointer"}}/>
                    ) : (
                        <AiOutlineHeart  className="absolute top-0 right-0 text-red-500 text-3xl" color="red" onClick={toggleFavourite} style={{"cursor" : "pointer"}}/>
                    )}
            <img 
                src={product.featuredImage.url} // URL of the image
                alt="Placeholder"
                className="w-36 h-36 mx-auto" // Tailwind CSS classes for width and height (9rem or 144px by default)
            />
            <div className="w-full text-center mb-2">
                <p className='text-xxs'>{product.title}</p>
                <p className='text-md mt-8'>
                    £{product.priceRange.maxVariantPrice.amount}
                    <span style={{ fontSize: "10px", marginLeft: "2px" }} className='text-gray'> (Excl. Tax)</span>
                </p>
            </div>
            
            {(!variants || variants.length !== 1) && (
                    <button 
                        className='text-white rounded mx-auto absolute bottom-2 left-1/2 py-1 transform -translate-x-1/2 bg-red-600'
                        style={{ width: '90%', backgroundColor: "#C71313" }}
                        onClick={toggleModal}
                    >
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
                                {variants.map((variant, index) => (
                                    <div key={index} style={{ marginBottom: '10px' }}>
                                        <SingleVariant item={variant} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!variants || variants.length === 1 && (
                    <div 
                    className="flex items-center justify-center space-x-2 absolute bottom-2 left-1/2 transform -translate-x-1/2"
                    style={{ width: '90%' }}
                >
                    <button 
                        onClick={decrement} 
                        className="text-white font-bold rounded px-4 h-7"
                        style={{ backgroundColor: "#C71313" }}
                        type="button"
                    >
                        -
                    </button>
                    <input 
                        type="text" 
                        value={count} 
                        onChange={handleInputChange}  
                        id="numericInput" 
                        inputMode="numeric" 
                        maxLength="3" 
                        className="w-12 text-center"
                    />
                    <button 
                        onClick={increment} 
                        className="text-white font-bold rounded px-4 h-7"
                        style={{ backgroundColor: "#C71313" }}
                        type="button"
                    >
                        +
                    </button>
                </div>
            
            )}


        </div>

      </>
    );
}

export default SingleProduct;