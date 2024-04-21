import React from "react";
import { FaUser, FaStar, FaHeart, FaImage, FaRegFolder, FaBullhorn } from 'react-icons/fa';
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
    path: "/",
    icon: <FaUser />,
    cName: "nav-text",
  },
   {
    title: "Exclusive Products",
    path: "/reports",
    icon: <FolderWithStar />,
    cName: "nav-text",
  },
  {
    title: "Trending Products",
    path: "/products",
    icon: <FiTrendingUp />,
    cName: "nav-text",
  },
  {
    title: "Clearance",
    path: "/team",
    icon: <FaBullhorn />,
    cName: "nav-text",
  },
  {
    title: "Favourites",
    path: "/messages",
    icon: <FaHeart />,
    cName: "nav-text",
  },
  {
    title: "Contact Us",
    path: "/support",
    icon: <FaImage />,
    cName: "nav-text",
  },
  {
    title: "Log Out",
    path: "/",
    icon: <IoMdExit />,
    cName: "nav-text",
  },
];