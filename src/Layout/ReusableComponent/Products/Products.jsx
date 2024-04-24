import React from 'react';
import SingleProduct from './SingleProduct';

const Products = ({ ProductArray }) => {
    return(
        <>
          <div className='bg-homePageColor p-4' style={{ minHeight: '100vh' }}>
            {/* Responsive grid container */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 gap-y-10 p-4 overflow-auto" style={{ height: '85vh' }}>
              {ProductArray.map((product, index) => (
                <SingleProduct key={index} product={product} />
              ))}
            </div>
          </div>
        </>
    );
}

export default Products;
