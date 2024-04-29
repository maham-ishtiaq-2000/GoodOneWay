import React, { useState, createContext, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        console.log("Calculating total price for items:", cartItems);
        const newTotalPrice = cartItems.reduce((total, item) => {
            if (!item.price || !item.quantity) {
                console.error('Invalid item detected', item);
                return total;
            }
            const itemPrice = parseFloat(item.price);
            const itemTotal = item.quantity * itemPrice;
            console.log(`Item: ${item.title}, Quantity: ${item.quantity}, Price: ${item.price}, Item Total: ${itemTotal}`);
            return total + itemTotal;
        }, 0);
        console.log("New total price:", newTotalPrice);
        setTotalPrice(Math.round(newTotalPrice)); // Use Math.round to ensure totalPrice is an integer
    }, [cartItems]);
    
    const addToCart = (product, quantity = 1) => {
        setCartItems(currentItems => {
            const index = currentItems.findIndex(item => item.merchandiseId === product.merchandiseId);
            if (index !== -1) {
                const updatedItems = [...currentItems];
                updatedItems[index].quantity += quantity;
                return updatedItems;
            } else {
                const newItem = {
                    ...product,
                    quantity: quantity
                };
                return [...currentItems, newItem];
            }
        });
    };

    const addToCartFromQuantityInput = (product, newQuantity) => {
        setCartItems(currentItems => {
            const index = currentItems.findIndex(item => item.merchandiseId === product.merchandiseId);
            if (index !== -1) {
                const updatedItems = currentItems.map(item =>
                    item.merchandiseId === product.merchandiseId ? {...item, quantity: newQuantity} : item
                );
                return updatedItems;
            } else {
                const newItem = {...product, quantity: newQuantity};
                return [...currentItems, newItem];
            }
        });
    };

    const removeFromCart = (merchandiseId) => {
        setCartItems(currentItems => {
            const index = currentItems.findIndex(item => item.merchandiseId === merchandiseId);
            if (index !== -1) {
                const updatedItems = [...currentItems];
                if (updatedItems[index].quantity > 1) {
                    updatedItems[index].quantity -= 1;
                } else {
                    console.log(updatedItems)
                    updatedItems.splice(index, 1);  
                }
                return updatedItems;
            }
            return currentItems; 
        });
    };

    const addToFavourites = (product) => {
        setFavourites(currentFavourites => {
            const isAlreadyFavourite = currentFavourites.some(item => item.merchandiseId === product.merchandiseId);
            if (!isAlreadyFavourite) {
                return [...currentFavourites, product];
            }
            return currentFavourites;
        });
    };

    const removeFromFavourites = (merchandiseId) => {
        setFavourites(currentFavourites => {
            return currentFavourites.filter(item => item.merchandiseId !== merchandiseId);
        });
    };


    const removeItemFromCart = (merchandiseId) => {
        setCartItems(currentItems => {
            return currentItems.filter(item => item.merchandiseId !== merchandiseId);
        });
    };

    const clearCart = () => {
        setCartItems([]);  // Clears all items from the cart
    };

    const value = { cartItems, addToCart, addToCartFromQuantityInput, removeFromCart, removeItemFromCart, totalPrice, clearCart, addToFavourites,removeFromFavourites, favourites };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
