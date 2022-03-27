
const tags = `./tagsFolder/tags.json`;
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const {spawn} = require('child_process');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = async function uploadSize()
{    
    // Reading Python files
    var dataToSend;
    var trendSearchVars;

    // spawn new child process to call the python script
    const test = spawn('python', ['jsonReaderPython/jsonReader.py']);

    test.stdout.on('data', function (data) {
        trendSearchVars = data.toString();
    });

    // collect data from script
    test.stderr.on('data', function (data) {
        trendSearchVars = data.toString();
    });  
    
    await new Promise((resolve) => {
        test.on('exit', (code) => {
        console.log(`child process exited with code ${code}, ${trendSearchVars}`);
         resolve();
         }) 
     }); 
    
    var tagArray = trendSearchVars.split(',')    
    const python = spawn('python', ['trendSearchPython/trendSearch.py', tagArray[0], tagArray[1], tagArray[2], tagArray[3], tagArray[4]]);

    // collect data from script
    python.stdout.on('data', function (data) {
        dataToSend = data.toString();
    });

    python.stderr.on('data', data => {
    console.error(`stderr: ${data}`);
        });
        
            
    // in close event we are sure that stream from child process is closed, use await to make sure the process is done before returning
    await new Promise((resolve) => {
       python.on('exit', (code) => {
       console.log(`child process exited with code ${code}, ${dataToSend}`);
        resolve();
        }) 
    }); 
        
    
    return dataToSend
};