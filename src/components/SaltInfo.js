

// import React, { useState, useEffect } from 'react';
// import './Main.css';

// const SaltInfo = ({ result }) => {
//   const [selectedForm, setSelectedForm] = useState(result.available_forms[0]);
//   const [selectedStrength, setSelectedStrength] = useState(result.most_common.Strength.split('+')[0].trim());
//   const [selectedPackaging, setSelectedPackaging] = useState(result.most_common.Packing.split('+')[0].trim());
//   const [price, setPrice] = useState(null);
//   const [showAllForms, setShowAllForms] = useState(false);
//   const [showAllStrengths, setShowAllStrengths] = useState(false);
//   const [showAllPackagings, setShowAllPackagings] = useState(false);
//   const [showLessForms, setShowLessForms] = useState(false);
//   const [showLessStrengths, setShowLessStrengths] = useState(false);
//   const [showLessPackagings, setShowLessPackagings] = useState(false);
//   const isFormAvailable = (form) => {
//     const formStrengths = Object.keys(result.salt_forms_json[form] || {});
//     return formStrengths.some(strength => isStrengthAvailable(strength));
//   };
//   useEffect(() => {
//     const formStrength = result.salt_forms_json[selectedForm];

//     if (formStrength) {
//       const strengthParts = result.most_common.Strength.split('+').map(part => part.trim());
//       const selectedStrengthFull = strengthParts.join('+');
//       const packagingOptions = formStrength[selectedStrengthFull]?.[selectedPackaging];

//       if (packagingOptions) {
//         const pharmacies = Object.values(packagingOptions).flat().filter(item => item !== null && item.selling_price !== undefined);

//         if (pharmacies.length > 0) {
//           const lowestPrice = Math.min(...pharmacies.map(pharmacy => pharmacy.selling_price));
//           setPrice(lowestPrice);
//         } else {
//           setPrice(null);
//         }
//       } else {
//         setPrice(null);
//       }
//     } else {
//       setPrice(null);
//     }
//   }, [selectedForm, selectedStrength, selectedPackaging, result.salt_forms_json]);

//   const splitStrength = (strength) => {
//     return strength?.trim().split('+').map((item) => item.trim()) || [];
//   };

//   const handleFormSelect = (form) => {
//     setSelectedForm(form);
//   };

//   const handleStrengthSelect = (strength) => {
//     setSelectedStrength(strength);
//   };

//   const handlePackagingSelect = (packing) => {
//     setSelectedPackaging(packing);
//   };

//   const handleShowMoreForms = () => {
//     setShowAllForms(true);
//     setShowLessForms(false);
//   };

//   const handleShowLessForms = () => {
//     setShowAllForms(false);
//     setShowLessForms(true);
//   };

//   const handleShowMoreStrengths = () => {
//     setShowAllStrengths(true);
//     setShowLessStrengths(false);
//   };

//   const handleShowLessStrengths = () => {
//     setShowAllStrengths(false);
//     setShowLessStrengths(true);
//   };

//   const handleShowMorePackagings = () => {
//     setShowAllPackagings(true);
//     setShowLessPackagings(false);
//   };

//   const handleShowLessPackagings = () => {
//     setShowAllPackagings(false);
//     setShowLessPackagings(true);
//   };

//   const formsToDisplay = showAllForms ? result.available_forms : result.available_forms.slice(0, 4);
//   const strengthsToDisplay = showAllStrengths ? splitStrength(result.most_common.Strength) : splitStrength(result.most_common.Strength).slice(0, 4);
//   const packagingsToDisplay = showAllPackagings ? splitStrength(result.most_common.Packing) : splitStrength(result.most_common.Packing).slice(0, 4);

// //   const isFormAvailable = (form) => {
// //     const formStrength = result.salt_forms_json[form];
// //     if (!formStrength) return false;

// //     return Object.values(formStrength).some(strength => {
// //       return Object.values(strength).some(pack => {
// //         return pack && Array.isArray(pack) && pack.some(pharmacy => pharmacy !== null && pharmacy.selling_price !== undefined);
// //       });
// //     });
// //   };

//   const isStrengthAvailable = (strength) => {
//     const strengthParts = splitStrength(strength).join('+');
//     const formStrength = result.salt_forms_json[selectedForm];
//     if (!formStrength) return false;

//     const packagingOptions = formStrength[strengthParts];
//     if (!packagingOptions) return false;

//     return Object.values(packagingOptions).some(pack => {
//       return pack && Array.isArray(pack) && pack.some(pharmacy => pharmacy !== null && pharmacy.selling_price !== undefined);
//     });
//   };

//   const isPackagingAvailable = (packing) => {
//     const strengthParts = splitStrength(selectedStrength).join('+');
//     const formStrength = result.salt_forms_json[selectedForm];
//     if (!formStrength) return false;

//     const packagingOptions = formStrength[strengthParts]?.[packing];
//     if (!packagingOptions) return false;

//     return Object.values(packagingOptions).some(pack => {
//       return pack && Array.isArray(pack) && pack.some(pharmacy => pharmacy !== null && pharmacy.selling_price !== undefined);
//     });
//   };

//   return (
//     <div className="salt-info">
//       <div className="main3">
//         <div className="div1">
//           <div className="comp1">
//             <div className="form-container">
//               <div className='float-child'>Form:</div>
//               <div className='float-child1'>
//                 {formsToDisplay.map((form, index) => (
//                   <button
//                     key={index}
//                     // className={`form-button ${selectedForm === form ? 'selected' : ''} ${isFormAvailable(form) ? '' : 'dashed'}`}
//                     className={`form-button ${selectedForm === form ? 'selected' : ''} ${isFormAvailable(form) ? '' : 'dashed'}`}

//                     onClick={() => handleFormSelect(form)}
//                   >
//                     {form}
//                   </button>
//                 ))}
//                 {result.available_forms.length > 4 && (showAllForms ? (
//                   <div className="show-less" onClick={handleShowLessForms}>
//                     <text>Less..</text>
//                   </div>
//                 ) : (
//                   <div className="show-more" onClick={handleShowMoreForms}>
//                     <text>More..</text>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="comp2">
//             <div className="strength-container">
//               <div className='float-child'>Strength:</div>
//               <div className='float-child1'>
//                 {strengthsToDisplay.map((strength, index) => (
//                   <button
//                     key={index}
//                     className={`strength-button ${selectedStrength === strength ? 'selected' : ''} ${isStrengthAvailable(strength) ? '' : 'dashed'}`}
//                     onClick={() => handleStrengthSelect(strength)}
//                   >
//                     {strength}
//                   </button>
//                 ))}
//                 {splitStrength(result.most_common.Strength).length > 4 && (showAllStrengths ? (
//                   <div className="show-less" onClick={handleShowLessStrengths}>
//                     <text>Less..</text>
//                   </div>
//                 ) : (
//                   <div className="show-more" style={{marginLeft:"0px"}} onClick={handleShowMoreStrengths}>
//                     <text>More..</text>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="comp3">
//             <div className="packing-container">
//               <div className='float-child'>Packaging:</div>
//               <div className='float-child1'>
//                 {packagingsToDisplay.map((packing, index) => (
//                   <button
//                     key={index}
//                     className={`packing-button ${selectedPackaging === packing ? 'selected' : ''} ${isPackagingAvailable(packing) ? '' : 'dashed'}`}
//                     onClick={() => handlePackagingSelect(packing)}
//                   >
//                     {packing}
//                   </button>
//                 ))}
//                 {splitStrength(result.most_common.Packing).length > 4 && (showAllPackagings ? (
//                   <div className="show-less" onClick={handleShowLessPackagings}>
//                     <text>Less..</text>
//                   </div>
//                 ) : (
//                   <div className="show-more" onClick={handleShowMorePackagings}>
//                     <text>More..</text>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="div2">
//           <div className="ccc">
//             <b>Salt {String.fromCharCode(64 + result.salt.split('+').length)}</b>
//             <br />
//             <br />
//             <div style={{ color: "blue" }}>{selectedForm} | {selectedStrength} | {selectedPackaging}</div> 
//           </div>
//         </div>
//         <div className="div3">
//           <div className="cc">
//             {price !== null ? <><b className="price">From ₹{price}</b></> : (
//               <div className="no-store-message">
//                 No store near you selling this product
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SaltInfo;

import React, { useState, useEffect } from 'react';
import './Main.css';

const SaltInfo = ({ result }) => {
  const [selectedForm, setSelectedForm] = useState(result.available_forms[0]);
  const [selectedStrength, setSelectedStrength] = useState(result.most_common.Strength.split('+')[0].trim());
  const [selectedPackaging, setSelectedPackaging] = useState(result.most_common.Packing.split('+')[0].trim());
  const [price, setPrice] = useState(null);
  const [showAllForms, setShowAllForms] = useState(false);
  const [showAllStrengths, setShowAllStrengths] = useState(false);
  const [showAllPackagings, setShowAllPackagings] = useState(false);
  const [showLessForms, setShowLessForms] = useState(false);
  const [showLessStrengths, setShowLessStrengths] = useState(false);
  const [showLessPackagings, setShowLessPackagings] = useState(false);

  useEffect(() => {
    const formStrength = result.salt_forms_json[selectedForm];

    if (formStrength) {
      const strengthParts = result.most_common.Strength.split('+').map(part => part.trim());
      const selectedStrengthFull = strengthParts.join('+');
      const packagingOptions = formStrength[selectedStrengthFull]?.[selectedPackaging];

      if (packagingOptions) {
        const pharmacies = Object.values(packagingOptions).flat().filter(item => item !== null && item.selling_price !== undefined);

        if (pharmacies.length > 0) {
          const lowestPrice = Math.min(...pharmacies.map(pharmacy => pharmacy.selling_price));
          setPrice(lowestPrice);
        } else {
          setPrice(null);
        }
      } else {
        setPrice(null);
      }
    } else {
      setPrice(null);
    }
  }, [selectedForm, selectedStrength, selectedPackaging, result.salt_forms_json]);

  const splitStrength = (strength) => {
    return strength?.trim().split('+').map((item) => item.trim()) || [];
  };

  const handleFormSelect = (form) => {
    setSelectedForm(form);
  };

  const handleStrengthSelect = (strength) => {
    setSelectedStrength(strength);
  };

  const handlePackagingSelect = (packing) => {
    setSelectedPackaging(packing);
  };

  const handleShowMoreForms = () => {
    setShowAllForms(true);
    setShowLessForms(false);
  };

  const handleShowLessForms = () => {
    setShowAllForms(false);
    setShowLessForms(true);
  };

  const handleShowMoreStrengths = () => {
    setShowAllStrengths(true);
    setShowLessStrengths(false);
  };

  const handleShowLessStrengths = () => {
    setShowAllStrengths(false);
    setShowLessStrengths(true);
  };

  const handleShowMorePackagings = () => {
    setShowAllPackagings(true);
    setShowLessPackagings(false);
  };

  const handleShowLessPackagings = () => {
    setShowAllPackagings(false);
    setShowLessPackagings(true);
  };

  const formsToDisplay = showAllForms ? result.available_forms : result.available_forms.slice(0, 4);
  const strengthsToDisplay = showAllStrengths ? splitStrength(result.most_common.Strength) : splitStrength(result.most_common.Strength).slice(0, 4);
  const packagingsToDisplay = showAllPackagings ? splitStrength(result.most_common.Packing) : splitStrength(result.most_common.Packing).slice(0, 4);

//   const isFormAvailable = (form) => {
//     const formStrength = result.salt_forms_json[form];
//     if (!formStrength) return false;

//     return Object.values(formStrength).some(strength => {
//       return Object.values(strength).some(pack => {
//         return pack && Array.isArray(pack) && pack.some(pharmacy => pharmacy !== null && pharmacy.selling_price !== undefined);
//       });
//     });
//   };
// const isFormAvailable = (form) => {
//     const formStrengths = Object.keys(result.salt_forms_json[form] || {});
//     return formStrengths.some(strength => isStrengthAvailable(strength, form));
//   };
const isFormAvailable = (form) => {
    const formStrengths = Object.keys(result.salt_forms_json[form] || {});
    return formStrengths.length > 0; // Check if any strength exists for the form
  };
  const isStrengthAvailable = (strength) => {
    const strengthParts = splitStrength(strength).join('+');
    const formStrength = result.salt_forms_json[selectedForm];
    if (!formStrength) return false;

    const packagingOptions = formStrength[selectedStrength];
   if (!packagingOptions) return false;
    ///const isStrengthAvailable = (strength) => {
        // ... other code ...
       // return packagingOptions.some(pack => pack && Array.isArray(pack) && pack.some(pharmacy => pharmacy !== null && pharmacy.selling_price !== undefined));

    //return Object.values(packagingOptions).some(pack => {
        //return pack && Array.isArray(pack) && pack.some(pharmacy => pharmacy !== null && pharmacy.selling_price !== undefined)};
   
  };


  const isPackagingAvailable = (packing) => {
    const formStrength = result.salt_forms_json[selectedForm];
    if (!formStrength) return false;
  
    const packagingOptions = formStrength[selectedStrength]?.[packing];
    return packagingOptions && Array.isArray(packagingOptions) && packagingOptions.some(pharmacy => pharmacy !== null && pharmacy.selling_price !== undefined);
  
  };

  return (
    <div className="salt-info">
      <div className="main3">
        <div className="div1">
          <div className="comp1">
            <div className="form-container">
              <div className='float-child'>Form:</div>
              <div className='float-child1'>
                {formsToDisplay.map((form, index) => (
                  <button
                    key={index}
                    className={`form-button ${selectedForm === form ? 'selected' : ''} ${isFormAvailable(form) ? '' : 'dashed'}`}
    onClick={() => handleFormSelect(form)}
                  >
                    {form}
                  </button>
                ))}
                {result.available_forms.length > 4 && (showAllForms ? (
                  <div className="show-less" onClick={handleShowLessForms}>
                    <text>Less..</text>
                  </div>
                ) : (
                  <div className="show-more" onClick={handleShowMoreForms}>
                    <text>More..</text>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="comp2">
            <div className="strength-container">
              <div className='float-child'>Strength:</div>
              <div className='float-child1'>
                {strengthsToDisplay.map((strength, index) => (
                      // Check availability based on selected form and packaging

                  <button
                    key={index}
                    className={`strength-button ${selectedStrength === strength ? 'selected' : ''} ${isStrengthAvailable(strength, selectedForm, selectedPackaging)? '' : 'dashed'}`}
                   // className={`form-button ${selectedForm === strength ? 'selected' : ''} ${isStrengthAvailable(strength) ? '' : 'dashed'}`}
 
                    onClick={() => handleStrengthSelect(strength)}
                  >
                    {strength}
                  </button>
))}
                {splitStrength(result.most_common.Strength).length > 4 && (showAllStrengths ? (
                  <div className="show-less" onClick={handleShowLessStrengths}>
                    <text>Less..</text>
                  </div>
                ) : (
                  <div className="show-more" style={{marginLeft:"0px"}} onClick={handleShowMoreStrengths}>
                    <text>More..</text>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="comp3">
            <div className="packing-container">
              <div className='float-child'>Packaging:</div>
              <div className='float-child1'>
                {packagingsToDisplay.map((packing, index) => (
                  <button
                    key={index}
                    className={`packing-button ${selectedPackaging === packing ? 'selected' : ''} ${isPackagingAvailable(packing) ? '' : 'dashed'}`}
                    onClick={() => handlePackagingSelect(packing)}
                  >
                    {packing}
                  </button>
                ))}
                {splitStrength(result.most_common.Packing).length > 4 && (showAllPackagings ? (
                  <div className="show-less" onClick={handleShowLessPackagings}>
                    <text>Less..</text>
                  </div>
                ) : (
                  <div className="show-more" onClick={handleShowMorePackagings}>
                    <text>More..</text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="div2">
          <div className="ccc">
            <b>Salt {String.fromCharCode(64 + result.salt.split('+').length)}</b>
            <br />
            <br />
            <div style={{ color: "blue" }}>{selectedForm} | {selectedStrength} | {selectedPackaging}</div> 
          </div>
        </div>
        <div className="div3">
          <div className="cc">
            {price !== null ? <><b className="price">From ₹{price}</b></> : (
              <div className="no-store-message">
                No store near you selling this product
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaltInfo;

// import React, { useState, useEffect } from 'react';
// import './Main.css';

// const SaltInfo = ({ result }) => {
//   const [selectedForm, setSelectedForm] = useState(result.available_forms[0]);
//   const [selectedStrength, setSelectedStrength] = useState(result.most_common.Strength.split('+')[0].trim());
//   const [selectedPackaging, setSelectedPackaging] = useState(result.most_common.Packing.split('+')[0].trim());
//   const [price, setPrice] = useState(null);
//   const [showAllForms, setShowAllForms] = useState(false);
//   const [showAllStrengths, setShowAllStrengths] = useState(false);
//   const [showAllPackagings, setShowAllPackagings] = useState(false);
//   const [showLessForms, setShowLessForms] = useState(false);
//   const [showLessStrengths, setShowLessStrengths] = useState(false);
//   const [showLessPackagings, setShowLessPackagings] = useState(false);

//   useEffect(() => {
//     const formStrength = result.salt_forms_json[selectedForm];

//     if (formStrength) {
//       const strengthParts = result.most_common.Strength.split('+').map(part => part.trim());
//       const selectedStrengthFull = strengthParts.join('+');
//       const packagingOptions = formStrength[selectedStrengthFull]?.[selectedPackaging];

//       if (packagingOptions) {
//         const pharmacies = Object.values(packagingOptions).flat().filter(item => item !== null && item.selling_price !== undefined);

//         if (pharmacies.length > 0) {
//           const lowestPrice = Math.min(...pharmacies.map(pharmacy => pharmacy.selling_price));
//           setPrice(lowestPrice);
//         } else {
//           setPrice(null);
//         }
//       } else {
//         setPrice(null);
//       }
//     } else {
//       setPrice(null);
//     }
//   }, [selectedForm, selectedStrength, selectedPackaging, result.salt_forms_json]);

//   const splitStrength = (strength) => {
//     return strength?.trim().split('+').map((item) => item.trim()) || [];
//   };

//   const handleFormSelect = (form) => {
//     setSelectedForm(form);
//   };

//   const handleStrengthSelect = (strength) => {
//     setSelectedStrength(strength);
//   };

//   const handlePackagingSelect = (packing) => {
//     setSelectedPackaging(packing);
//   };

//   const handleShowMoreForms = () => {
//     setShowAllForms(true);
//     setShowLessForms(false);
//   };

//   const handleShowLessForms = () => {
//     setShowAllForms(false);
//     setShowLessForms(true);
//   };

//   const handleShowMoreStrengths = () => {
//     setShowAllStrengths(true);
//     setShowLessStrengths(false);
//   };

//   const handleShowLessStrengths = () => {
//     setShowAllStrengths(false);
//     setShowLessStrengths(true);
//   };

//   const handleShowMorePackagings = () => {
//     setShowAllPackagings(true);
//     setShowLessPackagings(false);
//   };

//   const handleShowLessPackagings = () => {
//     setShowAllPackagings(false);
//     setShowLessPackagings(true);
//   };

//   const formsToDisplay = showAllForms ? result.available_forms : result.available_forms.slice(0, 4);
//   const strengthsToDisplay = showAllStrengths ? splitStrength(result.most_common.Strength) : splitStrength(result.most_common.Strength).slice(0, 4);
//   const packagingsToDisplay = showAllPackagings ? splitStrength(result.most_common.Packing) : splitStrength(result.most_common.Packing).slice(0, 4);

//   const isFormAvailable = (form) => {
//     const formStrength = result.salt_forms_json[form];
//     if (!formStrength) return false;

//     return Object.values(formStrength).some(strength => {
//       return Object.values(strength).some(pack => {
//         return pack && Array.isArray(pack) && pack.some(pharmacy => pharmacy !== null && pharmacy.selling_price !== undefined);
//       });
//     });
//   };

//   const isStrengthAvailable = (strength) => {
//     const strengthParts = splitStrength(strength).join('+');
//     const formStrength = result.salt_forms_json[selectedForm];
//     if (!formStrength) return false;

//     const packagingOptions = formStrength[strengthParts];
//     if (!packagingOptions) return false;

//     return Object.values(packagingOptions).some(pack => {
//       return pack && Array.isArray(pack) && pack.some(pharmacy => pharmacy !== null && pharmacy.selling_price !== undefined);
//     });
//   };

//   const isPackagingAvailable = (packing) => {
//     const strengthParts = splitStrength(selectedStrength).join('+');
//     const formStrength = result.salt_forms_json[selectedForm];
//     if (!formStrength) return false;

//     const packagingOptions = formStrength[strengthParts]?.[packing];
//     if (!packagingOptions) return false;

//     return packagingOptions.some(pharmacy => pharmacy !== null && pharmacy.selling_price !== undefined);
//   };

//   return (
//     <div className="salt-info">
//       <div className="main3">
//         <div className="div1">
//           <div className="comp1">
//             <div className="form-container">
//               <div className='float-child'>Form:</div>
//               <div className='float-child1'>
//                 {formsToDisplay.map((form, index) => (
//                   <button
//                     key={index}
//                     className={`form-button ${selectedForm === form ? 'selected' : ''} ${isFormAvailable(form) ? '' : 'dashed'}`}
//                     onClick={() => handleFormSelect(form)}
//                   >
//                     {form}
//                   </button>
//                 ))}
//                 {result.available_forms.length > 4 && (showAllForms ? (
//                   <div className="show-less" onClick={handleShowLessForms}>
//                     <text>Less..</text>
//                   </div>
//                 ) : (
//                   <div className="show-more" onClick={handleShowMoreForms}>
//                     <text>More..</text>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="comp2">
//             <div className="strength-container">
//               <div className='float-child'>Strength:</div>
//               <div className='float-child1'>
//                 {strengthsToDisplay.map((strength, index) => (
//                   <button
//                     key={index}
//                     className={`strength-button ${selectedStrength === strength ? 'selected' : ''} ${isStrengthAvailable(strength) ? '' : 'dashed'}`}
//                     onClick={() => handleStrengthSelect(strength)}
//                   >
//                     {strength}
//                   </button>
//                 ))}
//                 {splitStrength(result.most_common.Strength).length > 4 && (showAllStrengths ? (
//                   <div className="show-less" onClick={handleShowLessStrengths}>
//                     <text>Less..</text>
//                   </div>
//                 ) : (
//                   <div className="show-more" style={{marginLeft:"0px"}} onClick={handleShowMoreStrengths}>
//                     <text>More..</text>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="comp3">
//             <div className="packing-container">
//               <div className='float-child'>Packaging:</div>
//               <div className='float-child1'>
//                 {packagingsToDisplay.map((packing, index) => (
//                   <button
//                     key={index}
//                     className={`packing-button ${selectedPackaging === packing ? 'selected' : ''} ${isPackagingAvailable(packing) ? '' : 'dashed'}`}
//                     onClick={() => handlePackagingSelect(packing)}
//                   >
//                     {packing}
//                   </button>
//                 ))}
//                 {splitStrength(result.most_common.Packing).length > 4 && (showAllPackagings ? (
//                   <div className="show-less" onClick={handleShowLessPackagings}>
//                     <text>Less..</text>
//                   </div>
//                 ) : (
//                   <div className="show-more" onClick={handleShowMorePackagings}>
//                     <text>More..</text>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="div2">
//           <div className="ccc">
//             <b>Salt {String.fromCharCode(64 + result.salt.split('+').length)}</b>
//             <br />
//             <br />
//             <div style={{ color: "blue" }}>{selectedForm} | {selectedStrength} | {selectedPackaging}</div> 
//           </div>
//         </div>
//         <div className="div3">
//           <div className="cc">
//             {price !== null ? <><b className="price">From ₹{price}</b></> : (
//               <div className="no-store-message">
//                 No store near you selling this product
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SaltInfo;

// import React, { useState, useEffect } from 'react';
// import './Main.css';

// const SaltInfo = ({ result }) => {
//   const [selectedForm, setSelectedForm] = useState(result.available_forms[0]);
//   const [selectedStrength, setSelectedStrength] = useState(result.most_common.Strength.split('+')[0].trim());
//   const [selectedPackaging, setSelectedPackaging] = useState(result.most_common.Packing.split('+')[0].trim());
//   const [price, setPrice] = useState(null);
//   const [showAllForms, setShowAllForms] = useState(false);
//   const [showAllStrengths, setShowAllStrengths] = useState(false);
//   const [showAllPackagings, setShowAllPackagings] = useState(false);
//   const [showLessForms, setShowLessForms] = useState(false);
//   const [showLessStrengths, setShowLessStrengths] = useState(false);
//   const [showLessPackagings, setShowLessPackagings] = useState(false);

//   useEffect(() => {
//     const formStrength = result.salt_forms_json[selectedForm];

//     if (formStrength) {
//       const strengthParts = result.most_common.Strength.split('+').map(part => part.trim());
//       const selectedStrengthFull = strengthParts.join('+');
//       const packagingOptions = formStrength[selectedStrengthFull]?.[selectedPackaging];

//       if (packagingOptions) {
//         const pharmacies = Object.values(packagingOptions).flat().filter(item => item !== null && item.selling_price !== undefined);

//         if (pharmacies.length > 0) {
//           const lowestPrice = Math.min(...pharmacies.map(pharmacy => pharmacy.selling_price));
//           setPrice(lowestPrice);
//         } else {
//           setPrice(null);
//         }
//       } else {
//         setPrice(null);
//       }
//     } else {
//       setPrice(null);
//     }
//   }, [selectedForm, selectedStrength, selectedPackaging, result.salt_forms_json]);

//   const splitStrength = (strength) => {
//     return strength?.trim().split('+').map((item) => item.trim()) || [];
//   };

//   const handleFormSelect = (form) => {
//     setSelectedForm(form);
//   };

//   const handleStrengthSelect = (strength) => {
//     setSelectedStrength(strength);
//   };

//   const handlePackagingSelect = (packing) => {
//     setSelectedPackaging(packing);
//   };

//   const handleShowMoreForms = () => {
//     setShowAllForms(true);
//     setShowLessForms(false);
//   };

//   const handleShowLessForms = () => {
//     setShowAllForms(false);
//     setShowLessForms(true);
//   };

//   const handleShowMoreStrengths = () => {
//     setShowAllStrengths(true);
//     setShowLessStrengths(false);
//   };

//   const handleShowLessStrengths = () => {
//     setShowAllStrengths(false);
//     setShowLessStrengths(true);
//   };

//   const handleShowMorePackagings = () => {
//     setShowAllPackagings(true);
//     setShowLessPackagings(false);
//   };

//   const handleShowLessPackagings = () => {
//     setShowAllPackagings(false);
//     setShowLessPackagings(true);
//   };

//   const formsToDisplay = showAllForms ? result.available_forms : result.available_forms.slice(0, 4);
//   const strengthsToDisplay = showAllStrengths ? splitStrength(result.most_common.Strength) : splitStrength(result.most_common.Strength).slice(0, 4);
//   const packagingsToDisplay = showAllPackagings ? splitStrength(result.most_common.Packing) : splitStrength(result.most_common.Packing).slice(0, 4);

//   const isFormAvailable = (form) => {
//     const formStrength = result.salt_forms_json[form];
//     if (!formStrength) return false;

//     return Object.values(formStrength).some(strength => {
//       return Object.values(strength).some(pack => {
//         return pack && Array.isArray(pack) && pack.some(pharmacy => pharmacy !== null && pharmacy.selling_price !== undefined);
//       });
//     });
//   };

//   const isStrengthAvailable = (strength) => {
//     const strengthParts = strength.split('+').map(part => part.trim());
//     const selectedStrengthFull = strengthParts.join('+');

//     const formStrength = result.salt_forms_json[selectedForm];
//     if (!formStrength) return false;

//     const packagingOptions = formStrength[selectedStrengthFull];
//     if (!packagingOptions) return false;

//     return Object.values(packagingOptions).some(pack => {
//       return pack && Array.isArray(pack) && pack.some(pharmacy => pharmacy !== null && pharmacy.selling_price !== undefined);
//     });
//   };

//   const isPackagingAvailable = (packing) => {
//     const strengthParts = selectedStrength.split('+').map(part => part.trim());
//     const selectedStrengthFull = strengthParts.join('+');

//     const formStrength = result.salt_forms_json[selectedForm];
//     if (!formStrength) return false;

//     const packagingOptions = formStrength[selectedStrengthFull]?.[packing];
//     if (!packagingOptions) return false;

//     return Array.isArray(packagingOptions) && packagingOptions.some(pharmacy => pharmacy !== null && pharmacy.selling_price !== undefined);
//   };

//   return (
//     <div className="salt-info">
//       <div className="main3">
//         <div className="div1">
//           <div className="comp1">
//             <div className="form-container">
//               <div className='float-child'>Form:</div>
//               <div className='float-child1'>
//                 {formsToDisplay.map((form, index) => (
//                   <button
//                     key={index}
//                     className={`form-button ${selectedForm === form ? 'selected' : ''} ${isFormAvailable(form) ? '' : 'dashed'}`}
//                     onClick={() => handleFormSelect(form)}
//                   >
//                     {form}
//                   </button>
//                 ))}
//                 {result.available_forms.length > 4 && (showAllForms ? (
//                   <div className="show-less" onClick={handleShowLessForms}>
//                     <text>Less..</text>
//                   </div>
//                 ) : (
//                   <div className="show-more" onClick={handleShowMoreForms}>
//                     <text>More..</text>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="comp2">
//             <div className="strength-container">
//               <div className='float-child'>Strength:</div>
//               <div className='float-child1'>
//                 {strengthsToDisplay.map((strength, index) => (
//                   <button
//                     key={index}
//                     className={`strength-button ${selectedStrength === strength ? 'selected' : ''} ${isStrengthAvailable(strength) ? '' : 'dashed'}`}
//                     onClick={() => handleStrengthSelect(strength)}
//                   >
//                     {strength}
//                   </button>
//                 ))}
//                 {splitStrength(result.most_common.Strength).length > 4 && (showAllStrengths ? (
//                   <div className="show-less" onClick={handleShowLessStrengths}>
//                     <text>Less..</text>
//                   </div>
//                 ) : (
//                   <div className="show-more" style={{marginLeft:"0px"}} onClick={handleShowMoreStrengths}>
//                     <text>More..</text>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="comp3">
//             <div className="packing-container">
//               <div className='float-child'>Packaging:</div>
//               <div className='float-child1'>
//                 {packagingsToDisplay.map((packing, index) => (
//                   <button
//                     key={index}
//                     className={`packing-button ${selectedPackaging === packing ? 'selected' : ''} ${isPackagingAvailable(packing) ? '' : 'dashed'}`}
//                     onClick={() => handlePackagingSelect(packing)}
//                   >
//                     {packing}
//                   </button>
//                 ))}
//                 {splitStrength(result.most_common.Packing).length > 4 && (showAllPackagings ? (
//                   <div className="show-less" onClick={handleShowLessPackagings}>
//                     <text>Less..</text>
//                   </div>
//                 ) : (
//                   <div className="show-more" onClick={handleShowMorePackagings}>
//                     <text>More..</text>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="div2">
//           <div className="ccc">
//             <b>Salt {String.fromCharCode(64 + result.salt.split('+').length)}</b>
//             <br />
//             <br />
//             <div style={{ color: "blue" }}>{selectedForm} | {selectedStrength} | {selectedPackaging}</div> 
//           </div>
//         </div>
//         <div className="div3">
//           <div className="cc">
//             {price !== null ? <><b className="price">From ₹{price}</b></> : (
//               <div className="no-store-message">
//                 No store near you selling this product
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SaltInfo;

// import React, { useState, useEffect } from 'react';
// import './Main.css';

// const SaltInfo = ({ result }) => {
//   const [selectedForm, setSelectedForm] = useState(result.available_forms[0]);
//   const [selectedStrength, setSelectedStrength] = useState(result.most_common.Strength.split('+')[0].trim());
//   const [selectedPackaging, setSelectedPackaging] = useState(result.most_common.Packing.split('+')[0].trim());
//   const [price, setPrice] = useState(null);
//   const [showAllForms, setShowAllForms] = useState(false);
//   const [showAllStrengths, setShowAllStrengths] = useState(false);
//   const [showAllPackagings, setShowAllPackagings] = useState(false);
//   const [showLessForms, setShowLessForms] = useState(false);
//   const [showLessStrengths, setShowLessStrengths] = useState(false);
//   const [showLessPackagings, setShowLessPackagings] = useState(false);

//   useEffect(() => {
//     const formStrength = result.salt_forms_json[selectedForm];

//     if (formStrength) {
//       const strengthParts = result.most_common.Strength.split('+').map(part => part.trim());
//       const selectedStrengthFull = strengthParts.join('+');
//       const packagingOptions = formStrength[selectedStrengthFull]?.[selectedPackaging];

//       if (packagingOptions) {
//         const pharmacies = Object.values(packagingOptions).flat().filter(item => item !== null && item.selling_price !== undefined);

//         if (pharmacies.length > 0) {
//           const lowestPrice = Math.min(...pharmacies.map(pharmacy => pharmacy.selling_price));
//           setPrice(lowestPrice);
//         } else {
//           setPrice(null);
//         }
//       } else {
//         setPrice(null);
//       }
//     } else {
//       setPrice(null);
//     }
//   }, [selectedForm, selectedStrength, selectedPackaging, result.salt_forms_json]);

//   const splitStrength = (strength) => {
//     return strength?.trim().split('+').map((item) => item.trim()) || [];
//   };

//   const handleFormSelect = (form) => {
//     setSelectedForm(form);
//   };

//   const handleStrengthSelect = (strength) => {
//     setSelectedStrength(strength);
//   };

//   const handlePackagingSelect = (packing) => {
//     setSelectedPackaging(packing);
//   };

//   const handleShowMoreForms = () => {
//     setShowAllForms(true);
//     setShowLessForms(false);
//   };

//   const handleShowLessForms = () => {
//     setShowAllForms(false);
//     setShowLessForms(true);
//   };

//   const handleShowMoreStrengths = () => {
//     setShowAllStrengths(true);
//     setShowLessStrengths(false);
//   };

//   const handleShowLessStrengths = () => {
//     setShowAllStrengths(false);
//     setShowLessStrengths(true);
//   };

//   const handleShowMorePackagings = () => {
//     setShowAllPackagings(true);
//     setShowLessPackagings(false);
//   };

//   const handleShowLessPackagings = () => {
//     setShowAllPackagings(false);
//     setShowLessPackagings(true);
//   };

//   const formsToDisplay = showAllForms ? result.available_forms : result.available_forms.slice(0, 4);
//   const strengthsToDisplay = showAllStrengths ? splitStrength(result.most_common.Strength) : splitStrength(result.most_common.Strength).slice(0, 4);
//   const packagingsToDisplay = showAllPackagings ? splitStrength(result.most_common.Packing) : splitStrength(result.most_common.Packing).slice(0, 4);

//   const isFormAvailable = (form) => {
//     const formStrength = result.salt_forms_json[form];
//     if (!formStrength) return false;

//     const strengthParts = result.most_common.Strength.split('+').map(part => part.trim());
//     const selectedStrengthFull = strengthParts.join('+');
//     const packagingOptions = formStrength[selectedStrengthFull];

//     if (!packagingOptions) return false;

//     return Object.values(packagingOptions).some(pack => {
//       return pack && pack.some(pharmacy => pharmacy !== null && pharmacy.selling_price !== undefined);
//     });
//   };

//   const isStrengthAvailable = (strength) => {
//     const strengthParts = result.most_common.Strength.split('+').map(part => part.trim());
//     const selectedStrengthFull = strengthParts.join('+');

//     const formStrength = result.salt_forms_json[selectedForm];
//     if (!formStrength) return false;

//     const packagingOptions = formStrength[selectedStrengthFull];
//     if (!packagingOptions) return false;

//     return Object.values(packagingOptions).some(pack => {
//       return pack && pack.some(pharmacy => pharmacy !== null && pharmacy.selling_price !== undefined);
//     });
//   };

//   const isPackagingAvailable = (packing) => {
//     const strengthParts = result.most_common.Strength.split('+').map(part => part.trim());
//     const selectedStrengthFull = strengthParts.join('+');

//     const formStrength = result.salt_forms_json[selectedForm];
//     if (!formStrength) return false;

//     const packagingOptions = formStrength[selectedStrengthFull]?.[packing];
//     if (!packagingOptions) return false;

//     return packagingOptions.some(pharmacy => pharmacy !== null && pharmacy.selling_price !== undefined);
//   };

//   return (
//     <div className="salt-info">
//       <div className="main3">
//         <div className="div1">
//           <div className="comp1">
//             <div className="form-container">
//               <div className='float-child'>Form:</div>
//               <div className='float-child1'>
//                 {formsToDisplay.map((form, index) => (
//                   <button
//                     key={index}
//                     className={`form-button ${selectedForm === form ? 'selected' : ''} ${isFormAvailable(form) ? '' : 'dashed'}`}
//                     onClick={() => handleFormSelect(form)}
//                   >
//                     {form}
//                   </button>
//                 ))}
//                 {result.available_forms.length > 4 && (showAllForms ? (
//                   <div className="show-less" onClick={handleShowLessForms}>
//                    <text> Less..</text>
//                   </div>
//                 ) : (
//                   <div className="show-more" onClick={handleShowMoreForms}>
//                    <text>More..</text>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="comp2">
//             <div className="strength-container">
//               <div className='float-child'>Strength:</div>
//               <div className='float-child1'>
//                 {strengthsToDisplay.map((strength, index) => (
//                   <button
//                     key={index}
//                     className={`strength-button ${selectedStrength === strength ? 'selected' : ''} ${isStrengthAvailable(strength) ? '' : 'dashed'}`}
//                     onClick={() => handleStrengthSelect(strength)}
//                   >
//                     {strength}
//                   </button>
//                 ))}
//                 {splitStrength(result.most_common.Strength).length > 4 && (showAllStrengths ? (
//                   <div className="show-less" onClick={handleShowLessStrengths}>
//                     <text>Less..</text>
//                   </div>
//                 ) : (
//                   <div className="show-more" style={{marginLeft:"0px"}} onClick={handleShowMoreStrengths}>
//                         <text >More..</text>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="comp3">
//             <div className="packing-container">
//               <div className='float-child'>Packaging:</div>
//               <div className='float-child1'>
//                 {packagingsToDisplay.map((packing, index) => (
//                   <button
//                     key={index}
//                     className={`packing-button ${selectedPackaging === packing ? 'selected' : ''} ${isPackagingAvailable(packing) ? '' : 'dashed'}`}
//                     onClick={() => handlePackagingSelect(packing)}
//                   >
//                     {packing}
//                   </button>
//                 ))}
//                 {splitStrength(result.most_common.Packing).length > 4 && (showAllPackagings ? (
//                   <div className="show-less" onClick={handleShowLessPackagings}>
//                     <text>Less..</text>
//                   </div>
//                 ) : (
//                   <div className="show-more" onClick={handleShowMorePackagings}>
//                    <text> More..</text>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="div2">
//         <div className="ccc">
//             <b>Salt {String.fromCharCode(64 + result.salt.split('+').length)}</b>
//             <br />
//             <br />
//             <div style={{ color: "blue" }}>{selectedForm} | {selectedStrength} | {selectedPackaging}</div> 
//           </div>
//         </div>
//         <div className="div3">
//           <div className="cc">
//             {price !== null ? <><b className="price">From ₹{price}</b></> : (
//               <div className="no-store-message">
//                 No store near you selling this product
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SaltInfo;



// import React, { useState, useEffect } from 'react';
// import './Main.css';

// const SaltInfo = ({ result }) => {
//   const [selectedForm, setSelectedForm] = useState(result.available_forms[0]);
//   const [selectedStrength, setSelectedStrength] = useState(result.most_common.Strength.split('+')[0].trim());
//   const [selectedPackaging, setSelectedPackaging] = useState(result.most_common.Packing.split('+')[0].trim());
//   const [price, setPrice] = useState(null);
//   const [showAllForms, setShowAllForms] = useState(false);
//   const [showAllStrengths, setShowAllStrengths] = useState(false);
//   const [showAllPackagings, setShowAllPackagings] = useState(false);
//   const [showLessForms, setShowLessForms] = useState(false);
//   const [showLessStrengths, setShowLessStrengths] = useState(false);
//   const [showLessPackagings, setShowLessPackagings] = useState(false);

//   useEffect(() => {
//     const formStrength = result.salt_forms_json[selectedForm];

//     if (formStrength) {
//       const strengthParts = result.most_common.Strength.split('+').map(part => part.trim());
//       const selectedStrengthFull = strengthParts.join('+');
//       const packagingOptions = formStrength[selectedStrengthFull]?.[selectedPackaging];

//       if (packagingOptions) {
//         const pharmacies = Object.values(packagingOptions).flat().filter(item => item !== null && item.selling_price !== undefined);

//         if (pharmacies.length > 0) {
//           const lowestPrice = Math.min(...pharmacies.map(pharmacy => pharmacy.selling_price));
//           setPrice(lowestPrice);
//         } else {
//           setPrice(null);
//         }
//       } else {
//         setPrice(null);
//       }
//     } else {
//       setPrice(null);
//     }
//   }, [selectedForm, selectedStrength, selectedPackaging, result.salt_forms_json]);

//   const splitStrength = (strength) => {
//     return strength?.trim().split('+').map((item) => item.trim()) || [];
//   };

//   const handleFormSelect = (form) => {
//     setSelectedForm(form);
//   };

//   const handleStrengthSelect = (strength) => {
//     setSelectedStrength(strength);
//   };

//   const handlePackagingSelect = (packing) => {
//     setSelectedPackaging(packing);
//   };

//   const handleShowMoreForms = () => {
//     setShowAllForms(true);
//     setShowLessForms(false);
//   };

//   const handleShowLessForms = () => {
//     setShowAllForms(false);
//     setShowLessForms(true);
//   };

//   const handleShowMoreStrengths = () => {
//     setShowAllStrengths(true);
//     setShowLessStrengths(false);
//   };

//   const handleShowLessStrengths = () => {
//     setShowAllStrengths(false);
//     setShowLessStrengths(true);
//   };

//   const handleShowMorePackagings = () => {
//     setShowAllPackagings(true);
//     setShowLessPackagings(false);
//   };

//   const handleShowLessPackagings = () => {
//     setShowAllPackagings(false);
//     setShowLessPackagings(true);
//   };
  
//   const formsToDisplay = showAllForms ? result.available_forms : result.available_forms.slice(0, 4);
//   const strengthsToDisplay = showAllStrengths ? splitStrength(result.most_common.Strength) : splitStrength(result.most_common.Strength).slice(0, 4);
//   const packagingsToDisplay = showAllPackagings ? splitStrength(result.most_common.Packing) : splitStrength(result.most_common.Packing).slice(0, 4);

//   const isFormAvailable = result.available_forms.includes(selectedForm);
//   const isStrengthAvailable = splitStrength(result.most_common.Strength).includes(selectedStrength);
//   const isPackingAvailable = splitStrength(result.most_common.Packing).includes(selectedPackaging);

//   return (
//     <div className="salt-info">
//       <div className="main3">
//         <div className="div1">
//           <div className="comp1">
//             <div className="form-container">
//               <div className='float-child'>Form:</div>
//               <div className='float-child1'>
//                 {formsToDisplay.map((form, index) => (
//                   <button
//                     key={index}
//                     className={`form-button ${selectedForm === form ? 'selected' : ''} ${isFormAvailable ? '' : 'dashed'}`} 
//                     onClick={() => handleFormSelect(form)}
//                   >
//                     {form}
//                   </button>
//                 ))}
//                 {result.available_forms.length > 4 && (showAllForms ? (
//                   <div className="show-less" onClick={handleShowLessForms}>
//                    <text> Less..</text>
//                   </div>
//                 ) : (
//                   <div className="show-more" onClick={handleShowMoreForms}>
//                    <text>More..</text>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="comp2">
//             <div className="strength-container">
//               <div className='float-child'>Strength:</div>
//               <div className='float-child1'>
//                 {strengthsToDisplay.map((strength, index) => (
//                   <button
//                     key={index}
//                     className={`strength-button ${selectedStrength === strength ? 'selected' : ''} ${isStrengthAvailable ? '' : 'dashed'}`}
//                     onClick={() => handleStrengthSelect(strength)}
//                   >
//                     {strength}
//                   </button>
//                 ))}
//                 {splitStrength(result.most_common.Strength).length > 4 && (showAllStrengths ? (
//                   <div className="show-less" onClick={handleShowLessStrengths}>
//                     <text>Less..</text>
//                   </div>
//                 ) : (
//                   <div className="show-more" style={{marginLeft:"0px"}} onClick={handleShowMoreStrengths}>
//                         <text >More..</text>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="comp3">
//             <div className="packing-container">
//               <div className='float-child'>Packaging:</div>
//               <div className='float-child1'>
//                 {packagingsToDisplay.map((packing, index) => (
//                   <button
//                     key={index}
//                     className={`packing-button ${selectedPackaging === packing ? 'selected' : ''} ${isPackingAvailable ? '' : 'dashed'}`}
//                     onClick={() => handlePackagingSelect(packing)}
//                   >
//                     {packing}
//                   </button>
//                 ))}
//                 {splitStrength(result.most_common.Packing).length > 4 && (showAllPackagings ? (
//                   <div className="show-less" onClick={handleShowLessPackagings}>
//                     <text>Less..</text>
//                   </div>
//                 ) : (
//                   <div className="show-more" onClick={handleShowMorePackagings}>
//                    <text> More..</text>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="div2">
//         <div className="ccc">
//             <b>Salt {String.fromCharCode(64 + result.salt.split('+').length)}</b>
//             <br />
//             <br />
//             <div style={{ color: "blue" }}>{selectedForm} | {selectedStrength} | {selectedPackaging}</div> 
//           </div>
//         </div>
//         <div className="div3">
//           <div className="cc">
//             {price !== null ? <><b className="price">From ₹{price}</b></> : (
//               <div className="no-store-message">
//                 No store near you selling this product
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SaltInfo;

// import React, { useState, useEffect } from 'react';
// import './Main.css';

// const SaltInfo = ({ result }) => {
//   const [selectedForm, setSelectedForm] = useState(result.available_forms[0]);
//   const [selectedStrength, setSelectedStrength] = useState(result.most_common.Strength.split('+')[0].trim());
//   const [selectedPackaging, setSelectedPackaging] = useState(result.most_common.Packing.split('+')[0].trim());
//   const [price, setPrice] = useState(null);
//   const [showAllForms, setShowAllForms] = useState(false);
//   const [showAllStrengths, setShowAllStrengths] = useState(false);
//   const [showAllPackagings, setShowAllPackagings] = useState(false);
//   const [showLessForms, setShowLessForms] = useState(false);
//   const [showLessStrengths, setShowLessStrengths] = useState(false);
//   const [showLessPackagings, setShowLessPackagings] = useState(false);

//   useEffect(() => {
//     const formStrength = result.salt_forms_json[selectedForm];

//     if (formStrength) {
//       const strengthParts = result.most_common.Strength.split('+').map(part => part.trim());
//       const selectedStrengthFull = strengthParts.join('+');
//       const packagingOptions = formStrength[selectedStrengthFull]?.[selectedPackaging];

//       if (packagingOptions) {
//         const pharmacies = Object.values(packagingOptions).flat().filter(item => item !== null && item.selling_price !== undefined);

//         if (pharmacies.length > 0) {
//           const lowestPrice = Math.min(...pharmacies.map(pharmacy => pharmacy.selling_price));
//           setPrice(lowestPrice);
//         } else {
//           setPrice(null);
//         }
//       } else {
//         setPrice(null);
//       }
//     } else {
//       setPrice(null);
//     }
//   }, [selectedForm, selectedStrength, selectedPackaging, result.salt_forms_json]);

//   const splitStrength = (strength) => {
//     return strength?.trim().split('+').map((item) => item.trim()) || [];
//   };

//   const handleFormSelect = (form) => {
//     setSelectedForm(form);
//   };

//   const handleStrengthSelect = (strength) => {
//     setSelectedStrength(strength);
//   };

//   const handlePackagingSelect = (packing) => {
//     setSelectedPackaging(packing);
//   };

//   const handleShowMoreForms = () => {
//     setShowAllForms(true);
//     setShowLessForms(false);
//   };

//   const handleShowLessForms = () => {
//     setShowAllForms(false);
//     setShowLessForms(true);
//   };

//   const handleShowMoreStrengths = () => {
//     setShowAllStrengths(true);
//     setShowLessStrengths(false);
//   };

//   const handleShowLessStrengths = () => {
//     setShowAllStrengths(false);
//     setShowLessStrengths(true);
//   };

//   const handleShowMorePackagings = () => {
//     setShowAllPackagings(true);
//     setShowLessPackagings(false);
//   };

//   const handleShowLessPackagings = () => {
//     setShowAllPackagings(false);
//     setShowLessPackagings(true);
//   };

//   const formsToDisplay = showAllForms ? result.available_forms : result.available_forms.slice(0, 4);
//   const strengthsToDisplay = showAllStrengths ? splitStrength(result.most_common.Strength) : splitStrength(result.most_common.Strength).slice(0, 4);
//   const packagingsToDisplay = showAllPackagings ? splitStrength(result.most_common.Packing) : splitStrength(result.most_common.Packing).slice(0, 4);

//   return (
//     <div className="salt-info">
//       <div className="main3">
//         <div className="div1">
//           <div className="comp1">
//             <div className="form-container">
//               <div className='float-child'>Form:</div>
//               <div className='float-child1'>
//                 {formsToDisplay.map((form, index) => (
//                   <button
//                     key={index}
//                     className={`form-button ${selectedForm === form ? 'selected' : ''}`}
//                     onClick={() => handleFormSelect(form)}
//                   >
//                     {form}
//                   </button>
//                 ))}
//                 {result.available_forms.length > 4 && (showAllForms ? (
//                   <div className="show-less" onClick={handleShowLessForms}>
//                    <text> Less..</text>
//                   </div>
//                 ) : (
//                   <div className="show-more" onClick={handleShowMoreForms}>
//                    <text>More..</text>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="comp2">
//             <div className="strength-container">
//               <div className='float-child'>Strength:</div>
//               <div className='float-child1'>
//                 {strengthsToDisplay.map((strength, index) => (
//                   <button
//                     key={index}
//                     className={`strength-button ${selectedStrength === strength ? 'selected' : ''}`}
//                     onClick={() => handleStrengthSelect(strength)}
//                   >
//                     {strength}
//                   </button>
//                 ))}
//                 {splitStrength(result.most_common.Strength).length > 4 && (showAllStrengths ? (
//                   <div className="show-less" onClick={handleShowLessStrengths}>
//                     <text>Less..</text>
//                   </div>
//                 ) : (
//                   <div className="show-more" style={{marginLeft:"0px"}} onClick={handleShowMoreStrengths}>
//                         <text >More..</text>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="comp3">
//             <div className="packing-container">
//               <div className='float-child'>Packaging:</div>
//               <div className='float-child1'>
//                 {packagingsToDisplay.map((packing, index) => (
//                   <button
//                     key={index}
//                     className={`packing-button ${selectedPackaging === packing ? 'selected' : ''}`}
//                     onClick={() => handlePackagingSelect(packing)}
//                   >
//                     {packing}
//                   </button>
//                 ))}
//                 {splitStrength(result.most_common.Packing).length > 4 && (showAllPackagings ? (
//                   <div className="show-less" onClick={handleShowLessPackagings}>
//                     <text>Less..</text>
//                   </div>
//                 ) : (
//                   <div className="show-more" onClick={handleShowMorePackagings}>
//                    <text> More..</text>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="div2">
//           <div className="ccc">
//             <b>Salt {String.fromCharCode(64 + result.salt.split('+').length)}</b>
//             <br />
//             <br />
//             <div style={{ color: "blue" }}>{selectedForm} | {selectedStrength} | {selectedPackaging}</div> 
//           </div>
//         </div>
//         <div className="div3">
//           <div className="cc">
//             {price !== null ? <><b className="price">From ₹{price}</b></> : (
//               <div className="no-store-message">
//                 No store near you selling this product
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SaltInfo;







// import React, { useState, useEffect } from 'react';
// import './Main.css';

// const SaltInfo = ({ result }) => {
//   const [selectedForm, setSelectedForm] = useState(result.available_forms[0]);
//   const [selectedStrength, setSelectedStrength] = useState(result.most_common.Strength.split('+')[0].trim());
//   const [selectedPackaging, setSelectedPackaging] = useState(result.most_common.Packing.split('+')[0].trim());
//   const [price, setPrice] = useState(null);
//   const [showAllForms, setShowAllForms] = useState(false);
//   const [showAllStrengths, setShowAllStrengths] = useState(false);
//   const [showAllPackagings, setShowAllPackagings] = useState(false);

//   useEffect(() => {
//     const formStrength = result.salt_forms_json[selectedForm];

//     if (formStrength) {
//       const strengthParts = result.most_common.Strength.split('+').map(part => part.trim());
//       const selectedStrengthFull = strengthParts.join('+');
//       const packagingOptions = formStrength[selectedStrengthFull]?.[selectedPackaging];

//       if (packagingOptions) {
//         const pharmacies = Object.values(packagingOptions).flat().filter(item => item !== null && item.selling_price !== undefined);

//         if (pharmacies.length > 0) {
//           const lowestPrice = Math.min(...pharmacies.map(pharmacy => pharmacy.selling_price));
//           setPrice(lowestPrice);
//         } else {
//           setPrice(null);
//         }
//       } else {
//         setPrice(null);
//       }
//     } else {
//       setPrice(null);
//     }
//   }, [selectedForm, selectedStrength, selectedPackaging, result.salt_forms_json]);

//   const splitStrength = (strength) => {
//     return strength?.trim().split('+').map((item) => item.trim()) || [];
//   };

//   const handleFormSelect = (form) => {
//     setSelectedForm(form);
//   };

//   const handleStrengthSelect = (strength) => {
//     setSelectedStrength(strength);
//   };

//   const handlePackagingSelect = (packing) => {
//     setSelectedPackaging(packing);
//   };

//   const handleShowMoreForms = () => {
//     setShowAllForms(true);
//   };

//   const handleShowMoreStrengths = () => {
//     setShowAllStrengths(true);
//   };

//   const handleShowMorePackagings = () => {
//     setShowAllPackagings(true);
//   };

//   const formsToDisplay = showAllForms ? result.available_forms : result.available_forms.slice(0, 4);
//   const strengthsToDisplay = showAllStrengths ? splitStrength(result.most_common.Strength) : splitStrength(result.most_common.Strength).slice(0, 4);
//   const packagingsToDisplay = showAllPackagings ? splitStrength(result.most_common.Packing) : splitStrength(result.most_common.Packing).slice(0, 4);

//   return (
//     <div className="salt-info">
//       <div className="main3">
//         <div className="div1">
//           <div className="comp1">
//             <div className="form-container">
//               <div className='float-child'>Form:</div>
//               <div className='float-child1'>
//                 {formsToDisplay.map((form, index) => (
//                   <button
//                     key={index}
//                     className={`form-button ${selectedForm === form ? 'selected' : ''}`}
//                     onClick={() => handleFormSelect(form)}
//                   >
//                     {form}
//                   </button>
//                 ))}
//                 {result.available_forms.length > 4 && !showAllForms && (
//                   <div className="show-more" onClick={handleShowMoreForms}>
//                     More
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="comp2">
//             <div className="strength-container">
//               <div className='float-child'>Strength:</div>
//               <div className='float-child1'>
//                 {strengthsToDisplay.map((strength, index) => (
//                   <button
//                     key={index}
//                     className={`strength-button ${selectedStrength === strength ? 'selected' : ''}`}
//                     onClick={() => handleStrengthSelect(strength)}
//                   >
//                     {strength}
//                   </button>
//                 ))}
//                 {splitStrength(result.most_common.Strength).length > 4 && !showAllStrengths && (
//                   <div className="show-more" onClick={handleShowMoreStrengths}>
//                     More
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="comp3">
//             <div className="packing-container">
//               <div className='float-child'>Packaging:</div>
//               <div className='float-child1'>
//                 {packagingsToDisplay.map((packing, index) => (
//                   <button
//                     key={index}
//                     className={`packing-button ${selectedPackaging === packing ? 'selected' : ''}`}
//                     onClick={() => handlePackagingSelect(packing)}
//                   >
//                     {packing}
//                   </button>
//                 ))}
//                 {splitStrength(result.most_common.Packing).length > 4 && !showAllPackagings && (
//                   <div className="show-more" onClick={handleShowMorePackagings}>
//                     More
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="div2">
//           <div className="ccc">
//             <b>Salt {String.fromCharCode(64 + result.salt.split('+').length)}</b>
//             <br />
//             <br />
//             <div style={{ color: "blue" }}>{selectedForm} | {selectedStrength} | {selectedPackaging}</div> 
//           </div>
//         </div>
//         <div className="div3">
//           <div className="cc">
//             {price !== null ? <><b className="price">From ₹{price}</b></> : (
//               <div className="no-store-message">
//                 No store near you selling this product
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SaltInfo;


// import React, { useState, useEffect } from 'react';
// import './Main.css';

// const SaltInfo = ({ result }) => {
//   const [selectedForm, setSelectedForm] = useState(result.available_forms[0]);
//   const [selectedStrength, setSelectedStrength] = useState(result.most_common.Strength.split('+')[0].trim());
//   const [selectedPackaging, setSelectedPackaging] = useState(result.most_common.Packing.split('+')[0].trim());
//   const [price, setPrice] = useState(null);

//   useEffect(() => {
//     const formStrength = result.salt_forms_json[selectedForm];

//     if (formStrength) {
//       const strengthParts = result.most_common.Strength.split('+').map(part => part.trim());
//       const selectedStrengthFull = strengthParts.join('+');
//       const packagingOptions = formStrength[selectedStrengthFull]?.[selectedPackaging];

//       if (packagingOptions) {
//         const pharmacies = Object.values(packagingOptions).flat().filter(item => item !== null && item.selling_price !== undefined);

//         if (pharmacies.length > 0) {
//           const lowestPrice = Math.min(...pharmacies.map(pharmacy => pharmacy.selling_price));
//           setPrice(lowestPrice);
//         } else {
//           setPrice(null);
//         }
//       } else {
//         setPrice(null);
//       }
//     } else {
//       setPrice(null);
//     }
//   }, [selectedForm, selectedStrength, selectedPackaging, result.salt_forms_json]);

//   const splitStrength = (strength) => {
//     return strength?.trim().split('+').map((item) => item.trim()) || [];
//   };

//   const handleFormSelect = (form) => {
//     setSelectedForm(form);
//   };

//   const handleStrengthSelect = (strength) => {
//     setSelectedStrength(strength);
//   };

//   const handlePackagingSelect = (packing) => {
//     setSelectedPackaging(packing);
//   };

//   return (
//     <div className="salt-info">
//       <div className="main3">
//         <div className="div1">
//           <div className="comp1">
//             <div className="form-container">
                
//               {/* <div className="form-wrapper"> */}
//                 <div className='float-child'>
//                     Form:</div> 
//                     <div className='float-child1'>
//                     {result.available_forms.map((form, index) => (
//                   <button
//                     key={index}
//                     className={`form-button ${selectedForm === form ? 'selected' : ''}`}
//                     onClick={() => handleFormSelect(form)}
//                   >
//                     {form}
//                   </button>
//                 ))}</div>
//               {/* </div> */}
//             </div>
//           </div>
//           <div className="comp2">
//             <div className="strength-container">
//             <div className='float-child'>
                    
//               Strength:</div> 
             
//               <div className='float-child1'>
//               {splitStrength(result.most_common.Strength).map(
//                 (strength, index) => (
//                   <button
//                     key={index}
//                     className={`strength-button ${selectedStrength === strength ? 'selected' : ''}`}
//                     onClick={() => handleStrengthSelect(strength)}
//                   >
//                     {strength}
//                   </button>
//                 )
//               )}</div>
//             </div>
//           </div>
//           <div className="comp3">
//             <div className="packing-container">
//               Packaging:
//               {splitStrength(result.most_common.Packing).map(
//                 (packing, index) => (
//                   <button
//                     key={index}
//                     className={`packing-button ${selectedPackaging === packing ? 'selected' : ''}`}
//                     onClick={() => handlePackagingSelect(packing)}
//                     style={{ padding: '3px' }}
//                   >
//                     {packing}
//                   </button>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="div2">
//           <div className="ccc">
//             <b>Salt {String.fromCharCode(64 + result.salt.split('+').length)}</b>
//             <br />
//             <br />
//             <div style={{ color: "blue" }}>{selectedForm} | {selectedStrength} | {selectedPackaging}</div> 
//           </div>
//         </div>
//         <div className="div3">
//           <div className="cc">
//             {price !== null ? <><b className="price">From ₹{price}</b></> : (
//               <div className="no-store-message">
//                 No store near you selling this product
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SaltInfo;



// import React, { useState, useEffect } from 'react';
// import './Main.css';

// const SaltInfo = ({ result }) => {
//   const [selectedForm, setSelectedForm] = useState(result.available_forms[0]);
//   const [selectedStrength, setSelectedStrength] = useState(result.most_common.Strength.split('+')[0].trim());
//   const [selectedPackaging, setSelectedPackaging] = useState(result.most_common.Packing.split('+')[0].trim());
//   const [price, setPrice] = useState(null);

//   useEffect(() => {
//     const formStrength = result.salt_forms_json[selectedForm];

//     if (formStrength) {
//       const strengthParts = result.most_common.Strength.split('+').map(part => part.trim());
//       const selectedStrengthFull = strengthParts.join('+');
//       const packagingOptions = formStrength[selectedStrengthFull]?.[selectedPackaging];

//       if (packagingOptions) {
//         const pharmacies = Object.values(packagingOptions).flat().filter(item => item !== null && item.selling_price !== undefined);

//         if (pharmacies.length > 0) {
//           const lowestPrice = Math.min(...pharmacies.map(pharmacy => pharmacy.selling_price));
//           setPrice(lowestPrice);
//         } else {
//           setPrice(null);
//         }
//       } else {
//         setPrice(null);
//       }
//     } else {
//       setPrice(null);
//     }
//   }, [selectedForm, selectedStrength, selectedPackaging, result.salt_forms_json]);

//   const splitStrength = (strength) => {
//     return strength?.trim().split('+').map((item) => item.trim()) || [];
//   };

//   const handleFormSelect = (form) => {
//     setSelectedForm(form);
//   };

//   const handleStrengthSelect = (strength) => {
//     setSelectedStrength(strength);
//   };

//   const handlePackagingSelect = (packing) => {
//     setSelectedPackaging(packing);
//   };

//   return (
//     <div className="salt-info">
//       <div className="main3">
//         <div className="div1">
//           <div className="comp1">
//             <div className="form-container">
//               <div className="form-wrapper">
//                 Form:
//                 {result.available_forms.map((form, index) => (
//                   <button
//                     key={index}
//                     className={`form-button ${selectedForm === form ? 'selected' : ''}`}
//                     onClick={() => handleFormSelect(form)}
//                   >
//                     {form}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="comp2">
//             <div className="strength-container">
//               Strength:
//               {splitStrength(result.most_common.Strength).map(
//                 (strength, index) => (
//                   <button
//                     key={index}
//                     className={`strength-button ${selectedStrength === strength ? 'selected' : ''}`}
//                     onClick={() => handleStrengthSelect(strength)}
//                   >
//                     {strength}
//                   </button>
//                 )
//               )}
//             </div>
//           </div>
//           <div className="comp3">
//             <div className="packing-container">
//               Packaging:
//               {splitStrength(result.most_common.Packing).map(
//                 (packing, index) => (
//                   <button
//                     key={index}
//                     className={`packing-button ${selectedPackaging === packing ? 'selected' : ''}`}
//                     onClick={() => handlePackagingSelect(packing)}
//                     style={{ padding: '3px' }}
//                   >
//                     {packing}
//                   </button>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="div2">
//           <div className="ccc">
//             <b>Salt {String.fromCharCode(64 + result.salt.split('+').length)}</b>
//             {/* <b>Salt Type: {result.salt}</b> */}
//             <br />
//             <br />
//            <div style={{color:"blue"}}>{selectedForm} | {selectedStrength} | {selectedPackaging}</div> 
//           </div>
//         </div>
//         <div className="div3">
//           <div className="cc">
//             {price !== null ? <><b className="price">From₹{price}</b></> : (
//               <div className="no-store-message">
//                 No store near you selling this product
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SaltInfo;





// import React, { useState } from 'react';
// import './Main.css';

// const SaltInfo = ({ result }) => {
//   const [selectedForm, setSelectedForm] = useState(result.available_forms[0]);
//   const [selectedStrength, setSelectedStrength] = useState(result.most_common.Strength.split('+')[0]);
//   const [selectedPackaging, setSelectedPackaging] = useState(result.most_common.Packing.split('+')[0]);

//   const splitStrength = (strength) => {
//     return strength.trim().split('+').map((item) => item.trim());
//   };

//   const handleFormSelect = (form) => {
//     setSelectedForm(form);
//   };

//   const handleStrengthSelect = (strength) => {
//     setSelectedStrength(strength);
//   };

//   const handlePackagingSelect = (packing) => {
//     setSelectedPackaging(packing);
//   };

//   return (
//     <div className="salt-info">
//       <div className="main3">
//         <div className="div1">
//           <div className="comp1">
//             <div className="form-container">
//               <div className="form-wrapper">
//                 Form:
//                 {result.available_forms.map((form, index) => (
//                   <button
//                     key={index}
//                     className={`form-button ${selectedForm === form ? 'selected' : ''}`}
//                     onClick={() => handleFormSelect(form)}
//                   >
//                     {form}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="comp2">
//             <div className="strength-container">
//               Strength:
//               {splitStrength(result.most_common.Strength).map(
//                 (strength, index) => (
//                   <button
//                     key={index}
//                     className={`strength-button ${selectedStrength === strength ? 'selected' : ''}`}
//                     onClick={() => handleStrengthSelect(strength)}
//                   >
//                     {strength}
//                   </button>
//                 )
//               )}
//             </div>
//           </div>
//           <div className="comp3">
//             <div className="packing-container">
//               Packaging:
//               {splitStrength(result.most_common.Packing).map(
//                 (packing, index) => (
//                   <button
//                     key={index}
//                     className={`packing-button ${selectedPackaging === packing ? 'selected' : ''}`}
//                     onClick={() => handlePackagingSelect(packing)}
//                     style={{ padding: '3px' }}
//                   >
//                     {packing}
//                   </button>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="div2">
//           <div className="ccc">
//             <b>Salt {String.fromCharCode(64 + result.salt.split('+').length)}</b>
//             <br />
//             {selectedForm} | {selectedStrength} | {selectedPackaging}
//           </div>
//         </div>
//         <div className="div3">
//           <div className="cc">
//             {result.ProductID ? `$${result.ProductID[0].selling_price}` : (
//               <div className="no-store-message">
//                 No store near you selling this product
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SaltInfo;
