import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../Layout/SideBar/SideBar';
import Footer from '../../Layout/Footer/Footer';
import SingleBrand from '../ReusableComponent/SingleBrand';
import { FaSearch, FaTimes } from 'react-icons/fa';

const Brand = () => {
    const [brands, setBrands] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const fetchBrands = async () => {
            const url = 'https://881ccd-2.myshopify.com/api/2024-04/graphql.json';
            const headers = {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': 'fcc1ef09b820e82704c1e9e597cddd84'
            };
            const graphqlQuery = {
                query: `query { collections(first: 250, query:"tag:brand") { edges { node { id title description image { url } } } } }`
            };

            try {
                const response = await axios.post(url, graphqlQuery, { headers });
                const fetchedBrands = response.data.data.collections.edges
                    .map(edge => edge.node)
                    .filter(brand => brand.image && brand.image.url);
                
                setBrands(fetchedBrands);
                setFilteredBrands(fetchedBrands); // Initialize filtered brands
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };

        fetchBrands();
    }, []);

    useEffect(() => {
        const filtered = brands.filter(brand =>
            brand.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredBrands(filtered);
    }, [searchValue, brands]);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchValue('');
    };

    return (
        <>
            <div className='homePageColor'>
                <SideBar />
                <div className="flex justify-center items-center w-full pl-7 pr-7 mb-5">
                    <div className="relative w-full">
                        <FaSearch className="absolute left-10 top-0 bottom-0 m-auto text-lg text-gray-500" />
                        <input
                            type="text"
                            value={searchValue}
                            onChange={handleSearchChange}
                            className="w-full pl-20 pr-10 py-3 rounded-full text-grey bg-lightGray focus:outline-none"
                            placeholder="Search Available Brands"
                        />
                        {searchValue && (
                            <FaTimes
                                className="absolute right-4 top-0 bottom-0 m-auto text-lg text-gray-500 cursor-pointer"
                                onClick={handleClearSearch}
                            />
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-y-10 pl-3 overflow-auto pb-40 mt-5 mx-auto"
                     style={{ height: '80vh' ,width: '95%' }}>
                    {filteredBrands.map((brand, index) => (
                        <SingleBrand key={index} brand={brand} />
                    ))}
                </div>
                <Footer formPage="brandPage" />
            </div>
        </>
    );
}

export default Brand;
