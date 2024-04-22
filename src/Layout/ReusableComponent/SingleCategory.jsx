import React from 'react';
import Bottles from '../../assets/Bottles.png';

const SingleCategory = () => {
    return(
        <div className="bg-white border-2 border-red-500 rounded-lg p-2 flex justify-between items-center mx-auto 
                        w-9/10 max-w-[165vh] pt-3 pb-3 mb-2">
             <div className="flex">
                <div className="flex-1" style={{ flexBasis: '30%' }}> {/* Adjust the first div to take up 30% */}
                    <img src={Bottles} className="w-20 h-15" alt="Bottles" />
                </div>
                <div className="flex-1" style={{ flexBasis: '70%' }}> {/* Adjust the second div to take up 70% */}
                    <p className='text-lg'>Drinks</p>
                    <p className='text-sm text-darkGrey'>Total Items: 26</p>
                </div>
            </div>
        </div>
    );
}

export default SingleCategory;
