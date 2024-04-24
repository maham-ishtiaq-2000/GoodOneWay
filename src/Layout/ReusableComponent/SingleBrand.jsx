import React from 'react';
import { useNavigate } from 'react-router-dom';
import ElfBar from '../../assets/ElfBar.png';

const SingleBrand = () => {
  const navigate = useNavigate(); 
  const navigateToSearch = () => {
    navigate('/searchPage');  // Change '/searchPage' to your desired route path
  };

  return (
    <div style={{ width: "23vh", height: "20vh", cursor: 'pointer'}} className="flex justify-center items-center" onClick={navigateToSearch}>
      <div className="border-2 border-red-300 rounded-lg p-6 max-w-sm flex flex-col items-center" onClick={navigateToSearch} style={{ cursor: 'pointer' }}>
        {/* Use Tailwind's percentage width to reduce image size relatively */}
        <img src={ElfBar} className="w-3/4 h-auto mb-10" alt="Elf Bar" />
        <p className="text-center mt-4 text-lg font-semibold">Elf Bar</p>
      </div>
    </div>
  );
};

export default SingleBrand;
