import React from "react";
import { FaUser, FaStar, FaHeart, FaImage, FaRegFolder, FaBullhorn, FaProductHunt } from 'react-icons/fa';
import { IoIosAirplane, IoMdExit } from 'react-icons/io'; 
import { FiTrendingUp ,  FiVolume2} from 'react-icons/fi'


const FolderWithStar = () => (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <FaRegFolder size={22} />
      <FaStar size={10} style={{ position: 'absolute', right: -4, top: -4 }} />
    </div>
  );

export const SidebarData = [
  {
    title: "My Account",
    path: "https://goodonedeals.co.uk/account/login?return_url=%2Faccount",
    icon: <FaUser />,
    cName: "nav-text",
  },
   {
    title: "Exclusive Products",
    path: "/featuredProducts",
    icon: <FaProductHunt />,
    cName: "nav-text",
  },
  {
    title: "Trending Products",
    path: "/trendingProducts",
    icon: <FiTrendingUp />,
    cName: "nav-text",
  },
  {
    title: "Clearance",
    path: "/clearanceProducts",
    icon: <FaBullhorn />,
    cName: "nav-text",
  },
  {
    title: "Favourites",
    path: "/favouriteProducts",
    icon: <FaHeart />,
    cName: "nav-text",
  },
  {
    title: "Contact Us",
    path: "https://goodonedeals.co.uk/pages/contact",
    icon: <FaImage />,
    cName: "nav-text",
  },
  {
    title: "Log Out",
    path: "/Login",
    icon: <IoMdExit />,
    cName: "nav-text",
  },
];