const fs = require("fs");
const axios = require("axios");
const formdata = require("form-data");
const tagFile = `./tagsFolder/tags.json`;


module.exports = async function (name) {
  //create formdata to contain the image data
  const form = new formdata();
  form.append("image", fs.createReadStream(`./public/${name}`));

  //create the custom headers for the axios config object
  const fheaders = form.getHeaders();
  fheaders["Authorization"] = process.env.IMAGGA_AUTH;
  const config = { headers: fheaders };

  //make the request and return the data
  const response = await axios.post("https://api.imagga.com/v2/tags",form,config);
  const data = await response.data;
  fs.writeFile(tagFile, JSON.stringify(data), (err) => {
    if(err) return console.log(err);
  })
  return data;
};
