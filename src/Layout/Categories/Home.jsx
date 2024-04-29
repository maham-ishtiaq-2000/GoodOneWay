import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../../Layout/SideBar/SideBar';
import Footer from '../../Layout/Footer/Footer';
import Products from '../ReusableComponent/Products/Products';
import goodOneDeals from '../../assets/goodOneDeals.png';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [clearanceProducts, setClearanceProducts] = useState([]); // New state variable for clearance products

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://881ccd-2.myshopify.com/api/2024-04/graphql.json';
            const headers = {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': 'fcc1ef09b820e82704c1e9e597cddd84'
            };

            const featuredQuery = `{
                collectionByHandle(handle: "featured-products") {
                    products(first: 10) {
                        edges {
                            node {
                                id
                                title
                                description
                                images(first: 1) {
                                    edges {
                                        node {
                                            src
                                            altText
                                        }
                                    }
                                }
                                priceRange {
                                    minVariantPrice {
                                        amount
                                        currencyCode
                                    }
                                }
                            }
                        }
                    }
                }
            }`;

            try {
                const response = await axios.post(url, { query: featuredQuery }, { headers });
                const fetchedProducts = response.data.data.collectionByHandle.products.edges.map(edge => ({
                    ...edge.node,
                    img: edge.node.images.edges[0].node.src,
                    price: edge.node.priceRange.minVariantPrice.amount
                }));
                setProducts(fetchedProducts);
                console.log('Featured Products:', fetchedProducts);
            } catch (error) {
                console.error('Error fetching featured products:', error);
            }

            const clearanceQuery = `{
                collectionByHandle(handle: "clearance") {
                    products(first: 250) {
                        edges {
                            node {
                                id
                                title
                                description
                                availableForSale
                                priceRange {
                                    maxVariantPrice {
                                        amount
                                    }
                                    minVariantPrice {
                                        amount
                                    }
                                }
                                featuredImage {
                                    url
                                }
                                variants(first: 250) {
                                    edges {
                                        node {
                                            id
                                            title
                                            availableForSale
                                            quantityAvailable
                                            sku
                                            price {
                                                amount
                                            }
                                            selectedOptions {
                                                name
                                                value
                                            }
                                            image {
                                                url
                                            }
                                            product {
                                                title
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }`;

            try {
                const clearanceResponse = await axios.post(url, { query: clearanceQuery }, { headers });
                console.log(clearanceResponse.data);
                const fetchedClearanceProducts = clearanceResponse.data.data.collectionByHandle.products.edges.map(edge => ({
                    ...edge.node,
                    img: edge.node.featuredImage?.url, // Check if featuredImage exists
                    price: edge.node.priceRange.minVariantPrice.amount
                }));
                setClearanceProducts(fetchedClearanceProducts);
                console.log('Clearance Products:', fetchedClearanceProducts);
            } catch (error) {
                console.error('Error fetching clearance products:', error.response ? error.response.data : error.message);
            }
        };

        fetchData();
    }, []);

    console.log(clearanceProducts)

    return(
        <>
            <div className='bg-homePageColor'>
                <SideBar />
                <div className='bg-homePageColor' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img 
                    src={goodOneDeals} 
                    alt="Good One Deals" 
                    style={{ width: '80vw', height: 'auto' }}
                    className='mt-10 mb-5'
                />
                <p className='font-bold ml-10 mt-2 font-bold'>Featured</p>
                <Products ProductArray={products} component="HomePage"/> 
                <div style={{"marginBottom" : "130px"}}>
                    <p className='font-bold ml-10 font-bold '>Clearance</p>
                    <Products ProductArray={clearanceProducts} component="HomePage"/> 
                </div>
                </div>
                
                <Footer />
            </div>
        </>
    );
}

export default Home;
