import React from 'react';

const SearchBar = ({ onSearch, onSort }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4 border border-gray-300">
      <input
        type="text"
        placeholder="Search comments..."
        onChange={(e) => onSearch(e.target.value)}
        className="border rounded-lg p-2 w-full mb-2"
      />
      <select
        onChange={(e) => onSort(e.target.value)}
        className="border rounded-lg p-2 w-full"
      >
        <option value="date">Sort by Date</option>
        <option value="likes">Sort by Likes</option>
      </select>
    </div>
  );
};

export default SearchBar;
