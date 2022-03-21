const fs = require("fs");
const axios = require("axios");
const formdata = require("form-data");

module.exports = async function (name) {
  //create formdata to contain the image data
  const form = new formdata();
  form.append("image", fs.createReadStream(`./public/${name}`));

  //create the custom headers for the axios config object
  const fheaders = form.getHeaders();
  fheaders["Authorization"] = "Basic YWNjX2Y3NmE4NDk4ZDMwNGZjMDo4OGIzZjNjN2Y5M2ZkZjExOWZhNTQzZTRlYjI0M2Y0MA==";
  const config = { headers: fheaders };

  //make the request and return the data
  const response = await axios.post("https://api.imagga.com/v2/tags",form,config);
  const data = await response.data;
  return data;
};
