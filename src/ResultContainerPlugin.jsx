import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


function filterResults(results) {
    let filteredResults = [];
    for (var i = 0; i < results.length; ++i) {
        if (i === 0) {
            filteredResults.push(results[i]);
            continue;
        }

        if (results[i].decodedText !== results[i-1].decodedText) {
            filteredResults.push(results[i]);
        }
    }
    return filteredResults;
}

class ResultContainerTable extends React.Component {
    render() {
        var results = filterResults(this.props.data);
        console.log(results[results.length - 1]);
        
    let datos = {
     "input": results[results.length-1].decodedText,
     "name": uuidv4(),
     "stateMachineArn": "arn:aws:states:us-east-1:668984504585:stateMachine:MyStateMachine"
    };
    
    console.log(datos);
      axios.post(`https://yhicdu4li8.execute-api.us-east-1.amazonaws.com/Prod/execution`, datos)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
        
        
        
        return (
            <table className={'Qrcode-result-table'}>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Texto leído</td>
                        <td>Formato</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        results.map((result, i) => {
                            console.log(result);
                            return (<tr key={i}>
                                <td>{i}</td>
                                <td>{result.decodedText}</td>
                                <td>{result.result.format.formatName}</td>
                            </tr>);
                        })
                    }
                </tbody>
            </table>
        );
    }
}

class ResultContainerPlugin extends React.Component {
    render() { 
        let results = filterResults(this.props.results);
        return (<div className='Result-container'>
                <div className='Result-header'>Texto Escaneado ({results.length})</div>
                <div className='Result-section'>
                    <ResultContainerTable data={this.props.results} />
                </div>
            </div>);
    }
}

export default ResultContainerPlugin;