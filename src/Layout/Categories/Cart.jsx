import React,{useContext,useState} from 'react';
import axios from 'axios';
import SideBar from '../SideBar/SideBar';
import Footer from '../Footer/Footer';
import Bottles from '../../assets/Bottles.png';
import { CartContext } from '../../Layout/context/CartContext';
import './Cart.css';


const Cart = () => {
    const { cartItems, addToCart, addToCartFromQuantityInput, removeFromCart, removeItemFromCart, totalPrice, clearCart } = useContext(CartContext);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [modalAnimation, setModalAnimation] = useState('');
     // Function to handle clearing cart
     

    // Function to confirm and clear the cart
     // Function to handle clearing cart
     const handleClearCart = () => {
        setShowConfirmationModal(true);
        setModalAnimation('modal-appear'); // Set the animation state to appear initially
    };

    // Function to confirm and clear the cart with animation
    const confirmClearCart = () => {
        setModalAnimation('modal-disappear'); // Trigger the disappear animation
        setTimeout(() => {
            clearCart();
            setShowConfirmationModal(false); // Hide the modal after the animation
        }, 300); // This timeout should match the animation duration
    };

    // Function to cancel clearing the cart with animation
    const cancelClearCart = () => {
        setModalAnimation('modal-disappear');
        setTimeout(() => {
            setShowConfirmationModal(false);
        }, 300); // This timeout should match the animation duration
    };
    console.log("Total price in Cart Component:", totalPrice);

    const summaryItems = cartItems.map(item => ({
        merchandiseId: item.merchandiseId,
        quantity: item.quantity
    }));

    console.log(summaryItems);


    const numberOfSKUs = cartItems.length;

    const handleCheckout = async () => {
        const url = "https://881ccd-2.myshopify.com/api/2024-04/graphql.json"; // Replace with your actual Shopify GraphQL API URL
        const accessToken = localStorage.getItem('accessToken'); // Retrieve accessToken from localStorage
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': 'fcc1ef09b820e82704c1e9e597cddd84', // Replace with your actual Shopify Storefront Access Token
            }
        };
    
        // Prepare the lines array dynamically from summaryItems
        const lines = summaryItems.map(item => ({
            quantity: item.quantity,
            merchandiseId: item.merchandiseId
        }));
    
        const data = {
            query: `
            mutation cartCreate($input: CartInput!) {
                cartCreate(input: $input) {
                    cart {
                        id
                        checkoutUrl
                    }
                }
            }`,
            variables: {
                input: {
                    lines: lines, // Use the dynamically created lines array
                    buyerIdentity: {
                        customerAccessToken: accessToken
                    }
                }
            }
        };
    
        try {
            const response = await axios.post(url, data, config);
            console.log('Checkout successful:', response.data);
            // Redirect to checkout URL if available
            const checkoutUrl = response.data.data.cartCreate.cart.checkoutUrl;
            if (checkoutUrl) {
                window.location.href = checkoutUrl; // Redirects the user to the Shopify checkout page
            }
        } catch (error) {
            console.error('Checkout failed:', error.response ? error.response.data : error.message);
            // Handle errors appropriately
        }
    };
    
    

    return(
        <>
            <div className='CartPageColor'>
                <SideBar />
                <div className="overflow-auto mb-8 mx-2" style={{ height: '57vh' }}>
                    {cartItems.map((item, index) => (
                        <div className={`flex w-full ${index % 2 === 0 ? 'bg-platinum' : 'bg-white'}`} key={item.merchandiseId}>
                            <div className={`w-4/5 ${index % 2 === 0 ? 'bg-platinum' : 'bg-white'}`}>
                                <div className="p-2 flex justify-between items-center mx-auto w-9/10 max-w-[165vh] pt-4 pb-1">
                                    <div className="flex items-center">
                                        <div style={{ flexBasis: '20%', minWidth: '80px', height: '80px' }}> {/* Reduced size for image container */}
                                            <img 
                                                src={item.imageURL} 
                                                className="rounded-lg custom-shadow" 
                                                alt="Product" 
                                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}  // Use 'contain' to ensure the image fits without distortion
                                            />
                                        </div>
                                        <div className="flex-1 ml-3">
                                            <p className='text-xxs text-darkGrey mt-1'>{item.title}</p>
                                            <p className='text-sm text-black mt-6'>£{item.price*item.quantity}</p>
                                            <p className='text-darkGrey' style={{"fontSize" : "12px"}}>Excl. VAT</p> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`w-1/5 ${index % 2 === 0 ? 'bg-platinum' : 'bg-white'} flex justify-end items-start p-3`}>
                                <div className="flex items-center">
                                <button 
                                    className="text-black border border-red-500 rounded shadow-md px-1 text-xxs"
                                    style={{ width: '80px', height: '40px', marginTop: '40%', paddingTop: '0.5px', paddingBottom: '0.5px' }}  // Reduced padding on top and bottom
                                    onClick={() => removeItemFromCart(item.merchandiseId)}>
                                    Remove
                                </button>

                                    <div className="flex flex-col items-center ml-2">
                                        <button className="text-white rounded shadow-md px-1"
                                                onClick={() => addToCartFromQuantityInput(item, item.quantity + 1)} style={{"backgroundColor" : "#C71313"}}>▲</button>
                                        <input type="text" value={item.quantity} 
                                            className={`text-center mt-20 mb-20 ${index % 2 === 0 ? 'bg-platinum' : 'bg-white'} `} 
                                            style={{ width: '40px', margin: '4px 0' }}
                                            onChange={(e) => addToCartFromQuantityInput(item, parseInt(e.target.value) || item.quantity)} />
                                        <button className="text-white rounded shadow-md px-1"
                                                    onClick={() => {
                                                        if (item.quantity > 1) {
                                                            addToCartFromQuantityInput(item, item.quantity - 1);
                                                        } else {
                                                            removeFromCart(item.merchandiseId);  // Remove item if quantity is 1 and decrement is clicked
                                                        }
                                                    }} style={{"backgroundColor" : "#C71313"}}>▼</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}


                    
                </div>
                <div className="flex justify-between items-center w-full px-4 md:px-8 lg:px-4 pb-3 shadow-top pt-2">
              
                    <p className='text-sm text-gray' style={{"fontWeight" : "bolder"}}>SKUs:</p>
                    <p className='text-sm text-gray' style={{"fontWeight" : "bolder"}}>{numberOfSKUs}</p>
        


                                        
                    </div>
                     <div className="flex justify-between items-center w-full px-4 md:px-8 lg:px-4  pb-3  pt-2">
                    <div>
                        <p className='text-md font-semibold text-black'>
                            Total :<span className='text-xs font-normal mr-20 text-gray'>(Excl. Tax)</span>
                        </p>
                    </div>

                        <div>
                            <p className='text-md font-semibold text-black'>£{totalPrice}</p>
                        </div>
                    </div>

            

                    <div className="ixed w-9/10 flex flex-rpw md:flex-row items-center justify-center mx-2 mt-2" style={{ bottom: '15%' }} >
                        <button className='w-full md:w-1/2 px-10 py-2 bg-platinum border border-red-500 rounded-full text-red-500 mb-2 md:mb-0 md:mr-1' onClick={handleClearCart}>
                            Clear
                        </button>
                        <button className='w-full md:w-1/2 px-10 py-2 bg-red-500 border border-red-500 rounded-full text-white mb-2 md:mb-0 md:ml-1' onClick={handleCheckout}>
                            Go To Checkout
                        </button>
                    </div>
                




                    {cartItems.length > 0 && showConfirmationModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            <div className="bg-black bg-opacity-50 modal-overlay"></div>
                            <div className={`bg-white p-8 rounded-md shadow-lg modal-content ${modalAnimation}`}>
                                <p className="text-lg font-semibold mb-4">Are you sure you want to clear the cart?</p>
                                <div className="flex justify-center">
                                    <button className="flex-1 py-2 mr-2 text-white rounded-md" onClick={cancelClearCart} style={{"backgroundColor" : "#C71313"}}>Cancel</button>
                                    <button className="flex-1 py-2 text-white rounded-md" onClick={confirmClearCart} style={{"backgroundColor" : "#C71313"}}>Clear Cart</button>
                                </div>
                            </div>
                        </div>
                    )}


                <Footer formPage="cartPage"/>
            </div>
        </>
    );
}

export default Cart;
