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

// import React, { useState } from 'react';
// import axios from 'axios';
// import './Main.css';
// import { FaSearch, FaArrowLeft } from 'react-icons/fa';

// const Main = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [noResults, setNoResults] = useState(false);
//   const [selectedForm, setSelectedForm] = useState('');
//   const [selectedStrength, setSelectedStrength] = useState('');
//   const [selectedPackaging, setSelectedPackaging] = useState('');

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`https://backend.cappsule.co.in/api/v1/new_search?q=${searchTerm}&pharmacyIds=1,2,3`);
//       const results = response.data.data.saltSuggestions;

//       if (results.length === 0) {
//         setNoResults(true);
//       } else {
//         setSearchResults(results);
//         setNoResults(false);
//       }
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const handleReset = () => {
//     setSearchTerm('');
//     setSearchResults([]);
//     setNoResults(false);
//     setSelectedForm('');
//     setSelectedStrength('');
//     setSelectedPackaging('');
//   };

//   const splitStrength = (strength) => {
//     return strength.trim().split('+').map((item) => item.trim());
//   };

//   const handleFormSelect = (form) => {
//     setSelectedForm(form);
//   };

//   const handleStrengthSelect = (strength) => {
//     setSelectedStrength(strength);
//   };

//   const handlePackagingSelect = (packaging) => {
//     setSelectedPackaging(packaging);
//   };

//   return (
//     <div className='main'>
//       <div className="main-container">
//         <div className="input-wrapper">
//           {searchResults.length > 0 ? (
//             <button className="back-button" onClick={handleReset}>
//               <FaArrowLeft />
//             </button>
//           ) : (
//             <FaSearch id="search-icon" />
//           )}
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleInputChange}
//             onKeyPress={handleKeyPress}
//             placeholder="Type your medicine here ...."
//           />
//           <button className="search-button" onClick={handleSearch}>
//             Search
//           </button>
//         </div>
//         <div className="divider"></div>
//         {noResults ? (
//           <p>No results found</p>
//         ) : (
//           <>
//             {searchResults.map((result) => (
//               <div key={result.id} className="salt-info">
//                 <div className="main3">
//                   <div className="div1">
//                     <div className="comp1">
//                       <div className="form-container">
//                         <div className="form-wrapper">
//                           Form:
//                           {result.available_forms.map((form, index) => (
//                             <button
//                               key={index}
//                               className={`form-button ${selectedForm === form ? 'selected' : ''}`}
//                               onClick={() => handleFormSelect(form)}
//                             >
//                               {form}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="comp2">
//                       <div className="strength-container">
//                         Strength:
//                         {splitStrength(result.most_common.Strength).map(
//                           (strength, index) => (
//                             <button
//                               key={index}
//                               className={`strength-button ${selectedStrength === strength ? 'selected' : ''}`}
//                               onClick={() => handleStrengthSelect(strength)}
//                             >
//                               {strength}
//                             </button>
//                           )
//                         )}
//                       </div>
//                     </div>
//                     <div className="comp3">
//                       <div className="packing-container">
//                         Packaging:
//                         {splitStrength(result.most_common.Packing).map(
//                           (packing, index) => (
//                             <button
//                               key={index}
//                               className={`packing-button ${selectedPackaging === packing ? 'selected' : ''}`}
//                               onClick={() => handlePackagingSelect(packing)}
//                               style={{padding: "3px"}}
//                             >
//                               {packing}
//                             </button>
//                           )
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="div2">
//                     <div className="ccc">
//                       <b>Salt {String.fromCharCode(64 + result.salt.split('+').length)}</b>
//                       <br />
//                       {selectedForm || result.available_forms[0]} | {selectedStrength || result.most_common.Strength.split('+')[0]} | {selectedPackaging || result.most_common.Packing.split('+')[0]}
//                     </div>
//                   </div>
//                   <div className="div3">
//                     <div className="cc">
//                       {result.ProductID ? `$${result.ProductID[0].selling_price}` : (
//                         <div className="no-store-message">
//                           No store near you selling this product
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Main;



// import React, { useState } from 'react';
// import axios from 'axios';
// import './Main.css';
// import { FaSearch, FaArrowLeft } from 'react-icons/fa';

// const Main = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [noResults, setNoResults] = useState(false);

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`https://backend.cappsule.co.in/api/v1/new_search?q=${searchTerm}&pharmacyIds=1,2,3`);
//       const results = response.data.data.saltSuggestions;

//       if (results.length === 0) {
//         setNoResults(true);
//       } else {
//         setSearchResults(results);
//         setNoResults(false);
//       }
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };
//   const pharmacy_id = 1;
//   const handleReset = () => {
//     setSearchTerm('');
//     setSearchResults([]);
//     setNoResults(false);
//   };

//   const splitStrength = (strength) => {
//     // Split strength by "+" symbol and remove any leading/trailing spaces
//     return strength.trim().split('+').map((item) => item.trim());
//   };

//   return (
//     <div className='main'>
//     <div className="main-container">
//       <div className="input-wrapper">
//         {searchResults.length > 0 ? (
//           <button className="back-button" onClick={handleReset}>
//             <FaArrowLeft />
//           </button>
//         ) : (
//           <FaSearch id="search-icon" />
//         )}
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={handleInputChange}
//           onKeyPress={handleKeyPress}
//           placeholder="Type your medicine here ...."
//         />
//         <button className="search-button" onClick={handleSearch}>
//           Search
//         </button>
//       </div>
//       <div className="divider"></div>
//       {noResults ? (
//         <p>No results found</p>
//       ) : (
//         <>
//           {searchResults.map((result) => (
//             <div key={result.id} className="salt-info">
//               <div className="main3">
//                 <div className="div1">
//                   <div className="comp1">
//                     <div className="form-container">
//                       {/* Wrap available forms in a rectangular div */}
//                       <div className="form-wrapper">
//                         Form:
//                         {result.available_forms.map((form, index) => (
//                           <button key={index} className="form-button">
//                             {form}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="comp2">
//                     <div className="strength-container">
//                       Strength:
//                       {splitStrength(result.most_common.Strength).map(
//                         (strength, index) => (
//                           <button key={index} className="strength-button">
//                             {strength}
//                           </button>
//                         )
//                       )}
//                     </div>
//                   </div>
//                   <div className="comp3">
//                     <div className="packing-container">
//                       Packaging:
//                       {splitStrength(result.most_common.Packing).map(
//                         (packing, index) => (
//                           <button key={index} style={{padding: "3px"}} className="packing-button">
//                             {packing}
//                           </button>
//                         )
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="div2">
//                   <div className="ccc" ><b>Salt {String.fromCharCode(64 + result.salt.split('+').length)}</b>
//                   <br></br>
//                   {result.available_forms[0]} | {result.most_common.Strength.split('+')[0]} | {result.most_common.Packing.split('+')[0]}</div>
//                 </div>
//                 <div className="div3">
                


//                   <div className="cc" >
//                   {result.ProductID? `$${result.ProductID[0].selling_price}` : (
//       <div className="no-store-message">
//         No store near you selling this product
//       </div>
//     )}

                 
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </>
//       )}
//     </div>
//     </div>
//   );
// };

// export default Main;




// import React, { useState } from 'react';
// import axios from 'axios';
// import './Main.css';
// import { FaSearch, FaArrowLeft } from 'react-icons/fa';

// const Main = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [noResults, setNoResults] = useState(false);

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`https://backend.cappsule.co.in/api/v1/new_search?q=${searchTerm}&pharmacyIds=1,2,3`);
//       const results = response.data.data.saltSuggestions;

//       if (results.length === 0) {
//         setNoResults(true);
//       } else {
//         setSearchResults(results);
//         setNoResults(false);
//       }
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const handleReset = () => {
//     setSearchTerm('');
//     setSearchResults([]);
//     setNoResults(false);
//   };

//   return (
//     <div className="main-container">
//       <div className="input-wrapper">
//         {searchResults.length > 0 ? (
//           <button className="back-button" onClick={handleReset}>
//             <FaArrowLeft />
//           </button>
//         ) : (
//           <FaSearch id="search-icon" />
//         )}
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={handleInputChange}
//           onKeyPress={handleKeyPress}
//           placeholder="Type your medicine here ...."
//         />
//         <button className="search-button" onClick={handleSearch}>
//           Search
//         </button>
//       </div>
//       <div className="divider"></div>
//       {noResults ? (
//         <p>No results found</p>
//       ) : (
//         <>
//           {searchResults.map((result) => (
//             <div key={result.id} className="salt-info">
             
//               {/* <div className="card"> */}
                

//              <div className='main3'>                <div className="div1">
//         <div className="comp1">Form :  {result.available_forms.map((form, index) => (
//   <button key={index} ></button>
// ))}
//                         </div>
//         <div className="comp2">Form : {result.most_common.Strength}</div>
//         <div className="comp3">Packaging : {result.most_common.Packing}</div>
//       </div>
//       <div className="div2">
//         <div className="ccc">{result.salt}</div>
//       </div>
//       <div className="div3">
//         <div className="cc">jooj</div>
//       {/* </div> */}
//       </div>

                

//               </div>
//             </div>
//           ))}
//         </>
//       )}
//     </div>
//   );
// };

// export default Main;



// import React, { useState } from 'react';
// import axios from 'axios';
// import './Main.css';
// import searchIcon from './download1.png';
// import { FaSearch } from 'react-icons/fa';
// const Main = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [noResults, setNoResults] = useState(false);

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`https://backend.cappsule.co.in/api/v1/new_search?q=${searchTerm}&pharmacyIds=1,2,3`);
//       const results = response.data.data.saltSuggestions;

//       if (results.length === 0) {
//         setNoResults(true);
//       } else {
//         setSearchResults(results);
//         setNoResults(false);
//       }
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   return (
//     <div className="main-container">
//       <div className="input-wrapper">
//       <FaSearch id="search-icon" />
//       <input
//         type="text"
        
//         value={searchTerm}
//         onChange={handleInputChange}
       
//         placeholder="Search..."
//       />
//        <button className="search-button" onClick={handleSearch}>
//         Search
//     </button>
//     </div>
//       <div className="divider"></div>
//       {noResults ? (
//         <p>No results found</p>
//       ) : (
//         searchResults.map((result) => (
//           <div key={result.id} className="salt-info">
//             {/* Display search results */}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Main;

