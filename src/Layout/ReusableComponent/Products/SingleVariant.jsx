import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../../../Layout/context/CartContext';

const SingleVariant = ({ item }) => {
    const { cartItems, addToCartFromQuantityInput, removeFromCart } = useContext(CartContext);
    const [count, setCount] = useState(0);

    // Update local count based on cart changes
    useEffect(() => {
        const foundItem = cartItems.find(cartItem => cartItem.merchandiseId === item.id);
        if (foundItem) {
            setCount(foundItem.quantity);
        } else {
            setCount(0);  // Reset count if item is not found in the cart
        }
    }, [cartItems, item.id]);

    const increment = () => {
        const newCount = count + 1;
        setCount(newCount);
        const productToAdd = {
            merchandiseId: item.id,
            imageURL: item.image.url,
            title: item.product.title,
            description: item.description || item.title,
            price: item.price.amount,
            quantity: newCount
        };
        addToCartFromQuantityInput(productToAdd, newCount);
    };

    const decrement = () => {
        if (count > 1) {
            const newCount = count - 1;
            setCount(newCount);
            addToCartFromQuantityInput({
                merchandiseId: item.id,
                imageURL: item.image.url,
                title: item.title,
                description: item.description || item.title,
                price: item.price.amount,
                quantity: newCount
            }, newCount);
        } else if (count === 1) {
            setCount(0); // Set count to zero
            removeFromCart(item.id); // Remove the item from the cart
        }
    };
    

    const handleInputChange = (event) => {
        const inputQuantity = parseInt(event.target.value, 10);
        if (!isNaN(inputQuantity) && inputQuantity > 0) {
            setCount(inputQuantity);
            addToCartFromQuantityInput({
                merchandiseId: item.id,
                imageURL: item.image.url,
                title: item.title,
                description: item.description || item.title,
                price: item.price.amount,
                quantity: inputQuantity
            }, inputQuantity);
        } else if (inputQuantity <= 1) {
            // Do not update the count or modify the cart if the quantity is zero or less
            // Optionally, you might want to handle this differently depending on requirements
            setCount(0); // This resets the count to 1 in case of invalid input
        }
    };
    
    
    

    return (
        <div className="bg-white border-2 border-red-500 rounded-lg p-2 flex justify-between items-center mx-auto w-9/10 max-w-[165vh] pt-3 pb-3 mb-2">
            <div className="flex" style={{ width: '100%' }}>
                <div style={{ width: '50px', marginRight: '10px' }}>
                    <img src={item.image.url} style={{ width: '50px', height: '50px' }} alt={item.title} />
                </div>
                <div className="flex-1 pl-2">
                    <p className='text-sm text-left'>{item.title}</p>
                    <p className='text-darkGrey text-left' style={{ fontSize: "12px" }}>Price: £{item.price.amount}</p>
                </div>
            </div>
            <div className="flex items-center">
                <button onClick={decrement} className="text-white font-bold rounded w-6 h-6 flex items-center justify-center" type="button" style={{"backgroundColor" : "#C71313"}}>-</button>
                <input type="text" value={count} onChange={handleInputChange}  maxLength="3" className="mx-2 text-center w-8 outline-none" />
                <button onClick={increment} className="text-white font-bold rounded w-6 h6 flex items-center justify-center" type="button" style={{"backgroundColor" : "#C71313"}}>+</button>
            </div>
        </div>
    );
};

export default SingleVariant;