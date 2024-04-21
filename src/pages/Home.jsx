import React,{useState} from 'react';
import SideBar from '../Layout/SideBar/SideBar';
import Footer from '../Layout/Footer/Footer';

const Home = () => {

    return(
        <>
          <div className='homePageColor'>
                <SideBar></SideBar>  
                <p>This is home page</p>
                <Footer></Footer>  
          </div>
        </>

    )
}

export default Home;