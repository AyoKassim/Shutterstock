// init project
const express = require("express");
const bodyParser = require("body-parser");
const {spawn} = require('child_process');
const app = express();
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = function uploadSize(uploadName)
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

     // in close event we are sure that stream from child process is closed
     python.on('exit', (code) => {
     console.log(`child process exited with code ${code}, ${dataToSend}`);
     
    }); 
    
    
};