import React, { useState } from 'react';

const SearchBar = ({ data, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term); // Pass the search term to a function for further handling (e.g., filtering data)
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {/* Additional elements or styles can be added as needed */}
    </div>
  );
};

export default SearchBar;
