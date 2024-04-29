import React, { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../../../Layout/context/CartContext';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import SingleVariant from './SingleVariant';
import './SingleProduct.css';

const SingleFeaturedProduct = ({ product }) => {
    const { cartItems, addToCartFromQuantityInput, removeFromCart } = useContext(CartContext);
    const [count, setCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://881ccd-2.myshopify.com/api/2024-04/graphql.json';
            const headers = {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': 'fcc1ef09b820e82704c1e9e597cddd84',
            };

            const query = `
                {
                    product(id: "${product.id}") {
                        id
                        title
                        descriptionHtml
                        variants(first: 1) {
                            edges {
                                node {
                                    id
                                    title
                                    priceV2 {
                                        amount
                                        currencyCode
                                    }
                                    sku
                                    selectedOptions {
                                        name
                                        value
                                    }
                                }
                            }
                        }
                    }
                }
            `;

            try {
                const response = await axios.post(url, { query }, { headers });
                setProductData(response.data.data.product);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product data:", error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [product.id]);

    useEffect(() => {
        const variantId = productData?.variants.edges[0]?.node.id;
        const cartItem = cartItems.find(item => item.merchandiseId === variantId);
        setCount(cartItem?.quantity || 0);
    }, [cartItems, productData]);

    const increment = () => {
        if (!productData || !productData.variants.edges[0]) {
            console.error("Product data is not available.");
            return;
        }

        const newCount = count + 1;
        setCount(newCount);
        const variant = productData.variants.edges[0].node;
    
        const productToAdd = {
            merchandiseId: variant.id,
            imageURL: product.img, // Make sure this is correct
            title: productData.title,
            description: productData.description,
            price: variant.priceV2.amount,
            quantity: newCount
        };
    
        addToCartFromQuantityInput(productToAdd, newCount);
    };
    const decrement = () => {
        const newCount = count - 1;
        if (newCount > 0) {
            setCount(newCount);
            if (productData && productData.variants.edges.length > 0) {
                const variant = productData.variants.edges[0].node;
                addToCartFromQuantityInput({
                    merchandiseId: variant.id,
                    imageURL: product.img, // Ensure this matches the structure of your product data
                    title: productData.title,
                    description: productData.descriptionHtml,
                    price: variant.priceV2.amount,
                    quantity: newCount
                }, newCount);
            }
        } else if (newCount === 0) {
            setCount(0);
            if (productData && productData.variants.edges.length > 0) {
                const variantId = productData.variants.edges[0].node.id;
                removeFromCart(variantId);
            }
        }
    };
    



    const handleInputChange = (event) => {
        const inputQuantity = parseInt(event.target.value, 10);
        if (!isNaN(inputQuantity) && inputQuantity >= 0) {
            setCount(inputQuantity);
            if (productData && productData.variants.edges.length > 0) {
                const variant = productData.variants.edges[0].node;
                addToCartFromQuantityInput({
                    merchandiseId: variant.id,
                    imageURL: product.img,
                    title: productData.title,
                    description: productData.descriptionHtml,
                    price: variant.priceV2.amount,
                    quantity: inputQuantity
                }, inputQuantity);
            }
        } else {
            setCount(0);  // Reset count if invalid input
        }
    };

    
    
    
    

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setIsClosing(false);
        }, 300);
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
        //console.log(variants)
    }
 

    return (
        <div className="flex flex-col items-center justify-start border border-lightGray border-2 bg-white rounded-lg px-2 relative" 
        style={{ width: "180px", height: "350px", boxSizing: 'border-box' }}>
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
               className='text-white rounded mt-2 py-1 mx-auto mt-1'
               onClick={toggleModal}
               style={{ width : '90%', position: 'absolute', bottom: '5px', left: '5', right: '5' , "backgroundColor" : "#C71313"}}

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
                  className="text-white font-bold rounded px-4 h-7"
                  style={{"backgroundColor" : "#C71313"}}
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
                  className="text-white font-bold rounded px-4 h-7"
                  style={{"backgroundColor" : "#C71313"}}
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
