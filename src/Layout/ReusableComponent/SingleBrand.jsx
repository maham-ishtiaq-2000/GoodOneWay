import React from 'react';
import SearchPage from '../Categories/SearchPage';
import { useNavigate } from 'react-router-dom';


const SingleBrand = ({ brand, isSelected, onSelect }) => {
  const navigate = useNavigate();

  const navigateToProducts = () => {
    navigate(`/searchPage/${brand.title}`);
    onSelect(brand.id);  // Set this brand as selected
    localStorage.setItem('selectedBrandId', brand.id);  // Store selected brand ID in localStorage
  };

  // Updated background colors for better contrast and visibility
  const backgroundColor = isSelected ? '#FFEAE9' : 'white';  // Using Hex codes for gray and dark gray

  return (
    <div 
      style={{ width: "180px", margin: "0 20px", cursor: 'pointer', backgroundColor }}
      className="flex justify-center items-center"
      onClick={navigateToProducts}
    >
      <div className="border-2 border-red-300 rounded-lg py-6 max-w-sm flex flex-col items-center justify-between" style={{ cursor: 'pointer', height: "100%", width: "100%" }}>
        <img src={brand.image.url} style={{ width: "110px", height: "70px", objectFit: 'contain' }} alt="Brand" />
        <p className="text-center text-lg" style={{ height: "30px", width: "100%" }}>{brand.title}</p>
      </div>
    </div>
  );
};

export default SingleBrand;



