const sstk = require("shutterstock-api"); // set the Shutterstock API for use
const fs = require("fs"); // set file system for use

const applicationClientId = "7J18HYrBHBWVmqTb8PIsrSb5xIe328Gz"; // set the consmumer ID for Shutterstock API
const applicationClientSecret = "fI4RBKoYpd0UoZpT"; // set the consumer secret for the Shutterstock API
sstk.setBasicAuth(applicationClientId, applicationClientSecret); // pass the consumer ID and consumer secret

const computerVisionApi = new sstk.ComputerVisionApi(); // initialise Shutterstock Computer Vision

// reverse image search method
module.exports = function reverseImageSearch(uploadName){
	const imageFile = fs.readFileSync(`./uploads/${uploadName}`); // return the contents of uploadName
	const base64File = Buffer.from(imageFile).toString("base64"); // encode the image to Base 64

	const body = new sstk.ImageCreateRequest(base64File); // request to create the Base 64 encoded image
	
	computerVisionApi.uploadImage(body) // upload the image
	.then((data) => {
		return computerVisionApi.getSimilarImages(data.upload_id); // find images similar to the one uploaded
	})
	.then((data) => {
		console.log(data.total_count); // print the results of the reverse image search
	})
	.catch((error) => {
		console.error(error); // print any errors 
	});
}