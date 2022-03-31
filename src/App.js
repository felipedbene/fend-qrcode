import './App.css';

import React from 'react';
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx'
import ResultContainerPlugin from './ResultContainerPlugin.jsx'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decodedResults: []
    }

    // This binding is necessary to make `this` work in the callback.
    this.onNewScanResult = this.onNewScanResult.bind(this);
  }

  render() {
    return (
      <div className="App">
        <section className="App-section">
          <div className="App-section-title"> Favor escanear el error</div>
          <br />
          <br />
          <br />
          <Html5QrcodePlugin 
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={this.onNewScanResult}/>
          <ResultContainerPlugin results={this.state.decodedResults} />
        </section>
      </div>
    );
  }

  onNewScanResult(decodedText, decodedResult) {
    
    console.log(
      "App [result]", decodedResult);
      
      const headers = {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Methods" : "*",
            "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin" : "*",
            "X-Requested-With" : "*"
            
            // ,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Access-Control-Allow-Headers,access-control-allow-methods",
            
      }
      
      

    // let decodedResults = this.state.decodedResults;
    // decodedResults.push(decodedResult);
    //  {
    //    headers: headers
    //  }
    
    let datos = {
     "input": decodedResult,
     "name": uuidv4(),
     "stateMachineArn": "arn:aws:states:us-east-1:668984504585:stateMachine:MyStateMachine"
    }
    
      axios.post(`https://yhicdu4li8.execute-api.us-east-1.amazonaws.com/Prod/execution`, datos)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      
    this.setState((state, props) => {
      state.decodedResults.push(decodedResult);
      return state;
    });
  }
}

export default App;
