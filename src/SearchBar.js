import React, { useState } from 'react';

const SearchBar = ({ onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    onSort(e.target.value);
  };

  return (
    <div className="mb-4 flex items-center space-x-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search comments..."
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
      />
      <select onChange={handleSortChange} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm">
        <option value="date">Sort by Date</option>
        <option value="likes">Sort by Likes</option>
      </select>
    </div>
  );
};

export default SearchBar;