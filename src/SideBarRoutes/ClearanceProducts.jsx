import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../Layout/SideBar/SideBar';
import Footer from '../Layout/Footer/Footer';
import SingleFeaturedProduct from '../Layout/ReusableComponent/Products/SingleFeaturedProduct';
import { FaSearch, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const ClearanceProducts = () => {
    const { brand } = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://881ccd-2.myshopify.com/api/2024-04/graphql.json';
            const headers = {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': 'fcc1ef09b820e82704c1e9e597cddd84'
            };

            const featuredQuery = `{
                collectionByHandle(handle: "clearance") {
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
                setFilteredProducts(fetchedProducts); // Initialize filteredProducts with fetchedProducts
                console.log('Featured Products:', fetchedProducts);
            } catch (error) {
                console.error('Error fetching featured products:', error);
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
     
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-1 py-4  pb-40 items-center justify-center" style={{ height: '50vh', margin: '0 10px' , width : '90%' }}>
                    {filteredProducts.map((product, index) => (
                        <SingleFeaturedProduct key={index} product={product} />
                    ))}
                </div>
        
                <Footer />
            </div>
        </>
    );
};

export default ClearanceProducts;
