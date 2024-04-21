import React from 'react';
import ElfBar from '../../assets/ElfBar.png';

const SingleBrand = () => {
  return (
    <div style={{ width: "23vh", height: "20vh" }} className="flex justify-center items-center">
      <div className="border-2 border-red-300 rounded-lg p-6 max-w-sm flex flex-col items-center">
        {/* Use Tailwind's percentage width to reduce image size relatively */}
        <img src={ElfBar} className="w-3/4 h-auto mb-10" alt="Elf Bar" />
        <p className="text-center mt-4 text-lg font-semibold">Elf Bar</p>
      </div>
    </div>
  );
};

export default SingleBrand;
