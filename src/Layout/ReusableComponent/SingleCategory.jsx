import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SingleCategory = ({ category }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    console.log(category)
  
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
            if (category.title) {
                collections = collections.filter(collection => collection.title.toLowerCase() === category.title.toLowerCase());
                if (collections.length > 0) {
                    const productsWithImages = collections[0].products.edges
                        .map(edge => edge.node)
                        .filter(product => product.featuredImage && product.featuredImage.url);
                    setProducts(productsWithImages);
                }
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    

    useEffect(() => {
        fetchProducts();
    }, [category]);

    console.log(products)

    const navigateToProducts = () => {
        navigate(`/searchPage/${category.title}`);
        onVisit();
        localStorage.setItem('visitedCategoryId', category.id);
    };

   

    return (
        <div
        className={`bg-white border-2 border-red-500 rounded-lg p-2 flex justify-between items-center mx-auto w-9/10 max-w-[165vh] pt-3 pb-3 mb-2`}
        onClick={navigateToProducts}
        style={{ cursor: 'pointer', height: '100px'}}
        >
            <div className="flex-1" style={{ flexBasis: '20%' }}>
                <img
                    src={category.image.url}
                    className="h-15 w-30"
                    alt={category.title}
                    style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                />
            </div>
            <div className="flex-1 ml-2" style={{ flexBasis: '80%' }}>
                <p className="text-lg">{category.title}</p>
                <p className="text-sm text-darkGrey">Total Items: {products.length}</p>
            </div>
        </div>
    );
};

export default SingleCategory;
