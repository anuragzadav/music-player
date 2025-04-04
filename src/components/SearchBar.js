import React from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.scss";

const SearchBar = ({ setSearchTerm }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search Songs, Artist"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <FaSearch className="search-icon" />
    </div>
  );
};

export default SearchBar;
