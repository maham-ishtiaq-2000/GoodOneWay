import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../Layout/SideBar/SideBar';
import Footer from '../Layout/Footer/Footer';
import Products from '../Layout/ReusableComponent/Products/Products';
import { FaSearch, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const TrendingProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://881ccd-2.myshopify.com/api/2024-04/graphql.json';
            const headers = {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': 'fcc1ef09b820e82704c1e9e597cddd84'
            };

            const trendingQuery = `{
                collectionByHandle(handle: "trendingProducts") {
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
                const response = await axios.post(url, { query: trendingQuery }, { headers });
                console.log('Response:', response.data);
                const fetchedProducts = response.data.data.collectionByHandle.products.edges.map(edge => ({
                    ...edge.node,
                    img: edge.node.images.edges[0].node.src,
                    price: edge.node.priceRange.minVariantPrice.amount
                }));
                setProducts(fetchedProducts);
                setFilteredProducts(fetchedProducts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching trending products:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = products.filter(product => {
            const searchLower = searchValue.toLowerCase();
            return product.title.toLowerCase().includes(searchLower) || (product.description && product.description.toLowerCase().includes(searchLower));
        });
        setFilteredProducts(filtered);
    }, [searchValue, products]);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchValue('');
    };

    return (
        <>
            <div className='bg-lightPink'>
                <SideBar />
                <div className="flex w-9/10 ml-3 mr-5">
                    <div className="flex-1 w-95 lg:ml-5">
                        <div className="w-full top-2 left-0 z-10">
                            <div className="flex items-center justify-center w-full">
                                <div className="relative w-full">
                                    <FaSearch className="absolute left-10 top-0 bottom-0 m-auto text-lg text-gray-500" />
                                    <input
                                        type="text"
                                        value={searchValue}
                                        onChange={handleSearchChange}
                                        placeholder='Search Available Products'
                                        className="w-full pl-20 pr-10 py-3 rounded-full text-grey bg-lightGray focus:outline-none"
                                    />
                                    {searchValue && (
                                        <FaTimes
                                            className="absolute right-4 top-0 bottom-0 m-auto text-lg text-gray-500 cursor-pointer"
                                            onClick={handleClearSearch}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : products.length === 0 ? (
                    <p>No trending products available</p>
                ) : (
                    <Products ProductArray={filteredProducts} component="HomePage"/>
                )}
                <Footer />
            </div>
        </>
    );
};

export default TrendingProducts;
