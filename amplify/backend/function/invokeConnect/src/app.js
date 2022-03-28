/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const AWS = require('aws-sdk');


// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

// app.get('/call', function(req, res) {
//   // Add your code here
//   res.json({success: 'get call succeed!', url: req.url});
// });

// app.get('/call/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'get call succeed!', url: req.url});
// });

/****************************
* Example post method *
****************************/

app.post('/call', function(req, res) {
        
  
        console.log(req.body);
        console.log(req['body']);
        
        //define parameter values to use in initiating the outbound call
        let maquina = req.body.maquina;
        let numeroOrigen = req.body.numeroDestino;
        let numeroDestino = req.body.numeroOrigen;
        
        console.log(maquina);
        console.log(numeroDestino);
        console.log(numeroOrigen);
        console.log(`---- Starting the phone call for ${maquina} ---- `);
        
        var params = {
            ContactFlowId: "11e0d624-6809-4e7d-8fa4-cd18e6238773",
            DestinationPhoneNumber: numeroDestino,
            InstanceId: "40f62289-8adf-4f1a-b934-328736bd08de",
            Attributes: {"NombreMaquina": maquina }, // $.Attributes.NombreMaquina
            SourcePhoneNumber: numeroOrigen
        };
        var connect = new AWS.Connect();
        
        // method used to initiate the outbound call from Amazon Connect
        connect.startOutboundVoiceContact(params, function(err, data) {
            if (err) console.log(err, err.stack) ;
            else console.log(data);
        });
        

  res.json({success: 'post call succeed!', url: req.url, body: req.data})
});

// app.post('/call/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'post call succeed!', url: req.url, body: req.body})
// });

/****************************
* Example put method *
****************************/

// app.put('/call', function(req, res) {
//   // Add your code here
//   res.json({success: 'put call succeed!', url: req.url, body: req.body})
// });

// app.put('/call/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'put call succeed!', url: req.url, body: req.body})
// });

/****************************
* Example delete method *
****************************/

// app.delete('/call', function(req, res) {
//   // Add your code here
//   res.json({success: 'delete call succeed!', url: req.url});
// });

// app.delete('/call/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'delete call succeed!', url: req.url});
// });

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
