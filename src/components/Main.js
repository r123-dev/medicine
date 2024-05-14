import React, { useState } from 'react';
import axios from 'axios';
import './Main.css';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import SaltInfo from './SaltInfo';

const Main = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);


  
  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://backend.cappsule.co.in/api/v1/new_search?q=${searchTerm}&pharmacyIds=1,2,3`);
      const results = response.data.data.saltSuggestions;

      if (results.length === 0) {
        setNoResults(true);
      } else {
        setSearchResults(results);
        setNoResults(false);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setSearchResults([]);
    setNoResults(false);
  };

  return (
    <div className='main'> 
   <div style={{marginTop:"100px",fontSize:"36px"}}> Cappsule web development test </div> 
   
      <div className="main-container">
         
        <div className="input-wrapper">
          {searchResults.length > 0 ? (
            <button className="back-button" onClick={handleReset}>
              <FaArrowLeft />
            </button>
          ) : (
            <FaSearch id="search-icon" />
          )}
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your medicine here ...."
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="divider"></div>
        {noResults ? (
          <p>No results found</p>
        ) : (
          searchResults.map((result) => (
            <SaltInfo key={result.id} result={result} />
          ))
        )}
      </div>
    </div>
  );
};

export default Main;
