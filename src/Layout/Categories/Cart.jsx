import React from 'react';
import SideBar from '../SideBar/SideBar';
import Footer from '../Footer/Footer';
import Bottles from '../../assets/Bottles.png';
import './Cart.css';


const Cart = () => {
    const items = Array.from({ length: 10 }, (_, index) => index);
    return(
        <>
          <div className='CartPageColor'>
                <SideBar />
                <div className="overflow-auto mb-5" style={{ height: '65vh' }}>
                    {items.map((item, index) => (
                            <div className={`flex w-full ${index % 2 === 0 ? 'bg-platinum' : 'bg-white'}`}>
                            <div className={`w-4/5 ${index % 2 === 0 ? 'bg-platinum' : 'bg-white'}`}>
                                <div className=" p-2 flex justify-between items-center mx-auto 
                                    w-9/10 max-w-[165vh] pt-3 pb-3 mb-2">
                                    <div className="flex">
                                        <div className="flex-1" style={{ flexBasis: '20%' }}>
                                            <img src={Bottles} className="w-20 h-20 rounded-lg custom-shadow mt-2" alt="Bottles" />
                                        </div>

                                        <div className="flex-1 ml-2" style={{ flexBasis: '85%' }}>
                                            <p className='text-xxs text-darkGrey mt-1'>FroRose Nova 600 Puffs Disposable Vape (Pack of 10)</p>
                                            <p className='text-sm text-black mt-6'>£60</p> 
                                            <p className='text-xxs text-darkGrey'>10mg / Strawberry Raspberry Cake</p> 
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className={`w-1/5 ${index % 2 === 0 ? 'bg-platinum' : 'bg-white'} flex justify-end items-center h-full p-3`}>
                            <div className="w-full md:w-1/2">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:flex-1">
                                    <button className={`${index % 2 === 0 ? 'bg-platinum' : 'bg-white'} border border-red-500 text-xxs rounded px-2 lg:mt-20`}>Remove</button>
                                    </div> 
                                    <div className={`md:flex-1 ${index % 2 === 0 ? 'bg-platinum' : 'bg-white'}`}>
                                        <div className="flex flex-col items-center space-y-1 mt-2">
                                                <button
                                                    className="bg-red-500 text-white rounded shadow-md px-1 mt-3"
                                                >
                                                    ▲
                                                </button>
                                                <span className="text-lg mr-4 mt-3 mb-3">1</span>
                                                <button
                                                    className="bg-red-500 text-white rounded shadow-md px-1 mb-2 mt-2"
                                                >
                                                    ▼
                                                </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            </div>

                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center w-full px-4 md:px-8 lg:px-4 border-b border-gray pb-3 shadow-top pt-2">
                    <div>
                        <p className='text-sm text-gray'>SKUs:</p>
                    </div>
                    <div>
                        <p className='text-sm text-gray'>3</p>
                    </div>
                </div>
                <div className="flex justify-between items-center w-full px-4 md:px-8 lg:px-4  pb-3 shadow-top pt-2">
                <div>
                    <p className='text-md font-semibold text-black'>
                        Total :<span className='text-xs font-normal mr-20 text-gray'>(Excl. Tax)</span>
                    </p>
                </div>

                    <div>
                        <p className='text-md font-semibold text-black'>£70</p>
                    </div>
                </div>


                <div className="flex flex-col md:flex-row w-full  space-y-2 space-x-1 md:space-y-0">
                    <div className="md:w-2/6">
                        <button className='px-10 py-2 w-full bg-platinum border border-red-500 rounded-full text-red-500'>
                        Clear
                        </button>
                    </div>

                    <div className="md:w-4/6">
                        <button className='px-10 py-2 w-full bg-red-500 border border-red-500 rounded-full text-white'>
                        Go To Checkout
                        </button>
                    </div>
                </div>




                <Footer formPage="cartPage"/>

          </div>
        </>
    )
}

export default Cart;
