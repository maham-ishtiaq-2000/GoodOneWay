import React,{useState} from 'react';
import SideBar from '../../Layout/SideBar/SideBar';
import Footer from '../../Layout/Footer/Footer';
import Products from '../ReusableComponent/Products/Products';
import SearchBar from '../ReusableComponent/SearchBar';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const SearchPage = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };


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
          <div className='bg-lightPink'>
                <SideBar />
                <div className="flex w-full">
                    <div className="flex-1 w-95 lg:ml-5"> {/* This will take roughly 95% width */}
                        <SearchBar></SearchBar>
                    </div>
                    <div className="relative w-5"> 
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <FaArrowUp onClick={toggleDropdown} />
                        <FaArrowDown className='ml-3' onClick={toggleDropdown} />
                    </div>

                    {/* Dropdown content */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 z-10 mt-1 bg-platinum border rounded shadow w-40"> {/* Added bg-blue-100 for light blue background */}
                        <div className="p-2 text-left text-darkGrey text-xxs">Price: Low-High</div>
                        <div className="p-2 text-left text-darkGrey text-xxs">Price: High-Low</div>
                        <div className="p-2 text-left text-darkGrey text-xxs">Sort: A-Z</div>
                        <div className="p-2 text-left text-darkGrey text-xxs">Sort: Z-A</div> {/* Corrected duplicate "Sort: A-Z" to "Sort: Z-A" */}
                    </div>
                    
                    )}
                </div>

                </div>
                <Products ProductArray={ProductArray}></Products>
                <Footer/>
          </div>
        </>
    )
}

export default SearchPage;