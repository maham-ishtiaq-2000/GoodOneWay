import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({placeholderName, onSearchChange}) => {
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    onSearchChange(event.target.value);  // Pass the value to the parent component
  };

  const handleClearSearch = () => {
    setSearchValue('');
    onSearchChange('');  // Reset the search in the parent component
  };
  return (
    <div className="w-full top-2 left-0 z-10">
      <div className="flex items-center justify-center w-full">
        <div className="relative w-full">
          <FaSearch className="absolute left-10 top-0 bottom-0 m-auto text-lg text-gray-500" />
          <input
            type="text"
            placeholder={placeholderName}
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full pl-20 pr-10 py-3 rounded-full text-grey bg-lightGray focus:outline-none"
          />
          {searchValue && (
            <FaTimes
              className="absolute right-4 top-0 bottom-0 m-auto text-lg text-gray-500 cursor-pointer"
              onClick={handleClearSearch}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
