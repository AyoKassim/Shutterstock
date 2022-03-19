const fs = require("fs");
const createReadStream = require('fs').createReadStream
const path = require("path");
const async = require('async');
const https = require('https');
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { ImageType } from '@azure/cognitiveservices-computervision/esm/models/mappers';
import Image from 'next/image'
//import vibrant from 'vibrant';
const computerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const APICred = require('@azure/ms-rest-js').ApiKeyCredentials;


    const key = '';
    const endpoint = '';

    const computerVisionClient = new ComputerVisionClient(
      new ApiKeyCredentials({inHeader: {'SWENG-key': key} }), endpoint
    );

module.exports = function computerVision(uploadName) {
  async.series([
    async function () {
      //const form = new formdata();
      //form.append("image", fs.createReadStream(`./uploads/${uploadName}`));

      const imageFile = fs.readFileSync(`./uploads/${uploadName}`);
      const based64 = Buffer.from(imageFile).toString("base64");


      console.log('Analyzing...');
      const types = (await computerVisionClient.analyzeImage(imageFile, { visualFeatures: ['ImageType'] })).imageType;
      console.log(`Image appears to be ${getType(types)}`);

      function getType(imageType){
          if (imageType.clipArtType && imageType.clipArtType > imageType.lineDrawingType){
              return 'clip art';
          }
          if (imageType.lineDrawingType && imageType.clipArtType < imageType.lineDrawingType){
              return 'line drawing';
          }
          return 'photo';
      }
    },
    function () {
      return new Promise((resolve) => {
        resolve();
      })
    }
  ], (err) => {
    throw (err);
  });

  return type();
}

computerVision();
