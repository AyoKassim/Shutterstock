var ExifImage = require("exif").ExifImage;
const fs = require('fs')

module.exports =  async function (name) {
  
  try {
    //new ExifImage({ image: "./public/palm-tree-1.jpg"}, function (error, exifData) {

    new ExifImage({ image: `./uploads/${name}`}, function (error, exifData) {
     

      if (error) console.log("Error: " + error.message);
    
      else
        //writing some exifData to a file 
        fs.writeFileSync("./exif.json", JSON.stringify(
          [new String(' Make: ' + exifData.image.Make ), 
          new String(' Model: ' + exifData.image.Model ), 
          //new String(' ModifyDate: ' + exifData.image.ModifyDate ),
          new String(' DateTimeOriginal: ' + exifData.exif.DateTimeOriginal) , 
          new String(' ShutterSpeedValue: ' + exifData.exif.ShutterSpeedValue ),
          new String(' ApertureValue: ' + exifData.exif.ApertureValue ), new String(' Flash: ' + exifData.exif.Flash ),
          new String(' ExifImageWidth: ' + exifData.exif.ExifImageWidth ),
          new String(' ExifImageHeight: ' + exifData.exif.ExifImageHeight ) ]));

         //uncomment code below for all exif data 
         //fs.writeFileSync("./exif.json", JSON.stringify(exifData));
         
    });

  }
   catch (error) {
    console.log("Error: " + error.message);
  }

  //printing file 
  console.log("./exif.json ")
  return fs.readFileSync('./exif.json')
  
  
};
