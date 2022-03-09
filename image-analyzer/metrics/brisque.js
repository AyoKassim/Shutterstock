/* This code calls a python function, that returns an analysis of an image passed based on brisque
(Blind/Referenceless Image Spatial Quality Evaluator) analysis, the lower the score returned, 
 the better quality of the image. 
 Brisque evaluations are good to find blur, noise and distortions in images
*/
const express = require("express");
const bodyParser = require("body-parser");
const {spawn} = require('child_process');
const app = express();
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = async function uploadSize(uploadName)
{
      // Reading Python files
      var dataToSend;
      // spawn new child process to call the python script
      const python = spawn('python', ['brisquePython/brisque.py', uploadName]);

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