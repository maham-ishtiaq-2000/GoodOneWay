import React, { useState } from 'react';

const SingleVariant = ({ item }) => {
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
        <div className="bg-white border-2 border-red-500 rounded-lg p-2 flex justify-between items-center mx-auto w-9/10 max-w-[165vh] pt-3 pb-3 mb-2" style={{ paddingLeft: '5px' }}>
            <div className="flex" style={{ width: '100%' }}>
                {/* Fixed size for image container to match the image size */}
                <div style={{ width: '50px', marginRight: '10px' }}> 
                    <img src={item.image.url} style={{ width: '50px', height: '50px' }} alt={item.title} />
                </div>
                {/* Flex container for text, takes remaining space */}
                <div className="flex-1" style={{ flexGrow: 1 }}>
                    <div className='pl-2'>
                        <p className='text-sm text-left'>{item.title}</p>
                        <p className='text-darkGrey text-left' style={{ fontSize: "12px" }}>Price: £{item.price.amount}</p>
                    </div>
                </div>
            </div>
            {/* Counter interface */}
            <div className="flex items-center">
                <button onClick={decrement} className="bg-red-500 text-white font-bold rounded w-6 h-6 flex items-center justify-center" type="button">-</button>
                <input type="text" value={count} onChange={handleInputChange} className="mx-2 text-center w-8 outline-none" />
                <button onClick={increment} className="bg-red-500 text-white font-bold rounded w-6 h6 flex items-center justify-center" type="button">+</button>
            </div>
        </div>
    );
}

export default SingleVariant;
