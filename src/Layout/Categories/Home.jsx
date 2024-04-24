import React from 'react';
import SideBar from '../../Layout/SideBar/SideBar';
import Footer from '../../Layout/Footer/Footer';
import Products from '../ReusableComponent/Products/Products';
import goodOneDeals from '../../assets/goodOneDeals.png';

const Home = () => {

        const ProductArray = [{
            id : 1, 
            img : '../../assets/Bottles.png',
            description : 'ElfBar AF5000 Device with 10ML Refill (Pack of 5)',
            price : 0.00,
        },
        {
            id : 2, 
            img : '../../assets/Bottles.png',
            description : 'ElfBar 600 Disposible Bars (Pack of 10)',
            price : 20.00,
        },
        {
            id : 3, 
            img : '../../assets/Bottles.png',
            description : 'ElfBar 600 Disposible Bars (Pack of 10)',
            price : 20.00,
        },
        {
            id : 4, 
            img : '../../assets/Bottles.png',
            description : 'ElfBar 600 Disposible Bars (Pack of 10)',
            price : 20.00,
        },
        {
            id : 5, 
            img : '../../assets/Bottles.png',
            description : 'ElfBar 600 Disposible Bars (Pack of 10)',
            price : 20.00,
        },
        {
            id : 6, 
            img : '../../assets/Bottles.png',
            description : 'Bar Juice Nic Salts 10mg (Pack of 10)',
            price : 13.00,
            variant : [
                {
                    name : 'translucent Orange',
                    img : '../../assets/Bottles.png',
                    price : 5.5
                },
                {
                    name : 'translucent Orange',
                    img : '../../assets/Bottles.png',
                    price : 9.8
                },
                {
                    name : 'translucent Orange',
                    img : '../../assets/Bottles.png',
                    price : 9.8
                },
                {
                    name : 'translucent Orange',
                    img : '../../assets/Bottles.png',
                    price : 9.8
                },
                {
                    name : 'translucent Orange',
                    img : '../../assets/Bottles.png',
                    price : 9.8
                }
            ]
        },
        {
            id : 7, 
            img : '../../assets/Bottles.png',
            description : 'Bar Juice Nic Salts 10mg (Pack of 10)',
            price : 13.00,
            variant : [
                {
                    name : 'translucent Orange',
                    img : '../../assets/Bottles.png',
                    price : 5.5
                },
                {
                    name : 'translucent Orange',
                    img : '../../assets/Bottles.png',
                    price : 9.8
                },
                {
                    name : 'translucent Orange',
                    img : '../../assets/Bottles.png',
                    price : 9.8
                },
                {
                    name : 'translucent Orange',
                    img : '../../assets/Bottles.png',
                    price : 9.8
                },
                {
                    name : 'translucent Orange',
                    img : '../../assets/Bottles.png',
                    price : 9.8
                }
            ]
        },
        {
            id : 8, 
            img : '../../assets/Bottles.png',
            description : 'Bar Juice Nic Salts 10mg (Pack of 10)',
            price : 13.00,
            variant : [
                {
                    name : 'translucent Orange',
                    img : '../../assets/Bottles.png',
                    price : 5.5
                },
                {
                    name : 'translucent Orange',
                    img : '../../assets/Bottles.png',
                    price : 9.8
                },
                {
                    name : 'translucent Orange',
                    img : '../../assets/Bottles.png',
                    price : 9.8
                },
                {
                    name : 'translucent Orange',
                    img : '../../assets/Bottles.png',
                    price : 9.8
                },
                {
                    name : 'translucent Orange',
                    img : '../../assets/Bottles.png',
                    price : 9.8
                }
            ]
        },
    ]
    return(
        <>
          <div className='homePageColor'>
                <SideBar />
                {/* Responsive image taking 80% of the screen width */}
                <img 
                    src={goodOneDeals} 
                    alt="Good One Deals" 
                    style={{ width: '80vw', height: 'auto' }}
                />
                <p className='font-bold ml-10 mt-2'>Featured</p>
                <Products ProductArray={ProductArray}></Products>
                <Footer/>
          </div>
        </>
    );
}

export default Home;
