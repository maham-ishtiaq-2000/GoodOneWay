import React from 'react';
import SideBar from '../../Layout/SideBar/SideBar';
import SearchBar from '../ReusableComponent/SearchBar';
import Footer from '../../Layout/Footer/Footer';
import SingleCategory from '../ReusableComponent/SingleCategory';

const Categories = () => {
    const categories = Array.from({ length: 30 }, (_, index) => index); 

    return (
        <>
            <div className='homePageColor'>
                <SideBar />
                <div className="flex justify-center items-center w-full pl-7 pr-7 mb-5">
                    <SearchBar placeholderName={"Search All Categories"} />
                </div>
                {/* Scrollable container for SingleCategory components */}
                <div className="overflow-auto mb-5" style={{ height: '80vh' }}> {/* Setting a fixed height */}
                    {categories.map((_, index) => (
                        <SingleCategory key={index} />
                    ))}
                </div>
                <Footer  formPage="CategoriesPage" />
            </div>
        </>
    );
}

export default Categories;
