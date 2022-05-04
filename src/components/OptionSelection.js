/**
 * This component implements the dropdown item
 * found in final web app
 */
 import React,{ useState } from 'react';
 import optionSources from  '../optionsSources.json';
 import './OptionSelection.css';
//  import Clothing from './images/Clothing.svg';

//  import Brick from '../images/Brick.svg';
//  import Collar from '../images/Collar.svg';
//  import Collection from '../images/Collection.svg';
//  import Color from '../images/Color.svg';
//  import Fabric from '../images/Fabric.svg';
//  import Fit from '../images/Fit.svg';
//  import Gender from '../images/Gender.svg';
 import Pattern from '../images/Pattern.svg';
//  import Price from '../images/Price.svg';
//  import Rise from '../images/Rise.svg';
//  import Sleeves from '../images/Sleeves.svg';

 function OptionSelection({itemKey, setOptionInObject}) {
     const [currentSelectedOption, setSelectedOption] = useState(null);
     const handleDropDownSelection = (consoleOption) => {
         setSelectedOption(consoleOption)
         setOptionInObject(itemKey, consoleOption)
     }
     const renderOptionsDropdown = () => {
         const selectionOptions = optionSources[itemKey].options;
         return selectionOptions.map((selectionOption, index)=>{
             return (
                 <div className="dropdown-item pointer" 
                      key={`${index}${selectionOption}`} 
                      onClick={() => handleDropDownSelection(selectionOption)}
                 >
                     {selectionOption}
                 </div>
             );
         })
     }
     const title = optionSources[itemKey].dropDownPlaceholder;
     const icon = optionSources[itemKey].icon;
     console.log(icon);
     return(
         <div className="AttributeContainer">
             <div className="AttributeHeader">
             {/* <img src={icon} alt="React Logo" style={{ height: '10px', width:'10px' }} /> */}
             <img src={Pattern} alt="React Logo" style={{ height: '30px', width:'30px', marginRight:'10px' }} /><b>{` ${title}`}</b>
             </div>
             <div className="dropdown ml-4">
             <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 {currentSelectedOption ? currentSelectedOption : title}
             </button>
             <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                 {renderOptionsDropdown()}
             </div>
             </div>
         </div>
     )
 }
 
 export default OptionSelection;