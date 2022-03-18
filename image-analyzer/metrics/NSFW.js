const fs = require("fs");
const createReadStream = require('fs').createReadStream
const path = require("path");
const async = require('async');
const https = require('https');
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import Image from 'next/image'
//import vibrant from 'vibrant';
const computerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const APICred = require('@azure/ms-rest-js').ApiKeyCredentials;

//module.exports = function gammaValue(uploadName){
    //Caman("image-id", function(){
      //  const img = document.createElement()
       // this.brightness().render();
 //   });
//};

//module.exports = function mainColour(uploadName) {

    //var img = document.createElement("img");
    //img.setAttribute("src", this.filename)

    //img.addEventListener('load', function () {
        //var vibr = new Vibrant(img);
        //var swatches = vibrant.swatches()
        //for (var swatch in swatches)
        //    if (swatches.hasOwnProperty(swatch) && swatches[swatch])
      //          console.log(swatch, swatches[swatch].getHex())
    //    return
  //  });
//};

//module.exports = function isNSFW(uploadName){
  //  const key = 'def43206d9e04e1e92c0b1d042d0f3ed';
    //const endpoint = 'https://sweng19.cognitiveservices.azure.com/';

    //isNSFW();
//};

    const key = 'def43206d9e04e1e92c0b1d042d0f3ed';
    const endpoint = 'https://sweng19.cognitiveservices.azure.com/';

    const computerVisionClient = new ComputerVisionClient(
      new ApiKeyCredentials({inHeader: {'SWENG-key': key} }), endpoint
    );

module.exports = function computerVision(uploadName) {
  async.series([
    async function () {
      const form = new formdata();
      form.append("image", fs.createReadStream(`./uploads/${uploadName}`));

      const isIt = flag => flag ? 'is' : "isn't";

      console.log('Analyzing...');
      const sfw = (await computerVisionClient.analyzeImage(uploadName,
        {visualFeatures: ['Adult']})).sfw
        console.log(`This probably ${isIt(sfw.isAdultContent)} adult content (${sfw.adultScore.toFixed(4)} score)`);
    },
    function () {
      return new Promise((resolve) => {
        resolve();
      })
    }
  ], (err) => {
    throw (err);
  });
}

computerVision();