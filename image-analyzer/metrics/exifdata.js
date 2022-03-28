var ExifImage = require("exif").ExifImage;
const fs = require('fs')

module.exports =  async function (name) {
  
  try {
    //new ExifImage({ image: "./public/palm-tree-1.jpg"}, function (error, exifData) {

    new ExifImage({ image: `./uploads/${name}`}, function (error, exifData) {
     

      if (error) console.log("Error: " + error.message);
    
      else
        //writing exifData to a file 
        fs.writeFileSync("./exif.json", JSON.stringify(exifData));
    });
  }
   catch (error) {
    console.log("Error: " + error.message);
  }

  //printing file 
  console.log("./exif.json")
  return fs.readFileSync('./exif.json')
  
  
};
