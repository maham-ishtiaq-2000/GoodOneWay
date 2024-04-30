import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../../Layout/SideBar/SideBar';
import Footer from '../../Layout/Footer/Footer';
import Products from '../ReusableComponent/Products/Products';
import goodOneDeals from '../../assets/goodOneDeals.png';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [clearanceProducts, setClearanceProducts] = useState([]); // New state variable for clearance products
    const [trendingProducts, setTrendingProducts] = useState([]); // State for trending products

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

            const trendingQuery = `{
                products(first: 100) {
                    edges {
                        node {
                            id
                            title
                            description
                            descriptionHtml
                            productType
                            tags
                            vendor
                            createdAt
                            updatedAt
                            collections(first: 5) {
                                edges {
                                    node {
                                        title
                                        id
                                    }
                                }
                            }
                            variants(first: 250) {
                                edges {
                                    node {
                                        id
                                        title
                                        priceV2 {
                                            amount
                                            currencyCode
                                        }
                                        sku
                                        availableForSale
                                    }
                                }
                            }
                            priceRange {
                                minVariantPrice {
                                    amount
                                    currencyCode
                                }
                                maxVariantPrice {
                                    amount
                                    currencyCode
                                }
                            }
                            images(first: 5) {
                                edges {
                                    node {
                                        originalSrc
                                        altText
                                    }
                                }
                            }
                        }
                    }
                }
            }`;

            // Featured Products Fetch
            try {
                const response = await axios.post(url, { query: featuredQuery }, { headers });
                const fetchedProducts = response.data.data.collectionByHandle.products.edges.map(edge => ({
                    ...edge.node,
                    img: edge.node.images.edges[0].node.src,
                    price: edge.node.priceRange.minVariantPrice.amount
                }));
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching featured products:', error);
            }

            // Clearance Products Fetch
            try {
                const clearanceResponse = await axios.post(url, { query: clearanceQuery }, { headers });
                const fetchedClearanceProducts = clearanceResponse.data.data.collectionByHandle.products.edges.map(edge => ({
                    ...edge.node,
                    img: edge.node.featuredImage?.url,
                    price: edge.node.priceRange.minVariantPrice.amount
                }));
                setClearanceProducts(fetchedClearanceProducts);
            } catch (error) {
                console.error('Error fetching clearance products:', error);
            }

            // Trending Products Fetch
            try {
                const trendingResponse = await axios.post(url, { query: trendingQuery }, { headers });
                const fetchedTrendingProducts = trendingResponse.data.data.products.edges.map(edge => ({
                    ...edge.node,
                    img: edge.node.images.edges[0]?.node.originalSrc,
                    price: edge.node.priceRange.minVariantPrice.amount
                }));
                setTrendingProducts(fetchedTrendingProducts);
            } catch (error) {
                console.error('Error fetching trending products:', error);
            }
        };

        fetchData();
    }, []);


    console.log(clearanceProducts)
    console.log(products)
    console.log(trendingProducts)

    return(
        <>
           <div className='bg-homePageColor'>
                <SideBar />
                <div style={{ height: "90vh", paddingBottom: "150px", overflowY: "auto" }}>
                    <div className='bg-homePageColor' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img 
                            src={goodOneDeals} 
                            alt="Good One Deals" 
                            style={{ width: '100vw', height: 'auto', margin: '0 auto 10px' }}
                            className='mt-1'
                        />
                    </div>

                    <p className='font-bold ml-10 mt-2 bg-homePageColor'>Featured</p>
                    <Products ProductArray={products} component="HomePage"/> 
                    <div style={{ marginBottom: "5px" }}>
                        <p className='font-bold ml-10 bg-homePageColor'>Clearance</p>
                        <Products ProductArray={clearanceProducts} component="HomePage"/> 
                    </div>
                </div>
                <Footer />
          </div>

        </>
    );
}

export default Home;
