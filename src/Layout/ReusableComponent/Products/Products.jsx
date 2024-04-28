import React from 'react';
import SingleProduct from './SingleProduct';
import SingleFeaturedProduct from './SingleFeaturedProduct';

const Products = ({ ProductArray, component }) => {
  // Check if the current component is not 'HomePage'
  const isNotHomePage = component !== 'HomePage';

  return (
    <>
      <div className='bg-homePageColor p-4'>
        {/* Only render the grid if it's not the HomePage */}
        {isNotHomePage && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-1 gap-y-10 py-4 overflow-auto pb-40" style={{ height: '85vh' }}>
            {ProductArray.map((product, index) => (
              <SingleProduct key={index} product={product} />
            ))}
          </div>
        )}
        {!isNotHomePage && (
          <div 
          className="grid auto-cols-max grid-flow-col gap-3 p-4 overflow-x-auto lg:pb-10"
        >
          {ProductArray.map((product, index) => (
            <SingleFeaturedProduct key={index} product={product} />
          ))}
        </div>
        
        )}
      </div>
    </>
  );
}

export default Products;
