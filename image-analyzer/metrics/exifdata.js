import { info } from 'console';
import fetch from 'node-fetch';
var ExifImage = require("exif").ExifImage;
const fs = require('fs')

module.exports = async function (name) {
  let p = new Promise((resolve, reject) => {

    try {

      new ExifImage({ image: `./public/${name}` }, async function (error, exifData) {
  
        if (error) console.log("Error: " + error.message);
  
        else {
  
          let info = {}
          
          info.Make = exifData.image.Make
          info.ShutterSpeed = exifData.exif.ShutterSpeedValue
          info.Width = exifData.exif.ExifImageWidth
          info.Height = exifData.exif.ExifImageHeight
          info.Latitude = exifData.gps.GPSLatitude
          info.Longitude = exifData.gps.GPSLongitude
          info.Date = exifData.exif.DateTimeOriginal
  
          //access the results with files because accessing the variables directly proves to be annoyingly difficult
          fs.writeFileSync("./exif.json", JSON.stringify(info))
          const string = fs.readFileSync("./exif.json")
          const result = JSON.parse(string)
          const lat = result.Latitude
          const long = result.Longitude
  
          //passing in parameters( lat and long) for location API call 
          const APIcall = await fetch(`http://api.positionstack.com/v1/reverse?access_key=${process.env.key}&query=${lat[2]},${long[2]}`)
  
          const APIresult = await APIcall.json()
  
          info.Place = APIresult.data[0].label
  
          fs.writeFileSync("./exif.json", JSON.stringify(info))
  
          console.log(APIresult.data[0].label)
          resolve(info)
          //uncomment code below for all exif data 
          //fs.writeFileSync("./exif.json", JSON.stringify(exifData));  
        }
      })
    }
    catch (error) {
      console.log("Error: " + error.message);
      resolve("unavailable")
    }
})

  return p
};
