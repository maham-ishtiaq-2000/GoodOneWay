import React, { useState } from 'react';
import Bottles from '../../../assets/Bottles.png';

const SingleVariant = ({item}) => {
    console.log(item)
    const [count, setCount] = useState(0);
    
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count > 0 ? count - 1 : 0);
    
    const handleInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value >= 0) {
            setCount(value);
        }
    };

    return (
        <div className="bg-white border-2 border-red-500 rounded-lg p-2 flex justify-between items-center mx-auto w-9/10 max-w-[165vh] pt-3 pb-3 mb-2">
            <div className="flex">
                <div className="flex-1" style={{ flexBasis: '30%' }}>
                    <img src={Bottles} className="w-20 h-15" alt="Bottles" />
                </div>
                <div className="flex-1" style={{ flexBasis: '70%' }}>
                    <div className='pl-2'>
                        <p className='text-sm text-left'>{item.name}</p>
                        <p className='text-darkGrey text-left' style={{"fontSize" : "12px"}}>Price: £{item.price}</p>
                    </div>
                </div>
            </div>
            {/* Counter interface */}
            <div className="flex items-center">
                <button
                    onClick={decrement}
                    className="bg-red-500 text-white font-bold rounded w-6 h-6 flex items-center justify-center"
                    type="button"
                >
                    -
                </button>
                <input 
                    type="text"
                    value={count}
                    onChange={handleInputChange}
                    className="mx-2 text-center w-8 outline-none"
                />

                <button
                    onClick={increment}
                    className="bg-red-500 text-white font-bold rounded w-6 h-6 flex items-center justify-center"
                    type="button"
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default SingleVariant;
