import React from 'react';
import SideBar from '../../Layout/SideBar/SideBar';
import SearchBar from '../ReusableComponent/SearchBar';
import Footer from '../../Layout/Footer/Footer';
import SingleBrand from '../ReusableComponent/SingleBrand';

const Brand = () => {
    const singleBrands = new Array(14).fill(null);

    return (
        <>
            <div className='homePageColor'>
                <SideBar></SideBar>
                <div className="flex justify-center items-center w-full pl-7 pr-7 mb-5">
                    <SearchBar></SearchBar>
                </div>
                {/* Responsive grid container */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 gap-y-10 p-4">
                    {singleBrands.map((_, index) => (
                        <SingleBrand key={index} />
                    ))}
                </div>
                <Footer></Footer>
            </div>
        </>
    );
}

export default Brand;
