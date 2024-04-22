import React from 'react';
import SideBar from '../../Layout/SideBar/SideBar';
import Footer from '../../Layout/Footer/Footer';
import goodOneDeals from '../../assets/goodOneDeals.png';

const Home = () => {
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
                <p>Featured</p>
                <Footer/>
          </div>
        </>
    );
}

export default Home;
