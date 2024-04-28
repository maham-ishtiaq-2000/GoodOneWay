import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../../Layout/SideBar/SideBar';
import Footer from '../../Layout/Footer/Footer';
import Products from '../ReusableComponent/Products/Products';
import { FaSearch, FaTimes, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import axios from 'axios';

const SearchPage = () => {
    const { brand } = useParams();
    console.log(brand)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const fetchProducts = async () => {
        const query = `
            query {
                collections(first: 250) {
                    edges {
                        node {
                            id
                            title
                            description
                            image {
                                url
                            }
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
                    }
                }
            }
        `;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': 'fcc1ef09b820e82704c1e9e597cddd84',
            }
        };
        try {
            const response = await axios.post('https://881ccd-2.myshopify.com/api/2024-04/graphql.json', { query }, config);
            let collections = response.data.data.collections.edges.map(edge => edge.node);
            
            // Filtering logic after fetching the collections and products
            if (brand) {
                collections = collections.filter(collection => collection.title.toLowerCase() === brand.toLowerCase());
            }
    
            const productsWithImages = collections.reduce((acc, collection) => {
                const filtered = collection.products.edges.map(edge => edge.node).filter(product => product.featuredImage && product.featuredImage.url);
                return [...acc, ...filtered];
            }, []);
    
            setProducts(productsWithImages);
            setFilteredProducts(productsWithImages); // Initial filtering applies before any search input
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    
    

    useEffect(() => {
        fetchProducts();
    }, []);
    useEffect(() => {
        fetchProducts();
    }, [brand]);  // Dependency on 'brand' to refetch when the brand parameter changes
    

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

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const sortProducts = (order) => {
        const sorted = [...filteredProducts];
        if (order === 'Price: Low-High') {
            sorted.sort((a, b) => a.priceRange.minVariantPrice.amount - b.priceRange.minVariantPrice.amount);
        } else if (order === 'Price: High-Low') {
            sorted.sort((a, b) => b.priceRange.minVariantPrice.amount - a.priceRange.minVariantPrice.amount);
        } else if (order === 'Sort: A-Z') {
            sorted.sort((a, b) => a.title.localeCompare(b.title));
        } else if (order === 'Sort: Z-A') {
            sorted.sort((a, b) => b.title.localeCompare(a.title));
        }
        setFilteredProducts(sorted);
        setIsDropdownOpen(false); // Explicitly close the dropdown here
    };


    

    return (
        <>
            <div className='bg-lightPink'>
                <SideBar />
                <div className="flex w-full">
                    <div className="flex-1 w-95 lg:ml-5">
                        <div className="w-full top-2 left-0 z-10">
                            <div className="flex items-center justify-center w-full">
                                <div className="relative w-full">
                                    <FaSearch className="absolute left-10 top-0 bottom-0 m-auto text-lg text-gray-500" />
                                    <input
                                        type="text"
                                        value={searchValue}
                                        onChange={handleSearchChange}
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
                    <div className="relative w-5">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <FaArrowUp onClick={toggleDropdown} />
                            <FaArrowDown className='ml-3' onClick={toggleDropdown} />
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute right-0 z-10 mt-1 bg-platinum border rounded shadow w-40">
                                <div className="p-2 text-left text-darkGrey text-xxs cursor-pointer" onClick={() => sortProducts('Price: Low-High')}>Price: Low-High</div>
                                <div className="p-2 text-left text-darkGrey text-xxs cursor-pointer" onClick={() => sortProducts('Price: High-Low')}>Price: High-Low</div>
                                <div className="p-2 text-left text-darkGrey text-xxs cursor-pointer" onClick={() => sortProducts('Sort: A-Z')}>Sort: A-Z</div>
                                <div className="p-2 text-left text-darkGrey text-xxs cursor-pointer" onClick={() => sortProducts('Sort: Z-A')}>Sort: Z-A</div>
                            </div>
                        )}
                    </div>
                </div>
                <Products ProductArray={filteredProducts}></Products>
                <Footer />
            </div>
        </>
    );
};

export default SearchPage;
