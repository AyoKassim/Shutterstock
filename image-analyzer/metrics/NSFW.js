const fs = require("fs");
const createReadStream = require('fs').createReadStream
const path = require("path");
const async = require('async');
const https = require('https');
const { ComputerVisionClient } = require('@azure/cognitiveservices-computervision');
import Image from 'next/image'
//import vibrant from 'vibrant';
const { CognitiveServicesCredentials } = require('@azure/ms-rest-azure-js');

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

    const key = process.env.AZURE_KEY;
    const endpoint = process.env.AZURE_ENDPOINT;

    const client = new ComputerVisionClient(new CognitiveServicesCredentials(key), endpoint);

module.exports = async function computerVision(uploadName) {
      //const form = new formdata();
      //form.append("image", fs.createReadStream(`./uploads/${uploadName}`));

      const imageFile = fs.readFileSync(`./public/${uploadName}`);

      const isIt = flag => flag ? 'is' : "isn't";

      console.log('Analyzing...');
      const sfw = (await client.analyzeImageInStream(imageFile.buffer,
        {visualFeatures: ['Adult']})).adult
        console.log(`This probably ${isIt(sfw.isAdultContent)} adult content (${sfw.adultScore} score)`);

  return sfw;
}