var ExifImage = require("exif").ExifImage;

module.exports =  async function (name) {
  try {
    new ExifImage({ image: `./public/${name}` }, function (error, exifData) {
      if (error) console.log("Error: " + error.message);
      else console.log(exifData); // Do something with your data!
    });
  } catch (error) {
    console.log("Error: " + error.message);
  }

  return "hello"
};
