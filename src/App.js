import React, {useState} from 'react';
import './App.css';
import OptionSelection from './components/OptionSelection';
import axios from 'axios';
import Clothing from './images/Clothing.svg';

function App() {
  const [selectedObject, updateSelectedObject] = useState({});
  const [modelPrediction, setModelPrediction] = useState(null);
  const [isPredictionLoading, setPredictionLoading] = useState(false);
  const [isRequestFailed, setRequestFailed] = useState(null);
  const setOptionInObject = (itemKey, consoleOption) => {
    const tempSelectedObject = selectedObject;
    tempSelectedObject[itemKey] = consoleOption;
    updateSelectedObject(tempSelectedObject);
  }
  const handleInputSubmission = () => {
    console.log(selectedObject);
    console.log(Object.keys(selectedObject).length)
    if(selectedObject && Object.keys(selectedObject).length === 11) {
      setPredictionLoading(true)
      setModelPrediction(null)
      setRequestFailed(null)
      axios.post('https://sales-forecaster.herokuapp.com/get_prediction', 
      selectedObject
      )
      .then((response) => {
        setPredictionLoading(false)
        setModelPrediction(response.data.result)
      console.log(response);
      }, (error) => {
      setPredictionLoading(false)
      setRequestFailed("Some error ocurred while fetching prediction")
      console.log(error);
      });
    } else {
      setRequestFailed("Please select all fields before submitting request")
    }
  }
  const dropDownKeys = ["GENDER","BRICK","COLOR","PATTERN","SLEEVES","COLLAR/NECK","RISE","FIT","PRICE_RANGE","COLLECTION","FABRIC_FAMILY"];
  return (
    <div className="Form">
      <nav className="Navbar">
      <img src={Clothing} alt="React Logo" style={{ height: '60px', width:'60px', marginRight:'20px' }} />
        <h3 className="Navtitle"><span role="img" aria-label="game"></span>Sell Through Forecaster</h3>
        <img src={Clothing} alt="React Logo" style={{ height: '60px', width:'60px', marginLeft:'20px' }} />
      </nav>
      <div className="Formlower">
        <div className="AttributeWrapper">
        {
          dropDownKeys.map((item,index)=>{
            return <OptionSelection itemKey={item} setOptionInObject={setOptionInObject} key={index}/> 
          })
        }
        </div>
        <div className="SubmitContainer">
          <button className="btn btn-grad Submit" onClick={() => handleInputSubmission()}>
          {(() => {
            if(isPredictionLoading) {
              return(
                <div className="spinner-border text-light" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )
            } else {
              return(
                <span>Submit</span>
              )  
            }
          })()}
          </button>
        </div>
        <div className="ResultContainer">
          {modelPrediction ? 
          <span className="RequestPass">Forecasted Sell Through: {modelPrediction.toFixed(2)}</span> 
          : 
          null }
          {isRequestFailed ? 
          <span className="RequestFail">{isRequestFailed}</span> 
          : 
          null }
        </div>
      </div>
    </div>
  );
}

export default App;