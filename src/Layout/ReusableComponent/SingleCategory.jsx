import React from 'react';
import Bottles from '../../assets/Bottles.png';  // Make sure Bottles is being used or remove this import if not used elsewhere.
import { useNavigate } from 'react-router-dom';

const SingleCategory = ({category}) => {
    const navigate = useNavigate(); 
    const navigateToProducts = () => {
        navigate(`/searchPage/${category.title}`);
    };
    return(
        <div className="bg-white border-2 border-red-500 rounded-lg p-2 flex justify-between items-center mx-auto 
                        w-9/10 max-w-[165vh] pt-3 pb-3 mb-2" onClick={navigateToProducts} 
                        style={{ cursor: 'pointer', height: '100px' }}>  
         
                <div className="flex-1" style={{ flexBasis: '5%' }}> 
                    <img src={category.image.url} className="h-15 w-20" alt="Bottles"
                         style={{ width: '80px', height: '60px', objectFit: 'cover' }} />  
                </div>
                <div className="flex-1 ml-2" style={{ flexBasis: '95%' }}> 
                    <p className='text-lg'>{category.title}</p>
                    <p className='text-sm text-darkGrey'>Total Items: 26</p>
                </div>

        </div>
    );
}

export default SingleCategory;
