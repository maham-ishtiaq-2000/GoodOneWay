import React, { useState, useContext, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import SingleVariant from './SingleVariant';
import { CartContext } from '../../../Layout/context/CartContext';
import './SingleProduct.css';

const SingleProduct = ({ product }) => {
    const { cartItems, addToCart, addToCartFromQuantityInput, removeFromCart } = useContext(CartContext);
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

    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const modalClass = isClosing ? 'modal-disappear' : 'modal-appear';
    const variants = product.variants.edges.map(edge => edge.node);

    return (
        <div className="flex flex-col items-center justify-start border border-lightGray border-2 bg-white rounded-lg px-1 relative" 
        style={{ width: "180px", height: "350px", boxSizing: 'border-box' }}>
            <div className="w-full relative">
                <div className="absolute top-0 right-0 p-1" style={{ cursor: 'pointer' }}>
                    {isLiked ? (
                        <AiFillHeart size={24} color="red" onClick={() => setIsLiked(false)} />
                    ) : (
                        <AiOutlineHeart size={24} color="red" onClick={() => setIsLiked(true)} />
                    )}
                </div>
                <img src={product.featuredImage.url} alt="Product" className='w-30 h-25' />
            </div>
            <div className="w-full text-center mb-2">
                <p className='text-xxs'>{product.title}</p>
                <p className='text-md mt-8'>£{product.priceRange.maxVariantPrice.amount}<span style={{"fontSize": "10px"}} className='text-gray'>(Excl. Tax)</span></p>
            </div>
            {!variants || variants.length !== 1 && (
                <button className='bg-red-500 text-white rounded mt-2 py-1 mx-auto mt-1' onClick={toggleModal}
                    style={{ width : '90%', position: 'absolute', bottom: '5px', left: '5', right: '5' }}>
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
                <div className="flex items-center justify-center space-x-2 mt-1"  style={{ width : '90%', position: 'absolute', bottom: '5px', left: '5', right: '5' }}>
                    <button onClick={decrement} className="bg-red-500 text-white font-bold rounded px-4 h-7" type="button">-</button>
                    <input type="text" value={count} onChange={handleInputChange} className="w-12 text-center" />
                    <button onClick={increment} className="bg-red-500 text-white font-bold rounded px-4 h-7" type="button">+</button>
                </div>
            )}
        </div>
    );
}

export default SingleProduct;
