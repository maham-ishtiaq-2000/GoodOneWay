import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../Layout/SideBar/SideBar';
import Footer from '../../Layout/Footer/Footer';
import SingleCategory from '../ReusableComponent/SingleCategory';
import { FaSearch, FaTimes } from 'react-icons/fa';
import SearchBar from '../ReusableComponent/SearchBar';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            const url = 'https://881ccd-2.myshopify.com/api/2024-04/graphql.json';
            const headers = {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': 'fcc1ef09b820e82704c1e9e597cddd84'
            };
            const graphqlQuery = {
                query: `query { collections(first: 250, query:"tag:category") { edges { node { id title description image { url } } } } }`
            };

            try {
                const response = await axios.post(url, graphqlQuery, { headers });
                const fetchedCategories = response.data.data.collections.edges
                    .map(edge => edge.node)
                    .filter(category => category.description && category.description.toLowerCase().includes('category'));
                
                setCategories(fetchedCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const filteredCategories = categories.filter(category => 
        category.title.toLowerCase().includes(searchTerm) || 
        (category.description && category.description.toLowerCase().includes(searchTerm))
    );

    return (
        <>
            <div className='homePageColor'>
                <SideBar />
                <div className="flex justify-center items-center w-full pl-7 pr-7 mb-5">
                    <div className="w-full top-2 left-0 z-10">
                        <div className="flex items-center justify-center w-full">
                            <div className="relative w-full">
                                <FaSearch className="absolute left-10 top-0 bottom-0 m-auto text-lg text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search Available Categories"
                                    className="w-full pl-20 pr-10 py-3 rounded-full text-grey bg-lightGray focus:outline-none"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <FaTimes
                                    className="absolute right-4 top-0 bottom-0 m-auto text-lg text-gray-500 cursor-pointer"
                                    onClick={clearSearch}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overflow-auto mb-5 pb-10" style={{ height: '80vh' }}>
                    {filteredCategories.map((category, index) => (
                        <SingleCategory key={index} category={category} />
                    ))}
                </div>
                <Footer formPage="CategoriesPage" />
            </div>
        </>
    );
}

export default Categories;
