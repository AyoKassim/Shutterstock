import { info } from 'console';
import fetch from 'node-fetch';
var ExifImage = require("exif").ExifImage;
const fs = require('fs')

module.exports = async function (name) {

  try {

    //const hello = await fetch("https://api.github.com/users/aodhanocathain")

    //new ExifImage({ image: "./public/palm-tree-1.jpg"}, function (error, exifData) {



    new ExifImage({ image: `./uploads/${name}` }, async function (error, exifData) {




      if (error) console.log("Error: " + error.message);

      else {
        //writing some exifData to a file 

        let info = {
        }


        info.Make = exifData.image.Make
        info.Latitude = exifData.gps.GPSLatitude
        info.Longitude = exifData.gps.GPSLongitude
        

        fs.writeFileSync("./exif.json", JSON.stringify(info))

        /* fs.writeFileSync("./exif.json", JSON.stringify(
           [new String(' Make: ' + exifData.image.Make),
           new String(' Model: ' + exifData.image.Model),
           //new String(' ModifyDate: ' + exifData.image.ModifyDate ),
           new String(' DateTimeOriginal: ' + exifData.exif.DateTimeOriginal + '\r\n'),
           new String(' ShutterSpeedValue: ' + exifData.exif.ShutterSpeedValue),
           new String(' ApertureValue: ' + exifData.exif.ApertureValue), new String(' Flash: ' + exifData.exif.Flash),
           new String(' ExifImageWidth: ' + exifData.exif.ExifImageWidth),
           new String(' ExifImageHeight: ' + exifData.exif.ExifImageHeight),
           new String(' GPS Info: ' + exifData.image.GPSInfo),
           new String(' GPSVersionID: ' + exifData.gps.GPSVersionID),
           new String(' GPS Latitude: ' + exifData.gps.GPSLatitude),
           new String(' GPS Latitude Ref: ' + exifData.gps.GPSLatitudeRef),
           new String(' GPS Longitude: ' + exifData.gps.GPSLongitude),
           new String(' GPS LongitudeRef: ' + exifData.gps.GPSLongitudeRef),
           new String(' GPS Altitude: ' + exifData.gps.GPSAltitude),
           new String(' GPS AltitudeRef: ' + exifData.gps.GPSAltitudeRef)
           ]));
           */

        const string = fs.readFileSync("./exif.json")

        //returning obj 
        const result = JSON.parse(string)



        //object.make = 
           const lat =  result.Latitude
           const long =  result.Longitude

        const APIcall = await fetch(`http://api.positionstack.com/v1/reverse?access_key=${process.env.key}&query=${lat[2]},${long[2]}`)

        const APIresult = await APIcall.json()

        info.Place = APIresult.data[0].label

        fs.writeFileSync("./exif.json", JSON.stringify(info))

        console.log(APIresult.data[0].label)

        //uncomment code below for all exif data 
        //fs.writeFileSync("./exif.json", JSON.stringify(exifData));  


        //creating result object 
        /*const result = {  
  
          
          address: APIresult.data[0].label,
          date: exifData.exif.DateTimeOriginal
  
  
  
        }
        */

        //console.log.apply(result)
      }
    })



  }
  catch (error) {
    console.log("Error: " + error.message);
  }





  //printing file 
  //console.log('./exif.json')
  return fs.readFileSync('./exif.json')

 // return JSON.stringify(info)

};
