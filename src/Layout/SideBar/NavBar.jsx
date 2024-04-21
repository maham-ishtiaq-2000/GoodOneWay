import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import './SideBar.css';
import { IconContext } from "react-icons";
import Logo from '../../assets/LogoHome.png';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className={sidebar ? "overlay active" : "overlay"} onClick={showSidebar}></div>
        <div className="navbar bg-lightPink flex justify-center items-center w-full h-20">
          <Link to="#" className="menu-bars absolute left-4" onClick={showSidebar}>
            <FaIcons.FaBars />
          </Link>
          <img src={Logo} alt="Descriptive Alt Text" className="w-30 h-20" />
          <div className="icon-container absolute top-7 right-10 flex items-center space-x-4">
            <FaIcons.FaHeart className="text-2xl" />
            <FaIcons.FaUser className="text-2xl"/>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"} style={{"paddingRight" : "10px"}}>
          <ul className="nav-menu-items bg-lightPink" onClick={showSidebar}>
            <li className="navbar-toggle bg-lightPink">
              <Link to="#" className="menu-bars bg-lightPink">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <img src={Logo} className="w-30 h-20 ml-20"></img>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;