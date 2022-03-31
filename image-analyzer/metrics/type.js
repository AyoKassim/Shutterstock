const fs = require("fs");
const createReadStream = require('fs').createReadStream
const path = require("path");
const async = require('async');
const https = require('https');
const { ComputerVisionClient } = require('@azure/cognitiveservices-computervision');
//import vibrant from 'vibrant';
const { CognitiveServicesCredentials } = require('@azure/ms-rest-azure-js');


    const key = process.env.AZURE_KEY
    const endpoint = process.env.AZURE_ENDPOINT;

    const client = new ComputerVisionClient(new CognitiveServicesCredentials(key), endpoint);

module.exports = async function computerVision(uploadName) {
      //const form = new formdata();
      //form.append("image", fs.createReadStream(`./uploads/${uploadName}`));

      const imageFile = fs.readFileSync(`./public/${uploadName}`);

      console.log('Analyzing...');
      const types = (await client.analyzeImageInStream(imageFile.buffer, { visualFeatures: ['ImageType'] })).imageType;
      console.log(`Image appears to be ${getType(types)}`);
  return getType(types);
}

function getType(imageType){
  if (imageType.clipArtType && imageType.clipArtType > imageType.lineDrawingType){
      return 'clip art';
  }
  if (imageType.lineDrawingType && imageType.clipArtType < imageType.lineDrawingType){
      return 'line drawing';
  }
  return 'photo';
}